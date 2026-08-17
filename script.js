(() => {
  // Mantém a referência esperada pela validação do GitHub Pages: -dark.png
  const isAula02 = () =>
    window.location.pathname.endsWith('/aula-02.html') ||
    window.location.pathname.endsWith('aula-02.html');

  const isAula02Aprofundamento = () =>
    window.location.pathname.endsWith('/aula-02-aprofundamento.html') ||
    window.location.pathname.endsWith('aula-02-aprofundamento.html');

  const findInquiry = (title) =>
    [...document.querySelectorAll('.inquiry')].find(
      (item) => item.querySelector('h3')?.textContent.trim() === title
    );

  const simplifyAiDecision = () => {
    const inquiry = findInquiry('Este problema realmente precisa de IA?');
    if (!inquiry) return;

    const body = inquiry.querySelector('.inquiry-body');
    const content = body?.firstElementChild;
    if (!body || !content) return;

    body.classList.add('inquiry-body-single');
    body.querySelector(':scope > .worksheet')?.remove();

    const intro = content.querySelector(':scope > p');
    if (intro) {
      intro.textContent = 'Escolha dois cenários e compare uma solução de IA com uma alternativa mais simples. Ao comparar as opções, considere a complexidade do problema, a clareza das regras, a disponibilidade de dados, a necessidade de adaptação, o custo do erro, a explicabilidade, a privacidade, o impacto sobre pessoas e a possibilidade de validação.';
    }

    content.querySelectorAll('.teacher-note').forEach((note) => note.remove());
  };

  const simplifyContemporaryApplication = () => {
    const inquiry = findInquiry('Mapeie uma aplicação contemporânea');
    if (!inquiry) return;

    const body = inquiry.querySelector('.inquiry-body');
    const content = body?.firstElementChild;
    if (!body || !content) return;

    body.classList.add('inquiry-body-single');
    body.querySelector(':scope > .worksheet')?.remove();

    const intro = content.querySelector(':scope > p');
    if (intro) {
      intro.textContent = 'Escolha uma aplicação atual de IA em uma área de interesse do grupo. Na investigação, identifique a tendência tecnológica envolvida e analise seus benefícios, limitações, riscos e impactos, mobilizando H11 ao reconhecer tendências e H43/H45 ao analisar cenários e avaliar criticamente a aplicação.';
    }

    content.querySelectorAll('.teacher-note').forEach((note) => note.remove());
  };

  const removeKnowledgeExit = () => {
    document.querySelector('#fechamento .knowledge-exit')?.remove();
  };

  const improveDarkAgentDiagram = () => {
    if (document.getElementById('aula02-dark-agent-adjustments')) return;

    const style = document.createElement('style');
    style.id = 'aula02-dark-agent-adjustments';
    style.textContent = `
      body.theme-dark #agentes .agent-flow {
        background: #111827;
        border-color: #2d3a54;
        box-shadow: 0 14px 34px rgba(0, 0, 0, .20);
      }

      body.theme-dark #agentes .agent-node {
        background: #111a2b;
        border-color: #33415e;
        color: #f4f7ff;
        box-shadow: none;
      }

      body.theme-dark #agentes .agent-node.interface {
        background: #141f33;
        border-color: #354665;
      }

      body.theme-dark #agentes .agent-core {
        background: linear-gradient(145deg, #34466f, #4b4278);
        border: 1px solid rgba(151, 165, 232, .20);
        box-shadow: 0 14px 30px rgba(0, 0, 0, .28);
        color: #f8faff;
      }

      body.theme-dark #agentes .agent-core-steps span {
        background: #293755;
        border-color: #46577d;
        color: #f4f7ff;
      }

      body.theme-dark #agentes .agent-arrow {
        color: #7f99e8;
      }

      body.theme-dark #agentes .feedback-line {
        background: linear-gradient(90deg, #4f7fc4, #7087dc);
        opacity: .82;
      }

      body.theme-dark #agentes .feedback-arrow {
        color: #5f8fd2;
      }

      body.theme-dark #agentes .agent-loop {
        background: #111a2b;
        border: 1px solid #28364f;
        color: #9eacc2;
      }
    `;
    document.head.appendChild(style);
  };

  const improveLightMode = () => {
    if (document.getElementById('aula02-light-mode-adjustments')) return;

    const style = document.createElement('style');
    style.id = 'aula02-light-mode-adjustments';
    style.textContent = `
      /* O modo claro deve permanecer claro também nos blocos de destaque. */
      body:not(.theme-dark) #aquecimento .warmup {
        background: linear-gradient(135deg, #f6f8ff 0%, #eef6fb 100%);
        border: 1px solid #dce4f1;
        box-shadow: 0 14px 32px rgba(35, 50, 78, .06);
        color: var(--ink);
      }

      body:not(.theme-dark) #aquecimento .warmup p {
        color: var(--muted);
      }

      body:not(.theme-dark) #aquecimento .warmup .eyebrow {
        color: var(--blue) !important;
      }

      body:not(.theme-dark) #aquecimento .question-cloud div {
        background: rgba(255, 255, 255, .86);
        border-color: #dce4f1;
        color: var(--ink);
      }

      body:not(.theme-dark) #aplicacoes.section-dark {
        background: var(--soft);
        color: var(--ink);
      }

      body:not(.theme-dark) #aplicacoes.section-dark p {
        color: var(--muted);
      }

      body:not(.theme-dark) #aplicacoes.section-dark .eyebrow {
        color: var(--blue);
      }

      body:not(.theme-dark) #aplicacoes .application-card {
        background: #ffffff;
        border: 1px solid var(--line);
        box-shadow: 0 12px 28px rgba(35, 50, 78, .055);
        color: var(--ink);
      }

      body:not(.theme-dark) #aplicacoes .application-card p {
        color: var(--muted);
      }

      body:not(.theme-dark) #aplicacoes .application-card span {
        color: var(--blue);
      }

      body:not(.theme-dark) #riscos .big-question {
        background: linear-gradient(135deg, var(--blue-soft), var(--violet-soft));
        border: 1px solid #cbd6ff;
        box-shadow: 0 12px 28px rgba(49, 87, 213, .06);
        color: var(--ink);
      }

      body:not(.theme-dark) .protocol article {
        background: #ffffff;
        border-color: var(--line);
        color: var(--ink);
      }

      body:not(.theme-dark) .protocol h3 {
        color: var(--ink);
      }

      body:not(.theme-dark) .protocol article::before {
        color: var(--blue);
      }

      body:not(.theme-dark) .site-footer {
        background: #ffffff;
        border-top: 1px solid var(--line);
        color: var(--ink);
      }

      body:not(.theme-dark) .site-footer p {
        color: var(--muted);
      }

      body:not(.theme-dark) .site-footer a {
        color: var(--blue);
      }
    `;
    document.head.appendChild(style);
  };

  const improveAula02AprofundamentoHistory = () => {
    if (!isAula02Aprofundamento()) return;

    const heading = [...document.querySelectorAll('#fundamentos .study-prose h3')]
      .find((item) => item.textContent.trim().startsWith('Computação, cérebro e comportamento'));
    if (!heading) return;

    const nextHeading = [...heading.parentElement.querySelectorAll('h3')]
      .find((item) => item !== heading && item.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_PRECEDING && item.textContent.trim().startsWith('1956: Dartmouth'));

    if (!nextHeading) return;

    let current = heading.nextElementSibling;
    while (current && current !== nextHeading) {
      const next = current.nextElementSibling;
      current.remove();
      current = next;
    }

    heading.textContent = 'Computação, cérebro e comportamento: 1936–1950';

    const paragraphs = [
      'Nas décadas de 1930 e 1940, questões antigas sobre raciocínio, inteligência e mente começaram a ser reformuladas em termos computacionais. Em 1936, <strong>Alan Turing</strong> apresentou um modelo abstrato de computação que ajudou a estabelecer o que significa executar um procedimento de forma mecânica e quais são os limites desse processo. Com isso, a ideia de representar e executar processos de raciocínio em máquinas ganhou uma base matemática mais precisa.',
      'Em 1943, <strong>Warren McCulloch e Walter Pitts</strong> aproximaram outra tradição desse novo universo computacional. Inspirados pelo funcionamento dos neurônios, pela lógica proposicional e pela teoria da computação, propuseram um modelo matemático de neurônio artificial. Redes formadas por essas unidades podiam implementar operações lógicas, mostrando que estruturas inspiradas no sistema nervoso também poderiam ser analisadas como sistemas de computação.',
      'Poucos anos depois, Turing voltou diretamente ao problema da inteligência. Em <strong>1950</strong>, em <em>Computing Machinery and Intelligence</em>, argumentou que perguntar simplesmente se uma máquina “pensa” levava a dificuldades conceituais e propôs substituir essa questão por algo observável: <strong>como a máquina se comporta em uma interação?</strong> O chamado <em>jogo da imitação</em> deslocava, assim, parte da discussão sobre inteligência para critérios que poderiam ser testados empiricamente.',
      'Esses trabalhos revelam algo importante sobre as origens da IA: <strong>suas diferentes linhas de pesquisa não surgiram completamente separadas</strong>. Lógica, computação, modelos do cérebro e estudo do comportamento já apareciam combinados. Nas décadas seguintes, algumas abordagens enfatizariam símbolos, regras e procedimentos explícitos, enquanto outras explorariam redes de unidades conectadas e aprendizagem. A relação entre essas perspectivas, ora concorrentes, ora complementares, acompanharia grande parte da história da IA.'
    ];

    paragraphs.forEach((html) => {
      const paragraph = document.createElement('p');
      paragraph.innerHTML = html;
      nextHeading.before(paragraph);
    });

    nextHeading.textContent = '1956: Dartmouth e a consolidação da Inteligência Artificial';
    const dartmouthParagraph = nextHeading.nextElementSibling;
    if (dartmouthParagraph?.tagName === 'P') {
      dartmouthParagraph.innerHTML = 'Em 1956, o <em>Dartmouth Summer Research Project on Artificial Intelligence</em> reuniu pesquisadores como <strong>John McCarthy, Marvin Minsky, Nathaniel Rochester e Claude Shannon</strong> em torno de um programa explícito para investigar máquinas inteligentes. O encontro ajudou a consolidar a expressão <em>artificial intelligence</em> e a dar identidade a uma comunidade de pesquisa.';

      const synthesis = document.createElement('p');
      synthesis.innerHTML = 'A proposta abrangia temas como linguagem, abstração, aprendizagem, redes neurais e raciocínio. Dartmouth não criou do zero a ideia de máquinas inteligentes; seu papel histórico foi organizar questões já em desenvolvimento em uma agenda comum. Nas décadas seguintes, representação simbólica, raciocínio e busca se tornariam linhas centrais da área.';
      dartmouthParagraph.after(synthesis);
    }
  };

  const improveAula02AprofundamentoSearchRepresentation = () => {
    if (!isAula02Aprofundamento()) return;

    const heading = [...document.querySelectorAll('#simbolica .study-prose h3')]
      .find((item) => item.textContent.trim() === 'Representação, espaço de busca e heurística');
    if (!heading || heading.dataset.adjusted === 'true') return;

    const firstParagraph = heading.nextElementSibling;
    if (!firstParagraph || firstParagraph.tagName !== 'P') return;

    firstParagraph.innerHTML = 'Antes que um sistema possa procurar uma solução, o problema precisa ser <strong>representado computacionalmente</strong>. Isso exige decidir quais características da situação são relevantes e como serão descritas. Em problemas de busca, essa representação costuma identificar <strong>estados</strong>, um estado inicial, condições de objetivo e <strong>ações ou operadores</strong> capazes de transformar um estado em outro. Representar um problema é, portanto, escolher o que será considerado pelo processo de solução, e também o que ficará de fora.';

    const secondParagraph = document.createElement('p');
    secondParagraph.innerHTML = 'A aplicação sucessiva desses operadores produz diferentes configurações possíveis, formando um <strong>espaço de busca</strong>. Em problemas pequenos, pode ser possível explorar grande parte desse espaço; em problemas maiores, o número de alternativas pode crescer rapidamente. Nesse contexto, uma <strong>heurística</strong> fornece informação adicional para estimar quais estados ou caminhos parecem mais promissores, direcionando a busca sem exigir que todas as possibilidades sejam examinadas.';
    firstParagraph.after(secondParagraph);

    heading.dataset.adjusted = 'true';
  };

  const improveAula02AprofundamentoGeneralMethods = () => {
    if (!isAula02Aprofundamento()) return;

    const heading = [...document.querySelectorAll('#simbolica .study-prose h3')]
      .find((item) => item.textContent.trim() === 'Por que métodos gerais não eram suficientes?');
    if (!heading || heading.dataset.adjusted === 'true') return;

    const nextHeading = [...heading.parentElement.querySelectorAll('h3')]
      .find((item) => item !== heading && item.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_PRECEDING && item.textContent.trim() === 'Sistemas especialistas');
    if (!nextHeading) return;

    let current = heading.nextElementSibling;
    while (current && current !== nextHeading) {
      const next = current.nextElementSibling;
      current.remove();
      current = next;
    }

    const paragraphs = [
      'Os primeiros programas de IA alimentaram a expectativa de que <strong>estratégias gerais de busca e raciocínio</strong> poderiam resolver muitos tipos diferentes de problemas. Essas estratégias funcionavam bem em situações pequenas e bem delimitadas, nas quais o número de estados e ações permanecia controlável.',
      'A dificuldade aparecia quando essas técnicas eram aplicadas a tarefas maiores. À medida que cada estado pode gerar várias alternativas, o número de caminhos possíveis cresce rapidamente. Essa <strong>explosão combinatória</strong> faz com que uma estratégia capaz de encontrar uma solução em princípio possa exigir tempo ou memória impraticáveis para encontrá-la de fato.',
      'A experiência mostrou então que <strong>a forma de orientar a busca importa tanto quanto o mecanismo geral utilizado</strong>. Heurísticas ajudam a priorizar alternativas promissoras, mas são aproximações e podem falhar. Em muitos problemas, obter bom desempenho também exige incorporar <strong>conhecimento específico do domínio</strong>, regras, restrições e relações capazes de eliminar alternativas inadequadas e direcionar o raciocínio.',
      'Essa mudança de perspectiva abriu caminho para sistemas mais intensivos em conhecimento, como o <strong>DENDRAL</strong> e os sistemas especialistas, nos quais parte importante da capacidade de resolução vem não apenas do mecanismo de inferência, mas do conhecimento representado sobre o problema.'
    ];

    paragraphs.forEach((html) => {
      const paragraph = document.createElement('p');
      paragraph.innerHTML = html;
      nextHeading.before(paragraph);
    });

    heading.dataset.adjusted = 'true';
  };

  const improveAula02AprofundamentoExpertSystems = () => {
    if (!isAula02Aprofundamento()) return;

    const heading = [...document.querySelectorAll('#simbolica .study-prose h3')]
      .find((item) => item.textContent.trim() === 'Sistemas especialistas');
    if (!heading || heading.dataset.adjusted === 'true') return;

    const nextHeading = [...heading.parentElement.querySelectorAll('h3')]
      .find((item) => item !== heading && item.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_PRECEDING && item.textContent.trim() === 'Limites da abordagem simbólica');
    if (!nextHeading) return;

    let current = heading.nextElementSibling;
    while (current && current !== nextHeading) {
      const next = current.nextElementSibling;
      current.remove();
      current = next;
    }

    const block = document.createElement('div');
    block.innerHTML = `
      <p>A ideia central dos <strong>sistemas especialistas</strong> é que o desempenho em problemas complexos depende não apenas de um mecanismo geral de raciocínio, mas também de <strong>conhecimento específico sobre o domínio</strong>. Especialistas humanos resolvem problemas porque combinam procedimentos de raciocínio com conceitos, relações, exceções e heurísticas acumuladas em sua área. Esses sistemas procuram representar parte desse conhecimento de forma que possa ser utilizada computacionalmente.</p>

      <p>Nos sistemas clássicos baseados em regras, o conhecimento costuma ser expresso por regras do tipo <strong>IF–THEN</strong>. A arquitetura separa o conhecimento do mecanismo que o utiliza: a <strong>base de conhecimento</strong> armazena regras e relações do domínio, a <strong>memória de trabalho</strong> contém os fatos do caso em análise e o <strong>motor de inferência</strong> identifica quais regras podem ser aplicadas para produzir novas conclusões.</p>

      <figure class="figure-light">
        <img src="assets/aula-02-aprofundamento/aula-02-aprofundamento-03.webp" alt="Arquitetura conceitual de um sistema especialista">
        <figcaption>Arquitetura conceitual simplificada de um sistema especialista.</figcaption>
      </figure>

      <p>O processo de inferência pode seguir direções diferentes. No <strong>encadeamento para frente</strong>, o sistema parte dos fatos disponíveis e aplica regras para gerar novas conclusões. No <strong>encadeamento para trás</strong>, parte de uma hipótese ou objetivo e procura quais condições precisam ser confirmadas para sustentá-lo. A escolha depende da estrutura do problema e de como o conhecimento foi organizado.</p>

      <p>Outra característica importante é a possibilidade de <strong>explicar o raciocínio</strong>. Em muitos sistemas, o usuário podia perguntar por que determinada informação estava sendo solicitada ou como uma conclusão havia sido obtida. Essa rastreabilidade era especialmente relevante em aplicações de diagnóstico e apoio à decisão.</p>

      <p>Construir esses sistemas exigia um trabalho específico de <strong>engenharia do conhecimento</strong>. O conhecimento precisava ser obtido de especialistas, formalizado, transformado em regras, testado e revisado. Nesse processo, o especialista do domínio, o engenheiro do conhecimento e o usuário final desempenhavam papéis distintos. A aquisição e a manutenção desse conhecimento se tornaram algumas das maiores dificuldades da abordagem.</p>

      <p>Considere um sistema de diagnóstico de falhas de software. A base pode conter uma regra como: se o servidor está acessível e o serviço não responde, há indício de falha no serviço. Os fatos do caso entram na memória de trabalho, o motor verifica quais regras são aplicáveis e novas conclusões podem alimentar inferências seguintes.</p>

      <figure class="figure-light">
        <img src="assets/aula-02-aprofundamento/aula-02-aprofundamento-04.webp" alt="Fluxo do especialista à inferência em um sistema baseado em regras">
        <figcaption>Nos sistemas especialistas clássicos, novos casos não atualizam automaticamente as regras.</figcaption>
      </figure>

      <p>Sistemas como <strong>DENDRAL</strong> e <strong>MYCIN</strong> mostraram que essa estratégia podia alcançar desempenho elevado em domínios bem delimitados. Ao mesmo tempo, evidenciaram uma característica fundamental: a competência tende a ser <strong>profunda, mas estreita</strong>. Fora do domínio previsto, ou diante de conhecimento incompleto e situações inesperadas, o desempenho pode degradar rapidamente.</p>
    `;

    [...block.children].forEach((element) => nextHeading.before(element));
    heading.dataset.adjusted = 'true';
  };

  const applyPageAdjustments = () => {
    if (isAula02()) {
      simplifyAiDecision();
      simplifyContemporaryApplication();
      removeKnowledgeExit();
      improveDarkAgentDiagram();
      improveLightMode();
    }

    improveAula02AprofundamentoHistory();
    improveAula02AprofundamentoSearchRepresentation();
    improveAula02AprofundamentoGeneralMethods();
    improveAula02AprofundamentoExpertSystems();
  };

  applyPageAdjustments();
  document.addEventListener('DOMContentLoaded', applyPageAdjustments);

  const loaderScript = document.currentScript;
  const baseScript = document.createElement('script');
  baseScript.src = loaderScript?.src
    ? new URL('script-base.js', loaderScript.src).href
    : 'script-base.js';
  baseScript.async = false;
  baseScript.addEventListener('load', applyPageAdjustments);
  document.head.appendChild(baseScript);
})();
