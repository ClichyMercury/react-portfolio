import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const el = document.getElementById("loading-screen");
    if (el) el.classList.add("hidden");
    const t1 = setTimeout(() => setExit(true), 1600);
    const t2 = setTimeout(() => onComplete(), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  const lines = [
    "> boot gs.dev --env=production",
    "> mounting modules: flutter react cloud",
    "> rendering interface...",
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex items-center justify-center"
      style={{ background: "var(--bg)" }}
      animate={exit ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className="font-mono text-xs leading-loose" style={{ color: "var(--fg-faint)" }}>
        {lines.map((line, i) => (
          <motion.div key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 + i * 0.4 }}
          >
            {line} <span style={{ color: "var(--accent)" }}>[OK]</span>
          </motion.div>
        ))}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
          <span style={{ color: "var(--accent)" }}>&gt;</span> welcome
          <span className="animate-blink inline-block w-[7px] h-[13px] ml-1 align-middle" style={{ background: "var(--accent)" }} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
