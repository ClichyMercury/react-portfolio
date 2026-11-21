import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronRight, Building } from "lucide-react";
import SectionHeader from "./SectionHeader";
import SectionRail from "./fx/SectionRail";
import { getTechIcon } from "@/lib/techIcons";
import { useLocale, type Locale, type Localized } from "@/i18n";

export interface Experience {
  id: string;
  company: string;
  companyFr?: string;
  logo?: string;
  role: Localized<string>;
  period: Localized<string>;
  location: Localized<string>;
  description: Localized<string>;
  achievements: Localized<string[]>;
  technologies: string[];
  type: "professional" | "freelance" | "personal";
}

export const companyName = (e: Experience, locale: "fr" | "en") => (locale === "fr" && e.companyFr ? e.companyFr : e.company);


interface ExperienceSectionProps {
  experiences?: Experience[];
}

const pseudoHash = (seed: string) => {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(16).padStart(7, "0").slice(0, 7);
};

const TYPE_LABEL: Record<Experience["type"], Localized<string>> = {
  professional: { fr: "salarié", en: "employee" },
  freelance: { fr: "freelance", en: "freelance" },
  personal: { fr: "perso", en: "personal" },
};

const FR_SHORT_MONTHS: Record<string, string> = {
  Janvier: "Janv.",
  Février: "Févr.",
  Mars: "Mars",
  Avril: "Avr.",
  Mai: "Mai",
  Juin: "Juin",
  Juillet: "Juil.",
  Août: "Août",
  Septembre: "Sept.",
  Octobre: "Oct.",
  Novembre: "Nov.",
  Décembre: "Déc.",
};

const shortPeriod = (period: string, locale: Locale) =>
  (locale === "fr"
    ? period.replace(/Janvier|Février|Mars|Avril|Mai|Juin|Juillet|Août|Septembre|Octobre|Novembre|Décembre/g, (m) => FR_SHORT_MONTHS[m])
    : period.replace(/January|February|March|April|May|June|July|August|September|October|November|December/g, (m) => m.slice(0, 3))
  ).replace(" - ", " → ");

