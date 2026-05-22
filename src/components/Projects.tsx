"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ArrowRight, ArrowUp } from "lucide-react";

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
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
      )
    }
  ];

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    setSelectedProject(projects[nextIndex]);
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
    </section>
  );
}
