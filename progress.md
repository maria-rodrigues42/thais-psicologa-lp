# Progresso do Projeto — Thais Psicóloga

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
> **Estado agora:** Fase 3 · Sprint N/A · Task N/A `[ ]`
> **Próximo passo imediato:** Gerar o sprints_plan.md (Planejamento de Sprints).
> **Branch de trabalho:** main
> **⚠️ Se houver task `[~]`:** pode ter sido interrompida no meio — rode o gate e reverifique o estado real antes de marcar `[x]`.

---

## Estado

- **Fase atual:** 5 (Fechamento)
- **Sprint atual:** 1 (Finalizada)
- **Task atual:** Concluído
- **Última atualização:** 2026-07-23

## Ambiente detectado (Fase 0) — revalidar em toda sessão longa

> Anotação de ambiente tem prazo de validade. Uma restrição registrada e nunca revalidada
> guiou decisões erradas por dias no projeto anterior. Se mudou, **corrija aqui**, não contorne.

- **Subagentes:** Disponíveis (research e self nativos do modelo; usarei papéis em turnos ou `self` configurado se necessário).
- **Execução de código/testes:** Disponível via CLI do Node.js.
- **Browser/screenshots:** Indisponível (fallback: aprovação baseada em mockups em código e testes automatizados sem análise visual pelo agente, UI/UX por E2E text/playwright em CLI sem GUI).
- **Geração de imagem:** Disponível via `generate_image`.
- **Runtime de container / banco real:** **Docker não encontrado** no host (fallback: desenvolvimento e dependências serão focadas em Node/NPM. Usaremos banco embutido ou remoto, nada de Compose local por enquanto).
- **Gerenciador de pacotes (binário e PATH):** `npm` (v11.12.1) - OK.
- **Versões de runtime:** `node` (v24.15.0) - OK.
- **Git:** v2.39.5 - OK.

## Gate objetivo do projeto (rodar ANTES de gastar QA)

```
1. npm install (garantir dependências)
2. typecheck (tsc --noEmit)          # etapa PRÓPRIA — o transpilador de teste apaga tipos
3. lint (eslint)
4. format:check (prettier)
5. testes unitários
6. testes de integração   # em TODA task, não só nas de "integração"
7. build do projeto frontend
```

Comandos reais deste projeto:
```bash
npm run typecheck # (se usarmos typescript para configs do vite)
npm run lint
npm run test
npm run build
```

## Política de QA

- Risco `alto` → enxame completo (UI/UX é N/A em task de backend/schema puro).
- Risco `médio` → QAs relevantes ao tema.
- Risco `baixo` → Architecture QA.
- Aprova só sem bloqueantes. Sugestão vira backlog **com motivo e gatilho**.
- **Árvore congelada durante os laudos**: não corrigir enquanto outro QA ainda roda.

## Controle de versão

- Quem pode commitar: A definir com o usuário.
- Branch por sprint: A definir.
- **Agente gerador NÃO commita** (default). Deixa modificado no disco; o Manager revisa o diff.

---

## ⭐ REQUISITOS HERDADOS (achados de QA que são requisito de uma task FUTURA)

> Não é backlog. É critério de aceitação de uma task que ainda não começou.
> Cada linha também é colada na task alvo, dentro do `sprints_plan.md` — quem for
> escrever aquela task não vai ler o laudo de hoje.


---

## 🧾 BACKLOG TÉCNICO (com motivo e gatilho)

> Sugestão sem gatilho é dívida escondida. Reveja esta lista no início de cada sprint:
> se o conserto ficou mais caro porque outra task construiu em cima, ele deixou de ser backlog.


---

## ⚠️ ARMADILHAS ESPECÍFICAS DESTE PROJETO

> Registre aqui o que é verdade **neste** repositório e não está no `licoes_aprendidas.md`.

- Sem Docker local: testar serviços dependentes exigirá mocks pesados ou banco embutido (ex. SQLite).

---

## Decisões do Manager

> Toda lacuna resolvida sem o usuário vira uma linha aqui, com o raciocínio e a alternativa
> descartada. Em modo autônomo isto é o que torna as decisões auditáveis depois.


---

## Log de sprints

