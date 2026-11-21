import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerminalSquare, X } from "lucide-react";
import MatrixRain from "./MatrixRain";
import { beep } from "./sound";
import { PROJECT_COUNT } from "../ProjectsGrid";
import { BACKEND_NODES, FRAMEWORKS, INSPECT_EVENT } from "../ServerRoom";
import { useLocale, type Localized } from "@/i18n";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

interface Line {
  type: "cmd" | "out" | "intro";
  text: string;
}

const PROMPT = "gs@portfolio:~$";

const COMMANDS: Localized<Record<string, string[]>> = {
  fr: {
    help: [
      "commandes disponibles :",
      "  whoami       — qui est Gaël Sassan",
      "  stack        — technologies favorites",
      "  projects     — aller aux projets",
      "  backends     — lister mes APIs",
      "  inspect <api>— ouvrir une API dans la salle serveurs",
      "  experience   — aller à l'expérience",
      "  contact      — aller au contact",
      "  socials      — github & linkedin",
      "  email        — adresse directe",
      "  cv           — accès au CV",
      "  matrix       — réveille-toi, neo",
      "  hack         — protocole d'intrusion",
      "  coffee       — en préparer un",
      "  sudo hire-me — essayez",
      "  clear        — effacer le terminal",
      "  exit         — fermer le terminal",
    ],
    whoami: [
      "Gaël SASSAN — Développeur logiciel",
      "6+ ans à concevoir des produits mobiles & web",
      `${PROJECT_COUNT}+ projets livrés d'Abidjan 🇨🇮 au reste du monde`,
      "Actuellement : Lead Front End @ Jèko",
    ],
    stack: [
      "principal : Flutter · Dart · SvelteKit · TypeScript",
      "backend   : Laravel · Node.js · Flask · Firebase · Supabase",
      "aussi     : Kotlin · Swift · Rust · Python · Java",
      "infra     : Docker · AWS · Git · Linux",
    ],
    socials: [
      "github   → https://github.com/ClichyMercury",
      "linkedin → https://www.linkedin.com/in/gael-yad-eugene-sassan-17a69b1b6/",
    ],
    email: ["gaelelscientifico@gmail.com — réponse en moins de 24 h"],
    coffee: ["☕ préparation... terminé. retour à la livraison."],
    "sudo hire-me": ["[sudo] mot de passe pour visiteur : ********", "accès accordé. → défilement vers le contact"],
  },
  en: {
    help: [
      "available commands:",
      "  whoami       — who is Gaël Sassan",
      "  stack        — favorite technologies",
      "  projects     — jump to projects",
      "  backends     — list my APIs",
      "  inspect <api>— open an API in the server room",
      "  experience   — jump to experience",
      "  contact      — jump to contact",
      "  socials      — github & linkedin",
      "  email        — direct address",
      "  cv           — resume access",
      "  matrix       — wake up, neo",
      "  hack         — breach protocol",
      "  coffee       — brew one",
      "  sudo hire-me — try it",
      "  clear        — clear terminal",
      "  exit         — close terminal",
    ],
    whoami: [
      "Gaël SASSAN — Software Developer",
      "6+ years building mobile & web products",
      `${PROJECT_COUNT}+ projects shipped from Abidjan 🇨🇮 to the world`,
      "Currently: Front End Lead @ Jèko",
    ],
    stack: [
      "primary   : Flutter · Dart · SvelteKit · TypeScript",
      "backend   : Laravel · Node.js · Flask · Firebase · Supabase",
      "also      : Kotlin · Swift · Rust · Python · Java",
      "infra     : Docker · AWS · Git · Linux",
    ],
    socials: [
      "github   → https://github.com/ClichyMercury",
      "linkedin → https://www.linkedin.com/in/gael-yad-eugene-sassan-17a69b1b6/",
    ],
    email: ["gaelelscientifico@gmail.com — response time < 24h"],
    coffee: ["☕ brewing... done. back to shipping."],
    "sudo hire-me": ["[sudo] password for visitor: ********", "access granted. → scrolling to contact"],
  },
};

