# Auditoria de uso do Design System

## Corrigido

- A experiência passou a importar a biblioteca por um único barrel: `@/design-system`.
- Removidos adaptadores locais de Button, Badge, Chip e IconButton.
- Criar lista agora usa Sheet, SheetHeader, SheetTitle, SheetDescription, Input, Item selecionável e SheetFooter.
- Adicionar à lista usa OptionsSheet, Item e IconButton do DS.
- Indicar usa ShareSheet e ActionTile do DS.
- Favoritos usa QuickRecommendationCard.
- Cabeçalho de catálogo usa AppHeader.
- Cabeçalhos de seção usam SectionHeader, incluindo ação customizada.

## Ainda fora do DS

- CommerceSheet mantém shell e controles locais por ter fluxo em múltiplas etapas.
- Indicador de páginas do Em cena é específico do player e ainda está na experiência.
- Layout estrutural de hero, catálogo e detalhe continua sendo composição de tela, como esperado.

## Próxima consolidação

Transformar CommerceSheet em `PurchaseSheet` dentro de compositions, usando Sheet, Item, Button e estados padronizados.
# Correções de fundação

- `border` diferencia superfícies com baixo contraste, sem contornar cards em excesso.
- `input` dá contorno perceptível aos controles sobre `background`, `card` e `popover`.
- `ring` mantém foco em azul Mercado Livre, sem depender da cor da borda em repouso.
- `Switch` representa estados binários persistentes sem fechar o contexto atual.
- `Sonner` centraliza feedback transitório; toasts ficam limitados ao shell mobile.
- `SectionHeader/size=sm` preserva a hierarquia de grupos dentro de sheets.
- `SectionHeader/size=compact` padroniza títulos de seções densas com ações laterais.
- `Chip/count` mantém a contagem em uma badge interna reutilizável.
- `ParticipantRow` combina Avatar, papel e ação contextual na gestão de pessoas.
- `Input`, `Select` e `Combobox` usam `input` como superfície comum, `border` discreta no repouso e `ring` azul apenas no foco.
