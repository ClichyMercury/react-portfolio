import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import DecodeText from "./fx/DecodeText";
import Magnetic from "./fx/Magnetic";

const ROLES = ["FLUTTER ENGINEER", "REACT DEVELOPER", "MOBILE ARCHITECT", "FULL-STACK BUILDER"];

interface HeroSectionProps {
  onCtaClick?: () => void;
}

const HeroSection = ({ onCtaClick = () => {} }: HeroSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, 100]);

  const [roleIndex, setRoleIndex] = useState(0);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const roleTimer = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2600);
    const clockTimer = setInterval(() => {
      setClock(new Date().toLocaleTimeString("fr-FR", { hour12: false }));
    }, 1000);
    return () => { clearInterval(roleTimer); clearInterval(clockTimer); };
  }, []);

  return (
    <section ref={ref} className="relative h-[150vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover duotone-video opacity-60"
        >
          <source src="/images/tentacules.MP4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(5,6,10,0.7), rgba(5,6,10,0.35) 40%, var(--bg))" }} />
        <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(0,229,255,0.06), transparent 60%)" }} />

        {/* HUD frame */}
        <div className="absolute inset-4 md:inset-6 pointer-events-none z-10" style={{ border: "1px solid rgba(0,229,255,0.12)" }}>
          {["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((pos) => (
            <div key={pos} className={`absolute w-5 h-5 ${pos}`} style={{ borderColor: "var(--accent)" }} />
          ))}
        </div>

        {/* Top HUD bar */}
        <motion.div
          className="relative z-20 mx-4 md:mx-6 mt-16 md:mt-[70px] flex items-center justify-between px-4 py-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em]"
          style={{ color: "var(--fg-faint)", borderBottom: "1px solid rgba(0,229,255,0.12)" }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span>sys.gs_dev // v6.0</span>
          <span className="hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#28C840" }} />
            <span style={{ color: "var(--fg-muted)" }}>available for work</span>
          </span>
          <span>abidjan_ci · {clock || "--:--:--"}</span>
        </motion.div>

        {/* Core */}
        <motion.div className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 text-center" style={{ opacity, y }}>
          <motion.div
            className="mb-8 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.4em]"
            style={{ color: "var(--accent)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            [ software developer — 6+ yrs in orbit ]
          </motion.div>

          <h1 className="font-semibold uppercase leading-[0.9] tracking-tight text-[15vw] sm:text-[13vw] lg:text-[10vw]">
            <DecodeText text="GAËL" className="block" delay={600} speed={45} />
            <span className="block" style={{ color: "transparent", WebkitTextStroke: "2px var(--fg)" }}>
              <DecodeText text="SASSAN" delay={1100} speed={45} />
            </span>
          </h1>

          <div className="mt-8 h-6 flex items-center gap-3 font-mono text-[11px] sm:text-sm tracking-[0.3em]" style={{ color: "var(--fg-muted)" }}>
            <span style={{ color: "var(--accent)" }}>&gt;</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                {ROLES[roleIndex]}
              </motion.span>
            </AnimatePresence>
            <span className="animate-blink inline-block w-[8px] h-[14px]" style={{ background: "var(--accent)" }} />
          </div>

          <motion.div
            className="mt-14 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            <Magnetic>
              <button
                onClick={onCtaClick}
                className="px-8 py-3.5 font-mono text-xs uppercase tracking-[0.2em] rounded transition-shadow duration-500 hover:shadow-[0_0_30px_rgba(0,229,255,0.35)]"
                style={{ background: "var(--accent)", color: "var(--bg)" }}
                data-cursor="go"
              >
                explore_work( )
              </button>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-3.5 font-mono text-xs uppercase tracking-[0.2em] rounded transition-colors hover:text-[var(--accent)] hud-corners"
                style={{ border: "1px solid var(--border-medium)", color: "var(--fg-muted)" }}
                data-cursor="go"
              >
                init_contact( )
              </button>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Bottom HUD bar */}
        <motion.div
          className="relative z-20 mx-4 md:mx-6 mb-4 md:mb-6 flex items-center justify-between px-4 py-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em]"
          style={{ color: "var(--fg-faint)", borderTop: "1px solid rgba(0,229,255,0.12)", opacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span>lat 5.36°N — lon 4.01°W</span>
          <motion.span
            className="flex items-center gap-2"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            scroll ↓
          </motion.span>
          <span className="hidden sm:inline">54+ deployments</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
