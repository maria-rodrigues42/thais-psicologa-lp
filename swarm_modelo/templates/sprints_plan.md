# Plano de Sprints — <NOME DO PROJETO>

> Gerado pelo **Planner** a partir de `master_architecture_and_plan.md`.
> **Os checkboxes deste arquivo são a fonte de verdade do progresso.**
> Legenda: `[ ]` pendente · `[~]` em andamento · `[x]` concluída e APROVADA pelo QA.
>
> Uma task só recebe `[x]` depois de: gate objetivo verde → laudo APROVADO do QA
> correspondente ao risco → requisitos herdados registrados → backlog registrado com gatilho.

---

## Sprint 1 — <título>

**Objetivo da sprint:** <o que existe no fim que não existia no começo>
**Depende de:** <sprints anteriores / nada>

### `[ ]` S1-T1 — <título curto>

**Descrição:** <objetiva, uma ou duas frases>

**Regras de negócio tocadas:** RN-01, RN-03

**Critérios de aceitação:**
- [ ] <verificável — alguém consegue dizer sim/não sem interpretar>
- [ ] <inclua o comportamento de erro esperado, não só o caminho feliz>
- [ ] Testes cobrindo as RNs acima, **nomeados pela RN**.

**Requisitos herdados:** _(o Manager preenche a partir dos laudos de sprints anteriores)_
> —

**Risco:** `baixo` | `médio` | `alto`
**QA correspondente:** <Architecture> | <SecOps + Architecture> | <enxame completo>

---

### `[ ]` S1-T2 — <título curto>

...

---

## Checklist de revisão do plano (Manager, ao final da Fase 3)

- [ ] Toda task de UI tem o endpoint que consome criado por uma task **anterior**.
- [ ] Toda RN da Bíblia tem task que a implementa **e** task/critério que a testa.
- [ ] Fundações compartilhadas (auth, auditoria, data/fuso, transações e locks, kit de componentes) vêm **cedo**.
- [ ] Existe task explícita para subir a aplicação pelo **caminho real de produção** antes do fim do MVP.
- [ ] Nenhuma task é "escrever os testes" — testes são parte de cada task.
- [ ] As lacunas que o Planner apontou na Bíblia foram resolvidas ou registradas no `progress.md`.
