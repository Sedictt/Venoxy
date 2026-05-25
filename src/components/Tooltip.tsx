"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export function Tooltip({ content, children, position = "top" }: TooltipProps) {
  const [active, setActive] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2.5",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2.5",
    left: "right-full top-1/2 -translate-y-1/2 mr-2.5",
    right: "left-full top-1/2 -translate-y-1/2 ml-2.5",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 -mt-[3px] border-t-matcha dark:border-t-olive-primary border-x-transparent border-b-transparent",
    bottom: "bottom-full left-1/2 -translate-x-1/2 -mb-[3px] border-b-matcha dark:border-b-olive-primary border-x-transparent border-t-transparent",
    left: "left-full top-1/2 -translate-y-1/2 -ml-[3px] border-l-matcha dark:border-l-olive-primary border-y-transparent border-r-transparent",
    right: "right-full top-1/2 -translate-y-1/2 -mr-[3px] border-r-matcha dark:border-r-olive-primary border-y-transparent border-l-transparent",
  };

  const animationVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9, 
      y: position === "top" ? 4 : position === "bottom" ? -4 : 0, 
      x: position === "left" ? 4 : position === "right" ? -4 : 0,
      transition: { duration: 0.1 }
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      y: position === "top" ? 2 : position === "bottom" ? -2 : 0, 
      x: position === "left" ? 2 : position === "right" ? -2 : 0,
      transition: {
        duration: 0.12
      }
    }
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      {children}
      <AnimatePresence>
        {active && (
          <motion.div
            variants={animationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`absolute ${positionClasses[position]} z-[100] pointer-events-none whitespace-nowrap`}
            role="tooltip"
          >
            <div className="bg-matcha dark:bg-olive-primary text-milky-surface text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-[0_8px_16px_rgba(65,70,42,0.15)] border border-milky-surface/10">
              {content}
            </div>
            <div className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
