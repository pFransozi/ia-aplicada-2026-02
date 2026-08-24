(() => {
  const root = document.querySelector('[data-guided-search]');
  if (!root) return;

  const injectAula05Adjustments = () => {
    if (document.getElementById('aula05-ajustes-finais')) return;

    const style = document.createElement('style');
    style.id = 'aula05-ajustes-finais';
    style.textContent = `
      #visao .overview-grid {
        grid-template-columns: minmax(0, 1.15fr) minmax(300px, .85fr);
        align-items: start;
        gap: 22px;
      }

      #visao .overview-grid .topics-card {
        grid-row: auto !important;
      }

      #visao .competency-stack {
        display: grid;
        gap: 14px;
        align-content: start;
      }

      #visao .competency-stack .competency {
        align-self: start;
        min-height: 0;
        padding: 1.15rem 1.25rem;
      }

      #visao .competency-stack .competency h3 {
        margin-bottom: .55rem;
      }

      #visao .competency-stack .competency .skill {
        margin-top: 0;
        gap: .6rem;
      }

      #visao .competency-stack .competency .skill strong {
        min-height: 34px;
      }

      #visao .competency-stack .c11 {
        grid-column: auto !important;
      }

      .formalization-section .section-heading {
        max-width: 880px;
      }

      .formalization-compare {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 18px;
        margin-top: 1.6rem;
      }

      .formalization-card {
        padding: 1.25rem 1.35rem;
        border: 1px solid var(--line);
        border-radius: 20px;
        background: var(--paper);
        box-shadow: var(--shadow);
      }

      .formalization-card h3 {
        margin: 0 0 .85rem;
      }

      .formalization-list {
        display: grid;
        gap: .7rem;
        margin: 0;
        padding: 0;
        list-style: none;
      }

      .formalization-list li {
        padding: .8rem .9rem;
        border: 1px solid var(--line);
        border-radius: 14px;
        background: var(--soft);
      }

      .formalization-list strong {
        display: block;
        margin-bottom: .2rem;
      }

      .formalization-list span {
        display: block;
        color: var(--muted);
      }

      .formalization-mini-example {
        margin-top: 1.4rem;
        padding: 1.25rem 1.35rem;
        border: 1px solid var(--line);
        border-left: 5px solid var(--teal);
        border-radius: 20px;
        background: var(--paper);
        box-shadow: var(--shadow);
      }

      .formalization-mini-example h3 {
        margin: 0 0 .55rem;
      }

      .formalization-mini-example p {
        margin: 0;
      }

      .formalization-table-wrap {
        margin-top: 1rem;
        overflow-x: auto;
        border: 1px solid var(--line);
        border-radius: 16px;
        background: var(--paper);
      }

      .formalization-table {
        width: 100%;
        min-width: 640px;
        border-collapse: collapse;
      }

      .formalization-table th,
      .formalization-table td {
        padding: .85rem 1rem;
        text-align: left;
        border-bottom: 1px solid var(--line);
      }

      .formalization-table th {
        background: var(--soft);
        font-size: .76rem;
        letter-spacing: .05em;
        text-transform: uppercase;
      }

      .formalization-table tr:last-child td {
        border-bottom: 0;
      }

      .problem-upgrade-card {
        margin-top: 1.4rem;
        padding: 1.35rem 1.45rem;
        border: 1px solid var(--line);
        border-left: 5px solid var(--violet);
        border-radius: 20px;
        background: var(--paper);
        box-shadow: var(--shadow);
      }

      .problem-upgrade-card h3 { margin: 0 0 .6rem; }
      .problem-upgrade-card p { margin: 0; }

      .problem-upgrade-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px;
        margin-top: 1rem;
      }

      .problem-upgrade-grid article {
        padding: 1rem;
        border: 1px solid var(--line);
        border-radius: 16px;
        background: var(--soft);
      }

      .problem-upgrade-grid strong,
      .problem-upgrade-grid span { display: block; }
      .problem-upgrade-grid span { margin-top: .35rem; color: var(--muted); }

      .concept-anchor-card {
        margin-top: 1.6rem;
        padding: 1.25rem 1.35rem;
        border: 1px solid var(--line);
        border-radius: 20px;
        background: var(--paper);
        box-shadow: var(--shadow);
      }

      .concept-anchor-card h3 { margin: 0 0 .65rem; }
      .concept-anchor-card p { margin: 0; }

      .concept-anchor-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 12px;
        margin-top: 1rem;
      }

      .concept-anchor-grid article {
        padding: .95rem;
        border: 1px solid var(--line);
        border-radius: 15px;
        background: var(--soft);
      }

      .concept-anchor-grid strong,
      .concept-anchor-grid span { display: block; }
      .concept-anchor-grid span { margin-top: .35rem; color: var(--muted); font-size: .92rem; }

      .guided-simulator { grid-template-columns: 1fr; }
      .guided-graph-card,
      .guided-control-card { width: 100%; }

      .romania-reference-map {
        min-height: 0 !important;
        padding: 0;
        border: 0;
        background: transparent;
        overflow: visible;
      }

      .romania-reference-figure { margin: 0; }

      .romania-reference-figure img {
        display: block;
        width: 100%;
        max-width: 1120px;
        margin: 0 auto;
        border: 1px solid var(--line);
        border-radius: 18px;
        background: #ffffff;
        box-shadow: 0 14px 35px rgba(35, 50, 78, .12);
      }

      .romania-reference-figure figcaption {
        max-width: 1120px;
        margin: .75rem auto 0;
        color: var(--muted);
        font-size: .92rem;
        line-height: 1.55;
      }

      .romania-reference-figure figcaption strong { color: var(--ink); }

      .romania-reading-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 14px;
        margin-top: 1.4rem;
      }

      .romania-reading-grid article {
        padding: 1.1rem;
        border: 1px solid var(--line);
        border-radius: 18px;
        background: var(--paper);
      }

      .romania-reading-grid small {
        color: var(--blue);
        font-weight: 850;
        letter-spacing: .06em;
        text-transform: uppercase;
      }

      .romania-reading-grid h3 { margin: .75rem 0 .45rem; }
      .romania-reading-grid p { margin: 0; }
      .guided-status-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }

      body.theme-dark .romania-reference-figure img { background: #ffffff; border-color: #40506b; }
      body.theme-dark .formalization-card,
      body.theme-dark .formalization-mini-example,
      body.theme-dark .formalization-table-wrap,
      body.theme-dark .problem-upgrade-card,
      body.theme-dark .problem-upgrade-grid article,
      body.theme-dark .concept-anchor-card,
      body.theme-dark .concept-anchor-grid article,
      body.theme-dark .romania-reading-grid article { background: var(--paper); border-color: var(--line); }
      body.theme-dark .formalization-list li,
      body.theme-dark .formalization-table th { background: var(--soft); }

      @media (max-width: 980px) {
        #visao .overview-grid,
        .formalization-compare,
        .problem-upgrade-grid,
        .concept-anchor-grid,
        .romania-reading-grid,
        .guided-status-grid { grid-template-columns: 1fr; }
      }
    `;
    document.head.appendChild(style);
  };

  const organizeTopicList = () => {
    const list = document.querySelector('#visao .topic-list');
    if (!list || list.dataset.ordered === 'true') return;

    const orderedTopics = [
      'Busca informada',
      'Função heurística h(n)',
      'Busca gulosa',
      'Custo acumulado g(n)',
      'Função f(n) = g(n) + h(n)',
      'Algoritmo A*',
      'Admissibilidade',
      'Comparação de estratégias'
    ];

    list.innerHTML = orderedTopics.map((topic) => `<div>${topic}</div>`).join('');
    list.dataset.ordered = 'true';
  };

  const compactCompetencyCards = () => {
    const overview = document.querySelector('#visao .overview-grid');
    if (!overview || overview.querySelector('.competency-stack')) return;

    const competencyCards = [...overview.querySelectorAll(':scope > article.competency')];
    if (!competencyCards.length) return;

    const stack = document.createElement('div');
    stack.className = 'competency-stack';
    competencyCards[0].before(stack);
    competencyCards.forEach((card) => stack.appendChild(card));
  };

  const insertFormalizationSection = () => {
    const percurso = document.querySelector('#percurso');
    if (!percurso || document.querySelector('#formalizacao-informada')) return;

    percurso.insertAdjacentHTML('afterend', `
      <section class="section section-soft formalization-section" id="formalizacao-informada">
        <div class="container">
          <div class="section-heading">
            <p class="eyebrow">Formulação do problema</p>
            <h2>O que muda quando a busca passa a usar heurística?</h2>
            <p>Antes de falar de algoritmo, precisamos ajustar a descrição do problema. Na busca não informada, o algoritmo enxerga apenas a estrutura do espaço de estados. Na busca informada, a mesma formulação precisa carregar informação de custo e uma estimativa de proximidade do objetivo.</p>
          </div>

          <div class="formalization-compare">
            <article class="formalization-card">
              <h3>Como ficava na Aula 04</h3>
              <ul class="formalization-list">
                <li><strong>Estado inicial</strong><span>Arad.</span></li>
                <li><strong>Objetivo</strong><span>Chegar a Bucharest.</span></li>
                <li><strong>Sucessores</strong><span>Cidades diretamente conectadas por estradas.</span></li>
                <li><strong>Critério de expansão</strong><span>Fila no BFS ou pilha no DFS.</span></li>
              </ul>
            </article>

            <article class="formalization-card">
              <h3>Como precisa ficar na Aula 05</h3>
              <ul class="formalization-list">
                <li><strong>Custo da ação</strong><span>Distância de cada estrada, como Arad → Sibiu = 140.</span></li>
                <li><strong>Custo acumulado g(n)</strong><span>Quanto já foi gasto do início até o estado atual.</span></li>
                <li><strong>Heurística h(n)</strong><span>Estimativa de quanto falta de cada cidade até Bucharest.</span></li>
                <li><strong>Prioridade</strong><span>Menor h(n) na gulosa; menor g(n)+h(n) no A*.</span></li>
              </ul>
            </article>
          </div>

          <div class="formalization-mini-example">
            <h3>Exemplo rápido no mapa da Romênia</h3>
            <p>Ao chegar em Sibiu, duas alternativas importantes aparecem. Fagaras parece um pouco mais próxima do destino pela heurística, mas Rimnicu Vilcea tem menor custo total estimado quando somamos o que já foi gasto com o que ainda parece faltar.</p>
            <div class="formalization-table-wrap">
              <table class="formalization-table">
                <thead><tr><th>Alternativa</th><th>g(n)</th><th>h(n)</th><th>g(n)+h(n)</th><th>Leitura</th></tr></thead>
                <tbody>
                  <tr><td>Fagaras</td><td>239</td><td>176</td><td>415</td><td>Boa pela heurística, mas com custo acumulado maior.</td></tr>
                  <tr><td>Rimnicu Vilcea</td><td>220</td><td>193</td><td>413</td><td>Menos atraente pela heurística isolada, mas melhor para A*.</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    `);
  };

  const updateBridgeText = () => {
    const paragraph = document.querySelector('#ponte .warmup h2 + p');
    if (!paragraph) return;
    paragraph.textContent = 'BFS e DFS não usam pistas sobre o destino. Eles apenas seguem a regra da estrutura: fila no BFS, pilha no DFS. A busca informada muda isso ao acrescentar uma estimativa de proximidade do objetivo.';
  };

  const insertConceptAnchorCard = () => {
    const heuristicSection = document.querySelector('#heuristica .container');
    const principles = heuristicSection?.querySelector('.heuristic-callout');
    if (!heuristicSection || !principles || heuristicSection.querySelector('.concept-anchor-card')) return;

    principles.insertAdjacentHTML('afterend', `
      <div class="concept-anchor-card">
        <h3>Como avaliar se uma heurística ajuda?</h3>
        <p>Uma heurística não é julgada apenas por parecer intuitiva. Ela precisa ser conectada ao domínio do problema, barata de calcular e útil para ordenar a fronteira sem esconder o custo real do caminho.</p>
        <div class="concept-anchor-grid">
          <article><strong>Domínio</strong><span>A estimativa precisa ter relação com o objetivo.</span></article>
          <article><strong>Custo de cálculo</strong><span>Calcular h(n) não pode ser tão caro quanto resolver o problema.</span></article>
          <article><strong>Qualidade da pista</strong><span>Quanto melhor a estimativa, menor tende a ser a exploração desnecessária.</span></article>
          <article><strong>Garantia</strong><span>Para discutir otimalidade no A*, a admissibilidade passa a importar.</span></article>
        </div>
      </div>
    `);
  };

  const configureRomaniaReference = () => {
    const section = root.closest('section');
    const sectionTitle = section?.querySelector('.section-heading h2');
    const sectionIntro = section?.querySelector('.section-heading p:last-child');
    const graphTitle = root.querySelector('.graph-heading h3');
    const graphIntro = root.querySelector('.graph-heading p');
    const graphLegend = root.querySelector('.graph-legend');
    const graph = root.querySelector('.guided-graph');

    if (sectionTitle) sectionTitle.textContent = 'Greedy e A* no mapa da Romênia';
    if (sectionIntro) sectionIntro.textContent = 'Vamos usar o exemplo clássico de rotas: sair de Arad e chegar a Bucharest. O mapa fornece as conexões e os custos das estradas; a busca informada acrescenta uma heurística para estimar o quanto falta até o destino.';
    if (graphTitle) graphTitle.textContent = 'Mapa de referência';
    if (graphIntro) graphIntro.innerHTML = 'Objetivo: sair de <strong>Arad</strong> e chegar a <strong>Bucharest</strong> com menor custo.';
    if (graphLegend) graphLegend.innerHTML = '<span>arestas = estradas</span><span>números = custos das estradas</span>';

    if (graph) {
      graph.classList.add('romania-reference-map');
      graph.setAttribute('aria-label', 'Figura de referência com o mapa simplificado da Romênia');
      graph.innerHTML = `
        <figure class="romania-reference-figure">
          <img src="assets/mapa-romenia-russell-norvig-fig-3-1.png" alt="Mapa simplificado de parte da Romênia, com cidades conectadas por estradas e distâncias entre elas." loading="lazy">
          <figcaption>
            <strong>Figura de referência.</strong> Mapa simplificado da Romênia usado como base para o problema de rotas. Fonte: Russell, S.; Norvig, P. <em>Artificial Intelligence: A Modern Approach</em>, Figure 3.1.
          </figcaption>
        </figure>
      `;
    }

    if (!section?.querySelector('.romania-reading-grid')) {
      const graphCard = root.querySelector('.guided-graph-card');
      graphCard?.insertAdjacentHTML('beforeend', `
        <div class="romania-reading-grid">
          <article><small>01</small><h3>O que o mapa fornece?</h3><p>Ele define os estados, as conexões entre cidades e o custo real de cada estrada.</p></article>
          <article><small>02</small><h3>O que ainda falta?</h3><p>Para busca informada, precisamos acrescentar h(n): uma estimativa de distância de cada cidade até Bucharest.</p></article>
          <article><small>03</small><h3>Por que isso muda a busca?</h3><p>A fronteira deixa de seguir apenas ordem de chegada ou profundidade e passa a ser ordenada por uma estimativa.</p></article>
        </div>
      `);
    }

    const costExample = document.querySelector('.cost-example');
    if (costExample) {
      const blocks = costExample.querySelectorAll('div');
      if (blocks[0]) blocks[0].innerHTML = '<small>Distância já percorrida até Pitesti</small><strong>g(n) = 317</strong>';
      if (blocks[1]) blocks[1].innerHTML = '<small>Estimativa de Pitesti até Bucharest</small><strong>h(n) = 100</strong>';
      if (blocks[2]) blocks[2].innerHTML = '<small>Estimativa total por Pitesti</small><strong>f(n) = 417</strong>';
    }

    const questions = section?.querySelectorAll('.experiment-questions article');
    if (questions?.[0]) questions[0].querySelector('p').textContent = 'Registre o caminho encontrado e some os custos das estradas.';
    if (questions?.[1]) questions[1].querySelector('p').textContent = 'Observe o momento em que a rota aparentemente direta por Fagaras perde para a alternativa por Rimnicu Vilcea e Pitesti.';
    if (questions?.[2]) questions[2].querySelector('p').textContent = 'Fagaras parece mais perto de Bucharest pela heurística, mas o custo real Fagaras → Bucharest é alto.';

    const tableBody = document.querySelector('.heuristic-check-table tbody');
    if (tableBody) {
      tableBody.innerHTML = `
        <tr><td>Arad</td><td>366</td><td>418</td><td><strong>Sim</strong></td></tr>
        <tr><td>Sibiu</td><td>253</td><td>278</td><td><strong>Sim</strong></td></tr>
        <tr><td>Fagaras</td><td>176</td><td>211</td><td><strong>Sim</strong></td></tr>
        <tr><td>Rimnicu Vilcea</td><td>193</td><td>198</td><td><strong>Sim</strong></td></tr>
        <tr><td>Pitesti</td><td>100</td><td>101</td><td><strong>Sim</strong></td></tr>
        <tr><td>Bucharest</td><td>0</td><td>0</td><td><strong>Sim</strong></td></tr>
      `;
    }
  };

  injectAula05Adjustments();
  organizeTopicList();
  compactCompetencyCards();
  insertFormalizationSection();
  updateBridgeText();
  insertConceptAnchorCard();
  configureRomaniaReference();

  const modeButtons = [...root.querySelectorAll('[data-mode]')];
  const stepButton = root.querySelector('[data-step]');
  const resetButton = root.querySelector('[data-reset]');

  const currentEl = root.querySelector('[data-current]');
  const frontierEl = root.querySelector('[data-frontier]');
  const costEl = root.querySelector('[data-cost]');
  const pathEl = root.querySelector('[data-path]');
  const explanationEl = root.querySelector('[data-explanation]');
  const outcomeEl = root.querySelector('[data-outcome]');

  if (!stepButton || !resetButton || !currentEl || !frontierEl || !costEl || !pathEl || !explanationEl || !outcomeEl) return;

  const frames = {
    greedy: [
      { current: '—', frontier: 'Arad · h=366', cost: '0', path: 'Arad', explanation: 'Começamos em Arad. Na busca gulosa, a fronteira será ordenada somente pela menor estimativa h(n) até Bucharest.' },
      { current: 'Arad', frontier: 'Sibiu · h=253  |  Timisoara · h=329  |  Zerind · h=374', cost: '0', path: 'Arad', explanation: 'Ao expandir Arad, aparecem três alternativas. Sibiu parece mais perto de Bucharest, então é escolhido primeiro.' },
      { current: 'Sibiu', frontier: 'Fagaras · h=176  |  Rimnicu Vilcea · h=193  |  Timisoara · h=329  |  Zerind · h=374  |  Oradea · h=380', cost: '140', path: 'Arad → Sibiu', explanation: 'Sibiu gera Fagaras e Rimnicu Vilcea. Como Fagaras tem o menor h(n), a busca gulosa segue por ele.' },
      { current: 'Fagaras', frontier: 'Bucharest · h=0  |  Rimnicu Vilcea · h=193  |  Timisoara · h=329  |  Zerind · h=374  |  Oradea · h=380', cost: '239', path: 'Arad → Sibiu → Fagaras', explanation: 'Fagaras parece excelente pela heurística. Ao expandi-lo, Bucharest entra na fronteira com h=0.' },
      { current: 'Bucharest', frontier: 'Rimnicu Vilcea · h=193  |  Timisoara · h=329  |  Zerind · h=374  |  Oradea · h=380', cost: '450', path: 'Arad → Sibiu → Fagaras → Bucharest', explanation: 'Bucharest é retirado da fronteira e satisfaz o objetivo. A busca termina sem investigar a alternativa por Rimnicu Vilcea e Pitesti.', outcome: 'Busca gulosa: solução com custo 450. Foi direta, mas não encontrou a rota de menor custo.' }
    ],
    astar: [
      { current: '—', frontier: 'Arad · f=366', cost: '0', path: 'Arad', explanation: 'Começamos em Arad. No A*, cada prioridade é calculada por f(n)=g(n)+h(n).' },
      { current: 'Arad', frontier: 'Sibiu · f=393  |  Timisoara · f=447  |  Zerind · f=449', cost: '0', path: 'Arad', explanation: 'Depois de expandir Arad: Sibiu tem g=140 e h=253, então f=393. É a menor prioridade da fronteira.' },
      { current: 'Sibiu', frontier: 'Rimnicu Vilcea · f=413  |  Fagaras · f=415  |  Timisoara · f=447  |  Zerind · f=449  |  Oradea · f=671', cost: '140', path: 'Arad → Sibiu', explanation: 'Sibiu gera Rimnicu Vilcea e Fagaras. A rota por Rimnicu Vilcea tem f=220+193=413, ligeiramente melhor que Fagaras.' },
      { current: 'Rimnicu Vilcea', frontier: 'Fagaras · f=415  |  Pitesti · f=417  |  Timisoara · f=447  |  Zerind · f=449  |  Craiova · f=526  |  Oradea · f=671', cost: '220', path: 'Arad → Sibiu → Rimnicu Vilcea', explanation: 'Rimnicu Vilcea aproxima o algoritmo de Pitesti, mas Fagaras ainda tem f um pouco menor. O A* mantém as alternativas concorrendo.' },
      { current: 'Fagaras', frontier: 'Pitesti · f=417  |  Timisoara · f=447  |  Zerind · f=449  |  Bucharest · f=450  |  Craiova · f=526  |  Oradea · f=671', cost: '239', path: 'Arad → Sibiu → Fagaras', explanation: 'Fagaras gera Bucharest com custo total 450. O objetivo apareceu, mas não é escolhido ainda porque Pitesti tem f=417.' },
      { current: 'Pitesti', frontier: 'Bucharest · f=418  |  Timisoara · f=447  |  Zerind · f=449  |  Craiova · f=526  |  Oradea · f=671', cost: '317', path: 'Arad → Sibiu → Rimnicu Vilcea → Pitesti', explanation: 'Pitesti gera uma rota melhor para Bucharest: g=418 e h=0. Agora Bucharest passa a ter a menor prioridade.' },
      { current: 'Bucharest', frontier: 'Timisoara · f=447  |  Zerind · f=449  |  Craiova · f=526  |  Oradea · f=671', cost: '418', path: 'Arad → Sibiu → Rimnicu Vilcea → Pitesti → Bucharest', explanation: 'Bucharest é o menor estado da fronteira e satisfaz o objetivo. O caminho encontrado custa 418.', outcome: 'A*: solução com custo 418. Ao combinar g(n) e h(n), evitou aceitar a rota mais cara por Fagaras.' }
    ]
  };

  let mode = 'greedy';
  let frameIndex = 0;

  const render = () => {
    const frame = frames[mode][frameIndex];
    if (!frame) return;

    currentEl.textContent = frame.current;
    frontierEl.textContent = frame.frontier;
    costEl.textContent = frame.cost;
    pathEl.textContent = frame.path;
    explanationEl.textContent = frame.explanation;
    outcomeEl.textContent = frame.outcome || '';

    const atEnd = frameIndex === frames[mode].length - 1;
    stepButton.disabled = atEnd;
    stepButton.textContent = atEnd ? 'Execução concluída' : 'Executar um passo';
  };

  const reset = () => {
    frameIndex = 0;
    render();
  };

  modeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      mode = button.dataset.mode;
      modeButtons.forEach((item) => item.classList.toggle('active', item === button));
      reset();
    });
  });

  stepButton.addEventListener('click', () => {
    if (frameIndex < frames[mode].length - 1) {
      frameIndex += 1;
      render();
    }
  });

  resetButton.addEventListener('click', reset);

  render();
})();
