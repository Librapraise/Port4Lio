import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export const socialLinks = [
  { 
    name: 'GitHub', 
    href: 'https://github.com/Librapraise', 
    icon: Github,
    color: 'hover:text-[#24292F]'
  },
  { 
    name: 'LinkedIn', 
    href: 'https://www.linkedin.com/in/praise-alabi', 
    icon: Linkedin,
    color: 'hover:text-[#0A66C2]'
  },
  { 
    name: 'Twitter', 
    href: 'https://twitter.com/libracrypt', 
    icon: Twitter,
    color: 'hover:text-[#1DA1F2]'
  },
  { 
    name: 'Email', 
    href: 'mailto:alabipraise26@gmail.com', 
    icon: Mail,
    color: 'hover:text-primary'
  },
];
