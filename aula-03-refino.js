/* Refinos textuais, conceituais e visuais da Aula 03. */
(() => {
  const formulation = document.querySelector('#formulacao');

  if (formulation) {
    const headings = formulation.querySelectorAll('.section-heading');

    const mainHeading = headings[0];
    if (mainHeading) {
      const description = mainHeading.querySelector('p:last-child');
      if (description) {
        description.textContent = 'Agora precisamos transformar a descrição do problema em uma representação computacional: definir as situações possíveis, as ações permitidas, as restrições e a condição que indica que o objetivo foi alcançado.';
      }
    }

    const distinctionHeading = headings[1];
    if (distinctionHeading) {
      const eyebrow = distinctionHeading.querySelector('.eyebrow');
      const title = distinctionHeading.querySelector('h2');
      let description = distinctionHeading.querySelector('p:not(.eyebrow)');

      if (eyebrow) eyebrow.textContent = 'Validade e qualidade da solução';
      if (title) title.textContent = 'Uma solução pode estar correta e ainda não ser a melhor';

      if (!description) {
        description = document.createElement('p');
        title?.insertAdjacentElement('afterend', description);
      }

      if (description) {
        description.textContent = 'Primeiro verificamos se o objetivo foi alcançado e se nenhuma restrição foi violada. Depois, se existirem várias soluções válidas, podemos compará-las usando um critério de avaliação.';
      }
    }

    const distinctionCards = formulation.querySelectorAll('.distinction article');
    if (distinctionCards.length >= 3) {
      distinctionCards[0].innerHTML = `
        <h3>Objetivo</h3>
        <p>Define a situação que queremos alcançar.</p>
        <small>Ex.: o robô está no Laboratório.</small>
      `;

      distinctionCards[1].innerHTML = `
        <h3>Critério de sucesso</h3>
        <p>Verifica se encontramos uma solução válida, isto é, se o objetivo foi alcançado sem violar as restrições.</p>
        <small>Ex.: o robô chegou ao Laboratório realizando apenas movimentos permitidos.</small>
      `;

      distinctionCards[2].innerHTML = `
        <h3>Critério de avaliação</h3>
        <p>Permite comparar soluções que já são válidas e decidir qual delas é preferível.</p>
        <small>Ex.: entre dois caminhos possíveis, qual utiliza menos movimentos?</small>
      `;
    }
  }

  /* Primeiro código: falar genericamente em algoritmos de busca. */
  const codeSection = document.querySelector('#codigo');
  if (codeSection) {
    const description = codeSection.querySelector('.section-heading p:last-child');
    if (description) {
      description.textContent = 'Antes de aplicar um algoritmo de busca, precisamos representar o problema no código. Primeiro vamos programar os estados, as ações, as transições e o objetivo; depois veremos como um algoritmo pode explorar essa estrutura para encontrar uma solução.';
    }
  }

  /* Espaço de estados: substituir o esquema por um grafo de fato. */
  const stateSpaceSection = document.querySelector('#espaco');
  if (stateSpaceSection) {
    const graphCard = stateSpaceSection.querySelector('.graph-card');
    const stateNote = stateSpaceSection.querySelector('.state-note');
    const noteBanner = stateSpaceSection.querySelector('.note-banner');

    if (graphCard) {
      graphCard.classList.add('graph-card-reworked');
      graphCard.innerHTML = `
        <div class="state-graph-header">
          <div>
            <p class="state-graph-kicker">Representação como grafo</p>
            <h3>Os estados viram nós; as transições, arestas</h3>
            <p>O grafo explicita quais situações existem no modelo e entre quais delas uma ação pode produzir uma transição válida.</p>
          </div>
          <span class="state-graph-badge">Espaço de estados</span>
        </div>

        <div class="state-graph-canvas">
          <svg class="state-graph-svg" viewBox="0 0 820 430" role="img" aria-labelledby="state-graph-title state-graph-desc">
            <title id="state-graph-title">Grafo do espaço de estados do robô</title>
            <desc id="state-graph-desc">O estado Corredor está conectado a Recepção, Sala 101, Copa e Laboratório. Recepção é o estado inicial e Laboratório é o objetivo.</desc>

            <defs>
              <filter id="state-node-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#07101f" flood-opacity="0.18" />
              </filter>
            </defs>

            <g class="state-graph-edges" aria-hidden="true">
              <line x1="195" y1="215" x2="345" y2="215"></line>
              <line x1="475" y1="215" x2="625" y2="215"></line>
              <line x1="392" y1="175" x2="365" y2="111"></line>
              <line x1="392" y1="255" x2="365" y2="319"></line>
            </g>

            <g class="state-node state-node-start" transform="translate(55 175)" filter="url(#state-node-shadow)">
              <rect width="140" height="80" rx="20"></rect>
              <text x="70" y="39">Recepção</text>
              <text class="node-role" x="70" y="61">estado inicial</text>
            </g>

            <g class="state-node state-node-core" transform="translate(345 175)" filter="url(#state-node-shadow)">
              <rect width="130" height="80" rx="20"></rect>
              <text x="65" y="47">Corredor</text>
            </g>

            <g class="state-node state-node-regular" transform="translate(285 35)" filter="url(#state-node-shadow)">
              <rect width="150" height="76" rx="19"></rect>
              <text x="75" y="44">Sala 101</text>
            </g>

            <g class="state-node state-node-regular" transform="translate(285 319)" filter="url(#state-node-shadow)">
              <rect width="150" height="76" rx="19"></rect>
              <text x="75" y="44">Copa</text>
            </g>

            <g class="state-node state-node-goal" transform="translate(625 175)" filter="url(#state-node-shadow)">
              <rect width="140" height="80" rx="20"></rect>
              <text x="70" y="39">Laboratório</text>
              <text class="node-role" x="70" y="61">objetivo</text>
            </g>
          </svg>
        </div>

        <div class="state-graph-reading">
          <div><span class="reading-mark reading-node"></span><strong>Nó</strong><p>representa um estado possível.</p></div>
          <div><span class="reading-mark reading-edge"></span><strong>Aresta</strong><p>representa uma transição permitida.</p></div>
          <div><span class="reading-mark reading-path"></span><strong>Caminho</strong><p>é uma sequência de estados conectados.</p></div>
        </div>
      `;
    }

    if (stateNote) {
      stateNote.innerHTML = `
        <p class="state-note-kicker">Como ler o grafo</p>
        <h3>Três ideias diferentes</h3>
        <div class="state-note-list">
          <div><strong>Estado</strong><span>Uma situação possível descrita pelo modelo.</span></div>
          <div><strong>Espaço de estados</strong><span>O conjunto dos estados alcançáveis e das transições que os conectam.</span></div>
          <div><strong>Solução</strong><span>Um caminho válido que leva do estado inicial a um estado objetivo.</span></div>
        </div>
      `;
    }

    if (noteBanner) {
      noteBanner.innerHTML = '<strong>Importante:</strong> nesta aula estamos construindo o espaço de estados. Ainda não decidimos como ele será explorado. Primeiro precisamos representar claramente os estados e as transições; depois estudaremos como algoritmos de busca percorrem essa estrutura para encontrar soluções.';
    }
  }

  const style = document.createElement('style');
  style.id = 'aula03-refinement-styles';
  style.textContent = `
    #espaco .state-space {
      grid-template-columns: minmax(0, 1.65fr) minmax(290px, .72fr);
      gap: 22px;
      align-items: stretch;
    }

    #espaco .graph-card-reworked {
      padding: 1.35rem;
      overflow: hidden;
    }

    .state-graph-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1.2rem;
      margin-bottom: 1rem;
    }

    .state-graph-kicker,
    .state-note-kicker {
      margin: 0 0 .35rem;
      color: var(--blue);
      font-size: .7rem;
      font-weight: 850;
      letter-spacing: .09em;
      text-transform: uppercase;
    }

    .state-graph-header h3 {
      margin: 0 0 .35rem;
      font-size: 1.2rem;
    }

    .state-graph-header p:not(.state-graph-kicker) {
      max-width: 690px;
      margin: 0;
      color: var(--muted);
      font-size: .92rem;
    }

    .state-graph-badge {
      flex: 0 0 auto;
      padding: .45rem .7rem;
      border: 1px solid #cad5ff;
      border-radius: 999px;
      background: var(--blue-soft);
      color: var(--blue);
      font-size: .72rem;
      font-weight: 800;
    }

    .state-graph-canvas {
      border: 1px solid var(--line);
      border-radius: 18px;
      background: linear-gradient(160deg, var(--soft), var(--paper));
      overflow: hidden;
    }

    .state-graph-svg {
      display: block;
      width: 100%;
      height: auto;
      min-height: 330px;
    }

    .state-graph-edges line {
      stroke: #8496ba;
      stroke-width: 5;
      stroke-linecap: round;
    }

    .state-node rect {
      stroke-width: 2;
    }

    .state-node text {
      fill: var(--ink);
      font-family: Inter, system-ui, sans-serif;
      font-size: 17px;
      font-weight: 800;
      text-anchor: middle;
    }

    .state-node .node-role {
      fill: var(--muted);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .04em;
      text-transform: uppercase;
    }

    .state-node-start rect {
      fill: var(--blue-soft);
      stroke: #6f8fe8;
    }

    .state-node-core rect {
      fill: var(--paper);
      stroke: #8da0c3;
    }

    .state-node-regular rect {
      fill: var(--paper);
      stroke: #c5cede;
    }

    .state-node-goal rect {
      fill: var(--teal-soft);
      stroke: #3aa797;
    }

    .state-node-goal text:first-of-type {
      fill: var(--teal);
    }

    .state-graph-reading {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
      margin-top: 10px;
    }

    .state-graph-reading > div {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: .55rem;
      align-items: center;
      padding: .8rem .9rem;
      border: 1px solid var(--line);
      border-radius: 13px;
      background: var(--paper);
    }

    .state-graph-reading strong {
      color: var(--ink);
      font-size: .85rem;
    }

    .state-graph-reading p {
      grid-column: 2;
      margin: .08rem 0 0;
      color: var(--muted);
      font-size: .78rem;
      line-height: 1.35;
    }

    .reading-mark {
      display: block;
      width: 13px;
      height: 13px;
      border-radius: 999px;
    }

    .reading-node { background: #6f8fe8; }
    .reading-edge { width: 19px; height: 4px; border-radius: 99px; background: #8496ba; }
    .reading-path { background: #3aa797; box-shadow: 0 0 0 4px rgba(58,167,151,.12); }

    #espaco .state-note {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 1.45rem;
    }

    #espaco .state-note h3 {
      margin: 0 0 1rem;
    }

    .state-note-list {
      display: grid;
      gap: .85rem;
    }

    .state-note-list > div {
      padding-bottom: .85rem;
      border-bottom: 1px solid rgba(255,255,255,.09);
    }

    .state-note-list > div:last-child {
      padding-bottom: 0;
      border-bottom: 0;
    }

    .state-note-list strong,
    .state-note-list span {
      display: block;
    }

    .state-note-list strong {
      margin-bottom: .22rem;
    }

    .state-note-list span {
      color: var(--muted);
      font-size: .9rem;
      line-height: 1.5;
    }

    body.theme-dark .state-graph-canvas {
      background: linear-gradient(160deg, #101827, #151f32);
      border-color: #2a3853;
    }

    body.theme-dark .state-graph-badge {
      border-color: #344a7b;
      background: #111c35;
      color: #9ab0ff;
    }

    body.theme-dark .state-graph-edges line {
      stroke: #65799f;
    }

    body.theme-dark .state-node text {
      fill: #e9eef9;
    }

    body.theme-dark .state-node .node-role {
      fill: #98a8c3;
    }

    body.theme-dark .state-node-start rect {
      fill: #132347;
      stroke: #7394ef;
    }

    body.theme-dark .state-node-core rect,
    body.theme-dark .state-node-regular rect {
      fill: #182337;
      stroke: #647798;
    }

    body.theme-dark .state-node-goal rect {
      fill: #0f302d;
      stroke: #45b3a2;
    }

    body.theme-dark .state-node-goal text:first-of-type {
      fill: #61d4c2;
    }

    body.theme-dark .state-graph-reading > div {
      background: #151f32;
      border-color: #2a3853;
    }

    @media (max-width: 1050px) {
      #espaco .state-space {
        grid-template-columns: 1fr;
      }

      #espaco .state-note {
        min-height: auto;
      }
    }

    @media (max-width: 720px) {
      .state-graph-header {
        display: grid;
      }

      .state-graph-badge {
        justify-self: start;
      }

      .state-graph-svg {
        min-width: 690px;
      }

      .state-graph-canvas {
        overflow-x: auto;
      }

      .state-graph-reading {
        grid-template-columns: 1fr;
      }
    }
  `;

  document.head.appendChild(style);
})();
