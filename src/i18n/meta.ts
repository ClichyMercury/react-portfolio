import type { Locale, Localized } from "./index";
import type { RouteKey } from "./routes";
import { SERVICES } from "@/content/services";

type Meta = { title: Localized; description: Localized };

const PAGES: Record<"home" | "cv", Meta> = {
  home: {
    title: {
      fr: "Gaël Sassan — Développeur web & mobile à Abidjan, Côte d'Ivoire",
      en: "Gaël Sassan — Web & Mobile Developer in Abidjan, Ivory Coast",
    },
    description: {
      fr: "Développeur freelance à Abidjan. 6+ ans à créer des sites web, des plateformes (React, SvelteKit) et des applications mobiles (Flutter) pour des banques, la santé et des startups en Côte d'Ivoire et en Afrique de l'Ouest. 90+ projets livrés.",
      en: "Freelance software developer in Abidjan. 6+ years building websites, web platforms (React, SvelteKit) and mobile apps (Flutter) for banks, health services and startups across Ivory Coast and West Africa. 90+ projects delivered.",
    },
  },
  cv: {
    title: {
      fr: "CV — Gaël Sassan, développeur web & mobile à Abidjan",
      en: "Resume — Gaël Sassan, Software Developer in Abidjan",
    },
    description: {
      fr: "CV de Gaël Sassan, développeur basé à Abidjan, Côte d'Ivoire : 6+ ans de Flutter, React et SvelteKit, produits web et mobiles pour la banque, la santé et les startups.",
      en: "Resume of Gaël Sassan, software developer based in Abidjan, Ivory Coast: 6+ years of Flutter, React and SvelteKit, web and mobile products for banking, health and startups.",
    },
  },
};

export const pageMeta = (key: RouteKey, locale: Locale) => {
  const meta = key === "home" || key === "cv" ? PAGES[key] : SERVICES[key];
  return { title: meta.title[locale], description: meta.description[locale] };
};
