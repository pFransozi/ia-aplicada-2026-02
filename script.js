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

      if (!section || !map || !stepEl || !statusEl) {
        window.setTimeout(setup, 0);
        return;
      }

      if (section.dataset.mapFixV3 === 'true') return;
      section.dataset.mapFixV3 = 'true';

      const intro = map.closest('.comparison-lab-card')?.querySelector('p');
      if (intro) {
        intro.textContent = 'Os números nas estradas indicam o custo real de cada trecho, em unidades de distância. Abaixo das cidades, h estima a distância restante até Bucharest. No A*, a linha azul acompanha progressivamente a rota principal da solução. Uma expansão alternativa, como Fagaras, é destacada separadamente e não substitui a rota que já estava sendo construída.';
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

      const clearCustomVisuals = () => {
        map.querySelectorAll('.route-edge').forEach((edge) => {
          edge.style.removeProperty('stroke');
          edge.style.removeProperty('stroke-width');
          edge.style.removeProperty('opacity');
          edge.style.removeProperty('stroke-dasharray');
          edge.style.removeProperty('stroke-linecap');
        });

        map.querySelectorAll('.route-node').forEach((node) => {
          node.style.removeProperty('border-color');
          node.style.removeProperty('background');
          node.style.removeProperty('box-shadow');
        });
      };

      const paintAStarRoute = () => {
        clearCustomVisuals();

        const statusText = statusEl.textContent?.trim() || '';
        if (!statusText.startsWith('A*')) return;

        const step = Number(stepEl.textContent || 0);
        const route = routeByStep[step] || ['Arad'];
        const routeSet = new Set(route);

        for (let i = 0; i < route.length - 1; i += 1) {
          const edge = map.querySelector(`[data-edge="${edgeKey(route[i], route[i + 1])}"]`);
          if (!edge) continue;

          edge.style.setProperty('stroke', 'var(--blue)', 'important');
          edge.style.setProperty('stroke-width', '4', 'important');
          edge.style.setProperty('opacity', '1', 'important');
          edge.style.setProperty('stroke-dasharray', 'none', 'important');
          edge.style.setProperty('stroke-linecap', 'round', 'important');
        }

        const currentCity = statusText.includes('·')
          ? statusText.split('·').slice(1).join('·').trim()
          : '';

        // Quando o A* expande uma alternativa que não pertence à rota principal
        // que estamos acompanhando visualmente, destacamos esse estado com outra
        // cor. Assim, Fagaras é mostrada como expansão, não como "volta" da rota.
        if (currentCity && !routeSet.has(currentCity)) {
          const currentNode = map.querySelector(`[data-city="${currentCity}"]`);
          if (currentNode) {
            currentNode.style.setProperty('border-color', 'var(--amber)', 'important');
            currentNode.style.setProperty('background', 'var(--amber-soft)', 'important');
            currentNode.style.setProperty('box-shadow', '0 0 0 2px var(--amber)', 'important');
          }
        }
      };

      let paintScheduled = false;
      const schedulePaint = () => {
        if (paintScheduled) return;
        paintScheduled = true;

        queueMicrotask(() => {
          paintScheduled = false;
          paintAStarRoute();
        });

        // O simulador original também redesenha o mapa no clique. Executamos de
        // novo no próximo frame para garantir que a rota progressiva seja a última
        // camada visual aplicada.
        requestAnimationFrame(() => requestAnimationFrame(paintAStarRoute));
      };

      const observer = new MutationObserver(schedulePaint);
      observer.observe(stepEl, { childList: true, characterData: true, subtree: true });
      observer.observe(statusEl, { childList: true, characterData: true, subtree: true });

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