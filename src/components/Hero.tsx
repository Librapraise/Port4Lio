"use client";

import { useTypewriter } from "@/hooks/useTypewriter";
import { socialLinks } from "@/data/nav";
import { ChevronDown, ArrowRight, Download } from "lucide-react";

export const Hero = () => {
  const typewriterText = useTypewriter([
    "Fullstack Developer",
    "Mobile App Expert",
    "Product Architect",
    "UI/UX Strategist"
  ]);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise mesh-gradient"
    >
      {/* Animated Mesh Gradient Background Layer */}
      <div className="absolute inset-0 opacity-50 mix-blend-overlay animate-mesh-gradient pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-primary/20 text-[10px] uppercase tracking-widest font-bold text-primary mb-8 animate-float">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Available for Hire
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-heading font-black mb-6 tracking-tighter">
          <span className="text-gradient animate-text-gradient">
            Praise Alabi
          </span>
        </h1>

        {/* Subtitle */}
        <div className="h-12 md:h-16 mb-8">
          <p className="text-2xl md:text-4xl font-heading text-text-primary/80">
            {typewriterText}
            <span className="animate-pulse border-r-2 border-primary ml-1" />
          </p>
        </div>

        {/* Description */}
        <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
          I build high-performance mobile and web applications with end-to-end expertise. 
          Specializing in scalable architectures that deliver seamless user experiences across all platforms.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <a 
            href="#projects" 
            className="group relative px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-full font-bold text-white shadow-lg shadow-primary/25 hover:scale-105 hover:shadow-primary/40 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              View Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <a 
            href="/praise-alabi-cv.pdf" 
            download="Praise-Alabi-CV.pdf"
            target="_blank"
            className="group px-8 py-4 glass border-primary/20 rounded-full font-bold text-text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              Download CV <Download className="w-4 h-4" />
            </span>
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-6">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full glass border-white/5 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(124,58,237,0.3)] ${social.color}`}
              aria-label={social.name}
            >
              <social.icon className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  );
};
