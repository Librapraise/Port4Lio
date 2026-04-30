"use client";

import { Project } from "@/data/projects";
import { ExternalLink, Github, Star } from "lucide-react";
import Image from "next/image";

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="group relative glass rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
      {/* Image Area */}
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/80 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-widest">
          {project.category}
        </div>

        {/* Featured Ribbon */}
        {project.featured && (
          <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
            <div className="absolute top-4 right-[-32px] w-[120px] py-1 bg-highlight rotate-45 text-center text-[10px] font-black text-white shadow-lg flex items-center justify-center gap-1">
              <Star className="w-3 h-3 fill-current" /> FEATURED
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-6">
        <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-text-muted mb-6 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((tag) => (
            <span key={tag} className="px-2 py-1 rounded-md bg-secondary/10 text-secondary text-[10px] font-bold">
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {project.link && project.link !== "#" && (
            <a 
              href={project.link} 
              target="_blank"
              className="flex items-center gap-2 text-sm font-bold text-primary hover:underline"
            >
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
          )}
          {project.github && project.github !== "#" && (
            <a 
              href={project.github} 
              target="_blank"
              className="flex items-center gap-2 text-sm font-bold text-text-muted hover:text-text-primary transition-colors"
            >
              <Github className="w-4 h-4" /> Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
