"use client";

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Code, Palette, Zap, Globe, Star, ArrowRight } from 'lucide-react';

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
      title: "Neural Network Visualizer",
      description: "Interactive 3D visualization of deep learning architectures with real-time training animations.",
      tech: ["Three.js", "React", "WebGL", "TensorFlow.js"],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Quantum Portfolio Optimizer",
      description: "Revolutionary financial tool using quantum algorithms for portfolio optimization.",
      tech: ["Python", "Qiskit", "FastAPI", "React"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "AR Product Configurator",
      description: "Augmented reality application for real-time product customization and visualization.",
      tech: ["WebXR", "Three.js", "Machine Learning", "WebRTC"],
      color: "from-green-500 to-teal-500"
    }
  ];

  const skills = [
    { name: "Frontend Mastery", level: 95, icon: Code, color: "bg-gradient-to-r from-blue-500 to-purple-600" },
    { name: "3D Graphics", level: 90, icon: Palette, color: "bg-gradient-to-r from-purple-500 to-pink-500" },
    { name: "Performance", level: 93, icon: Zap, color: "bg-gradient-to-r from-yellow-500 to-red-500" },
    { name: "Innovation", level: 98, icon: Star, color: "bg-gradient-to-r from-green-500 to-blue-500" }
  ];

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
          <div className="text-2xl font-bold text-gradient animate-glow">
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
      <section id="about" className="min-h-screen flex items-center justify-center relative z-10">
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
              Crafting immersive digital experiences that blur the line between reality and imagination. 
              Specializing in cutting-edge web technologies.
            </p>
          </FloatingElement>

          <FloatingElement delay={0.6}>
            <div className={`flex flex-wrap justify-center gap-6 transition-all duration-1000 delay-600 ${isLoaded ? 'animate-slideInUp' : 'opacity-0'}`}>
              <button className="group glass-morphism px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105">
                <span className="flex items-center space-x-2">
                  <span>View Projects</span>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button className="group glass-morphism px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105">
                <span className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Get in Touch</span>
                </span>
              </button>
            </div>
          </FloatingElement>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <ChevronDown className="w-8 h-8 text-cyan-400 animate-pulse" />
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

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <FloatingElement key={project.title} delay={index * 0.2}>
                <div className="group glass-morphism p-6 md:p-8 rounded-3xl hover:scale-105 transition-all duration-500 cursor-pointer">
                  <div className={`w-full h-32 md:h-48 bg-gradient-to-br ${project.color} rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-all duration-300" />
                    <Globe className="w-12 h-12 md:w-16 md:h-16 text-white group-hover:scale-125 transition-transform duration-300" />
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
                  
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-2 text-cyan-400 hover:text-white transition-colors text-sm">
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm">
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </button>
                  </div>
                </div>
              </FloatingElement>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <FloatingElement>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 text-gradient">
              Skills & Expertise
            </h2>
          </FloatingElement>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {skills.map((skill, index) => (
              <FloatingElement key={skill.name} delay={index * 0.1}>
                <div className="glass-morphism p-6 md:p-8 rounded-3xl group hover:scale-105 transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className={`p-3 md:p-4 rounded-2xl ${skill.color} mr-4 group-hover:scale-110 transition-transform`}>
                      <skill.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2">{skill.name}</h3>
                      <p className="text-gray-400 text-sm md:text-base">Expert Level</p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="w-full bg-gray-800 rounded-full h-3 mb-2">
                      <div 
                        className={`h-3 rounded-full ${skill.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="text-cyan-400 font-bold">{skill.level}%</span>
                  </div>
                </div>
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

          <FloatingElement delay={0.4}>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
              {[
                { icon: Mail, label: 'hello@praisealabi.dev' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Github, label: 'GitHub' }
              ].map((contact, index) => (
                <button
                  key={contact.label}
                  className="group glass-morphism p-4 md:p-6 rounded-full hover:scale-110 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500"
                >
                  <contact.icon className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-125 transition-transform" />
                </button>
              ))}
            </div>
          </FloatingElement>

          <FloatingElement delay={0.6}>
            <button className="glass-morphism px-8 md:px-12 py-4 md:py-6 rounded-full text-lg md:text-xl font-bold hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 animate-glow">
              Start a Project
            </button>
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
    </div>
  );
};

export default Portfolio;