import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Building, ChevronRight } from "lucide-react";
import { Badge } from "./ui/badge";
import SectionHeader from "./SectionHeader";
import NebulaOrbs from "./NebulaOrbs";
import { getTechIcon } from "@/lib/techIcons";

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
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const experiencesToShow = experiences.slice(0, visibleCount);
  const hasMoreExperiences = visibleCount < experiences.length;

  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case "professional":
        return "border-white/20 text-white/50";
      case "freelance":
        return "border-white/15 text-white/40";
      default:
        return "border-white/10 text-white/30";
    }
  };

  return (
    <section
      id="experience"
      className="min-h-screen py-40 lg:py-52 px-6 relative overflow-hidden"
    >
      <NebulaOrbs variant="purple" />
      {/* Tentacle decoration */}
      <svg
        className="absolute top-0 left-0 w-32 h-full opacity-[0.02] pointer-events-none"
        viewBox="0 0 100 1000"
      >
        <motion.path
          d="M20,0 Q60,200 30,400 Q0,600 50,800 Q80,900 40,1000"
          stroke="white"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 3 }}
          viewport={{ once: true }}
        />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeader
          label="Journey"
          title="My"
          titleHighlight="Experience"
          description="A rich journey filled with diverse projects and stimulating technical challenges."
        />

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line - tentacle style */}
          <div className="absolute left-8 top-0 bottom-0 w-[1px]" style={{ background: "linear-gradient(to bottom, var(--border-medium), transparent, var(--border-medium))" }}></div>

          <div className="space-y-10">
            {experiencesToShow.map((experience, index) => (
              <motion.div
                key={experience.id}
                className="relative flex gap-8"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                {/* Timeline dot - suction cup style */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 glass-effect rounded-full flex items-center justify-center">
                    <Building className="h-5 w-5 text-[var(--theme-muted)]" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-4">
                  <div className="glass-effect rounded-3xl p-6 hover-lift tentacle-glow">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{experience.role}</h3>
                        <p className="text-sm font-medium" style={{ color: "var(--accent)" }}>{experience.company}</p>
                      </div>
                      <div className="flex flex-col lg:items-end gap-2">
                        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--fg-muted)" }}>
                          <Calendar className="h-3 w-3" />{experience.period}
                        </div>
                        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--fg-muted)" }}>
                          <MapPin className="h-3 w-3" />{experience.location}
                        </div>
                        <Badge variant="outline" className="text-[10px] uppercase tracking-wider"
                          style={{ borderColor: "var(--border-medium)", color: "var(--fg-faint)" }}
                        >
                          {experience.type === "professional" ? "Employee" : experience.type === "freelance" ? "Freelance" : "Personal"}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--fg-muted)" }}>{experience.description}</p>

                    {experience.achievements.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-[10px] font-medium mb-3 uppercase tracking-[0.2em]" style={{ color: "var(--fg-faint)" }}>Key Achievements</h4>
                        <div className="space-y-2">
                          {experience.achievements.map((a, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <ChevronRight className="h-3 w-3 mt-0.5 flex-shrink-0" style={{ color: "var(--accent)" }} />
                              <p className="text-xs leading-relaxed" style={{ color: "var(--fg-muted)" }}>{a}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {experience.technologies.length > 0 && (
                      <div>
                        <h4 className="text-[10px] font-medium mb-3 uppercase tracking-[0.2em]" style={{ color: "var(--fg-faint)" }}>Technologies</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {experience.technologies.map((t, idx) => {
                            const icon = getTechIcon(t);
                            return (
                              <span key={idx} className="inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full"
                                style={{ border: "1px solid var(--border-medium)", color: "var(--fg-muted)" }}
                              >
                                {icon && <img src={icon} alt="" className="w-3.5 h-3.5" />}
                                {t}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View More Button */}
          {hasMoreExperiences && (
            <div className="text-center mt-12">
              <motion.button
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="px-8 py-3 border border-white/20 rounded-full text-xs font-medium uppercase tracking-[0.15em] text-white/50 hover:text-white hover:bg-white/5 transition-all duration-500"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View More ({Math.min(6, experiences.length - visibleCount)} more)
              </motion.button>
            </div>
          )}
        </div>
      </div>

      <div className="tentacle-line mt-32 max-w-md mx-auto"></div>
    </section>
  );
};

const defaultExperiences: Experience[] = [
  {
    id: "1",
    company: "Jèko",
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
    role: "Flutter Trainer",
    period: "June 2025 - Present",
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
