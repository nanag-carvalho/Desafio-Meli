# Mercado Play — case de Product Design

Estudo de um desafio de produto sobre **recomendações de filmes e séries entre amigos e familiares**. A proposta conecta descoberta, avaliação, indicação e acesso ao título em uma experiência navegável. As hipóteses e decisões estão documentadas; os resultados ainda precisam de teste com participantes.

**Case publicado:** [desafio-meli.vercel.app](https://desafio-meli.vercel.app/)

**Figma:** [arquivo de design](https://www.figma.com/design/v542kEZserQ1CoRFkdFfVI/Mercado-Livre---Desafio?node-id=213-1215)

## Entregáveis

| Artefato | Conteúdo |
| --- | --- |
| [Case](index.html) | Contexto, problema, evidências, hipóteses, processo e proposta |
| [Árvore de oportunidades](arvore-de-oportunidades.html) | Oportunidades, hipóteses H1–H8 e critérios de avaliação |
| [Raciocínio de design](raciocinio-de-design.html) | Recorte, decisões e limites da evidência |
| [Wireflow](wireflow.html) | Percursos clicáveis e retornos entre telas |
| [Registro de iterações](registro-de-iteracoes.html) | Revisões aplicadas ao desenho e ao protótipo |
| [Protótipo em alta fidelidade](alta/dist/index.html) | Experiência navegável, estados e interações |
| [Design System](alta/dist/ds.html) | Tokens, componentes e composições usados no protótipo |

**Wireframe** representa a estrutura de uma tela. **Wireflow** liga telas e estados para mostrar como alguém avança, volta e conclui uma tarefa. O arquivo clicável deste repositório é um wireflow.

## Organização do repositório

```text
index.html                    Case principal
arvore-de-oportunidades.html  Estratégia e hipóteses
raciocinio-de-design.html     Decisões e escopo
wireflow.html                 Fluxo clicável
registro-de-iteracoes.html    Revisões do trabalho
alta/src/                    Código fonte do protótipo e Design System
alta/dist/                   Versão estática publicada do protótipo
assets/                      Imagens, marca e estilos do case
docs/                        Pesquisa, processo e auditorias
docs/archive/                Materiais anteriores preservados como histórico
```

Os antigos endereços numerados continuam disponíveis por redirecionamento na Vercel. Os nomes atuais são os endereços canônicos. O índice de documentos internos está em [docs/README.md](docs/README.md).

## Executar localmente

Na raiz do repositório:

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

Abra `http://127.0.0.1:8765/`. Para trabalhar no código React do protótipo:

```bash
cd alta
npm ci
npm run dev
```

`alta/src/design-system/index.js` é a API de componentes usada pelas telas. `alta/dist/` contém a versão estática publicada. O site principal é HTML/CSS estático e a Vercel publica a raiz deste repositório.

## Alcance da validação

Os depoimentos e a queda de frequência citados no desafio são contexto fornecido no briefing. A revisão de interface e do fluxo foi feita pela autora; não houve teste com participantes externos nem medição de impacto no produto. Catálogo, preços, transações e colaboração são simulações para avaliar a experiência.
