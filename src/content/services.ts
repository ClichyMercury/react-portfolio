import type { Localized } from "@/i18n";

export type ServiceKey = "web" | "mobile" | "freelance";

export type ServiceCase = {
  id: string;
  title: string;
  image: string;
  url?: string;
  portrait?: boolean;
  place: Localized;
};

export type ServiceContent = {
  title: Localized;
  description: Localized;
  eyebrow: Localized;
  h1: Localized;
  intro: Localized<string[]>;
  offersTitle: Localized;
  offers: { title: Localized; text: Localized }[];
  casesTitle: Localized;
  cases: ServiceCase[];
  processTitle: Localized;
  process: { title: Localized; text: Localized }[];
  stackTitle: Localized;
  stack: string[];
  faqTitle: Localized;
  faq: { q: Localized; a: Localized }[];
  ctaTitle: Localized;
  ctaText: Localized;
  serviceType: Localized;
};

const ABIDJAN: Localized = { fr: "Abidjan, Côte d'Ivoire", en: "Abidjan, Ivory Coast" };

const COMMON_PROCESS: ServiceContent["process"] = [
  {
    title: { fr: "Cadrage", en: "Scoping" },
    text: {
      fr: "On échange sur votre activité, vos clients et vos objectifs. Je vous remets un périmètre clair : pages ou écrans, fonctionnalités, délais et budget.",
      en: "We talk about your business, your customers and your goals. You get a clear scope: pages or screens, features, timeline and budget.",
    },
  },
  {
    title: { fr: "Maquettes", en: "Design" },
    text: {
      fr: "Je propose l'interface avant d'écrire le code, pour valider ensemble le parcours et l'apparence.",
      en: "I design the interface before writing code, so we validate the user journey and the look together.",
    },
  },
  {
    title: { fr: "Développement", en: "Development" },
    text: {
      fr: "Livraisons régulières sur une adresse de test : vous suivez l'avancement et réagissez au fur et à mesure.",
      en: "Regular releases on a staging address: you follow progress and give feedback as we go.",
    },
  },
  {
    title: { fr: "Mise en ligne et suivi", en: "Launch and support" },
    text: {
      fr: "Déploiement, nom de domaine, HTTPS, référencement de base, puis accompagnement après la mise en ligne.",
      en: "Deployment, domain name, HTTPS, SEO basics, then support after launch.",
    },
  },
];

