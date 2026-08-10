/* Ajustes específicos da Aula 03. */
(() => {
  const warmupIntro = document.querySelector('#aquecimento .warmup > div:first-child');

  if (warmupIntro && !warmupIntro.querySelector('.warmup-map-figure')) {
    const mapFigure = document.createElement('figure');
    mapFigure.className = 'warmup-map-figure';
    mapFigure.innerHTML = `
      <img src="assets/aula-03-mapa.svg" alt="Mapa simplificado com Recepção, Corredor, Laboratório, Sala 101 e Copa. A Recepção é o ponto inicial e o Laboratório é o destino.">
    `;
    warmupIntro.appendChild(mapFigure);
  }

  const scenario = document.querySelector('.scenario');

  if (scenario) {
    scenario.classList.add('scenario-reworked');
    scenario.innerHTML = `
      <div class="scenario-intro">
        <p class="eyebrow">Primeira análise</p>
        <h2>O problema parece simples. A representação ainda não existe.</h2>
        <p class="scenario-lead">
          Dizer “leve o robô ao laboratório” descreve uma intenção humana. Para programar uma solução,
          precisamos decidir quais elementos dessa situação serão transformados em estruturas manipuláveis pelo computador.
        </p>
        <div class="scenario-question">
          <strong>Antes de buscar uma solução, precisamos construir o problema que o algoritmo vai enxergar.</strong>
          <span>Isso significa definir estados, ações, restrições e um objetivo verificável. Só depois faz sentido escolher como explorar as possibilidades.</span>
        </div>
      </div>

      <div class="scenario-summary-grid">
        <article class="scenario-summary-card">
          <small>01 · Situação</small>
          <h3>Qual é a tarefa?</h3>
          <p>Um robô precisa sair da <strong>Recepção</strong> e chegar ao <strong>Laboratório</strong>.</p>
        </article>

        <article class="scenario-summary-card">
          <small>02 · O que já sabemos</small>
          <h3>Elementos do cenário</h3>
          <p>Existem <strong>Recepção</strong>, <strong>Corredor</strong>, <strong>Laboratório</strong>, <strong>Sala 101</strong> e <strong>Copa</strong>, ligados por passagens possíveis.</p>
        </article>

        <article class="scenario-summary-card scenario-summary-card-accent">
          <small>03 · O que ainda falta</small>
          <h3>Descrição não é representação</h3>
          <p>Ainda precisamos definir <strong>estado</strong>, <strong>ações</strong>, <strong>restrições</strong>, <strong>objetivo</strong> e <strong>critério de sucesso</strong>.</p>
        </article>
      </div>
    `;
  }

  const abstraction = document.querySelector('#abstracao');

  if (abstraction) {
    const heading = abstraction.querySelector('.section-heading');
    const worldGrid = abstraction.querySelector('.world-grid');
    const flowCards = abstraction.querySelectorAll('.flow-card');
    const inquiry = abstraction.querySelector('.inquiry');

    if (heading) {
      const title = heading.querySelector('h2');
      const description = heading.querySelector('p:last-child');
      if (title) title.textContent = 'O modelo representa apenas o que importa para o problema';
      if (description) {
        description.innerHTML = 'Uma representação computacional não tenta reproduzir todos os detalhes do mundo real. Ela seleciona aquilo que é relevante para resolver <strong>um problema específico</strong>. Abstrair é decidir deliberadamente o que representar e o que deixar de fora.';
      }
    }

    if (worldGrid) {
      worldGrid.classList.add('world-grid-reworked');
      worldGrid.innerHTML = `
        <article class="world-card real">
          <p class="eyebrow">Cenário observado</p>
          <h3>O mundo oferece muitos detalhes</h3>
          <p>O prédio pode ser descrito de inúmeras maneiras. Nem todas essas informações alteram a solução que estamos tentando construir.</p>
          <div class="tag-cloud">
            <span>cor das paredes</span>
            <span>temperatura</span>
            <span>pessoas</span>
            <span>móveis</span>
            <span>iluminação</span>
            <span>marca do robô</span>
            <span class="keep">posição do robô</span>
            <span class="keep">locais conectados</span>
            <span class="keep">destino</span>
            <span class="keep">passagens bloqueadas</span>
          </div>
          <div class="abstraction-rule">
            <strong>A pergunta não é “o que existe no mundo?”</strong>
            <span>É “o que precisa ser representado para resolver este problema?”.</span>
          </div>
        </article>

        <article class="world-card model abstraction-model-card">
          <p class="eyebrow">Representação para este problema</p>
          <h3>Do elemento real ao conceito computacional</h3>
          <div class="abstraction-map">
            <div><span>Posição do robô</span><b>→</b><strong>Estado</strong></div>
            <div><span>Locais conectados</span><b>→</b><strong>Ações e transições</strong></div>
            <div><span>Laboratório</span><b>→</b><strong>Objetivo</strong></div>
            <div><span>Passagens bloqueadas</span><b>→</b><strong>Restrições</strong></div>
          </div>
          <div class="abstraction-excluded">
            <small>Ficam de fora, nesta versão</small>
            <p>Cor das paredes, marca do robô e iluminação, porque não alteram as ações disponíveis nem o critério de sucesso.</p>
          </div>
        </article>
      `;
    }

    if (flowCards.length >= 3) {
      const last = flowCards[2].querySelector('p');
      if (last) last.textContent = 'Transformamos os elementos relevantes em estados, ações, transições, objetivos e restrições.';
    }

    if (inquiry) {
      inquiry.classList.add('abstraction-challenge');
      inquiry.innerHTML = `
        <div class="inquiry-head">
          <div>
            <span class="inquiry-kicker">Teste a abstração</span>
            <h3>O problema mudou. O modelo também precisa mudar?</h3>
          </div>
          <span class="inquiry-tag">Transfira o conceito</span>
        </div>

        <div class="inquiry-body abstraction-challenge-body">
          <div>
            <div class="challenge-change">
              <small>Nova condição</small>
              <p>O robô precisa chegar ao <strong>Laboratório</strong>, mas não pode passar por ambientes com <strong>temperatura superior a 30 °C</strong>.</p>
            </div>
            <p class="challenge-context">Na primeira versão do problema, a temperatura podia ser ignorada. Agora, ela pode alterar quais caminhos são válidos.</p>
            <ol class="prompt-list">
              <li>A temperatura continua sendo irrelevante para o modelo?</li>
              <li>Onde ela deveria aparecer na representação: estado, ação, restrição ou outro elemento?</li>
              <li>Que partes da representação anterior continuam válidas sem alteração?</li>
              <li>Que informações do prédio ainda podem continuar de fora?</li>
            </ol>
          </div>

          <div class="worksheet">
            <label for="abstracao-registro">Reformule a abstração</label>
            <textarea id="abstracao-registro" data-save="abstracao" placeholder="Agora a temperatura precisa entrar porque... Eu a representaria como... Do modelo anterior, manteria... Ainda deixaria de fora..."></textarea>
            <span class="save-note">O texto fica salvo somente neste navegador.</span>
          </div>
        </div>

        <div class="abstraction-takeaway">
          <strong>Ideia central</strong>
          <span>Uma característica não é relevante ou irrelevante por si só. Sua relevância depende do objetivo, das ações possíveis e das restrições do problema.</span>
        </div>
      `;

      const abstractionField = inquiry.querySelector('[data-save="abstracao"]');
      if (abstractionField) {
        const key = 'aula03:abstracao';
        abstractionField.value = localStorage.getItem(key) || '';
        abstractionField.addEventListener('input', () => localStorage.setItem(key, abstractionField.value));
      }
    }
  }

  const style = document.createElement('style');
  style.id = 'aula03-adjustments';
  style.textContent = `
    #aquecimento .warmup {
      grid-template-columns: minmax(0, .96fr) minmax(0, 1.04fr);
      gap: 30px;
      align-items: stretch;
    }

    #aquecimento .warmup > div:first-child {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    #aquecimento .warmup > div:first-child > p:not(.eyebrow) {
      max-width: 620px;
      margin-bottom: 0;
    }

    .warmup-map-figure {
      margin: 1.35rem 0 0;
      padding: .7rem;
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 20px;
      background: rgba(255,255,255,.045);
    }

    .warmup-map-figure img {
      display: block;
      width: 100%;
      height: auto;
      max-height: 300px;
      object-fit: contain;
      border-radius: 15px;
    }

    #aquecimento .question-cloud {
      align-content: stretch;
    }

    #aquecimento .question-cloud > div {
      display: flex;
      align-items: center;
      min-height: 0;
    }

    .scenario.scenario-reworked {
      display: block;
      padding: 0;
      border: 0;
      border-radius: 0;
      background: transparent;
      box-shadow: none;
    }

    .scenario-reworked .scenario-intro {
      max-width: 980px;
      margin: 0 auto;
      text-align: center;
    }

    .scenario-reworked .scenario-intro .eyebrow {
      justify-content: center;
    }

    .scenario-reworked .scenario-intro h2 {
      max-width: 860px;
      margin: 0 auto 1.15rem;
      font-size: clamp(2.35rem, 4.6vw, 4.4rem);
    }

    .scenario-reworked .scenario-lead {
      max-width: 850px;
      margin: 0 auto;
      font-size: 1.08rem;
    }

    .scenario-reworked .scenario-question {
      display: grid;
      gap: .3rem;
      max-width: 850px;
      margin: 1.45rem auto 0;
      padding: 1rem 1.15rem;
      border: 1px solid var(--line);
      border-radius: 16px;
      background: var(--paper);
      text-align: left;
      color: var(--muted);
    }

    .scenario-reworked .scenario-question strong {
      color: var(--ink);
    }

    .scenario-summary-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
      margin-top: 2.1rem;
    }

    .scenario-summary-card {
      min-height: 190px;
      padding: 1.35rem;
      border: 1px solid var(--line);
      border-radius: 19px;
      background: var(--paper);
      box-shadow: 0 12px 30px rgba(35,50,78,.05);
    }

    .scenario-summary-card small {
      display: block;
      margin-bottom: .85rem;
      color: var(--blue);
      font-size: .72rem;
      font-weight: 850;
      letter-spacing: .09em;
      text-transform: uppercase;
    }

    .scenario-summary-card h3 {
      margin-bottom: .55rem;
      font-size: 1.14rem;
    }

    .scenario-summary-card p {
      margin-bottom: 0;
      font-size: .94rem;
    }

    .scenario-summary-card-accent {
      border-color: #cbd6ff;
      background: linear-gradient(145deg, var(--blue-soft), var(--paper));
    }

    #abstracao .world-grid-reworked {
      grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr);
      align-items: stretch;
    }

    #abstracao .world-grid-reworked .world-card {
      min-width: 0;
    }

    #abstracao .world-card .eyebrow {
      margin-bottom: .65rem;
    }

    .abstraction-rule {
      display: grid;
      gap: .25rem;
      margin-top: 1.3rem;
      padding: 1rem;
      border-left: 4px solid var(--blue);
      border-radius: 0 14px 14px 0;
      background: var(--blue-soft);
      color: var(--muted);
    }

    .abstraction-rule strong {
      color: var(--ink);
    }

    .abstraction-map {
      display: grid;
      gap: .7rem;
      margin-top: 1.15rem;
    }

    .abstraction-map > div {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 30px minmax(0, 1fr);
      align-items: center;
      gap: .65rem;
      padding: .85rem .95rem;
      border: 1px solid var(--line);
      border-radius: 14px;
      background: var(--paper);
    }

    .abstraction-map span {
      color: var(--muted);
    }

    .abstraction-map b {
      color: var(--blue);
      text-align: center;
      font-size: 1.15rem;
    }

    .abstraction-map strong {
      color: var(--ink);
    }

    .abstraction-excluded {
      margin-top: 1rem;
      padding: .95rem 1rem;
      border-radius: 14px;
      background: var(--amber-soft);
    }

    .abstraction-excluded small {
      display: block;
      margin-bottom: .3rem;
      color: var(--amber);
      font-size: .7rem;
      font-weight: 850;
      letter-spacing: .08em;
      text-transform: uppercase;
    }

    .abstraction-excluded p {
      margin: 0;
      font-size: .9rem;
    }

    .abstraction-challenge-body {
      align-items: stretch;
    }

    .challenge-change {
      padding: 1.05rem 1.1rem;
      border: 1px solid #efd5a7;
      border-radius: 16px;
      background: var(--amber-soft);
    }

    .challenge-change small {
      display: block;
      margin-bottom: .4rem;
      color: var(--amber);
      font-size: .7rem;
      font-weight: 850;
      letter-spacing: .09em;
      text-transform: uppercase;
    }

    .challenge-change p {
      margin: 0;
      color: var(--ink);
      font-size: 1rem;
    }

    .challenge-context {
      margin: 1rem 0 .35rem;
    }

    .abstraction-takeaway {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: .8rem 1rem;
      align-items: start;
      margin: 0 1.4rem 1.4rem;
      padding: 1rem 1.1rem;
      border: 1px solid #b8e5df;
      border-radius: 15px;
      background: var(--teal-soft);
    }

    .abstraction-takeaway strong {
      color: var(--teal);
    }

    .abstraction-takeaway span {
      color: var(--ink);
    }

    body.theme-dark .scenario-reworked .scenario-question,
    body.theme-dark .scenario-summary-card,
    body.theme-dark .abstraction-map > div {
      background: #172033;
      border-color: var(--line);
    }

    body.theme-dark .scenario-summary-card-accent {
      background: linear-gradient(145deg, #111a2b, #172033);
      border-color: #3b4f78;
    }

    body.theme-dark .abstraction-rule {
      background: #111a2b;
    }

    body.theme-dark .abstraction-excluded,
    body.theme-dark .challenge-change {
      background: #2b2113;
      border-color: #60451f;
    }

    body.theme-dark .abstraction-takeaway {
      background: #0f2b2a;
      border-color: #245d59;
    }

    @media (max-width: 1000px) {
      #aquecimento .warmup,
      #abstracao .world-grid-reworked {
        grid-template-columns: 1fr;
      }

      .warmup-map-figure img {
        max-height: 360px;
      }
    }

    @media (max-width: 900px) {
      .scenario-summary-grid {
        grid-template-columns: 1fr;
      }

      .scenario-summary-card {
        min-height: auto;
      }
    }

    @media (max-width: 640px) {
      .abstraction-map > div,
      .abstraction-takeaway {
        grid-template-columns: 1fr;
        gap: .25rem;
      }

      .abstraction-map b {
        transform: rotate(90deg);
        justify-self: start;
      }
    }
  `;

  document.head.appendChild(style);
})();