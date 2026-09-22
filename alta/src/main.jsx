import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  Home,
  Search,
  ShoppingBag,
  Clapperboard,
  UserRound,
  Cast,
  Play,
  Plus,
  Heart,
  Share2,
  Info,
  ChevronRight,
  Check,
  X,
  Clock3,
  ListVideo,
  Users,
  Gift,
  CreditCard,
  Lock,
  MoreHorizontal,
  UserPlus,
  ArrowLeft,
  Pencil,
  Trash2,
} from "lucide-react";
import "./globals.css";
import "./styles.css";
import {
  ActionTile,
  AppHeader,
  Badge,
  BottomNavigationItem,
  Button,
  Chip,
  IconButton,
  Input,
  InviteField,
  Item,
  MediaCard,
  MediaPlayer,
  OptionsSheet,
  ParticipantRow,
  QuickRecommendationCard,
  RatingAction,
  ScrollArea,
  SearchField,
  SectionHeader,
  ShareSheet as DSShareSheet,
  ShareChannels,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Toaster,
  toast,
  Switch,
} from "@/design-system";

const A = "../../assets/prototipo/";
const titles = [
  {
    name: "Depois do Sol",
    img: A + "depois-do-sol.png",
    meta: "Drama · 1h 42min",
    access: "Incluído",
    reason: "Porque você assistiu a dramas intimistas",
    rating: "Amei",
  },
  {
    name: "Cidade Luz",
    img: A + "cidade-luz.png",
    meta: "Comédia · 1h 51min",
    access: "Alugar",
    reason: "Popular entre pessoas com interesses parecidos",
    rating: "Gostei",
  },
  {
    name: "Horizonte Azul",
    img: A + "horizonte-azul.png",
    meta: "Ficção · 2h 04min",
    access: "Incluído",
    reason: "98% de match com seus interesses",
  },
];
const catalog = [
  ...titles.map((title, index) => ({
    ...title,
    kind: index === 2 ? "Séries" : "Filmes",
    free: index !== 1,
    fresh: index === 0,
  })),
  ...[
    ["O Último Sinal", 2, "Filmes", true, false],
    ["Entre Estações", 0, "Séries", false, true],
    ["Maré Alta", 1, "Filmes", true, true],
    ["Arquivo 72", 2, "Séries", true, false],
    ["Depois da Chuva", 0, "Séries", false, false],
    ["Fora de Órbita", 1, "Filmes", true, false],
  ].map(([name, art, kind, free, fresh], index) => ({
    ...titles[art],
    name,
    kind,
    free,
    fresh,
    access: free ? "Incluído" : "Alugar",
    rating: index % 3 === 0 ? "Gostei" : index % 3 === 1 ? "Amei" : undefined,
  })),
];
const rankingCatalog = (names, type) =>
  names.map((name, index) => ({
    ...titles[index % titles.length],
    name,
    meta: `${type} · ${titles[index % titles.length].meta.split(" · ").slice(1).join(" · ")}`,
  }));
const topMovies = rankingCatalog(
  [
    "Horizonte Azul",
    "Cidade Luz",
    "Depois do Sol",
    "O Último Sinal",
    "Entre Estações",
    "Maré Alta",
    "Fora de Órbita",
    "A Casa do Lago",
    "Vidas Paralelas",
    "Noite Aberta",
  ],
  "Filme",
);
const topSeries = rankingCatalog(
  [
    "Arquivo 72",
    "Linha de Frente",
    "Ponto Cego",
    "Depois da Chuva",
    "Distrito Norte",
    "A Última Chave",
    "Código de Família",
    "Terra Distante",
    "Quarto 19",
    "Além da Margem",
  ],
  "Série",
);
const listOptions = [
  {
    value: "watchlist",
    icon: ListVideo,
    title: "Quero assistir",
    supporting: "Lista privada",
  },
  {
    value: "family",
    icon: Users,
    title: "Noite em família",
    supporting: "Lista compartilhada · 3 pessoas",
  },
  {
    value: "new",
    icon: Plus,
    title: "Criar nova lista",
    supporting: "Privada ou compartilhada",
    disclosure: true,
  },
];
const spring = { type: "spring", stiffness: 420, damping: 32 };
const pageOrder = ["home", "store", "scene", "search", "profile"];
const routeVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction * 28,
    filter: "blur(3px)",
  }),
  center: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: (direction) => ({
    opacity: 0,
    x: direction * -20,
    filter: "blur(2px)",
  }),
};

function useDragScroll(disabled = false, axis = "y") {
  const ref = useRef(null);
  const gesture = useRef({ active: false, moved: false, point: 0, scroll: 0 });
  const [dragging, setDragging] = useState(false);

  const handlers = {
    ref,
    "data-dragging": dragging || undefined,
    onPointerDownCapture: (event) => {
      if (disabled || event.pointerType !== "mouse" || event.button !== 0)
        return;
      gesture.current = {
        active: true,
        moved: false,
        point: axis === "x" ? event.clientX : event.clientY,
        scroll:
          axis === "x"
            ? (ref.current?.scrollLeft ?? 0)
            : (ref.current?.scrollTop ?? 0),
      };
    },
    onPointerMoveCapture: (event) => {
      if (!gesture.current.active || disabled || !ref.current) return;
      const point = axis === "x" ? event.clientX : event.clientY;
      const delta = point - gesture.current.point;
      if (Math.abs(delta) > 5) {
        if (!gesture.current.moved) {
          ref.current.setPointerCapture?.(event.pointerId);
        }
        gesture.current.moved = true;
        setDragging(true);
      }
      if (gesture.current.moved) {
        if (axis === "x") {
          ref.current.scrollLeft = gesture.current.scroll - delta;
        } else {
          ref.current.scrollTop = gesture.current.scroll - delta;
        }
        event.preventDefault();
      }
    },
    onPointerUpCapture: (event) => {
      if (!gesture.current.active) return;
      gesture.current.active = false;
      setDragging(false);
      if (ref.current?.hasPointerCapture?.(event.pointerId)) {
        ref.current.releasePointerCapture(event.pointerId);
      }
    },
    onPointerCancelCapture: () => {
      gesture.current.active = false;
      gesture.current.moved = false;
      setDragging(false);
    },
    onClickCapture: (event) => {
      if (!gesture.current.moved) return;
      event.preventDefault();
      event.stopPropagation();
      gesture.current.moved = false;
    },
  };

  return handlers;
}

function ChipRow({ children, className = "" }) {
  const drag = useDragScroll(false, "x");
  return (
    <div className={`chips ${className}`} {...drag}>
      {children}
    </div>
  );
}

function Poster({ title, onOpen, layoutId, format = "poster", rank, progress }) {
  return (
    <MediaCard
      className="prototype-media-card"
      format={format}
      rank={rank}
      progress={progress}
      image={title.img}
      imageAlt=""
      title={title.name}
      metadata={title.meta}
      badge={title.access}
      badgeTone={title.access === "Incluído" ? "included" : "rent"}
      layoutId={layoutId}
      onClick={() => onOpen?.(title, layoutId)}
    />
  );
}
function PosterSkeleton() {
  return (
    <div className="poster poster-skeleton" aria-hidden="true">
      <Skeleton className="poster-art" />
      <Skeleton className="skeleton-line" />
      <Skeleton className="skeleton-line short" />
    </div>
  );
}

