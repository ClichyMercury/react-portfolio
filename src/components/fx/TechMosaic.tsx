import { motion } from "framer-motion";

interface MosaicSkill {
  name: string;
  icon: string;
  category: string;
  url: string;
}

const CATEGORY_TINT: Record<string, string> = {
  languages: "#00E5FF",
  frameworks: "#7DF9FF",
  tools: "#4A90D9",
};

const TechMosaic = ({ skills }: { skills: MosaicSkill[] }) => {
  return (
    <div className="tech-mosaic p-3 sm:p-4">
      <div className="tech-mosaic-grid">
        {skills.map((skill, i) => {
          const tint = CATEGORY_TINT[skill.category] || "#00E5FF";
          return (
            <motion.a
              key={skill.name}
              href={skill.url}
              target="_blank"
              rel="noopener noreferrer"
              className="tech-tile group"
              title={`${skill.name} — ${skill.url.replace(/^https?:\/\//, "")}`}
              style={{ ["--tile-tint" as string]: tint }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.012, 0.5) }}
            >
              <span className="tech-tile-glow" aria-hidden="true" />
              <img src={skill.icon} alt="" loading="lazy" className="tech-tile-icon" />
              <span className="tech-tile-label">{skill.name}</span>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
};

export default TechMosaic;
