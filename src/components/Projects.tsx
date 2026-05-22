"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ArrowRight, ArrowUp, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

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
  icon: React.ReactNode;
  images: string[];
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [galleryPage, setGalleryPage] = useState(1);
  const [lightboxImageIndex, setLightboxImageIndex] = useState<number | null>(null);
  const [longImages, setLongImages] = useState<Record<string, boolean>>({});

  const ITEMS_PER_PAGE = 4;

  const totalPages = selectedProject ? Math.ceil(selectedProject.images.length / ITEMS_PER_PAGE) : 0;
  const paginatedImages = selectedProject ? selectedProject.images.slice(
    (galleryPage - 1) * ITEMS_PER_PAGE,
    galleryPage * ITEMS_PER_PAGE
  ) : [];

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
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
  }, [selectedProject]);

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

  const projects: Project[] = [
    {
      id: "Librowse",
      title: "Librowse",
      description: "A comprehensive digital library and book management system.",
      longDescription: "Librowse is a robust library management platform that facilitates book tracking, daily check-ins, user monitoring, and request handling. It features a complete suite of tools for users to manage their books, chat with others, and keep track of their reviews and notifications, providing a seamless library experience.",
      role: "Full Stack Developer",
      year: "2024",
      tags: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
      link: "#",
      color: "#9EA76B",
      icon: (
        <img src="/Projects/librowse/main.png" alt="Librowse Project" className="w-full h-full object-cover object-top" />
      ),
      images: [
        "/Projects/librowse/main.png",
        "/Projects/librowse/Librowse_Home_Page.png",
        "/Projects/librowse/Librowse_Books_Page.png",
        "/Projects/librowse/Librowse_Chats_Page.png",
        "/Projects/librowse/Librowse_Chat_Modal.png",
        "/Projects/librowse/Librowse_My_Books_Tab.png",
        "/Projects/librowse/Librowse_Reviews_Tab.png",
        "/Projects/librowse/Librowse_Request_Page.png",
        "/Projects/librowse/Librowse_Monitoring_Page.png",
        "/Projects/librowse/Librowse_Daily_Check-in_Modal.png",
        "/Projects/librowse/Librowse_Notification_Modal.png",
        "/Projects/librowse/Librowse_Profile_Page.png",
        "/Projects/librowse/Librowse_Verification_Tab.png",
        "/Projects/librowse/Librowse_Violations_Tab.png",
        "/Projects/librowse/Librowse_Settings_Tab.png",
        "/Projects/librowse/Librowse_Modal.png"
      ]
    }
  ];

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>, src: string) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    // Classify as long vertical screenshot if ratio > 1.25
    if (naturalHeight > naturalWidth * 1.25) {
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


  return (
    <section id="projects" className="py-24 w-full">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="flex flex-col items-center mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-block bg-matcha text-milky-surface text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-sm mb-4">
            Selected Works
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-6xl text-olive-primary tracking-tight">
            Portfolio
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              onClick={() => handleOpenModal(project)}
              className="flex flex-col gap-5 cursor-pointer group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.1] }}
            >
              {/* Project Card Image Display */}
              <div className="aspect-[16/10] w-full rounded-[40px] overflow-hidden border-[3px] border-matcha bg-milky-surface relative shadow-sm group-hover:shadow-[0_20px_40px_rgba(158,167,107,0.25)] group-hover:rotate-[-1deg] transition-all duration-500">
                {project.icon}
                <div className="absolute inset-0 bg-matcha/0 group-hover:bg-matcha/5 transition-colors duration-500" />
              </div>

              {/* Project Info */}
              <div className="flex justify-between items-start px-2">
                <div>
                  <h3 className="font-display font-bold text-2xl text-olive-primary mb-1">
                    {project.title}
                  </h3>
                  <p className="text-olive-secondary font-semibold text-sm">
                    {project.description}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full border border-matcha/40 flex items-center justify-center text-olive-primary group-hover:bg-matcha group-hover:text-milky-surface group-hover:border-matcha transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

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
            <button
              onClick={handleCloseModal}
              className="fixed top-8 right-8 w-14 h-14 rounded-full bg-milky-surface border border-matcha/30 hover:border-matcha hover:bg-matcha hover:text-milky-surface flex items-center justify-center cursor-pointer transition-all duration-300 shadow-[0_8px_24px_rgba(65,70,42,0.08)] group z-50"
              aria-label="Close Details Modal"
            >
              <X className="w-6 h-6 transition-transform duration-500 group-hover:rotate-90" />
            </button>

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
                className="w-full rounded-[40px] overflow-hidden border-[3px] border-matcha shadow-sm mb-20 bg-milky-surface"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              >
                {selectedProject.icon}
              </motion.div>

              {/* Screenshots Gallery Section */}
              <div className="mt-6 mb-20 border-t border-matcha/20 pt-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                  <div>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-olive-primary">
                      Screenshots Gallery
                    </h3>
                    <p className="text-olive-secondary text-sm font-semibold mt-1">
                      Explore detailed interfaces and key systems of {selectedProject.title}
                    </p>
                  </div>
                  <div className="text-xs uppercase font-bold tracking-widest text-olive-secondary bg-milky-surface px-4 py-2 border border-matcha/20 rounded-md">
                    Page {galleryPage} of {totalPages} ({selectedProject.images.length} Total)
                  </div>
                </div>

                {/* Image Grid with Framer Motion layout animations */}
                <motion.div 
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 gap-8"
                >
                  <AnimatePresence mode="popLayout">
                    {paginatedImages.map((src, pageIdx) => {
                      const absoluteIdx = (galleryPage - 1) * ITEMS_PER_PAGE + pageIdx;
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
                              isLong ? "h-[380px]" : "aspect-[16/10]"
                            }`}
                          >
                            <img
                              src={src}
                              alt={title}
                              onLoad={(e) => handleImageLoad(e, src)}
                              className={`w-full h-full transition-transform duration-500 group-hover/card:scale-[1.03] ${
                                isLong ? "object-cover object-top" : "object-cover object-center"
                              }`}
                            />

                            {/* Bottom Truncation Gradient Overlay & Action Badge */}
                            {isLong && (
                              <>
                                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-milky-surface via-milky-surface/85 to-transparent pointer-events-none z-10 transition-colors duration-300" />
                                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-milky-surface/90 backdrop-blur-md border border-matcha/30 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-[10px] font-bold text-olive-primary uppercase tracking-widest shadow-md pointer-events-none group-hover/card:scale-105 group-hover/card:bg-matcha group-hover/card:text-milky-surface group-hover/card:border-matcha transition-all duration-300 z-20">
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
                        setGalleryPage(prev => Math.max(1, prev - 1));
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
                          setGalleryPage(page);
                        }}
                        className={`w-10 h-10 rounded-full font-display font-bold text-xs cursor-pointer transition-all duration-300 ${
                          galleryPage === page
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
                        setGalleryPage(prev => Math.min(totalPages, prev + 1));
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
                <div
                  onClick={handleNextProject}
                  className="flex items-center justify-between bg-milky-surface border border-matcha/30 hover:border-matcha hover:shadow-md p-6 rounded-[30px] cursor-pointer transition-all duration-300 max-w-[800px] mx-auto group"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-14 rounded-md overflow-hidden bg-milky flex-shrink-0 border border-matcha/10">
                      {projects[(projects.findIndex((p) => p.id === selectedProject.id) + 1) % projects.length].icon}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-olive-primary">
                        {projects[(projects.findIndex((p) => p.id === selectedProject.id) + 1) % projects.length].title}
                      </h3>
                      <p className="text-olive-secondary text-xs font-medium">
                        {projects[(projects.findIndex((p) => p.id === selectedProject.id) + 1) % projects.length].description}
                      </p>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-milky flex items-center justify-center text-olive-primary group-hover:bg-matcha group-hover:text-milky-surface transition-all duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

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
                      <a href="#" className="hover:text-matcha font-bold">Twitter</a>
                      <a href="#" className="hover:text-matcha font-bold">LinkedIn</a>
                      <a href="#" className="hover:text-matcha font-bold">GitHub</a>
                      <a href="#" className="hover:text-matcha font-bold">Instagram</a>
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
              
              {/* Close Button */}
              <button
                onClick={() => setLightboxImageIndex(null)}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 flex items-center justify-center cursor-pointer transition-all duration-300 group"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </div>

            {/* Main Image Container */}
            <div 
              className="w-full flex-grow flex items-center justify-center relative px-4 my-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation - Left Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImageIndex(prev => 
                    prev !== null ? (prev - 1 + selectedProject.images.length) % selectedProject.images.length : null
                  );
                }}
                className="absolute left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 flex items-center justify-center text-white cursor-pointer transition-all duration-300 z-50 max-sm:left-2"
                aria-label="Previous Screenshot"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* The Image Display */}
              <div 
                className={`relative max-w-[90vw] max-h-[70vh] transition-all duration-300 ${
                  longImages[selectedProject.images[lightboxImageIndex]] 
                    ? "overflow-y-auto w-full max-w-[850px] aspect-[10/16] bg-zinc-900/40 border border-white/10 rounded-lg p-2 custom-lightbox-scrollbar" 
                    : "flex items-center justify-center"
                }`}
              >
                <img
                  src={selectedProject.images[lightboxImageIndex]}
                  alt={formatImageTitle(selectedProject.images[lightboxImageIndex], selectedProject.id)}
                  className={`shadow-2xl rounded-sm ${
                    longImages[selectedProject.images[lightboxImageIndex]]
                      ? "w-full h-auto object-contain object-top"
                      : "max-w-full max-h-[70vh] object-contain"
                  }`}
                />
              </div>

              {/* Navigation - Right Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImageIndex(prev => 
                    prev !== null ? (prev + 1) % selectedProject.images.length : null
                  );
                }}
                className="absolute right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 flex items-center justify-center text-white cursor-pointer transition-all duration-300 z-50 max-sm:right-2"
                aria-label="Next Screenshot"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Footer controls */}
            <div 
              className="w-full max-w-[800px] px-6 text-center text-white/40 text-xs flex justify-center items-center gap-4 z-50 mb-4"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="max-sm:hidden font-semibold">Press Left/Right arrows or click navigation to browse</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
