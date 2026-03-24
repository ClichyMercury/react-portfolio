import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award, User, Heart } from "lucide-react";
import NebulaOrbs from "./NebulaOrbs";

const ProfessionalBio = () => {
  const bio = "Passionate about software development for over 6 years, I specialize in creating innovative mobile applications and high-performance web solutions. My expertise covers the entire development lifecycle, from design to production, with a particular focus on user experience and modern technologies.";
  const highlights = [
    "6+ years of experience in mobile and web development",
    "Expertise in Flutter, React, and cloud technologies",
    "49+ successfully delivered projects",
    "User-centered approach focused on performance",
  ];

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const contentY = useTransform(scrollYProgress, [0.1, 0.5], [60, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  return (
    <section ref={ref} id="bio" className="min-h-screen py-40 lg:py-52 px-6 relative flex items-center">
      <NebulaOrbs variant="cyber" />
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Headline */}
        <motion.div className="text-center mb-24"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] block mb-6" style={{ color: "var(--accent)" }}>About Me</span>
          <h2 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.9] tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="text-white">Who </span>
            <span style={{ color: "var(--fg-faint)" }}>Am I?</span>
          </h2>
        </motion.div>

        {/* Bio */}
        <motion.div className="max-w-3xl mx-auto text-center mb-24" style={{ y: contentY, opacity: contentOpacity }}>
          <p className="text-sm tracking-wider mb-4" style={{ color: "var(--accent)" }}>Software Developer & Mobile App Specialist</p>
          <p className="text-xl lg:text-2xl leading-relaxed font-light" style={{ color: "var(--fg-muted)" }}>{bio}</p>
        </motion.div>

        {/* Stats */}
        <motion.div className="flex flex-wrap justify-center gap-16 lg:gap-24 mb-24" style={{ y: contentY, opacity: contentOpacity }}>
          {[
            { number: "6+", label: "Years" },
            { number: "49+", label: "Projects" },
            { number: "100%", label: "Satisfaction" },
          ].map((s, i) => (
            <motion.div key={i} className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl lg:text-7xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{s.number}</div>
              <div className="text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--fg-faint)" }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Highlights */}
        <motion.div className="max-w-2xl mx-auto mb-24" style={{ y: contentY, opacity: contentOpacity }}>
          {highlights.map((h, i) => (
            <motion.div key={i} className="flex items-center gap-4 py-4"
              style={{ borderBottom: "1px solid var(--border-subtle)" }}
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
            >
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} />
              <p className="text-base font-light" style={{ color: "var(--fg-muted)" }}>{h}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {[
            { icon: <Award className="h-5 w-5" />, title: "Technical Excellence", desc: "Clean code, scalable architectures and best practices." },
            { icon: <User className="h-5 w-5" />, title: "Collaborative Approach", desc: "Transparent communication and teamwork for optimal results." },
            { icon: <Heart className="h-5 w-5" />, title: "Passion & Innovation", desc: "Constant technology watch and creative solutions." },
          ].map((v, i) => (
            <motion.div key={i}
              className="glass-effect p-8 rounded-3xl hover-lift tentacle-glow group text-center"
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }} viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="inline-flex p-4 rounded-2xl mb-5 transition-all duration-500 group-hover:text-[var(--bg)]"
                style={{ border: "1px solid var(--border-medium)", color: "var(--fg-faint)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "var(--border-medium)"; }}
              >{v.icon}</div>
              <h5 className="text-lg font-semibold text-white mb-3">{v.title}</h5>
              <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalBio;
