(() => {
  const body = document.body;
  const aside = document.querySelector('.lesson-toc');
  if (!body || !aside) return;

  const toggle = aside.querySelector('.lesson-toc-toggle');
  toggle?.addEventListener('click', () => {
    const collapsed = body.classList.toggle('toc-collapsed');
    toggle.setAttribute('aria-expanded', String(!collapsed));
    toggle.setAttribute('aria-label', collapsed ? 'Expandir índice' : 'Recolher índice');
    toggle.setAttribute('title', collapsed ? 'Expandir índice' : 'Recolher índice');
  });

  const links = [...aside.querySelectorAll('nav a')];
  const sections = links.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const setActive = (id) => links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: '-20% 0px -68% 0px', threshold: [0, .1, .5] });
    sections.forEach((section) => observer.observe(section));
  } else if (sections[0]) {
    setActive(sections[0].id);
  }

  const heroGrid = document.querySelector('.hero-grid, .study-hero-grid');
  if (heroGrid && links.length) {
    const mobile = document.createElement('details');
    mobile.className = 'lesson-mobile-toc';
    mobile.innerHTML = `<summary>Nesta aula</summary><nav>${links.map((link) => link.outerHTML).join('')}</nav>`;
    heroGrid.appendChild(mobile);
  }
})();
