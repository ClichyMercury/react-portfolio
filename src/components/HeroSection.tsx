import React from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { ArrowDown, Code, Smartphone, Zap } from "lucide-react";

interface HeroSectionProps {
  name?: string;
  tagline?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  photoUrl?: string;
}

const HeroSection = ({
  name = "GAËL SASSAN",
  tagline = "Software Developer creating innovative solutions with modern technologies and best practices",
  ctaText = "Get in touch",
  onCtaClick = () => console.log("CTA clicked"),
  photoUrl = "./images/GS-removebg-preview.png",
}: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 container max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              <motion.div
                className="flex items-center gap-3 text-primary font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-12 h-px bg-primary"></div>
                <span className="text-sm tracking-wider uppercase">
                  Software Developer
                </span>
              </motion.div>

              <motion.h1
                className="text-5xl lg:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-white">Hi, I'm</span>
                <br />
                <span className="gradient-text">{name}</span>
              </motion.h1>
            </div>

            <motion.p
              className="text-xl text-gray-300 max-w-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {tagline}
            </motion.p>

            {/* Stats */}
            <motion.div
              className="flex gap-8 py-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">30+</div>
                <div className="text-sm text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-gray-400">Client Satisfaction</div>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                size="lg"
                onClick={onCtaClick}
                className="bg-primary hover:bg-primary/90 text-black font-semibold px-8 py-6 rounded-full glow-effect transition-all duration-300 hover:scale-105"
              >
                {ctaText}
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right side - Image and floating elements */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main image container */}
            <div className="relative">
              <motion.div
                className="relative w-80 h-80 lg:w-96 lg:h-96"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-2xl"></div>
                <div className="relative w-full h-full glass-effect rounded-full p-8 border-2 border-primary/20">
                  <img
                    src={photoUrl}
                    alt="Gaël Sassan"
                    className="w-full h-full object-contain filter drop-shadow-2xl"
                  />
                </div>
              </motion.div>

              {/* Floating tech icons */}
              <motion.div
                className="absolute -top-4 -left-4 glass-effect p-4 rounded-2xl"
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Smartphone className="h-6 w-6 text-primary" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-4 glass-effect p-4 rounded-2xl"
                animate={{
                  y: [0, 5, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <Code className="h-6 w-6 text-primary" />
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-8 glass-effect p-4 rounded-2xl"
                animate={{
                  x: [0, 5, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <Zap className="h-6 w-6 text-primary" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <span className="text-xs uppercase tracking-wider">Scroll Down</span>
          <ArrowDown className="h-4 w-4" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
