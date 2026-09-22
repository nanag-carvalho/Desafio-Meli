# Avaliação heurística — Mercado Play

Escala: **0** sem problema, **1** cosmético, **2** moderado, **3** grave, **4** bloqueador.

| Heurística | Evidência observada | Severidade | Resposta no protótipo |
|---|---|---:|---|
| Visibilidade do estado do sistema | Alterações de nome, privacidade, participantes e link aconteciam sem retorno visível. | 3 | Feedback animado confirma cada ação; rótulos e avatares atualizam imediatamente. |
| Correspondência com o mundo real | “Compartilhada” não explicava como alguém entraria na lista. | 2 | Convite direto e link de entrada usam linguagem orientada à tarefa. |
| Controle e liberdade | O catálogo era aberto como camada e escondia contexto de navegação. | 3 | “Ver todos” e listas são níveis secundários com Voltar; sheets ficam reservados para ações curtas. |
| Consistência e padrões | Campos, sheets e opções tinham tratamentos locais e contraste desigual. | 3 | Input, InviteField, Item, OptionsSheet e feedback usam tokens e componentes do DS. |
| Prevenção de erros | Excluir aparecia no mesmo nível visual das ações reversíveis. | 4 | Ação destrutiva recebe cor semântica, fica por último e exige confirmação explícita. |
| Reconhecimento em vez de memorização | A pessoa precisava lembrar se a lista era privada ou compartilhada. | 2 | Tipo, ícone, quantidade e participantes ficam visíveis no header contextual. |
| Flexibilidade e eficiência | Convidar exigia passos sem atalho para grupos. | 3 | Envio direto por campo/Enter e link copiável ou compartilhável reduzem o caminho. |
| Design estético e minimalista | Um card grande repetia a privacidade abaixo do header. | 2 | Metadados foram condensados no header; avatares aparecem somente quando agregam contexto. |
| Recuperação de erros | Exclusão sem confirmação poderia causar perda acidental da organização. | 3 | Confirmação explica o impacto e preserva os títulos no catálogo e histórico. |
| Ajuda contextual | Ações novas não explicavam resultado e permissão. | 2 | Supporting texts curtos explicam colaboração, link e efeito da exclusão no ponto de uso. |

## Próximas validações

1. Confirmar se “entrar na lista” comunica colaboração sem exigir explicação adicional.
2. Medir se convite por link é encontrado antes da opção direta em cenários de grupo.
3. Verificar se a confirmação de exclusão reduz erro sem adicionar fricção excessiva.
4. Testar compreensão da diferença entre favorito, lista privada e lista compartilhada.

## Regra de navegação em linhas

- Chevron comunica navegação ou abertura de uma tarefa com conteúdo próprio.
- Marcador circular comunica seleção dentro do contexto atual.
- Ações imediatas não recebem chevron; o feedback confirma o resultado.
- Ações destrutivas ficam por último, usam cor semântica e exigem confirmação.

## Recuperação em listas

- Busca atua apenas na lista aberta e mantém o contexto visível.
- Chips mostram contagens por gênero para antecipar a composição da lista.
- “Avaliados” aparece quando existem títulos avaliados e reduz esforço para reencontrar algo recomendável.
- Favoritos sem avaliação continuam válidos; quando existe avaliação, o card mostra o grau de afinidade.
