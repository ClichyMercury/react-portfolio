import { motion } from "framer-motion";

interface Orb {
  size: number;
  color: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  delay?: number;
}

interface NebulaOrbsProps {
  orbs?: Orb[];
  variant?: "green" | "purple" | "blue" | "mixed" | "cyber";
}

const presets: Record<string, Orb[]> = {
  green: [
    { size: 600, color: "rgba(215,251,97,0.18)", top: "-15%", right: "-10%", delay: 0 },
    { size: 400, color: "rgba(215,251,97,0.12)", bottom: "5%", left: "-8%", delay: -3 },
    { size: 250, color: "rgba(56,189,248,0.10)", top: "50%", left: "40%", delay: -5 },
  ],
  purple: [
    { size: 550, color: "rgba(139,92,246,0.22)", top: "-5%", left: "-12%", delay: -2 },
    { size: 450, color: "rgba(168,85,247,0.15)", bottom: "0%", right: "-8%", delay: -4 },
    { size: 300, color: "rgba(236,72,153,0.10)", top: "30%", right: "20%", delay: -1 },
  ],
  blue: [
    { size: 550, color: "rgba(59,130,246,0.20)", top: "-10%", right: "-12%", delay: -1 },
    { size: 400, color: "rgba(56,189,248,0.14)", bottom: "10%", left: "-5%", delay: -3 },
    { size: 300, color: "rgba(139,92,246,0.10)", top: "40%", left: "50%", delay: -5 },
  ],
  mixed: [
    { size: 600, color: "rgba(215,251,97,0.15)", top: "-10%", right: "-10%", delay: 0 },
    { size: 500, color: "rgba(139,92,246,0.18)", bottom: "5%", left: "-10%", delay: -2 },
    { size: 350, color: "rgba(56,189,248,0.12)", top: "35%", left: "55%", delay: -4 },
    { size: 250, color: "rgba(236,72,153,0.08)", top: "60%", right: "10%", delay: -6 },
  ],
  cyber: [
    { size: 700, color: "rgba(56,189,248,0.20)", top: "-15%", left: "-15%", delay: 0 },
    { size: 500, color: "rgba(215,251,97,0.14)", bottom: "-5%", right: "-10%", delay: -3 },
    { size: 400, color: "rgba(139,92,246,0.16)", top: "30%", right: "20%", delay: -5 },
    { size: 300, color: "rgba(236,72,153,0.10)", bottom: "20%", left: "30%", delay: -2 },
  ],
};

const NebulaOrbs = ({ orbs, variant = "green" }: NebulaOrbsProps) => {
  const items = orbs || presets[variant];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Orbs */}
      {items.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            filter: "blur(60px)",
            top: orb.top,
            bottom: orb.bottom,
            left: orb.left,
            right: orb.right,
          }}
          animate={{
            x: [0, 20, 0, -20, 0],
            y: [0, -25, -40, -25, 0],
            scale: [1, 1.05, 1, 0.95, 1],
            rotate: [0, 3, 0, -3, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay || 0,
          }}
        />
      ))}

      {/* Cyber grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(215,251,97,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(215,251,97,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating tech rings */}
      {[
        { size: 200, top: "15%", right: "10%", delay: 0, color: "rgba(215,251,97,0.06)" },
        { size: 150, bottom: "20%", left: "8%", delay: -3, color: "rgba(139,92,246,0.05)" },
        { size: 120, top: "60%", right: "25%", delay: -5, color: "rgba(56,189,248,0.05)" },
      ].map((ring, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute rounded-full border"
          style={{
            width: ring.size,
            height: ring.size,
            borderColor: ring.color,
            top: ring.top,
            bottom: ring.bottom,
            left: ring.left,
            right: ring.right,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: "linear", delay: ring.delay },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: ring.delay },
          }}
        />
      ))}

      {/* Glowing dots - mini stars */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute rounded-full"
          style={{
            width: 3 + Math.random() * 3,
            height: 3 + Math.random() * 3,
            background: ["#D7FB61", "#8B5CF6", "#38BDF8", "#EC4899"][i % 4],
            top: `${10 + Math.random() * 80}%`,
            left: `${5 + Math.random() * 90}%`,
            filter: "blur(1px)",
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * -0.7,
          }}
        />
      ))}
    </div>
  );
};

export default NebulaOrbs;
