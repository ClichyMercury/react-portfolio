import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

interface Technology {
  name: string;
  color?: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  technologies: Technology[];
  projectUrl?: string;
  githubUrl?: string;
  detailedDescription?: string;
  objectives?: string;
  results?: string;
}

const ProjectCard = ({
  title = "Mobile App Project",
  description = "A brief description of this mobile application project and its key features.",
  imageUrl = "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
  technologies = [
    { name: "React Native" },
    { name: "TypeScript" },
    { name: "Firebase" },
  ],
  projectUrl = "",
  githubUrl = "",
  detailedDescription = "This is a detailed description of the project that explains the challenges faced, solutions implemented, and the overall development process.",
  objectives = "Objectifs du projet et défis techniques à relever.",
  results = "Résultats obtenus et impact du projet.",
}: ProjectCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <>
      <Card
        className="overflow-hidden h-full flex flex-col bg-card hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <CardHeader className="pb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
        </CardHeader>

        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {description}
          </p>
        </CardContent>

        <CardFooter className="flex flex-wrap gap-2 pt-2">
          {technologies.map((tech, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tech.name}
            </Badge>
          ))}
        </CardFooter>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {description}
            </DialogDescription>
          </DialogHeader>

          <div className="relative h-56 overflow-hidden rounded-md my-4">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                🛠️ Stack Technique
              </h4>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                📝 Description
              </h4>
              <p className="text-sm text-muted-foreground">
                {detailedDescription}
              </p>
            </div>

            {objectives && (
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  🎯 Objectifs
                </h4>
                <p className="text-sm text-muted-foreground">{objectives}</p>
              </div>
            )}

            {results && (
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  📊 Résultats
                </h4>
                <p className="text-sm text-muted-foreground">{results}</p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              {projectUrl && (
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <a
                    href={projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Voir la Démo
                  </a>
                </Button>
              )}

              {githubUrl && (
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    Voir le Code
                  </a>
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectCard;
