"use client";

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Code, Layout, Database, Server, Star, ArrowRight, Globe, ChevronUp } from 'lucide-react';
import { image } from 'framer-motion/client';

// Custom 3D Scene Component
const ThreeScene = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000; // Reduced for better performance
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 30;
      posArray[i + 1] = (Math.random() - 0.5) * 30;
      posArray[i + 2] = (Math.random() - 0.5) * 30;
      
      // Rainbow colors
      const hue = Math.random();
      const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
      colorArray[i] = color.r;
      colorArray[i + 1] = color.g;
      colorArray[i + 2] = color.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create geometric shapes
    const shapes: THREE.Mesh[] = [];
    for (let i = 0; i < 10; i++) { // Reduced count
      const geometry = Math.random() > 0.5 
        ? new THREE.OctahedronGeometry(0.3) 
        : new THREE.TetrahedronGeometry(0.3);
      
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.8, 0.6),
        wireframe: true,
        transparent: true,
        opacity: 0.4
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      shapes.push(mesh);
      scene.add(mesh);
    }

    camera.position.z = 12;

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Rotate particles
      if (particlesMesh) {
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;
      }

      // Animate shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.005 + index * 0.0005;
        shape.rotation.y += 0.005 + index * 0.0005;
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.005;
      });

      // Mouse interaction
      if (mousePosition) {
        camera.position.x += (mousePosition.x * 0.3 - camera.position.x) * 0.03;
        camera.position.y += (-mousePosition.y * 0.3 - camera.position.y) * 0.03;
        camera.lookAt(scene.position);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      shapes.forEach(shape => {
        shape.geometry.dispose();
        if (Array.isArray(shape.material)) {
          shape.material.forEach(material => material.dispose());
        } else {
          shape.material.dispose();
        }
      });
    };
  }, [mousePosition]);

  return <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0" />;
};

