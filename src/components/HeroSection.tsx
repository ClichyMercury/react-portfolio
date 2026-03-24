import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedText from "./AnimatedText";

interface HeroSectionProps {
  onCtaClick?: () => void;
}

const HeroSection = ({ onCtaClick = () => {} }: HeroSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 120]);

  return (
    <section ref={ref} className="relative h-[180vh]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.4)" }}
        >
          <source src="/images/tentacules.MP4" type="video/mp4" />
        </video>

        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />
        {/* Side vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)]" />

        <motion.div className="relative z-10 container max-w-6xl mx-auto px-6" style={{ opacity, scale, y }}>
          <div className="flex flex-col items-center text-center">
            {/* Logo */}
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            >
              <img src="./images/GS-removebg-preview.png" alt="GS" className="w-28 h-28 object-contain logo-themed opacity-90" />
            </motion.div>

            {/* Label */}
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="w-12 h-[1px]" style={{ background: "var(--accent)" }} />
              <span className="text-[11px] font-medium uppercase tracking-[0.4em]" style={{ color: "var(--accent)" }}>
                Software Developer
              </span>
              <div className="w-12 h-[1px]" style={{ background: "var(--accent)" }} />
            </motion.div>

            {/* Name */}
            <h1
              className="text-7xl sm:text-8xl lg:text-[150px] xl:text-[180px] font-bold leading-[0.85] mb-8 tracking-tighter"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <AnimatedText text="GAËL" className="block text-white" delay={0.4} staggerSpeed={0.06} />
              <AnimatedText text="SASSAN" className="block" delay={0.7} staggerSpeed={0.06} />
            </h1>

            {/* Tagline */}
            <motion.p
              className="text-base lg:text-xl max-w-md leading-relaxed font-light mb-16"
              style={{ color: "var(--fg-muted)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Crafting digital experiences that merge
              <br />
              innovation with elegance.
            </motion.p>

            {/* CTA */}
            <motion.button
              onClick={onCtaClick}
              className="group px-10 py-4 rounded-full text-sm font-semibold tracking-wider uppercase hover:scale-105 transition-all duration-500"
              style={{ background: "var(--accent)", color: "var(--bg)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore my work
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2" style={{ opacity }}>
          <motion.div
            className="flex flex-col items-center gap-3"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <rect x="1" y="1" width="14" height="22" rx="7" stroke="var(--fg-faint)" strokeWidth="1.5"/>
              <motion.circle cx="8" cy="8" r="2" fill="var(--accent)"
                animate={{ cy: [8, 16, 8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
