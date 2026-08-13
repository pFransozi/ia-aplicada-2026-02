/* Aula 03 — validação técnica da representação. */
(() => {
  const section = document.querySelector('#representacao');
  if (!section || section.dataset.validationEnhanced === 'true') return;
  section.dataset.validationEnhanced = 'true';

  const container = section.querySelector('.container');
  if (!container) return;

  container.innerHTML = `
    <div class="section-heading validation-heading">
      <p class="eyebrow">06 · Validação do modelo</p>
      <h2>Uma representação é adequada apenas se distinguir situações relevantes</h2>
      <p>Uma representação de estado não é avaliada apenas por ser simples ou fácil de implementar. Ela precisa preservar todas as diferenças do domínio que podem alterar <strong>ações aplicáveis</strong>, <strong>resultados de transições</strong> ou o <strong>teste de objetivo</strong>.</p>
    </div>

    <div class="validation-change">
      <div>
        <span class="validation-kicker">Mudança no requisito</span>
        <h3>O robô agora deve coletar um pacote na Sala 101 antes de entregá-lo no Laboratório.</h3>
      </div>
      <p>Com esse novo requisito, conhecer somente a localização do robô deixa de ser suficiente. Estar no mesmo ambiente <em>com</em> ou <em>sem</em> o pacote pode levar a decisões e resultados diferentes.</p>
    </div>

    <div class="representation-shift validation-comparison">
      <article class="representation-card bad validation-card">
        <span class="validation-kicker">Representação insuficiente</span>
        <h3>A localização não distingue todas as situações relevantes</h3>
        <pre><code>estado = "corredor"</code></pre>
        <div class="validation-state-pair">
          <span>corredor + sem pacote</span>
          <b>≠</b>
          <span>corredor + com pacote</span>
        </div>
        <p>As duas situações são diferentes para o problema, mas seriam codificadas pelo mesmo estado. O modelo perde informação necessária para validar a entrega.</p>
      </article>

      <div class="representation-arrow" aria-hidden="true">→</div>

      <article class="representation-card good validation-card">
        <span class="validation-kicker">Representação suficiente</span>
        <h3>O estado passa a registrar as variáveis que afetam a solução</h3>
        <pre><code>estado = {
    "local": "corredor",
    "possui_pacote": False
}</code></pre>
        <p>Agora o modelo consegue distinguir situações que possuem consequências diferentes para as ações disponíveis e para o teste de objetivo.</p>
      </article>
    </div>

    <div class="validation-formalization" aria-label="Formalização mínima da nova representação">
      <div><small>Espaço de estados</small><strong>S = Locais × {sem_pacote, com_pacote}</strong></div>
      <div><small>Transição de coleta</small><strong>T((Sala 101, 0), coletar) = (Sala 101, 1)</strong></div>
      <div><small>Teste de objetivo</small><strong>objetivo(s) ⇔ local = Laboratório ∧ possui_pacote</strong></div>
    </div>

    <div class="validation-principle">
      <strong>Critério de suficiência da representação</strong>
      <span>Se duas situações do mundo podem levar a ações válidas diferentes, transições diferentes ou resultados diferentes no teste de objetivo, elas não devem ser representadas pelo mesmo estado.</span>
    </div>

    <article class="inquiry validation-exercise">
      <div class="inquiry-head">
        <div>
          <span class="inquiry-kicker">Exercício · análise de suficiência</span>
          <h3>Reformule o modelo mínimo para o novo requisito</h3>
        </div>
        <span class="inquiry-tag">Identifique, formalize e valide</span>
      </div>

      <div class="validation-exercise-intro">
        <p><strong>Objetivo:</strong> mostrar que a nova representação contém informação suficiente para distinguir as situações relevantes, sem adicionar variáveis que não influenciam a resolução do problema.</p>
      </div>

      <div class="validation-task-grid">
        <article>
          <span>01</span>
          <div><small>Diagnóstico</small><h4>Mostre por que o modelo anterior falha</h4><p>Dê dois exemplos de situações com a mesma localização que precisam produzir comportamentos ou avaliações diferentes.</p></div>
        </article>
        <article>
          <span>02</span>
          <div><small>Estado</small><h4>Defina a nova representação</h4><p>Especifique as variáveis do estado, seus domínios possíveis e apresente pelo menos dois estados concretos.</p></div>
        </article>
        <article>
          <span>03</span>
          <div><small>Ação e transição</small><h4>Formalize a coleta do pacote</h4><p>Defina quando a ação <code>coletar</code> é aplicável e qual estado resulta de sua execução.</p></div>
        </article>
        <article>
          <span>04</span>
          <div><small>Objetivo</small><h4>Reescreva o teste de objetivo</h4><p>O Laboratório só pode ser considerado estado objetivo quando a condição referente ao pacote também for satisfeita.</p></div>
        </article>
        <article>
          <span>05</span>
          <div><small>Validação</small><h4>Teste a representação com um contraexemplo</h4><p>Escolha uma situação em que considerar apenas a localização produziria uma conclusão incorreta e mostre como o novo estado evita o erro.</p></div>
        </article>
        <article>
          <span>06</span>
          <div><small>Minimalidade</small><h4>Justifique o que continua fora do modelo</h4><p>Indique informações do mundo real que continuam irrelevantes e explique por que sua ausência não altera ações, transições ou objetivo.</p></div>
        </article>
      </div>

      <div class="validation-output">
        <strong>Produto esperado</strong>
        <span>Uma definição de estado, dois estados concretos, uma regra de transição para a coleta, o novo teste de objetivo e uma justificativa curta de suficiência e minimalidade da representação.</span>
      </div>
    </article>
  `;

  const style = document.createElement('style');
  style.id = 'aula03-validation-refinement';
  style.textContent = `
    #representacao .validation-heading{max-width:930px}
    #representacao .validation-heading p:last-child{font-size:1.08rem;line-height:1.65}
    #representacao .validation-change{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr);gap:24px;align-items:center;margin-bottom:1.5rem;padding:1.25rem 1.35rem;border:1px solid #efd5a7;border-radius:18px;background:var(--amber-soft)}
    #representacao .validation-change h3{margin:.3rem 0 0;font-size:1.2rem}
    #representacao .validation-change p{margin:0;color:var(--ink)}
    #representacao .validation-kicker{display:block;color:var(--blue);font-size:.69rem;font-weight:850;letter-spacing:.08em;text-transform:uppercase}
    #representacao .validation-comparison{align-items:stretch}
    #representacao .validation-card{display:flex;flex-direction:column;gap:.7rem;min-width:0}
    #representacao .validation-card h3{margin:0;font-size:1.12rem}
    #representacao .validation-card p{margin:0;line-height:1.55}
    #representacao .validation-card pre{margin:.1rem 0;padding:1rem;border-radius:13px;background:rgba(255,255,255,.78);overflow:auto}
    #representacao .validation-state-pair{display:grid;grid-template-columns:1fr auto 1fr;gap:.65rem;align-items:center;padding:.8rem;border:1px solid #efc0cb;border-radius:12px;background:rgba(255,255,255,.55);font-size:.83rem;font-weight:750;text-align:center}
    #representacao .validation-state-pair b{color:var(--rose);font-size:1.05rem}
    #representacao .validation-formalization{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:1.3rem 0}
    #representacao .validation-formalization>div{padding:1rem 1.05rem;border:1px solid var(--line);border-radius:15px;background:var(--paper)}
    #representacao .validation-formalization small,#representacao .validation-formalization strong{display:block}
    #representacao .validation-formalization small{margin-bottom:.4rem;color:var(--blue);font-size:.68rem;font-weight:850;letter-spacing:.07em;text-transform:uppercase}
    #representacao .validation-formalization strong{font-family:"SFMono-Regular",Consolas,"Liberation Mono",monospace;font-size:.8rem;line-height:1.45;color:var(--ink)}
    #representacao .validation-principle{display:grid;grid-template-columns:auto minmax(0,1fr);gap:.7rem 1rem;align-items:start;padding:1rem 1.1rem;border-left:4px solid var(--teal);border-radius:0 14px 14px 0;background:var(--teal-soft)}
    #representacao .validation-principle strong{color:var(--teal);white-space:nowrap}
    #representacao .validation-principle span{color:var(--ink);line-height:1.5}
    #representacao .validation-exercise{margin-top:2rem}
    #representacao .validation-exercise-intro{padding:1.2rem 1.35rem 0}
    #representacao .validation-exercise-intro p{margin:0;max-width:980px;line-height:1.55}
    #representacao .validation-task-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;padding:1.25rem 1.35rem}
    #representacao .validation-task-grid article{display:grid;grid-template-columns:40px minmax(0,1fr);gap:.8rem;padding:1rem;border:1px solid var(--line);border-radius:15px;background:var(--paper)}
    #representacao .validation-task-grid article>span{display:grid;place-items:center;width:38px;height:38px;border-radius:11px;background:var(--blue-soft);color:var(--blue);font-size:.72rem;font-weight:900}
    #representacao .validation-task-grid small{display:block;margin-bottom:.2rem;color:var(--blue);font-size:.66rem;font-weight:850;letter-spacing:.07em;text-transform:uppercase}
    #representacao .validation-task-grid h4{margin:0 0 .35rem;font-size:.95rem}
    #representacao .validation-task-grid p{margin:0;font-size:.83rem;line-height:1.48}
    #representacao .validation-task-grid code{padding:.08rem .25rem;border-radius:5px;background:var(--soft);color:var(--ink)}
    #representacao .validation-output{display:grid;grid-template-columns:auto minmax(0,1fr);gap:.6rem .9rem;margin:0 1.35rem 1.35rem;padding:1rem 1.1rem;border:1px solid #a9ddd5;border-radius:15px;background:var(--teal-soft)}
    #representacao .validation-output strong{color:var(--teal);white-space:nowrap}
    #representacao .validation-output span{color:var(--ink);line-height:1.5}
    body.theme-dark #representacao .validation-change{background:#2b2113;border-color:#60451f}
    body.theme-dark #representacao .validation-card pre,body.theme-dark #representacao .validation-state-pair{background:#111a2b;border-color:var(--line);color:var(--ink)}
    body.theme-dark #representacao .validation-formalization>div,body.theme-dark #representacao .validation-task-grid article{background:#172033;border-color:var(--line)}
    body.theme-dark #representacao .validation-principle,body.theme-dark #representacao .validation-output{background:#0f2b2a;border-color:#245d59}
    @media(max-width:900px){#representacao .validation-change,#representacao .validation-formalization{grid-template-columns:1fr}#representacao .validation-comparison{grid-template-columns:1fr}#representacao .validation-comparison .representation-arrow{transform:rotate(90deg);justify-self:center}}
    @media(max-width:700px){#representacao .validation-task-grid{grid-template-columns:1fr}#representacao .validation-principle,#representacao .validation-output{grid-template-columns:1fr}#representacao .validation-principle strong,#representacao .validation-output strong{white-space:normal}}
  `;
  document.head.appendChild(style);
})();
