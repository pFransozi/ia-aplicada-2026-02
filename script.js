const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const themeToggle = document.querySelector('.theme-toggle');

const removeDuplicateRussellNorvigReference = () => {
  if (!window.location.pathname.endsWith('aula-02-aprofundamento.html')) return;

  document.querySelectorAll('#referencias .references li').forEach((item) => {
    const text = item.textContent.replace(/\s+/g, ' ').trim();
    if (
      text.includes('RUSSELL, Stuart J.; NORVIG, Peter.') &&
      text.includes('Inteligência Artificial') &&
      text.includes('Elsevier, 2013')
    ) {
      item.remove();
    }
  });
};

removeDuplicateRussellNorvigReference();
document.addEventListener('DOMContentLoaded', removeDuplicateRussellNorvigReference);
window.addEventListener('load', removeDuplicateRussellNorvigReference);

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

const setupDeepDiveFigures = () => {
  if (!window.location.pathname.endsWith('aula-02-aprofundamento.html')) return;

  removeDuplicateRussellNorvigReference();

  // Usa os PNGs originais em alta definição. Mantém compatibilidade com
  // referências antigas em WebP que ainda estejam presentes no HTML.
  const deepDiveImages = Array.from(
    document.querySelectorAll('.study-page .figure-light img[src*="assets/aula-02-aprofundamento/"]')
  );

  deepDiveImages.forEach((image) => {
    const currentSrc = image.getAttribute('src');
    if (!currentSrc) return;

    const lightSrc = currentSrc.replace(/\.webp$/i, '.png');
    image.setAttribute('src', lightSrc);
    image.dataset.lightSrc = lightSrc;

    // Convenção já preparada para futuras versões noturnas:
    // aula-02-aprofundamento-01-dark.png, ...-08-dark.png.
    // O data-dark-src só é habilitado se o arquivo realmente existir,
    // evitando imagens quebradas enquanto os arquivos dark não forem publicados.
    const darkSrc = lightSrc.replace(/\.png$/i, '-dark.png');
    const probe = new Image();

    probe.onload = () => {
      image.dataset.darkSrc = darkSrc;
      if (document.body.classList.contains('theme-dark')) {
        image.setAttribute('src', darkSrc);
      }
    };

    probe.src = darkSrc;
  });

  const fundamentalsSection = document.querySelector('#fundamentos');
  const fundamentalsGrid = fundamentalsSection?.querySelector('.study-grid');
  const firstProse = fundamentalsGrid?.querySelector('.study-prose');
  const firstFigure = firstProse?.querySelector('.figure-light');

  if (fundamentalsGrid && firstProse && firstFigure) {
    const continuation = document.createElement('div');
    continuation.className = 'study-prose study-prose-continuation';

    let nextNode = firstFigure.nextElementSibling;
    while (nextNode) {
      const nodeToMove = nextNode;
      nextNode = nextNode.nextElementSibling;
      continuation.appendChild(nodeToMove);
    }

    fundamentalsGrid.insertAdjacentElement('afterend', firstFigure);
    firstFigure.classList.add('figure-featured');
    firstFigure.insertAdjacentElement('afterend', continuation);
  }

  const style = document.createElement('style');
  style.id = 'deep-dive-figure-enhancements';
  style.textContent = `
    .study-page .figure-featured {
      width: 100%;
      max-width: 1180px;
      margin: 2.35rem auto 3rem;
      padding: .75rem;
    }

    .study-page .study-prose-continuation {
      max-width: 900px;
      margin: 0 auto;
    }

    .study-page .figure-light {
      transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
    }

    .study-page .figure-light[data-zoomable="true"] {
      cursor: zoom-in;
    }

    .study-page .figure-light[data-zoomable="true"]:hover {
      transform: translateY(-2px);
      border-color: color-mix(in srgb, var(--primary) 48%, #d9e1ec);
      box-shadow: 0 18px 42px rgba(30,50,80,.14);
    }

    .study-page .figure-light[data-zoomable="true"]:focus-visible {
      outline: 3px solid color-mix(in srgb, var(--primary) 65%, white);
      outline-offset: 5px;
    }

    .deep-dive-image-dialog {
      width: min(96vw, 1600px);
      max-width: none;
      height: min(94vh, 1050px);
      max-height: none;
      padding: 0;
      border: 0;
      border-radius: 18px;
      overflow: hidden;
      background: #0b1020;
      box-shadow: 0 28px 80px rgba(0,0,0,.45);
    }

    .deep-dive-image-dialog::backdrop {
      background: rgba(3,7,18,.82);
      backdrop-filter: blur(5px);
    }

    .deep-dive-dialog-shell {
      position: relative;
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      padding: 3.25rem 1.25rem 1.25rem;
      box-sizing: border-box;
      overflow: auto;
    }

    .deep-dive-dialog-shell img {
      display: block;
      max-width: 100%;
      max-height: calc(94vh - 5rem);
      width: auto;
      height: auto;
      object-fit: contain;
      background: #fff;
      border-radius: 10px;
    }

    .deep-dive-dialog-close {
      position: absolute;
      top: .8rem;
      right: .9rem;
      width: 2.35rem;
      height: 2.35rem;
      display: grid;
      place-items: center;
      border: 1px solid rgba(255,255,255,.24);
      border-radius: 999px;
      background: rgba(15,23,42,.82);
      color: #fff;
      font: inherit;
      font-size: 1.35rem;
      line-height: 1;
      cursor: pointer;
    }

    .deep-dive-dialog-close:hover {
      background: rgba(30,41,59,.98);
    }

    @media (max-width: 680px) {
      .study-page .figure-featured {
        margin: 1.6rem auto 2.2rem;
        padding: .45rem;
      }

      .deep-dive-image-dialog {
        width: 98vw;
        height: 92vh;
        border-radius: 12px;
      }
    }
  `;
  document.head.appendChild(style);

  const dialog = document.createElement('dialog');
  dialog.className = 'deep-dive-image-dialog';
  dialog.setAttribute('aria-label', 'Visualização ampliada da figura');
  dialog.innerHTML = `
    <div class="deep-dive-dialog-shell">
      <button class="deep-dive-dialog-close" type="button" aria-label="Fechar imagem ampliada">×</button>
      <img alt="">
    </div>
  `;
  document.body.appendChild(dialog);

  const dialogImage = dialog.querySelector('img');
  const closeButton = dialog.querySelector('.deep-dive-dialog-close');

  const openFigure = (figure) => {
    const image = figure.querySelector('img');
    if (!image || !dialogImage) return;
    dialogImage.src = image.currentSrc || image.src;
    dialogImage.alt = image.alt || 'Figura ampliada';
    dialog.showModal();
  };

  document.querySelectorAll('.study-page .figure-light').forEach((figure) => {
    figure.dataset.zoomable = 'true';
    figure.tabIndex = 0;
    figure.setAttribute('role', 'button');
    figure.setAttribute('aria-label', 'Ampliar figura');

    figure.addEventListener('click', () => openFigure(figure));
    figure.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      openFigure(figure);
    });
  });

  closeButton?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
};

