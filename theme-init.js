(() => {
  try {
    const saved = localStorage.getItem('ia-aplicada-theme');
    document.documentElement.dataset.theme = saved === 'dark' ? 'dark' : 'light';
    document.documentElement.style.colorScheme = saved === 'dark' ? 'dark' : 'light';
  } catch (_) {
    document.documentElement.dataset.theme = 'light';
    document.documentElement.style.colorScheme = 'light';
  }
})();
