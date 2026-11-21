import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building, Users, Calendar, ExternalLink, Lock } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Counter from "./fx/Counter";
import SectionRail from "./fx/SectionRail";
import { getTechIcon } from "@/lib/techIcons";
import { getCountry } from "@/lib/countries";
import { useLocale, type Localized } from "@/i18n";

interface TeamProject {
  id: string;
  title: Localized<string>;
  company: string;
  description: Localized<string>;
  role: Localized<string>;
  period: Localized<string>;
  teamSize: Localized<string>;
  imageUrl: string;
  technologies: string[];
  achievements: Localized<string[]>;
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
  const { pick } = useLocale();
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
            {pick({ fr: "flux_principal", en: "main_feed" })} // cam_{String(activeIndex + 1).padStart(2, "0")}
            <span className="flex items-center gap-1.5" style={{ color: "#FF4D4D" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#FF4D4D" }} />{pick({ fr: "enr", en: "rec" })}
            </span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--fg-faint)" }}>
            {paused ? pick({ fr: "⏸ en pause", en: "⏸ paused" }) : `${pick({ fr: "flux", en: "feed" })} ${activeIndex + 1}/${projects.length}`}
          </span>
        </div>

        <div className="grid lg:grid-cols-3">
          <div className="relative lg:col-span-2 h-64 sm:h-96 lg:h-[500px] overflow-hidden" style={{ background: "var(--bg)" }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={active.id}
                src={active.imageUrl}
                alt={pick(active.title)}
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
                  <h3 className="text-xl sm:text-2xl font-medium leading-tight mb-1.5">{pick(active.title)}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px]" style={{ color: "var(--fg-muted)" }}>
                    <span className="flex items-center gap-1.5"><Building className="h-3 w-3" />{active.company}</span>
                    <span className="flex items-center gap-1.5"><Users className="h-3 w-3" />{pick(active.teamSize)}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" />{pick(active.period)}</span>
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
                  <h4 className="font-mono text-[9px] mb-2 uppercase tracking-[0.25em]" style={{ color: "var(--fg-faint)" }}>{pick({ fr: "// brief_mission", en: "// mission_brief" })}</h4>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{pick(active.description)}</p>
                </div>

                <div>
                  <h4 className="font-mono text-[9px] mb-2 uppercase tracking-[0.25em]" style={{ color: "var(--fg-faint)" }}>{pick({ fr: "// rôle", en: "// role" })}</h4>
                  <p className="text-xs font-mono" style={{ color: "var(--fg)" }}>{pick(active.role)}</p>
                </div>

                {pick(active.achievements).length > 0 && (
                  <div>
                    <h4 className="font-mono text-[9px] mb-2 uppercase tracking-[0.25em]" style={{ color: "var(--fg-faint)" }}>{pick({ fr: "// points_clés", en: "// highlights" })}</h4>
                    <div className="space-y-1.5">
                      {pick(active.achievements).slice(0, 2).map((a, idx) => (
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
                      {pick({ fr: "voir_flux", en: "view_feed" })}
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
              alt={pick(project.title)}
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
  const { pick } = useLocale();
  const [selectedType, setSelectedType] = useState<string>("all");

  const projectTypes = [
    { value: "all", label: pick({ fr: "tous", en: "all" }) },
    { value: "enterprise", label: pick({ fr: "entreprise", en: "enterprise" }) },
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
      <SectionRail index="04" label={pick({ fr: "salle_de_contrôle", en: "control_room" })} motif="sweep" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader
          index="04"
          label={pick({ fr: "salle_de_contrôle", en: "control_room" })}
          title={pick({ fr: "Projets", en: "Team" })}
          titleHighlight={pick({ fr: "d'équipe", en: "Projects" })}
          description={pick({
            fr: "Des projets collaboratifs auxquels j'ai apporté mon expertise, au sein d'équipes professionnelles et de missions client. Flux en direct depuis le terrain.",
            en: "Collaborative projects where I've contributed my expertise as part of professional teams and client engagements. Live feeds from the field.",
          })}
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
            { label: pick({ fr: "Projets d'équipe", en: "Team Projects" }), value: projects.length },
            { label: pick({ fr: "Entreprises", en: "Companies" }), value: new Set(projects.map(p => p.company)).size },
            { label: pick({ fr: "Technologies", en: "Technologies" }), value: new Set(projects.flatMap(p => p.technologies)).size },
            { label: pick({ fr: "Collaborations", en: "Collaborations" }), value: projects.length },
            { label: pick({ fr: "Pays", en: "Countries" }), value: new Set(projects.flatMap(p => p.countries ?? [])).size },
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

const defaultTeamProjects: TeamProject[] = [
  {
    id: "1",
    title: { fr: "Application bancaire MyBridge Touch", en: "MyBridge Touch Banking App" },
    company: "BRIDGE BANK GROUP",
    description: {
      fr: "Refonte complète et amélioration de l'application de banque mobile, avec des fonctionnalités de sécurité avancées, un support client intégré, une messagerie sécurisée et des transferts d'argent fluides pour des milliers de clients.",
      en: "Complete redesign and enhancement of mobile banking application with advanced security features, customer support integration, secure messaging, and seamless money transfer capabilities for thousands of banking customers.",
    },
    role: { fr: "Développeur mobile", en: "Mobile Developer" },
    period: { fr: "Août 2024 - Déc. 2024", en: "Aug 2024 - Dec 2024" },
    teamSize: { fr: "Équipe Agile de 6 personnes", en: "6-person Agile team" },
    imageUrl: "/images/bridge-bank-preview.webp",
    technologies: ["Flutter", "Firebase", "Banking APIs", "Security", "Customer Support Integration"],
    projectType: "freelance",
    achievements: {
      fr: [
        "Intégration d'un chatbot de support client intelligent avec système de FAQ",
        "Mise en place de la messagerie sécurisée et des transferts d'argent instantanés",
        "Performances améliorées avec des temps de chargement 40 % plus rapides",
        "Développement de l'authentification multifacteur pour une sécurité renforcée",
      ],
      en: [
        "Integrated intelligent customer support chatbot with FAQ system",
        "Implemented secure messaging and instant money transfer features",
        "Enhanced app performance with 40% faster loading times",
        "Developed multi-factor authentication for enhanced security",
      ],
    },
    isNDA: true,
    countries: ["CI", "SN"]
  },
  {
    id: "2",
    title: { fr: "EdoPay - Plateforme de paiement unifiée", en: "EdoPay - Unified Payment Platform" },
    company: "Epines Dorsales SAS",
    description: {
      fr: "Plateforme fintech innovante qui réunit tous les moyens de paiement dans une seule application, avec paiement par QR code, portefeuille numérique et intégration marchande fluide pour l'avenir des paiements.",
      en: "Revolutionary fintech platform unifying all payment methods in one application with QR code technology, digital wallet, and seamless merchant integration for the future of payments.",
    },
    role: { fr: "Développeur full-stack", en: "Full-Stack Developer" },
    period: { fr: "Févr. 2025 - Mars 2025", en: "Feb 2025 - Mar 2025" },
    teamSize: { fr: "Équipe fintech de 8 personnes", en: "8-person fintech team" },
    imageUrl: "/images/edopay-preview.webp",
    technologies: ["Flutter", "Payment APIs", "QR Technology", "Digital Wallet", "Merchant Integration"],
    projectType: "freelance",
    achievements: {
      fr: [
        "Tous les besoins de paiement réunis dans une seule interface",
        "Mise en place du paiement par QR code avec traitement instantané",
        "Gain de temps significatif par rapport aux moyens de paiement traditionnels",
        "Création d'un portefeuille numérique complet avec prise en charge multidevise",
      ],
      en: [
        "Unified all payment needs in single application interface",
        "Implemented QR code payment system with instant processing",
        "Achieved significant time savings compared to traditional payment methods",
        "Built comprehensive digital wallet with multi-currency support",
      ],
    },
    projectUrl: "",
    isNDA: false,
    countries: ["CI"]
  },
  {
    id: "3",
    title: { fr: "Continental Alert - Système de réponse aux urgences", en: "Continental Alert - Emergency Response System" },
    company: "Adjemin",
    description: {
      fr: "Application de sécurité critique offrant des alertes d'urgence en temps réel, le suivi GPS et une communication instantanée avec les services de secours, pour renforcer la sécurité des personnes et des communautés.",
      en: "Critical safety application providing real-time emergency alerts, GPS tracking, and instant communication with emergency services for enhanced personal and community security.",
    },
    role: { fr: "Développeur mobile", en: "Mobile Developer" },
    period: { fr: "Août 2024 - Avr. 2025", en: "Aug 2024 - Apr 2025" },
    teamSize: { fr: "Équipe tech sécurité de 5 personnes", en: "5-person safety tech team" },
    imageUrl: "/images/continental-alert-preview.webp",
    technologies: ["Flutter", "GPS Tracking", "Emergency APIs", "Real-time Communication", "Security"],
    projectType: "enterprise",
    achievements: {
      fr: [
        "Développement du suivi GPS en temps réel pour coordonner les interventions d'urgence",
        "Intégration avec les services de secours locaux pour un traitement rapide des alertes",
        "Gestion sécurisée des profils utilisateurs avec système de contacts d'urgence",
        "Mise en place d'alertes SOS instantanées avec partage de position",
      ],
      en: [
        "Developed real-time GPS tracking for emergency response coordination",
        "Integrated with local emergency services for rapid alert processing",
        "Built secure user profile management with emergency contact system",
        "Implemented instant SOS alerts with location sharing capabilities",
      ],
    },
    isNDA: false,
    countries: ["CI"]
  },
  {
    id: "4",
    title: { fr: "Adjemin - Plateforme de commerce social", en: "Adjemin Social Commerce Platform" },
    company: "Adjemin",
    description: {
      fr: "Marketplace sociale innovante qui associe e-commerce et fonctionnalités communautaires : acheter, vendre, négocier et discuter instantanément au sein d'une place de marché locale.",
      en: "Innovative social marketplace combining e-commerce with community features, enabling users to buy, sell, negotiate, and chat instantly within a local marketplace environment.",
    },
    role: { fr: "Développeur mobile", en: "Mobile Developer" },
    period: { fr: "Août 2024 - Avr. 2025", en: "Aug 2024 - Apr 2025" },
    teamSize: { fr: "Équipe commerce de 7 personnes", en: "7-person commerce team" },
    imageUrl: "/images/adjemin-marketplace-preview.webp",
    technologies: ["Flutter", "Real-time Chat", "E-commerce APIs", "Social Features", "Marketplace"],
    projectType: "enterprise",
    achievements: {
      fr: [
        "Messagerie instantanée en temps réel entre acheteurs et vendeurs",
        "Marketplace complète avec recherche et filtres avancés",
        "Fonctionnalités sociales favorisant l'engagement de la communauté",
        "Système de négociation fluide avec paiement intégré",
      ],
      en: [
        "Built real-time instant messaging system for buyer-seller communication",
        "Developed comprehensive marketplace with advanced search and filtering",
        "Implemented social features encouraging community engagement",
        "Created seamless negotiation system with integrated payment processing",
      ],
    },
    isNDA: false,
    countries: ["CI"]
  },
  {
    id: "5",
    title: { fr: "Jèko - Plateforme de paiement digital", en: "Jèko Digital Payment Platform" },
    company: "Jèko",
    description: {
      fr: "Solution de paiement sans contact nouvelle génération : paiement par QR code, encaissement digital et traitement complet des paiements pour les entreprises et les particuliers.",
      en: "Next-generation contactless payment solution with QR code technology, digital cash collection, and comprehensive payment processing for modern businesses and individuals.",
    },
    role: { fr: "Ingénieur logiciel", en: "Software Engineer" },
    period: { fr: "Avr. 2025 - Aujourd'hui", en: "Apr 2025 - Present" },
    teamSize: { fr: "Équipe fintech de 6 personnes", en: "6-person fintech team" },
    imageUrl: "/images/jeko-payment-preview.webp",
    technologies: ["Flutter", "SvelteKit", "QR Technology", "Contactless Payments", "Mobile Money"],
    projectType: "enterprise",
    achievements: {
      fr: [
        "Développement d'un système d'encaissement sans contact intégrant le QR code",
        "Traitement complet des paiements digitaux avec plusieurs moyens de paiement",
        "Mise en place de liens de paiement pour les transactions à distance",
        "Interface de change simple d'utilisation avec taux en temps réel",
      ],
      en: [
        "Developed contactless payment collection system with QR code integration",
        "Built comprehensive digital payment processing with multiple payment methods",
        "Implemented remote payment links for distance transactions",
        "Created user-friendly money exchange interface with real-time rates",
      ],
    },
    isNDA: false,
    countries: ["CI"]
  },
  {
    id: "6",
    title: { fr: "Telemedan - Plateforme de télémédecine", en: "Telemedan - Telemedicine Platform" },
    company: "Medical Technology Partners",
    description: {
      fr: "Application de télémédecine complète permettant de prendre rendez-vous facilement et de gérer tout le parcours de soins, avec une communication patient-médecin avancée et l'intégration du dossier médical.",
      en: "Comprehensive telemedicine application enabling effortless appointment booking and complete healthcare journey management with advanced patient-doctor communication and medical record integration.",
    },
    role: { fr: "Développeur full-stack", en: "Full-Stack Developer" },
    period: { fr: "2024 - 2025", en: "2024 - 2025" },
    teamSize: { fr: "Équipe e-santé de 8 personnes", en: "8-person healthcare tech team" },
    imageUrl: "/images/telemedan-preview.webp",
    technologies: ["Flutter", "Telemedicine APIs", "Healthcare Integration", "Appointment Management", "Patient Records"],
    projectType: "collaboration",
    achievements: {
      fr: [
        "Système complet de prise de rendez-vous avec disponibilités en temps réel",
        "Plateforme de communication sécurisée patient-médecin avec messagerie intégrée",
        "Suivi complet du parcours de soins, de la consultation au suivi",
        "Interface intuitive optimisant l'expérience patient et le travail médical",
      ],
      en: [
        "Developed comprehensive appointment booking system with real-time availability",
        "Built secure patient-doctor communication platform with messaging integration",
        "Implemented complete healthcare journey tracking from consultation to follow-up",
        "Created intuitive user interface optimizing patient experience and medical workflow",
      ],
    },
    projectUrl: "",
    isNDA: false,
    countries: ["TD"]
  },
  {
    id: "7",
    title: { fr: "MaCom - Plateforme Créative", en: "MaCom - Creative Platform" },
    company: "MaCom",
    description: {
      fr: "Plateforme digitale facilitant la mise en relation entre professionnels de la communication (graphistes, community managers, vidéastes, photographes) et clients à la recherche de prestations créatives ou marketing. Services annexes : banque d'images (20,000+ photos), panneaux publicitaires, CV Maker et impression.",
      en: "Digital platform connecting communication professionals (graphic designers, community managers, videographers, photographers) with clients looking for creative or marketing services. Additional services: image bank (20,000+ photos), billboards, CV Maker and printing.",
    },
    role: { fr: "Développeur mobile (UI v2)", en: "Mobile Developer (UI v2)" },
    period: { fr: "2024 - 2025", en: "2024 - 2025" },
    teamSize: { fr: "Équipe tech créative de 5 personnes", en: "5-person creative tech team" },
    imageUrl: "/images/macom-preview.jpeg",
    technologies: ["Flutter", "Firebase", "REST API", "Cloud Storage", "Real-time Chat", "Payment Integration"],
    projectType: "freelance",
    achievements: {
      fr: [
        "Refonte complète de l'interface utilisateur (UI v2) avec design moderne et vibrant",
        "Développement de la banque d'images avec 20,000+ photos catégorisées (Business, Nature, Tech, Lifestyle)",
        "Intégration du système de panneaux publicitaires et CV Maker",
        "Implémentation du système de filtrage par catégories avec contenus Premium",
      ],
      en: [
        "Complete user interface redesign (UI v2) with a modern, vibrant design",
        "Built the image bank with 20,000+ categorized photos (Business, Nature, Tech, Lifestyle)",
        "Integrated the billboard system and CV Maker",
        "Implemented category filtering with Premium content",
      ],
    },
    projectUrl: "",
    isNDA: false,
    countries: ["CI"]
  },
  {
    id: "8",
    title: { fr: "DMG - Gestion Administrative", en: "DMG - Administrative Management" },
    company: "Government of Côte d'Ivoire",
    description: {
      fr: "Hub central de gestion administrative pour la Direction et Management Général (DMG). Plateforme web complète intégrant 17 services : courriers, bons, rendez-vous, accueil visiteurs, historique visites, GRIS/GIS, coordonnateur, logs SMS, archives, gestion du personnel, comptabilité, parc auto et webmasters.",
      en: "Central administrative management hub for the Direction et Management Général (DMG). A complete web platform integrating 17 services: mail, vouchers, appointments, visitor reception, visit history, GRIS/GIS, coordinator, SMS logs, archives, staff management, accounting, vehicle fleet and webmasters.",
    },
    role: { fr: "Développeur full-stack", en: "Full-Stack Developer" },
    period: { fr: "2023 - Aujourd'hui", en: "2023 - Present" },
    teamSize: { fr: "Équipe tech gouvernementale de 6 personnes", en: "6-person government tech team" },
    imageUrl: "/images/dmg-dashboard-preview.webp",
    technologies: ["SvelteKit", "Laravel", "REST API", "PostgreSQL", "Role-Based Access", "SMS Integration", "Document Management"],
    projectType: "enterprise",
    achievements: {
      fr: [
        "Développement du tableau de bord centralisé avec accès rapide aux 17 services administratifs",
        "Implémentation du système de gestion des courriers et bons avec workflow de validation",
        "Création du module de gestion des rendez-vous et accueil visiteurs avec suivi en temps réel",
        "Intégration du système GRIS/GIS et gestion du parc automobile avec logs SMS automatisés",
        "Mise en place du contrôle d'accès basé sur les rôles (Directeur DMG, Coordonnateur, Webmaster)",
      ],
      en: [
        "Built the centralized dashboard with quick access to the 17 administrative services",
        "Implemented mail and voucher management with an approval workflow",
        "Created the appointment and visitor reception module with real-time tracking",
        "Integrated the GRIS/GIS system and vehicle fleet management with automated SMS logs",
        "Set up role-based access control (DMG Director, Coordinator, Webmaster)",
      ],
    },
    projectUrl: "",
    isNDA: true,
    countries: ["CI"]
  },
  {
    id: "9",
    title: { fr: "Transfert CI - Maintenance Mobile", en: "Transfert CI - Mobile Maintenance" },
    company: "Transfert CI",
    description: {
      fr: "Maintenance et évolution de l'application Transfert CI, plateforme de transfert d'argent et services financiers en Côte d'Ivoire. Conversion de l'application web React existante en application mobile cross-platform via Ionic Capacitor pour offrir une expérience native sur iOS et Android sans refonte complète du code.",
      en: "Maintenance and evolution of the Transfert CI app, a money transfer and financial services platform in Ivory Coast. Converted the existing React web app into a cross-platform mobile app with Ionic Capacitor, delivering a native experience on iOS and Android without a full rewrite.",
    },
    role: { fr: "Développeur mobile (maintenance)", en: "Mobile Developer (Maintenance)" },
    period: { fr: "2025", en: "2025" },
    teamSize: { fr: "Équipe technique fintech", en: "Fintech engineering team" },
    imageUrl: "/images/transfert-ci-preview.webp",
    technologies: ["React", "Ionic", "Capacitor", "TypeScript", "iOS", "Android", "REST API"],
    projectType: "freelance",
    achievements: {
      fr: [
        "Conversion de l'application React web en application mobile native via Ionic Capacitor",
        "Maintenance évolutive et corrective de l'application en production",
        "Adaptation du code React existant pour le packaging iOS et Android",
        "Optimisation des performances et de l'expérience utilisateur sur mobile",
      ],
      en: [
        "Converted the React web app into a native mobile app with Ionic Capacitor",
        "Evolutionary and corrective maintenance of the production app",
        "Adapted the existing React code for iOS and Android packaging",
        "Optimized performance and mobile user experience",
      ],
    },
    projectUrl: "",
    isNDA: false,
    countries: ["CI"]
  }
];

export default TeamProjects;
