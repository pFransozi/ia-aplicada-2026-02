(() => {
  // Mantém a referência esperada pela validação do GitHub Pages: -dark.png
  const isAula02 = () =>
    window.location.pathname.endsWith('/aula-02.html') ||
    window.location.pathname.endsWith('aula-02.html');

  const findInquiry = (title) =>
    [...document.querySelectorAll('.inquiry')].find(
      (item) => item.querySelector('h3')?.textContent.trim() === title
    );

  const simplifyAiDecision = () => {
    const inquiry = findInquiry('Este problema realmente precisa de IA?');
    if (!inquiry) return;

    const body = inquiry.querySelector('.inquiry-body');
    const content = body?.firstElementChild;
    if (!body || !content) return;

    body.classList.add('inquiry-body-single');
    body.querySelector(':scope > .worksheet')?.remove();

    const intro = content.querySelector(':scope > p');
    if (intro) {
      intro.textContent = 'Escolha dois cenários e compare uma solução de IA com uma alternativa mais simples. Ao comparar as opções, considere a complexidade do problema, a clareza das regras, a disponibilidade de dados, a necessidade de adaptação, o custo do erro, a explicabilidade, a privacidade, o impacto sobre pessoas e a possibilidade de validação.';
    }

    content.querySelectorAll('.teacher-note').forEach((note) => note.remove());
  };

  const simplifyContemporaryApplication = () => {
    const inquiry = findInquiry('Mapeie uma aplicação contemporânea');
    if (!inquiry) return;

    const body = inquiry.querySelector('.inquiry-body');
    const content = body?.firstElementChild;
    if (!body || !content) return;

    body.classList.add('inquiry-body-single');
    body.querySelector(':scope > .worksheet')?.remove();

    const intro = content.querySelector(':scope > p');
    if (intro) {
      intro.textContent = 'Escolha uma aplicação atual de IA em uma área de interesse do grupo. Na investigação, identifique a tendência tecnológica envolvida e analise seus benefícios, limitações, riscos e impactos, mobilizando H11 ao reconhecer tendências e H43/H45 ao analisar cenários e avaliar criticamente a aplicação.';
    }

    content.querySelectorAll('.teacher-note').forEach((note) => note.remove());
  };

  const removeKnowledgeExit = () => {
    document.querySelector('#fechamento .knowledge-exit')?.remove();
  };

  const improveDarkAgentDiagram = () => {
    if (document.getElementById('aula02-dark-agent-adjustments')) return;

    const style = document.createElement('style');
    style.id = 'aula02-dark-agent-adjustments';
    style.textContent = `
      body.theme-dark #agentes .agent-flow {
        background: #111827;
        border-color: #2d3a54;
        box-shadow: 0 14px 34px rgba(0, 0, 0, .20);
      }

      body.theme-dark #agentes .agent-node {
        background: #111a2b;
        border-color: #33415e;
        color: #f4f7ff;
        box-shadow: none;
      }

      body.theme-dark #agentes .agent-node.interface {
        background: #141f33;
        border-color: #354665;
      }

      body.theme-dark #agentes .agent-core {
        background: linear-gradient(145deg, #34466f, #4b4278);
        border: 1px solid rgba(151, 165, 232, .20);
        box-shadow: 0 14px 30px rgba(0, 0, 0, .28);
        color: #f8faff;
      }

      body.theme-dark #agentes .agent-core-steps span {
        background: #293755;
        border-color: #46577d;
        color: #f4f7ff;
      }

      body.theme-dark #agentes .agent-arrow {
        color: #7f99e8;
      }

      body.theme-dark #agentes .feedback-line {
        background: linear-gradient(90deg, #4f7fc4, #7087dc);
        opacity: .82;
      }

      body.theme-dark #agentes .feedback-arrow {
        color: #5f8fd2;
      }

      body.theme-dark #agentes .agent-loop {
        background: #111a2b;
        border: 1px solid #28364f;
        color: #9eacc2;
      }
    `;
    document.head.appendChild(style);
  };

  const improveLightMode = () => {
    if (document.getElementById('aula02-light-mode-adjustments')) return;

    const style = document.createElement('style');
    style.id = 'aula02-light-mode-adjustments';
    style.textContent = `
      /* O modo claro deve permanecer claro também nos blocos de destaque. */
      body:not(.theme-dark) #aquecimento .warmup {
        background: linear-gradient(135deg, #f6f8ff 0%, #eef6fb 100%);
        border: 1px solid #dce4f1;
        box-shadow: 0 14px 32px rgba(35, 50, 78, .06);
        color: var(--ink);
      }

      body:not(.theme-dark) #aquecimento .warmup p {
        color: var(--muted);
      }

      body:not(.theme-dark) #aquecimento .warmup .eyebrow {
        color: var(--blue) !important;
      }

      body:not(.theme-dark) #aquecimento .question-cloud div {
        background: rgba(255, 255, 255, .86);
        border-color: #dce4f1;
        color: var(--ink);
      }

      body:not(.theme-dark) #aplicacoes.section-dark {
        background: var(--soft);
        color: var(--ink);
      }

      body:not(.theme-dark) #aplicacoes.section-dark p {
        color: var(--muted);
      }

      body:not(.theme-dark) #aplicacoes.section-dark .eyebrow {
        color: var(--blue);
      }

      body:not(.theme-dark) #aplicacoes .application-card {
        background: #ffffff;
        border: 1px solid var(--line);
        box-shadow: 0 12px 28px rgba(35, 50, 78, .055);
        color: var(--ink);
      }

      body:not(.theme-dark) #aplicacoes .application-card p {
        color: var(--muted);
      }

      body:not(.theme-dark) #aplicacoes .application-card span {
        color: var(--blue);
      }

      body:not(.theme-dark) #riscos .big-question {
        background: linear-gradient(135deg, var(--blue-soft), var(--violet-soft));
        border: 1px solid #cbd6ff;
        box-shadow: 0 12px 28px rgba(49, 87, 213, .06);
        color: var(--ink);
      }

      body:not(.theme-dark) .protocol article {
        background: #ffffff;
        border-color: var(--line);
        color: var(--ink);
      }

      body:not(.theme-dark) .protocol h3 {
        color: var(--ink);
      }

      body:not(.theme-dark) .protocol article::before {
        color: var(--blue);
      }

      body:not(.theme-dark) .site-footer {
        background: #ffffff;
        border-top: 1px solid var(--line);
        color: var(--ink);
      }

      body:not(.theme-dark) .site-footer p {
        color: var(--muted);
      }

      body:not(.theme-dark) .site-footer a {
        color: var(--blue);
      }
    `;
    document.head.appendChild(style);
  };

  const applyAula02Adjustments = () => {
    if (!isAula02()) return;
    simplifyAiDecision();
    simplifyContemporaryApplication();
    removeKnowledgeExit();
    improveDarkAgentDiagram();
    improveLightMode();
  };

  applyAula02Adjustments();
  document.addEventListener('DOMContentLoaded', applyAula02Adjustments);

  const loaderScript = document.currentScript;
  const baseScript = document.createElement('script');
  baseScript.src = loaderScript?.src
    ? new URL('script-base.js', loaderScript.src).href
    : 'script-base.js';
  baseScript.async = false;
  baseScript.addEventListener('load', applyAula02Adjustments);
  document.head.appendChild(baseScript);
})();
