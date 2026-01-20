import React, { useState } from "react";
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
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const experiencesToShow = experiences.slice(0, visibleCount);
  const hasMoreExperiences = visibleCount < experiences.length;

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
              Journey
            </span>
            <div className="w-12 h-px bg-primary"></div>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-white">My</span>
            <span className="gradient-text"> Experience</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            A rich journey filled with diverse projects and stimulating technical challenges.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-purple-500 to-primary opacity-30"></div>

          <div className="space-y-12">
            {experiencesToShow.map((experience, index) => (
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
                              ? "Employee"
                              : experience.type === "freelance"
                                ? "Freelance"
                                : "Personal"}
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
                            🏆 Key Achievements
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
                            🛠️ Technologies Used
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

          {/* View More Button */}
          {hasMoreExperiences && (
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="group relative px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-black font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View More ({Math.min(6, experiences.length - visibleCount)} more)
                  <span>↓</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
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
      "Flutter",
      "Java",
      "Swift",
      "Python",
      "Laravel",
      "Flask",
      "Android Studio",
      "Git",
      "HTML/CSS",
      "GitHub",
      "GitLab"
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
      "Flutter",
      "SvelteKit",
      "REST APIs",
      "Secure Authentication",
      "Real-time Systems",
      "Data Analytics",
      "Government Standards"
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
      "Flutter",
      "Dart",
      "Mobile Development",
      "UI/UX Design",
      "State Management",
      "API Integration",
      "Teaching"
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
      "Trello",
      "Project Management",
      "Team Leadership",
      "Agile Methodologies",
      "Sales Strategy",
      "Flutter",
      "Laravel"
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
      "Flutter",
      "Laravel",
      "Firebase",
      "Java",
      "Node.js",
      "Python",
      "JavaScript",
      "Kotlin",
      "Git"
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
      "Flutter",
      "Dart",
      "Payment APIs",
      "Firebase",
      "Biometric Authentication",
      "Push Notifications",
      "UI/UX Design"
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
      "Flutter",
      "Java",
      "Node.js",
      "Python",
      "Kotlin",
      "Rust",
      "Firebase",
      "Git",
      "DevOps"
    ],
  },
];

export default ExperienceSection;
