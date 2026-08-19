import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import HeroSection from "./HeroSection";
import ProfessionalBio from "./ProfessionalBio";
import ProjectsGrid from "./ProjectsGrid";
import SkillsSection from "./SkillsSection";
import ExperienceSection from "./ExperienceSection";
import TeamProjects from "./TeamProjects";
import CustomCursor from "./CustomCursor";
import ScrollProgress from "./ScrollProgress";
import Terminal from "./fx/Terminal";
import SoundToggle from "./fx/SoundToggle";
import SectionRail from "./fx/SectionRail";
import Magnetic from "./fx/Magnetic";
import DecodeText from "./fx/DecodeText";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);

      const delta = y - lastY.current;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 140);
        lastY.current = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) setHidden(false);
  }, [menuOpen]);

  useEffect(() => {
    const ids = ["hero", "bio", "skills", "projects", "team-projects", "experience", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const nav = [
    { id: "hero", label: "home", num: "00" },
    { id: "bio", label: "about", num: "01" },
    { id: "skills", label: "skills", num: "02" },
    { id: "projects", label: "projects", num: "03" },
    { id: "team-projects", label: "team_work", num: "04" },
    { id: "experience", label: "experience", num: "05" },
    { id: "contact", label: "contact", num: "06" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      <CustomCursor />
      <ScrollProgress />
      <Terminal />
      <SoundToggle />

      {/* Header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
          scrolled ? "backdrop-blur-xl" : ""
        }`}
        style={{
          background: scrolled ? "rgba(5,6,10,0.85)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
        }}
        initial={{ y: -100 }}
        animate={{ y: hidden ? "-110%" : 0 }}
        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3.5">
          <div className="flex justify-between items-center">
            <Magnetic strength={0.25}>
              <button onClick={() => scrollTo("hero")} className="flex items-center gap-2.5">
                <img src="./images/GS-removebg-preview.png" alt="GS" className="h-7 w-7 object-contain logo-themed" />
                <span className="font-mono text-[11px] tracking-[0.15em]" style={{ color: "var(--fg-muted)" }}>
                  gs<span style={{ color: "var(--accent)" }}>.</span>dev
                </span>
              </button>
            </Magnetic>

            <nav className="hidden lg:flex items-center gap-7">
              {nav.slice(1).map((i) => (
                <button key={i.id} onClick={() => scrollTo(i.id)}
                  className="relative font-mono text-[10px] uppercase tracking-[0.15em] transition-colors duration-300 hover:text-[var(--accent)]"
                  style={{ color: activeSection === i.id ? "var(--accent)" : "var(--fg-muted)" }}
                >
                  <span style={{ color: activeSection === i.id ? "var(--accent)" : "var(--fg-faint)" }}>{i.num}.</span>{i.label}
                  {activeSection === i.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1.5 left-0 right-0 h-[1px]"
                      style={{ background: "var(--accent)", boxShadow: "0 0 8px rgba(0,229,255,0.6)" }}
                    />
                  )}
                </button>
              ))}
            </nav>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative z-[200] flex lg:hidden items-center gap-2 transition-colors"
              style={{ color: "var(--fg-muted)" }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] hidden sm:block">
                {menuOpen ? "close" : "menu"}
              </span>
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[150] flex items-center justify-center"
            style={{ background: "var(--bg)" }}
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          >
            <nav className="flex flex-col items-start gap-1 px-8">
              {nav.map((item, i) => (
                <motion.button key={item.id} onClick={() => scrollTo(item.id)}
                  className="group flex items-baseline gap-5 py-2.5"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                >
                  <span className="font-mono text-[10px]" style={{ color: "var(--accent)" }}>{item.num}</span>
                  <span
                    className="font-mono text-3xl sm:text-5xl uppercase tracking-tight transition-all duration-300 group-hover:text-[var(--accent)] group-hover:translate-x-2"
                    style={{ color: "var(--fg-muted)" }}
                  >{item.label}</span>
                </motion.button>
              ))}
            </nav>
            <motion.div className="absolute bottom-12 flex items-center gap-8"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            >
              {[
                { name: "github", href: "https://github.com/ClichyMercury" },
                { name: "linkedin", href: "https://www.linkedin.com/in/gael-yad-eugene-sassan-17a69b1b6/" },
              ].map((l) => (
                <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-[11px] uppercase tracking-[0.2em] transition-colors animated-underline"
                  style={{ color: "var(--fg-faint)" }}
                >{l.name}</a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-[1]">
        <section id="hero"><HeroSection onCtaClick={() => scrollTo("projects")} /></section>
        <ProfessionalBio />
        <SkillsSection />
        <ProjectsGrid />
        <TeamProjects />
        <ExperienceSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="relative overflow-hidden" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="relative flex flex-col items-center pt-20 pb-8 px-6">
          <h2 className="font-semibold uppercase tracking-tight leading-none text-center select-none pointer-events-none mb-10 text-[70px] sm:text-[110px] lg:text-[180px]"
            style={{ color: "transparent", WebkitTextStroke: "1px var(--border-medium)" }}
          >
            SASSAN
          </h2>

          <div className="relative z-10 w-full max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {nav.map((l) => (
                <button key={l.id} onClick={() => scrollTo(l.id)}
                  className="font-mono text-[10px] uppercase tracking-[0.2em] transition-colors hover:text-[var(--accent)]"
                  style={{ color: "var(--fg-faint)" }}
                >{l.label}</button>
              ))}
            </div>

            <div className="flex justify-center gap-4 mb-10">
              {[
                { name: "GitHub", href: "https://github.com/ClichyMercury", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
                { name: "LinkedIn", href: "https://www.linkedin.com/in/gael-yad-eugene-sassan-17a69b1b6/", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
              ].map((s) => (
                <Magnetic key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer"
                    className="flex p-3 rounded-lg transition-all duration-300 hover:text-[var(--accent)] hud-corners"
                    style={{ border: "1px solid var(--border-subtle)", color: "var(--fg-faint)" }}
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.icon} /></svg>
                  </a>
                </Magnetic>
              ))}
            </div>

            <div className="tentacle-line mb-6" />

            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 font-mono text-[10px] tracking-wider" style={{ color: "var(--fg-faint)" }}>
              <div className="flex items-center gap-3">
                <img src="./images/GS-removebg-preview.png" alt="GS" className="h-4 w-4 object-contain logo-themed opacity-40" />
                <span>© {new Date().getFullYear()} gael_sassan — all rights reserved</span>
              </div>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#28C840" }} />
                system operational — built with react + caffeine
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* Contact */
const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const headingY = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const formY = useTransform(scrollYProgress, [0.1, 0.5], [40, 0]);
  const formOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  return (
    <section ref={ref} id="contact" className="min-h-screen py-32 lg:py-44 px-6 relative flex items-center">
      <SectionRail index="06" label="transmission" motif="sweep" />
      <div className="relative z-10 max-w-3xl mx-auto w-full">
        <motion.div className="mb-16" style={{ y: headingY, opacity: headingOpacity }}>
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
              [ 06 // transmission ]
            </span>
            <div className="flex-1 tentacle-line" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-semibold leading-[0.95] tracking-tight uppercase">
            <DecodeText text="Open" className="block" />
            <span className="block" style={{ color: "transparent", WebkitTextStroke: "1px var(--accent)" }}>
              <DecodeText text="Channel" delay={250} />
            </span>
          </h2>
          <p className="mt-6 text-sm md:text-base max-w-md leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            Ready to bring your ideas to life? Send a transmission — response time &lt; 24h.
          </p>
        </motion.div>

        <motion.div style={{ y: formY, opacity: formOpacity }}>
          <div className="panel rounded-2xl overflow-hidden hud-corners tentacle-glow">
            <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-elevated)" }}>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--accent)" }}>
                comm_channels — 3 active
              </span>
              <span className="flex items-center gap-2 font-mono text-[10px]" style={{ color: "var(--fg-faint)" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#28C840" }} />
                signal strong
              </span>
            </div>
            <div className="p-4 sm:p-6 grid sm:grid-cols-3 gap-3">
              {[
                {
                  label: "email",
                  value: "gaelelscientifico@gmail.com",
                  action: "compose( )",
                  href: "mailto:gaelelscientifico@gmail.com?subject=Project%20discussion",
                  icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm18 2l-10 7L2 6",
                },
                {
                  label: "linkedin",
                  value: "gael-yad-eugene-sassan",
                  action: "connect( )",
                  href: "https://www.linkedin.com/in/gael-yad-eugene-sassan-17a69b1b6/",
                  icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z",
                },
                {
                  label: "github",
                  value: "ClichyMercury",
                  action: "inspect( )",
                  href: "https://github.com/ClichyMercury",
                  icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22",
                },
              ].map((ch, i) => (
                <motion.a
                  key={ch.label}
                  href={ch.href}
                  target={ch.label === "email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group relative flex flex-col gap-3 p-5 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.12)] hud-corners"
                  style={{ background: "var(--bg)", border: "1px solid var(--border-subtle)" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  data-cursor="open"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em]" style={{ color: "var(--fg-faint)" }}>
                      ch_{String(i + 1).padStart(2, "0")} // {ch.label}
                    </span>
                    <svg className="h-4 w-4 transition-colors duration-300 group-hover:text-[var(--accent)]" style={{ color: "var(--fg-faint)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={ch.icon} />
                    </svg>
                  </div>
                  <span className="font-mono text-[11px] break-all" style={{ color: "var(--fg)" }}>{ch.value}</span>
                  <span className="mt-auto font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 group-hover:text-[var(--accent)]" style={{ color: "var(--fg-muted)" }}>
                    {ch.action} →
                  </span>
                </motion.a>
              ))}
            </div>
            <div className="px-5 py-3 font-mono text-[10px]" style={{ borderTop: "1px solid var(--border-subtle)", color: "var(--fg-faint)" }}>
              <span style={{ color: "var(--accent)" }}>$</span> avg_response_time: &lt; 24h · timezone: GMT (Abidjan)
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
