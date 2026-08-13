/* Preserva a harmonização existente e acrescenta o refinamento didático. */
(() => {
  const base = document.createElement('script');
  base.src = 'aula-03-representacao-base.js';
  base.async = false;
  base.addEventListener('load', () => {
    const enhancement = document.createElement('script');
    enhancement.src = 'aula-03-codigo-simulador.js';
    enhancement.async = false;
    document.head.appendChild(enhancement);
  }, { once: true });
  document.head.appendChild(base);
})();
