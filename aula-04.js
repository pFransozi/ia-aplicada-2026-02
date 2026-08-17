(() => {
  const graph = {
    recepcao: ["corredor_a", "sala_101"],
    corredor_a: ["recepcao", "copa", "arquivo"],
    copa: ["corredor_a", "estoque"],
    estoque: ["copa", "deposito"],
    deposito: ["estoque"],
    arquivo: ["corredor_a"],
    sala_101: ["recepcao", "hall"],
    hall: ["sala_101", "laboratorio"],
    laboratorio: ["hall"]
  };

  const labels = {
    recepcao: "Recepção",
    corredor_a: "Corredor A",
    copa: "Copa",
    estoque: "Estoque",
    deposito: "Depósito",
    arquivo: "Arquivo",
    sala_101: "Sala 101",
    hall: "Hall",
    laboratorio: "Laboratório"
  };

  const fmt = (items) => items.length ? items.map(item => labels[item] || item).join(" → ") : "—";

  const sim = document.querySelector("[data-search-simulator]");
  if (sim) {
    const frontierEl = sim.querySelector("[data-frontier]");
    const visitedEl = sim.querySelector("[data-visited]");
    const currentEl = sim.querySelector("[data-current]");
    const pathEl = sim.querySelector("[data-path]");
    const statusEl = sim.querySelector("[data-status]");
    const logEl = sim.querySelector("[data-log]");
    const stepButton = sim.querySelector("[data-step]");
    const autoButton = sim.querySelector("[data-auto]");
    const resetButton = sim.querySelector("[data-reset]");
    const modeButtons = [...sim.querySelectorAll("[data-mode]")];
    const nodes = [...document.querySelectorAll("[data-graph-node]")];

    let mode = "bfs";
    let frontier = [];
    let discovered = new Set();
    let visited = [];
    let current = null;
    let currentPath = [];
    let foundPath = null;
    let timer = null;
    let expanded = 0;
    let maxFrontier = 1;

    function addLog(text) {
      const p = document.createElement("p");
      p.textContent = text;
      logEl.prepend(p);
    }

    function stopAuto() {
      if (timer) window.clearInterval(timer);
      timer = null;
      autoButton.textContent = "Executar automaticamente";
    }

    function render() {
      frontierEl.textContent = frontier.length ? frontier.map(item => labels[item.node]).join(" · ") : "—";
      visitedEl.textContent = visited.length ? visited.map(item => labels[item]).join(" · ") : "—";
      currentEl.textContent = current ? labels[current] : "—";
      pathEl.textContent = foundPath ? fmt(foundPath) : (currentPath.length ? fmt(currentPath) : "—");

      nodes.forEach(node => {
        const id = node.dataset.graphNode;
        node.classList.toggle("discovered", discovered.has(id));
        node.classList.toggle("visited", visited.includes(id));
        node.classList.toggle("current", current === id && !foundPath);
        node.classList.toggle("found", Boolean(foundPath && foundPath.includes(id)));
      });

      if (foundPath) {
        statusEl.textContent = `Objetivo encontrado com ${foundPath.length - 1} movimento(s). Estados expandidos: ${expanded}. Pico da fronteira: ${maxFrontier}.`;
      } else if (!frontier.length && current) {
        statusEl.textContent = "A fronteira ficou vazia. Não há solução alcançável a partir do estado inicial.";
      } else {
        statusEl.textContent = mode === "bfs"
          ? "BFS: retira o elemento mais antigo da fila."
          : "DFS: retira o elemento mais recente da pilha.";
      }
    }

    function reset() {
      stopAuto();
      frontier = [{ node: "recepcao", path: ["recepcao"] }];
      discovered = new Set(["recepcao"]);
      visited = [];
      current = null;
      currentPath = [];
      foundPath = null;
      expanded = 0;
      maxFrontier = 1;
      logEl.innerHTML = "";
      addLog(`${mode.toUpperCase()} iniciado na Recepção.`);
      render();
    }

    function step() {
      if (foundPath || !frontier.length) {
        stopAuto();
        render();
        return;
      }

      const entry = mode === "bfs" ? frontier.shift() : frontier.pop();
      current = entry.node;
      currentPath = entry.path;
      visited.push(current);
      expanded += 1;
      addLog(`Expandindo ${labels[current]}.`);

      if (current === "laboratorio") {
        foundPath = currentPath;
        addLog(`Objetivo encontrado: ${fmt(foundPath)}.`);
        stopAuto();
        render();
        return;
      }

      let next = graph[current].filter(node => !discovered.has(node));
      if (mode === "dfs") next = [...next].reverse();

      next.forEach(node => {
        discovered.add(node);
        frontier.push({ node, path: [...currentPath, node] });
      });

      maxFrontier = Math.max(maxFrontier, frontier.length);
      if (next.length) addLog(`Novos estados na fronteira: ${next.map(node => labels[node]).join(", ")}.`);
      else addLog("Nenhum estado novo foi adicionado à fronteira.");

      render();
      if (!frontier.length) stopAuto();
    }

    modeButtons.forEach(button => {
      button.addEventListener("click", () => {
        mode = button.dataset.mode;
        modeButtons.forEach(item => item.classList.toggle("active", item === button));
        reset();
      });
    });

    stepButton.addEventListener("click", step);
    resetButton.addEventListener("click", reset);
    autoButton.addEventListener("click", () => {
      if (timer) {
        stopAuto();
        return;
      }
      autoButton.textContent = "Pausar execução";
      timer = window.setInterval(() => {
        step();
        if (foundPath || !frontier.length) stopAuto();
      }, 850);
    });

    reset();
  }

  function runSearch(mode) {
    let frontier = [{ node: "recepcao", path: ["recepcao"] }];
    const discovered = new Set(["recepcao"]);
    let expanded = 0;
    let maxFrontier = 1;

    while (frontier.length) {
      const entry = mode === "bfs" ? frontier.shift() : frontier.pop();
      expanded += 1;
      if (entry.node === "laboratorio") {
        return { path: entry.path, expanded, maxFrontier };
      }

      let next = graph[entry.node].filter(node => !discovered.has(node));
      if (mode === "dfs") next = [...next].reverse();
      next.forEach(node => {
        discovered.add(node);
        frontier.push({ node, path: [...entry.path, node] });
      });
      maxFrontier = Math.max(maxFrontier, frontier.length);
    }
    return { path: [], expanded, maxFrontier };
  }

  const compareButton = document.querySelector("[data-run-comparison]");
  if (compareButton) {
    compareButton.addEventListener("click", () => {
      ["bfs", "dfs"].forEach(mode => {
        const result = runSearch(mode);
        const row = document.querySelector(`[data-result-${mode}]`);
        if (!row) return;
        row.querySelector("[data-result-path]").textContent = fmt(result.path);
        row.querySelector("[data-result-depth]").textContent = String(Math.max(0, result.path.length - 1));
        row.querySelector("[data-result-expanded]").textContent = String(result.expanded);
        row.querySelector("[data-result-frontier]").textContent = String(result.maxFrontier);
      });
      compareButton.textContent = "Comparação atualizada";
    });
  }

  const storagePrefix = "ia-aula04:";
  document.querySelectorAll("[data-persist]").forEach((field, index) => {
    const key = storagePrefix + (field.dataset.persist || `field-${index}`);
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      if (field.type === "checkbox") field.checked = saved === "1";
      else field.value = saved;
    }
    field.addEventListener("input", () => {
      localStorage.setItem(key, field.type === "checkbox" ? (field.checked ? "1" : "0") : field.value);
    });
    field.addEventListener("change", () => {
      localStorage.setItem(key, field.type === "checkbox" ? (field.checked ? "1" : "0") : field.value);
    });
  });
})();

