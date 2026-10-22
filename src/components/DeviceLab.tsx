import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LabApp {
  id: string;
  title: string;
  imageUrl: string;
  technologies: string[];
  category: string;
}

const AUTOPLAY_MS = 4500;

const platformsFor = (technologies: string[]) => {
  const t = technologies.map((x) => x.toLowerCase());
  if (t.some((x) => x.includes("flutter"))) return ["iOS", "Android"];
  if (t.some((x) => x.includes("kotlin") || x.includes("jetpack"))) return ["Android"];
  if (t.some((x) => x.includes("swift"))) return ["iOS"];
  return ["Mobile"];
};

const Screen = ({ app, size }: { app: LabApp; size: "main" | "side" }) => (
  <img
    src={app.imageUrl}
    alt={app.title}
    loading="lazy"
    decoding="async"
    draggable={false}
    className={`block w-auto max-w-full rounded-xl object-contain ${size === "main" ? "h-[380px] sm:h-[460px]" : "h-[260px] sm:h-[300px]"}`}
    style={{
      border: "1px solid var(--border-medium)",
      boxShadow: size === "main" ? "0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(0,229,255,0.12)" : "0 20px 50px rgba(0,0,0,0.5)",
    }}
  />
);

const DeviceLab = ({ apps, onSelect }: { apps: LabApp[]; onSelect: (id: string) => void }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = apps.length;

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  useEffect(() => {
    if (paused || count < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, count]);

  if (!count) return null;

  const active = apps[index];
  const prev = apps[(index - 1 + count) % count];
  const next = apps[(index + 1) % count];

  return (
    <div className="relative mb-24" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="flex items-center gap-3 mb-6 font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--fg-faint)" }}>
        <span style={{ color: "var(--accent)" }}>▣</span> device_lab // mobile_builds
        <div className="flex-1 tentacle-line" />
        <span style={{ color: "var(--accent)" }}>{count} apps on test bench</span>
      </div>

      <div className="panel rounded-xl overflow-hidden hud-corners">
        <div className="grid lg:grid-cols-5">
          <div className="lg:col-span-3 relative flex items-center justify-center gap-4 sm:gap-8 py-10 px-4 overflow-hidden" style={{ background: "radial-gradient(ellipse at center, rgba(0,229,255,0.06), transparent 70%)" }}>
            <button onClick={() => go(-1)} className="hidden sm:block opacity-40 hover:opacity-80 transition-opacity" style={{ transform: "perspective(900px) rotateY(18deg)" }} aria-label="Previous app">
              <Screen app={prev} size="side" />
            </button>

            <motion.button
              onClick={() => onSelect(active.id)}
              className="relative z-10"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
              }}
              data-cursor="open"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                >
                  <Screen app={active} size="main" />
                </motion.div>
              </AnimatePresence>
            </motion.button>

            <button onClick={() => go(1)} className="hidden sm:block opacity-40 hover:opacity-80 transition-opacity" style={{ transform: "perspective(900px) rotateY(-18deg)" }} aria-label="Next app">
              <Screen app={next} size="side" />
            </button>
          </div>

          <div className="lg:col-span-2 flex flex-col p-5 sm:p-6" style={{ borderLeft: "1px solid var(--border-subtle)", background: "var(--bg-elevated)" }}>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] mb-4" style={{ color: "var(--accent)" }}>
              build_{String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>

            <AnimatePresence mode="wait">
              <motion.div key={active.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.3 }}>
                <h3 className="text-xl sm:text-2xl font-medium leading-tight mb-3">{active.title}</h3>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {platformsFor(active.technologies).map((p) => (
                    <span key={p} className="px-2 py-1 rounded font-mono text-[9px] uppercase tracking-[0.15em]" style={{ border: "1px solid var(--accent)", color: "var(--accent)" }}>{p}</span>
                  ))}
                  <span className="px-2 py-1 rounded font-mono text-[9px] uppercase tracking-[0.15em]" style={{ border: "1px solid var(--border-medium)", color: "var(--fg-muted)" }}>{active.category}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {active.technologies.slice(0, 6).map((t) => (
                    <span key={t} className="px-2 py-1 rounded font-mono text-[10px]" style={{ background: "var(--bg)", color: "var(--fg-muted)" }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-auto">
              <div className="h-px mb-4 overflow-hidden" style={{ background: "var(--border-subtle)" }}>
                {!paused && (
                  <motion.div
                    key={`${active.id}-progress`}
                    className="h-full"
                    style={{ background: "var(--accent)" }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                  />
                )}
              </div>
              <div className="flex items-center justify-between gap-3">
                <button onClick={() => onSelect(active.id)} className="font-mono text-[10px] uppercase tracking-[0.2em] transition-colors hover:text-[var(--accent)]" style={{ color: "var(--fg-muted)" }}>
                  open case file →
                </button>
                <div className="flex items-center gap-2">
                  <button onClick={() => go(-1)} className="p-2 rounded transition-colors hover:text-[var(--accent)]" style={{ border: "1px solid var(--border-medium)", color: "var(--fg-muted)" }} aria-label="Previous app">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button onClick={() => go(1)} className="p-2 rounded transition-colors hover:text-[var(--accent)]" style={{ border: "1px solid var(--border-medium)", color: "var(--fg-muted)" }} aria-label="Next app">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceLab;
