(() => {
  const loaderScript = document.currentScript;
  const baseScript = document.createElement('script');
  baseScript.src = loaderScript?.src
    ? new URL('script-custom-base.js?v=20260917-mapfix2', loaderScript.src).href
    : 'script-custom-base.js?v=20260917-mapfix2';
  baseScript.async = false;

  const installAula05MapFix = () => {
    const isAula05 =
      window.location.pathname.endsWith('/aula-05.html') ||
      window.location.pathname.endsWith('aula-05.html');

    if (!isAula05) return;

    const setup = () => {
      const section = document.querySelector('#simulador');
      const map = section?.querySelector('.interactive-romania-map');
      const stepEl = section?.querySelector('[data-astar-step]');
      const statusEl = section?.querySelector('[data-active-map-status] strong');
      const expandedEl = section?.querySelector('[data-astar-current]');

      if (!section || !map || !stepEl || !statusEl || !expandedEl) {
        window.setTimeout(setup, 0);
        return;
      }

      if (section.dataset.mapFixV4 === 'true') return;
      section.dataset.mapFixV4 = 'true';

      const intro = map.closest('.comparison-lab-card')?.querySelector('p');
      if (intro) {
        intro.textContent = 'Os números nas estradas indicam o custo real de cada trecho, em unidades de distância. Abaixo das cidades, h estima a distância restante até Bucharest. No A*, a linha azul acompanha progressivamente a rota principal da solução. Uma expansão alternativa, como Fagaras, é indicada separadamente sem deslocar o destaque principal da rota.';
      }

      const routeByStep = {
        0: ['Arad'],
        1: ['Arad'],
        2: ['Arad', 'Sibiu'],
        3: ['Arad', 'Sibiu', 'Rimnicu Vilcea'],
        4: ['Arad', 'Sibiu', 'Rimnicu Vilcea'],
        5: ['Arad', 'Sibiu', 'Rimnicu Vilcea', 'Pitesti'],
        6: ['Arad', 'Sibiu', 'Rimnicu Vilcea', 'Pitesti', 'Bucharest']
      };

      const edgeKey = (a, b) => [a, b].sort().join('-');

      const clearAStarVisuals = () => {
        map.querySelectorAll('.route-edge').forEach((edge) => {
          // Remove também a classe aplicada pelo simulador original. Sem isso,
          // o passo de Fagaras continua pintando Sibiu -> Fagaras por baixo.
          edge.classList.remove('astar-path');
          edge.style.removeProperty('stroke');
          edge.style.removeProperty('stroke-width');
          edge.style.removeProperty('opacity');
          edge.style.removeProperty('stroke-dasharray');
          edge.style.removeProperty('stroke-linecap');
        });

        map.querySelectorAll('.route-node').forEach((node) => {
          // O simulador original marca frame.current como astar-current. No passo
          // de Fagaras isso faz o mapa parecer que a rota saiu de Rimnicu Vilcea.
          node.classList.remove('astar-current');
          node.style.removeProperty('border-color');
          node.style.removeProperty('background');
          node.style.removeProperty('box-shadow');
        });
      };

      const paintAStarRoute = () => {
        const statusText = statusEl.textContent?.trim() || '';
        if (!statusText.startsWith('A*')) return;

        clearAStarVisuals();

        const step = Number(stepEl.textContent || 0);
        const route = routeByStep[step] || ['Arad'];
        const routeSet = new Set(route);
        const routeTip = route[route.length - 1];
        const expandedCity = expandedEl.textContent?.trim() || '';

        for (let i = 0; i < route.length - 1; i += 1) {
          const edge = map.querySelector(`[data-edge="${edgeKey(route[i], route[i + 1])}"]`);
          if (!edge) continue;

          edge.style.setProperty('stroke', 'var(--blue)', 'important');
          edge.style.setProperty('stroke-width', '4', 'important');
          edge.style.setProperty('opacity', '1', 'important');
          edge.style.setProperty('stroke-dasharray', 'none', 'important');
          edge.style.setProperty('stroke-linecap', 'round', 'important');
        }

        // O destaque principal acompanha a ponta da rota que estamos construindo.
        // Assim, no passo em que Fagaras é expandida, a rota continua visualmente
        // em Rimnicu Vilcea e só avança para Pitesti no passo seguinte.
        const routeTipNode = map.querySelector(`[data-city="${routeTip}"]`);
        if (routeTipNode) {
          routeTipNode.style.setProperty('border-color', 'var(--blue)', 'important');
          routeTipNode.style.setProperty('background', 'var(--blue-soft)', 'important');
          routeTipNode.style.setProperty('box-shadow', '0 0 0 2px var(--blue)', 'important');
        }

        // A expansão alternativa continua visível, mas como informação secundária.
        if (expandedCity && !routeSet.has(expandedCity)) {
          const expandedNode = map.querySelector(`[data-city="${expandedCity}"]`);
          if (expandedNode) {
            expandedNode.style.setProperty('border-color', 'var(--amber)', 'important');
            expandedNode.style.setProperty('background', 'var(--amber-soft)', 'important');
            expandedNode.style.setProperty('box-shadow', '0 0 0 2px var(--amber)', 'important');
          }
        }

        const nextStatus = expandedCity && expandedCity !== routeTip
          ? `A* · rota: ${routeTip} · expansão: ${expandedCity}`
          : `A* · rota: ${routeTip}`;
        if (statusEl.textContent !== nextStatus) statusEl.textContent = nextStatus;
      };

      let paintScheduled = false;
      const schedulePaint = () => {
        if (paintScheduled) return;
        paintScheduled = true;

        queueMicrotask(() => {
          paintScheduled = false;
          paintAStarRoute();
        });

        // O simulador original redesenha classes no clique. Reaplicamos no próximo
        // frame para garantir que a camada didática seja a última a ser renderizada.
        requestAnimationFrame(() => requestAnimationFrame(paintAStarRoute));
      };

      const observer = new MutationObserver(schedulePaint);
      observer.observe(stepEl, { childList: true, characterData: true, subtree: true });
      observer.observe(expandedEl, { childList: true, characterData: true, subtree: true });

      section.addEventListener('click', (event) => {
        const button = event.target.closest('[data-runner]');
        if (button) schedulePaint();
      });

      schedulePaint();
    };

    setup();
  };

  baseScript.addEventListener('load', installAula05MapFix);
  document.head.appendChild(baseScript);
})();