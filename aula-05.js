(() => {
  const root = document.querySelector('[data-guided-search]');
  if (!root) return;

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
        frontier: 'S · h=6',
        cost: '0',
        path: 'S',
        explanation: 'Começamos pelo estado inicial. Na busca gulosa, a fronteira será ordenada somente pelo menor valor de h(n).',
        discovered: ['S'],
        expanded: [],
        found: []
      },
      {
        current: 'S',
        frontier: 'A · h=1  |  B · h=4',
        cost: '0',
        path: 'S',
        explanation: 'Ao expandir S, surgem A e B. Como 1 < 4, A passa a ser a alternativa mais promissora para a busca gulosa.',
        discovered: ['A', 'B'],
        expanded: ['S'],
        found: []
      },
      {
        current: 'A',
        frontier: 'G · h=0  |  B · h=4',
        cost: '2',
        path: 'S → A',
        explanation: 'A tem o menor h(n). Ao expandi-lo, o objetivo G entra na fronteira com h(G)=0 e passa para o início da prioridade.',
        discovered: ['B', 'G'],
        expanded: ['S', 'A'],
        found: []
      },
      {
        current: 'G',
        frontier: 'B · h=4',
        cost: '10',
        path: 'S → A → G',
        explanation: 'G é retirado da fronteira e satisfaz o objetivo. A busca termina sem examinar a alternativa por B.',
        outcome: 'Busca gulosa: solução encontrada com custo 10. Foi rápida, mas não encontrou a rota mais barata.',
        discovered: ['B'],
        expanded: ['S', 'A'],
        found: ['G']
      }
    ],
    astar: [
      {
        current: '—',
        frontier: 'S · f=6',
        cost: '0',
        path: 'S',
        explanation: 'Começamos pelo estado inicial. No A*, cada prioridade é calculada por f(n)=g(n)+h(n).',
        discovered: ['S'],
        expanded: [],
        found: []
      },
      {
        current: 'S',
        frontier: 'A · f=3  |  B · f=8',
        cost: '0',
        path: 'S',
        explanation: 'Depois de expandir S: A tem g=2 e h=1, portanto f=3; B tem g=4 e h=4, portanto f=8. A é escolhido primeiro.',
        discovered: ['A', 'B'],
        expanded: ['S'],
        found: []
      },
      {
        current: 'A',
        frontier: 'B · f=8  |  G · f=10',
        cost: '2',
        path: 'S → A',
        explanation: 'A gera G com custo acumulado g=10 e h=0, então f(G)=10. B continua na fronteira com f=8 e passa a ser mais promissor.',
        discovered: ['B', 'G'],
        expanded: ['S', 'A'],
        found: []
      },
      {
        current: 'B',
        frontier: 'C · f=8  |  G · f=10',
        cost: '4',
        path: 'S → B',
        explanation: 'Mesmo que G já tenha aparecido, o A* não aceita imediatamente a rota de custo 10. B tem menor f e ainda pode levar a uma solução mais barata.',
        discovered: ['C', 'G'],
        expanded: ['S', 'A', 'B'],
        found: []
      },
      {
        current: 'C',
        frontier: 'G · f=8',
        cost: '6',
        path: 'S → B → C',
        explanation: 'Por C, encontramos uma nova rota para G: g=8, melhor que o custo 10 conhecido antes. A prioridade de G é atualizada para f=8.',
        discovered: ['G'],
        expanded: ['S', 'A', 'B', 'C'],
        found: []
      },
      {
        current: 'G',
        frontier: 'vazia',
        cost: '8',
        path: 'S → B → C → G',
        explanation: 'Agora G é o menor estado da fronteira e satisfaz o objetivo. O caminho encontrado custa 8.',
        outcome: 'A*: solução encontrada com custo 8. Ao combinar g(n) e h(n), evitou encerrar na rota mais cara encontrada primeiro.',
        discovered: [],
        expanded: ['S', 'A', 'B', 'C'],
        found: ['G']
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

    if (frame.current !== '—' && !(frame.found || []).includes(frame.current)) {
      root.querySelector(`[data-node="${frame.current}"]`)?.classList.add('current');
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
