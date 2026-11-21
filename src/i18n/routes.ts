import type { Locale } from "./index";

export type RouteKey = "home" | "cv" | "web" | "mobile" | "freelance";

export const ROUTES: Record<RouteKey, Record<Locale, string>> = {
  home: { fr: "/", en: "/en" },
  cv: { fr: "/cv", en: "/en/cv" },
  web: { fr: "/creation-site-web-abidjan", en: "/en/web-development-abidjan" },
  mobile: { fr: "/application-mobile-cote-d-ivoire", en: "/en/mobile-app-development-ivory-coast" },
  freelance: { fr: "/developpeur-freelance-afrique-de-l-ouest", en: "/en/freelance-developer-west-africa" },
};

export const SERVICE_KEYS: RouteKey[] = ["web", "mobile", "freelance"];

export const normalizePath = (pathname: string) => pathname.replace(/\/+$/, "") || "/";

export const localeFromPath = (pathname: string): Locale => {
  const p = normalizePath(pathname);
  return p === "/en" || p.startsWith("/en/") ? "en" : "fr";
};

export const routeKeyFromPath = (pathname: string): RouteKey | null => {
  const p = normalizePath(pathname);
  for (const key of Object.keys(ROUTES) as RouteKey[]) {
    if (ROUTES[key].fr === p || ROUTES[key].en === p) return key;
  }
  return null;
};

export const counterpartPath = (pathname: string, target: Locale) => {
  const key = routeKeyFromPath(pathname);
  return key ? ROUTES[key][target] : ROUTES.home[target];
};
