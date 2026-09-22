# Registro da revisão estruturada e mudança de direção

**Nota de versão:** as hipóteses intermediárias abaixo registram a mudança da V1 para a V2. A formulação atual, agrupada em três oportunidades e H1–H8, está na [árvore de oportunidades](22-arvore-de-oportunidades.html) e na [síntese do case](10-documentacao.html).

**20 set 2026 · Fonte:** revisão estruturada da própria autora sobre o wireflow e a demo visual. **Não houve participantes externos.** Os pontos abaixo são achados de avaliação de design; ainda não validam comportamento de outras pessoas ou impacto no produto.

## O que apareceu

| Achado relatado | Interpretação de design | Decisão para V2 |
|---|---|---|
| A Home não situava a nova experiência | A jornada parecia começar pela função de indicar, e não pela descoberta do catálogo | Home geral com continuar, recomendações por interesse, populares e top assistidos |
| Recomendar exigia muitos cliques | Escolher contato e escrever motivo em tela dedicada aumentava o esforço | Compartilhar pelo sheet do sistema, com prévia do título; até três ações desde o detalhe para escolher o destino |
| `Ver ou indicar` dava protagonismo excessivo à indicação | A motivação principal é encontrar algo para assistir | Detalhe prioriza assistir/acesso; compartilhar e salvar são ações rápidas secundárias |
| Listas parecem mais práticas, pessoais ou compartilhadas | Guardar e organizar precisa acontecer sem interromper a escolha | Salvar em uma ação; listas acessíveis no Perfil, com privacidade explícita |
| Coleções não merece uma aba inferior | Navegação principal estava ocupada por uma função de menor frequência | Barra inferior: Início, Buscar e Loja; Perfil no cabeçalho abriga listas e histórico |
| Clips curtos podem apoiar descoberta | Um feed de trechos pode gerar sinal de interesse e alimentar listas | Exploração de Clips a partir da Home, com salvar e abrir título; avaliar valor antes de promovê-lo à navegação |
| Loja se parece com outro início e mistura ofertas | O catálogo precisa distinguir o que é grátis, aluguel e possível presente | Loja orientada por modalidade, preço e disponibilidade; presentear segue dependente de regra comercial |

## Nova tese do case

**Facilitar a decisão do que assistir é o centro da experiência.** Home, busca, listas e Loja conduzem a essa decisão. Compartilhar um título surge no contexto do detalhe e pode trazer alguém de volta por um link. A indicação continua sendo uma oportunidade para frequência de uso, sem precisar comandar a arquitetura principal.

## Hipóteses reformuladas por job

| ID | JTBD | Hipótese de resultado | Recorte atual |
|---|---|---|---|
| H1 · Decidir sozinho | Quando tenho opções demais ou só uma pista, quero chegar a poucos títulos relevantes para começar a assistir | Uma seleção orientada por sinais compreensíveis de relevância e acesso ajuda mais que uma vitrine sem direção | Home, Busca e Histórico no protótipo; Clips é experimento de formato |
| H2 · Decidir junto | Quando vou assistir com alguém, quero reunir e comparar opções viáveis para ambos sem perder a conversa | Shortlist colaborativa com contribuições de duas pessoas e acesso por conta ajuda a concluir a escolha mais que links isolados | Share sheet, link e lista compartilhada estão ilustrados; edição por duas pessoas e comparação ainda faltam |
| H3 · Acessar | Quando escolho ou recebo um título, quero saber se posso assistir e quanto custa antes de me comprometer | Modalidade, preço e prazo claros, com acesso recalculado no link, reduzem erro de interpretação | Estados grátis/aluguel/indisponível conceituais; regras comerciais pendentes |

**Decidir em dupla e lista colaborativa formam o mesmo job.** Compartilhar um título é um caminho rápido dentro dele. A lista mantém as opções ao longo do tempo; a comparação ajuda na decisão. Match percentual, quiz e IA só entram se a solução simples não resolver o problema observado.

## Critério de próxima avaliação

Observar três jobs: (1) achar algo para assistir sozinho; (2) duas pessoas montarem uma shortlist e escolherem uma opção viável; (3) explicar custo e disponibilidade ao abrir um título ou link. Registrar primeiro caminho, desvios, contribuições de cada pessoa, entendimento de permissão e acesso, e decisão final. Clips recebe avaliação de formato dentro de H1. Não inferir impacto nos 4% sem dados de produto.

## Registro Learning

**Esperávamos:** que a indicação individual merecesse fluxo e espaço próprios. **Observamos na revisão:** fricção no envio e pouca clareza da Home; listas e descoberta pareceram mais úteis. **Aprendemos:** o fluxo social pode funcionar melhor como ação contextual e retorno por link. **Decisão:** simplificar compartilhar, mover listas para Perfil e recentrar Home/Loja na escolha do que assistir. **Limite:** nenhuma pessoa externa usou a V2; essas decisões seguem hipóteses de design.
