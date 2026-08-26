import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const BOOT_MS = 1600;
const EXIT_MS = 2200;

const lines: [string, string][] = [
  ["boot gs.dev --env=production", "OK"],
  ["kernel darwin/arm64 · node v20.11", "OK"],
  ["verifying signature 0xGS4A91F", "OK"],
  ["establishing uplink abidjan.ci", "200"],
  ["handshake tls1.3 · aes-256-gcm", "OK"],
  ["resolving dns · edge node lagos", "34ms"],
  ["cdn cache warm · 12 regions", "OK"],
  ["mounting /core/flutter", "OK"],
  ["mounting /core/react", "OK"],
  ["mounting /core/sveltekit", "OK"],
  ["mounting /core/laravel", "OK"],
  ["mounting /core/firebase", "OK"],
  ["mounting /core/postgres", "OK"],
  ["mounting /core/cloud", "OK"],
  ["linking framer-motion runtime", "OK"],
  ["linking tailwind atomic sheet", "OK"],
  ["decrypting clearance_level_5", "OK"],
  ["loading dossiers · 59 archived", "OK"],
  ["indexing 15 technologies", "OK"],
  ["resolving 24 deployment targets", "OK"],
  ["parsing 8 client sectors", "OK"],
  ["fintech · medical · security", "OK"],
  ["ecommerce · social · iot", "OK"],
  ["hydrating project manifest", "OK"],
  ["building category filters", "OK"],
  ["allocating image buffers", "48mb"],
  ["decoding webp atlas", "OK"],
  ["warming shader cache", "OK"],
  ["compiling duotone pipeline", "OK"],
  ["injecting scanlines · grain", "OK"],
  ["calibrating motion engine", "60fps"],
  ["binding scroll observers", "OK"],
  ["mapping cursor field", "OK"],
  ["audio subsystem standby", "MUTED"],
  ["geo lock · 15 countries", "OK"],
  ["integrity check · 6y experience", "PASS"],
  ["security sweep · no anomalies", "CLEAR"],
  ["session token issued", "OK"],
  ["flushing boot log", "OK"],
  ["rendering interface", "OK"],
];

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [exit, setExit] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const el = document.getElementById("loading-screen");
    if (el) el.classList.add("hidden");
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / BOOT_MS);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const t1 = setTimeout(() => setExit(true), BOOT_MS);
    const t2 = setTimeout(() => onComplete(), EXIT_MS);
    return () => { cancelAnimationFrame(raf); clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  const step = (BOOT_MS * 0.8) / 1000 / lines.length;

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex flex-col overflow-hidden"
      style={{ background: "var(--bg)" }}
      animate={exit ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(0,229,255,0.05), transparent 65%)" }} />

      <div className="relative flex items-center justify-between px-4 sm:px-8 py-3 font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.25em] flex-shrink-0" style={{ color: "var(--fg-faint)", borderBottom: "1px solid var(--border-subtle)" }}>
        <span style={{ color: "var(--accent)" }}>gs.dev // secure_boot</span>
        <span className="hidden sm:inline">clearance_level_5</span>
        <span>{String(pct).padStart(3, "0")}%</span>
      </div>

      <div className="relative flex-1 min-h-0 px-4 sm:px-8 py-4 sm:py-6 font-mono text-[8px] sm:text-[10px] leading-[1.65] sm:leading-[1.8]" style={{ color: "var(--fg-faint)" }}>
        <div className="h-full columns-1 sm:columns-2 gap-x-10 content-start">
          {lines.map(([line, status], i) => (
            <motion.div
              key={i}
              className="flex items-baseline justify-between gap-2 break-inside-avoid"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.03 + i * step, duration: 0.18 }}
            >
              <span className="truncate">
                <span className="mr-1.5" style={{ color: "var(--accent)" }}>&gt;</span>
                {line}
              </span>
              <span className="flex-shrink-0" style={{ color: "var(--accent)" }}>[{status}]</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative flex-shrink-0 px-4 sm:px-8 py-3 sm:py-4" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="h-[3px] w-full rounded-full overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
          <div className="h-full transition-[width] duration-100 ease-linear" style={{ width: `${pct}%`, background: "var(--accent)" }} />
        </div>
        <div className="mt-2.5 flex items-center justify-between font-mono text-[8px] sm:text-[10px]" style={{ color: "var(--fg-faint)" }}>
          <span>
            <span style={{ color: "var(--accent)" }}>&gt;</span> welcome
            <span className="animate-blink inline-block w-[6px] h-[10px] ml-1 align-middle" style={{ background: "var(--accent)" }} />
          </span>
          <span className="uppercase tracking-[0.2em]">{lines.length} tasks</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
