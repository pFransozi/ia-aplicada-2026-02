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

  const applyAula02Adjustments = () => {
    if (!isAula02()) return;
    simplifyAiDecision();
    simplifyContemporaryApplication();
    removeKnowledgeExit();
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
