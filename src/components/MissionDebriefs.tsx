import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "./SectionHeader";
import SectionRail from "./fx/SectionRail";

interface Flow {
  label: string;
  nodes: string[];
}

interface Debrief {
  id: string;
  code: string;
  project: string;
  title: string;
  status: string;
  ongoing?: boolean;
  stack: string[];
  context: string;
  constraints: string[];
  decisions: string[];
  outcome: string[];
  before: Flow;
  after: Flow;
  timeline?: string[];
}

const BLOCKS: { key: "constraints" | "decisions" | "outcome"; label: string }[] = [
  { key: "constraints", label: "constraints" },
  { key: "decisions", label: "decisions" },
  { key: "outcome", label: "outcome" },
];

const MissionDebriefs = ({ debriefs = defaultDebriefs }: { debriefs?: Debrief[] }) => {
  const [activeId, setActiveId] = useState(debriefs[0].id);
  const active = debriefs.find((d) => d.id === activeId) ?? debriefs[0];

  return (
    <section id="debriefs" className="min-h-screen py-32 lg:py-44 px-6 relative">
      <SectionRail index="06" label="debriefs" motif="crosshair" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader
          index="06"
          label="debriefs"
          title="Mission"
          titleHighlight="Debriefs"
          description="How I think, not just what I ship: the problem, the constraints, the decisions and what came out of them."
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
                <span className="block font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: isActive ? "var(--accent)" : "var(--fg-faint)" }}>{d.code}</span>
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
                  <h3 className="text-2xl sm:text-3xl font-semibold leading-tight mb-3">{active.title}</h3>
                  <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>{active.context}</p>
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
                  {active.status}
                </motion.span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[active.before, active.after].map((flow, fi) => (
                  <div key={flow.label} className="rounded-lg p-4" style={{ background: "var(--bg)", border: `1px solid ${fi === 1 ? "var(--accent)" : "var(--border-subtle)"}` }}>
                    <span className="block mb-3 font-mono text-[9px] uppercase tracking-[0.25em]" style={{ color: fi === 1 ? "var(--accent)" : "var(--fg-faint)" }}>
                      {fi === 0 ? "// before" : "// after"} — {flow.label}
                    </span>
                    <div className="flex flex-col items-stretch gap-1">
                      {flow.nodes.map((n, ni) => (
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
                      {String(bi + 1).padStart(2, "0")} // {b.label}
                      <span className="flex-1 tentacle-line" />
                    </span>
                    <ul className="space-y-2">
                      {active[b.key].map((item, i) => (
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

              {active.timeline && (
                <div className="mb-8">
                  <span className="block mb-3 font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--fg-faint)" }}>// commit timeline</span>
                  <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "thin" }}>
                    {active.timeline.map((t, i) => (
                      <motion.span
                        key={t}
                        className="flex-shrink-0 px-2.5 py-1.5 rounded font-mono text-[10px] whitespace-nowrap"
                        style={{
                          background: "var(--bg)",
                          border: `1px solid ${i === active.timeline!.length - 1 && active.ongoing ? "#FEBC2E" : "var(--border-subtle)"}`,
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
    code: "case_001",
    project: "TransfertCI",
    title: "Sortir de Supabase sans couper le service",
    status: "in progress",
    ongoing: true,
    stack: ["AdonisJS", "PostgreSQL 16", "Redis", "BullMQ", "Socket.io", "S3 / MinIO", "Nginx", "Japa"],
    context:
      "TransfertCI, plateforme de transfert mobile money en Côte d'Ivoire, tournait entièrement sur Supabase : Postgres managé, 67 Edge Functions, Realtime et Storage. J'ai conçu et mène la migration vers un backend AdonisJS auto-hébergé.",
    constraints: [
      "Une facture qui grimpe avec 67 Edge Functions, le temps réel et le stockage",
      "Dépendance forte au fournisseur : fonctions Deno, auth et temps réel propriétaires",
      "Cold starts et latence ressentis depuis la Côte d'Ivoire",
      "Le front React et les apps mobiles Capacitor ne devaient pas être réécrits",
    ],
    decisions: [
      "Strangler pattern : Nginx envoie /v1 vers AdonisJS et le reste vers Supabase, route par route",
      "Import du schéma existant puis scripts d'introspection qui génèrent migrations, modèles et relations",
      "Workers BullMQ pour les tâches de fond, Socket.io pour la signalisation WebRTC déjà en place",
      "Paiements derrière un pattern de providers, avec retry, circuit breaker et verrouillage",
    ],
    outcome: [
      "135 tables et 145 clés étrangères importées sans aucune erreur",
      "137 migrations, 135 modèles et 257 relations générés automatiquement",
      "Flux de paiement Jèko complet couvert par 60 tests verts",
      "Wallet, temps réel, stockage et back-office admin migrés ; la bascule finale reste à faire",
    ],
    before: { label: "supabase", nodes: ["React + Capacitor", "67 Edge Functions (Deno)", "Realtime · Storage", "Postgres managé"] },
    after: { label: "self-hosted", nodes: ["React + Capacitor", "Nginx · strangler routing", "AdonisJS API /v1 · Socket.io", "PostgreSQL · Redis/BullMQ · S3"] },
    timeline: [
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
  },
  {
    id: "apci-bff",
    code: "case_002",
    project: "APCI",
    title: "Une API que le navigateur ne voit jamais",
    status: "shipped",
    stack: ["SvelteKit SSR", "Laravel 13", "PostgreSQL", "Sanctum", "Paraglide", "Pest", "Playwright"],
    context:
      "Le site de l'Assemblée des Anciens Parlementaires de Côte d'Ivoire combine un site public bilingue, un back-office et un espace privé pour les membres, tous alimentés par une API Laravel séparée.",
    constraints: [
      "Un espace membre avec des données personnelles à protéger",
      "Une API hébergée à part, qui ne doit pas être exposée au public",
      "Des contenus en français et en anglais, avec une recherche sur tout le site",
    ],
    decisions: [
      "Le serveur SvelteKit sert d'intermédiaire : le navigateur ne parle jamais directement à Laravel",
      "Le jeton d'authentification vit dans un cookie httpOnly, invisible au JavaScript",
      "La clé interne et l'URL de l'API ne quittent jamais le serveur",
      "Traductions stockées en jsonb et recherche plein texte PostgreSQL (tsvector, index GIN)",
    ],
    outcome: [
      "Une seule requête émise par le navigateur : l'autocomplétion, qui vise SvelteKit",
      "207 routes d'API couvertes par 34 fichiers de tests",
      "Journal d'audit de toutes les actions d'administration",
    ],
    before: { label: "classic spa", nodes: ["Browser", "Public API + token in localStorage", "Database"] },
    after: { label: "backend for frontend", nodes: ["Browser · httpOnly cookie", "SvelteKit server", "Laravel API · internal key", "PostgreSQL"] },
  },
  {
    id: "gn-rls",
    code: "case_003",
    project: "Les Entreprises G&N",
    title: "La sécurité dans la base, pas dans le front",
    status: "live",
    stack: ["SvelteKit", "Supabase", "PostgreSQL", "Row Level Security", "RPC security definer", "Vitest"],
    context:
      "Boutique en ligne en production pour une marque locale d'Abidjan, sans compte client : on commande depuis le site ou WhatsApp, on paie à la livraison et on suit sa commande par un lien.",
    constraints: [
      "Pas de compte client, mais un suivi de commande privé",
      "Le front n'utilise que la clé publique : rien de secret côté navigateur",
      "Un panier construit dans le navigateur, donc modifiable par n'importe qui",
    ],
    decisions: [
      "Suivi de commande par un lien secret contenant un jeton de 64 caractères",
      "RLS en deux barrières : le visiteur anonyme ne lit que le catalogue publié",
      "Toutes les autres actions passent par des fonctions RPC security definer",
      "Les prix d'une commande sont recalculés en base, le panier du navigateur ne fait pas foi",
    ],
    outcome: [
      "Aucune table de clients ou de commandes ouverte au public",
      "Des migrations qui échouent si une table, une fonction ou un droit manque ou est en trop",
      "Des tests SQL qui vérifient le verrou des commandes, le cumul des paiements et le recalcul des prix",
    ],
    before: { label: "trust the client", nodes: ["Browser cart", "Order with client-side prices", "Open tables"] },
    after: { label: "trust the database", nodes: ["Browser · public key only", "RPC security definer", "RLS · price recomputed in SQL", "PostgreSQL"] },
  },
];

export default MissionDebriefs;
