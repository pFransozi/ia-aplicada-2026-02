(() => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('[data-theme-toggle]');

  const syncTheme = () => {
    const dark = root.dataset.theme === 'dark';
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(dark));
      themeToggle.setAttribute('aria-label', dark ? 'Ativar modo claro' : 'Ativar modo escuro');
      themeToggle.textContent = dark ? '☀' : '◐';
    }

    document.querySelectorAll('[data-light-src][data-dark-src]').forEach((image) => {
      const nextSource = dark ? image.dataset.darkSrc : image.dataset.lightSrc;
      if (nextSource && image.getAttribute('src') !== nextSource) image.setAttribute('src', nextSource);
    });
  };

  themeToggle?.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = nextTheme;
    try { localStorage.setItem('ia-aplicada-theme', nextTheme); } catch (_) { /* preference is optional */ }
    syncTheme();
  });

  const tocToggle = document.querySelector('[data-toc-toggle]');
  tocToggle?.addEventListener('click', () => {
    const collapsed = document.body.classList.toggle('toc-collapsed');
    tocToggle.setAttribute('aria-expanded', String(!collapsed));
    tocToggle.setAttribute('aria-label', collapsed ? 'Expandir índice' : 'Recolher índice');
    tocToggle.setAttribute('title', collapsed ? 'Expandir índice' : 'Recolher índice');
  });

  const sections = [...document.querySelectorAll('main section[id]')];
  const tocLinks = [...document.querySelectorAll('.toc a')];
  const setActive = (id) => tocLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
  });

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: '-20% 0px -68% 0px', threshold: [0, .1, .5] });
    sections.forEach((section) => observer.observe(section));
  } else if (sections[0]) {
    setActive(sections[0].id);
  }

  const dialog = document.querySelector('#journey-dialog');
  document.querySelector('[data-open-journey]')?.addEventListener('click', () => dialog?.showModal());
  dialog?.querySelector('[data-close-dialog]')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

  syncTheme();
})();
