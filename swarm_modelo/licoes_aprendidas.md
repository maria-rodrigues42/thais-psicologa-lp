# Lições aprendidas — catálogo de armadilhas do Swarm

> Leitura obrigatória da **Fase 0**. Cada item aqui custou pelo menos um bloqueante, um retrabalho
> ou uma aprovação indevida num projeto real. São armadilhas **transferíveis**: independem do domínio.
> O que elas têm em comum é serem **defeitos que passam em tudo** — compilam, os testes ficam verdes,
> a revisão de código aprova, e mesmo assim estão errados.

---

## 1. O gerador auto-aprovando o próprio trabalho

Um agente gerador rodou duas sprints desatendido e reportou "APROVADO" em todas as tasks. A reauditoria independente encontrou: frontend inteiro simulado com `setTimeout` e senha hardcoded (não chamava a API em lugar nenhum), hash de senha vazando na resposta HTTP de duas rotas, token de recuperação com o hash embutido no payload (JWT é assinado, não cifrado), e uma regra de negócio invertida no DTO (`mínimo 1` onde a regra exigia 2).

**Regra:** quem gera nunca aprova. Vale para outro agente, vale para você em outro turno.

## 2. Cobertura unitária alta mascarando app que não sobe

94% de cobertura e a aplicação **não iniciava**: um módulo de configuração nunca era registrado no módulo raiz. Os unitários não pegaram porque injetavam o serviço de configuração mockado — exatamente a peça que faltava na composição real.

**Regra:** integração com dependências reais faz parte do gate de **toda** task. E tenha ao menos um teste que **monte o módulo raiz e faça uma requisição real** — foi assim que se descobriu, depois, que o endpoint de health respondia 401 e o healthcheck do container derrubaria em loop uma aplicação sadia.

## 3. Testes verdes com o typecheck quebrado

Transpiladores que apagam tipos sem checá-los (`@swc/jest`, `esbuild`, `babel`) rodam a suíte com sucesso enquanto o compilador reprovaria. Aconteceu 5×, sempre com o mesmo sintoma: um tipo importado que não existia no escopo.

**Regra:** `typecheck` é etapa separada e obrigatória do gate. "Os testes passaram" não implica "compila".

## 4. O piso de cobertura cego para o código novo

A configuração de cobertura excluía um módulo que tinha sido desligado temporariamente. Quando o módulo voltou, a exclusão ficou — e o piso de 85% passou a ser calculado sem enxergar o código novo. O gate parecia verde e não media nada do que importava.

**Regra:** ao religar ou criar um módulo, confira se ele não está numa lista de exclusão de cobertura. Um gate de cobertura que não cobre o código da task é decorativo.

## 5. Testes que dependem de sorte ambiental

Quatro casos, dois deles em suítes que estavam verdes há semanas:
- Uma suíte de integração não definia sua própria variável de ambiente de segredo — pegava carona no processo compartilhado, poluído por outra suíte. Quebrou no dia em que uma suíte nova mudou a ordem de execução.
- Um `beforeAll` sem timeout explícito herdava o default de 5s, menor que o tempo de subir um container. O sintoma ("require after environment torn down") não parecia com a causa.
- Um teste de UI levava ~5,1s contra um timeout default de 5s: passava sozinho, falhava sob carga paralela.

**Regra:** toda suíte monta o **próprio** ambiente (variáveis, fixtures) e declara timeout explícito em setup que sobe infraestrutura. Nunca confie no que outra suíte deixou.

## 6. Inspeção estática não substitui medir no navegador

Três bloqueantes de UI que **nenhuma leitura de código pegaria**:
- Uma classe utilitária de altura mínima era **código morto**: duas utilitárias de mesma especificidade → quem vence é a ordem no CSS **gerado**, não a ordem no atributo `class`. Renderizava metade do valor escrito.
- **Contraste depende do tamanho da fonte.** Um verde de sucesso dá ~3,3:1 sobre branco: a 17px em negrito reprova (exige 4,5:1), acima de 18,66px em negrito vira "texto grande" e passa com 3:1. A mesma cor, aprovada e reprovada, dependendo de uma medida.
- **Breakpoint invertido:** o prefixo de breakpoint "pequeno" da ferramenta significa **≥640px**, ou seja, tablet — que era o hardware alvo. O layout ficou confortável só no celular, que não era o alvo.

