(() => {
  const description = document.querySelector('#percurso .section-heading p:last-child');
  if (description) description.remove();

  const journeyLabels = [
    'Definição do problema',
    'Abstração do domínio',
    'Formulação do problema',
    'Representação computacional',
    'Espaço de estados',
    'Validação do modelo'
  ];

  document.querySelectorAll('#percurso .journey a strong').forEach((label, index) => {
    if (journeyLabels[index]) label.textContent = journeyLabels[index];
  });

  const stageEyebrows = [
    ['#aquecimento .warmup .eyebrow', '01 · Definição do problema'],
    ['#abstracao .section-heading .eyebrow', '02 · Abstração do domínio'],
    ['#formulacao .section-heading .eyebrow', '03 · Formulação do problema'],
    ['#codigo .section-heading .eyebrow', '04 · Representação computacional'],
    ['#espaco .section-heading .eyebrow', '05 · Espaço de estados']
  ];

  stageEyebrows.forEach(([selector, text]) => {
    const eyebrow = document.querySelector(selector);
    if (eyebrow) eyebrow.textContent = text;
  });

  const harmonizeFinalStages = () => {
    const validationEyebrow = document.querySelector('#representacao .section-heading .eyebrow');
    if (validationEyebrow) validationEyebrow.textContent = '06 · Validação do modelo';

    const activityEyebrow = document.querySelector('#atividade .section-heading .eyebrow');
    if (activityEyebrow) activityEyebrow.textContent = 'Aplicação integrada';

    const activityTitle = document.querySelector('#atividade .section-heading h2');
    if (activityTitle) activityTitle.textContent = 'Percorra o ciclo completo em um novo problema';

    const activityDescription = document.querySelector('#atividade .section-heading p:last-child');
    if (activityDescription) {
      activityDescription.textContent = 'Escolha um caso e aplique novamente as seis etapas trabalhadas na aula: definir o problema, abstrair o domínio, formular o modelo, construir uma representação computacional, explicitar o espaço de estados e validar se a representação é suficiente. A IA generativa entra somente depois, para comparação e crítica.';
    }
  };

  const original = document.createElement('script');
  original.src = 'aula-03-representacao-base.js';
  original.async = false;
  original.addEventListener('load', () => {
    harmonizeFinalStages();
    const activityScript = [...document.scripts].find((script) => script.src.includes('aula-03-atividade.js'));
    if (activityScript) activityScript.addEventListener('load', harmonizeFinalStages, { once: true });
    requestAnimationFrame(harmonizeFinalStages);
  });
  document.head.appendChild(original);
})();
