# Plano de Sprints — Thaís Neves (Avaliação Neuropsicológica)

> Gerado pelo **Planner** a partir de `master_architecture_and_plan.md`.
> **Os checkboxes deste arquivo são a fonte de verdade do progresso.**
> Legenda: `[ ]` pendente · `[~]` em andamento · `[x]` concluída e APROVADA pelo QA.
>
> Uma task só recebe `[x]` depois de: gate objetivo verde → laudo APROVADO do QA
> correspondente ao risco → requisitos herdados registrados → backlog registrado com gatilho.

---

## Sprint 1 — Landing Page Completa

**Objetivo da sprint:** Setup do projeto, componentização visual e implementação de 100% da landing page (Single Page) pronta para publicação.
**Depende de:** nada

### `[x]` S1-T1 — Setup da Infraestrutura e Design System

**Descrição:** Inicialização do projeto Vite (Vanilla JS/CSS), setup de lint/formatação e criação do `main.css` com as variáveis de Design Tokens da Bíblia (cores, fontes e utilitários base).

**Regras de negócio tocadas:** N/A (Estrutural)

**Critérios de aceitação:**
- [ ] O projeto sobe com `npm run dev` sem erros.
- [ ] `main.css` inclui `--bg-warm`, `--brand-green`, etc.
- [ ] Fontes `Playfair Display` e `DM Sans` carregadas.
- [ ] Comandos de lint, typecheck e build configurados no package.json.

**Requisitos herdados:** _(o Manager preenche a partir dos laudos de sprints anteriores)_
> —

**Risco:** `baixo`
**QA correspondente:** Architecture

---

### `[x]` S1-T2 — Implementação: Hero Section e Estrutura Global

**Descrição:** Criação do `index.html` básico (SEO tags), Header com logo/menu, e a Hero Section (assimetria, CTA primário) e barra flutuante de WhatsApp.

**Regras de negócio tocadas:** RN-01 (Triagem via WhatsApp)

**Critérios de aceitação:**
- [ ] Botão de "Agendar Avaliação" aponta para um link `wa.me` com mensagem inicial (RN-01).
- [ ] Layout segue a assimetria visual (`200px 200px 24px 24px` na imagem).
- [ ] Acessibilidade (contraste das cores verdes no fundo bege passa AA/AAA).
- [ ] Responsividade: Hero stacka corretamente no celular.

**Requisitos herdados:** 
> —

**Risco:** `médio`
**QA correspondente:** UI/UX + Architecture

---

### `[x]` S1-T3 — Implementação: Públicos e Como Funciona

**Descrição:** Implementação da seção de faixas etárias ("Avaliação para todas as idades") e da timeline "Um processo cuidadoso e individualizado" (5 etapas).

**Regras de negócio tocadas:** RN-02 (Clareza de Público)

**Critérios de aceitação:**
- [ ] Cards de Infantil, Adolescentes, Adultos e Idosos claramente segmentados (RN-02).
- [ ] Timeline construída com CSS puro (flex/grid) mantendo respiro e alinhamento em todas as resoluções.
- [ ] Nenhum texto menciona terapia contínua, reforçando que são passos de *avaliação*.

**Requisitos herdados:** 
> —

**Risco:** `médio`
**QA correspondente:** UI/UX + Architecture

---

### `[x]` S1-T4 — Implementação: Sobre Mim, Footer e LGPD

**Descrição:** Implementação da seção Sobre Mim (Thaís Neves com bullet points), área de Depoimentos, Footer com política de privacidade e informações de contato.

**Regras de negócio tocadas:** RN-03 (Política de Privacidade LGPD)

**Critérios de aceitação:**
- [ ] Footer contém link para "Política de Privacidade" visível (RN-03) — pode ser um modal simples contendo texto placeholder inicial.
- [ ] Dados de Três Lagoas e horários alinhados e legíveis.
- [ ] Todos os links sociais e de WhatsApp funcionando corretamente.

**Requisitos herdados:** 
> —

**Risco:** `médio`
**QA correspondente:** SecOps (para a LGPD/Consent) + UI/UX + Architecture

---

## Checklist de revisão do plano (Manager, ao final da Fase 3)

- [x] Toda task de UI tem o endpoint que consome criado por uma task **anterior**. *(N/A - Sem backend)*
- [x] Toda RN da Bíblia tem task que a implementa **e** task/critério que a testa. *(RN-01 em T2, RN-02 em T3, RN-03 em T4)*
- [x] Fundações compartilhadas (auth, auditoria, data/fuso, transações e locks, kit de componentes) vêm **cedo**. *(Design System em T1)*
- [x] Existe task explícita para subir a aplicação pelo **caminho real de produção** antes do fim do MVP. *(`npm run build` testado no gate de toda task)*
- [x] Nenhuma task é "escrever os testes" — testes são parte de cada task.
- [x] As lacunas que o Planner apontou na Bíblia foram resolvidas ou registradas no `progress.md`.
