"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { TransitionLink as Link } from "@/components/transitions/PageTransitionProvider";

interface CreativeItem {
  id: string;
  src: string;
  title: string;
  category: "photography" | "design";
  description: string;
  details: string;
}

interface CreativeGalleryProps {
  initialItems?: CreativeItem[];
}

export default function CreativeGallery({ initialItems = [] }: CreativeGalleryProps) {
  const [activeTab, setActiveTab] = useState<"all" | "photography" | "design">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter items based on active category tab
  const filteredItems = initialItems.filter(item => {
    if (activeTab === "all") return true;
    return item.category === activeTab;
  });

  // Balance columns stably using global indices to prevent items from jumping columns during filtering transitions
  const leftColItems = filteredItems.filter(
    item => initialItems.findIndex(i => i.id === item.id) % 2 === 0
  );
  const rightColItems = filteredItems.filter(
    item => initialItems.findIndex(i => i.id === item.id) % 2 !== 0
  );

  // Lock body scroll when lightbox modal is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
      document.documentElement.classList.add("modal-open");
    } else {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("modal-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("modal-open");
    };
  }, [lightboxIndex]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null || filteredItems.length === 0) return;
      if (e.key === "ArrowLeft") {
        setLightboxIndex(prev => 
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
        );
      } else if (e.key === "ArrowRight") {
        setLightboxIndex(prev => 
          prev !== null ? (prev + 1) % filteredItems.length : null
        );
      } else if (e.key === "Escape") {
        setLightboxIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  const tabs: { id: "all" | "photography" | "design"; label: string }[] = [
    { id: "all", label: "All Works" },
    { id: "photography", label: "Photography" },
    { id: "design", label: "Graphic Design" }
  ];

  return (
    <section className="pt-16 pb-24 min-h-screen w-full bg-milky relative transition-colors duration-500">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Header / Nav Section (Optimized for height to showcase gallery items above the fold) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b border-matcha/20 pb-8">
          {/* Left Column: Navigation link & Page title */}
          <div className="flex flex-col items-start gap-3.5">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-olive-secondary hover:text-matcha font-bold text-sm uppercase tracking-widest group transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1.5" />
              Back to Home
            </Link>
            
            <div className="flex flex-col">
              <span className="inline-block bg-matcha text-milky-surface text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-2 self-start">
                Creative Outlet
              </span>
              <h1 className="font-display font-bold text-4xl sm:text-5xl text-olive-primary tracking-tight">
                Arts & Visuals
              </h1>
            </div>
          </div>

          {/* Right Column: Tab Switcher (Aligned horizontally on desktop, stacks gracefully on mobile) */}
          <div className="flex items-center self-start md:self-end">
            <div className="flex border-2 border-matcha bg-milky-surface/80 backdrop-blur-md rounded-full p-1.5 shadow-sm">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setLightboxIndex(null);
                    }}
                    className={`relative px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer z-10 transition-colors duration-300 ${
                      isActive ? "text-milky-surface animate-none" : "text-olive-secondary hover:text-olive-primary"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFilterBg"
                        className="absolute inset-0 bg-matcha rounded-full -z-10"
                        transition={{ type: "tween", ease: [0.25, 1, 0.5, 1], duration: 0.35 }}
                      />
                    )}
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Masonry Columns Grid */}
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full border border-matcha/30 flex items-center justify-center text-olive-secondary mb-4">
              <Maximize2 className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="font-display font-bold text-xl text-olive-primary mb-1">
              Creative Gallery is Empty
            </h3>
            <p className="text-olive-secondary text-sm max-w-[400px]">
              Drop your custom photos and designs inside <code className="bg-milky-surface/80 px-2 py-0.5 border border-matcha/10 rounded">public/Creative/Photography</code> and <code className="bg-milky-surface/80 px-2 py-0.5 border border-matcha/10 rounded">public/Creative/Design</code> folders to showcase them here dynamically!
            </p>
          </div>
        ) : (
          <LayoutGroup id="creative-gallery">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start w-full">
              {/* Left Column Stack */}
              <div className="flex flex-col gap-8 w-full relative">
                <AnimatePresence mode="popLayout">
                  {leftColItems.map((item) => {
                    const originalIndex = filteredItems.findIndex(i => i.id === item.id);
                    return (
                      <motion.div
                        layout
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.96, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: -20 }}
                        whileHover={{ y: -8 }}
                        transition={{
                          opacity: { duration: 0.25 },
                          scale: { duration: 0.35, ease: [0.25, 1, 0.5, 1] },
                          y: { duration: 0.35, ease: [0.25, 1, 0.5, 1] },
                          layout: { type: "tween", ease: [0.25, 1, 0.5, 1], duration: 0.4 }
                        }}
                        onClick={() => setLightboxIndex(originalIndex)}
                        className="w-full rounded-[32px] overflow-hidden border-[3px] border-matcha bg-milky-surface relative cursor-pointer group shadow-sm hover:shadow-[0_20px_40px_rgba(158,167,107,0.25)] transition-shadow duration-300"
                      >
                        {/* Visual Asset */}
                        <img 
                          src={item.src} 
                          alt={item.title} 
                          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />

                        {/* Dark Glass Overlay & Meta */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 text-white">
                          <span className="inline-block bg-matcha text-milky-surface text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm mb-2 self-start">
                            {item.category === "photography" ? "Photography" : "Design"}
                          </span>
                          <div className="flex justify-between items-end">
                            <div>
                              <h3 className="font-display font-bold text-xl tracking-tight leading-snug">
                                {item.title}
                              </h3>
                              <p className="text-white/60 text-xs font-semibold mt-1">
                                {item.details}
                              </p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-milky-surface/90 backdrop-blur-sm border border-matcha/30 flex items-center justify-center text-olive-primary shadow-md transform scale-90 group-hover:scale-100 transition-all duration-300">
                              <Maximize2 className="w-4 h-4 text-matcha" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Right Column Stack */}
              <div className="flex flex-col gap-8 w-full relative">
                <AnimatePresence mode="popLayout">
                  {rightColItems.map((item) => {
                    const originalIndex = filteredItems.findIndex(i => i.id === item.id);
                    return (
                      <motion.div
                        layout
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.96, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: -20 }}
                        whileHover={{ y: -8 }}
                        transition={{
                          opacity: { duration: 0.25 },
                          scale: { duration: 0.35, ease: [0.25, 1, 0.5, 1] },
                          y: { duration: 0.35, ease: [0.25, 1, 0.5, 1] },
                          layout: { type: "tween", ease: [0.25, 1, 0.5, 1], duration: 0.4 }
                        }}
                        onClick={() => setLightboxIndex(originalIndex)}
                        className="w-full rounded-[32px] overflow-hidden border-[3px] border-matcha bg-milky-surface relative cursor-pointer group shadow-sm hover:shadow-[0_20px_40px_rgba(158,167,107,0.25)] transition-shadow duration-300"
                      >
                        {/* Visual Asset */}
                        <img 
                          src={item.src} 
                          alt={item.title} 
                          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />

                        {/* Dark Glass Overlay & Meta */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 text-white">
                          <span className="inline-block bg-matcha text-milky-surface text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm mb-2 self-start">
                            {item.category === "photography" ? "Photography" : "Design"}
                          </span>
                          <div className="flex justify-between items-end">
                            <div>
                              <h3 className="font-display font-bold text-xl tracking-tight leading-snug">
                                {item.title}
                              </h3>
                              <p className="text-white/60 text-xs font-semibold mt-1">
                                {item.details}
                              </p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-milky-surface/90 backdrop-blur-sm border border-matcha/30 flex items-center justify-center text-olive-primary shadow-md transform scale-90 group-hover:scale-100 transition-all duration-300">
                              <Maximize2 className="w-4 h-4 text-matcha" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </LayoutGroup>
        )}
      </div>

      {/* Immersive Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-full bg-black/96 backdrop-blur-md z-[100] flex flex-col justify-between items-center py-6 select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Lightbox Header with Title & Details */}
            <div 
              className="w-full max-w-[1100px] px-6 flex justify-between items-start text-white/90 z-50 mt-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <span className="inline-block bg-matcha text-milky-surface text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm mb-1.5">
                  {filteredItems[lightboxIndex].category === "photography" ? "Photography" : "Graphic Design"}
                </span>
                <h4 className="font-display font-bold text-xl sm:text-2xl tracking-tight">
                  {filteredItems[lightboxIndex].title}
                </h4>
                <p className="text-white/50 text-xs sm:text-sm font-semibold mt-0.5">
                  {filteredItems[lightboxIndex].details}
                </p>
              </div>
              
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 flex items-center justify-center cursor-pointer transition-all duration-300 group flex-shrink-0"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>

            {/* Main Graphic Display area */}
            <div 
              className="w-full flex-grow flex items-center justify-center relative px-4 my-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation - Left Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(prev => 
                    prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
                  );
                }}
                className="absolute left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 flex items-center justify-center text-white cursor-pointer transition-all duration-300 z-50 max-sm:left-2"
                aria-label="Previous Graphic"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* The Image Wrapper with Scroll limits */}
              <div className="relative max-w-[85vw] max-h-[68vh] overflow-y-auto rounded-lg bg-zinc-950/40 p-2 border border-white/10 custom-lightbox-scrollbar">
                <img
                  src={filteredItems[lightboxIndex].src}
                  alt={filteredItems[lightboxIndex].title}
                  className="max-w-full h-auto max-h-[65vh] object-contain shadow-2xl rounded-sm"
                />
              </div>

              {/* Navigation - Right Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(prev => 
                    prev !== null ? (prev + 1) % filteredItems.length : null
                  );
                }}
                className="absolute right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 flex items-center justify-center text-white cursor-pointer transition-all duration-300 z-50 max-sm:right-2"
                aria-label="Next Graphic"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Footer controls */}
            <div 
              className="w-full max-w-[800px] px-6 text-center text-white z-50 mb-4"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-white/80 text-sm max-w-[500px] mx-auto leading-relaxed font-semibold">
                {filteredItems[lightboxIndex].description}
              </p>
              <div className="mt-3 text-white/30 text-[10px] tracking-wide uppercase font-bold">
                Item {lightboxIndex + 1} of {filteredItems.length} • Press Left / Right or click arrows to browse
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