const HACK_STEPS: Localized<string[]> = {
  fr: [
    "initialisation du protocole d'intrusion...",
    "analyse de la cible : visitor.device [OK]",
    "contournement du pare-feu [██████████] 100%",
    "déchiffrement des clés d'accès au mainframe...",
    "ACCÈS ACCORDÉ.",
    "...je plaisante. la seule chose que je pirate, c'est la productivité ☕",
  ],
  en: [
    "initializing breach protocol...",
    "scanning target: visitor.device [OK]",
    "bypassing firewall [██████████] 100%",
    "decrypting mainframe access keys...",
    "ACCESS GRANTED.",
    "...just kidding. the only thing I hack is productivity ☕",
  ],
};

const Terminal = () => {
  const [open, setOpen] = useState(false);
  const [matrix, setMatrix] = useState(false);
  const { pick, route } = useLocale();
  const commands = pick(COMMANDS);
  const [lines, setLines] = useState<Line[]>([{ type: "intro", text: "" }]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const konamiPos = useRef(0);
  const prevOpen = useRef(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "²" || (e.ctrlKey && e.key === "k")) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[konamiPos.current]) {
        konamiPos.current++;
        if (konamiPos.current === KONAMI.length) {
          konamiPos.current = 0;
          beep("success");
          setMatrix(true);
        }
      } else {
        konamiPos.current = key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (prevOpen.current !== open) {
      beep(open ? "open" : "close");
      prevOpen.current = open;
    }
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const next: Line[] = [{ type: "cmd", text: raw }];

    if (!cmd) {
      setLines((l) => [...l, ...next]);
      return;
    }
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    if (cmd === "exit") {
      setOpen(false);
      return;
    }
    if (cmd === "matrix") {
      next.push({ type: "out", text: pick({ fr: "réveille-toi, neo...", en: "wake up, neo..." }) });
      setLines((l) => [...l, ...next]);
      setTimeout(() => {
        beep("alert");
        setOpen(false);
        setMatrix(true);
      }, 700);
      return;
    }
    if (cmd === "hack") {
      setLines((l) => [...l, ...next]);
      const steps = pick(HACK_STEPS);
      steps.forEach((s, i) =>
        setTimeout(() => {
          beep(i === steps.length - 2 ? "success" : "alert");
          setLines((l) => [...l, { type: "out", text: s }]);
        }, 450 * (i + 1))
      );
      return;
    }
    if (cmd === "backends" || cmd === "ls /backends") {
      next.push({ type: "out", text: pick({ fr: `${BACKEND_NODES.length} nœuds en ligne :`, en: `${BACKEND_NODES.length} nodes online:` }) });
      BACKEND_NODES.forEach((n, i) =>
        next.push({
          type: "out",
          text: `  ${String(i + 1).padStart(2, "0")}  ${n.id.padEnd(24)}${FRAMEWORKS[n.framework].label.padEnd(10)}${n.approx ? "~" : " "}${n.endpoints} ep`,
        })
      );
      next.push({ type: "out", text: pick({ fr: "→ tapez `inspect <api>`, ex. `inspect transfertcm`", en: "→ type `inspect <api>`, e.g. `inspect transfertcm`" }) });
      setLines((l) => [...l, ...next]);
      return;
    }
    if (cmd === "inspect" || cmd.startsWith("inspect ")) {
      const query = cmd.slice(7).trim();
      const node = query
        ? BACKEND_NODES.find((n) => n.id === query) ??
          BACKEND_NODES.find((n) => n.id.includes(query) || n.name.toLowerCase().includes(query))
        : undefined;
      if (!node) {
        next.push({ type: "out", text: query
          ? pick({ fr: `aucun nœud ne correspond à "${query}" — essayez \`backends\``, en: `no node matching "${query}" — try \`backends\`` })
          : pick({ fr: "usage : inspect <api> — essayez `backends`", en: "usage: inspect <api> — try `backends`" }) });
        setLines((l) => [...l, ...next]);
        return;
      }
      next.push(
        { type: "out", text: `▣ ${node.name} [${FRAMEWORKS[node.framework].label}]` },
        { type: "out", text: `  endpoints ${node.approx ? "~" : ""}${node.endpoints} · migrations ${node.migrations ?? "—"} · tests ${node.tests}` },
        { type: "out", text: `  stack     ${node.stack.join(" · ")}` },
        { type: "out", text: `  infra     ${node.infra.join(" · ")}` },
        { type: "out", text: pick({ fr: "→ ouverture de l'inspecteur...", en: "→ opening inspector..." }) }
      );
      setLines((l) => [...l, ...next]);
      setTimeout(() => {
        beep("success");
        setOpen(false);
        window.dispatchEvent(new CustomEvent(INSPECT_EVENT, { detail: node.id }));
      }, 1400);
      return;
    }
    if (cmd === "cv" || cmd === "resume") {
      const cvPath = route("cv");
      next.push(
        { type: "out", text: pick({ fr: "compilation du CV à partir des données du portfolio...", en: "compiling resume from live portfolio data..." }) },
        { type: "out", text: pick({ fr: `→ ouverture de ${cvPath}`, en: `→ opening ${cvPath}` }) }
      );
      setLines((l) => [...l, ...next]);
      setTimeout(() => window.location.assign(cvPath), 700);
      return;
    }
    if (cmd === "projects") {
      next.push({ type: "out", text: pick({ fr: "→ saut vers les projets", en: "→ warping to projects" }) });
      setOpen(false);
      scrollToSection("projects");
    } else if (cmd === "experience") {
      next.push({ type: "out", text: pick({ fr: "→ saut vers l'expérience", en: "→ warping to experience" }) });
      setOpen(false);
      scrollToSection("experience");
    } else if (cmd === "contact" || cmd === "sudo hire-me") {
      (commands[cmd] || [pick({ fr: "→ saut vers le contact", en: "→ warping to contact" })]).forEach((t) => next.push({ type: "out", text: t }));
      setOpen(false);
      scrollToSection("contact");
    } else if (commands[cmd]) {
      commands[cmd].forEach((t) => next.push({ type: "out", text: t }));
    } else {
      next.push({ type: "out", text: pick({ fr: `commande introuvable : ${cmd} — essayez \`help\``, en: `command not found: ${cmd} — try \`help\`` }) });
    }
    setLines((l) => [...l, ...next]);
  };

  return (
    <>
      <AnimatePresence>
        {matrix && <MatrixRain onClose={() => setMatrix(false)} />}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-[300] w-11 h-11 flex items-center justify-center panel rounded-lg tentacle-glow"
        style={{ color: "var(--accent)" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        aria-label={pick({ fr: "Ouvrir le terminal", en: "Open terminal" })}
      >
        <TerminalSquare className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[400] flex items-center justify-center p-4 sm:p-8"
            style={{ background: "rgba(5,6,10,0.8)", backdropFilter: "blur(8px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="w-full max-w-2xl panel rounded-xl overflow-hidden hud-corners"
              initial={{ y: 40, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 40, scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-elevated)" }}>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--fg-faint)" }}>
                  gs — terminal
                </span>
                <button onClick={() => setOpen(false)} style={{ color: "var(--fg-faint)" }} aria-label={pick({ fr: "Fermer le terminal", en: "Close terminal" })}>
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div
                ref={bodyRef}
                className="h-[340px] overflow-y-auto px-4 py-3 font-mono text-[12px] leading-[1.9]"
                onClick={() => inputRef.current?.focus()}
              >
                {lines.map((line, i) =>
                  line.type === "cmd" ? (
                    <div key={i}>
                      <span style={{ color: "var(--accent)" }}>{PROMPT}</span>{" "}
                      <span style={{ color: "var(--fg)" }}>{line.text}</span>
                    </div>
                  ) : (
                    <div key={i} style={{ color: "var(--fg-muted)", whiteSpace: "pre-wrap" }}>
                      {line.type === "intro" ? pick({ fr: "GS-OS v6.0 — tapez `help` pour commencer", en: "GS-OS v6.0 — type `help` to begin" }) : line.text}
                    </div>
                  )
                )}
                <div className="flex items-center gap-2">
                  <span style={{ color: "var(--accent)" }}>{PROMPT}</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        beep("success");
                        run(input);
                        setInput("");
                      } else {
                        beep("key");
                      }
                    }}
                    className="flex-1 bg-transparent outline-none border-0"
                    style={{ color: "var(--fg)" }}
                    aria-label={pick({ fr: "Commande du terminal", en: "Terminal command" })}
                    spellCheck={false}
                    autoComplete="off"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Terminal;
