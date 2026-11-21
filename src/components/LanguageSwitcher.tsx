import { Link, useLocation } from "react-router-dom";
import { useLocale, rememberLocale, type Locale } from "@/i18n";
import { counterpartPath } from "@/i18n/routes";

const LABELS: Record<Locale, { short: string; name: string }> = {
  fr: { short: "FR", name: "Français" },
  en: { short: "EN", name: "English" },
};

const LanguageSwitcher = ({ className = "" }: { className?: string }) => {
  const { locale } = useLocale();
  const { pathname, hash } = useLocation();

  return (
    <div className={`flex items-center font-mono text-[10px] tracking-[0.15em] ${className}`} role="group" aria-label={locale === "fr" ? "Langue" : "Language"}>
      {(["fr", "en"] as Locale[]).map((l, i) => {
        const active = l === locale;
        return (
          <span key={l} className="flex items-center">
            {i > 0 && <span className="mx-1.5" style={{ color: "var(--fg-faint)" }}>/</span>}
            {active ? (
              <span aria-current="true" style={{ color: "var(--accent)" }}>{LABELS[l].short}</span>
            ) : (
              <Link
                to={counterpartPath(pathname, l) + hash}
                hrefLang={l}
                lang={l}
                title={LABELS[l].name}
                onClick={() => rememberLocale(l)}
                className="transition-colors duration-300 hover:text-[var(--accent)]"
                style={{ color: "var(--fg-muted)" }}
              >
                {LABELS[l].short}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
