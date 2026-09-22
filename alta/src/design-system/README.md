# Mercado Play Design System

O protótipo importa componentes exclusivamente por `@/design-system`.

## Camadas

- `components/ui`: primitives baseados em shadcn/Radix.
- `components/compositions`: padrões de produto compostos por primitives.
- `design-system/index.js`: API pública usada pela experiência.
- `globals.css`: tokens semânticos e foundations.
- `ds.jsx`: documentação e preview dos estados.

## Regra de uso

Telas não devem recriar Button, Badge, Chip, IconButton, Sheet, Item ou headers com CSS local. Uma necessidade nova entra primeiro como variante do primitive ou composition e depois é consumida pela experiência.
