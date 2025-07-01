import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
  projectType?: string;
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

const TestimonialsSection = ({
  testimonials = defaultTestimonials,
}: TestimonialsSectionProps) => {
  return (
    <section
      id="testimonials"
      className="py-24 px-6 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-primary"></div>
            <span className="text-primary text-sm font-medium uppercase tracking-wider">
              Témoignages
            </span>
            <div className="w-12 h-px bg-primary"></div>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Ce Que Disent</span>
            <span className="gradient-text"> Mes Clients</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            La satisfaction client est au cœur de mon approche. Découvrez les
            retours de ceux qui m'ont fait confiance.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-effect border-white/10 hover-lift h-full">
                <CardContent className="p-6 space-y-6">
                  {/* Quote icon */}
                  <div className="flex justify-between items-start">
                    <Quote className="h-8 w-8 text-primary/60" />
                    {/* Rating */}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <blockquote className="text-gray-300 leading-relaxed italic">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Project type */}
                  {testimonial.projectType && (
                    <div className="text-xs text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">
                      {testimonial.projectType}
                    </div>
                  )}

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                      />
                      <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {testimonial.role} • {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { number: "98%", label: "Satisfaction Client", icon: "😊" },
            { number: "100%", label: "Projets Livrés", icon: "✅" },
            { number: "4.9/5", label: "Note Moyenne", icon: "⭐" },
            { number: "24h", label: "Temps de Réponse", icon: "⚡" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center glass-effect p-6 rounded-2xl hover-lift"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Marie Dubois",
    role: "CEO",
    company: "TechStart",
    content:
      "Gaël a transformé notre idée en une application mobile exceptionnelle. Son expertise technique et sa compréhension des enjeux business ont été déterminantes pour notre succès.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marie",
    projectType: "Application Mobile",
  },
  {
    id: "2",
    name: "Thomas Martin",
    role: "Directeur Technique",
    company: "InnovCorp",
    content:
      "Un développeur d'exception ! Gaël a livré notre plateforme e-commerce dans les délais avec une qualité irréprochable. Je le recommande vivement.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=thomas",
    projectType: "E-commerce",
  },
  {
    id: "3",
    name: "Sophie Laurent",
    role: "Product Manager",
    company: "HealthTech",
    content:
      "Collaboration parfaite sur notre application médicale. Gaël a su intégrer toutes les contraintes réglementaires tout en maintenant une UX excellente.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sophie",
    projectType: "Application Médicale",
  },
  {
    id: "4",
    name: "Pierre Moreau",
    role: "Fondateur",
    company: "GreenTech Solutions",
    content:
      "Notre application IoT pour la gestion énergétique a dépassé toutes nos attentes. Gaël a une approche très professionnelle et des compétences techniques remarquables.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=pierre",
    projectType: "IoT & Énergie",
  },
  {
    id: "5",
    name: "Amélie Rousseau",
    role: "Directrice Marketing",
    company: "Fashion Hub",
    content:
      "L'application de streaming que Gaël a développée pour nous a révolutionné notre approche du contenu. Interface intuitive et performances au top !",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amelie",
    projectType: "Streaming & Média",
  },
  {
    id: "6",
    name: "Julien Petit",
    role: "CTO",
    company: "DataFlow",
    content:
      "Gaël a su comprendre nos besoins complexes et proposer des solutions innovantes. Son code est propre, documenté et maintenable. Un vrai plaisir de travailler avec lui.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=julien",
    projectType: "Plateforme Web",
  },
];

export default TestimonialsSection;
