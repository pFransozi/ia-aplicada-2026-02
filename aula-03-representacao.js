/* Harmonização final da Aula 03. */
(() => {
  const journeyLabels = [
    'Definição do problema',
    'Abstração do domínio',
    'Formulação do problema',
    'Representação computacional',
    'Espaço de estados',
    'Validação do modelo'
  ];

  document.querySelector('#percurso .section-heading p:last-child')?.remove();
  document.querySelectorAll('#percurso .journey a strong').forEach((label, index) => {
    if (journeyLabels[index]) label.textContent = journeyLabels[index];
  });

  [
    ['#aquecimento .warmup .eyebrow', '01 · Definição do problema'],
    ['#abstracao .section-heading .eyebrow', '02 · Abstração do domínio'],
    ['#formulacao .section-heading .eyebrow', '03 · Formulação do problema'],
    ['#codigo .section-heading .eyebrow', '04 · Representação computacional'],
    ['#espaco .section-heading .eyebrow', '05 · Espaço de estados']
  ].forEach(([selector, text]) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = text;
  });

  const scenario = document.querySelector('.scenario-reworked');
  if (scenario) {
    const eyebrow = scenario.querySelector('.scenario-intro .eyebrow');
    const title = scenario.querySelector('.scenario-intro h2');
    const lead = scenario.querySelector('.scenario-lead');
    const questionTitle = scenario.querySelector('.scenario-question strong');
    const questionText = scenario.querySelector('.scenario-question span');
    const cards = scenario.querySelectorAll('.scenario-summary-card');

    if (eyebrow) eyebrow.textContent = 'Delimitação inicial';
    if (title) title.textContent = 'A descrição da tarefa ainda não constitui uma representação computacional';
    if (lead) lead.textContent = 'A instrução “levar o robô ao laboratório” expressa o problema em linguagem natural. Para que um algoritmo possa operar sobre essa situação, é necessário explicitar quais elementos do domínio serão representados, quais transformações são permitidas e como reconhecer que o objetivo foi alcançado.';
    if (questionTitle) questionTitle.textContent = 'Antes de buscar uma solução, é necessário formular o problema de modo operacional.';
    if (questionText) questionText.textContent = 'Isso implica definir estados, ações, transições, restrições e uma condição de objetivo verificável. Somente depois é possível escolher uma estratégia para explorar o espaço de possibilidades.';

    if (cards.length >= 3) {
      cards[0].innerHTML = '<small>01 · Delimitação da tarefa</small><h3>Qual é o problema a resolver?</h3><p>O robô inicia na <strong>Recepção</strong> e deve alcançar o <strong>Laboratório</strong>, utilizando apenas conexões permitidas entre os ambientes.</p>';
      cards[1].innerHTML = '<small>02 · Elementos do domínio</small><h3>Quais elementos são relevantes?</h3><p>O cenário é composto por ambientes e conexões que determinam as possibilidades de deslocamento do robô.</p>';
      cards[2].innerHTML = '<small>03 · Estrutura necessária</small><h3>A descrição ainda não é um modelo</h3><p>Ainda precisamos explicitar <strong>estado</strong>, <strong>estado inicial</strong>, <strong>ações</strong>, <strong>transições</strong>, <strong>restrições</strong>, <strong>objetivo</strong> e <strong>teste de objetivo</strong>.</p>';
    }
  }

  const mapImage = document.querySelector('.warmup-map-figure img');
  if (mapImage) {
    const lightSrc = 'assets/aula-03-mapa-light.svg';
    const darkSrc = 'assets/aula-03-mapa.svg';
    mapImage.dataset.lightSrc = lightSrc;
    mapImage.dataset.darkSrc = darkSrc;
    mapImage.src = document.body.classList.contains('theme-dark') ? darkSrc : lightSrc;
  }

  const abstractionInquiry = document.querySelector('#abstracao .abstraction-challenge');
  if (abstractionInquiry) {
    abstractionInquiry.innerHTML = `
      <div class="inquiry-head">
        <div><span class="inquiry-kicker">Análise de impacto na representação</span><h3>Uma nova restrição altera quais componentes do modelo?</h3></div>
        <span class="inquiry-tag">Reformule e justifique</span>
      </div>
      <div class="inquiry-body inquiry-body-single">
        <div>
          <div class="challenge-change"><small>Mudança no requisito</small><p>O robô precisa chegar ao <strong>Laboratório</strong>, mas não pode entrar em ambientes cuja <strong>temperatura seja superior a 30 °C</strong>.</p></div>
          <p class="challenge-context"><strong>Objetivo da atividade:</strong> analise o impacto da nova condição sobre a abstração anterior. Não reconstrua todo o modelo; identifique precisamente o que precisa ser modificado e o que pode ser preservado.</p>
          <ol class="prompt-list">
            <li><strong>Relevância da informação.</strong> Explique por que a temperatura, antes descartada, passa a influenciar a validade de uma solução.</li>
            <li><strong>Decisão de modelagem.</strong> Determine se a temperatura deve ser tratada como atributo do ambiente, informação do estado, restrição sobre uma transição ou combinação desses elementos.</li>
            <li><strong>Regra de transição.</strong> Formule as condições que tornam válido o deslocamento para um ambiente vizinho, considerando conectividade e temperatura.</li>
            <li><strong>Consistência do modelo.</strong> Indique quais componentes anteriores permanecem válidos e quais precisam ser ampliados ou reinterpretados.</li>
          </ol>
          <div class="abstraction-takeaway" style="margin:1.25rem 0 0"><strong>Resultado esperado</strong><span>Apresente uma versão revisada do modelo e justifique cada alteração com base no novo requisito.</span></div>
        </div>
      </div>
      <div class="abstraction-takeaway"><strong>Princípio de modelagem</strong><span>Uma mudança de requisito pode alterar a abstração, as restrições e a função de transição sem exigir que todo o modelo seja reconstruído.</span></div>
    `;
  }

  const formulation = document.querySelector('#formulacao');
  if (formulation) {
    const headings = formulation.querySelectorAll('.section-heading');
    const mainHeading = headings[0];
    const steps = formulation.querySelector('.formulation-steps');

    if (mainHeading) {
      const title = mainHeading.querySelector('h2');
      const lead = mainHeading.querySelector('p:last-child');
      if (title) title.textContent = 'Da descrição em linguagem natural à formulação de um problema de busca';
      if (lead) lead.innerHTML = 'Uma tarefa descrita em linguagem natural ainda não fornece a estrutura necessária para um algoritmo de busca. É preciso formular o problema de maneira explícita, definindo <strong>como os estados são representados</strong>, <strong>quais ações podem ser aplicadas</strong>, <strong>como essas ações produzem novos estados</strong> e <strong>como reconhecer que o objetivo foi atingido</strong>.';
    }

    if (steps) {
      if (!formulation.querySelector('.formulation-schema')) {
        steps.insertAdjacentHTML('beforebegin', '<div class="formulation-schema"><div><small>Ponto de partida</small><strong>Estado inicial</strong></div><b>→</b><div><small>Decisões possíveis</small><strong>Ações aplicáveis</strong></div><b>→</b><div><small>Dinâmica</small><strong>Modelo de transição</strong></div><b>→</b><div><small>Novas situações</small><strong>Estados sucessores</strong></div><b>→</b><div><small>Término</small><strong>Teste de objetivo</strong></div></div>');
      }

      steps.innerHTML = `
        <article class="formulation-step"><div class="formulation-step-number">01</div><div class="formulation-step-content"><small>Representação do estado</small><h3>Como uma situação do problema será descrita?</h3><div class="formulation-concepts"><div><strong>Estado</strong><span>Representação das informações necessárias para caracterizar uma situação relevante.</span></div><div><strong>Estado inicial</strong><span>Estado a partir do qual o processo de resolução começa.</span></div></div><div class="formulation-example"><b>No exemplo</b><span><strong>estado = posição atual do robô</strong>; o estado inicial é <strong>Recepção</strong>.</span></div></div></article>
        <article class="formulation-step"><div class="formulation-step-number">02</div><div class="formulation-step-content"><small>Ações e transições</small><h3>Como o sistema pode passar de um estado para outro?</h3><div class="formulation-concepts formulation-concepts-three"><div><strong>Ações</strong><span>Operações aplicáveis a um estado.</span></div><div><strong>Condições de aplicabilidade</strong><span>Determinam quando uma ação pode ser executada validamente.</span></div><div><strong>Modelo de transição</strong><span>Define o estado resultante da execução de uma ação.</span></div></div><div class="formulation-example"><b>No exemplo</b><span><strong>Recepção — ir_para_corredor → Corredor</strong>.</span></div></div></article>
        <article class="formulation-step"><div class="formulation-step-number">03</div><div class="formulation-step-content"><small>Objetivo</small><h3>Como reconhecer que o problema foi resolvido?</h3><div class="formulation-concepts"><div><strong>Estado objetivo</strong><span>Estado que satisfaz a condição desejada.</span></div><div><strong>Teste de objetivo</strong><span>Condição computável que verifica se um estado é objetivo.</span></div></div><div class="formulation-example"><b>No exemplo</b><span><code>estado_atual == "laboratorio"</code>.</span></div></div></article>
        <article class="formulation-step formulation-step-final"><div class="formulation-step-number">04</div><div class="formulation-step-content"><small>Solução</small><h3>O que o algoritmo deverá produzir?</h3><div class="formulation-concepts formulation-concepts-three"><div><strong>Solução</strong><span>Sequência de ações que transforma o estado inicial em um estado objetivo.</span></div><div><strong>Validade</strong><span>Exige transições aplicáveis e respeito às restrições.</span></div><div><strong>Qualidade</strong><span>Permite comparar soluções por um critério de custo.</span></div></div><div class="formulation-example"><b>No exemplo</b><span><strong>Recepção → Corredor → Laboratório</strong>.</span></div></div></article>
      `;

      if (!formulation.querySelector('.formulation-closure')) {
        steps.insertAdjacentHTML('afterend', '<div class="formulation-closure"><strong>Formulação não é estratégia de busca.</strong><span>A formulação determina <em>o que pode ser explorado</em>; a estratégia de busca determina <em>como explorar</em> esse espaço.</span></div>');
      }
    }

    const distinctionHeading = headings[1];
    const cards = formulation.querySelectorAll('.distinction article');
    const note = formulation.querySelector('.note-banner');

    if (distinctionHeading) {
      const eyebrow = distinctionHeading.querySelector('.eyebrow');
      const title = distinctionHeading.querySelector('h2');
      let text = distinctionHeading.querySelector('p:not(.eyebrow)');
      if (eyebrow) eyebrow.textContent = 'Validade e custo da solução';
      if (title) title.textContent = 'Uma solução pode ser válida sem ser ótima';
      if (!text && title) {
        text = document.createElement('p');
        title.insertAdjacentElement('afterend', text);
      }
      if (text) text.textContent = 'Encontrar um estado objetivo não encerra toda a análise de uma solução. Primeiro verificamos se existe uma sequência válida de ações que leva do estado inicial a um estado objetivo. Quando existem múltiplas soluções válidas, podemos compará-las por meio de uma função de custo.';
    }

    if (cards.length >= 3) {
      cards[0].innerHTML = '<h3>Teste de objetivo</h3><p>Verifica se um estado satisfaz a condição de término definida para o problema.</p><small>No exemplo: <code>estado_atual == "laboratorio"</code></small>';
      cards[1].innerHTML = '<h3>Solução válida</h3><p>É uma sequência de ações aplicáveis que conduz do estado inicial a um estado objetivo sem violar as restrições.</p><small>No exemplo: Recepção → Corredor → Laboratório.</small>';
      cards[2].innerHTML = '<h3>Custo da solução</h3><p>Associa um valor a uma solução e permite comparar diferentes caminhos válidos.</p><small>Ex.: movimentos, distância, tempo ou consumo de energia.</small>';
    }

    if (note) {
      note.classList.add('search-formulation-summary');
      note.innerHTML = '<p class="search-formulation-main"><strong>Formulação clássica de um problema de busca:</strong> especificamos o <strong>estado inicial</strong>, as <strong>ações aplicáveis</strong>, o <strong>modelo de transição</strong>, o <strong>teste de objetivo</strong> e, quando pertinente, uma <strong>função de custo</strong>. Esses elementos definem o problema; a estratégia de busca determina como o espaço será explorado.</p><p class="optimality-note">Uma solução de menor custo é <strong>ótima em relação ao critério adotado</strong>; portanto, “melhor solução” depende da função de custo definida.</p>';
    }
  }

  const representation = document.querySelector('#representacao .section-heading');
  if (representation) {
    const eyebrow = representation.querySelector('.eyebrow');
    if (eyebrow) eyebrow.textContent = '06 · Validação do modelo';
  }

  const activityContainer = document.querySelector('#atividade .container');
  if (activityContainer) {
    activityContainer.innerHTML = `
      <div class="section-heading">
        <p class="eyebrow">Aplicação integrada</p>
        <h2>Percorra o ciclo completo em um novo problema</h2>
        <p>Escolha um dos casos abaixo e produza uma formulação que outra pessoa consiga compreender e implementar sem depender da descrição original. O foco é justificar decisões de modelagem, não preencher um formulário.</p>
      </div>

      <div class="case-options">
        <article class="case-card"><span aria-hidden="true">🧩</span><small>Opção A</small><h4>Labirinto</h4><p>Um personagem precisa sair da entrada e alcançar a saída utilizando apenas movimentos permitidos.</p></article>
        <article class="case-card"><span aria-hidden="true">📦</span><small>Opção B</small><h4>Coleta e entrega</h4><p>Um robô precisa coletar um objeto em um local e entregá-lo em outro, respeitando as condições do domínio.</p></article>
        <article class="case-card"><span aria-hidden="true">🚉</span><small>Opção C</small><h4>Transporte</h4><p>Um passageiro precisa deslocar-se de uma estação inicial até um destino usando conexões disponíveis.</p></article>
        <article class="case-card"><span aria-hidden="true">📋</span><small>Opção D</small><h4>Tarefas com dependências</h4><p>Um conjunto de tarefas deve ser concluído respeitando relações de precedência entre elas.</p></article>
      </div>

      <div class="integrated-activity-brief">
        <strong>Produto da atividade</strong>
        <span>Em uma folha, quadro ou arquivo do grupo, construa um único modelo organizado nas seis etapas abaixo. Cada decisão deve ser acompanhada de pelo menos um exemplo concreto.</span>
      </div>

      <article class="inquiry integrated-cycle">
        <div class="inquiry-head">
          <div><span class="inquiry-kicker">Etapa 1 · Modelagem técnica</span><h3>Construa uma formulação completa e verificável</h3></div>
          <span class="inquiry-tag">Sem consultar IA nesta etapa</span>
        </div>

        <div class="integrated-cycle-grid">
          <article class="integrated-step">
            <span class="integrated-step-number">01</span>
            <div><small>Definição do problema</small><h3>Delimite exatamente o que deve ser resolvido</h3>
              <ul><li>Identifique o ponto de partida e a condição que caracteriza o término.</li><li>Retire da descrição elementos que não alteram a tarefa.</li></ul>
              <p class="integrated-deliverable"><strong>Entregue:</strong> uma frase de especificação do problema, acompanhada do estado inicial e do objetivo.</p>
            </div>
          </article>

          <article class="integrated-step">
            <span class="integrated-step-number">02</span>
            <div><small>Abstração do domínio</small><h3>Decida o que precisa entrar no modelo</h3>
              <ul><li>Selecione as informações necessárias para distinguir situações relevantes.</li><li>Indique pelo menos dois elementos do mundo real que podem ser omitidos e justifique a exclusão.</li></ul>
              <p class="integrated-deliverable"><strong>Entregue:</strong> elementos representados, elementos omitidos e a justificativa de relevância.</p>
            </div>
          </article>

          <article class="integrated-step">
            <span class="integrated-step-number">03</span>
            <div><small>Formulação do problema</small><h3>Defina a dinâmica sobre a qual a busca poderia operar</h3>
              <ul><li>Especifique a representação de estado, as ações aplicáveis e o modelo de transição.</li><li>Defina restrições, teste de objetivo e, quando fizer sentido, uma função de custo.</li></ul>
              <p class="integrated-deliverable"><strong>Entregue:</strong> dois estados concretos e pelo menos uma transição escrita no formato <code>estado — ação → novo estado</code>.</p>
            </div>
          </article>

          <article class="integrated-step">
            <span class="integrated-step-number">04</span>
            <div><small>Representação computacional</small><h3>Escolha estruturas capazes de codificar o modelo</h3>
              <ul><li>Indique como estados, conexões, ações e objetivo seriam representados em Python.</li><li>Use estruturas adequadas ao domínio, como strings, tuplas, conjuntos, listas ou dicionários.</li></ul>
              <p class="integrated-deliverable"><strong>Entregue:</strong> um pequeno exemplo de estado e da estrutura que representa uma transição ou relação de sucessores. Não implemente o algoritmo de busca.</p>
            </div>
          </article>

          <article class="integrated-step">
            <span class="integrated-step-number">05</span>
            <div><small>Espaço de estados</small><h3>Mostre quais possibilidades a formulação produz</h3>
              <ul><li>Represente os estados como nós e as transições válidas como arestas, ou use uma tabela de sucessores equivalente.</li><li>Destaque um caminho válido do estado inicial até um estado objetivo.</li></ul>
              <p class="integrated-deliverable"><strong>Entregue:</strong> o grafo completo, se o problema for pequeno, ou um recorte representativo com estados e transições suficientes para demonstrar o modelo.</p>
            </div>
          </article>

          <article class="integrated-step integrated-step-validation">
            <span class="integrated-step-number">06</span>
            <div><small>Validação do modelo</small><h3>Teste se a representação continua adequada quando o requisito muda</h3>
              <ul><li>Introduza uma pequena mudança: bloqueio, custo, recurso, capacidade ou nova dependência.</li><li>Identifique o que precisa ser alterado no estado, nas ações, nas transições ou no teste de objetivo — e o que permanece válido.</li></ul>
              <p class="integrated-deliverable"><strong>Entregue:</strong> uma alteração no requisito e uma justificativa técnica das mudanças necessárias no modelo.</p>
            </div>
          </article>
        </div>

        <div class="integrated-quality">
          <div><span class="inquiry-kicker">Critérios de qualidade</span><h3>Antes de apresentar, audite a própria formulação</h3></div>
          <div class="integrated-quality-grid">
            <div><strong>Suficiência</strong><span>O estado distingue todas as situações que podem alterar decisões ou a validade da solução?</span></div>
            <div><strong>Precisão</strong><span>Ações, condições de aplicabilidade e transições estão definidas sem ambiguidade?</span></div>
            <div><strong>Verificabilidade</strong><span>O teste de objetivo pode ser avaliado diretamente a partir de um estado?</span></div>
            <div><strong>Abstração</strong><span>O modelo evita informações que não influenciam a resolução do problema?</span></div>
            <div><strong>Consistência</strong><span>O caminho apresentado respeita as restrições e realmente leva ao objetivo?</span></div>
            <div><strong>Custo</strong><span>Se houver várias soluções, o critério de comparação está claramente definido?</span></div>
          </div>
        </div>

        <div class="integrated-presentation">
          <strong>Apresentação do grupo · 3 minutos</strong>
          <span>Explique o problema, mostre um estado, uma transição, um caminho válido, uma decisão de abstração e o resultado do teste de mudança de requisito. O objetivo é demonstrar que a representação é operacional, e não apenas listar definições.</span>
        </div>
      </article>

      <article class="inquiry" id="ia-critica">
        <div class="inquiry-head">
          <div><span class="inquiry-kicker">Etapa 2 · Auditoria com IA</span><h3>Compare formulações e procure falhas de modelagem</h3></div>
          <span class="inquiry-tag">IA como hipótese para revisão</span>
        </div>
        <div class="ai-audit-intro">
          <p>Somente depois de concluir o modelo do grupo, peça a uma ferramenta de IA generativa que formule o mesmo problema. Solicite explicitamente: representação de estado, estado inicial, ações aplicáveis, modelo de transição, restrições, teste de objetivo e função de custo, quando pertinente.</p>
        </div>
        <div class="ai-audit-grid">
          <article><span>01</span><div><strong>Compare as representações de estado</strong><p>A IA distingue as mesmas situações que o grupo? Ela omitiu alguma variável necessária ou adicionou informação irrelevante?</p></div></article>
          <article><span>02</span><div><strong>Audite ações e transições</strong><p>Procure ações impossíveis, condições de aplicabilidade ausentes e transições que não correspondam às regras do domínio.</p></div></article>
          <article><span>03</span><div><strong>Verifique objetivo, restrições e custo</strong><p>O teste de objetivo é computável? As restrições são suficientes? A função de custo realmente expressa o que significa uma solução preferível?</p></div></article>
          <article><span>04</span><div><strong>Decida o que revisar</strong><p>Escolha pelo menos uma diferença entre as duas propostas. Aceite ou rejeite a sugestão da IA com uma justificativa baseada no modelo, não na autoridade da ferramenta.</p></div></article>
        </div>
        <div class="ai-audit-output"><strong>Resultado esperado</strong><span>Uma versão final do modelo acompanhada de uma justificativa curta: o que foi mantido, o que foi corrigido e por quê.</span></div>
      </article>
    `;
  }

  const style = document.createElement('style');
  style.textContent = `
    body:not(.theme-dark) .warmup-map-figure{border-color:var(--line);background:#fff;box-shadow:0 12px 30px rgba(35,50,78,.06)}
    .formulation-schema{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr) auto minmax(0,1fr);gap:.55rem;align-items:center;margin:0 0 1.2rem;padding:1rem;border:1px solid var(--line);border-radius:18px;background:var(--soft)}
    .formulation-schema>div{text-align:center}.formulation-schema small,.formulation-schema strong{display:block}.formulation-schema small{color:var(--muted);font-size:.66rem;text-transform:uppercase}.formulation-schema>b{color:var(--blue)}
    .formulation-closure{display:grid;grid-template-columns:auto 1fr;gap:.7rem;margin-top:1.25rem;padding:1rem 1.1rem;border-left:4px solid var(--teal);background:var(--teal-soft)}.formulation-closure strong{color:var(--teal)}
    #formulacao .distinction code{padding:.12rem .32rem;border-radius:6px;background:var(--soft);color:var(--ink)}
    #formulacao .search-formulation-summary{display:block;line-height:1.6}#formulacao .search-formulation-main{margin:0;color:var(--muted)}#formulacao .search-formulation-main strong{color:var(--ink)}#formulacao .optimality-note{display:block;margin:.7rem 0 0;padding-top:.7rem;border-top:1px solid var(--line);color:var(--muted)}
    body.theme-dark .formulation-schema{background:#111a2b}body.theme-dark .formulation-closure{background:#0f2b2a}

    #atividade .integrated-activity-brief{display:grid;grid-template-columns:auto minmax(0,1fr);gap:.55rem .9rem;align-items:start;margin:1rem 0 1.5rem;padding:1rem 1.1rem;border-left:4px solid var(--blue);border-radius:0 14px 14px 0;background:var(--blue-soft)}
    #atividade .integrated-activity-brief strong{color:var(--blue);white-space:nowrap}#atividade .integrated-activity-brief span{color:var(--muted);line-height:1.5}
    #atividade .integrated-cycle{margin-top:1.25rem}.integrated-cycle-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;padding:1.35rem}
    .integrated-step{display:grid;grid-template-columns:44px minmax(0,1fr);gap:.85rem;padding:1.05rem;border:1px solid var(--line);border-radius:17px;background:var(--paper)}
    .integrated-step-number{display:grid;place-items:center;width:42px;height:42px;border-radius:12px;background:var(--blue-soft);color:var(--blue);font-size:.76rem;font-weight:900}
    .integrated-step small{display:block;margin:0 0 .28rem;color:var(--blue);font-size:.68rem;font-weight:850;letter-spacing:.07em;text-transform:uppercase}.integrated-step h3{margin:0 0 .6rem;font-size:1rem}.integrated-step ul{margin:.1rem 0 .8rem;padding-left:1.15rem;color:var(--muted);font-size:.86rem;line-height:1.5}.integrated-step li+li{margin-top:.28rem}
    .integrated-deliverable{margin:0;padding-top:.72rem;border-top:1px solid var(--line);color:var(--muted);font-size:.82rem;line-height:1.45}.integrated-deliverable strong{color:var(--ink)}.integrated-deliverable code{padding:.12rem .3rem;border-radius:6px;background:var(--soft);color:var(--ink)}
    .integrated-step-validation{border-color:#a9ddd5;background:linear-gradient(145deg,var(--teal-soft),var(--paper))}.integrated-step-validation .integrated-step-number{background:#dff4f0;color:var(--teal)}.integrated-step-validation small{color:var(--teal)}
    .integrated-quality{margin:0 1.35rem 1.2rem;padding:1.15rem;border:1px solid var(--line);border-radius:17px;background:var(--soft)}.integrated-quality h3{margin:.2rem 0 1rem}.integrated-quality-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.integrated-quality-grid>div{padding:.85rem;border:1px solid var(--line);border-radius:13px;background:var(--paper)}.integrated-quality-grid strong,.integrated-quality-grid span{display:block}.integrated-quality-grid strong{margin-bottom:.25rem;color:var(--ink);font-size:.84rem}.integrated-quality-grid span{color:var(--muted);font-size:.77rem;line-height:1.4}
    .integrated-presentation{display:grid;grid-template-columns:auto minmax(0,1fr);gap:.6rem .9rem;margin:0 1.35rem 1.35rem;padding:1rem 1.1rem;border:1px solid #a9ddd5;border-radius:15px;background:var(--teal-soft)}.integrated-presentation strong{color:var(--teal);white-space:nowrap}.integrated-presentation span{color:var(--ink);line-height:1.5}
    #atividade #ia-critica{margin-top:1.5rem}.ai-audit-intro{padding:1.2rem 1.35rem 0}.ai-audit-intro p{margin:0;color:var(--muted);line-height:1.55}.ai-audit-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;padding:1.2rem 1.35rem}.ai-audit-grid article{display:grid;grid-template-columns:38px minmax(0,1fr);gap:.75rem;padding:1rem;border:1px solid var(--line);border-radius:15px;background:var(--paper)}.ai-audit-grid article>span{display:grid;place-items:center;width:36px;height:36px;border-radius:11px;background:var(--violet-soft);color:var(--violet);font-size:.72rem;font-weight:900}.ai-audit-grid strong{display:block;margin-bottom:.3rem;color:var(--ink)}.ai-audit-grid p{margin:0;color:var(--muted);font-size:.84rem;line-height:1.45}.ai-audit-output{display:grid;grid-template-columns:auto minmax(0,1fr);gap:.55rem .85rem;margin:0 1.35rem 1.35rem;padding:1rem;border-left:4px solid var(--violet);border-radius:0 13px 13px 0;background:var(--violet-soft)}.ai-audit-output strong{color:var(--violet)}.ai-audit-output span{color:var(--ink);line-height:1.45}
    body.theme-dark #atividade .integrated-activity-brief{background:#111a2b}body.theme-dark .integrated-step,body.theme-dark .integrated-quality-grid>div,body.theme-dark .ai-audit-grid article{background:#172033;border-color:var(--line)}body.theme-dark .integrated-step-validation{background:#0f2b2a;border-color:#245d59}body.theme-dark .integrated-quality{background:#111a2b;border-color:var(--line)}body.theme-dark .integrated-presentation{background:#0f2b2a;border-color:#245d59}body.theme-dark .ai-audit-output{background:#201a3a}
    @media(max-width:980px){.formulation-schema{grid-template-columns:1fr}.formulation-schema>div{text-align:left}.formulation-schema>b{transform:rotate(90deg);justify-self:start}.integrated-quality-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:760px){.integrated-cycle-grid,.ai-audit-grid,.integrated-quality-grid{grid-template-columns:1fr}.integrated-step{grid-template-columns:1fr}.integrated-presentation,#atividade .integrated-activity-brief,.ai-audit-output{grid-template-columns:1fr}.integrated-presentation strong,#atividade .integrated-activity-brief strong{white-space:normal}}
    @media(max-width:640px){.formulation-closure{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);
})();