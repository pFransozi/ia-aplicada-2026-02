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

  const scenario = document.querySelector('.scenario-reworked');
  if (scenario) {
    const eyebrow = scenario.querySelector('.scenario-intro .eyebrow');
    const title = scenario.querySelector('.scenario-intro h2');
    const lead = scenario.querySelector('.scenario-lead');
    const questionTitle = scenario.querySelector('.scenario-question strong');
    const questionText = scenario.querySelector('.scenario-question span');
    const cards = scenario.querySelectorAll('.scenario-summary-card');

    if (eyebrow) eyebrow.textContent = 'Delimitação inicial';
    if (title) title.textContent = 'A descrição da tarefa ainda não constitui uma representação computacional';
    if (lead) lead.textContent = 'A instrução “levar o robô ao laboratório” expressa o problema em linguagem natural. Para que um algoritmo possa operar sobre essa situação, é necessário explicitar quais elementos do domínio serão representados, quais transformações são permitidas e como reconhecer que o objetivo foi alcançado.';
    if (questionTitle) questionTitle.textContent = 'Antes de buscar uma solução, é necessário formular o problema de modo operacional.';
    if (questionText) questionText.textContent = 'Isso implica definir estados, ações, transições, restrições e uma condição de objetivo verificável. Somente depois é possível escolher uma estratégia para explorar o espaço de possibilidades.';

    if (cards.length >= 3) {
      cards[0].innerHTML = '<small>01 · Delimitação da tarefa</small><h3>Qual é o problema a resolver?</h3><p>O robô inicia na <strong>Recepção</strong> e deve alcançar o <strong>Laboratório</strong>, utilizando apenas conexões permitidas entre os ambientes.</p>';
      cards[1].innerHTML = '<small>02 · Elementos do domínio</small><h3>Quais elementos são relevantes?</h3><p>O cenário é composto por ambientes e conexões que determinam as possibilidades de deslocamento do robô.</p>';
      cards[2].innerHTML = '<small>03 · Estrutura necessária</small><h3>A descrição ainda não é um modelo</h3><p>Ainda precisamos explicitar <strong>estado</strong>, <strong>estado inicial</strong>, <strong>ações</strong>, <strong>transições</strong>, <strong>restrições</strong>, <strong>objetivo</strong>, <strong>teste de objetivo</strong> e <strong>critério de sucesso</strong>.</p>';
    }
  }

  const mapImage = document.querySelector('.warmup-map-figure img');
  if (mapImage) {
    const lightSrc = 'assets/aula-03-mapa-light.svg';
    const darkSrc = 'assets/aula-03-mapa.svg';
    mapImage.dataset.lightSrc = lightSrc;
    mapImage.dataset.darkSrc = darkSrc;
    mapImage.alt = 'Mapa simplificado com Recepção, Corredor, Laboratório, Sala 101, Sala 102, Banheiro, Copa, Almoxarifado e Sala de Reunião. A Recepção é o estado inicial e o Laboratório é o destino.';
    mapImage.src = document.body.classList.contains('theme-dark') ? darkSrc : lightSrc;
  }

  const abstractionInquiry = document.querySelector('#abstracao .abstraction-challenge');
  if (abstractionInquiry) {
    abstractionInquiry.innerHTML = `
      <div class="inquiry-head">
        <div>
          <span class="inquiry-kicker">Análise de impacto na representação</span>
          <h3>Uma nova restrição altera quais componentes do modelo?</h3>
        </div>
        <span class="inquiry-tag">Reformule e justifique</span>
      </div>
      <div class="inquiry-body inquiry-body-single">
        <div>
          <div class="challenge-change">
            <small>Mudança no requisito</small>
            <p>O robô precisa chegar ao <strong>Laboratório</strong>, mas não pode entrar em ambientes cuja <strong>temperatura seja superior a 30 °C</strong>.</p>
          </div>
          <p class="challenge-context"><strong>Objetivo da atividade:</strong> analise o impacto da nova condição sobre a abstração anterior. Não reconstrua todo o modelo; identifique precisamente o que precisa ser modificado e o que pode ser preservado.</p>
          <ol class="prompt-list">
            <li><strong>Relevância da informação.</strong> Explique por que a temperatura, antes descartada, passa a influenciar a validade de uma solução.</li>
            <li><strong>Decisão de modelagem.</strong> Determine se a temperatura deve ser tratada como atributo do ambiente, informação do estado, restrição sobre uma transição ou combinação desses elementos. Justifique considerando se ela é fixa ou pode variar durante a execução.</li>
            <li><strong>Regra de transição.</strong> Formule, em linguagem natural ou notação lógica, as condições que tornam válido o deslocamento para um ambiente vizinho. Considere, no mínimo, conectividade e temperatura.</li>
            <li><strong>Consistência do modelo.</strong> Indique quais componentes anteriores permanecem válidos — como estado inicial, objetivo e estrutura de conexões — e quais precisam ser ampliados ou reinterpretados.</li>
          </ol>
          <div class="abstraction-takeaway" style="margin:1.25rem 0 0">
            <strong>Resultado esperado</strong>
            <span>O grupo deve apresentar uma versão revisada do modelo e justificar cada alteração com base no novo requisito, evitando incluir informações que não afetam a resolução do problema.</span>
          </div>
        </div>
      </div>
      <div class="abstraction-takeaway">
        <strong>Princípio de modelagem</strong>
        <span>Uma mudança de requisito pode alterar a abstração, as restrições e a função de transição sem exigir que todo o modelo seja reconstruído. A representação deve conter apenas as informações necessárias para distinguir situações relevantes e validar ações possíveis.</span>
      </div>
    `;
  }

  const formulation = document.querySelector('#formulacao');
  const formulationHeading = formulation?.querySelector('.section-heading');
  const formulationSteps = formulation?.querySelector('.formulation-steps');

  if (formulation && formulationHeading && formulationSteps) {
    const title = formulationHeading.querySelector('h2');
    const lead = formulationHeading.querySelector('p:last-child');

    if (title) title.textContent = 'Da descrição em linguagem natural à formulação de um problema de busca';
    if (lead) lead.innerHTML = 'Uma tarefa descrita em linguagem natural ainda não fornece a estrutura necessária para um algoritmo de busca. É preciso formular o problema de maneira explícita, definindo <strong>como os estados são representados</strong>, <strong>quais ações podem ser aplicadas</strong>, <strong>como essas ações produzem novos estados</strong> e <strong>como reconhecer que o objetivo foi atingido</strong>.';

    if (!formulation.querySelector('.formulation-schema')) {
      formulationSteps.insertAdjacentHTML('beforebegin', `
        <div class="formulation-schema">
          <div><small>Ponto de partida</small><strong>Estado inicial</strong></div><b>→</b>
          <div><small>Decisões possíveis</small><strong>Ações aplicáveis</strong></div><b>→</b>
          <div><small>Dinâmica do problema</small><strong>Modelo de transição</strong></div><b>→</b>
          <div><small>Novas situações</small><strong>Estados sucessores</strong></div><b>→</b>
          <div><small>Condição de término</small><strong>Teste de objetivo</strong></div>
        </div>
      `);
    }

    formulationSteps.innerHTML = `
      <article class="formulation-step">
        <div class="formulation-step-number">01</div>
        <div class="formulation-step-content">
          <small>Representação do estado</small>
          <h3>Como uma situação do problema será descrita?</h3>
          <div class="formulation-concepts">
            <div><strong>Estado</strong><span>Representação das informações necessárias para caracterizar uma situação relevante do problema.</span></div>
            <div><strong>Estado inicial</strong><span>Estado a partir do qual o processo de resolução começa.</span></div>
          </div>
          <div class="formulation-example"><b>No exemplo</b><span>Se apenas a localização for relevante, podemos representar <strong>estado = posição atual do robô</strong>. O estado inicial é <strong>Recepção</strong>.</span></div>
        </div>
      </article>

      <article class="formulation-step">
        <div class="formulation-step-number">02</div>
        <div class="formulation-step-content">
          <small>Ações e transições</small>
          <h3>Como o sistema pode passar de um estado para outro?</h3>
          <div class="formulation-concepts formulation-concepts-three">
            <div><strong>Ações</strong><span>Operações que podem ser aplicadas a um determinado estado.</span></div>
            <div><strong>Condições de aplicabilidade</strong><span>Determinam em quais estados uma ação pode ser executada validamente.</span></div>
            <div><strong>Modelo de transição</strong><span>Define qual estado resulta da execução de uma ação válida.</span></div>
          </div>
          <div class="formulation-example"><b>No exemplo</b><span><strong>Recepção — ir_para_corredor → Corredor</strong>. Uma ação para um ambiente sem conexão não é aplicável; a conectividade restringe as transições possíveis.</span></div>
        </div>
      </article>

      <article class="formulation-step">
        <div class="formulation-step-number">03</div>
        <div class="formulation-step-content">
          <small>Objetivo</small>
          <h3>Como reconhecer que o problema foi resolvido?</h3>
          <div class="formulation-concepts">
            <div><strong>Estado objetivo</strong><span>Estado que satisfaz a condição desejada estabelecida para o problema.</span></div>
            <div><strong>Teste de objetivo</strong><span>Condição computável utilizada para verificar se um estado é um estado objetivo.</span></div>
          </div>
          <div class="formulation-example"><b>No exemplo</b><span>O Laboratório é o estado objetivo. Um teste possível é <code>estado_atual == "laboratorio"</code>.</span></div>
        </div>
      </article>

      <article class="formulation-step formulation-step-final">
        <div class="formulation-step-number">04</div>
        <div class="formulation-step-content">
          <small>Solução e qualidade</small>
          <h3>O que o algoritmo deverá produzir?</h3>
          <div class="formulation-concepts formulation-concepts-three">
            <div><strong>Solução</strong><span>Sequência de ações que transforma o estado inicial em um estado objetivo por meio de transições válidas.</span></div>
            <div><strong>Validade da solução</strong><span>Verifica se o objetivo foi alcançado sem violar as regras e restrições do problema.</span></div>
            <div><strong>Qualidade da solução</strong><span>Permite comparar soluções válidas por número de movimentos, distância, tempo, custo ou outro critério pertinente.</span></div>
          </div>
          <div class="formulation-example"><b>No exemplo</b><span><strong>Recepção → Corredor → Laboratório</strong> constitui uma solução válida. Se houver outras soluções, um critério de custo pode determinar qual é preferível.</span></div>
        </div>
      </article>
    `;

    if (!formulation.querySelector('.formulation-closure')) {
      const target = formulation.querySelector('.software-interface') || formulationSteps;
      target.insertAdjacentHTML('afterend', '<div class="formulation-closure"><strong>Formulação não é estratégia de busca.</strong><span>A formulação determina <em>o que pode ser explorado</em>: estados, ações, transições e objetivo. A estratégia de busca determinará <em>como explorar</em> esse espaço para encontrar uma solução.</span></div>');
    }
  }

  const representation = document.querySelector('#representacao');
  if (representation) {
    const eyebrow = representation.querySelector('.section-heading .eyebrow');
    const title = representation.querySelector('.section-heading h2');
    const description = representation.querySelector('.section-heading p:last-child');
    if (eyebrow) eyebrow.textContent = '06 · Validação do modelo';
    if (title) title.textContent = 'Quando o problema muda, a representação pode precisar mudar';
    if (description) description.innerHTML = 'Até agora, bastava saber <strong>onde o robô estava</strong>. Vamos alterar a tarefa: antes de chegar ao Laboratório, ele precisa buscar um pacote na Sala 101. Essa nova condição exige que o modelo consiga distinguir situações que antes pareciam iguais.';
  }

  const activityEyebrow = document.querySelector('#atividade .section-heading .eyebrow');
  const activityTitle = document.querySelector('#atividade .section-heading h2');
  const activityDescription = document.querySelector('#atividade .section-heading p:last-child');
  if (activityEyebrow) activityEyebrow.textContent = 'Aplicação integrada';
  if (activityTitle) activityTitle.textContent = 'Percorra o ciclo completo em um novo problema';
  if (activityDescription) activityDescription.textContent = 'Escolha um caso e aplique novamente as seis etapas trabalhadas na aula: definir o problema, abstrair o domínio, formular o modelo, construir uma representação computacional, explicitar o espaço de estados e validar se a representação é suficiente. A IA generativa entra somente depois, para comparação e crítica.';

  const style = document.createElement('style');
  style.id = 'aula03-direct-refinement';
  style.textContent = `
    body:not(.theme-dark) .warmup-map-figure { border-color:var(--line); background:#fff; box-shadow:0 12px 30px rgba(35,50,78,.06); }
    body.theme-dark .warmup-map-figure { border-color:rgba(255,255,255,.12); background:rgba(255,255,255,.045); box-shadow:none; }

    .formulation-schema { display:grid; grid-template-columns:minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr); gap:.55rem; align-items:center; margin:0 0 1.2rem; padding:1rem; border:1px solid var(--line); border-radius:18px; background:var(--soft); }
    .formulation-schema > div { min-width:0; text-align:center; }
    .formulation-schema small, .formulation-schema strong { display:block; }
    .formulation-schema small { margin-bottom:.25rem; color:var(--muted); font-size:.66rem; font-weight:800; letter-spacing:.06em; text-transform:uppercase; }
    .formulation-schema strong { color:var(--ink); font-size:.88rem; }
    .formulation-schema > b { color:var(--blue); font-size:1.05rem; }
    .formulation-closure { display:grid; grid-template-columns:auto minmax(0,1fr); gap:.65rem .9rem; align-items:start; margin-top:1.25rem; padding:1rem 1.1rem; border-left:4px solid var(--teal); border-radius:0 14px 14px 0; background:var(--teal-soft); }
    .formulation-closure strong { color:var(--teal); }
    .formulation-closure span { color:var(--ink); }
    body.theme-dark .formulation-schema { background:#111a2b; border-color:var(--line); }
    body.theme-dark .formulation-closure { background:#0f2b2a; border-color:#245d59; }
    @media (max-width:980px) { .formulation-schema { grid-template-columns:1fr; } .formulation-schema > div { text-align:left; } .formulation-schema > b { transform:rotate(90deg); justify-self:start; } }
    @media (max-width:640px) { .formulation-closure { grid-template-columns:1fr; } }
  `;
  document.head.appendChild(style);
})();
