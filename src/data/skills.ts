export interface Skill {
  name: string;
  level: number;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Mobile",
    skills: [
      { name: "React Native", level: 90, icon: "react" },
      { name: "Flutter", level: 85 },
      { name: "iOS (Swift)", level: 75, icon: "swift" },
      { name: "Android (Kotlin)", level: 78, icon: "kotlin" },
      { name: "Expo", level: 92 },
    ]
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90, icon: "nextdotjs" },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 95, icon: "tailwindcss" },
      { name: "JavaScript", level: 92 },
    ]
  },
  {
    title: "UI & Animation",
    skills: [
      { name: "Figma", level: 85 },
      { name: "CSS Keyframes", level: 90 },
      { name: "Responsive Design", level: 95 },
      { name: "Accessibility (a11y)", level: 88 },
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 80, icon: "nodedotjs" },
      { name: "FastAPI", level: 75 },
      { name: "Django", level: 75 },
      { name: "MongoDB", level: 82 },
      { name: "PostgreSQL", level: 78 },
    ]
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 70 },
      { name: "Vercel", level: 85 },
      { name: "Postman", level: 80 },
    ]
  }
];

export const allTechIcons = [
  "React", "nextdotjs", "TypeScript", "tailwindcss", "nodedotjs", "Python", "FastAPI", 
  "Django", "PostgreSQL", "MongoDB", "Figma", "Git", "Docker", "amazonaws", "Vercel", 
  "HTML5", "CSS3", "JavaScript", "Sass", "Redux", "GraphQL", "Jest"
];
