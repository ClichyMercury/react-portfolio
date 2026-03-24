import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { Building, Users, Calendar, ExternalLink } from "lucide-react";
import SectionHeader from "./SectionHeader";
import NebulaOrbs from "./NebulaOrbs";
import { getTechIcon } from "@/lib/techIcons";

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
    { value: "all", label: "All" },
    { value: "enterprise", label: "Enterprise" },
    { value: "freelance", label: "Freelance" },
    { value: "collaboration", label: "Collaboration" },
  ];

  const filteredProjects = selectedType === "all"
    ? projects
    : projects.filter(project => project.projectType === selectedType);

  return (
    <section
      id="team-projects"
      className="min-h-screen py-40 lg:py-52 px-6 relative overflow-hidden"
    >
      <NebulaOrbs variant="cyber" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader
          label="Collaborative Work"
          title="Team"
          titleHighlight="Projects"
          description="Collaborative projects where I've contributed my expertise as part of professional teams and client engagements."
        />

        {/* Filter - Apple segmented control */}
        <motion.div
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex gap-1 p-1 rounded-full" style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-card)" }}>
            {projectTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className="px-6 py-2.5 rounded-full text-xs font-medium tracking-[0.12em] transition-all duration-400"
                style={{
                  background: selectedType === type.value ? "var(--accent)" : "transparent",
                  color: selectedType === type.value ? "var(--bg)" : "var(--fg-muted)",
                }}
              >
                {type.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              viewport={{ once: true }}
            >
              <div className="glass-effect rounded-2xl hover-lift tentacle-glow h-full flex flex-col overflow-hidden group">
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  {project.isNDA && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="outline" className="bg-white/10 border-white/20 text-white/60 text-[10px]">
                        NDA
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="p-5 flex-grow flex flex-col space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-white/80 mb-1 line-clamp-1">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 text-white/40 text-xs">
                        <Building className="h-3 w-3" />
                        {project.company}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-white/10 text-white/30 text-[9px] uppercase tracking-wider"
                    >
                      {project.projectType}
                    </Badge>
                  </div>

                  <p className="text-white/30 text-xs leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-1.5 text-white/25 text-[11px]">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {project.period}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      {project.teamSize}
                    </div>
                  </div>

                  {/* Achievements */}
                  {project.achievements.length > 0 && (
                    <div>
                      <div className="space-y-1">
                        {project.achievements.slice(0, 2).map((achievement, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-white/20 rounded-full mt-1.5 flex-shrink-0"></div>
                            <p className="text-white/30 text-[11px] leading-relaxed">
                              {achievement}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mt-auto pt-2">
                    {project.technologies.slice(0, 4).map((tech, idx) => {
                      const icon = getTechIcon(tech);
                      return (
                        <span key={idx}
                          className="inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full"
                          style={{ border: "1px solid var(--border-medium)", color: "var(--fg-muted)" }}
                        >
                          {icon && <img src={icon} alt="" className="w-3.5 h-3.5" />}
                          {tech}
                        </span>
                      );
                    })}
                    {project.technologies.length > 4 && (
                      <Badge
                        variant="outline"
                        className="border-white/[0.05] text-white/20 bg-transparent text-[10px] px-2 py-0.5"
                      >
                        +{project.technologies.length - 4}
                      </Badge>
                    )}
                  </div>

                  {project.projectUrl && !project.isNDA && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors text-xs animated-underline w-fit"
                    >
                      <ExternalLink className="h-3 w-3" />
                      View Project
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { label: "Team Projects", value: projects.length.toString() },
            { label: "Companies", value: new Set(projects.map(p => p.company)).size.toString() },
            { label: "Technologies", value: new Set(projects.flatMap(p => p.technologies)).size.toString() },
            { label: "Collaborations", value: projects.length.toString() },
          ].map((stat, index) => (
            <div key={index} className="text-center glass-effect p-8 rounded-2xl tentacle-glow">
              <div className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                {stat.value}
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--fg-faint)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="tentacle-line mt-32 max-w-md mx-auto"></div>
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
  },
  {
    id: "8",
    title: "DMG - Gestion Administrative",
    company: "Government of Côte d'Ivoire",
    description: "Hub central de gestion administrative pour la Direction et Management Général (DMG). Plateforme web complète intégrant 17 services : courriers, bons, rendez-vous, accueil visiteurs, historique visites, GRIS/GIS, coordonnateur, logs SMS, archives, gestion du personnel, comptabilité, parc auto et webmasters.",
    role: "Full-Stack Developer",
    period: "2023 - Present",
    teamSize: "6-person government tech team",
    imageUrl: "./images/dmg-dashboard-preview.png",
    technologies: ["SvelteKit", "Laravel", "REST API", "PostgreSQL", "Role-Based Access", "SMS Integration", "Document Management"],
    projectType: "enterprise",
    achievements: [
      "Développement du tableau de bord centralisé avec accès rapide aux 17 services administratifs",
      "Implémentation du système de gestion des courriers et bons avec workflow de validation",
      "Création du module de gestion des rendez-vous et accueil visiteurs avec suivi en temps réel",
      "Intégration du système GRIS/GIS et gestion du parc automobile avec logs SMS automatisés",
      "Mise en place du contrôle d'accès basé sur les rôles (Directeur DMG, Coordonnateur, Webmaster)"
    ],
    projectUrl: "",
    isNDA: true
  }
];

export default TeamProjects;