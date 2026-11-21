import type { Locale } from "@/i18n";
import p1 from "./i18n/projects-1.json";
import p2 from "./i18n/projects-2.json";
import p3 from "./i18n/projects-3.json";

export type ProjectText = { title: string; description: string; objectives?: string; results?: string };
type Entry = Partial<Record<Locale, Partial<ProjectText>>>;

const TABLE: Record<string, Entry> = { ...(p1 as Record<string, Entry>), ...(p2 as Record<string, Entry>), ...(p3 as Record<string, Entry>) };

export const localizeProject = <T extends { id: string } & ProjectText>(project: T, locale: Locale): T => {
  const text = TABLE[project.id]?.[locale];
  if (!text) return project;
  return {
    ...project,
    title: text.title ?? project.title,
    description: text.description ?? project.description,
    objectives: text.objectives ?? project.objectives,
    results: text.results ?? project.results,
  };
};

export const projectTitle = (id: string, locale: Locale, fallback: string) => TABLE[id]?.[locale]?.title ?? fallback;
