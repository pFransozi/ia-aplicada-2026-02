(() => {
  // Mantém a referência esperada pela validação do GitHub Pages: -dark.png
  const loaderScript = document.currentScript;
  const baseScript = document.createElement('script');
  baseScript.src = loaderScript?.src
    ? new URL('script-base.js', loaderScript.src).href
    : 'script-base.js';
  baseScript.async = false;

  baseScript.addEventListener('load', () => {
    const isAula02 = window.location.pathname.endsWith('/aula-02.html') || window.location.pathname.endsWith('aula-02.html');
    if (!isAula02) return;

    const inquiry = [...document.querySelectorAll('#problemas .inquiry')]
      .find((item) => item.querySelector('h3')?.textContent.trim() === 'Este problema realmente precisa de IA?');
    if (!inquiry) return;

    const content = inquiry.querySelector('.inquiry-body')?.firstElementChild;
    if (!content) return;

    const intro = content.querySelector(':scope > p');
    if (intro) {
      intro.textContent = 'Escolha dois cenários e compare uma solução de IA com uma alternativa mais simples. Ao comparar as opções, considere a complexidade do problema, a clareza das regras, a disponibilidade de dados, a necessidade de adaptação, o custo do erro, a explicabilidade, a privacidade, o impacto sobre pessoas e a possibilidade de validação.';
    }

    content.querySelector('.teacher-note')?.remove();
  });

  document.head.appendChild(baseScript);
})();
