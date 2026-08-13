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

  const formalizeInitialAnalysis = () => {
    const scenario = document.querySelector('.scenario-reworked');
    if (!scenario) return false;

    const eyebrow = scenario.querySelector('.scenario-intro .eyebrow');
    const title = scenario.querySelector('.scenario-intro h2');
    const lead = scenario.querySelector('.scenario-lead');
    const questionTitle = scenario.querySelector('.scenario-question strong');
    const questionText = scenario.querySelector('.scenario-question span');
    const cards = scenario.querySelectorAll('.scenario-summary-card');

    if (eyebrow) eyebrow.textContent = 'Delimitação inicial';
    if (title) title.textContent = 'A descrição da tarefa ainda não constitui uma representação computacional';
    if (lead) {
      lead.textContent = 'A instrução “levar o robô ao laboratório” expressa o problema em linguagem natural. Para que um algoritmo possa operar sobre essa situação, é necessário explicitar quais elementos do domínio serão representados, quais transformações são permitidas e como reconhecer que o objetivo foi alcançado.';
    }
    if (questionTitle) questionTitle.textContent = 'Antes de buscar uma solução, é necessário formular o problema de modo operacional.';
    if (questionText) {
      questionText.textContent = 'Isso implica definir estados, ações, transições, restrições e uma condição de objetivo verificável. Somente depois é possível escolher uma estratégia para explorar o espaço de possibilidades.';
    }

    if (cards.length >= 3) {
      cards[0].innerHTML = `
        <small>01 · Delimitação da tarefa</small>
        <h3>Qual é o problema a resolver?</h3>
        <p>O robô inicia na <strong>Recepção</strong> e deve alcançar o <strong>Laboratório</strong>, utilizando apenas conexões permitidas entre os ambientes.</p>
      `;

      cards[1].innerHTML = `
        <small>02 · Elementos do domínio</small>
        <h3>Quais elementos são relevantes?</h3>
        <p>O cenário é composto por ambientes e conexões que determinam as possibilidades de deslocamento do robô.</p>
      `;

      cards[2].innerHTML = `
        <small>03 · Estrutura necessária</small>
        <h3>A descrição ainda não é um modelo</h3>
        <p>Ainda precisamos explicitar <strong>estado</strong>, <strong>estado inicial</strong>, <strong>ações</strong>, <strong>transições</strong>, <strong>restrições</strong>, <strong>objetivo</strong>, <strong>teste de objetivo</strong> e <strong>critério de sucesso</strong>.</p>
      `;
    }

    return true;
  };

  if (!formalizeInitialAnalysis()) {
    let attempts = 0;
    const waitForScenario = () => {
      attempts += 1;
      if (formalizeInitialAnalysis() || attempts >= 20) return;
      requestAnimationFrame(waitForScenario);
    };
    requestAnimationFrame(waitForScenario);
  }

  const syncWarmupMapTheme = () => {
    const image = document.querySelector('.warmup-map-figure img');
    if (!image) return false;

    const lightSrc = 'assets/aula-03-mapa-light.svg';
    const darkSrc = 'assets/aula-03-mapa.svg';
    image.dataset.lightSrc = lightSrc;
    image.dataset.darkSrc = darkSrc;
    image.alt = 'Mapa simplificado com Recepção, Corredor, Laboratório, Sala 101, Sala 102, Banheiro, Copa, Almoxarifado e Sala de Reunião. A Recepção é o estado inicial e o Laboratório é o destino.';

    const nextSrc = document.body.classList.contains('theme-dark') ? darkSrc : lightSrc;
    if (image.getAttribute('src') !== nextSrc) image.setAttribute('src', nextSrc);
    return true;
  };

  if (!document.getElementById('aula03-map-theme-styles')) {
    const mapStyle = document.createElement('style');
    mapStyle.id = 'aula03-map-theme-styles';
    mapStyle.textContent = `
      body:not(.theme-dark) .warmup-map-figure {
        border-color: var(--line);
        background: #ffffff;
        box-shadow: 0 12px 30px rgba(35,50,78,.06);
      }
      body.theme-dark .warmup-map-figure {
        border-color: rgba(255,255,255,.12);
        background: rgba(255,255,255,.045);
        box-shadow: none;
      }
    `;
    document.head.appendChild(mapStyle);
  }

  if (!syncWarmupMapTheme()) {
    let attempts = 0;
    const waitForMap = () => {
      attempts += 1;
      if (syncWarmupMapTheme() || attempts >= 20) return;
      requestAnimationFrame(waitForMap);
    };
    requestAnimationFrame(waitForMap);
  }

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
    formalizeInitialAnalysis();
    harmonizeFinalStages();
    syncWarmupMapTheme();
    const activityScript = [...document.scripts].find((script) => script.src.includes('aula-03-atividade.js'));
    if (activityScript) activityScript.addEventListener('load', harmonizeFinalStages, { once: true });
    requestAnimationFrame(() => {
      formalizeInitialAnalysis();
      harmonizeFinalStages();
    });
  });
  document.head.appendChild(original);
})();