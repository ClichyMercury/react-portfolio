import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeader from "./SectionHeader";
import NebulaOrbs from "./NebulaOrbs";

interface Skill {
  name: string;
  icon: string; // URL to icon
  category: "languages" | "frameworks" | "tools";
}

const SkillsSection = ({ skills = defaultSkills }: { skills?: Skill[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const statsY = useTransform(scrollYProgress, [0.3, 0.6], [60, 0]);
  const statsOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  const languages = skills.filter((s) => s.category === "languages");
  const frameworks = skills.filter((s) => s.category === "frameworks");
  const tools = skills.filter((s) => s.category === "tools");
  const row1 = [...languages, ...frameworks];
  const row2 = [...tools, ...languages.slice(0, 4)];
  const row3 = [...frameworks, ...tools.slice(0, 5)];

  return (
    <section ref={ref} id="skills" className="min-h-screen py-40 lg:py-52 px-6 relative overflow-hidden">
      <NebulaOrbs variant="purple" />
      <div className="relative z-10 max-w-5xl mx-auto">
        <SectionHeader label="Expertise" title="Skills &" titleHighlight="Technologies"
          description="Mastering cutting-edge technologies to build exceptional digital experiences." />
      </div>

      <div className="space-y-5 mb-32 overflow-hidden">
        <MarqueeRow items={row1} speed="animate-marquee" />
        <MarqueeRow items={row2} speed="animate-marquee-reverse" />
        <MarqueeRow items={row3} speed="animate-marquee" />
      </div>

      <motion.div className="max-w-5xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8" style={{ y: statsY, opacity: statsOpacity }}>
        {[
          { number: "6+", label: "Years of Experience" },
          { number: "49+", label: "Projects Completed" },
          { number: "15+", label: "Technologies Mastered" },
          { number: "100%", label: "Client Satisfaction" },
        ].map((s) => (
          <motion.div key={s.label} className="text-center py-8 rounded-3xl glass-effect hover-lift" whileHover={{ scale: 1.03 }}>
            <div className="text-4xl lg:text-5xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{s.number}</div>
            <div className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--fg-faint)" }}>{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const MarqueeRow = ({ items, speed }: { items: Skill[]; speed: string }) => {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <div className={`flex gap-4 ${speed}`} style={{ willChange: "transform" }}>
        {doubled.map((s, i) => (
          <motion.div key={`${s.name}-${i}`}
            className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300"
            style={{ border: "1px solid var(--border-medium)", color: "var(--fg-muted)" }}
            whileHover={{ scale: 1.1, rotate: -2, background: "var(--accent)", color: "var(--bg)", borderColor: "var(--accent)" }}
          >
            {s.icon && <img src={s.icon} alt={s.name} className="w-5 h-5 object-contain" />}
            {s.name}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const D = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const defaultSkills: Skill[] = [
  // Languages
  { name: "Dart", icon: `${D}/dart/dart-original.svg`, category: "languages" },
  { name: "Java", icon: `${D}/java/java-original.svg`, category: "languages" },
  { name: "JavaScript", icon: `${D}/javascript/javascript-original.svg`, category: "languages" },
  { name: "TypeScript", icon: `${D}/typescript/typescript-original.svg`, category: "languages" },
  { name: "Python", icon: `${D}/python/python-original.svg`, category: "languages" },
  { name: "Kotlin", icon: `${D}/kotlin/kotlin-original.svg`, category: "languages" },
  { name: "Swift", icon: `${D}/swift/swift-original.svg`, category: "languages" },
  { name: "Rust", icon: `${D}/rust/rust-original.svg`, category: "languages" },
  { name: "PHP", icon: `${D}/php/php-original.svg`, category: "languages" },
  { name: "HTML/CSS", icon: `${D}/html5/html5-original.svg`, category: "languages" },

  // Frameworks
  { name: "Flutter", icon: `${D}/flutter/flutter-original.svg`, category: "frameworks" },
  { name: "Flutter BLoC", icon: `${D}/flutter/flutter-original.svg`, category: "frameworks" },
  { name: "Provider", icon: `${D}/flutter/flutter-original.svg`, category: "frameworks" },
  { name: "Android Dev", icon: `${D}/android/android-original.svg`, category: "frameworks" },
  { name: "SvelteKit", icon: `${D}/svelte/svelte-original.svg`, category: "frameworks" },
  { name: "Laravel", icon: `${D}/laravel/laravel-original.svg`, category: "frameworks" },
  { name: "Flask", icon: `${D}/flask/flask-original.svg`, category: "frameworks" },
  { name: "Node.js", icon: `${D}/nodejs/nodejs-original.svg`, category: "frameworks" },
  { name: "React", icon: `${D}/react/react-original.svg`, category: "frameworks" },

  // Tools
  { name: "Firebase", icon: `${D}/firebase/firebase-original.svg`, category: "tools" },
  { name: "Supabase", icon: `${D}/supabase/supabase-original.svg`, category: "tools" },
  { name: "Git", icon: `${D}/git/git-original.svg`, category: "tools" },
  { name: "GitHub", icon: `${D}/github/github-original.svg`, category: "tools" },
  { name: "Android Studio", icon: `${D}/androidstudio/androidstudio-original.svg`, category: "tools" },
  { name: "PostHog", icon: `${D}/postgresql/postgresql-original.svg`, category: "tools" },
  { name: "Linux", icon: `${D}/linux/linux-original.svg`, category: "tools" },
  { name: "Docker", icon: `${D}/docker/docker-original.svg`, category: "tools" },
  { name: "AWS", icon: `${D}/amazonwebservices/amazonwebservices-original-wordmark.svg`, category: "tools" },
  { name: "VSCode", icon: `${D}/vscode/vscode-original.svg`, category: "tools" },
];

export default SkillsSection;
