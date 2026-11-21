import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const SITE = "https://gsdot.dev";
const root = resolve(import.meta.dirname, "..");
const outDir = resolve(root, "build");
const ssrDir = resolve(root, "build-ssr");

const routes = [
  {
    path: "/",
    file: "index.html",
    title: "Gaël Sassan — Web & Mobile Developer in Abidjan, Côte d'Ivoire",
    description:
      "Freelance software developer in Abidjan. 6+ years building websites, web platforms (React, SvelteKit) and mobile apps (Flutter) for banks, health services and startups across Côte d'Ivoire and West Africa. 90+ projects deployed.",
  },
  {
    path: "/cv",
    file: "cv.html",
    title: "CV — Gaël Sassan, Software Developer in Abidjan",
    description:
      "Resume of Gaël Sassan, software developer based in Abidjan, Côte d'Ivoire: 6+ years of Flutter, React and SvelteKit, mobile and web products for banks, health and startups.",
  },
];

const escapeAttr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const { render } = await import(pathToFileURL(resolve(ssrDir, "entry-server.js")).href);
const template = readFileSync(resolve(outDir, "index.html"), "utf8");

for (const route of routes) {
  const url = SITE + route.path;
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(route.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${escapeAttr(route.description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escapeAttr(route.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${escapeAttr(route.description)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${escapeAttr(route.title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${escapeAttr(route.description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace('<div id="root"></div>', `<div id="root">${render(route.path)}</div>`);

  if (!html.includes(`<link rel="canonical" href="${url}"`)) throw new Error(`canonical missing for ${route.path}`);
  writeFileSync(resolve(outDir, route.file), html);
  console.log(`prerendered ${route.path} -> build/${route.file} (${Math.round(html.length / 1024)} kB)`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${SITE}${r.path}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`;
writeFileSync(resolve(outDir, "sitemap.xml"), sitemap);
console.log("wrote build/sitemap.xml");

rmSync(ssrDir, { recursive: true, force: true });
