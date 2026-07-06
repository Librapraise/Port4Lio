"use client";

import { useState } from "react";
import { skillCategories, allTechIcons } from "@/data/skills";
import { SkillBar } from "./SkillBar";
import { clsx } from "clsx";

export const Skills = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="skills" className="py-24 bg-surface/50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-heading font-black mb-16 text-center">
          Technical <span className="text-gradient">Arsenal</span>
        </h2>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Vertical Tabs */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-4 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
            {skillCategories.map((cat, i) => (
              <button
                key={cat.title}
                onClick={() => setActiveTab(i)}
                className={clsx(
                  "flex-shrink-0 lg:w-full text-left px-8 py-6 rounded-2xl border transition-all duration-500 group relative overflow-hidden",
                  activeTab === i 
                    ? "bg-primary text-white border-primary shadow-xl shadow-primary/20" 
                    : "bg-surface text-text-muted border-card hover:border-primary/50 hover:text-text-primary"
                )}
              >
                <span className="text-xs font-bold tracking-widest uppercase mb-1 block opacity-70">Category</span>
                <span className="text-xl font-heading font-black">{cat.title}</span>
                
                {activeTab === i && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12" />
                )}
              </button>
            ))}
          </div>

          {/* Skill Bars */}
          <div className="lg:col-span-8 glass p-8 md:p-12 rounded-3xl min-h-[400px]">
            <div 
              key={activeTab}
              className="grid sm:grid-cols-2 gap-8 animate-in fade-in slide-in-from-right-8 duration-700"
            >
              {skillCategories[activeTab].skills.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={i * 100} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="mt-32 border-y border-card py-12 overflow-hidden relative">
        <div className="flex gap-12 whitespace-nowrap animate-marquee">
          {[...allTechIcons, ...allTechIcons].map((tech, i) => (
            <div key={i} className="flex items-center gap-4 text-4xl md:text-6xl font-heading font-black opacity-10 hover:opacity-50 transition-opacity cursor-default grayscale hover:grayscale-0">
              <img 
                src={`https://cdn.simpleicons.org/${tech.toLowerCase().replace('.', '').replace(' ', '')}/7C3AED`} 
                alt={tech}
                className="w-8 h-8 md:w-12 md:h-12"
              />
              {tech}
            </div>
          ))}
        </div>
        <div className="flex gap-12 whitespace-nowrap animate-marquee-reverse mt-12">
          {[...allTechIcons, ...allTechIcons].reverse().map((tech, i) => (
            <div key={i} className="flex items-center gap-4 text-4xl md:text-6xl font-heading font-black opacity-10 hover:opacity-50 transition-opacity cursor-default grayscale hover:grayscale-0">
              <img 
                src={`https://cdn.simpleicons.org/${tech.toLowerCase().replace('.', '').replace(' ', '')}/06B6D4`} 
                alt={tech}
                className="w-8 h-8 md:w-12 md:h-12"
              />
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
