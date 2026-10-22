import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronRight, Building } from "lucide-react";
import SectionHeader from "./SectionHeader";
import SectionRail from "./fx/SectionRail";
import { getTechIcon } from "@/lib/techIcons";

interface Experience {
  id: string;
  company: string;
  logo?: string;
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

const pseudoHash = (seed: string) => {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(16).padStart(7, "0").slice(0, 7);
};

const TYPE_LABEL: Record<string, string> = {
  professional: "employee",
  freelance: "freelance",
  personal: "personal",
};

const shortPeriod = (period: string) =>
  period
    .replace(/January|February|March|April|May|June|July|August|September|October|November|December/g, (m) => m.slice(0, 3))
    .replace(" - ", " → ");

const ExperienceSection = ({
  experiences = defaultExperiences,
}: ExperienceSectionProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id ?? null);

  return (
    <section
      id="experience"
      className="min-h-screen py-32 lg:py-44 px-6 relative"
    >
      <SectionRail index="06" label="commit_history" motif="leds" />
      <div className="relative z-10 max-w-5xl mx-auto">
        <SectionHeader
          index="06"
          label="commit_history"
          title="Career"
          titleHighlight="Git Log"
          description="Every role, merged into main. Click a commit to inspect it."
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
              const hash = pseudoHash(experience.company + experience.role);
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
                        {experience.role}
                      </span>
                      <span className="font-mono text-[10px] truncate" style={{ color: "var(--fg-muted)" }}>
                        @ {experience.company}
                      </span>
                    </span>

                    <span className="hidden lg:inline flex-shrink-0 font-mono text-[9px] uppercase tracking-[0.15em] px-1.5 py-0.5 rounded" style={{ border: "1px solid var(--border-subtle)", color: "var(--fg-faint)" }}>
                      {TYPE_LABEL[experience.type]}
                    </span>

                    <span className="flex-shrink-0 font-mono text-[9px] sm:text-[10px] text-right" style={{ color: "var(--fg-faint)" }}>
                      {shortPeriod(experience.period)}
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
                                  <img src={experience.logo} alt={experience.company} loading="lazy" decoding="async" className="w-7 h-7 object-contain rounded" />
                                ) : (
                                  <Building className="h-4 w-4" style={{ color: "var(--fg-faint)" }} />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-mono text-[10px] mb-1" style={{ color: "#E3B341" }}>
                                  commit {hash} <span style={{ color: "var(--fg-faint)" }}>· {experience.period}</span>
                                </div>
                                <div className="flex items-center gap-2 font-mono text-[10px]" style={{ color: "var(--fg-faint)" }}>
                                  <MapPin className="h-2.5 w-2.5" />{experience.location}
                                  <span className="lg:hidden px-1.5 py-0.5 rounded" style={{ border: "1px solid var(--border-subtle)" }}>{TYPE_LABEL[experience.type]}</span>
                                </div>
                              </div>
                            </div>

                            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--fg-muted)" }}>{experience.description}</p>

