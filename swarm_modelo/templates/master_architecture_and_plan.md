# <NOME DO PROJETO> — Arquitetura e Plano Mestre (a "Bíblia")

> **Fonte da verdade do projeto.** Em caso de conflito com qualquer outro documento, código ou
> opinião de agente, este arquivo vence. Se algo precisa mudar, **atualize aqui antes de codar**.

---

## 1. Resumo e público-alvo

<que problema resolve, para quem, em que contexto de uso — inclua o hardware alvo real
(celular? tablet? desktop?), porque isso decide breakpoints e alvo de toque>

## 2. Pilares e Anti-Goals

**Pilares — o que o app é:**
-

**Anti-Goals — o que o app NÃO é sob nenhuma hipótese:**
-

## 3. Escopo do MVP

**Dentro:**
-

**Fora (explicitamente adiado):**
-

## 4. Regras de negócio (numeradas)

> Cada RN vira critério de aceitação, nome de teste e vocabulário dos laudos de QA.
> Escreva no modo normativo ("o sistema DEVE…"), não descritivo.

| ID | Regra | Consequência de violar |
|---|---|---|
| RN-01 | | |
| RN-02 | | |

**Áreas com valor jurídico/probatório** (rigor elevado, retrofit caro — decida agora):
- <trilha de auditoria, assinatura, imutabilidade, dados pessoais/LGPD>

## 5. Identidade visual

- **Paleta (hex):** `--brand` … · `--bg` … · `--surface` … · `--text` … · `--ok` … · `--err` … · `--warn` …
- **Tipografia e escala:**
- **Espaçamento e raio:**
- **Alvo de toque mínimo:**
- **Proibições (travas, não preferências):** <ex.: nenhum `dark:` no projeto; alerta de erro nunca sobre `--surface`>

> **Pares cor/fundo verificados:** registre aqui as combinações medidas e aprovadas, **com o valor**.
> Contraste é par (cor, fundo) e depende do tamanho da fonte — "passa AA" sem o fundo é meia informação.

## 6. Stack

| Camada | Escolha | Por quê |
|---|---|---|
| | | |

**Decisões de plataforma que amarram o resto:** <ex.: geração de PDF no servidor com browser headless — isso torna sanitização de HTML um requisito de segurança, não de UI>

## 7. Arquitetura

- **Camadas e módulos:**
- **Modelo de dados essencial:**
- **Padrão de transação e isolamento:** <qual nível, onde, e por quê>
- **Registro central de locks** e a **ordem de aquisição** (ordem inconsistente é deadlock esperando carga):
- **Ancoragem de data/fuso:** <o módulo único que decide "hoje">
- **Objetos de banco não expressáveis no ORM** (gatilhos, índices parciais): lista fechada no `progress.md`, cada um com teste que falha se sumir.

## 8. Estratégia de testes

- **Unitário:** <o que exige>
- **Integração (dependências reais):** <o que exige> — **roda no gate de toda task**
- **E2E:** <o que exige>
- **Onde ficam versionados:**
- **Piso de cobertura:** <x>% — e o piso precisa **enxergar o código novo** (nenhuma exclusão herdada).

## 9. Definition of Done

Toda task só é aprovada se:

1. **Gate objetivo 100% verde:** build → codegen → **typecheck (etapa própria)** → lint → format → unitários → **integração** → drift schema/migração.
2. Cobertura ≥ piso, com o piso realmente cobrindo o código novo.
3. Nenhum segredo hardcoded; segredos só por variável de ambiente, **verificados onde são consumidos**.
4. Regras de negócio afetadas têm teste nomeado pela RN.
5. Sem regressão: a suíte inteira passa.
6. Laudo **APROVADO** do QA independente correspondente ao risco — nunca autoavaliação do gerador.
7. Requisitos herdados da task cumpridos ou explicitamente reportados.

## 10. Ambiente e execução

- **Como rodar em desenvolvimento:**
- **Como subir pelo caminho real (compose/deploy):**
- **Variáveis de ambiente obrigatórias** e **em quais arquivos cada uma precisa existir**:
