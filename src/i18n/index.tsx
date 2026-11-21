import { createContext, useContext, useEffect, type ReactNode } from "react";
import { ROUTES, type RouteKey } from "./routes";

export type Locale = "fr" | "en";
export type Localized<T = string> = { fr: T; en: T };

export const LANG_STORAGE_KEY = "gs-lang";

const LocaleContext = createContext<Locale>("fr");

export const LocaleProvider = ({ locale, children }: { locale: Locale; children: ReactNode }) => {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
};

export const pickLocale = <T,>(value: Localized<T>, locale: Locale): T => value[locale];

export const useLocale = () => {
  const locale = useContext(LocaleContext);
  return {
    locale,
    pick: <T,>(value: Localized<T>): T => value[locale],
    route: (key: RouteKey) => ROUTES[key][locale],
  };
};

export const rememberLocale = (locale: Locale) => {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, locale);
  } catch {
    return;
  }
};
