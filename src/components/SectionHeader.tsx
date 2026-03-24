import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  titleHighlight: string;
  description?: string;
}

const SectionHeader = ({ label, title, titleHighlight, description }: SectionHeaderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <motion.div ref={ref} className="text-center mb-24" style={{ y, opacity }}>
      <span className="text-[11px] font-medium uppercase tracking-[0.3em] block mb-6" style={{ color: "var(--accent)" }}>
        {label}
      </span>
      <h2 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.9] mb-8 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
        <span className="text-white">{title} </span>
        <span style={{ color: "var(--fg-faint)" }}>{titleHighlight}</span>
      </h2>
      {description && (
        <p className="text-lg max-w-xl mx-auto leading-relaxed font-light" style={{ color: "var(--fg-muted)" }}>
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