export const SERVICES: Record<ServiceKey, ServiceContent> = {
  web: {
    title: {
      fr: "Création de site web à Abidjan — Gaël Sassan, développeur web",
      en: "Web development in Abidjan, Ivory Coast — Gaël Sassan",
    },
    description: {
      fr: "Création de sites vitrines, boutiques en ligne, plateformes et back-offices sur mesure à Abidjan. Développeur web avec 6+ ans d'expérience et 90+ projets livrés en Côte d'Ivoire et en Afrique de l'Ouest.",
      en: "Custom websites, online stores, web platforms and back-offices built in Abidjan. Web developer with 6+ years of experience and 90+ projects delivered across Ivory Coast and West Africa.",
    },
    eyebrow: { fr: "Création de site web · Abidjan", en: "Web development · Abidjan" },
    h1: {
      fr: "Création de site web à Abidjan, sur mesure et rapide",
      en: "Custom web development in Abidjan, Ivory Coast",
    },
    intro: {
      fr: [
        "Je suis Gaël Sassan, développeur web basé à Abidjan. Depuis plus de 6 ans, je conçois des sites et des plateformes pour des entreprises, des institutions et des startups en Côte d'Ivoire et dans la sous-région.",
        "Site vitrine pour présenter votre activité, boutique en ligne avec commande et paiement, ou plateforme métier avec back-office : je m'occupe de tout, de la maquette à la mise en ligne.",
      ],
      en: [
        "I'm Gaël Sassan, a web developer based in Abidjan. For over 6 years I've been building websites and platforms for companies, institutions and startups in Ivory Coast and across West Africa.",
        "A showcase site to present your business, an online store with ordering and payment, or a business platform with a back-office: I handle everything from design to launch.",
      ],
    },
    offersTitle: { fr: "Ce que je réalise", en: "What I build" },
    offers: [
      {
        title: { fr: "Site vitrine", en: "Showcase website" },
        text: {
          fr: "Un site professionnel, rapide sur mobile et bien référencé, pour être trouvé sur Google et rassurer vos clients.",
          en: "A professional website, fast on mobile and search-engine friendly, so customers find you on Google and trust you.",
        },
      },
      {
        title: { fr: "Boutique en ligne", en: "Online store" },
        text: {
          fr: "Catalogue, panier, commande, suivi et paiement adaptés au marché local : mobile money, paiement à la livraison, commande WhatsApp.",
          en: "Catalog, cart, ordering, tracking and payments suited to the local market: mobile money, cash on delivery, WhatsApp ordering.",
        },
      },
      {
        title: { fr: "Plateforme et back-office", en: "Platform and back-office" },
        text: {
          fr: "Espaces clients, tableaux de bord, gestion des commandes, des utilisateurs et des documents, avec des accès sécurisés.",
          en: "Customer portals, dashboards, management of orders, users and documents, with secure access control.",
        },
      },
      {
        title: { fr: "Refonte et performance", en: "Redesign and performance" },
        text: {
          fr: "Modernisation d'un site existant : design, vitesse de chargement, référencement et hébergement.",
          en: "Modernizing an existing site: design, loading speed, SEO and hosting.",
        },
      },
    ],
    casesTitle: { fr: "Sites livrés en Côte d'Ivoire", en: "Websites delivered in Ivory Coast" },
    cases: [
      { id: "83", title: "Les Entreprises G&N – Boutique en ligne", image: "/images/gn-entreprises-preview.webp", url: "https://lesentreprisesgn.com", place: ABIDJAN },
      { id: "77", title: "MIABA Group – Mobilité Premium en Afrique", image: "/images/miaba-landing-preview.webp", url: "https://miaba.africa", place: ABIDJAN },
      { id: "45", title: "Alph Sécurité (Landing Page)", image: "/images/alph-securite-preview.webp", url: "https://www.alphsecurite.ci/", place: ABIDJAN },
      { id: "42", title: "Jeko Landing Page", image: "/images/jeko-landing-preview.webp", url: "https://jeko.africa", place: ABIDJAN },
      { id: "89", title: "APCI – Anciens Parlementaires de Côte d'Ivoire", image: "/images/apci-preview.webp", url: "https://apci-web.vercel.app/histoire", place: ABIDJAN },
      { id: "49", title: "Décor de Rêve – Site Vitrine", image: "/images/decor-de-reve-frontsite-preview.webp", url: "https://decor-de-reve-frontsite.vercel.app/", place: ABIDJAN },
    ],
    processTitle: { fr: "Comment on travaille", en: "How we work" },
    process: COMMON_PROCESS,
    stackTitle: { fr: "Technologies", en: "Tech stack" },
    stack: ["SvelteKit", "React", "TypeScript", "Tailwind CSS", "Laravel", "Supabase", "PostgreSQL", "Docker"],
    faqTitle: { fr: "Questions fréquentes", en: "Frequently asked questions" },
    faq: [
      {
        q: { fr: "Combien coûte un site web à Abidjan ?", en: "How much does a website cost in Abidjan?" },
        a: {
          fr: "Le prix dépend du type de site, du nombre de pages et des fonctionnalités. Un site vitrine et une boutique avec paiement n'ont pas le même budget. Décrivez-moi votre projet et je vous envoie un devis détaillé.",
          en: "The price depends on the type of site, the number of pages and the features. A showcase site and a store with payments have different budgets. Describe your project and I'll send you a detailed quote.",
        },
      },
      {
        q: { fr: "Combien de temps faut-il pour créer un site ?", en: "How long does it take to build a website?" },
        a: {
          fr: "Cela dépend du périmètre. Le délai est fixé dès le cadrage, et vous suivez l'avancement sur une adresse de test tout au long du projet.",
          en: "It depends on the scope. The timeline is set during scoping, and you follow progress on a staging address throughout the project.",
        },
      },
      {
        q: { fr: "Pouvez-vous intégrer le paiement mobile money ?", en: "Can you integrate mobile money payments?" },
        a: {
          fr: "Oui. J'ai travaillé sur des solutions de paiement en Côte d'Ivoire, dont les pages de paiement de Jèko, et sur des intégrations Orange Money et MTN Mobile Money.",
          en: "Yes. I've worked on payment products in Ivory Coast, including Jèko's checkout pages, and on Orange Money and MTN Mobile Money integrations.",
        },
      },
      {
        q: { fr: "Vous occupez-vous de l'hébergement et du nom de domaine ?", en: "Do you handle hosting and the domain name?" },
        a: {
          fr: "Oui : nom de domaine, hébergement, certificat HTTPS, déploiement automatique et configuration de Google Search Console.",
          en: "Yes: domain name, hosting, HTTPS certificate, automated deployment and Google Search Console setup.",
        },
      },
    ],
    ctaTitle: { fr: "Parlons de votre site", en: "Let's talk about your website" },
    ctaText: {
      fr: "Expliquez-moi votre activité et ce que vous voulez obtenir. Je vous réponds avec une proposition claire.",
      en: "Tell me about your business and what you want to achieve. I'll reply with a clear proposal.",
    },
    serviceType: { fr: "Création de site web", en: "Web development" },
  },
  mobile: {
    title: {
      fr: "Développeur application mobile en Côte d'Ivoire — Flutter, Android et iOS",
      en: "Mobile app development in Ivory Coast — Flutter, Android & iOS",
    },
    description: {
      fr: "Développement d'applications mobiles Android et iOS avec Flutter à Abidjan : fintech, santé, e-commerce, sécurité. 6+ ans d'expérience, applications publiées pour des clients en Côte d'Ivoire et en Afrique de l'Ouest.",
      en: "Android and iOS mobile app development with Flutter in Abidjan: fintech, health, e-commerce, security. 6+ years of experience building apps for clients in Ivory Coast and West Africa.",
    },
    eyebrow: { fr: "Application mobile · Côte d'Ivoire", en: "Mobile apps · Ivory Coast" },
    h1: {
      fr: "Développement d'application mobile en Côte d'Ivoire",
      en: "Mobile app development in Ivory Coast",
    },
    intro: {
      fr: [
        "Je développe des applications mobiles Android et iOS avec Flutter depuis Abidjan. Paiement, santé, livraison, sécurité citoyenne, épargne : j'ai conçu des dizaines d'applications pour des entreprises de Côte d'Ivoire et de la sous-région.",
        "Une seule base de code pour Android et iOS, des écrans pensés pour les téléphones et les connexions d'ici, et une API solide derrière l'application.",
      ],
      en: [
        "I build Android and iOS mobile apps with Flutter from Abidjan. Payments, health, delivery, citizen safety, savings: I've built dozens of apps for companies in Ivory Coast and across West Africa.",
        "One codebase for Android and iOS, screens designed for the phones and networks people actually use here, and a solid API behind the app.",
      ],
    },
    offersTitle: { fr: "Ce que je réalise", en: "What I build" },
    offers: [
      {
        title: { fr: "Application Android et iOS", en: "Android and iOS app" },
        text: {
          fr: "Une application Flutter fluide sur les deux plateformes, de la maquette à la publication sur le Play Store et l'App Store.",
          en: "A smooth Flutter app on both platforms, from design to publishing on the Play Store and the App Store.",
        },
      },
      {
        title: { fr: "Fintech et paiement", en: "Fintech and payments" },
        text: {
          fr: "Portefeuilles, transferts, tontines, microcrédit, intégration mobile money et vérification d'identité (KYC).",
          en: "Wallets, transfers, savings groups, micro-credit, mobile money integration and identity verification (KYC).",
        },
      },
      {
        title: { fr: "API et back-office", en: "API and back-office" },
        text: {
          fr: "L'API qui alimente l'application et le back-office pour la piloter : utilisateurs, contenus, commandes, statistiques.",
          en: "The API that powers the app and the back-office to run it: users, content, orders, analytics.",
        },
      },
      {
        title: { fr: "Hors ligne et notifications", en: "Offline and notifications" },
        text: {
          fr: "Fonctionnement en connexion faible ou hors ligne, notifications push, géolocalisation et alertes.",
          en: "Works on weak or no connectivity, with push notifications, geolocation and alerts.",
        },
      },
    ],
    casesTitle: { fr: "Applications réalisées", en: "Apps I've built" },
    cases: [
      { id: "47", title: "PLUSS Alert – Application Mobile Citoyenne", image: "/images/pluss-alert-mobile-preview.jpeg", url: "https://www.pluss.ci/", portrait: true, place: ABIDJAN },
      { id: "73", title: "Axelle Sanogo – Application Mobile", image: "/images/axelle-sanogo-app-preview.webp", url: "https://axellesanogo.ci", portrait: true, place: ABIDJAN },
      { id: "32", title: "SOSMONEY Mobile", image: "/images/salary-credit-mobile-preview.webp", portrait: true, place: ABIDJAN },
      { id: "38", title: "Alerte E25 – Application Citoyenne", image: "/images/alerte_e25_client_preview.webp", portrait: true, place: ABIDJAN },
      { id: "87", title: "TransfertCM – Application Mobile", image: "/images/transfertcm-mobile-preview.webp", portrait: true, place: { fr: "Cameroun", en: "Cameroon" } },
      { id: "41", title: "Payix – Application Mobile de Paiement", image: "/images/payix_preview.webp", portrait: true, place: { fr: "Togo", en: "Togo" } },
    ],
    processTitle: { fr: "Comment on travaille", en: "How we work" },
    process: COMMON_PROCESS,
    stackTitle: { fr: "Technologies", en: "Tech stack" },
    stack: ["Flutter", "Dart", "Riverpod", "Firebase", "Laravel", "Supabase", "REST API", "Kotlin"],
    faqTitle: { fr: "Questions fréquentes", en: "Frequently asked questions" },
    faq: [
      {
        q: { fr: "Pourquoi Flutter pour mon application ?", en: "Why Flutter for my app?" },
        a: {
          fr: "Flutter permet de livrer Android et iOS avec une seule base de code. Vous payez un développement au lieu de deux, et les deux versions évoluent ensemble.",
          en: "Flutter ships Android and iOS from a single codebase. You pay for one development instead of two, and both versions evolve together.",
        },
      },
      {
        q: { fr: "Combien coûte une application mobile en Côte d'Ivoire ?", en: "How much does a mobile app cost in Ivory Coast?" },
        a: {
          fr: "Le budget dépend des écrans, des fonctionnalités (paiement, géolocalisation, hors ligne) et du back-office nécessaire. Je vous envoie un devis détaillé après un premier échange.",
          en: "The budget depends on the screens, the features (payments, geolocation, offline) and the back-office required. I'll send a detailed quote after a first conversation.",
        },
      },
      {
        q: { fr: "Publiez-vous l'application sur les stores ?", en: "Do you publish the app on the stores?" },
        a: {
          fr: "Oui, je prépare et soumets l'application sur le Google Play Store et l'Apple App Store, sur vos comptes développeur.",
          en: "Yes, I prepare and submit the app to the Google Play Store and the Apple App Store, under your developer accounts.",
        },
      },
      {
        q: { fr: "L'application peut-elle fonctionner avec une connexion faible ?", en: "Can the app work on a weak connection?" },
        a: {
          fr: "Oui. Je conçois des applications qui gardent les données utiles sur le téléphone et se synchronisent dès que la connexion revient.",
          en: "Yes. I build apps that keep useful data on the device and sync as soon as the connection is back.",
        },
      },
    ],
    ctaTitle: { fr: "Parlons de votre application", en: "Let's talk about your app" },
    ctaText: {
      fr: "Décrivez-moi votre idée et vos utilisateurs. Je vous aide à définir une première version utile et réaliste.",
      en: "Tell me about your idea and your users. I'll help you define a useful, realistic first version.",
    },
    serviceType: { fr: "Développement d'application mobile", en: "Mobile app development" },
  },
  freelance: {
    title: {
      fr: "Développeur freelance en Afrique de l'Ouest — Sénégal, Bénin, Togo, Burkina, Mali",
      en: "Freelance developer in West Africa — Senegal, Benin, Togo, Burkina Faso, Mali",
    },
    description: {
      fr: "Développeur web et mobile freelance basé à Abidjan, au service des entreprises de toute l'Afrique de l'Ouest et centrale : Sénégal, Bénin, Togo, Burkina Faso, Mali, Guinée, Niger, Cameroun.",
      en: "Freelance web and mobile developer based in Abidjan, working with companies across West and Central Africa: Senegal, Benin, Togo, Burkina Faso, Mali, Guinea, Niger, Cameroon.",
    },
    eyebrow: { fr: "Freelance · Afrique de l'Ouest", en: "Freelance · West Africa" },
    h1: {
      fr: "Développeur web et mobile freelance en Afrique de l'Ouest",
      en: "Freelance web and mobile developer in West Africa",
    },
    intro: {
      fr: [
        "Basé à Abidjan, je travaille à distance avec des entreprises de toute la sous-région. J'ai déjà livré des projets pour des clients en Côte d'Ivoire, au Bénin, au Togo, en Guinée, au Cameroun et dans toute la zone UEMOA.",
        "Même fuseau horaire, même langue, même réalité du terrain : mobile money, connexions variables, usage majoritairement sur téléphone. Je construis des produits adaptés à vos utilisateurs.",
      ],
      en: [
        "Based in Abidjan, I work remotely with companies across the region. I've delivered projects for clients in Ivory Coast, Benin, Togo, Guinea, Cameroon and throughout the WAEMU zone.",
        "Same time zone, same language, same reality on the ground: mobile money, variable connectivity, mostly mobile usage. I build products that fit your users.",
      ],
    },
    offersTitle: { fr: "Ce que je propose", en: "What I offer" },
    offers: [
      {
        title: { fr: "Sites et plateformes web", en: "Websites and web platforms" },
        text: {
          fr: "Sites vitrines, boutiques en ligne, portails et back-offices, rapides et bien référencés.",
          en: "Showcase sites, online stores, portals and back-offices, fast and search-friendly.",
        },
      },
      {
        title: { fr: "Applications mobiles", en: "Mobile apps" },
        text: {
          fr: "Applications Android et iOS avec Flutter, publiées sur les stores.",
          en: "Android and iOS apps with Flutter, published on the stores.",
        },
      },
      {
        title: { fr: "Renfort d'équipe", en: "Team reinforcement" },
        text: {
          fr: "J'interviens dans une équipe existante comme développeur ou lead front-end, sur une mission courte ou longue.",
          en: "I join an existing team as a developer or front-end lead, for short or long engagements.",
        },
      },
      {
        title: { fr: "Mise en production", en: "Production deployment" },
        text: {
          fr: "Serveur, déploiement automatique, HTTPS, sauvegardes et supervision pour que votre produit tienne la charge.",
          en: "Server, automated deployment, HTTPS, backups and monitoring so your product holds up in production.",
        },
      },
    ],
    casesTitle: { fr: "Projets dans la sous-région", en: "Projects across the region" },
    cases: [
      { id: "67", title: "FinSim – Simulateur de Marché Financier", image: "/images/finsim-preview.webp", place: { fr: "Zone UEMOA", en: "WAEMU zone" } },
      { id: "85", title: "TransfertCM – Landing Page", image: "/images/transfertcm-landing-preview.webp", url: "https://transfertcm.miaba.africa", place: { fr: "Cameroun", en: "Cameroon" } },
      { id: "64", title: "Forage – Plateforme Mise en Relation", image: "/images/forage-preview.webp", url: "https://forage-frontend.vercel.app", place: { fr: "Cameroun", en: "Cameroon" } },
      { id: "13", title: "SOS AVC Medical Alert", image: "/images/sosavc-preview.jpeg", portrait: true, place: { fr: "Togo", en: "Togo" } },
      { id: "18", title: "Baromètre Santé", image: "/images/barometre-sante-preview.jpeg", portrait: true, place: { fr: "Bénin", en: "Benin" } },
      { id: "20", title: "FindMacy", image: "/images/findmacy-preview.png", portrait: true, place: { fr: "Guinée", en: "Guinea" } },
    ],
    processTitle: { fr: "Travailler à distance, simplement", en: "Remote work, made simple" },
    process: COMMON_PROCESS,
    stackTitle: { fr: "Technologies", en: "Tech stack" },
    stack: ["Flutter", "SvelteKit", "React", "TypeScript", "Laravel", "Supabase", "PostgreSQL", "Docker"],
    faqTitle: { fr: "Questions fréquentes", en: "Frequently asked questions" },
    faq: [
      {
        q: { fr: "Travaillez-vous avec des clients hors de Côte d'Ivoire ?", en: "Do you work with clients outside Ivory Coast?" },
        a: {
          fr: "Oui. J'ai livré des projets au Bénin, au Togo, en Guinée, au Cameroun et pour des clients de toute la zone UEMOA, entièrement à distance.",
          en: "Yes. I've delivered projects in Benin, Togo, Guinea, Cameroon and for clients across the WAEMU zone, fully remotely.",
        },
      },
      {
        q: { fr: "Comment se passe le suivi à distance ?", en: "How does remote collaboration work?" },
        a: {
          fr: "Points réguliers en visio ou par WhatsApp, et une version de test en ligne que vous consultez à tout moment pour suivre l'avancement.",
          en: "Regular video or WhatsApp check-ins, and a live staging version you can open anytime to follow progress.",
        },
      },
      {
        q: { fr: "Dans quelles langues travaillez-vous ?", en: "Which languages do you work in?" },
        a: {
          fr: "En français et en anglais, à l'écrit comme à l'oral.",
          en: "French and English, both written and spoken.",
        },
      },
    ],
    ctaTitle: { fr: "Votre projet, où que vous soyez", en: "Your project, wherever you are" },
    ctaText: {
      fr: "Dites-moi où vous êtes et ce que vous voulez construire. Je vous réponds rapidement avec une première proposition.",
      en: "Tell me where you are and what you want to build. I'll get back to you quickly with a first proposal.",
    },
    serviceType: { fr: "Développement web et mobile freelance", en: "Freelance web and mobile development" },
  },
};
