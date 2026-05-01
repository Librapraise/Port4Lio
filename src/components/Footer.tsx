"use client";

import { navLinks, socialLinks } from "@/data/nav";
import { ArrowUp } from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0A0A0F] text-white py-20 px-6 overflow-hidden relative">
      {/* Mesh Gradient Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        {/* Brand */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="w-14 h-14 flex items-center justify-center rounded-full overflow-hidden border border-white/10 bg-white/5">
            <img 
              src="/images/logo.png" 
              alt="Praise Alabi Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-gray-400 max-w-sm leading-relaxed">
            Building the future of digital ecosystems. 
            Focused on high-performance fullstack applications and seamless mobile experiences.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary transition-all"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-heading font-bold text-lg mb-6">Navigation</h4>
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Back to Top */}
        <div className="flex flex-col items-start md:items-end justify-between">
           <div>
            <h4 className="font-heading font-bold text-lg mb-6">Contact</h4>
            <p className="text-gray-400">Ibadan, Nigeria</p>
            <p className="text-gray-400">alabipraise26@gmail.com</p>
           </div>
           
           <button 
            onClick={scrollToTop}
            className="group mt-8 p-4 rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all shadow-lg"
           >
             <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
           </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Praise Alabi. All rights reserved.
        </p>
        <p className="text-gray-500 text-sm font-medium">
          Designed & Built with <span className="text-primary">❤</span> by Praise Alabi
        </p>
      </div>
    </footer>
  );
};
