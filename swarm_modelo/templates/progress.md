# Progresso do Projeto — <NOME DO PROJETO>

> ## ▶ RETOMAR AQUI
> Bloco de handoff. Quem abrir uma sessão nova (ou outra plataforma de agente) lê isto primeiro
> e continua sem recomeçar. **Mantenha este bloco no topo e sempre atualizado** — ele é o que
> torna o projeto resumível depois de um limite de token, um reinício ou uma troca de ferramenta.
>
> **Ordem de leitura para quem retomar:**
> 1. Este `progress.md` inteiro (estado, decisões, requisitos herdados, backlog).
> 2. `master_system_prompt.md` (processo SDLC) e `licoes_aprendidas.md` (armadilhas).
> 3. `.claude/agents/*.md` (definições dos papéis; em plataforma sem subagentes, use como prompt inline).
> 4. `master_architecture_and_plan.md` (a Bíblia) e `sprints_plan.md` (checkboxes = fonte de progresso).
>
> **Estado agora:** Fase <n> · Sprint <n> · Task <ID> `[ ]`/`[~]`/`[x]`
> **Próximo passo imediato:** <uma frase acionável>
> **Branch de trabalho:** <nome>
> **⚠️ Se houver task `[~]`:** pode ter sido interrompida no meio — rode o gate e reverifique o estado real antes de marcar `[x]`.

---

## Estado

- **Fase atual:**
- **Sprint atual:**
- **Task atual:**
- **Última atualização:** <data absoluta>

## Ambiente detectado (Fase 0) — revalidar em toda sessão longa

> Anotação de ambiente tem prazo de validade. Uma restrição registrada e nunca revalidada
> guiou decisões erradas por dias no projeto anterior. Se mudou, **corrija aqui**, não contorne.

- **Subagentes:**
- **Execução de código/testes:**
- **Browser/screenshots:**
- **Geração de imagem:**
- **Runtime de container / banco real:**
- **Gerenciador de pacotes (binário e PATH):**
- **Versões de runtime:**

## Gate objetivo do projeto (rodar ANTES de gastar QA)

```
1. build dos pacotes internos
2. geração de artefatos (ORM/codegen)
3. typecheck          # etapa PRÓPRIA — o transpilador de teste apaga tipos
4. lint
5. format:check
6. testes unitários
7. testes de integração   # em TODA task, não só nas de "integração"
8. drift schema ↔ migrações
```

Comandos reais deste projeto:
```
<preencher na Fase 0>
```

## Política de QA

- Risco `alto` → enxame completo (UI/UX é N/A em task de backend/schema puro).
- Risco `médio` → QAs relevantes ao tema.
- Risco `baixo` → Architecture QA.
- Aprova só sem bloqueantes. Sugestão vira backlog **com motivo e gatilho**.
- **Árvore congelada durante os laudos**: não corrigir enquanto outro QA ainda roda.

## Controle de versão

- Quem pode commitar: <>
- Branch por sprint: <>
- **Agente gerador NÃO commita** (default). Deixa modificado no disco; o Manager revisa o diff.

---

## ⭐ REQUISITOS HERDADOS (achados de QA que são requisito de uma task FUTURA)

> Não é backlog. É critério de aceitação de uma task que ainda não começou.
> Cada linha também é colada na task alvo, dentro do `sprints_plan.md` — quem for
> escrever aquela task não vai ler o laudo de hoje.

- **[para a S<n>-T<n>]** <o quê, por quê, e por que um teste ingênuo não pegaria>

---

## 🧾 BACKLOG TÉCNICO (com motivo e gatilho)

> Sugestão sem gatilho é dívida escondida. Reveja esta lista no início de cada sprint:
> se o conserto ficou mais caro porque outra task construiu em cima, ele deixou de ser backlog.

- **[gatilho: <quando>]** <achado> — **motivo:** <por que não foi feito agora>

---

## ⚠️ ARMADILHAS ESPECÍFICAS DESTE PROJETO

> Registre aqui o que é verdade **neste** repositório e não está no `licoes_aprendidas.md`.
> Exemplos do projeto anterior: objetos de banco invisíveis ao ORM (lista fechada + o teste que
> os protege); ordem de aquisição de locks; par cor/fundo proibido na UI; módulo que centraliza
> data e fuso; variável de ambiente que precisa existir em dois arquivos.

---

## Decisões do Manager

> Toda lacuna resolvida sem o usuário vira uma linha aqui, com o raciocínio e a alternativa
> descartada. Em modo autônomo isto é o que torna as decisões auditáveis depois.

- **<data> — [task]** <decisão>. **Por quê:** <>. **Descartado:** <> porque <>.

---

## Log de sprints

- **Sprint <n>** — ✅ FECHADA <data>. Commits: `<sha>` … · Gate final: typecheck/lint/format 0 · <n> unitários (<x>% cobertura) · <n> de integração.
