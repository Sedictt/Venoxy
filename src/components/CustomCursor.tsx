"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "hover" | "view">("default");
  const [visible, setVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 30, stiffness: 300, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isClickable = target.closest("a, button, [role='button'], .project-card, input, textarea, select");
      const isProjectCard = target.closest(".project-card");

      if (isProjectCard) {
        setCursorType("view");
      } else if (isClickable) {
        setCursorType("hover");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, visible]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50 flex items-center justify-center border border-matcha/20"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
        opacity: visible ? 1 : 0,
      }}
      animate={{
        width: cursorType === "view" ? 72 : cursorType === "hover" ? 44 : 16,
        height: cursorType === "view" ? 72 : cursorType === "hover" ? 44 : 16,
        backgroundColor: 
          cursorType === "view" 
            ? "#F6F3DF" 
            : cursorType === "hover" 
              ? "#9EA76B" 
              : "rgba(158, 167, 107, 0.4)",
        boxShadow: cursorType === "view" ? "0 8px 24px rgba(65, 70, 42, 0.15)" : "none",
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
    >
      {cursorType === "view" && (
        <span className="text-olive-primary text-[10px] font-bold tracking-widest uppercase">
          View
        </span>
      )}
      {cursorType === "hover" && (
        <span className="w-1.5 h-1.5 rounded-full bg-milky" />
      )}
    </motion.div>
  );
}
