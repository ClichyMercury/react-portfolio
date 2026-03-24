import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { getTechIcon } from "@/lib/techIcons";

interface Technology { name: string; color?: string; }

interface ProjectCardProps {
  title: string; description: string; imageUrl: string; technologies: Technology[];
  projectUrl?: string; githubUrl?: string; detailedDescription?: string;
  objectives?: string; results?: string; isPortrait?: boolean;
}

const TechChip = ({ name, size = "sm" }: { name: string; size?: "sm" | "md" }) => {
  const icon = getTechIcon(name);
  const isSmall = size === "sm";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${isSmall ? "text-[10px] px-2.5 py-1" : "text-xs px-3 py-1.5"}`}
      style={{ background: "var(--bg-elevated)", color: "var(--fg-muted)", border: "1px solid var(--border-subtle)" }}
    >
      {icon && <img src={icon} alt="" className={isSmall ? "w-3.5 h-3.5" : "w-4 h-4"} />}
      {name}
    </span>
  );
};

const ProjectCard = ({
  title = "", description = "", imageUrl = "", technologies = [],
  projectUrl = "", githubUrl = "", detailedDescription = "",
  objectives = "", results = "", isPortrait = true,
}: ProjectCardProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <motion.div
        className="group relative overflow-hidden rounded-3xl glass-effect hover-lift cursor-pointer h-full flex flex-col"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      >
        <div className={`relative overflow-hidden ${isPortrait ? "h-72" : "h-48"}`}>
          <img src={imageUrl} alt={title}
            className={`w-full h-full transition-all duration-700 group-hover:scale-110 ${isPortrait ? "object-contain" : "object-cover"}`}
            style={{ background: "var(--bg-card)" }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-white text-sm font-medium">
              <span>View</span><ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="p-5 flex-grow flex flex-col">
          <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
          <p className="text-xs leading-relaxed line-clamp-2 mb-4 flex-grow" style={{ color: "var(--fg-muted)" }}>{description}</p>
          <div className="flex flex-wrap gap-1.5">
            {technologies.slice(0, 3).map((t, i) => (
              <TechChip key={i} name={t.name} size="sm" />
            ))}
            {technologies.length > 3 && (
              <span className="text-[10px] px-2.5 py-1 rounded-full" style={{ color: "var(--fg-faint)" }}>+{technologies.length - 3}</span>
            )}
          </div>
        </div>
      </motion.div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto" style={{ background: "var(--bg-card)", borderColor: "var(--border-medium)" }}>
          <DialogHeader>
            <DialogTitle className="text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</DialogTitle>
            <DialogDescription style={{ color: "var(--fg-muted)" }}>{description}</DialogDescription>
          </DialogHeader>
          <div className={`relative overflow-hidden rounded-xl my-4 ${isPortrait ? "h-72" : "h-48"}`}>
            <img src={imageUrl} alt={title} className={`w-full h-full ${isPortrait ? "object-contain" : "object-cover"}`} style={{ background: "var(--bg)" }} />
          </div>
          <div className="space-y-5">
            <div>
              <h4 className="text-[10px] font-medium mb-3 uppercase tracking-[0.2em]" style={{ color: "var(--fg-faint)" }}>Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {technologies.map((t, i) => (
                  <TechChip key={i} name={t.name} size="md" />
                ))}
              </div>
            </div>
            {detailedDescription && <div><h4 className="text-[10px] font-medium mb-2 uppercase tracking-[0.2em]" style={{ color: "var(--fg-faint)" }}>Description</h4><p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{detailedDescription}</p></div>}
            {objectives && <div><h4 className="text-[10px] font-medium mb-2 uppercase tracking-[0.2em]" style={{ color: "var(--fg-faint)" }}>Objectives</h4><p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{objectives}</p></div>}
            {results && <div><h4 className="text-[10px] font-medium mb-2 uppercase tracking-[0.2em]" style={{ color: "var(--fg-faint)" }}>Results</h4><p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{results}</p></div>}
            <div className="flex gap-3 pt-2">
              {projectUrl && <a href={projectUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium" style={{ background: "var(--accent)", color: "var(--bg)" }}><ExternalLink className="h-3 w-3" />Demo</a>}
              {githubUrl && <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs" style={{ border: "1px solid var(--border-medium)", color: "var(--fg-muted)" }}><Github className="h-3 w-3" />Code</a>}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectCard;
