import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import { getTechIcon } from "@/lib/techIcons";
import { getCountry } from "@/lib/countries";
import Magnetic from "./fx/Magnetic";

export interface ModalProject {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  category?: string;
  objectives?: string;
  results?: string;
  demoUrl?: string;
  codeUrl?: string;
  isPortrait?: boolean;
  countries?: string[];
}

interface ProjectModalProps {
  project: ModalProject | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[500] flex items-center justify-center p-3 sm:p-8"
          style={{ background: "rgba(5,6,10,0.92)", backdropFilter: "blur(12px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-5xl max-h-[92vh] sm:max-h-[88vh] panel rounded-2xl overflow-hidden hud-corners flex flex-col"
            initial={{ y: 60, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 60, scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 flex-shrink-0" style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-elevated)" }}>
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] truncate" style={{ color: "var(--accent)" }}>
                [ case_file // {project.category || "project"} ]
              </span>
              <button onClick={onClose} className="p-1.5 -m-1.5 flex-shrink-0 transition-colors hover:text-[var(--accent)]" style={{ color: "var(--fg-faint)" }} data-cursor="close" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid md:grid-cols-5 overflow-y-auto">
                <div className="relative md:col-span-3 h-56 sm:h-72 md:h-auto md:min-h-[380px] overflow-hidden" style={{ background: "var(--bg)" }}>
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className={`absolute inset-0 w-full h-full object-contain ${project.isPortrait ? "p-4 sm:p-6" : "p-2 sm:p-3"}`}
                  />
                  <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
                </div>

                <div className="md:col-span-2 p-4 sm:p-6 lg:p-7 space-y-4 sm:space-y-5">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight" style={{ color: "var(--fg)" }}>
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{project.description}</p>

                  {project.countries && project.countries.length > 0 && (
                    <div>
                      <h4 className="font-mono text-[9px] mb-2 uppercase tracking-[0.25em]" style={{ color: "var(--fg-faint)" }}>// markets</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.countries
                          .map((code) => getCountry(code))
                          .filter((c): c is NonNullable<ReturnType<typeof getCountry>> => Boolean(c))
                          .map((c) => (
                            <span key={c.code} className="inline-flex items-center gap-1.5 font-mono text-[9px] px-2 py-1 rounded" style={{ background: "var(--bg-elevated)", color: "var(--fg-muted)", border: "1px solid var(--border-subtle)" }}>
                              <span className="text-sm leading-none">{c.flag}</span>
                              {c.name}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-mono text-[9px] mb-2 uppercase tracking-[0.25em]" style={{ color: "var(--fg-faint)" }}>// stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((t, i) => {
                        const icon = getTechIcon(t);
                        return (
                          <span key={i} className="inline-flex items-center gap-1.5 font-mono text-[9px] px-2 py-1 rounded" style={{ background: "var(--bg-elevated)", color: "var(--fg-muted)", border: "1px solid var(--border-subtle)" }}>
                            {icon && <img src={icon} alt="" className="w-3.5 h-3.5" />}
                            {t}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {project.objectives && (
                    <div>
                      <h4 className="font-mono text-[9px] mb-2 uppercase tracking-[0.25em]" style={{ color: "var(--fg-faint)" }}>// mission</h4>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--fg-muted)" }}>{project.objectives}</p>
                    </div>
                  )}

                  {project.results && (
                    <div>
                      <h4 className="font-mono text-[9px] mb-2 uppercase tracking-[0.25em]" style={{ color: "var(--fg-faint)" }}>// outcome</h4>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--fg-muted)" }}>{project.results}</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    {project.demoUrl && (
                      <Magnetic>
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded font-mono text-[11px] uppercase tracking-wider"
                          style={{ background: "var(--accent)", color: "var(--bg)" }}
                        >
                          <ExternalLink className="h-3.5 w-3.5" />Launch
                        </a>
                      </Magnetic>
                    )}
                    {project.codeUrl && (
                      <Magnetic>
                        <a href={project.codeUrl} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded font-mono text-[11px] uppercase tracking-wider transition-colors hover:text-[var(--accent)]"
                          style={{ border: "1px solid var(--border-medium)", color: "var(--fg-muted)" }}
                        >
                          <Github className="h-3.5 w-3.5" />Source
                        </a>
                      </Magnetic>
                    )}
                  </div>
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
