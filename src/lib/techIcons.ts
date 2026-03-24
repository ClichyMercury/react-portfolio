const D = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

// Simple SVG data URIs for concepts without devicon
const svg = (path: string, color = "%23888") =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${decodeURIComponent(color)}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`)}`;

const pay = svg('<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>');
const shield = svg('<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>');
const api = svg('<path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9m-9 9a9 9 0 0 1 9-9"/>');
const db = svg('<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>');
const chart = svg('<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>');
const mobile = svg('<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>');
const cloud = svg('<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>');
const lock = svg('<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>');
const zap = svg('<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>');
const heart = svg('<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>');
const map = svg('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>');
const brain = svg('<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M12 5v13"/>');
const users = svg('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>');
const settings = svg('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>');
const video = svg('<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>');
const truck = svg('<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>');
const store = svg('<path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"/>');
const bell = svg('<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>');
const layout = svg('<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>');
const mic = svg('<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/>');
const camera = svg('<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>');
const search = svg('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>');
const test = svg('<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/>');
const wifi = svg('<path d="M5 13a10 10 0 0 1 14 0"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 20 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>');
const qr = svg('<rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/>');

const techIcons: Record<string, string> = {
  // Languages
  "dart": `${D}/dart/dart-original.svg`,
  "java": `${D}/java/java-original.svg`,
  "javascript": `${D}/javascript/javascript-original.svg`,
  "typescript": `${D}/typescript/typescript-original.svg`,
  "python": `${D}/python/python-original.svg`,
  "kotlin": `${D}/kotlin/kotlin-original.svg`,
  "swift": `${D}/swift/swift-original.svg`,
  "rust": `${D}/rust/rust-original.svg`,
  "php": `${D}/php/php-original.svg`,
  "html5": `${D}/html5/html5-original.svg`,
  "html": `${D}/html5/html5-original.svg`,
  "css3": `${D}/css3/css3-original.svg`,
  "css": `${D}/css3/css3-original.svg`,
  "html/css": `${D}/html5/html5-original.svg`,

  // Frameworks
  "flutter": `${D}/flutter/flutter-original.svg`,
  "flutter bloc": `${D}/flutter/flutter-original.svg`,
  "provider": `${D}/flutter/flutter-original.svg`,
  "get_it": `${D}/flutter/flutter-original.svg`,
  "react": `${D}/react/react-original.svg`,
  "react native": `${D}/react/react-original.svg`,
  "svelte": `${D}/svelte/svelte-original.svg`,
  "sveltekit": `${D}/svelte/svelte-original.svg`,
  "svelte.js": `${D}/svelte/svelte-original.svg`,
  "next.js": `${D}/nextjs/nextjs-original.svg`,
  "vue.js": `${D}/vuejs/vuejs-original.svg`,
  "laravel": `${D}/laravel/laravel-original.svg`,
  "flask": `${D}/flask/flask-original.svg`,
  "node.js": `${D}/nodejs/nodejs-original.svg`,
  "express": `${D}/express/express-original.svg`,
  "django": `${D}/django/django-plain.svg`,
  "django rest": `${D}/django/django-plain.svg`,
  "spring boot": `${D}/spring/spring-original.svg`,
  "jetpack compose": `${D}/jetpackcompose/jetpackcompose-original.svg`,
  "material design": `${D}/materialui/materialui-original.svg`,
  "ktor": `${D}/kotlin/kotlin-original.svg`,
  "recharts": `${D}/react/react-original.svg`,

  // Databases & Backend
  "firebase": `${D}/firebase/firebase-original.svg`,
  "firebase auth": `${D}/firebase/firebase-original.svg`,
  "firebase hosting": `${D}/firebase/firebase-original.svg`,
  "firebase messaging": `${D}/firebase/firebase-original.svg`,
  "supabase": `${D}/supabase/supabase-original.svg`,
  "postgresql": `${D}/postgresql/postgresql-original.svg`,
  "mysql": `${D}/mysql/mysql-original.svg`,
  "mongodb": `${D}/mongodb/mongodb-original.svg`,
  "redis": `${D}/redis/redis-original.svg`,
  "json server": db,
  "sqlalchemy": `${D}/sqlalchemy/sqlalchemy-original.svg`,
  "hive": db,

  // Tools & DevOps
  "git": `${D}/git/git-original.svg`,
  "github": `${D}/github/github-original.svg`,
  "gitlab": `${D}/gitlab/gitlab-original.svg`,
  "docker": `${D}/docker/docker-original.svg`,
  "linux": `${D}/linux/linux-original.svg`,
  "android studio": `${D}/androidstudio/androidstudio-original.svg`,
  "android": `${D}/android/android-original.svg`,
  "android development": `${D}/android/android-original.svg`,
  "vscode": `${D}/vscode/vscode-original.svg`,
  "figma": `${D}/figma/figma-original.svg`,
  "tailwindcss": `${D}/tailwindcss/tailwindcss-original.svg`,
  "tailwind css": `${D}/tailwindcss/tailwindcss-original.svg`,
  "trello": `${D}/trello/trello-original.svg`,
  "framer motion": `${D}/framermotion/framermotion-original.svg`,
  "oauth2": lock,
  "jwt auth": lock,

  // Cloud & Hosting
  "aws": `${D}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
  "aws iot core": `${D}/amazonwebservices/amazonwebservices-original-wordmark.svg`,
  "google maps": `${D}/google/google-original.svg`,
  "google maps api": `${D}/google/google-original.svg`,
  "google play": `${D}/google/google-original.svg`,
  "google play console": `${D}/google/google-original.svg`,
  "google analytics": `${D}/google/google-original.svg`,
  "vercel": `${D}/vercel/vercel-original.svg`,
  "cloud storage": cloud,

  // Misc devicon
  "graphql": `${D}/graphql/graphql-plain.svg`,
  "openstreetmap": `${D}/openstreetmap/openstreetmap-original.svg`,

  // Payments & Finance
  "mobile payments": pay,
  "payment integration": pay,
  "payment apis": pay,
  "mobile money": pay,
  "mobile money integration": pay,
  "wave api": pay,
  "jeko pay api": pay,
  "contactless payments": pay,
  "flutterwave": pay,
  "banking apis": pay,
  "financial services": pay,
  "financial analytics": pay,
  "financial integration": pay,
  "financial tracking": pay,
  "micro-finance": pay,
  "nsia integration": pay,
  "digital wallet": pay,
  "dynamic pricing": pay,
  "telecom services": pay,

  // Security
  "security": shield,
  "encryption": shield,
  "kyc": shield,
  "biometric auth": shield,
  "biometric authentication": shield,
  "secure authentication": shield,
  "secure storage": shield,
  "secure video calls": video,
  "gdpr compliance": shield,
  "privacy management": shield,
  "government standards": shield,

  // APIs & Architecture
  "rest api": api,
  "rest apis": api,
  "api rest": api,
  "apis": api,
  "multi-vendor api": api,
  "telemedicine apis": api,
  "emergency apis": api,
  "tmdb api": api,
  "youtube api": api,
  "live data api": api,
  "sports odds api": api,
  "book api": api,
  "deep linking": api,
  "state management": settings,
  "mvvm": settings,
  "stateflow": settings,

  // Data & Analytics
  "analytics": chart,
  "data analytics": chart,
  "real-time analytics": chart,
  "health analytics": chart,
  "sales analytics": chart,
  "order analytics": chart,
  "visit analytics": chart,
  "dashboard analytics": chart,
  "performance analytics": chart,
  "carbon analytics": chart,
  "business intelligence": chart,
  "predictive analytics": chart,
  "predictive forecasting": chart,
  "demand forecasting": chart,
  "charts": chart,
  "scoring algorithms": chart,
  "recommendation engine": brain,

  // Real-time & Communication
  "real-time monitoring": zap,
  "real-time tracking": zap,
  "real-time gps": map,
  "real-time communication": zap,
  "real-time database": db,
  "real-time updates": zap,
  "real-time notifications": bell,
  "real-time systems": zap,
  "real-time chat": zap,
  "push notifications": bell,
  "customer support integration": users,
  "customer feedback": users,

  // Mobile & UI
  "responsive ui": mobile,
  "ui responsive": mobile,
  "responsive design": layout,
  "grid layout": layout,
  "dark mode ui": layout,
  "animations": zap,
  "offline mode": mobile,
  "app store connect": mobile,

  // GPS & Maps
  "gps": map,
  "gps tracking": map,
  "geolocation": map,
  "geolocator": map,
  "route optimization": map,
  "smart logistics": truck,
  "cluster markers": map,

  // Healthcare
  "healthcare": heart,
  "healthcare integration": heart,
  "appointment management": heart,
  "patient records": heart,
  "one health integration": heart,
  "ai diagnostics": brain,
  "ai drug analysis": brain,
  "ai/ml": brain,
  "machine learning": brain,

  // E-commerce & Business
  "e-commerce": store,
  "e-commerce apis": store,
  "marketplace": store,
  "social features": users,
  "merchant integration": store,
  "inventory management": store,
  "inventory automation": store,
  "menu management": store,
  "restaurant pos": store,
  "kitchen display": layout,
  "crm integration": users,
  "client tracking": users,
  "mobile commerce": store,

  // Management & Methodology
  "agile": settings,
  "agile methodologies": settings,
  "project management": settings,
  "team leadership": users,
  "sales strategy": chart,
  "event management": settings,
  "event production": video,
  "badge system": shield,

  // IoT
  "iot": wifi,
  "mqtt": wifi,
  "energy management": zap,

  // Content & Media
  "audio recording": mic,
  "content creation": camera,
  "video player": video,
  "timeline ui": layout,
  "i18n (fr/en)": api,
  "i18n (fr)": api,
  "influencer marketing": users,
  "artist development": mic,
  "digital strategy": chart,
  "booking management": settings,

  // Blockchain
  "blockchain": `${D}/polygon/polygon-original.svg`,

  // QR
  "qr technology": qr,
  "qr code system": qr,

  // Misc concepts
  "paraglide": api,
  "teaching": users,
  "devops": `${D}/docker/docker-original.svg`,
  "unit testing": test,
  "amplitude": chart,
  "posthog": chart,
  "unleash": settings,
  "directus": db,
  "multi-tenant architecture": settings,
  "role-based access": lock,
  "multi-role auth": lock,
  "review system": users,
  "community features": users,
  "gamification": zap,
  "health tracking": heart,
  "risk assessment": shield,
  "transaction management": pay,
  "admin dashboard": layout,
};

export function getTechIcon(name: string): string | undefined {
  return techIcons[name.toLowerCase()];
}