function RouteSkeleton() {
  return (
    <motion.main
      className="route-skeleton"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      aria-label="Carregando conteúdo"
      aria-busy="true"
    >
      <Skeleton className="skeleton-hero" />
      <div className="skeleton-chips">
        {[0, 1, 2, 3].map((item) => (
          <Skeleton key={item} />
        ))}
      </div>
      <div className="skeleton-section">
        <Skeleton className="skeleton-heading" />
        <div className="rail">
          {[0, 1, 2].map((item) => (
            <PosterSkeleton key={item} />
          ))}
        </div>
      </div>
    </motion.main>
  );
}
function SecondaryRouteSkeleton() {
  return (
    <motion.main
      className="secondary-route-skeleton"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      aria-label="Carregando conteúdo"
      aria-busy="true"
    >
      <div className="secondary-skeleton-head">
        <Skeleton className="secondary-skeleton-back" />
        <div>
          <Skeleton className="secondary-skeleton-title" />
          <Skeleton className="secondary-skeleton-copy" />
        </div>
      </div>
      <Skeleton className="secondary-skeleton-search" />
      <div className="skeleton-chips">
        {[0, 1, 2].map((item) => <Skeleton key={item} />)}
      </div>
      <div className="secondary-skeleton-grid">
        {[0, 1, 2, 3].map((item) => <PosterSkeleton key={item} />)}
      </div>
    </motion.main>
  );
}
function Rail({ title, children, reason, showAction = true, onAction }) {
  return (
    <section className="rail-section">
      {title ? (
        <SectionHeader
          title={title}
          actionLabel={showAction ? "Ver todos" : undefined}
          onAction={onAction}
        />
      ) : null}
      {reason ? <p className="rail-reason">{reason}</p> : null}
      <ScrollArea orientation="horizontal" className="rail-scroll">
        <div className="rail">{children}</div>
      </ScrollArea>
    </section>
  );
}

function CatalogView({ title, items, open, close, collection, filterable = false, onUpdate, onDelete, onFeedback }) {
  const shared = collection?.type === "Compartilhada";
  const memberCount = collection?.members?.length ?? 1;
  const [editingName, setEditingName] = useState(false);
  const [managingMembers, setManagingMembers] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [draftName, setDraftName] = useState(title);
  const [newMember, setNewMember] = useState("");
  const [inviteCopied, setInviteCopied] = useState(false);
  const [listQuery, setListQuery] = useState("");
  const [listFilter, setListFilter] = useState("Todos");
  const notify = (message) => toast.success(message);
  const applyUpdate = (updated, message) => {
    onUpdate?.(updated);
    notify(message);
  };
  const inviteUrl = "mercadoplay.com/lista/convite-7f2a";
  const copyInvite = async () => {
    await navigator.clipboard?.writeText(`https://${inviteUrl}`);
    setInviteCopied(true);
    notify("Link copiado");
    window.setTimeout(() => setInviteCopied(false), 1800);
  };
  const shareInvite = async () => {
    if (navigator.share) {
      await navigator.share({ title: `Entre na lista ${title}`, url: `https://${inviteUrl}` });
      notify("Convite compartilhado");
    } else {
      await copyInvite();
    }
  };
  const addMember = () => {
    if (!newMember.trim()) return;
    const initials = newMember.trim().split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
    applyUpdate({ ...collection, members: [...(collection.members ?? ["NC"]), initials] }, "Convite adicionado");
    setNewMember("");
  };
  const genreOf = (item) => item.meta?.split(" · ")[0] ?? "Outros";
  const filteringEnabled = Boolean(collection || filterable);
  const genres = filteringEnabled ? [...new Set(items.map(genreOf))] : [];
  const filters = filteringEnabled ? [
    { label: "Todos", count: items.length },
    ...genres.map((genre) => ({ label: genre, count: items.filter((item) => genreOf(item) === genre).length })),
    { label: "Avaliados", count: items.filter((item) => item.rating).length },
  ].filter((filter) => filter.count > 0) : [];
  const visibleItems = items.filter((item) => {
    const matchesQuery = item.name.toLowerCase().includes(listQuery.trim().toLowerCase());
    const matchesFilter = listFilter === "Todos" || (listFilter === "Avaliados" ? Boolean(item.rating) : genreOf(item) === listFilter);
    return matchesQuery && matchesFilter;
  });
  const supporting = collection ? (
    <span className="catalog-supporting">
      <span>{items.length} títulos</span>
      <span aria-hidden="true">·</span>
      {shared ? <Users aria-hidden="true" /> : <Lock aria-hidden="true" />}
      <span>{collection.type}</span>
    </span>
  ) : `${items.length} títulos disponíveis nesta seleção`;
  const members = collection?.members ?? ["NC"];
  const participantAvatars = (
    <div className="participant-summary" data-slot="participant-summary">
      <div>
        <strong>Participantes</strong>
        <span>{memberCount} {memberCount === 1 ? "pessoa" : "pessoas"} · gerenciar e convidar</span>
      </div>
      <div className="participant-summary-avatars" aria-hidden="true">
        {members.slice(0, 3).map((member, index) => <span key={`${member}-${index}`}>{member}</span>)}
        {memberCount > 3 ? <span>+{memberCount - 3}</span> : null}
      </div>
      <ChevronRight aria-hidden="true" />
    </div>
  );
  const collectionOptions = collection ? [
    { value: "rename", icon: Pencil, title: "Editar nome", supporting: "Atualize o nome desta lista", disclosure: true, onSelect: () => setEditingName(true) },
    { value: "privacy", icon: Lock, title: "Lista compartilhada", supporting: shared ? "Participantes podem colaborar" : "Somente você pode acessar", keepOpen: true, trailing: <Switch aria-label="Lista compartilhada" checked={shared} onCheckedChange={(checked) => applyUpdate({ ...collection, type: checked ? "Compartilhada" : "Privada", members: checked ? (collection.members ?? ["NC"]) : undefined }, checked ? "Lista agora é compartilhada" : "Lista agora é privada")} /> },
    { value: "delete", icon: Trash2, title: "Excluir lista", tone: "destructive", onSelect: () => setConfirmingDelete(true) },
  ] : [];
  return (
    <motion.main
      className="catalog-view"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 12 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="catalog-head">
        <AppHeader
          className="catalog-app-header"
          title={title}
          supporting={supporting}
          leading={<IconButton label="Voltar" onClick={close}><ArrowLeft /></IconButton>}
          actions={collection ? (
            <div className="collection-header-actions">
              {shared ? (
                <button type="button" className="collection-members" aria-label={`Gerenciar ${memberCount} participantes`} onClick={() => setManagingMembers(true)}>
                  {members.slice(0, 2).map((member, index) => (
                    <span key={`${member}-${index}`} title={member}>{member}</span>
                  ))}
                  {memberCount > 2 ? <span title={`${memberCount - 2} participantes adicionais`}>+{memberCount - 2}</span> : null}
                </button>
              ) : null}
              <OptionsSheet
                withinContext
                title="Gerenciar lista"
                description={title}
                summary={shared ? participantAvatars : null}
                onSummarySelect={shared ? () => setManagingMembers(true) : undefined}
                options={collectionOptions}
                trigger={<IconButton label="Gerenciar lista"><MoreHorizontal /></IconButton>}
              />
            </div>
          ) : null}
        />
      </div>
      {filteringEnabled ? (
        <div className="catalog-tools">
          <SearchField aria-label="Buscar nesta lista" placeholder="Buscar nesta lista" value={listQuery} onChange={(event) => setListQuery(event.target.value)} />
          <ChipRow>
            {filters.map((filter) => (
              <Chip key={filter.label} count={filter.count} active={listFilter === filter.label} onClick={() => setListFilter(filter.label)}>
                {filter.label}
              </Chip>
            ))}
          </ChipRow>
        </div>
      ) : null}
      <div className="catalog-grid">
        {visibleItems.map((item, index) => (
          <Poster key={`${item.name}-${index}`} title={item} onOpen={open} />
        ))}
      </div>
      {filteringEnabled && visibleItems.length === 0 ? (
        <div className="catalog-empty">
          <Search aria-hidden="true" />
          <strong>Nenhum título encontrado</strong>
          <p>Tente outro termo ou remova o filtro.</p>
        </div>
      ) : null}
      {collection ? (
        <>
          <Sheet open={editingName} onOpenChange={setEditingName}>
            <SheetContent side="bottom" portalContainer={document.querySelector(".device")}>
              <SheetHeader>
                <SheetTitle>Editar nome</SheetTitle>
                <SheetDescription>Use um nome curto que explique o objetivo da lista.</SheetDescription>
              </SheetHeader>
              <div className="px-4"><Input aria-label="Nome da lista" value={draftName} onChange={(event) => setDraftName(event.target.value)} /></div>
              <SheetFooter>
                <Button disabled={!draftName.trim()} onClick={() => { applyUpdate({ ...collection, name: draftName.trim() }, "Nome atualizado"); setEditingName(false); }}>Salvar</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <Sheet open={managingMembers} onOpenChange={setManagingMembers}>
            <SheetContent side="bottom" portalContainer={document.querySelector(".device")}>
              <SheetHeader>
                <SheetTitle>Participantes</SheetTitle>
                <SheetDescription>{title} · {memberCount} {memberCount === 1 ? "pessoa" : "pessoas"}</SheetDescription>
              </SheetHeader>
              <div className="member-manager">
                <p className="sheet-field-label">Convidar</p>
                <InviteField aria-label="Nome ou e-mail" placeholder="Nome ou e-mail" value={newMember} onChange={(event) => setNewMember(event.target.value)} onInvite={addMember} />
                <div className="member-list" aria-label="Participantes da lista">
                  <p className="sheet-field-label">Na lista <span>{memberCount}</span></p>
                  {members.map((member, index) => (
                    <motion.div key={`${member}-${index}`} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                      <ParticipantRow initials={member} name={member === "NC" ? "Você" : member} owner={index === 0} onRemove={index === 0 ? undefined : () => applyUpdate({ ...collection, members: collection.members.filter((_, memberIndex) => memberIndex !== index) }, `${member} removido`)} />
                    </motion.div>
                  ))}
                </div>
                <div className="member-share-actions">
                  <p className="sheet-field-label">Enviar link de convite</p>
                  <ShareChannels copied={inviteCopied} onSelect={(channel) => channel === "copy" ? copyInvite() : shareInvite()} />
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Sheet open={confirmingDelete} onOpenChange={setConfirmingDelete}>
            <SheetContent side="bottom" portalContainer={document.querySelector(".device")}>
              <SheetHeader>
                <SheetTitle>Excluir “{title}”?</SheetTitle>
                <SheetDescription>Os títulos continuam disponíveis no catálogo e no histórico.</SheetDescription>
              </SheetHeader>
              <SheetFooter className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={() => setConfirmingDelete(false)}>Cancelar</Button>
                <Button variant="destructive" onClick={() => { onFeedback?.("Lista excluída"); onDelete?.(collection); }}>Excluir lista</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </>
      ) : null}
    </motion.main>
  );
}

