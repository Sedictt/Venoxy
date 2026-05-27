"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { ArrowUpRight, X, ArrowRight, ArrowUp, ChevronLeft, ChevronRight, Maximize2, ZoomIn, ZoomOut } from "lucide-react";
import { Tooltip } from "./Tooltip";

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
    } else {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("modal-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("modal-open");
    };
  }, [selectedProject]);

  // Reset zoom scale and drag offsets when lightbox image changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setZoomScale(1);
    dragX.set(0);
    dragY.set(0);
  }, [lightboxImageIndex]);

  // Centering reset when zoomScale is reset to 1
  useEffect(() => {
    if (zoomScale === 1) {
      dragX.set(0);
      dragY.set(0);
    }
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
    // Classify as long vertical screenshot if ratio > 1.25 and NOT a mobile project
    const isMobile = selectedProject?.title.toLowerCase().includes("(mobile)");
    if (naturalHeight > naturalWidth * 1.25 && !isMobile) {
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
    <section id="projects" className="py-5 w-full">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="flex flex-col items-center mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img
            src="/Projects/projects-title.png"
            alt="Projects Title"
            className="w-auto h-24 sm:h-68 md:h-72 object-contain select-none pointer-events-none"
          />
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
                <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover object-top" />
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
                            className={`w-full rounded-[24px] border-2 border-matcha/20 hover:border-matcha/60 bg-milky-surface overflow-hidden shadow-sm hover:shadow-[0_12px_24px_rgba(65,70,42,0.12)] transition-all duration-300 flex items-center justify-center relative ${selectedProject.title.toLowerCase().includes("(mobile)")
                              ? "aspect-[10/16] max-w-[320px] mx-auto"
                              : "aspect-[16/10]"
                              }`}
                          >
                            <img
                              src={src}
                              alt={title}
                              onLoad={(e) => handleImageLoad(e, src)}
                              className={`w-full h-full transition-transform duration-500 group-hover/card:scale-[1.03] ${selectedProject.title.toLowerCase().includes("(mobile)")
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
                <div
                  onClick={handleNextProject}
                  className="flex items-center justify-between bg-milky-surface border border-matcha/30 hover:border-matcha hover:shadow-md p-6 rounded-[30px] cursor-pointer transition-all duration-300 max-w-[800px] mx-auto group"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-14 rounded-md overflow-hidden bg-milky flex-shrink-0 border border-matcha/10">
                      <img
                        src={projects[(projects.findIndex((p) => p.id === selectedProject.id) + 1) % projects.length].thumbnail}
                        alt="Next Project Thumbnail"
                        className="w-full h-full object-cover object-top"
                      />
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
                ref={!longImages[selectedProject.images[lightboxImageIndex]] ? containerRef : undefined}
                onWheel={!longImages[selectedProject.images[lightboxImageIndex]] ? handleWheel : undefined}
                className={`relative max-w-[90vw] max-h-[66vh] transition-all duration-300 overflow-hidden ${longImages[selectedProject.images[lightboxImageIndex]]
                  ? "overflow-y-auto w-full max-w-[850px] aspect-[10/16] bg-zinc-900/40 border border-white/10 rounded-lg p-2 custom-lightbox-scrollbar"
                  : "flex items-center justify-center rounded-lg bg-black/20"
                  }`}
              >
                <motion.img
                  key={selectedProject.images[lightboxImageIndex]}
                  src={selectedProject.images[lightboxImageIndex]}
                  alt={formatImageTitle(selectedProject.images[lightboxImageIndex], selectedProject.id)}
                  drag={!longImages[selectedProject.images[lightboxImageIndex]] && zoomScale > 1}
                  dragConstraints={{
                    left: -500 * (zoomScale - 1),
                    right: 500 * (zoomScale - 1),
                    top: -400 * (zoomScale - 1),
                    bottom: 400 * (zoomScale - 1)
                  }}
                  dragElastic={0}
                  dragMomentum={false}
                  animate={{
                    scale: !longImages[selectedProject.images[lightboxImageIndex]] ? zoomScale : 1
                  }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  style={{
                    x: dragX,
                    y: dragY,
                    cursor: !longImages[selectedProject.images[lightboxImageIndex]] && zoomScale > 1 ? "grab" : "default"
                  }}
                  className={`shadow-2xl rounded-sm select-none ${longImages[selectedProject.images[lightboxImageIndex]]
                    ? "w-full h-auto object-contain object-top"
                    : "max-w-full max-h-[64vh] object-contain"
                    }`}
                />
              </div>

              {/* Floating Zoom Control Bar under the image (only for standard landscape/aspect ratio photos) */}
              {!longImages[selectedProject.images[lightboxImageIndex]] && (
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
              )}

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
    </section>
  );
}
