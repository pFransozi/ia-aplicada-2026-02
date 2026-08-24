(() => {
  const root = document.querySelector('[data-guided-search]');
  if (!root) return;

  const css = `
    #visao .overview-grid{grid-template-columns:minmax(0,1.15fr) minmax(300px,.85fr);align-items:start;gap:22px}#visao .topics-card{grid-row:auto!important}#visao .competency-stack{display:grid;gap:14px;align-content:start}#visao .competency-stack .competency{align-self:start;min-height:0;padding:1.15rem 1.25rem}#visao .competency-stack .c11{grid-column:auto!important}
    .formalization-compare,.python-formalization-grid,.heuristic-decision-grid,.heuristic-areas-grid,.romania-summary-grid,.romania-reading-grid,.guided-status-grid{display:grid;gap:14px}.formalization-compare,.python-formalization-grid,.heuristic-decision-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.heuristic-areas-grid,.romania-summary-grid,.romania-reading-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.guided-status-grid{grid-template-columns:repeat(4,minmax(0,1fr))}
    .formalization-card,.formalization-mini-example,.python-formalization-card,.heuristic-frontier-card,.algorithm-choice-card,.heuristic-explainer-card,.heuristic-python-card,.heuristic-area-card,.concept-anchor-card,.romania-summary-card,.romania-reading-grid article{border:1px solid var(--line);border-radius:20px;background:var(--paper);box-shadow:var(--shadow);padding:1.2rem}.formalization-card h3,.formalization-mini-example h3,.python-formalization-card h3,.heuristic-frontier-card h3,.algorithm-choice-card h3,.heuristic-explainer-card h3,.heuristic-python-card h3,.heuristic-area-card h3,.concept-anchor-card h3{margin:0 0 .7rem}.formalization-mini-example,.python-formalization-grid,.heuristic-frontier-card,.heuristic-decision-grid,.heuristic-python-card,.heuristic-explainer-card,.heuristic-areas-grid{margin-top:1.1rem}
    .formalization-map-figure{margin:1.2rem 0 1.35rem}.formalization-map-figure img{display:block;width:100%;max-width:1120px;margin:0 auto;border:1px solid var(--line);border-radius:18px;background:#fff;box-shadow:0 14px 35px rgba(35,50,78,.12)}.formalization-map-figure figcaption{max-width:1120px;margin:.75rem auto 0;color:var(--muted);font-size:.92rem;line-height:1.55}.formalization-list{display:grid;gap:.65rem;margin:0;padding:0;list-style:none}.formalization-list li,.algorithm-choice-card li,.concept-anchor-grid article,.romania-summary-grid article{padding:.9rem;border:1px solid var(--line);border-radius:15px;background:var(--soft)}.formalization-list strong,.formalization-list span,.romania-summary-grid strong,.romania-summary-grid span,.heuristic-area-card span{display:block}.formalization-list span,.romania-summary-grid span,.heuristic-area-card span{margin-top:.28rem;color:var(--muted)}
    .formalization-table-wrap,.heuristic-table-wrap{overflow-x:auto;margin-top:1rem}.formalization-table,.heuristic-frontier-table{width:100%;border-collapse:collapse}.formalization-table th,.formalization-table td,.heuristic-frontier-table th,.heuristic-frontier-table td{padding:.75rem;border:1px solid var(--line);text-align:left;vertical-align:top}.formalization-table th,.heuristic-frontier-table th{background:var(--soft)}.heuristic-frontier-table th:nth-child(n+2),.heuristic-frontier-table td:nth-child(n+2){text-align:center}.heuristic-frontier-table small{color:var(--muted);font-size:.78rem;font-weight:650}
    .python-formalization-card p,.heuristic-python-card p{margin:0 0 .75rem;color:var(--muted)}.python-formalization-card pre,.heuristic-python-card pre{margin:0;padding:1rem;overflow-x:auto;border-radius:14px;background:#091224;border:1px solid #21304a}.python-formalization-card code,.heuristic-python-card code{font-family:var(--font-mono,'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace);font-size:.9rem;line-height:1.55;color:#eef4ff;white-space:pre}
    #heuristica .formula-card{display:flex;flex-direction:column;gap:.75rem}.heuristic-card-note,.formula-line{margin-top:.9rem;padding:.85rem;border:1px solid var(--line);border-radius:14px;background:var(--soft);color:var(--ink);line-height:1.45}.heuristic-card-note strong,.formula-line strong{color:var(--blue)}.heuristic-callout .concept-icon{min-width:5.4rem;padding:.65rem .75rem;font-size:clamp(1.6rem,3vw,2.4rem);line-height:1;white-space:nowrap;letter-spacing:-.04em}.heuristic-frontier-card{border-left:5px solid var(--violet)}.heuristic-explainer-card{border-left:5px solid var(--blue)}.algorithm-choice-card{display:grid;align-content:start;gap:.75rem}.choice-rule{display:inline-flex;width:max-content;max-width:100%;padding:.35rem .65rem;border-radius:999px;background:var(--soft);border:1px solid var(--line);font-weight:850}.algorithm-choice-card ul{display:grid;gap:.55rem;margin:0;padding:0;list-style:none}.choice-result{padding:.8rem;border-radius:14px;background:rgba(14,165,233,.12);border:1px solid rgba(14,165,233,.25);font-weight:900;color:var(--blue)}.heuristic-area-card small{color:var(--blue);font-weight:850;letter-spacing:.06em;text-transform:uppercase}.concept-anchor-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:1rem}.concept-anchor-grid strong,.concept-anchor-grid span{display:block}.concept-anchor-grid span{margin-top:.35rem;color:var(--muted);font-size:.92rem}
    .guided-simulator{grid-template-columns:1fr}.guided-graph-card,.guided-control-card{width:100%}.romania-summary{min-height:0!important;padding:0;border:0;background:transparent;overflow:visible}.romania-reading-grid{margin-top:1.4rem}.romania-reading-grid article{padding:1.1rem}.romania-reading-grid small{color:var(--blue);font-weight:850;letter-spacing:.06em;text-transform:uppercase}.romania-reading-grid h3{margin:.75rem 0 .45rem}.romania-reading-grid p{margin:0}
    body.theme-dark .formalization-map-figure img{background:#fff;border-color:#40506b}body.theme-dark .formalization-card,body.theme-dark .formalization-mini-example,body.theme-dark .python-formalization-card,body.theme-dark .heuristic-frontier-card,body.theme-dark .algorithm-choice-card,body.theme-dark .heuristic-explainer-card,body.theme-dark .heuristic-python-card,body.theme-dark .heuristic-area-card,body.theme-dark .concept-anchor-card,body.theme-dark .concept-anchor-grid article,body.theme-dark .romania-summary-card,body.theme-dark .romania-summary-grid article,body.theme-dark .romania-reading-grid article{background:var(--paper);border-color:var(--line)}body.theme-dark .formalization-list li,body.theme-dark .formalization-table th,body.theme-dark .heuristic-frontier-table th,body.theme-dark .algorithm-choice-card li,body.theme-dark .heuristic-card-note,body.theme-dark .formula-line{background:var(--soft)}@media(max-width:980px){#visao .overview-grid,.formalization-compare,.python-formalization-grid,.heuristic-decision-grid,.heuristic-areas-grid,.concept-anchor-grid,.romania-summary-grid,.romania-reading-grid,.guided-status-grid{grid-template-columns:1fr}}
  `;
  if (!document.getElementById('aula05-ajustes-finais')) {
    const s = document.createElement('style');
    s.id = 'aula05-ajustes-finais';
    s.textContent = css;
    document.head.appendChild(s);
  }

  const organizeTopicList = () => {
    const list = document.querySelector('#visao .topic-list');
    if (!list || list.dataset.ordered === 'true') return;
    const topics = ['Busca informada','Função heurística h(n)','Busca gulosa','Custo acumulado g(n)','Função f(n) = g(n) + h(n)','Algoritmo A*','Admissibilidade','Comparação de estratégias'];
    list.innerHTML = topics.map((topic) => `<div>${topic}</div>`).join('');
    list.dataset.ordered = 'true';
  };

  const compactCompetencyCards = () => {
    const overview = document.querySelector('#visao .overview-grid');
    if (!overview || overview.querySelector('.competency-stack')) return;
    const cards = [...overview.querySelectorAll(':scope > article.competency')];
    if (!cards.length) return;
    const stack = document.createElement('div');
    stack.className = 'competency-stack';
    cards[0].before(stack);
    cards.forEach((card) => stack.appendChild(card));
  };

  const insertFormalizationSection = () => {
    const percurso = document.querySelector('#percurso');
    if (!percurso || document.querySelector('#formalizacao-informada')) return;
    percurso.insertAdjacentHTML('afterend', `
      <section class="section section-soft formalization-section" id="formalizacao-informada"><div class="container">
        <div class="section-heading"><p class="eyebrow">Formulação do problema</p><h2>O que muda quando a busca passa a usar heurística?</h2><p>Antes de falar de algoritmo, precisamos ajustar a descrição do problema. Na busca não informada, o algoritmo enxerga apenas a estrutura do espaço de estados. Na busca informada, a mesma formulação precisa carregar custos e uma estimativa de proximidade do objetivo.</p></div>
        <figure class="formalization-map-figure"><img src="assets/mapa-romenia-russell-norvig-fig-3-1.png" alt="Mapa simplificado de parte da Romênia, com cidades conectadas por estradas e distâncias entre elas." loading="lazy"><figcaption><strong>Problema de referência da aula.</strong> Vamos usar o mapa da Romênia para contextualizar a mudança de formulação: de um grafo usado por BFS/DFS para um problema de busca informada, com custos e heurística.</figcaption></figure>
        <div class="formalization-compare"><article class="formalization-card"><h3>Como ficava na Aula 04</h3><ul class="formalization-list"><li><strong>Estado inicial</strong><span>Arad.</span></li><li><strong>Objetivo</strong><span>Chegar a Bucharest.</span></li><li><strong>Sucessores</strong><span>Cidades diretamente conectadas por estradas.</span></li><li><strong>Critério de expansão</strong><span>Fila no BFS ou pilha no DFS.</span></li></ul></article><article class="formalization-card"><h3>Como precisa ficar na Aula 05</h3><ul class="formalization-list"><li><strong>Custo da ação</strong><span>Distância de cada estrada, como Arad → Sibiu = 140.</span></li><li><strong>Custo acumulado g(n)</strong><span>Quanto já foi gasto do início até o estado atual.</span></li><li><strong>Heurística h(n)</strong><span>Estimativa de quanto falta em linha reta de cada cidade até Bucharest.</span></li><li><strong>Prioridade</strong><span>Menor h(n) na gulosa; menor g(n)+h(n) no A*.</span></li></ul></article></div>
        <div class="formalization-mini-example"><h3>Exemplo rápido no mapa da Romênia</h3><p>Ao chegar em Sibiu, duas alternativas importantes aparecem. Fagaras parece um pouco mais próxima do destino pela heurística, mas Rimnicu Vilcea tem menor custo total estimado quando somamos o que já foi gasto com o que ainda parece faltar.</p><div class="formalization-table-wrap"><table class="formalization-table"><thead><tr><th>Alternativa</th><th>g(n)</th><th>h(n)</th><th>g(n)+h(n)</th><th>Leitura</th></tr></thead><tbody><tr><td>Fagaras</td><td>239</td><td>176</td><td>415</td><td>Boa pela heurística, mas com custo acumulado maior.</td></tr><tr><td>Rimnicu Vilcea</td><td>220</td><td>193</td><td>413</td><td>Menos atraente pela heurística isolada, mas melhor para A*.</td></tr></tbody></table></div></div>
        <div class="python-formalization-grid"><article class="python-formalization-card"><h3>Antes: Python para BFS/DFS</h3><p>O problema podia ser descrito apenas como conexões entre estados. O algoritmo decidia a ordem pela estrutura da fronteira.</p><pre><code>estado_inicial = "Arad"
objetivo = "Bucharest"

mapa = {
    "Arad": ["Zerind", "Sibiu", "Timisoara"],
    "Sibiu": ["Arad", "Fagaras", "Rimnicu Vilcea", "Oradea"],
    "Fagaras": ["Sibiu", "Bucharest"],
    "Rimnicu Vilcea": ["Sibiu", "Pitesti", "Craiova"],
}

# BFS: fronteira como fila
# DFS: fronteira como pilha</code></pre></article><article class="python-formalization-card"><h3>Agora: Python com heurística</h3><p>O problema passa a carregar custo real das ações e uma estimativa h(n), permitindo busca gulosa e A*.</p><pre><code>estado_inicial = "Arad"
objetivo = "Bucharest"

mapa = {
    "Arad": [("Zerind", 75), ("Sibiu", 140), ("Timisoara", 118)],
    "Sibiu": [("Arad", 140), ("Fagaras", 99), ("Rimnicu Vilcea", 80)],
    "Fagaras": [("Sibiu", 99), ("Bucharest", 211)],
    "Rimnicu Vilcea": [("Sibiu", 80), ("Pitesti", 97), ("Craiova", 146)],
}

# h(n): estimativa de distância em linha reta até Bucharest.
heuristica = {
    "Arad": 366,
    "Bucharest": 0,
    "Craiova": 160,
    "Drobeta": 242,
    "Eforie": 161,
    "Fagaras": 176,
    "Giurgiu": 77,
    "Hirsova": 151,
    "Iasi": 226,
    "Lugoj": 244,
    "Mehadia": 241,
    "Neamt": 234,
    "Oradea": 380,
    "Pitesti": 100,
    "Rimnicu Vilcea": 193,
    "Sibiu": 253,
    "Timisoara": 329,
    "Urziceni": 80,
    "Vaslui": 199,
    "Zerind": 374,
}

# Gulosa: prioridade = h(n)
# A*: prioridade = g(n) + h(n)</code></pre></article></div>
      </div></section>`);
  };

  const updateBridgeText = () => {
    const p = document.querySelector('#ponte .warmup h2 + p');
    if (p) p.textContent = 'BFS e DFS não usam pistas sobre o destino. Eles apenas seguem a regra da estrutura: fila no BFS, pilha no DFS. A busca informada muda isso ao acrescentar uma estimativa de proximidade do objetivo.';
  };

  const updateHeuristicIntroCards = () => {
    const cards = document.querySelectorAll('#heuristica .formula-card');
    if (cards.length < 2 || cards[0].dataset.didactic === 'true') return;
    cards[0].dataset.didactic = 'true';
    cards[0].innerHTML = `<span>Função heurística</span><strong>h(n)</strong><p>Recebe um estado <em>n</em> e devolve uma estimativa do quanto ainda falta para chegar ao objetivo.</p><div class="heuristic-card-note"><strong>Leitura:</strong> quanto menor h(n), mais promissor o estado parece. Isso não quer dizer que ele esteja no caminho mais barato.</div>`;
    cards[1].innerHTML = `<span>Exemplo em rotas</span><strong>h(cidade) ≈ linha reta até o destino</strong><p>No mapa da Romênia, h(cidade) estima a distância direta até Bucharest. Ela não soma as estradas do caminho; é uma pista para comparar alternativas rapidamente.</p><div class="heuristic-card-note"><strong>Exemplo:</strong> h(Oradea)=380 estima a distância direta até Bucharest. O custo real por estradas é calculado separadamente em g(n).</div>`;
  };

  const updateHeuristicCallout = () => {
    const callout = document.querySelector('#heuristica .heuristic-callout');
    if (!callout || callout.dataset.didactic === 'true') return;
    callout.dataset.didactic = 'true';
    const icon = callout.querySelector('.concept-icon');
    const title = callout.querySelector('h3');
    const intro = callout.querySelector('.search-concept-intro');
    if (icon) icon.textContent = 'h(n)';
    if (title) title.textContent = 'O que esse número quer dizer?';
    if (intro) intro.innerHTML = `Para cada estado, <strong>h(n)</strong> responde a uma pergunta simples: <em>quanto parece faltar até o objetivo?</em> No mapa da Romênia, esse valor vem da distância em linha reta até Bucharest. Ele ajuda a escolher uma direção de busca, mas não é o custo real da rota por estradas.`;
    const principles = callout.querySelector('.heuristic-principles');
    if (principles) principles.innerHTML = `<article><strong>É uma estimativa</strong><span>Pode aproximar bem, mas não precisa coincidir com o caminho real.</span></article><article><strong>Compara estados</strong><span>Permite ordenar alternativas como Sibiu, Fagaras ou Oradea.</span></article><article><strong>Não substitui g(n)</strong><span>O custo real já percorrido continua sendo calculado separadamente.</span></article><article><strong>Depende do domínio</strong><span>Em rotas, linha reta faz sentido; em outros problemas, a pista precisa mudar.</span></article>`;
  };

  const enhanceHeuristicSection = () => {
    const container = document.querySelector('#heuristica .container');
    const callout = container?.querySelector('.heuristic-callout');
    if (!container || !callout || container.querySelector('.heuristic-frontier-card')) return;
    callout.insertAdjacentHTML('afterend', `
      <div class="heuristic-explainer-card"><h3>Heurística orienta a busca, mas não decide sozinha</h3><p>Use h(n) como uma régua aproximada: ela indica qual estado parece mais perto do objetivo. Depois, o algoritmo ainda precisa decidir se vai confiar apenas nessa pista, como na busca gulosa, ou se vai combiná-la com o custo já pago, como no A*.</p><div class="formula-line"><strong>No código da Romênia:</strong> h("Oradea") = 380 é uma estimativa direta até Bucharest. Já o custo por estradas entra em g(n), somando trechos como Oradea → Sibiu → Rimnicu Vilcea.</div></div>
      <div class="heuristic-frontier-card"><h3>A mesma fronteira, duas formas de escolher</h3><p>Imagine que a busca chegou a <strong>Sibiu</strong>. A fronteira contém duas alternativas importantes. Antes do código, olhe para os números que cada estratégia enxerga.</p><div class="heuristic-table-wrap"><table class="heuristic-frontier-table"><thead><tr><th>Cidade candidata</th><th>g(n)<br><small>custo já pago</small></th><th>h(n)<br><small>estimativa restante</small></th><th>g(n)+h(n)</th></tr></thead><tbody><tr><td>Fagaras</td><td>239</td><td>176</td><td>415</td></tr><tr><td>Rimnicu Vilcea</td><td>220</td><td>193</td><td>413</td></tr></tbody></table></div><div class="formula-line"><strong>Leitura:</strong> Fagaras parece mais perto pela heurística. Rimnicu Vilcea fica melhor quando consideramos o custo já pago mais a estimativa restante.</div></div>
      <div class="heuristic-decision-grid"><article class="algorithm-choice-card"><h3>Busca gulosa</h3><span class="choice-rule">prioridade = h(n)</span><ul><li>Fagaras: h=176</li><li>Rimnicu Vilcea: h=193</li></ul><div class="choice-result">Escolha: Fagaras</div><p>A gulosa escolhe quem parece mais perto do objetivo agora.</p></article><article class="algorithm-choice-card"><h3>A*</h3><span class="choice-rule">prioridade = g(n)+h(n)</span><ul><li>Fagaras: 239 + 176 = 415</li><li>Rimnicu Vilcea: 220 + 193 = 413</li></ul><div class="choice-result">Escolha: Rimnicu Vilcea</div><p>O A* equilibra o custo já pago com o que ainda parece faltar.</p></article></div>
      <article class="heuristic-python-card"><h3>Depois da comparação, o código fica pequeno</h3><p>O código abaixo só transforma a tabela em uma regra de escolha.</p><pre><code>fronteira = [
    {"cidade": "Fagaras", "g": 239, "h": 176},
    {"cidade": "Rimnicu Vilcea", "g": 220, "h": 193},
]

# Busca gulosa: usa apenas h(n)
escolha_gulosa = min(fronteira, key=lambda estado: estado["h"])

# A*: usa g(n) + h(n)
escolha_astar = min(fronteira, key=lambda estado: estado["g"] + estado["h"])

print("Gulosa escolhe:", escolha_gulosa["cidade"])
print("A* escolhe:", escolha_astar["cidade"])</code></pre></article>
      <div class="heuristic-explainer-card"><h3>Por que Greedy e A* escolhem caminhos diferentes?</h3><p>A busca gulosa segue a alternativa que parece mais próxima do objetivo. O A* tenta equilibrar essa proximidade estimada com o custo real já acumulado.</p><div class="formula-line"><strong>Ideia central:</strong> h(n) ajuda a enxergar uma direção provável. g(n) lembra o custo que já foi pago. A* usa as duas informações.</div></div>
      <div class="heuristic-areas-grid"><article class="heuristic-area-card"><small>Exemplo 01</small><h3>Rotas e logística</h3><p>Em rotas, h(n) pode estimar a distância direta até o destino. Essa pista ignora curvas, trânsito e pedágios, mas ajuda a evitar explorar cidades que apontam claramente para longe do objetivo.</p><span>Estado: cidade atual. Heurística: distância direta estimada até a cidade destino.</span></article><article class="heuristic-area-card"><small>Exemplo 02</small><h3>Jogos e labirintos</h3><p>Em um grid ou labirinto, h(n) pode ser a distância Manhattan: quantas linhas e colunas faltam até a saída, ignorando paredes temporariamente.</p><span>Estado: posição atual. Heurística: |linha atual - linha final| + |coluna atual - coluna final|.</span></article><article class="heuristic-area-card"><small>Exemplo 03</small><h3>Planejamento de tarefas</h3><p>Em planejamento, h(n) pode estimar quantas tarefas críticas ainda faltam para concluir o objetivo. A busca prioriza planos que parecem reduzir pendências mais rapidamente.</p><span>Estado: tarefas concluídas. Heurística: estimativa do esforço restante.</span></article></div>`);
  };

  const insertConceptAnchorCard = () => {
    const container = document.querySelector('#heuristica .container');
    const target = container?.querySelector('.heuristic-areas-grid') || container?.querySelector('.heuristic-callout');
    if (!container || !target || container.querySelector('.concept-anchor-card')) return;
    target.insertAdjacentHTML('afterend', `<div class="concept-anchor-card"><h3>Como avaliar se uma heurística ajuda?</h3><p>Uma heurística precisa ser relacionada ao domínio do problema, barata de calcular e útil para ordenar a fronteira. Em alguns algoritmos, como A*, também precisamos discutir se ela preserva garantias sobre a qualidade da solução.</p><div class="concept-anchor-grid"><article><strong>Domínio</strong><span>A estimativa precisa ter relação com o objetivo.</span></article><article><strong>Custo de cálculo</strong><span>Calcular h(n) não pode ser tão caro quanto resolver o problema.</span></article><article><strong>Qualidade da pista</strong><span>Quanto melhor a estimativa, menor tende a ser a exploração desnecessária.</span></article><article><strong>Garantia</strong><span>Para discutir otimalidade no A*, a admissibilidade passa a importar.</span></article></div></div>`);
  };

  const configureRomaniaReference = () => {
    const section = root.closest('section');
    const sectionTitle = section?.querySelector('.section-heading h2');
    const sectionIntro = section?.querySelector('.section-heading p:last-child');
    const graphTitle = root.querySelector('.graph-heading h3');
    const graphIntro = root.querySelector('.graph-heading p');
    const graphLegend = root.querySelector('.graph-legend');
    const graph = root.querySelector('.guided-graph');
    if (sectionTitle) sectionTitle.textContent = 'Greedy e A* no mesmo problema de rotas';
    if (sectionIntro) sectionIntro.textContent = 'Retomamos o problema contextualizado na formulação inicial. Agora o foco é observar como a fronteira muda quando usamos apenas h(n) ou a soma g(n)+h(n).';
    if (graphTitle) graphTitle.textContent = 'Retomando o cenário';
    if (graphIntro) graphIntro.innerHTML = 'Objetivo: sair de <strong>Arad</strong> e chegar a <strong>Bucharest</strong> com menor custo.';
    if (graphLegend) graphLegend.innerHTML = '<span>Busca gulosa: prioriza menor h(n)</span><span>A*: prioriza menor f(n)=g(n)+h(n)</span>';
    if (graph) { graph.classList.add('romania-summary'); graph.innerHTML = `<div class="romania-summary-card"><p>O grafo continua sendo o mesmo. O que muda é a informação usada para organizar a fronteira e decidir qual alternativa explorar primeiro.</p><div class="romania-summary-grid"><article><strong>Estado inicial e objetivo</strong><span>Partimos de Arad e queremos chegar a Bucharest.</span></article><article><strong>Ponto crítico da comparação</strong><span>Em Sibiu, a escolha entre Fagaras e Rimnicu Vilcea mostra bem a diferença entre usar só h(n) ou combinar g(n)+h(n).</span></article><article><strong>Resultado esperado</strong><span>Greedy tende a seguir Arad → Sibiu → Fagaras. A* acaba preferindo a rota por Rimnicu Vilcea e Pitesti.</span></article></div></div>`; }
    if (!section?.querySelector('.romania-reading-grid')) root.querySelector('.guided-graph-card')?.insertAdjacentHTML('beforeend', `<div class="romania-reading-grid"><article><small>01</small><h3>O que o problema já tinha?</h3><p>Estados, conexões entre cidades e custo real das estradas.</p></article><article><small>02</small><h3>O que foi acrescentado?</h3><p>Uma heurística h(n), que funciona como uma estimativa direta até Bucharest.</p></article><article><small>03</small><h3>O que isso permite comparar?</h3><p>Agora podemos observar a diferença entre ordenar a fronteira por h(n) ou por g(n)+h(n).</p></article></div>`);
    const costExample = document.querySelector('.cost-example');
    if (costExample) { const blocks = costExample.querySelectorAll('div'); if (blocks[0]) blocks[0].innerHTML = '<small>Distância já percorrida até Pitesti</small><strong>g(n) = 317</strong>'; if (blocks[1]) blocks[1].innerHTML = '<small>Estimativa direta de Pitesti até Bucharest</small><strong>h(n) = 100</strong>'; if (blocks[2]) blocks[2].innerHTML = '<small>Estimativa total por Pitesti</small><strong>f(n) = 417</strong>'; }
    const questions = section?.querySelectorAll('.experiment-questions article');
    if (questions?.[0]) questions[0].querySelector('p').textContent = 'Registre o caminho encontrado e some os custos das estradas.';
    if (questions?.[1]) questions[1].querySelector('p').textContent = 'Observe o momento em que a rota aparentemente direta por Fagaras perde para a alternativa por Rimnicu Vilcea e Pitesti.';
    if (questions?.[2]) questions[2].querySelector('p').textContent = 'Fagaras parece mais perto de Bucharest pela heurística, mas o custo real Fagaras → Bucharest é alto.';
    const tableBody = document.querySelector('.heuristic-check-table tbody');
    if (tableBody) tableBody.innerHTML = `<tr><td>Arad</td><td>366</td><td>418</td><td><strong>Sim</strong></td></tr><tr><td>Sibiu</td><td>253</td><td>278</td><td><strong>Sim</strong></td></tr><tr><td>Fagaras</td><td>176</td><td>211</td><td><strong>Sim</strong></td></tr><tr><td>Rimnicu Vilcea</td><td>193</td><td>198</td><td><strong>Sim</strong></td></tr><tr><td>Pitesti</td><td>100</td><td>101</td><td><strong>Sim</strong></td></tr><tr><td>Bucharest</td><td>0</td><td>0</td><td><strong>Sim</strong></td></tr>`;
  };

  injectStyles(); organizeTopicList(); compactCompetencyCards(); insertFormalizationSection(); updateBridgeText(); updateHeuristicIntroCards(); updateHeuristicCallout(); enhanceHeuristicSection(); insertConceptAnchorCard(); configureRomaniaReference();

  const modeButtons = [...root.querySelectorAll('[data-mode]')];
  const stepButton = root.querySelector('[data-step]');
  const resetButton = root.querySelector('[data-reset]');
  const currentEl = root.querySelector('[data-current]');
  const frontierEl = root.querySelector('[data-frontier]');
  const costEl = root.querySelector('[data-cost]');
  const pathEl = root.querySelector('[data-path]');
  const explanationEl = root.querySelector('[data-explanation]');
  const outcomeEl = root.querySelector('[data-outcome]');
  const frames = {
    greedy:[
      {current:'—',frontier:'Arad · h=366',cost:'0',path:'Arad',explanation:'Começamos em Arad. Na busca gulosa, a fronteira será ordenada somente pela menor estimativa h(n) até Bucharest.'},
      {current:'Arad',frontier:'Sibiu · h=253  |  Timisoara · h=329  |  Zerind · h=374',cost:'0',path:'Arad',explanation:'Ao expandir Arad, aparecem três alternativas. Sibiu parece mais perto de Bucharest, então é escolhido primeiro.'},
      {current:'Sibiu',frontier:'Fagaras · h=176  |  Rimnicu Vilcea · h=193  |  Timisoara · h=329  |  Zerind · h=374  |  Oradea · h=380',cost:'140',path:'Arad → Sibiu',explanation:'Sibiu gera Fagaras e Rimnicu Vilcea. Como Fagaras tem o menor h(n), a busca gulosa segue por ele.'},
      {current:'Fagaras',frontier:'Bucharest · h=0  |  Rimnicu Vilcea · h=193  |  Timisoara · h=329  |  Zerind · h=374  |  Oradea · h=380',cost:'239',path:'Arad → Sibiu → Fagaras',explanation:'Fagaras parece excelente pela heurística. Ao expandi-lo, Bucharest entra na fronteira com h=0.'},
      {current:'Bucharest',frontier:'Rimnicu Vilcea · h=193  |  Timisoara · h=329  |  Zerind · h=374  |  Oradea · h=380',cost:'450',path:'Arad → Sibiu → Fagaras → Bucharest',explanation:'Bucharest é retirado da fronteira e satisfaz o objetivo. A busca termina sem investigar a alternativa por Rimnicu Vilcea e Pitesti.',outcome:'Busca gulosa: solução com custo 450. Foi direta, mas não encontrou a rota de menor custo.'}
    ],
    astar:[
      {current:'—',frontier:'Arad · f=366',cost:'0',path:'Arad',explanation:'Começamos em Arad. No A*, cada prioridade é calculada por f(n)=g(n)+h(n).'},
      {current:'Arad',frontier:'Sibiu · f=393  |  Timisoara · f=447  |  Zerind · f=449',cost:'0',path:'Arad',explanation:'Depois de expandir Arad: Sibiu tem g=140 e h=253, então f=393. É a menor prioridade da fronteira.'},
      {current:'Sibiu',frontier:'Rimnicu Vilcea · f=413  |  Fagaras · f=415  |  Timisoara · f=447  |  Zerind · f=449  |  Oradea · f=671',cost:'140',path:'Arad → Sibiu',explanation:'Sibiu gera Rimnicu Vilcea e Fagaras. A rota por Rimnicu Vilcea tem f=220+193=413, ligeiramente melhor que Fagaras.'},
      {current:'Rimnicu Vilcea',frontier:'Fagaras · f=415  |  Pitesti · f=417  |  Timisoara · f=447  |  Zerind · f=449  |  Craiova · f=526  |  Oradea · f=671',cost:'220',path:'Arad → Sibiu → Rimnicu Vilcea',explanation:'Rimnicu Vilcea aproxima o algoritmo de Pitesti, mas Fagaras ainda tem f um pouco menor. O A* mantém as alternativas concorrendo.'},
      {current:'Fagaras',frontier:'Pitesti · f=417  |  Timisoara · f=447  |  Zerind · f=449  |  Bucharest · f=450  |  Craiova · f=526  |  Oradea · f=671',cost:'239',path:'Arad → Sibiu → Fagaras',explanation:'Fagaras gera Bucharest com custo total 450. O objetivo apareceu, mas não é escolhido ainda porque Pitesti tem f=417.'},
      {current:'Pitesti',frontier:'Bucharest · f=418  |  Timisoara · f=447  |  Zerind · f=449  |  Craiova · f=526  |  Oradea · f=671',cost:'317',path:'Arad → Sibiu → Rimnicu Vilcea → Pitesti',explanation:'Pitesti gera uma rota melhor para Bucharest: g=418 e h=0. Agora Bucharest passa a ter a menor prioridade.'},
      {current:'Bucharest',frontier:'Timisoara · f=447  |  Zerind · f=449  |  Craiova · f=526  |  Oradea · f=671',cost:'418',path:'Arad → Sibiu → Rimnicu Vilcea → Pitesti → Bucharest',explanation:'Bucharest é o menor estado da fronteira e satisfaz o objetivo. O caminho encontrado custa 418.',outcome:'A*: solução com custo 418. Ao combinar g(n) e h(n), evitou aceitar a rota mais cara por Fagaras.'}
    ]
  };
  let mode='greedy'; let frameIndex=0;
  const render=()=>{const frame=frames[mode][frameIndex]; if(!frame) return; currentEl.textContent=frame.current; frontierEl.textContent=frame.frontier; costEl.textContent=frame.cost; pathEl.textContent=frame.path; explanationEl.textContent=frame.explanation; outcomeEl.textContent=frame.outcome||''; const atEnd=frameIndex===frames[mode].length-1; stepButton.disabled=atEnd; stepButton.textContent=atEnd?'Execução concluída':'Executar um passo';};
  const reset=()=>{frameIndex=0;render();};
  modeButtons.forEach((button)=>button.addEventListener('click',()=>{mode=button.dataset.mode;modeButtons.forEach((item)=>item.classList.toggle('active',item===button));reset();}));
  stepButton.addEventListener('click',()=>{if(frameIndex<frames[mode].length-1){frameIndex+=1;render();}});
  resetButton.addEventListener('click',reset); render();
})();