function CreateListSheet({ close, onCreate }) {
  const [name, setName] = useState("");
  const [privacy, setPrivacy] = useState("Privada");
  return (
    <Sheet open onOpenChange={(nextOpen) => !nextOpen && close()}>
      <SheetContent
        side="bottom"
        portalContainer={document.querySelector(".device")}
      >
        <SheetHeader className="pb-2">
          <SheetTitle>Criar lista</SheetTitle>
          <SheetDescription>Organize para você ou convide pessoas.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-3 px-4">
          <label className="grid gap-2 text-[length:var(--type-label-small-size)] leading-[var(--type-label-small-line)] text-muted-foreground">
            <span>Nome</span>
            <Input placeholder="Ex.: Filmes para o fim de semana" value={name} onChange={(event) => setName(event.target.value)} />
          </label>
          <div className="grid gap-2" role="listbox" aria-label="Privacidade da lista">
            <Item icon={Lock} title="Privada" supporting="Somente você pode ver e editar" selectable selected={privacy === "Privada"} onClick={() => setPrivacy("Privada")} />
            <Item icon={Users} title="Compartilhada" supporting="Convide pessoas para colaborar" selectable selected={privacy === "Compartilhada"} onClick={() => setPrivacy("Compartilhada")} />
          </div>
        </div>
        <SheetFooter>
          <Button disabled={!name.trim()} onClick={() => onCreate({ name: name.trim(), type: privacy, count: 0 })}>Criar lista</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
function Header({ onProfile }) {
  return (
    <header>
      <b className="product-brand">
        <span className="product-brand-mark" aria-hidden="true"><img src={`${import.meta.env.BASE_URL}assets/mercado-livre-handshake-white.svg`} alt="" /></span>
        <span>Mercado <i>Play</i></span>
      </b>
      <div>
        <IconButton label="Transmitir">
          <Cast size={19} />
        </IconButton>
        <IconButton label="Perfil" onClick={onProfile}>
          <UserRound size={19} />
        </IconButton>
      </div>
    </header>
  );
}
function Nav({ page, setPage }) {
  const items = [
    [Home, "Início", "home"],
    [ShoppingBag, "Loja", "store"],
    [Clapperboard, "Em cena", "scene"],
    [Search, "Buscar", "search"],
  ];
  return (
    <nav className="bottom-navigation" aria-label="Navegação principal">
      {items.map(([I, l, k]) => (
        <BottomNavigationItem
          key={k}
          icon={I}
          label={l}
          active={page === k}
          onClick={() => setPage(k)}
        />
      ))}
    </nav>
  );
}
function HomePage({ open, onScene, onDepthChange }) {
  const [filter, setFilter] = useState("Tudo");
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);
  const [heroSaved, setHeroSaved] = useState(false);
  const filteredCatalog = catalog.filter((item) =>
    filter === "Tudo" ? true :
    filter === "Grátis" ? item.free :
    filter === "Novidades" ? item.fresh : item.kind === filter,
  );
  if (showCatalog) {
    return (
      <CatalogView
        title={filter === "Tudo" ? "Para você" : filter}
        items={filteredCatalog}
        open={open}
        close={() => { setShowCatalog(false); onDepthChange(false); }}
      />
    );
  }
  return (
    <main>
      <div className="hero">
        {!heroLoaded ? (
          <Skeleton className="media-skeleton absolute inset-0" />
        ) : null}
        <motion.img
          layoutId="hero-depois-do-sol"
          src={titles[0].img}
          alt=""
          onLoad={() => setHeroLoaded(true)}
          animate={{
            opacity: heroLoaded ? 1 : 0,
            scale: heroLoaded ? 1 : 1.02,
          }}
          transition={{ duration: 0.45 }}
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <Badge tone="brand">98% para você</Badge>
          <h1>Depois do Sol</h1>
          <p>Uma história delicada sobre memória, afeto e tudo o que fica.</p>
          <div>
            <Button
              icon={Play}
              onClick={() => open(titles[0], "hero-depois-do-sol")}
            >
              Assistir
            </Button>
            <Button
              variant="glass"
              icon={heroSaved ? Check : Plus}
              onClick={() => setHeroSaved((value) => !value)}
            >
              {heroSaved ? "Na minha lista" : "Minha lista"}
            </Button>
          </div>
        </div>
      </div>
      <ChipRow>
        {["Tudo", "Grátis", "Filmes", "Séries", "Novidades"].map((x) => (
          <Chip key={x} active={filter === x} onClick={() => setFilter(x)}>
            {x}
          </Chip>
        ))}
      </ChipRow>
      <Rail
        title={filter === "Tudo" ? "Para você" : filter}
        reason={
          filter === "Tudo"
            ? "Curadoria baseada no histórico e nos seus interesses"
            : `${filteredCatalog.length} opções no catálogo`
        }
        onAction={() => { setShowCatalog(true); onDepthChange(true); }}
      >
        {filteredCatalog.slice(0, 6).map((t) => (
          <Poster
            key={t.name}
            title={t}
            layoutId={`home-for-you-${t.name.toLowerCase().replaceAll(" ", "-")}`}
            onOpen={open}
          />
        ))}
      </Rail>
      <motion.button
        className="scene-banner"
        whileTap={{ scale: 0.98 }}
        onClick={onScene}
      >
        <Clapperboard />
        <span>
          <strong>Descubra em cena</strong>
          <small>
            Prévias rápidas para decidir e melhorar suas recomendações.
          </small>
        </span>
        <ChevronRight />
      </motion.button>
      <Rail title="Top 10 filmes" showAction={false}>
        {topMovies.map((t, i) => (
          <Poster
            key={t.name}
            title={t}
            format="ranking"
            rank={i + 1}
            layoutId={`home-top-${i}`}
            onOpen={open}
          />
        ))}
      </Rail>
      <Rail title="Continue assistindo" showAction={false}>
        {titles.map((t, i) => (
          <Poster
            key={`continue-${t.name}`}
            title={{
              ...t,
              meta: `${[38, 64, 21][i]}% assistido · ${t.meta}`,
            }}
            format="landscape"
            progress={[38, 64, 21][i]}
            layoutId={`home-continue-${i}`}
            onOpen={open}
          />
        ))}
      </Rail>
      <Rail title="Top 10 séries" showAction={false}>
        {topSeries.map((t, i) => (
          <Poster
            key={t.name}
            title={t}
            format="ranking"
            rank={i + 1}
            layoutId={`home-top-series-${i}`}
            onOpen={open}
          />
        ))}
      </Rail>
    </main>
  );
}
function SearchPage({ open }) {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  useEffect(() => {
    if (!query) {
      setSearching(false);
      return;
    }
    setSearching(true);
    const timer = window.setTimeout(() => setSearching(false), 420);
    return () => window.clearTimeout(timer);
  }, [query]);
  return (
    <main className="page-pad">
      <h1>Buscar</h1>
      <SearchField
        className="search-page-field"
        autoFocus
        aria-label="Buscar no catálogo"
        placeholder="Filme, série, gênero ou uma pista"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ChipRow>
        {["Drama", "Comédia", "Ação", "Ficção", "Família"].map((x) => (
          <Chip key={x}>{x}</Chip>
        ))}
      </ChipRow>
      <Rail
        title={query ? "Resultados" : "Recomendados para você"}
        reason={
          query
            ? "Busca conceitual no catálogo"
            : "A busca já começa útil, antes da digitação"
        }
      >
        {searching
          ? [0, 1, 2].map((item) => <PosterSkeleton key={item} />)
          : titles
              .filter(
                (t) =>
                  !query || t.name.toLowerCase().includes(query.toLowerCase()),
              )
              .map((t, index) => (
                <Poster
                  key={t.name}
                  title={t}
                  layoutId={`search-result-${index}`}
                  onOpen={open}
                />
              ))}
      </Rail>
      <Rail title="Interesses populares">
        {titles
          .slice()
          .reverse()
          .map((t, index) => (
            <Poster
              key={t.name}
              title={t}
              layoutId={`search-popular-${index}`}
              onOpen={open}
            />
          ))}
      </Rail>
    </main>
  );
}
function ScenePage({ open }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(6);
  const [favorites, setFavorites] = useState(() => new Set());
  const [saved, setSaved] = useState(() => new Set());
  const [shareTitle, setShareTitle] = useState(null);
  const feedDrag = useDragScroll(false, "y");

  const goTo = (nextIndex) => {
    const normalized = (nextIndex + titles.length) % titles.length;
    const feed = feedDrag.ref.current;
    setIndex(normalized);
    setProgress(0);
    setPlaying(true);
    feed?.scrollTo({
      top: normalized * feed.clientHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!playing || shareTitle) return;
    const timer = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 99) {
          window.setTimeout(() => goTo(index + 1), 0);
          return 100;
        }
        return Math.min(100, current + 1);
      });
    }, 320);
    return () => window.clearInterval(timer);
  }, [playing, index, shareTitle]);

  const toggleInSet = (setter, value) =>
    setter((current) => {
      const next = new Set(current);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });

  const listOptionsFor = (title) =>
    listOptions.map((option) => ({
      ...option,
      selectable: true,
      selected: saved.has(title.name) && option.value === "watchlist",
      onSelect: () => toggleInSet(setSaved, title.name),
    }));

  return (
    <main
      className="scene-feed"
      {...feedDrag}
      onScroll={(event) => {
        const feed = event.currentTarget;
        const nextIndex = Math.round(feed.scrollTop / feed.clientHeight);
        if (nextIndex !== index && titles[nextIndex]) {
          setIndex(nextIndex);
          setProgress(0);
          setPlaying(true);
        }
      }}
    >
      {titles.map((title, itemIndex) => {
        const active = itemIndex === index;
        const isFavorite = favorites.has(title.name);
        const isSaved = saved.has(title.name);
        return (
          <section
            className="scene"
            key={title.name}
            data-active={active || undefined}
            aria-label={`Prévia de ${title.name}`}
          >
          <MediaPlayer
            className="scene-player"
            variant="immersive"
            poster={title.img}
            title={`${title.name} · prévia curta`}
            progress={active ? progress : 0}
            playing={active && playing}
            muted={muted}
            onPlayingChange={(value) => active && setPlaying(value)}
            onMutedChange={setMuted}
          />
            <div className="scene-gradient" />
            <div
              className="scene-sequence"
              aria-label={`${itemIndex + 1} de ${titles.length}`}
            >
              {titles.map((sequenceTitle, sequenceIndex) => (
                <button
                  key={sequenceTitle.name}
                  aria-label={`Ver prévia ${sequenceIndex + 1}: ${sequenceTitle.name}`}
                  data-active={sequenceIndex === itemIndex || undefined}
                  onClick={() => goTo(sequenceIndex)}
                />
              ))}
            </div>
            <div className="scene-actions">
              <div className="scene-action">
                <OptionsSheet
                  withinContext
                  title="Adicionar à lista"
                  description="Escolha onde guardar este título."
                  options={listOptionsFor(title)}
                  trigger={
                    <IconButton
                      label={isSaved ? "Na lista" : "Adicionar à lista"}
                      active={isSaved}
                      variant="glass"
                    >
                      {isSaved ? <Check /> : <Plus />}
                    </IconButton>
                  }
                />
                <small>{isSaved ? "Na lista" : "Lista"}</small>
              </div>
              <div className="scene-action">
                <IconButton
                  label="Favoritar"
                  active={isFavorite}
                  variant="glass"
                  onClick={() => toggleInSet(setFavorites, title.name)}
                >
                  <Heart fill={isFavorite ? "currentColor" : "none"} />
                </IconButton>
                <small>{isFavorite ? "Favorito" : "Favoritar"}</small>
              </div>
              <div className="scene-action">
                <IconButton variant="glass" label="Indicar" onClick={() => setShareTitle(title)}>
                  <Share2 />
                </IconButton>
                <small>Indicar</small>
              </div>
              <div className="scene-action">
                <IconButton variant="glass" label="Detalhes" onClick={() => open(title)}>
                  <Info />
                </IconButton>
                <small>Detalhes</small>
              </div>
            </div>
            <div className="scene-copy">
              <Badge tone="brand">{title.access}</Badge>
              <h1>{title.name}</h1>
              <p>{title.reason}</p>
              <div className="scene-status">
                <span>{active && playing ? "Reproduzindo" : "Pausado"}</span>
                <span>
                  Prévia · {Math.max(1, Math.ceil((100 - (active ? progress : 0)) * 0.32))}s
                </span>
              </div>
              <small className="scene-hint">Arraste para cima para a próxima</small>
            </div>
          </section>
        );
      })}
      {shareTitle ? (
        <ShareSheet title={shareTitle} close={() => setShareTitle(null)} />
      ) : null}
    </main>
  );
}
function StorePage({ open, onDepthChange }) {
  const [filter, setFilter] = useState("Explorar");
  const [showCatalog, setShowCatalog] = useState(false);
  const storeItems = catalog.map((item, index) => ({
    ...item,
    access: index % 3 === 0 ? "R$ 6,90" : index % 3 === 1 ? "R$ 8,90" : "R$ 29,90",
    offerType: index % 3 === 2 ? "Comprar" : "Alugar",
  }));
  const filtered = storeItems.filter((item) =>
    filter === "Explorar" ? true : item.offerType === filter,
  );
  const openOffer = (title, layoutId) =>
    open({ ...title, access: `${title.offerType} por ${title.access}` }, layoutId);
  if (showCatalog) {
    return (
      <CatalogView
        title={filter === "Explorar" ? "Catálogo da Loja" : filter}
        items={filtered}
        open={openOffer}
        close={() => { setShowCatalog(false); onDepthChange(false); }}
      />
    );
  }
  return (
    <main className="page-pad">
      <h1>Loja</h1>
      <p className="lead">
        Escolha um título e veja preço, prazo e disponibilidade antes de
        decidir se o acesso é para você ou para presentear alguém.
      </p>
      <ChipRow>
        {["Explorar", "Alugar", "Comprar"].map((item) => (
          <Chip key={item} active={filter === item} onClick={() => setFilter(item)}>{item}</Chip>
        ))}
      </ChipRow>
      <Rail title={filter === "Explorar" ? "Mais alugados" : `${filter} agora`} onAction={() => { setShowCatalog(true); onDepthChange(true); }}>
        {filtered.slice(0, 5).map((t, index) => (
          <Poster
            key={t.name}
            title={t}
            layoutId={`store-rent-${index}`}
            onOpen={openOffer}
          />
        ))}
      </Rail>
      <Rail title="Ofertas para assistir em família" reason="Títulos populares para comprar ou alugar juntos" showAction={false}>
        {storeItems.slice(3, 7).map((t, index) => (
          <Poster key={t.name} title={t} format="landscape" layoutId={`store-family-${index}`} onOpen={openOffer} />
        ))}
      </Rail>
      <Rail title="Lançamentos para comprar" reason="Novidades que permanecem na biblioteca" onAction={() => { setFilter("Comprar"); setShowCatalog(true); onDepthChange(true); }}>
        {storeItems.filter((item) => item.offerType === "Comprar").slice(0, 4).map((t, index) => (
          <Poster key={t.name} title={t} layoutId={`store-buy-${index}`} onOpen={openOffer} />
        ))}
      </Rail>
      <div className="store-card">
        <ShoppingBag />
        <div>
          <strong>Comprar ou alugar?</strong>
          <p>
            O detalhe explica permanência, prazo e disponibilidade antes do
            compromisso.
          </p>
        </div>
      </div>
    </main>
  );
}