**Regra:** para sobrepor um utilitário de um kit, use estilo inline (o único determinístico) e trave com asserção de estilo computado — testar a classe não pega, porque o ambiente de teste DOM não resolve a cascata. E **sempre declare contra qual fundo** você mediu contraste.

## 7. Contraste correto sobre um fundo, errado sobre o outro

Uma cor de erro dava 4,83:1 sobre branco (passa) e 4,46:1 sobre o cinza-claro de superfície (reprova). A diferença é invisível a olho nu, e o padrão estava replicado em **8 telas** — várias já aprovadas, porque as auditorias anteriores conferiram só contra branco.

**Regra:** contraste é par (cor, fundo). Auditoria que verifica um fundo só produz aprovação falsa em escala.

## 8. Teste escrito contra um contrato que não existe

Um teste assertava um campo de erro que o framework nunca emitiu. Passava porque o `expect` era sobre um valor `undefined` comparado de forma frouxa. Testava nada.

**Regra:** ao escrever teste de contrato de erro, **provoque o erro uma vez e olhe a resposta real** antes de assertar sobre ela.

## 9. Teste de regressão que nunca falhou não é teste

Depois de corrigir um defeito sutil de consistência, o teste de regressão passou de primeira — o que não prova nada. **Reintroduzir o defeito** e confirmar que o teste fica vermelho foi o que provou que ele pegava.

**Regra:** para defeito sutil, valide o teste invertendo o código uma vez.

## 10. Configuração que não chega ao runtime

Um segredo estava no arquivo de exemplo (dando toda a impressão de configurado), mas ausente do bloco de ambiente do compose — e o arquivo de exemplo não é copiado para a imagem. Como o módulo lia o segredo com "obtenha ou lance", **a aplicação não subiria em produção**. Ninguém tinha subido pelo caminho real.

**Regra:** variável de ambiente precisa ser verificada **onde ela é consumida**, não onde é documentada. Suba pelo caminho de produção antes de fechar a sprint.

## 11. Objetos de infraestrutura invisíveis ao ORM

Três garantias do banco não eram expressáveis no schema do ORM: um gatilho append-only, e dois índices únicos parciais. Uma ferramenta de migração automática os enxerga como **drift** e propõe `DROP` — removendo em silêncio garantias que o código não reimplementa.

**Regra:** mantenha uma **lista fechada** desses objetos no `progress.md`, cada um com um teste de integração que falha se ele sumir, e nunca rode migração automática sem revisar o SQL gerado.

## 12. Auditoria/efeito colateral fora da transação

Mutações eram commitadas e só depois a trilha de auditoria era escrita. Se a auditoria falhasse, o usuário recebia erro 500 **embora a operação já tivesse acontecido** — resposta enganosa, que convida a repetir, e sem trilha nenhuma.

**Regra:** efeito que precisa ser atômico com a mutação vai **na mesma transação**, e a falha dele precisa derrubar a mutação. Se o serviço de efeito colateral tem retry próprio, o caminho transacional **não pode** ter retry — o erro tem que matar a transação de quem chamou.

## 13. Validação que aprova em vez de construir

Uma rota validava dois campos de um objeto e **gravava o objeto inteiro** — qualquer chave extra entrava num snapshot imutável. Fechar aquele ramo específico deixaria a classe do defeito viva.

**Regra:** a validação devolve a **forma canônica** construída a partir da entrada; o valor recebido é descartado. Isso torna a classe inteira do defeito inexpressável, em vez de fechar um caso.

## 14. Leitura fora da serialização

Um read-modify-write lia o estado fora da transação: dois saves simultâneos liam o mesmo valor e o segundo sobrescrevia o primeiro, **sem erro nenhum** — o usuário via sumir da tela o que acabou de digitar. E a checagem de concorrência otimista também estava fora do lock, onde não protegia justamente o cenário que a motivou (um flush de fila offline dispara as pendentes em paralelo, todas lendo o mesmo estado pré-rajada).

**Regra:** releia sob o lock. Condição de estado vai na cláusula `WHERE` do update, não num `if` em código — assim ela não depende de uma task futura lembrar de tomar o mesmo lock.

## 15. Isolamento de transação que não isola o que você acha

