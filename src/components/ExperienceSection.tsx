import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Building, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  type: "professional" | "freelance" | "personal";
}

interface ExperienceSectionProps {
  experiences?: Experience[];
}

const ExperienceSection = ({
  experiences = defaultExperiences,
}: ExperienceSectionProps) => {
  return (
    <section
      id="experience"
      className="py-24 px-6 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
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
              Parcours
            </span>
            <div className="w-12 h-px bg-primary"></div>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Mon</span>
            <span className="gradient-text"> Expérience</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Un parcours riche en projets variés et en défis techniques
            stimulants.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-purple-500 to-primary opacity-30"></div>

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                className="relative flex gap-8"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Timeline dot */}
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center border-4 border-primary/30">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <Card className="glass-effect border-white/10 hover-lift">
                    <CardHeader className="pb-4">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">
                            {experience.role}
                          </h3>
                          <p className="text-primary font-semibold">
                            {experience.company}
                          </p>
                        </div>
                        <div className="flex flex-col lg:items-end gap-2">
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Calendar className="h-4 w-4" />
                            {experience.period}
                          </div>
                          <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <MapPin className="h-4 w-4" />
                            {experience.location}
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              experience.type === "professional"
                                ? "border-green-500/30 text-green-400"
                                : experience.type === "freelance"
                                  ? "border-blue-500/30 text-blue-400"
                                  : "border-purple-500/30 text-purple-400"
                            }`}
                          >
                            {experience.type === "professional"
                              ? "Salarié"
                              : experience.type === "freelance"
                                ? "Freelance"
                                : "Personnel"}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <p className="text-gray-300 leading-relaxed">
                        {experience.description}
                      </p>

                      {/* Achievements */}
                      {experience.achievements.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                            🏆 Réalisations Clés
                          </h4>
                          <div className="space-y-2">
                            {experience.achievements.map((achievement, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <p className="text-gray-400 text-sm">
                                  {achievement}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Technologies */}
                      {experience.technologies.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                            🛠️ Technologies Utilisées
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {experience.technologies.map((tech, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="border-primary/30 text-white bg-primary/10 hover:bg-primary/20 transition-all duration-300 text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const defaultExperiences: Experience[] = [
  {
    id: "1",
    company: "TechCorp Solutions",
    role: "Développeur Mobile Senior",
    period: "2022 - Présent",
    location: "Paris, France",
    type: "professional",
    description:
      "Développement d'applications mobiles cross-platform pour des clients enterprise. Lead technique sur plusieurs projets stratégiques avec une équipe de 5 développeurs.",
    achievements: [
      "Livraison de 8 applications mobiles avec plus de 100k téléchargements",
      "Réduction de 40% du temps de développement grâce à l'optimisation des processus",
      "Mise en place d'une architecture modulaire réutilisable",
      "Formation et mentorat de 3 développeurs junior",
    ],
    technologies: ["Flutter", "Firebase", "AWS", "CI/CD", "Git", "Agile"],
  },
  {
    id: "2",
    company: "Freelance",
    role: "Développeur Full-Stack",
    period: "2020 - 2022",
    location: "Remote",
    type: "freelance",
    description:
      "Développement d'applications web et mobiles pour diverses startups et PME. Gestion complète des projets de la conception à la mise en production.",
    achievements: [
      "15+ projets livrés dans les délais et budgets",
      "Taux de satisfaction client de 98%",
      "Développement d'une plateforme e-commerce générant 500k€ de CA",
      "Création d'une application IoT pour la gestion énergétique",
    ],
    technologies: [
      "Flutter",
      "React",
      "Node.js",
      "Python",
      "PostgreSQL",
      "Docker",
    ],
  },
  {
    id: "3",
    company: "Digital Innovations",
    role: "Développeur Mobile Junior",
    period: "2019 - 2020",
    location: "Lyon, France",
    type: "professional",
    description:
      "Premier poste en tant que développeur mobile. Participation au développement d'applications natives iOS et Android pour des clients du secteur bancaire.",
    achievements: [
      "Contribution à 3 applications bancaires certifiées",
      "Implémentation de fonctionnalités de sécurité avancées",
      "Optimisation des performances réduisant les temps de chargement de 30%",
      "Obtention de la certification Flutter Developer",
    ],
    technologies: ["Flutter", "Dart", "iOS", "Android", "REST API", "SQLite"],
  },
];

export default ExperienceSection;
