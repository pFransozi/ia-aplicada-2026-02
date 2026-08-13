(() => {
  const description = document.querySelector('#percurso .section-heading p:last-child');
  if (description) description.remove();

  const journeyLabels = [
    'Especificação do problema',
    'Abstração do domínio',
    'Formulação do problema',
    'Representação computacional',
    'Espaço de estados',
    'Validação do modelo'
  ];

  document.querySelectorAll('#percurso .journey a strong').forEach((label, index) => {
    if (journeyLabels[index]) label.textContent = journeyLabels[index];
  });

  const original = document.createElement('script');
  original.src = 'aula-03-representacao-base.js';
  original.async = false;
  document.head.appendChild(original);
})();
