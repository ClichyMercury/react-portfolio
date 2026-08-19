import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { beep, isSoundEnabled, setSoundEnabled } from "./sound";

const SoundToggle = () => {
  const [on, setOn] = useState(isSoundEnabled());

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button']")) beep("click");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <motion.button
      onClick={() => {
        const next = !on;
        setOn(next);
        setSoundEnabled(next);
      }}
      className="fixed bottom-[70px] right-5 z-[300] w-11 h-11 flex items-center justify-center panel rounded-lg tentacle-glow"
      style={{ color: on ? "var(--accent)" : "var(--fg-faint)" }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.15 }}
      aria-label={on ? "Mute UI sounds" : "Enable UI sounds"}
      data-cursor={on ? "mute" : "sound"}
    >
      {on ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
    </motion.button>
  );
};

export default SoundToggle;
