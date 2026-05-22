"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

type SkillData = {
  id: string;
  type: string;
  content?: string;
  src?: string;
  top: string;
  left: string;
  speed: number;
  scale: number;
  floatDuration: number;
  floatDelay: number;
};

const SkillNode = ({ skill, scrollYProgress }: { skill: SkillData, scrollYProgress: MotionValue<number> }) => {
  const yTransform = useTransform(scrollYProgress, [0, 1], [0, skill.speed * 500]);

  return (
    <motion.div
      className="absolute z-0 select-none flex items-center justify-center"
      style={{
        top: skill.top,
        left: skill.left,
        y: yTransform,
        scale: skill.scale,
      }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: skill.floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: skill.floatDelay,
        }}
        whileHover={{ scale: 1.15, y: -5 }}
        className="relative group flex items-center justify-center transition-all duration-300 cursor-pointer"
      >
        {skill.type === "text" ? (
          <span className="font-display font-bold tracking-tight text-olive-primary text-3xl sm:text-5xl opacity-70 group-hover:opacity-100 group-hover:text-matcha transition-colors duration-300 drop-shadow-sm">
            {skill.content}
          </span>
        ) : (
          <div className="w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            <img 
              src={skill.src} 
              alt={`${skill.id} logo`}
              className="w-full h-full object-contain filter drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = `<span class="font-display font-bold tracking-tight text-olive-primary text-3xl sm:text-5xl drop-shadow-sm capitalize">${skill.id}</span>`;
              }}
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// Array of base skills with their absolute positions and parallax speeds
const baseSkillsData = [
  { id: "typescript_text", type: "text", content: "TypeScript", top: "15%", left: "15%", speed: -0.6, scale: 1.3 },
  { id: "nextjs_text", type: "text", content: "Next.js", top: "25%", left: "40%", speed: -0.2, scale: 0.9 },
  { id: "gsap", type: "text", content: "GSAP", top: "45%", left: "10%", speed: 0.4, scale: 0.8 },
  { id: "framer_text", type: "text", content: "Framer", top: "35%", left: "28%", speed: -0.1, scale: 0.7 },
  
  // Image nodes (User will provide these in public/skills)
  { id: "react", type: "image", src: "/skills/react.png", top: "50%", left: "55%", speed: 0.2, scale: 1.5 },
  { id: "nextjs", type: "image", src: "/skills/nextjs.png", top: "20%", left: "80%", speed: -0.8, scale: 1.4 },
  { id: "typescript", type: "image", src: "/skills/typescript.png", top: "55%", left: "75%", speed: -0.4, scale: 1.3 },
  { id: "framer", type: "image", src: "/skills/framer.png", top: "45%", left: "25%", speed: 0.5, scale: 1.4 },
  
  { id: "motiondev", type: "text", content: "Motion.dev", top: "75%", left: "20%", speed: -0.3, scale: 0.9 },
  { id: "tailwind", type: "text", content: "Tailwind", top: "70%", left: "60%", speed: 0.3, scale: 0.8 },
];

// Pre-calculate random values outside of render to keep components pure
const skillsData = baseSkillsData.map(skill => ({
  ...skill,
  floatDuration: 4 + (Math.random() * 3),
  floatDelay: Math.random() * 2,
}));

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within this section for the parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section 
      id="skills" 
      ref={containerRef} 
      className="relative w-full h-[120vh] min-h-[800px] bg-milky transition-colors duration-500"
    >
      {/* Background/Foreground Scattered Nodes */}
      {skillsData.map((skill) => (
        <SkillNode key={skill.id} skill={skill} scrollYProgress={scrollYProgress} />
      ))}

      {/* Center Fixed Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
        {/* Massive glowing orb behind center text */}
        <div className="absolute w-[80vw] h-[80vw] max-w-[800px] bg-matcha/40 dark:bg-matcha/20 blur-[120px] rounded-full pointer-events-none -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center pointer-events-auto transition-colors duration-500 z-10 flex flex-col items-center gap-6"
        >
          <h2 className="font-display font-black text-6xl sm:text-8xl text-olive-primary tracking-tight leading-none drop-shadow-xl transition-colors duration-500">
            My Skillsets
          </h2>
          <span className="inline-block bg-milky-surface text-matcha font-bold uppercase tracking-widest text-sm px-6 py-2 rounded-full shadow-md transition-colors duration-500 border border-matcha/20">
            Technologies I love
          </span>
        </motion.div>
      </div>
    </section>
  );
}
