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
import ParticleBackground from "./ParticleBackground";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import NebulaOrbs from "./NebulaOrbs";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const nav = [
    { id: "hero", label: "Home", num: "01" },
    { id: "bio", label: "About", num: "02" },
    { id: "skills", label: "Skills", num: "03" },
    { id: "projects", label: "Projects", num: "04" },
    { id: "team-projects", label: "Team Work", num: "05" },
    { id: "experience", label: "Experience", num: "06" },
    { id: "contact", label: "Contact", num: "07" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      <CustomCursor />
      <ScrollProgress />
      <ParticleBackground />

      {/* Header */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
          scrolled ? "backdrop-blur-2xl" : ""
        }`}
        style={{
          background: scrolled ? "rgba(10,10,10,0.8)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.button onClick={() => scrollTo("hero")} className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
              <img src="./images/GS-removebg-preview.png" alt="GS" className="h-7 w-7 object-contain logo-themed" />
              <img src="./images/gaelSASSAN-removebg-preview.png" alt="Gael Sassan" className="h-5 w-auto object-contain logo-themed" />
            </motion.button>

            <nav className="hidden lg:flex items-center gap-8">
              {nav.map((i) => (
                <button key={i.id} onClick={() => scrollTo(i.id)}
                  className="text-[12px] font-normal transition-colors duration-300 tracking-wide hover:text-[var(--accent)]"
                  style={{ color: "var(--fg-muted)" }}
                >{i.label}</button>
              ))}
            </nav>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative z-[200] flex items-center gap-2 transition-colors"
              style={{ color: "var(--fg-muted)" }}
            >
              <span className="text-[10px] uppercase tracking-[0.2em] hidden sm:block">
                {menuOpen ? "Close" : "Menu"}
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
            <nav className="flex flex-col items-center gap-1">
              {nav.map((item, i) => (
                <motion.button key={item.id} onClick={() => scrollTo(item.id)}
                  className="group flex items-center gap-6 py-3"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                >
                  <span className="text-[10px] font-mono" style={{ color: "var(--accent)" }}>{item.num}</span>
                  <span
                    className="text-4xl sm:text-5xl lg:text-7xl font-bold transition-all duration-500 tracking-tight hover:text-white"
                    style={{ fontFamily: "'Playfair Display', serif", color: "var(--fg-faint)" }}
                  >{item.label}</span>
                </motion.button>
              ))}
            </nav>
            <motion.div className="absolute bottom-12 flex items-center gap-8"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            >
              {[
                { name: "GitHub", href: "https://github.com/ClichyMercury" },
                { name: "LinkedIn", href: "https://www.linkedin.com/in/gael-yad-eugene-sassan-17a69b1b6/" },
              ].map((l) => (
                <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer"
                  className="text-[11px] uppercase tracking-[0.2em] transition-colors animated-underline"
                  style={{ color: "var(--fg-faint)" }}
                >{l.name}</a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-[1]">
        <section id="hero"><HeroSection onCtaClick={() => scrollTo("bio")} /></section>
        <ProfessionalBio />
        <SkillsSection />
        <ProjectsGrid />
        <TeamProjects />
        <ExperienceSection />
        <ContactSection />
      </main>

      {/* Footer - Laravel style with big logo */}
      <footer className="relative overflow-hidden" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        {/* Big background name image */}
        <div className="relative flex flex-col items-center pt-24 pb-8 px-6">
          {/* Big text name */}
          <h2
            className="text-[80px] sm:text-[120px] lg:text-[200px] font-bold tracking-tighter leading-none text-center select-none pointer-events-none mb-8"
            style={{ fontFamily: "'Playfair Display', serif", color: "var(--fg)", opacity: 0.15 }}
          >
            GAEL SASSAN
          </h2>

          {/* Footer links over the image */}
          <div className="relative z-10 w-full max-w-7xl mx-auto">
            {/* Nav links */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              {["Home", "About", "Skills", "Projects", "Team Work", "Experience", "Contact"].map((l) => (
                <button key={l} onClick={() => scrollTo(l === "Home" ? "hero" : l === "Team Work" ? "team-projects" : l.toLowerCase())}
                  className="text-[11px] uppercase tracking-[0.2em] transition-colors hover:text-[var(--accent)]"
                  style={{ color: "var(--fg-faint)" }}
                >{l}</button>
              ))}
            </div>

            {/* Social row */}
            <div className="flex justify-center gap-6 mb-12">
              {[
                { name: "GitHub", href: "https://github.com/ClichyMercury", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
                { name: "LinkedIn", href: "https://www.linkedin.com/in/gael-yad-eugene-sassan-17a69b1b6/", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
              ].map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="p-3 rounded-full transition-all duration-300 hover:text-[var(--accent)]"
                  style={{ border: "1px solid var(--border-subtle)", color: "var(--fg-faint)" }}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d={s.icon} /></svg>
                </a>
              ))}
            </div>

            {/* Separator */}
            <div className="tentacle-line mb-8" />

            {/* Bottom bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <img src="./images/GS-removebg-preview.png" alt="GS" className="h-5 w-5 object-contain logo-themed opacity-40" />
                <span className="text-[11px] tracking-wider" style={{ color: "var(--fg-faint)" }}>
                  &copy; {new Date().getFullYear()} Gael Sassan. All rights reserved.
                </span>
              </div>
              <span className="text-[11px] italic tracking-wider" style={{ color: "var(--fg-faint)" }}>
                Crafted with precision & mystery
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
  const headingY = useTransform(scrollYProgress, [0, 0.4], [80, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const formY = useTransform(scrollYProgress, [0.1, 0.5], [60, 0]);
  const formOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  return (
    <section ref={ref} id="contact" className="min-h-screen py-40 lg:py-52 px-6 relative flex items-center overflow-hidden">
      <NebulaOrbs variant="purple" />
      <div className="relative z-10 max-w-3xl mx-auto w-full">
        <motion.div className="text-center mb-20" style={{ y: headingY, opacity: headingOpacity }}>
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] block mb-6" style={{ color: "var(--accent)" }}>Get In Touch</span>
          <h2 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.9] mb-8 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="text-white">Let's </span>
            <span style={{ color: "var(--fg-faint)" }}>Connect</span>
          </h2>
          <p className="text-lg max-w-md mx-auto leading-relaxed font-light" style={{ color: "var(--fg-muted)" }}>
            Ready to bring your ideas to life?<br />Let's discuss your next project.
          </p>
        </motion.div>

        <motion.div style={{ y: formY, opacity: formOpacity }}>
          <div className="glass-effect rounded-3xl p-8 lg:p-14 tentacle-glow">
            <form className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                {[{ id: "name", label: "Name", ph: "Your name", type: "text" }, { id: "email", label: "Email", ph: "your@email.com", type: "email" }].map((f) => (
                  <div key={f.id} className="space-y-2">
                    <Label htmlFor={f.id} className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--fg-faint)" }}>{f.label}</Label>
                    <Input id={f.id} type={f.type} placeholder={f.ph}
                      className="bg-transparent border-0 border-b rounded-none h-12 px-0 text-base text-white"
                      style={{ borderColor: "var(--border-medium)" }}
                    />
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--fg-faint)" }}>Subject</Label>
                <Input id="subject" placeholder="Project discussion"
                  className="bg-transparent border-0 border-b rounded-none h-12 px-0 text-base text-white"
                  style={{ borderColor: "var(--border-medium)" }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--fg-faint)" }}>Message</Label>
                <Textarea id="message" placeholder="Tell me about your project..." rows={4}
                  className="bg-transparent border-0 border-b rounded-none px-0 text-base text-white resize-none"
                  style={{ borderColor: "var(--border-medium)" }}
                />
              </div>
              <div className="pt-4">
                <motion.button type="submit"
                  className="w-full py-4 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-500 hover:opacity-90"
                  style={{ background: "var(--accent)", color: "var(--bg)" }}
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                >Send Message</motion.button>
              </div>
            </form>
          </div>
        </motion.div>

        <motion.div className="mt-16 flex justify-center gap-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true }}>
          {[
            { name: "GitHub", href: "https://github.com/ClichyMercury", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
            { name: "LinkedIn", href: "https://www.linkedin.com/in/gael-yad-eugene-sassan-17a69b1b6/", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
          ].map((s) => (
            <motion.a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
              className="group flex items-center gap-3 transition-all duration-300 hover:text-[var(--accent)]"
              style={{ color: "var(--fg-faint)" }}
              whileHover={{ y: -2 }}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.icon} /></svg>
              <span className="text-[11px] tracking-wider">{s.name}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
