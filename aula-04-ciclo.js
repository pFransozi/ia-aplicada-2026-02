(() => {
  const anatomy = document.querySelector("#busca .search-anatomy");
  if (!anatomy || document.querySelector("[data-cycle-lab]")) return;

  const stylesheetHref = "aula-04-ciclo.css";
  if (!document.querySelector(`link[href="${stylesheetHref}"]`)) {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = stylesheetHref;
    document.head.appendChild(stylesheet);
  }

  const graph = {
    a: ["b", "c", "d"],
    b: ["a", "e", "f"],
    c: ["a", "f", "g", "h"],
    d: ["a", "h", "i"],
    e: ["b", "j"],
    f: ["b", "c", "j", "k"],
    g: ["c", "k"],
    h: ["c", "d", "k", "l"],
    i: ["d", "l"],
    j: ["e", "f"],
    k: ["f", "g", "h", "m"],
    l: ["h", "i", "m"],
    m: ["k", "l"]
  };

  const start = "a";
  const goal = "m";
  const labels = Object.fromEntries(Object.keys(graph).map((node) => [node, node.toUpperCase()]));
  const stageOrder = ["prepare", "choose", "test", "expand", "register"];
  const stageMeta = {
    prepare: { number: "01", short: "Preparar", title: "Preparar a busca" },
    choose: { number: "02", short: "Escolher", title: "Escolher um estado" },
    test: { number: "03", short: "Testar", title: "Testar o objetivo" },
    expand: { number: "04", short: "Expandir", title: "Expandir o estado" },
    register: { number: "05", short: "Registrar", title: "Registrar e continuar" }
  };

  const edgeKey = (from, to) => [from, to].sort().join("-");
  const formatNodes = (nodes, separator = " · ") => nodes.length
    ? nodes.map((node) => labels[node] || node).join(separator)
    : "—";

  const lab = document.createElement("div");
  lab.className = "cycle-lab";
  lab.dataset.cycleLab = "";
  lab.setAttribute("aria-labelledby", "cycle-lab-title");
  lab.innerHTML = `
    <div class="cycle-lab-header">
      <div>
        <p class="eyebrow">Simulação passo a passo</p>
        <h3 id="cycle-lab-title">Acompanhe cada etapa do ciclo em um grafo</h3>
        <p>O grafo abaixo é propositalmente mais denso que o exemplo do robô: possui caminhos alternativos, reencontros e ciclos. Avance uma etapa por vez para observar como o algoritmo separa o estado atual, a fronteira e os estados já expandidos.</p>
      </div>

      <div class="cycle-policy">
        <span>Política da fronteira</span>
        <div class="cycle-policy-buttons" role="group" aria-label="Escolher a política da fronteira">
          <button type="button" class="active" data-cycle-mode="bfs" aria-pressed="true">Fila · BFS</button>
          <button type="button" data-cycle-mode="dfs" aria-pressed="false">Pilha · DFS</button>
        </div>
        <small data-cycle-policy-note>Na fila, o estado exibido primeiro será o próximo a sair.</small>
      </div>
    </div>

    <div class="cycle-lab-layout">
      <section class="cycle-graph-card" aria-labelledby="cycle-graph-heading">
        <div class="cycle-card-heading">
          <div>
            <span>Estado inicial: <strong>A</strong></span>
            <h4 id="cycle-graph-heading">Objetivo: alcançar M</h4>
          </div>
          <span class="cycle-graph-count">13 estados · 19 conexões</span>
        </div>

        <div class="cycle-network-wrap">
          <svg class="cycle-network" viewBox="0 0 760 560" role="img" aria-labelledby="cycle-network-title cycle-network-desc">
            <title id="cycle-network-title">Grafo genérico utilizado na simulação do ciclo da busca</title>
            <desc id="cycle-network-desc">Grafo bidirecional com treze estados, de A até M, contendo caminhos alternativos e ciclos.</desc>

            <g class="cycle-edges" aria-hidden="true">
              <line data-cycle-edge="a-b" x1="380" y1="52" x2="120" y2="152"></line>
              <line data-cycle-edge="a-c" x1="380" y1="52" x2="380" y2="152"></line>
              <line data-cycle-edge="a-d" x1="380" y1="52" x2="640" y2="152"></line>
              <line data-cycle-edge="b-e" x1="120" y1="152" x2="60" y2="282"></line>
              <line data-cycle-edge="b-f" x1="120" y1="152" x2="230" y2="282"></line>
              <line data-cycle-edge="c-f" x1="380" y1="152" x2="230" y2="282"></line>
              <line data-cycle-edge="c-g" x1="380" y1="152" x2="380" y2="282"></line>
              <line data-cycle-edge="c-h" x1="380" y1="152" x2="530" y2="282"></line>
              <line data-cycle-edge="d-h" x1="640" y1="152" x2="530" y2="282"></line>
              <line data-cycle-edge="d-i" x1="640" y1="152" x2="700" y2="282"></line>
              <line data-cycle-edge="e-j" x1="60" y1="282" x2="120" y2="412"></line>
              <line data-cycle-edge="f-j" x1="230" y1="282" x2="120" y2="412"></line>
              <line data-cycle-edge="f-k" x1="230" y1="282" x2="340" y2="412"></line>
              <line data-cycle-edge="g-k" x1="380" y1="282" x2="340" y2="412"></line>
              <line data-cycle-edge="h-k" x1="530" y1="282" x2="340" y2="412"></line>
              <line data-cycle-edge="h-l" x1="530" y1="282" x2="580" y2="412"></line>
              <line data-cycle-edge="i-l" x1="700" y1="282" x2="580" y2="412"></line>
              <line data-cycle-edge="k-m" x1="340" y1="412" x2="460" y2="522"></line>
              <line data-cycle-edge="l-m" x1="580" y1="412" x2="460" y2="522"></line>
            </g>

            <g class="cycle-nodes">
              <g class="cycle-node is-start" data-cycle-node="a" transform="translate(380 52)"><circle r="27"></circle><text>A</text></g>
              <g class="cycle-node" data-cycle-node="b" transform="translate(120 152)"><circle r="27"></circle><text>B</text></g>
              <g class="cycle-node" data-cycle-node="c" transform="translate(380 152)"><circle r="27"></circle><text>C</text></g>
              <g class="cycle-node" data-cycle-node="d" transform="translate(640 152)"><circle r="27"></circle><text>D</text></g>
              <g class="cycle-node" data-cycle-node="e" transform="translate(60 282)"><circle r="27"></circle><text>E</text></g>
              <g class="cycle-node" data-cycle-node="f" transform="translate(230 282)"><circle r="27"></circle><text>F</text></g>
              <g class="cycle-node" data-cycle-node="g" transform="translate(380 282)"><circle r="27"></circle><text>G</text></g>
              <g class="cycle-node" data-cycle-node="h" transform="translate(530 282)"><circle r="27"></circle><text>H</text></g>
              <g class="cycle-node" data-cycle-node="i" transform="translate(700 282)"><circle r="27"></circle><text>I</text></g>
              <g class="cycle-node" data-cycle-node="j" transform="translate(120 412)"><circle r="27"></circle><text>J</text></g>
              <g class="cycle-node" data-cycle-node="k" transform="translate(340 412)"><circle r="27"></circle><text>K</text></g>
              <g class="cycle-node" data-cycle-node="l" transform="translate(580 412)"><circle r="27"></circle><text>L</text></g>
              <g class="cycle-node is-goal" data-cycle-node="m" transform="translate(460 522)"><circle r="27"></circle><text>M</text></g>
            </g>
          </svg>
        </div>

        <div class="cycle-legend" aria-label="Legenda do grafo">
          <span><i class="legend-current"></i>Atual</span>
          <span><i class="legend-frontier"></i>Na fronteira</span>
          <span><i class="legend-expanded"></i>Expandido</span>
          <span><i class="legend-successor"></i>Novo sucessor</span>
          <span><i class="legend-repeat"></i>Repetido</span>
        </div>
      </section>

      <section class="cycle-execution-card" aria-labelledby="cycle-execution-heading">
        <div class="cycle-card-heading">
          <div>
            <span data-cycle-position>Inicialização</span>
            <h4 id="cycle-execution-heading">Execução da busca</h4>
          </div>
          <span class="cycle-policy-badge" data-cycle-policy-badge>FILA · FIFO</span>
        </div>

        <div class="cycle-stage-track" role="list" aria-label="Etapas do ciclo da busca">
          ${stageOrder.map((stage) => `
            <div role="listitem" class="cycle-stage" data-cycle-stage="${stage}">
              <span>${stageMeta[stage].number}</span>
              <strong>${stageMeta[stage].short}</strong>
            </div>
          `).join("")}
        </div>

        <div class="cycle-narrative" aria-live="polite" aria-atomic="true">
          <span data-cycle-step-kicker>Etapa 01</span>
          <h4 data-cycle-step-title>Preparar a busca</h4>
          <p data-cycle-step-description></p>
        </div>

        <div class="cycle-structures">
          <div><small>Estado atual</small><strong data-cycle-current>—</strong></div>
          <div><small>Fronteira <span>(próximo → depois)</span></small><strong data-cycle-frontier>—</strong></div>
          <div><small>Estados expandidos</small><strong data-cycle-expanded>—</strong></div>
          <div><small>Caminho atual / solução</small><strong data-cycle-path>—</strong></div>
        </div>

        <div class="cycle-successor-grid">
          <div><small>Novos sucessores</small><strong data-cycle-new>—</strong></div>
          <div><small>Repetidos ignorados</small><strong data-cycle-repeated>—</strong></div>
        </div>

        <div class="cycle-controls">
          <button type="button" data-cycle-prev>← Etapa anterior</button>
          <button type="button" class="cycle-primary" data-cycle-next>Próxima etapa →</button>
          <button type="button" data-cycle-auto>Executar automaticamente</button>
          <button type="button" data-cycle-reset>Reiniciar</button>
        </div>

        <p class="cycle-progress"><span data-cycle-progress></span><span aria-hidden="true"> · </span><span data-cycle-cycle></span></p>
      </section>
    </div>

    <div class="cycle-lab-note">
      <strong>Observe o padrão:</strong> depois da inicialização, as etapas <em>escolher → testar → expandir → registrar</em> voltam a acontecer com outro estado. Ao trocar fila por pilha, o ciclo permanece igual; muda apenas qual elemento sai da fronteira.
    </div>
  `;

  anatomy.after(lab);

  const modeButtons = [...lab.querySelectorAll("[data-cycle-mode]")];
  const stageEls = [...lab.querySelectorAll("[data-cycle-stage]")];
  const nodeEls = [...lab.querySelectorAll("[data-cycle-node]")];
  const edgeEls = [...lab.querySelectorAll("[data-cycle-edge]")];
  const prevButton = lab.querySelector("[data-cycle-prev]");
  const nextButton = lab.querySelector("[data-cycle-next]");
  const autoButton = lab.querySelector("[data-cycle-auto]");
  const resetButton = lab.querySelector("[data-cycle-reset]");
  const policyNoteEl = lab.querySelector("[data-cycle-policy-note]");
  const policyBadgeEl = lab.querySelector("[data-cycle-policy-badge]");
  const positionEl = lab.querySelector("[data-cycle-position]");
  const kickerEl = lab.querySelector("[data-cycle-step-kicker]");
  const titleEl = lab.querySelector("[data-cycle-step-title]");
  const descriptionEl = lab.querySelector("[data-cycle-step-description]");
  const currentEl = lab.querySelector("[data-cycle-current]");
  const frontierEl = lab.querySelector("[data-cycle-frontier]");
  const expandedEl = lab.querySelector("[data-cycle-expanded]");
  const pathEl = lab.querySelector("[data-cycle-path]");
  const newEl = lab.querySelector("[data-cycle-new]");
  const repeatedEl = lab.querySelector("[data-cycle-repeated]");
  const progressEl = lab.querySelector("[data-cycle-progress]");
  const cycleEl = lab.querySelector("[data-cycle-cycle]");

  let mode = "bfs";
  let snapshots = [];
  let snapshotIndex = 0;
  let timer = null;

  function frontierForDisplay(frontier, selectedMode) {
    const ordered = selectedMode === "bfs" ? frontier : [...frontier].reverse();
    return ordered.map((entry) => entry.node);
  }

  function snapshot(stage, state, extras = {}) {
    return {
      stage,
      cycle: state.cycle,
      current: state.current,
      currentPath: [...state.currentPath],
      frontier: frontierForDisplay(state.frontier, state.mode),
      expanded: [...state.expanded],
      discovered: [...state.discovered],
      successors: [...(extras.successors || [])],
      newSuccessors: [...(extras.newSuccessors || [])],
      repeated: [...(extras.repeated || [])],
      solution: [...(extras.solution || [])],
      message: extras.message || ""
    };
  }

  function buildSnapshots(selectedMode) {
    const state = {
      mode: selectedMode,
      cycle: 0,
      frontier: [{ node: start, path: [start] }],
      discovered: new Set([start]),
      expanded: [],
      current: null,
      currentPath: []
    };
    const result = [];

    result.push(snapshot("prepare", state, {
      message: `O estado ${labels[start]} é colocado na fronteira e registrado como descoberto. Nenhum estado foi expandido ainda.`
    }));

    let guard = 0;
    while (state.frontier.length && guard < 100) {
      guard += 1;
      state.cycle += 1;

      const entry = selectedMode === "bfs" ? state.frontier.shift() : state.frontier.pop();
      state.current = entry.node;
      state.currentPath = entry.path;

      result.push(snapshot("choose", state, {
        message: selectedMode === "bfs"
          ? `${labels[state.current]} sai do início da fila. As demais alternativas continuam aguardando na fronteira.`
          : `${labels[state.current]} sai do topo da pilha. As demais alternativas continuam aguardando na fronteira.`
      }));

      const found = state.current === goal;
      result.push(snapshot("test", state, {
        solution: found ? state.currentPath : [],
        message: found
          ? `${labels[state.current]} satisfaz o objetivo. A busca termina e o caminho armazenado pode ser devolvido.`
          : `${labels[state.current]} ainda não é o objetivo ${labels[goal]}. O algoritmo precisa expandi-lo para descobrir novas possibilidades.`
      }));

      if (found) break;

      const successors = [...graph[state.current]];
      const newSuccessors = successors.filter((node) => !state.discovered.has(node));
      const repeated = successors.filter((node) => state.discovered.has(node));

      result.push(snapshot("expand", state, {
        successors,
        newSuccessors,
        repeated,
        message: newSuccessors.length
          ? `As conexões de ${labels[state.current]} geram ${formatNodes(successors)}. Os estados ${formatNodes(newSuccessors)} são novos; ${formatNodes(repeated)} já estavam registrados.`
          : `As conexões de ${labels[state.current]} geram ${formatNodes(successors)}, mas todos esses estados já estavam registrados.`
      }));

      const insertionOrder = selectedMode === "dfs" ? [...newSuccessors].reverse() : newSuccessors;
      insertionOrder.forEach((node) => {
        state.discovered.add(node);
        state.frontier.push({ node, path: [...state.currentPath, node] });
      });
      state.expanded.push(state.current);

      const nextNode = frontierForDisplay(state.frontier, selectedMode)[0];
      result.push(snapshot("register", state, {
        successors,
        newSuccessors,
        repeated,
        message: newSuccessors.length
          ? `${formatNodes(newSuccessors)} entra${newSuccessors.length === 1 ? "" : "m"} na fronteira, ${labels[state.current]} passa para os expandidos e ${nextNode ? labels[nextNode] : "nenhum estado"} será a próxima escolha.`
          : `${labels[state.current]} passa para os expandidos. Como nenhum estado novo foi inserido, a busca continua com ${nextNode ? labels[nextNode] : "a fronteira vazia"}.`
      }));
    }

    return result;
  }

  function stopAuto() {
    if (timer) window.clearInterval(timer);
    timer = null;
    autoButton.textContent = "Executar automaticamente";
    autoButton.classList.remove("active");
  }

  function render() {
    const state = snapshots[snapshotIndex];
    const meta = stageMeta[state.stage];
    const currentPath = state.solution.length ? state.solution : state.currentPath;
    const solutionEdges = new Set();

    for (let index = 0; index < state.solution.length - 1; index += 1) {
      solutionEdges.add(edgeKey(state.solution[index], state.solution[index + 1]));
    }

    stageEls.forEach((element) => {
      const active = element.dataset.cycleStage === state.stage;
      element.classList.toggle("active", active);
      element.setAttribute("aria-current", active ? "step" : "false");
    });

    nodeEls.forEach((element) => {
      const node = element.dataset.cycleNode;
      element.classList.toggle("is-frontier", state.frontier.includes(node));
      element.classList.toggle("is-expanded", state.expanded.includes(node));
      element.classList.toggle("is-current", state.current === node && !state.solution.length);
      element.classList.toggle("is-successor-new", state.stage === "expand" && state.newSuccessors.includes(node));
      element.classList.toggle("is-successor-repeat", state.stage === "expand" && state.repeated.includes(node));
      element.classList.toggle("is-solution", state.solution.includes(node));
    });

    edgeEls.forEach((element) => {
      element.classList.toggle("is-solution", solutionEdges.has(element.dataset.cycleEdge));
    });

    positionEl.textContent = state.cycle ? `Ciclo ${state.cycle}` : "Inicialização";
    kickerEl.textContent = `Etapa ${meta.number}`;
    titleEl.textContent = meta.title;
    descriptionEl.textContent = state.message;
    currentEl.textContent = state.current ? labels[state.current] : "—";
    frontierEl.textContent = formatNodes(state.frontier, " → ");
    expandedEl.textContent = formatNodes(state.expanded);
    pathEl.textContent = formatNodes(currentPath, " → ");
    newEl.textContent = state.stage === "expand" || state.stage === "register"
      ? formatNodes(state.newSuccessors)
      : "—";
    repeatedEl.textContent = state.stage === "expand" || state.stage === "register"
      ? formatNodes(state.repeated)
      : "—";
    progressEl.textContent = `Passo ${snapshotIndex + 1} de ${snapshots.length}`;
    cycleEl.textContent = state.solution.length
      ? `Objetivo encontrado em ${state.solution.length - 1} transições`
      : (state.cycle ? `Repetição ${state.cycle} do ciclo` : "Preparação única");

    prevButton.disabled = snapshotIndex === 0;
    nextButton.disabled = snapshotIndex === snapshots.length - 1;
    nextButton.textContent = snapshotIndex === snapshots.length - 1 ? "Busca concluída" : "Próxima etapa →";
  }

  function reset(selectedMode = mode) {
    stopAuto();
    mode = selectedMode;
    snapshots = buildSnapshots(mode);
    snapshotIndex = 0;

    modeButtons.forEach((button) => {
      const active = button.dataset.cycleMode === mode;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    if (mode === "bfs") {
      policyNoteEl.textContent = "Na fila, o estado exibido primeiro será o próximo a sair.";
      policyBadgeEl.textContent = "FILA · FIFO";
    } else {
      policyNoteEl.textContent = "Na pilha, o estado exibido primeiro representa o topo e será o próximo a sair.";
      policyBadgeEl.textContent = "PILHA · LIFO";
    }

    render();
  }

  modeButtons.forEach((button) => {
    button.addEventListener("click", () => reset(button.dataset.cycleMode));
  });

  prevButton.addEventListener("click", () => {
    stopAuto();
    if (snapshotIndex > 0) snapshotIndex -= 1;
    render();
  });

  nextButton.addEventListener("click", () => {
    stopAuto();
    if (snapshotIndex < snapshots.length - 1) snapshotIndex += 1;
    render();
  });

  resetButton.addEventListener("click", () => reset(mode));

  autoButton.addEventListener("click", () => {
    if (timer) {
      stopAuto();
      return;
    }

    if (snapshotIndex === snapshots.length - 1) snapshotIndex = 0;
    autoButton.textContent = "Pausar execução";
    autoButton.classList.add("active");
    render();

    timer = window.setInterval(() => {
      if (snapshotIndex >= snapshots.length - 1) {
        stopAuto();
        render();
        return;
      }
      snapshotIndex += 1;
      render();
    }, 1250);
  });

  reset();
})();
