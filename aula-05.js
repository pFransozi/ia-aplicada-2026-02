(() => {
  const root = document.querySelector('[data-guided-search]');
  if (!root) return;

  const injectAula05Adjustments = () => {
    if (document.getElementById('aula05-competencias-romenia-ajustes')) return;

    const style = document.createElement('style');
    style.id = 'aula05-competencias-romenia-ajustes';
    style.textContent = `
      #visao .overview-grid {
        row-gap: 10px;
        align-items: start;
      }

      #visao .overview-grid .competency {
        align-self: start;
        min-height: 0;
        padding: 1.15rem 1.25rem;
      }

      #visao .overview-grid .competency h3 {
        margin-bottom: .55rem;
      }

      #visao .overview-grid .competency .skill {
        margin-top: 0;
        gap: .6rem;
      }

      #visao .overview-grid .competency .skill strong {
        min-height: 34px;
      }

      .romania-graph {
        min-height: 455px;
      }

      .romania-graph .guided-node {
        width: 94px;
        min-height: 56px;
        padding: .42rem .5rem;
      }

      .romania-graph .guided-node strong {
        font-size: .92rem;
        line-height: 1.1;
      }

      .romania-graph .guided-node small {
        font-size: .66rem;
      }

      .romania-graph .edge-cost {
        min-width: 32px;
        min-height: 28px;
        font-size: .72rem;
      }

      @media (max-width: 720px) {
        #visao .overview-grid {
          gap: 12px;
        }

        .romania-graph {
          min-height: 390px;
        }

        .romania-graph .guided-node {
          width: 76px;
          min-height: 52px;
        }
      }
    `;
    document.head.appendChild(style);
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
        <svg viewBox="0 0 100 74" preserveAspectRatio="none" aria-hidden="true">
          <line x1="9" y1="39" x2="23" y2="18"></line>
          <line x1="23" y1="18" x2="39" y2="14"></line>
          <line x1="39" y1="14" x2="43" y2="39"></line>
          <line x1="9" y1="39" x2="24" y2="63"></line>
          <line x1="9" y1="39" x2="43" y2="39"></line>
          <line x1="43" y1="39" x2="63" y2="25"></line>
          <line x1="43" y1="39" x2="60" y2="55"></line>
          <line x1="60" y1="55" x2="78" y2="55"></line>
          <line x1="60" y1="55" x2="72" y2="72"></line>
          <line x1="72" y1="72" x2="78" y2="55"></line>
          <line x1="63" y1="25" x2="91" y2="38"></line>
          <line x1="78" y1="55" x2="91" y2="38"></line>
        </svg>

        <span class="edge-cost" style="left:15%;top:27%">75</span>
        <span class="edge-cost" style="left:31%;top:13%">71</span>
        <span class="edge-cost" style="left:43%;top:25%">151</span>
        <span class="edge-cost" style="left:17%;top:53%">118</span>
        <span class="edge-cost" style="left:27%;top:34%">140</span>
        <span class="edge-cost" style="left:54%;top:30%">99</span>
        <span class="edge-cost" style="left:51%;top:49%">80</span>
        <span class="edge-cost" style="left:69%;top:59%">97</span>
        <span class="edge-cost" style="left:65%;top:68%">146</span>
        <span class="edge-cost" style="left:78%;top:67%">138</span>
        <span class="edge-cost" style="left:77%;top:27%">211</span>
        <span class="edge-cost" style="left:86%;top:49%">101</span>

        <div class="guided-node" data-node="Arad" style="left:9%;top:39%"><strong>Arad</strong><small>h=366</small></div>
        <div class="guided-node" data-node="Zerind" style="left:23%;top:18%"><strong>Zerind</strong><small>h=374</small></div>
        <div class="guided-node" data-node="Oradea" style="left:39%;top:14%"><strong>Oradea</strong><small>h=380</small></div>
        <div class="guided-node" data-node="Timisoara" style="left:24%;top:63%"><strong>Timisoara</strong><small>h=329</small></div>
        <div class="guided-node" data-node="Sibiu" style="left:43%;top:39%"><strong>Sibiu</strong><small>h=253</small></div>
        <div class="guided-node" data-node="Fagaras" style="left:63%;top:25%"><strong>Fagaras</strong><small>h=176</small></div>
        <div class="guided-node" data-node="Rimnicu" style="left:60%;top:55%"><strong>Rimnicu</strong><small>h=193</small></div>
        <div class="guided-node" data-node="Craiova" style="left:72%;top:72%"><strong>Craiova</strong><small>h=160</small></div>
        <div class="guided-node" data-node="Pitesti" style="left:78%;top:55%"><strong>Pitesti</strong><small>h=100</small></div>
        <div class="guided-node goal" data-node="Bucharest" style="left:91%;top:38%"><strong>Bucareste</strong><small>h=0</small></div>
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