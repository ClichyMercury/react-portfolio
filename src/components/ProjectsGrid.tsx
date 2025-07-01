import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  category: string;
  featured?: boolean;
  objectives?: string;
  results?: string;
  demoUrl?: string;
  codeUrl?: string;
}

interface ProjectsGridProps {
  projects?: Project[];
}

const ProjectsGrid = ({ projects = defaultProjects }: ProjectsGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categories = [
    "all",
    ...Array.from(new Set(projects.map((project) => project.category))),
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const featuredProjects = projects.filter((p) => p.featured);
  const regularProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="py-24 px-6 bg-black relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
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
              Portfolio
            </span>
            <div className="w-12 h-px bg-primary"></div>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Featured</span>
            <span className="text-white"> Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Discover my latest mobile applications and web projects, crafted
            with precision and innovation.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 text-gray-400 mr-4">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Filter by:</span>
          </div>
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              onMouseEnter={() => setHoveredCategory(category)}
              onMouseLeave={() => setHoveredCategory(null)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                selectedCategory === category
                  ? "bg-primary text-black glow-effect"
                  : "glass-effect text-gray-300 hover:text-primary hover:border-primary/50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && selectedCategory === "all" && (
          <motion.div
            className="mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Featured Work
            </h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    imageUrl={project.imageUrl}
                    technologies={project.technologies.map((tech) => ({
                      name: tech,
                    }))}
                    projectUrl={project.demoUrl}
                    githubUrl={project.codeUrl}
                    detailedDescription={project.description}
                    objectives={project.objectives}
                    results={project.results}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Regular Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {(selectedCategory === "all"
            ? regularProjects
            : filteredProjects
          ).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                technologies={project.technologies.map((tech) => ({
                  name: tech,
                }))}
                projectUrl={project.demoUrl}
                githubUrl={project.codeUrl}
                detailedDescription={project.description}
                objectives={project.objectives}
                results={project.results}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Updated default projects with featured flag
const defaultProjects: Project[] = [
  {
    id: "1",
    title: "Galaxy Stream",
    description:
      "Application mobile iOS et Android pour visualiser des informations sur les films et séries avec des capacités de streaming avancées.",
    imageUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80",
    technologies: ["Flutter", "Firebase", "REST API"],
    category: "entertainment",
    featured: true,
    objectives:
      "Créer une plateforme de streaming moderne avec une interface utilisateur intuitive et des performances optimales.",
    results:
      "Application déployée avec plus de 1000+ téléchargements et une note de 4.5/5 sur les stores.",
    demoUrl: "https://galaxystream-demo.com",
    codeUrl: "https://github.com/gaelsassan/galaxy-stream",
  },
  {
    id: "2",
    title: "Vidalossa Online Store",
    description:
      "Application e-commerce complète avec traitement de paiement avancé et gestion d'inventaire.",
    imageUrl:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
    technologies: ["Flutter", "Firebase", "Stripe", "Cloud Functions"],
    category: "e-commerce",
    featured: true,
    objectives:
      "Développer une solution e-commerce robuste avec paiements sécurisés et gestion temps réel des stocks.",
    results:
      "Augmentation de 300% des ventes en ligne et réduction de 50% du temps de traitement des commandes.",
    demoUrl: "https://vidalossa-store.com",
    codeUrl: "https://github.com/gaelsassan/vidalossa-store",
  },
  {
    id: "3",
    title: "PHP Blog Platform",
    description:
      "Plateforme de blog moderne avec système de gestion de contenu et design responsive.",
    imageUrl:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
    technologies: ["PHP", "HTML", "Bootstrap", "MySQL"],
    category: "web",
    objectives:
      "Créer un CMS simple et efficace pour la gestion de contenu blog avec interface d'administration.",
    results:
      "Plateforme utilisée par 50+ blogueurs avec un temps de chargement optimisé de moins de 2 secondes.",
    demoUrl: "https://blog-platform-demo.com",
    codeUrl: "https://github.com/gaelsassan/php-blog-platform",
  },
  {
    id: "4",
    title: "Meter Manager",
    description:
      "Application de surveillance de consommation électrique intelligente avec analyses en temps réel et rapports.",
    imageUrl:
      "https://images.unsplash.com/photo-1605719126188-974d65def789?w=800&q=80",
    technologies: ["Flutter", "Laravel", "PHP", "IoT Integration"],
    category: "utility",
    objectives:
      "Développer une solution IoT pour le monitoring énergétique avec alertes et optimisation de consommation.",
    results:
      "Réduction moyenne de 25% de la consommation électrique chez les utilisateurs testeurs.",
    demoUrl: "https://meter-manager-demo.com",
    codeUrl: "https://github.com/gaelsassan/meter-manager",
  },
  {
    id: "5",
    title: "MATURUS",
    description:
      "Application mobile avancée avec expérience utilisateur sophistiquée et patterns de design modernes.",
    imageUrl:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
    technologies: ["Flutter", "Firebase", "Provider", "Bloc"],
    category: "mobile",
    objectives:
      "Créer une application mobile avec architecture clean et gestion d'état avancée.",
    results:
      "Application stable avec 99.9% d'uptime et architecture scalable pour 10,000+ utilisateurs.",
    demoUrl: "https://maturus-app.com",
    codeUrl: "https://github.com/gaelsassan/maturus",
  },
  {
    id: "6",
    title: "SOSAVC Medical",
    description:
      "Application médicale complète avec gestion de patients et fonctionnalités de télémédecine.",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    technologies: ["Flutter", "Firebase", "Healthcare API", "HIPAA Compliant"],
    category: "medical",
    objectives:
      "Développer une solution de télémédecine sécurisée conforme aux normes HIPAA.",
    results:
      "Amélioration de 40% de l'efficacité des consultations et conformité 100% aux standards médicaux.",
    demoUrl: "https://sosavc-medical.com",
    codeUrl: "https://github.com/gaelsassan/sosavc-medical",
  },
];

export default ProjectsGrid;
