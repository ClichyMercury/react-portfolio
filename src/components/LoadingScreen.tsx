import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const el = document.getElementById("loading-screen");
    if (el) el.classList.add("hidden");
    const t1 = setTimeout(() => setExit(true), 1800);
    const t2 = setTimeout(() => onComplete(), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{ background: "var(--bg)" }}
      animate={exit ? { opacity: 0, scale: 1.1 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
    >
      <motion.img src="/images/GS-removebg-preview.png" alt="GS"
        className="w-24 h-24 object-contain logo-themed"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.div className="mt-8 flex gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        {"LOADING".split("").map((c, i) => (
          <motion.span key={i} className="text-[10px] tracking-[0.3em] font-light"
            style={{ color: "var(--fg-faint)" }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.08 }}
          >{c}</motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
