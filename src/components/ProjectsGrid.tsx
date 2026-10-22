import { useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import ProjectModal, { ModalProject } from "./ProjectModal";
import SectionRail from "./fx/SectionRail";
import DeviceLab from "./DeviceLab";

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
  countries?: string[];
}

interface ProjectsGridProps {
  projects?: Project[];
}

const toModal = (p: Project): ModalProject => ({
  title: p.title,
  description: p.description,
  imageUrl: p.imageUrl,
  technologies: p.technologies,
  category: p.category,
  objectives: p.objectives,
  results: p.results,
  demoUrl: p.demoUrl,
  codeUrl: p.codeUrl,
  isPortrait: p.isPortrait,
  countries: p.countries,
});

const STAMPS = ["TOP SECRET", "CLASSIFIED", "CONFIDENTIAL", "EYES ONLY"];

const FeaturedDossiers = ({ projects, onSelect }: { projects: Project[]; onSelect: (p: Project) => void }) => {
  const [expanded, setExpanded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  const toggleExpanded = () => {
    setExpanded((v) => {
      if (v) {
        requestAnimationFrame(() => {
          sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
      return !v;
    });
  };

  const drag = useRef({ down: false, startX: 0, scrollLeft: 0, moved: false });

  const onPointerDown = (e: React.PointerEvent) => {
    if (!rowRef.current) return;
    drag.current = { down: true, startX: e.clientX, scrollLeft: rowRef.current.scrollLeft, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.down || !rowRef.current) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 6) drag.current.moved = true;
    rowRef.current.scrollLeft = drag.current.scrollLeft - dx;
  };

  const endDrag = () => {
    drag.current.down = false;
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <div ref={sectionRef} className="relative mb-24 scroll-mt-24">
      <div className="flex items-center gap-3 mb-6 font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--fg-faint)" }}>
        <span style={{ color: "var(--accent)" }}>★</span> featured_archive // clearance_level_5
        <div className="flex-1 tentacle-line" />
        <button
          type="button"
          onClick={toggleExpanded}
          aria-expanded={expanded}
          className="flex-shrink-0 flex items-center gap-1.5 transition-colors duration-300 hover:text-[var(--accent)]"
          style={{ color: "var(--fg-muted)" }}
          data-cursor="view"
        >
          {expanded ? "collapse" : "expand_all"}
          <span className="transition-transform duration-300" style={{ display: "inline-block", transform: expanded ? "rotate(180deg)" : "none", color: "var(--accent)" }}>▾</span>
        </button>
      </div>

      {expanded ? (
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4 mb-3">
          {projects.map((project, i) => (
            <motion.button
              key={project.id}
              className="group relative block w-full mb-3 sm:mb-4 break-inside-avoid rounded-lg overflow-hidden text-left transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.12)]"
              style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-card)" }}
              onClick={() => onSelect(project)}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              data-cursor="declassify"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
              <div
                className="absolute top-3 -right-1 px-2 py-0.5 font-mono text-[9px] font-bold tracking-[0.2em] rotate-[-12deg] pointer-events-none"
                style={{ color: "#FF4D4D", border: "2px double #FF4D4D", background: "rgba(5,6,10,0.55)", opacity: 0.9 }}
              >
                {STAMPS[i % STAMPS.length]}
              </div>
              <span
                className="absolute bottom-0 inset-x-0 flex flex-col gap-1 px-2.5 py-2 font-mono text-[9px] uppercase tracking-[0.1em]"
                style={{ background: "linear-gradient(to top, rgba(5,6,10,0.94), transparent)", color: "var(--fg-muted)" }}
              >
                <span className="truncate transition-colors duration-300 group-hover:text-[var(--fg)]">{project.title}</span>
                <span className="flex items-center justify-between gap-2">
                  <span>case_#{String(i + 1).padStart(3, "0")}</span>
                  <span className="flex-shrink-0" style={{ color: "var(--accent)" }}>{project.category} ↗</span>
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      ) : (
      <div className="relative">
        <div
          ref={rowRef}
          className="flex items-end overflow-x-auto overflow-y-hidden pt-10 pb-3 px-2 select-none"
          style={{ scrollbarWidth: "thin" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={onClickCapture}
          data-cursor="drag"
        >
          {projects.map((project, i) => (
            <motion.button
              key={project.id}
              className="group relative flex-shrink-0 w-72 sm:w-80 lg:w-[340px] text-left"
              style={{ marginLeft: i === 0 ? 0 : -36, zIndex: i + 1 }}
              initial={{ y: 120, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + Math.min(i, 8) * 0.08, duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
              whileHover={{ y: -18, zIndex: 40, rotate: i % 2 === 0 ? -0.8 : 0.8 }}
              onClick={() => onSelect(project)}
              data-cursor="declassify"
            >
              <div
                className="relative w-max max-w-[85%] px-3 py-1.5 rounded-t font-mono text-[9px] uppercase tracking-[0.15em] truncate transition-colors duration-300 group-hover:text-[var(--accent)]"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-medium)",
                  borderBottom: "none",
                  color: "var(--fg-muted)",
                  marginLeft: `${(i % 3) * 26 + 6}%`,
                }}
              >
                {project.title}
              </div>

              <div
                className="relative h-80 rounded-lg overflow-hidden transition-shadow duration-300 group-hover:shadow-[0_-10px_40px_rgba(0,229,255,0.15)]"
                style={{
                  border: "1px solid var(--border-medium)",
                  boxShadow: "-12px 0 24px rgba(0,0,0,0.45)",
                  background: "var(--bg)",
                }}
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500 grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 scanlines opacity-25 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-28 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(5,6,10,0.95), transparent)" }} />

                <div
                  className="absolute top-4 -right-2 px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.2em] rotate-[-12deg] pointer-events-none"
                  style={{
                    color: "#FF4D4D",
                    border: "2px double #FF4D4D",
                    background: "rgba(5,6,10,0.55)",
                    opacity: 0.9,
                  }}
                >
                  {STAMPS[i % STAMPS.length]}
                </div>

                <p className="absolute bottom-9 left-3.5 right-3.5 font-mono text-[10px] leading-relaxed line-clamp-2 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" style={{ color: "var(--fg)" }}>
                  {project.description}
                </p>

                <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-3.5 py-2.5 font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--fg-muted)", background: "rgba(10,13,20,0.85)", borderTop: "1px solid var(--border-subtle)", backdropFilter: "blur(6px)" }}>
                  <span>case_#{String(i + 1).padStart(3, "0")}</span>
                  <span style={{ color: "var(--accent)" }}>{project.category} ↗</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      )}

      <div
        className="relative w-full rounded-lg overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #151B28, #0A0D14)",
          border: "1px solid var(--border-medium)",
          borderTop: "1px solid rgba(0,229,255,0.35)",
        }}
      >
        <div className="flex items-center justify-between px-5 sm:px-8 py-5">
          <div className="flex items-center gap-2.5">
            {[0, 1].map((d) => (
              <span key={d} className="w-2 h-2 rounded-full" style={{ background: "var(--border-medium)", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.8)" }} />
            ))}
          </div>

          <div className="flex flex-col items-center gap-2.5">
            <button
              type="button"
              onClick={toggleExpanded}
              aria-expanded={expanded}
              className="px-4 py-1 rounded font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] flex items-center gap-2 transition-colors duration-300 hover:text-[var(--accent)] hover:border-[var(--accent)]"
              style={{ border: "1px solid var(--border-medium)", background: "var(--bg)", color: "var(--fg-muted)" }}
              data-cursor="view"
            >
              featured_cases — {projects.length} dossiers
              <span className="transition-transform duration-300" style={{ display: "inline-block", transform: expanded ? "rotate(180deg)" : "none", color: "var(--accent)" }}>▾</span>
            </button>
            <div className="w-32 sm:w-44 h-2 rounded-full" style={{ background: "var(--bg)", border: "1px solid var(--border-medium)", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.7)" }} />
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#28C840" }} />
            {[0, 1].map((d) => (
              <span key={d} className="w-2 h-2 rounded-full" style={{ background: "var(--border-medium)", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.8)" }} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.3em] opacity-50" style={{ color: "var(--fg-faint)" }}>
        {expanded ? "[ click_to_declassify — collapse_to_stack ]" : "[ drag_to_browse — click_to_declassify — expand_for_grid ]"}
      </div>
    </div>
  );
};

const ProjectsGrid = ({ projects = defaultProjects }: ProjectsGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const toggleGallery = () => {
    setGalleryOpen((open) => {
      if (open) {
        requestAnimationFrame(() => galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
      }
      return !open;
    });
  };
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const categories = [
    "all",
    ...Array.from(new Set(projects.map((project) => project.category))),
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const featuredProjects = projects.filter((p) => p.featured);
  const mobileApps = projects
    .filter((p) => p.isPortrait)
    .sort((a, b) => Number(b.id) - Number(a.id));
  const openProject = (id: string) => {
    const project = projects.find((p) => p.id === id);
    if (project) setModalProject(project);
  };
  const regularProjects =
    selectedCategory === "all"
      ? filteredProjects.filter((p) => !p.featured)
      : filteredProjects;

  return (
    <section
      id="projects"
      className="min-h-screen py-32 lg:py-44 px-6 relative"
    >
      <SectionRail index="03" label="deployments" motif="crosshair" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader
          index="03"
          label="deployments"
          title="Featured"
          titleHighlight="Projects"
          description="Discover my latest mobile applications and web projects, crafted with precision and innovation."
        />

        {selectedCategory === "all" && featuredProjects.length > 0 && (
          <FeaturedDossiers projects={featuredProjects} onSelect={setModalProject} />
        )}

        {selectedCategory === "all" && mobileApps.length > 0 && (
          <DeviceLab apps={mobileApps} onSelect={openProject} />
        )}

        <motion.div
          className="flex flex-wrap gap-2 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                if (category !== "all") setGalleryOpen(true);
              }}
              className="px-4 py-2 rounded font-mono text-[10px] uppercase tracking-[0.15em] transition-all duration-300"
              style={{
                background: selectedCategory === category ? "var(--accent)" : "transparent",
                color: selectedCategory === category ? "var(--bg)" : "var(--fg-muted)",
                border: `1px solid ${selectedCategory === category ? "var(--accent)" : "var(--border-medium)"}`,
              }}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div ref={galleryRef} className="flex items-center gap-3 mb-6 font-mono text-[10px] uppercase tracking-[0.25em] scroll-mt-24" style={{ color: "var(--fg-faint)" }}>
          <span style={{ color: "var(--accent)" }}>◈</span> field_gallery // tap_for_intel
          <div className="flex-1 tentacle-line" />
          <span style={{ color: "var(--accent)" }}>{regularProjects.length} units</span>
          <button
            type="button"
            onClick={toggleGallery}
            aria-expanded={galleryOpen}
            className="flex-shrink-0 flex items-center gap-1.5 transition-colors duration-300 hover:text-[var(--accent)]"
            style={{ color: "var(--fg-muted)" }}
            data-cursor="view"
          >
            {galleryOpen ? "collapse" : "open_drawer"}
            <span className="transition-transform duration-300" style={{ display: "inline-block", transform: galleryOpen ? "rotate(180deg)" : "none", color: "var(--accent)" }}>▾</span>
          </button>
        </div>

        <div className="relative">
        <div
          className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4 overflow-hidden"
          style={{ maxHeight: galleryOpen ? "none" : 420 }}
        >
          {regularProjects.map((project, index) => (
            <motion.button
              key={project.id}
              className="group relative block w-full mb-3 sm:mb-4 break-inside-avoid rounded-lg overflow-hidden text-left transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.12)]"
              style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-card)" }}
              onClick={() => setModalProject(project)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: (index % 4) * 0.06 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              data-cursor="view"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                loading="lazy"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <span
                className="absolute bottom-0 inset-x-0 flex items-center justify-between gap-2 px-2.5 py-2 font-mono text-[9px] uppercase tracking-[0.1em]"
                style={{ background: "linear-gradient(to top, rgba(5,6,10,0.92), transparent)", color: "var(--fg-muted)" }}
              >
                <span className="truncate transition-colors duration-300 group-hover:text-[var(--fg)]">{project.title}</span>
                <span className="flex-shrink-0" style={{ color: "var(--accent)" }}>{project.category}</span>
              </span>
            </motion.button>
          ))}
        </div>
        {!galleryOpen && (
          <div
            className="absolute inset-x-0 bottom-0 h-56 flex items-end justify-center pb-4"
            style={{ background: "linear-gradient(to bottom, transparent, var(--bg) 80%)" }}
          >
            <button
              type="button"
              onClick={toggleGallery}
              className="flex items-center gap-2 px-5 py-2.5 rounded font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-[var(--accent)] hover:text-[var(--bg)]"
              style={{ border: "1px solid var(--accent)", color: "var(--accent)", background: "var(--bg)" }}
              data-cursor="view"
            >
              open drawer · {regularProjects.length} units ▾
            </button>
          </div>
        )}
        </div>
      </div>

      <ProjectModal project={modalProject ? toModal(modalProject) : null} onClose={() => setModalProject(null)} />

      <div className="tentacle-line mt-28 max-w-md mx-auto"></div>
    </section>
  );
};

// Real projects based on your LinkedIn profile
const defaultProjects: Project[] = [
  {
    id: "83",
    title: "Les Entreprises G&N – Boutique en ligne",
    description:
      "Boutique en ligne en production sur lesentreprisesgn.com pour Les Entreprises G&N, producteur de Cocody Angré (Abidjan) : Mon Gari, Mon Tapioca et coffrets à offrir, 100 % naturels. Vitrine e-commerce avec panier, commande et suivi par lien sécurisé, commandes sur mesure, recettes, avis clients, et un back-office complet pour la gérance.",
    imageUrl: "./images/gn-entreprises-preview.webp",
    technologies: ["SvelteKit", "Svelte 5 Runes", "TypeScript", "Tailwind CSS v4", "Supabase", "PostgreSQL", "Row Level Security", "Vercel"],
    category: "e-commerce",
    featured: true,
    isPortrait: false,
    objectives:
      "Permettre à une marque locale de vendre ses produits en ligne sans compte client : commande depuis le site ou WhatsApp, livraison à Abidjan et paiement à la livraison, avec un outil simple pour gérer catalogue, commandes, demandes sur mesure et avis.",
    results:
      "Site public (boutique, catégories, fiches produits, panier, formules, prestations, recettes express, commandes personnalisées, avis, histoire de la marque) et back-office (tableau de bord, saisie et suivi des commandes, clients, produits, catégories, recettes, avis, paramètres). Sécurité gérée en base : RLS, suivi de commande par jeton secret et prix recalculés côté serveur.",
    demoUrl: "https://lesentreprisesgn.com",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "84",
    title: "Herycia – Styliste Mobile",
    description:
      "Application mobile qui aide à composer ses tenues : on choisit ses pièces et leurs couleurs, un mannequin virtuel les habille en direct selon la silhouette (droite, sablier, ample), puis l'app évalue l'harmonie de la tenue et propose des améliorations. Elle inclut un catalogue de looks, un guide des couleurs et des favoris.",
    imageUrl: "./images/herycia-preview.webp",
    technologies: ["Flutter", "Riverpod", "go_router", "Freezed", "Drift", "Dio", "OpenAPI", "Offline-first"],
    category: "creative",
    featured: false,
    isPortrait: true,
    objectives:
      "Donner à chacun des conseils de style simples et bienveillants : partir d'une pièce pour obtenir des tenues complètes, ou composer une tenue entière et comprendre pourquoi les couleurs fonctionnent ensemble, avec des explications sans jugement.",
    results:
      "Composition de tenue sur mannequin 2D, évaluation avec un score d'harmonie et des pistes d'amélioration, suggestions à partir d'une pièce, catalogue de looks par style et occasion, guide des couleurs, favoris et tenues sauvegardées, et suggestions calculées sur l'appareil hors ligne. L'app tourne sur un serveur simulé intégré dont le contrat d'API est documenté en OpenAPI pour le futur back-end Laravel.",
    demoUrl: "",
    codeUrl: "https://github.com/ClichyMercury/herycia",
    countries: ["CI"],
  },
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
    countries: ["BJ"],
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
      "Delivered a smooth streaming experience with movie and series discovery, trending content and a clean, intuitive interface.",
    demoUrl: "",
    codeUrl: "",
    countries: ["BJ", "BF", "CI", "GW", "ML", "NE", "SN", "TG"],
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
      "Delivered a complete shopping flow, from catalog browsing to secure checkout, with real-time order updates.",
    demoUrl: "",
    codeUrl: "https://github.com/ClichyMercury/vidalossa",
    countries: ["CI"],
  },
  {
    id: "4",
    title: "Medical Volunteer Website",
    description:
      "Complete website redesign for Medical Volunteer organization celebrating 25 years of healthcare advocacy.",
    imageUrl: "./images/volunteer-medical-preview.webp",
    technologies: ["SvelteKit", "HTML5", "CSS3", "JavaScript", "Vercel"],
    category: "web",
    featured: true,
    isPortrait: false,
    objectives:
      "Create modern responsive website showcasing 25 years of medical volunteer work and promote anniversary events.",
    results:
      "Increased organization visibility and created modern platform for volunteer engagement.",
    demoUrl: "https://volontariat-medical-ci.vercel.app/",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "5",
    title: "MELOUKA Artisan Website",
    description:
      "Modern showcase website for MELOUKA, an Ivorian handicraft knitting company with dynamic product management.",
    imageUrl: "./images/melouka-preview.webp",
    technologies: ["SvelteKit", "Supabase", "Tailwind CSS", "Vercel"],
    category: "web",
    featured: true,
    isPortrait: false,
    objectives:
      "Develop elegant showcase website with dynamic product management and simplified ordering process.",
    results:
      "Increased company visibility and streamlined customer ordering process through WhatsApp integration.",
    demoUrl: "https://melouka.vercel.app/",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "6",
    title: "RecipeMaster",
    description:
      "Web application for managing and organizing favorite recipes with internationalization support (FR, EN, ES).",
    imageUrl: "./images/recipe-master-preview.jpeg",
    technologies: ["SvelteKit", "JSON Server", "Paraglide", "JavaScript"],
    category: "web",
    featured: true,
    isPortrait: false,
    objectives:
      "Create modern frontend application with reactive state management and multi-language support.",
    results:
      "Developed clean architecture with reactive stores and dynamic routing for recipe management.",
    demoUrl: "",
    codeUrl: "https://github.com/ClichyMercury/recipe-master",
    countries: ["ES"],
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
    countries: ["CI"],
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
    countries: ["CI"],
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
    countries: ["PK", "IN", "BD"],
  },
  {
    id: "10",
    title: "Djassaman Budget Manager",
    description:
      "Intelligent budget management application built with Flask and SQLAlchemy for tracking finances.",
    imageUrl: "./images/djassaman-preview.jpeg",
    technologies: ["Flask", "SQLAlchemy", "HTML", "CSS", "Python", "JavaScript"],
    category: "fintech",
    featured: true,
    isPortrait: false,
    objectives:
      "Develop robust budget management solution for individuals and businesses with comprehensive tracking.",
    results:
      "Created efficient financial management platform with robust backend architecture.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI"],
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
    countries: ["BJ"],
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
    countries: ["BJ"],
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
    countries: ["TG"],
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
    countries: ["CI"],
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
      "Gave users a clear view of their electricity usage with real-time tracking and consumption forecasts to help them adjust their habits.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI"],
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
    countries: ["TG", "BJ"],
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
    countries: ["CI"],
  },
  {
    id: "18",
    title: "Baromètre Santé",
    description:
      "Advanced telemedicine platform with AI-powered health analytics, remote patient monitoring, and intelligent appointment orchestration for comprehensive digital healthcare.",
    imageUrl: "./images/barometre-sante-preview.jpeg",
    technologies: ["Flutter", "Telemedicine APIs", "Health Analytics", "Real-time Monitoring", "AI Diagnostics", "Secure Video Calls"],
    category: "medical",
    featured: false,
    isPortrait: true,
    objectives:
      "Transform healthcare accessibility by providing comprehensive remote medical services with intelligent health tracking and predictive wellness analytics.",
    results:
      "Built a complete remote care experience: appointment booking, video consultations and patient health follow-up from a single app.",
    demoUrl: "",
    codeUrl: "",
    countries: ["BJ"],
  },
  {
    id: "19",
    title: "Collards Greens Bank",
    description:
      "Revolutionary micro-banking app empowering financial inclusion with AI-driven credit scoring and blockchain-secured transactions for underbanked communities.",
    imageUrl: "./images/collards-greens-preview.png",
    technologies: ["Flutter", "Blockchain", "AI/ML", "Biometric Auth", "Micro-finance", "NSIA Integration"],
    category: "fintech",
    featured: false,
    isPortrait: true,
    objectives:
      "Bridge the financial gap by providing accessible banking services with intelligent risk assessment and personalized financial wellness tracking.",
    results:
      "Delivered a simple banking experience giving users access to micro-loans, savings and account tracking from their phone.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "20",
    title: "FindMacy",
    description:
      "Smart pharmacy locator with real-time medication availability, AI-powered drug interaction checker, and integrated telemedicine consultations.",
    imageUrl: "./images/findmacy-preview.png",
    technologies: ["Flutter", "Google Maps API", "Real-time Database", "AI Drug Analysis", "Geolocation"],
    category: "medical",
    featured: false,
    isPortrait: true,
    objectives:
      "Revolutionize pharmaceutical access by connecting patients to available medications while ensuring safety through intelligent drug interaction prevention.",
    results:
      "Made it easier to find nearby pharmacies and check medication availability, with map-based search and drug interaction checks.",
    demoUrl: "",
    codeUrl: "",
    countries: ["GN"],
  },
  {
    id: "21",
    title: "BabiWarren",
    description:
      "Next-generation ride-sharing platform with dynamic pricing algorithms, carbon footprint tracking, and AI-optimized route planning for sustainable urban mobility.",
    imageUrl: "./images/babiwarren-preview.png",
    technologies: ["Flutter", "Machine Learning", "Real-time GPS", "Carbon Analytics", "Dynamic Pricing", "Route Optimization"],
    category: "transport",
    featured: false,
    isPortrait: true,
    objectives:
      "Transform urban transportation through intelligent matching, environmental consciousness, and predictive analytics for optimal ride experiences.",
    results:
      "Delivered a ride-booking experience with live GPS tracking, transparent pricing and route suggestions for city trips.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "22",
    title: "Le Livreur",
    description:
      "Intelligent multi-vendor delivery ecosystem with predictive logistics, real-time order orchestration, and AI-powered demand forecasting for local businesses.",
    imageUrl: "./images/le-livreur-preview.png",
    technologies: ["Flutter", "Predictive Analytics", "Multi-vendor API", "Real-time Tracking", "Smart Logistics", "Demand Forecasting"],
    category: "e-commerce",
    featured: false,
    isPortrait: true,
    objectives:
      "Revolutionize local commerce by creating an intelligent delivery network that anticipates demand and optimizes logistics for maximum efficiency.",
    results:
      "Connected customers, local businesses and delivery agents in one ecosystem, with real-time order tracking from purchase to delivery.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "23",
    title: "Le Livreur Agent",
    description:
      "Dedicated mobile application for delivery agents featuring real-time GPS tracking, intelligent route optimization, and intuitive order management interface. Maximizes delivery efficiency with advanced tracking tools and seamless communication features.",
    imageUrl: "./images/le-livreur-agent-preview.webp",
    technologies: ["Flutter", "GPS Tracking", "Route Optimization", "Real-time Notifications", "Offline Mode", "Performance Analytics"],
    category: "e-commerce",
    featured: false,
    isPortrait: true,
    objectives:
      "Streamline delivery operations by providing agents with a powerful, user-friendly application that optimizes routes, enhances productivity, and facilitates communication with customers and restaurants.",
    results:
      "Gave delivery agents a focused mobile tool to receive orders, follow their routes and update delivery status in real time.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "24",
    title: "Le Livreur Resto",
    description:
      "Comprehensive restaurant management platform with real-time order interface, dynamic menu management, performance analytics, and seamless integration with the delivery ecosystem. Optimizes culinary operations and customer relationships.",
    imageUrl: "./images/le-livreur-resto-preview.webp",
    technologies: ["Flutter", "Restaurant POS", "Menu Management", "Order Analytics", "Kitchen Display", "Customer Feedback"],
    category: "e-commerce",
    featured: false,
    isPortrait: true,
    objectives:
      "Digitize and optimize partner restaurant operations by providing modern tools for order management, menu control, and performance analysis while maintaining high-quality culinary experiences.",
    results:
      "Gave restaurants a single interface to receive orders, manage their menu and follow their activity, fully connected to the delivery platform.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "25",
    title: "AZPROD",
    description:
      "Creative agency specializing in music production, artist booking, and digital influence across West Africa. We transform the music industry by connecting emerging talents, brands, and audiences through authentic collaborations and memorable events.",
    imageUrl: "./images/azprod-preview.webp",
    technologies: ["Booking Management", "Event Production", "Influencer Marketing", "Artist Development", "Digital Strategy", "Content Creation"],
    category: "entertainment",
    featured: true,
    isPortrait: false,
    objectives:
      "Revolutionize the African music and media ecosystem by creating sustainable bridges between artists, influencers, and brands, while developing new talents and producing large-scale cultural events.",
    results:
      "Over 6 years of expertise in the music industry, production of major events like FESTIGOLA Kinshasa 2024, development of recognized artists such as Barack La Voix d'Or, and creation of an authentic influence network across West Africa.",
    demoUrl: "https://azprod.fr/",
    codeUrl: "",
    countries: ["BE", "FR"],
  },
  {
    id: "26",
    title: "MôyCom",
    description:
      "Commercial management application for healthcare sales representatives featuring client tracking, product catalog management, order processing, and performance analytics. Streamlines pharmaceutical and medical equipment sales operations.",
    imageUrl: "./images/moycom-preview.png",
    technologies: ["Flutter", "CRM Integration", "Sales Analytics", "Inventory Management", "Client Tracking", "Mobile Commerce"],
    category: "medical",
    featured: false,
    isPortrait: true,
    objectives:
      "Optimize healthcare sales operations by providing commercial teams with comprehensive tools for client management, product promotion, and sales tracking in the medical sector.",
    results:
      "Gave sales representatives one mobile tool to follow their clients, browse the product catalog, place orders and track their performance.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "27",
    title: "Gestopedia",
    description:
      "Intelligent inventory management system with real-time sales tracking, automated stock monitoring, and predictive analytics. Features comprehensive dashboard for sales, stock levels, and financial performance with integrated banking and budgeting tools.",
    imageUrl: "./images/gestopedia-preview.png",
    technologies: ["Flutter", "Real-time Analytics", "Inventory Automation", "Financial Integration", "Predictive Forecasting", "Business Intelligence"],
    category: "fintech",
    featured: false,
    isPortrait: true,
    objectives:
      "Transform traditional inventory management by providing businesses with intelligent tools for stock optimization, sales tracking, and financial planning, enabling data-driven decisions and operational efficiency.",
    results:
      "Brought sales, stock levels and finances together in one dashboard, making day-to-day business management simpler.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "28",
    title: "Jéko Cockpit",
    description:
      "Back-office moderne pour la supervision et la gestion des paiements, transactions, membres et équipements connectés. Offre une visualisation claire des données financières et comportementales à travers un tableau de bord interactif.",
    imageUrl: "./images/jeko-cockpit-preview.webp",
    technologies: ["Svelte.js", "Recharts", "TailwindCSS", "API REST", "Responsive UI", "Dashboard Analytics"],
    category: "fintech",
    featured: true,
    isPortrait: false,
    objectives:
      "Centraliser la gestion des activités financières et opérationnelles d’un commerçant via un cockpit intelligent. Fournir des insights en temps réel pour optimiser les décisions et fluidifier les opérations quotidiennes.",
    results:
      "Visualisation en temps réel de la répartition des paiements, suivi de la croissance des revenus, et gestion complète des points de vente et des utilisateurs depuis une seule interface.",
    demoUrl: "https://cockpit.jeko.africa/dashboard",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "29",
    title: "My Design Pro",
    description:
      "Version avancée de l’application My Design, offrant aux créatifs un espace pour créer, partager et s’inspirer. Propose un environnement communautaire favorisant l’échange et la visibilité des œuvres.",
    imageUrl: "./images/my-design-pro-preview.jpeg",
    technologies: ["Flutter", "Firebase Auth", "Cloud Storage", "REST API", "Responsive UI", "Community Features"],
    category: "creative",
    featured: false,
    isPortrait: true,
    objectives:
      "Donner aux designers la possibilité de publier leurs créations, d’interagir avec d’autres créatifs et de construire une communauté autour du design.",
    results:
      "Création et partage de contenus graphiques par la communauté. Développement d’un réseau d’échanges et d’inspiration. Engagement et interaction accrus entre utilisateurs.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI", "TG"],
  },
  {
    id: "30",
    title: "My Design",
    description:
      "Application mobile permettant aux utilisateurs de découvrir des créations graphiques variées : affiches, logos et visuels créatifs. Favorise l'inspiration et le partage dans une communauté créative.",
    imageUrl: "./images/my-design-user-preview.jpeg",
    technologies: ["Flutter", "REST API", "Firebase", "Responsive UI", "Grid Layout", "Material Design"],
    category: "creative",
    featured: false,
    isPortrait: true,
    objectives:
      "Permettre aux utilisateurs de parcourir des designs créatifs, de filtrer par catégories (affiches, logos, etc.) et de s’inspirer pour leurs propres créations.",
    results:
      "Interface simple et fluide qui met en avant les designs. Navigation rapide entre catégories. Expérience utilisateur optimisée pour mobile et tablettes.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI", "TG"],
  },
  {
    id: "31",
    title: "SOSMONEY ADMIN",
    description:
      "Comprehensive employee loan management platform with automated approval workflows, real-time payment tracking, and intelligent risk assessment. Features advanced admin dashboard for loan processing, borrower management, and financial analytics.",
    imageUrl: "./images/salary-credit-manager-preview.webp",
    technologies: ["React", "Spring Boot", "Java", "REST API", "Financial Analytics", "Risk Assessment"],
    category: "fintech",
    featured: true,
    isPortrait: false,
    objectives:
      "Streamline employee loan processes by providing financial institutions with powerful tools for loan approval, risk evaluation, and payment monitoring while ensuring compliance and reducing processing time.",
    results:
      "Streamlined the loan approval workflow, with borrower tracking, real-time payment monitoring and an analytics dashboard for risk follow-up.",
    demoUrl: "https://sosmoney-admin.vercel.app/",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "32",
    title: "SOSMONEY Mobile",
    description:
      "Mobile application for employee loan management allowing users to track their loan balance, payment history, and available credit limit. Features intuitive dashboard with loan evolution charts, repayment tracking, and instant notifications for payment reminders.",
    imageUrl: "./images/salary-credit-mobile-preview.webp",
    technologies: ["Flutter", "REST API", "Charts", "Push Notifications", "Secure Authentication", "Financial Tracking"],
    category: "fintech",
    featured: false,
    isPortrait: true,
    objectives:
      "Provide employees with easy access to their loan information through a user-friendly mobile interface, enabling real-time balance tracking, payment monitoring, and financial planning tools.",
    results:
      "Seamless mobile experience with real-time loan tracking, visual payment evolution charts, automated payment reminders, and secure access to personal financial data.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "33",
    title: "Simplex Visitor Tracker",
    description:
      "GDPR-compliant visitor management system enabling real-time tracking of visitors within company premises without retaining identity cards. Features agent dashboard for assisted visits, badge verification, and comprehensive visit analytics with privacy-first approach.",
    imageUrl: "./images/visitor-flow-tracker-preview.webp",
    technologies: ["Flutter", "GDPR Compliance", "Badge System", "Real-time Tracking", "Privacy Management", "Visit Analytics"],
    category: "security",
    featured: false,
    isPortrait: true,
    objectives:
      "Modernize visitor management by providing secure, GDPR-compliant tracking solutions that maintain visitor privacy while ensuring comprehensive oversight of personnel movement within company facilities.",
    results:
      "Privacy-first visitor management with real-time visitor tracking, a streamlined check-in/check-out process and visit analytics, without keeping identity cards.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "34",
    title: "WaveLink",
    description:
      "Application mobile de transfert et de souscription rapide en Côte d'Ivoire. Permet d’envoyer du crédit, des forfaits internet ou des minutes d’appel sur les réseaux Orange, MTN et Moov, avec un paiement instantané et sécurisé via Wave.",
    imageUrl: "./images/wavelink-preview.jpeg",
    technologies: ["Flutter", "Wave API", "Mobile Money", "UI Responsive", "Payment Integration", "Telecom Services"],
    category: "fintech",
    featured: false,
    isPortrait: true,
    objectives:
      "Faciliter les transferts d’unités et de forfaits à travers les principaux réseaux mobiles ivoiriens, en proposant une solution fluide, rapide et accessible à tous via le paiement mobile Wave.",
    results:
      "Expérience utilisateur simplifiée avec paiement en 1 clic, intégration fluide avec les trois grands opérateurs, transactions instantanées et interface intuitive adaptée au mobile.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "35",
    title: "Hooli Library",
    description:
      "Bibliothèque numérique moderne permettant aux utilisateurs de lire, découvrir et gérer leurs livres préférés en ligne. Propose des recommandations personnalisées, des évaluations, et une interface élégante inspirée des meilleures plateformes de lecture.",
    imageUrl: "./images/hooli-library-preview.jpeg",
    technologies: ["Flutter", "Firebase", "Cloud Storage", "Recommendation Engine", "Responsive UI", "Book API"],
    category: "education",
    featured: false,
    isPortrait: true,
    objectives:
      "Créer une plateforme intuitive et interactive pour la lecture numérique, offrant un accès simple à des milliers de livres et une expérience fluide sur mobile.",
    results:
      "Expérience de lecture fluide avec recommandations personnalisées et navigation intuitive. Interface responsive et mode lecture optimisé pour tous les écrans.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "36",
    title: "GS Dot Bet",
    description:
      "Application de suivi et de pronostic sportif offrant une expérience complète pour les passionnés de football. Suivez les scores en direct, les classements, et placez vos paris en toute sécurité depuis une interface moderne et immersive.",
    imageUrl: "./images/gs-dot-bet-preview.jpeg",
    technologies: ["Flutter", "Live Data API", "Sports Odds API", "Firebase", "Animations", "Dark Mode UI"],
    category: "sports-betting",
    featured: false,
    isPortrait: true,
    objectives:
      "Fournir une plateforme performante pour suivre les matchs en temps réel, consulter les statistiques, et effectuer des paris rapides tout en profitant d’un design soigné et ergonomique.",
    results:
      "Mise à jour en temps réel des scores, interface fluide et foncée adaptée aux sessions prolongées, et intégration transparente des cotes pour une expérience de pari immersive.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "37",
    title: "Kotlin Bank UI & API",
    description:
      "Suite bancaire complète alliant une application mobile Kotlin moderne (Jetpack Compose) et une API backend Ktor gamifiée, conçue pour démocratiser l’éducation financière en Afrique à travers la gamification et les fonctionnalités locales.",
    imageUrl: "./images/kotlinbank-suite-preview.jpeg",
    technologies: ["Kotlin", "Jetpack Compose", "Ktor", "Material 3", "MVVM", "StateFlow", "PostgreSQL", "JWT Auth", "REST API"],
    category: "fintech",
    featured: false,
    isPortrait: true,
    objectives:
      "Créer une solution fintech innovante combinant application mobile et API bancaire gamifiée. L’objectif est de promouvoir l’éducation financière en Afrique grâce à des fonctionnalités culturelles telles que les tontines numériques, un marketplace local et un système de récompenses interactif.",
    results:
      "Développement d’une architecture complète front–back : application Kotlin fluide avec Jetpack Compose et API Ktor performante. L’ensemble offre une expérience immersive avec gamification, modules éducatifs, et intégration des réalités africaines dans la gestion financière.",
    demoUrl: "https://github.com/ClichyMercury/KotlinBankAPI",
    codeUrl: "https://github.com/ClichyMercury/KotlinBankUI",
    countries: ["CI"],
  },
  {
    id: "38",
    title: "Alerte E25 – Application Citoyenne",
    description:
      "Application mobile permettant aux citoyens de signaler en temps réel des incidents ou situations urgentes aux autorités locales. Elle intègre la géolocalisation, l'envoi d’alertes, la sélection de priorité, ainsi qu'une interface simple et intuitive pour faciliter la participation citoyenne.",
    imageUrl: "./images/alerte_e25_client_preview.webp",
    technologies: ["Flutter", "Dart", "Provider", "OpenStreetMap", "REST API", "Geolocator", "Firebase Messaging"],
    category: "security",
    featured: false,
    isPortrait: true,
    objectives:
      "Offrir aux populations un outil simple, rapide et fiable pour signaler les urgences : incendies, accidents, agressions, nuisances publiques ou anomalies urbaines. L’objectif principal est de digitaliser la collaboration entre citoyens et autorités pour réduire les temps d'intervention.",
    results:
      "Mise en place d’un parcours fluide de déclaration d’alerte, intégration de la carte interactive, récupération précise de la localisation, catégorisation des incidents et synchronisation en temps réel avec l’API. L’application permet une meilleure visibilité des urgences et améliore la communication citoyenne.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "39",
    title: "Alerte E25 – Application Admin",
    description:
      "Interface mobile dédiée aux autorités pour visualiser, filtrer et gérer les alertes envoyées par les citoyens. Elle affiche sur une carte toutes les alertes en temps réel avec un système de priorisation (Urgent, Élevée, Moyenne, Faible) et permet un suivi opérationnel efficace.",
    imageUrl: "./images/alerte_e25_admin_preview.webp",
    technologies: ["Flutter", "Dart", "Provider", "OpenStreetMap", "Cluster Markers", "REST API", "Firebase Messaging"],
    category: "security",
    featured: false,
    isPortrait: true,
    objectives:
      "Donner aux autorités une vision globale et précise de toutes les alertes en temps réel. Prioriser les urgences, faciliter la prise de décision, optimiser la répartition des équipes sur le terrain et digitaliser la chaîne de traitement des incidents.",
    results:
      "Développement d'une carte administrative complète avec clustering, filtres par priorité, rafraîchissement en direct, gestion avancée des états des alertes et intégration complète avec le backend. L’application améliore la rapidité et l'efficacité des interventions.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "40",
    title: "Jeko Pay – Nouvelle Page de Checkout",
    description:
      "Interface de paiement moderne développée autour de l’API Jeko Pay, permettant aux utilisateurs de régler leurs commandes via différents moyens de paiement mobiles (Wave, Orange Money, Moov Money, MTN MoMo, Djamo, Jeko). Le checkout offre une expérience fluide, sécurisée et multi-méthodes, optimisée pour le taux de conversion.",
    imageUrl: "./images/jeko_pay_preview.webp",
    technologies: ["TypeScript", "SvelteKit", "REST API", "Jeko Pay API", "OAuth2", "Responsive UI", "Mobile Money Integration"],
    category: "fintech",
    featured: true,
    isPortrait: false,
    objectives:
      "Créer un module universel de paiement permettant aux marchands et aux applications tierces de proposer un checkout unifié compatible avec les solutions de paiement mobile les plus utilisées en Afrique de l’Ouest. L’objectif est d’améliorer l’adoption, réduire la friction au paiement et offrir une interface harmonisée.",
    results:
      "Développement d’un checkout responsive avec sélection intelligente des méthodes de paiement, validation automatique des numéros, gestion sécurisée de la transaction et design professionnel. Le système améliore considérablement la fluidité du parcours de paiement et favorise la confiance des utilisateurs.",
    demoUrl: "https://pay.jeko.africa/pl/451641bf-e868-40be-aa4c-b9fc6a22320e",
    codeUrl: "https://jeko.africa",
    countries: ["CI"],
  },
  {
    id: "41",
    title: "Payix – Application Mobile de Paiement",
    description:
      "Application fintech permettant aux utilisateurs de gérer leur solde, effectuer des transferts, recharger leur portefeuille, effectuer des retraits, payer des services et accéder à des services de prêt. L’interface est moderne, fluide et pensée pour simplifier la gestion quotidienne des transactions.",
    imageUrl: "./images/payix_preview.webp",
    technologies: ["Flutter", "Dart", "Provider", "REST API", "Firebase", "Secure Storage", "Mobile Money Integration"],
    category: "fintech",
    featured: false,
    isPortrait: true,
    objectives:
      "Créer une application simple et intuitive pour permettre aux utilisateurs de suivre leur solde en temps réel, consulter leurs transactions et accéder facilement aux fonctionnalités essentielles telles que les transferts, dépôts, paiements, retraits et services financiers annexes.",
    results:
      "Interface épurée avec affichage dynamique du solde, gestion des transactions récentes, boutons d’action rapide et navigation fluide. Les utilisateurs peuvent effectuer des opérations financières de manière rapide, sécurisée et agréable.",
    demoUrl: "",
    codeUrl: "",
    countries: ["TG"],
  },
  {
    id: "42",
    title: "Jeko Landing Page",
    description:
      "Landing page moderne pour Jeko, solution de paiement mobile money unifiée permettant aux commerçants d'encaisser via un QR code unique (Wave, Orange Money, MTN, Moov, Visa, Mastercard).",
    imageUrl: "./images/jeko-landing-preview.webp",
    technologies: ["SvelteKit", "TailwindCSS", "Responsive Design", "Framer Motion", "Vercel"],
    category: "fintech",
    featured: true,
    isPortrait: false,
    objectives:
      "Créer une vitrine digitale impactante pour présenter la solution Jeko aux commerçants ivoiriens et faciliter l'acquisition de nouveaux utilisateurs.",
    results:
      "Interface épurée avec taux de conversion optimisé, intégration des stores (App Store, Google Play) et mise en avant des +500 commerçants partenaires.",
    demoUrl: "https://jeko.africa",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "43",
    title: "Jeko Download Page",
    description:
      "Page de téléchargement dédiée à l'application Jeko Business, permettant aux commerçants d'installer rapidement l'app pour finaliser leurs paiements.",
    imageUrl: "./images/jeko-download-preview.png",
    technologies: ["SvelteKit", "TailwindCSS", "Deep Linking", "App Store Connect", "Google Play"],
    category: "fintech",
    featured: true,
    isPortrait: false,
    objectives:
      "Rediriger les utilisateurs vers les stores appropriés selon leur appareil et simplifier le parcours d'installation de l'application Jeko Business.",
    results:
      "Expérience fluide avec détection automatique de plateforme et redirection intelligente vers iOS ou Android.",
    demoUrl: "https://link.jeko.africa",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "44",
    title: "Jeko Demo – Paiement Redirect",
    description:
      "Interface de démonstration permettant aux développeurs de tester l'API Jeko Pay en créant des paiements redirect avec sélection de boutique, montant et méthode de paiement (Wave, Orange Money, MTN, Moov, Djamo).",
    imageUrl: "./images/jeko-demo-preview.png",
    technologies: ["SvelteKit", "TailwindCSS", "Jeko Pay API", "REST API", "OAuth2"],
    category: "fintech",
    featured: true,
    isPortrait: false,
    objectives:
      "Fournir un environnement de test interactif pour les développeurs souhaitant intégrer l'API Jeko Pay dans leurs applications, avec simulation complète du flux de paiement redirect.",
    results:
      "Outil de test fonctionnel permettant de valider les intégrations avant mise en production, avec support de toutes les méthodes de paiement et gestion des callbacks.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "45",
    title: "Alph Sécurité (Landing Page) – Sécurisation de quartier à la demande",
    description:
      "landing page de preseentation de la solution Alph Sécurité, une Plateforme digitale permettant aux particuliers et communautés de sécuriser leur quartier en un clic, en réservant des agents de sécurité certifiés, en rejoignant des communautés de vigilance et en consultant le niveau de sécurité en temps réel.",
    imageUrl: "./images/alph-securite-preview.webp",
    technologies: ["Vue.js", "TailwindCSS", "API REST", "Laravel", "Geolocation", "Notifications temps réel", "Payment Integration"],
    category: "security",
    featured: true,
    isPortrait: false,
    objectives:
      "Démocratiser l’accès à la sécurité privée en Afrique en proposant une solution simple, rapide et communautaire pour réserver des agents de sécurité et surveiller les zones à risque en temps réel.",
    results:
      "Mise en place d’une plateforme complète combinant application mobile et interface web, avec réservation d’agents, score de sécurité par zone, notifications en temps réel et système communautaire de vigilance.",
    demoUrl: "https://www.alphsecurite.ci/",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "46",
    title: "Alph Sécurité – Application Mobile Client",
    description:
      "Application mobile permettant aux particuliers de réserver des agents de sécurité certifiés pour différents types de missions : garde rapprochée, sécurité bâtiment, sécurité événementielle et escorte VIP. Interface intuitive avec géolocalisation et système de réservation simplifié.",
    imageUrl: "./images/alph-securite-mobile-preview.jpeg",
    technologies: ["Flutter", "Dart", "Provider", "Google Maps API", "REST API", "Firebase Messaging", "Payment Integration"],
    category: "security",
    featured: false,
    isPortrait: true,
    objectives:
      "Offrir aux utilisateurs un accès rapide et sécurisé à des services de sécurité privée à la demande, avec une expérience de réservation fluide et un suivi en temps réel des agents assignés.",
    results:
      "Interface moderne avec sélection de mission par catégorie, géolocalisation automatique, système de réservation en quelques clics et offres promotionnelles pour les nouveaux utilisateurs (-15% sur la première mission).",
    demoUrl: "https://www.alphsecurite.ci/",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "47",
    title: "PLUSS Alert – Application Mobile Citoyenne",
    description:
      "Application mobile de la Plateforme Une Seule Santé (PLUSS) de Côte d'Ivoire permettant aux citoyens de signaler en temps réel des alertes sanitaires liées aux zoonoses, épidémies et menaces de santé publique à l'interface Homme-Animal-Environnement.",
    imageUrl: "./images/pluss-alert-mobile-preview.jpeg",
    technologies: ["Flutter", "Dart", "Provider", "REST API", "Firebase Messaging", "Geolocation", "One Health Integration"],
    category: "medical",
    featured: false,
    isPortrait: true,
    objectives:
      "Digitaliser la surveillance sanitaire en Côte d'Ivoire en permettant aux citoyens de signaler rapidement les menaces de santé publique (COVID-19, Choléra, Ebola, etc.) avec géolocalisation et connexion aux services de santé partenaires comme MSF.",
    results:
      "Système de signalement d'alertes par catégorie (Santé, Zoonoses, Environnement) avec niveaux de priorité, affichage des statistiques en temps réel et redirection vers les services de santé compétents pour une prise en charge rapide.",
    demoUrl: "https://www.pluss.ci/",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "48",
    title: "PLUSS CI – Backoffice Administration",
    description:
      "Interface d'administration web de la Plateforme Une Seule Santé permettant aux autorités sanitaires de visualiser, filtrer et gérer les alertes signalées par les citoyens. Tableau de bord complet avec statistiques en temps réel, gestion des agents et suivi des services de santé.",
    imageUrl: "./images/pluss-backoffice-preview.webp",
    technologies: ["SvelteKit", "TypeScript", "TailwindCSS", "REST API", "Dashboard Analytics", "Real-time Updates", "Vercel"],
    category: "medical",
    featured: true,
    isPortrait: false,
    objectives:
      "Centraliser la gestion des alertes sanitaires pour les autorités de santé publique, avec une vision globale des menaces en cours, le suivi des agents actifs et la coordination avec les services de santé partenaires.",
    results:
      "Tableau de bord interactif affichant le total des alertes, les statuts (en attente, résolues), les agents actifs, et une liste détaillée des alertes récentes avec filtrage par priorité (Haute, Moyenne, Faible) et catégorie (COVID-19, Choléra, etc.).",
    demoUrl: "https://pluss-backoffice.vercel.app/dashboard",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "49",
    title: "Décor de Rêve – Site Vitrine",
    description:
      "Site web e-commerce élégant pour Décor de Rêve, entreprise spécialisée dans les décors éblouissants, bouquets exquis, ballons colorés et bien plus. Transformez vos moments en souvenirs magiques avec une boutique en ligne intuitive et un système de commande via WhatsApp.",
    imageUrl: "./images/decor-de-reve-frontsite-preview.webp",
    technologies: ["SvelteKit", "TailwindCSS", "E-commerce", "WhatsApp Integration", "Responsive Design", "Vercel"],
    category: "e-commerce",
    featured: true,
    isPortrait: false,
    objectives:
      "Créer une vitrine digitale attrayante pour présenter les créations de Décor de Rêve, faciliter la découverte des produits (bouquets d'argent, boxes, décorations) et simplifier le processus de commande via WhatsApp.",
    results:
      "Site web moderne avec navigation fluide entre les catégories de produits, intégration WhatsApp pour les commandes instantanées, et design élégant mettant en valeur les créations artisanales.",
    demoUrl: "https://decor-de-reve-frontsite.vercel.app/",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "50",
    title: "Décor de Rêve – Back Office",
    description:
      "Application de gestion complète pour Décor de Rêve permettant la gestion des produits, catégories, commandes, inventaire et mouvements de stock. Tableau de bord avec indicateurs clés : valeur stock, revenus du mois, commandes en attente, stock bas et surstock.",
    imageUrl: "./images/decor-de-reve-backoffice-preview.webp",
    technologies: ["SvelteKit", "TailwindCSS", "Dashboard Analytics", "Inventory Management", "REST API", "Vercel"],
    category: "e-commerce",
    featured: true,
    isPortrait: false,
    objectives:
      "Fournir un outil de gestion centralisé pour l'administration de l'entreprise : suivi des stocks, gestion des produits et catégories, traitement des commandes clients, bons d'entrée et gestion des fournisseurs.",
    results:
      "Back-office complet avec tableau de bord affichant la valeur du stock (27 320 FCFA), revenus mensuels, commandes en attente, alertes stock bas et accès rapide aux fonctionnalités de gestion quotidienne.",
    demoUrl: "https://decor-de-reve-backoffice.vercel.app/admin/dashboard",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "51",
    title: "AgriPilote – Plateforme de Gestion Agricole",
    description:
      "Plateforme complète de gestion des missions de drones agricoles pour le traitement des plantations. Permet la coordination entre entreprises clientes, télépilotes et administrateurs avec suivi des missions, gestion des plantations, rapports de traitement et tableau de bord analytique.",
    imageUrl: "./images/agripilote-preview.webp",
    technologies: ["SvelteKit", "TailwindCSS", "REST API", "Dashboard Analytics", "Multi-tenant Architecture", "Role-based Access", "Vercel"],
    category: "iot",
    featured: true,
    isPortrait: false,
    objectives:
      "Digitaliser et automatiser la gestion des missions de drones agricoles en Côte d'Ivoire. Centraliser le workflow entre clients (responsables de plantations), télépilotes et administrateurs pour optimiser les traitements (maturateur, herbicide, traitement à huile/eau) sur différentes cultures (canne à sucre, banane, maïs, hévéa).",
    results:
      "Tableau de bord complet avec suivi de 8 missions, gestion de 6 entreprises et 8 plantations. Système de validation des rapports multi-équipes, assignation des drones/chauffeurs/véhicules, et génération automatisée des fichiers KML par drone.",
    demoUrl: "https://agripilote.vercel.app/admin/dashboard",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "52",
    title: "StediiHome – Employabilité Domestique",
    description:
      "Application mobile connectant les familles aux employés de maison via un système de contrats QR Code sécurisés, un historique professionnel vivant et des avis vérifiés. Deux parcours utilisateur : Employer (famille) et Worker (employé).",
    imageUrl: "./images/stediihome-preview.jpeg",
    technologies: ["Flutter", "Firebase", "QR Code System", "Real-time Chat", "Review System", "Multi-role Auth"],
    category: "services",
    featured: false,
    isPortrait: true,
    objectives:
      "Sécuriser l'employabilité domestique en Afrique en apportant transparence, traçabilité des expériences professionnelles et sécurité contractuelle via un système de QR Code unique pour démarrer et terminer les contrats.",
    results:
      "Application complète avec 17 écrans fonctionnels : onboarding, inscription multi-étapes pour workers, système de contrats QR Code, messagerie temps réel, système d'évaluation obligatoire post-contrat et badges de réputation.",
    demoUrl: "",
    codeUrl: "",
    countries: ["KE", "BF", "CI"],
  },
  {
    id: "53",
    title: "SmartSaver – Tontine & Épargne Digitale",
    description:
      "Application fintech de gestion de tontines et d'épargne digitale. Permet aux utilisateurs de participer à des tontines collectives avec choix de rang de ramassage et de lancer des plans d'épargne personnalisés avec suivi en temps réel.",
    imageUrl: "./images/smartsaver-preview.jpeg",
    technologies: ["Flutter", "Firebase", "Mobile Money", "Push Notifications", "Transaction Management", "Admin Dashboard"],
    category: "fintech",
    featured: false,
    isPortrait: true,
    objectives:
      "Digitaliser le système traditionnel de tontine africaine et proposer des plans d'épargne flexibles. Permettre aux utilisateurs de gérer leurs portefeuilles Tontine et Épargne avec validation des transactions par des admins dédiés.",
    results:
      "Plateforme complète avec gestion de tontines (10 participants, ramassages périodiques), plans d'épargne personnalisés, historique des transactions, notifications de ramassage et système d'audit pour le super admin.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI", "NG"],
  },
  {
    id: "54",
    title: "TransformMe – Application Fitness",
    description:
      "Application de suivi fitness avec système de streak motivationnel, objectifs personnalisés et récompenses. Suivez vos séances de sport, vos repas et visualisez vos statistiques de progression avec des défis à long terme.",
    imageUrl: "./images/transformme-preview.jpeg",
    technologies: ["Flutter", "Firebase", "Health Tracking", "Gamification", "Push Notifications", "Analytics Dashboard"],
    category: "medical",
    featured: false,
    isPortrait: true,
    objectives:
      "Motiver les utilisateurs à maintenir une routine fitness régulière grâce à un système de streak (jours consécutifs), des objectifs sur 86 jours avec récompenses (Apple Watch, inscription salle de sport) et un suivi quotidien des activités.",
    results:
      "Interface gamifiée avec compteur de streak, progression d'objectif (20% accompli, 17/86 jours), suivi des séances sport et repas, statistiques détaillées et messages de motivation personnalisés.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "55",
    title: "AVP PROD – Portfolio Monteur Vidéo",
    description:
      "Portfolio web professionnel pour Ivan, monteur vidéo, photographe et producteur basé à Paris. Interface inspirée des logiciels de montage avec Media Pool, Timeline, Inspector et prévisualisation vidéo intégrée.",
    imageUrl: "./images/avp-prod-preview.webp",
    technologies: ["SvelteKit", "Video Player", "Timeline UI", "Responsive Design", "i18n (FR/EN)", "Vercel"],
    category: "creative",
    featured: true,
    isPortrait: false,
    objectives:
      "Créer un portfolio unique et immersif reproduisant l'interface d'un logiciel de montage vidéo professionnel (DaVinci Resolve style) pour mettre en valeur les compétences d'un monteur vidéo, photographe et producteur.",
    results:
      "Interface créative avec Media Pool pour les images/vidéos, Timeline interactive, Inspector affichant le profil et compétences (Montage 95%, Photographie 90%, Production 85%, Étalonnage 88%, Sound Design 75%), et lecteur vidéo intégré.",
    demoUrl: "https://avp-prod-phi.vercel.app/",
    codeUrl: "",
    countries: ["FR"],
  },
  {
    id: "56",
    title: "StediiHome – Landing Page",
    description:
      "Site vitrine moderne pour StediiHome, plateforme d'emploi domestique sécurisé en Afrique. Présente la solution permettant d'embaucher du personnel domestique fiable sans recruter à l'aveugle, avec profils vérifiés et historique de travail traçable.",
    imageUrl: "./images/stediihome-landing-preview.webp",
    technologies: ["Next.js", "TailwindCSS", "Responsive Design", "i18n (FR/EN)", "Framer Motion", "Vercel"],
    category: "web",
    featured: true,
    isPortrait: false,
    objectives:
      "Créer une landing page impactante pour présenter StediiHome aux familles et travailleurs domestiques au Kenya. Mettre en avant les avantages clés : identité vérifiée, historique impossible à falsifier et mise en relation rapide.",
    results:
      "Site vitrine bilingue (FR/EN) avec deux parcours utilisateur (Employeur/Travailleur), présentation des services (ménage, cuisine, garde d'enfants, personnes âgées), statistiques en temps réel (156 workers, 4.8 rating, 89% vérifiés) et mockup mobile immersif.",
    demoUrl: "https://stediihome.com",
    codeUrl: "",
    countries: ["KE", "BF", "CI"],
  },
  {
    id: "57",
    title: "WHARPE – Landing Page",
    description:
      "Site vitrine élégant pour WHARPE, cabinet informatique moderne accompagnant la transformation digitale en Afrique. Présente les deux pôles d'activité : Pôle Entreprises (développement sur mesure, cloud, maintenance) et Studio d'Innovation (apps mobiles, SaaS, marketplaces).",
    imageUrl: "./images/wharpe-landing-preview.webp",
    technologies: ["SvelteKit", "TailwindCSS", "Framer Motion", "Responsive Design", "i18n (FR)", "Vercel"],
    category: "web",
    featured: true,
    isPortrait: false,
    objectives:
      "Créer une vitrine digitale professionnelle reflétant l'ADN de WHARPE (Whole, Holistic, Analysis, Reactiveness, Partnership, Expertise) et présentant les services de transformation numérique pour les entreprises africaines.",
    results:
      "Landing page moderne avec animations fluides, présentation des 6 valeurs fondatrices, deux sections services distinctes (B2B et B2C), formulaire de contact intégré et design tech inspiré des circuits électroniques.",
    demoUrl: "https://wharpe.com",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "58",
    title: "Cropsky – Landing Page",
    description:
      "Site vitrine pour Cropsky, centre d'expertise drone combinant technologie de pointe et savoir-faire professionnel au Canada, en Afrique et dans le monde. Présente les divisions Industrielle (inspection, surveillance, cartographie) et Aviation & Transport (livraison, mobilité urbaine aérienne).",
    imageUrl: "./images/cropsky-landing-preview.webp",
    technologies: ["SvelteKit", "TailwindCSS", "Framer Motion", "Responsive Design", "i18n (FR/EN)", "Vercel"],
    category: "web",
    featured: true,
    isPortrait: false,
    objectives:
      "Créer un site vitrine professionnel et immersif pour positionner Cropsky comme leader de l'expertise drone à l'international, avec une présentation claire des services industriels et de transport aérien.",
    results:
      "Site bilingue (FR/EN) avec design dark thème cinématique, présentation des deux divisions (Industrielle et Aviation), mise en avant des valeurs (Innovation, Expertise, Vision) et partenariat WHARPE affiché.",
    demoUrl: "https://cropsky.org",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "59",
    title: "AEDCI – Landing Page",
    description:
      "Site vitrine de l'Association des Exploitants de Drones Civils en Côte d'Ivoire, organisation professionnelle structurant et professionnalisant la filière drone au niveau national. Présente les missions, domaines d'application (audiovisuel, cartographie, agriculture, inspection) et le processus d'adhésion.",
    imageUrl: "./images/aedci-landing-preview.webp",
    technologies: ["SvelteKit", "TailwindCSS", "Framer Motion", "Responsive Design", "i18n (FR)", "Vercel"],
    category: "web",
    featured: true,
    isPortrait: false,
    objectives:
      "Créer une vitrine institutionnelle pour l'AEDCI afin de fédérer les exploitants de drones civils en Côte d'Ivoire, promouvoir l'adhésion et positionner le pays comme pôle de référence drone en Afrique de l'Ouest.",
    results:
      "Site avec design épuré aux couleurs nature/tech, présentation des 6 domaines d'application drone, bureau exécutif de 7 membres, 8+ entreprises affiliées et formulaire d'adhésion intégré. Basé à Grand-Bassam (VITIB).",
    demoUrl: "https://aedci.org",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "60",
    title: "Mon Médecin",
    description:
      "Application mobile de mise en relation patient-médecin, un véritable Uber de la médecine. Permet de rechercher un médecin par spécialité (généraliste, dentiste, ophtalmologue, dermatologue, pédiatre, cardiologue, ORL, gynécologue), de consulter les médecins populaires, de prendre rendez-vous et de gérer son parcours de soins complet.",
    imageUrl: "./images/mon-medecin-preview.jpeg",
    technologies: ["Flutter", "Dart", "Provider", "REST API", "Geolocation", "Appointment Booking", "Healthcare", "Push Notifications"],
    category: "medical",
    featured: false,
    isPortrait: true,
    objectives:
      "Simplifier l'accès aux soins médicaux en Côte d'Ivoire en permettant aux patients de trouver rapidement un médecin selon leur spécialité, leur localisation et leur disponibilité, le tout depuis une interface mobile intuitive.",
    results:
      "Application fonctionnelle avec recherche par spécialité, profils médecins détaillés, système de prise de rendez-vous en temps réel, gestion des tickets de consultation et interface patient ergonomique.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "61",
    title: "Mamadou Koné – Site Officiel",
    description:
      "Site officiel d'une personnalité politique ivoirienne. Vitrine digitale complète avec biographie, actualités, galerie photo, espace jeunesse et formulaire de contact. Design premium aux tons dorés avec navigation élégante et mise en valeur du parcours public.",
    imageUrl: "./images/mamadou-kone-preview.webp",
    technologies: ["HTML/CSS", "JavaScript", "Responsive Design", "SEO", "CMS Integration"],
    category: "web",
    featured: true,
    isPortrait: false,
    objectives:
      "Créer une présence digitale professionnelle et prestigieuse pour une personnalité politique, avec un site moderne mettant en avant son engagement pour le développement de la Côte d'Ivoire et la jeunesse ivoirienne.",
    results:
      "Site vitrine élégant avec design premium, navigation fluide entre les sections (Biographie, Actualités, Galerie, Jeunesse), formulaire de contact intégré et optimisation SEO pour la visibilité publique.",
    demoUrl: "https://mamadouk.wharpe.com",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "62",
    title: "StediiHome – Landing Page V2",
    description:
      "Refonte complète de la landing page StediiHome avec une nouvelle identité visuelle violet/purple plus moderne et épurée. Met l'accent sur le slogan fort \"Embauchez du personnel domestique fiable, sans recruter à l'aveugle\" et propose un parcours bilingue clair pour Employeurs et Travailleurs avec une section de bénéfices clés visuellement plus impactante.",
    imageUrl: "./images/steddihome_landing_page_v2.png",
    technologies: ["Next.js", "TailwindCSS", "Framer Motion", "Responsive Design", "i18n (FR/EN)", "Vercel"],
    category: "web",
    featured: true,
    isPortrait: false,
    objectives:
      "Repenser entièrement la landing page de StediiHome avec une nouvelle direction artistique violet/purple, des typographies plus affirmées et un message principal renforcé pour augmenter la conversion lors du lancement progressif au Kenya.",
    results:
      "Nouvelle V2 avec hero impactant, badge de lancement progressif au Kenya, double CTA Employeur/Travailleur, mise en avant des trois bénéfices clés (profils vérifiés par pièce d'identité, historique impossible à falsifier, mise en relation rapide) et identité visuelle violette cohérente.",
    demoUrl: "https://stediihome.com",
    codeUrl: "",
    countries: ["KE", "BF", "CI"],
  },
  {
    id: "63",
    title: "Jeko – Landing Page V2",
    description:
      "Refonte de la landing page Jeko avec une nouvelle direction visuelle plus moderne et orientée conversion. Met en avant la solution de paiement mobile money unifiée pour les commerçants africains avec un design plus impactant, une hiérarchie typographique renforcée et une démonstration produit plus claire.",
    imageUrl: "./images/jeko-landing-v2-preview.webp",
    technologies: ["SvelteKit", "TailwindCSS", "Framer Motion", "Responsive Design", "Vercel"],
    category: "fintech",
    featured: true,
    isPortrait: false,
    objectives:
      "Repenser la landing page de Jeko pour mieux convertir les commerçants ivoiriens et africains, en clarifiant le positionnement (QR code unique multi-opérateurs) et en modernisant l'identité visuelle de la marque.",
    results:
      "Nouvelle V2 avec hero plus affirmé, mise en avant des opérateurs supportés (Wave, Orange Money, MTN, Moov, Visa, Mastercard), CTA optimisés vers les stores et présentation produit plus immersive.",
    demoUrl: "https://jeko.africa",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "64",
    title: "Forage – Plateforme Mise en Relation",
    description:
      "Plateforme numérique \"Le forage, simplifié\" mettant en relation clients (particuliers/entreprises) et entreprises de forage qualifiées dans les domaines eau, géotechnique et pétrolier. Le client soumet son projet, reçoit des offres confidentielles de prestataires cloisonnés et signe en toute confiance — budget protégé, workflow contrôlé en 8 étapes et messagerie centralisée.",
    imageUrl: "./images/forage-preview.webp",
    technologies: ["SvelteKit", "AdonisJS", "TypeScript", "PostgreSQL", "TailwindCSS", "REST API", "Vercel"],
    category: "web",
    featured: true,
    isPortrait: false,
    objectives:
      "Simplifier la mise en relation entre demandeurs de forage et prestataires qualifiés via un parcours en 3 étapes (soumission → propositions → acceptation), tout en garantissant la confidentialité du budget client et le cloisonnement entre les 3 acteurs (client, prestataires, plateforme).",
    results:
      "Plateforme avec front SvelteKit (soumission de projet, espace client, suivi temps réel, acceptation d'offre en un clic) et back AdonisJS (workflow d'appel d'offres en 8 étapes, gestion documentaire, offres masquées entre prestataires). Statistiques mises en avant : 100% budget protégé, 3 acteurs cloisonnés, 8 étapes contrôlées.",
    demoUrl: "https://forage-frontend.vercel.app",
    codeUrl: "",
    countries: ["CM"],
  },
  {
    id: "65",
    title: "StediiHome – Back Office Admin",
    description:
      "Back office administrateur pour la plateforme StediiHome permettant de piloter l'activité opérationnelle : tableau de bord avec KPIs en temps réel (utilisateurs, workers, employeurs), modération des avis, vérification des documents d'identité, gestion des catégories/compétences/langues et système de notifications. Interface admin pour garantir la qualité et la conformité de la plateforme d'employabilité domestique.",
    imageUrl: "./images/stediihome-backoffice-preview.jpeg",
    technologies: ["SvelteKit", "TypeScript", "TailwindCSS", "Role-Based Access", "Document Verification", "Dashboard Analytics", "REST API"],
    category: "web",
    featured: true,
    isPortrait: false,
    objectives:
      "Outiller les administrateurs StediiHome pour modérer la plateforme à grande échelle : valider les documents d'identité des travailleurs, modérer les avis post-contrat, gérer le référentiel (catégories, compétences, langues) et superviser l'activité globale via un tableau de bord centralisé.",
    results:
      "Dashboard admin complet avec sidebar à 4 sections (Pilotage, Utilisateurs, Activité, Configuration, Communication), 5 KPI cards (utilisateurs, workers, employeurs, avis à modérer, documents à vérifier), panneau Actions requises priorisées et aperçu plateforme en temps réel. Interface épurée aux couleurs StediiHome (violet/purple).",
    demoUrl: "",
    codeUrl: "",
    countries: ["KE", "BF", "CI"],
  },
  {
    id: "66",
    title: "Banana House – E-commerce Bananes",
    description:
      "Site e-commerce de Banana House, grossiste spécialisé dans la vente de bananes fraîches en gros et détail en Côte d'Ivoire. Propose 3 variétés (Plantain à 500 FCFA/kg, Douce Cavendish à 400 FCFA/kg, Plantain Corne à 550 FCFA/kg) avec précommande en ligne, livraison nationale et retrait possible, pour particuliers, semi-grossistes et professionnels.",
    imageUrl: "./images/bananahouse-preview.webp",
    technologies: ["Next.js", "TailwindCSS", "E-commerce", "Responsive Design", "SEO", "Vercel"],
    category: "e-commerce",
    featured: true,
    isPortrait: false,
    objectives:
      "Digitaliser l'activité de Banana House en offrant une vitrine e-commerce moderne pour faciliter les commandes B2B et B2C de bananes fraîches, avec présentation claire des variétés, prix au kilo et options de livraison/retrait sur toute la Côte d'Ivoire.",
    results:
      "Site e-commerce avec catalogue de 3 variétés de bananes, fiches produits détaillées (cuisson, dessert, densité), système de précommande en ligne, mise en avant des arguments qualité (sélection rigoureuse, producteurs partenaires) et couverture nationale pour la livraison.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "67",
    title: "FinSim – Simulateur de Marché Financier",
    description:
      "Simulateur de marché financier gamifié pour Android et iOS, construit en Kotlin Multiplatform (KMP) avec une base de code partagée. Logique métier centralisée dans un module shared, UI native via Jetpack Compose (Android) et SwiftUI (iOS). Trade en temps réel sur des données de marché réelles : Forex, Crypto et bientôt BRVM, avec flux de prix WebSocket et cache Redis pour la performance.",
    imageUrl: "./images/finsim-preview.webp",
    technologies: ["Kotlin Multiplatform", "Jetpack Compose", "SwiftUI", "Ktor", "PostgreSQL", "Redis", "WebSocket", "Docker", "Hexagonal Architecture"],
    category: "fintech",
    featured: true,
    isPortrait: false,
    objectives:
      "Explorer Kotlin Multiplatform sur un cas d'usage exigeant — un simulateur de trading temps réel — pour mutualiser la logique métier entre Android et iOS tout en conservant une UI 100% native sur chaque plateforme. Démocratiser l'apprentissage des marchés financiers (Forex, Crypto, BRVM) via une expérience gamifiée et sans risque.",
    results:
      "Application multiplateforme avec un seul langage (Kotlin) pour deux plateformes, backend Ktor en architecture hexagonale, PostgreSQL pour la persistance, Redis pour le cache temps réel et WebSocket pour les flux de prix. API locale containerisée Docker, UI native Jetpack Compose / SwiftUI, intégration de données de marché réelles Forex et Crypto (BRVM à venir).",
    demoUrl: "",
    codeUrl: "",
    countries: ["BJ", "BF", "CI", "GW", "ML", "NE", "SN", "TG"],
  },
  {
    id: "68",
    title: "Alph Backoffice – Administration de Missions & Agents",
    description:
      "Back office d'administration de la plateforme Alph permettant de superviser l'ensemble de l'activité : tableau de bord avec KPIs en temps réel (utilisateurs, agents, missions, revenus, communautés, incidents), gestion des utilisateurs et des agents avec vérifications en attente, suivi des missions, paiements, modération des communautés et traitement des incidents signalés. Interface centralisée pour piloter l'opérationnel au quotidien.",
    imageUrl: "./images/alph-backoffice-preview.png",
    technologies: ["Svelte", "TailwindCSS", "Dashboard Analytics", "Role-Based Access", "Chart.js", "REST API"],
    category: "web",
    featured: true,
    isPortrait: false,
    objectives:
      "Doter les administrateurs Alph d'un outil unique pour piloter la plateforme : valider les inscriptions d'utilisateurs et d'agents, suivre les missions et les revenus, animer les communautés et traiter les incidents signalés, le tout depuis un tableau de bord centralisé et lisible.",
    results:
      "Dashboard admin complet avec sidebar à 9 sections (Dashboard, Utilisateurs, Agents, Missions, Paiements, Communautés, Incidents, Notifications, Références, Système), 6 KPI cards avec indicateurs d'attente, graphique « Missions par mois » (missions vs revenus) et panneau d'activité récente en temps réel.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "69",
    title: "Mon Médecin – Back Office Santé",
    description:
      "Back office d'administration de la plateforme Mon Médecin permettant de gérer les centres médicaux, les spécialités et les praticiens depuis une interface simple et moderne. Espace d'administration sécurisé pour structurer l'offre de soins et piloter le référentiel médical.",
    imageUrl: "./images/mon-medecin-admin-preview.webp",
    technologies: ["Vue.js", "TailwindCSS", "Healthcare", "Dashboard", "Authentication", "REST API"],
    category: "web",
    featured: true,
    isPortrait: false,
    objectives:
      "Offrir aux administrateurs de Mon Médecin une interface centralisée pour gérer les centres de santé, les spécialités et les praticiens, et garantir la fiabilité du référentiel médical présenté aux patients.",
    results:
      "Back-office avec authentification sécurisée, écran de connexion aux couleurs de la marque (vert santé) et modules de gestion des centres, spécialités et praticiens. Interface épurée et responsive pensée pour un usage quotidien par les administrateurs.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "70",
    title: "NexStream – Espace IPTV Personnel",
    description:
      "Plateforme web NexStream permettant aux utilisateurs de créer leurs accès IPTV, de recharger leur compte et de suivre leurs abonnements en toute simplicité. Landing page moderne et espace client pour gérer ses chaînes sans complication, avec essai gratuit et suivi des serveurs en ligne.",
    imageUrl: "./images/nexstream-preview.png",
    technologies: ["Next.js", "TailwindCSS", "Authentication", "Subscription Management", "Responsive Design", "Vercel"],
    category: "web",
    featured: true,
    isPortrait: false,
    objectives:
      "Simplifier la gestion d'un abonnement IPTV pour l'utilisateur final : création de compte, rechargement et suivi des abonnements depuis un espace personnel clair, avec une landing page convaincante et un essai gratuit de 48h.",
    results:
      "Landing page sombre et moderne avec parcours d'inscription / connexion, mise en avant des chiffres clés (serveurs, nombre de chaînes, essai gratuit 48h), statut des serveurs en ligne (Dream 4K) et espace personnel pour gérer ses accès et recharges.",
    demoUrl: "https://nexstream.live",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "71",
    title: "SOSMoney – Microcrédit Instantané",
    description:
      "Plateforme fintech SOSMoney proposant du microcrédit instantané accessible à tous : obtenez un prêt de 5 000 à 50 000 FCFA en quelques minutes, 100% en ligne depuis votre mobile. Landing page et application permettant d'emprunter, d'acheter et de rembourser simplement, avec une boutique intégrée et un réseau de partenaires.",
    imageUrl: "./images/sosmoney-preview.webp",
    technologies: ["Next.js", "TailwindCSS", "Fintech", "Microcredit", "Mobile-First", "Responsive Design"],
    category: "fintech",
    featured: true,
    isPortrait: false,
    objectives:
      "Démocratiser l'accès au crédit en Côte d'Ivoire en proposant un microcrédit instantané, 100% en ligne et accessible à tous, avec une validation en quelques minutes et un parcours mobile-first simple et rassurant.",
    results:
      "Landing page fintech au design soigné (univers violet, illustration 3D) mettant en avant le prêt instantané de 5 000 à 50 000 FCFA, la validation en quelques minutes, un taux à partir de 5%, des transactions chiffrées et une navigation Fonctionnalités / Prêt / Boutique / Partenaires.",
    demoUrl: "https://sosmoney-admin.vercel.app/",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "72",
    title: "SIGAPE-OH – Portail National de l'Eau",
    description:
      "Front client de SIGAPE-OH, le service public numérique de l'eau porté par la DGRE (Ministère des Eaux et Forêts, Côte d'Ivoire). Site vitrine institutionnel et espace demandeur permettant de déposer une demande d'autorisation de prélèvement d'eau via un assistant en 7 étapes, de suivre son instruction en temps réel et de télécharger l'autorisation signée — 100% dématérialisé.",
    imageUrl: "./images/sigape-oh-front-preview.webp",
    technologies: ["SvelteKit 2", "Svelte 5 Runes", "TypeScript", "Tailwind CSS v4", "Laravel API", "Sanctum Auth", "Cartographie"],
    category: "web",
    featured: true,
    isPortrait: false,
    objectives:
      "Dématérialiser intégralement la procédure d'autorisation de prélèvement d'eau brute prévue par le Code de l'eau ivoirien : offrir au demandeur un parcours guidé en 7 étapes avec sauvegarde de brouillon, dépôt de pièces justificatives, suivi temps réel de l'instruction et récupération de l'autorisation, le tout dans une identité institutionnelle bleue moderne.",
    results:
      "Site vitrine public (Accueil, Autorisations, Cartographie, Réseau, Statistiques, Actualités) couplé à un espace demandeur protégé : assistant de demande 7 étapes, timeline de workflow en temps réel, messagerie de complément de dossier et téléchargement du PDF signé. 12 types d'autorisations, 31 régions couvertes, service disponible 24/7.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "73",
    title: "Axelle Sanogo – Application Mobile",
    description:
      "Application mobile e-commerce de la maison de maroquinerie ivoirienne Axelle Sanogo, déclinaison native du site axellesanogo.ci. Catalogue des collections Signature et Prestige, recherche par référence, précommandes avec remise, avis clients et paiement Mobile Money pour acheter sacs et accessoires en cuir directement depuis son téléphone.",
    imageUrl: "./images/axelle-sanogo-app-preview.webp",
    technologies: ["Flutter", "E-commerce", "Mobile Money", "REST API", "Product Catalog", "Push Notifications"],
    category: "e-commerce",
    featured: false,
    isPortrait: true,
    objectives:
      "Prolonger l'expérience de la marque Axelle Sanogo sur mobile en offrant une boutique native fluide : navigation par univers (Sacs femme, Accessoires, Cartes cadeau), recherche instantanée, précommandes et paiement adapté au marché ivoirien.",
    results:
      "Application au design éditorial fidèle à l'identité de la marque : collection Signature filtrable, badges de précommande -10%, notation et avis par produit, affichage des prix en FCFA avec prix barrés, et navigation par onglets (Collection, Recherche, Panier, Boutique).",
    demoUrl: "https://axellesanogo.ci",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "74",
    title: "WeCatho – Communauté Catholique Mondiale",
    description:
      "Application mobile connectant les catholiques du monde entier autour d'une carte interactive de membres géolocalisés, d'une messagerie chiffrée et de groupes de prière thématiques. Pensée pour les fidèles, pèlerins et paroisses, elle prépare également une boutique d'objets liturgiques de Lourdes et une billetterie d'événements chrétiens.",
    imageUrl: "./images/wecatho-preview.webp",
    technologies: ["Flutter", "Mapbox", "Firebase", "End-to-End Encryption", "Geolocation", "Real-time Chat", "Multilingual"],
    category: "social",
    featured: false,
    isPortrait: true,
    objectives:
      "Favoriser les échanges spirituels et les rencontres entre catholiques de tous pays via une carte mondiale de membres, une messagerie sécurisée de bout en bout et des groupes par paroisse, pays ou thème de prière, le tout dans une interface multilingue et modérée.",
    results:
      "Carte interactive avec clustering des membres par zone (Europe et Afrique de l'Ouest), recherche filtrée de frères et sœurs, panneau des membres à proximité, et navigation dédiée Carte / Pile / Messages / Paramètres dans un thème sombre et doré à l'esthétique liturgique.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI", "BJ", "SN", "FR", "BE", "CD"],
  },
  {
    id: "75",
    title: "SIGAPE-OH – Back-office DGRE",
    description:
      "Back-office administratif de SIGAPE-OH destiné aux agents de la DGRE. Il pilote l'instruction des demandes d'autorisation d'eau le long d'un workflow à 9 étapes — de la recevabilité à la signature électronique du Ministre — avec gestion fine des rôles, cartographie des ouvrages, statistiques et administration complète de la plateforme.",
    imageUrl: "./images/sigape-oh-backoffice-preview.webp",
    technologies: ["SvelteKit 2", "Svelte 5 Runes", "TypeScript", "Tailwind CSS v4", "Laravel 12", "PostgreSQL", "Role-Based Access", "Data Visualization"],
    category: "web",
    featured: true,
    isPortrait: false,
    objectives:
      "Doter l'administration d'un outil d'instruction centralisé où chaque agent n'agit que sur les dossiers relevant de son étape : agent de réception, service technique, service juridique, directeur, directeur général, cabinet du ministre et ministre signataire, avec journalisation de chaque transition du workflow.",
    results:
      "Tableau de bord temps réel (dossiers à traiter, en cours, délivrés, délai moyen, rejets), graphiques d'évolution mensuelle, répartition par type d'autorisation et par région, file d'instruction, cartographie, plus un module d'administration complet : utilisateurs, rôles et permissions, types d'autorisations, modèles de documents et actualités.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "76",
    title: "DGRE – Portail des Autorisations d'Eau (V1)",
    description:
      "Première version du portail de la Direction Générale des Ressources en Eau (Ministère des Eaux et Forêts, Côte d'Ivoire), dans l'identité institutionnelle verte et orange « Eaux et Forêts ». Site vitrine et espace demandeur permettant de déposer, suivre et recevoir en ligne ses autorisations d'utilisation de l'eau — sans déplacement et sans papier. Cette V1 a ensuite évolué vers la charte bleue SIGAPE-OH.",
    imageUrl: "./images/dgre-preview.webp",
    technologies: ["SvelteKit 2", "Svelte 5 Runes", "TypeScript", "Tailwind CSS v4", "Oswald", "Laravel API", "Sanctum Auth"],
    category: "web",
    featured: true,
    isPortrait: false,
    objectives:
      "Poser les fondations du service public numérique de l'eau : dématérialiser la procédure d'autorisation de prélèvement prévue par le Code de l'eau ivoirien, avec une identité visuelle alignée sur celle du Ministère des Eaux et Forêts (vert institutionnel, orange d'accent, typographie Oswald).",
    results:
      "Portail public complet avec espace demandeur sécurisé, dépôt et suivi de dossier en ligne, documentation et FAQ réglementaires, et bandeau d'indicateurs clés : 12 480 demandes traitées, 9 760 autorisations délivrées, 15 jours de délai moyen de traitement et 31 régions couvertes.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "77",
    title: "MIABA Group – Mobilité Premium en Afrique",
    description:
      "Site vitrine et plateforme de réservation de MIABA Group, service de chauffeur privé et de location de véhicules haut de gamme basé à Abidjan. Transferts aéroport avec suivi de vol, mise à disposition de chauffeur, location avec ou sans conducteur et offre corporate, présentés dans une identité sombre et dorée, en français et en anglais.",
    imageUrl: "./images/miaba-landing-preview.webp",
    technologies: ["SvelteKit 2", "Svelte 5 Runes", "TypeScript", "Tailwind CSS", "i18n EN/FR", "Booking Flow", "WhatsApp API", "SEO"],
    category: "web",
    featured: true,
    isPortrait: false,
    objectives:
      "Positionner MIABA Group comme la référence de la mobilité premium en Afrique de l'Ouest : rassurer une clientèle d'affaires et internationale grâce à des tarifs fixes affichés, un suivi de vol, une disponibilité 24/7 et des chauffeurs vérifiés, tout en rendant la réservation possible en quelques clics ou via WhatsApp.",
    results:
      "Landing page premium bilingue articulée autour de 6 services (accueil aéroport, dépose aéroport, transfert point à point, chauffeur privé, location avec chauffeur, location sans chauffeur), d'une flotte Mercedes-Benz détaillée (S 300 VIP dès 150 000 FCFA, CLS 450 AMG dès 130 000 FCFA, Classe E dès 110 000 FCFA), d'un espace Corporate, d'un programme partenaires et de parcours de réservation directe ou WhatsApp.",
    demoUrl: "https://miaba.africa",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "78",
    title: "Axelle Sanogo – Back-office E-commerce",
    description:
      "Back-office de gestion de la maison de maroquinerie ivoirienne Axelle Sanogo, pendant administratif du site axellesanogo.ci et de l'application mobile. Il centralise le catalogue produits, les commandes et devis, la base clients et prospects, les avis, le programme de récompenses et la newsletter dans une interface aux codes luxe de la marque.",
    imageUrl: "./images/axelle-sanogo-backoffice-preview.webp",
    technologies: ["SvelteKit 2", "Svelte 5 Runes", "TypeScript", "Tailwind CSS", "REST API", "Role-Based Access", "Data Visualization", "Vercel"],
    category: "web",
    featured: true,
    isPortrait: false,
    objectives:
      "Donner à la marque un outil unique pour piloter sa boutique en ligne et son application mobile : administrer les produits par univers et catégories, suivre commandes et devis, gérer la relation client (prospects, avis, récompenses, newsletter) et publier les remises de précommande sans intervention technique.",
    results:
      "Interface d'administration complète — tableau de bord, catalogue de 24 produits en vue grille ou liste avec filtres par univers, catégorie et état du stock, badges de remise et de niveau, prix en FCFA avec prix barrés, notes et nombre d'avis par produit — ainsi que les modules Commandes, Devis, Clients, Prospects, Avis, Récompenses et Newsletter.",
    demoUrl: "https://as-mobile-back-office.vercel.app",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "79",
    title: "Ma Cantine – Site Vitrine",
    description:
      "Site de présentation de Ma Cantine, le service qui livre au bureau le plat du jour des cantines de quartier d'Abidjan. Il présente les plats, le fonctionnement de la commande, l'application client, les abonnements et l'espace restaurateur, dans une identité chaleureuse orange et brun.",
    imageUrl: "./images/ma-cantine-site-preview.webp",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "SEO", "Vercel"],
    category: "web",
    featured: true,
    isPortrait: false,
    objectives:
      "Faire découvrir le service aux employés de bureau et aux restaurateurs : expliquer simplement la commande du déjeuner livré au bureau, mettre en avant la cuisine locale et orienter chaque visiteur vers l'application client ou l'espace restaurateur.",
    results:
      "Landing page complète avec hero illustré par l'application, sections Les plats, Comment ça marche, L'app client, Abonnements et Restaurateurs, créneaux de livraison de 11h30 à 14h, commande pour le jour même ou le lendemain, et page de crédits pour les photos de plats.",
    demoUrl: "https://ma-cantine-site.vercel.app/",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "80",
    title: "Ma Cantine – Application Client",
    description:
      "Application mobile pour commander son déjeuner et se le faire livrer au bureau à Abidjan. Le client choisit le plat du jour d'une cantine pour aujourd'hui ou demain, indique son lieu de travail et règle à la livraison ou via une formule d'abonnement. Elle s'appuie sur l'API Ma Cantine développée en Fastify.",
    imageUrl: "./images/ma-cantine-client-preview.webp",
    technologies: ["Flutter", "Riverpod", "go_router", "Dio", "Secure Storage", "Fastify API", "REST API"],
    category: "e-commerce",
    featured: false,
    isPortrait: true,
    objectives:
      "Rendre la commande du déjeuner aussi simple que possible pour les employés de bureau : menu du jour clair, panier par restaurateur, choix du lieu de livraison et formules semaine ou mois pour ceux qui commandent régulièrement.",
    results:
      "Parcours complet de l'inscription à la livraison : menu Nos Plats (aujourd'hui / demain), panier, choix du lieu de travail, paiement à la livraison ou mobile money, historique et détail des commandes, abonnements avec solde de repas, et session sécurisée avec rafraîchissement automatique du token.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "81",
    title: "Ma Cantine – Espace Restaurateur",
    description:
      "Application multiplateforme (web, desktop, mobile) qui permet aux restaurateurs de gérer leur cantine sur Ma Cantine : commandes, livraisons groupées, plats du jour, formules d'abonnement, abonnés et avis clients, depuis un tableau de bord connecté à l'API Fastify.",
    imageUrl: "./images/ma-cantine-resto-preview.webp",
    technologies: ["Flutter", "Flutter Web", "Provider", "get_it", "fl_chart", "PDF Generation", "Fastify API"],
    category: "e-commerce",
    featured: true,
    isPortrait: false,
    objectives:
      "Donner aux petits restaurateurs un outil simple pour recevoir et préparer leurs commandes, organiser les livraisons par lieu de travail, publier leurs plats du jour et fidéliser leurs clients, quel que soit l'écran utilisé.",
    results:
      "Tableau de bord (chiffre d'affaires, commandes, panier moyen, évolution des ventes, plats les plus vendus), gestion des commandes de l'acceptation à la livraison, regroupement des livraisons avec impression d'étiquettes en PDF, plats du jour avec stock, formules et offres, abonnés, réponses aux avis, horaires et ouverture de la cantine, le tout dans une interface responsive.",
    demoUrl: "https://ma-cantine-resto.vercel.app",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "82",
    title: "Ma Cantine – Back-office Admin",
    description:
      "Back-office réservé à l'équipe Ma Cantine pour superviser toute la plateforme : restaurateurs, commandes, utilisateurs, lieux de travail, avis et annonces. Application Flutter multiplateforme qui s'appuie sur les routes d'administration de l'API Fastify.",
    imageUrl: "./images/ma-cantine-admin-preview.webp",
    technologies: ["Flutter", "Flutter Web", "Provider", "fl_chart", "Fastify", "TypeScript", "MikroORM", "PostgreSQL", "JWT Auth"],
    category: "web",
    featured: true,
    isPortrait: false,
    objectives:
      "Permettre à l'équipe de piloter la plateforme au quotidien : valider les restaurateurs avant leur mise en ligne, suivre les ventes et commissions, modérer les avis, communiquer avec les clients et les restaurateurs, et garder une trace de chaque action d'administration.",
    results:
      "Tableau de bord des ventes et commissions sur 7, 30 ou 90 jours avec top restaurateurs et ventes par zone, validation et suspension des restaurateurs avec commission personnalisée, gestion des commandes, utilisateurs et lieux de travail (fusion des doublons), modération des avis, annonces ciblées, paramètres et journal des actions admin.",
    demoUrl: "https://ma-cantine-admin.vercel.app",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "85",
    title: "TransfertCM – Landing Page",
    description:
      "Site de présentation de TransfertCM, la plateforme camerounaise qui permet d'acheter du crédit et des forfaits MTN ou Orange pour soi ou pour ses proches, à toute heure, depuis son téléphone. Il présente les services, le fonctionnement, le portefeuille, les tarifs et la FAQ, et oriente vers le téléchargement de l'application.",
    imageUrl: "./images/transfertcm-landing-preview.webp",
    technologies: ["SvelteKit", "Svelte 5", "TypeScript", "Tailwind CSS v4", "Static Adapter", "Docker", "Nginx"],
    category: "fintech",
    featured: true,
    isPortrait: false,
    objectives:
      "Présenter clairement le service aux utilisateurs camerounais : recharge de crédit et de forfaits sur les réseaux MTN et Orange, portefeuille rechargeable et frais transparents, avec un parcours direct vers l'application mobile.",
    results:
      "Landing page avec mise en avant de l'application, sections Services, Comment ça marche, Portefeuille, Tarifs et Questions fréquentes, liens vers Google Play et l'App Store, et rappel des conditions clés (frais fixes par commande, crédit à partir de 150 XAF).",
    demoUrl: "https://transfertcm.miaba.africa",
    codeUrl: "",
    countries: ["CM"],
  },
  {
    id: "86",
    title: "TransfertCM – Back-office & Espace Cabine",
    description:
      "Plateforme web de gestion de TransfertCM avec deux espaces : le back-office de l'équipe (commandes, cabines, finance, fraude, support, équipe) et l'espace des cabines, les agents qui exécutent les recharges. Elle s'appuie sur une API AdonisJS d'environ 260 routes avec temps réel Socket.io.",
    imageUrl: "./images/transfertcm-backoffice-preview.webp",
    technologies: ["SvelteKit", "TypeScript", "Tailwind CSS v4", "AdonisJS", "PostgreSQL", "Redis", "Socket.io", "S3", "Docker"],
    category: "fintech",
    featured: true,
    isPortrait: false,
    objectives:
      "Donner à l'équipe un poste de pilotage complet de la plateforme et aux cabines un espace de travail dédié pour recevoir, exécuter et suivre les commandes de recharge, avec des rôles et permissions distincts pour chaque profil.",
    results:
      "Back-office avec tableau de bord, commandes et attribution aux cabines, gestion des cabines et de leur solde UV, finance, rapports, anti-fraude, réclamations, call center, messagerie, notifications, abonnements, rémunérations et gestion de l'équipe. Espace cabine avec tableau de bord, commandes en temps réel, messagerie, documents, performance et abonnement. Côté API : paiements avec circuit breaker, portefeuille, moteur d'attribution automatique des commandes et protections de charge.",
    demoUrl: "https://transfertcm.miaba.africa/login",
    codeUrl: "",
    countries: ["CM"],
  },
  {
    id: "87",
    title: "TransfertCM – Application Mobile",
    description:
      "Application mobile TransfertCM pour recharger du crédit et des forfaits MTN ou Orange au Cameroun. Le client gère son portefeuille, envoie du crédit à ses contacts et programme des transferts. La même application intègre aussi un mode cabine pour les agents qui traitent les commandes en temps réel.",
    imageUrl: "./images/transfertcm-mobile-preview.webp",
    technologies: ["Flutter", "Riverpod", "go_router", "Dio", "Freezed", "Socket.io", "Biometric Auth", "AdonisJS API"],
    category: "fintech",
    featured: false,
    isPortrait: true,
    objectives:
      "Rendre la recharge de crédit aussi rapide que possible : un portefeuille, quelques gestes pour envoyer, recharger, transférer ou programmer, et un suivi clair de chaque commande, avec un accès sécurisé par code PIN et biométrie.",
    results:
      "Côté client : inscription par téléphone et code PIN, portefeuille avec envoi, recharge, transfert et programmation, forfaits, contacts, historique des commandes, réclamations, support et parrainage. Côté cabine : connexion agent, réception et traitement des commandes en temps réel, messagerie et profil.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CM"],
  },
  {
    id: "88",
    title: "DIAB Consulting – Site Vitrine",
    description:
      "Site vitrine de DIAB Consulting, cabinet multiservice qui accompagne particuliers et entreprises entre la Côte d'Ivoire et le Maroc. Il présente une dizaine de pôles d'activité (marketing digital, électricité, automobile, écoute juridique, BTP, événementiel, import/export…) dans une identité bleu nuit et or, avec prise de contact directe sur WhatsApp.",
    imageUrl: "./images/diab-consulting-preview.webp",
    technologies: ["SvelteKit", "Svelte 5 Runes", "TypeScript", "Tailwind CSS v4", "Playwright", "SEO", "Vercel"],
    category: "web",
    featured: true,
    isPortrait: false,
    objectives:
      "Donner au cabinet une présence en ligne professionnelle qui rassure et rende lisible une offre très large, en guidant chaque visiteur vers le bon pôle d'activité puis vers une demande de devis.",
    results:
      "Site complet avec accueil, page Nos activités et fiche détaillée par pôle, page À propos, contact et mentions légales, bouton de devis WhatsApp toujours accessible, animations d'apparition au défilement et balises SEO sur chaque page.",
    demoUrl: "https://diaby-consulting.vercel.app",
    codeUrl: "",
    countries: ["CI", "MA"],
  },
  {
    id: "89",
    title: "APCI – Anciens Parlementaires de Côte d'Ivoire",
    description:
      "Site institutionnel bilingue de l'Assemblée des Anciens Parlementaires de Côte d'Ivoire, dans une palette « Hémicycle » bordeaux profond, or vieilli et ivoire. Il réunit l'histoire de l'association, l'annuaire des membres, un mémorial, les actualités et un espace membre, le tout alimenté par une API Laravel dédiée.",
    imageUrl: "./images/apci-preview.webp",
    technologies: ["SvelteKit", "Svelte 5 Runes", "Tailwind CSS v4", "Paraglide i18n", "Laravel", "PostgreSQL", "Sanctum", "Full-text Search"],
    category: "web",
    featured: true,
    isPortrait: false,
    objectives:
      "Préserver et transmettre la mémoire parlementaire ivoirienne tout en offrant aux anciens élus un outil de vie associative : adhésion en ligne, espace privé, événements et communication avec le public, en français et en anglais.",
    results:
      "Plus de trente pages : histoire, vision, missions, mot du président, annuaire et fiches des membres, mémorial avec archives et galerie des présidents, actualités, galeries photo et vidéo, documentation, actions sociales, partenariats, recherche avec autocomplétion, adhésion, inscription aux événements et espace membre. Toutes les requêtes passent par le serveur SvelteKit : le navigateur ne parle jamais directement à l'API et le jeton reste dans un cookie httpOnly.",
    demoUrl: "https://apci-web.vercel.app/histoire",
    codeUrl: "",
    countries: ["CI"],
  },
  {
    id: "90",
    title: "AFAC-CI – Anciens Combattants de Côte d'Ivoire",
    description:
      "Site institutionnel bilingue de l'Association Fraternelle des Anciens Combattants de Côte d'Ivoire, aux couleurs de l'association : vert profond, or et accents nationaux ivoiriens. Il est construit autour d'un mémorial numérique qui rend hommage aux anciens combattants et transmet leur histoire.",
    imageUrl: "./images/afacci-preview.webp",
    technologies: ["SvelteKit", "Svelte 5 Runes", "TypeScript", "Tailwind CSS v4", "Paraglide i18n"],
    category: "web",
    featured: true,
    isPortrait: false,
    objectives:
      "Préserver la mémoire des anciens combattants ivoiriens, valoriser leur histoire auprès du public et des jeunes générations, et donner à l'association un outil de vie associative : adhésion, dons, événements et espace membre.",
    results:
      "Front-end complet d'une vingtaine de pages : histoire et chronologie, présentation de l'association et de son bureau, mot du président, nos héros, mémorial numérique (livre d'honneur, recherche des disparus par nom, grade ou région, galerie des héros, témoignages, archives, mur du souvenir interactif, grandes missions), actualités, événements, galerie, actions sociales, documentation, partenaires, adhésion, contact, dons et espace membre.",
    demoUrl: "",
    codeUrl: "",
    countries: ["CI"],
  },
];

export const PROJECT_COUNT = defaultProjects.length;

export const PROJECTS = defaultProjects;

export default ProjectsGrid;