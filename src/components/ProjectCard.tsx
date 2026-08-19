import React from "react";
import { ArrowUpRight } from "lucide-react";
import { getTechIcon } from "@/lib/techIcons";
import { getCountry } from "@/lib/countries";
import TiltCard from "./fx/TiltCard";
import ProjectModal from "./ProjectModal";

interface Technology { name: string; color?: string; }

interface ProjectCardProps {
  title: string; description: string; imageUrl: string; technologies: Technology[];
  projectUrl?: string; githubUrl?: string; detailedDescription?: string;
  objectives?: string; results?: string; isPortrait?: boolean;
  countries?: string[];
  category?: string;
  index?: number;
}

const TechChip = ({ name }: { name: string }) => {
  const icon = getTechIcon(name);
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded font-mono text-[9px] px-2 py-1"
      style={{ background: "var(--bg-elevated)", color: "var(--fg-muted)", border: "1px solid var(--border-subtle)" }}
    >
      {icon && <img src={icon} alt="" className="w-3 h-3" />}
      {name}
    </span>
  );
};

const ProjectCard = ({
  title = "", description = "", imageUrl = "", technologies = [],
  projectUrl = "", githubUrl = "",
  objectives = "", results = "", isPortrait = true,
  countries = [], category = "", index = 0,
}: ProjectCardProps) => {
  const [open, setOpen] = React.useState(false);
  const resolvedCountries = countries
    .map((code) => getCountry(code))
    .filter((c): c is NonNullable<ReturnType<typeof getCountry>> => Boolean(c));

  return (
    <>
      <TiltCard
        className="group relative overflow-hidden rounded-xl panel tentacle-glow h-full flex flex-col"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-elevated)" }} data-cursor="view">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--fg-faint)" }}>
            proj_{String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
            {category || "app"}
          </span>
        </div>

        <div className={`relative overflow-hidden ${isPortrait ? "h-64" : "h-44"}`} data-cursor="view">
          <img src={imageUrl} alt={title}
            className={`w-full h-full transition-all duration-700 group-hover:scale-105 ${isPortrait ? "object-contain" : "object-cover"}`}
            style={{ background: "var(--bg)" }}
          />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center" style={{ background: "rgba(5,6,10,0.65)" }}>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
              <span>open_case</span><ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="p-4 flex-grow flex flex-col" data-cursor="view">
          <h3 className="text-sm font-medium mb-2">{title}</h3>
          {resolvedCountries.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {resolvedCountries.map((c) => (
                <span
                  key={c.code}
                  className="inline-flex items-center gap-1 font-mono text-[9px] px-1.5 py-0.5 rounded"
                  style={{ background: "var(--bg-elevated)", color: "var(--fg-muted)", border: "1px solid var(--border-subtle)" }}
                >
                  <span className="text-xs leading-none">{c.flag}</span>
                  {c.name}
                </span>
              ))}
            </div>
          )}
          <p className="text-xs leading-relaxed line-clamp-2 mb-4 flex-grow" style={{ color: "var(--fg-muted)" }}>{description}</p>
          <div className="flex flex-wrap gap-1.5">
            {technologies.slice(0, 3).map((t, i) => (
              <TechChip key={i} name={t.name} />
            ))}
            {technologies.length > 3 && (
              <span className="font-mono text-[9px] px-2 py-1" style={{ color: "var(--fg-faint)" }}>+{technologies.length - 3}</span>
            )}
          </div>
        </div>
      </TiltCard>

      <ProjectModal
        project={open ? {
          title,
          description,
          imageUrl,
          technologies: technologies.map((t) => t.name),
          category,
          objectives,
          results,
          demoUrl: projectUrl,
          codeUrl: githubUrl,
          isPortrait,
          countries,
        } : null}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default ProjectCard;
