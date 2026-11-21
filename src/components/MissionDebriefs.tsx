import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "./SectionHeader";
import SectionRail from "./fx/SectionRail";
import { useLocale, type Localized } from "@/i18n";

interface Flow {
  label: Localized<string>;
  nodes: Localized<string[]>;
}

interface Debrief {
  id: string;
  code: Localized<string>;
  project: string;
  title: Localized<string>;
  status: Localized<string>;
  ongoing?: boolean;
  stack: string[];
  context: Localized<string>;
  constraints: Localized<string[]>;
  decisions: Localized<string[]>;
  outcome: Localized<string[]>;
  before: Flow;
  after: Flow;
  timeline?: Localized<string[]>;
}

const BLOCKS: { key: "constraints" | "decisions" | "outcome"; label: Localized<string> }[] = [
  { key: "constraints", label: { fr: "contraintes", en: "constraints" } },
  { key: "decisions", label: { fr: "décisions", en: "decisions" } },
  { key: "outcome", label: { fr: "résultats", en: "outcome" } },
];

const MissionDebriefs = ({ debriefs = defaultDebriefs }: { debriefs?: Debrief[] }) => {
  const { pick } = useLocale();
  const [activeId, setActiveId] = useState(debriefs[0].id);
  const active = debriefs.find((d) => d.id === activeId) ?? debriefs[0];
  const timeline = active.timeline ? pick(active.timeline) : undefined;

  return (
    <section id="debriefs" className="min-h-screen py-32 lg:py-44 px-6 relative">
      <SectionRail index="06" label={pick({ fr: "comptes_rendus", en: "debriefs" })} motif="crosshair" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader
          index="06"
          label={pick({ fr: "comptes_rendus", en: "debriefs" })}
          title={pick({ fr: "Débriefs", en: "Mission" })}
          titleHighlight={pick({ fr: "de mission", en: "Debriefs" })}
          description={pick({
            fr: "Ma façon de réfléchir, pas seulement ce que je livre : le problème, les contraintes, les décisions et ce qui en est ressorti.",
            en: "How I think, not just what I ship: the problem, the constraints, the decisions and what came out of them.",
          })}
        />

        <div className="flex items-end gap-1 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {debriefs.map((d) => {
            const isActive = d.id === active.id;
            return (
              <button
                key={d.id}
                onClick={() => setActiveId(d.id)}
                className="flex-shrink-0 px-4 sm:px-5 py-2.5 rounded-t-lg text-left transition-colors duration-300"
                style={{
                  background: isActive ? "var(--bg-card)" : "transparent",
                  border: "1px solid var(--border-subtle)",
                  borderBottom: isActive ? "1px solid var(--bg-card)" : "1px solid var(--border-subtle)",
                  marginBottom: -1,
                }}
                data-cursor="declassify"
              >
                <span className="block font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: isActive ? "var(--accent)" : "var(--fg-faint)" }}>{pick(d.code)}</span>
                <span className="block font-mono text-[11px] uppercase tracking-[0.1em]" style={{ color: isActive ? "var(--fg)" : "var(--fg-muted)" }}>{d.project}</span>
              </button>
            );
          })}
        </div>

        <div className="panel rounded-b-xl rounded-tr-xl overflow-hidden hud-corners" style={{ background: "var(--bg-card)" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              className="p-5 sm:p-8 lg:p-10"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div className="max-w-2xl">
                  <h3 className="text-2xl sm:text-3xl font-semibold leading-tight mb-3">{pick(active.title)}</h3>
                  <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>{pick(active.context)}</p>
                </div>
                <motion.span
                  className="flex-shrink-0 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] rotate-[-4deg]"
                  style={{
                    color: active.ongoing ? "#FEBC2E" : "#28C840",
                    border: `2px double ${active.ongoing ? "#FEBC2E" : "#28C840"}`,
                  }}
                  initial={{ scale: 1.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.25, type: "spring", stiffness: 260, damping: 18 }}
                >
                  {pick(active.status)}
                </motion.span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[active.before, active.after].map((flow, fi) => (
                  <div key={flow.label.en} className="rounded-lg p-4" style={{ background: "var(--bg)", border: `1px solid ${fi === 1 ? "var(--accent)" : "var(--border-subtle)"}` }}>
                    <span className="block mb-3 font-mono text-[9px] uppercase tracking-[0.25em]" style={{ color: fi === 1 ? "var(--accent)" : "var(--fg-faint)" }}>
                      {fi === 0 ? pick({ fr: "// avant", en: "// before" }) : pick({ fr: "// après", en: "// after" })} — {pick(flow.label)}
                    </span>
                    <div className="flex flex-col items-stretch gap-1">
                      {pick(flow.nodes).map((n, ni) => (
                        <motion.div
                          key={n}
                          className="flex flex-col items-center"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 + fi * 0.25 + ni * 0.08 }}
                        >
                          {ni > 0 && <span className="font-mono text-[10px] leading-none" style={{ color: "var(--fg-faint)" }}>↓</span>}
                          <span
                            className="w-full text-center px-3 py-1.5 rounded font-mono text-[10px] sm:text-[11px]"
                            style={{ border: "1px solid var(--border-medium)", color: fi === 1 ? "var(--fg)" : "var(--fg-muted)" }}
                          >
                            {n}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-6 mb-8">
                {BLOCKS.map((b, bi) => (
                  <div key={b.key}>
                    <span className="flex items-center gap-3 mb-3 font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--accent)" }}>
                      {String(bi + 1).padStart(2, "0")} // {pick(b.label)}
                      <span className="flex-1 tentacle-line" />
                    </span>
                    <ul className="space-y-2">
                      {pick(active[b.key]).map((item, i) => (
                        <motion.li
                          key={item}
                          className="flex gap-2.5 text-sm leading-relaxed"
                          style={{ color: "var(--fg-muted)" }}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + bi * 0.12 + i * 0.05 }}
                        >
                          <span style={{ color: "var(--accent)" }}>▸</span>{item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {timeline && (
                <div className="mb-8">
                  <span className="block mb-3 font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--fg-faint)" }}>{pick({ fr: "// chronologie des commits", en: "// commit timeline" })}</span>
                  <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "thin" }}>
                    {timeline.map((t, i) => (
                      <motion.span
                        key={t}
                        className="flex-shrink-0 px-2.5 py-1.5 rounded font-mono text-[10px] whitespace-nowrap"
                        style={{
                          background: "var(--bg)",
                          border: `1px solid ${i === timeline.length - 1 && active.ongoing ? "#FEBC2E" : "var(--border-subtle)"}`,
                          color: "var(--fg-muted)",
                        }}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.05 }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-1.5">
                {active.stack.map((t) => (
                  <span key={t} className="px-2 py-1 rounded font-mono text-[9px]" style={{ border: "1px solid var(--border-subtle)", color: "var(--fg-faint)" }}>{t}</span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="tentacle-line mt-28 max-w-md mx-auto"></div>
    </section>
  );
};

const defaultDebriefs: Debrief[] = [
  {
    id: "transfertci-migration",
    code: { fr: "dossier_001", en: "case_001" },
    project: "TransfertCI",
    title: {
      fr: "Sortir de Supabase sans couper le service",
      en: "Leaving Supabase without taking the service down",
    },
    status: { fr: "en cours", en: "in progress" },
    ongoing: true,
    stack: ["AdonisJS", "PostgreSQL 16", "Redis", "BullMQ", "Socket.io", "S3 / MinIO", "Nginx", "Japa"],
    context: {
      fr: "TransfertCI, plateforme de transfert mobile money en Côte d'Ivoire, tournait entièrement sur Supabase : Postgres managé, 67 Edge Functions, Realtime et Storage. J'ai conçu et mène la migration vers un backend AdonisJS auto-hébergé.",
      en: "TransfertCI, a mobile money transfer platform in Ivory Coast, ran entirely on Supabase: managed Postgres, 67 Edge Functions, Realtime and Storage. I designed and am leading the migration to a self-hosted AdonisJS backend.",
    },
    constraints: {
      fr: [
        "Une facture qui grimpe avec 67 Edge Functions, le temps réel et le stockage",
        "Dépendance forte au fournisseur : fonctions Deno, auth et temps réel propriétaires",
        "Cold starts et latence ressentis depuis la Côte d'Ivoire",
        "Le front React et les apps mobiles Capacitor ne devaient pas être réécrits",
      ],
      en: [
        "A bill climbing with 67 Edge Functions, realtime and storage",
        "Heavy vendor lock-in: Deno functions, proprietary auth and realtime",
        "Cold starts and latency felt from Ivory Coast",
        "The React front end and Capacitor mobile apps were not to be rewritten",
      ],
    },
    decisions: {
      fr: [
        "Strangler pattern : Nginx envoie /v1 vers AdonisJS et le reste vers Supabase, route par route",
        "Import du schéma existant puis scripts d'introspection qui génèrent migrations, modèles et relations",
        "Workers BullMQ pour les tâches de fond, Socket.io pour la signalisation WebRTC déjà en place",
        "Paiements derrière un pattern de providers, avec retry, circuit breaker et verrouillage",
      ],
      en: [
        "Strangler pattern: Nginx sends /v1 to AdonisJS and everything else to Supabase, route by route",
        "Imported the existing schema, then introspection scripts that generate migrations, models and relations",
        "BullMQ workers for background jobs, Socket.io for the existing WebRTC signaling",
        "Payments behind a provider pattern, with retry, circuit breaker and locking",
      ],
    },
    outcome: {
      fr: [
        "135 tables et 145 clés étrangères importées sans aucune erreur",
        "137 migrations, 135 modèles et 257 relations générés automatiquement",
        "Flux de paiement Jèko complet couvert par 60 tests verts",
        "Wallet, temps réel, stockage et back-office admin migrés ; la bascule finale reste à faire",
      ],
      en: [
        "135 tables and 145 foreign keys imported without a single error",
        "137 migrations, 135 models and 257 relations generated automatically",
        "Full Jèko payment flow covered by 60 passing tests",
        "Wallet, realtime, storage and admin back office migrated; the final cutover is still to come",
      ],
    },
    before: {
      label: { fr: "supabase", en: "supabase" },
      nodes: {
        fr: ["React + Capacitor", "67 Edge Functions (Deno)", "Realtime · Storage", "Postgres managé"],
        en: ["React + Capacitor", "67 Edge Functions (Deno)", "Realtime · Storage", "Managed Postgres"],
      },
    },
    after: {
      label: { fr: "auto-hébergé", en: "self-hosted" },
      nodes: {
        fr: ["React + Capacitor", "Nginx · routage strangler", "AdonisJS API /v1 · Socket.io", "PostgreSQL · Redis/BullMQ · S3"],
        en: ["React + Capacitor", "Nginx · strangler routing", "AdonisJS API /v1 · Socket.io", "PostgreSQL · Redis/BullMQ · S3"],
      },
    },
    timeline: {
      fr: [
        "setup + import schéma",
        "migrations & modèles",
        "auth admin 2FA + PIN client",
        "paiements Jèko",
        "webhooks + vérification",
        "workers BullMQ",
        "wallet",
        "temps réel",
        "stockage S3",
        "back-office admin",
        "bascule DNS →",
      ],
      en: [
        "setup + schema import",
        "migrations & models",
        "admin 2FA auth + customer PIN",
        "Jèko payments",
        "webhooks + verification",
        "BullMQ workers",
        "wallet",
        "realtime",
        "S3 storage",
        "admin back office",
        "DNS cutover →",
      ],
    },
  },
  {
    id: "apci-bff",
    code: { fr: "dossier_002", en: "case_002" },
    project: "APCI",
    title: {
      fr: "Une API que le navigateur ne voit jamais",
      en: "An API the browser never sees",
    },
    status: { fr: "livré", en: "shipped" },
    stack: ["SvelteKit SSR", "Laravel 13", "PostgreSQL", "Sanctum", "Paraglide", "Pest", "Playwright"],
    context: {
      fr: "Le site de l'Assemblée des Anciens Parlementaires de Côte d'Ivoire combine un site public bilingue, un back-office et un espace privé pour les membres, tous alimentés par une API Laravel séparée.",
      en: "The website of the Assemblée des Anciens Parlementaires de Côte d'Ivoire combines a bilingual public site, a back office and a private members' area, all powered by a separate Laravel API.",
    },
    constraints: {
      fr: [
        "Un espace membre avec des données personnelles à protéger",
        "Une API hébergée à part, qui ne doit pas être exposée au public",
        "Des contenus en français et en anglais, avec une recherche sur tout le site",
      ],
      en: [
        "A members' area with personal data to protect",
        "A separately hosted API that must not be exposed to the public",
        "Content in French and English, with site-wide search",
      ],
    },
    decisions: {
      fr: [
        "Le serveur SvelteKit sert d'intermédiaire : le navigateur ne parle jamais directement à Laravel",
        "Le jeton d'authentification vit dans un cookie httpOnly, invisible au JavaScript",
        "La clé interne et l'URL de l'API ne quittent jamais le serveur",
        "Traductions stockées en jsonb et recherche plein texte PostgreSQL (tsvector, index GIN)",
      ],
      en: [
        "The SvelteKit server acts as the middleman: the browser never talks to Laravel directly",
        "The auth token lives in an httpOnly cookie, invisible to JavaScript",
        "The internal key and the API URL never leave the server",
        "Translations stored as jsonb and PostgreSQL full-text search (tsvector, GIN index)",
      ],
    },
    outcome: {
      fr: [
        "Une seule requête émise par le navigateur : l'autocomplétion, qui vise SvelteKit",
        "207 routes d'API couvertes par 34 fichiers de tests",
        "Journal d'audit de toutes les actions d'administration",
      ],
      en: [
        "Only one request leaves the browser: autocomplete, which targets SvelteKit",
        "207 API routes covered by 34 test files",
        "Audit log of every admin action",
      ],
    },
    before: {
      label: { fr: "spa classique", en: "classic spa" },
      nodes: {
        fr: ["Navigateur", "API publique + jeton dans localStorage", "Base de données"],
        en: ["Browser", "Public API + token in localStorage", "Database"],
      },
    },
    after: {
      label: { fr: "backend for frontend", en: "backend for frontend" },
      nodes: {
        fr: ["Navigateur · cookie httpOnly", "Serveur SvelteKit", "API Laravel · clé interne", "PostgreSQL"],
        en: ["Browser · httpOnly cookie", "SvelteKit server", "Laravel API · internal key", "PostgreSQL"],
      },
    },
  },
  {
    id: "gn-rls",
    code: { fr: "dossier_003", en: "case_003" },
    project: "Les Entreprises G&N",
    title: {
      fr: "La sécurité dans la base, pas dans le front",
      en: "Security in the database, not the front end",
    },
    status: { fr: "en ligne", en: "live" },
    stack: ["SvelteKit", "Supabase", "PostgreSQL", "Row Level Security", "RPC security definer", "Vitest"],
    context: {
      fr: "Boutique en ligne en production pour une marque locale d'Abidjan, sans compte client : on commande depuis le site ou WhatsApp, on paie à la livraison et on suit sa commande par un lien.",
      en: "A production online store for a local Abidjan brand, with no customer accounts: you order from the site or WhatsApp, pay on delivery and track your order through a link.",
    },
    constraints: {
      fr: [
        "Pas de compte client, mais un suivi de commande privé",
        "Le front n'utilise que la clé publique : rien de secret côté navigateur",
        "Un panier construit dans le navigateur, donc modifiable par n'importe qui",
      ],
      en: [
        "No customer accounts, yet private order tracking",
        "The front end only uses the public key: nothing secret in the browser",
        "A cart built in the browser, so anyone can tamper with it",
      ],
    },
    decisions: {
      fr: [
        "Suivi de commande par un lien secret contenant un jeton de 64 caractères",
        "RLS en deux barrières : le visiteur anonyme ne lit que le catalogue publié",
        "Toutes les autres actions passent par des fonctions RPC security definer",
        "Les prix d'une commande sont recalculés en base, le panier du navigateur ne fait pas foi",
      ],
      en: [
        "Order tracking through a secret link holding a 64-character token",
        "RLS as two barriers: anonymous visitors can only read the published catalog",
        "Every other action goes through security definer RPC functions",
        "Order prices are recomputed in the database; the browser cart is never trusted",
      ],
    },
    outcome: {
      fr: [
        "Aucune table de clients ou de commandes ouverte au public",
        "Des migrations qui échouent si une table, une fonction ou un droit manque ou est en trop",
        "Des tests SQL qui vérifient le verrou des commandes, le cumul des paiements et le recalcul des prix",
      ],
      en: [
        "No customer or order table open to the public",
        "Migrations that fail if a table, function or grant is missing or extra",
        "SQL tests that check order locking, payment totals and price recomputation",
      ],
    },
    before: {
      label: { fr: "confiance au client", en: "trust the client" },
      nodes: {
        fr: ["Panier navigateur", "Commande avec prix côté client", "Tables ouvertes"],
        en: ["Browser cart", "Order with client-side prices", "Open tables"],
      },
    },
    after: {
      label: { fr: "confiance à la base", en: "trust the database" },
      nodes: {
        fr: ["Navigateur · clé publique seule", "RPC security definer", "RLS · prix recalculé en SQL", "PostgreSQL"],
        en: ["Browser · public key only", "RPC security definer", "RLS · price recomputed in SQL", "PostgreSQL"],
      },
    },
  },
];

export default MissionDebriefs;
