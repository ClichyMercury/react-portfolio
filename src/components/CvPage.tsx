import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Download, Mail, Github, Linkedin, Globe, MapPin } from "lucide-react";
import { PROFILE } from "./ProfessionalBio";
import { EXPERIENCES } from "./ExperienceSection";
import { SKILLS } from "./SkillsSection";
import { PROJECTS, PROJECT_COUNT } from "./ProjectsGrid";
import { BACKEND_NODES, FRAMEWORKS } from "./ServerRoom";

const SITE_URL = typeof window !== "undefined" ? window.location.origin : "";

const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

const domain = (url: string) => host(url).split("/")[0].replace(/^www\./, "");

const DETAILED_EXPERIENCES = 3;

const CvPage = () => {
  useEffect(() => {
    document.getElementById("loading-screen")?.remove();
    const previous = document.title;
    document.title = `${PROFILE.name} — CV`;
    return () => {
      document.title = previous;
    };
  }, []);

  const endpoints = BACKEND_NODES.reduce((s, n) => s + n.endpoints, 0);
  const languages = SKILLS.filter((s) => s.category === "languages").map((s) => s.name);
  const frameworks = SKILLS.filter((s) => s.category === "frameworks").map((s) => s.name).slice(0, 18);
  const tools = SKILLS.filter((s) => s.category === "tools").map((s) => s.name).slice(0, 12);
  const liveProjects = PROJECTS.filter((p) => p.featured && p.demoUrl).slice(0, 6);
  const generated = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="cv-page min-h-screen py-10 px-4 sm:px-6 print:p-0" style={{ background: "var(--bg)" }}>
      <div className="max-w-[210mm] mx-auto mb-6 flex items-center justify-between gap-3 print:hidden">
        <Link to="/" className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:text-[var(--accent)]" style={{ color: "var(--fg-muted)" }}>
          <ArrowLeft className="h-4 w-4" />gs.dev
        </Link>
        <span className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--fg-faint)" }}>
          resume // generated from live portfolio data
        </span>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 rounded font-mono text-[11px] uppercase tracking-[0.15em]"
          style={{ background: "var(--accent)", color: "var(--bg)" }}
        >
          <Download className="h-4 w-4" />download pdf
        </button>
      </div>

      <article className="cv-sheet max-w-[210mm] mx-auto bg-white text-[#14181F] shadow-2xl print:shadow-none px-8 sm:px-12 py-10 print:p-0 text-[12.5px] print:text-[11px] leading-relaxed">
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 mb-6 print:pb-3 print:mb-4" style={{ borderBottom: "2px solid #14181F" }}>
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-none">{PROFILE.name}</h1>
            <p className="mt-2 text-[15px] font-medium" style={{ color: "#0B7285" }}>{PROFILE.title} · {PROFILE.focus}</p>
          </div>
          <ul className="space-y-1 font-mono text-[10.5px] sm:text-right" style={{ color: "#3B4250" }}>
            <li className="flex sm:justify-end items-center gap-1.5"><MapPin className="h-3 w-3" />{PROFILE.base}</li>
            <li className="flex sm:justify-end items-center gap-1.5"><Mail className="h-3 w-3" /><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></li>
            <li className="flex sm:justify-end items-center gap-1.5"><Github className="h-3 w-3" /><a href={PROFILE.github}>{host(PROFILE.github)}</a></li>
            <li className="flex sm:justify-end items-center gap-1.5"><Linkedin className="h-3 w-3" /><a href={PROFILE.linkedin}>linkedin.com/in/gael-yad-eugene-sassan</a></li>
            <li className="flex sm:justify-end items-center gap-1.5"><Globe className="h-3 w-3" /><a href={SITE_URL}>{host(SITE_URL)}</a></li>
          </ul>
        </header>

        <section className="mb-6 print:mb-4">
          <p style={{ color: "#3B4250" }}>{PROFILE.bio}</p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-px rounded overflow-hidden" style={{ background: "#D9DEE5", border: "1px solid #D9DEE5" }}>
            {[
              { value: `${PROFILE.years}+`, label: "years of experience" },
              { value: `${PROJECT_COUNT}+`, label: "projects delivered" },
              { value: String(BACKEND_NODES.length), label: "backend APIs" },
              { value: `${endpoints}+`, label: "API endpoints" },
            ].map((k) => (
              <div key={k.label} className="bg-white px-3 py-2.5">
                <span className="block text-lg font-semibold leading-none">{k.value}</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: "#6B7280" }}>{k.label}</span>
              </div>
            ))}
          </div>
        </section>

        <CvHeading>Experience</CvHeading>
        <section className="mb-6 print:mb-4 space-y-3.5 print:space-y-2.5">
          {EXPERIENCES.map((e, i) => (
            <div key={e.id} className="cv-block">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-semibold text-[13.5px] print:text-[12px]">
                  {e.role} <span style={{ color: "#0B7285" }}>· {e.company}</span>
                </h3>
                <span className="font-mono text-[10.5px] print:text-[9.5px]" style={{ color: "#6B7280" }}>{e.period} · {e.location.split(",")[0]}</span>
              </div>
              <p style={{ color: "#3B4250" }}>{e.description}</p>
              {i < DETAILED_EXPERIENCES && (
                <ul className="mt-0.5 space-y-0.5">
                  {e.achievements.slice(0, 2).map((a) => (
                    <li key={a} className="flex gap-2" style={{ color: "#3B4250" }}>
                      <span style={{ color: "#0B7285" }}>▸</span>{a}
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-0.5 font-mono text-[10px] print:text-[9px]" style={{ color: "#6B7280" }}>{e.technologies.slice(0, 7).join(" · ")}</p>
            </div>
          ))}
        </section>

        <CvHeading>Skills</CvHeading>
        <section className="mb-6 print:mb-4 space-y-1.5">
          {[
            { label: "Languages", items: languages },
            { label: "Frameworks", items: frameworks },
            { label: "Tools & platforms", items: tools },
          ].map((row) => (
            <p key={row.label} className="cv-block">
              <span className="font-semibold">{row.label}: </span>
              <span style={{ color: "#3B4250" }}>{row.items.join(", ")}</span>
            </p>
          ))}
        </section>

        <CvHeading>Selected live projects</CvHeading>
        <section className="mb-6 print:mb-4 grid sm:grid-cols-2 print:grid-cols-2 gap-x-6 gap-y-2.5">
          {liveProjects.map((p) => (
            <div key={p.id} className="cv-block">
              <p className="font-semibold leading-snug">{p.title}</p>
              <p className="font-mono text-[10px]" style={{ color: "#6B7280" }}>
                {p.technologies.slice(0, 4).join(" · ")}
              </p>
              <a href={p.demoUrl} className="font-mono text-[10px]" style={{ color: "#0B7285" }}>{domain(p.demoUrl ?? "")}</a>
            </div>
          ))}
        </section>

        <CvHeading>Backend APIs · endpoints</CvHeading>
        <section className="mb-6 print:mb-4 grid sm:grid-cols-3 print:grid-cols-3 gap-x-6 gap-y-0.5">
          {BACKEND_NODES.map((n) => (
            <p key={n.id} className="cv-block flex items-baseline justify-between gap-2">
              <span className="font-medium truncate">{n.name.replace(/ API$/, "")}</span>
              <span className="font-mono text-[9.5px] whitespace-nowrap" style={{ color: "#6B7280" }}>
                {FRAMEWORKS[n.framework].label} · {n.approx ? "~" : ""}{n.endpoints}
              </span>
            </p>
          ))}
        </section>

        <footer className="pt-3 font-mono text-[9.5px] flex flex-wrap justify-between gap-2" style={{ borderTop: "1px solid #D9DEE5", color: "#9AA1AC" }}>
          <span>Generated from {host(SITE_URL)} live data · {generated} · full portfolio on {host(SITE_URL)}</span>
        </footer>
      </article>
    </div>
  );
};

const CvHeading = ({ children }: { children: string }) => (
  <h2 className="cv-block mb-3 flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: "#0B7285" }}>
    {children}
    <span className="flex-1 h-px" style={{ background: "#D9DEE5" }} />
  </h2>
);

export default CvPage;
