import { readFileSync, writeFileSync, rmSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { pathToFileURL } from "node:url";

const SITE = "https://gsdot.dev";
const LOCALES = ["fr", "en"];
const OG_LOCALE = { fr: "fr_FR", en: "en_US" };
const root = resolve(import.meta.dirname, "..");
const outDir = resolve(root, "build");
const ssrDir = resolve(root, "build-ssr");

const FR_TIMEZONES = [
  "Africa/Abidjan", "Africa/Dakar", "Africa/Bamako", "Africa/Ouagadougou", "Africa/Niamey", "Africa/Lome",
  "Africa/Porto-Novo", "Africa/Conakry", "Africa/Douala", "Africa/Libreville", "Africa/Brazzaville",
  "Africa/Kinshasa", "Africa/Lubumbashi", "Africa/Bangui", "Africa/Ndjamena", "Africa/Nouakchott",
  "Africa/Kigali", "Africa/Bujumbura", "Africa/Djibouti", "Africa/Casablanca", "Africa/Algiers", "Africa/Tunis",
  "Indian/Antananarivo", "Indian/Comoro", "Indian/Reunion", "Indian/Mayotte", "Europe/Paris", "Europe/Brussels",
  "Europe/Luxembourg", "Europe/Monaco", "America/Montreal", "America/Port-au-Prince", "America/Martinique",
  "America/Guadeloupe", "America/Cayenne", "Pacific/Noumea", "Pacific/Tahiti",
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const { render, ROUTES, pageMeta, SERVICES } = await import(pathToFileURL(resolve(ssrDir, "entry-server.js")).href);
const template = readFileSync(resolve(outDir, "index.html"), "utf8");
const keys = Object.keys(ROUTES);
const url = (key, locale) => SITE + (ROUTES[key][locale] === "/" ? "/" : ROUTES[key][locale]);
const fileFor = (path) => (path === "/" ? "index.html" : path.slice(1) + ".html");

const pairs = keys.map((k) => [ROUTES[k].fr, ROUTES[k].en]);
const detectScript = `<script>(function(){try{var K="gs-lang";if(localStorage.getItem(K))return;if(/bot|crawl|spider|slurp|preview|headless|lighthouse|facebookexternalhit|whatsapp|linkedin|telegram|discord|embed|validator/i.test(navigator.userAgent||""))return;var L=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||""]).map(function(x){return String(x).toLowerCase()});var tz="";try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||""}catch(e){}var want=L.some(function(x){return x.indexOf("fr")===0})||${JSON.stringify(FR_TIMEZONES)}.indexOf(tz)>-1?"fr":"en";localStorage.setItem(K,want);var p=location.pathname.replace(/\\/+$/,"")||"/";var P=${JSON.stringify(pairs)};var from=want==="fr"?1:0,to=want==="fr"?0:1;for(var i=0;i<P.length;i++){if(P[i][from]===p&&P[i][from]!==P[i][to]){location.replace(P[i][to]+location.search+location.hash);return}}}catch(e){}})();</script>`;

const person = {
  "@type": "Person",
  "@id": `${SITE}/#person`,
  name: "Gaël Sassan",
  url: `${SITE}/`,
  image: `${SITE}/images/og-gsdot.jpg`,
  jobTitle: "Software Developer",
  address: { "@type": "PostalAddress", addressLocality: "Abidjan", addressCountry: "CI" },
  knowsLanguage: ["fr", "en"],
  knowsAbout: ["Flutter", "React", "SvelteKit", "TypeScript", "Laravel", "Mobile app development", "Web development", "Cloud deployment"],
  sameAs: ["https://www.linkedin.com/in/gael-yad-eugene-sassan-17a69b1b6/", "https://github.com/ClichyMercury"],
};

const AREAS = {
  fr: ["Côte d'Ivoire", "Sénégal", "Bénin", "Togo", "Burkina Faso", "Mali", "Guinée", "Niger", "Cameroun", "Gabon"],
  en: ["Ivory Coast", "Senegal", "Benin", "Togo", "Burkina Faso", "Mali", "Guinea", "Niger", "Cameroon", "Gabon"],
};

const business = (locale) => ({
  "@type": "ProfessionalService",
  "@id": `${SITE}/#service`,
  name: locale === "fr" ? "gsdot.dev — Gaël Sassan, développeur web & mobile" : "gsdot.dev — Gaël Sassan, web & mobile developer",
  url: `${SITE}/`,
  image: `${SITE}/images/og-gsdot.jpg`,
  founder: { "@id": `${SITE}/#person` },
  address: { "@type": "PostalAddress", addressLocality: "Abidjan", addressCountry: "CI" },
  geo: { "@type": "GeoCoordinates", latitude: 5.36, longitude: -4.01 },
  areaServed: AREAS[locale].map((name) => ({ "@type": "Country", name })),
  knowsLanguage: ["fr", "en"],
});

const graphFor = (key, locale) => {
  const meta = pageMeta(key, locale);
  const graph = [
    person,
    business(locale),
    { "@type": "WebSite", "@id": `${SITE}/#website`, url: `${SITE}/`, name: "gsdot.dev", publisher: { "@id": `${SITE}/#person` }, inLanguage: ["fr", "en"] },
    { "@type": "WebPage", "@id": `${url(key, locale)}#webpage`, url: url(key, locale), name: meta.title, description: meta.description, inLanguage: locale, isPartOf: { "@id": `${SITE}/#website` } },
  ];
  const s = SERVICES[key];
  if (s) {
    graph.push(
      { "@type": "Service", name: s.serviceType[locale], serviceType: s.serviceType[locale], description: meta.description, provider: { "@id": `${SITE}/#person` }, areaServed: AREAS[locale].map((name) => ({ "@type": "Country", name })), url: url(key, locale) },
      { "@type": "FAQPage", mainEntity: s.faq.map((f) => ({ "@type": "Question", name: f.q[locale], acceptedAnswer: { "@type": "Answer", text: f.a[locale] } })) },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: locale === "fr" ? "Accueil" : "Home", item: url("home", locale) },
          { "@type": "ListItem", position: 2, name: s.serviceType[locale], item: url(key, locale) },
        ],
      }
    );
  }
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
};

