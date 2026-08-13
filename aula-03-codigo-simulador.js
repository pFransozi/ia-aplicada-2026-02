/* Aula 03 — ponte entre representação conceitual, Python e transições. */
(() => {
  const section = document.querySelector('#codigo');
  if (!section || section.dataset.visualCodeEnhanced === 'true') return;
  section.dataset.visualCodeEnhanced = 'true';

  const heading = section.querySelector('.section-heading');
  const layouts = section.querySelectorAll('.code-layout');
  const simulator = section.querySelector('.simulator');

  if (heading) {
    const title = heading.querySelector('h2');
    const lead = heading.querySelector('p:last-child');
    if (title) title.textContent = 'Da representação conceitual para Python';
    if (lead) {
      lead.innerHTML = 'Agora vamos traduzir o modelo para estruturas que um programa consegue manipular. Acompanhe a passagem de <strong>conceito</strong> para <strong>estrutura de dados</strong> e, depois, para <strong>comportamento</strong> — ainda sem aplicar um algoritmo de busca.';
    }
  }

  if (layouts[0]) {
    layouts[0].insertAdjacentHTML('beforebegin', `
      <div class="concept-to-code-flow" aria-label="Passagem do problema para o código">
        <article><small>01 · Domínio</small><strong>Situação real</strong><span>O robô ocupa um local e precisa alcançar outro.</span></article>
        <b aria-hidden="true">→</b>
        <article><small>02 · Modelo</small><strong>Estados e transições</strong><span>Lugares e movimentos permitidos formam a representação.</span></article>
        <b aria-hidden="true">→</b>
        <article><small>03 · Python</small><strong>Dados e funções</strong><span>Variáveis, dicionário e funções materializam o modelo.</span></article>
        <b aria-hidden="true">→</b>
        <article><small>04 · Execução</small><strong>Estado → ação → estado</strong><span>O programa passa a manipular a representação.</span></article>
      </div>

      <div class="concept-code-map" aria-label="Correspondência entre conceitos e Python">
        <div><strong>Estado inicial</strong><span>Recepção</span><code>estado_inicial = "recepcao"</code></div>
        <div><strong>Objetivo</strong><span>Laboratório</span><code>objetivo = "laboratorio"</code></div>
        <div><strong>Ações possíveis</strong><span>Ir a um local conectado</span><code>mapa[estado]</code></div>
        <div><strong>Transição</strong><span>Mudar para um vizinho</span><code>transicao(estado, destino)</code></div>
        <div><strong>Teste de objetivo</strong><span>Chegou ao Laboratório?</span><code>objetivo_atingido(estado)</code></div>
      </div>
    `);

    const head = layouts[0].querySelector('.code-head span:last-child');
    const code = layouts[0].querySelector('code');
    const note = layouts[0].querySelector('.code-note');
    if (head) head.textContent = '01 · estado e objetivo';
    if (code) code.textContent = 'estado_inicial = "recepcao"\nobjetivo = "laboratorio"\nestado_atual = estado_inicial';
    if (note) note.innerHTML = '<h3>Elementos do domínio viraram símbolos</h3><p>As strings são identificadores usados para representar estados. <code>estado_atual</code> começa no estado inicial e poderá mudar durante a execução.</p>';
  }

  if (layouts[1]) {
    const head = layouts[1].querySelector('.code-head span:last-child');
    const code = layouts[1].querySelector('code');
    const note = layouts[1].querySelector('.code-note');
    if (head) head.textContent = '02 · conexões e ações possíveis';
    if (code) code.textContent = 'mapa = {\n    "recepcao": ["corredor"],\n    "corredor": [\n        "recepcao", "sala_101",\n        "copa", "laboratorio"\n    ],\n    "sala_101": ["corredor"],\n    "copa": ["corredor"],\n    "laboratorio": ["corredor"]\n}\n\ndef acoes_possiveis(estado):\n    return mapa.get(estado, [])';
    if (note) note.innerHTML = '<h3>O dicionário define as possibilidades</h3><ul><li>cada chave representa um estado;</li><li>a lista associada indica os estados alcançáveis;</li><li><code>acoes_possiveis(estado)</code> responde “o que posso fazer daqui?”.</li></ul>';
  }

  if (layouts[2]) {
    const head = layouts[2].querySelector('.code-head span:last-child');
    const code = layouts[2].querySelector('code');
    const note = layouts[2].querySelector('.code-note');
    if (head) head.textContent = '03 · transição e teste de objetivo';
    if (code) code.textContent = 'def transicao(estado, destino):\n    if destino not in acoes_possiveis(estado):\n        raise ValueError("Transição inválida")\n    return destino\n\n\ndef objetivo_atingido(estado):\n    return estado == objetivo';
    if (note) note.innerHTML = '<h3>O modelo também possui regras</h3><p>A transição impede movimentos inexistentes no modelo. O teste de objetivo transforma “chegar ao Laboratório” em uma condição computável.</p>';
  }

  if (simulator) {
    simulator.insertAdjacentHTML('beforebegin', `
      <div class="code-layout execution-example">
        <div class="code-card">
          <div class="code-head"><span>Python</span><span>04 · uma transição em execução</span></div>
          <pre><code>print(estado_atual)
# recepcao

print(acoes_possiveis(estado_atual))
# ['corredor']

estado_atual = transicao(
    estado_atual, "corredor"
)

print(estado_atual)
# corredor

print(objetivo_atingido(estado_atual))
# False</code></pre>
        </div>
        <article class="code-note"><h3>Estado atual → ação → novo estado</h3><p>Ainda não existe um algoritmo escolhendo o caminho. Já conseguimos consultar ações, executar uma transição válida e testar o objetivo.</p></article>
      </div>

      <div class="code-capability-grid">
        <article><small>O código já sabe</small><strong>Representar e validar o problema</strong><span>Estado inicial, ações possíveis, transições e teste de objetivo.</span></article>
        <article><small>Ainda falta</small><strong>Escolher como explorar as possibilidades</strong><span>Um algoritmo de busca deverá decidir a ordem em que os estados serão visitados.</span></article>
      </div>
    `);

    simulator.classList.add('visual-transition-simulator');
    simulator.innerHTML = `
      <div class="visual-sim-head">
        <div><p class="eyebrow">Experimente a representação</p><h3>Simulador visual de transições</h3><p>Use os botões ou clique diretamente nos estados do mapa. Observe quais ações são válidas, como o estado muda e como a mesma operação aparece no código.</p></div>
        <span id="visual-sim-goal" class="visual-sim-goal">Objetivo: Laboratório</span>
      </div>

      <div class="visual-sim-grid">
        <section class="visual-sim-map" aria-label="Mapa dos estados do problema">
          <div class="visual-map-grid">
            <button type="button" data-visual-state="recepcao" class="visual-state" style="grid-column:1;grid-row:1"><small>estado inicial</small><strong>Recepção</strong></button>
            <span class="visual-edge" style="grid-column:2;grid-row:1" aria-hidden="true"></span>
            <button type="button" data-visual-state="corredor" class="visual-state" style="grid-column:3;grid-row:1"><small>estado</small><strong>Corredor</strong></button>
            <span class="visual-edge" style="grid-column:4;grid-row:1" aria-hidden="true"></span>
            <button type="button" data-visual-state="laboratorio" class="visual-state" style="grid-column:5;grid-row:1"><small>objetivo</small><strong>Laboratório</strong></button>
            <span class="visual-branches" aria-hidden="true">↙ &nbsp;&nbsp;&nbsp; ↘</span>
            <button type="button" data-visual-state="sala_101" class="visual-state" style="grid-column:2;grid-row:3"><small>estado</small><strong>Sala 101</strong></button>
            <button type="button" data-visual-state="copa" class="visual-state" style="grid-column:4;grid-row:3"><small>estado</small><strong>Copa</strong></button>
          </div>
          <p class="visual-map-help"><strong>Azul:</strong> estado atual. <strong>Contorno:</strong> ação possível. <strong>Verde:</strong> objetivo. Clique em um estado não conectado para observar uma tentativa inválida.</p>
        </section>

        <aside class="visual-sim-panel">
          <div class="visual-status">
            <div><small>Estado atual</small><strong id="visual-sim-current">Recepção</strong></div>
            <div><small>Passos válidos</small><strong id="visual-sim-steps">0</strong></div>
          </div>
          <small class="visual-action-label">Ações possíveis agora</small>
          <div id="visual-sim-actions" class="visual-actions"></div>
          <p id="visual-sim-message" class="visual-message" aria-live="polite">Estado inicial carregado. Escolha uma ação válida.</p>
          <button type="button" id="visual-sim-reset" class="visual-reset">↺ Reiniciar</button>
        </aside>

        <div class="visual-sim-inspector">
          <article>
            <h4>Raio-X da última tentativa</h4>
            <div class="visual-transition"><span id="visual-before">Recepção</span><b>→</b><span id="visual-action">—</span><b>→</b><span id="visual-after">Recepção</span></div>
            <p id="visual-explanation">Nenhuma transição foi executada ainda.</p>
          </article>
          <article><h4>Histórico do caminho</h4><ol id="visual-history"><li>Recepção — estado inicial</li></ol></article>
          <div class="visual-code-readout"><small>A mesma situação vista como Python</small><pre><code id="visual-code"></code></pre></div>
        </div>
      </div>
    `;

    const graph = {
      recepcao: ['corredor'],
      corredor: ['recepcao', 'sala_101', 'copa', 'laboratorio'],
      sala_101: ['corredor'],
      copa: ['corredor'],
      laboratorio: ['corredor']
    };
    const labels = {
      recepcao: 'Recepção',
      corredor: 'Corredor',
      sala_101: 'Sala 101',
      copa: 'Copa',
      laboratorio: 'Laboratório'
    };

    let current = 'recepcao';
    let steps = 0;
    let visited = new Set(['recepcao']);
    let history = [];
    let lastAttempt = null;
    let message = 'Estado inicial carregado. Escolha uma ação válida.';
    let messageKind = '';

    const get = (id) => document.getElementById(id);
    const states = [...simulator.querySelectorAll('[data-visual-state]')];
    const pythonList = (items) => `[${items.map((item) => `"${item}"`).join(', ')}]`;

    const render = () => {
      get('visual-sim-current').textContent = labels[current];
      get('visual-sim-steps').textContent = String(steps);
      const available = new Set(graph[current]);

      states.forEach((node) => {
        const state = node.dataset.visualState;
        node.classList.toggle('is-current', state === current);
        node.classList.toggle('is-goal', state === 'laboratorio');
        node.classList.toggle('is-available', available.has(state));
        node.classList.toggle('is-visited', visited.has(state));
        node.setAttribute('aria-pressed', String(state === current));
      });

      const actions = get('visual-sim-actions');
      actions.innerHTML = '';
      graph[current].forEach((destination) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = `Ir para ${labels[destination]}`;
        button.addEventListener('click', () => attempt(destination));
        actions.appendChild(button);
      });

      const messageElement = get('visual-sim-message');
      messageElement.textContent = message;
      messageElement.className = `visual-message ${messageKind}`;

      if (lastAttempt) {
        get('visual-before').textContent = labels[lastAttempt.from];
        get('visual-action').textContent = `ir para ${labels[lastAttempt.to]}`;
        get('visual-after').textContent = labels[lastAttempt.after];
        get('visual-explanation').textContent = lastAttempt.valid
          ? `${labels[lastAttempt.to]} pertence a mapa["${lastAttempt.from}"]. A ação é aplicável e produz um novo estado.`
          : `${labels[lastAttempt.to]} não pertence a mapa["${lastAttempt.from}"]. A ação não é aplicável e o estado permanece ${labels[lastAttempt.from]}.`;
      }

      const historyList = get('visual-history');
      historyList.innerHTML = '<li>Recepção — estado inicial</li>';
      history.forEach((entry, index) => {
        const item = document.createElement('li');
        item.textContent = `${index + 1}. ${labels[entry.from]} → ${labels[entry.to]}`;
        historyList.appendChild(item);
      });

      get('visual-code').textContent =
        `estado_atual = "${current}"\n` +
        `acoes_possiveis(estado_atual)\n# ${pythonList(graph[current])}\n\n` +
        `objetivo_atingido(estado_atual)\n# ${current === 'laboratorio' ? 'True' : 'False'}`;
      get('visual-sim-goal').textContent = current === 'laboratorio' ? '✓ Objetivo atingido' : 'Objetivo: Laboratório';
    };

    const attempt = (destination) => {
      if (destination === current) {
        lastAttempt = { from: current, to: destination, valid: false, after: current };
        message = `Você já está em ${labels[current]}. Nenhuma transição ocorreu.`;
        messageKind = 'is-invalid';
        render();
        return;
      }

      const from = current;
      const valid = graph[from].includes(destination);
      lastAttempt = { from, to: destination, valid, after: valid ? destination : from };

      if (!valid) {
        message = `Transição inválida: ${labels[destination]} não é alcançável diretamente a partir de ${labels[from]}.`;
        messageKind = 'is-invalid';
        render();
        return;
      }

      current = destination;
      steps += 1;
      visited.add(destination);
      history.push({ from, to: destination });
      messageKind = current === 'laboratorio' ? 'is-success' : '';
      message = current === 'laboratorio'
        ? `Transição válida: ${labels[from]} → ${labels[destination]}. Objetivo atingido.`
        : `Transição válida: ${labels[from]} → ${labels[destination]}. Observe as novas ações disponíveis.`;
      render();
    };

    states.forEach((node) => node.addEventListener('click', () => attempt(node.dataset.visualState)));
    get('visual-sim-reset').addEventListener('click', () => {
      current = 'recepcao';
      steps = 0;
      visited = new Set(['recepcao']);
      history = [];
      lastAttempt = null;
      message = 'Estado reiniciado. Escolha uma ação válida.';
      messageKind = '';
      get('visual-before').textContent = 'Recepção';
      get('visual-action').textContent = '—';
      get('visual-after').textContent = 'Recepção';
      get('visual-explanation').textContent = 'Nenhuma transição foi executada ainda.';
      render();
    });
    render();
  }

  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = 'aula-03-codigo-simulador.css';
  document.head.appendChild(stylesheet);
})();
