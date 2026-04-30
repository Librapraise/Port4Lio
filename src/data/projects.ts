export interface Project {
  title: string;
  description: string;
  tech: string[];
  category: 'Frontend' | 'Full-Stack' | 'AI/ML' | 'UI/UX' | 'Mobile';
  image: string;
  link?: string;
  github?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "TrueConnect App",
    description: "Verified Relationship Platform for Africans Globally. Designed to provide a secure and intentional space for real connections.",
    tech: ["React", "Node.js", "Tailwind CSS", "Auth0"],
    category: "Mobile",
    image: "/trueconnectapp.png",
    link: "https://trueapp.trueconnectllc.com/",
    featured: true
  },
  {
    title: "HOOOM Technologies Portfolio",
    description: "Official portfolio for HOOOM Technologies, a multi-industry company focusing on digital impact and innovation.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "Frontend",
    image: "/hooom.png",
    link: "https://www.hooom.org/",
    github: "https://github.com/HoooM-Tech/HoooM-Official",
    featured: true
  },
  {
    title: "LizzaAtelier",
    description: "A refined womenswear platform blending bespoke couture and ready-to-wear. Modern African luxury with intention.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Commerce.js"],
    category: "Frontend",
    image: "/lizza.png",
    link: "https://www.lizzaatelier.com/",
  },
  {
    title: "The ReachApp",
    description: "A community-focused application designed to enhance reach and engagement within digital ecosystems.",
    tech: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS"],
    category: "Mobile",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200",
    link: "https://the-reach-app-orcin.vercel.app/",
    github: "https://github.com/HoooM-Tech/The-Reach-App",
  },
  {
    title: "AscendlyAI",
    description: "AI Powered Productivity Tool for Professionals. Upload resumes, write cover letters, tailor resumes and generate interview questions.",
    tech: ["Next.js", "TypeScript", "FastAPI", "Tailwind CSS"],
    category: "Full-Stack",
    image: "/ascendly.png",
    link: "https://ascendly-ai-gilt.vercel.app/",
    github: "https://github.com/Librapraise/AscendlyAI.git",
    featured: true
  },
  {
    title: "ChatBot App",
    description: "This project is a chatbot implemented using machine learning techniques and libraries in Django and JavaScript.",
    tech: ["Django", "JavaScript", "Machine Learning", "Python"],
    category: "AI/ML",
    image: "https://images.pexels.com/photos/18540208/pexels-photo-18540208/free-photo-of-wood-landscape-water-hill.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "#",
    github: "https://github.com/Librapraise/Chatbot-built-with-django-and-javascript",
    featured: true
  },
  {
    title: "MINDAI JOURNAL",
    description: "Your private space for reflection, growth, and mental wellness. Track your journey and gain insights.",
    tech: ["Next.js", "TypeScript", "FastAPI", "Tailwind CSS"],
    category: "Full-Stack",
    image: "/mindai.png",
    link: "https://mindjoural.site/",
    github: "https://github.com/Librapraise/MindAIJournal.git"
  },
  {
    title: "Lendsqr Frontend Challenge",
    description: "Responsive and interactive frontend dashboard built with React, TypeScript, and SCSS for Lendsqr. Features dynamic filtering and detailed pages.",
    tech: ["React", "TypeScript", "SCSS", "API Integration"],
    category: "Frontend",
    image: "/lendsqr.png",
    link: "https://lendsqr-fe-test-silk.vercel.app/",
    github: "https://github.com/Librapraise/lendsqr-fe-test.git"
  },
  {
    title: "ArtFolio",
    description: "A portfolio website showcasing a graphic designer's projects and skills, focusing on high-quality visuals and clean layouts.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    category: "Frontend",
    image: "/artfolio.png",
    link: "https://artfolio-tau.vercel.app/",
    github: "https://github.com/Librapraise/Artfolio.git"
  },
  {
    title: "SportsWear Website",
    description: "A sportwear and casual wears online shopping website with a clean, modern e-commerce interface.",
    tech: ["HTML", "CSS", "JavaScript", "E-commerce"],
    category: "Frontend",
    image: "/sportswear.png",
    link: "https://sportswear-git-main-libras-projects-12c552db.vercel.app/index.html",
    github: "https://github.com/Librapraise/Sportswear.git"
  },
  {
    title: "College Website",
    description: "Demo website for a university institution featuring responsive layouts and multiple informational sections.",
    tech: ["HTML", "CSS", "JavaScript", "Responsive"],
    category: "Frontend",
    image: "/uniweb.png",
    link: "https://university-website-eosin.vercel.app/",
    github: "https://github.com/Librapraise/university-website.git"
  }
];
