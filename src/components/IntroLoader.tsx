"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface IntroLoaderProps {
  onComplete: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);
  const [isActive, setIsActive] = useState(true);

  useGSAP(
    () => {
      // Prevent body scrolling during loading sequence
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      const tl = gsap.timeline({
        onComplete: () => {
          // Restore body scrolling
          document.body.style.overflow = "";
          document.documentElement.style.overflow = "";
          setIsActive(false);
          onComplete();
        },
      });

      // 1. Percentage counter tween (0 to 100)
      const counter = { value: 0 };
      tl.to(counter, {
        value: 100,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => {
          if (percentRef.current) {
            percentRef.current.textContent = Math.round(counter.value).toString();
          }
        },
      });

      // 2. Staggered brand typography entrance (overlapping with countdown)
      const characters = textContainerRef.current?.querySelectorAll(".char");
      if (characters && characters.length > 0) {
        tl.fromTo(
          characters,
          {
            y: 40,
            opacity: 0,
            rotate: 4,
          },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.8,
            stagger: 0.04,
            ease: "back.out(1.7)",
          },
          "<0.2"
        );
      }

      // 3. Staggered exit fade of counter and text
      tl.to([percentRef.current, textContainerRef.current], {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: "power2.in",
        stagger: 0.1,
      }, "+=0.1");

      // 4. Liquid SVG path pull & slide up transition
      // We start with a full rectangle, morph it to a curved pull, and collapse it to the top.
      const initialPath = "M0,0 L100,0 L100,100 L0,100 Z";
      const curvedPath = "M0,0 L100,0 L100,80 Q50,40 0,80 Z";
      const finalPath = "M0,0 L100,0 L100,0 Q50,0 0,0 Z";

      tl.to(svgPathRef.current, {
        attr: { d: curvedPath },
        duration: 0.6,
        ease: "power3.inOut",
      });

      tl.to(svgPathRef.current, {
        attr: { d: finalPath },
        duration: 0.5,
        ease: "power3.in",
      }, "-=0.15");

      // Slide container up out of view
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 0.7,
        ease: "power3.inOut",
      }, "-=0.5");
    },
    { scope: containerRef }
  );

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none"
      style={{ pointerEvents: "all" }}
    >
      {/* Liquid Wave SVG Background Overlay */}
      <svg
        className="absolute inset-0 w-full h-full fill-olive-primary dark:fill-milky-surface"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path ref={svgPathRef} d="M0,0 L100,0 L100,100 L0,100 Z" />
      </svg>

      {/* Typographic Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center gap-4 px-6">
        {/* Count display */}
        <div className="flex items-baseline text-milky dark:text-olive-primary font-display select-none">
          <span
            ref={percentRef}
            className="text-8xl sm:text-[9.5rem] font-bold tracking-tight leading-none"
          >
            0
          </span>
          <span className="text-4xl sm:text-5xl font-semibold opacity-70 ml-1">%</span>
        </div>

        {/* Brand label */}
        <div
          ref={textContainerRef}
          className="text-matcha font-display font-semibold uppercase tracking-[0.3em] text-xs sm:text-sm overflow-hidden flex justify-center gap-[0.1em]"
        >
          {"VENOXY ARTS".split("").map((char, index) => (
            <span
              key={index}
              className="char inline-block"
              style={{ display: char === " " ? "inline" : "inline-block", width: char === " " ? "0.6em" : "auto" }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