setupDeepDiveFigures();

if (window.location.pathname.endsWith('/aula-03.html') || window.location.pathname.endsWith('aula-03.html')) {
  document.querySelector('#fechamento .knowledge-exit')?.remove();

  const aula03ThemeStyle = document.createElement('style');
  aula03ThemeStyle.id = 'aula03-theme-alignment';
  aula03ThemeStyle.textContent = `
    body.lesson-page:not(.theme-dark) #aquecimento .warmup {
      background: linear-gradient(145deg, #ffffff, #f4f7ff);
      border: 1px solid var(--line);
      color: var(--ink);
      box-shadow: 0 18px 48px rgba(35, 50, 78, .08);
    }
    body.lesson-page:not(.theme-dark) #aquecimento .warmup p { color: var(--muted); }
    body.lesson-page:not(.theme-dark) #aquecimento .question-cloud > div { background:#f7f9fd; border-color:var(--line); color:var(--ink); }
    body.lesson-page:not(.theme-dark) #aquecimento .warmup-map-figure { background:#fff; border-color:var(--line); }
    body.lesson-page:not(.theme-dark) #codigo.section-dark,
    body.lesson-page:not(.theme-dark) #ponte.section-dark { background:var(--paper); color:var(--ink); }
    body.lesson-page:not(.theme-dark) #codigo.section-dark p,
    body.lesson-page:not(.theme-dark) #ponte.section-dark p { color:var(--muted); }
    body.lesson-page:not(.theme-dark) #codigo.section-dark .eyebrow,
    body.lesson-page:not(.theme-dark) #ponte.section-dark .eyebrow { color:var(--blue); }
    body.lesson-page:not(.theme-dark) #codigo .code-note { background:#fff; border-color:var(--line); color:var(--ink); box-shadow:0 12px 30px rgba(35,50,78,.045); }
    body.lesson-page:not(.theme-dark) #espaco .state-note { background:linear-gradient(145deg,#f8faff,#eef2ff); border:1px solid var(--line); color:var(--ink); box-shadow:0 12px 30px rgba(35,50,78,.05); }
    body.lesson-page:not(.theme-dark) #espaco .state-note p,
    body.lesson-page:not(.theme-dark) #espaco .state-note span { color:var(--muted); }
    body.lesson-page:not(.theme-dark) #espaco .state-note-list > div { border-bottom-color:var(--line); }
    body.lesson-page:not(.theme-dark) #ponte .bridge { background:linear-gradient(135deg,#f5f7ff,#edf2ff); border:1px solid #d7e0fb; color:var(--ink); box-shadow:0 12px 30px rgba(35,50,78,.05); }
    body.lesson-page:not(.theme-dark) #ponte .bridge p { color:var(--muted); }
    body.lesson-page:not(.theme-dark) #ponte .bridge-arrow { color:var(--blue); }
  `;
  document.head.appendChild(aula03ThemeStyle);

  const lessonAdjustments = document.createElement('script');
  lessonAdjustments.src = 'aula-03-ajustes.js';
  lessonAdjustments.async = false;

  lessonAdjustments.addEventListener('load', () => {
    const lessonRefinement = document.createElement('script');
    lessonRefinement.src = 'aula-03-refino.js';
    lessonRefinement.async = false;

    lessonRefinement.addEventListener('load', () => {
      const representationRefinement = document.createElement('script');
      representationRefinement.src = 'aula-03-representacao.js';
      representationRefinement.async = false;
      document.head.appendChild(representationRefinement);
    });

    document.head.appendChild(lessonRefinement);
  });

  document.head.appendChild(lessonAdjustments);
}