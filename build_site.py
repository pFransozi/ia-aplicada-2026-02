from pathlib import Path
import re

BASE = Path("base-b")
A_SOURCE = Path("calendario-a-source.html")
DIST = Path("dist")


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def write(path: Path, content: str) -> None:
    path.write_text(content, encoding="utf-8")


def calendar_match(html: str) -> re.Match[str]:
    pattern = re.compile(
        r'<section\b[^>]*\bid="calendario"[^>]*>.*?(?=<section\b[^>]*\bid="conteudos")',
        re.IGNORECASE | re.DOTALL,
    )
    match = pattern.search(html)
    if not match:
        raise RuntimeError("Não foi possível localizar a seção de calendário.")
    return match


def calendar_selector_section() -> str:
    return '''<section id="calendario" class="section-pad section-soft" aria-labelledby="calendario-title">
  <div class="container">
    <div class="section-heading split-heading">
      <div>
        <p class="eyebrow">Cronograma</p>
        <h2 id="calendario-title">Calendários por turma</h2>
      </div>
      <p>O conteúdo e os materiais da disciplina são compartilhados entre as turmas. As datas dos encontros e dos sábados letivos são organizadas separadamente.</p>
    </div>

    <div class="feature-grid">
      <article class="feature-card">
        <span class="feature-number">A</span>
        <h3>Turma A</h3>
        <p>Aulas presenciais às segundas-feiras, com calendário próprio de encontros e atividades assíncronas.</p>
        <a class="button button-primary" href="calendario-a.html">Consultar calendário da Turma A</a>
      </article>

      <article class="feature-card">
        <span class="feature-number">B</span>
        <h3>Turma B</h3>
        <p>Aulas presenciais às quintas-feiras, com calendário próprio de encontros e atividades assíncronas.</p>
        <a class="button button-primary" href="calendario-b.html">Consultar calendário da Turma B</a>
      </article>
    </div>
  </div>
</section>
'''


def calendar_page(turma: str, weekday: str, calendar_section: str) -> str:
    return f'''<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Calendário da Turma {turma} da disciplina Inteligência Artificial Aplicada — 2026/2.">
  <title>IA Aplicada — Calendário da Turma {turma}</title>
  <link rel="stylesheet" href="styles.css">
  <script defer src="script.js"></script>
</head>
<body>
  <a class="skip-link" href="#conteudo">Ir para o conteúdo</a>

  <header class="site-header" id="inicio">
    <div class="container nav-wrap">
      <a class="brand" href="index.html" aria-label="IA Aplicada — página principal">
        <span class="brand-mark" aria-hidden="true">IA</span>
        <span><strong>IA Aplicada</strong><small>Calendário · Turma {turma}</small></span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="menu-principal">
        <span class="sr-only">Abrir menu</span><span></span><span></span><span></span>
      </button>
      <nav id="menu-principal" class="main-nav" aria-label="Navegação principal">
        <a href="index.html">Página principal</a>
        <a href="curso.html">Visão geral</a>
        <a class="nav-highlight" href="#calendario">Turma {turma}</a>
        <a href="aula-02.html">Aula 02</a>
        <button class="theme-toggle" type="button" aria-label="Ativar modo noturno" aria-pressed="false">
          <span class="theme-icon" aria-hidden="true">☾</span>
          <span class="theme-text">Modo noturno</span>
        </button>
      </nav>
    </div>
  </header>

  <main id="conteudo">
    <section class="hero section-pad">
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">Inteligência Artificial Aplicada · Turma {turma}</p>
          <h1>Calendário da Turma {turma}</h1>
          <p class="hero-lead">Aulas presenciais às {weekday}.</p>
          <p class="hero-text">Consulte abaixo as datas dos encontros presenciais, sábados letivos e demais eventos previstos para esta turma.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#calendario">Ver calendário</a>
            <a class="button button-secondary" href="curso.html">Voltar para a visão geral</a>
          </div>
        </div>
      </div>
    </section>

{calendar_section.strip()}
  </main>

  <footer class="site-footer">
    <div class="container footer-grid">
      <div><strong>Inteligência Artificial Aplicada</strong><p>Engenharia de Software · 2026/2</p></div>
      <a href="curso.html">Voltar para a visão geral</a>
    </div>
  </footer>
</body>
</html>
'''


def main() -> None:
    base_course = read(BASE / "curso.html")
    turma_a_course = read(A_SOURCE)

    base_calendar = calendar_match(base_course)
    turma_a_calendar = calendar_match(turma_a_course)

    common_course = (
        base_course[: base_calendar.start()]
        + calendar_selector_section()
        + base_course[base_calendar.end() :]
    )

    write(DIST / "curso.html", common_course)
    write(
        DIST / "calendario-a.html",
        calendar_page("A", "segundas-feiras", turma_a_calendar.group(0)),
    )
    write(
        DIST / "calendario-b.html",
        calendar_page("B", "quintas-feiras", base_calendar.group(0)),
    )

    required = [
        DIST / "index.html",
        DIST / "curso.html",
        DIST / "aula-02.html",
        DIST / "calendario-a.html",
        DIST / "calendario-b.html",
        DIST / "styles.css",
        DIST / "script.js",
    ]
    missing = [str(path) for path in required if not path.exists()]
    if missing:
        raise RuntimeError("Arquivos esperados não foram gerados: " + ", ".join(missing))

    for path in (DIST / "curso.html", DIST / "calendario-a.html", DIST / "calendario-b.html"):
        html = read(path)
        if 'id="calendario"' not in html:
            raise RuntimeError(f"Calendário ausente em {path}")


if __name__ == "__main__":
    main()
