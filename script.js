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

if (window.location.pathname.endsWith('/aula-02-aprofundamento.html') || window.location.pathname.endsWith('aula-02-aprofundamento.html')) {
  const firstDeepDiveFigure = document.querySelector('img[src$="aula-02-aprofundamento-01.webp"]');
  if (firstDeepDiveFigure) {
    firstDeepDiveFigure.setAttribute('src', 'assets/aula-02-aprofundamento/aula-02-aprofundamento-01.png');
  }
}

if (window.location.pathname.endsWith('/aula-03.html') || window.location.pathname.endsWith('aula-03.html')) {
  const lessonAdjustments = document.createElement('script');
  lessonAdjustments.src = 'aula-03-ajustes.js';
  lessonAdjustments.async = false;

  lessonAdjustments.addEventListener('load', () => {
    const lessonRefinement = document.createElement('script');
    lessonRefinement.src = 'aula-03-refino.js';
    lessonRefinement.async = false;
    document.head.appendChild(lessonRefinement);
  });

  document.head.appendChild(lessonAdjustments);
}
