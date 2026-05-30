"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { ArrowUpRight, X, ArrowRight, ArrowUp, ChevronLeft, ChevronRight, Maximize2, ZoomIn, ZoomOut, Heart } from "lucide-react";
import { Tooltip } from "./Tooltip";
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
    <div className="absolute w-4 h-4 rounded-full bg-black/30 blur-[2px] translate-x-1.5 translate-y-2" />
    <div className="absolute w-3.5 h-3.5 rounded-full bg-emerald-500 border border-emerald-600 shadow-inner flex items-center justify-center">
      <div className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-white/60" />
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-700/40" />
    </div>
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
  label = "APPROVED",
  className = "",
  colorClass = "border-red-500/25 text-red-500/25",
}: {
  label?: string;
  className?: string;
  colorClass?: string;
}) => (
  <div
    className={`absolute border-4 font-mono font-black text-[9px] sm:text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border-double rotate-[-12deg] select-none pointer-events-none ${colorClass} ${className}`}
  >
    {label}
  </div>
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
    whileHover={{ rotate: -18, y: -2 }}
    className={`absolute w-44 h-4 pointer-events-auto select-none z-30 cursor-grab active:cursor-grabbing ${className}`}
    style={{
      transform: "rotate(-15deg)",
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
    <svg
      viewBox="0 0 100 120"
      className="absolute inset-0 w-full h-full"
      fill="white"
    >
      <rect x="5" y="5" width="90" height="110" rx="2" fill="white" />
      <circle cx="10" cy="5" r="4" fill="#cfbfa8" />
      <circle cx="26" cy="5" r="4" fill="#cfbfa8" />
      <circle cx="42" cy="5" r="4" fill="#cfbfa8" />
      <circle cx="58" cy="5" r="4" fill="#cfbfa8" />
      <circle cx="74" cy="5" r="4" fill="#cfbfa8" />
      <circle cx="90" cy="5" r="4" fill="#cfbfa8" />
      <circle cx="10" cy="115" r="4" fill="#cfbfa8" />
      <circle cx="26" cy="115" r="4" fill="#cfbfa8" />
      <circle cx="42" cy="115" r="4" fill="#cfbfa8" />
      <circle cx="58" cy="115" r="4" fill="#cfbfa8" />
      <circle cx="74" cy="115" r="4" fill="#cfbfa8" />
      <circle cx="90" cy="115" r="4" fill="#cfbfa8" />
      <circle cx="5" cy="20" r="4" fill="#cfbfa8" />
      <circle cx="5" cy="40" r="4" fill="#cfbfa8" />
      <circle cx="5" cy="60" r="4" fill="#cfbfa8" />
      <circle cx="5" cy="80" r="4" fill="#cfbfa8" />
      <circle cx="5" cy="100" r="4" fill="#cfbfa8" />
      <circle cx="95" cy="20" r="4" fill="#cfbfa8" />
      <circle cx="95" cy="40" r="4" fill="#cfbfa8" />
      <circle cx="95" cy="60" r="4" fill="#cfbfa8" />
      <circle cx="95" cy="80" r="4" fill="#cfbfa8" />
      <circle cx="95" cy="100" r="4" fill="#cfbfa8" />
    </svg>
    <div className="absolute inset-0 p-2.5 flex flex-col justify-between pointer-events-none">
      <div
        className="w-full h-full flex flex-col justify-between p-1 rounded-sm text-white"
        style={{ backgroundColor: color }}
      >
        <div className="flex justify-between items-start">
          <span className="text-[5px] font-sans font-black tracking-tight leading-none uppercase">
            PROJ
          </span>
          <span className="text-[6px] font-sans font-black leading-none">
            {label}
          </span>
        </div>
        <div className="flex-grow flex items-center justify-center my-0.5">
          {icon}
        </div>
        <div className="text-center text-[4px] font-sans font-black tracking-wider leading-none">
          CREATIVE
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

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  role: string;
  year: string;
  tags: string[];
  link: string;
  color: string;
  thumbnail: string;
  images: string[];
  isThumbnailPortrait: boolean;
}

interface ProjectsProps {
  initialProjects?: Project[];
}

export default function Projects({ initialProjects = [] }: ProjectsProps) {
  const projects = initialProjects;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [galleryPage, setGalleryPage] = useState(1);
  const [lightboxImageIndex, setLightboxImageIndex] = useState<number | null>(null);
  const [longImages, setLongImages] = useState<Record<string, boolean>>({});
  const [portraitImages, setPortraitImages] = useState<Record<string, boolean>>({});
  const [zoomScale, setZoomScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const screenshotsSectionRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const ITEMS_PER_PAGE = 4;

  const galleryImages = selectedProject
    ? selectedProject.images
      .filter(img => img !== selectedProject.thumbnail)
      .sort((a, b) => {
        const aLower = a.toLowerCase();
        const bLower = b.toLowerCase();
        const aKey = aLower.includes("dashboard") || aLower.includes("home") || aLower.includes("overview");
        const bKey = bLower.includes("dashboard") || bLower.includes("home") || bLower.includes("overview");
        if (aKey && !bKey) return -1;
        if (!aKey && bKey) return 1;
        return 0;
      })
    : [];

  const totalPages = selectedProject ? Math.ceil(galleryImages.length / ITEMS_PER_PAGE) : 0;
  const paginatedImages = selectedProject ? galleryImages.slice(
    (galleryPage - 1) * ITEMS_PER_PAGE,
    galleryPage * ITEMS_PER_PAGE
  ) : [];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      document.documentElement.classList.add("modal-open");
      window.dispatchEvent(new CustomEvent("toggle-lenis", { detail: "stop" }));
    } else {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("modal-open");
      window.dispatchEvent(new CustomEvent("toggle-lenis", { detail: "start" }));
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("modal-open");
      window.dispatchEvent(new CustomEvent("toggle-lenis", { detail: "start" }));
    };
  }, [selectedProject]);

  // Reset zoom scale and drag offsets when lightbox image changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setZoomScale(1);
    dragX.set(0);
    dragY.set(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxImageIndex]);

  // Centering reset when zoomScale is reset to 1
  useEffect(() => {
    if (zoomScale === 1) {
      dragX.set(0);
      dragY.set(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoomScale]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const zoomFactor = e.deltaY < 0 ? 0.15 : -0.15;
    setZoomScale(prev => Math.min(4, Math.max(1, prev + zoomFactor)));
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxImageIndex === null || !selectedProject) return;
      if (e.key === "ArrowLeft") {
        setLightboxImageIndex(prev =>
          prev !== null ? (prev - 1 + selectedProject.images.length) % selectedProject.images.length : null
        );
      } else if (e.key === "ArrowRight") {
        setLightboxImageIndex(prev =>
          prev !== null ? (prev + 1) % selectedProject.images.length : null
        );
      } else if (e.key === "Escape") {
        setLightboxImageIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImageIndex, selectedProject]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>, src: string) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (naturalHeight > naturalWidth) {
      setPortraitImages(prev => ({ ...prev, [src]: true }));
    }
    
    const isMobile = selectedProject?.id.toLowerCase().includes("mobile") || selectedProject?.title.toLowerCase().includes("mobile");
    const ratio = naturalHeight / naturalWidth;
    
    // Classify as long vertical screenshot if:
    // - Non-mobile project and ratio > 1.25
    // - Mobile project and ratio > 2.2 (truly long scrollable screen)
    if ((!isMobile && ratio > 1.25) || (isMobile && ratio > 2.2)) {
      setLongImages(prev => ({ ...prev, [src]: true }));
    }
  };

  const formatImageTitle = (src: string, projectId: string) => {
    const filename = src.split("/").pop()?.split(".")[0] || "";
    if (filename.toLowerCase() === "main") return "Main Overview";

    let title = filename;
    const lowerProjId = projectId.toLowerCase();
    if (title.toLowerCase().startsWith(lowerProjId)) {
      title = title.substring(projectId.length);
    }

    title = title.replace(/^[-_]+|[-_]+$/g, "");
    title = title.replace(/[-_]+/g, " ");
    return title.split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setGalleryPage(1);
    setLightboxImageIndex(null);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    setSelectedProject(projects[nextIndex]);
    setGalleryPage(1);
    setLightboxImageIndex(null);
    const modalContainer = document.getElementById("projectModalContainer");
    if (modalContainer) {
      modalContainer.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePageChange = (page: number) => {
    setGalleryPage(page);
    setTimeout(() => {
      if (screenshotsSectionRef.current) {
        screenshotsSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };


  return (
    <>
      <section
        id="projects"
        ref={containerRef}
        className="relative py-20 sm:py-28 w-full bg-milky transition-colors duration-500 overflow-visible"
        style={{
          backgroundImage: `
            linear-gradient(color-mix(in srgb, var(--theme-olive-primary) 7%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in srgb, var(--theme-olive-primary) 7%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      >
      {/* Decorative High-Fidelity Chalk Doodles in the background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 opacity-[0.24] sm:opacity-[0.32] mix-blend-multiply">
        <img 
          src="/assets/chalk/cloud.png" 
          alt="" 
          loading="lazy"
          className="absolute top-[6%] right-[-6%] w-[260px] sm:w-[350px] h-auto rotate-[-8deg]"
        />
        <img 
          src="/assets/chalk/swirl.png" 
          alt="" 
          loading="lazy"
          className="absolute top-[18%] left-[2%] w-20 sm:w-28 h-auto rotate-[10deg]"
        />
        <img 
          src="/assets/chalk/star.png" 
          alt="" 
          loading="lazy"
          className="absolute bottom-[35%] left-[4%] w-10 sm:w-14 h-auto rotate-[-15deg]"
        />
        <img 
          src="/assets/chalk/frog.png" 
          alt="" 
          loading="lazy"
          className="absolute bottom-[18%] right-[-5%] w-[200px] sm:w-[260px] h-auto rotate-[15deg]"
        />
      </div>

      {/* Background Ambience / Desk Elements */}
      <CoffeeStain className="top-12 left-8 opacity-[0.45] scale-110 select-none pointer-events-none" />
      <CoffeeStain className="bottom-24 right-12 opacity-[0.35] rotate-[120deg] scale-125 select-none pointer-events-none" />
      
      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="flex flex-col items-center mb-24 text-center relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >

          <img
            src="/Projects/projects-title.png"
            alt="Projects Title"
            loading="lazy"
            className="w-auto h-24 sm:h-68 md:h-72 object-contain select-none pointer-events-auto filter drop-shadow-[8px_12px_4px_rgba(0,0,0,0.18)] transition-transform duration-300 hover:scale-[1.03]"
          />
        </motion.div>

        {/* Projects Grid of Physical Watercolor/Polaroid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-12 md:gap-y-16">
          {projects.map((project, index) => {
            // Alternate rotations and physical clip elements for realistic desk sprawl
            const baseRotation = index % 2 === 0 ? -1.8 : 1.5;
            const hasTape = index % 3 === 0;
            const hasPushpin = index % 3 === 1;
            const hasPaperclip = index % 3 === 2;

            return (
              <motion.div
                key={project.id}
                onClick={() => handleOpenModal(project)}
                className="flex flex-col cursor-pointer group relative bg-[#faf9f5] border-2 border-[#2b2b2a] p-6 shadow-[6px_8px_2.5px_rgba(65,70,42,0.22)] hover:shadow-[12px_16px_5px_rgba(65,70,42,0.26)] transition-shadow duration-300"
                initial={{ opacity: 0, y: 50, rotate: baseRotation }}
                whileInView={{ opacity: 1, y: 0, rotate: baseRotation }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{
                  scale: 1.025,
                  rotate: 0,
                  y: -10,
                  zIndex: 20,
                }}
                transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.1] }}
                style={{ transformOrigin: "center", willChange: "transform" }}
              >
                {/* Physical Top Fasteners */}
                {hasTape && <StickyTape className="-top-3 left-1/2 -translate-x-1/2 rotate-[-4deg] scale-110" />}
                {hasPushpin && <Pushpin className="-top-4.5 left-1/2 -translate-x-1/2 scale-110" />}
                {hasPaperclip && <Paperclip className="-top-5.5 left-8 rotate-[12deg] scale-125 z-30" />}

                {/* Overlapping stamps on the Polaroid cards for visual flair */}
                {index === 0 && (
                  <InkStamp
                    label="LATEST WORK"
                    className="top-12 -right-3 rotate-[12deg] z-20"
                    colorClass="border-red-500/30 text-red-500/30"
                  />
                )}
                {index === 1 && (
                  <InkStamp
                    label="INTERACTIVE"
                    className="top-10 -right-2 rotate-[-8deg] z-20"
                    colorClass="border-emerald-600/35 text-emerald-600/35"
                  />
                )}
                {index === 2 && (
                  <InkStamp
                    label="UI / UX BEST"
                    className="top-14 -right-4 rotate-[15deg] z-20"
                    colorClass="border-blue-600/30 text-blue-600/30"
                  />
                )}

                {/* Polaroid Photo Frame */}
                <div className={`w-full rounded-none overflow-hidden border-2 border-[#2b2b2a] bg-milky-surface relative shadow-sm transition-all duration-500 ${
                  project.isThumbnailPortrait ? "aspect-[10/13] max-w-[340px] mx-auto" : "aspect-[16/10]"
                }`}>
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top filter contrast-[1.02] brightness-[0.98]"
                  />
                  <div className="absolute inset-0 bg-[#8b5a2b]/0 group-hover:bg-[#8b5a2b]/5 transition-colors duration-500" />
                  
                  {/* Custom postage stamp badge inside card photo */}
                  <PostageStamp
                    className="bottom-3 right-3 scale-[0.65]"
                    rotation={-10}
                    color={index % 2 === 0 ? "#5d7348" : "#48829c"}
                    label={project.year}
                    icon={<Heart className="w-5 h-5 text-white fill-white" />}
                  />
                </div>

                {/* Polaroid Handwritten Style Content Bottom */}
                <div className="flex justify-between items-end mt-6 pt-4 border-t border-dashed border-[#2b2b2a]/20">
                  <div className="flex-grow select-text">
                    <span className={`text-[13px] uppercase font-bold tracking-widest text-[#7a8155] block mb-1 ${swanky.className}`}>
                      {project.role} • {project.year}
                    </span>
                    <h3 className="font-display font-black text-2xl text-[#2b2b2a] group-hover:text-matcha transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className={`text-olive-secondary font-medium text-[15px] mt-1.5 leading-snug max-w-[90%] ${swanky.className}`}>
                      {project.description}
                    </p>
                  </div>
                  <div className="w-10 h-10 shrink-0 rounded-full border-2 border-[#2b2b2a] flex items-center justify-center text-[#2b2b2a] group-hover:bg-matcha group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-[2px_2px_0px_0px_rgba(43,43,42,1)] bg-[#faf9f5]">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Star Sticker overlapping some of the cards randomly */}
                {index % 2 === 0 && (
                  <StarSticker className="-bottom-3.5 -left-3 rotate-[-15deg] scale-95" />
                )}
                {index === 1 && (
                  <SmileySticker className="-bottom-4 -right-3 rotate-[12deg] scale-110" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Modern Slide-up Full Screen Modal Details */}
    <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-full bg-milky/98 z-50 overflow-y-auto"
            id="projectModalContainer"
            data-lenis-prevent="true"
          >
            {/* Modal Close Floating Button */}
            <div className="fixed top-8 right-8 z-50">
              <Tooltip content="Close details" position="left">
                <button
                  onClick={handleCloseModal}
                  className="w-14 h-14 rounded-full bg-milky-surface border border-matcha/30 hover:border-matcha hover:bg-matcha hover:text-milky-surface flex items-center justify-center cursor-pointer transition-all duration-300 shadow-[0_8px_24px_rgba(65,70,42,0.08)] group"
                  aria-label="Close Details Modal"
                >
                  <X className="w-6 h-6 transition-transform duration-500 group-hover:rotate-90" />
                </button>
              </Tooltip>
            </div>

            {/* Scrollable Container */}
            <div className="max-w-[1100px] mx-auto px-6 py-24 min-h-screen flex flex-col">
              {/* Header */}
              <motion.div
                className="mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="inline-block bg-matcha text-milky-surface text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-4">
                  {selectedProject.year}
                </span>
                <h2 className="font-display font-bold text-4xl sm:text-7xl text-olive-primary tracking-tight leading-none mb-4">
                  {selectedProject.title}
                </h2>
                <p className="text-olive-secondary text-lg sm:text-2xl max-w-[800px] font-medium leading-relaxed">
                  {selectedProject.description}
                </p>
              </motion.div>

              {/* Info Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-12 sm:gap-16 mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex flex-col">
                  <h4 className="text-xs uppercase font-bold tracking-widest text-olive-secondary mb-4">
                    Overview
                  </h4>
                  <p className="text-olive-primary text-base sm:text-lg leading-relaxed mb-6">
                    {selectedProject.longDescription}
                  </p>
                  <a
                    href={selectedProject.link}
                    className="inline-flex items-center self-start gap-2 bg-olive-primary text-milky-surface font-display font-bold uppercase text-xs tracking-widest px-8 py-4 rounded-md shadow-md hover:bg-matcha-hover hover:-translate-y-1 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Live App
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="flex flex-col gap-6">
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-widest text-olive-secondary mb-2">
                      Role
                    </h4>
                    <p className="text-olive-primary font-bold text-lg">
                      {selectedProject.role}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-widest text-olive-secondary mb-3">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-milky-surface border border-matcha/20 text-olive-primary text-xs font-semibold px-3 py-1.5 rounded-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Showcase Graphic */}
              <motion.div
                onClick={() => setLightboxImageIndex(0)}
                className={`w-full rounded-[40px] overflow-hidden border-[3px] border-matcha shadow-sm mb-20 bg-milky-surface cursor-pointer relative group/hero ${selectedProject.isThumbnailPortrait
                  ? "aspect-[10/16] max-w-[400px] mx-auto"
                  : "aspect-[16/10]"
                  }`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              >
                <img src={selectedProject.thumbnail} alt={selectedProject.title} className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-matcha/5 opacity-0 group-hover/hero:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-milky-surface/90 backdrop-blur-sm border border-matcha/30 flex items-center justify-center text-olive-primary shadow-md transform scale-90 group-hover/hero:scale-100 transition-all duration-300">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>

              {/* Screenshots Gallery Section */}
              <div ref={screenshotsSectionRef} className="mt-6 mb-20 border-t border-matcha/20 pt-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                  <div>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-olive-primary">
                      Screenshots Gallery
                    </h3>
                    <p className="text-olive-secondary text-sm font-semibold mt-1">
                      Explore detailed interfaces and key systems of {selectedProject.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 self-end md:self-auto">
                    <div className="text-xs uppercase font-bold tracking-widest text-olive-secondary bg-milky-surface px-4 py-2 border border-matcha/20 rounded-md">
                      Page {galleryPage} of {totalPages} ({galleryImages.length} Total)
                    </div>
                    {totalPages > 1 && (
                      <div className="flex gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePageChange(Math.max(1, galleryPage - 1));
                          }}
                          disabled={galleryPage === 1}
                          className="w-9 h-9 rounded-full border border-matcha/30 flex items-center justify-center text-olive-primary disabled:opacity-30 disabled:pointer-events-none hover:bg-matcha hover:text-milky-surface hover:border-matcha cursor-pointer transition-all duration-300 shadow-sm bg-milky-surface"
                          aria-label="Previous Page"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePageChange(Math.min(totalPages, galleryPage + 1));
                          }}
                          disabled={galleryPage === totalPages}
                          className="w-9 h-9 rounded-full border border-matcha/30 flex items-center justify-center text-olive-primary disabled:opacity-30 disabled:pointer-events-none hover:bg-matcha hover:text-milky-surface hover:border-matcha cursor-pointer transition-all duration-300 shadow-sm bg-milky-surface"
                          aria-label="Next Page"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Image Grid with Framer Motion layout animations */}
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 gap-8"
                >
                  <AnimatePresence mode="popLayout">
                    {paginatedImages.map((src, pageIdx) => {
                      const absoluteIdx = selectedProject.images.indexOf(src);
                      const isLong = !!longImages[src];
                      const title = formatImageTitle(src, selectedProject.id);

                      return (
                        <motion.div
                          key={src}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: pageIdx * 0.05 }}
                          onClick={() => setLightboxImageIndex(absoluteIdx)}
                          className="flex flex-col gap-3 group/card cursor-pointer"
                        >
                          {/* Card Graphic Container */}
                          <div
                            className={`w-full rounded-[24px] border-2 border-matcha/20 hover:border-matcha/60 bg-milky-surface overflow-hidden shadow-sm hover:shadow-[0_12px_24px_rgba(65,70,42,0.12)] transition-all duration-300 flex items-center justify-center relative ${
                              portraitImages[src] || selectedProject.id.toLowerCase().includes("mobile") || selectedProject.title.toLowerCase().includes("mobile")
                                ? "aspect-[10/16] max-w-[320px] mx-auto"
                                : "aspect-[16/10]"
                            }`}
                          >
                            <img
                              src={src}
                              alt={title}
                              onLoad={(e) => handleImageLoad(e, src)}
                              className={`w-full h-full transition-transform duration-500 group-hover/card:scale-[1.03] ${
                                portraitImages[src] || selectedProject.id.toLowerCase().includes("mobile") || selectedProject.title.toLowerCase().includes("mobile")
                                  ? "object-cover object-top"
                                  : isLong
                                    ? "object-cover object-top"
                                    : "object-cover object-center"
                              }`}
                            />

                            {/* Bottom Truncation Gradient Overlay & Action Badge */}
                            {isLong && (
                              <>
                                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-milky-surface via-milky-surface/85 to-transparent pointer-events-none z-10 transition-colors duration-300" />
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-milky-surface/90 backdrop-blur-md border border-matcha/30 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-[10px] font-bold text-olive-primary uppercase tracking-widest shadow-md pointer-events-none group-hover/card:scale-105 group-hover/card:bg-matcha group-hover/card:text-milky-surface group-hover/card:border-matcha transition-all duration-300 z-20">
                                  <Maximize2 className="w-3 h-3" />
                                  <span>View Full Screen</span>
                                </div>
                              </>
                            )}

                            {/* standard hover zoom-in glass badge */}
                            {!isLong && (
                              <div className="absolute inset-0 bg-matcha/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                                <div className="w-10 h-10 rounded-full bg-milky-surface/90 backdrop-blur-sm border border-matcha/30 flex items-center justify-center text-olive-primary shadow-md transform scale-90 group-hover/card:scale-100 transition-all duration-300">
                                  <Maximize2 className="w-4 h-4" />
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Captions / Meta under graphic */}
                          <div className="flex justify-between items-start px-2 mt-1">
                            <div>
                              <h4 className="font-display font-bold text-base text-olive-primary group-hover/card:text-matcha transition-colors duration-200">
                                {title}
                              </h4>
                              <p className="text-olive-secondary font-semibold text-xs mt-0.5">
                                {isLong ? "Vertical Screenshot • Click to view" : "Landscape View • Click to zoom"}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>

                {/* Pagination Navigation controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-12">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePageChange(Math.max(1, galleryPage - 1));
                      }}
                      disabled={galleryPage === 1}
                      className="w-10 h-10 rounded-full border border-matcha/30 flex items-center justify-center text-olive-primary disabled:opacity-30 disabled:pointer-events-none hover:bg-matcha hover:text-milky-surface hover:border-matcha cursor-pointer transition-all duration-300"
                      aria-label="Previous Page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePageChange(page);
                        }}
                        className={`w-10 h-10 rounded-full font-display font-bold text-xs cursor-pointer transition-all duration-300 ${galleryPage === page
                          ? "bg-matcha text-milky-surface border border-matcha shadow-sm"
                          : "bg-milky-surface border border-matcha/20 text-olive-primary hover:border-matcha hover:bg-matcha/5"
                          }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePageChange(Math.min(totalPages, galleryPage + 1));
                      }}
                      disabled={galleryPage === totalPages}
                      className="w-10 h-10 rounded-full border border-matcha/30 flex items-center justify-center text-olive-primary disabled:opacity-30 disabled:pointer-events-none hover:bg-matcha hover:text-milky-surface hover:border-matcha cursor-pointer transition-all duration-300"
                      aria-label="Next Page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Modal Extension Footer */}
              <div className="mt-auto border-t border-matcha/20 pt-16">
                <span className="block text-center text-xs uppercase font-bold tracking-widest text-olive-secondary mb-6">
                  Next Project
                </span>

                {/* Next Project Block Button */}
                {(() => {
                   const nextProjIndex = (projects.findIndex((p) => p.id === selectedProject.id) + 1) % projects.length;
                   const nextProj = projects[nextProjIndex];
                   return (
                     <div
                       onClick={handleNextProject}
                       className="flex items-center justify-between bg-milky-surface border border-matcha/30 hover:border-matcha hover:shadow-md p-6 rounded-[30px] cursor-pointer transition-all duration-300 max-w-[800px] mx-auto group"
                     >
                       <div className="flex items-center gap-6">
                         <div className={`rounded-md overflow-hidden bg-milky flex-shrink-0 border border-matcha/10 transition-all flex items-center justify-center ${
                           nextProj.isThumbnailPortrait ? "w-11 h-16" : "w-20 h-14"
                         }`}>
                           <img
                             src={nextProj.thumbnail}
                             alt="Next Project Thumbnail"
                             className="w-full h-full object-cover object-top"
                           />
                         </div>
                         <div>
                           <h3 className="font-display font-bold text-lg text-olive-primary">
                             {nextProj.title}
                           </h3>
                           <p className="text-olive-secondary text-xs font-medium">
                             {nextProj.description}
                           </p>
                         </div>
                       </div>
                       <div className="w-12 h-12 rounded-full bg-milky flex items-center justify-center text-olive-primary group-hover:bg-matcha group-hover:text-milky-surface transition-all duration-300">
                         <ArrowRight className="w-5 h-5" />
                       </div>
                     </div>
                   );
                 })()}

                {/* Return/Actions */}
                <div className="flex flex-col items-center gap-12 mt-16 mb-8">
                  <button
                    onClick={() => {
                      const modalContainer = document.getElementById("projectModalContainer");
                      if (modalContainer) {
                        modalContainer.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className="flex flex-col items-center gap-2 font-display text-xs font-bold uppercase tracking-widest text-olive-secondary hover:text-matcha group cursor-pointer transition-colors duration-300"
                  >
                    <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />
                    Back to Top
                  </button>

                  <div className="w-full flex flex-col sm:flex-row gap-6 justify-between items-center text-xs text-olive-secondary border-t border-matcha/10 pt-8">
                    <div className="flex gap-6">
                      <a href="https://linkedin.com/in/joseph-venedict-tillo-232231398" target="_blank" rel="noopener noreferrer" className="hover:text-matcha font-bold">LinkedIn</a>
                      <a href="https://github.com/Sedictt" target="_blank" rel="noopener noreferrer" className="hover:text-matcha font-bold">GitHub</a>
                    </div>
                    <div className="text-center sm:text-right">
                      <p>&copy; 2026 Venoxy. All rights reserved.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox / Fullscreen Maximize View */}
      <AnimatePresence>
        {lightboxImageIndex !== null && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-full bg-black/95 backdrop-blur-md z-[100] flex flex-col justify-between items-center py-6 select-none"
            onClick={() => setLightboxImageIndex(null)}
            data-lenis-prevent="true"
          >
            {/* Lightbox Header with Title & Info */}
            <div
              className="w-full max-w-[1100px] px-6 flex justify-between items-center text-white/90 z-50 mt-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <h4 className="font-display font-bold text-lg sm:text-xl">
                  {formatImageTitle(selectedProject.images[lightboxImageIndex], selectedProject.id)}
                </h4>
                <p className="text-white/50 text-xs sm:text-sm mt-0.5 font-semibold">
                  Screenshot {lightboxImageIndex + 1} of {selectedProject.images.length}
                </p>
              </div>
              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {/* Close Button */}
                <Tooltip content="Close view" position="bottom">
                  <button
                    onClick={() => setLightboxImageIndex(null)}
                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 flex items-center justify-center cursor-pointer transition-all duration-300 group"
                    aria-label="Close Lightbox"
                  >
                    <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
                  </button>
                </Tooltip>
              </div>
            </div>

            {/* Main Image Container */}
            <div
              className="w-full flex-grow flex flex-col items-center justify-center relative px-4 my-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation - Left Arrow */}
              <div className="absolute left-6 z-50 max-sm:left-2">
                <Tooltip content="Previous Image" position="right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxImageIndex(prev =>
                        prev !== null ? (prev - 1 + selectedProject.images.length) % selectedProject.images.length : null
                      );
                    }}
                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 flex items-center justify-center text-white cursor-pointer transition-all duration-300"
                    aria-label="Previous Screenshot"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                </Tooltip>
              </div>

              {/* The Image Display with Zoom capabilities */}
              <div
                onWheel={handleWheel}
                className={`relative max-w-[90vw] max-h-[66vh] transition-all duration-300 ${
                  longImages[selectedProject.images[lightboxImageIndex]] && zoomScale === 1
                    ? "overflow-y-auto h-[66vh] max-h-[66vh] w-auto aspect-[10/16] max-w-[90vw] bg-zinc-900/40 border border-white/10 rounded-lg p-2 custom-lightbox-scrollbar"
                    : `flex items-center justify-center rounded-lg bg-black/20 ${zoomScale > 1 ? "overflow-visible" : "overflow-hidden"}`
                }`}
              >
                <motion.img
                  key={selectedProject.images[lightboxImageIndex]}
                  src={selectedProject.images[lightboxImageIndex]}
                  alt={formatImageTitle(selectedProject.images[lightboxImageIndex], selectedProject.id)}
                  drag={zoomScale > 1}
                  dragConstraints={{
                    left: -500 * (zoomScale - 1),
                    right: 500 * (zoomScale - 1),
                    top: -400 * (zoomScale - 1),
                    bottom: 400 * (zoomScale - 1)
                  }}
                  dragElastic={0}
                  dragMomentum={false}
                  animate={{
                    scale: zoomScale
                  }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  style={{
                    x: dragX,
                    y: dragY,
                    cursor: zoomScale > 1 ? "grab" : "default"
                  }}
                  className={`shadow-2xl rounded-sm select-none ${
                    longImages[selectedProject.images[lightboxImageIndex]] && zoomScale === 1
                      ? "w-full h-auto object-contain object-top"
                      : "max-w-full max-h-[64vh] object-contain"
                  }`}
                />
              </div>

              {/* Floating Zoom Control Bar under the image */}
              <div className="flex items-center gap-3 bg-white/[0.04] border border-white/10 px-4 py-2 rounded-full mt-4 backdrop-blur-md shadow-lg select-none z-50">
                <button
                  onClick={() => setZoomScale(prev => Math.max(1, prev - 0.25))}
                  className="text-white/60 hover:text-matcha active:scale-95 transition-all cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                <input
                  type="range"
                  min="1"
                  max="4"
                  step="0.05"
                  value={zoomScale}
                  onChange={(e) => setZoomScale(parseFloat(e.target.value))}
                  className="w-24 sm:w-36 h-1 bg-white/20 hover:bg-white/30 rounded-lg appearance-none cursor-pointer accent-matcha outline-none transition-all"
                />

                <button
                  onClick={() => setZoomScale(prev => Math.min(4, prev + 0.25))}
                  className="text-white/60 hover:text-matcha active:scale-95 transition-all cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                <span className="text-[10px] text-white/50 font-bold font-mono min-w-[30px] text-right">
                  {Math.round(zoomScale * 100)}%
                </span>

                {zoomScale > 1 && (
                  <button
                    onClick={() => setZoomScale(1)}
                    className="text-[9px] text-matcha font-extrabold uppercase tracking-wider pl-3 border-l border-white/10 hover:text-white cursor-pointer transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Navigation - Right Arrow */}
              <div className="absolute right-6 z-50 max-sm:right-2">
                <Tooltip content="Next Image" position="left">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxImageIndex(prev =>
                        prev !== null ? (prev + 1) % selectedProject.images.length : null
                      );
                    }}
                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 flex items-center justify-center text-white cursor-pointer transition-all duration-300"
                    aria-label="Next Screenshot"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </Tooltip>
              </div>
            </div>

            {/* Lightbox Footer controls */}
            <div
              className="w-full max-w-[800px] px-6 text-center text-white/40 text-xs flex justify-center items-center gap-4 z-50 mb-4"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="max-sm:hidden font-semibold">Press Left/Right arrows or click navigation to browse • Use range slider to zoom & drag to pan</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
