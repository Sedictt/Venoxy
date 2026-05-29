"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, X, Maximize2, Camera, Info, Laptop, Palette, Sparkles, Layers, ZoomIn, ZoomOut, LayoutGrid } from "lucide-react";
import { TransitionLink as Link } from "@/components/transitions/PageTransitionProvider";
import Masonry from "./Masonry";

interface CreativeItem {
  id: string;
  src: string;
  thumbSrc: string;
  blurDataURL: string;
  title: string;
  category: "photography" | "design" | "traditional" | "digital" | "others";
  description: string;
  details: string;
  width: number;
  height: number;
}

interface CreativeGalleryProps {
  initialItems?: CreativeItem[];
}

const tabIcons = {
  all: Sparkles,
  photography: Camera,
  design: Laptop,
  traditional: Palette,
  digital: Layers,
  others: Info
};



const preloadedImages = new Set<string>();

const preloadImage = (src: string, priority: "high" | "low" = "low") => {
  if (!src || preloadedImages.has(src) || typeof window === "undefined") return;

  preloadedImages.add(src);
  const image = new window.Image();
  image.decoding = "async";
  image.fetchPriority = priority;
  image.src = src;
};

export default function CreativeGallery({ initialItems = [] }: CreativeGalleryProps) {
  const [activeTab, setActiveTab] = useState<"all" | "photography" | "design" | "traditional" | "digital" | "others">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoomScale, setZoomScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const baseItems = useMemo(() => {
    const hash = (value: string) => {
      let result = 0;
      for (let i = 0; i < value.length; i++) {
        result = Math.imul(31, result) + value.charCodeAt(i) | 0;
      }
      return result;
    };

    return [...initialItems].sort((a, b) => hash(a.id) - hash(b.id));
  }, [initialItems]);

  useEffect(() => {
    if (baseItems.length === 0 || typeof window === "undefined") return;

    let cancelled = false;
    const originals = baseItems
      .map(item => item.src)
      .filter((src, index, list) => src && list.indexOf(src) === index);

    baseItems.forEach(item => {
      preloadImage(item.thumbSrc, "high");
      if (item.blurDataURL) preloadImage(item.blurDataURL, "low");
    });

    const preloadOriginals = () => {
      let cursor = 0;
      const concurrency = 4;

      const loadNext = () => {
        if (cancelled || cursor >= originals.length) return;

        const src = originals[cursor];
        cursor += 1;
        preloadImage(src, "low");

        window.setTimeout(loadNext, 80);
      };

      for (let i = 0; i < concurrency; i += 1) {
        loadNext();
      }
    };

    const idleId = "requestIdleCallback" in window
      ? window.requestIdleCallback(preloadOriginals, { timeout: 1200 })
      : undefined;
    const timeoutId = idleId === undefined
      ? window.setTimeout(preloadOriginals, 800)
      : undefined;

    return () => {
      cancelled = true;
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [baseItems]);

  // Filter items based on active category tab
  const filteredItems = baseItems.filter(item => {
    if (activeTab === "all") return true;
    return item.category === activeTab;
  });

  // Lock body scroll when lightbox modal is open
  useEffect(() => {
    if (lightboxIndex !== null) {
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
  }, [lightboxIndex]);

  // Reset zoom scale and drag position when item changes
  useEffect(() => {
    Promise.resolve().then(() => {
      setZoomScale(1);
      dragX.set(0);
      dragY.set(0);
    });
  }, [lightboxIndex, dragX, dragY]);

  // Centering reset when zoomScale is reset to 1
  useEffect(() => {
    if (zoomScale === 1) {
      dragX.set(0);
      dragY.set(0);
    }
  }, [zoomScale, dragX, dragY]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const zoomFactor = e.deltaY < 0 ? 0.15 : -0.15;
    setZoomScale(prev => Math.min(4, Math.max(1, prev + zoomFactor)));
  };

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

  const tabs: { id: "all" | "photography" | "design" | "traditional" | "digital" | "others"; label: string }[] = [
    { id: "all", label: "All Works" },
    { id: "photography", label: "Photography" },
    { id: "design", label: "Graphics Design" },
    { id: "traditional", label: "Traditional Art" },
    { id: "digital", label: "Digital Art" },
    { id: "others", label: "Others" }
  ];


  // Helper to count items in each category
  const getTabCount = (tabId: typeof tabs[number]["id"]) => {
    if (tabId === "all") return baseItems.length;
    return baseItems.filter(item => item.category === tabId).length;
  };

  // Horizontal Scroll indicator fades state management
  const tabsRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;

    const checkScroll = () => {
      setShowLeftFade(el.scrollLeft > 8);
      setShowRightFade(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
    };

    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    
    // Check again after a tiny delay to ensure proper layout bounding after render
    const timer = setTimeout(checkScroll, 100);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
      clearTimeout(timer);
    };
  }, [baseItems]);

  return (
    <section className="pt-10 pb-24 min-h-screen w-full bg-milky relative transition-colors duration-500 overflow-hidden">
      {/* Decorative High-Fidelity Chalk Doodles in the background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 opacity-[0.24] sm:opacity-[0.32] mix-blend-multiply">
        {/* Left Margin Chalk Art */}
        <img 
          src="/assets/chalk/paperplane.png" 
          alt="Chalk Paper Plane" 
          className="absolute top-[8%] left-[-1%] w-20 sm:w-28 h-auto rotate-[-12deg]"
        />
        <img 
          src="/assets/chalk/star.png" 
          alt="Chalk Star" 
          className="absolute top-[32%] left-[4%] w-10 sm:w-14 h-auto rotate-[20deg]"
        />
        <img 
          src="/assets/chalk/camera.png" 
          alt="Chalk Camera" 
          className="absolute bottom-[28%] left-[-4%] w-44 sm:w-[260px] md:w-[350px] h-auto rotate-[-10deg]"
        />
        <img 
          src="/assets/chalk/swirl.png" 
          alt="Chalk Swirl" 
          className="absolute bottom-[8%] left-[5%] w-18 sm:w-24 h-auto rotate-[15deg]"
        />

        {/* Right Margin Chalk Art */}
        <img 
          src="/assets/chalk/threesparkle.png" 
          alt="Chalk Sparkles" 
          className="absolute top-[12%] right-[3%] w-12 sm:w-18 h-auto rotate-[15deg]"
        />
        <img 
          src="/assets/chalk/cloud.png" 
          alt="Chalk Cloud" 
          className="absolute top-[28%] right-[-6%] w-48 sm:w-[300px] md:w-[420px] h-auto rotate-[-8deg]"
        />
        <img 
          src="/assets/chalk/frog.png" 
          alt="Chalk Frog" 
          className="absolute bottom-[35%] right-[-2%] w-28 sm:w-[160px] md:w-[200px] h-auto rotate-[10deg]"
        />
        <img 
          src="/assets/chalk/arrow.png" 
          alt="Chalk Arrow" 
          className="absolute bottom-[10%] right-[4%] w-14 sm:w-20 h-auto rotate-[40deg]"
        />
      </div>

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        {/* Header / Nav Section */}
        <div className="flex flex-col gap-6 mb-6 border-b border-matcha/20 pb-4 w-full">
          {/* Back button */}
          <div className="flex flex-col items-start">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-olive-secondary hover:text-matcha font-bold text-sm uppercase tracking-widest group transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1.5" />
              Back to Home
            </Link>
          </div>

          <div className="flex flex-col items-center text-center mt-4">
            <img
              src="/assets/gallery/gallery-header.png"
              alt="Gallery Header"
              className="w-auto h-16 sm:h-36 md:h-44 object-contain select-none pointer-events-auto filter drop-shadow-[8px_12px_4px_rgba(0,0,0,0.18)] transition-transform duration-300 hover:scale-[1.03]"
            />
          </div>
        </div>

        {/* Full-width Filter Row */}
        <div className="w-full mb-8 select-none">
          <div className="relative w-full overflow-hidden">
            {/* Left Edge Overlay indicator */}
            <div 
              className={`absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-milky to-transparent z-20 pointer-events-none transition-opacity duration-300 ${
                showLeftFade ? "opacity-100" : "opacity-0"
              }`}
            />
            
            <div 
              ref={tabsRef}
              className="w-full overflow-x-auto scrollbar-none pb-2 -mb-2"
            >
              <div className="flex flex-wrap items-center gap-3.5 w-full py-1">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setLightboxIndex(null);
                      }}
                      className={`relative shrink-0 rounded-full px-5 py-2.5 text-[11px] font-extrabold uppercase tracking-widest cursor-pointer transition-all duration-300 flex items-center gap-2 border-2 ${
                        isActive 
                          ? "bg-[#4d5d36] border-[#4d5d36] text-milky shadow-[2px_3px_0px_0px_rgba(65,70,42,1)] hover:scale-[1.02]" 
                          : "border-[#41462a]/60 text-olive-secondary bg-transparent hover:bg-[#41462a]/5 hover:text-olive-primary hover:border-[#41462a] hover:scale-[1.02]"
                      }`}
                    >
                      {/* Grid/Layout icon for 'All Works' tab */}
                      {tab.id === "all" && (
                        <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
                      )}
                      
                      <span>{tab.label}</span>
                      
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-extrabold transition-all duration-300 ${
                        isActive ? "bg-milky/20 text-milky" : "bg-matcha/10 text-matcha"
                      }`}>
                        {getTabCount(tab.id)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Right Edge Overlay indicator */}
            <div 
              className={`absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-milky to-transparent z-20 pointer-events-none transition-opacity duration-300 ${
                showRightFade ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>

        {/* Dynamic Masonry Grid */}
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
          <div className="w-full">
            <Masonry
              items={filteredItems.map((item, idx) => ({
                id: item.id,
                img: item.src,
                thumbSrc: item.thumbSrc,
                blurDataURL: item.blurDataURL,
                title: item.title,
                category: item.category,
                details: item.details,
                width: item.width,
                heightPx: item.height,
                originalIndex: idx
              }))}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover={true}
              hoverScale={0.97}
              blurToFocus={true}
              colorShiftOnHover={false}
              onItemClick={(item) => setLightboxIndex(item.originalIndex ?? null)}
            />
          </div>
        )}
      </div>

      {/* Immersive Cinema Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-full bg-black/98 backdrop-blur-xl z-[100] flex flex-col justify-between items-center py-6 select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close / Action Top Bar */}
            <div 
              className="w-full max-w-[1200px] px-6 sm:px-10 flex justify-between items-center z-50 mb-2 mt-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Breadcrumb info */}
              <div className="flex items-center gap-2 text-white/50 text-xs font-semibold tracking-wider uppercase">
                <span>Gallery</span>
                <span>/</span>
                <span className="text-matcha font-bold">
                  {filteredItems[lightboxIndex].category}
                </span>
              </div>

              {/* Action Buttons (Zoom & Close) */}
              <div className="flex items-center gap-3">
                {/* Close Button */}
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25 flex items-center justify-center cursor-pointer text-white transition-all duration-300 group shrink-0"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
                </button>
              </div>
            </div>

            {/* Split Screen Stage Layout */}
            <div 
              className="w-full max-w-[1200px] flex-grow grid grid-cols-1 md:grid-cols-[1.5fr_1fr] items-center justify-center gap-8 px-6 sm:px-10 overflow-y-auto md:overflow-hidden my-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Column: Image Viewing Area with navigation triggers */}
              <div className="flex flex-col items-center justify-center w-full h-full relative p-2 min-h-[350px] md:min-h-0">
                {/* Navigation - Left Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(prev => 
                      prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
                    );
                  }}
                  className="absolute left-2 w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25 flex items-center justify-center text-white cursor-pointer transition-all duration-300 z-50 hover:scale-105 hover:-translate-x-0.5 active:scale-95"
                  aria-label="Previous Graphic"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Animated Crossfading Image Viewport with Pan-and-Zoom capability */}
                <div 
                  ref={containerRef}
                  onWheel={handleWheel}
                  className={`relative w-full max-w-[90%] max-h-[46vh] md:max-h-[58vh] flex items-center justify-center rounded-xl bg-black/20 ${zoomScale > 1 ? "overflow-visible" : "overflow-hidden"}`}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={filteredItems[lightboxIndex].id}
                      src={filteredItems[lightboxIndex].src}
                      alt={filteredItems[lightboxIndex].title}
                      drag={zoomScale > 1}
                      dragConstraints={{
                        left: -500 * (zoomScale - 1),
                        right: 500 * (zoomScale - 1),
                        top: -400 * (zoomScale - 1),
                        bottom: 400 * (zoomScale - 1)
                      }}
                      dragElastic={0}
                      dragMomentum={false}
                      initial={{ opacity: 0, filter: "blur(6px)" }}
                      animate={{ 
                        opacity: 1, 
                        scale: zoomScale, 
                        filter: "blur(0px)",
                      }}
                      exit={{ opacity: 0, filter: "blur(6px)" }}
                      transition={{ 
                        scale: { duration: 0.15, ease: "easeOut" },
                        opacity: { duration: 0.25 },
                        filter: { duration: 0.25 }
                      }}
                      style={{
                        x: dragX,
                        y: dragY,
                        cursor: zoomScale > 1 ? "grab" : "default"
                      }}
                      className="max-w-full max-h-[44vh] md:max-h-[55vh] object-contain shadow-2xl rounded-xl border border-white/10 select-none"
                    />
                  </AnimatePresence>
                </div>

                {/* Floating Zoom Control Bar right below the image container */}
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
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(prev => 
                      prev !== null ? (prev + 1) % filteredItems.length : null
                    );
                  }}
                  className="absolute right-2 w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25 flex items-center justify-center text-white cursor-pointer transition-all duration-300 z-50 hover:scale-105 hover:translate-x-0.5 active:scale-95"
                  aria-label="Next Graphic"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Right Column: Description drawer */}
              <div className="bg-white/[0.03] border border-white/10 rounded-[24px] p-6 text-white w-full max-h-[85vh] md:h-auto md:max-h-full overflow-y-auto backdrop-blur-md shadow-2xl flex flex-col justify-between gap-5">
                <div>
                  {/* Category Pill Tag */}
                  <span className="inline-block bg-matcha text-milky-surface text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-sm mb-3">
                    {filteredItems[lightboxIndex].category === "photography" ? "Camera Photograph" : 
                     filteredItems[lightboxIndex].category === "design" ? "Graphics Design" :
                     filteredItems[lightboxIndex].category === "traditional" ? "Traditional Art" :
                     filteredItems[lightboxIndex].category === "digital" ? "Digital Painting" : "Others"}
                  </span>
                  
                  {/* Title */}
                  <h4 className="font-display font-bold text-2xl sm:text-3xl tracking-tight leading-tight text-white mb-4">
                    {filteredItems[lightboxIndex].title}
                  </h4>
                  
                  {/* Curated Paragraph Description */}
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed font-medium">
                    {filteredItems[lightboxIndex].description}
                  </p>
                </div>

                {/* Info Panel Footer */}
                <div className="border-t border-white/10 pt-4 flex items-center justify-between text-[10px] tracking-wide uppercase font-bold text-white/35">
                  <div>
                    Item {lightboxIndex + 1} of {filteredItems.length}
                  </div>
                  <div>
                    Use Arrow Keys ⇆
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Strip: Thumbnail Navigator (Direct Selection) */}
            <div 
              className="w-full max-w-[800px] px-6 text-center text-white z-50 mb-2 mt-1 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Carousel container */}
              <div className="overflow-x-auto scrollbar-none flex items-center justify-center gap-2 py-2 max-w-full">
                {filteredItems.map((item, idx) => {
                  const isSelected = idx === lightboxIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setLightboxIndex(idx)}
                      className={`relative w-11 h-11 rounded-lg overflow-hidden border-2 shrink-0 transition-all duration-300 hover:scale-105 cursor-pointer ${
                        isSelected 
                          ? "border-matcha scale-110 shadow-[0_0_15px_rgba(158,167,107,0.5)] opacity-100" 
                          : "border-white/10 hover:border-white/30 opacity-40 hover:opacity-75"
                      }`}
                    >
                      <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