(() => {
  if (document.body.dataset.aula04Enhanced === "1") return;
  document.body.dataset.aula04Enhanced = "1";

  const style = document.createElement("style");
  style.textContent = `
    .lesson-figure{margin:2rem 0 0;border:1px solid var(--line);border-radius:22px;overflow:hidden;background:#fff;box-shadow:var(--shadow)}
    .lesson-figure img{display:block;width:100%;height:auto;background:#fff}
    .lesson-figure figcaption{padding:.8rem 1rem;border-top:1px solid var(--line);color:var(--muted);font-size:.82rem;background:var(--paper)}
    .concept-callout{display:grid;grid-template-columns:56px 1fr;gap:1rem;align-items:start;margin:0 0 1.7rem;padding:1.15rem 1.2rem;border:1px solid var(--line);border-radius:18px;background:linear-gradient(135deg,var(--blue-soft),var(--paper))}
    .concept-callout .concept-icon{display:grid;place-items:center;width:50px;height:50px;border-radius:15px;background:var(--blue);color:#fff;font-size:1.25rem;font-weight:900}
    .concept-callout h3{margin:.05rem 0 .45rem;font-size:1.25rem}.concept-callout p{margin:0}
    .criteria-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:0 0 1.7rem}
    .criteria-card{min-height:155px;padding:1rem;border:1px solid var(--line);border-radius:17px;background:var(--paper)}
    .criteria-card small{display:block;margin-bottom:.7rem;color:var(--blue);font-weight:850;letter-spacing:.08em}.criteria-card h3{margin-bottom:.45rem}.criteria-card p{margin:0;font-size:.9rem}
    .cost-split{margin:1.5rem 0 0;padding:1rem 1.1rem;border:1px solid #efd5a7;border-radius:15px;background:var(--amber-soft);color:var(--muted)}
    .cost-split strong{color:var(--amber)}
    body.theme-dark .lesson-figure{border-color:var(--line);box-shadow:0 18px 48px rgba(0,0,0,.26)}
    body.theme-dark .lesson-figure figcaption{background:#172033}
    body.theme-dark .concept-callout{background:linear-gradient(135deg,#111a2b,#172033)}
    body.theme-dark .criteria-card{background:#172033}
    @media(max-width:1000px){.criteria-grid{grid-template-columns:repeat(2,1fr)}}
    @media(max-width:640px){.criteria-grid{grid-template-columns:1fr}.concept-callout{grid-template-columns:1fr}.lesson-figure{border-radius:16px}}
  `;
  document.head.appendChild(style);

  const makeFigure = (src, alt, caption) => {
    const figure = document.createElement("figure");
    figure.className = "lesson-figure";
    figure.innerHTML = `<img src="${src}" alt="${alt}" loading="lazy"><figcaption>${caption}</figcaption>`;
    return figure;
  };

  const topicList = document.querySelector("#visao .topic-list");
  if (topicList) {
    const first = document.createElement("div");
    first.textContent = "Busca não informada";
    topicList.prepend(first);
    const last = document.createElement("div");
    last.textContent = "Critérios de comparação";
    topicList.append(last);
  }

  const warmupContainer = document.querySelector("#aquecimento .container");
  if (warmupContainer) {
    warmupContainer.appendChild(makeFigure(
      "assets/aula-04-representacao-busca.svg",
      "Da representação do prédio para o grafo de estados e, depois, para a estrutura dinâmica da busca.",
      "A representação define o espaço possível; o algoritmo de busca decide a ordem em que esse espaço será explorado."
    ));
  }

  const buscaHeading = document.querySelector("#busca .section-heading");
  if (buscaHeading) {
    const uninformed = document.createElement("div");
    uninformed.className = "concept-callout";
    uninformed.innerHTML = `
      <div class="concept-icon" aria-hidden="true">?</div>
      <div><h3>O que significa busca não informada?</h3><p>O algoritmo conhece o <strong>estado inicial</strong>, as <strong>ações e transições possíveis</strong> e o <strong>objetivo</strong>, mas não possui uma estimativa de qual alternativa parece mais próxima ou mais promissora. Ele precisa decidir a exploração usando apenas a organização da fronteira.</p></div>`;
    buscaHeading.insertAdjacentElement("afterend", uninformed);
  }

  const anatomy = document.querySelector("#busca .search-anatomy");
  if (anatomy) {
    anatomy.insertAdjacentElement("afterend", makeFigure(
      "assets/aula-04-anatomia-busca.svg",
      "Fluxo da busca com fronteira, retirada de estado, teste de objetivo, expansão, filtro de repetidos e inserção de sucessores.",
      "BFS e DFS compartilham o mesmo ciclo geral; a diferença principal está na política usada para retirar o próximo estado da fronteira."
    ));
  }

  const dfsLayout = document.querySelector("#dfs .algorithm-layout");
  if (dfsLayout) {
    dfsLayout.insertAdjacentElement("afterend", makeFigure(
      "assets/aula-04-fila-pilha.svg",
      "Comparação entre fila FIFO da BFS e pilha LIFO da DFS.",
      "Fila e pilha não são apenas estruturas de dados: elas materializam duas políticas diferentes de exploração do espaço de estados."
    ));
  }

  const comparisonHeading = document.querySelector("#comparacao .section-heading");
  if (comparisonHeading) {
    const criteria = document.createElement("div");
    criteria.className = "criteria-grid";
    criteria.innerHTML = `
      <article class="criteria-card"><small>01</small><h3>Completude</h3><p>Se uma solução existir, o algoritmo tem garantia de encontrá-la nas condições consideradas?</p></article>
      <article class="criteria-card"><small>02</small><h3>Qualidade da solução</h3><p>A primeira solução encontrada tem o menor número de passos ou apenas satisfaz o objetivo?</p></article>
      <article class="criteria-card"><small>03</small><h3>Custo da busca</h3><p>Quantos estados foram expandidos para chegar à solução?</p></article>
      <article class="criteria-card"><small>04</small><h3>Memória</h3><p>Quantos estados precisam permanecer armazenados, especialmente na fronteira?</p></article>`;
    comparisonHeading.insertAdjacentElement("afterend", criteria);
    criteria.insertAdjacentElement("afterend", makeFigure(
      "assets/aula-04-bfs-dfs.svg",
      "A mesma árvore explorada por BFS em largura e DFS em profundidade, com ordens diferentes.",
      "BFS percorre níveis; DFS aprofunda ramos. A ordem de exploração altera solução, número de expansões e uso de memória."
    ));
  }

  const comparisonTable = document.querySelector("#comparacao .comparison-table-wrap");
  if (comparisonTable) {
    const split = document.createElement("div");
    split.className = "cost-split";
    split.innerHTML = `<strong>Custo da solução ≠ custo da busca.</strong> Nesta aula, quando todas as ações têm o mesmo custo, o número de passos representa o custo da solução. Já <strong>estados expandidos</strong> e <strong>pico da fronteira</strong> medem o esforço computacional realizado para encontrá-la.`;
    comparisonTable.insertAdjacentElement("afterend", split);
    split.insertAdjacentElement("afterend", makeFigure(
      "assets/aula-04-crescimento-busca.svg",
      "Crescimento de uma árvore de busca com fator de ramificação três: 1, 3, 9, 27 e 81 estados por nível.",
      "O fator de ramificação indica quantos sucessores, em média, cada estado pode gerar. Quanto maior a ramificação e a profundidade, maior pode ser o espaço explorado."
    ));
  }

  const knowledgeGrid = document.querySelector("#fechamento .knowledge-grid");
  if (knowledgeGrid) {
    const uninformedItem = document.createElement("label");
    uninformedItem.className = "knowledge-item";
    uninformedItem.innerHTML = `<input type="checkbox" data-persist="c7"><span class="knowledge-content"><strong>Busca não informada</strong><span>Consigo explicar por que BFS e DFS não usam estimativas sobre qual estado está mais próximo do objetivo.</span></span>`;
    const costItem = document.createElement("label");
    costItem.className = "knowledge-item";
    costItem.innerHTML = `<input type="checkbox" data-persist="c8"><span class="knowledge-content"><strong>Solução × esforço de busca</strong><span>Consigo distinguir profundidade/custo da solução de estados expandidos e memória usada pela busca.</span></span>`;
    knowledgeGrid.append(uninformedItem, costItem);

    [uninformedItem.querySelector("input"), costItem.querySelector("input")].forEach(field => {
      const key = `ia-aula04:${field.dataset.persist}`;
      const saved = localStorage.getItem(key);
      if (saved !== null) field.checked = saved === "1";
      field.addEventListener("change", () => localStorage.setItem(key, field.checked ? "1" : "0"));
    });
  }
})();