const ExperienceSection = ({
  experiences = defaultExperiences,
}: ExperienceSectionProps) => {
  const { locale, pick } = useLocale();
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id ?? null);

  return (
    <section
      id="experience"
      className="min-h-screen py-32 lg:py-44 px-6 relative"
    >
      <SectionRail index="07" label={pick({ fr: "historique_commits", en: "commit_history" })} motif="leds" />
      <div className="relative z-10 max-w-5xl mx-auto">
        <SectionHeader
          index="07"
          label={pick({ fr: "historique_commits", en: "commit_history" })}
          title={pick({ fr: "Parcours", en: "Career" })}
          titleHighlight="Git Log"
          description={pick({
            fr: "Chaque poste, fusionné dans main. Cliquez sur un commit pour l'inspecter.",
            en: "Every role, merged into main. Click a commit to inspect it.",
          })}
        />

        <div className="panel rounded-xl overflow-hidden hud-corners">
          <div className="flex items-center gap-3 px-4 sm:px-5 py-3 font-mono text-[11px]" style={{ background: "var(--bg-elevated)", borderBottom: "1px solid var(--border-subtle)" }}>
            <span style={{ color: "var(--accent)" }}>$</span>
            <span style={{ color: "var(--fg)" }}>git log --oneline --all</span>
            <span className="animate-blink inline-block w-[7px] h-[12px]" style={{ background: "var(--accent)" }} />
            <span className="ml-auto hidden sm:inline text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--fg-faint)" }}>
              {experiences.length} commits
            </span>
          </div>

          <div className="relative">
            <div className="absolute left-[26px] sm:left-[30px] top-0 bottom-0 w-[1px]" style={{ background: "var(--border-medium)" }} />

            {experiences.map((experience, index) => {
              const isOpen = expandedId === experience.id;
              const hash = pseudoHash(experience.company + experience.role.en);
              return (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.05 }}
                  viewport={{ once: true }}
                  style={{ borderBottom: index < experiences.length - 1 || isOpen ? "1px solid var(--border-subtle)" : "none" }}
                >
                  <button
                    onClick={() => setExpandedId(isOpen ? null : experience.id)}
                    className="relative w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 text-left transition-colors duration-300 hover:bg-[rgba(0,229,255,0.03)]"
                    data-cursor={isOpen ? "collapse" : "inspect"}
                  >
                    <span
                      className="relative z-10 flex-shrink-0 w-[13px] h-[13px] rounded-full ml-[3px] sm:ml-[5px]"
                      style={{
                        background: "var(--bg)",
                        border: `2px solid ${index === 0 ? "var(--accent)" : isOpen ? "var(--fg-muted)" : "var(--border-medium)"}`,
                        boxShadow: index === 0 ? "0 0 10px rgba(0,229,255,0.5)" : "none",
                      }}
                    />

                    <span className="hidden sm:inline flex-shrink-0 font-mono text-[11px]" style={{ color: "#E3B341" }}>{hash}</span>

                    {index === 0 && (
                      <span className="hidden md:inline flex-shrink-0 px-1.5 py-0.5 rounded font-mono text-[9px]" style={{ background: "rgba(0,229,255,0.12)", color: "var(--accent)" }}>
                        HEAD → main
                      </span>
                    )}

                    <span className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                      <span className={`text-sm font-medium truncate transition-colors duration-300 ${isOpen ? "text-[var(--accent)]" : ""}`}>
                        {pick(experience.role)}
                      </span>
                      <span className="font-mono text-[10px] truncate" style={{ color: "var(--fg-muted)" }}>
                        @ {companyName(experience, locale)}
                      </span>
                    </span>

                    <span className="hidden lg:inline flex-shrink-0 font-mono text-[9px] uppercase tracking-[0.15em] px-1.5 py-0.5 rounded" style={{ border: "1px solid var(--border-subtle)", color: "var(--fg-faint)" }}>
                      {pick(TYPE_LABEL[experience.type])}
                    </span>

                    <span className="flex-shrink-0 font-mono text-[9px] sm:text-[10px] text-right" style={{ color: "var(--fg-faint)" }}>
                      {shortPeriod(pick(experience.period), locale)}
                    </span>

                    <motion.span
                      className="flex-shrink-0"
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ color: isOpen ? "var(--accent)" : "var(--fg-faint)" }}
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="relative pl-12 sm:pl-16 pr-4 sm:pr-6 pb-6 pt-1">
                          <div className="rounded-lg p-4 sm:p-5" style={{ background: "var(--bg)", border: "1px solid var(--border-subtle)" }}>
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}>
                                {experience.logo ? (
                                  <img src={experience.logo} alt={companyName(experience, locale)} loading="lazy" decoding="async" className="w-7 h-7 object-contain rounded" />
                                ) : (
                                  <Building className="h-4 w-4" style={{ color: "var(--fg-faint)" }} />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-mono text-[10px] mb-1" style={{ color: "#E3B341" }}>
                                  commit {hash} <span style={{ color: "var(--fg-faint)" }}>· {pick(experience.period)}</span>
                                </div>
                                <div className="flex items-center gap-2 font-mono text-[10px]" style={{ color: "var(--fg-faint)" }}>
                                  <MapPin className="h-2.5 w-2.5" />{pick(experience.location)}
                                  <span className="lg:hidden px-1.5 py-0.5 rounded" style={{ border: "1px solid var(--border-subtle)" }}>{pick(TYPE_LABEL[experience.type])}</span>
                                </div>
                              </div>
                            </div>

                            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--fg-muted)" }}>{pick(experience.description)}</p>

                            {pick(experience.achievements).length > 0 && (
                              <div className="mb-4">
                                <h4 className="font-mono text-[9px] mb-2.5 uppercase tracking-[0.25em]" style={{ color: "var(--fg-faint)" }}>{pick({ fr: "// journal_modifs", en: "// changelog" })}</h4>
                                <div className="space-y-1.5">
                                  {pick(experience.achievements).map((a, idx) => (
                                    <div key={idx} className="flex items-start gap-2">
                                      <span className="font-mono text-[10px] mt-0.5 flex-shrink-0" style={{ color: "var(--accent)" }}>+</span>
                                      <p className="text-xs leading-relaxed" style={{ color: "var(--fg-muted)" }}>{a}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {experience.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-1.5">
                                {experience.technologies.map((t, idx) => {
                                  const icon = getTechIcon(t);
                                  return (
                                    <span key={idx} className="inline-flex items-center gap-1.5 font-mono text-[9px] px-2 py-1 rounded"
                                      style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", color: "var(--fg-muted)" }}
                                    >
                                      {icon && <img src={icon} alt="" className="w-3 h-3" />}
                                      {t}
                                    </span>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <div className="px-4 sm:px-5 py-2.5 font-mono text-[10px]" style={{ background: "var(--bg-elevated)", borderTop: "1px solid var(--border-subtle)", color: "var(--fg-faint)" }}>
            <span style={{ color: "var(--accent)" }}>$</span> {pick({ fr: "6+ ans · 0 conflit de merge non résolu", en: "6+ years · 0 merge conflicts unresolved" })}
          </div>
        </div>
      </div>

      <div className="tentacle-line mt-28 max-w-md mx-auto"></div>
    </section>
  );
};

const ABIDJAN: Localized<string> = { fr: "Abidjan, Côte d'Ivoire", en: "Abidjan, Ivory Coast" };
const ABIDJAN_REMOTE: Localized<string> = { fr: "Abidjan, Côte d'Ivoire (à distance)", en: "Abidjan, Ivory Coast (Remote)" };

const defaultExperiences: Experience[] = [
  {
    id: "1",
    company: "Jèko",
    logo: "/images/jeko.jpeg",
    role: { fr: "Lead Front-End", en: "Front End Lead" },
    period: { fr: "Octobre 2025 - Aujourd'hui", en: "October 2025 - Present" },
    location: ABIDJAN,
    type: "professional",
    description: {
      fr: "Je pilote le développement front-end des solutions web et mobiles de Jèko. J'encadre les équipes de développement et porte l'exigence technique sur les écosystèmes Flutter et Svelte pour les solutions de paiement.",
      en: "Leading front-end development of web and mobile solutions at Jèko. Managing development teams and driving technical excellence in Flutter and Svelte ecosystems for payment solutions.",
    },
    achievements: {
      fr: [
        "Encadrement d'une équipe de développeurs, en garantissant la qualité du code et les bonnes pratiques",
        "Architecture et optimisation d'applications Flutter pour Android et iOS",
        "Création d'interfaces web dynamiques avec Svelte et SvelteKit",
        "Mise en place de fonctionnalités de paiement mobile conformes aux normes de sécurité et de conformité",
        "Accompagnement des membres de l'équipe en développement full-stack (JavaScript/TypeScript, Dart)",
        "Livraison de solutions évolutives pour l'application mobile, le dashboard web et les liens de paiement",
      ],
      en: [
        "Led a team of developers ensuring code quality and best practices",
        "Architected and optimized Flutter applications for Android and iOS",
        "Built dynamic web interfaces with Svelte and SvelteKit",
        "Implemented mobile payment features with security and compliance standards",
        "Mentored team members in full-stack development (JavaScript/TypeScript, Dart)",
        "Delivered scalable solutions for mobile app, web dashboard, and payment links",
      ],
    },
    technologies: ["Flutter", "SvelteKit", "JavaScript", "TypeScript", "Dart", "Mobile Payments", "APIs", "State Management"],
  },
  {
    id: "2",
    company: "Jèko",
    logo: "/images/jeko.jpeg",
    role: { fr: "Ingénieur logiciel", en: "Software Engineer" },
    period: { fr: "Avril 2025 - Septembre 2025", en: "April 2025 - September 2025" },
    location: ABIDJAN,
    type: "professional",
    description: {
      fr: "Participation active au développement des solutions web et mobiles de Jèko, spécialisée dans les services financiers. Focus sur des applications performantes avec Flutter et SvelteKit.",
      en: "Actively participated in the development of web and mobile solutions at Jèko, specializing in financial services. Focused on high-performance applications using Flutter and SvelteKit.",
    },
    achievements: {
      fr: [
        "Création et optimisation d'applications Flutter pour Android et iOS",
        "Conception d'interfaces interactives avec Svelte et SvelteKit",
        "Mise en place de fonctionnalités de paiement mobile sécurisées",
        "Amélioration des performances des applications et intégration d'API",
        "Collaboration efficace avec les équipes design et développement",
      ],
      en: [
        "Created and optimized Flutter applications for Android and iOS",
        "Designed interactive interfaces with Svelte and SvelteKit",
        "Implemented secure mobile payment functionalities",
        "Improved application performance and integrated APIs",
        "Collaborated effectively with design and development teams",
      ],
    },
    technologies: ["Flutter", "SvelteKit", "JavaScript", "TypeScript", "Dart", "Mobile Payments", "APIs", "Financial Services"],
  },
  {
    id: "3",
    company: "Freelance",
    logo: "/images/freelance.jpeg",
    role: { fr: "Développeur mobile Flutter & API backend", en: "Flutter Mobile Developer & Backend API" },
    period: { fr: "Mars 2020 - Aujourd'hui", en: "March 2020 - Present" },
    location: ABIDJAN_REMOTE,
    type: "freelance",
    description: {
      fr: "Conception et développement d'applications mobiles sur mesure pour des clients variés. Gestion du cycle de développement complet et création d'outils internes comme des tableaux de bord de gestion.",
      en: "Designing and developing custom mobile applications for diverse clients. Managing complete development lifecycle and creating internal tools such as management dashboards.",
    },
    achievements: {
      fr: [
        "Développement d'applications mobiles sur mesure pour des clients diversifiés",
        "Création de tableaux de bord de gestion pour les utilisateurs et les administrateurs",
        "Gestion de projet de bout en bout : analyse des besoins, maquettes UI/UX, développement, déploiement",
        "Maintenance continue et support technique des applications",
        "Plus de 6 ans d'expérience en développement freelance",
      ],
      en: [
        "Developed custom mobile applications for diversified clients",
        "Created management dashboards for users and administrators",
        "Complete project management: needs analysis, UI/UX mockups, development, deployment",
        "Continuous maintenance and technical support of applications",
        "6+ years of experience in freelance development",
      ],
    },
    technologies: [
      "Flutter", "Java", "Swift", "Python", "Laravel", "Flask",
      "Android Studio", "Git", "HTML/CSS", "GitHub", "GitLab"
    ],
  },
  {
    id: "3b",
    company: "Government of Côte d'Ivoire",
    companyFr: "Gouvernement de Côte d'Ivoire",
    logo: "/images/ci.png",
    role: { fr: "Consultant informatique", en: "IT Consultant" },
    period: { fr: "2023 - Aujourd'hui", en: "2023 - Present" },
    location: ABIDJAN,
    type: "freelance",
    description: {
      fr: "Accompagnement technique d'institutions publiques dans leurs projets numériques, de la conception à la mise en production.",
      en: "Technical support for public institutions on their digital projects, from design to production.",
    },
    achievements: {
      fr: [
        "Conception et développement d'applications web et mobiles",
        "Conseil sur l'architecture technique et la sécurité des données",
        "Collaboration avec des équipes métier et institutionnelles",
      ],
      en: [
        "Designed and built web and mobile applications",
        "Advised on technical architecture and data security",
        "Worked alongside business and institutional teams",
      ],
    },
    technologies: [
      "Flutter", "SvelteKit", "REST APIs", "Secure Authentication",
      "Real-time Systems", "Data Analytics", "Government Standards"
    ],
  },
  {
    id: "3c",
    company: "Diigito",
    logo: "/images/diigito.jpg",
    role: { fr: "Formateur Flutter", en: "Flutter Trainer" },
    period: { fr: "Juin 2025 - Mars 2026", en: "June 2025 - March 2026" },
    location: ABIDJAN,
    type: "freelance",
    description: {
      fr: "Sessions de formation le week-end pour enseigner le développement mobile Flutter à de futurs développeurs. Programme complet, des fondamentaux aux notions avancées, avec des projets pratiques et un accompagnement personnalisé.",
      en: "Weekend training sessions teaching Flutter mobile development to aspiring developers. Comprehensive curriculum covering fundamentals to advanced concepts, with hands-on projects and personalized coaching.",
    },
    achievements: {
      fr: [
        "Animation de sessions de formation de 2 heures chaque samedi",
        "Conception d'un programme Flutter complet, des bases aux sujets avancés",
        "Accompagnement individuel et personnalisé des apprenants",
        "Encadrement de plusieurs promotions de futurs développeurs mobiles",
        "Formats de formation en présentiel et en ligne",
      ],
      en: [
        "Conducted weekly 2-hour training sessions every Saturday",
        "Designed complete Flutter curriculum from basics to advanced topics",
        "Provided personalized one-on-one coaching for students",
        "Mentored multiple cohorts of aspiring mobile developers",
        "Combined in-person and online training formats",
      ],
    },
    technologies: [
      "Flutter", "Dart", "Mobile Development", "UI/UX Design",
      "State Management", "API Integration", "Teaching"
    ],
  },
  {
    id: "4",
    company: "Adjemin",
    logo: "/images/LOGO-ADJEMINV3.png",
    role: { fr: "Développeur d'applications mobiles", en: "Mobile Application Developer" },
    period: { fr: "Août 2024 - Avril 2025", en: "August 2024 - April 2025" },
    location: ABIDJAN,
    type: "professional",
    description: {
      fr: "Développement d'applications mobiles en équipe, avec une attention particulière aux bonnes pratiques et à la qualité du code. Utilisation de technologies modernes et de méthodes Agile.",
      en: "Team-based mobile application development with focus on best practices and code quality. Utilizing modern technologies and Agile methodologies.",
    },
    achievements: {
      fr: [
        "Développement d'applications avec Flutter et l'architecture BLoC",
        "Mise en place de tests unitaires pour garantir la qualité",
        "Intégration d'API REST et résolution de problèmes complexes",
        "Collaboration sur Node.js pour les solutions backend",
        "Maîtrise de Rust pour des performances optimales",
      ],
      en: [
        "Developed applications with Flutter and BLoC architecture",
        "Implemented unit testing to ensure quality",
        "Integrated REST APIs and solved complex problems",
        "Collaborated with Node.js for backend solutions",
        "Mastered Rust for optimal performance",
      ],
    },
    technologies: ["Flutter", "Java", "Rust", "Node.js", "Flutter BLoC", "REST APIs", "Python", "Kotlin", "Git"],
  },
  {
    id: "5",
    company: "BRIDGE BANK GROUP",
    logo: "/images/logo-white.svg",
    role: { fr: "Développeur d'applications mobiles", en: "Mobile Application Developer" },
    period: { fr: "Août 2024 - Décembre 2024", en: "August 2024 - December 2024" },
    location: ABIDJAN,
    type: "freelance",
    description: {
      fr: "Développement et refonte de l'application bancaire MyBridge Touch. Mise en place de fonctionnalités bancaires sécurisées dans le respect des normes du secteur financier.",
      en: "Development and redesign of MyBridge Touch banking application. Implementation of secure banking features while adhering to financial sector standards.",
    },
    achievements: {
      fr: [
        "Refonte complète de l'application mobile MyBridge Touch",
        "Intégration de fonctionnalités bancaires : virements, messagerie sécurisée",
        "Nette amélioration des performances et de l'expérience utilisateur",
        "Maintenance corrective et évolutive, avec résolution de bugs critiques",
        "Collaboration Agile et respect des normes bancaires",
        "Intégration de Firebase avec une sécurité renforcée",
      ],
      en: [
        "Complete redesign of MyBridge Touch mobile application",
        "Integration of banking features: transfers, secure messaging",
        "Significant improvement in performance and UX",
        "Corrective and evolutionary maintenance with critical bug resolution",
        "Agile collaboration and compliance with banking standards",
        "Firebase integration with enhanced security",
      ],
    },
    technologies: ["Flutter", "Flutter BLoC", "Firebase", "Java", "Banking APIs", "Agile Methodologies"],
  },
  {
    id: "6",
    company: "Talentium Recrutement",
    logo: "/images/talentium.jpeg",
    role: { fr: "Chef de projet technique", en: "Technical Project Manager" },
    period: { fr: "Janvier 2024 - Juillet 2024", en: "January 2024 - July 2024" },
    location: ABIDJAN,
    type: "professional",
    description: {
      fr: "Direction d'une équipe de 4 personnes (2 développeurs et 2 commerciaux) pour concevoir et déployer la stratégie marketing de vente et d'évolution des applications. Suivi quotidien et hebdomadaire sur Trello.",
      en: "Led a team of 4 people (2 developers and 2 sales representatives) to develop and implement marketing strategy for application sales and evolution. Managed daily and weekly follow-ups via Trello.",
    },
    achievements: {
      fr: [
        "Direction d'une équipe technique de 4 membres (2 développeurs, 2 commerciaux)",
        "Élaboration et exécution de la stratégie marketing pour la vente des applications",
        "Suivi de projet quotidien et hebdomadaire sur Trello",
        "Atteinte des objectifs commerciaux et excellence opérationnelle",
        "Promu depuis le poste de développeur mobile après 6 mois de résultats remarquables",
      ],
      en: [
        "Led technical team of 4 members (2 developers, 2 sales)",
        "Developed and executed marketing strategy for application sales",
        "Daily and weekly project tracking using Trello",
        "Ensured commercial objectives and operational excellence",
        "Promoted from Mobile Developer after 6 months of outstanding performance",
      ],
    },
    technologies: [
      "Trello", "Project Management", "Team Leadership",
      "Agile Methodologies", "Sales Strategy", "Flutter", "Laravel"
    ],
  },
  {
    id: "7",
    company: "Talentium Recrutement",
    logo: "/images/talentium.jpeg",
    role: { fr: "Développeur mobile", en: "Mobile Developer" },
    period: { fr: "Juillet 2023 - Décembre 2023", en: "July 2023 - December 2023" },
    location: ABIDJAN,
    type: "professional",
    description: {
      fr: "Développement d'applications mobiles innovantes pour l'évaluation des organisations et les urgences médicales. Priorité à l'impact social et à l'utilité publique des solutions développées.",
      en: "Development of innovative mobile applications for organizational assessment and medical emergencies. Focus on social impact and public utility of developed solutions.",
    },
    achievements: {
      fr: [
        "Développement de Maturus : application d'évaluation de la maturité organisationnelle (Flutter + Laravel)",
        "Création de SOS AVC : application d'alerte pour les urgences médicales (Flutter + Firebase)",
        "Intégration full-stack pour des solutions complètes",
        "Mise en place de la communication en temps réel pour la réponse aux urgences",
        "Gestion complète de projets techniques à impact social",
      ],
      en: [
        "Developed Maturus: organizational maturity assessment app (Flutter + Laravel)",
        "Created SOS AVC: medical emergency alert application (Flutter + Firebase)",
        "Full-stack integration for complete solutions",
        "Real-time communication implementation for emergency response",
        "Complete management of technical projects with social impact",
      ],
    },
    technologies: [
      "Flutter", "Laravel", "Firebase", "Java", "Node.js",
      "Python", "JavaScript", "Kotlin", "Git"
    ],
  },
  {
    id: "8",
    company: "Edopay Côte d'Ivoire",
    logo: "/images/logo-edopay.png",
    role: { fr: "Ingénieur développement logiciel senior", en: "Senior Software Development Engineer" },
    period: { fr: "Juin 2022 - Juin 2023", en: "June 2022 - June 2023" },
    location: ABIDJAN_REMOTE,
    type: "freelance",
    description: {
      fr: "Développement de l'application de paiement mobile Edopay, offrant aux utilisateurs une interface fluide et moderne pour payer et gérer leurs transactions. Développement front-end complet pour Android et iOS.",
      en: "Developed Edopay mobile payment application, providing users with a seamless and modern interface for payments and transaction management. Full front-end development for Android and iOS.",
    },
    achievements: {
      fr: [
        "Réalisation complète de l'UI/UX de l'application mobile de paiement avec Flutter",
        "Intégration des API de paiement fournies par l'équipe backend",
        "Mise en place d'écrans de paiement intuitifs et de l'historique des transactions",
        "Ajout de notifications in-app et push pour les opérations",
        "Intégration de l'authentification par code PIN et biométrie (visage/empreinte)",
        "Collaboration efficace avec les équipes backend et produit en mode freelance",
      ],
      en: [
        "Built complete mobile app UI/UX with Flutter for payment solutions",
        "Integrated payment APIs provided by backend team",
        "Implemented intuitive payment screens and transaction history",
        "Added in-app and push notifications for operations",
        "Integrated PIN and biometric authentication (face/fingerprint)",
        "Collaborated effectively with backend and product teams in freelance mode",
      ],
    },
    technologies: [
      "Flutter", "Dart", "Payment APIs", "Firebase",
      "Biometric Authentication", "Push Notifications", "UI/UX Design"
    ],
  },
  {
    id: "9",
    company: "Softskills",
    logo: "/images/softskills.webp",
    role: { fr: "Ingénieur logiciel", en: "Software Engineer" },
    period: { fr: "Mars 2020 - Juin 2022", en: "March 2020 - June 2022" },
    location: { fr: "Côte d'Ivoire", en: "Ivory Coast" },
    type: "professional",
    description: {
      fr: "Développement d'applications mobiles performantes et de services backend. Acquisition d'une compréhension globale du cycle de développement, avec un accent sur la qualité et les bonnes pratiques.",
      en: "Development of high-performance mobile applications and backend services. Gained comprehensive understanding of development lifecycle with focus on quality and best practices.",
    },
    achievements: {
      fr: [
        "Création d'applications Android et iOS performantes avec Flutter",
        "Développement d'API et de services backend avec Java et Node.js",
        "Optimisation des performances et maintenance corrective",
        "Mise en place de tests unitaires et de bonnes pratiques qualité",
        "Collaboration efficace au sein d'équipes pluridisciplinaires",
        "Maîtrise complète du cycle de développement",
      ],
      en: [
        "Created high-performance Android and iOS applications with Flutter",
        "Developed APIs and backend services with Java and Node.js",
        "Performance optimization and corrective maintenance",
        "Implemented unit testing and quality best practices",
        "Effective collaboration in multidisciplinary teams",
        "Complete mastery of development lifecycle",
      ],
    },
    technologies: [
      "Flutter", "Java", "Node.js", "Python", "Kotlin",
      "Rust", "Firebase", "Git", "DevOps"
    ],
  },
];

export const EXPERIENCES = defaultExperiences;

export default ExperienceSection;
