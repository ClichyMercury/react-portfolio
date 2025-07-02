import React from "react";
import { motion } from "framer-motion";
import { User, Award, Target, Heart } from "lucide-react";

interface ProfessionalBioProps {
  name?: string;
  title?: string;
  bio?: string;
  highlights?: string[];
}

const ProfessionalBio = ({
  name = "Gaël Sassan",
  title = "Software Developer & Mobile App Specialist",
  bio = "Passionate about software development for over 5 years, I specialize in creating innovative mobile applications and high-performance web solutions. My expertise covers the entire development lifecycle, from design to production, with a particular focus on user experience and modern technologies.",
  highlights = [
    "5+ years of experience in mobile and web development",
    "Expertise in Flutter, React, and cloud technologies",
    "20+ successfully delivered projects",
    "User-centered approach focused on performance",
  ],
}: ProfessionalBioProps) => {
  return (
    <section
      id="bio"
      className="py-24 px-6 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-primary"></div>
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              About Me
            </span>
            <div className="w-12 h-px bg-primary"></div>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Who</span>
            <span className="gradient-text"> Am I?</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Bio content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
                <p className="text-primary text-lg font-medium">{title}</p>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">{bio}</p>
            </div>

            {/* Key highlights */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-white flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Key Highlights
              </h4>
              <div className="space-y-3">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">{highlight}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right side - Values & Approach */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="grid gap-6">
              {[
                {
                  icon: <Award className="h-6 w-6" />,
                  title: "Technical Excellence",
                  description:
                    "Clean code, scalable architectures and development best practices.",
                },
                {
                  icon: <User className="h-6 w-6" />,
                  title: "Collaborative Approach",
                  description:
                    "Transparent communication and teamwork for optimal results.",
                },
                {
                  icon: <Heart className="h-6 w-6" />,
                  title: "Passion & Innovation",
                  description:
                    "Constant technology watch and search for creative solutions.",
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  className="glass-effect p-6 rounded-2xl hover-lift"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-xl text-primary">
                      {value.icon}
                    </div>
                    <div>
                      <h5 className="text-lg font-semibold text-white mb-2">
                        {value.title}
                      </h5>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalBio;