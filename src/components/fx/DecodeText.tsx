import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/\\[]{}=+*#_";

interface DecodeTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  once?: boolean;
}

const DecodeText = ({ text, className = "", delay = 0, speed = 40, once = true }: DecodeTextProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once });
  const [display, setDisplay] = useState(() => text.replace(/\S/g, " "));
  const started = useRef(false);

  useEffect(() => {
    if (!inView || (once && started.current)) return;
    started.current = true;

    let frame = 0;
    let raf: number;
    let last = 0;
    const settleAt = (i: number) => delay / speed + i * 1.6;

    const tick = (now: number) => {
      if (now - last >= speed) {
        last = now;
        frame++;
        let out = "";
        let done = true;
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (ch === " ") { out += " "; continue; }
          if (frame >= settleAt(i)) {
            out += ch;
          } else {
            done = false;
            out += frame > delay / speed ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : " ";
          }
        }
        setDisplay(out);
        if (done) return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, text, delay, speed, once]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {display}
    </span>
  );
};

export default DecodeText;
