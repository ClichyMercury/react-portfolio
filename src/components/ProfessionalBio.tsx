import { motion } from "framer-motion";
import { Award, User, Heart } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Counter from "./fx/Counter";
import SectionRail from "./fx/SectionRail";
import { PROJECT_COUNT } from "./ProjectsGrid";
import { useLocale, type Localized } from "@/i18n";

export const PROFILE_I18N: Record<"title" | "role" | "base" | "bio", Localized> = {
  title: { fr: "Développeur logiciel", en: "Software Developer" },
  role: { fr: "Lead Front End @ Jèko", en: "Front End Lead @ Jèko" },
  base: { fr: "Abidjan, Côte d'Ivoire", en: "Abidjan, Ivory Coast" },
  bio: {
    fr: "Passionné de développement logiciel depuis plus de 6 ans, je me spécialise dans la création d'applications mobiles innovantes et de solutions web performantes. Mon expertise couvre tout le cycle de développement, de la conception à la mise en production, avec une attention particulière portée à l'expérience utilisateur et aux technologies modernes.",
    en: "Passionate about software development for over 6 years, I specialize in creating innovative mobile applications and high-performance web solutions. My expertise covers the entire development lifecycle, from design to production, with a particular focus on user experience and modern technologies.",
  },
};

const HIGHLIGHTS: Localized<string>[] = [
  { fr: "Plus de 6 ans d'expérience en développement mobile et web", en: "6+ years of experience in mobile and web development" },
  { fr: "Expertise en Flutter, SvelteKit et technologies cloud", en: "Expertise in Flutter, SvelteKit, and cloud technologies" },
  { fr: `${PROJECT_COUNT}+ projets livrés avec succès`, en: `${PROJECT_COUNT}+ successfully delivered projects` },
  { fr: "Approche centrée utilisateur, axée sur la performance", en: "User-centered approach focused on performance" },
];

const VALUES: { title: Localized; desc: Localized }[] = [
  {
    title: { fr: "Excellence technique", en: "Technical Excellence" },
    desc: { fr: "Code propre, architectures évolutives et bonnes pratiques.", en: "Clean code, scalable architectures and best practices." },
  },
  {
    title: { fr: "Esprit collaboratif", en: "Collaborative Approach" },
    desc: { fr: "Communication transparente et travail d'équipe pour des résultats optimaux.", en: "Transparent communication and teamwork for optimal results." },
  },
  {
    title: { fr: "Passion & innovation", en: "Passion & Innovation" },
    desc: { fr: "Veille technologique constante et solutions créatives.", en: "Constant technology watch and creative solutions." },
  },
];

export const PROFILE = {
  name: "Gaël Sassan",
  title: "Software Developer",
  role: "Front End Lead @ Jèko",
  base: "Abidjan, Côte d'Ivoire",
  years: 6,
  focus: "Flutter · SvelteKit · Cloud",
  bio: "Passionate about software development for over 6 years, I specialize in creating innovative mobile applications and high-performance web solutions. My expertise covers the entire development lifecycle, from design to production, with a particular focus on user experience and modern technologies.",
  email: "gaelelscientifico@gmail.com",
  github: "https://github.com/ClichyMercury",
  linkedin: "https://www.linkedin.com/in/gael-yad-eugene-sassan-17a69b1b6/",
};

const ProfessionalBio = () => {
  const { pick } = useLocale();
  const bio = pick(PROFILE_I18N.bio);

  const dataSheet = [
    { key: pick({ fr: "nom", en: "name" }), value: PROFILE.name.toUpperCase() },
    { key: pick({ fr: "poste", en: "role" }), value: pick(PROFILE_I18N.role) },
    { key: "base", value: pick(PROFILE_I18N.base) },
    { key: "exp", value: `${PROFILE.years}+ ${pick({ fr: "ans", en: "years" })}` },
    { key: "focus", value: PROFILE.focus },
    { key: pick({ fr: "statut", en: "status" }), value: pick({ fr: "● disponible", en: "● available" }), accent: true },
  ];

  const highlights = HIGHLIGHTS.map((h) => pick(h));

  return (
    <section id="bio" className="min-h-screen py-32 lg:py-44 px-6 relative">
      <SectionRail index="01" label={pick({ fr: "identite", en: "identity" })} motif="leds" />
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <SectionHeader
          index="01"
          label={pick({ fr: "identite", en: "identity" })}
          title={pick({ fr: "Qui", en: "Who" })}
          titleHighlight={pick({ fr: "suis-je ?", en: "Am I?" })}
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
                src="/images/gaelSASSAN-removebg-preview.png"
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
              <span className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--accent)" }}>{pick({ fr: "// carte_id", en: "// id_card" })}</span>
              <img src="/images/GS-removebg-preview.png" alt="GS" className="h-8 w-8 object-contain logo-themed opacity-70" />
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
                { value: 6, suffix: "+", label: pick({ fr: "Ans", en: "Years" }) },
                { value: PROJECT_COUNT, suffix: "+", label: pick({ fr: "Projets", en: "Projects" }) },
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
            { icon: <Award className="h-4 w-4" />, ...VALUES[0] },
            { icon: <User className="h-4 w-4" />, ...VALUES[1] },
            { icon: <Heart className="h-4 w-4" />, ...VALUES[2] },
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
              <h5 className="text-base font-medium mb-2">{pick(v.title)}</h5>
              <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{pick(v.desc)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalBio;
