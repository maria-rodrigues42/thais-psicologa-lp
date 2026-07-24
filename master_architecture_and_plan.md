# Thaís Neves - Avaliação Neuropsicológica — Arquitetura e Plano Mestre (a "Bíblia")

> **Fonte da verdade do projeto.** Em caso de conflito com qualquer outro documento, código ou
> opinião de agente, este arquivo vence. Se algo precisa mudar, **atualize aqui antes de codar**.

---

## 1. Resumo e público-alvo

Landing Page focada em conversão para a neuropsicóloga Thaís Neves. O objetivo é captar pacientes (crianças, adolescentes, adultos e idosos) que precisam de avaliação neuropsicológica (encaminhados por escolas, médicos ou busca própria). O acesso será majoritariamente mobile (celulares), exigindo foco em alvos de toque grandes e carregamento rápido.

## 2. Pilares e Anti-Goals

**Pilares — o que o app é:**
- 100% focado em **Avaliação Neuropsicológica** pautada em evidências.
- **Design quente e acolhedor**: assimetria e tipografia humana para fugir do "padrão clínica fria".
- **Comunicação empática e direta**: explica o processo de avaliação sem jargões.

**Anti-Goals — o que o app NÃO é sob nenhuma hipótese:**
- Não oferece nem menciona psicoterapia contínua.
- Não é um sistema de autoagendamento online de consultas (o agendamento será sempre concluído com triagem humana via WhatsApp).

## 3. Escopo do MVP

**Dentro:**
- Landing Page (Single Page Application) responsiva.
- Hero Section com forte apelo visual (foto, promessa, benefícios chave).
- Seção de Serviços separados por idade (Infantil, Adolescentes, Adultos, Idosos).
- Seção "Como funciona" detalhando as 5 etapas da avaliação.
- Seção "Sobre mim" (credenciais).
- Seção de Depoimentos.
- Footer e botão flutuante para contato via WhatsApp.
- Página simples/Modal para Política de Privacidade (LGPD).

**Fora (explicitamente adiado):**
- Blog/Artigos.
- Área do paciente / Login.
- Pagamentos integrados.

## 4. Regras de negócio (numeradas)

| ID | Regra | Consequência de violar |
|---|---|---|
| RN-01 | **Triagem via WhatsApp:** Todo CTA de agendamento deve apontar para um link de WhatsApp com mensagem pré-preenchida, nunca para um calendário de agendamento autônomo. | Usuário pode agendar para terapia em vez de avaliação, ou a profissional perde o controle da triagem. |
| RN-02 | **Clareza de Público:** As quatro faixas etárias (Infantil, Adolescentes, Adultos e Idosos) devem estar claramente separadas na UI, pois a natureza da avaliação muda drasticamente. | Confusão do paciente sobre se a clínica atende o caso dele. |
| RN-03 | **Política de Privacidade (LGPD):** O site deve conter acesso claro à Política de Privacidade, dado que o site lida com direcionamento de saúde. | Risco de conformidade com LGPD. |

**Áreas com valor jurídico/probatório** (rigor elevado, retrofit caro — decida agora):
- Apenas a LGPD (Política de Privacidade) e o link transparente para contato.

## 5. Identidade visual

- **Paleta (hex):** 
  - `--bg-warm`: `#FAF7F2` (fundo geral e respiros)
  - `--bg-surface`: `#FFFFFF` (fundo de cartões)
  - `--brand-green`: `#29483A` (botões e títulos principais)
  - `--brand-green-hover`: `#1E372C`
  - `--brand-accent`: `#B28B72` (ícones e destaques)
  - `--text-main`: `#2D2D2D` (textos, alto contraste)
  - `--text-muted`: `#5E5E5E` (textos de apoio)
- **Tipografia e escala:**
  - Títulos: `Playfair Display` (Serif)
  - Corpo: `DM Sans` (Sans-serif)
- **Espaçamento e raio:** Raios de `12px` em cartões e `100px` em botões. Assimetria no border-radius de imagens (ex: `200px 200px 24px 24px`).
- **Alvo de toque mínimo:** `48px` para todos os links e botões (Mobile-first).
- **Proibições (travas, não preferências):** 
  - NENHUM dark mode (tema escuro) no projeto; a paleta clara e quente é inegociável.
  - O verde não deve ser usado como cor de sucesso (OK), mas apenas como cor de marca. 

## 6. Stack

| Camada | Escolha | Por quê |
|---|---|---|
| Estrutura | HTML5 Semântico | Máxima acessibilidade e SEO; complexidade de framework como React é desnecessária para Landing Page. |
| Estilização | Vanilla CSS (CSS Variables) | Evita "cara de template" do Tailwind, garante total controle da assimetria e design system focado no anti-template-ui. |
| Lógica | JavaScript Vanilla | Manipulação simples de DOM (modais, validação de form se houver). |
| Build/Bundler | Vite | Para otimização de assets (imagens, minificação) e dev server. |

**Decisões de plataforma que amarram o resto:** A escolha de não usar framework JS mantém o site extremamente rápido e barato de hospedar.

## 7. Arquitetura

- **Camadas e módulos:** Módulos CSS separados por componente (`hero.css`, `services.css`, etc.) importados num `main.css`.
- **Estratégia de Roteamento:** Anchor links (scroll suave) dentro da própria página.

## 8. Estratégia de testes

- **Unitário:** Testes unitários para qualquer lógica JS (ex: formatador de URL de WhatsApp).
- **Integração:** Não aplicável (sem backend real).
- **E2E:** Playwright E2E para verificar carregamento, navegação via scroll, e presença do número correto de WhatsApp no link.
- **Piso de cobertura:** 100% no código JS que houver.

## 9. Definition of Done

Toda task só é aprovada se:
1. **Gate objetivo 100% verde:** lint HTML/CSS → JS (se aplicável) → testes.
2. Cobertura ≥ piso (quando houver JS).
3. Sem regressão visual drástica na UI medida.
4. Laudo **APROVADO** do QA (revisão de UI/UX baseada no design protocol).

## 10. Ambiente e execução

- **Como rodar em desenvolvimento:** `npm run dev` (Vite)
- **Como subir pelo caminho real (compose/deploy):** `npm run build` e servir a pasta `/dist` (SSG estático).
