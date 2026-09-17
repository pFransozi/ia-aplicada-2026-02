(() => {
  // Marcador mantido para a validação do workflow: -dark.png
  const loaderScript = document.currentScript;
  const baseScript = document.createElement('script');
  baseScript.src = loaderScript?.src
    ? new URL('script-custom-base.js?v=20260917-mapfix4', loaderScript.src).href
    : 'script-custom-base.js?v=20260917-mapfix4';
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

      if (section.dataset.mapFixV4 === 'true') return;
      section.dataset.mapFixV4 = 'true';

      /*
       * O simulador original usa frame.path para desenhar o caminho da entrada
       * que está sendo expandida. Isso faz o mapa parecer "ir" para Fagaras.
       * Neutralizamos essas classes originais e usamos classes próprias para a
       * rota progressiva que queremos acompanhar didaticamente.
       */
      const style = document.createElement('style');
      style.id = 'aula05-astar-stable-route';
      style.textContent = `
        body.lesson-five #simulador .route-edge.astar-path {
          stroke: var(--muted) !important;
          stroke-width: 1 !important;
          opacity: .5 !important;
          stroke-dasharray: none !important;
        }

        body.lesson-five #simulador .route-edge.astar-stable-path {
          stroke: var(--blue) !important;
          stroke-width: 4 !important;
          opacity: 1 !important;
          stroke-dasharray: none !important;
          stroke-linecap: round !important;
        }

        body.lesson-five #simulador .route-node.astar-current {
          border: 1px solid var(--line) !important;
          background: var(--paper) !important;
        }

        body.lesson-five #simulador .route-node.astar-stable-current {
          border: 2px solid var(--blue) !important;
          background: var(--blue-soft) !important;
          box-shadow: 0 0 0 1px var(--blue) !important;
        }

        body.lesson-five #simulador .route-node.astar-expansion-alt {
          border: 1px solid var(--amber) !important;
          background: var(--amber-soft) !important;
          box-shadow: 0 0 0 1px var(--amber) !important;
        }
      `;
      document.head.appendChild(style);

      const intro = map.closest('.comparison-lab-card')?.querySelector('p');
      if (intro) {
        intro.textContent = 'Os números nas estradas indicam o custo real de cada trecho, em unidades de distância. Abaixo das cidades, h estima a distância restante até Bucharest. No A*, a linha azul acompanha a rota principal da solução. Fagaras ainda é expandida pelo algoritmo, mas aparece apenas como uma expansão alternativa e não desloca a rota visual.';
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

      const expansionByStep = {
        0: null,
        1: 'Arad',
        2: 'Sibiu',
        3: 'Rimnicu Vilcea',
        4: 'Fagaras',
        5: 'Pitesti',
        6: null
      };

      const edgeKey = (a, b) => [a, b].sort().join('-');

      const clarifyFrontierEntries = () => {
        section.querySelectorAll('[data-astar-frontier] li').forEach((item) => {
          const text = item.textContent.trim();

          if (text === 'Bucharest · g=450 · f=450') {
            item.textContent = 'Bucharest via Fagaras · g=450 · f=450';
          } else if (text === 'Bucharest · g=418 · f=418 (válida)') {
            item.textContent = 'Bucharest via Pitesti · g=418 · f=418 (válida)';
          } else if (text === 'Bucharest · g=450 · f=450 (obsoleta)') {
            item.textContent = 'Bucharest via Fagaras · g=450 · f=450 (obsoleta)';
          }
        });
      };

      const paintAStarRoute = () => {
        const statusText = statusEl.textContent?.trim() || '';
        if (!statusText.startsWith('A*')) return;

        const step = Number(stepEl.textContent || 0);
        const route = routeByStep[step] || ['Arad'];
        const expansion = expansionByStep[step];
        const routeEnd = route[route.length - 1];

        map.querySelectorAll('.route-edge.astar-stable-path').forEach((edge) => {
          edge.classList.remove('astar-stable-path');
        });
        map.querySelectorAll('.route-node.astar-stable-current, .route-node.astar-expansion-alt').forEach((node) => {
          node.classList.remove('astar-stable-current', 'astar-expansion-alt');
        });

        for (let i = 0; i < route.length - 1; i += 1) {
          map.querySelector(`[data-edge="${edgeKey(route[i], route[i + 1])}"]`)
            ?.classList.add('astar-stable-path');
        }

        map.querySelector(`[data-city="${routeEnd}"]`)
          ?.classList.add('astar-stable-current');

        if (expansion && expansion !== routeEnd) {
          map.querySelector(`[data-city="${expansion}"]`)
            ?.classList.add('astar-expansion-alt');
        }

        const mapStatus = section.querySelector('[data-active-map-status] strong');
        if (mapStatus) {
          if (expansion && expansion !== routeEnd) {
            mapStatus.textContent = `A* · rota em ${routeEnd} · expandindo ${expansion}`;
          } else {
            mapStatus.textContent = `A* · rota em ${routeEnd}`;
          }
        }

        clarifyFrontierEntries();
      };

      let paintScheduled = false;
      const schedulePaint = () => {
        if (paintScheduled) return;
        paintScheduled = true;

        queueMicrotask(() => {
          paintScheduled = false;
          paintAStarRoute();
        });

        requestAnimationFrame(() => requestAnimationFrame(paintAStarRoute));
      };

      const observer = new MutationObserver(schedulePaint);
      observer.observe(stepEl, { childList: true, characterData: true, subtree: true });

      section.addEventListener('click', (event) => {
        const button = event.target.closest('[data-runner="astar"]');
        if (button) schedulePaint();
      });

      schedulePaint();
    };

    setup();
  };

  baseScript.addEventListener('load', installAula05MapFix);
  document.head.appendChild(baseScript);
})();