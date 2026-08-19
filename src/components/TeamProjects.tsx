import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building, Users, Calendar, ExternalLink, Lock } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Counter from "./fx/Counter";
import SectionRail from "./fx/SectionRail";
import { getTechIcon } from "@/lib/techIcons";
import { getCountry } from "@/lib/countries";

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
  countries?: string[];
}

interface TeamProjectsProps {
  projects?: TeamProject[];
}

const FEED_DURATION = 6;

const MonitoringRoom = ({ projects }: { projects: TeamProject[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const active = projects[Math.min(activeIndex, projects.length - 1)];

  useEffect(() => {
    setActiveIndex(0);
  }, [projects]);

  useEffect(() => {
    if (paused || projects.length <= 1) return;
    const t = setInterval(() => {
      setActiveIndex((i) => (i + 1) % projects.length);
    }, FEED_DURATION * 1000);
    return () => clearInterval(t);
  }, [paused, projects.length, activeIndex]);

  if (!active) return null;

  const resolvedCountries = (active.countries ?? [])
    .map((code) => getCountry(code))
    .filter((c): c is NonNullable<ReturnType<typeof getCountry>> => Boolean(c));

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="panel rounded-xl overflow-hidden hud-corners"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-elevated)" }}>
          <span className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--accent)" }}>
            main_feed // cam_{String(activeIndex + 1).padStart(2, "0")}
            <span className="flex items-center gap-1.5" style={{ color: "#FF4D4D" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#FF4D4D" }} />rec
            </span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--fg-faint)" }}>
            {paused ? "⏸ paused" : `feed ${activeIndex + 1}/${projects.length}`}
          </span>
        </div>

        <div className="grid lg:grid-cols-3">
          <div className="relative lg:col-span-2 h-64 sm:h-96 lg:h-[500px] overflow-hidden" style={{ background: "var(--bg)" }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={active.id}
                src={active.imageUrl}
                alt={active.title}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.06, filter: "brightness(2) saturate(0)" }}
                animate={{ opacity: 1, scale: 1, filter: "brightness(1) saturate(1)" }}
                exit={{ opacity: 0, filter: "brightness(0.3) saturate(0)" }}
                transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(5,6,10,0.5) 100%)" }} />

            {active.isNDA && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 rounded font-mono text-[9px] uppercase tracking-wider" style={{ background: "rgba(5,6,10,0.85)", border: "1px solid var(--border-medium)", color: "var(--fg-muted)" }}>
                <Lock className="h-2.5 w-2.5" />NDA
              </div>
            )}

            <div className="absolute bottom-0 inset-x-0 px-5 pb-4 pt-14" style={{ background: "linear-gradient(to top, rgba(5,6,10,0.95), transparent)" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3 className="text-xl sm:text-2xl font-medium leading-tight mb-1.5">{active.title}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px]" style={{ color: "var(--fg-muted)" }}>
                    <span className="flex items-center gap-1.5"><Building className="h-3 w-3" />{active.company}</span>
                    <span className="flex items-center gap-1.5"><Users className="h-3 w-3" />{active.teamSize}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" />{active.period}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {!paused && (
              <motion.div
                key={`progress-${active.id}`}
                className="absolute bottom-0 left-0 h-[2px] origin-left"
                style={{ background: "var(--accent)", width: "100%" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: FEED_DURATION, ease: "linear" }}
              />
            )}
          </div>

          <div className="p-5 lg:p-6 flex flex-col gap-4" style={{ borderLeft: "1px solid var(--border-subtle)" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className="flex flex-col gap-4 flex-grow"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.35 }}
              >
                <div>
                  <h4 className="font-mono text-[9px] mb-2 uppercase tracking-[0.25em]" style={{ color: "var(--fg-faint)" }}>// mission_brief</h4>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{active.description}</p>
                </div>

                <div>
                  <h4 className="font-mono text-[9px] mb-2 uppercase tracking-[0.25em]" style={{ color: "var(--fg-faint)" }}>// role</h4>
                  <p className="text-xs font-mono" style={{ color: "var(--fg)" }}>{active.role}</p>
                </div>

                {active.achievements.length > 0 && (
                  <div>
                    <h4 className="font-mono text-[9px] mb-2 uppercase tracking-[0.25em]" style={{ color: "var(--fg-faint)" }}>// highlights</h4>
                    <div className="space-y-1.5">
                      {active.achievements.slice(0, 2).map((a, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="font-mono text-[9px] mt-0.5" style={{ color: "var(--accent)" }}>+</span>
                          <p className="text-[11px] leading-relaxed" style={{ color: "var(--fg-muted)" }}>{a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-1">
                  {active.technologies.slice(0, 6).map((tech, idx) => {
                    const icon = getTechIcon(tech);
                    return (
                      <span key={idx}
                        className="inline-flex items-center gap-1.5 font-mono text-[9px] px-2 py-1 rounded"
                        style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", color: "var(--fg-muted)" }}
                      >
                        {icon && <img src={icon} alt="" className="w-3 h-3" />}
                        {tech}
                      </span>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between mt-auto pt-2">
                  {resolvedCountries.length > 0 && (
                    <span className="flex gap-1 text-sm">
                      {resolvedCountries.map((c) => (
                        <span key={c.code} title={c.name}>{c.flag}</span>
                      ))}
                    </span>
                  )}
                  {active.projectUrl && !active.isNDA && (
                    <a
                      href={active.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider transition-colors hover:text-[var(--accent)] animated-underline"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      <ExternalLink className="h-3 w-3" />
                      view_feed
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-2 mt-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "thin" }}>
        {projects.map((project, i) => (
          <button
            key={project.id}
            onClick={() => setActiveIndex(i)}
            className="group relative flex-shrink-0 w-28 sm:w-32 rounded overflow-hidden transition-all duration-300"
            style={{
              border: `1px solid ${i === activeIndex ? "var(--accent)" : "var(--border-subtle)"}`,
              boxShadow: i === activeIndex ? "0 0 16px rgba(0,229,255,0.25)" : "none",
            }}
            data-cursor="switch"
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className={`w-full h-16 sm:h-20 object-cover transition-all duration-300 ${i === activeIndex ? "" : "grayscale opacity-50 group-hover:opacity-80"}`}
            />
            <span
              className="absolute bottom-0 inset-x-0 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] truncate text-left"
              style={{
                background: "rgba(5,6,10,0.85)",
                color: i === activeIndex ? "var(--accent)" : "var(--fg-faint)",
              }}
            >
              cam_{String(i + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

const TeamProjects = ({ projects = defaultTeamProjects }: TeamProjectsProps) => {
  const [selectedType, setSelectedType] = useState<string>("all");

  const projectTypes = [
    { value: "all", label: "all" },
    { value: "enterprise", label: "enterprise" },
    { value: "freelance", label: "freelance" },
    { value: "collaboration", label: "collab" },
  ];

  const filteredProjects = selectedType === "all"
    ? projects
    : projects.filter(project => project.projectType === selectedType);

  return (
    <section
      id="team-projects"
      className="min-h-screen py-32 lg:py-44 px-6 relative"
    >
      <SectionRail index="04" label="control_room" motif="sweep" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader
          index="04"
          label="control_room"
          title="Team"
          titleHighlight="Projects"
          description="Collaborative projects where I've contributed my expertise as part of professional teams and client engagements. Live feeds from the field."
        />

        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {projectTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className="px-4 py-2 rounded font-mono text-[10px] uppercase tracking-[0.15em] transition-all duration-300"
              style={{
                background: selectedType === type.value ? "var(--accent)" : "transparent",
                color: selectedType === type.value ? "var(--bg)" : "var(--fg-muted)",
                border: `1px solid ${selectedType === type.value ? "var(--accent)" : "var(--border-medium)"}`,
              }}
            >
              {type.label}
            </button>
          ))}
        </motion.div>

        <MonitoringRoom projects={filteredProjects} />

        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {[
            { label: "Team Projects", value: projects.length },
            { label: "Companies", value: new Set(projects.map(p => p.company)).size },
            { label: "Technologies", value: new Set(projects.flatMap(p => p.technologies)).size },
            { label: "Collaborations", value: projects.length },
            { label: "Countries", value: new Set(projects.flatMap(p => p.countries ?? [])).size },
          ].map((stat, index) => (
            <div key={index} className="text-center panel p-6 rounded-xl tentacle-glow">
              <Counter value={stat.value} className="block text-2xl lg:text-3xl font-semibold mb-1" />
              <div className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--fg-faint)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="tentacle-line mt-28 max-w-md mx-auto"></div>
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
    isNDA: true,
    countries: ["CI", "SN"]
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
    isNDA: false,
    countries: ["CI"]
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
    isNDA: false,
    countries: ["CI"]
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
    isNDA: false,
    countries: ["CI"]
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
    isNDA: false,
    countries: ["CI"]
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
    isNDA: false,
    countries: ["TD"]
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
    isNDA: false,
    countries: ["CI"]
},
  {
    id: "8",
    title: "DMG - Gestion Administrative",
    company: "Government of Côte d'Ivoire",
    description: "Hub central de gestion administrative pour la Direction et Management Général (DMG). Plateforme web complète intégrant 17 services : courriers, bons, rendez-vous, accueil visiteurs, historique visites, GRIS/GIS, coordonnateur, logs SMS, archives, gestion du personnel, comptabilité, parc auto et webmasters.",
    role: "Full-Stack Developer",
    period: "2023 - Present",
    teamSize: "6-person government tech team",
    imageUrl: "./images/dmg-dashboard-preview.webp",
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
    isNDA: true,
    countries: ["CI"]
},
  {
    id: "9",
    title: "Transfert CI - Maintenance Mobile",
    company: "Transfert CI",
    description: "Maintenance et évolution de l'application Transfert CI, plateforme de transfert d'argent et services financiers en Côte d'Ivoire. Conversion de l'application web React existante en application mobile cross-platform via Ionic Capacitor pour offrir une expérience native sur iOS et Android sans refonte complète du code.",
    role: "Mobile Developer (Maintenance)",
    period: "2025",
    teamSize: "Équipe technique fintech",
    imageUrl: "./images/transfert-ci-preview.webp",
    technologies: ["React", "Ionic", "Capacitor", "TypeScript", "iOS", "Android", "REST API"],
    projectType: "freelance",
    achievements: [
      "Conversion de l'application React web en application mobile native via Ionic Capacitor",
      "Maintenance évolutive et corrective de l'application en production",
      "Adaptation du code React existant pour le packaging iOS et Android",
      "Optimisation des performances et de l'expérience utilisateur sur mobile"
    ],
    projectUrl: "",
    isNDA: false,
    countries: ["CI"]
}
];

export default TeamProjects;