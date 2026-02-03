import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Building, Users, Calendar, ExternalLink, Award } from "lucide-react";

interface TeamProject {
  id: string;
  title: string;
  company: string;
  description: string;
  role: string;
  period: string;
  teamSize: string;
  imageUrl: string;
  technologies: string[];
  achievements: string[];
  projectType: "enterprise" | "freelance" | "collaboration";
  projectUrl?: string;
  isNDA?: boolean;
}

interface TeamProjectsProps {
  projects?: TeamProject[];
}

const TeamProjects = ({ projects = defaultTeamProjects }: TeamProjectsProps) => {
  const [selectedType, setSelectedType] = useState<string>("all");

  const projectTypes = [
    { value: "all", label: "All Projects", icon: "🚀" },
    { value: "enterprise", label: "Enterprise", icon: "🏢" },
    { value: "freelance", label: "Freelance", icon: "💼" },
    { value: "collaboration", label: "Collaboration", icon: "🤝" },
  ];

  const filteredProjects = selectedType === "all" 
    ? projects 
    : projects.filter(project => project.projectType === selectedType);

  const getProjectTypeColor = (type: string) => {
    switch (type) {
      case "enterprise": return "border-blue-500/30 text-blue-400";
      case "freelance": return "border-green-500/30 text-green-400";
      case "collaboration": return "border-purple-500/30 text-purple-400";
      default: return "border-gray-500/30 text-gray-400";
    }
  };

  return (
    <section
      id="team-projects"
      className="py-24 px-6 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
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
              Collaborative Work
            </span>
            <div className="w-12 h-px bg-primary"></div>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Team</span>
            <span className="gradient-text"> Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Collaborative projects where I've contributed my expertise as part of professional teams and client engagements.
          </p>
        </motion.div>

        {/* Project Type Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {projectTypes.map((type) => (
            <motion.button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                selectedType === type.value
                  ? "bg-primary text-black glow-effect"
                  : "glass-effect text-gray-300 hover:text-primary hover:border-primary/50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{type.icon}</span>
              {type.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-effect border-white/10 hover-lift h-full flex flex-col">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {project.isNDA && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="outline" className="bg-red-500/20 border-red-500/30 text-red-400">
                        NDA
                      </Badge>
                    </div>
                  )}
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 text-primary text-sm font-medium">
                        <Building className="h-4 w-4" />
                        {project.company}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getProjectTypeColor(project.projectType)}`}
                    >
                      {project.projectType}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="flex-grow space-y-4">
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Project Details */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <Award className="h-3 w-3" />
                      <span className="font-medium">Role:</span>
                      <span>{project.role}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <Calendar className="h-3 w-3" />
                      <span>{project.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <Users className="h-3 w-3" />
                      <span>{project.teamSize}</span>
                    </div>
                  </div>

                  {/* Key Achievements */}
                  {project.achievements.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-white mb-2 flex items-center gap-1">
                        🏆 Key Contributions
                      </h4>
                      <div className="space-y-1">
                        {project.achievements.slice(0, 2).map((achievement, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-400 text-xs leading-relaxed">
                              {achievement}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technologies */}
                  <div>
                    <h4 className="text-xs font-semibold text-white mb-2">🛠️ Technologies</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 4).map((tech, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="border-primary/20 text-white bg-primary/5 text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge
                          variant="outline"
                          className="border-gray-500/20 text-gray-400 bg-gray-500/5 text-xs"
                        >
                          +{project.technologies.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Project Link */}
                  {project.projectUrl && !project.isNDA && (
                    <div className="pt-2">
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm"
                      >
                        <ExternalLink className="h-3 w-3" />
                        View Project
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Summary */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { label: "Team Projects", value: projects.length.toString(), icon: "🚀" },
            { label: "Companies Worked With", value: new Set(projects.map(p => p.company)).size.toString(), icon: "🏢" },
            { label: "Technologies Used", value: new Set(projects.flatMap(p => p.technologies)).size.toString(), icon: "🛠️" },
            { label: "Team Collaborations", value: projects.length.toString(), icon: "🤝" },
          ].map((stat, index) => (
            <div key={index} className="text-center glass-effect p-6 rounded-xl">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Real team projects based on your actual work
const defaultTeamProjects: TeamProject[] = [
  {
    id: "1",
    title: "MyBridge Touch Banking App",
    company: "BRIDGE BANK GROUP",
    description: "Complete redesign and enhancement of mobile banking application with advanced security features, customer support integration, secure messaging, and seamless money transfer capabilities for thousands of banking customers.",
    role: "Mobile Developer",
    period: "Aug 2024 - Dec 2024",
    teamSize: "6-person Agile team",
    imageUrl: "./images/bridge-bank-preview.webp",
    technologies: ["Flutter", "Firebase", "Banking APIs", "Security", "Customer Support Integration"],
    projectType: "freelance",
    achievements: [
      "Integrated intelligent customer support chatbot with FAQ system",
      "Implemented secure messaging and instant money transfer features",
      "Enhanced app performance with 40% faster loading times",
      "Developed multi-factor authentication for enhanced security"
    ],
    isNDA: true
  },
  {
    id: "2",
    title: "EdoPay - Unified Payment Platform",
    company: "Epines Dorsales SAS",
    description: "Revolutionary fintech platform unifying all payment methods in one application with QR code technology, digital wallet, and seamless merchant integration for the future of payments.",
    role: "Full-Stack Developer",
    period: "Feb 2025 - Mar 2025",
    teamSize: "8-person fintech team",
    imageUrl: "./images/edopay-preview.webp",
    technologies: ["Flutter", "Payment APIs", "QR Technology", "Digital Wallet", "Merchant Integration"],
    projectType: "freelance",
    achievements: [
      "Unified all payment needs in single application interface",
      "Implemented QR code payment system with instant processing",
      "Achieved significant time savings compared to traditional payment methods",
      "Built comprehensive digital wallet with multi-currency support"
    ],
    projectUrl: "",
    isNDA: false
  },
  {
    id: "3",
    title: "Continental Alert - Emergency Response System",
    company: "Adjemin",
    description: "Critical safety application providing real-time emergency alerts, GPS tracking, and instant communication with emergency services for enhanced personal and community security.",
    role: "Mobile Developer", 
    period: "Aug 2024 - Apr 2025",
    teamSize: "5-person safety tech team",
    imageUrl: "./images/continental-alert-preview.webp",
    technologies: ["Flutter", "GPS Tracking", "Emergency APIs", "Real-time Communication", "Security"],
    projectType: "enterprise",
    achievements: [
      "Developed real-time GPS tracking for emergency response coordination",
      "Integrated with local emergency services for rapid alert processing",
      "Built secure user profile management with emergency contact system",
      "Implemented instant SOS alerts with location sharing capabilities"
    ],
    isNDA: false
  },
  {
    id: "4",
    title: "Adjemin Social Commerce Platform",
    company: "Adjemin",
    description: "Innovative social marketplace combining e-commerce with community features, enabling users to buy, sell, negotiate, and chat instantly within a local marketplace environment.",
    role: "Mobile Developer",
    period: "Aug 2024 - Apr 2025", 
    teamSize: "7-person commerce team",
    imageUrl: "./images/adjemin-marketplace-preview.webp",
    technologies: ["Flutter", "Real-time Chat", "E-commerce APIs", "Social Features", "Marketplace"],
    projectType: "enterprise",
    achievements: [
      "Built real-time instant messaging system for buyer-seller communication",
      "Developed comprehensive marketplace with advanced search and filtering",
      "Implemented social features encouraging community engagement",
      "Created seamless negotiation system with integrated payment processing"
    ],
    isNDA: false
  },
  {
    id: "5",
    title: "Jèko Digital Payment Platform",
    company: "Jèko",
    description: "Next-generation contactless payment solution with QR code technology, digital cash collection, and comprehensive payment processing for modern businesses and individuals.",
    role: "Software Engineer",
    period: "Apr 2025 - Present",
    teamSize: "6-person fintech team",
    imageUrl: "./images/jeko-payment-preview.webp",
    technologies: ["Flutter", "SvelteKit", "QR Technology", "Contactless Payments", "Mobile Money"],
    projectType: "enterprise",
    achievements: [
      "Developed contactless payment collection system with QR code integration",
      "Built comprehensive digital payment processing with multiple payment methods",
      "Implemented remote payment links for distance transactions",
      "Created user-friendly money exchange interface with real-time rates"
    ],
    isNDA: false
  },
   {
    id: "6",
    title: "Telemedan - Telemedicine Platform",
    company: "Medical Technology Partners",
    description: "Comprehensive telemedicine application enabling effortless appointment booking and complete healthcare journey management with advanced patient-doctor communication and medical record integration.",
    role: "Full-Stack Developer",
    period: "2024 - 2025",
    teamSize: "8-person healthcare tech team",
    imageUrl: "./images/telemedan-preview.webp",
    technologies: ["Flutter", "Telemedicine APIs", "Healthcare Integration", "Appointment Management", "Patient Records"],
    projectType: "collaboration",
    achievements: [
      "Developed comprehensive appointment booking system with real-time availability",
      "Built secure patient-doctor communication platform with messaging integration",
      "Implemented complete healthcare journey tracking from consultation to follow-up",
      "Created intuitive user interface optimizing patient experience and medical workflow"
    ],
    projectUrl: "",
    isNDA: false
  },
  {
    id: "7",
    title: "MaCom - Plateforme Créative",
    company: "MaCom",
    description: "Plateforme digitale facilitant la mise en relation entre professionnels de la communication (graphistes, community managers, vidéastes, photographes) et clients à la recherche de prestations créatives ou marketing. Services annexes : banque d'images (20,000+ photos), panneaux publicitaires, CV Maker et impression.",
    role: "Mobile Developer (UI v2)",
    period: "2024 - 2025",
    teamSize: "5-person creative tech team",
    imageUrl: "./images/macom-preview.jpeg",
    technologies: ["Flutter", "Firebase", "REST API", "Cloud Storage", "Real-time Chat", "Payment Integration"],
    projectType: "freelance",
    achievements: [
      "Refonte complète de l'interface utilisateur (UI v2) avec design moderne et vibrant",
      "Développement de la banque d'images avec 20,000+ photos catégorisées (Business, Nature, Tech, Lifestyle)",
      "Intégration du système de panneaux publicitaires et CV Maker",
      "Implémentation du système de filtrage par catégories avec contenus Premium"
    ],
    projectUrl: "",
    isNDA: false
  }
];

export default TeamProjects;