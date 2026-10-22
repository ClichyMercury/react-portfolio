import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "./SectionHeader";
import SectionRail from "./fx/SectionRail";
import Counter from "./fx/Counter";

type Framework = "laravel" | "adonis" | "nest" | "fastify";

interface BackendNode {
  id: string;
  name: string;
  framework: Framework;
  summary: string;
  endpoints: number;
  approx?: boolean;
  migrations?: number;
  tests: number;
  stack: string[];
  clients: string[];
  infra: string[];
  highlights: string[];
  sample: [string, string, number];
}

const S = "https://cdn.simpleicons.org";

export const FRAMEWORKS: Record<Framework, { label: string; color: string; logo: string }> = {
  laravel: { label: "Laravel", color: "#FF6B5B", logo: `${S}/laravel/FF2D20` },
  adonis: { label: "AdonisJS", color: "#9B7BFF", logo: `${S}/adonisjs/9B7BFF` },
  nest: { label: "NestJS", color: "#F0506E", logo: `${S}/nestjs/E0234E` },
  fastify: { label: "Fastify", color: "#E2E8F0", logo: `${S}/fastify/E2E8F0` },
};

export const INSPECT_EVENT = "server-room:inspect";

const FrameworkLogo = ({ framework, size = 14 }: { framework: Framework; size?: number }) => (
  <img
    src={FRAMEWORKS[framework].logo}
    alt={FRAMEWORKS[framework].label}
    width={size}
    height={size}
    loading="lazy"
    className="flex-shrink-0"
    style={{ width: size, height: size }}
  />
);

const STATUS_TEXT: Record<number, string> = { 200: "OK", 201: "Created", 204: "No Content" };

const latency = (seed: string) => {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return 18 + (h % 70);
};