function ProfilePage({ open, onDepthChange }) {
  const [historyFilter, setHistoryFilter] = useState("Todos");
  const [viewingFavorites, setViewingFavorites] = useState(false);
  const [shareTitle, setShareTitle] = useState(null);
  const [lists, setLists] = useState([
    { id: "watch", name: "Quero assistir", type: "Privada", count: 12, items: catalog.slice(0, 6) },
    { id: "family", name: "Noite em família", type: "Compartilhada", count: 5, members: ["NC", "RA", "LM"], items: catalog.slice(2, 7) },
  ]);
  const [selectedList, setSelectedList] = useState(null);
  const [creatingList, setCreatingList] = useState(false);
  const notifyProfile = (message) => toast.success(message);
  const updateList = (updated) => {
    setLists((current) => current.map((list) => list.id === updated.id ? updated : list));
    setSelectedList((current) => current?.id === updated.id ? updated : current);
  };
  const openList = (list) => { setSelectedList(list); onDepthChange(true); };
  const listMenu = (list) => [
    { value: "open", icon: ListVideo, title: "Abrir lista", supporting: `Ver títulos de ${list.name}`, disclosure: true, onSelect: () => openList(list) },
    { value: "invite", icon: UserPlus, title: "Convidar pessoas", supporting: "Transforma em compartilhada", onSelect: () => updateList({ ...list, type: "Compartilhada", members: list.members ?? ["NC"] }) },
    { value: "privacy", icon: Lock, title: "Privacidade", supporting: list.type, onSelect: () => updateList({ ...list, type: list.type === "Privada" ? "Compartilhada" : "Privada", members: list.type === "Privada" ? ["NC"] : undefined }) },
  ];
  if (selectedList) {
    return (
      <CatalogView
        title={selectedList.name}
        items={selectedList.items}
        open={open}
        collection={selectedList}
        onUpdate={updateList}
        onFeedback={notifyProfile}
        onDelete={(listToDelete) => { setLists((current) => current.filter((list) => list.id !== listToDelete.id)); setSelectedList(null); onDepthChange(false); }}
        close={() => { setSelectedList(null); onDepthChange(false); }}
      />
    );
  }
  if (viewingFavorites) {
    return (
      <CatalogView
        title="Favoritos"
        items={titles}
        open={open}
        filterable
        close={() => { setViewingFavorites(false); onDepthChange(false); }}
      />
    );
  }
  return (
    <main className="page-pad profile-page">
      <div className="profile-head">
        <div className="profile-avatar">NC</div>
        <div>
          <h1>Minha área</h1>
          <p>Listas, favoritos e histórico em um só lugar.</p>
        </div>
      </div>

      <section className="rail-section favorite-rail">
        <SectionHeader size="compact" title="Favoritos" actionLabel="Ver todos" onAction={() => { setViewingFavorites(true); onDepthChange(true); }} />
        <ScrollArea orientation="horizontal" className="rail-scroll">
          <div className="rail">
            {titles.slice(0, 3).map((title, index) => (
              <QuickRecommendationCard
                key={title.name}
                density="compact"
                source="favorite"
                rating={title.rating}
                image={title.img}
                title={title.name}
                onOpen={() => open(title, `profile-favorite-${index}`)}
                onRecommend={() => setShareTitle(title)}
              />
            ))}
          </div>
        </ScrollArea>
      </section>

      <section className="profile-section">
        <SectionHeader
          size="compact"
          title="Listas"
          action={(
            <Button variant="link" size="sm" className="px-0" onClick={() => setCreatingList(true)}>
              <Plus /> Nova lista
            </Button>
          )}
        />
        <div className="profile-lists">
          {lists.map((list) => (
            <div className="list-item" key={list.name}>
              <motion.button className="list-item-main" whileTap={{ scale: 0.98 }} onClick={() => openList(list)}>{list.type === "Compartilhada" ? <Users /> : <Lock />}<span><strong>{list.name}</strong><small>{list.type === "Compartilhada" ? `${list.members?.length ?? 1} pessoas` : "Privada"} · {list.count} títulos</small></span></motion.button>
              <OptionsSheet withinContext title="Opções da lista" description={list.name} options={listMenu(list)} trigger={<IconButton label={`Opções de ${list.name}`}><MoreHorizontal /></IconButton>} />
            </div>
          ))}
        </div>
      </section>

      <section className="profile-section">
        <SectionHeader size="compact" title="Histórico" />
        <p className="profile-section-description">Recupere o que assistiu e avaliou</p>
        <ChipRow className="profile-chips">
          {["Todos", "Assistidos", "Avaliados", "Compras"].map((filter) => (
            <Chip
              key={filter}
              active={historyFilter === filter}
              onClick={() => setHistoryFilter(filter)}
            >
              {filter}
            </Chip>
          ))}
        </ChipRow>
        <div className="history-list">
          {titles.map((title, index) => (
            <motion.button
              key={title.name}
              whileTap={{ scale: 0.99 }}
              onClick={() => open(title, `history-${index}`)}
            >
              <motion.img
                layoutId={`history-${index}`}
                src={title.img}
                alt=""
              />
              <span>
                <strong>{title.name}</strong>
                <small>
                  {index === 1
                    ? "Avaliado · Gostei"
                    : `Assistido · ${title.meta}`}
                </small>
              </span>
              <ChevronRight />
            </motion.button>
          ))}
        </div>
      </section>
      {shareTitle ? <ShareSheet title={shareTitle} close={() => setShareTitle(null)} /> : null}
      <AnimatePresence>
        {creatingList ? <CreateListSheet close={() => setCreatingList(false)} onCreate={(list) => { setLists((current) => [...current, { ...list, id: `list-${Date.now()}`, items: [], members: list.type === "Compartilhada" ? ["NC"] : undefined }]); setCreatingList(false); }} /> : null}
      </AnimatePresence>
    </main>
  );
}

