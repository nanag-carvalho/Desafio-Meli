# Inventário do wireflow e da jornada · Mercado Play

## Escopo e contagem

O clicável contém **25 telas base**, **3 sheets** e **um feed contínuo de 3 títulos**. Para revisão no Figma, o feed aparece em 3 quadros consecutivos: **27 quadros de tela + 3 overlays**. Não contar filtros, seleção, som e acesso como telas novas: são estados das mesmas telas.

| Grupo | Telas base | Estados e interações que precisam ser vistos |
|---|---|---|
| Descoberta | Início, Buscar, Em cena, Para você, Gêneros, Semelhantes | Chips ativos, busca vazia/com resultado/sem resultado, feed vertical por gesto, som ligado/desligado, título 1/2/3, motivo da recomendação |
| Conteúdo | Detalhe, Prévia expandida, Reprodução, Transmitir, Baixar | Filme/série, episódios, acesso grátis/pago/indisponível, expandir, transmitir, download elegível/inelegível |
| Contribuição | Perfil, Minhas listas, Lista privada, Lista compartilhada, Escolher juntos, Favoritos, Assistidos, Compras e aluguéis | Lista privada/compartilhada, outra pessoa contribuiu, favorito ativo/inativo, assistidos Todos/Avaliados, avaliação editável |
| Acesso | Loja, Oferta, Acesso liberado, Indisponível, Link preparado, Mensagem recebida | Modalidade Grátis/Alugar/Comprar/Presentear, preço e prazo, compra simulada, origem do link e acesso da conta receptora |
| Overlays | Adicionar à lista, Indicar, Avaliar | Escolha privada/compartilhada; preview + canais; 3 opções de avaliação; fechar volta ao contexto |

## Entradas e retornos que o fluxo precisa sustentar

1. **Escolha no app:** Início, Buscar ou Em cena → detalhe → assistir, guardar ou indicar. H1–H3. No feed, o gesto vertical muda o título; as ações pertencem ao título visível.
2. **Organização e decisão conjunta:** detalhe ou Em cena → Favorito (ação rápida) ou + Lista → privada/compartilhada → convidar → duas pessoas acrescentam títulos → comparar → conferir acesso de cada conta. H4–H6.
3. **Oferta e consumo:** Loja ou detalhe → modalidade e custo → oferta → confirmação simulada → reprodução → retorno ao mesmo título. H7.
4. **Link recebido:** canal externo → mensagem com título e origem → detalhe no Mercado Play → verificação de acesso da própria conta → gratuito, aluguel ou indisponível → decisão/retorno. H8.
5. **Memória:** Perfil → Favoritos, Listas, Assistidos (Todos/Avaliados), Compras e aluguéis → título. H5 e suporte à escolha.

## User journey e evidência

As duas personas do mapa são **proto-personas de cenário**. A primeira representa quem ainda não sabe o que ver; a segunda, quem recomenda e quem recebe. Não houve entrevistas ou teste com participantes. As fontes deste case são os prints do as is, a revisão estruturada da autora e os benchmarks citados. A jornada liga seis momentos — gatilho, exploração, avaliação, guardar/indicar, decisão conjunta e assistir/aprender — às oportunidades e às hipóteses H1–H8. Onde não há observação direta, o mapa diz “inferência a testar”.

## Gate antes da alta fidelidade

- A pessoa encontra um título sem instrução de navegação e consegue explicar por que foi sugerido.
- Em cena permite navegar por gesto e agir sobre o título visível, sem perder posição ao voltar de uma sheet.
- Favoritar e adicionar à lista têm efeitos distinguíveis; lista privada e compartilhada são compreensíveis.
- Indicar usa uma sheet com preview e canal, sem etapa obrigatória de escolher destinatário ou compor mensagem no app.
- Custo, modalidade, prazo, origem do link e acesso do destinatário aparecem antes de compromisso.
- Não existem becos sem saída nos retornos, inclusive após link externo, oferta e reprodução.

Os critérios são de compreensão e comportamento observável em walkthrough; não representam impacto causal na métrica de frequência de uso. A revisão estruturada da autora informa iteração, mas não substitui teste com pessoas.

## Links

- [Wireflow editável no Figma](https://www.figma.com/design/v542kEZserQ1CoRFkdFfVI/Mercado-Livre---Desafio?node-id=28-279)
- [Sitemap e flowmap no Figma](https://www.figma.com/design/v542kEZserQ1CoRFkdFfVI/Mercado-Livre---Desafio?node-id=29-281)
- [User journey no Figma](https://www.figma.com/design/v542kEZserQ1CoRFkdFfVI/Mercado-Livre---Desafio?node-id=29-282)
- [Wireflow clicável](http://127.0.0.1:8765/15-wireflow-clicavel.html)
