(() => {
  const searchConcept = document.querySelector("#busca .concept-callout");
  if (searchConcept) {
    searchConcept.classList.add("search-concept-contrast");
    searchConcept.innerHTML = `
      <div class="concept-icon" aria-hidden="true">?</div>
      <div class="search-concept-content">
        <h3>Busca não informada e busca informada</h3>
        <p class="search-concept-intro">As duas estratégias conhecem o problema. A diferença é <strong>quanto de orientação</strong> o algoritmo possui para escolher o que explorar primeiro.</p>

        <div class="search-mode-grid">
          <article class="search-mode-card search-mode-uninformed">
            <h4>Busca não informada</h4>
            <p>O algoritmo sabe <strong>onde começar</strong>, quais <strong>ações</strong> pode realizar e como reconhecer o <strong>objetivo</strong>, mas não possui pistas sobre qual caminho parece mais promissor. Por isso, explora as possibilidades seguindo apenas a regra usada para organizar os estados que ainda precisam ser examinados.</p>
            <small>BFS e DFS são exemplos desse tipo de busca.</small>
          </article>

          <article class="search-mode-card search-mode-informed">
            <h4>Busca informada</h4>
            <p>Além de conhecer o problema, o algoritmo dispõe de uma <strong>estimativa</strong> que ajuda a indicar quais estados parecem mais promissores em relação ao objetivo. Essa informação orienta a exploração e pode reduzir a quantidade de alternativas examinadas.</p>
            <small>Veremos depois como heurísticas fornecem essa orientação.</small>
          </article>
        </div>

        <div class="search-mode-takeaway"><strong>Diferença central:</strong> a busca não informada explora sem estimativas sobre o melhor caminho; a busca informada usa uma estimativa para decidir onde vale a pena procurar primeiro.</div>
      </div>
    `;
  }

  const bfsSection = document.querySelector("#bfs");
  if (bfsSection) {
    const heading = bfsSection.querySelector(".section-heading");
    const title = heading?.querySelector("h2");
    const intro = heading?.querySelector("p:last-child");

    if (title) title.textContent = "BFS explora por camadas: primeiro o que está perto, depois o que está mais longe";
    if (intro) {
      intro.innerHTML = "A ideia da busca em largura é simples: antes de avançar para estados mais distantes, ela examina <strong>todas as alternativas que estão à mesma distância do início</strong>. Por isso, sua exploração se parece com ondas que se espalham pelo espaço de estados.";
    }

    const algorithmLayout = bfsSection.querySelector(".algorithm-layout");
    if (algorithmLayout && !bfsSection.querySelector(".bfs-learning-grid")) {
      const pedagogy = document.createElement("div");
      pedagogy.className = "overview-grid bfs-learning-grid";
      pedagogy.style.marginBottom = "1.7rem";
      pedagogy.innerHTML = `
        <article class="card">
          <p class="eyebrow">Intuição</p>
          <h3>Primeiro uma camada inteira</h3>
          <p>BFS não escolhe um ramo e segue até o fim. Ela considera primeiro os estados a <strong>1 passo</strong> do início, depois os que estão a <strong>2 passos</strong>, depois a 3, e assim por diante.</p>
        </article>

        <article class="card">
          <p class="eyebrow">No exemplo do prédio</p>
          <h3>Da Recepção para fora</h3>
          <p><strong>Profundidade 0:</strong> Recepção. <strong>Profundidade 1:</strong> Corredor A e Sala 101. <strong>Profundidade 2:</strong> Copa, Arquivo e Hall. Só depois a busca avança para estados ainda mais distantes.</p>
        </article>

        <article class="card">
          <p class="eyebrow">Quando faz sentido usar?</p>
          <h3>Quando poucos passos importam</h3>
          <p>BFS é especialmente útil quando queremos encontrar uma solução com o <strong>menor número de transições</strong> e todas as ações têm o mesmo custo. Exemplos: menor número de conexões em uma rede, de cliques entre páginas ou de movimentos em um problema não ponderado.</p>
        </article>
      `;
      algorithmLayout.before(pedagogy);
    }

    const algorithmCardText = bfsSection.querySelector(".algorithm-card > p");
    if (algorithmCardText) {
      algorithmCardText.innerHTML = "A <strong>fila</strong> é o que mantém essa exploração por camadas: novos estados entram no fim e os mais antigos saem primeiro. Quando todas as ações têm o mesmo custo, a primeira solução encontrada tem o menor número de passos.";
    }
  }

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
