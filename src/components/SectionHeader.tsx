import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import DecodeText from "./fx/DecodeText";

interface SectionHeaderProps {
  label: string;
  title: string;
  titleHighlight: string;
  description?: string;
  index?: string;
  aside?: ReactNode;
}

const SectionHeader = ({ label, title, titleHighlight, description, index = "00", aside }: SectionHeaderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <motion.div ref={ref} className="mb-20 lg:mb-28" style={{ y, opacity }}>
      <div className="flex items-center gap-4 mb-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
          [ {index} // {label} ]
        </span>
        <div className="flex-1 tentacle-line" />
        <span className="font-mono text-[10px]" style={{ color: "var(--fg-faint)" }}>+</span>
      </div>
      <div className="flex items-end justify-between gap-8">
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-semibold leading-[0.95] tracking-tight uppercase">
          <DecodeText text={title} className="block" />
          <span className="block" style={{ color: "transparent", WebkitTextStroke: "1px var(--accent)" }}>
            <DecodeText text={titleHighlight} delay={250} />
          </span>
        </h2>
        {aside && <div className="hidden lg:block flex-shrink-0">{aside}</div>}
      </div>
      {description && (
        <p className="mt-6 text-sm md:text-base max-w-xl leading-relaxed" style={{ color: "var(--fg-muted)" }}>
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
