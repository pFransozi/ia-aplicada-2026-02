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

  const dfsSection = document.querySelector("#dfs");
  if (dfsSection) {
    const heading = dfsSection.querySelector(".section-heading");
    const title = heading?.querySelector("h2");
    const intro = heading?.querySelector("p:last-child");

    if (title) title.textContent = "DFS explora por ramos: aprofunda um caminho antes de voltar às alternativas";
    if (intro) {
      intro.innerHTML = "A busca em profundidade segue uma lógica diferente da BFS: ela escolhe uma alternativa e <strong>continua avançando por esse ramo enquanto houver novos estados</strong>. Quando chega a um ponto sem novas opções, retorna às alternativas que ficaram esperando e continua a exploração.";
    }

    const algorithmLayout = dfsSection.querySelector(".algorithm-layout");
    if (algorithmLayout && !dfsSection.querySelector(".dfs-learning-grid")) {
      const pedagogy = document.createElement("div");
      pedagogy.className = "overview-grid dfs-learning-grid";
      pedagogy.style.marginBottom = "1.7rem";
      pedagogy.innerHTML = `
        <article class="card">
          <p class="eyebrow">Intuição</p>
          <h3>Primeiro um ramo inteiro</h3>
          <p>DFS não percorre uma camada completa antes de avançar. Ela segue o <strong>estado descoberto mais recentemente</strong>, aprofundando o caminho até encontrar o objetivo ou chegar a um ponto em que não há mais para onde seguir.</p>
        </article>

        <article class="card">
          <p class="eyebrow">No exemplo do prédio</p>
          <h3>Entrar, aprofundar e depois voltar</h3>
          <p>Com a ordem usada no simulador, a busca começa em <strong>Recepção → Corredor A → Copa → Estoque → Depósito</strong>. Como o Depósito não oferece um novo caminho, a DFS retorna às alternativas que ficaram pendentes, passa por <strong>Arquivo</strong> e depois segue por <strong>Sala 101 → Hall → Laboratório</strong>.</p>
        </article>

        <article class="card">
          <p class="eyebrow">Quando faz sentido usar?</p>
          <h3>Quando qualquer solução pode bastar</h3>
          <p>DFS é útil quando a solução pode estar <strong>mais profunda</strong>, quando não precisamos garantir o caminho com menos passos ou quando queremos manter menos alternativas simultaneamente na memória. Exemplos: percorrer árvores de diretórios, explorar labirintos e resolver problemas por <em>backtracking</em>.</p>
        </article>
      `;
      algorithmLayout.before(pedagogy);
    }

    const algorithmCardText = dfsSection.querySelector(".algorithm-card.dfs > p");
    if (algorithmCardText) {
      algorithmCardText.innerHTML = "A <strong>pilha</strong> é o que mantém o aprofundamento: novos estados ficam no topo e o mais recente é retirado primeiro. Isso favorece seguir um ramo por vez e, em geral, mantém menos alternativas simultaneamente, mas a primeira solução encontrada não é necessariamente a mais curta.";
    }

    const figure = dfsSection.querySelector(".lesson-figure");
    if (figure && !dfsSection.querySelector(".dfs-warning")) {
      const warning = document.createElement("div");
      warning.className = "note-banner warning dfs-warning";
      warning.innerHTML = "<strong>Cuidado:</strong> aprofundar primeiro não significa encontrar o melhor ou o menor caminho. O resultado da DFS pode depender da ordem em que os sucessores são considerados e, em espaços com ciclos ou profundidade ilimitada, o controle de estados visitados ou de limites de exploração é essencial.";
      figure.before(warning);
    }

    if (figure && !dfsSection.querySelector(".frontier-structure-heading")) {
      const frontierHeading = document.createElement("div");
      frontierHeading.className = "section-heading frontier-structure-heading";
      frontierHeading.style.marginTop = "2.4rem";
      frontierHeading.innerHTML = `
        <p class="eyebrow">Estruturas da fronteira</p>
        <h2>Fila e pilha: a estrutura escolhida muda a ordem da exploração</h2>
        <p>BFS e DFS seguem o mesmo ciclo geral de busca, mas retiram estados da fronteira de formas diferentes. A <strong>fila</strong> faz a BFS priorizar os estados descobertos há mais tempo; a <strong>pilha</strong> faz a DFS priorizar os estados descobertos mais recentemente. Essa escolha simples de estrutura de dados produz dois comportamentos de exploração bastante diferentes.</p>
      `;
      figure.before(frontierHeading);

      const caption = figure.querySelector("figcaption");
      if (caption) {
        caption.textContent = "Fila e pilha materializam duas políticas diferentes de exploração: a BFS retira primeiro os estados mais antigos; a DFS, os mais recentes.";
      }
    }
  }

  const comparisonSection = document.querySelector("#comparacao");
  if (comparisonSection) {
    const growthFigure = [...comparisonSection.querySelectorAll(".lesson-figure")]
      .find((figure) => figure.querySelector('img[src$="aula-04-crescimento-busca.svg"]'));

    if (growthFigure && !comparisonSection.querySelector(".search-cost-learning")) {
      const block = document.createElement("div");
      block.className = "search-cost-learning";
      block.innerHTML = `
        <div class="section-heading" style="margin-top:2.5rem">
          <p class="eyebrow">Custo da busca</p>
          <h2>Por que a busca pode ficar cara?</h2>
          <p>Mesmo quando existe uma solução, o algoritmo pode precisar examinar muitas possibilidades antes de encontrá-la. Isso acontece porque <strong>cada estado pode gerar novos sucessores</strong> e esse crescimento se repete a cada novo nível da busca.</p>
        </div>

        <div class="overview-grid" style="margin-bottom:1.7rem">
          <article class="card">
            <p class="eyebrow">Intuição</p>
            <h3>Cada escolha abre novas escolhas</h3>
            <p>Se um estado gera vários sucessores, cada um deles também pode gerar novas alternativas. A busca deixa de crescer de forma linear e passa a formar uma árvore cada vez maior.</p>
          </article>

          <article class="card">
            <p class="eyebrow">Exemplo</p>
            <h3>Ramificação 3 cresce rápido</h3>
            <p>Se cada estado gera, em média, <strong>3 sucessores</strong>, temos 1 estado no nível 0, 3 no nível 1, 9 no nível 2, 27 no nível 3 e <strong>81 apenas no nível 4</strong>.</p>
          </article>

          <article class="card">
            <p class="eyebrow">Por que isso importa?</p>
            <h3>Mais profundidade, mais trabalho</h3>
            <p>Quanto maior o número de sucessores e quanto mais profunda estiver a solução, maior pode ser o esforço necessário: <strong>mais estados expandidos</strong>, uma <strong>fronteira maior</strong> e mais uso de memória.</p>
          </article>
        </div>
      `;
      growthFigure.before(block);

      const caption = growthFigure.querySelector("figcaption");
      if (caption) {
        caption.textContent = "O fator de ramificação indica quantos sucessores, em média, cada estado pode gerar. Quando a profundidade aumenta, o número de possibilidades pode crescer muito rapidamente.";
      }

      const warning = document.createElement("div");
      warning.className = "note-banner warning search-cost-warning";
      warning.innerHTML = "<strong>Ideia-chave:</strong> o custo da busca é fortemente influenciado por <strong>quantos sucessores cada estado gera</strong> e <strong>quão profunda está a solução</strong>. Quando os dois fatores crescem, explorar o espaço de estados pode se tornar computacionalmente caro.";
      growthFigure.after(warning);
    }
  }

  const searchSection = document.querySelector("#busca");
  if (searchSection) {
    const cycleHeading = [...searchSection.querySelectorAll(".section-heading")]
      .find((heading) => heading.querySelector("h2")?.textContent.trim() === "O mesmo conjunto de passos se repete");
    const anatomy = searchSection.querySelector(".search-anatomy");

    if (cycleHeading) {
      const cycleIntro = cycleHeading.querySelector("p:last-child");
      if (cycleIntro) {
        cycleIntro.innerHTML = "Antes de conhecer estratégias específicas, observe a estrutura que qualquer busca precisa repetir: <strong>selecionar uma possibilidade, testá-la, expandi-la e atualizar o que ainda precisa ser explorado</strong>. A regra usada para escolher o próximo estado será discutida depois.";
      }
    }

    if (anatomy && !searchSection.querySelector("[data-generic-search-cycle]")) {
      const interactive = document.createElement("div");
      interactive.className = "generic-search-cycle";
      interactive.dataset.genericSearchCycle = "";
      interactive.innerHTML = `
        <div class="generic-cycle-heading">
          <div>
            <p class="eyebrow">Processo interativo</p>
            <h3>Acompanhe um ciclo de busca passo a passo</h3>
            <p>O grafo abaixo é propositalmente mais complexo que o exemplo do robô. Aqui não importa ainda qual estratégia escolhe o próximo estado: a ordem foi fixada apenas para observar <strong>o ciclo comum da busca</strong>.</p>
          </div>
          <div class="generic-cycle-legend" aria-label="Legenda do grafo">
            <span><i class="legend-dot frontier"></i>Fronteira</span>
            <span><i class="legend-dot current"></i>Atual</span>
            <span><i class="legend-dot successor"></i>Sucessor</span>
            <span><i class="legend-dot visited"></i>Visitado</span>
            <span><i class="legend-dot goal"></i>Objetivo</span>
          </div>
        </div>

        <div class="generic-cycle-stages" aria-label="Etapas do ciclo de busca">
          <div data-cycle-stage="0"><small>01</small><strong>Preparar</strong></div>
          <div data-cycle-stage="1"><small>02</small><strong>Escolher</strong></div>
          <div data-cycle-stage="2"><small>03</small><strong>Testar</strong></div>
          <div data-cycle-stage="3"><small>04</small><strong>Expandir</strong></div>
          <div data-cycle-stage="4"><small>05</small><strong>Registrar</strong></div>
        </div>

        <div class="generic-cycle-layout">
          <div class="generic-cycle-graph-card">
            <div class="generic-cycle-graph" aria-label="Grafo genérico com doze estados, ciclos e múltiplos caminhos até o objetivo K">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <line data-cycle-edge="A-B" x1="50" y1="9" x2="22" y2="25"></line>
                <line data-cycle-edge="A-C" x1="50" y1="9" x2="50" y2="28"></line>
                <line data-cycle-edge="A-D" x1="50" y1="9" x2="78" y2="25"></line>
                <line data-cycle-edge="B-E" x1="22" y1="25" x2="12" y2="48"></line>
                <line data-cycle-edge="B-F" x1="22" y1="25" x2="34" y2="49"></line>
                <line data-cycle-edge="C-F" x1="50" y1="28" x2="34" y2="49"></line>
                <line data-cycle-edge="C-G" x1="50" y1="28" x2="58" y2="50"></line>
                <line data-cycle-edge="D-G" x1="78" y1="25" x2="58" y2="50"></line>
                <line data-cycle-edge="D-H" x1="78" y1="25" x2="86" y2="49"></line>
                <line data-cycle-edge="E-I" x1="12" y1="48" x2="20" y2="74"></line>
                <line data-cycle-edge="F-I" x1="34" y1="49" x2="20" y2="74"></line>
                <line data-cycle-edge="F-J" x1="34" y1="49" x2="47" y2="75"></line>
                <line data-cycle-edge="G-J" x1="58" y1="50" x2="47" y2="75"></line>
                <line data-cycle-edge="G-H" x1="58" y1="50" x2="86" y2="49"></line>
                <line data-cycle-edge="H-K" x1="86" y1="49" x2="78" y2="76"></line>
                <line data-cycle-edge="I-L" x1="20" y1="74" x2="36" y2="92"></line>
                <line data-cycle-edge="J-L" x1="47" y1="75" x2="36" y2="92"></line>
                <line data-cycle-edge="K-L" x1="78" y1="76" x2="61" y2="92"></line>
                <line data-cycle-edge="J-K" x1="47" y1="75" x2="78" y2="76"></line>
              </svg>
              <div class="generic-cycle-node start" data-cycle-node="A" style="left:50%;top:9%">A<span>início</span></div>
              <div class="generic-cycle-node" data-cycle-node="B" style="left:22%;top:25%">B</div>
              <div class="generic-cycle-node" data-cycle-node="C" style="left:50%;top:28%">C</div>
              <div class="generic-cycle-node" data-cycle-node="D" style="left:78%;top:25%">D</div>
              <div class="generic-cycle-node" data-cycle-node="E" style="left:12%;top:48%">E</div>
              <div class="generic-cycle-node" data-cycle-node="F" style="left:34%;top:49%">F</div>
              <div class="generic-cycle-node" data-cycle-node="G" style="left:58%;top:50%">G</div>
              <div class="generic-cycle-node" data-cycle-node="H" style="left:86%;top:49%">H</div>
              <div class="generic-cycle-node" data-cycle-node="I" style="left:20%;top:74%">I</div>
              <div class="generic-cycle-node" data-cycle-node="J" style="left:47%;top:75%">J</div>
              <div class="generic-cycle-node goal" data-cycle-node="K" style="left:78%;top:76%">K<span>objetivo</span></div>
              <div class="generic-cycle-node" data-cycle-node="L" style="left:42%;top:92%">L</div>
            </div>
          </div>

          <div class="generic-cycle-panel">
            <div class="generic-cycle-current-step">
              <small>Etapa atual</small>
              <strong data-cycle-title>Preparar a busca</strong>
              <p data-cycle-explanation>Começamos colocando o estado inicial na fronteira. A busca ainda não examinou nenhum estado.</p>
            </div>

            <div class="generic-cycle-data">
              <div><small>Estado atual</small><strong data-cycle-current>—</strong></div>
              <div><small>Fronteira</small><strong data-cycle-frontier>—</strong></div>
              <div><small>Visitados</small><strong data-cycle-visited>—</strong></div>
              <div><small>Sucessores gerados</small><strong data-cycle-successors>—</strong></div>
            </div>

            <div class="generic-cycle-actions">
              <button type="button" data-cycle-next>Próxima etapa</button>
              <button type="button" data-cycle-complete>Executar um ciclo</button>
              <button type="button" data-cycle-reset>Reiniciar</button>
            </div>

            <div class="generic-cycle-note" data-cycle-note>
              <strong>Observe:</strong> a fronteira guarda possibilidades descobertas que ainda não foram examinadas.
            </div>
          </div>
        </div>
      `;
      anatomy.after(interactive);

      const genericGraph = {
        A: ["B", "C", "D"],
        B: ["A", "E", "F"],
        C: ["A", "F", "G"],
        D: ["A", "G", "H"],
        E: ["B", "I"],
        F: ["B", "C", "I", "J"],
        G: ["C", "D", "J", "H"],
        H: ["D", "G", "K"],
        I: ["E", "F", "L"],
        J: ["F", "G", "K", "L"],
        K: ["H", "J", "L"],
        L: ["I", "J", "K"]
      };
      const preferredOrder = ["A", "C", "D", "G", "H", "K", "B", "F", "J", "E", "I", "L"];
      const goal = "K";
      const nodeEls = [...interactive.querySelectorAll("[data-cycle-node]")];
      const edgeEls = [...interactive.querySelectorAll("[data-cycle-edge]")];
      const stageEls = [...interactive.querySelectorAll("[data-cycle-stage]")];
      const titleEl = interactive.querySelector("[data-cycle-title]");
      const explanationEl = interactive.querySelector("[data-cycle-explanation]");
      const currentEl = interactive.querySelector("[data-cycle-current]");
      const frontierEl = interactive.querySelector("[data-cycle-frontier]");
      const visitedEl = interactive.querySelector("[data-cycle-visited]");
      const successorsEl = interactive.querySelector("[data-cycle-successors]");
      const noteEl = interactive.querySelector("[data-cycle-note]");
      const nextButton = interactive.querySelector("[data-cycle-next]");
      const completeButton = interactive.querySelector("[data-cycle-complete]");
      const resetButton = interactive.querySelector("[data-cycle-reset]");

      let phase = 0;
      let frontier = [];
      let visited = [];
      let current = null;
      let generated = [];
      let parents = {};
      let found = false;
      let discovered = new Set();

      const displayList = (items) => items.length ? `[ ${items.join(", ")} ]` : "—";
      const edgeKey = (a, b) => [a, b].sort().join("-");

      function chooseNext() {
        return preferredOrder.find(item => frontier.includes(item)) || frontier[0] || null;
      }

      function pathTo(node) {
        if (!node) return [];
        const path = [node];
        let cursor = node;
        while (parents[cursor]) {
          cursor = parents[cursor];
          path.unshift(cursor);
        }
        return path;
      }

      function renderCycle() {
        stageEls.forEach(item => item.classList.toggle("active", Number(item.dataset.cycleStage) === phase));
        currentEl.textContent = current || "—";
        frontierEl.textContent = displayList(frontier);
        visitedEl.textContent = displayList(visited);
        successorsEl.textContent = displayList(generated);

        const path = found ? pathTo(goal) : [];
        nodeEls.forEach(node => {
          const id = node.dataset.cycleNode;
          node.classList.toggle("frontier", frontier.includes(id));
          node.classList.toggle("visited", visited.includes(id));
          node.classList.toggle("current", current === id && !found);
          node.classList.toggle("successor", generated.includes(id));
          node.classList.toggle("found", found && path.includes(id));
        });

        edgeEls.forEach(edge => {
          const key = edge.dataset.cycleEdge.split("-").sort().join("-");
          const activeExpansion = current && generated.some(item => edgeKey(current, item) === key);
          const activePath = found && path.slice(1).some((item, index) => edgeKey(path[index], item) === key);
          edge.classList.toggle("active", Boolean(activeExpansion && !found));
          edge.classList.toggle("found", Boolean(activePath));
        });

        nextButton.disabled = found;
        completeButton.disabled = found;
      }

      function resetCycle() {
        phase = 0;
        frontier = [];
        visited = [];
        current = null;
        generated = [];
        parents = {};
        found = false;
        discovered = new Set();
        titleEl.textContent = "Preparar a busca";
        explanationEl.textContent = "Começamos colocando o estado inicial na fronteira. A busca ainda não examinou nenhum estado.";
        noteEl.innerHTML = "<strong>Observe:</strong> a fronteira guarda possibilidades descobertas que ainda não foram examinadas.";
        renderCycle();
      }

      function advanceCycle() {
        if (found) return;

        if (phase === 0) {
          frontier = ["A"];
          discovered.add("A");
          generated = [];
          current = null;
          titleEl.textContent = "Preparar a busca";
          explanationEl.textContent = "O estado inicial A entra na fronteira. Agora existe uma possibilidade pronta para ser examinada.";
          noteEl.innerHTML = "<strong>Fronteira:</strong> contém estados descobertos, mas ainda pendentes de exploração.";
          phase = 1;
          renderCycle();
          return;
        }

        if (phase === 1) {
          current = chooseNext();
          frontier = frontier.filter(item => item !== current);
          generated = [];
          titleEl.textContent = `Escolher um estado: ${current}`;
          explanationEl.textContent = `Uma regra de escolha, ainda não discutida nesta parte da aula, seleciona ${current} entre as alternativas da fronteira.`;
          noteEl.innerHTML = `<strong>Importante:</strong> por enquanto, interessa observar o ciclo. Mais adiante veremos diferentes regras para escolher o próximo estado.`;
          phase = 2;
          renderCycle();
          return;
        }

        if (phase === 2) {
          titleEl.textContent = `Testar o objetivo: ${current}`;
          if (current === goal) {
            found = true;
            const path = pathTo(goal);
            explanationEl.textContent = `${current} satisfaz a condição de objetivo. A busca pode parar e reconstruir o caminho encontrado.`;
            noteEl.innerHTML = `<strong>Objetivo encontrado:</strong> ${path.join(" → ")}. Observe que o teste acontece antes de expandir novamente o estado.`;
            renderCycle();
            return;
          }
          explanationEl.textContent = `${current} ainda não é o objetivo. Como a busca precisa continuar, o próximo passo será descobrir quais estados podem ser alcançados a partir dele.`;
          noteEl.innerHTML = "<strong>Teste de objetivo:</strong> evita expandir estados desnecessariamente quando a solução já foi alcançada.";
          phase = 3;
          renderCycle();
          return;
        }

        if (phase === 3) {
          generated = genericGraph[current].filter(item => !visited.includes(item) && item !== current);
          titleEl.textContent = `Expandir o estado ${current}`;
          explanationEl.textContent = generated.length
            ? `Aplicamos as ações possíveis em ${current} e obtemos os sucessores ${generated.join(", ")}. Alguns podem já ter sido descobertos anteriormente.`
            : `${current} não produz nenhum sucessor útil neste momento.`;
          noteEl.innerHTML = "<strong>Expandir:</strong> significa aplicar as ações permitidas ao estado atual para gerar novas possibilidades.";
          phase = 4;
          renderCycle();
          return;
        }

        if (phase === 4) {
          if (!visited.includes(current)) visited.push(current);
          const additions = [];
          generated.forEach(item => {
            if (!discovered.has(item) && !visited.includes(item)) {
              discovered.add(item);
              frontier.push(item);
              parents[item] = current;
              additions.push(item);
            }
          });
          const repeated = generated.filter(item => !additions.includes(item));
          titleEl.textContent = "Registrar e continuar";
          explanationEl.textContent = additions.length
            ? `${current} é registrado como visitado. ${additions.join(", ")} ${additions.length === 1 ? "entra" : "entram"} na fronteira para ciclos futuros.`
            : `${current} é registrado como visitado, mas nenhum novo estado precisa ser acrescentado à fronteira.`;
          noteEl.innerHTML = repeated.length
            ? `<strong>Controle de repetição:</strong> ${repeated.join(", ")} ${repeated.length === 1 ? "já estava" : "já estavam"} conhecido(s), por isso não entra(m) novamente na fronteira.`
            : "<strong>O ciclo recomeça:</strong> agora a busca volta a escolher uma das alternativas que ficaram pendentes na fronteira.";
          phase = 1;
          renderCycle();
        }
      }

      nextButton.addEventListener("click", advanceCycle);
      completeButton.addEventListener("click", () => {
        if (found) return;
        let guard = 0;
        if (phase === 0) advanceCycle();
        do {
          advanceCycle();
          guard += 1;
        } while (!found && phase !== 1 && guard < 8);
      });
      resetButton.addEventListener("click", resetCycle);
      resetCycle();
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