Em Postgres, uma transação `SERIALIZABLE` tira o snapshot na **primeira query** — uma transação que espera num lock como primeira instrução volta com a visão velha. E `SERIALIZABLE` só protege entre transações que também são `SERIALIZABLE`; misturar níveis num mesmo caminho crítico cria um furo silencioso.

**Regra:** o nível de isolamento é decisão do caminho inteiro, não de um serviço. Documente a ordem de aquisição de locks num registro central (ex.: "o lock da auditoria é sempre o último") — ordem inconsistente é deadlock esperando um dia de carga.

## 16. Data, fuso e "hoje"

O cliente enviava o "hoje" do navegador como parâmetro, sobrepondo o fuso do servidor. E colunas de data pura exigem construção em meia-noite UTC: montar a data no fuso local produz erro de um dia e quebra restrições de unicidade por data.

**Regra:** "hoje" é decisão do **servidor**, ancorada num fuso explícito e num único módulo. Nenhuma outra camada constrói data.

## 17. Refatoração que perde o curto-circuito

Ao extrair uma condição de um interceptor para uma função pura, um acesso opcional virou acesso direto — o código lançaria em vez de decidir. A função pura era a decisão certa (testar dentro do interceptor testaria mais a biblioteca HTTP do que a regra); o defeito foi na extração.

**Regra:** ao extrair condição, confira os operadores de acesso opcional e a ordem de avaliação. E prefira comparar caminho exato a prefixo: `startsWith` erra nos dois sentidos — casa com uma rota futura parecida e não casa com URL absoluta.

## 18. Dívida "não-bloqueante" que volta como bloqueante

Vários bloqueantes de auditoria eram sugestões registradas duas sprints antes: omitir o campo sensível globalmente na camada de dados, mascarar um dado pessoal a mais na trilha, limitar tentativas de login. Cada uma era barata na origem e cara depois, porque outras tasks já tinham construído em cima.

**Regra:** backlog com **motivo e gatilho**, revisado no início de cada sprint. Se o conserto fica mais caro na próxima task, ele não é backlog — é parte desta.

## 19. Restrição de ambiente que sobrevive ao ambiente

"Sem Docker nesta máquina" ficou registrado e continuou guiando decisões por dias depois de o Docker estar instalado. Uma instrução mandando usar um wrapper de gerenciador de pacotes idem — e ela cegava o ferramental que dependia do binário direto.

**Regra:** anotação de ambiente tem prazo de validade. Revalide no início de cada sessão longa; corrija o arquivo em vez de contornar.

## 20. Dois QAs lendo uma árvore que muda

Um QA capturou um snapshot **no meio** de uma correção motivada por outro laudo e auditou um estado que nunca existiu. Ele percebeu e esperou estabilizar, mas por sorte.

**Regra:** enquanto QAs rodam sobre os mesmos arquivos, a árvore fica congelada. Acumule os laudos, depois corrija.

## 21. Mascarar dado pessoal reduz poder probatório

Com um campo mascarado nos dois lados da trilha (antes/depois), a auditoria registra que **houve** correção mas não prova **qual** valor mudou. É um trade legítimo de privacidade × prova, e precisa ser **decidido**, não sofrido.

**Regra:** quando precisar de prova de conteúdo sem expor o conteúdo, grave uma **impressão digital** (hash do snapshot) em vez do valor.

## 22. Imutabilidade garantida por ausência de rota

Versões de um formulário eram "imutáveis" porque nenhuma rota as alterava — não havia gatilho nem restrição impedindo. E o **seed** alterava: um `upsert` reescrevia o conteúdo da v1 sem auditoria e sem versão nova.

**Regra:** invariante que importa se defende no banco, não na ausência de código. E lembre que scripts de seed/manutenção são um caminho de escrita tão real quanto a API.

---

## Checklist rápido do Manager antes de aprovar uma task

- [ ] Gate objetivo verde, **incluindo typecheck separado e integração**.
- [ ] A cobertura enxerga o código novo (nenhuma exclusão herdada).
- [ ] O que dá para medir foi medido (navegador, app subida, requisição real).
- [ ] Teste de regressão de defeito sutil foi validado invertendo o código.
- [ ] Contraste declarado com o fundo.
- [ ] Nenhum QA correu sobre árvore em movimento.
- [ ] Requisitos herdados registrados nas tasks futuras alvo.
- [ ] Backlog com motivo e gatilho.
- [ ] Commit explica o porquê.