const setMeta = (html, attr, name, value) => {
  const re = new RegExp(`(<meta ${attr}="${name}" content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`meta ${name} missing in template`);
  return html.replace(re, `$1${esc(value)}$2`);
};

for (const key of keys) {
  for (const locale of LOCALES) {
    const meta = pageMeta(key, locale);
    const pageUrl = url(key, locale);
    const other = locale === "fr" ? "en" : "fr";
    const alternates = [
      `<link rel="alternate" hreflang="fr" href="${url(key, "fr")}" />`,
      `<link rel="alternate" hreflang="en" href="${url(key, "en")}" />`,
      `<link rel="alternate" hreflang="x-default" href="${url(key, "fr")}" />`,
      `<meta property="og:locale:alternate" content="${OG_LOCALE[other]}" />`,
    ].join("\n    ");

    let html = template
      .replace(/<html lang="[^"]*">/, `<html lang="${locale}">`)
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(meta.title)}</title>`)
      .replace(/(<link rel="canonical" href=")[^"]*(" \/>)/, `$1${pageUrl}$2\n    ${alternates}`)
      .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${graphFor(key, locale).replace(/</g, "\\u003c")}</script>`)
      .replace("<head>", `<head>\n    ${detectScript}`)
      .replace('<div id="root"></div>', `<div id="root">${render(key, locale)}</div>`);
    html = setMeta(html, "name", "description", meta.description);
    html = setMeta(html, "property", "og:title", meta.title);
    html = setMeta(html, "property", "og:description", meta.description);
    html = setMeta(html, "property", "og:url", pageUrl);
    html = setMeta(html, "property", "og:locale", OG_LOCALE[locale]);
    html = setMeta(html, "name", "twitter:title", meta.title);
    html = setMeta(html, "name", "twitter:description", meta.description);

    if (!html.includes(`<link rel="canonical" href="${pageUrl}"`)) throw new Error(`canonical missing for ${pageUrl}`);
    const file = resolve(outDir, fileFor(ROUTES[key][locale]));
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    console.log(`prerendered ${ROUTES[key][locale]} -> build/${fileFor(ROUTES[key][locale])} (${Math.round(html.length / 1024)} kB)`);
  }
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${keys
  .flatMap((k) =>
    LOCALES.map(
      (l) => `  <url>
    <loc>${url(k, l)}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="fr" href="${url(k, "fr")}" />
    <xhtml:link rel="alternate" hreflang="en" href="${url(k, "en")}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${url(k, "fr")}" />
  </url>`
    )
  )
  .join("\n")}
</urlset>
`;
writeFileSync(resolve(outDir, "sitemap.xml"), sitemap);
console.log("wrote build/sitemap.xml");

rmSync(ssrDir, { recursive: true, force: true });
