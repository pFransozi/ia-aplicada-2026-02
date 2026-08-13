(() => {
  const description = document.querySelector('#percurso .section-heading p:last-child');
  if (description) description.remove();
  const original = document.createElement('script');
  original.src = 'aula-03-representacao-base.js';
  original.async = false;
  document.head.appendChild(original);
})();
