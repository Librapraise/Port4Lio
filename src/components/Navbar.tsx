"use client";

import { useState, useEffect } from "react";
import { navLinks } from "@/data/nav";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { clsx } from "clsx";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Scroll-spy logic
      const sections = navLinks.map(link => link.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 300;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        isScrolled ? "py-4 glass" : "py-6 bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center group">
          <div className="relative w-12 h-12 flex items-center justify-center rounded-full overflow-hidden border border-white/10 bg-white/5 group-hover:scale-110 transition-transform duration-300">
            <img 
              src="/images/logo.png" 
              alt="Praise Alabi Logo" 
              className="w-full h-full object-cover"
            />
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={clsx(
                    "text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 relative group",
                    activeSection === link.href.substring(1) 
                      ? "text-primary" 
                      : "text-text-muted hover:text-text-primary"
                  )}
                >
                  {link.name}
                  <span className={clsx(
                    "absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300",
                    activeSection === link.href.substring(1) ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        {/* Mobile Buttons */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-text-primary"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={clsx(
          "fixed inset-0 bg-background/95 backdrop-blur-2xl z-40 md:hidden transition-all duration-500 flex flex-col items-center justify-center gap-8",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-y-full"
        )}
      >
        {navLinks.map((link, i) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-4xl font-heading font-bold hover:text-primary transition-colors"
            style={{ 
              transitionDelay: `${i * 100}ms`,
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            {link.name}
          </a>
        ))}
      </div>
    </header>
  );
};
