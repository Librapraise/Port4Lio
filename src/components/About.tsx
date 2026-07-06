"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { skillCategories } from "@/data/skills";
import { useState, useEffect } from "react";
import Image from "next/image";

const StatCard = ({ label, value }: { label: string; value: string }) => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.5 });
  const [count, setCount] = useState(0);
  const targetValue = parseInt(value);

  useEffect(() => {
    if (isIntersecting) {
      let start = 0;
      const duration = 2000;
      const increment = targetValue / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= targetValue) {
          setCount(targetValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isIntersecting, targetValue]);

  return (
    <div ref={ref} className="glass p-4 rounded-2xl flex flex-col items-center justify-center text-center">
      <span className="text-3xl font-heading font-black text-primary">{count}+</span>
      <span className="text-[10px] uppercase tracking-widest text-text-muted mt-1">{label}</span>
    </div>
  );
};

export const About = () => {
  return (
    <section id="about" className="py-24 max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Image & Stats */}
        <div className="space-y-12">
          <div className="relative group mx-auto lg:mx-0 w-64 h-64 md:w-80 md:h-80">
            {/* Animated Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-secondary to-highlight animate-spin-slow opacity-20 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="absolute inset-2 rounded-full bg-background z-10" />
            
            {/* Image Placeholder / PA Monogram */}
            <div className="absolute inset-4 rounded-full overflow-hidden z-20 bg-surface flex items-center justify-center border-4 border-card">
               {/* Replace with actual image if exists */}
               <span className="text-7xl font-heading font-black text-gradient">PA</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <StatCard label="Years Exp" value="3" />
            <StatCard label="Projects" value="15" />
            <StatCard label="Clients" value="5" />
          </div>
        </div>

        {/* Right Column: Bio & Tech */}
        <div className="space-y-8">
          <div>
            <div className="inline-block px-3 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-bold tracking-[0.2em] mb-4">
              ABOUT ME
              <div className="h-px w-full bg-gradient-to-r from-primary to-transparent mt-1" />
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
              I craft digital experiences that people <span className="italic text-primary">remember</span>
            </h2>
          </div>

          <div className="space-y-6 text-lg text-text-muted leading-relaxed">
            <p>
              Hi, I'm Praise Alabi, a results-driven fullstack and mobile application developer based in Ibadan, Nigeria. 
              My mission is to build software that not only works flawlessly but also feels intuitive and inspiring across all devices.
            </p>
            <p>
              With a strong foundation in both frontend and backend technologies, along with specialized mobile development skills, 
              I bridge the gap between complex server-side logic and pixel-perfect user interfaces.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {["Problem Solver", "Detail-Oriented", "Open Source Lover", "UI Craftsman"].map(trait => (
              <span key={trait} className="px-4 py-1.5 rounded-full bg-surface border border-card text-sm font-medium text-text-primary">
                {trait}
              </span>
            ))}
          </div>

          {/* Tech Grid */}
          <div className="pt-8">
            <h3 className="text-sm font-bold tracking-widest text-text-primary mb-6">TECH STACK</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {skillCategories[0].skills.concat(skillCategories[1].skills).slice(0, 8).map(skill => (
                <div key={skill.name} className="flex flex-col items-center p-3 rounded-xl glass hover:border-primary/50 transition-colors group">
                  <img 
                    src={`https://cdn.simpleicons.org/${(skill.icon || skill.name).toLowerCase().replace('.', '').replace(' ', '')}/7C3AED`} 
                    alt={skill.name}
                    className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform"
                  />
                  <span className="text-[10px] font-bold text-text-muted">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
};