const ServerRoom = ({ nodes = defaultNodes }: { nodes?: BackendNode[] }) => {
  const [filter, setFilter] = useState<Framework | "all">("all");
  const [activeId, setActiveId] = useState(nodes[0].id);
  const inspectorRef = useRef<HTMLDivElement>(null);

  const inspect = (id: string) => {
    setActiveId(id);
    if (window.innerWidth < 1024) {
      requestAnimationFrame(() => inspectorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  };

  useEffect(() => {
    const onInspect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      setFilter("all");
      setActiveId(id);
      requestAnimationFrame(() => inspectorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    };
    window.addEventListener(INSPECT_EVENT, onInspect);
    return () => window.removeEventListener(INSPECT_EVENT, onInspect);
  }, []);

  const visible = useMemo(() => (filter === "all" ? nodes : nodes.filter((n) => n.framework === filter)), [filter, nodes]);
  const active = visible.find((n) => n.id === activeId) ?? visible[0];

  const totals = useMemo(
    () => ({
      endpoints: nodes.reduce((s, n) => s + n.endpoints, 0),
      tests: nodes.reduce((s, n) => s + n.tests, 0),
      frameworks: new Set(nodes.map((n) => n.framework)).size,
    }),
    [nodes]
  );

  const frameworkFilters: (Framework | "all")[] = ["all", ...(Object.keys(FRAMEWORKS) as Framework[]).filter((f) => nodes.some((n) => n.framework === f))];

  return (
    <section id="server-room" className="min-h-screen py-32 lg:py-44 px-6 relative">
      <SectionRail index="05" label="server_room" motif="leds" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader
          index="05"
          label="server_room"
          title="Server"
          titleHighlight="Room"
          description="The APIs behind my apps. No source code here: only architecture, volumes and technical choices, measured from the repositories."
        />

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-px mb-10 rounded-xl overflow-hidden"
          style={{ background: "var(--border-subtle)", border: "1px solid var(--border-subtle)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            { label: "nodes online", value: nodes.length, suffix: "" },
            { label: "endpoints served", value: totals.endpoints, suffix: "+" },
            { label: "test files", value: totals.tests, suffix: "+" },
            { label: "frameworks", value: totals.frameworks, suffix: "" },
          ].map((s) => (
            <div key={s.label} className="px-5 py-5" style={{ background: "var(--bg-card)" }}>
              <Counter value={s.value} suffix={s.suffix} className="block text-2xl lg:text-4xl font-semibold mb-1" />
              <span className="font-mono text-[9px] uppercase tracking-[0.25em]" style={{ color: "var(--fg-faint)" }}>{s.label}</span>
            </div>
          ))}
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-6">
          {frameworkFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="flex items-center gap-2 px-4 py-2 rounded font-mono text-[10px] uppercase tracking-[0.15em] transition-all duration-300"
              style={{
                background: filter === f ? "var(--accent)" : "transparent",
                color: filter === f ? "var(--bg)" : "var(--fg-muted)",
                border: `1px solid ${filter === f ? "var(--accent)" : "var(--border-medium)"}`,
              }}
            >
              {f !== "all" && <FrameworkLogo framework={f} size={12} />}
              {f === "all" ? "all" : FRAMEWORKS[f].label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 panel rounded-xl overflow-hidden hud-corners">
            <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-elevated)" }}>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--accent)" }}>rack_a // {visible.length} nodes</span>
              <span className="flex items-center gap-1.5 font-mono text-[10px]" style={{ color: "var(--fg-faint)" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#28C840" }} />all systems nominal
              </span>
            </div>
            <div className="max-h-[420px] lg:max-h-[640px] overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
              {visible.map((n, i) => {
                const isActive = n.id === active.id;
                return (
                  <button
                    key={n.id}
                    onClick={() => inspect(n.id)}
                    className="group w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-200"
                    style={{
                      borderBottom: "1px solid var(--border-subtle)",
                      background: isActive ? "rgba(0,229,255,0.06)" : "transparent",
                      boxShadow: isActive ? "inset 2px 0 0 var(--accent)" : "none",
                    }}
                    data-cursor="inspect"
                  >
                    <span className="font-mono text-[9px] w-5" style={{ color: "var(--fg-faint)" }}>{String(i + 1).padStart(2, "0")}</span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? "animate-pulse" : ""}`}
                      style={{ background: isActive ? "var(--accent)" : "#28C840", boxShadow: isActive ? "0 0 8px var(--accent)" : "none" }}
                    />
                    <span className="flex-1 min-w-0">
                      <span
                        className="block truncate font-mono text-[11px] transition-colors duration-200 group-hover:text-[var(--fg)]"
                        style={{ color: isActive ? "var(--fg)" : "var(--fg-muted)" }}
                      >
                        {n.name}
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.1em]" style={{ color: FRAMEWORKS[n.framework].color }}>
                      <FrameworkLogo framework={n.framework} size={12} />
                      <span className="hidden sm:inline">{FRAMEWORKS[n.framework].label}</span>
                    </span>
                    <span className="font-mono text-[10px] w-14 text-right" style={{ color: "var(--fg-faint)" }}>
                      {n.approx ? "~" : ""}{n.endpoints} ep
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div ref={inspectorRef} className="lg:col-span-3 panel rounded-xl overflow-hidden hud-corners tentacle-glow scroll-mt-24">
            <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-elevated)" }}>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] truncate" style={{ color: "var(--accent)" }}>inspect // {active.id}</span>
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] flex-shrink-0" style={{ color: FRAMEWORKS[active.framework].color }}>
                <FrameworkLogo framework={active.framework} size={14} />
                {FRAMEWORKS[active.framework].label}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className="p-5 sm:p-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl sm:text-2xl font-medium leading-tight mb-2">{active.name}</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--fg-muted)" }}>{active.summary}</p>

                <div className="grid grid-cols-3 gap-px mb-6 rounded-lg overflow-hidden" style={{ background: "var(--border-subtle)", border: "1px solid var(--border-subtle)" }}>
                  {[
                    { label: "endpoints", value: `${active.approx ? "~" : ""}${active.endpoints}` },
                    { label: "migrations", value: active.migrations ? String(active.migrations) : "—" },
                    { label: "test files", value: String(active.tests) },
                  ].map((m) => (
                    <div key={m.label} className="px-3 py-3" style={{ background: "var(--bg)" }}>
                      <span className="block text-lg sm:text-xl font-semibold">{m.value}</span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--fg-faint)" }}>{m.label}</span>
                    </div>
                  ))}
                </div>

                <span className="block mb-3 font-mono text-[9px] uppercase tracking-[0.25em]" style={{ color: "var(--fg-faint)" }}>// topology</span>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 mb-6">
                  <div className="flex sm:flex-col flex-wrap gap-1.5 sm:w-[30%]">
                    {active.clients.map((c) => (
                      <span key={c} className="px-2 py-1 rounded font-mono text-[9px] uppercase tracking-[0.1em] text-center" style={{ border: "1px solid var(--border-medium)", color: "var(--fg-muted)" }}>{c}</span>
                    ))}
                  </div>
                  <Wire />
                  <div
                    className="sm:w-[28%] px-3 py-4 rounded-lg text-center"
                    style={{ border: `1px solid ${FRAMEWORKS[active.framework].color}`, boxShadow: `0 0 24px ${FRAMEWORKS[active.framework].color}22`, background: "var(--bg)" }}
                  >
                    <span className="flex justify-center mb-2"><FrameworkLogo framework={active.framework} size={28} /></span>
                    <span className="block font-mono text-[9px] uppercase tracking-[0.2em] mb-1" style={{ color: "var(--fg-faint)" }}>api</span>
                    <span className="block font-mono text-[11px]" style={{ color: FRAMEWORKS[active.framework].color }}>{FRAMEWORKS[active.framework].label}</span>
                  </div>
                  <Wire />
                  <div className="flex sm:flex-col flex-wrap gap-1.5 sm:w-[30%]">
                    {active.infra.map((c) => (
                      <span key={c} className="px-2 py-1 rounded font-mono text-[9px] uppercase tracking-[0.1em] text-center" style={{ background: "var(--bg-elevated)", color: "var(--fg-muted)" }}>{c}</span>
                    ))}
                  </div>
                </div>

                <span className="block mb-3 font-mono text-[9px] uppercase tracking-[0.25em]" style={{ color: "var(--fg-faint)" }}>// engineering</span>
                <ul className="space-y-2 mb-6">
                  {active.highlights.map((h, i) => (
                    <motion.li
                      key={h}
                      className="flex gap-2.5 text-sm leading-relaxed"
                      style={{ color: "var(--fg-muted)" }}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                    >
                      <span style={{ color: "var(--accent)" }}>▸</span>{h}
                    </motion.li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {active.stack.map((t) => (
                    <span key={t} className="px-2 py-1 rounded font-mono text-[9px]" style={{ border: "1px solid var(--border-subtle)", color: "var(--fg-faint)" }}>{t}</span>
                  ))}
                </div>

                <div className="rounded-lg px-4 py-3 font-mono text-[10px] sm:text-[11px] leading-relaxed overflow-x-auto" style={{ background: "var(--bg)", border: "1px solid var(--border-subtle)" }}>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="whitespace-nowrap">
                    <span style={{ color: "var(--accent)" }}>$</span>{" "}
                    <span style={{ color: "var(--fg-muted)" }}>curl -X {active.sample[0]} /v1{active.sample[1]}</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="whitespace-nowrap">
                    <span style={{ color: "#28C840" }}>← {active.sample[2]} {STATUS_TEXT[active.sample[2]]}</span>
                    <span style={{ color: "var(--fg-faint)" }}> · {latency(active.id)}ms · simulated trace</span>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-6 font-mono text-[10px]" style={{ color: "var(--fg-faint)" }}>
          <span style={{ color: "var(--accent)" }}>$</span> volumes counted from each repository · traces are fictitious · no source code, keys or real endpoints exposed
        </p>
      </div>

      <div className="tentacle-line mt-28 max-w-md mx-auto"></div>
    </section>
  );
};

const Wire = () => (
  <div className="relative hidden sm:block flex-1 h-px mx-2" style={{ background: "var(--border-medium)" }}>
    <motion.span
      className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
      style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }}
      animate={{ left: ["0%", "100%"] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const defaultNodes: BackendNode[] = [
  {
    id: "transfertcm",
    name: "TransfertCM API",
    framework: "adonis",
    summary:
      "API de TransfertCM, plateforme de crédit, forfaits et mobile money au Cameroun. Elle sert l'application mobile, le back-office et l'espace des cabines qui exécutent les recharges.",
    endpoints: 260,
    approx: true,
    migrations: 61,
    tests: 69,
    stack: ["AdonisJS 7", "TypeScript", "Lucid", "VineJS", "PostgreSQL", "Redis", "BullMQ", "Socket.io", "S3"],
    clients: ["mobile app", "back-office", "cabin space"],
    infra: ["PostgreSQL", "Redis · BullMQ", "S3", "Socket.io"],
    highlights: [
      "Circuit breaker sur les prestataires de paiement",
      "Moteur d'attribution automatique des commandes aux cabines",
      "Anti-fraude, limitation de débit et protection de charge",
    ],
    sample: ["POST", "/orders", 201],
  },
  {
    id: "jeko-api",
    name: "Jèko API",
    framework: "adonis",
    summary:
      "J'ai travaillé sur l'API de Jèko, plateforme de paiement qui expose des APIs partenaires, privées et d'administration pour les applications marchandes, le cockpit et les intégrations.",
    endpoints: 300,
    approx: true,
    migrations: 317,
    tests: 655,
    stack: ["AdonisJS 7", "TypeScript", "TypeSpec", "PostgreSQL", "Redis", "BullMQ", "OpenTelemetry", "S3"],
    clients: ["merchant app", "cockpit", "partners"],
    infra: ["PostgreSQL", "Redis · BullMQ", "S3", "OpenTelemetry"],
    highlights: [
      "Contrats d'API décrits en TypeSpec",
      "Files de traitement BullMQ instrumentées avec OpenTelemetry",
      "Plus de 650 fichiers de tests",
    ],
    sample: ["POST", "/payments", 201],
  },
  {
    id: "apci-api",
    name: "APCI API",
    framework: "laravel",
    summary:
      "API de l'Assemblée des Anciens Parlementaires de Côte d'Ivoire : contenu éditorial, annuaire, mémorial, documents, galeries, espace privé des membres et recherche.",
    endpoints: 207,
    migrations: 33,
    tests: 34,
    stack: ["Laravel 13", "PHP 8.4", "PostgreSQL", "Sanctum", "Spatie Permission", "Media Library", "Activity Log", "Pest"],
    clients: ["public site", "back-office", "member space"],
    infra: ["PostgreSQL", "Media storage"],
    highlights: [
      "Recherche plein texte PostgreSQL (tsvector et index GIN)",
      "Contenus traduits FR/EN stockés en jsonb",
      "Journal d'audit de toutes les actions d'administration",
    ],
    sample: ["GET", "/members?search=…", 200],
  },
  {
    id: "dgre-api",
    name: "SIGAPE-OH API",
    framework: "laravel",
    summary:
      "API de SIGAPE-OH, le système de gestion des autorisations de prélèvement d'eau de la DGRE (Ministère des Eaux et Forêts) : dépôt des demandes, instruction et délivrance.",
    endpoints: 138,
    migrations: 21,
    tests: 9,
    stack: ["Laravel", "PostgreSQL", "Sanctum", "Spatie Permission", "Activity Log"],
    clients: ["citizen portal", "back-office"],
    infra: ["PostgreSQL", "Document storage"],
    highlights: [
      "Workflow d'instruction en 9 étapes jusqu'à la signature du Ministre",
      "Chaque agent n'agit que sur les dossiers de son étape",
      "Journalisation de chaque transition du workflow",
    ],
    sample: ["PATCH", "/applications/{id}/step", 200],
  },
  {
    id: "ccdo-dmg",
    name: "CCDO-DMG API",
    framework: "laravel",
    summary:
      "API du Centre de Commandement des Opérations de la Direction des Moyens Généraux : suivi des opérations, des moyens et des équipes.",
    endpoints: 167,
    migrations: 60,
    tests: 11,
    stack: ["Laravel", "Sanctum", "JWT", "Laravel Reverb"],
    clients: ["dashboard", "client apps"],
    infra: ["SQL database", "Reverb websockets"],
    highlights: [
      "Mises à jour en temps réel avec Laravel Reverb",
      "Authentification par jetons Sanctum et JWT",
    ],
    sample: ["GET", "/operations", 200],
  },
  {
    id: "miaba-api",
    name: "MIABA API",
    framework: "laravel",
    summary:
      "API REST de MIABA, marketplace de mobilité. Le backend ne sert que du JSON, consommé par le front SvelteKit.",
    endpoints: 138,
    migrations: 44,
    tests: 37,
    stack: ["Laravel", "Sanctum", "Spatie Permission", "Media Library", "Query Builder", "Activity Log"],
    clients: ["SvelteKit front", "back-office"],
    infra: ["SQL database", "Media storage"],
    highlights: [
      "Filtres et tris déclaratifs avec Spatie Query Builder",
      "Rôles et permissions, journal d'activité",
    ],
    sample: ["GET", "/listings?filter[city]=…", 200],
  },
  {
    id: "transfertci-backend",
    name: "TransfertCI API",
    framework: "adonis",
    summary:
      "Nouveau backend de TransfertCI, migré depuis Supabase vers AdonisJS : transferts mobile money, gestion des cabines, support client et réseau social interne.",
    endpoints: 55,
    migrations: 141,
    tests: 17,
    stack: ["AdonisJS", "TypeScript", "Lucid", "VineJS", "PostgreSQL", "Redis", "BullMQ", "Socket.io", "S3"],
    clients: ["web app", "mobile app"],
    infra: ["PostgreSQL", "Redis · BullMQ", "S3", "Socket.io"],
    highlights: [
      "Migration de Supabase vers une API AdonisJS dédiée",
      "Webhooks des prestataires de paiement et portefeuille",
      "Temps réel avec Socket.io et adaptateur Redis",
    ],
    sample: ["POST", "/transfers", 201],
  },
  {
    id: "ma-com-backend",
    name: "MaCom API",
    framework: "nest",
    summary:
      "Backend NestJS de MaCom, organisé en Domain-Driven Design avec une authentification complète.",
    endpoints: 143,
    tests: 10,
    stack: ["NestJS", "TypeScript", "Prisma", "Passport JWT", "Swagger"],
    clients: ["client apps"],
    infra: ["Prisma ORM", "SQL database"],
    highlights: [
      "Architecture Domain-Driven Design",
      "52 modèles de données décrits avec Prisma",
      "Documentation OpenAPI générée avec Swagger",
    ],
    sample: ["POST", "/auth/login", 200],
  },
  {
    id: "lacantine-api",
    name: "Ma Cantine API",
    framework: "fastify",
    summary:
      "J'ai travaillé sur l'API de Ma Cantine, qui alimente l'application client, l'espace restaurateur, le back-office et le site vitrine.",
    endpoints: 42,
    migrations: 4,
    tests: 8,
    stack: ["Fastify", "TypeScript", "MikroORM", "PostgreSQL", "JWT", "TypeBox", "Argon2", "Sharp"],
    clients: ["client app", "restaurant app", "admin"],
    infra: ["PostgreSQL", "Uploads · Sharp", "Mail · SMS"],
    highlights: [
      "Une API pour quatre applications",
      "Validation des schémas avec TypeBox et mots de passe en Argon2",
    ],
    sample: ["GET", "/dishes?day=tomorrow", 200],
  },
  {
    id: "decor-de-reve",
    name: "Décor de Rêve API",
    framework: "laravel",
    summary:
      "J'ai travaillé sur l'API de Décor de Rêve : catalogue, stock, commandes clients, achats fournisseurs, bons de livraison et site vitrine.",
    endpoints: 117,
    migrations: 36,
    tests: 11,
    stack: ["Laravel", "Sanctum"],
    clients: ["back-office", "showcase site"],
    infra: ["SQL database", "Image storage"],
    highlights: [
      "Produits composés et mouvements de stock",
      "Chaîne complète : bon de commande, vente, livraison",
    ],
    sample: ["POST", "/sales-orders", 201],
  },
  {
    id: "agripilote-api",
    name: "AgriPilote API",
    framework: "laravel",
    summary:
      "J'ai travaillé sur l'API d'AgriPilote, qui organise les missions de traitement agricole par drone : parcelles, plantations, équipes de télépilotes et rapports.",
    endpoints: 102,
    migrations: 39,
    tests: 10,
    stack: ["Laravel", "Sanctum"],
    clients: ["back-office", "field teams"],
    infra: ["SQL database", "File storage"],
    highlights: [
      "Planification des missions drone et affectation des télépilotes",
      "Rapports de traitement journaliers par parcelle",
    ],
    sample: ["GET", "/missions", 200],
  },
  {
    id: "forage-backend",
    name: "Forage API",
    framework: "adonis",
    summary:
      "API de la plateforme de mise en relation pour les prestations de forage : clients, entreprises et administrateurs autour d'un appel d'offres.",
    endpoints: 55,
    migrations: 18,
    tests: 0,
    stack: ["AdonisJS", "TypeScript", "Lucid", "VineJS", "Nodemailer"],
    clients: ["client space", "company space", "admin"],
    infra: ["SQL database", "Documents", "Mail"],
    highlights: [
      "Workflow d'appel d'offres en 8 étapes",
      "Offres masquées entre prestataires concurrents",
    ],
    sample: ["POST", "/projects/{id}/offers", 201],
  },
  {
    id: "catho-et-fier-api",
    name: "Catho et Fier API",
    framework: "laravel",
    summary:
      "Backend REST de l'application mobile catholique Catho et Fier.",
    endpoints: 62,
    migrations: 26,
    tests: 21,
    stack: ["Laravel 13", "PostgreSQL", "Redis", "JWT", "Laravel Reverb", "Firebase", "Stripe", "PayDunya", "S3"],
    clients: ["mobile app"],
    infra: ["PostgreSQL", "Redis", "S3", "Firebase"],
    highlights: [
      "Paiements Stripe et PayDunya",
      "Temps réel avec Laravel Reverb et notifications Firebase",
    ],
    sample: ["GET", "/feed", 200],
  },
  {
    id: "as-mobile-api",
    name: "Axelle Sanogo API",
    framework: "laravel",
    summary:
      "API REST de la maroquinerie Axelle Sanogo, qui sert deux clients : l'application mobile (catalogue public) et le back-office (administration).",
    endpoints: 71,
    migrations: 19,
    tests: 10,
    stack: ["Laravel", "Sanctum"],
    clients: ["mobile app", "back-office"],
    infra: ["SQL database", "Image storage"],
    highlights: ["Une API pour une app mobile publique et un back-office d'administration"],
    sample: ["GET", "/products?collection=…", 200],
  },
  {
    id: "ccdo-staff-timekeeping",
    name: "CCDO Pointage API",
    framework: "laravel",
    summary:
      "API de gestion des arrivées et départs du personnel : pointage sur une tablette à l'entrée du service, validé par le chef de dispositif.",
    endpoints: 49,
    migrations: 12,
    tests: 16,
    stack: ["Laravel", "JWT", "Laravel Reverb"],
    clients: ["entry tablet", "supervisor app"],
    infra: ["SQL database", "Reverb websockets"],
    highlights: ["Validation des pointages en temps réel par le chef de dispositif"],
    sample: ["POST", "/check-ins", 201],
  },
  {
    id: "civis-alerte",
    name: "Civis Alerte API",
    framework: "laravel",
    summary:
      "J'ai travaillé sur l'API Civis Alerte : signalements citoyens, agents et services, contacts familiaux et notifications SMS.",
    endpoints: 35,
    migrations: 32,
    tests: 2,
    stack: ["Laravel", "JWT", "Filament"],
    clients: ["citizen app", "agent app", "admin"],
    infra: ["SQL database", "SMS gateway"],
    highlights: ["Back-office d'administration avec Filament"],
    sample: ["POST", "/alerts", 201],
  },
  {
    id: "poto-map-api",
    name: "Poto Map API",
    framework: "nest",
    summary:
      "J'ai travaillé sur l'API Poto Map : authentification par code OTP envoyé par SMS et gestion des utilisateurs.",
    endpoints: 6,
    tests: 1,
    stack: ["NestJS", "TypeScript", "TypeORM", "JWT"],
    clients: ["mobile app"],
    infra: ["SQL database", "SMS gateway"],
    highlights: ["Connexion sans mot de passe par OTP SMS"],
    sample: ["POST", "/auth/otp", 201],
  },
];

export const BACKEND_NODES = defaultNodes;

export default ServerRoom;
