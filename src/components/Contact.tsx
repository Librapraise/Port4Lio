"use client";

import { socialLinks } from "@/data/nav";
import { Mail, MapPin, Send, Loader2 } from "lucide-react";
import { useState } from "react";

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 1. Go to https://formspree.io/ and create a free account.
  // 2. Create a new form and copy the "Form ID".
  // 3. Paste your Form ID here:
  const FORMSPREE_ID = "mlgzelvk"; 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Message sent successfully! I will get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const data = await response.json();
        alert(data.error || "Oops! There was a problem sending your message. Please check your Formspree ID.");
      }
    } catch (error) {
      alert("Something went wrong. Please check your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 noise mesh-gradient overflow-hidden">
      <div className="absolute inset-0 opacity-30 animate-mesh-gradient pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-5xl md:text-6xl font-heading font-black mb-6 tracking-tighter">
                Let's Build <span className="text-gradient">Something</span>
              </h2>
              <p className="text-xl text-text-muted leading-relaxed">
                Have a project in mind? Or just want to say hi? 
                I'm always open to discussing new opportunities and creative ideas.
              </p>
            </div>

            <div className="space-y-6">
              <div className="glass p-6 rounded-3xl flex items-center gap-6 group hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Email Me</p>
                  <p className="text-lg font-bold text-text-primary">alabipraise26@gmail.com</p>
                </div>
              </div>

              <div className="glass p-6 rounded-3xl flex items-center gap-6 group hover:border-secondary/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Location</p>
                  <p className="text-lg font-bold text-text-primary">Ibadan, Nigeria</p>
                </div>
              </div>

              <div className="glass p-6 rounded-3xl flex items-center gap-6 group hover:border-highlight/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-highlight/10 flex items-center justify-center text-highlight group-hover:bg-highlight group-hover:text-white transition-all">
                   <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                </div>
                <div>
                  <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Status</p>
                  <p className="text-lg font-bold text-text-primary">Open for new projects</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-full glass hover:scale-110 transition-all text-text-muted hover:text-primary"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="glass p-8 md:p-12 rounded-[40px] shadow-2xl border-white/5">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-2">Your Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-background/50 border border-card rounded-2xl px-6 py-4 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-background/50 border border-card rounded-2xl px-6 py-4 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-2">Subject</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-background/50 border border-card rounded-2xl px-6 py-4 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-2">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-background/50 border border-card rounded-2xl px-6 py-4 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-secondary py-5 rounded-2xl font-bold text-white shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