function Detail({ title, sourceId, onClose }) {
  const [liked, setLiked] = useState(false),
    [share, setShare] = useState(false),
    [offer, setOffer] = useState(false),
    [savedList, setSavedList] = useState(null);
  const dragScroll = useDragScroll();
  return (
    <Dialog.Root open onOpenChange={(v) => !v && onClose()}>
      <Dialog.Overlay asChild>
        <motion.div
          className="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      </Dialog.Overlay>
      <Dialog.Content asChild>
        <motion.div
          {...dragScroll}
          className="detail"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={spring}
        >
          <motion.div
            className="detail-media"
            layoutId={sourceId}
            transition={{ type: "spring", stiffness: 360, damping: 34 }}
          >
            <MediaPlayer
              className="detail-player"
              poster={title.img}
              title={title.name}
              progress={18}
              variant="embedded"
            />
            <Dialog.Close
              className="close"
              aria-label="Fechar detalhes"
              onClick={onClose}
            >
              <X />
            </Dialog.Close>
          </motion.div>
          <motion.div
            className="detail-body"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.28 }}
          >
            <Badge
              tone={title.access.includes("Incluído") ? "success" : "brand"}
            >
              {title.access}
            </Badge>
            <Dialog.Title>{title.name}</Dialog.Title>
            <p className="meta">{title.meta} · 14 · 4K</p>
            <Button
              icon={title.access.includes("Incluído") ? Play : CreditCard}
              onClick={() =>
                title.access.includes("Incluído") ? undefined : setOffer(true)
              }
            >
              {title.access.includes("Incluído")
                ? "Assistir agora"
                : "Ver oferta"}
            </Button>
            <div className="quick">
              <OptionsSheet
                withinContext
                title="Adicionar à lista"
                description="Escolha onde guardar este título."
                options={listOptions.map((option) => ({
                  ...option,
                  selectable: option.value !== "new",
                  selected: savedList === option.value,
                  onSelect: () => option.value !== "new" && setSavedList(option.value),
                }))}
                trigger={<ActionTile icon={savedList ? Check : Plus} label={savedList ? "Na lista" : "Lista"} active={Boolean(savedList)} />}
              />
              <RatingAction withinContext />
              <ActionTile
                icon={Heart}
                label="Favorito"
                active={liked}
                onClick={() => setLiked(!liked)}
              />
              <ActionTile
                icon={Share2}
                label="Indicar"
                onClick={() => setShare(true)}
              />
            </div>
            <Tabs defaultValue="about" className="detail-tabs">
              <TabsList variant="line" aria-label="Conteúdo do título">
                <TabsTrigger value="about">Sobre</TabsTrigger>
                <TabsTrigger value="similar">Semelhantes</TabsTrigger>
              </TabsList>
              <TabsContent value="about">
                <p className="detail-description">
                  {title.reason}. A experiência mantém assistir e acesso como
                  ação principal; guardar e compartilhar continuam rápidos.
                </p>
                <dl className="detail-facts">
                  <div>
                    <dt>Disponibilidade</dt>
                    <dd>{title.access}</dd>
                  </div>
                  <div>
                    <dt>Qualidade</dt>
                    <dd>4K · Áudio e legendas</dd>
                  </div>
                </dl>
              </TabsContent>
              <TabsContent value="similar">
                <Rail>
                  {titles
                    .filter((x) => x.name !== title.name)
                    .map((x) => (
                      <Poster key={x.name} title={x} />
                    ))}
                </Rail>
              </TabsContent>
            </Tabs>
          </motion.div>
          {share && <ShareSheet title={title} close={() => setShare(false)} />}
          {offer && (
            <CommerceSheet title={title} close={() => setOffer(false)} />
          )}
        </motion.div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
