"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Camera, ArrowRight } from "lucide-react";
import { TransitionLink as Link } from "@/components/transitions/PageTransitionProvider";
import { Swanky_and_Moo_Moo } from "next/font/google";

const swanky = Swanky_and_Moo_Moo({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Green Pushpin Component
const Pushpin = ({ className = "" }: { className?: string }) => (
  <div
    className={`absolute w-5 h-5 flex items-center justify-center select-none pointer-events-none z-20 ${className}`}
  >
    {/* Shadow of the pin */}
    <div className="absolute w-4 h-4 rounded-full bg-black/30 blur-[2px] translate-x-1.5 translate-y-2" />
    {/* Pin head */}
    <div className="absolute w-3.5 h-3.5 rounded-full bg-emerald-500 border border-emerald-600 shadow-inner flex items-center justify-center">
      {/* Highlight on pin */}
      <div className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-white/60" />
      {/* Pin needle center dot */}
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-700/40" />
    </div>
    {/* Pin needle shadow/stem representation */}
    <div
      className="absolute bottom-0 w-[2px] h-2 bg-[#5c5c5c]"
      style={{ transform: "rotate(15deg) translateY(4px)" }}
    />
  </div>
);

// Green Smiley Sticker Component
const SmileySticker = ({ className = "" }: { className?: string }) => (
  <motion.div
    whileHover={{ scale: 1.1, rotate: 5 }}
    className={`absolute w-7 h-7 rounded-full bg-[#829c67] border border-[#5d7348] flex items-center justify-center shadow-md select-none pointer-events-auto z-10 ${className}`}
  >
    <svg
      className="w-4 h-4 text-[#e6ecd8]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </motion.div>
);

// CSS Tape Overlay
const StickyTape = ({ className = "" }: { className?: string }) => (
  <div
    className={`absolute w-14 h-5 bg-[#eae2b7]/40 border-l border-r border-[#cfc89e]/30 backdrop-blur-[0.5px] pointer-events-none select-none z-20 ${className}`}
    style={{
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      clipPath:
        "polygon(0% 15%, 5% 0%, 95% 5%, 100% 12%, 98% 85%, 92% 100%, 8% 95%, 0% 80%)",
    }}
  />
);

// Paperclip Component
const Paperclip = ({ className = "" }: { className?: string }) => (
  <div
    className={`absolute w-5 h-10 select-none pointer-events-none z-20 ${className}`}
    style={{ transform: "rotate(-10deg)" }}
  >
    <svg
      viewBox="0 0 20 40"
      fill="none"
      className="w-full h-full drop-shadow-[2px_3px_1px_rgba(0,0,0,0.18)]"
    >
      {/* Red outer band of clip */}
      <path
        d="M3,12 V28 C3,33.5 7.5,38 13,38 C18.5,38 23,33.5 23,28 V8 C23,4 19.5,1 15,1 C10.5,1 7,4 7,8 V26 C7,29 9,31 12,31 C15,31 17,29 17,26 V12"
        stroke="#df5353"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

// Ink Stamps
const InkStamp = ({
  label = "PASSED",
  className = "",
}: {
  label?: string;
  className?: string;
}) => (
  <div
    className={`absolute border-4 border-red-500/25 text-red-500/25 font-mono font-black text-[9px] sm:text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border-double rotate-[-12deg] select-none pointer-events-none ${className}`}
  >
    {label}
  </div>
);

const CircleStamp = ({
  text = "APPROVED",
  className = "",
}: {
  text?: string;
  className?: string;
}) => (
  <div
    className={`absolute w-14 h-14 rounded-full border-2 border-dashed border-emerald-600/25 flex items-center justify-center text-[7.5px] font-sans font-black text-emerald-600/30 uppercase rotate-[15deg] select-none pointer-events-none ${className}`}
  >
    <div className="border border-dotted border-emerald-600/20 rounded-full w-12 h-12 flex items-center justify-center">
      {text}
    </div>
  </div>
);

// High-fidelity perforated Postage Stamp Component
const PostageStamp = ({
  className = "",
  rotation = 5,
  color = "#5d7348",
  label = "5c",
  icon,
}: {
  className?: string;
  rotation?: number;
  color?: string;
  label?: string;
  icon?: React.ReactNode;
}) => (
  <motion.div
    initial={{ rotate: rotation }}
    whileHover={{ scale: 1.12, rotate: rotation + 4, y: -4 }}
    className={`absolute w-12 h-14 select-none pointer-events-auto z-10 flex items-center justify-center filter drop-shadow-[3px_4px_1px_rgba(43,43,42,0.22)] ${className}`}
  >
    {/* Perforated stamp outline SVG - cutouts rendered with color matching corkboard bg */}
    <svg
      viewBox="0 0 100 120"
      className="absolute inset-0 w-full h-full"
      fill="white"
    >
      <rect x="5" y="5" width="90" height="110" rx="2" fill="white" />
      {/* Cutouts top */}
      <circle cx="10" cy="5" r="4" fill="#cfbfa8" />
      <circle cx="26" cy="5" r="4" fill="#cfbfa8" />
      <circle cx="42" cy="5" r="4" fill="#cfbfa8" />
      <circle cx="58" cy="5" r="4" fill="#cfbfa8" />
      <circle cx="74" cy="5" r="4" fill="#cfbfa8" />
      <circle cx="90" cy="5" r="4" fill="#cfbfa8" />
      {/* Cutouts bottom */}
      <circle cx="10" cy="115" r="4" fill="#cfbfa8" />
      <circle cx="26" cy="115" r="4" fill="#cfbfa8" />
      <circle cx="42" cy="115" r="4" fill="#cfbfa8" />
      <circle cx="58" cy="115" r="4" fill="#cfbfa8" />
      <circle cx="74" cy="115" r="4" fill="#cfbfa8" />
      <circle cx="90" cy="115" r="4" fill="#cfbfa8" />
      {/* Cutouts left */}
      <circle cx="5" cy="20" r="4" fill="#cfbfa8" />
      <circle cx="5" cy="40" r="4" fill="#cfbfa8" />
      <circle cx="5" cy="60" r="4" fill="#cfbfa8" />
      <circle cx="5" cy="80" r="4" fill="#cfbfa8" />
      <circle cx="5" cy="100" r="4" fill="#cfbfa8" />
      {/* Cutouts right */}
      <circle cx="95" cy="20" r="4" fill="#cfbfa8" />
      <circle cx="95" cy="40" r="4" fill="#cfbfa8" />
      <circle cx="95" cy="60" r="4" fill="#cfbfa8" />
      <circle cx="95" cy="80" r="4" fill="#cfbfa8" />
      <circle cx="95" cy="100" r="4" fill="#cfbfa8" />
    </svg>

    {/* Inner stamp art */}
    <div className="absolute inset-0 p-2.5 flex flex-col justify-between pointer-events-none">
      <div
        className="w-full h-full flex flex-col justify-between p-1 rounded-sm text-white"
        style={{ backgroundColor: color }}
      >
        <div className="flex justify-between items-start">
          <span className="text-[5px] font-sans font-black tracking-tight leading-none uppercase">
            POST
          </span>
          <span className="text-[6px] font-sans font-black leading-none">
            {label}
          </span>
        </div>
        <div className="flex-grow flex items-center justify-center my-0.5">
          {icon}
        </div>
        <div className="text-center text-[4px] font-sans font-black tracking-wider leading-none">
          JOSEPH V.
        </div>
      </div>
    </div>
  </motion.div>
);

// Pinned Star Sticker Component
const StarSticker = ({
  className = "",
  rotation = 0,
}: {
  className?: string;
  rotation?: number;
}) => (
  <motion.div
    initial={{ rotate: rotation }}
    whileHover={{ scale: 1.12, rotate: rotation + 5 }}
    className={`absolute w-7 h-7 select-none pointer-events-auto z-10 ${className}`}
    style={{
      filter: "drop-shadow(2px 3px 1px rgba(43,43,42,0.18))",
    }}
  >
    <svg
      viewBox="0 0 24 24"
      fill="#f4d068"
      className="w-full h-full stroke-[2px] stroke-[#2b2b2a]"
    >
      <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z" />
    </svg>
  </motion.div>
);

// High-fidelity physical coffee stain ring
const CoffeeStain = ({ className = "" }: { className?: string }) => (
  <div
    className={`absolute w-32 h-32 rounded-full border-[3px] border-[#8b5a2b]/15 border-dashed pointer-events-none select-none z-10 ${className}`}
    style={{
      filter: "blur(0.8px)",
      boxShadow: "inset 0 0 12px rgba(139, 90, 43, 0.05)",
      transform: "rotate(35deg)",
    }}
  >
    <div className="absolute inset-1.5 rounded-full border border-[#8b5a2b]/10 border-double" />
    <div className="absolute top-1/4 -right-1 w-4 h-6 rounded-full bg-[#8b5a2b]/8 blur-[2px] rotate-12" />
    <div className="absolute bottom-1/3 left-4 w-3 h-3 rounded-full bg-[#8b5a2b]/6 blur-[1.5px]" />
  </div>
);

// Highly detailed mechanical yellow/green wooden pencil vector
const RealisticPencil = ({ className = "" }: { className?: string }) => (
  <motion.div
    whileHover={{ rotate: 18, y: -2 }}
    className={`absolute w-44 h-4 pointer-events-auto select-none z-30 cursor-grab active:cursor-grabbing ${className}`}
    style={{
      transform: "rotate(15deg)",
      filter: "drop-shadow(3px 4px 2px rgba(0,0,0,0.22))",
    }}
  >
    <div className="absolute inset-0 bg-yellow-500 rounded-sm border-t border-yellow-400 border-b border-yellow-600 flex">
      <div className="h-full w-full bg-gradient-to-y from-yellow-400 via-yellow-500 to-yellow-600 flex flex-col justify-between">
        <div className="h-[1px] bg-yellow-300/40 w-full" />
        <div className="h-[2px] bg-yellow-600/30 w-full" />
        <div className="h-[1px] bg-yellow-300/40 w-full" />
      </div>
      <div className="w-6 h-full bg-gradient-to-r from-green-700 via-green-600 to-green-800 border-l border-zinc-700 shrink-0 flex items-center justify-around px-0.5">
        <div className="w-[1px] h-full bg-yellow-300/40" />
        <div className="w-[1px] h-full bg-yellow-300/40" />
      </div>
      <div className="w-4 h-full bg-gradient-to-r from-rose-400 via-rose-300 to-rose-500 rounded-r-sm shrink-0" />
    </div>
    <div
      className="absolute -left-4 top-0 bottom-0 w-4 bg-[#e8c39e] border-l border-yellow-600"
      style={{
        clipPath: "polygon(100% 0%, 0% 50%, 100% 100%)",
      }}
    />
    <div
      className="absolute -left-4 top-1 bottom-1 w-1.5 bg-zinc-800"
      style={{
        clipPath: "polygon(100% 0%, 0% 50%, 100% 100%)",
      }}
    />
  </motion.div>
);

// Sticker Container Component
const Sticker = ({
  children,
  label,
  rotation = 0,
  xOffset = 0,
  yOffset = 0,
  pinPos = "top",
  textColor = "text-[#2b2b2a]",
}: {
  children: React.ReactNode;
  label: string;
  rotation?: number;
  xOffset?: number;
  yOffset?: number;
  pinPos?: "top" | "none";
  textColor?: string;
}) => {
  const hoverRotation = rotation + (rotation >= 0 ? 4 : -4);

  return (
    <motion.div
      initial={{ rotate: rotation, x: xOffset, y: yOffset }}
      whileHover={{
        scale: 1.15,
        rotate: hoverRotation,
        x: xOffset,
        y: yOffset - 8,
        zIndex: 30,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
      className="relative flex flex-col items-center justify-between select-none cursor-grab active:cursor-grabbing z-10 w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] p-1"
    >
      {pinPos === "top" && (
        <Pushpin className="-top-3.5 left-1/2 -translate-x-1/2 scale-110" />
      )}
      <div
        className="w-full flex-grow flex items-center justify-center min-h-0"
        style={{
          filter: `
            drop-shadow(2.5px 0 0 #ffffff)
            drop-shadow(-2.5px 0 0 #ffffff)
            drop-shadow(0 2.5px 0 #ffffff)
            drop-shadow(0 -2.5px 0 #ffffff)
            drop-shadow(1.8px 1.8px 0 #ffffff)
            drop-shadow(-1.8px -1.8px 0 #ffffff)
            drop-shadow(1.8px -1.8px 0 #ffffff)
            drop-shadow(-1.8px 1.8px 0 #ffffff)
            drop-shadow(4px 5px 1px rgba(43,43,42,0.22))
          `,
        }}
      >
        {children}
      </div>
      <span
        className={`text-[9px] sm:text-[11px] font-sans font-black tracking-tight mt-2.5 text-center w-full leading-none truncate select-none ${textColor}`}
      >
        {label}
      </span>
    </motion.div>
  );
};

// Blurred foreground paper plane — rendered as if close to the camera lens
// Parallax: drifts as the section scrolls through the viewport
const BlurredPaperPlane = ({ sectionRef }: { sectionRef: React.RefObject<HTMLDivElement | null> }) => {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <div className="absolute inset-0 pointer-events-none z-[9999] select-none">
      <motion.div style={{ y: parallaxY }}>
        <motion.img
          src="/assets/skills & tools/paper_plane.png"
          alt=""
          aria-hidden="true"
          animate={{
            y: [0, -10, 0],
            x: [0, 5, 0],
            rotate: [7, 11, 7],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute h-auto object-contain"
          style={{
            left: -290,
            bottom: -260,
            width: 950,
            filter: "blur(6px)",
          }}
        />
      </motion.div>
    </div>
  );
};

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative w-full py-16 sm:py-24 bg-milky transition-colors duration-500 overflow-visible"
      style={{
        backgroundImage: `
          linear-gradient(color-mix(in srgb, var(--theme-olive-primary) 7%, transparent) 1px, transparent 1px),
          linear-gradient(90deg, color-mix(in srgb, var(--theme-olive-primary) 7%, transparent) 1px, transparent 1px)
        `,
        backgroundSize: "28px 28px",
      }}
    >
      {/* Realistic blurred Polaroid paper plane flying in the foreground */}
      <BlurredPaperPlane sectionRef={containerRef} />

      {/* Realistic physical coffee ring stains stamped on the desk grid paper */}
      <CoffeeStain className="bottom-12 left-10 opacity-[0.55] scale-110 sm:scale-125" />
      <CoffeeStain className="top-14 right-[8%] opacity-[0.4] rotate-[130deg] scale-90 sm:scale-100" />

      {/* Mechanical yellow/green wooden pencils resting casually on the background desk */}
      <RealisticPencil className="bottom-14 right-[16%] rotate-[-22deg] hidden md:block scale-110" />
      <RealisticPencil className="top-8 left-[6%] rotate-[35deg] hidden lg:block scale-95 opacity-[0.85]" />

      {/* Header Image for Title */}
      <div className="relative max-w-4xl mx-auto flex flex-col items-center justify-center mb-10 sm:mb-14 px-4 select-none pointer-events-none">
        <motion.div
          initial={{ y: -30, opacity: 0, scale: 0.95 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
          className="relative z-10 w-full max-w-[620px] flex items-center justify-center pointer-events-auto"
        >
          <img
            src="/assets/skills & tools/title.png"
            alt="Skills & Tech Stack"
            className="w-full h-auto object-contain filter drop-shadow-[8px_12px_4px_rgba(0,0,0,0.22)] transition-transform duration-300 hover:scale-[1.03]"
          />
        </motion.div>
      </div>

      {/* Grid of Three Corkboards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-14 relative z-10">
        {/* Connection Wires Overlay (SVG layer) - hidden on mobile */}
        <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
          <svg
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Green connection wire 1: Dev Tools to Creative Brief */}
            <path
              d="M 360,250 C 420,230 460,330 520,310"
              stroke="#5d7348"
              strokeWidth="3.5"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />
            {/* Node on wire 1 */}
            <circle cx="440" cy="275" r="7" fill="#5d7348" />
            <foreignObject x="410" y="290" width="60" height="24">
              <div className="bg-[#5d7348] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-[#3e4f30] text-center rotate-[-6deg] uppercase">
                BUILD
              </div>
            </foreignObject>

            {/* Green connection wire 2: Creative Brief to Design Suite */}
            <path
              d="M 760,280 C 820,300 860,380 920,340"
              stroke="#5d7348"
              strokeWidth="3.5"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />
            {/* Node on wire 2 */}
            <circle cx="840" cy="320" r="7" fill="#5d7348" />
            <foreignObject x="810" y="335" width="60" height="24">
              <div className="bg-[#5d7348] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded border border-[#3e4f30] text-center rotate-[4deg] uppercase">
                DESIGN
              </div>
            </foreignObject>
          </svg>
        </div>

        {/* --- CORKBOARD 1: DEV TOOLS --- */}
        <motion.div
          initial={{ rotate: -2, y: 30, opacity: 0 }}
          whileInView={{ rotate: -1.5, y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative min-h-[440px] sm:min-h-[460px] p-6 flex flex-col bg-[#cfbfa8] border-[6px] border-[#553c2b] shadow-[10px_16px_3px_rgba(0,0,0,0.24)] overflow-hidden"
          style={{
            backgroundImage: "url('/assets/skills & tools/corkboard.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Top Tapes & Pins for Panel */}
          <StickyTape className="-top-2 left-6 rotate-[-12deg] w-20" />
          <Pushpin className="top-2 left-1/2 -translate-x-1/2 scale-125" />
          <SmileySticker className="top-3 right-4 rotate-[15deg] scale-110" />

          {/* Decorative items for ambience */}
          <StarSticker className="top-16 left-3 rotate-[-15deg] scale-90" />
          <PostageStamp
            className="bottom-4 right-4"
            rotation={12}
            color="#5d7348"
            label="10c"
            icon={
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-emerald-100"
                fill="currentColor"
              >
                <path d="M12 2a2 2 0 00-2 2c0 .5.2.9.5 1.2A3.5 3.5 0 007 8.5c0 .5.2.9.5 1.2A3.5 3.5 0 004 13.5c0 1.9 1.6 3.5 3.5 3.5.5 0 .9-.2 1.2-.5A3.5 3.5 0 0012 20a2 2 0 002-2c0-.5-.2-.9-.5-1.2a3.5 3.5 0 003.5-3.3c0-.5-.2-.9-.5-1.2A3.5 3.5 0 0020 8.5c0-1.9-1.6-3.5-3.5-3.5-.5 0-.9.2-1.2.5A3.5 3.5 0 0012 2z" />
              </svg>
            }
          />

          {/* Label Header */}
          <div className="self-center bg-[#faf9f5] border-2 border-[#2b2b2a] shadow-[2px_2px_0px_0px_rgba(43,43,42,1)] px-4 py-1.5 rotate-[-1.5deg] mb-8 mt-2">
            <h3 className="font-display font-black text-base sm:text-lg text-[#2b2b2a] tracking-wider uppercase leading-none">
              DEV TOOLS
            </h3>
          </div>

          {/* Stickers Grid */}
          <div className="grid grid-cols-3 gap-y-8 gap-x-4 sm:gap-x-6 justify-items-center items-center mt-auto mb-auto">
            {/* REACT STICKER */}
            <Sticker label="React" rotation={-8} xOffset={-5} yOffset={-8}>
              <img
                src="/assets/skills & tools/React.svg"
                alt="React"
                className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
              />
            </Sticker>

            {/* NEXT.JS STICKER */}
            <Sticker label="Next.js" rotation={6} xOffset={6} yOffset={8}>
              <img
                src="/assets/skills & tools/Next.js.svg"
                alt="Next.js"
                className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
              />
            </Sticker>

            {/* TYPESCRIPT STICKER */}
            <Sticker label="TypeScript" rotation={-5} xOffset={-8} yOffset={-3}>
              <img
                src="/assets/skills & tools/TypeScript.svg"
                alt="TypeScript"
                className="w-9 h-9 sm:w-13 sm:h-13 object-contain"
              />
            </Sticker>

            {/* TAILWIND CSS STICKER */}
            <Sticker label="Tailwind" rotation={9} xOffset={4} yOffset={-10}>
              <img
                src="/assets/skills & tools/Tailwind CSS.png"
                alt="Tailwind CSS"
                className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
              />
            </Sticker>

            {/* POSTGRESQL STICKER */}
            <Sticker label="PostgreSQL" rotation={-4} xOffset={-3} yOffset={8}>
              <img
                src="/assets/skills & tools/PostgresSQL.svg"
                alt="PostgreSQL"
                className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
              />
            </Sticker>

            {/* GIT STICKER */}
            <Sticker label="Git" rotation={11} xOffset={8} yOffset={-2}>
              <img
                src="/assets/skills & tools/Git.svg"
                alt="Git"
                className="w-9 h-9 sm:w-13 sm:h-13 object-contain"
              />
            </Sticker>
          </div>
        </motion.div>

        {/* --- CORKBOARD 2: FOCUS & PASSIONS (TEXT-BASED) --- */}
        <motion.div
          initial={{ rotate: 1, y: 30, opacity: 0 }}
          whileInView={{ rotate: 0.5, y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative min-h-[440px] sm:min-h-[460px] p-6 flex flex-col bg-[#cfbfa8] border-[6px] border-[#553c2b] shadow-[10px_16px_3px_rgba(0,0,0,0.24)] overflow-hidden z-10"
          style={{
            backgroundImage: "url('/assets/skills & tools/corkboard.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Top Tapes & Pins for Panel */}
          <StickyTape className="-top-2 right-12 rotate-[8deg] w-20" />
          <Pushpin className="top-2 left-1/3 -translate-x-1/2 scale-125" />
          <Pushpin className="top-2 left-2/3 -translate-x-1/2 scale-125" />

          {/* Faded ink stamp directly stamped on corkboard */}
          <InkStamp
            label="CREATIVE LAB"
            className="bottom-4 right-4 rotate-[-15deg] opacity-70"
          />

          {/* Decorative stamp for Middle */}
          <PostageStamp
            className="bottom-4 left-4"
            rotation={-8}
            color="#48829c"
            label="50c"
            icon={
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-blue-100"
                fill="currentColor"
              >
                <path d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm8 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
              </svg>
            }
          />
          <StarSticker className="bottom-24 right-4 rotate-[15deg] scale-95" />

          {/* Label Header */}
          <div className="self-center bg-[#faf9f5] border-2 border-[#2b2b2a] shadow-[2px_2px_0px_0px_rgba(43,43,42,1)] px-4 py-1.5 rotate-[0.5deg] mb-6 mt-2 relative">
            <StickyTape className="-top-2 -right-3 rotate-[25deg] w-8 h-3.5" />
            <h3 className="font-display font-black text-base sm:text-lg text-[#2b2b2a] tracking-wider uppercase leading-none">
              CREATIVE PROFILE
            </h3>
          </div>

          {/* Lined notebook paper index card for Core Skills */}
          <div
            className="bg-[#fdfbdf] border-2 border-[#2b2b2a] shadow-[4px_5px_1px_rgba(43,43,42,0.22)] p-5 sm:p-6 rotate-[-1.5deg] relative flex flex-col"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)",
              backgroundSize: "100% 26px",
              lineHeight: "26px",
            }}
          >
            {/* Paperclip in corner */}
            <Paperclip className="-top-4 -left-3 rotate-[-15deg] scale-125 z-30" />

            {/* Circular Ink Stamp on the card */}
            <CircleStamp
              text="PORTFOLIO LAB"
              className="top-1 -right-2 scale-90 rotate-[-10deg] opacity-65"
            />

            {/* Sticky tape on card bottom corner */}
            <StickyTape className="-bottom-1 -right-3 rotate-[-30deg] w-12 h-4 opacity-75" />

            {/* Red margin line */}
            <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-red-400/40" />
            <div className={`pl-4 select-text ${swanky.className}`}>
              <h4 className="text-[15px] sm:text-[17px] uppercase tracking-wider text-[#2b2b2a] border-b border-[#2b2b2a] pb-1 mb-2 font-bold leading-none">
                [ Focus Areas ]
              </h4>
              <ul className="text-[14.5px] sm:text-[16.5px] leading-[26px] text-[#111111] font-bold space-y-0.5">
                <li className="flex items-center">
                  <span className="text-[#e05a5a] font-black mr-2 select-none">
                    ✓
                  </span>{" "}
                  Web Dev & UI/UX Design
                </li>
                <li className="flex items-center">
                  <span className="text-[#e05a5a] font-black mr-2 select-none">
                    ✓
                  </span>{" "}
                  Graphics Design
                </li>
                <li className="flex items-center">
                  <span className="text-[#e05a5a] font-black mr-2 select-none">
                    ✓
                  </span>{" "}
                  Game Development & Art
                </li>
                <li className="flex items-center">
                  <span className="text-[#e05a5a] font-black mr-2 select-none">
                    ✓
                  </span>{" "}
                  Video Editing & Media
                </li>
                <li className="flex items-center">
                  <span className="text-[#e05a5a] font-black mr-2 select-none">
                    ✓
                  </span>{" "}
                  Traditional & Digital Art
                </li>
              </ul>
            </div>
          </div>

          {/* Yellow sticky note quote card for Interests/Passions */}
          <div
            className="bg-[#ffe169] border-2 border-[#2b2b2a] shadow-[4px_5px_1px_rgba(43,43,42,0.22)] p-5 rotate-[3.5deg] relative w-full max-w-[220px] sm:max-w-[240px] self-center mt-8 flex flex-col items-center justify-center select-none"
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 88%, 88% 100%, 0% 100%)",
            }}
          >
            {/* Translucent tape holding sticky note top */}
            <StickyTape className="-top-3 left-1/2 -translate-x-1/2 rotate-[-5deg] w-12 h-3.5 z-20" />
            <Pushpin className="-top-4 left-1/2 -translate-x-1/2 scale-100 z-30" />

            <div className={`text-center select-text ${swanky.className}`}>
              <h4 className="text-[14px] sm:text-[16px] text-[#2b2b2a] tracking-wider uppercase mb-1 font-bold leading-none">
                [ Creative Passions ]
              </h4>
              <div className="text-[13.5px] sm:text-[15.5px] text-emerald-950 font-bold space-y-1">
                <p>Filmmaking & Cinematography</p>
                <p>Photography & Storyboarding</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- CORKBOARD 3: DESIGN SUITE --- */}
        <motion.div
          initial={{ rotate: 1, y: 30, opacity: 0 }}
          whileInView={{ rotate: 0.5, y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative min-h-[440px] sm:min-h-[460px] p-6 flex flex-col bg-[#cfbfa8] border-[6px] border-[#553c2b] shadow-[10px_16px_3px_rgba(0,0,0,0.24)] overflow-hidden"
          style={{
            backgroundImage: "url('/assets/skills & tools/corkboard.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Top Tapes & Pins for Panel */}
          <StickyTape className="-top-3 right-8 rotate-[15deg] w-24" />
          <Pushpin className="top-2 left-1/2 -translate-x-1/2 scale-125" />
          <SmileySticker className="top-4 left-4 rotate-[-12deg] scale-110" />

          {/* Decorative items for Ambience */}
          <StarSticker className="bottom-4 left-4 rotate-[-10deg] scale-95" />
          <PostageStamp
            className="top-12 right-4"
            rotation={14}
            color="#df8a49"
            label="25c"
            icon={
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-orange-100"
                fill="currentColor"
              >
                <path d="M12 6.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm0-6a1 1 0 0 1 .993.883L13 3.5v1a1 1 0 0 1-1.993.117L11 4.5v-1a1 1 0 0 1 1-1zm0 15a1 1 0 0 1 .993.883L13 19.5v1a1 1 0 0 1-1.993.117L11 20.5v-1a1 1 0 0 1 1-1zm-8.5-9a1 1 0 0 1 .883.993L4.5 13h-1a1 1 0 0 1-.117-1.993L3.5 11h1a1 1 0 0 1 1 0zm15 0a1 1 0 0 1 .883.993L19.5 13h-1a1 1 0 0 1-.117-1.993L18.5 11h1a1 1 0 0 1 1 0z" />
              </svg>
            }
          />

          {/* Label Header */}
          <div className="self-center bg-[#faf9f5] border-2 border-[#2b2b2a] shadow-[2px_2px_0px_0px_rgba(43,43,42,1)] px-4 py-1.5 rotate-[2deg] mb-8 mt-2">
            <h3 className="font-display font-black text-base sm:text-lg text-[#2b2b2a] tracking-wider uppercase leading-none">
              DESIGN SUITE
            </h3>
          </div>

          {/* Stickers Grid */}
          <div className="grid grid-cols-3 gap-y-8 gap-x-4 sm:gap-x-6 justify-items-center items-center mt-auto mb-auto">
            {/* FIGMA STICKER */}
            <Sticker label="Figma" rotation={7} xOffset={-6} yOffset={-5}>
              <img
                src="/assets/skills & tools/Figma.svg"
                alt="Figma"
                className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
              />
            </Sticker>

            {/* PHOTOSHOP STICKER */}
            <Sticker label="Photoshop" rotation={-8} xOffset={8} yOffset={6}>
              <img
                src="/assets/skills & tools/Adobe Photoshop.svg"
                alt="Photoshop"
                className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
              />
            </Sticker>

            {/* ILLUSTRATOR STICKER */}
            <Sticker
              label="Illustrator"
              rotation={-6}
              xOffset={-5}
              yOffset={-10}
            >
              <img
                src="/assets/skills & tools/Adobe Illustrator.svg"
                alt="Illustrator"
                className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
              />
            </Sticker>

            {/* CANVA STICKER */}
            <Sticker label="Canva" rotation={10} xOffset={10} yOffset={-3}>
              <img
                src="/assets/skills & tools/Canva.svg"
                alt="Canva"
                className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
              />
            </Sticker>

            {/* AFTER EFFECTS STICKER */}
            <Sticker
              label="After Effects"
              rotation={-5}
              xOffset={-3}
              yOffset={8}
            >
              <img
                src="/assets/skills & tools/After Effects.svg"
                alt="After Effects"
                className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
              />
            </Sticker>
          </div>
        </motion.div>
      </div>

      {/* Gallery CTA */}
      <div className="flex justify-center mt-16 sm:mt-20 px-4 relative z-20">
        <Link
          href="/gallery"
          className="group relative inline-flex w-full max-w-[680px] -rotate-[1.5deg] overflow-visible text-center transition-all duration-300 hover:-translate-y-1 hover:rotate-[0.5deg] sm:w-auto"
        >
          <StickyTape className="-top-3 left-8 rotate-[-10deg] w-16 h-4 opacity-80" />
          <Pushpin className="-top-4 right-8 scale-105" />
          <span
            className="relative inline-flex w-full flex-col items-center gap-3 overflow-hidden border-2 border-[#2b2b2a] bg-[#fdfbdf] px-5 py-5 shadow-[6px_7px_1px_rgba(43,43,42,0.22)] transition-all duration-300 group-hover:bg-[#fff7c8] group-hover:shadow-[8px_10px_1px_rgba(43,43,42,0.24)] sm:w-auto sm:flex-row sm:gap-4 sm:px-7 sm:py-4"
            style={{
              clipPath:
                "polygon(0% 0%, 100% 0%, 100% 78%, 94% 100%, 0% 100%)",
            }}
          >
            <span className="absolute bottom-0 right-0 h-0 w-0 border-b-[22px] border-l-[34px] border-b-[#ded5a7] border-l-transparent shadow-[-2px_-2px_0_rgba(43,43,42,0.2)]" />
            <span className="flex h-12 w-12 shrink-0 rotate-[-4deg] items-center justify-center border-2 border-[#2b2b2a] bg-[#5d7348] text-[#faf9f5] shadow-[3px_3px_0_rgba(43,43,42,0.22)] transition-transform duration-300 group-hover:rotate-[3deg] group-hover:scale-105">
              <Camera className="h-5 w-5" />
            </span>
            <span className="flex min-w-0 flex-col gap-1 leading-tight sm:text-left">
              <span className="font-display text-[11px] font-black uppercase tracking-widest text-[#5d7348]">
                Photography & design gallery
              </span>
              <span className="text-sm font-black uppercase tracking-wider text-[#2b2b2a] sm:text-base">
                Explore my Creative Archive
              </span>
            </span>
            <ArrowRight className="h-5 w-5 shrink-0 text-[#5d7348] transition-transform duration-300 group-hover:translate-x-1.5" />
          </span>
        </Link>
      </div>
    </section>
  );
}
