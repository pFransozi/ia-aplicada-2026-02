(() => {
  const root = document.querySelector('[data-guided-search]');
  if (!root) return;

  const injectAula05Adjustments = () => {
    if (document.getElementById('aula05-layout-romenia-ajustes')) return;

    const style = document.createElement('style');
    style.id = 'aula05-layout-romenia-ajustes';
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

      .romania-graph {
        min-height: 520px;
        padding: 0;
        overflow: hidden;
      }

      .romania-map-svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }

      .romania-road {
        fill: none;
        stroke: #6d7f9c;
        stroke-width: 8;
        stroke-linecap: round;
        stroke-linejoin: round;
        opacity: .84;
      }

      .romania-cost rect {
        fill: rgba(255, 255, 255, .94);
        stroke: #cbd5e1;
        stroke-width: 2;
        rx: 16;
      }

      .romania-cost text {
        fill: #172033;
        font-size: 19px;
        font-weight: 900;
        dominant-baseline: middle;
        text-anchor: middle;
      }

      .romania-city rect {
        fill: var(--paper);
        stroke: #40506b;
        stroke-width: 3;
        rx: 18;
        filter: drop-shadow(0 10px 18px rgba(0,0,0,.12));
        transition: fill .2s ease, stroke .2s ease, stroke-width .2s ease;
      }

      .romania-city text {
        fill: var(--ink);
        font-weight: 900;
        text-anchor: middle;
        dominant-baseline: middle;
      }

      .romania-city .city-name {
        font-size: 24px;
      }

      .romania-city .city-h {
        fill: var(--muted);
        font-size: 16px;
        font-weight: 800;
      }

      .romania-city.discovered rect {
        fill: var(--blue-soft);
        stroke: var(--blue);
      }

      .romania-city.expanded rect {
        fill: var(--teal-soft);
        stroke: var(--teal);
      }

      .romania-city.current rect {
        fill: var(--amber-soft);
        stroke: var(--amber);
        stroke-width: 4;
      }

      .romania-city.found rect {
        fill: var(--violet-soft);
        stroke: var(--violet);
        stroke-width: 4;
      }

      body.theme-dark .romania-road {
        stroke: #637592;
        opacity: .82;
      }

      body.theme-dark .romania-cost rect {
        fill: #0d1422;
        stroke: #40506b;
      }

      body.theme-dark .romania-cost text {
        fill: #eef4ff;
      }

      @media (max-width: 980px) {
        #visao .overview-grid {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 720px) {
        .romania-graph {
          min-height: 430px;
        }

        .romania-city .city-name {
          font-size: 20px;
        }

        .romania-city .city-h {
          font-size: 14px;
        }
      }
    `;
    document.head.appendChild(style);
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

  const configureRomaniaGraph = () => {
    const section = root.closest('section');
    const sectionTitle = section?.querySelector('.section-heading h2');
    const sectionIntro = section?.querySelector('.section-heading p:last-child');
    const graphTitle = root.querySelector('.graph-heading h3');
    const graphIntro = root.querySelector('.graph-heading p');
    const graphLegend = root.querySelector('.graph-legend');
    const graph = root.querySelector('.guided-graph');

    if (sectionTitle) sectionTitle.textContent = 'Greedy e A* no mapa da Romênia';
    if (sectionIntro) sectionIntro.textContent = 'Os dois algoritmos recebem a mesma heurística de distância em linha reta até Bucareste. A diferença é que A* também considera o custo acumulado da rota.';
    if (graphTitle) graphTitle.textContent = 'Mapa simplificado da Romênia';
    if (graphIntro) graphIntro.innerHTML = 'Objetivo: sair de <strong>Arad</strong> e chegar a <strong>Bucareste</strong> com menor custo.';
    if (graphLegend) graphLegend.innerHTML = '<span>número na aresta = custo da estrada</span><span>h = distância em linha reta até Bucareste</span>';

    if (graph) {
      graph.classList.add('romania-graph');
      graph.setAttribute('aria-label', 'Grafo simplificado do mapa da Romênia, de Arad a Bucareste');
      graph.innerHTML = `
        <svg class="romania-map-svg" viewBox="0 0 1000 540" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Mapa simplificado da Romênia usado para comparar busca gulosa e A estrela">
          <g class="roads" aria-hidden="true">
            <path class="romania-road" d="M 110 250 L 230 125" />
            <path class="romania-road" d="M 230 125 L 385 92" />
            <path class="romania-road" d="M 385 92 L 435 255" />
            <path class="romania-road" d="M 110 250 L 235 400" />
            <path class="romania-road" d="M 110 250 L 435 255" />
            <path class="romania-road" d="M 435 255 L 635 170" />
            <path class="romania-road" d="M 435 255 L 605 350" />
            <path class="romania-road" d="M 605 350 L 780 350" />
            <path class="romania-road" d="M 605 350 L 700 465" />
            <path class="romania-road" d="M 700 465 L 780 350" />
            <path class="romania-road" d="M 635 170 L 900 250" />
            <path class="romania-road" d="M 780 350 L 900 250" />
          </g>

          <g class="romania-cost"><rect x="148" y="174" width="52" height="32" /><text x="174" y="190">75</text></g>
          <g class="romania-cost"><rect x="292" y="91" width="52" height="32" /><text x="318" y="107">71</text></g>
          <g class="romania-cost"><rect x="385" y="165" width="58" height="32" /><text x="414" y="181">151</text></g>
          <g class="romania-cost"><rect x="148" y="330" width="58" height="32" /><text x="177" y="346">118</text></g>
          <g class="romania-cost"><rect x="255" y="228" width="58" height="32" /><text x="284" y="244">140</text></g>
          <g class="romania-cost"><rect x="522" y="194" width="52" height="32" /><text x="548" y="210">99</text></g>
          <g class="romania-cost"><rect x="500" y="292" width="52" height="32" /><text x="526" y="308">80</text></g>
          <g class="romania-cost"><rect x="678" y="330" width="52" height="32" /><text x="704" y="346">97</text></g>
          <g class="romania-cost"><rect x="620" y="408" width="58" height="32" /><text x="649" y="424">146</text></g>
          <g class="romania-cost"><rect x="720" y="420" width="58" height="32" /><text x="749" y="436">138</text></g>
          <g class="romania-cost"><rect x="780" y="182" width="58" height="32" /><text x="809" y="198">211</text></g>
          <g class="romania-cost"><rect x="832" y="292" width="58" height="32" /><text x="861" y="308">101</text></g>

          <g class="romania-city" data-node="Arad">
            <rect x="42" y="220" width="136" height="66" />
            <text class="city-name" x="110" y="244">Arad</text>
            <text class="city-h" x="110" y="270">h=366</text>
          </g>
          <g class="romania-city" data-node="Zerind">
            <rect x="162" y="92" width="136" height="66" />
            <text class="city-name" x="230" y="116">Zerind</text>
            <text class="city-h" x="230" y="142">h=374</text>
          </g>
          <g class="romania-city" data-node="Oradea">
            <rect x="314" y="59" width="142" height="66" />
            <text class="city-name" x="385" y="83">Oradea</text>
            <text class="city-h" x="385" y="109">h=380</text>
          </g>
          <g class="romania-city" data-node="Timisoara">
            <rect x="148" y="367" width="174" height="66" />
            <text class="city-name" x="235" y="391">Timisoara</text>
            <text class="city-h" x="235" y="417">h=329</text>
          </g>
          <g class="romania-city" data-node="Sibiu">
            <rect x="367" y="222" width="136" height="66" />
            <text class="city-name" x="435" y="246">Sibiu</text>
            <text class="city-h" x="435" y="272">h=253</text>
          </g>
          <g class="romania-city" data-node="Fagaras">
            <rect x="558" y="137" width="154" height="66" />
            <text class="city-name" x="635" y="161">Fagaras</text>
            <text class="city-h" x="635" y="187">h=176</text>
          </g>
          <g class="romania-city" data-node="Rimnicu">
            <rect x="522" y="317" width="166" height="66" />
            <text class="city-name" x="605" y="341">Rimnicu</text>
            <text class="city-h" x="605" y="367">h=193</text>
          </g>
          <g class="romania-city" data-node="Craiova">
            <rect x="623" y="432" width="154" height="66" />
            <text class="city-name" x="700" y="456">Craiova</text>
            <text class="city-h" x="700" y="482">h=160</text>
          </g>
          <g class="romania-city" data-node="Pitesti">
            <rect x="712" y="317" width="136" height="66" />
            <text class="city-name" x="780" y="341">Pitesti</text>
            <text class="city-h" x="780" y="367">h=100</text>
          </g>
          <g class="romania-city goal" data-node="Bucharest">
            <rect x="812" y="216" width="176" height="68" />
            <text class="city-name" x="900" y="241">Bucareste</text>
            <text class="city-h" x="900" y="268">h=0</text>
          </g>
        </svg>
      `;
    }

    const costExample = document.querySelector('.cost-example');
    if (costExample) {
      const blocks = costExample.querySelectorAll('div');
      if (blocks[0]) blocks[0].innerHTML = '<small>Distância já percorrida até Pitesti</small><strong>g(n) = 317</strong>';
      if (blocks[1]) blocks[1].innerHTML = '<small>Estimativa de Pitesti até Bucareste</small><strong>h(n) = 100</strong>';
      if (blocks[2]) blocks[2].innerHTML = '<small>Estimativa total por Pitesti</small><strong>f(n) = 417</strong>';
    }

    const questions = section?.querySelectorAll('.experiment-questions article');
    if (questions?.[0]) questions[0].querySelector('p').textContent = 'Registre o caminho encontrado e some os custos das estradas.';
    if (questions?.[1]) questions[1].querySelector('p').textContent = 'Observe o momento em que a rota aparentemente direta por Fagaras perde para a alternativa por Rimnicu e Pitesti.';
    if (questions?.[2]) questions[2].querySelector('p').textContent = 'Fagaras parece mais perto de Bucareste pela heurística, mas o custo real Fagaras → Bucareste é alto.';

    const tableBody = document.querySelector('.heuristic-check-table tbody');
    if (tableBody) {
      tableBody.innerHTML = `
        <tr><td>Arad</td><td>366</td><td>418</td><td><strong>Sim</strong></td></tr>
        <tr><td>Sibiu</td><td>253</td><td>278</td><td><strong>Sim</strong></td></tr>
        <tr><td>Fagaras</td><td>176</td><td>211</td><td><strong>Sim</strong></td></tr>
        <tr><td>Rimnicu</td><td>193</td><td>198</td><td><strong>Sim</strong></td></tr>
        <tr><td>Pitesti</td><td>100</td><td>101</td><td><strong>Sim</strong></td></tr>
        <tr><td>Bucareste</td><td>0</td><td>0</td><td><strong>Sim</strong></td></tr>
      `;
    }
  };

  injectAula05Adjustments();
  compactCompetencyCards();
  configureRomaniaGraph();

  const nodes = [...root.querySelectorAll('[data-node]')];
  const modeButtons = [...root.querySelectorAll('[data-mode]')];
  const stepButton = root.querySelector('[data-step]');
  const resetButton = root.querySelector('[data-reset]');

  const currentEl = root.querySelector('[data-current]');
  const frontierEl = root.querySelector('[data-frontier]');
  const costEl = root.querySelector('[data-cost]');
  const pathEl = root.querySelector('[data-path]');
  const explanationEl = root.querySelector('[data-explanation]');
  const outcomeEl = root.querySelector('[data-outcome]');

  const frames = {
    greedy: [
      {
        current: '—',
        frontier: 'Arad · h=366',
        cost: '0',
        path: 'Arad',
        explanation: 'Começamos em Arad. Na busca gulosa, a fronteira será ordenada somente pela menor distância em linha reta até Bucareste.',
        discovered: ['Arad'],
        expanded: [],
        found: []
      },
      {
        current: 'Arad',
        frontier: 'Sibiu · h=253  |  Timisoara · h=329  |  Zerind · h=374',
        cost: '0',
        path: 'Arad',
        explanation: 'Ao expandir Arad, aparecem três alternativas. Sibiu parece mais perto de Bucareste, então é escolhido primeiro.',
        discovered: ['Sibiu', 'Timisoara', 'Zerind'],
        expanded: ['Arad'],
        found: []
      },
      {
        current: 'Sibiu',
        frontier: 'Fagaras · h=176  |  Rimnicu · h=193  |  Timisoara · h=329  |  Zerind · h=374  |  Oradea · h=380',
        cost: '140',
        path: 'Arad → Sibiu',
        explanation: 'Sibiu gera Fagaras e Rimnicu. Como Fagaras tem o menor h(n), a busca gulosa segue por ele.',
        discovered: ['Fagaras', 'Rimnicu', 'Timisoara', 'Zerind', 'Oradea'],
        expanded: ['Arad', 'Sibiu'],
        found: []
      },
      {
        current: 'Fagaras',
        frontier: 'Bucareste · h=0  |  Rimnicu · h=193  |  Timisoara · h=329  |  Zerind · h=374  |  Oradea · h=380',
        cost: '239',
        path: 'Arad → Sibiu → Fagaras',
        explanation: 'Fagaras parece excelente porque está perto do destino. Ao expandi-lo, Bucareste entra na fronteira com h=0.',
        discovered: ['Bucharest', 'Rimnicu', 'Timisoara', 'Zerind', 'Oradea'],
        expanded: ['Arad', 'Sibiu', 'Fagaras'],
        found: []
      },
      {
        current: 'Bucareste',
        currentNode: 'Bucharest',
        frontier: 'Rimnicu · h=193  |  Timisoara · h=329  |  Zerind · h=374  |  Oradea · h=380',
        cost: '450',
        path: 'Arad → Sibiu → Fagaras → Bucareste',
        explanation: 'Bucareste é retirado da fronteira e satisfaz o objetivo. A busca termina sem investigar a alternativa por Rimnicu e Pitesti.',
        outcome: 'Busca gulosa: solução com custo 450. Foi direta, mas não encontrou a rota de menor custo.',
        discovered: ['Rimnicu', 'Timisoara', 'Zerind', 'Oradea'],
        expanded: ['Arad', 'Sibiu', 'Fagaras'],
        found: ['Bucharest']
      }
    ],
    astar: [
      {
        current: '—',
        frontier: 'Arad · f=366',
        cost: '0',
        path: 'Arad',
        explanation: 'Começamos em Arad. No A*, cada prioridade é calculada por f(n)=g(n)+h(n).',
        discovered: ['Arad'],
        expanded: [],
        found: []
      },
      {
        current: 'Arad',
        frontier: 'Sibiu · f=393  |  Timisoara · f=447  |  Zerind · f=449',
        cost: '0',
        path: 'Arad',
        explanation: 'Depois de expandir Arad: Sibiu tem g=140 e h=253, então f=393. É a menor prioridade da fronteira.',
        discovered: ['Sibiu', 'Timisoara', 'Zerind'],
        expanded: ['Arad'],
        found: []
      },
      {
        current: 'Sibiu',
        frontier: 'Rimnicu · f=413  |  Fagaras · f=415  |  Timisoara · f=447  |  Zerind · f=449  |  Oradea · f=671',
        cost: '140',
        path: 'Arad → Sibiu',
        explanation: 'Sibiu gera Rimnicu e Fagaras. A rota por Rimnicu tem f=220+193=413, ligeiramente melhor que Fagaras.',
        discovered: ['Rimnicu', 'Fagaras', 'Timisoara', 'Zerind', 'Oradea'],
        expanded: ['Arad', 'Sibiu'],
        found: []
      },
      {
        current: 'Rimnicu',
        frontier: 'Fagaras · f=415  |  Pitesti · f=417  |  Timisoara · f=447  |  Zerind · f=449  |  Craiova · f=526  |  Oradea · f=671',
        cost: '220',
        path: 'Arad → Sibiu → Rimnicu',
        explanation: 'Rimnicu aproxima o algoritmo de Pitesti, mas Fagaras ainda tem f um pouco menor. O A* mantém as duas alternativas concorrendo.',
        discovered: ['Fagaras', 'Pitesti', 'Timisoara', 'Zerind', 'Craiova', 'Oradea'],
        expanded: ['Arad', 'Sibiu', 'Rimnicu'],
        found: []
      },
      {
        current: 'Fagaras',
        frontier: 'Pitesti · f=417  |  Timisoara · f=447  |  Zerind · f=449  |  Bucareste · f=450  |  Craiova · f=526  |  Oradea · f=671',
        cost: '239',
        path: 'Arad → Sibiu → Fagaras',
        explanation: 'Fagaras gera Bucareste com custo total 450. O objetivo apareceu, mas não é escolhido ainda porque Pitesti tem f=417.',
        discovered: ['Pitesti', 'Timisoara', 'Zerind', 'Bucharest', 'Craiova', 'Oradea'],
        expanded: ['Arad', 'Sibiu', 'Rimnicu', 'Fagaras'],
        found: []
      },
      {
        current: 'Pitesti',
        frontier: 'Bucareste · f=418  |  Timisoara · f=447  |  Zerind · f=449  |  Craiova · f=526  |  Oradea · f=671',
        cost: '317',
        path: 'Arad → Sibiu → Rimnicu → Pitesti',
        explanation: 'Pitesti gera uma rota melhor para Bucareste: g=418 e h=0. Agora Bucareste passa a ter a menor prioridade.',
        discovered: ['Bucharest', 'Timisoara', 'Zerind', 'Craiova', 'Oradea'],
        expanded: ['Arad', 'Sibiu', 'Rimnicu', 'Fagaras', 'Pitesti'],
        found: []
      },
      {
        current: 'Bucareste',
        currentNode: 'Bucharest',
        frontier: 'Timisoara · f=447  |  Zerind · f=449  |  Craiova · f=526  |  Oradea · f=671',
        cost: '418',
        path: 'Arad → Sibiu → Rimnicu → Pitesti → Bucareste',
        explanation: 'Bucareste é o menor estado da fronteira e satisfaz o objetivo. O caminho encontrado custa 418.',
        outcome: 'A*: solução com custo 418. Ao combinar g(n) e h(n), evitou aceitar a rota mais cara por Fagaras.',
        discovered: ['Timisoara', 'Zerind', 'Craiova', 'Oradea'],
        expanded: ['Arad', 'Sibiu', 'Rimnicu', 'Fagaras', 'Pitesti'],
        found: ['Bucharest']
      }
    ]
  };

  let mode = 'greedy';
  let frameIndex = 0;

  const clearNodeStates = () => {
    nodes.forEach((node) => {
      node.classList.remove('discovered', 'expanded', 'current', 'found');
    });
  };

  const markNodes = (names, className) => {
    names.forEach((name) => {
      root.querySelector(`[data-node="${name}"]`)?.classList.add(className);
    });
  };

  const render = () => {
    const frame = frames[mode][frameIndex];
    if (!frame) return;

    currentEl.textContent = frame.current;
    frontierEl.textContent = frame.frontier;
    costEl.textContent = frame.cost;
    pathEl.textContent = frame.path;
    explanationEl.textContent = frame.explanation;
    outcomeEl.textContent = frame.outcome || '';

    clearNodeStates();
    markNodes(frame.discovered || [], 'discovered');
    markNodes(frame.expanded || [], 'expanded');
    markNodes(frame.found || [], 'found');

    const currentNode = frame.currentNode || frame.current;
    if (currentNode !== '—' && !(frame.found || []).includes(currentNode)) {
      root.querySelector(`[data-node="${currentNode}"]`)?.classList.add('current');
    }

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