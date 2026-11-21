import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Mail, Linkedin } from "lucide-react";
import { useLocale } from "@/i18n";
import { SERVICE_KEYS } from "@/i18n/routes";
import { SERVICES, type ServiceKey } from "@/content/services";
import { projectTitle } from "@/data/projectsI18n";
import LanguageSwitcher from "./LanguageSwitcher";

const EMAIL = "gaelelscientifico@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/gael-yad-eugene-sassan-17a69b1b6/";

const NAV_LABELS: Record<ServiceKey, { fr: string; en: string }> = {
  web: { fr: "Site web", en: "Websites" },
  mobile: { fr: "Application mobile", en: "Mobile apps" },
  freelance: { fr: "Freelance Afrique de l'Ouest", en: "Freelance West Africa" },
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: "var(--accent)" }}>
    {children}
  </p>
);

const ServicePage = ({ service }: { service: ServiceKey }) => {
  const { locale, pick, route } = useLocale();
  const s = SERVICES[service];

  useEffect(() => {
    document.getElementById("loading-screen")?.remove();
    window.scrollTo(0, 0);
  }, [service]);

  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(pick(s.serviceType))}`;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--fg)" }}>
      <header className="sticky top-0 z-50 backdrop-blur-xl" style={{ background: "rgba(5,6,10,0.85)", borderBottom: "1px solid var(--border-subtle)" }}>
        <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
          <Link to={route("home")} className="flex items-center gap-2.5">
            <img src="/images/GS-removebg-preview.png" alt="Gaël Sassan" className="h-7 w-7 object-contain logo-themed" />
            <span className="font-mono text-[11px] tracking-[0.15em]" style={{ color: "var(--fg-muted)" }}>
              gsdot<span style={{ color: "var(--accent)" }}>.</span>dev
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.15em]" aria-label={pick({ fr: "Services", en: "Services" })}>
            {SERVICE_KEYS.map((k) => (
              <Link
                key={k}
                to={route(k)}
                aria-current={k === service ? "page" : undefined}
                className="transition-colors duration-300 hover:text-[var(--accent)]"
                style={{ color: k === service ? "var(--accent)" : "var(--fg-muted)" }}
              >
                {pick(NAV_LABELS[k as ServiceKey])}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>
      </header>

      <main>
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-14 md:pt-24">
          <nav aria-label={pick({ fr: "Fil d'Ariane", en: "Breadcrumb" })} className="mb-10 font-mono text-[11px] tracking-[0.1em]" style={{ color: "var(--fg-faint)" }}>
            <Link to={route("home")} className="inline-flex items-center gap-1.5 hover:text-[var(--accent)]">
              <ArrowLeft className="h-3 w-3" />
              {pick({ fr: "Accueil", en: "Home" })}
            </Link>
            <span className="mx-2">/</span>
            <span style={{ color: "var(--fg-muted)" }}>{pick(s.serviceType)}</span>
          </nav>
          <Eyebrow>{pick(s.eyebrow)}</Eyebrow>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight max-w-4xl">{pick(s.h1)}</h1>
          <div className="mt-8 max-w-3xl space-y-4 text-base md:text-lg leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            {pick(s.intro).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href={mailto} className="inline-flex items-center gap-2 px-6 py-3.5 rounded font-mono text-xs uppercase tracking-[0.15em]" style={{ background: "var(--accent)", color: "var(--bg)" }}>
              <Mail className="h-4 w-4" />
              {pick({ fr: "Demander un devis", en: "Request a quote" })}
            </a>
            <Link to={`${route("home")}#projects`} className="inline-flex items-center gap-2 px-6 py-3.5 rounded font-mono text-xs uppercase tracking-[0.15em]" style={{ border: "1px solid var(--border-subtle)", color: "var(--fg)" }}>
              {pick({ fr: "Voir les 90+ projets", en: "See all 90+ projects" })}
            </Link>
          </div>
          <dl className="mt-14 grid grid-cols-3 max-w-xl gap-6">
            {[
              { v: "6+", l: { fr: "ans d'expérience", en: "years of experience" } },
              { v: "90+", l: { fr: "projets livrés", en: "projects delivered" } },
              { v: "10+", l: { fr: "pays servis", en: "countries served" } },
            ].map((x) => (
              <div key={x.v}>
                <dt className="sr-only">{pick(x.l)}</dt>
                <dd>
                  <span className="block text-3xl font-semibold" style={{ color: "var(--fg)" }}>{x.v}</span>
                  <span className="block mt-1 font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--fg-faint)" }}>{pick(x.l)}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-14" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <h2 className="text-2xl md:text-3xl font-semibold">{pick(s.offersTitle)}</h2>
          <div className="mt-8 grid sm:grid-cols-2 gap-5">
            {s.offers.map((o) => (
              <article key={o.title.en} className="p-6 rounded" style={{ border: "1px solid var(--border-subtle)", background: "rgba(255,255,255,0.015)" }}>
                <h3 className="text-lg font-semibold">{pick(o.title)}</h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{pick(o.text)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-14" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <h2 className="text-2xl md:text-3xl font-semibold">{pick(s.casesTitle)}</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {s.cases.map((c) => {
              const title = projectTitle(c.id, locale, c.title);
              const body = (
                <>
                  <div className="aspect-[16/10] overflow-hidden rounded-t" style={{ background: "#0A0C12" }}>
                    <img src={c.image} alt={title} loading="lazy" className={`w-full h-full ${c.portrait ? "object-contain" : "object-cover object-top"} transition-transform duration-500 group-hover:scale-[1.03]`} />
                  </div>
                  <div className="p-4 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold leading-snug">{title}</h3>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: "var(--fg-faint)" }}>{pick(c.place)}</p>
                    </div>
                    {c.url && <ArrowUpRight className="h-4 w-4 flex-shrink-0" style={{ color: "var(--accent)" }} />}
                  </div>
                </>
              );
              const cls = "group block rounded overflow-hidden";
              const style = { border: "1px solid var(--border-subtle)" };
              return c.url ? (
                <a key={c.id} href={c.url} target="_blank" rel="noopener noreferrer" className={cls} style={style}>{body}</a>
              ) : (
                <div key={c.id} className={cls} style={style}>{body}</div>
              );
            })}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-14" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <h2 className="text-2xl md:text-3xl font-semibold">{pick(s.processTitle)}</h2>
          <ol className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {s.process.map((p, i) => (
              <li key={p.title.en} className="p-6 rounded" style={{ border: "1px solid var(--border-subtle)" }}>
                <span className="font-mono text-[11px]" style={{ color: "var(--accent)" }}>0{i + 1}</span>
                <h3 className="mt-2 text-base font-semibold">{pick(p.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{pick(p.text)}</p>
              </li>
            ))}
          </ol>
          <h2 className="mt-14 text-xl font-semibold">{pick(s.stackTitle)}</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {s.stack.map((t) => (
              <li key={t} className="px-3 py-1.5 rounded font-mono text-[11px]" style={{ border: "1px solid var(--border-subtle)", color: "var(--fg-muted)" }}>{t}</li>
            ))}
          </ul>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-14" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <h2 className="text-2xl md:text-3xl font-semibold">{pick(s.faqTitle)}</h2>
          <div className="mt-8 max-w-3xl divide-y" style={{ borderColor: "var(--border-subtle)" }}>
            {s.faq.map((f) => (
              <details key={f.q.en} className="group py-5" style={{ borderColor: "var(--border-subtle)" }}>
                <summary className="cursor-pointer list-none flex justify-between gap-4 font-semibold">
                  {pick(f.q)}
                  <span className="font-mono transition-transform group-open:rotate-45" style={{ color: "var(--accent)" }}>+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{pick(f.a)}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <div className="p-8 md:p-12 rounded" style={{ border: "1px solid var(--accent)", background: "rgba(0,229,255,0.04)" }}>
            <h2 className="text-2xl md:text-4xl font-semibold">{pick(s.ctaTitle)}</h2>
            <p className="mt-4 max-w-2xl" style={{ color: "var(--fg-muted)" }}>{pick(s.ctaText)}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={mailto} className="inline-flex items-center gap-2 px-6 py-3.5 rounded font-mono text-xs uppercase tracking-[0.15em]" style={{ background: "var(--accent)", color: "var(--bg)" }}>
                <Mail className="h-4 w-4" />
                {EMAIL}
              </a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 rounded font-mono text-xs uppercase tracking-[0.15em]" style={{ border: "1px solid var(--border-subtle)", color: "var(--fg)" }}>
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto px-6 py-10 flex flex-wrap justify-between gap-6 font-mono text-[11px]" style={{ borderTop: "1px solid var(--border-subtle)", color: "var(--fg-faint)" }}>
        <span>© {new Date().getFullYear()} Gaël Sassan · {pick({ fr: "Abidjan, Côte d'Ivoire", en: "Abidjan, Ivory Coast" })}</span>
        <nav className="flex flex-wrap gap-5" aria-label={pick({ fr: "Pages", en: "Pages" })}>
          <Link to={route("home")} className="hover:text-[var(--accent)]">Portfolio</Link>
          <Link to={route("cv")} className="hover:text-[var(--accent)]">CV</Link>
          {SERVICE_KEYS.filter((k) => k !== service).map((k) => (
            <Link key={k} to={route(k)} className="hover:text-[var(--accent)]">{pick(NAV_LABELS[k as ServiceKey])}</Link>
          ))}
        </nav>
      </footer>
    </div>
  );
};

export default ServicePage;
