/* Harmonização final da Aula 03. */
(() => {
  const journeyLabels = [
    'Definição do problema',
    'Abstração do domínio',
    'Formulação do problema',
    'Representação computacional',
    'Espaço de estados',
    'Validação do modelo'
  ];

  document.querySelector('#percurso .section-heading p:last-child')?.remove();
  document.querySelectorAll('#percurso .journey a strong').forEach((label, index) => {
    if (journeyLabels[index]) label.textContent = journeyLabels[index];
  });

  [
    ['#aquecimento .warmup .eyebrow', '01 · Definição do problema'],
    ['#abstracao .section-heading .eyebrow', '02 · Abstração do domínio'],
    ['#formulacao .section-heading .eyebrow', '03 · Formulação do problema'],
    ['#codigo .section-heading .eyebrow', '04 · Representação computacional'],
    ['#espaco .section-heading .eyebrow', '05 · Espaço de estados']
  ].forEach(([selector, text]) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = text;
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
      cards[2].innerHTML = '<small>03 · Estrutura necessária</small><h3>A descrição ainda não é um modelo</h3><p>Ainda precisamos explicitar <strong>estado</strong>, <strong>estado inicial</strong>, <strong>ações</strong>, <strong>transições</strong>, <strong>restrições</strong>, <strong>objetivo</strong> e <strong>teste de objetivo</strong>.</p>';
    }
  }

  const mapImage = document.querySelector('.warmup-map-figure img');
  if (mapImage) {
    const lightSrc = 'assets/aula-03-mapa-light.svg';
    const darkSrc = 'assets/aula-03-mapa.svg';
    mapImage.dataset.lightSrc = lightSrc;
    mapImage.dataset.darkSrc = darkSrc;
    mapImage.src = document.body.classList.contains('theme-dark') ? darkSrc : lightSrc;
  }

  const abstractionInquiry = document.querySelector('#abstracao .abstraction-challenge');
  if (abstractionInquiry) {
    abstractionInquiry.innerHTML = `
      <div class="inquiry-head">
        <div><span class="inquiry-kicker">Análise de impacto na representação</span><h3>Uma nova restrição altera quais componentes do modelo?</h3></div>
        <span class="inquiry-tag">Reformule e justifique</span>
      </div>
      <div class="inquiry-body inquiry-body-single">
        <div>
          <div class="challenge-change"><small>Mudança no requisito</small><p>O robô precisa chegar ao <strong>Laboratório</strong>, mas não pode entrar em ambientes cuja <strong>temperatura seja superior a 30 °C</strong>.</p></div>
          <p class="challenge-context"><strong>Objetivo da atividade:</strong> analise o impacto da nova condição sobre a abstração anterior. Não reconstrua todo o modelo; identifique precisamente o que precisa ser modificado e o que pode ser preservado.</p>
          <ol class="prompt-list">
            <li><strong>Relevância da informação.</strong> Explique por que a temperatura, antes descartada, passa a influenciar a validade de uma solução.</li>
            <li><strong>Decisão de modelagem.</strong> Determine se a temperatura deve ser tratada como atributo do ambiente, informação do estado, restrição sobre uma transição ou combinação desses elementos.</li>
            <li><strong>Regra de transição.</strong> Formule as condições que tornam válido o deslocamento para um ambiente vizinho, considerando conectividade e temperatura.</li>
            <li><strong>Consistência do modelo.</strong> Indique quais componentes anteriores permanecem válidos e quais precisam ser ampliados ou reinterpretados.</li>
          </ol>
          <div class="abstraction-takeaway" style="margin:1.25rem 0 0"><strong>Resultado esperado</strong><span>Apresente uma versão revisada do modelo e justifique cada alteração com base no novo requisito.</span></div>
        </div>
      </div>
      <div class="abstraction-takeaway"><strong>Princípio de modelagem</strong><span>Uma mudança de requisito pode alterar a abstração, as restrições e a função de transição sem exigir que todo o modelo seja reconstruído.</span></div>
    `;
  }

  const formulation = document.querySelector('#formulacao');
  if (formulation) {
    const headings = formulation.querySelectorAll('.section-heading');
    const mainHeading = headings[0];
    const steps = formulation.querySelector('.formulation-steps');

    if (mainHeading) {
      const title = mainHeading.querySelector('h2');
      const lead = mainHeading.querySelector('p:last-child');
      if (title) title.textContent = 'Da descrição em linguagem natural à formulação de um problema de busca';
      if (lead) lead.innerHTML = 'Uma tarefa descrita em linguagem natural ainda não fornece a estrutura necessária para um algoritmo de busca. É preciso formular o problema de maneira explícita, definindo <strong>como os estados são representados</strong>, <strong>quais ações podem ser aplicadas</strong>, <strong>como essas ações produzem novos estados</strong> e <strong>como reconhecer que o objetivo foi atingido</strong>.';
    }

    if (steps) {
      if (!formulation.querySelector('.formulation-schema')) {
        steps.insertAdjacentHTML('beforebegin', '<div class="formulation-schema"><div><small>Ponto de partida</small><strong>Estado inicial</strong></div><b>→</b><div><small>Decisões possíveis</small><strong>Ações aplicáveis</strong></div><b>→</b><div><small>Dinâmica</small><strong>Modelo de transição</strong></div><b>→</b><div><small>Novas situações</small><strong>Estados sucessores</strong></div><b>→</b><div><small>Término</small><strong>Teste de objetivo</strong></div></div>');
      }

      steps.innerHTML = `
        <article class="formulation-step"><div class="formulation-step-number">01</div><div class="formulation-step-content"><small>Representação do estado</small><h3>Como uma situação do problema será descrita?</h3><div class="formulation-concepts"><div><strong>Estado</strong><span>Representação das informações necessárias para caracterizar uma situação relevante.</span></div><div><strong>Estado inicial</strong><span>Estado a partir do qual o processo de resolução começa.</span></div></div><div class="formulation-example"><b>No exemplo</b><span><strong>estado = posição atual do robô</strong>; o estado inicial é <strong>Recepção</strong>.</span></div></div></article>
        <article class="formulation-step"><div class="formulation-step-number">02</div><div class="formulation-step-content"><small>Ações e transições</small><h3>Como o sistema pode passar de um estado para outro?</h3><div class="formulation-concepts formulation-concepts-three"><div><strong>Ações</strong><span>Operações aplicáveis a um estado.</span></div><div><strong>Condições de aplicabilidade</strong><span>Determinam quando uma ação pode ser executada validamente.</span></div><div><strong>Modelo de transição</strong><span>Define o estado resultante da execução de uma ação.</span></div></div><div class="formulation-example"><b>No exemplo</b><span><strong>Recepção — ir_para_corredor → Corredor</strong>.</span></div></div></article>
        <article class="formulation-step"><div class="formulation-step-number">03</div><div class="formulation-step-content"><small>Objetivo</small><h3>Como reconhecer que o problema foi resolvido?</h3><div class="formulation-concepts"><div><strong>Estado objetivo</strong><span>Estado que satisfaz a condição desejada.</span></div><div><strong>Teste de objetivo</strong><span>Condição computável que verifica se um estado é objetivo.</span></div></div><div class="formulation-example"><b>No exemplo</b><span><code>estado_atual == "laboratorio"</code>.</span></div></div></article>
        <article class="formulation-step formulation-step-final"><div class="formulation-step-number">04</div><div class="formulation-step-content"><small>Solução</small><h3>O que o algoritmo deverá produzir?</h3><div class="formulation-concepts formulation-concepts-three"><div><strong>Solução</strong><span>Sequência de ações que transforma o estado inicial em um estado objetivo.</span></div><div><strong>Validade</strong><span>Exige transições aplicáveis e respeito às restrições.</span></div><div><strong>Qualidade</strong><span>Permite comparar soluções por um critério de custo.</span></div></div><div class="formulation-example"><b>No exemplo</b><span><strong>Recepção → Corredor → Laboratório</strong>.</span></div></div></article>
      `;

      if (!formulation.querySelector('.formulation-closure')) {
        steps.insertAdjacentHTML('afterend', '<div class="formulation-closure"><strong>Formulação não é estratégia de busca.</strong><span>A formulação determina <em>o que pode ser explorado</em>; a estratégia de busca determina <em>como explorar</em> esse espaço.</span></div>');
      }
    }

    const distinctionHeading = headings[1];
    const cards = formulation.querySelectorAll('.distinction article');
    const note = formulation.querySelector('.note-banner');

    if (distinctionHeading) {
      const eyebrow = distinctionHeading.querySelector('.eyebrow');
      const title = distinctionHeading.querySelector('h2');
      let text = distinctionHeading.querySelector('p:not(.eyebrow)');
      if (eyebrow) eyebrow.textContent = 'Validade e custo da solução';
      if (title) title.textContent = 'Uma solução pode ser válida sem ser ótima';
      if (!text && title) {
        text = document.createElement('p');
        title.insertAdjacentElement('afterend', text);
      }
      if (text) text.textContent = 'Encontrar um estado objetivo não encerra toda a análise de uma solução. Primeiro verificamos se existe uma sequência válida de ações que leva do estado inicial a um estado objetivo. Quando existem múltiplas soluções válidas, podemos compará-las por meio de uma função de custo.';
    }

    if (cards.length >= 3) {
      cards[0].innerHTML = '<h3>Teste de objetivo</h3><p>Verifica se um estado satisfaz a condição de término definida para o problema.</p><small>No exemplo: <code>estado_atual == "laboratorio"</code></small>';
      cards[1].innerHTML = '<h3>Solução válida</h3><p>É uma sequência de ações aplicáveis que conduz do estado inicial a um estado objetivo sem violar as restrições.</p><small>No exemplo: Recepção → Corredor → Laboratório.</small>';
      cards[2].innerHTML = '<h3>Custo da solução</h3><p>Associa um valor a uma solução e permite comparar diferentes caminhos válidos.</p><small>Ex.: movimentos, distância, tempo ou consumo de energia.</small>';
    }

    if (note) {
      note.classList.add('search-formulation-summary');
      note.innerHTML = '<p class="search-formulation-main"><strong>Formulação clássica de um problema de busca:</strong> especificamos o <strong>estado inicial</strong>, as <strong>ações aplicáveis</strong>, o <strong>modelo de transição</strong>, o <strong>teste de objetivo</strong> e, quando pertinente, uma <strong>função de custo</strong>. Esses elementos definem o problema; a estratégia de busca determina como o espaço será explorado.</p><p class="optimality-note">Uma solução de menor custo é <strong>ótima em relação ao critério adotado</strong>; portanto, “melhor solução” depende da função de custo definida.</p>';
    }
  }

  const representation = document.querySelector('#representacao .section-heading');
  if (representation) {
    const eyebrow = representation.querySelector('.eyebrow');
    if (eyebrow) eyebrow.textContent = '06 · Validação do modelo';
  }

  const activityHeading = document.querySelector('#atividade .section-heading');
  if (activityHeading) {
    const eyebrow = activityHeading.querySelector('.eyebrow');
    const title = activityHeading.querySelector('h2');
    if (eyebrow) eyebrow.textContent = 'Aplicação integrada';
    if (title) title.textContent = 'Percorra o ciclo completo em um novo problema';
  }

  const style = document.createElement('style');
  style.textContent = `
    body:not(.theme-dark) .warmup-map-figure{border-color:var(--line);background:#fff;box-shadow:0 12px 30px rgba(35,50,78,.06)}
    .formulation-schema{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr);gap:.55rem;align-items:center;margin:0 0 1.2rem;padding:1rem;border:1px solid var(--line);border-radius:18px;background:var(--soft)}
    .formulation-schema>div{text-align:center}.formulation-schema small,.formulation-schema strong{display:block}.formulation-schema small{color:var(--muted);font-size:.66rem;text-transform:uppercase}.formulation-schema>b{color:var(--blue)}
    .formulation-closure{display:grid;grid-template-columns:auto 1fr;gap:.7rem;margin-top:1.25rem;padding:1rem 1.1rem;border-left:4px solid var(--teal);background:var(--teal-soft)}.formulation-closure strong{color:var(--teal)}
    #formulacao .distinction code{padding:.12rem .32rem;border-radius:6px;background:var(--soft);color:var(--ink)}
    #formulacao .search-formulation-summary{display:block;line-height:1.6}#formulacao .search-formulation-main{margin:0;color:var(--muted)}#formulacao .search-formulation-main strong{color:var(--ink)}#formulacao .optimality-note{display:block;margin:.7rem 0 0;padding-top:.7rem;border-top:1px solid var(--line);color:var(--muted)}
    body.theme-dark .formulation-schema{background:#111a2b}body.theme-dark .formulation-closure{background:#0f2b2a}
    @media(max-width:980px){.formulation-schema{grid-template-columns:1fr}.formulation-schema>div{text-align:left}.formulation-schema>b{transform:rotate(90deg);justify-self:start}}@media(max-width:640px){.formulation-closure{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);
})();