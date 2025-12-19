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
  const [visibleCount, setVisibleCount] = useState<number>(6);

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
  const projectsToShow = regularProjects.slice(0, visibleCount);
  const hasMoreProjects = visibleCount < regularProjects.length;

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
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="group relative px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-black font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                View More Projects ({Math.min(6, regularProjects.length - visibleCount)} more)
                <span>↓</span>
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
    imageUrl: "./images/metachanage-preview.jpeg", 
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
    imageUrl: "./images/galaxy-stream-preview.jpeg", 
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
    imageUrl: "./images/vidalossa-preview.jpeg", 
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
    imageUrl: "./images/volunteer-medical-preview.png", 
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
    imageUrl: "./images/melouka-preview.png", 
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
    imageUrl: "./images/recipe-master-preview.jpeg", 
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
    imageUrl: "./images/moyivawa-preview.jpeg", 
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
    imageUrl: "./images/minimal-contacts-preview.jpeg", 
    technologies: ["Flutter", "REST APIs", "Flutter BLoC", "Dart"],
    category: "education",
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
    imageUrl: "./images/rantube-preview.jpeg", 
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
    imageUrl: "./images/djassaman-preview.jpeg", 
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
    imageUrl: "./images/zem-preview.jpeg", 
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
    imageUrl: "./images/fosopiq-preview.jpeg", 
    technologies: ["Flutter", "Provider", "Event Management", "Analytics"],
    category: "education",
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
    imageUrl: "./images/sosavc-preview.jpeg", 
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
    imageUrl: "./images/maturus-preview.jpeg", 
    technologies: ["Flutter", "Laravel", "Analytics", "Scoring Algorithms"],
    category: "security",
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
    imageUrl: "./images/meter-manager-preview.jpeg", 
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
    imageUrl: "./images/sikka-preview.jpeg", 
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
    imageUrl: "./images/ibh-preview.jpeg", 
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
    "category": "e-commerce",
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
    "category": "e-commerce",
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
    "category": "entertainment",
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
    "category": "medical",
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
    "category": "fintech",
    "featured": false,
    "isPortrait": true,
    "objectives": "Transform traditional inventory management by providing businesses with intelligent tools for stock optimization, sales tracking, and financial planning, enabling data-driven decisions and operational efficiency.",
    "results": "Automated inventory tracking with 99% accuracy, reduced stock-outs by 65%, improved cash flow management, and comprehensive business analytics leading to 30% increase in operational efficiency.",
    "demoUrl": "",
    "codeUrl": ""
  },
  {
  "id": "28",
  "title": "Jéko Cockpit",
  "description": "Back-office moderne pour la supervision et la gestion des paiements, transactions, membres et équipements connectés. Offre une visualisation claire des données financières et comportementales à travers un tableau de bord interactif.",
  "imageUrl": "./images/jeko-cockpit-preview.PNG",
  "technologies": ["Svelte.js", "Recharts", "TailwindCSS", "API REST", "Responsive UI", "Dashboard Analytics"],
  "category": "fintech",
  "featured": true,
  "isPortrait": false,
  "objectives": "Centraliser la gestion des activités financières et opérationnelles d’un commerçant via un cockpit intelligent. Fournir des insights en temps réel pour optimiser les décisions et fluidifier les opérations quotidiennes.",
  "results": "Visualisation en temps réel de la répartition des paiements, suivi de croissance des revenus, et gestion complète des points de vente et des utilisateurs. Gain de temps administratif estimé à 40%.",
  "demoUrl": "https://cockpit.jeko.africa/dashboard",
  "codeUrl": ""
  },
  {
  "id": "29",
  "title": "My Design Pro",
  "description": "Version avancée de l’application My Design, offrant aux créatifs un espace pour créer, partager et s’inspirer. Propose un environnement communautaire favorisant l’échange et la visibilité des œuvres.",
  "imageUrl": "./images/my-design-pro-preview.jpeg",
  "technologies": ["Flutter", "Firebase Auth", "Cloud Storage", "REST API", "Responsive UI", "Community Features"],
  "category": "creative",
  "featured": false,
  "isPortrait": true,
  "objectives": "Donner aux designers la possibilité de publier leurs créations, d’interagir avec d’autres créatifs et de construire une communauté autour du design.",
  "results": "Création et partage de contenus graphiques par la communauté. Développement d’un réseau d’échanges et d’inspiration. Engagement et interaction accrus entre utilisateurs.",
  "demoUrl": "https://groupmydesign.com/",
  "codeUrl": ""
},
  {
  "id": "30",
  "title": "My Design",
  "description": "Application mobile permettant aux utilisateurs de découvrir des créations graphiques variées : affiches, logos et visuels créatifs. Favorise l'inspiration et le partage dans une communauté créative.",
  "imageUrl": "./images/my-design-user-preview.jpeg",
  "technologies": ["Flutter", "REST API", "Firebase", "Responsive UI", "Grid Layout", "Material Design"],
  "category": "creative",
  "featured": false,
  "isPortrait": true,
  "objectives": "Permettre aux utilisateurs de parcourir des designs créatifs, de filtrer par catégories (affiches, logos, etc.) et de s’inspirer pour leurs propres créations.",
  "results": "Interface simple et fluide qui met en avant les designs. Navigation rapide entre catégories. Expérience utilisateur optimisée pour mobile et tablettes.",
  "demoUrl": "https://groupmydesign.com/",
  "codeUrl": ""
},
{
  "id": "31",
  "title": "SOSMONEY ADMIN",
  "description": "Comprehensive employee loan management platform with automated approval workflows, real-time payment tracking, and intelligent risk assessment. Features advanced admin dashboard for loan processing, borrower management, and financial analytics.",
  "imageUrl": "./images/salary-credit-manager-preview.webp",
  "technologies": ["React", "Spring Boot", "Java", "REST API", "Financial Analytics", "Risk Assessment"],
  "category": "fintech",
  "featured": true,
  "isPortrait": false,
  "objectives": "Streamline employee loan processes by providing financial institutions with powerful tools for loan approval, risk evaluation, and payment monitoring while ensuring compliance and reducing processing time.",
  "results": "Automated loan approval workflow reducing processing time by 60%, comprehensive borrower tracking system, real-time payment monitoring with 99% accuracy, and advanced analytics dashboard for risk management.",
  "demoUrl": "https://sosmoney-admin.vercel.app/",
  "codeUrl": ""
},
{
  "id": "32",
  "title": "SOSMONEY Mobile",
  "description": "Mobile application for employee loan management allowing users to track their loan balance, payment history, and available credit limit. Features intuitive dashboard with loan evolution charts, repayment tracking, and instant notifications for payment reminders.",
  "imageUrl": "./images/salary-credit-mobile-preview.webp",
  "technologies": ["Flutter", "REST API", "Charts", "Push Notifications", "Secure Authentication", "Financial Tracking"],
  "category": "fintech",
  "featured": false,
  "isPortrait": true,
  "objectives": "Provide employees with easy access to their loan information through a user-friendly mobile interface, enabling real-time balance tracking, payment monitoring, and financial planning tools.",
  "results": "Seamless mobile experience with real-time loan tracking, visual payment evolution charts, automated payment reminders, and secure access to personal financial data with 100% uptime.",
  "demoUrl": "",
  "codeUrl": ""
},
{
  "id": "33",
  "title": "Simplex Visitor Tracker",
  "description": "GDPR-compliant visitor management system enabling real-time tracking of visitors within company premises without retaining identity cards. Features agent dashboard for assisted visits, badge verification, and comprehensive visit analytics with privacy-first approach.",
  "imageUrl": "./images/visitor-flow-tracker-preview.webp",
  "technologies": ["Flutter", "GDPR Compliance", "Badge System", "Real-time Tracking", "Privacy Management", "Visit Analytics"],
  "category": "security",
  "featured": false,
  "isPortrait": true,
  "objectives": "Modernize visitor management by providing secure, GDPR-compliant tracking solutions that maintain visitor privacy while ensuring comprehensive oversight of personnel movement within company facilities.",
  "results": "100% GDPR compliance achieved, real-time visitor location tracking, streamlined check-in/check-out process, and comprehensive visit analytics while protecting visitor identity and personal data.",
  "demoUrl": "",
  "codeUrl": ""
},
{
  "id": "34",
  "title": "WaveLink",
  "description": "Application mobile de transfert et de souscription rapide en Côte d'Ivoire. Permet d’envoyer du crédit, des forfaits internet ou des minutes d’appel sur les réseaux Orange, MTN et Moov, avec un paiement instantané et sécurisé via Wave.",
  "imageUrl": "./images/wavelink-preview.jpeg",
  "technologies": ["Flutter", "Wave API", "Mobile Money", "UI Responsive", "Payment Integration", "Telecom Services"],
  "category": "fintech",
  "featured": false,
  "isPortrait": true,
  "objectives": "Faciliter les transferts d’unités et de forfaits à travers les principaux réseaux mobiles ivoiriens, en proposant une solution fluide, rapide et accessible à tous via le paiement mobile Wave.",
  "results": "Expérience utilisateur simplifiée avec paiement en 1 clic, intégration fluide avec les trois grands opérateurs, transactions instantanées et interface intuitive adaptée au mobile.",
  "demoUrl": "",
  "codeUrl": ""
},
{
  "id": "35",
  "title": "Hooli Library",
  "description": "Bibliothèque numérique moderne permettant aux utilisateurs de lire, découvrir et gérer leurs livres préférés en ligne. Propose des recommandations personnalisées, des évaluations, et une interface élégante inspirée des meilleures plateformes de lecture.",
  "imageUrl": "./images/hooli-library-preview.jpeg",
  "technologies": ["Flutter", "Firebase", "Cloud Storage", "Recommendation Engine", "Responsive UI", "Book API"],
  "category": "education",
  "featured": false,
  "isPortrait": true,
  "objectives": "Créer une plateforme intuitive et interactive pour la lecture numérique, offrant un accès simple à des milliers de livres et une expérience fluide sur mobile.",
  "results": "Augmentation de 60% de l’engagement utilisateur grâce aux recommandations personnalisées et à la fluidité de navigation. Interface responsive et mode lecture optimisé pour tous les écrans.",
  "demoUrl": "",
  "codeUrl": ""
},
{
  "id": "36",
  "title": "GS Dot Bet",
  "description": "Application de suivi et de pronostic sportif offrant une expérience complète pour les passionnés de football. Suivez les scores en direct, les classements, et placez vos paris en toute sécurité depuis une interface moderne et immersive.",
  "imageUrl": "./images/gs-dot-bet-preview.jpeg",
  "technologies": ["Flutter", "Live Data API", "Sports Odds API", "Firebase", "Animations", "Dark Mode UI"],
  "category": "sports-betting",
  "featured": false,
  "isPortrait": true,
  "objectives": "Fournir une plateforme performante pour suivre les matchs en temps réel, consulter les statistiques, et effectuer des paris rapides tout en profitant d’un design soigné et ergonomique.",
  "results": "Mise à jour en temps réel des scores, interface fluide et foncée adaptée aux sessions prolongées, et intégration transparente des cotes pour une expérience de pari immersive.",
  "demoUrl": "",
  "codeUrl": ""
},
{
  "id": "37",
  "title": "Kotlin Bank UI & API",
  "description": "Suite bancaire complète alliant une application mobile Kotlin moderne (Jetpack Compose) et une API backend Ktor gamifiée, conçue pour démocratiser l’éducation financière en Afrique à travers la gamification et les fonctionnalités locales.",
  "imageUrl": "./images/kotlinbank-suite-preview.jpeg",
  "technologies": [
    "Kotlin",
    "Jetpack Compose",
    "Ktor",
    "Material 3",
    "MVVM",
    "StateFlow",
    "PostgreSQL",
    "JWT Auth",
    "REST API"
  ],
  "category": "fintech",
  "featured": false,
  "isPortrait": true,
  "objectives": "Créer une solution fintech innovante combinant application mobile et API bancaire gamifiée. L’objectif est de promouvoir l’éducation financière en Afrique grâce à des fonctionnalités culturelles telles que les tontines numériques, un marketplace local et un système de récompenses interactif.",
  "results": "Développement d’une architecture complète front–back : application Kotlin fluide avec Jetpack Compose et API Ktor performante. L’ensemble offre une expérience immersive avec gamification, modules éducatifs, et intégration des réalités africaines dans la gestion financière.",
  "demoUrl": "https://github.com/ClichyMercury/KotlinBankAPI",
  "codeUrl": "https://github.com/ClichyMercury/KotlinBankUI"
},
{
  "id": "48",
  "title": "Alerte E25 – Application Citoyenne",
  "description": "Application mobile permettant aux citoyens de signaler en temps réel des incidents ou situations urgentes aux autorités locales. Elle intègre la géolocalisation, l'envoi d’alertes, la sélection de priorité, ainsi qu'une interface simple et intuitive pour faciliter la participation citoyenne.",
  "imageUrl": "./images/alerte_e25_client_preview.png",
  "technologies": [
    "Flutter",
    "Dart",
    "Provider",
    "OpenStreetMap",
    "REST API",
    "Geolocator",
    "Firebase Messaging"
  ],
  "category": "security",
  "featured": false,
  "isPortrait": true,
  "objectives": "Offrir aux populations un outil simple, rapide et fiable pour signaler les urgences : incendies, accidents, agressions, nuisances publiques ou anomalies urbaines. L’objectif principal est de digitaliser la collaboration entre citoyens et autorités pour réduire les temps d'intervention.",
  "results": "Mise en place d’un parcours fluide de déclaration d’alerte, intégration de la carte interactive, récupération précise de la localisation, catégorisation des incidents et synchronisation en temps réel avec l’API. L’application permet une meilleure visibilité des urgences et améliore la communication citoyenne.",
  "demoUrl": "",
  "codeUrl": ""
},
{
  "id": "49",
  "title": "Alerte E25 – Application Admin",
  "description": "Interface mobile dédiée aux autorités pour visualiser, filtrer et gérer les alertes envoyées par les citoyens. Elle affiche sur une carte toutes les alertes en temps réel avec un système de priorisation (Urgent, Élevée, Moyenne, Faible) et permet un suivi opérationnel efficace.",
  "imageUrl": "./images/alerte_e25_admin_preview.png",
  "technologies": [
    "Flutter",
    "Dart",
    "Provider",
    "OpenStreetMap",
    "Cluster Markers",
    "REST API",
    "Firebase Messaging"
  ],
  "category": "security",
  "featured": false,
  "isPortrait": true,
  "objectives": "Donner aux autorités une vision globale et précise de toutes les alertes en temps réel. Prioriser les urgences, faciliter la prise de décision, optimiser la répartition des équipes sur le terrain et digitaliser la chaîne de traitement des incidents.",
  "results": "Développement d'une carte administrative complète avec clustering, filtres par priorité, rafraîchissement en direct, gestion avancée des états des alertes et intégration complète avec le backend. L’application améliore la rapidité et l'efficacité des interventions.",
  "demoUrl": "",
  "codeUrl": ""
},
{
  "id": "50",
  "title": "Jeko Pay – Nouvelle Page de Checkout",
  "description": "Interface de paiement moderne développée autour de l’API Jeko Pay, permettant aux utilisateurs de régler leurs commandes via différents moyens de paiement mobiles (Wave, Orange Money, Moov Money, MTN MoMo, Djamo, Jeko). Le checkout offre une expérience fluide, sécurisée et multi-méthodes, optimisée pour le taux de conversion.",
  "imageUrl": "./images/jeko_pay_preview.png",
  "technologies": [
    "TypeScript",
    "SvelteKit",
    "REST API",
    "Jeko Pay API",
    "OAuth2",
    "Responsive UI",
    "Mobile Money Integration"
  ],
  "category": "fintech",
  "featured": true,
  "isPortrait": false,
  "objectives": "Créer un module universel de paiement permettant aux marchands et aux applications tierces de proposer un checkout unifié compatible avec les solutions de paiement mobile les plus utilisées en Afrique de l’Ouest. L’objectif est d’améliorer l’adoption, réduire la friction au paiement et offrir une interface harmonisée.",
  "results": "Développement d’un checkout responsive avec sélection intelligente des méthodes de paiement, validation automatique des numéros, gestion sécurisée de la transaction et design professionnel. Le système améliore considérablement la fluidité du parcours de paiement et favorise la confiance des utilisateurs.",
  "demoUrl": "https://pay.jeko.africa/pl/451641bf-e868-40be-aa4c-b9fc6a22320e",
  "codeUrl": "https://jeko.africa"
},
{
  "id": "51",
  "title": "Payix – Application Mobile de Paiement",
  "description": "Application fintech permettant aux utilisateurs de gérer leur solde, effectuer des transferts, recharger leur portefeuille, effectuer des retraits, payer des services et accéder à des services de prêt. L’interface est moderne, fluide et pensée pour simplifier la gestion quotidienne des transactions.",
  "imageUrl": "./images/payix_preview.png",
  "technologies": [
    "Flutter",
    "Dart",
    "Provider",
    "REST API",
    "Firebase",
    "Secure Storage",
    "Mobile Money Integration"
  ],
  "category": "fintech",
  "featured": false,
  "isPortrait": true,
  "objectives": "Créer une application simple et intuitive pour permettre aux utilisateurs de suivre leur solde en temps réel, consulter leurs transactions et accéder facilement aux fonctionnalités essentielles telles que les transferts, dépôts, paiements, retraits et services financiers annexes.",
  "results": "Interface épurée avec affichage dynamique du solde, gestion des transactions récentes, boutons d’action rapide et navigation fluide. Les utilisateurs peuvent effectuer des opérations financières de manière rapide, sécurisée et agréable.",
  "demoUrl": "",
  "codeUrl": ""
},
{
  "id": "52",
  "title": "Jeko Landing Page",
  "description": "Landing page moderne pour Jeko, solution de paiement mobile money unifiée permettant aux commerçants d'encaisser via un QR code unique (Wave, Orange Money, MTN, Moov, Visa, Mastercard).",
  "imageUrl": "./images/jeko-landing-preview.png",
  "technologies": ["SvelteKit", "TailwindCSS", "Responsive Design", "Framer Motion", "Vercel"],
  "category": "fintech",
  "featured": true,
  "isPortrait": false,
  "objectives": "Créer une vitrine digitale impactante pour présenter la solution Jeko aux commerçants ivoiriens et faciliter l'acquisition de nouveaux utilisateurs.",
  "results": "Interface épurée avec taux de conversion optimisé, intégration des stores (App Store, Google Play) et mise en avant des +500 commerçants partenaires.",
  "demoUrl": "https://jeko.africa",
  "codeUrl": ""
},
{
  "id": "53",
  "title": "Jeko Download Page",
  "description": "Page de téléchargement dédiée à l'application Jeko Business, permettant aux commerçants d'installer rapidement l'app pour finaliser leurs paiements.",
  "imageUrl": "./images/jeko-download-preview.png",
  "technologies": ["SvelteKit", "TailwindCSS", "Deep Linking", "App Store Connect", "Google Play"],
  "category": "fintech",
  "featured": true,
  "isPortrait": false,
  "objectives": "Rediriger les utilisateurs vers les stores appropriés selon leur appareil et simplifier le parcours d'installation de l'application Jeko Business.",
  "results": "Expérience fluide avec détection automatique de plateforme et redirection intelligente vers iOS ou Android.",
  "demoUrl": "https://jeko.africa/download",
  "codeUrl": ""
},
{
  "id": "54",
  "title": "Jeko Demo – Paiement Redirect",
  "description": "Interface de démonstration permettant aux développeurs de tester l'API Jeko Pay en créant des paiements redirect avec sélection de boutique, montant et méthode de paiement (Wave, Orange Money, MTN, Moov, Djamo).",
  "imageUrl": "./images/jeko-demo-preview.png",
  "technologies": ["SvelteKit", "TailwindCSS", "Jeko Pay API", "REST API", "OAuth2"],
  "category": "fintech",
  "featured": true,
  "isPortrait": false,
  "objectives": "Fournir un environnement de test interactif pour les développeurs souhaitant intégrer l'API Jeko Pay dans leurs applications, avec simulation complète du flux de paiement redirect.",
  "results": "Outil de test fonctionnel permettant de valider les intégrations avant mise en production, avec support de toutes les méthodes de paiement et gestion des callbacks.",
  "demoUrl": "https://demo.jeko.africa",
  "codeUrl": ""
},
{
  "id": "55",
  "title": "Alph Sécurité (Landing Page) – Sécurisation de quartier à la demande",
  "description": "landing page de preseentation de la solution Alph Sécurité, une Plateforme digitale permettant aux particuliers et communautés de sécuriser leur quartier en un clic, en réservant des agents de sécurité certifiés, en rejoignant des communautés de vigilance et en consultant le niveau de sécurité en temps réel.",
  "imageUrl": "./images/alph-securite-preview.png",
  "technologies": [
    "Vue.js",
    "TailwindCSS",
    "API REST",
    "Laravel",
    "Geolocation",
    "Notifications temps réel",
    "Payment Integration"
  ],
  "category": "security",
  "featured": true,
  "isPortrait": false,
  "objectives": "Démocratiser l’accès à la sécurité privée en Afrique en proposant une solution simple, rapide et communautaire pour réserver des agents de sécurité et surveiller les zones à risque en temps réel.",
  "results": "Mise en place d’une plateforme complète combinant application mobile et interface web, avec réservation d’agents, score de sécurité par zone, notifications en temps réel et système communautaire de vigilance.",
  "demoUrl": "https://www.alphsecurite.ci/",
  "codeUrl": ""
},
{
  "id": "56",
  "title": "Alph Sécurité – Application Mobile Client",
  "description": "Application mobile permettant aux particuliers de réserver des agents de sécurité certifiés pour différents types de missions : garde rapprochée, sécurité bâtiment, sécurité événementielle et escorte VIP. Interface intuitive avec géolocalisation et système de réservation simplifié.",
  "imageUrl": "./images/alph-securite-mobile-preview.jpeg",
  "technologies": [
    "Flutter",
    "Dart",
    "Provider",
    "Google Maps API",
    "REST API",
    "Firebase Messaging",
    "Payment Integration"
  ],
  "category": "security",
  "featured": false,
  "isPortrait": true,
  "objectives": "Offrir aux utilisateurs un accès rapide et sécurisé à des services de sécurité privée à la demande, avec une expérience de réservation fluide et un suivi en temps réel des agents assignés.",
  "results": "Interface moderne avec sélection de mission par catégorie, géolocalisation automatique, système de réservation en quelques clics et offres promotionnelles pour les nouveaux utilisateurs (-15% sur la première mission).",
  "demoUrl": "https://www.alphsecurite.ci/",
  "codeUrl": ""
},
{
  "id": "57",
  "title": "PLUSS Alert – Application Mobile Citoyenne",
  "description": "Application mobile de la Plateforme Une Seule Santé (PLUSS) de Côte d'Ivoire permettant aux citoyens de signaler en temps réel des alertes sanitaires liées aux zoonoses, épidémies et menaces de santé publique à l'interface Homme-Animal-Environnement.",
  "imageUrl": "./images/pluss-alert-mobile-preview.jpeg",
  "technologies": [
    "Flutter",
    "Dart",
    "Provider",
    "REST API",
    "Firebase Messaging",
    "Geolocation",
    "One Health Integration"
  ],
  "category": "medical",
  "featured": false,
  "isPortrait": true,
  "objectives": "Digitaliser la surveillance sanitaire en Côte d'Ivoire en permettant aux citoyens de signaler rapidement les menaces de santé publique (COVID-19, Choléra, Ebola, etc.) avec géolocalisation et connexion aux services de santé partenaires comme MSF.",
  "results": "Système de signalement d'alertes par catégorie (Santé, Zoonoses, Environnement) avec niveaux de priorité, affichage des statistiques en temps réel et redirection vers les services de santé compétents pour une prise en charge rapide.",
  "demoUrl": "https://www.pluss.ci/",
  "codeUrl": ""
},
{
  "id": "58",
  "title": "PLUSS CI – Backoffice Administration",
  "description": "Interface d'administration web de la Plateforme Une Seule Santé permettant aux autorités sanitaires de visualiser, filtrer et gérer les alertes signalées par les citoyens. Tableau de bord complet avec statistiques en temps réel, gestion des agents et suivi des services de santé.",
  "imageUrl": "./images/pluss-backoffice-preview.png",
  "technologies": [
    "SvelteKit",
    "TypeScript",
    "TailwindCSS",
    "REST API",
    "Dashboard Analytics",
    "Real-time Updates",
    "Vercel"
  ],
  "category": "medical",
  "featured": true,
  "isPortrait": false,
  "objectives": "Centraliser la gestion des alertes sanitaires pour les autorités de santé publique, avec une vision globale des menaces en cours, le suivi des agents actifs et la coordination avec les services de santé partenaires.",
  "results": "Tableau de bord interactif affichant le total des alertes, les statuts (en attente, résolues), les agents actifs, et une liste détaillée des alertes récentes avec filtrage par priorité (Haute, Moyenne, Faible) et catégorie (COVID-19, Choléra, etc.).",
  "demoUrl": "https://pluss-backoffice.vercel.app/dashboard",
  "codeUrl": ""
}
];

export default ProjectsGrid;