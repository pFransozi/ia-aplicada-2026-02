(() => {
  try {
    const saved = localStorage.getItem('ia-aplicada-theme');
    document.documentElement.dataset.theme = saved === 'dark' ? 'dark' : 'light';
  } catch (_) {
    document.documentElement.dataset.theme = 'light';
  }
})();
