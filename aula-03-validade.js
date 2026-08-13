/* Refino técnico: validade, custo e otimalidade da solução. */
(() => {
  const section = document.querySelector('#formulacao');
  if (!section) return;

  const headings = section.querySelectorAll('.section-heading');
  const heading = headings[1];
  const cards = section.querySelectorAll('.distinction article');
  const note = section.querySelector('.note-banner');

  if (heading) {
    const eyebrow = heading.querySelector('.eyebrow');
    const title = heading.querySelector('h2');
    let description = heading.querySelector('p:not(.eyebrow)');

    if (eyebrow) eyebrow.textContent = 'Validade e custo da solução';
    if (title) title.textContent = 'Uma solução pode ser válida sem ser ótima';

    if (!description && title) {
      description = document.createElement('p');
      title.insertAdjacentElement('afterend', description);
    }

    if (description) {
      description.textContent = 'Encontrar um estado objetivo não encerra toda a análise de uma solução. Primeiro verificamos se existe uma sequência válida de ações que leva do estado inicial a um estado objetivo. Quando existem múltiplas soluções válidas, podemos compará-las por meio de uma função de custo ou de outro critério de avaliação.';
    }
  }

  if (cards.length >= 3) {
    cards[0].innerHTML = `
      <h3>Teste de objetivo</h3>
      <p>Verifica se um determinado estado satisfaz a condição de término definida para o problema.</p>
      <small>No exemplo: <code>estado_atual == "laboratorio"</code></small>
    `;

    cards[1].innerHTML = `
      <h3>Solução válida</h3>
      <p>É uma sequência de ações aplicáveis que conduz do estado inicial a um estado objetivo sem violar as restrições do problema.</p>
      <small>No exemplo: Recepção → Corredor → Laboratório.</small>
    `;

    cards[2].innerHTML = `
      <h3>Custo da solução</h3>
      <p>Associa um valor a uma solução e permite comparar diferentes caminhos válidos segundo um critério definido para o problema.</p>
      <small>Ex.: número de movimentos, distância, tempo ou consumo de energia.</small>
    `;
  }

  if (note) {
    note.classList.add('search-formulation-summary');
    note.innerHTML = `
      <strong>Formulação clássica de um problema de busca:</strong>
      especificamos o <strong>estado inicial</strong>, as <strong>ações aplicáveis</strong>, o <strong>modelo de transição</strong>, o <strong>teste de objetivo</strong> e, quando pertinente, uma <strong>função de custo</strong>. Esses elementos definem o problema; a estratégia de busca determina posteriormente como o espaço será explorado.
      <span class="optimality-note">Uma solução de menor custo é <strong>ótima em relação ao critério adotado</strong>; portanto, “melhor solução” depende da função de custo definida.</span>
    `;
  }

  const style = document.createElement('style');
  style.id = 'aula03-validity-refinement';
  style.textContent = `
    #formulacao .distinction article code {
      padding:.12rem .32rem;
      border-radius:6px;
      background:var(--soft);
      color:var(--ink);
    }
    #formulacao .search-formulation-summary {
      display:grid;
      gap:.45rem;
    }
    #formulacao .search-formulation-summary .optimality-note {
      display:block;
      margin-top:.25rem;
      padding-top:.65rem;
      border-top:1px solid color-mix(in srgb, var(--line) 80%, transparent);
      color:var(--muted);
    }
    body.theme-dark #formulacao .distinction article code {
      background:#111a2b;
    }
  `;
  document.head.appendChild(style);
})();