                            {experience.achievements.length > 0 && (
                              <div className="mb-4">
                                <h4 className="font-mono text-[9px] mb-2.5 uppercase tracking-[0.25em]" style={{ color: "var(--fg-faint)" }}>// changelog</h4>
                                <div className="space-y-1.5">
                                  {experience.achievements.map((a, idx) => (
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
            <span style={{ color: "var(--accent)" }}>$</span> 6+ years · 0 merge conflicts unresolved
          </div>
        </div>
      </div>

      <div className="tentacle-line mt-28 max-w-md mx-auto"></div>
    </section>
  );
};

const defaultExperiences: Experience[] = [
  {
    id: "1",
    company: "Jèko",
    logo: "/images/jeko.jpeg",
    role: "Front End Lead",
    period: "October 2025 - Present",
    location: "Abidjan, Côte d'Ivoire",
    type: "professional",
    description:
      "Leading front-end development of web and mobile solutions at Jèko. Managing development teams and driving technical excellence in Flutter and Svelte ecosystems for payment solutions.",
    achievements: [
      "Led a team of developers ensuring code quality and best practices",
      "Architected and optimized Flutter applications for Android and iOS",
      "Built dynamic web interfaces with Svelte and SvelteKit",
      "Implemented mobile payment features with security and compliance standards",
      "Mentored team members in full-stack development (JavaScript/TypeScript, Dart)",
      "Delivered scalable solutions for mobile app, web dashboard, and payment links"
    ],
    technologies: ["Flutter", "SvelteKit", "JavaScript", "TypeScript", "Dart", "Mobile Payments", "APIs", "State Management"],
  },
  {
    id: "2",
    company: "Jèko",
    logo: "/images/jeko.jpeg",
    role: "Software Engineer",
    period: "April 2025 - September 2025",
    location: "Abidjan, Côte d'Ivoire",
    type: "professional",
    description:
      "Actively participated in the development of web and mobile solutions at Jèko, specializing in financial services. Focused on high-performance applications using Flutter and SvelteKit.",
    achievements: [
      "Created and optimized Flutter applications for Android and iOS",
      "Designed interactive interfaces with Svelte and SvelteKit",
      "Implemented secure mobile payment functionalities",
      "Improved application performance and integrated APIs",
      "Collaborated effectively with design and development teams"
    ],
    technologies: ["Flutter", "SvelteKit", "JavaScript", "TypeScript", "Dart", "Mobile Payments", "APIs", "Financial Services"],
  },
  {
    id: "3",
    company: "Freelance",
    logo: "/images/freelance.jpeg",
    role: "Flutter Mobile Developer & Backend API",
    period: "March 2020 - Present",
    location: "Abidjan, Côte d'Ivoire (Remote)",
    type: "freelance",
    description:
      "Designing and developing custom mobile applications for diverse clients. Managing complete development lifecycle and creating internal tools such as management dashboards.",
    achievements: [
      "Developed custom mobile applications for diversified clients",
      "Created management dashboards for users and administrators",
      "Complete project management: needs analysis, UI/UX mockups, development, deployment",
      "Continuous maintenance and technical support of applications",
      "6+ years of experience in freelance development"
    ],
    technologies: [
      "Flutter", "Java", "Swift", "Python", "Laravel", "Flask",
      "Android Studio", "Git", "HTML/CSS", "GitHub", "GitLab"
    ],
  },
  {
    id: "3b",
    company: "Government of Côte d'Ivoire",
    logo: "/images/ci.png",
    role: "IT Consultant",
    period: "2023 - Present",
    location: "Abidjan, Côte d'Ivoire",
    type: "freelance",
    description:
      "Provided technical consulting services for various governmental digital transformation projects. Contributed to the development of critical applications in strategic sectors including public health, national security, and public administration.",
    achievements: [
      "Contributed to digital solutions for public health surveillance systems",
      "Developed applications supporting national security and citizen safety initiatives",
      "Built administrative platforms for governmental operations",
      "Ensured compliance with governmental security and data protection standards",
      "Collaborated with multiple ministries and public institutions"
    ],
    technologies: [
      "Flutter", "SvelteKit", "REST APIs", "Secure Authentication",
      "Real-time Systems", "Data Analytics", "Government Standards"
    ],
  },
  {
    id: "3c",
    company: "Diigito",
    logo: "/images/diigito.jpg",
    role: "Flutter Trainer",
    period: "June 2025 - March 2026",
    location: "Abidjan, Côte d'Ivoire",
    type: "freelance",
    description:
      "Weekend training sessions teaching Flutter mobile development to aspiring developers. Comprehensive curriculum covering fundamentals to advanced concepts, with hands-on projects and personalized coaching.",
    achievements: [
      "Conducted weekly 2-hour training sessions every Saturday",
      "Designed complete Flutter curriculum from basics to advanced topics",
      "Provided personalized one-on-one coaching for students",
      "Mentored multiple cohorts of aspiring mobile developers",
      "Combined in-person and online training formats"
    ],
    technologies: [
      "Flutter", "Dart", "Mobile Development", "UI/UX Design",
      "State Management", "API Integration", "Teaching"
    ],
  },
  {
    id: "4",
    company: "Adjemin",
    logo: "/images/LOGO-ADJEMINV3.png",
    role: "Mobile Application Developer",
    period: "August 2024 - April 2025",
    location: "Abidjan, Côte d'Ivoire",
    type: "professional",
    description:
      "Team-based mobile application development with focus on best practices and code quality. Utilizing modern technologies and Agile methodologies.",
    achievements: [
      "Developed applications with Flutter and BLoC architecture",
      "Implemented unit testing to ensure quality",
      "Integrated REST APIs and solved complex problems",
      "Collaborated with Node.js for backend solutions",
      "Mastered Rust for optimal performance"
    ],
    technologies: ["Flutter", "Java", "Rust", "Node.js", "Flutter BLoC", "REST APIs", "Python", "Kotlin", "Git"],
  },
  {
    id: "5",
    company: "BRIDGE BANK GROUP",
    logo: "/images/logo-white.svg",
    role: "Mobile Application Developer",
    period: "August 2024 - December 2024",
    location: "Abidjan, Côte d'Ivoire",
    type: "freelance",
    description:
      "Development and redesign of MyBridge Touch banking application. Implementation of secure banking features while adhering to financial sector standards.",
    achievements: [
      "Complete redesign of MyBridge Touch mobile application",
      "Integration of banking features: transfers, secure messaging",
      "Significant improvement in performance and UX",
      "Corrective and evolutionary maintenance with critical bug resolution",
      "Agile collaboration and compliance with banking standards",
      "Firebase integration with enhanced security"
    ],
    technologies: ["Flutter", "Flutter BLoC", "Firebase", "Java", "Banking APIs", "Agile Methodologies"],
  },
  {
    id: "6",
    company: "Talentium Recrutement",
    logo: "/images/talentium.jpeg",
    role: "Technical Project Manager",
    period: "January 2024 - July 2024",
    location: "Abidjan, Côte d'Ivoire",
    type: "professional",
    description:
      "Led a team of 4 people (2 developers and 2 sales representatives) to develop and implement marketing strategy for application sales and evolution. Managed daily and weekly follow-ups via Trello.",
    achievements: [
      "Led technical team of 4 members (2 developers, 2 sales)",
      "Developed and executed marketing strategy for application sales",
      "Daily and weekly project tracking using Trello",
      "Ensured commercial objectives and operational excellence",
      "Promoted from Mobile Developer after 6 months of outstanding performance"
    ],
    technologies: [
      "Trello", "Project Management", "Team Leadership",
      "Agile Methodologies", "Sales Strategy", "Flutter", "Laravel"
    ],
  },
  {
    id: "7",
    company: "Talentium Recrutement",
    logo: "/images/talentium.jpeg",
    role: "Mobile Developer",
    period: "July 2023 - December 2023",
    location: "Abidjan, Côte d'Ivoire",
    type: "professional",
    description:
      "Development of innovative mobile applications for organizational assessment and medical emergencies. Focus on social impact and public utility of developed solutions.",
    achievements: [
      "Developed Maturus: organizational maturity assessment app (Flutter + Laravel)",
      "Created SOS AVC: medical emergency alert application (Flutter + Firebase)",
      "Full-stack integration for complete solutions",
      "Real-time communication implementation for emergency response",
      "Complete management of technical projects with social impact"
    ],
    technologies: [
      "Flutter", "Laravel", "Firebase", "Java", "Node.js",
      "Python", "JavaScript", "Kotlin", "Git"
    ],
  },
  {
    id: "8",
    company: "Edopay Côte d'Ivoire",
    logo: "/images/logo-edopay.png",
    role: "Senior Software Development Engineer",
    period: "June 2022 - June 2023",
    location: "Abidjan, Côte d'Ivoire (Remote)",
    type: "freelance",
    description:
      "Developed Edopay mobile payment application, providing users with a seamless and modern interface for payments and transaction management. Full front-end development for Android and iOS.",
    achievements: [
      "Built complete mobile app UI/UX with Flutter for payment solutions",
      "Integrated payment APIs provided by backend team",
      "Implemented intuitive payment screens and transaction history",
      "Added in-app and push notifications for operations",
      "Integrated PIN and biometric authentication (face/fingerprint)",
      "Collaborated effectively with backend and product teams in freelance mode"
    ],
    technologies: [
      "Flutter", "Dart", "Payment APIs", "Firebase",
      "Biometric Authentication", "Push Notifications", "UI/UX Design"
    ],
  },
  {
    id: "9",
    company: "Softskills",
    logo: "/images/softskills.webp",
    role: "Software Engineer",
    period: "March 2020 - June 2022",
    location: "Côte d'Ivoire",
    type: "professional",
    description:
      "Development of high-performance mobile applications and backend services. Gained comprehensive understanding of development lifecycle with focus on quality and best practices.",
    achievements: [
      "Created high-performance Android and iOS applications with Flutter",
      "Developed APIs and backend services with Java and Node.js",
      "Performance optimization and corrective maintenance",
      "Implemented unit testing and quality best practices",
      "Effective collaboration in multidisciplinary teams",
      "Complete mastery of development lifecycle"
    ],
    technologies: [
      "Flutter", "Java", "Node.js", "Python", "Kotlin",
      "Rust", "Firebase", "Git", "DevOps"
    ],
  },
];

export default ExperienceSection;
