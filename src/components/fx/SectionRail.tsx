import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

type Motif = "leds" | "bars" | "crosshair" | "sweep" | "none";

interface SectionRailProps {
  index: string;
  label: string;
  motif?: Motif;
  bars?: number[];
}

const LEDS = [
  { code: "sys", live: true },
  { code: "net", live: false },
  { code: "i/o", live: false },
  { code: "gpu", live: false },
];

const SectionRail = ({ index, label, motif = "none", bars = [90, 55, 72, 38, 64, 45] }: SectionRailProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const fill = useSpring(useTransform(scrollYProgress, [0.15, 0.85], [0, 1]), {
    stiffness: 90,
    damping: 25,
  });
  const pct = useTransform(fill, (v) => `${String(Math.round(v * 100)).padStart(3, "0")}%`);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="hidden lg:block pointer-events-none absolute top-0 right-0 bottom-0 w-[52px] z-[2]"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center py-16">
        {/* Ruler ticks — always-on dim texture */}
        <div
          className="absolute inset-y-0 right-0 w-4 opacity-[0.28]"
          style={{
            backgroundImage: `
              linear-gradient(to left, var(--fg-faint) 0 5px, transparent 0),
              linear-gradient(to left, var(--fg-faint) 0 12px, transparent 0)
            `,
            backgroundSize: "100% 9px, 100% 45px",
            backgroundRepeat: "repeat-y",
            backgroundPosition: "100% 0",
          }}
        />

        {/* Corner brackets */}
        <span
          className="absolute top-14 right-0 w-3.5 h-3.5"
          style={{ borderTop: "1px solid var(--fg-faint)", borderRight: "1px solid var(--fg-faint)", opacity: 0.5 }}
        />
        <span
          className="absolute bottom-14 right-0 w-3.5 h-3.5"
          style={{ borderBottom: "1px solid var(--fg-faint)", borderRight: "1px solid var(--fg-faint)", opacity: 0.5 }}
        />

        {/* Progress rail — the single live element */}
        <div className="absolute left-[18px] top-24 bottom-24 w-[1px]" style={{ background: "var(--border-medium)" }}>
          <motion.div
            className="absolute inset-x-0 top-0 origin-top"
            style={{
              height: "100%",
              scaleY: fill,
              background: "var(--accent)",
              boxShadow: "0 0 8px rgba(0,229,255,0.5)",
            }}
          />
          <motion.span
            className="absolute -left-[2px] w-[5px] h-[5px]"
            style={{ background: "var(--accent)", top: useTransform(fill, (v) => `calc(${v * 100}% - 2px)`) }}
          />
        </div>

        {/* Vertical section identifier */}
        <div
          className="font-mono text-[10px] uppercase tracking-[0.3em] whitespace-nowrap"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            color: "var(--fg-faint)",
          }}
        >
          sec_{index} <span style={{ color: "var(--border-medium)" }}>//</span> {label}
        </div>

        {/* Live percentage readout */}
        <motion.span
          className="absolute bottom-24 right-6 font-mono text-[9px] tracking-[0.15em]"
          style={{ color: "var(--accent)", opacity: 0.7 }}
        >
          {pct}
        </motion.span>

        {/* Rotating secondary motif */}
        {motif === "leds" && (
          <div className="absolute top-24 right-5 flex flex-col gap-2">
            {LEDS.map((led) => (
              <span
                key={led.code}
                className={`w-[4px] h-[4px] ${led.live ? "motion-safe:animate-pulse" : ""}`}
                style={{
                  background: led.live ? "var(--accent)" : "var(--fg-faint)",
                  opacity: led.live ? 1 : 0.35,
                  boxShadow: led.live ? "0 0 6px rgba(0,229,255,0.7)" : "none",
                }}
              />
            ))}
          </div>
        )}

        {motif === "bars" && (
          <div className="absolute top-24 right-5 flex flex-col items-end gap-[3px] w-6">
            {bars.map((v, i) => (
              <motion.span
                key={i}
                className="h-[2px]"
                style={{ background: "var(--fg-faint)", opacity: 0.5 }}
                initial={{ width: 0 }}
                whileInView={{ width: `${v}%` }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.19, 1, 0.22, 1] }}
                viewport={{ once: true }}
              />
            ))}
          </div>
        )}

        {motif === "crosshair" && (
          <div className="absolute top-28 right-[18px] flex flex-col items-center gap-1">
            <span className="relative block w-3 h-3" style={{ opacity: 0.45 }}>
              <span className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2" style={{ background: "var(--fg-faint)" }} />
              <span className="absolute top-1/2 left-0 right-0 h-[1px] -translate-y-1/2" style={{ background: "var(--fg-faint)" }} />
            </span>
            <span className="font-mono text-[8px] tracking-[0.1em]" style={{ color: "var(--fg-faint)", opacity: 0.6 }}>
              0x{index}A
            </span>
          </div>
        )}

        {motif === "sweep" && (
          <div className="absolute inset-y-24 right-2 w-8 overflow-hidden motion-reduce:hidden">
            <motion.div
              className="absolute inset-x-0 h-16"
              style={{ background: "linear-gradient(to bottom, transparent, var(--accent-glow), transparent)" }}
              animate={{ top: ["-15%", "100%"] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionRail;
