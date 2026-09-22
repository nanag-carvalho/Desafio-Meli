import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "motion/react";
import * as Popover from "@radix-ui/react-popover";
import {
  Play,
  Plus,
  Heart,
  Star,
  Search,
  ChevronRight,
  Volume2,
  Share2,
  Info,
  Check,
  LoaderCircle,
  AlertCircle,
  X,
  Lock,
  Users,
  MessageCircle,
  Link2,
  SlidersHorizontal,
  CheckCircle2,
  FolderHeart,
  Home,
  ShoppingBag,
  Clapperboard,
  ArrowLeft,
  ListPlus,
  UserPlus,
  WandSparkles,
} from "lucide-react";
import { Button as ShadButton } from "@/components/ui/button";
import { Badge as ShadBadge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DropdownSelect } from "@/components/ui/dropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import { ActionTile } from "@/components/compositions/action-tile";
import { Item } from "@/components/ui/item";
import { AppHeader } from "@/components/compositions/app-header";
import { BottomNavigationItem } from "@/components/compositions/bottom-navigation-item";
import { MediaPlayer } from "@/components/compositions/media-player";
import { TitleRow } from "@/components/compositions/title-row";
import { EpisodeRow } from "@/components/compositions/episode-row";
import { ListCard } from "@/components/compositions/list-card";
import { MediaCard } from "@/components/compositions/media-card";
import { RatingAction } from "@/components/compositions/rating-action";
import { OptionsSheet } from "@/components/compositions/options-sheet";
import { ShareSheet } from "@/components/compositions/share-sheet";
import { SectionHeader } from "@/components/compositions/section-header";
import { QuickRecommendationCard } from "@/components/compositions/quick-recommendation-card";
import { Avatar } from "@/components/ui/avatar";
import { ParticipantAvatar } from "@/components/compositions/participant-avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import "./globals.css";
import "./styles.css";
import "./ds.css";
const art = "../../assets/prototipo/cidade-luz.png";
const specs = {
  Button: {
    size: "40 px · ícone 16 px",
    tokens: [
      "size/control-md · 40px",
      "space/3 · 12px horizontal",
      "space/2 · 8px gap",
      "radius/md · 8px",
      "type/body-emphasis · 14/20 · 500",
      "color/primary ou accent + respectivos foregrounds",
      "focus/ring · 2px / 35%",
    ],
    code: '<Button variant="default" size="default">Assistir agora</Button>\n<Button variant="accent">Continuar</Button>\n<Button variant="ghost">Avaliar</Button>\n<Button variant="link" iconPosition="end">Ver todos</Button>',
  },
  "Icon button": {
    size: "40 × 40 px · ícone 18 px",
    tokens: [
      "size/control-md · 40px",
      "radius/full · 999px",
      "color/secondary + foreground",
      "color/primary no estado active",
      "border/default · 1px",
      "motion/press · scale .88",
    ],
    code: '<IconButton state="active" icon={Heart} label="Favorito" />',
  },
  "Chip and badge": {
    size: "Chip 34 px · Badge 20 px",
    tokens: [
      "size/chip · 34px",
      "space/3 · 12px horizontal",
      "radius/full · 999px",
      "type/caption · 12/16 · 600",
      "border/default · 1px",
      "color/primary no estado selected",
    ],
    code: '<Chip state="active">Filmes</Chip>\n<Badge tone="success">Incluído</Badge>',
  },
  Field: {
    size: "40 px · label + help + error",
    tokens: [
      "size/field · 40px",
      "space/3 · 12px horizontal",
      "space/2 · 8px gap",
      "radius/md · 8px",
      "type/body-default · 14/20 · 400",
      "color/input + foreground",
      "focus/ring · 2px / 35%",
    ],
    code: '<Field label="Buscar">\n  <Input placeholder="Filme, pessoa ou gênero" />\n</Field>',
  },
  Input: {
    size: "40 px · icon optional",
    tokens: [
      "size/field · 40px",
      "space/3 · 12px horizontal",
      "radius/md · 8px",
      "type/body-default · 14/20 · 400",
      "placeholder/muted-foreground · 70%",
      "focus/ring · 2px / 35%",
    ],
    code: '<Input aria-label="Buscar" placeholder="Filme, pessoa ou gênero" />',
  },
  Select: {
    size: "40 px · single choice",
    tokens: [
      "size/field · 40px",
      "radius/md · 8px",
      "type/body-default · 14/20 · 400",
      "color/popover + border",
      "Radix · keyboard + selection",
    ],
    code: '<DropdownSelect defaultValue="all" options={catalogOptions} />',
  },
  Combobox: {
    size: "40 px · filterable multiselect",
    tokens: [
      "size/field · 40px",
      "radius/md · 8px",
      "type/body-default · 14/20 · 400",
      "color/popover + border",
      "filter · seleção múltipla · clear selection",
    ],
    code: '<Combobox multiple items={genres} placeholder="Buscar gênero" />',
  },
  Menu: {
    size: "item 36 px · contextual actions",
    tokens: [
      "size/menu-item · 36px",
      "radius/md · 8px",
      "type/body-default · 14/20 · 400",
      "color/popover + border",
      "Radix · keyboard + escape",
    ],
    code: "<Menu>\n  <MenuItem>Adicionar à lista</MenuItem>\n</Menu>",
  },
  Tabs: {
    size: "trigger 40 px · line ou contained",
    tokens: [
      "size/control-md · 40px",
      "radius/md · 8px",
      "type/body-emphasis · 14/20 · 500",
      "focus/ring blue",
      "Radix · roving focus",
    ],
    code: '<Tabs defaultValue="details">...</Tabs>',
  },
  Toggle: {
    size: "40 px · off / on",
    tokens: [
      "size/control-md · 40px",
      "radius/md · 8px",
      "type/body-emphasis · 14/20 · 500",
      "accent/blue when on",
      "Radix · pressed state",
    ],
    code: '<Toggle aria-label="Ativar lembrete"><Bell /></Toggle>',
  },
  "Action tile": {
    size: "mín. 64 × 64 px · ícone 20 px",
    tokens: [
      "size/action-tile · 64px",
      "space/1.5 · 6px gap",
      "radius/lg · 12px",
      "type/label-small · 12/18 · 600",
      "focus/ring blue",
    ],
    code: '<ActionTile icon={Share2} label="Indicar" />\n<ActionTile variant="surface" icon={MessageCircle} label="Mensagens" />',
  },
  Item: {
    size: "mín. 64 px · thumbnail 40 × 48 px",
    tokens: [
      "size/item · 64px",
      "space/2 · 8px inset",
      "space/3 · 12px gap",
      "radius/lg · 12px",
      "type/body-emphasis + label-muted",
      "focus/ring blue",
    ],
    code: '<Item title="Noite em família" supporting="3 participantes" />\n<Item selectable selected title="Drama" />',
  },
  Card: {
    size: "surface container · sem regra de mídia",
    tokens: [
      "surface/card",
      "radius/xl · 16px",
      "space/4 · 16px",
      "border/default",
      "type/heading-h4 + body-default",
    ],
    code: "<Card><CardHeader>...</CardHeader><CardContent>...</CardContent></Card>",
  },
  "Media card": {
    size: "poster 176 × 271 · ranking 176 × 271 · landscape 290 × 213",
    tokens: [
      "size/media-card-poster · 176px",
      "size/media-card-poster-art · 218px",
      "size/media-card-ranking · 176px",
      "size/media-card-landscape · 290px",
      "size/media-card-landscape-art · 160px",
      "space/3 · 12px entre mídia e texto",
      "radius/lg · 12px somente na mídia",
      "type/body-emphasis + label-muted",
    ],
    code: '<MediaCard format="ranking" rank={2} image={art} badge="Top 10" title="Top 10 hoje" metadata="Filme · Animação" />',
  },
  "Scroll area": {
    size: "trilho 4 px · fundo transparente",
    tokens: [
      "scrollbar/size · 6px",
      "scrollbar/track · transparent",
      "scrollbar/thumb · muted-foreground/45",
      "radius/full · 999px",
      "focus/ring · 2px / 35%",
    ],
    code: '<ScrollArea className="h-48">...</ScrollArea>',
  },
  Skeleton: {
    size: "herda a geometria do conteúdo",
    tokens: [
      "color/muted",
      "radius/md · 8px",
      "motion/shimmer · 1350ms",
      "prefers-reduced-motion · estático",
    ],
    code: '<Skeleton className="h-40 w-full" />',
  },
  "Section header": {
    size: "mín. 40 px · title + link opcional",
    tokens: [
      "type/heading-h3",
      "core/button-link",
      "space/3 · 12px",
      "size/control-md · 40px",
    ],
    code: '<SectionHeader title="Minha lista" actionLabel="Ver tudo" />',
  },
  "Quick recommendation card": {
    size: "176 px · mídia 218 px · ação 40 px",
    tokens: [
      "size/media-card-poster · 176px",
      "size/media-card-poster-art · 218px",
      "core/button-ghost",
      "core/badge",
      "source/rated | favorite | history",
    ],
    code: '<QuickRecommendationCard source="rated" image={art} title="Cidade Luz" />',
  },
  "App header": {
    size: "mín. 56 px · leading + title + actions",
    tokens: [
      "size/header · 56px",
      "space/4 · 16px horizontal",
      "border/default · 1px",
      "type/heading-h4",
      "surface/background + blur",
    ],
    code: '<AppHeader leading={back} title="Detalhes" actions={actions} />',
  },
  "Bottom navigation item": {
    size: "mín. 56 × 52 px · ícone 20 px",
    tokens: [
      "size/navigation-item · 56 × 52px",
      "radius/lg · 12px",
      "type/label-caption",
      "active/primary",
      "focus/ring blue",
    ],
    code: '<BottomNavigationItem icon={Home} label="Início" active />',
  },
  "Media player": {
    size: "embedded 16:9 · immersive 9:16",
    tokens: [
      "aspect/video · 16:9",
      "aspect/scene · 9:16",
      "surface/glass",
      "border/default · 1px",
      "progress/primary · 4px",
      "controls/button-icon",
    ],
    code: '<MediaPlayer variant="embedded" ... />\n<MediaPlayer variant="immersive" ... />',
  },
  "Title and episode rows": {
    size: "Item compositions · mín. 64 px",
    tokens: [
      "core/item",
      "media/thumbnail",
      "type/body-emphasis + label-muted",
      "trailing/status-or-action",
      "focus/ring blue",
    ],
    code: '<TitleRow ... />\n<EpisodeRow number="1" duration="42min" ... />',
  },
  "List card": {
    size: "Card + stacked Items",
    tokens: [
      "core/card",
      "core/item",
      "space/2 · 8px",
      "border/default · 1px",
      "surface/card",
    ],
    code: '<ListCard title="Episódios"><EpisodeRow ... /></ListCard>',
  },
  "Rating popover": {
    size: "Trigger 40 px · opção 40 px",
    tokens: [
      "size/control-md · 40px",
      "space/2 · 8px",
      "radius/lg · 12px",
      "type/caption · 12/16 · 600",
      "color/popover + popover-foreground",
      "shadow/overlay",
      "motion/enter · scale + fade",
    ],
    code: "<Popover>\n  <PopoverTrigger>Avaliar</PopoverTrigger>\n  <PopoverContent>3 opções</PopoverContent>\n</Popover>",
  },
  Navigation: {
    size: "64 px · item mínimo 56 × 52 px",
    tokens: [
      "size/navigation · 64px",
      "space/1 · 4px inset",
      "radius/2xl · 20px",
      "type/caption · 12/16 · 600",
      "color/card/90 + backdrop blur",
      "color/primary no destino ativo",
    ],
    code: '<Navigation active="home" items={navigationItems} />',
  },
  "Scene actions": {
    size: "FAB 40 × 40 px · stack gap 16 px",
    tokens: [
      "size/control-md · 40px",
      "space/2 · 8px label gap",
      "radius/full · 999px",
      "type/caption · 12/16 · 600",
      "color/secondary/70 + backdrop blur",
      "motion/press · scale .88",
    ],
    code: '<SceneActions actions={["sound","list","favorite","share","info"]} />',
  },
  "Options sheet": {
    size: "máx. 420 px · itens 56 px",
    tokens: [
      "size/control-md · FAB 40px",
      "core/item · mín. 56px",
      "radius/2xl · 20px",
      "surface/popover + overlay",
      "motion/sheet · slide from bottom",
    ],
    code: '<OptionsSheet title="Criar" options={createOptions} />',
  },
  "Share sheet": {
    size: "máx. 390 px · raio 20 px",
    tokens: [
      "space/4 · 16px inset",
      "space/3 · 12px vertical",
      "radius/2xl · 20px",
      "type/title + type/body + type/caption",
      "color/popover + border",
      "shadow/overlay · 0 -20 50",
    ],
    code: '<ShareSheet title={title} access="check-on-open" channels={channels} />',
  },
};
function Button({
  children,
  variant = "default",
  state = "default",
  icon: Icon = Play,
  iconPosition = "start",
}) {
  const v = variant;
  const glyph =
    state === "loading" ? <LoaderCircle className="spin" /> : <Icon />;
  return (
    <motion.div whileTap={state === "disabled" ? {} : { scale: 0.96 }}>
      <ShadButton
        variant={v}
        disabled={state === "disabled"}
        aria-busy={state === "loading"}
      >
        {iconPosition === "start" && glyph}
        <span>{children}</span>
        {iconPosition === "end" && glyph}
      </ShadButton>
    </motion.div>
  );
}
function IconButton({
  state = "default",
  icon: Icon = Heart,
  label = "Favorito",
}) {
  return (
    <motion.div whileTap={state === "disabled" ? {} : { scale: 0.88 }}>
      <ShadButton
        size="icon"
        variant={state === "active" ? "default" : "secondary"}
        disabled={state === "disabled"}
        className="rounded-full"
        aria-label={label}
      >
        <Icon size={18} fill={state === "active" ? "currentColor" : "none"} />
      </ShadButton>
    </motion.div>
  );
}
function Chip({ children, state = "default" }) {
  return (
    <ShadButton
      size="sm"
      variant={state === "active" ? "default" : "outline"}
      disabled={state === "disabled"}
      className="h-[34px] rounded-full px-3"
    >
      {children}
    </ShadButton>
  );
}
function Badge({ children, tone = "neutral" }) {
  return (
    <ShadBadge
      variant={tone === "neutral" ? "secondary" : "default"}
      className={
        tone === "success"
          ? "bg-success text-black"
          : tone === "brand"
            ? "bg-primary text-primary-foreground"
            : ""
      }
    >
      {children}
    </ShadBadge>
  );
}
function Field({ label, help, error, children }) {
  return (
    <label className={`form-field${error ? " is-error" : ""}`}>
      <span>{label}</span>
      {children}
      {(help || error) && <small>{error || help}</small>}
    </label>
  );
}
function Combobox() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [values, setValues] = useState([]);
  const genres = [
    "Ação",
    "Comédia",
    "Drama",
    "Documentário",
    "Ficção científica",
  ];
  const results = genres.filter((x) =>
    x.toLowerCase().includes(query.toLowerCase()),
  );
  const toggle = (item) => {
    setValues((current) =>
      current.includes(item)
        ? current.filter((value) => value !== item)
        : [...current, item],
    );
  };
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button className="combo-trigger" aria-label="Selecionar gênero">
          <Search />
          <span>
            {values.length
              ? `${values.length} gêneros selecionados`
              : "Buscar gênero"}
          </span>
          <ChevronRight className="combo-chevron" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="combo-popover" sideOffset={8} align="start">
          <div className="combo-search">
            <Search />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              placeholder="Buscar gênero"
            />
          </div>
          <div className="combo-list">
            {results.length ? (
              results.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    toggle(item);
                  }}
                >
                  <span>{item}</span>
                  {values.includes(item) && <Check />}
                </button>
              ))
            ) : (
              <p>Nenhum gênero encontrado</p>
            )}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
