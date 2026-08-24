(() => {
  const root = document.querySelector('[data-guided-search]');

  const escapeHtml = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const injectStyles = () => {
    if (document.getElementById('aula05-ajustes-finais')) return;
    const style = document.createElement('style');
    style.id = 'aula05-ajustes-finais';
    style.textContent = `
      #visao .overview-grid { grid-template-columns:minmax(0,1.15fr) minmax(300px,.85fr); align-items:start; gap:22px; }
      #visao .overview-grid .topics-card { grid-row:auto !important; }
      #visao .competency-stack { display:grid; gap:14px; align-content:start; }
      #visao .competency-stack .competency { align-self:start; min-height:0; padding:1.15rem 1.25rem; }
      #visao .competency-stack .competency h3 { margin-bottom:.55rem; }
      #visao .competency-stack .competency .skill { margin-top:0; gap:.6rem; }
      #visao .competency-stack .competency .skill strong { min-height:34px; }
      #visao .competency-stack .c11 { grid-column:auto !important; }
      #heuristica .prompt-box { display:block !important; }
      #heuristica .prompt-box strong { font-size:0; }
      #heuristica .prompt-box strong::after { content:'Para pensar durante a aula'; font-size:1rem; }
      .legacy-algorithm-layout-hidden, .legacy-guided-search-hidden { display:none !important; }

      .formalization-section .section-heading { margin-bottom:1.35rem; }
      .formalization-map-figure, .comparison-map-figure { margin:1.2rem 0 1.35rem; }
      .formalization-map-figure img, .comparison-map-figure img { display:block; width:100%; max-width:1120px; margin:0 auto; border:1px solid var(--line); border-radius:18px; background:#fff; box-shadow:0 14px 35px rgba(35,50,78,.12); }
      .formalization-map-figure figcaption, .comparison-map-figure figcaption { max-width:1120px; margin:.75rem auto 0; color:var(--muted); font-size:.92rem; line-height:1.55; }
      .formalization-map-figure figcaption strong, .comparison-map-figure figcaption strong { color:var(--ink); }

      .formalization-compare, .python-formalization-grid, .heuristic-example-grid, .heuristic-decision-grid, .heuristic-areas-grid, .romania-summary-grid, .romania-reading-grid, .guided-status-grid, .algorithm-didactic-grid, .comparison-panels, .map-status-strip, .runner-stats-grid, .admissibility-example-grid, .admissibility-impact-grid { display:grid; gap:14px; }
      .formalization-compare, .python-formalization-grid, .heuristic-example-grid, .heuristic-decision-grid, .algorithm-didactic-grid, .comparison-panels, .map-status-strip, .runner-stats-grid, .admissibility-impact-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
      .heuristic-areas-grid, .romania-summary-grid, .romania-reading-grid, .admissibility-example-grid { grid-template-columns:repeat(3,minmax(0,1fr)); }
      .guided-status-grid { grid-template-columns:repeat(4,minmax(0,1fr)); }

      .formalization-card, .formalization-mini-example, .python-formalization-card, .heuristic-explainer-card, .heuristic-frontier-card, .heuristic-python-card, .heuristic-area-card, .algorithm-choice-card, .algorithm-pseudo-card, .algorithm-code-card, .comparison-lab-card, .runner-panel, .map-status-card, .concept-anchor-card, .romania-summary-card, .romania-reading-grid article, .admissibility-mini-card, .admissibility-impact-card { border:1px solid var(--line); border-radius:20px; background:var(--paper); box-shadow:var(--shadow); }
      .formalization-card, .formalization-mini-example, .python-formalization-card, .heuristic-explainer-card, .heuristic-frontier-card, .heuristic-python-card, .heuristic-area-card, .algorithm-choice-card, .algorithm-pseudo-card, .algorithm-code-card, .comparison-lab-card, .runner-panel, .map-status-card, .concept-anchor-card, .romania-summary-card, .admissibility-mini-card, .admissibility-impact-card { padding:1.2rem; }
      .formalization-card h3, .formalization-mini-example h3, .python-formalization-card h3, .heuristic-explainer-card h3, .heuristic-frontier-card h3, .heuristic-python-card h3, .heuristic-area-card h3, .algorithm-choice-card h3, .algorithm-pseudo-card h3, .algorithm-code-card h3, .runner-panel h3, .concept-anchor-card h3, .admissibility-mini-card h3, .admissibility-impact-card h3 { margin:0 0 .7rem; }

      .formalization-list { display:grid; gap:.65rem; margin:0; padding:0; list-style:none; }
      .formalization-list li, .concept-anchor-grid article, .romania-summary-grid article, .algorithm-choice-card li { padding:.9rem; border:1px solid var(--line); border-radius:15px; background:var(--soft); }
      .formalization-list strong, .formalization-list span, .romania-summary-grid strong, .romania-summary-grid span, .heuristic-area-card span, .admissibility-mini-card strong, .admissibility-mini-card span { display:block; }
      .formalization-list span, .romania-summary-grid span, .heuristic-area-card span, .admissibility-mini-card span { margin-top:.28rem; color:var(--muted); }
      .formalization-mini-example, .python-formalization-grid, .heuristic-explainer-card, .heuristic-frontier-card, .heuristic-decision-grid, .heuristic-python-card, .heuristic-areas-grid, .algorithm-didactic-grid, .admissibility-explainer, .admissibility-impact-grid { margin-top:1.1rem; }
      .formalization-mini-example p, .concept-anchor-card p, .romania-summary-card > p, .heuristic-explainer-card p, .heuristic-frontier-card p, .heuristic-python-card p, .heuristic-area-card p, .algorithm-choice-card p, .algorithm-pseudo-card p, .algorithm-code-card p, .runner-explanation-card p, .admissibility-mini-card p, .admissibility-impact-card p { margin:0; }

      .formalization-table-wrap, .heuristic-table-wrap { overflow-x:auto; margin-top:1rem; }
      .formalization-table, .heuristic-frontier-table { width:100%; border-collapse:collapse; }
      .formalization-table th, .formalization-table td, .heuristic-frontier-table th, .heuristic-frontier-table td { padding:.75rem; border:1px solid var(--line); text-align:left; vertical-align:top; }
      .formalization-table th, .heuristic-frontier-table th { background:var(--soft); }
      .heuristic-frontier-table td:nth-child(n+2), .heuristic-frontier-table th:nth-child(n+2) { text-align:center; }

      .python-formalization-card p, .heuristic-python-card p, .algorithm-code-card p { margin:0 0 .75rem; color:var(--muted); }
      .python-formalization-card pre, .heuristic-python-card pre, .algorithm-code-card pre { margin:0; padding:1rem; overflow-x:auto; border-radius:14px; background:#091224; border:1px solid #21304a; }
      .python-formalization-card code, .heuristic-python-card code, .algorithm-code-card code { font-family:var(--font-mono,'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace); font-size:.9rem; line-height:1.55; color:#eef4ff; white-space:pre; }

      #heuristica .formula-card { display:flex; flex-direction:column; gap:.75rem; }
      .heuristic-card-note, .heuristic-explainer-card .formula-line, .heuristic-frontier-card .formula-line, .algorithm-reading-note, .formula-emphasis, .admissibility-rule { margin-top:.9rem; padding:.85rem; border:1px solid var(--line); border-radius:14px; background:var(--soft); color:var(--ink); line-height:1.45; }
      .heuristic-card-note { margin-top:auto; font-size:.96rem; }
      .heuristic-card-note strong, .heuristic-explainer-card .formula-line strong, .heuristic-frontier-card .formula-line strong, .algorithm-reading-note strong, .admissibility-rule strong { color:var(--blue); }
      .formula-emphasis, .admissibility-equation-inline { color:var(--violet); font-size:1.25rem; font-weight:900; text-align:center; }
      .heuristic-callout .concept-icon { min-width:5.4rem; padding:.65rem .75rem; font-size:clamp(1.6rem,3vw,2.4rem); line-height:1; white-space:nowrap; letter-spacing:-.04em; }
      .heuristic-explainer-card { border-left:5px solid var(--blue); }
      .heuristic-frontier-card { border-left:5px solid var(--violet); }

      .algorithm-choice-card, .algorithm-pseudo-card, .algorithm-code-card { display:grid; gap:.75rem; align-content:start; }
      .didactic-label, .algorithm-choice-card .choice-rule, .runner-rule, .admissibility-label { display:inline-flex; width:max-content; max-width:100%; padding:.35rem .65rem; border-radius:999px; background:var(--soft); border:1px solid var(--line); color:var(--muted); font-size:.74rem; font-weight:850; letter-spacing:.06em; text-transform:uppercase; }
      .algorithm-choice-card ul { display:grid; gap:.55rem; margin:0; padding:0; list-style:none; }
      .algorithm-choice-card .choice-result { padding:.8rem; border-radius:14px; background:rgba(14,165,233,.12); border:1px solid rgba(14,165,233,.25); font-weight:900; color:var(--blue); }
      .pseudo-list { margin:1rem 0 0; padding:1rem; overflow-x:auto; border-radius:14px; background:#091224; border:1px solid #21304a; color:#eef4ff; font-family:var(--font-mono,'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace); font-size:.9rem; line-height:1.55; white-space:pre; }

      .heuristic-area-card small, .romania-reading-grid small, .runner-frontier-card small, .runner-explanation-card small { color:var(--blue); font-weight:850; letter-spacing:.06em; text-transform:uppercase; }
      .heuristic-area-card h3 { margin-top:.55rem; }
      .heuristic-area-card span { font-size:.94rem; }
      .concept-anchor-card { margin-top:1.4rem; }
      .concept-anchor-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; margin-top:1rem; }
      .concept-anchor-grid strong, .concept-anchor-grid span { display:block; }
      .concept-anchor-grid span { margin-top:.35rem; color:var(--muted); font-size:.92rem; }

      .guided-simulator { grid-template-columns:1fr; }
      .guided-graph-card, .guided-control-card { width:100%; }
      .romania-summary { min-height:0 !important; padding:0; border:0; background:transparent; overflow:visible; }
      .romania-summary-card > p { margin-bottom:1rem; }
      .romania-reading-grid { margin-top:1.4rem; }
      .romania-reading-grid article { padding:1.1rem; }
      .romania-reading-grid h3 { margin:.75rem 0 .45rem; }
      .romania-reading-grid p { margin:0; }

      .comparison-lab { display:grid; gap:18px; margin-top:1rem; }
      .interactive-romania-map { position:relative; min-height:430px; overflow:hidden; border:1px solid var(--line); border-radius:22px; background:linear-gradient(145deg,#f9fbff,#eef5ff); }
      .interactive-romania-map svg { position:absolute; inset:0; width:100%; height:100%; pointer-events:none; }
      .route-edge { stroke:#aebbd2; stroke-width:1.4; transition:stroke .2s ease, stroke-width .2s ease, opacity .2s ease; }
      .route-edge.greedy-path { stroke:#16a394; stroke-width:3.2; opacity:.95; }
      .route-edge.astar-path { stroke:#7c63d6; stroke-width:4; opacity:.9; }
      .route-edge.greedy-path.astar-path { stroke:#334155; stroke-width:5; }
      .route-node { position:absolute; z-index:2; transform:translate(-50%,-50%); display:grid; place-items:center; min-width:88px; min-height:58px; padding:.42rem .5rem; border:2px solid #cbd5e1; border-radius:16px; background:var(--paper); text-align:center; box-shadow:0 8px 18px rgba(35,50,78,.10); transition:transform .2s ease, border-color .2s ease, background .2s ease; }
      .route-node strong { display:block; font-size:.92rem; line-height:1.1; }
      .route-node small { display:block; margin-top:.18rem; color:var(--muted); font-size:.68rem; font-weight:800; }
      .route-node.goal { border-color:#8b73e6; }
      .route-node.greedy-frontier { box-shadow:0 0 0 4px rgba(22,163,148,.10), 0 8px 18px rgba(35,50,78,.10); }
      .route-node.astar-frontier { box-shadow:0 0 0 4px rgba(124,99,214,.11), 0 8px 18px rgba(35,50,78,.10); }
      .route-node.greedy-current { border-color:#16a394; background:#dff7f3; transform:translate(-50%,-50%) scale(1.08); }
      .route-node.astar-current { border-color:#7c63d6; background:#eee9ff; transform:translate(-50%,-50%) scale(1.08); }
      .route-node.greedy-current.astar-current { border-color:#f4b95e; background:#fff3dc; transform:translate(-50%,-50%) scale(1.12); }
      .map-status-card small, .map-status-card strong { display:block; }
      .map-status-card small { color:var(--muted); font-weight:850; text-transform:uppercase; letter-spacing:.06em; }
      .map-status-greedy strong { color:var(--teal); }
      .map-status-astar strong { color:var(--violet); }
      .comparison-panels { align-items:start; }
      .runner-panel { display:grid; gap:1rem; }
      .runner-panel-header { display:flex; justify-content:space-between; align-items:flex-start; gap:1rem; }
      .runner-panel-header h3 { margin:.7rem 0 0; }
      .runner-actions { display:flex; flex-wrap:wrap; gap:.75rem; }
      .runner-actions button { padding:.75rem 1rem; border:1px solid var(--line); border-radius:12px; background:var(--paper); color:var(--ink); font-weight:800; cursor:pointer; }
      .runner-actions button:hover { transform:translateY(-1px); }
      .runner-stats-grid > div, .runner-frontier-card, .runner-explanation-card, .runner-outcome-card { padding:.95rem; border:1px solid var(--line); border-radius:15px; background:var(--soft); }
      .runner-stats-grid small, .runner-stats-grid strong { display:block; }
      .runner-frontier-card ul { display:grid; gap:.55rem; margin:.75rem 0 0; padding:0; list-style:none; }
      .runner-frontier-card li { padding:.7rem .8rem; border:1px solid var(--line); border-radius:12px; background:var(--paper); }
      .runner-explanation-card p { margin:.65rem 0 0; }
      .runner-outcome-card { min-height:56px; font-weight:850; color:var(--violet); }

      .admissibility-explainer { margin-bottom:1.4rem; }
      .admissibility-mini-card.safe { border-top:5px solid var(--teal); }
      .admissibility-mini-card.warning { border-top:5px solid var(--amber); }
      .admissibility-mini-card.problem { border-top:5px solid var(--violet); }
      .admissibility-mini-card .big-rule { margin-top:.75rem; font-size:clamp(1.6rem,3vw,2.35rem); font-weight:900; letter-spacing:-.04em; color:var(--ink); }
      .admissibility-example { margin-top:.9rem; padding:.85rem; border:1px solid var(--line); border-radius:14px; background:var(--soft); }
      .admissibility-example strong, .admissibility-example span { display:block; }
      .admissibility-example span { margin-top:.25rem; color:var(--muted); }
      .admissibility-check-table .safe-answer { color:var(--teal); font-weight:900; }
      .admissibility-check-table .bad-answer { color:var(--amber); font-weight:900; }
      .admissibility-impact-grid { margin-top:1.4rem; }
      .admissibility-impact-card { border-left:5px solid var(--blue); }

      body.theme-dark .formalization-map-figure img, body.theme-dark .comparison-map-figure img { background:#fff; border-color:#40506b; }
      body.theme-dark .formalization-card, body.theme-dark .formalization-mini-example, body.theme-dark .python-formalization-card, body.theme-dark .heuristic-explainer-card, body.theme-dark .heuristic-frontier-card, body.theme-dark .heuristic-python-card, body.theme-dark .heuristic-area-card, body.theme-dark .algorithm-choice-card, body.theme-dark .algorithm-pseudo-card, body.theme-dark .algorithm-code-card, body.theme-dark .comparison-lab-card, body.theme-dark .runner-panel, body.theme-dark .map-status-card, body.theme-dark .concept-anchor-card, body.theme-dark .concept-anchor-grid article, body.theme-dark .romania-summary-card, body.theme-dark .romania-summary-grid article, body.theme-dark .romania-reading-grid article, body.theme-dark .admissibility-mini-card, body.theme-dark .admissibility-impact-card { background:var(--paper); border-color:var(--line); }
      body.theme-dark .formalization-list li, body.theme-dark .formalization-table th, body.theme-dark .heuristic-frontier-table th, body.theme-dark .heuristic-card-note, body.theme-dark .heuristic-explainer-card .formula-line, body.theme-dark .heuristic-frontier-card .formula-line, body.theme-dark .algorithm-reading-note, body.theme-dark .formula-emphasis, body.theme-dark .didactic-label, body.theme-dark .algorithm-choice-card .choice-rule, body.theme-dark .runner-rule, body.theme-dark .algorithm-choice-card li, body.theme-dark .runner-stats-grid > div, body.theme-dark .runner-frontier-card, body.theme-dark .runner-explanation-card, body.theme-dark .runner-outcome-card, body.theme-dark .admissibility-rule, body.theme-dark .admissibility-example { background:var(--soft); }
      body.theme-dark .interactive-romania-map { background:linear-gradient(145deg,#121c2f,#0e1828); border-color:#30405e; }
      body.theme-dark .route-edge { stroke:#52647f; }
      body.theme-dark .route-node { background:#172033; color:var(--ink); border-color:#40506b; }
      body.theme-dark .route-node.greedy-current { background:#143a38; border-color:#54d6ca; }
      body.theme-dark .route-node.astar-current { background:#2a2448; border-color:#b4a5ff; }
      body.theme-dark .route-node.greedy-current.astar-current { background:#3d2c15; border-color:#f4b95e; }
      body.theme-dark .runner-frontier-card li { background:var(--paper); border-color:var(--line); }

      @media(max-width:980px){#visao .overview-grid,.formalization-compare,.python-formalization-grid,.heuristic-example-grid,.heuristic-decision-grid,.heuristic-areas-grid,.algorithm-didactic-grid,.comparison-panels,.map-status-strip,.concept-anchor-grid,.romania-summary-grid,.romania-reading-grid,.guided-status-grid,.admissibility-example-grid,.admissibility-impact-grid{grid-template-columns:1fr}}
      @media(max-width:720px){.runner-panel-header,.runner-actions{flex-direction:column}.runner-rule{white-space:normal}.runner-stats-grid{grid-template-columns:1fr}.interactive-romania-map{min-height:560px}.route-node{min-width:72px;font-size:.86rem}}
    `;
    document.head.appendChild(style);
  };

  const organizeTopicList = () => {
    const list = document.querySelector('#visao .topic-list');
    if (!list || list.dataset.ordered === 'true') return;
    const topics = ['Busca informada','Função heurística h(n)','Busca gulosa','Custo acumulado g(n)','Função f(n) = g(n) + h(n)','Algoritmo A*','Admissibilidade','Comparação de estratégias'];
    list.innerHTML = topics.map((topic) => `<div>${topic}</div>`).join('');
    list.dataset.ordered = 'true';
  };

  const compactCompetencyCards = () => {
    const overview = document.querySelector('#visao .overview-grid');
    if (!overview || overview.querySelector('.competency-stack')) return;
    const cards = [...overview.querySelectorAll(':scope > article.competency')];
    if (!cards.length) return;
    const stack = document.createElement('div');
    stack.className = 'competency-stack';
    cards[0].before(stack);
    cards.forEach((card) => stack.appendChild(card));
  };

  const insertFormalizationSection = () => {
    const percurso = document.querySelector('#percurso');
    if (!percurso || document.querySelector('#formalizacao-informada')) return;
    percurso.insertAdjacentHTML('afterend', `
      <section class="section section-soft formalization-section" id="formalizacao-informada"><div class="container"><div class="section-heading"><p class="eyebrow">Formulação do problema</p><h2>O que muda quando a busca passa a usar heurística?</h2><p>Antes de falar de algoritmo, precisamos ajustar a descrição do problema. Na busca não informada, o algoritmo enxerga apenas a estrutura do espaço de estados. Na busca informada, a mesma formulação precisa carregar custos e uma estimativa de proximidade do objetivo.</p></div><figure class="formalization-map-figure"><img src="assets/mapa-romenia-russell-norvig-fig-3-1.png" alt="Mapa simplificado de parte da Romênia, com cidades conectadas por estradas e distâncias entre elas." loading="lazy"><figcaption><strong>Problema de referência da aula.</strong> Vamos usar o mapa da Romênia para contextualizar a mudança de formulação: de um grafo usado por BFS/DFS para um problema de busca informada, com custos e heurística.</figcaption></figure><div class="formalization-compare"><article class="formalization-card"><h3>Como ficava na Aula 04</h3><ul class="formalization-list"><li><strong>Estado inicial</strong><span>Arad.</span></li><li><strong>Objetivo</strong><span>Chegar a Bucharest.</span></li><li><strong>Sucessores</strong><span>Cidades diretamente conectadas por estradas.</span></li><li><strong>Critério de expansão</strong><span>Fila no BFS ou pilha no DFS.</span></li></ul></article><article class="formalization-card"><h3>Como precisa ficar na Aula 05</h3><ul class="formalization-list"><li><strong>Custo da ação</strong><span>Distância de cada estrada, como Arad → Sibiu = 140.</span></li><li><strong>Custo acumulado g(n)</strong><span>Quanto já foi gasto do início até o estado atual.</span></li><li><strong>Heurística h(n)</strong><span>Estimativa de quanto falta em linha reta de cada cidade até Bucharest.</span></li><li><strong>Prioridade</strong><span>Menor h(n) na gulosa; menor g(n)+h(n) no A*.</span></li></ul></article></div><div class="formalization-mini-example"><h3>Exemplo rápido no mapa da Romênia</h3><p>Ao chegar em Sibiu, duas alternativas importantes aparecem. Fagaras parece um pouco mais próxima do destino pela heurística, mas Rimnicu Vilcea tem menor custo total estimado quando somamos o que já foi gasto com o que ainda parece faltar.</p><div class="formalization-table-wrap"><table class="formalization-table"><thead><tr><th>Alternativa</th><th>g(n)</th><th>h(n)</th><th>g(n)+h(n)</th><th>Leitura</th></tr></thead><tbody><tr><td>Fagaras</td><td>239</td><td>176</td><td>415</td><td>Boa pela heurística, mas com custo acumulado maior.</td></tr><tr><td>Rimnicu Vilcea</td><td>220</td><td>193</td><td>413</td><td>Menos atraente pela heurística isolada, mas melhor para A*.</td></tr></tbody></table></div></div><div class="python-formalization-grid"><article class="python-formalization-card"><h3>Antes: Python para BFS/DFS</h3><p>O problema podia ser descrito apenas como conexões entre estados. O algoritmo decidia a ordem pela estrutura da fronteira.</p><pre><code>estado_inicial = "Arad"
objetivo = "Bucharest"

mapa = {
    "Arad": ["Zerind", "Sibiu", "Timisoara"],
    "Sibiu": ["Arad", "Fagaras", "Rimnicu Vilcea", "Oradea"],
    "Fagaras": ["Sibiu", "Bucharest"],
    "Rimnicu Vilcea": ["Sibiu", "Pitesti", "Craiova"],
}

# BFS: fronteira como fila
# DFS: fronteira como pilha</code></pre></article><article class="python-formalization-card"><h3>Agora: Python com heurística</h3><p>O problema passa a carregar custo real das ações e uma estimativa h(n), permitindo busca gulosa e A*.</p><pre><code>estado_inicial = "Arad"
objetivo = "Bucharest"

mapa = {
    "Arad": [("Zerind", 75), ("Sibiu", 140), ("Timisoara", 118)],
    "Sibiu": [("Arad", 140), ("Fagaras", 99), ("Rimnicu Vilcea", 80)],
    "Fagaras": [("Sibiu", 99), ("Bucharest", 211)],
    "Rimnicu Vilcea": [("Sibiu", 80), ("Pitesti", 97), ("Craiova", 146)],
}

# h(n): estimativa de distância em linha reta até Bucharest.
heuristica = {
    "Arad": 366,
    "Bucharest": 0,
    "Craiova": 160,
    "Drobeta": 242,
    "Eforie": 161,
    "Fagaras": 176,
    "Giurgiu": 77,
    "Hirsova": 151,
    "Iasi": 226,
    "Lugoj": 244,
    "Mehadia": 241,
    "Neamt": 234,
    "Oradea": 380,
    "Pitesti": 100,
    "Rimnicu Vilcea": 193,
    "Sibiu": 253,
    "Timisoara": 329,
    "Urziceni": 80,
    "Vaslui": 199,
    "Zerind": 374,
}

# Gulosa: prioridade = h(n)
# A*: prioridade = g(n) + h(n)</code></pre></article></div></div></section>`);
  };

  const updateBridgeText = () => {
    const p = document.querySelector('#ponte .warmup h2 + p');
    if (p) p.textContent = 'BFS e DFS não usam pistas sobre o destino. Eles apenas seguem a regra da estrutura: fila no BFS, pilha no DFS. A busca informada muda isso ao acrescentar uma estimativa de proximidade do objetivo.';
  };

  const updateHeuristicIntroCards = () => {
    const cards = document.querySelectorAll('#heuristica .formula-card');
    if (cards.length < 2 || cards[0].dataset.didactic === 'true') return;
    cards[0].dataset.didactic = 'true';
    cards[0].innerHTML = `<span>Função heurística</span><strong>h(n)</strong><p>Recebe um estado <em>n</em> e devolve uma estimativa do quanto ainda falta para chegar ao objetivo.</p><div class="heuristic-card-note"><strong>Leitura:</strong> quanto menor h(n), mais promissor o estado parece. Isso não quer dizer que ele esteja no caminho mais barato.</div>`;
    cards[1].innerHTML = `<span>Exemplo em rotas</span><strong>h(cidade) ≈ linha reta até o destino</strong><p>No mapa da Romênia, h(cidade) estima a distância direta até Bucharest. Ela não soma as estradas do caminho; é uma pista para comparar alternativas rapidamente.</p><div class="heuristic-card-note"><strong>Exemplo:</strong> h(Oradea)=380 estima a distância direta até Bucharest. O custo real por estradas é calculado separadamente em g(n).</div>`;
  };

  const updateHeuristicCallout = () => {
    const callout = document.querySelector('#heuristica .heuristic-callout');
    if (!callout || callout.dataset.didactic === 'true') return;
    callout.dataset.didactic = 'true';
    const icon = callout.querySelector('.concept-icon');
    const title = callout.querySelector('h3');
    const intro = callout.querySelector('.search-concept-intro');
    if (icon) icon.textContent = 'h(n)';
    if (title) title.textContent = 'O que esse número quer dizer?';
    if (intro) intro.innerHTML = `Para cada estado, <strong>h(n)</strong> responde a uma pergunta simples: <em>quanto parece faltar até o objetivo?</em> No mapa da Romênia, esse valor vem da distância em linha reta até Bucharest. Ele ajuda a escolher uma direção de busca, mas não é o custo real da rota por estradas.`;
    const principles = callout.querySelector('.heuristic-principles');
    if (principles) principles.innerHTML = `<article><strong>É uma estimativa</strong><span>Pode aproximar bem, mas não precisa coincidir com o caminho real.</span></article><article><strong>Compara estados</strong><span>Permite ordenar alternativas como Sibiu, Fagaras ou Oradea.</span></article><article><strong>Não substitui g(n)</strong><span>O custo real já percorrido continua sendo calculado separadamente.</span></article><article><strong>Depende do domínio</strong><span>Em rotas, linha reta faz sentido; em outros problemas, a pista precisa mudar.</span></article>`;
  };

  const enhanceHeuristicSection = () => {
    const container = document.querySelector('#heuristica .container');
    const callout = container?.querySelector('.heuristic-callout');
    if (!container || !callout || container.querySelector('.heuristic-frontier-card')) return;
    callout.insertAdjacentHTML('afterend', `<div class="heuristic-explainer-card"><h3>Heurística orienta a busca, mas não decide sozinha</h3><p>Use h(n) como uma régua aproximada: ela indica qual estado parece mais perto do objetivo. Depois, o algoritmo ainda precisa decidir se vai confiar apenas nessa pista, como na busca gulosa, ou se vai combiná-la com o custo já pago, como no A*.</p><div class="formula-line"><strong>No código da Romênia:</strong> h("Oradea") = 380 é uma estimativa direta até Bucharest. Já o custo por estradas entra em g(n), somando trechos como Oradea → Sibiu → Rimnicu Vilcea.</div></div><div class="heuristic-frontier-card"><h3>A mesma fronteira, duas formas de escolher</h3><p>Imagine que a busca chegou a <strong>Sibiu</strong>. A fronteira contém duas alternativas importantes. Antes de olhar para o código, compare os números.</p><div class="heuristic-table-wrap"><table class="heuristic-frontier-table"><thead><tr><th>Cidade candidata</th><th>g(n)<br><small>custo já pago</small></th><th>h(n)<br><small>estimativa restante</small></th><th>g(n)+h(n)</th></tr></thead><tbody><tr><td>Fagaras</td><td>239</td><td>176</td><td>415</td></tr><tr><td>Rimnicu Vilcea</td><td>220</td><td>193</td><td>413</td></tr></tbody></table></div><div class="formula-line"><strong>Leitura:</strong> Fagaras parece mais perto pela heurística. Rimnicu Vilcea fica melhor quando consideramos o custo já pago mais a estimativa restante.</div></div><div class="heuristic-decision-grid"><article class="algorithm-choice-card"><h3>Busca gulosa</h3><span class="choice-rule">prioridade = h(n)</span><ul><li>Fagaras: h=176</li><li>Rimnicu Vilcea: h=193</li></ul><div class="choice-result">Escolha: Fagaras</div><p>A gulosa escolhe quem parece mais perto do objetivo agora.</p></article><article class="algorithm-choice-card"><h3>A*</h3><span class="choice-rule">prioridade = g(n)+h(n)</span><ul><li>Fagaras: 239 + 176 = 415</li><li>Rimnicu Vilcea: 220 + 193 = 413</li></ul><div class="choice-result">Escolha: Rimnicu Vilcea</div><p>O A* equilibra o custo já pago com o que ainda parece faltar.</p></article></div><article class="heuristic-python-card"><h3>Depois da comparação, o código fica pequeno</h3><p>O código abaixo transforma a tabela em uma regra de escolha.</p><pre><code>fronteira = [
    {"cidade": "Fagaras", "g": 239, "h": 176},
    {"cidade": "Rimnicu Vilcea", "g": 220, "h": 193},
]

# Busca gulosa: usa apenas h(n)
escolha_gulosa = min(fronteira, key=lambda estado: estado["h"])

# A*: usa g(n) + h(n)
escolha_astar = min(fronteira, key=lambda estado: estado["g"] + estado["h"])

print("Gulosa escolhe:", escolha_gulosa["cidade"])
print("A* escolhe:", escolha_astar["cidade"])</code></pre></article><div class="heuristic-explainer-card"><h3>Por que Greedy e A* escolhem caminhos diferentes?</h3><p>A busca gulosa segue a alternativa que parece mais próxima do objetivo. O A* tenta equilibrar essa proximidade estimada com o custo real já acumulado.</p><div class="formula-line"><strong>Ideia central:</strong> h(n) ajuda a enxergar uma direção provável. g(n) lembra o custo que já foi pago. A* usa as duas informações.</div></div><div class="heuristic-areas-grid"><article class="heuristic-area-card"><small>Exemplo 01</small><h3>Rotas e logística</h3><p>Em rotas, h(n) pode estimar a distância direta até o destino. Essa pista ignora curvas, trânsito e pedágios, mas ajuda a evitar explorar cidades que apontam claramente para longe do objetivo.</p><span>Estado: cidade atual. Heurística: distância direta estimada até a cidade destino.</span></article><article class="heuristic-area-card"><small>Exemplo 02</small><h3>Jogos e labirintos</h3><p>Em um grid ou labirinto, h(n) pode ser a distância Manhattan: quantas linhas e colunas faltam até a saída, ignorando paredes temporariamente.</p><span>Estado: posição atual. Heurística: |linha atual - linha final| + |coluna atual - coluna final|.</span></article><article class="heuristic-area-card"><small>Exemplo 03</small><h3>Planejamento de tarefas</h3><p>Em planejamento, h(n) pode estimar quantas tarefas críticas ainda faltam para concluir o objetivo. A busca prioriza planos que parecem reduzir pendências mais rapidamente.</p><span>Estado: tarefas concluídas. Heurística: estimativa do esforço restante.</span></article></div>`);
  };

  const insertConceptAnchorCard = () => {
    const container = document.querySelector('#heuristica .container');
    const target = container?.querySelector('.heuristic-areas-grid') || container?.querySelector('.heuristic-callout');
    if (!container || !target || container.querySelector('.concept-anchor-card')) return;
    target.insertAdjacentHTML('afterend', `<div class="concept-anchor-card"><h3>Como avaliar se uma heurística ajuda?</h3><p>Uma heurística precisa ser relacionada ao domínio do problema, barata de calcular e útil para ordenar a fronteira. Em alguns algoritmos, como A*, também precisamos discutir se ela preserva garantias sobre a qualidade da solução.</p><div class="concept-anchor-grid"><article><strong>Domínio</strong><span>A estimativa precisa ter relação com o objetivo.</span></article><article><strong>Custo de cálculo</strong><span>Calcular h(n) não pode ser tão caro quanto resolver o problema.</span></article><article><strong>Qualidade da pista</strong><span>Quanto melhor a estimativa, menor tende a ser a exploração desnecessária.</span></article><article><strong>Garantia</strong><span>Para discutir otimalidade no A*, a admissibilidade passa a importar.</span></article></div></div>`);
  };

  const configureRomaniaReference = () => {
    if (!root) return;
    const section = root.closest('section');
    const sectionTitle = section?.querySelector('.section-heading h2');
    const sectionIntro = section?.querySelector('.section-heading p:last-child');
    if (sectionTitle) sectionTitle.textContent = 'Greedy e A* no mesmo problema de rotas';
    if (sectionIntro) sectionIntro.textContent = 'Retomamos o problema contextualizado na formulação inicial. Agora o foco é observar como a fronteira muda quando usamos apenas h(n) ou a soma g(n)+h(n).';
    const costExample = document.querySelector('.cost-example');
    if (costExample) {
      const blocks = costExample.querySelectorAll('div');
      if (blocks[0]) blocks[0].innerHTML = '<small>Distância já percorrida até Pitesti</small><strong>g(n) = 317</strong>';
      if (blocks[1]) blocks[1].innerHTML = '<small>Estimativa direta de Pitesti até Bucharest</small><strong>h(n) = 100</strong>';
      if (blocks[2]) blocks[2].innerHTML = '<small>Estimativa total por Pitesti</small><strong>f(n) = 417</strong>';
    }
    const questions = section?.querySelectorAll('.experiment-questions article');
    if (questions?.[0]) questions[0].querySelector('p').textContent = 'Registre o caminho encontrado e some os custos das estradas.';
    if (questions?.[1]) questions[1].querySelector('p').textContent = 'Observe o momento em que a rota aparentemente direta por Fagaras perde para a alternativa por Rimnicu Vilcea e Pitesti.';
    if (questions?.[2]) questions[2].querySelector('p').textContent = 'Fagaras parece mais perto de Bucharest pela heurística, mas o custo real Fagaras → Bucharest é alto.';
  };

  const insertAlgorithmDidacticPanels = () => {
    const greedySection = document.querySelector('#gulosa');
    const astarSection = document.querySelector('#astar');
    if (greedySection && !greedySection.querySelector('.algorithm-didactic-grid')) {
      greedySection.querySelector('.algorithm-layout')?.classList.add('legacy-algorithm-layout-hidden');
      const note = greedySection.querySelector('.note-banner');
      const html = `<div class="algorithm-didactic-grid"><article class="algorithm-pseudo-card"><span class="didactic-label">Pseudocódigo</span><h3>Como a gulosa decide?</h3><p>Ela escolhe, na fronteira, o estado que parece mais próximo do objetivo segundo <strong>h(n)</strong>.</p><pre class="pseudo-list">BUSCA_GULOSA(inicial, objetivo):
    colocar inicial na fronteira

    enquanto a fronteira não estiver vazia:
        estado ← retirar o menor h(estado)

        se estado é objetivo:
            devolver caminho

        expandir estado
        inserir sucessores na fronteira

    devolver fracasso</pre><div class="algorithm-reading-note"><strong>Leitura didática:</strong> a gulosa pergunta: <em>qual estado parece mais perto do objetivo agora?</em></div></article><article class="algorithm-code-card"><span class="didactic-label">Python</span><h3>Exemplo mínimo em Python</h3><p>A prioridade da fila é o menor valor de <strong>h(n)</strong>.</p><pre><code>from heapq import heappush, heappop

def busca_gulosa(inicio, objetivo, sucessores, h):
    fronteira = []
    heappush(fronteira, (h[inicio], inicio, [inicio]))

    visitados = set()

    while fronteira:
        prioridade, estado, caminho = heappop(fronteira)

        if estado in visitados:
            continue
        visitados.add(estado)

        if estado == objetivo:
            return caminho

        for vizinho, custo in sucessores[estado]:
            if vizinho not in visitados:
                heappush(fronteira, (h[vizinho], vizinho, caminho + [vizinho]))

    return None</code></pre><div class="algorithm-reading-note"><strong>Observe:</strong> o problema pode ter custo nas estradas, mas a gulosa escolhe usando apenas <strong>h(vizinho)</strong>.</div></article></div>`;
      if (note) note.insertAdjacentHTML('beforebegin', html);
    }
    if (astarSection && !astarSection.querySelector('.algorithm-didactic-grid')) {
      astarSection.querySelector('.algorithm-layout')?.classList.add('legacy-algorithm-layout-hidden');
      astarSection.querySelector('.container')?.insertAdjacentHTML('beforeend', `<div class="algorithm-didactic-grid"><article class="algorithm-pseudo-card"><span class="didactic-label">Pseudocódigo</span><h3>Como o A* decide?</h3><p>O A* combina o custo já acumulado com a estimativa restante.</p><div class="formula-emphasis">f(n) = g(n) + h(n)</div><pre class="pseudo-list">A_ESTRELA(inicial, objetivo):
    colocar inicial na fronteira
    g(inicial) ← 0

    enquanto a fronteira não estiver vazia:
        estado ← retirar o menor f(estado)

        se estado é objetivo:
            devolver caminho

        para cada sucessor:
            novo_g ← g(estado) + custo

            se novo_g melhora o custo conhecido:
                atualizar g(sucessor)
                inserir com prioridade novo_g + h(sucessor)

    devolver fracasso</pre><div class="algorithm-reading-note"><strong>Leitura didática:</strong> o A* pergunta: <em>qual estado parece mais promissor considerando o que já custou e o que ainda parece faltar?</em></div></article><article class="algorithm-code-card"><span class="didactic-label">Python</span><h3>Exemplo mínimo em Python</h3><p>A prioridade da fila passa a ser <strong>g(n) + h(n)</strong>.</p><pre><code>from heapq import heappush, heappop

def a_estrela(inicio, objetivo, sucessores, h):
    fronteira = []
    heappush(fronteira, (h[inicio], inicio, [inicio], 0))

    melhor_g = {inicio: 0}

    while fronteira:
        f_atual, estado, caminho, g_atual = heappop(fronteira)

        if estado == objetivo:
            return caminho, g_atual

        for vizinho, custo in sucessores[estado]:
            novo_g = g_atual + custo

            if vizinho not in melhor_g or novo_g < melhor_g[vizinho]:
                melhor_g[vizinho] = novo_g
                novo_f = novo_g + h[vizinho]
                heappush(fronteira, (novo_f, vizinho, caminho + [vizinho], novo_g))

    return None, None</code></pre><div class="algorithm-reading-note"><strong>Observe:</strong> o A* combina <strong>custo já percorrido</strong> com <strong>estimativa do que falta</strong>.</div></article></div>`);
    }
  };

  const enhanceAdmissibilitySection = () => {
    const section = document.querySelector('#admissibilidade');
    const container = section?.querySelector('.container');
    if (!container || container.querySelector('.admissibility-explainer')) return;

    const heading = container.querySelector('.section-heading');
    const title = heading?.querySelector('h2');
    const intro = heading?.querySelector('p:last-child');
    if (title) title.textContent = 'Heurística admissível: uma estimativa que não exagera';
    if (intro) intro.textContent = 'Para o A*, não basta que a heurística pareça intuitiva. Ela também precisa ser segura: pode subestimar o custo restante, mas não deve superestimar o melhor caminho real até o objetivo.';

    heading?.insertAdjacentHTML('afterend', `
      <div class="admissibility-explainer">
        <div class="admissibility-example-grid">
          <article class="admissibility-mini-card safe">
            <span class="admissibility-label">Admissível</span>
            <h3>Não exagera</h3>
            <p>Uma heurística admissível nunca passa do melhor custo real que ainda falta até o objetivo.</p>
            <div class="big-rule">h(n) ≤ h*(n)</div>
            <div class="admissibility-example"><strong>Fagaras</strong><span>h(n)=176 e melhor custo real=211. Como 176 ≤ 211, está ok.</span></div>
          </article>
          <article class="admissibility-mini-card warning">
            <span class="admissibility-label">Pode errar</span>
            <h3>Mas erra para baixo</h3>
            <p>A heurística não precisa acertar exatamente. Ela pode dizer que falta menos do que realmente falta.</p>
            <div class="big-rule">otimista, não perfeita</div>
            <div class="admissibility-example"><strong>Pitesti</strong><span>h(n)=100 e melhor custo real=101. Quase acertou, mas não passou do real.</span></div>
          </article>
          <article class="admissibility-mini-card problem">
            <span class="admissibility-label">Não admissível</span>
            <h3>Exagera o custo</h3>
            <p>Quando a estimativa fica maior que o melhor custo real restante, ela deixa de ser admissível.</p>
            <div class="big-rule">h(n) > h*(n)</div>
            <div class="admissibility-example"><strong>Fagaras hipotético</strong><span>h(n)=250 e melhor custo real=211. Como 250 > 211, exagerou.</span></div>
          </article>
        </div>
        <div class="admissibility-rule"><strong>Resumo para guardar:</strong> admissível = não exagera. Não admissível = exagera. A heurística admissível pode ser imprecisa, mas não pode tornar o caminho restante artificialmente mais caro do que ele realmente é no melhor caso.</div>
      </div>`);

    const definition = container.querySelector('.admissibility-definition');
    if (definition) {
      definition.innerHTML = `<span>Ideia formal</span><div class="admissibility-equation">h(n) ≤ h*(n)</div><p><strong>h(n)</strong> é a estimativa usada pelo algoritmo. <strong>h*(n)</strong> é o melhor custo real restante até o objetivo.</p>`;
    }

    const copy = container.querySelector('.admissibility-copy');
    if (copy) {
      copy.innerHTML = `<h3>Por que a palavra é “admissível”?</h3><p>Porque essa heurística é aceita como uma pista segura para o A*. Ela pode ser otimista, mas não cria um obstáculo artificial contra um caminho que ainda pode ser bom.</p><p>Em problemas de rota, a distância em linha reta costuma ser um bom exemplo: normalmente ela não passa do custo real de viajar pelas estradas.</p>`;
    }

    const table = container.querySelector('.heuristic-check-table');
    if (table) {
      table.classList.add('admissibility-check-table');
      table.innerHTML = `<thead><tr><th>Caso</th><th>h(n)</th><th>Melhor custo real restante</th><th>Admissível?</th><th>Por quê?</th></tr></thead><tbody><tr><td>Fagaras</td><td>176</td><td>211</td><td><span class="safe-answer">Sim</span></td><td>A estimativa é menor que o custo real.</td></tr><tr><td>Rimnicu Vilcea</td><td>193</td><td>198</td><td><span class="safe-answer">Sim</span></td><td>Também não passa do melhor custo real.</td></tr><tr><td>Pitesti</td><td>100</td><td>101</td><td><span class="safe-answer">Sim</span></td><td>Quase acerta, mas continua abaixo.</td></tr><tr><td>Fagaras hipotético</td><td>250</td><td>211</td><td><span class="bad-answer">Não</span></td><td>Exagerou: 250 é maior que 211.</td></tr><tr><td>Pitesti hipotético</td><td>130</td><td>101</td><td><span class="bad-answer">Não</span></td><td>Exagerou o custo restante.</td></tr><tr><td>Bucharest hipotético</td><td>10</td><td>0</td><td><span class="bad-answer">Não</span></td><td>No objetivo, a estimativa correta deve ser 0.</td></tr></tbody>`;
    }

    const tableWrap = container.querySelector('.heuristic-check-table-wrap');
    if (tableWrap && !container.querySelector('.admissibility-impact-grid')) {
      tableWrap.insertAdjacentHTML('afterend', `<div class="admissibility-impact-grid"><article class="admissibility-impact-card"><h3>Por que isso importa para o A*?</h3><p>O A* calcula <strong>f(n)=g(n)+h(n)</strong>. Se h(n) exagera, f(n) também fica artificialmente alto. O algoritmo pode passar a tratar um caminho promissor como se ele fosse ruim demais.</p></article><article class="admissibility-impact-card"><h3>O risco de uma heurística não admissível</h3><p>Ela pode fazer uma rota boa parecer pior do que realmente é. Com isso, o A* pode perder a garantia clássica de encontrar a solução de menor custo.</p></article></div>`);
    }

    const warning = container.querySelector('.note-banner.warning');
    if (warning) {
      warning.innerHTML = `<strong>Não confunda:</strong> admissível não significa perfeita. Uma heurística pode subestimar bastante e ainda ser admissível. O problema começa quando ela superestima, porque isso pode distorcer a comparação feita pelo A*.`;
    }
  };

  const comparisonFrames = {
    greedy: [
      {step:0,current:'Arad',cost:'0',path:['Arad'],frontier:['Arad · h=366'],frontierCities:[],explanation:'Começamos em Arad. A gulosa prioriza sempre o menor valor de h(n).',outcome:''},
      {step:1,current:'Arad',cost:'0',path:['Arad'],frontier:['Sibiu · h=253','Timisoara · h=329','Zerind · h=374'],frontierCities:['Sibiu','Timisoara','Zerind'],explanation:'Ao expandir Arad, Sibiu parece a melhor escolha porque tem a menor estimativa até Bucharest.',outcome:''},
      {step:2,current:'Sibiu',cost:'140',path:['Arad','Sibiu'],frontier:['Fagaras · h=176','Rimnicu Vilcea · h=193','Timisoara · h=329','Zerind · h=374','Oradea · h=380'],frontierCities:['Fagaras','Rimnicu Vilcea','Timisoara','Zerind','Oradea'],explanation:'Em Sibiu, a gulosa olha apenas para h(n). Fagaras parece melhor do que Rimnicu Vilcea.',outcome:''},
      {step:3,current:'Fagaras',cost:'239',path:['Arad','Sibiu','Fagaras'],frontier:['Bucharest · h=0','Rimnicu Vilcea · h=193','Timisoara · h=329','Zerind · h=374','Oradea · h=380'],frontierCities:['Bucharest','Rimnicu Vilcea','Timisoara','Zerind','Oradea'],explanation:'Ao expandir Fagaras, Bucharest entra com h=0. Para a gulosa, isso torna a escolha imediata.',outcome:''},
      {step:4,current:'Bucharest',cost:'450',path:['Arad','Sibiu','Fagaras','Bucharest'],frontier:['Rimnicu Vilcea · h=193','Timisoara · h=329','Zerind · h=374','Oradea · h=380'],frontierCities:['Rimnicu Vilcea','Timisoara','Zerind','Oradea'],explanation:'A gulosa chega ao objetivo rapidamente, mas sem garantir o melhor custo.',outcome:'Resultado: caminho encontrado com custo 450.'}
    ],
    astar: [
      {step:0,current:'Arad',cost:'0',path:['Arad'],frontier:['Arad · f=366'],frontierCities:[],explanation:'Começamos em Arad. No A*, a prioridade é f(n) = g(n) + h(n).',outcome:''},
      {step:1,current:'Arad',cost:'0',path:['Arad'],frontier:['Sibiu · f=393','Timisoara · f=447','Zerind · f=449'],frontierCities:['Sibiu','Timisoara','Zerind'],explanation:'Depois de expandir Arad, Sibiu fica com a melhor prioridade total.',outcome:''},
      {step:2,current:'Sibiu',cost:'140',path:['Arad','Sibiu'],frontier:['Rimnicu Vilcea · f=413','Fagaras · f=415','Timisoara · f=447','Zerind · f=449','Oradea · f=671'],frontierCities:['Rimnicu Vilcea','Fagaras','Timisoara','Zerind','Oradea'],explanation:'Aqui aparece a diferença central: Rimnicu Vilcea vence Fagaras por pouco quando usamos g(n)+h(n).',outcome:''},
      {step:3,current:'Rimnicu Vilcea',cost:'220',path:['Arad','Sibiu','Rimnicu Vilcea'],frontier:['Fagaras · f=415','Pitesti · f=417','Timisoara · f=447','Zerind · f=449','Craiova · f=526','Oradea · f=671'],frontierCities:['Fagaras','Pitesti','Timisoara','Zerind','Craiova','Oradea'],explanation:'O A* mantém alternativas vivas. Fagaras ainda está na fronteira, mas Pitesti já se aproxima.',outcome:''},
      {step:4,current:'Fagaras',cost:'239',path:['Arad','Sibiu','Fagaras'],frontier:['Pitesti · f=417','Timisoara · f=447','Zerind · f=449','Bucharest · f=450','Craiova · f=526','Oradea · f=671'],frontierCities:['Pitesti','Timisoara','Zerind','Bucharest','Craiova','Oradea'],explanation:'Fagaras gera uma rota até Bucharest, mas ainda não é a melhor prioridade disponível.',outcome:''},
      {step:5,current:'Pitesti',cost:'317',path:['Arad','Sibiu','Rimnicu Vilcea','Pitesti'],frontier:['Bucharest · f=418','Timisoara · f=447','Zerind · f=449','Craiova · f=526','Oradea · f=671'],frontierCities:['Bucharest','Timisoara','Zerind','Craiova','Oradea'],explanation:'Pitesti melhora a rota até Bucharest. Agora o objetivo entra com custo total menor.',outcome:''},
      {step:6,current:'Bucharest',cost:'418',path:['Arad','Sibiu','Rimnicu Vilcea','Pitesti','Bucharest'],frontier:['Timisoara · f=447','Zerind · f=449','Craiova · f=526','Oradea · f=671'],frontierCities:['Timisoara','Zerind','Craiova','Oradea'],explanation:'O A* chega ao objetivo com menor custo total do que a busca gulosa.',outcome:'Resultado: caminho encontrado com custo 418.'}
    ]
  };

  const edgeKey = (a, b) => [a, b].sort().join('-');

  const buildRouteMap = () => `<div class="comparison-lab-card"><h3>Mapa interativo simplificado</h3><p>Avance cada painel para destacar, no mesmo mapa, o estado atual, a fronteira e o caminho parcial de cada estratégia.</p><div class="interactive-romania-map" aria-label="Mapa interativo simplificado da Romênia para comparação entre busca gulosa e A estrela"><svg viewBox="0 0 100 70" preserveAspectRatio="none" aria-hidden="true"><line class="route-edge" data-edge="Arad-Zerind" x1="13" y1="42" x2="21" y2="29"></line><line class="route-edge" data-edge="Oradea-Zerind" x1="21" y1="29" x2="29" y2="15"></line><line class="route-edge" data-edge="Oradea-Sibiu" x1="29" y1="15" x2="43" y2="31"></line><line class="route-edge" data-edge="Arad-Sibiu" x1="13" y1="42" x2="43" y2="31"></line><line class="route-edge" data-edge="Arad-Timisoara" x1="13" y1="42" x2="22" y2="56"></line><line class="route-edge" data-edge="Fagaras-Sibiu" x1="43" y1="31" x2="62" y2="24"></line><line class="route-edge" data-edge="Bucharest-Fagaras" x1="62" y1="24" x2="83" y2="41"></line><line class="route-edge" data-edge="Rimnicu Vilcea-Sibiu" x1="43" y1="31" x2="52" y2="47"></line><line class="route-edge" data-edge="Pitesti-Rimnicu Vilcea" x1="52" y1="47" x2="68" y2="50"></line><line class="route-edge" data-edge="Bucharest-Pitesti" x1="68" y1="50" x2="83" y2="41"></line><line class="route-edge" data-edge="Craiova-Rimnicu Vilcea" x1="52" y1="47" x2="55" y2="62"></line></svg><div class="route-node" data-city="Arad" style="left:13%;top:60%"><strong>Arad</strong><small>h=366</small></div><div class="route-node" data-city="Zerind" style="left:21%;top:41%"><strong>Zerind</strong><small>h=374</small></div><div class="route-node" data-city="Oradea" style="left:29%;top:22%"><strong>Oradea</strong><small>h=380</small></div><div class="route-node" data-city="Sibiu" style="left:43%;top:44%"><strong>Sibiu</strong><small>h=253</small></div><div class="route-node" data-city="Timisoara" style="left:22%;top:80%"><strong>Timisoara</strong><small>h=329</small></div><div class="route-node" data-city="Fagaras" style="left:62%;top:34%"><strong>Fagaras</strong><small>h=176</small></div><div class="route-node" data-city="Rimnicu Vilcea" style="left:52%;top:67%"><strong>Rimnicu Vilcea</strong><small>h=193</small></div><div class="route-node" data-city="Pitesti" style="left:68%;top:71%"><strong>Pitesti</strong><small>h=100</small></div><div class="route-node goal" data-city="Bucharest" style="left:83%;top:59%"><strong>Bucharest</strong><small>h=0</small></div><div class="route-node" data-city="Craiova" style="left:55%;top:88%"><strong>Craiova</strong><small>h=160</small></div></div></div>`;

  const buildInteractiveComparisonLab = () => {
    if (!root || document.querySelector('.comparison-lab')) return;
    const section = root.closest('.section');
    const heading = section?.querySelector('.section-heading');
    if (heading && !section.querySelector('.comparison-map-figure')) {
      heading.insertAdjacentHTML('afterend', `<figure class="comparison-map-figure"><img src="assets/mapa-romenia-russell-norvig-fig-3-1.png" alt="Mapa simplificado de parte da Romênia, com cidades conectadas por estradas e distâncias." loading="lazy"><figcaption><strong>Mapa de referência.</strong> O objetivo é sair de <strong>Arad</strong> e chegar a <strong>Bucharest</strong>. Abaixo, percorra o mesmo problema com busca gulosa e com A*.</figcaption></figure>`);
    }
    root.classList.add('legacy-guided-search-hidden');
    root.insertAdjacentHTML('afterend', `<div class="comparison-lab">${buildRouteMap()}<div class="map-status-strip"><div class="map-status-card map-status-greedy" data-map-status="greedy"><small>Greedy</small><strong>Estado atual: Arad</strong></div><div class="map-status-card map-status-astar" data-map-status="astar"><small>A*</small><strong>Estado atual: Arad</strong></div></div><div class="comparison-panels"><article class="runner-panel" data-runner-panel="greedy"><div class="runner-panel-header"><div><span class="didactic-label">Busca gulosa</span><h3>Greedy Best-First Search</h3></div><div class="runner-rule">prioridade = h(n)</div></div><div class="runner-actions"><button type="button" data-runner="greedy" data-action="step">Executar um passo</button><button type="button" data-runner="greedy" data-action="reset">Reiniciar</button></div><div class="runner-stats-grid"><div><small>Passo</small><strong data-greedy-step>0</strong></div><div><small>Estado atual</small><strong data-greedy-current>Arad</strong></div><div><small>Custo acumulado</small><strong data-greedy-cost>0</strong></div><div><small>Caminho</small><strong data-greedy-path>Arad</strong></div></div><div class="runner-frontier-card"><small>Fronteira</small><ul data-greedy-frontier></ul></div><div class="runner-explanation-card"><small>Explicação do passo</small><p data-greedy-explanation></p></div><div class="runner-outcome-card" data-greedy-outcome></div></article><article class="runner-panel" data-runner-panel="astar"><div class="runner-panel-header"><div><span class="didactic-label">Busca informada</span><h3>Algoritmo A*</h3></div><div class="runner-rule">prioridade = g(n) + h(n)</div></div><div class="runner-actions"><button type="button" data-runner="astar" data-action="step">Executar um passo</button><button type="button" data-runner="astar" data-action="reset">Reiniciar</button></div><div class="runner-stats-grid"><div><small>Passo</small><strong data-astar-step>0</strong></div><div><small>Estado atual</small><strong data-astar-current>Arad</strong></div><div><small>Custo acumulado</small><strong data-astar-cost>0</strong></div><div><small>Caminho</small><strong data-astar-path>Arad</strong></div></div><div class="runner-frontier-card"><small>Fronteira</small><ul data-astar-frontier></ul></div><div class="runner-explanation-card"><small>Explicação do passo</small><p data-astar-explanation></p></div><div class="runner-outcome-card" data-astar-outcome></div></article></div></div>`);

    const state = { greedy:0, astar:0 };
    const refreshMap = () => {
      document.querySelectorAll('.route-node').forEach((node) => node.classList.remove('greedy-current','astar-current','greedy-frontier','astar-frontier'));
      document.querySelectorAll('.route-edge').forEach((edge) => edge.classList.remove('greedy-path','astar-path'));
      Object.keys(state).forEach((runner) => {
        const frame = comparisonFrames[runner][state[runner]];
        document.querySelector(`[data-city="${frame.current}"]`)?.classList.add(`${runner}-current`);
        (frame.frontierCities || []).forEach((city) => document.querySelector(`[data-city="${city}"]`)?.classList.add(`${runner}-frontier`));
        for (let i = 0; i < frame.path.length - 1; i += 1) {
          document.querySelector(`[data-edge="${edgeKey(frame.path[i], frame.path[i + 1])}"]`)?.classList.add(`${runner}-path`);
        }
      });
    };

    const renderRunner = (runner) => {
      const frame = comparisonFrames[runner][state[runner]];
      const set = (selector, value) => { const el = document.querySelector(selector); if (el) el.textContent = value; };
      set(`[data-${runner}-step]`, String(frame.step));
      set(`[data-${runner}-current]`, frame.current);
      set(`[data-${runner}-cost]`, frame.cost);
      set(`[data-${runner}-path]`, frame.path.join(' → '));
      set(`[data-${runner}-explanation]`, frame.explanation);
      set(`[data-${runner}-outcome]`, frame.outcome || '');
      set(`[data-map-status="${runner}"] strong`, `Estado atual: ${frame.current}`);
      const frontierEl = document.querySelector(`[data-${runner}-frontier]`);
      if (frontierEl) frontierEl.innerHTML = frame.frontier.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
      refreshMap();
    };

    const stepRunner = (runner) => { if (state[runner] < comparisonFrames[runner].length - 1) { state[runner] += 1; renderRunner(runner); } };
    const resetRunner = (runner) => { state[runner] = 0; renderRunner(runner); };
    document.querySelectorAll('[data-action="step"]').forEach((button) => button.addEventListener('click', () => stepRunner(button.dataset.runner)));
    document.querySelectorAll('[data-action="reset"]').forEach((button) => button.addEventListener('click', () => resetRunner(button.dataset.runner)));
    renderRunner('greedy');
    renderRunner('astar');
  };

  injectStyles();
  organizeTopicList();
  compactCompetencyCards();
  insertFormalizationSection();
  updateBridgeText();
  updateHeuristicIntroCards();
  updateHeuristicCallout();
  enhanceHeuristicSection();
  insertConceptAnchorCard();
  configureRomaniaReference();
  insertAlgorithmDidacticPanels();
  enhanceAdmissibilitySection();
  buildInteractiveComparisonLab();
})();