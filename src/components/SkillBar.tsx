"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useEffect, useState } from "react";
import { clsx } from "clsx";

interface SkillBarProps {
  name: string;
  level: number;
  delay?: number;
}

export const SkillBar = ({ name, level, delay = 0 }: SkillBarProps) => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });
  const [activeBlocks, setActiveBlocks] = useState(0);

  useEffect(() => {
    if (isIntersecting) {
      const targetBlocks = Math.round(level / 10);
      const timer = setTimeout(() => {
        let current = 0;
        const interval = setInterval(() => {
          if (current < targetBlocks) {
            current++;
            setActiveBlocks(current);
          } else {
            clearInterval(interval);
          }
        }, 100);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isIntersecting, level, delay]);

  return (
    <div ref={ref} className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-text-primary">{name}</span>
        <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded">{level}%</span>
      </div>
      
      <div className="flex gap-1.5 h-3">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={clsx(
              "flex-1 rounded-sm transition-all duration-500",
              i < activeBlocks 
                ? "bg-gradient-to-r from-primary to-secondary" 
                : "bg-surface border border-card"
            )}
          />
        ))}
      </div>
    </div>
  );
};
