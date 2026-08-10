/* Refinos textuais e conceituais da Aula 03. */
(() => {
  const formulation = document.querySelector('#formulacao');
  if (!formulation) return;

  const headings = formulation.querySelectorAll('.section-heading');

  const mainHeading = headings[0];
  if (mainHeading) {
    const description = mainHeading.querySelector('p:last-child');
    if (description) {
      description.textContent = 'Agora precisamos transformar a descrição do problema em uma representação computacional: definir as situações possíveis, as ações permitidas, as restrições e a condição que indica que o objetivo foi alcançado.';
    }
  }

  const distinctionHeading = headings[1];
  if (distinctionHeading) {
    const eyebrow = distinctionHeading.querySelector('.eyebrow');
    const title = distinctionHeading.querySelector('h2');
    let description = distinctionHeading.querySelector('p:not(.eyebrow)');

    if (eyebrow) eyebrow.textContent = 'Validade e qualidade da solução';
    if (title) title.textContent = 'Uma solução pode estar correta e ainda não ser a melhor';

    if (!description) {
      description = document.createElement('p');
      title?.insertAdjacentElement('afterend', description);
    }

    if (description) {
      description.textContent = 'Primeiro verificamos se o objetivo foi alcançado e se nenhuma restrição foi violada. Depois, se existirem várias soluções válidas, podemos compará-las usando um critério de avaliação.';
    }
  }

  const distinctionCards = formulation.querySelectorAll('.distinction article');
  if (distinctionCards.length >= 3) {
    distinctionCards[0].innerHTML = `
      <h3>Objetivo</h3>
      <p>Define a situação que queremos alcançar.</p>
      <small>Ex.: o robô está no Laboratório.</small>
    `;

    distinctionCards[1].innerHTML = `
      <h3>Critério de sucesso</h3>
      <p>Verifica se encontramos uma solução válida, isto é, se o objetivo foi alcançado sem violar as restrições.</p>
      <small>Ex.: o robô chegou ao Laboratório realizando apenas movimentos permitidos.</small>
    `;

    distinctionCards[2].innerHTML = `
      <h3>Critério de avaliação</h3>
      <p>Permite comparar soluções que já são válidas e decidir qual delas é preferível.</p>
      <small>Ex.: entre dois caminhos possíveis, qual utiliza menos movimentos?</small>
    `;
  }
})();