function CommerceSheet({ title, close }) {
  const [choice, setChoice] = useState("rent");
  const [recipient, setRecipient] = useState("self");
  const [step, setStep] = useState("choose");
  const options = [
    {
      value: "rent",
      icon: Play,
      title: "Alugar",
      supporting: "R$ 8,90 · 30 dias para iniciar · 48h para concluir",
    },
    {
      value: "buy",
      icon: CreditCard,
      title: "Comprar",
      supporting: "R$ 29,90 · disponível na sua biblioteca",
    },
  ];
  const selectedOption = options.find((option) => option.value === choice);
  return createPortal(
    <>
      <motion.button
        className="sheet-scrim"
        aria-label="Fechar opções de acesso"
        onClick={close}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <motion.div
        className="share-sheet commerce-sheet"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={spring}
      >
        <div className="handle" />
        <div className="sheet-head">
          <div>
            <strong>
              {step === "choose"
                ? `Como acessar ${title.name}`
                : step === "review"
                  ? "Revise sua escolha"
                  : recipient === "gift"
                    ? "Presente pronto"
                    : "Tudo certo"}
            </strong>
            <small>
              {step === "choose"
                ? "Preço e condições antes de continuar."
                : step === "review"
                  ? "Confira modalidade e destino."
                  : "Esta é uma conclusão demonstrativa do protótipo."}
            </small>
          </div>
          <IconButton label="Fechar" onClick={close}>
            <X />
          </IconButton>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          {step === "choose" ? (
            <motion.div
              key="choose"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
            >
              <div className="commerce-options">
                {options.map(
                  ({ value, icon: Icon, title: optionTitle, supporting }) => (
                    <button
                      key={value}
                      data-selected={choice === value || undefined}
                      onClick={() => setChoice(value)}
                    >
                      <Icon />
                      <span>
                        <strong>{optionTitle}</strong>
                        <small>{supporting}</small>
                      </span>
                      <span className="choice-indicator">
                        {choice === value ? <Check /> : null}
                      </span>
                    </button>
                  ),
                )}
              </div>
              <div className="recipient-choice">
                <strong>Para quem é?</strong>
                <div role="group" aria-label="Destino da compra ou aluguel">
                  <button
                    type="button"
                    data-selected={recipient === "self" || undefined}
                    onClick={() => setRecipient("self")}
                  >
                    <UserRound />
                    <span>Para mim</span>
                  </button>
                  <button
                    type="button"
                    data-selected={recipient === "gift" || undefined}
                    onClick={() => setRecipient("gift")}
                  >
                    <Gift />
                    <span>Presentear alguém</span>
                  </button>
                </div>
                {recipient === "gift" ? (
                  <small>
                    O presente será enviado por link após a confirmação do
                    pagamento.
                  </small>
                ) : null}
              </div>
              <Button icon={ChevronRight} onClick={() => setStep("review")}>
                {recipient === "gift"
                  ? "Continuar para presentear"
                  : "Continuar"}
              </Button>
            </motion.div>
          ) : step === "review" ? (
            <motion.div
              key="review"
              className="commerce-review"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
            >
              <div>
                <span>Modalidade</span>
                <strong>{selectedOption.title}</strong>
                <small>{selectedOption.supporting}</small>
              </div>
              <div>
                <span>Destino</span>
                <strong>
                  {recipient === "gift" ? "Presentear alguém" : "Para mim"}
                </strong>
                <small>
                  {recipient === "gift"
                    ? "Você escolhe como enviar depois da confirmação."
                    : "O título ficará vinculado à sua conta."}
                </small>
              </div>
              <Button icon={Check} onClick={() => setStep("done")}>
                Confirmar
              </Button>
              <Button variant="ghost" onClick={() => setStep("choose")}>
                Voltar
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              className="commerce-success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <span className="success-icon">
                <Check />
              </span>
              <strong>
                {recipient === "gift"
                  ? "Agora é só escolher como enviar"
                  : `${selectedOption.title} concluído`}
              </strong>
              <small>
                {recipient === "gift"
                  ? "O link poderá ser compartilhado após o pagamento."
                  : "O título já pode ser acessado pela sua biblioteca."}
              </small>
              <Button onClick={close}>Concluir</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>,
    document.querySelector(".device"),
  );
}
function ShareSheet({ title, close }) {
  return (
    <DSShareSheet
      open
      onOpenChange={(nextOpen) => !nextOpen && close()}
      trigger={null}
      withinContext
      image={title.img}
      title={title.name}
      metadata={title.meta}
    />
  );
}

function DSPreview() {
  const [on, setOn] = useState(false);
  return (
    <aside className="ds">
      <div className="ds-title">
        <div>
          <span>MINI DESIGN SYSTEM</span>
          <h1>shadcn · Dark</h1>
          <p>
            Manrope, Radix e Motion. Mesmos papéis semânticos usados no Figma.
          </p>
        </div>
        <Badge tone="success">Código ativo</Badge>
      </div>
      <section>
        <h2>Tokens</h2>
        <div className="swatches">
          {[
            "background",
            "card",
            "popover",
            "primary",
            "accent",
            "success",
            "warning",
            "destructive",
          ].map((x) => (
            <div key={x}>
              <i className={"swatch " + x} />
              <small>{x}</small>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2>Ações e estados</h2>
        <div className="sample-row">
          <Button icon={Play}>Assistir</Button>
          <Button variant="secondary" icon={Plus}>
            Adicionar
          </Button>
          <IconButton active={on} label="Favorito" onClick={() => setOn(!on)}>
            <Heart fill={on ? "currentColor" : "none"} />
          </IconButton>
        </div>
        <div className="sample-row">
          <Badge tone="success">Incluído</Badge>
          <Badge tone="brand">Alugar</Badge>
          <Badge>Indisponível</Badge>
        </div>
      </section>
      <section>
        <h2>Motion</h2>
        <ul>
          <li>
            <Check />
            press feedback em botões
          </li>
          <li>
            <Check />
            shared layout na navegação
          </li>
          <li>
            <Check />
            entrada, sheets e troca de mídia
          </li>
          <li>
            <Check />
            gesto vertical no Em cena
          </li>
        </ul>
      </section>
      <section>
        <h2>Composição</h2>
        <div className="component-map">
          <span>Core</span> Button · Icon button · Chip · Badge · Field ·
          Popover
          <div />
          <span>Compositions</span> Poster · Rail · Bottom nav · Detail · Share
          sheet
        </div>
      </section>
    </aside>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [pendingPage, setPendingPage] = useState(null);
  const [direction, setDirection] = useState(1);
  const [detail, setDetail] = useState(null);
  const [secondaryLevel, setSecondaryLevel] = useState(false);
  const [secondaryPending, setSecondaryPending] = useState(false);
  const [guidedFlow, setGuidedFlow] = useState("choose");
  const timerRef = useRef(null);
  const secondaryTimerRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const viewportDrag = useDragScroll(page === "scene");

  useEffect(() => () => {
    window.clearTimeout(timerRef.current);
    window.clearTimeout(secondaryTimerRef.current);
  }, []);

  const changeDepth = (next) => {
    window.clearTimeout(secondaryTimerRef.current);
    viewportDrag.ref.current?.scrollTo({ top: 0, behavior: "auto" });
    setSecondaryLevel(next);
    if (!next) {
      setSecondaryPending(false);
      return;
    }
    setSecondaryPending(true);
    secondaryTimerRef.current = window.setTimeout(
      () => setSecondaryPending(false),
      reduceMotion ? 80 : 260,
    );
  };

  const navigate = (nextPage) => {
    if (nextPage === page || nextPage === pendingPage) return;
    window.clearTimeout(timerRef.current);
    window.clearTimeout(secondaryTimerRef.current);
    setSecondaryLevel(false);
    setSecondaryPending(false);
    viewportDrag.ref.current?.scrollTo({ top: 0, behavior: "auto" });
    setDirection(
      pageOrder.indexOf(nextPage) > pageOrder.indexOf(page) ? 1 : -1,
    );
    setPendingPage(nextPage);
    timerRef.current = window.setTimeout(
      () => {
        setPage(nextPage);
        setPendingPage(null);
      },
      reduceMotion ? 80 : 360,
    );
  };

  const openTitle = (title, sourceId) => setDetail({ title, sourceId });
  const guidedFlows = [
    { id: "choose", hypothesis: "H1–H2", title: "Encontrar sem saber o nome", supporting: "Busca por pista e curadoria", page: "search" },
    { id: "scene", hypothesis: "H3", title: "Decidir por uma prévia", supporting: "Feed vertical em Em cena", page: "scene" },
    { id: "contribute", hypothesis: "H4–H5", title: "Guardar, avaliar ou indicar", supporting: "Ações distintas no detalhe", page: "home", detail: true },
    { id: "collaborate", hypothesis: "H6", title: "Construir uma lista junto", supporting: "Listas e participantes em Minha área", page: "profile" },
    { id: "access", hypothesis: "H7–H8", title: "Entender preço e acesso", supporting: "Loja, oferta e próximo passo", page: "store" },
  ];
  const startGuidedFlow = (flow) => {
    setGuidedFlow(flow.id);
    setDetail(null);
    navigate(flow.page);
    if (flow.detail) {
      window.setTimeout(
        () => setDetail({ title: titles[0], sourceId: "guided-detail" }),
        reduceMotion ? 100 : 440,
      );
    }
    toast.info(`${flow.hypothesis} · ${flow.title}`);
  };
  const renderPage = () =>
    page === "home" ? (
      <HomePage open={openTitle} onScene={() => navigate("scene")} onDepthChange={changeDepth} />
    ) : page === "search" ? (
      <SearchPage open={openTitle} />
    ) : page === "scene" ? (
      <ScenePage open={openTitle} />
    ) : page === "store" ? (
      <StorePage open={openTitle} onDepthChange={changeDepth} />
    ) : (
      <ProfilePage open={openTitle} onDepthChange={changeDepth} />
    );

  return (
    <div className="workspace">
      <div className={`device${secondaryLevel ? " secondary-level" : ""}`}>
        {!secondaryLevel ? <Header onProfile={() => navigate("profile")} /> : null}
        <div className="viewport" {...viewportDrag}>
          <AnimatePresence mode="wait" custom={direction}>
            {pendingPage ? (
              <RouteSkeleton key={`loading-${pendingPage}`} />
            ) : (
              <motion.div
                key={page}
                className="route-stage"
                custom={direction}
                variants={routeVariants}
                initial={reduceMotion ? false : "enter"}
                animate="center"
                exit={reduceMotion ? undefined : "exit"}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
                }
              >
                {renderPage()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {secondaryPending ? <SecondaryRouteSkeleton key="secondary-loading" /> : null}
        </AnimatePresence>
        {!secondaryLevel ? <Nav page={pendingPage ?? page} setPage={navigate} /> : null}
        <AnimatePresence>
          {detail && (
            <Detail
              title={detail.title}
              sourceId={detail.sourceId}
              onClose={() => setDetail(null)}
            />
          )}
        </AnimatePresence>
        <Toaster />
      </div>
      <aside className="notes">
        <Badge tone="brand">EXPLORAÇÃO GUIADA</Badge>
        <h2>Abra os fluxos ligados às hipóteses</h2>
        <p className="guide-intro">Use os atalhos para chegar aos principais comportamentos. A navegação continua livre dentro do protótipo.</p>
        <div className="guided-flows">
          {guidedFlows.map((flow, index) => (
            <button
              key={flow.id}
              type="button"
              data-active={guidedFlow === flow.id || undefined}
              onClick={() => startGuidedFlow(flow)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <small>{flow.hypothesis}</small>
                <strong>{flow.title}</strong>
                <em>{flow.supporting}</em>
              </div>
              <ChevronRight />
            </button>
          ))}
        </div>
        <h3>Observe durante o percurso</h3>
        <p>Primeiro caminho, desvios, retornos, feedback percebido e termos que geram dúvida.</p>
        <small><strong>Limite:</strong> títulos, transações, sincronização e recomendação são simulados.</small>
      </aside>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
