/* Refino da atividade de modelagem da Aula 03. */
(() => {
  const section = document.querySelector('#atividade');
  if (!section) return;

  const heading = section.querySelector('.section-heading');
  const caseOptions = section.querySelector('.case-options');
  const inquiries = section.querySelectorAll('.inquiry');
  const modelingInquiry = inquiries[0];
  const aiInquiry = section.querySelector('#ia-critica');

  const saveField = (field) => {
    if (!field?.dataset.save) return;
    const key = `aula03:${field.dataset.save}`;
    field.value = localStorage.getItem(key) || '';
    field.addEventListener('input', () => localStorage.setItem(key, field.value));
  };

  if (heading) {
    const title = heading.querySelector('h2');
    const description = heading.querySelector('p:last-child');

    if (title) title.textContent = 'Agora formule um problema';
    if (description) {
      description.textContent = 'Escolha um caso e construa uma representação que realmente possa ser usada para resolver o problema. Não basta nomear os conceitos: mostre estados concretos, transições e uma possível solução. A IA generativa entra somente depois, para comparação e crítica.';
    }
  }

  if (caseOptions && !caseOptions.nextElementSibling?.classList.contains('activity-case-note')) {
    caseOptions.insertAdjacentHTML('afterend', `
      <div class="activity-case-note">
        <strong>Escolha livre:</strong>
        <span>os casos têm níveis diferentes de complexidade. O importante não é escolher o mais difícil, mas conseguir justificar claramente a representação construída.</span>
      </div>
    `);
  }

  if (modelingInquiry) {
    modelingInquiry.classList.add('activity-modeling-refined');
    modelingInquiry.innerHTML = `
      <div class="inquiry-head">
        <div>
          <span class="inquiry-kicker">Etapa 1 · Modelagem</span>
          <h3>Construa e demonstre sua representação</h3>
        </div>
        <span class="inquiry-tag">Sem consultar IA primeiro</span>
      </div>

      <div class="activity-model-flow" aria-label="Sequência da atividade">
        <span>Descrever o problema</span><b>→</b>
        <span>Representar estados e ações</span><b>→</b>
        <span>Demonstrar que o modelo funciona</span>
      </div>

      <div class="inquiry-body inquiry-body-single">
        <div class="model-grid worksheet activity-model-grid">
          <div class="map-field map-field-wide activity-step-field">
            <span class="activity-field-number">01</span>
            <div>
              <label for="modelo-problema">Qual é o problema?</label>
              <p class="activity-field-help">Descreva a tarefa em duas ou três linhas, deixando claro o que precisa ser alcançado.</p>
              <textarea id="modelo-problema" data-save="modelo-problema" placeholder="Ex.: um passageiro começa na estação A e precisa chegar à estação F usando apenas conexões disponíveis..."></textarea>
            </div>
          </div>

          <div class="map-field map-field-wide activity-step-field">
            <span class="activity-field-number">02</span>
            <div>
              <label for="modelo-estado">Como será representado um estado?</label>
              <p class="activity-field-help">Diga quais informações precisam descrever uma situação relevante e forneça pelo menos dois exemplos concretos.</p>
              <textarea id="modelo-estado" data-save="modelo-estado" placeholder="O estado precisa registrar... Exemplos: estado A = ...; estado B = ..."></textarea>
            </div>
          </div>

          <div class="map-field activity-step-field">
            <span class="activity-field-number">03</span>
            <div>
              <label for="modelo-inicial">Qual é o estado inicial?</label>
              <p class="activity-field-help">Represente explicitamente a situação em que o problema começa.</p>
              <textarea id="modelo-inicial" data-save="modelo-inicial" placeholder="Estado inicial = ..."></textarea>
            </div>
          </div>

          <div class="map-field activity-step-field">
            <span class="activity-field-number">04</span>
            <div>
              <label for="modelo-acoes">Quais ações mudam o estado?</label>
              <p class="activity-field-help">Liste ao menos duas ações e mostre uma transição concreta.</p>
              <textarea id="modelo-acoes" data-save="modelo-acoes" placeholder="Ações: ... Transição: estado A → ação → estado B"></textarea>
            </div>
          </div>

          <div class="map-field activity-step-field">
            <span class="activity-field-number">05</span>
            <div>
              <label for="modelo-restricoes">Quais são as restrições?</label>
              <p class="activity-field-help">Explique o que torna uma ação ou situação inválida.</p>
              <textarea id="modelo-restricoes" data-save="modelo-restricoes" placeholder="Não é permitido... Uma ação só pode ocorrer quando..."></textarea>
            </div>
          </div>

          <div class="map-field activity-step-field">
            <span class="activity-field-number">06</span>
            <div>
              <label for="modelo-objetivo">Qual é o objetivo e como testá-lo?</label>
              <p class="activity-field-help">Defina a situação desejada e uma condição verificável para reconhecer que ela foi atingida.</p>
              <textarea id="modelo-objetivo" data-save="modelo-objetivo" placeholder="Objetivo: ... Teste: o objetivo foi atingido quando..."></textarea>
            </div>
          </div>

          <div class="map-field map-field-wide activity-step-field activity-demonstration-field">
            <span class="activity-field-number">07</span>
            <div>
              <label for="modelo-solucao">Mostre uma possível solução</label>
              <p class="activity-field-help">Escreva uma sequência curta de estados ou ações que leve do estado inicial ao objetivo sem violar as restrições.</p>
              <textarea id="modelo-solucao" data-save="modelo-solucao" placeholder="estado inicial → ... → ... → estado objetivo"></textarea>
            </div>
          </div>

          <div class="map-field activity-step-field">
            <span class="activity-field-number">08</span>
            <div>
              <label for="modelo-avaliacao">Se houver várias soluções, como compará-las?</label>
              <p class="activity-field-help">Escolha um critério que permita preferir uma solução válida a outra.</p>
              <textarea id="modelo-avaliacao" data-save="modelo-avaliacao" placeholder="Compararia as soluções por... porque..."></textarea>
            </div>
          </div>

          <div class="map-field activity-step-field">
            <span class="activity-field-number">09</span>
            <div>
              <label for="modelo-abstracao">O que ficou fora do modelo?</label>
              <p class="activity-field-help">Identifique elementos do mundo real que você decidiu não representar e justifique.</p>
              <textarea id="modelo-abstracao" data-save="modelo-abstracao" placeholder="Não representei... porque isso não altera..."></textarea>
            </div>
          </div>

          <div class="activity-check map-field-wide">
            <strong>Antes de seguir para a IA, verifique:</strong>
            <span>se outra pessoa ler somente sua representação, ela consegue distinguir os estados, entender as ações permitidas e reconhecer quando uma solução chegou ao objetivo?</span>
          </div>

          <span class="save-note map-field-wide">As respostas ficam salvas somente neste navegador.</span>
        </div>
      </div>
    `;

    modelingInquiry.querySelectorAll('[data-save]').forEach(saveField);
  }

  if (aiInquiry) {
    const body = aiInquiry.querySelector('.inquiry-body');
    const intro = body?.querySelector(':scope > p');
    if (intro) {
      intro.textContent = 'Depois de concluir sua própria modelagem, peça a uma ferramenta de IA generativa que formule o mesmo problema. Solicite que ela apresente: representação do estado com exemplos concretos, estado inicial, ações e transições, restrições, objetivo e teste de objetivo, uma possível solução e um critério para comparar soluções.';
    }
  }

  const style = document.createElement('style');
  style.id = 'aula03-activity-refinement';
  style.textContent = `
    #atividade .activity-case-note {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      gap: .5rem .8rem;
      align-items: start;
      margin: 1rem 0 1.5rem;
      padding: .9rem 1rem;
      border-left: 4px solid var(--blue);
      border-radius: 0 13px 13px 0;
      background: var(--blue-soft);
      color: var(--muted);
      font-size: .88rem;
    }

    #atividade .activity-case-note strong {
      color: var(--blue);
      white-space: nowrap;
    }

    #atividade .activity-modeling-refined {
      margin-top: 1.5rem;
    }

    .activity-model-flow {
      display: grid;
      grid-template-columns: minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr);
      gap: .6rem;
      align-items: center;
      margin: 0 1.4rem;
      padding: .85rem 1rem;
      border: 1px solid var(--line);
      border-radius: 14px;
      background: var(--soft);
      color: var(--muted);
      font-size: .82rem;
      font-weight: 750;
      text-align: center;
    }

    .activity-model-flow b {
      color: var(--blue);
      font-size: 1rem;
    }

    #atividade .activity-model-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
    }

    #atividade .activity-step-field {
      display: grid;
      grid-template-columns: 38px minmax(0, 1fr);
      gap: .75rem;
      align-items: start;
      padding: 1rem;
      border: 1px solid var(--line);
      border-radius: 16px;
      background: var(--paper);
    }

    .activity-field-number {
      display: grid;
      place-items: center;
      width: 36px;
      height: 36px;
      border-radius: 11px;
      background: var(--blue-soft);
      color: var(--blue);
      font-size: .73rem;
      font-weight: 900;
    }

    #atividade .activity-step-field label {
      margin-bottom: .25rem;
      font-size: .93rem;
    }

    .activity-field-help {
      min-height: 2.7em;
      margin: 0 0 .6rem;
      color: var(--muted);
      font-size: .8rem;
      line-height: 1.4;
    }

    #atividade .activity-step-field textarea {
      min-height: 112px;
    }

    #atividade .activity-demonstration-field {
      border-color: #a9ddd5;
      background: linear-gradient(145deg, var(--teal-soft), var(--paper));
    }

    #atividade .activity-demonstration-field .activity-field-number {
      background: var(--teal-soft);
      color: var(--teal);
    }

    #atividade .activity-check {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      gap: .55rem .8rem;
      align-items: start;
      padding: 1rem 1.1rem;
      border: 1px solid #a9ddd5;
      border-radius: 15px;
      background: var(--teal-soft);
    }

    #atividade .activity-check strong {
      color: var(--teal);
    }

    #atividade .activity-check span {
      color: var(--ink);
      line-height: 1.5;
    }

    body.theme-dark #atividade .activity-case-note,
    body.theme-dark .activity-model-flow {
      background: #111a2b;
      border-color: var(--line);
    }

    body.theme-dark #atividade .activity-step-field {
      background: #172033;
      border-color: var(--line);
    }

    body.theme-dark #atividade .activity-demonstration-field,
    body.theme-dark #atividade .activity-check {
      background: #0f2b2a;
      border-color: #245d59;
    }

    @media (max-width: 850px) {
      #atividade .activity-model-grid {
        grid-template-columns: 1fr;
      }

      .activity-model-flow {
        grid-template-columns: 1fr;
        text-align: left;
      }

      .activity-model-flow b {
        transform: rotate(90deg);
        justify-self: start;
      }
    }

    @media (max-width: 600px) {
      #atividade .activity-case-note,
      #atividade .activity-check {
        grid-template-columns: 1fr;
      }

      #atividade .activity-step-field {
        grid-template-columns: 1fr;
      }

      .activity-field-help {
        min-height: auto;
      }
    }
  `;

  document.head.appendChild(style);
})();
