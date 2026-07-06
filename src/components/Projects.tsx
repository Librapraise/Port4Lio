"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { clsx } from "clsx";

const categories = ["All", "Full-Stack", "Mobile", "Frontend", "AI/ML"];

export const Projects = () => {
  const [filter, setFilter] = useState("All");

  const filteredProjects = projects.filter(
    (p) => filter === "All" || p.category === filter
  );

  return (
    <section id="projects" className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-4">
            Selected <span className="text-gradient">Works</span>
          </h2>
          <p className="text-text-muted max-w-md">
            A showcase of robust fullstack systems and intuitive mobile applications I've engineered.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex p-1 bg-surface border border-card rounded-2xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={clsx(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300",
                filter === cat 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-text-muted hover:text-text-primary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, i) => (
          <div 
            key={project.title}
            className="animate-in fade-in slide-in-from-bottom-8 duration-700"
            style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
};