// Floating Animation Component
const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <div 
      className="animate-float"
      style={{ 
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

// Skill Category Component
const SkillCategory = ({ category, skills, icon, color }: { 
  category: string; 
  skills: { name: string; level: number }[]; 
  icon: React.ReactNode; 
  color: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref} className="glass-morphism p-6 md:p-8 rounded-3xl group hover:scale-105 transition-all duration-300">
      <div className="flex items-center mb-6">
        <div className={`p-3 md:p-4 rounded-2xl ${color} mr-4 group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold mb-2">{category}</h3>
          <p className="text-gray-400 text-sm md:text-base">Professional Level</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={skill.name}>
            <div className="flex justify-between mb-2">
              <span className="text-white">{skill.name}</span>
              <span className="text-cyan-400 font-bold">{skill.level}%</span>
            </div>
            <div className="relative">
              <div className="w-full bg-gray-800 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full ${color} transition-all duration-1000 ease-out`}
                  style={{ 
                    width: isVisible ? `${skill.level}%` : '0%',
                    transitionDelay: `${index * 100}ms`
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Portfolio Component
const Portfolio = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projects = [
    {
      title: "SportsWear Website",
      description: "A sportwear and casual wears online shopping website created with html, css and javascript.",
      tech: ["HTML", "CSS", "JavaScript", "E-commerce"],
      color: "from-red-300 to-blue-300",
      image: "/sportswear.png",
      link: "https://sportswear-git-main-libras-projects-12c552db.vercel.app/index.html",
      github: "https://github.com/Librapraise/Sportswear.git"
    },
    {
      title: "MINDAI JOURNAL",
      description: "Your private space for reflection, growth, and mental wellness. Track your journey and gain insights.",
      tech: ["Next.js", "Typescript", "FastApi", "Tailwind CSS"],
      color: "from-blue-300 to-violet-300",
      image: "/mindai.png",
      link: "https://mindjoural.site/",
      github: "https://github.com/Librapraise/MindAIJournal.git"
    },
    {
      title: "ChatBot App",
      description: "This project is a chatbot implemented using machine learning techniques and libraries in Django and JavaScript.",
      tech: ["Django", "JavaScript", "Machine Learning", "Python"],
      color: "from-violet-300 to-purple-300",
      image: "https://images.pexels.com/photos/18540208/pexels-photo-18540208/free-photo-of-wood-landscape-water-hill.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      link: "#",
      github: "https://github.com/Librapraise/Chatbot-built-with-django-and-javascript"
    },
    {
      title: "College Website",
      description: "This website was built as a demo for a college using html, css and javascript",
      tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
      color: "from-purple-300 to-red-300",
      image: "uniweb.png",
      link: "https://university-website-eosin.vercel.app/",
      github: "https://github.com/Librapraise/university-website.git"
    },
    {
      title: "Lendsqr Frontend Challenge",
      description: "This project is a responsive and interactive frontend dashboard built with React, TypeScript, and SCSS for Lendsqr. It features user authentication, a dynamic user dashboard, filtering and pagination, and detailed user information pages—all integrated with a mock API.",
      tech: ["React", "CSS", "TypeScript", "Responsive Design"],
      color: "from-purple-300 to-red-300",
      image: "lendsqr.png",
      link: "https://lendsqr-fe-test-silk.vercel.app/",
      github: "https://github.com/Librapraise/lendsqr-fe-test.git"
    },
  ];

  const skillCategories = [
    {
      category: "Frontend Development",
      skills: [
        { name: "HTML/CSS", level: 95 },
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "React", level: 90 },
        { name: "Next.js", level: 85 }
      ],
      icon: <Code className="w-6 h-6 md:w-8 md:h-8 text-white" />,
      color: "bg-gradient-to-r from-blue-500 to-purple-600"
    },
    {
      category: "UI & Animation",
      skills: [
        { name: "Tailwind CSS", level: 90 },
        { name: "Framer Motion", level: 80 },
        { name: "Responsive Design", level: 95 }
      ],
      icon: <Layout className="w-6 h-6 md:w-8 md:h-8 text-white" />,
      color: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
      category: "Backend Development",
      skills: [
        { name: "Node.js", level: 80 },
        { name: "Express", level: 75 },
        { name: "Django", level: 75 },
        { name: "RESTful APIs", level: 85 },
        { name: "GraphQL", level: 70 },
        { name: "MongoDB", level: 75 }
      ],
      icon: <Server className="w-6 h-6 md:w-8 md:h-8 text-white" />,
      color: "bg-gradient-to-r from-green-500 to-blue-500"
    },
    {
      category: "Other Skills",
      skills: [
        { name: "Git/GitHub", level: 90 },
        { name: "Jest", level: 70 },
        { name: "Performance Optimization", level: 80 }
      ],
      icon: <Database className="w-6 h-6 md:w-8 md:h-8 text-white" />,
      color: "bg-gradient-to-r from-yellow-500 to-red-500"
    }
  ];

  // Contact Info with Links
  const contacts = [
    { 
      icon: Mail, 
      label: 'Email',
      href: 'mailto:alabipraise26@gmail.com',
      ariaLabel: 'Send an email to Praise Alabi'
    },
    { 
      icon: Linkedin, 
      label: 'LinkedIn', 
      // TODO: Replace with your LinkedIn profile URL
      href: 'https://www.linkedin.com/in/praise-alabi',
      ariaLabel: 'View Praise Alabi\'s LinkedIn profile'
    },
    { 
      icon: Github, 
      label: 'GitHub',
      href: 'https://github.com/Librapraise',
      ariaLabel: 'View Praise Alabi\'s GitHub profile'
    }
  ];

  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTopButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(-10px) rotate(-1deg); }
        }
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor; }
          50% { text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor; }
        }
        @keyframes slideInUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes morphBorder {
          0%, 100% { border-radius: 20px; }
          25% { border-radius: 50px 20px; }
          50% { border-radius: 20px 50px; }
          75% { border-radius: 50px 50px; }
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float { 
          animation: float 6s ease-in-out infinite; 
        }
        .animate-glow { 
          animation: glow 2s ease-in-out infinite alternate; 
        }
        .animate-slideInUp { 
          animation: slideInUp 0.8s ease-out forwards; 
        }
        .animate-morphBorder { 
          animation: morphBorder 8s ease-in-out infinite; 
        }
        .glass-morphism {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .text-gradient {
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7);
          background-size: 300% 300%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: gradientShift 3s ease infinite;
        }
      `}</style>

      {/* 3D Background */}
      <ThreeScene mousePosition={mousePosition} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-2xl font-bold text-gradient animate-glow glass-morphism px-4 py-2 rounded-full transition-all duration-300 hover:scale-105">
            Portfolio
          </div>
          <div className="hidden md:flex space-x-8 glass-morphism px-6 py-3 rounded-full">
            {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-cyan-400 transition-all duration-300 transform hover:scale-110"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center max-w-4xl mx-auto px-6">
          <FloatingElement>
            <h1 className={`text-4xl md:text-6xl lg:text-8xl font-bold mb-6 text-gradient animate-glow transition-all duration-1000 ${isLoaded ? 'animate-slideInUp' : 'opacity-0'}`}>
              Praise Alabi
            </h1>
          </FloatingElement>
          
          <FloatingElement delay={0.2}>
            <p className={`text-xl md:text-2xl lg:text-3xl mb-8 text-gray-300 transition-all duration-1000 delay-200 ${isLoaded ? 'animate-slideInUp' : 'opacity-0'}`}>
              Creative Web Developer
            </p>
          </FloatingElement>

          <FloatingElement delay={0.4}>
            <p className={`text-base md:text-lg lg:text-xl mb-12 text-gray-400 max-w-2xl mx-auto transition-all duration-1000 delay-400 ${isLoaded ? 'animate-slideInUp' : 'opacity-0'}`}>
            I'm a frontend developer specializing in building exceptional digital experiences. 
            Currently, I'm focused on creating accessible, human-centered products.
            </p>
          </FloatingElement>

          <FloatingElement delay={0.6}>
            <div className={`flex flex-wrap justify-center gap-6 transition-all duration-1000 delay-600 ${isLoaded ? 'animate-slideInUp' : 'opacity-0'}`}>
              {/* --- LINK ADDED --- */}
              <a href="#projects" className="group glass-morphism px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 inline-block">
                <span className="flex items-center space-x-2">
                  <span>View Projects</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              {/* --- LINK ADDED --- */}
              <a href="#contact" className="group glass-morphism px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 inline-block">
                <span className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Get in Touch</span>
                </span>
              </a>
            </div>
          </FloatingElement>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <ChevronDown className="w-8 h-8 text-cyan-400 animate-pulse" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <FloatingElement>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 text-gradient">
              About Me
            </h2>
          </FloatingElement>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* About Text */}
            <FloatingElement delay={0.2}>
              <div className="order-2 md:order-1">
                <p className="mb-6 text-lg md:text-xl text-gray-300 leading-relaxed">
                  Hello! I'm a passionate Frontend Developer with a love for creating beautiful, interactive, and user-friendly web experiences. My journey in web development started several years ago, and I've been hooked ever since.
                </p>
                
                <p className="mb-6 text-lg md:text-xl text-gray-300 leading-relaxed">
                  I specialize in building modern web applications using cutting-edge technologies like React, Next.js, and TypeScript. I'm particularly interested in creating smooth animations and interactive user interfaces that delight users.
                </p>
                
                <p className="mb-8 text-lg md:text-xl text-gray-300 leading-relaxed">
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through blog posts and tutorials.
                </p>
                
                <div className="glass-morphism p-6 rounded-2xl">
                  <h3 className="text-xl md:text-2xl font-bold mb-6 text-cyan-400">Tech Stack</h3>
                  <div className="flex flex-wrap gap-3">
                    {['JavaScript', 'TypeScript', 'React', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Django', 'Node.js'].map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full text-sm md:text-base text-white border border-purple-500/30 hover:scale-105 transition-transform cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FloatingElement>
            
            {/* About Image */}
            <FloatingElement delay={0.4}>
              <div className="order-1 md:order-2 flex justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  {/* Rotating border */}
                  <div className="absolute inset-0 rounded-full rotating-border">
                    <div className="w-full h-full rounded-full border-2 border-transparent bg-gradient-to-r from-purple-500 to-pink-500 p-0.5">
                      <div className="w-full h-full rounded-full bg-gray-900"></div>
                    </div>
                  </div>
                  
                  {/* Outer glow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-xl"></div>
                  
                  {/* Main image container */}
                  <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-gray-800 bg-gradient-to-br from-gray-800 to-gray-900">
                    {/* Placeholder for profile image */}
                    <div className="w-full h-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center">
                      <div className="text-6xl md:text-8xl text-white/50">👨‍💻</div>
                    </div>
                  </div>
                  
                  {/* Additional floating elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-400 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
            </FloatingElement>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <FloatingElement>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 text-gradient">
              Featured Projects
            </h2>
          </FloatingElement>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <FloatingElement key={project.title} delay={index * 0.2}>
                <div className="group glass-morphism p-6 md:p-8 rounded-3xl hover:scale-105 transition-all duration-500 flex flex-col h-full">
                  <div className={`w-full h-32 md:h-48 bg-gradient-to-br ${project.color} rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-all duration-300" />
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"  
                        loading="lazy"
                      />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed text-sm md:text-base">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-gray-800 rounded-full text-xs md:text-sm text-cyan-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* --- LINKS UPDATED --- */}
                  <div className="flex space-x-4 mt-auto">
                    {project.link && project.link !== '#' && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-cyan-400 hover:text-white transition-colors text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.github && project.github !== '#' && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </FloatingElement>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <FloatingElement>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 text-gradient">
              My Skills
            </h2>
          </FloatingElement>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {skillCategories.map((skillCategory, index) => (
              <FloatingElement key={skillCategory.category} delay={index * 0.2}>
                <SkillCategory 
                  category={skillCategory.category}
                  skills={skillCategory.skills}
                  icon={skillCategory.icon}
                  color={skillCategory.color}
                />
              </FloatingElement>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20 relative flex items-center z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FloatingElement>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-gradient">
              Let's Create Something Amazing
            </h2>
          </FloatingElement>
          
          <FloatingElement delay={0.2}>
            <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Ready to bring your wildest digital dreams to life? Let's collaborate and push the boundaries of what's possible.
            </p>
          </FloatingElement>

          {/* --- LINKS UPDATED --- */}
          <FloatingElement delay={0.4}>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
              {contacts.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  aria-label={contact.ariaLabel}
                  target={contact.href.startsWith('mailto:') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="group glass-morphism p-4 md:p-6 rounded-full hover:scale-110 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500"
                >
                  <contact.icon className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-125 transition-transform" />
                </a>
              ))}
            </div>
          </FloatingElement>

          <FloatingElement delay={0.6}>
            <a 
              href="mailto:alabipraise26@gmail.com"
              className="glass-morphism px-8 md:px-12 py-4 md:py-6 rounded-full text-lg md:text-xl font-bold hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 animate-glow inline-block"
            >
              Start a Project
            </a>
          </FloatingElement>
        </div>
      </section>

      {/* Floating Elements */}
      <div className="fixed top-1/4 left-4 md:left-10 opacity-20 z-10">
        <FloatingElement delay={1}>
          <div className="w-3 h-3 md:w-4 md:h-4 bg-cyan-400 rounded-full animate-pulse" />
        </FloatingElement>
      </div>
      <div className="fixed top-1/2 right-4 md:right-10 opacity-20 z-10">
        <FloatingElement delay={1.5}>
          <div className="w-4 h-4 md:w-6 md:h-6 bg-purple-400 rounded-full animate-pulse" />
        </FloatingElement>
      </div>
      <div className="fixed bottom-1/4 left-1/4 opacity-20 z-10">
        <FloatingElement delay={2}>
          <div className="w-2 h-2 md:w-3 md:h-3 bg-pink-400 rounded-full animate-pulse" />
        </FloatingElement>
      </div>

      {/* --- MODIFICATION: Scroll to Top Button --- */}
      <button
        onClick={scrollToTop}
        className={`cursor-pointer fixed bottom-8 right-8 z-50 p-3 rounded-full glass-morphism text-cyan-400 hover:text-white hover:bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 transform hover:scale-110 focus:outline-none ${
          showScrollTopButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Portfolio;