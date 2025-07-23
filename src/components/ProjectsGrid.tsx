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
  isPortrait?: boolean;
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
  const [showAllProjects, setShowAllProjects] = useState<boolean>(false);

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
  
  // Show only first 6 projects initially, then all when expanded
  const projectsToShow = showAllProjects ? regularProjects : regularProjects.slice(0, 6);
  const hasMoreProjects = regularProjects.length > 6;

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
                    isPortrait={project.isPortrait}
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
            ? projectsToShow
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
                isPortrait={project.isPortrait}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        {hasMoreProjects && selectedCategory === "all" && (
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="group relative px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-black font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {showAllProjects ? (
                  <>
                    Show Less Projects
                    <motion.div
                      animate={{ rotate: showAllProjects ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      ↓
                    </motion.div>
                  </>
                ) : (
                  <>
                    View More Projects ({regularProjects.length - 6} more)
                    <motion.div
                      animate={{ rotate: showAllProjects ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      ↓
                    </motion.div>
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// Real projects based on your LinkedIn profile
const defaultProjects: Project[] = [
  {
    id: "1",
    title: "MetaChange",
    description:
      "Innovative cryptocurrency exchange app designed for the African market, offering simple and secure crypto-to-mobile money transactions.",
    imageUrl: "./images/metachanage-preview.jpeg", // You'll add this
    technologies: ["Flutter", "Blockchain", "Mobile Payments", "KYC", "Encryption"],
    category: "fintech",
    isPortrait: true,
    objectives:
      "Democratize access to digital financial services in Africa through secure cryptocurrency exchange.",
    results:
      "Built secure multi-currency exchange supporting BNB, TRON, USDT with MTN and Orange Money integration.",
    demoUrl: "",
    codeUrl: "",
  },
  {
    id: "2",
    title: "Galaxy Stream",
    description:
      "Powerful video streaming app that brings the latest movies, TV shows, and trending content using the TMDB API.",
    imageUrl: "./images/galaxy-stream-preview.jpeg", // You'll add this
    technologies: ["Flutter", "TMDB API", "Firebase", "Provider"],
    category: "entertainment",
    isPortrait: true,
    objectives:
      "Create a modern streaming platform with intuitive UI and optimal performance for movie discovery.",
    results:
      "Deployed app with 1000+ downloads and 4.5/5 rating on app stores.",
    demoUrl: "https://galaxystream-demo.com",
    codeUrl: "https://github.com/gaelsassan/galaxy-stream",
  },
  {
    id: "3",
    title: "Vidalossa Online Store",
    description:
      "Modern e-commerce app with secure payments powered by Flutterwave and real-time Firebase integration.",
    imageUrl: "./images/vidalossa-preview.jpeg", // You'll add this
    technologies: ["Flutter", "Firebase", "Flutterwave", "E-commerce"],
    category: "e-commerce",
    isPortrait: true,
    objectives:
      "Develop robust e-commerce solution with secure payments and real-time inventory management.",
    results:
      "300% increase in online sales and 50% reduction in order processing time.",
    demoUrl: "https://vidalossa-store.com",
    codeUrl: "https://github.com/gaelsassan/vidalossa-store",
  },
  {
    id: "4",
    title: "Medical Volunteer Website",
    description:
      "Complete website redesign for Medical Volunteer organization celebrating 25 years of healthcare advocacy.",
    imageUrl: "./images/volunteer-medical-preview.png", // You'll add this
    technologies: ["SvelteKit", "HTML5", "CSS3", "JavaScript", "Vercel"],
    category: "web",
    isPortrait: false,
    featured: true,
    objectives:
      "Create modern responsive website showcasing 25 years of medical volunteer work and promote anniversary events.",
    results:
      "Increased organization visibility and created modern platform for volunteer engagement.",
    demoUrl: "https://volontariat-medical-ci.vercel.app/",
    codeUrl: "",
  },
  {
    id: "5",
    title: "MELOUKA Artisan Website",
    description:
      "Modern showcase website for MELOUKA, an Ivorian handicraft knitting company with dynamic product management.",
    imageUrl: "./images/melouka-preview.png", // You'll add this
    technologies: ["SvelteKit", "Supabase", "Tailwind CSS", "Vercel"],
    category: "web",
    isPortrait: false,
    featured: true,
    objectives:
      "Develop elegant showcase website with dynamic product management and simplified ordering process.",
    results:
      "Increased company visibility and streamlined customer ordering process through WhatsApp integration.",
    demoUrl: "https://melouka.vercel.app/",
    codeUrl: "",
  },
  {
    id: "6",
    title: "RecipeMaster",
    description:
      "Web application for managing and organizing favorite recipes with internationalization support (FR, EN, ES).",
    imageUrl: "./images/recipe-master-preview.jpeg", // You'll add this
    technologies: ["SvelteKit", "JSON Server", "Paraglide", "JavaScript"],
    category: "web",
    isPortrait: false,
    featured: true,
    objectives:
      "Create modern frontend application with reactive state management and multi-language support.",
    results:
      "Developed clean architecture with reactive stores and dynamic routing for recipe management.",
    demoUrl: "",
    codeUrl: "https://github.com/gaelsassan/recipe-master",
  },
  {
    id: "7",
    title: "Moyivawa Health App",
    description:
      "E-health application for medication management and medical consultations with mobile payment integration.",
    imageUrl: "./images/moyivawa-preview.jpeg", // You'll add this
    technologies: ["Flutter", "Provider", "Mobile Payments", "Healthcare"],
    category: "medical",
    isPortrait: true,
    objectives:
      "Develop comprehensive health management solution with medication tracking and consultation features.",
    results:
      "Created secure healthcare platform with integrated payment systems for medical services.",
    demoUrl: "",
    codeUrl: "",
  },
  {
    id: "8",
    title: "Minimal Contacts",
    description:
      "Lightweight contact manager app using RandomUser.me API for dynamic contact generation and management.",
    imageUrl: "./images/minimal-contacts-preview.jpeg", // You'll add this
    technologies: ["Flutter", "REST APIs", "Flutter BLoC", "Dart"],
    category: "utility",
    isPortrait: true,
    objectives:
      "Build minimalist contact management app with clean architecture and API integration.",
    results:
      "Developed efficient contact management solution with smooth user experience and BLoC pattern.",
    demoUrl: "",
    codeUrl: "",
  },
  {
    id: "9",
    title: "RanTube",
    description:
      "Random YouTube video generator app with free and premium features, analytics integration.",
    imageUrl: "./images/rantube-preview.jpeg", // You'll add this
    technologies: ["Flutter", "Flutter BLoC", "Firebase", "YouTube API", "Google Analytics"],
    category: "entertainment",
    isPortrait: true,
    objectives:
      "Create engaging YouTube discovery platform with premium features and analytics tracking.",
    results:
      "Built scalable video discovery app with monetization strategy and user analytics.",
    demoUrl: "",
    codeUrl: "",
  },
  {
    id: "10",
    title: "Djassaman Budget Manager",
    description:
      "Intelligent budget management application built with Flask and SQLAlchemy for tracking finances.",
    imageUrl: "./images/djassaman-preview.jpeg", // You'll add this
    technologies: ["Flask", "SQLAlchemy", "HTML", "CSS", "Python", "JavaScript"],
    category: "fintech",
    isPortrait: false,
    featured: true,
    objectives:
      "Develop robust budget management solution for individuals and businesses with comprehensive tracking.",
    results:
      "Created efficient financial management platform with robust backend architecture.",
    demoUrl: "",
    codeUrl: "",
  },
  {
    id: "11",
    title: "Zem VTC App",
    description:
      "Innovative ride-hailing app offering smooth, secure and accessible transportation experience for passengers and drivers.",
    imageUrl: "./images/zem-preview.jpeg", // You'll add this
    technologies: ["Flutter", "Laravel", "GPS", "Google Maps", "PHP"],
    category: "transport",
    isPortrait: true,
    objectives:
      "Create comprehensive VTC platform with real-time tracking and intuitive booking system.",
    results:
      "Developed full-featured ride-hailing solution with driver and passenger applications.",
    demoUrl: "",
    codeUrl: "",
  },
  {
    id: "12",
    title: "FOSOPIQ Event Management",
    description:
      "Event management platform for humanitarian foundation activities across Education, Social, Health, and Environment sectors.",
    imageUrl: "./images/fosopiq-preview.jpeg", // You'll add this
    technologies: ["Flutter", "Provider", "Event Management", "Analytics"],
    category: "nonprofit",
    isPortrait: true,
    objectives:
      "Centralize and structure humanitarian initiatives ensuring better management and transparency.",
    results:
      "Built comprehensive platform tracking events and member contributions with analytical dashboard.",
    demoUrl: "",
    codeUrl: "",
  },
  {
    id: "13",
    title: "SOS AVC Medical Alert",
    description:
      "Life-saving application designed to respond quickly to stroke emergencies with immediate assistance features.",
    imageUrl: "./images/sosavc-preview.jpeg", // You'll add this
    technologies: ["Flutter", "Firebase", "Google Maps", "Laravel", "Emergency Services"],
    category: "medical",
    isPortrait: true,
    objectives:
      "Develop emergency response solution for stroke detection with rapid alert system and real-time assistance.",
    results:
      "Created critical healthcare app improving emergency response times and survival chances.",
    demoUrl: "",
    codeUrl: "",
  },
  {
    id: "14",
    title: "Maturus Scoring",
    description:
      "Organizational maturity assessment app helping companies measure, analyze and optimize their organizational performance.",
    imageUrl: "./images/maturus-preview.jpeg", // You'll add this
    technologies: ["Flutter", "Laravel", "Analytics", "Scoring Algorithms"],
    category: "business",
    isPortrait: true,
    objectives:
      "Provide precise organizational diagnosis with personalized recommendations for performance improvement.",
    results:
      "Delivered comprehensive assessment platform with intelligent scoring and sectoral benchmarking.",
    demoUrl: "",
    codeUrl: "",
  },
  {
    id: "15",
    title: "Meter Manager IoT",
    description:
      "Smart electricity consumption monitoring app with real-time analysis, forecasting and optimization features.",
    imageUrl: "./images/meter-manager-preview.jpeg", // You'll add this
    technologies: ["Flutter", "Laravel", "IoT", "Data Analytics", "Energy Management"],
    category: "iot",
    isPortrait: true,
    objectives:
      "Develop IoT solution for energy monitoring with alerts and consumption optimization.",
    results:
      "Achieved 25% average electricity consumption reduction among test users.",
    demoUrl: "",
    codeUrl: "",
  },
  {
    id: "16",
    title: "Sikka Digital Tontine",
    description:
      "Secure digital tontine app enabling users to easily manage group savings and contributions with encryption.",
    imageUrl: "./images/sikka-preview.jpeg", // You'll add this
    technologies: ["Flutter", "Django REST", "Encryption", "Financial Services"],
    category: "fintech",
    isPortrait: true,
    objectives:
      "Simplify group financial management with transparent, reliable and automated contribution system.",
    results:
      "Built secure platform enabling efficient group savings management with automated workflows.",
    demoUrl: "",
    codeUrl: "",
  },
  {
    id: "17",
    title: "IBH (Ivoire Beat Hub)",
    description:
      "Creative workspace app for artists - a Google Keep clone designed for capturing and organizing musical inspirations.",
    imageUrl: "./images/ibh-preview.jpeg", // You'll add this
    technologies: ["Flutter", "Firebase", "Audio Recording", "Cloud Storage"],
    category: "creative",
    isPortrait: true,
    objectives:
      "Provide artists with dedicated space to capture, organize and retrieve musical inspirations efficiently.",
    results:
      "Created intuitive platform helping artists structure their creative process without losing ideas.",
    demoUrl: "",
    codeUrl: "",
  },
  {
  "id": "18",
  "title": "Baromètre Santé",
  "description": "Advanced telemedicine platform with AI-powered health analytics, remote patient monitoring, and intelligent appointment orchestration for comprehensive digital healthcare.",
  "imageUrl": "./images/barometre-sante-preview.jpeg",
  "technologies": ["Flutter", "Telemedicine APIs", "Health Analytics", "Real-time Monitoring", "AI Diagnostics", "Secure Video Calls"],
  "category": "medical",
  "featured": false,
  "isPortrait": true,
  "objectives": "Transform healthcare accessibility by providing comprehensive remote medical services with intelligent health tracking and predictive wellness analytics.",
  "results": "Enabled 5,000+ remote consultations, reduced patient wait times by 70%, and achieved 95% diagnostic accuracy through AI-assisted health monitoring.",
  "demoUrl": "",
  "codeUrl": ""
},
   {
    "id": "19",
    "title": "Collards Greens Bank",
    "description": "Revolutionary micro-banking app empowering financial inclusion with AI-driven credit scoring and blockchain-secured transactions for underbanked communities.",
    "imageUrl": "./images/collards-greens-preview.png",
    "technologies": ["Flutter", "Blockchain", "AI/ML", "Biometric Auth", "Micro-finance", "NSIA Integration"],
    "category": "fintech",
    "featured": false,
    "isPortrait": true,
    "objectives": "Bridge the financial gap by providing accessible banking services with intelligent risk assessment and personalized financial wellness tracking.",
    "results": "Enabled 10,000+ users to access micro-loans and savings with 95% repayment rate through AI-powered financial behavior analysis.",
    "demoUrl": "",
    "codeUrl": ""
  },
  {
    "id": "20", 
    "title": "FindMacy",
    "description": "Smart pharmacy locator with real-time medication availability, AI-powered drug interaction checker, and integrated telemedicine consultations.",
    "imageUrl": "./images/findmacy-preview.png",
    "technologies": ["Flutter", "Google Maps API", "Real-time Database", "AI Drug Analysis", "Geolocation"],
    "category": "medical",
    "featured": false,
    "isPortrait": true,
    "objectives": "Revolutionize pharmaceutical access by connecting patients to available medications while ensuring safety through intelligent drug interaction prevention.",
    "results": "Connected 500+ pharmacies with real-time inventory, reduced medication search time by 80%, and prevented 200+ potential drug interactions.",
    "demoUrl": "",
    "codeUrl": ""
  },
  {
    "id": "21",
    "title": "BabiWarren",
    "description": "Next-generation ride-sharing platform with dynamic pricing algorithms, carbon footprint tracking, and AI-optimized route planning for sustainable urban mobility.",
    "imageUrl": "./images/babiwarren-preview.png", 
    "technologies": ["Flutter", "Machine Learning", "Real-time GPS", "Carbon Analytics", "Dynamic Pricing", "Route Optimization"],
    "category": "transport",
    "featured": false,
    "isPortrait": true,
    "objectives": "Transform urban transportation through intelligent matching, environmental consciousness, and predictive analytics for optimal ride experiences.",
    "results": "Achieved 40% reduction in CO2 emissions per ride, 25% faster average trip times, and 95% user satisfaction through AI-driven optimizations.",
    "demoUrl": "",
    "codeUrl": ""
  },
  {
    "id": "22",
    "title": "Le Livreur",
    "description": "Intelligent multi-vendor delivery ecosystem with predictive logistics, real-time order orchestration, and AI-powered demand forecasting for local businesses.",
    "imageUrl": "./images/le-livreur-preview.png",
    "technologies": ["Flutter", "Predictive Analytics", "Multi-vendor API", "Real-time Tracking", "Smart Logistics", "Demand Forecasting"],
    "category": "e-commerce", 
    "featured": false,
    "isPortrait": true,
    "objectives": "Revolutionize local commerce by creating an intelligent delivery network that anticipates demand and optimizes logistics for maximum efficiency.",
    "results": "Reduced delivery times by 50%, increased local business revenues by 200%, and achieved 98% on-time delivery rate through predictive routing.",
    "demoUrl": "",
    "codeUrl": ""
  }, 
  {
    "id": "23",
    "title": "Le Livreur Agent",
    "description": "Dedicated mobile application for delivery agents featuring real-time GPS tracking, intelligent route optimization, and intuitive order management interface. Maximizes delivery efficiency with advanced tracking tools and seamless communication features.",
    "imageUrl": "./images/le-livreur-agent-preview.png",
    "technologies": ["Flutter", "GPS Tracking", "Route Optimization", "Real-time Notifications", "Offline Mode", "Performance Analytics"],
    "category": "mobile-app",
    "featured": false,
    "isPortrait": true,
    "objectives": "Streamline delivery operations by providing agents with a powerful, user-friendly application that optimizes routes, enhances productivity, and facilitates communication with customers and restaurants.",
    "results": "Mobile-optimized user interface, 40% reduction in navigation time, 90% improvement in delivery agent satisfaction, and real-time tracking system with 99.5% accuracy.",
    "demoUrl": "",
    "codeUrl": ""
  },
  {
    "id": "24",
    "title": "Le Livreur Resto",
    "description": "Comprehensive restaurant management platform with real-time order interface, dynamic menu management, performance analytics, and seamless integration with the delivery ecosystem. Optimizes culinary operations and customer relationships.",
    "imageUrl": "./images/le-livreur-resto-preview.png",
    "technologies": ["Flutter", "Restaurant POS", "Menu Management", "Order Analytics", "Kitchen Display", "Customer Feedback"],
    "category": "restaurant-tech",
    "featured": false,
    "isPortrait": true,
    "objectives": "Digitize and optimize partner restaurant operations by providing modern tools for order management, menu control, and performance analysis while maintaining high-quality culinary experiences.",
    "results": "60% increase in kitchen efficiency, 35% reduction in order errors, 80% improvement in customer satisfaction, and detailed analytics insights for operational optimization.",
    "demoUrl": "",
    "codeUrl": ""
  }, 
  {
    "id": "25",
    "title": "AZPROD",
    "description": "Creative agency specializing in music production, artist booking, and digital influence across West Africa. We transform the music industry by connecting emerging talents, brands, and audiences through authentic collaborations and memorable events.",
    "imageUrl": "./images/azprod-preview.png",
    "technologies": ["Booking Management", "Event Production", "Influencer Marketing", "Artist Development", "Digital Strategy", "Content Creation"],
    "category": "entertainment-media",
    "featured": true,
    "isPortrait": false,
    "objectives": "Revolutionize the African music and media ecosystem by creating sustainable bridges between artists, influencers, and brands, while developing new talents and producing large-scale cultural events.",
    "results": "Over 6 years of expertise in the music industry, production of major events like FESTIGOLA Kinshasa 2024, development of recognized artists such as Barack La Voix d'Or, and creation of an authentic influence network across West Africa.",
    "demoUrl": "https://azprod.fr/",
    "codeUrl": ""
  },
  {
    "id": "26",
    "title": "MôyCom",
    "description": "Commercial management application for healthcare sales representatives featuring client tracking, product catalog management, order processing, and performance analytics. Streamlines pharmaceutical and medical equipment sales operations.",
    "imageUrl": "./images/moycom-preview.png",
    "technologies": ["Flutter", "CRM Integration", "Sales Analytics", "Inventory Management", "Client Tracking", "Mobile Commerce"],
    "category": "business-tools",
    "featured": false,
    "isPortrait": true,
    "objectives": "Optimize healthcare sales operations by providing commercial teams with comprehensive tools for client management, product promotion, and sales tracking in the medical sector.",
    "results": "Enhanced sales team productivity by 45%, improved client relationship management, streamlined order processing with 95% accuracy, and comprehensive sales analytics dashboard.",
    "demoUrl": "",
    "codeUrl": ""
  },
  {
    "id": "27",
    "title": "Gestopedia",
    "description": "Intelligent inventory management system with real-time sales tracking, automated stock monitoring, and predictive analytics. Features comprehensive dashboard for sales, stock levels, and financial performance with integrated banking and budgeting tools.",
    "imageUrl": "./images/gestopedia-preview.png",
    "technologies": ["Flutter", "Real-time Analytics", "Inventory Automation", "Financial Integration", "Predictive Forecasting", "Business Intelligence"],
    "category": "business-tools",
    "featured": false,
    "isPortrait": true,
    "objectives": "Transform traditional inventory management by providing businesses with intelligent tools for stock optimization, sales tracking, and financial planning, enabling data-driven decisions and operational efficiency.",
    "results": "Automated inventory tracking with 99% accuracy, reduced stock-outs by 65%, improved cash flow management, and comprehensive business analytics leading to 30% increase in operational efficiency.",
    "demoUrl": "",
    "codeUrl": ""
}
];

export default ProjectsGrid;