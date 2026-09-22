"""Check local links in the published case pages without external dependencies."""

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
PAGES = (
    "index.html",
    "arvore-de-oportunidades.html",
    "raciocinio-de-design.html",
    "wireflow.html",
    "registro-de-iteracoes.html",
    "alta/dist/index.html",
    "alta/dist/ds.html",
)


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []

    def handle_starttag(self, _tag, attrs):
        self.urls.extend(value for key, value in attrs if key in {"href", "src"} and value)


def main():
    missing = []
    for page in PAGES:
        parser = Links()
        parser.feed((ROOT / page).read_text(encoding="utf-8"))
        for url in parser.urls:
            parsed = urlsplit(url)
            if parsed.scheme or parsed.netloc or not parsed.path or "{" in parsed.path:
                continue
            path = unquote(parsed.path)
            target = ROOT / path.lstrip("/") if path.startswith("/") else ROOT / Path(page).parent / path
            target = target.resolve()
            if not target.is_relative_to(ROOT) or not (target.exists() or target.with_suffix(".html").exists()):
                missing.append(f"{page}: {url}")

    if missing:
        raise SystemExit("Links locais ausentes:\n" + "\n".join(missing))
    print(f"Links locais válidos em {len(PAGES)} páginas publicadas.")


if __name__ == "__main__":
    main()
