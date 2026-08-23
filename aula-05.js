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

      .problem-upgrade-card {
        margin-top: 1.4rem;
        padding: 1.35rem 1.45rem;
        border: 1px solid var(--line);
        border-left: 5px solid var(--violet);
        border-radius: 20px;
        background: var(--paper);
        box-shadow: var(--shadow);
      }

      .problem-upgrade-card h3 {
        margin: 0 0 .6rem;
      }

      .problem-upgrade-card p {
        margin: 0;
      }

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
      .problem-upgrade-grid span {
        display: block;
      }

      .problem-upgrade-grid span {
        margin-top: .35rem;
        color: var(--muted);
      }

      .guided-simulator {
        grid-template-columns: 1fr;
      }

      .guided-graph-card,
      .guided-control-card {
        width: 100%;
      }

      .romania-reference-map {
        min-height: 0 !important;
        padding: 0;
        border: 0;
        background: transparent;
        overflow: visible;
      }

      .romania-reference-figure {
        margin: 0;
      }

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

      .romania-reference-figure figcaption strong {
        color: var(--ink);
      }

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

      .romania-reading-grid h3 {
        margin: .75rem 0 .45rem;
      }

      .romania-reading-grid p {
        margin: 0;
      }

      .guided-status-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }

      body.theme-dark .romania-reference-figure img {
        background: #ffffff;
        border-color: #40506b;
      }

      body.theme-dark .problem-upgrade-card,
      body.theme-dark .problem-upgrade-grid article,
      body.theme-dark .romania-reading-grid article {
        background: var(--paper);
        border-color: var(--line);
      }

      @media (max-width: 980px) {
        #visao .overview-grid,
        .problem-upgrade-grid,
        .romania-reading-grid,
        .guided-status-grid {
          grid-template-columns: 1fr;
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

  const insertProblemUpgradeCard = () => {
    const container = document.querySelector('#ponte .container');
    const bridge = container?.querySelector('.bridge-grid');
    if (!container || !bridge || container.querySelector('.problem-upgrade-card')) return;

    const card = document.createElement('div');
    card.className = 'problem-upgrade-card';
    card.innerHTML = `
      <h3>Agora a formulação do problema precisa ficar mais rica</h3>
      <p>Na Aula 04, para BFS e DFS, bastava descrever estados, ações, sucessores e objetivo. Na busca informada, o objetivo continua o mesmo, mas a representação precisa incluir informação para comparar alternativas.</p>
      <div class="problem-upgrade-grid">
        <article>
          <strong>Antes: problema de busca não informada</strong>
          <span>estado inicial, ações possíveis, função de sucessores, teste de objetivo e controle de visitados.</span>
        </article>
        <article>
          <strong>Agora: problema de busca informada</strong>
          <span>além dos itens anteriores, entram custo de ação, custo acumulado g(n) e heurística h(n).</span>
        </article>
      </div>
    `;
    bridge.insertAdjacentElement('afterend', card);
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
          <img
            src="assets/mapa-romenia-russell-norvig-fig-3-1.png"
            alt="Mapa simplificado de parte da Romênia, com cidades conectadas por estradas e distâncias entre elas."
            loading="lazy"
          >
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
          <article>
            <small>01</small>
            <h3>O que o mapa fornece?</h3>
            <p>Ele define os estados, as conexões entre cidades e o custo real de cada estrada.</p>
          </article>
          <article>
            <small>02</small>
            <h3>O que ainda falta?</h3>
            <p>Para busca informada, precisamos acrescentar h(n): uma estimativa de distância de cada cidade até Bucharest.</p>
          </article>
          <article>
            <small>03</small>
            <h3>Por que isso muda a busca?</h3>
            <p>A fronteira deixa de seguir apenas ordem de chegada ou profundidade e passa a ser ordenada por uma estimativa.</p>
          </article>
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
  compactCompetencyCards();
  insertProblemUpgradeCard();
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

  const frames = {
    greedy: [
      {
        current: '—',
        frontier: 'Arad · h=366',
        cost: '0',
        path: 'Arad',
        explanation: 'Começamos em Arad. Na busca gulosa, a fronteira será ordenada somente pela menor estimativa h(n) até Bucharest.'
      },
      {
        current: 'Arad',
        frontier: 'Sibiu · h=253  |  Timisoara · h=329  |  Zerind · h=374',
        cost: '0',
        path: 'Arad',
        explanation: 'Ao expandir Arad, aparecem três alternativas. Sibiu parece mais perto de Bucharest, então é escolhido primeiro.'
      },
      {
        current: 'Sibiu',
        frontier: 'Fagaras · h=176  |  Rimnicu Vilcea · h=193  |  Timisoara · h=329  |  Zerind · h=374  |  Oradea · h=380',
        cost: '140',
        path: 'Arad → Sibiu',
        explanation: 'Sibiu gera Fagaras e Rimnicu Vilcea. Como Fagaras tem o menor h(n), a busca gulosa segue por ele.'
      },
      {
        current: 'Fagaras',
        frontier: 'Bucharest · h=0  |  Rimnicu Vilcea · h=193  |  Timisoara · h=329  |  Zerind · h=374  |  Oradea · h=380',
        cost: '239',
        path: 'Arad → Sibiu → Fagaras',
        explanation: 'Fagaras parece excelente pela heurística. Ao expandi-lo, Bucharest entra na fronteira com h=0.'
      },
      {
        current: 'Bucharest',
        frontier: 'Rimnicu Vilcea · h=193  |  Timisoara · h=329  |  Zerind · h=374  |  Oradea · h=380',
        cost: '450',
        path: 'Arad → Sibiu → Fagaras → Bucharest',
        explanation: 'Bucharest é retirado da fronteira e satisfaz o objetivo. A busca termina sem investigar a alternativa por Rimnicu Vilcea e Pitesti.',
        outcome: 'Busca gulosa: solução com custo 450. Foi direta, mas não encontrou a rota de menor custo.'
      }
    ],
    astar: [
      {
        current: '—',
        frontier: 'Arad · f=366',
        cost: '0',
        path: 'Arad',
        explanation: 'Começamos em Arad. No A*, cada prioridade é calculada por f(n)=g(n)+h(n).'
      },
      {
        current: 'Arad',
        frontier: 'Sibiu · f=393  |  Timisoara · f=447  |  Zerind · f=449',
        cost: '0',
        path: 'Arad',
        explanation: 'Depois de expandir Arad: Sibiu tem g=140 e h=253, então f=393. É a menor prioridade da fronteira.'
      },
      {
        current: 'Sibiu',
        frontier: 'Rimnicu Vilcea · f=413  |  Fagaras · f=415  |  Timisoara · f=447  |  Zerind · f=449  |  Oradea · f=671',
        cost: '140',
        path: 'Arad → Sibiu',
        explanation: 'Sibiu gera Rimnicu Vilcea e Fagaras. A rota por Rimnicu Vilcea tem f=220+193=413, ligeiramente melhor que Fagaras.'
      },
      {
        current: 'Rimnicu Vilcea',
        frontier: 'Fagaras · f=415  |  Pitesti · f=417  |  Timisoara · f=447  |  Zerind · f=449  |  Craiova · f=526  |  Oradea · f=671',
        cost: '220',
        path: 'Arad → Sibiu → Rimnicu Vilcea',
        explanation: 'Rimnicu Vilcea aproxima o algoritmo de Pitesti, mas Fagaras ainda tem f um pouco menor. O A* mantém as alternativas concorrendo.'
      },
      {
        current: 'Fagaras',
        frontier: 'Pitesti · f=417  |  Timisoara · f=447  |  Zerind · f=449  |  Bucharest · f=450  |  Craiova · f=526  |  Oradea · f=671',
        cost: '239',
        path: 'Arad → Sibiu → Fagaras',
        explanation: 'Fagaras gera Bucharest com custo total 450. O objetivo apareceu, mas não é escolhido ainda porque Pitesti tem f=417.'
      },
      {
        current: 'Pitesti',
        frontier: 'Bucharest · f=418  |  Timisoara · f=447  |  Zerind · f=449  |  Craiova · f=526  |  Oradea · f=671',
        cost: '317',
        path: 'Arad → Sibiu → Rimnicu Vilcea → Pitesti',
        explanation: 'Pitesti gera uma rota melhor para Bucharest: g=418 e h=0. Agora Bucharest passa a ter a menor prioridade.'
      },
      {
        current: 'Bucharest',
        frontier: 'Timisoara · f=447  |  Zerind · f=449  |  Craiova · f=526  |  Oradea · f=671',
        cost: '418',
        path: 'Arad → Sibiu → Rimnicu Vilcea → Pitesti → Bucharest',
        explanation: 'Bucharest é o menor estado da fronteira e satisfaz o objetivo. O caminho encontrado custa 418.',
        outcome: 'A*: solução com custo 418. Ao combinar g(n) e h(n), evitou aceitar a rota mais cara por Fagaras.'
      }
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
