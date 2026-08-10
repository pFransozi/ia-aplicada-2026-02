const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const themeToggle = document.querySelector('.theme-toggle');

const applyTheme = (theme) => {
  const isDark = theme === 'dark';
  document.body.classList.toggle('theme-dark', isDark);

  document.querySelectorAll('[data-light-src][data-dark-src]').forEach((image) => {
    const nextSrc = isDark ? image.dataset.darkSrc : image.dataset.lightSrc;
    if (image.getAttribute('src') !== nextSrc) image.setAttribute('src', nextSrc);
  });

  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Ativar modo claro' : 'Ativar modo noturno');
    themeToggle.querySelector('.theme-icon').textContent = isDark ? '☀' : '☾';
    themeToggle.querySelector('.theme-text').textContent = isDark ? 'Modo claro' : 'Modo noturno';
  }
};

const savedTheme = localStorage.getItem('ia-aplicada-theme');
applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

themeToggle?.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('theme-dark') ? 'light' : 'dark';
  localStorage.setItem('ia-aplicada-theme', nextTheme);
  applyTheme(nextTheme);
});

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelectorAll('[data-dialog-target]').forEach((button) => {
  button.addEventListener('click', () => {
    const dialog = document.getElementById(button.dataset.dialogTarget);
    if (dialog?.showModal) dialog.showModal();
  });

  button.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    const dialog = document.getElementById(button.dataset.dialogTarget);
    if (dialog?.showModal) dialog.showModal();
  });
});

document.querySelectorAll('.image-dialog').forEach((dialog) => {
  dialog.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
});

/* Ajuste específico da abertura da Aula 03.
   Mantém o HTML-base da aula e substitui apenas o bloco visual do cenário,
   evitando um painel grande com diagrama pouco informativo. */
if (window.location.pathname.endsWith('/aula-03.html') || window.location.pathname.endsWith('aula-03.html')) {
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
          <strong>Por enquanto, não procure o caminho.</strong>
          <span>A pergunta da aula é anterior: como representar o problema de maneira suficiente para que uma busca possa acontecer depois?</span>
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

    const style = document.createElement('style');
    style.id = 'aula03-scenario-adjustment';
    style.textContent = `
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

      body.theme-dark .scenario-reworked .scenario-question,
      body.theme-dark .scenario-summary-card {
        background: #172033;
        border-color: var(--line);
      }

      body.theme-dark .scenario-summary-card-accent {
        background: linear-gradient(145deg, #111a2b, #172033);
        border-color: #3b4f78;
      }

      @media (max-width: 900px) {
        .scenario-summary-grid {
          grid-template-columns: 1fr;
        }

        .scenario-summary-card {
          min-height: auto;
        }
      }
    `;

    document.head.appendChild(style);
  }
}
