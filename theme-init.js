(() => {
  try {
    const saved = localStorage.getItem('ia-aplicada-theme');
    document.documentElement.dataset.theme = saved === 'dark' ? 'dark' : 'light';
    document.documentElement.style.colorScheme = saved === 'dark' ? 'dark' : 'light';
  } catch (_) {
    document.documentElement.dataset.theme = 'light';
    document.documentElement.style.colorScheme = 'light';
  }

  const isAula05 =
    window.location.pathname.endsWith('/aula-05.html') ||
    window.location.pathname.endsWith('aula-05.html');

  if (!isAula05) return;

  const trimAula05 = () => {
    const admissibilidade = document.querySelector('#admissibilidade .container');

    if (admissibilidade) {
      const headings = [...admissibilidade.querySelectorAll(':scope > h3')];
      const inicioRemocao = headings.find((heading) => {
        const texto = heading.textContent.trim().toLowerCase();
        return (
          texto.startsWith('5.') ||
          texto.includes('por que superestimar pode atrapalhar')
        );
      });

      if (inicioRemocao) {
        let atual = inicioRemocao;
        while (atual) {
          const proximo = atual.nextElementSibling;
          atual.remove();
          atual = proximo;
        }
      } else {
        // Compatibilidade com a versão anterior da seção:
        // mantém apenas a explicação introdutória de admissibilidade.
        admissibilidade.querySelector(':scope > .guided-exercise')?.remove();

        const garantia = [...admissibilidade.querySelectorAll(':scope > h3')]
          .find((heading) => heading.textContent.includes('O que isso garante para o A*'));

        if (garantia) {
          let atual = garantia;
          while (atual) {
            const proximo = atual.nextElementSibling;
            atual.remove();
            atual = proximo;
          }
        }
      }
    }

    // Remove eventuais chamadas para a prática em Jupyter solicitadas para exclusão.
    document.querySelectorAll('p, article').forEach((elemento) => {
      if (elemento.textContent.includes('Prática em Jupyter:')) {
        const card = elemento.closest('.guided-exercise');
        (card || elemento).remove();
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trimAula05, { once: true });
  } else {
    trimAula05();
  }
})();
