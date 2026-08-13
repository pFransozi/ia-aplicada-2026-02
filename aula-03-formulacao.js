/* Aprimoramento didático e técnico da formulação do problema de busca. */
(() => {
  const section = document.querySelector('#formulacao');
  if (!section) return;

  const heading = section.querySelector('.section-heading');
  const steps = section.querySelector('.formulation-steps');
  if (!heading || !steps) return;

  const title = heading.querySelector('h2');
  const lead = heading.querySelector('p:last-child');

  if (title) title.textContent = 'Da descrição em linguagem natural à formulação de um problema de busca';
  if (lead) {
    lead.innerHTML = 'Uma tarefa descrita em linguagem natural ainda não fornece a estrutura necessária para um algoritmo de busca. É preciso formular o problema de maneira explícita, definindo <strong>como os estados são representados</strong>, <strong>quais ações podem ser aplicadas</strong>, <strong>como essas ações produzem novos estados</strong> e <strong>como reconhecer que o objetivo foi atingido</strong>.';
  }

  if (!section.querySelector('.formulation-schema')) {
    steps.insertAdjacentHTML('beforebegin', `
      <div class="formulation-schema" aria-label="Estrutura de uma formulação de problema de busca">
        <div><small>Ponto de partida</small><strong>Estado inicial</strong></div>
        <b>→</b>
        <div><small>Decisões possíveis</small><strong>Ações aplicáveis</strong></div>
        <b>→</b>
        <div><small>Dinâmica do problema</small><strong>Modelo de transição</strong></div>
        <b>→</b>
        <div><small>Novas situações</small><strong>Estados sucessores</strong></div>
        <b>→</b>
        <div><small>Condição de término</small><strong>Teste de objetivo</strong></div>
      </div>
    `);
  }

  steps.innerHTML = `
    <article class="formulation-step">
      <div class="formulation-step-number">01</div>
      <div class="formulation-step-content">
        <small>Representação do estado</small>
        <h3>Como uma situação do problema será descrita?</h3>
        <div class="formulation-concepts">
          <div><strong>Estado</strong><span>Representação das informações necessárias para caracterizar uma situação relevante do problema.</span></div>
          <div><strong>Estado inicial</strong><span>Estado a partir do qual o processo de resolução começa.</span></div>
        </div>
        <div class="formulation-example"><b>No exemplo</b><span>Se apenas a localização for relevante, podemos representar <strong>estado = posição atual do robô</strong>. O estado inicial é <strong>Recepção</strong>.</span></div>
      </div>
    </article>

    <article class="formulation-step">
      <div class="formulation-step-number">02</div>
      <div class="formulation-step-content">
        <small>Ações e transições</small>
        <h3>Como o sistema pode passar de um estado para outro?</h3>
        <div class="formulation-concepts formulation-concepts-three">
          <div><strong>Ações</strong><span>Operações que podem ser aplicadas a um determinado estado.</span></div>
          <div><strong>Condições de aplicabilidade</strong><span>Determinam em quais estados uma ação pode ser executada validamente.</span></div>
          <div><strong>Modelo de transição</strong><span>Define qual estado resulta da execução de uma ação válida.</span></div>
        </div>
        <div class="formulation-example"><b>No exemplo</b><span><strong>Recepção — ir_para_corredor → Corredor</strong>. Uma ação para um ambiente sem conexão não é aplicável; a conectividade restringe as transições possíveis.</span></div>
      </div>
    </article>

    <article class="formulation-step">
      <div class="formulation-step-number">03</div>
      <div class="formulation-step-content">
        <small>Objetivo</small>
        <h3>Como reconhecer que o problema foi resolvido?</h3>
        <div class="formulation-concepts">
          <div><strong>Estado objetivo</strong><span>Estado que satisfaz a condição desejada estabelecida para o problema.</span></div>
          <div><strong>Teste de objetivo</strong><span>Condição computável utilizada para verificar se um estado é um estado objetivo.</span></div>
        </div>
        <div class="formulation-example"><b>No exemplo</b><span>O Laboratório é o estado objetivo. Um teste possível é <code>estado_atual == "laboratorio"</code>.</span></div>
      </div>
    </article>

    <article class="formulation-step formulation-step-final">
      <div class="formulation-step-number">04</div>
      <div class="formulation-step-content">
        <small>Solução e qualidade</small>
        <h3>O que o algoritmo deverá produzir?</h3>
        <div class="formulation-concepts formulation-concepts-three">
          <div><strong>Solução</strong><span>Sequência de ações que transforma o estado inicial em um estado objetivo por meio de transições válidas.</span></div>
          <div><strong>Validade da solução</strong><span>Verifica se o objetivo foi alcançado sem violar as regras e restrições do problema.</span></div>
          <div><strong>Qualidade da solução</strong><span>Permite comparar soluções válidas por número de movimentos, distância, tempo, custo ou outro critério pertinente.</span></div>
        </div>
        <div class="formulation-example"><b>No exemplo</b><span><strong>Recepção → Corredor → Laboratório</strong> constitui uma solução válida. Se houver outras soluções, um critério de custo pode determinar qual é preferível.</span></div>
      </div>
    </article>
  `;

  if (!section.querySelector('.formulation-closure')) {
    const softwareInterface = section.querySelector('.software-interface');
    (softwareInterface || steps).insertAdjacentHTML('afterend', `
      <div class="formulation-closure">
        <strong>Formulação não é estratégia de busca.</strong>
        <span>A formulação determina <em>o que pode ser explorado</em>: estados, ações, transições e objetivo. A estratégia de busca determinará <em>como explorar</em> esse espaço para encontrar uma solução.</span>
      </div>
    `);
  }

  const style = document.createElement('style');
  style.id = 'aula03-formulation-enhancement';
  style.textContent = `
    .formulation-schema {
      display:grid;
      grid-template-columns:minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr);
      gap:.55rem;
      align-items:center;
      margin:0 0 1.2rem;
      padding:1rem;
      border:1px solid var(--line);
      border-radius:18px;
      background:var(--soft);
    }
    .formulation-schema > div { min-width:0; text-align:center; }
    .formulation-schema small, .formulation-schema strong { display:block; }
    .formulation-schema small { margin-bottom:.25rem; color:var(--muted); font-size:.66rem; font-weight:800; letter-spacing:.06em; text-transform:uppercase; }
    .formulation-schema strong { color:var(--ink); font-size:.88rem; }
    .formulation-schema > b { color:var(--blue); font-size:1.05rem; }

    .formulation-closure {
      display:grid;
      grid-template-columns:auto minmax(0,1fr);
      gap:.65rem .9rem;
      align-items:start;
      margin-top:1.25rem;
      padding:1rem 1.1rem;
      border-left:4px solid var(--teal);
      border-radius:0 14px 14px 0;
      background:var(--teal-soft);
    }
    .formulation-closure strong { color:var(--teal); }
    .formulation-closure span { color:var(--ink); }

    body.theme-dark .formulation-schema { background:#111a2b; border-color:var(--line); }
    body.theme-dark .formulation-closure { background:#0f2b2a; border-color:#245d59; }

    @media (max-width:980px) {
      .formulation-schema { grid-template-columns:1fr; }
      .formulation-schema > div { text-align:left; }
      .formulation-schema > b { transform:rotate(90deg); justify-self:start; }
    }
    @media (max-width:640px) {
      .formulation-closure { grid-template-columns:1fr; }
    }
  `;
  document.head.appendChild(style);
})();