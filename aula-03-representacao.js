/* Refino da seção de qualidade da representação da Aula 03. */
(() => {
  const section = document.querySelector('#representacao');
  if (!section) return;

  const heading = section.querySelector('.section-heading');
  const shift = section.querySelector('.representation-shift');
  const note = section.querySelector('.note-banner');
  const inquiry = section.querySelector('.inquiry');

  if (heading) {
    const eyebrow = heading.querySelector('.eyebrow');
    const title = heading.querySelector('h2');
    const description = heading.querySelector('p:last-child');

    if (eyebrow) eyebrow.textContent = 'Qualidade da representação';
    if (title) title.textContent = 'Quando o problema muda, a representação pode precisar mudar';
    if (description) {
      description.innerHTML = 'Até agora, bastava saber <strong>onde o robô estava</strong>. Vamos alterar a tarefa: antes de chegar ao Laboratório, ele precisa buscar um pacote na Sala 101. Essa nova condição exige que o modelo consiga distinguir situações que antes pareciam iguais.';
    }
  }

  if (shift) {
    shift.classList.add('representation-evolution');
    shift.innerHTML = `
      <article class="representation-stage representation-stage-before">
        <div class="representation-stage-head">
          <span>01</span>
          <div>
            <small>Modelo anterior</small>
            <h3>A posição era suficiente</h3>
          </div>
        </div>
        <p>Quando a única tarefa era chegar ao Laboratório, bastava representar o local atual do robô.</p>
        <pre><code>estado = "corredor"</code></pre>
        <div class="representation-stage-note">Nesse problema, saber <strong>onde</strong> o robô estava era suficiente para decidir os próximos movimentos.</div>
      </article>

      <article class="representation-stage representation-stage-problem">
        <div class="representation-stage-head">
          <span>02</span>
          <div>
            <small>O problema mudou</small>
            <h3>Agora existem situações diferentes no mesmo local</h3>
          </div>
        </div>
        <p>Depois de incluir a coleta do pacote, “estar no Corredor” já não descreve tudo o que importa.</p>
        <div class="representation-collision">
          <div><small>Situação A</small><strong>Corredor</strong><span>sem o pacote</span></div>
          <div class="representation-collapse">↓</div>
          <code>estado = "corredor"</code>
          <div class="representation-collapse">↑</div>
          <div><small>Situação B</small><strong>Corredor</strong><span>com o pacote</span></div>
        </div>
        <div class="representation-question"><strong>O que o modelo anterior não consegue distinguir?</strong><span>Ele representa duas situações que exigem decisões diferentes como se fossem a mesma.</span></div>
      </article>

      <article class="representation-stage representation-stage-after">
        <div class="representation-stage-head">
          <span>03</span>
          <div>
            <small>Representação ampliada</small>
            <h3>O estado passa a guardar a informação que faz diferença</h3>
          </div>
        </div>
        <p>Agora o estado precisa informar tanto o local quanto se o pacote já foi coletado.</p>
        <pre><code>estado = {
    "local": "corredor",
    "possui_pacote": False
}</code></pre>
        <div class="representation-state-pair">
          <div><code>{"local": "corredor", "possui_pacote": False}</code><span>Corredor sem o pacote</span></div>
          <div><code>{"local": "corredor", "possui_pacote": True}</code><span>Corredor com o pacote</span></div>
        </div>
      </article>
    `;
  }

  if (note) {
    note.classList.add('representation-principle');
    note.innerHTML = '<strong>Ideia central:</strong> uma representação é suficiente quando contém as informações necessárias para distinguir situações que exigem decisões diferentes.';
  }

  if (inquiry) {
    inquiry.classList.add('representation-inquiry-refined');
    inquiry.innerHTML = `
      <div class="inquiry-head">
        <div>
          <span class="inquiry-kicker">Teste de representação</span>
          <h3>O que precisa mudar no modelo?</h3>
        </div>
        <span class="inquiry-tag">Reformule antes de programar</span>
      </div>
      <div class="inquiry-body">
        <div>
          <p>Comece pelo problema que apareceu no exemplo: o modelo anterior deixou de distinguir situações relevantes. Use essa ideia para reformular a representação.</p>
          <ol class="prompt-list">
            <li>Quais são as duas situações diferentes que <code>estado = "corredor"</code> não consegue mais distinguir?</li>
            <li>Que nova informação precisa fazer parte do estado?</li>
            <li>Que nova ação aparece quando o robô chega à Sala 101?</li>
            <li>Como muda a condição que indica que a tarefa foi concluída?</li>
          </ol>
        </div>
        <div class="worksheet">
          <label for="reformulacao">Sua reformulação</label>
          <textarea id="reformulacao" data-save="reformulacao" placeholder="O modelo anterior não distingue... O estado precisa incluir... A nova ação é... A condição de conclusão passa a ser..."></textarea>
          <span class="save-note">O texto fica salvo somente neste navegador.</span>
        </div>
      </div>
    `;

    const field = inquiry.querySelector('#reformulacao');
    if (field) {
      const key = 'aula03:reformulacao';
      field.value = localStorage.getItem(key) || '';
      field.addEventListener('input', () => localStorage.setItem(key, field.value));
    }
  }

  const style = document.createElement('style');
  style.id = 'aula03-representation-refinement';
  style.textContent = `
    #representacao .representation-evolution {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
      align-items: stretch;
    }

    #representacao .representation-evolution::before,
    #representacao .representation-evolution::after,
    #representacao .representation-arrow {
      display: none !important;
    }

    .representation-stage {
      display: flex;
      flex-direction: column;
      min-width: 0;
      padding: 1.35rem;
      border: 1px solid var(--line);
      border-radius: 20px;
      background: var(--paper);
      box-shadow: 0 12px 30px rgba(35, 50, 78, .045);
    }

    .representation-stage-head {
      display: grid;
      grid-template-columns: 44px minmax(0, 1fr);
      gap: .8rem;
      align-items: start;
      margin-bottom: .9rem;
    }

    .representation-stage-head > span {
      display: grid;
      place-items: center;
      width: 42px;
      height: 42px;
      border-radius: 13px;
      background: var(--blue-soft);
      color: var(--blue);
      font-weight: 900;
    }

    .representation-stage-head small {
      display: block;
      margin-bottom: .2rem;
      color: var(--blue);
      font-size: .68rem;
      font-weight: 850;
      letter-spacing: .08em;
      text-transform: uppercase;
    }

    .representation-stage-head h3 {
      margin: 0;
      font-size: 1.08rem;
      line-height: 1.35;
    }

    .representation-stage > p {
      margin: 0 0 1rem;
      color: var(--muted);
      font-size: .92rem;
    }

    .representation-stage pre {
      margin: 0;
      padding: 1rem;
      border: 1px solid var(--line);
      border-radius: 14px;
      background: var(--soft);
      overflow-x: auto;
    }

    .representation-stage pre code {
      font-size: .86rem;
    }

    .representation-stage-note {
      margin-top: auto;
      padding-top: 1rem;
      color: var(--muted);
      font-size: .86rem;
      line-height: 1.5;
    }

    .representation-stage-problem {
      border-color: #e8cba0;
      background: linear-gradient(150deg, var(--amber-soft), var(--paper) 58%);
    }

    .representation-stage-problem .representation-stage-head > span {
      background: var(--amber-soft);
      color: var(--amber);
    }

    .representation-stage-problem .representation-stage-head small {
      color: var(--amber);
    }

    .representation-collision {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: .55rem .65rem;
      align-items: center;
      margin-top: .15rem;
    }

    .representation-collision > div:not(.representation-collapse) {
      display: grid;
      gap: .08rem;
      padding: .75rem .85rem;
      border: 1px solid rgba(184, 121, 31, .22);
      border-radius: 13px;
      background: rgba(255, 255, 255, .62);
    }

    .representation-collision small {
      color: var(--amber);
      font-size: .64rem;
      font-weight: 850;
      letter-spacing: .08em;
      text-transform: uppercase;
    }

    .representation-collision strong {
      color: var(--ink);
      font-size: .9rem;
    }

    .representation-collision span {
      color: var(--muted);
      font-size: .8rem;
    }

    .representation-collision code {
      grid-column: 1;
      padding: .7rem .8rem;
      border: 1px dashed #d9a854;
      border-radius: 12px;
      background: var(--paper);
      color: var(--ink);
      text-align: center;
      font-size: .82rem;
    }

    .representation-collapse {
      grid-column: 2;
      color: var(--amber);
      font-weight: 900;
      text-align: center;
    }

    .representation-question {
      display: grid;
      gap: .25rem;
      margin-top: 1rem;
      padding: .9rem;
      border-left: 4px solid var(--amber);
      border-radius: 0 13px 13px 0;
      background: rgba(255, 255, 255, .55);
    }

    .representation-question strong {
      color: var(--ink);
      font-size: .88rem;
    }

    .representation-question span {
      color: var(--muted);
      font-size: .82rem;
      line-height: 1.45;
    }

    .representation-stage-after {
      border-color: #a8ddd5;
      background: linear-gradient(150deg, var(--teal-soft), var(--paper) 58%);
    }

    .representation-stage-after .representation-stage-head > span {
      background: var(--teal-soft);
      color: var(--teal);
    }

    .representation-stage-after .representation-stage-head small {
      color: var(--teal);
    }

    .representation-state-pair {
      display: grid;
      gap: .6rem;
      margin-top: .85rem;
    }

    .representation-state-pair > div {
      padding: .75rem .8rem;
      border: 1px solid #b8e5df;
      border-radius: 12px;
      background: rgba(255, 255, 255, .65);
    }

    .representation-state-pair code,
    .representation-state-pair span {
      display: block;
    }

    .representation-state-pair code {
      margin-bottom: .25rem;
      color: var(--ink);
      font-size: .72rem;
      overflow-wrap: anywhere;
    }

    .representation-state-pair span {
      color: var(--muted);
      font-size: .77rem;
    }

    #representacao .representation-principle {
      margin-top: 1.3rem;
      border-color: #a8ddd5;
      background: var(--teal-soft);
    }

    #representacao .representation-principle strong {
      color: var(--teal);
    }

    #representacao .representation-inquiry-refined {
      margin-top: 1.5rem;
    }

    body.theme-dark .representation-stage {
      background: #172033;
      border-color: var(--line);
    }

    body.theme-dark .representation-stage pre {
      background: #111a2b;
      border-color: var(--line);
    }

    body.theme-dark .representation-stage-problem {
      background: linear-gradient(150deg, #2b2113, #172033 58%);
      border-color: #60451f;
    }

    body.theme-dark .representation-stage-after {
      background: linear-gradient(150deg, #0f2b2a, #172033 58%);
      border-color: #245d59;
    }

    body.theme-dark .representation-collision > div:not(.representation-collapse),
    body.theme-dark .representation-question,
    body.theme-dark .representation-state-pair > div {
      background: rgba(15, 23, 42, .58);
    }

    body.theme-dark .representation-collision code {
      background: #172033;
    }

    body.theme-dark #representacao .representation-principle {
      background: #0f2b2a;
      border-color: #245d59;
    }

    @media (max-width: 1050px) {
      #representacao .representation-evolution {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 640px) {
      .representation-stage {
        padding: 1.05rem;
      }

      .representation-collision {
        grid-template-columns: 1fr;
      }

      .representation-collision code,
      .representation-collapse {
        grid-column: 1;
      }
    }
  `;

  document.head.appendChild(style);

  const activityRefinement = document.createElement('script');
  activityRefinement.src = 'aula-03-atividade.js';
  activityRefinement.async = false;
  document.head.appendChild(activityRefinement);
})();
