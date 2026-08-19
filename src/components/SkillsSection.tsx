import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import TechConstellation from "./fx/TechConstellation";
import Counter from "./fx/Counter";
import SectionRail from "./fx/SectionRail";

interface Skill {
  name: string;
  icon: string;
  category: "languages" | "frameworks" | "tools";
}

const SkillsSection = ({ skills = defaultSkills }: { skills?: Skill[] }) => {
  return (
    <section id="skills" className="min-h-screen py-32 lg:py-44 px-6 relative">
      <SectionRail index="02" label="arsenal" motif="bars" bars={[95, 88, 70, 62, 78, 55, 40]} />
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeader
          index="02"
          label="arsenal"
          title="Tech"
          titleHighlight="Constellation"
          description="Every star is a technology I've shipped with. Hover to trace the connections — grab one and throw it."
        />

        <motion.div
          className="panel rounded-2xl hud-corners overflow-hidden mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-elevated)" }}>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--accent)" }}>
              star_map.render( )
            </span>
            <div className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.15em]" style={{ color: "var(--fg-faint)" }}>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ background: "#00E5FF" }} />languages</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ background: "#7DF9FF" }} />frameworks</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full" style={{ background: "#4A90D9" }} />tools</span>
            </div>
          </div>
          <TechConstellation skills={skills} />
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: 6, suffix: "+", label: "Years of Experience" },
            { value: 54, suffix: "+", label: "Projects Completed" },
            { value: 15, suffix: "+", label: "Technologies Mastered" },
            { value: 100, suffix: "%", label: "Client Satisfaction" },
          ].map((s) => (
            <motion.div
              key={s.label}
              className="text-center py-8 rounded-xl panel tentacle-glow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Counter value={s.value} suffix={s.suffix} className="block text-3xl lg:text-5xl font-semibold mb-2" />
              <div className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--fg-faint)" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const D = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const defaultSkills: Skill[] = [
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
  { name: "Flutter", icon: `${D}/flutter/flutter-original.svg`, category: "frameworks" },
  { name: "Flutter BLoC", icon: `${D}/flutter/flutter-original.svg`, category: "frameworks" },
  { name: "Provider", icon: `${D}/flutter/flutter-original.svg`, category: "frameworks" },
  { name: "Android Dev", icon: `${D}/android/android-original.svg`, category: "frameworks" },
  { name: "SvelteKit", icon: `${D}/svelte/svelte-original.svg`, category: "frameworks" },
  { name: "Laravel", icon: `${D}/laravel/laravel-original.svg`, category: "frameworks" },
  { name: "Flask", icon: `${D}/flask/flask-original.svg`, category: "frameworks" },
  { name: "Node.js", icon: `${D}/nodejs/nodejs-original.svg`, category: "frameworks" },
  { name: "React", icon: `${D}/react/react-original.svg`, category: "frameworks" },
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
