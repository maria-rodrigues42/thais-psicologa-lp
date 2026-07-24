# Modelo Swarm SDLC — v2

Modelo de orquestração multi-agente para construir software da ideia à produção.
Esta é a **v2**, revisada depois de um projeto real rodado ponta a ponta (8 sprints,
~350 testes unitários, ~150 de integração, duas plataformas de agente).

## Como usar num projeto novo

1. Copie o conteúdo desta pasta para a raiz do projeto novo:
   ```
   master_system_prompt.md
   licoes_aprendidas.md
   .claude/agents/*.md
   templates/
   ```
2. Renomeie os arquivos de `templates/` conforme for preenchendo:
   - `templates/progress.md` → `progress.md` (na Fase 0)
   - `templates/master_architecture_and_plan.md` → `master_architecture_and_plan.md` (Fase 2)
   - `templates/sprints_plan.md` → `sprints_plan.md` (Fase 3, escrito pelo Planner)
3. Abra o agente na pasta e cole o **bloco A** de `templates/prompt-arranque.txt`.
4. **Se `.claude/agents/` foi criado depois de a sessão abrir, reinicie a ferramenta uma vez** —
   senão os subagentes não são carregados e você cai no fallback sem perceber.

## Arquivos

| Arquivo | O que é |
|---|---|
| `master_system_prompt.md` | O processo: Fases 0–5, gate objetivo, ciclo de QA, apêndices de plataforma, gerador externo e formato de commit. |
| `licoes_aprendidas.md` | **O arquivo mais valioso.** 22 armadilhas transferíveis, cada uma com o defeito real que a originou. Leitura obrigatória da Fase 0. |
| `.claude/agents/` | Definições dos 5 papéis: `planner`, `coder`, `secops-qa`, `uiux-qa`, `architecture-qa`. |
| `templates/` | Esqueletos de `progress.md`, `sprints_plan.md`, da Bíblia, e os prompts de arranque/retomada. |

## O que mudou da v1 para a v2

Todas as mudanças vieram de defeitos que custaram caro, não de teoria.

1. **Quem GERA nunca APROVA** — virou princípio nº 3, com o incidente que o originou.
   Um agente gerador rodou duas sprints desatendido e auto-aprovou trabalho com frontend
   simulado, hash de senha vazando por HTTP e regra de negócio invertida.
2. **Gate objetivo antes de gastar QA** (nova Etapa 4.2) — a sequência determinística roda
   primeiro, custa zero token de agente e pega toda a classe de defeito mecânico.
3. **`typecheck` é etapa própria** — transpiladores de teste apagam tipos; a suíte fica verde
   com o compilador quebrado (aconteceu 5×).
4. **Integração no gate de TODA task** — 94% de cobertura unitária mascarou um defeito que
   impedia a aplicação de iniciar.
5. **Requisitos herdados** (princípio nº 8) — achado de QA que só pode ser resolvido numa task
   futura não é backlog: é requisito daquela task, registrado em dois lugares.
6. **Verificação empírica** (princípio nº 6) — medir no navegador, subir a app de verdade, e
   validar teste de regressão reintroduzindo o defeito. Teste que nunca falhou não é teste.
7. **Dívida técnica se paga na task em que nasce** (princípio nº 7) — backlog com **motivo e
   gatilho**; vários bloqueantes eram sugestões ignoradas duas sprints antes.
8. **Árvore congelada durante os laudos** — um QA já auditou um estado intermediário que nunca
   existiu, porque o código mudava enquanto ele lia.
9. **QA audita o diff real**, não o relato de quem gerou.
10. **Fase 0 detecta o ambiente CONCRETO** e o revalida — anotação de ambiente tem prazo de
    validade e a obsoleta guiou decisões erradas por dias.
11. **Nova Fase 5 (Fechamento)** — suíte completa em checkout limpo, aplicação subida pelo
    caminho real de produção, backlog reconciliado, e dizer explicitamente o que não foi feito.
12. **Regras de negócio numeradas (RN-xx)** desde a Fase 1 — viram critério de aceitação, nome
    de teste e vocabulário dos laudos.
13. **DoD com dentes** — critérios objetivos, incluindo que o piso de cobertura realmente
    enxergue o código novo.
14. **Achados com ID** (`SEC-1`, `ARQ-2`, `UI-3`) e **sugestão com gatilho**.
15. **Apêndice do gerador externo de volume** — como usar um segundo agente para volume mantendo
    o gate; e **apêndice de mensagem de commit** (explicar o porquê, não o quê).
16. **Agentes revisados** — cada papel ganhou a lista de classes de defeito que já escaparam
    dele: o `secops-qa` ganhou 8, o `uiux-qa` ganhou a ordem de **medir, não ler**, e o
    `architecture-qa` passou a avaliar o que os testes **provam**, não quantos são.

## Modelos por papel (campo `model:` no frontmatter)

| Papel | Modelo | Por quê |
|---|---|---|
| `coder` | herda o Manager (forte) | Núcleo de geração e remediação difícil. |
| `secops-qa` | herda o Manager (forte) | Achado de segurança é sutil e caro de errar. |
| `planner` | herda o Manager (forte) | Roda raro; plano ruim contamina tudo. |
| `architecture-qa` | `sonnet` | SOLID e cobertura são checkáveis por lista. |
| `uiux-qa` | `sonnet` | Paleta, screenshot e E2E são mecânicos. |