function Menu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ShadButton variant="outline" className="menu-trigger">
          <SlidersHorizontal />
          Ações
          <ChevronRight className="menu-chevron" />
        </ShadButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="menu-content">
        <DropdownMenuLabel>Este título</DropdownMenuLabel>
        <DropdownMenuItem>
          <Plus />
          Adicionar à lista
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Heart />
          Favoritar
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Share2 />
          Indicar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
function SpecDetails({ name }) {
  const spec = specs[name];
  if (!spec) return null;
  return (
    <details className="spec-details">
      <summary>
        <span>Tokens e código</span>
        <b>{spec.size}</b>
        <ChevronRight />
      </summary>
      <div className="spec-panel">
        <div>
          <small>TOKENS APLICADOS</small>
          <ul>
            {spec.tokens.map((token) => (
              <li key={token}>
                <code>{token}</code>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <small>EXEMPLO</small>
          <pre>
            <code>{spec.code}</code>
          </pre>
        </div>
      </div>
    </details>
  );
}
const Block = ({ name, meta, children }) => {
  const id = name.toLowerCase().replaceAll(" ", "-");
  return (
    <Card id={id} className="ds-block">
      <CardContent>
        <div className="block-head">
          <div>
            <h2>{name}</h2>
            <p>{meta}</p>
          </div>
          <code>{name.toLowerCase().replaceAll(" ", "-")}</code>
        </div>
        {children}
        <SpecDetails name={name} />
      </CardContent>
    </Card>
  );
};
function Catalog() {
  const [rating, setRating] = useState("");
  useEffect(() => {
    const links = [...document.querySelectorAll(".doc-nav nav a[href^='#']")];
    const sections = links
      .map((link) =>
        document.getElementById(link.getAttribute("href").slice(1)),
      )
      .filter(Boolean);
    const setActive = (id) => {
      links.forEach((link) => {
        const active = link.getAttribute("href") === `#${id}`;
        if (active) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    };
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-18% 0px -72% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    setActive(location.hash.slice(1) || "color-tokens");
    return () => observer.disconnect();
  }, []);
  return (
    <div className="docs-shell">
      <aside className="doc-nav">
        <div className="side-brand">
          <div className="ds-mark">MP</div>
          <div>
            <b>Mercado Play</b>
            <small>Design System · 0.2</small>
          </div>
        </div>
        <ScrollArea className="doc-nav-scroll">
          <nav>
            <span>FOUNDATIONS</span>
            <a href="#color-tokens">Color</a>
            <a href="#type-scale">Typography</a>
            <a href="#spacing-&-radius">Spacing & radius</a>
            <span>CORE</span>
            <a href="#button">Button</a>
            <a href="#icon-button">Icon button</a>
            <a href="#chip-and-badge">Chip & badge</a>
            <a href="#field">Field</a>
            <a href="#input">Input</a>
            <a href="#select">Select</a>
            <a href="#combobox">Combobox</a>
            <a href="#menu">Menu</a>
            <a href="#tabs">Tabs</a>
            <a href="#toggle">Toggle</a>
            <a href="#item">Item</a>
            <a href="#card">Card</a>
            <a href="#skeleton">Skeleton</a>
            <a href="#scroll-area">Scroll area</a>
            <a href="#rating-popover">Popover</a>
            <span>COMPOSITIONS</span>
            <a href="#action-tile">Action tile</a>
            <a href="#app-header">App header</a>
            <a href="#bottom-navigation-item">Bottom navigation item</a>
            <a href="#navigation">Navigation</a>
            <a href="#media-player">Media player</a>
            <a href="#media-card">Media card</a>
            <a href="#section-header">Section header</a>
            <a href="#quick-recommendation-card">Quick recommendation card</a>
            <a href="#title-and-episode-rows">Title & episode rows</a>
            <a href="#list-card">List card</a>
            <a href="#scene-actions">Scene actions</a>
            <a href="#options-sheet">Options sheet</a>
            <a href="#share-sheet">Share sheet</a>
          </nav>
        </ScrollArea>
        <div className="nav-foot">
          <i />
          Dark only · WCAG AA
        </div>
      </aside>
      <div className="catalog">
        <header className="catalog-head">
          <div>
            <span>Mercado Play · UI Kit</span>
            <h1>Mini Design System</h1>
            <p>
              Componentes reutilizáveis, variantes, estados e composições do
              protótipo em alta.
            </p>
          </div>
          <a href="./">
            Abrir experiência <ChevronRight />
          </a>
        </header>
        <div className="ds-meta">
          <div>
            <span>STATUS</span>
            <b>Active</b>
          </div>
          <div>
            <span>PLATFORM</span>
            <b>Responsive web · mobile first</b>
          </div>
          <div>
            <span>VERSION</span>
            <b>0.2 · case study</b>
          </div>
          <div>
            <span>STACK</span>
            <b>shadcn + Radix + Motion</b>
          </div>
        </div>
        <div className="source">
          <div>
            <b>shadcn</b>
            <span>tokens, composição e código local</span>
          </div>
          <div>
            <b>Radix UI</b>
            <span>popover e primitives acessíveis</span>
          </div>
          <div>
            <b>Motion</b>
            <span>gestos, transições e feedback</span>
          </div>
          <div>
            <b>Lucide</b>
            <span>ícones consistentes</span>
          </div>
        </div>
        <Block name="Color tokens" meta="Variáveis semânticas · somente Dark">
          <div className="token-grid">
            {[
              "background",
              "foreground",
              "card",
              "popover",
              "primary",
              "secondary",
              "muted",
              "accent",
              "success",
              "warning",
              "destructive",
              "border",
            ].map((x) => (
              <div key={x}>
                <i className={x} />
                <b>{x}</b>
                <small>var(--{x})</small>
              </div>
            ))}
          </div>
        </Block>
        <Block
          name="Type scale"
          meta="Base shadcn · 11 estilos locais · espelho exato do Figma"
        >
          <div className="type-scale figma-type-styles">
            <div>
              <small>Display · 32/38 · 800 · −1px</small>
              <span className="type-display">Escolha algo para hoje</span>
            </div>
            <div>
              <small>Heading/H1 · 24/30 · 800 · −1%</small>
              <span className="type-h1">Mercado Play</span>
            </div>
            <div>
              <small>Heading/H2 · 20/26 · 700 · −0,5%</small>
              <span className="type-h2">Recomendados para você</span>
            </div>
            <div>
              <small>Heading/H3 · 18/24 · 600</small>
              <span className="type-h3">Continue assistindo</span>
            </div>
            <div>
              <small>Heading/H4 · 16/20 · 600</small>
              <span className="type-h4">Detalhes do título</span>
            </div>
            <div>
              <small>Body/Default · 14/20 · 400</small>
              <span className="type-body">
                Descrição e informações complementares do conteúdo.
              </span>
            </div>
            <div>
              <small>Body/Lead · 16/24 · 400</small>
              <span className="type-body-lead">
                Uma introdução curta para orientar a decisão.
              </span>
            </div>
            <div>
              <small>Body/Emphasis · 14/20 · 500</small>
              <span className="type-body-emphasis">Assistir agora</span>
            </div>
            <div>
              <small>Label/Small · 12/18 · 600</small>
              <span className="type-label-small">INCLUÍDO</span>
            </div>
            <div>
              <small>Label/Muted · 12/18 · 400</small>
              <span className="type-label-muted">Comédia · 1h 51min</span>
            </div>
            <div>
              <small>Label/Caption · 10/14 · 500</small>
              <span className="type-label-caption">NOVO EPISÓDIO</span>
            </div>
          </div>
        </Block>
        <Block
          name="Spacing & radius"
          meta="escala 4pt · Button e Field alinhados em 40px"
        >
          <div className="measure-grid">
            <div>
              <i style={{ width: 4 }} />
              <span>4</span>
            </div>
            <div>
              <i style={{ width: 8 }} />
              <span>8</span>
            </div>
            <div>
              <i style={{ width: 12 }} />
              <span>12</span>
            </div>
            <div>
              <i style={{ width: 16 }} />
              <span>16</span>
            </div>
            <div>
              <i style={{ width: 24 }} />
              <span>24</span>
            </div>
            <div>
              <i style={{ width: 32 }} />
              <span>32</span>
            </div>
          </div>
          <div className="radius-grid">
            <i>6</i>
            <i>8</i>
            <i>12</i>
            <i>16</i>
            <i>20</i>
          </div>
        </Block>
        <Block
          name="Button"
          meta="variant: default | accent | secondary | outline | ghost | destructive | link · state: default | pressed | disabled | loading"
        >
          <div className="state-grid">
            <label>
              Default<Button>Assistir agora</Button>
            </label>
            <label>
              Accent
              <Button variant="accent" icon={ChevronRight}>
                Continuar
              </Button>
            </label>
            <label>
              Secondary
              <Button variant="secondary" icon={Plus}>
                Adicionar
              </Button>
            </label>
            <label>
              Outline
              <Button variant="outline" icon={Info}>
                Detalhes
              </Button>
            </label>
            <label>
              Ghost
              <Button variant="ghost" icon={Star}>
                Avaliar
              </Button>
            </label>
            <label>
              Link
              <Button variant="link" icon={ChevronRight} iconPosition="end">
                Ver todos
              </Button>
            </label>
            <label>
              Loading<Button state="loading">Carregando</Button>
            </label>
            <label>
              Disabled<Button state="disabled">Indisponível</Button>
            </label>
          </div>
        </Block>
        <Block
          name="Icon button"
          meta="40px · state: default | active | disabled"
        >
          <div className="state-row">
            <IconButton />
            <IconButton state="active" />
            <IconButton state="disabled" />
            <IconButton icon={Share2} label="Compartilhar" />
            <IconButton icon={Volume2} label="Som" />
          </div>
        </Block>
        <Block name="Chip and badge" meta="seleção, filtro e disponibilidade">
          <div className="state-row">
            <Chip>Filmes</Chip>
            <Chip state="active">Filmes</Chip>
            <Chip state="disabled">Filmes</Chip>
            <Badge tone="success">Incluído</Badge>
            <Badge tone="brand">Alugar</Badge>
            <Badge>Indisponível</Badge>
          </div>
        </Block>
        <Block name="Field" meta="label, input e mensagem de apoio">
          <div className="field-grid">
            <Field label="Buscar título" help="Filmes, séries ou pessoas">
              <div className="input-with-icon">
                <Search />
                <Input
                  placeholder="Ex.: Cidade Luz"
                  aria-label="Buscar título"
                />
              </div>
            </Field>
            <Field label="E-mail" error="Use um e-mail válido">
              <Input aria-invalid="true" defaultValue="nagela@" />
            </Field>
          </div>
        </Block>
        <Block
          name="Input"
          meta="texto livre · empty, filled, disabled e error"
        >
          <div className="field-grid input-states">
            <Input placeholder="Buscar no catálogo" aria-label="Campo vazio" />
            <Input defaultValue="Harry Potter" aria-label="Campo preenchido" />
            <Input
              defaultValue="Indisponível"
              disabled
              aria-label="Campo desabilitado"
            />
            <Input
              defaultValue="Tente novamente"
              aria-invalid="true"
              aria-label="Campo com erro"
            />
          </div>
        </Block>
        <Block name="Select" meta="uma escolha · variante do Dropdown">
          <DropdownSelect
            ariaLabel="Filtrar catálogo"
            defaultValue="all"
            options={[
              { value: "all", label: "Todos os títulos" },
              { value: "included", label: "Incluídos" },
              { value: "rent", label: "Alugar ou comprar" },
            ]}
          />
        </Block>
        <Block name="Combobox" meta="pesquisa dentro de uma lista de opções">
          <Combobox />
        </Block>
        <Block name="Menu" meta="ações contextuais, com teclado e escape">
          <Menu />
        </Block>
        <Block name="Tabs" meta="troca de contexto sem sair da tela">
          <Tabs defaultValue="details" className="tabs-demo">
            <TabsList variant="line">
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="episodes">Episódios</TabsTrigger>
              <TabsTrigger value="similar">Semelhantes</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              Sinopse, acesso e ações do título.
            </TabsContent>
            <TabsContent value="episodes">
              Lista de episódios disponíveis.
            </TabsContent>
            <TabsContent value="similar">
              Títulos para continuar descobrindo.
            </TabsContent>
          </Tabs>
        </Block>
        <Block name="Toggle" meta="estado binário de baixa frequência">
          <div className="state-row">
            <Toggle aria-label="Ativar lembrete">
              <Volume2 />
              Som
            </Toggle>
            <Toggle defaultPressed aria-label="Favorito">
              <Heart />
              Favorito
            </Toggle>
          </div>
        </Block>
        <Block name="Action tile" meta="ações rápidas em título e sheet">
          <div className="action-tile-grid">
            <ActionTile icon={Plus} label="Lista" />
            <RatingAction />
            <ActionTile icon={Heart} label="Favorito" active />
            <ActionTile icon={Share2} label="Indicar" />
            <ActionTile icon={Info} label="Detalhes" />
            <ActionTile
              variant="surface"
              icon={MessageCircle}
              label="Mensagens"
            />
          </div>
        </Block>
        <Block
          name="Rating popover"
          meta="três sinais explícitos · retorna como ícone + Avaliado"
        >
          <div className="popover-demo">
            <RatingAction value={rating} onValueChange={setRating} />
          </div>
        </Block>
        <Block
          name="Item"
          meta="linha navegável para listas, histórico e resultados"
        >
          <div className="item-demo">
            <Item
              thumbnail={art}
              title="Cidade Luz"
              supporting="Comédia · 1h 51min"
              disclosure
            />
            <Item
              icon={FolderHeart}
              title="Noite em família"
              supporting="3 participantes"
              trailing={<Users />}
            />
            <Item
              variant="plain"
              title="Participante"
              supporting="Variante para listas dentro de sheets"
            />
            <div className="flex items-start gap-4">
              <Avatar initials="NC" />
              <ParticipantAvatar initials="NC" label="Você" owner />
              <ParticipantAvatar initials="RA" label="RA" onRemove={() => {}} />
            </div>
            <Item
              selectable
              title="Drama"
              supporting="Choice row · não selecionado"
            />
            <Item
              selectable
              selected
              title="Comédia"
              supporting="Choice row · selecionado"
            />
          </div>
        </Block>
        <Block
          name="Card"
          meta="primitive de superfície · default, interactive, elevated e glass"
        >
          <div className="card-variants">
            {["default", "interactive", "elevated", "glass"].map((variant) => (
              <Card
                className="content-card-demo"
                size="sm"
                variant={variant}
                key={variant}
              >
                <CardHeader>
                  <Badge tone={variant === "glass" ? "brand" : "success"}>
                    {variant}
                  </Badge>
                  <CardTitle>Superfície de conteúdo</CardTitle>
                </CardHeader>
                <CardContent>
                  Base para agrupamentos; títulos usam a composição Media card.
                </CardContent>
              </Card>
            ))}
          </div>
        </Block>
        <Block
          name="Skeleton"
          meta="carregamento estrutural · mídia, texto e navegação"
        >
          <div className="skeleton-demo" aria-label="Exemplos de carregamento">
            <Skeleton className="skeleton-demo-art" />
            <div>
              <Skeleton className="skeleton-demo-title" />
              <Skeleton className="skeleton-demo-copy" />
              <Skeleton className="skeleton-demo-copy short" />
            </div>
          </div>
        </Block>
        <Block
          name="Scroll area"
          meta="scroll fino, transparente e sem contêiner próprio"
        >
          <ScrollArea className="scroll-area-demo">
            <div className="scroll-demo-list">
              {[
                "Disponível para download",
                "Aclamados pela crítica",
                "Adaptações de livros",
                "Animes",
                "Brasileiros",
                "Comédias",
                "Documentários",
                "Dramas",
              ].map((item) => (
                <button className="scroll-demo-item" key={item}>
                  {item}
                </button>
              ))}
            </div>
          </ScrollArea>
        </Block>
        <Block name="App header" meta="voltar, título contextual e ações">
          <div className="header-demo">
            <AppHeader
              title="Detalhes do título"
              leading={<IconButton icon={ArrowLeft} label="Voltar" />}
              actions={<IconButton icon={Share2} label="Compartilhar" />}
            />
          </div>
        </Block>
        <Block name="Bottom navigation item" meta="ícone, label e estado ativo">
          <div className="bottom-items-demo">
            <BottomNavigationItem icon={Home} label="Início" active />
            <BottomNavigationItem icon={ShoppingBag} label="Loja" />
            <BottomNavigationItem icon={Clapperboard} label="Em cena" />
            <BottomNavigationItem icon={Search} label="Buscar" />
          </div>
        </Block>
        <Block
          name="Navigation"
          meta="shared layout indicator · destinos principais"
        >
          <div className="nav-demo">
            <BottomNavigationItem icon={Home} label="Início" active />
            <BottomNavigationItem icon={ShoppingBag} label="Loja" />
            <BottomNavigationItem icon={Clapperboard} label="Em cena" />
            <BottomNavigationItem icon={Search} label="Buscar" />
          </div>
        </Block>
        <Block
          name="Media player"
          meta="primitive sem Card · embedded para detalhe e immersive para Em cena"
        >
          <ScrollArea orientation="horizontal" className="media-player-scroll">
            <div className="media-player-variants">
              <MediaPlayer
                className="media-player-demo"
                poster={art}
                title="Cidade Luz"
                progress={28}
              />
              <MediaPlayer
                className="media-player-scene-demo"
                variant="immersive"
                poster={art}
                title="Cidade Luz · Em cena"
                progress={42}
              />
            </div>
          </ScrollArea>
        </Block>
        <Block
          name="Media card"
          meta="estrutura espelhada do Figma · conteúdo fora da mídia"
        >
          <ScrollArea orientation="horizontal" className="media-card-scroll">
            <div className="media-card-demo">
              <MediaCard
                image={art}
                badge="Incluído"
                title="A Era do Gelo"
                metadata="Filme · Animação"
              />
              <MediaCard
                format="ranking"
                rank={2}
                image={art}
                badge="Top 10"
                title="Top 10 hoje"
                metadata="Filme · Animação"
              />
              <MediaCard
                format="landscape"
                image={art}
                badge="Alugar"
                badgeTone="rent"
                title="Harry Potter"
                metadata="Filme · Fantasia"
              />
            </div>
          </ScrollArea>
        </Block>
        <Block
          name="Section header"
          meta="cabeçalho de rail · título + ação opcional"
        >
          <div className="section-header-demo">
            <SectionHeader title="Séries e filmes que você curtiu" />
            <SectionHeader title="Minha lista" actionLabel="Ver tudo" />
          </div>
        </Block>
        <Block
          name="Quick recommendation card"
          meta="avaliados, favoritos e histórico prontos para indicar"
        >
          <ScrollArea
            orientation="horizontal"
            className="quick-recommendation-scroll"
          >
            <div className="quick-recommendation-demo">
              <QuickRecommendationCard
                image={art}
                title="Cidade Luz"
                source="rated"
              />
              <QuickRecommendationCard
                image={art}
                title="Cidade Luz"
                source="favorite"
              />
              <QuickRecommendationCard
                image={art}
                title="Cidade Luz"
                source="history"
              />
            </div>
          </ScrollArea>
        </Block>
        <Block
          name="Title and episode rows"
          meta="composições de Item conectadas ao catálogo e playback"
        >
          <div className="item-demo">
            <TitleRow
              thumbnail={art}
              title="Cidade Luz"
              metadata="Comédia · 1h 51min"
              access="Incluído"
            />
            <EpisodeRow
              thumbnail={art}
              number="1"
              title="Quando as luzes acendem"
              duration="42min"
              progress={35}
            />
          </div>
        </Block>
        <Block name="List card" meta="Card que organiza uma sequência de Items">
          <ListCard
            className="list-card-demo"
            title="Episódios"
            action={<ShadButton variant="link">Ver todos</ShadButton>}
          >
            <EpisodeRow
              thumbnail={art}
              number="1"
              title="Quando as luzes acendem"
              duration="42min"
              progress={35}
            />
            <EpisodeRow
              thumbnail={art}
              number="2"
              title="Depois da meia-noite"
              duration="47min"
            />
          </ListCard>
        </Block>
        <Block name="Scene actions" meta="FABs para a prévia vertical">
          <div className="scene-fabs">
            {[
              [Volume2, "Som"],
              [Plus, "Lista"],
              [Heart, "Favorito"],
              [Share2, "Indicar"],
              [Info, "Detalhes"],
            ].map(([I, t], i) => (
              <label key={t}>
                <IconButton
                  icon={I}
                  state={i === 2 ? "active" : "default"}
                  label={t}
                />
                <span>{t}</span>
              </label>
            ))}
          </div>
        </Block>
        <Block
          name="Options sheet"
          meta="FAB de lista e ação Indicar com escolhas completas em contexto móvel"
        >
          <div className="state-row">
            <OptionsSheet
              options={[
                {
                  value: "private",
                  icon: ListPlus,
                  title: "Nova lista",
                  supporting: "Só você pode ver e editar",
                },
                {
                  value: "shared",
                  icon: UserPlus,
                  title: "Lista compartilhada",
                  supporting: "Convide pessoas para decidir junto",
                },
                {
                  value: "smart",
                  icon: WandSparkles,
                  title: "Lista sugerida",
                  supporting: "Comece a partir dos seus interesses",
                },
              ]}
            />
            <ShareSheet
              image={art}
              title="Cidade Luz"
              metadata="Comédia · 1h 51min"
            />
          </div>
        </Block>
        <Block
          name="Share sheet"
          meta="preview + contexto de acesso + canais diretos"
        >
          <ShareSheet
            image={art}
            title="Cidade Luz"
            metadata="Comédia · 1h 51min"
          />
        </Block>
        <section className="quality">
          <div>
            <span>ACCESSIBILITY</span>
            <b>Foco visível, nomes acessíveis e redução de movimento</b>
          </div>
          <div>
            <span>DESIGN → CODE</span>
            <b>Tokens e variantes espelhados entre Figma e registry</b>
          </div>
          <div>
            <span>GOVERNANCE</span>
            <b>Core estável; compositions evoluem pelas hipóteses</b>
          </div>
        </section>
        <footer>Tokens ↔ Figma ↔ componentes ↔ protótipo em alta</footer>
      </div>
    </div>
  );
}
createRoot(document.getElementById("root")).render(<Catalog />);
