import React from "react";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";

interface Skill {
  name: string;
  proficiency: number;
  category: "languages" | "frameworks" | "tools";
  icon?: string;
  color?: string;
}

interface SkillsSectionProps {
  skills?: Skill[];
}

const SkillsSection = ({ skills = defaultSkills }: SkillsSectionProps) => {
  return (
    <section
      id="skills"
      className="py-24 px-6 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-primary"></div>
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Expertise
            </span>
            <div className="w-12 h-px bg-primary"></div>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Skills &</span>
            <span className="gradient-text"> Technologies</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Mastering cutting-edge technologies to build exceptional digital
            experiences.
          </p>
        </motion.div>

        {/* Technologies Scrolling List */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="glass-effect rounded-3xl p-8 border-white/10">
            <div className="flex flex-wrap gap-3 justify-center">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge
                    variant="outline"
                    className="border-primary/30 text-white bg-primary/10 hover:bg-primary/20 transition-all duration-300 px-4 py-2 text-sm font-medium cursor-pointer"
                  >
                    {skill.icon && <span className="mr-2">{skill.icon}</span>}
                    {skill.name}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Experience Highlights */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            { number: "5+", label: "Years of Experience", icon: "⏱️" },
            { number: "20+", label: "Projects Completed", icon: "🚀" },
            { number: "15+", label: "Technologies Mastered", icon: "⚡" },
            { number: "100%", label: "Client Satisfaction", icon: "⭐" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-effect p-6 rounded-2xl text-center hover-lift"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const defaultSkills: Skill[] = [
  // Programming Languages
  {
    name: "Dart",
    proficiency: 95,
    category: "languages",
    icon: "🎯",
    color: "#0175C2",
  },
  {
    name: "Python",
    proficiency: 85,
    category: "languages",
    icon: "🐍",
    color: "#3776AB",
  },
  {
    name: "Kotlin",
    proficiency: 80,
    category: "languages",
    icon: "🟣",
    color: "#7F52FF",
  },
  {
    name: "JavaScript",
    proficiency: 85,
    category: "languages",
    icon: "📜",
    color: "#F7DF1E",
  },
  {
    name: "TypeScript",
    proficiency: 80,
    category: "languages",
    icon: "📘",
    color: "#3178C6",
  },
  {
    name: "C",
    proficiency: 75,
    category: "languages",
    icon: "⚙️",
    color: "#A8B9CC",
  },
  {
    name: "HTML/CSS",
    proficiency: 90,
    category: "languages",
    icon: "🎨",
    color: "#E34F26",
  },

  // Frameworks & Libraries
  {
    name: "Flutter",
    proficiency: 95,
    category: "frameworks",
    icon: "💙",
    color: "#02569B",
  },
  {
    name: "Flask",
    proficiency: 85,
    category: "frameworks",
    icon: "🌶️",
    color: "#000000",
  },
  {
    name: "SvelteKit",
    proficiency: 80,
    category: "frameworks",
    icon: "🔥",
    color: "#FF3E00",
  },
  {
    name: "Provider",
    proficiency: 90,
    category: "frameworks",
    icon: "🧩",
    color: "#02569B",
  },
  {
    name: "Get_it",
    proficiency: 85,
    category: "frameworks",
    icon: "📦",
    color: "#02569B",
  },

  // Base de données / Backend
  {
    name: "Hive",
    proficiency: 90,
    category: "tools",
    icon: "🗄️",
    color: "#FFA500",
  },
  {
    name: "Supabase",
    proficiency: 85,
    category: "tools",
    icon: "⚡",
    color: "#3ECF8E",
  },
  {
    name: "Firebase",
    proficiency: 88,
    category: "tools",
    icon: "🔥",
    color: "#FFCA28",
  },
  {
    name: "Directus",
    proficiency: 80,
    category: "tools",
    icon: "🎛️",
    color: "#6644FF",
  },

  // DevOps / Déploiement
  {
    name: "Firebase Hosting",
    proficiency: 85,
    category: "tools",
    icon: "🌐",
    color: "#FFCA28",
  },
  {
    name: "App Store Connect",
    proficiency: 85,
    category: "tools",
    icon: "📱",
    color: "#007AFF",
  },
  {
    name: "Google Play Console",
    proficiency: 85,
    category: "tools",
    icon: "🤖",
    color: "#34A853",
  },
  {
    name: "Linux",
    proficiency: 80,
    category: "tools",
    icon: "🐧",
    color: "#FCC624",
  },

  // IoT / Systèmes embarqués
  {
    name: "MQTT",
    proficiency: 85,
    category: "tools",
    icon: "📡",
    color: "#660066",
  },
  {
    name: "AWS IoT Core",
    proficiency: 80,
    category: "tools",
    icon: "☁️",
    color: "#FF9900",
  },
];

export default SkillsSection;
