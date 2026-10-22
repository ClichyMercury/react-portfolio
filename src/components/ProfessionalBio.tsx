import { motion } from "framer-motion";
import { Award, User, Heart } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Counter from "./fx/Counter";
import SectionRail from "./fx/SectionRail";
import { PROJECT_COUNT } from "./ProjectsGrid";

const ProfessionalBio = () => {
  const bio = "Passionate about software development for over 6 years, I specialize in creating innovative mobile applications and high-performance web solutions. My expertise covers the entire development lifecycle, from design to production, with a particular focus on user experience and modern technologies.";

  const dataSheet = [
    { key: "name", value: "GAËL SASSAN" },
    { key: "role", value: "Front End Lead @ Jèko" },
    { key: "base", value: "Abidjan, Côte d'Ivoire" },
    { key: "exp", value: "6+ years" },
    { key: "focus", value: "Flutter · SvelteKit · Cloud" },
    { key: "status", value: "● available", accent: true },
  ];

  const highlights = [
    "6+ years of experience in mobile and web development",
    "Expertise in Flutter, SvelteKit, and cloud technologies",
    `${PROJECT_COUNT}+ successfully delivered projects`,
    "User-centered approach focused on performance",
  ];

  return (
    <section id="bio" className="min-h-screen py-32 lg:py-44 px-6 relative">
      <SectionRail index="01" label="identity" motif="leds" />
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <SectionHeader
          index="01"
          label="identity"
          title="Who"
          titleHighlight="Am I?"
          aside={
            <motion.div
              className="relative pb-3"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
              viewport={{ once: true }}
            >
              <span className="absolute -top-4 right-0 font-mono text-[9px] uppercase tracking-[0.25em]" style={{ color: "var(--fg-faint)" }}>
                // signature
              </span>
              <img
                src="./images/gaelSASSAN-removebg-preview.png"
                alt="Gaël Sassan"
                className="h-12 xl:h-14 w-auto object-contain logo-themed opacity-80"
              />
              <motion.div
                className="absolute -bottom-1 left-0 h-[1px] origin-left"
                style={{ background: "var(--accent)", width: "100%", boxShadow: "0 0 8px rgba(0,229,255,0.5)" }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1.1, ease: [0.19, 1, 0.22, 1] }}
                viewport={{ once: true }}
              />
            </motion.div>
          }
        />

        <div className="grid lg:grid-cols-5 gap-6 mb-20">
          <motion.div
            className="lg:col-span-2 panel rounded-xl p-6 lg:p-8 hud-corners"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--accent)" }}>// id_card</span>
              <img src="./images/GS-removebg-preview.png" alt="GS" className="h-8 w-8 object-contain logo-themed opacity-70" />
            </div>
            <div className="space-y-0">
              {dataSheet.map((row, i) => (
                <motion.div
                  key={row.key}
                  className="flex items-baseline justify-between gap-3 py-3 font-mono text-[11px] sm:text-xs min-w-0"
                  style={{ borderBottom: i < dataSheet.length - 1 ? "1px solid var(--border-subtle)" : "none" }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                >
                  <span className="uppercase tracking-[0.15em] flex-shrink-0" style={{ color: "var(--fg-faint)" }}>{row.key}</span>
                  <span className="text-right min-w-0 break-words" style={{ color: row.accent ? "#28C840" : "var(--fg)" }}>{row.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-3 flex flex-col justify-between gap-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            viewport={{ once: true }}
          >
            <p className="text-lg lg:text-xl leading-relaxed font-light" style={{ color: "var(--fg-muted)" }}>
              {bio}
            </p>

            <div>
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4 py-3.5"
                  style={{ borderBottom: "1px solid var(--border-subtle)" }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="font-mono text-[10px]" style={{ color: "var(--accent)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-sm lg:text-base font-light" style={{ color: "var(--fg-muted)" }}>{h}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {[
                { value: 6, suffix: "+", label: "Years" },
                { value: PROJECT_COUNT, suffix: "+", label: "Projects" },
                { value: 100, suffix: "%", label: "Satisfaction" },
              ].map((s) => (
                <div key={s.label} className="panel rounded-xl p-3 sm:p-5 text-center tentacle-glow min-w-0">
                  <Counter value={s.value} suffix={s.suffix} className="block text-2xl sm:text-3xl lg:text-5xl font-semibold mb-1" />
                  <span className="block font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.1em] sm:tracking-[0.25em] truncate" style={{ color: "var(--fg-faint)" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {[
            { icon: <Award className="h-4 w-4" />, title: "Technical Excellence", desc: "Clean code, scalable architectures and best practices." },
            { icon: <User className="h-4 w-4" />, title: "Collaborative Approach", desc: "Transparent communication and teamwork for optimal results." },
            { icon: <Heart className="h-4 w-4" />, title: "Passion & Innovation", desc: "Constant technology watch and creative solutions." },
          ].map((v, i) => (
            <motion.div
              key={i}
              className="panel p-6 rounded-xl tentacle-glow group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded transition-colors duration-500 group-hover:text-[var(--accent)]" style={{ border: "1px solid var(--border-medium)", color: "var(--fg-faint)" }}>
                  {v.icon}
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--fg-faint)" }}>module_{i + 1}</span>
              </div>
              <h5 className="text-base font-medium mb-2">{v.title}</h5>
              <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalBio;
