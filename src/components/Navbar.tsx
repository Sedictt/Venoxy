"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TransitionLink } from "@/components/transitions/PageTransitionProvider";
import { Images, FileText } from "lucide-react";
import { Tooltip } from "./Tooltip";

const navLinks = [
  { id: "hero", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" }
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll for nav transform and active section highlights
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section based on scroll position / offset from top
      const scrollPosition = window.scrollY + 160; // Offset for navbar height and visual spacing

      // Find the section that currently matches the scroll position
      let currentSection = "";
      for (const link of navLinks) {
        const section = document.getElementById(link.id);
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = link.id;
          }
        }
      }

      // Fallback: If scrolled close to top, default to "hero"
      if (window.scrollY < 80) {
        currentSection = "hero";
      }
      
      // Fallback: If scrolled to bottom, default to last section ("contact")
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        currentSection = "contact";
      }

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    // Run once on mount to set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const offsetTop = target.offsetTop;
      window.scrollTo({
        top: id === "hero" ? 0 : offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
        scrolled 
          ? "bg-milky/90 dark:bg-milky-surface/90 backdrop-blur-md border-b border-matcha/20 py-3.5 shadow-sm" 
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-6 sm:px-10 flex items-center justify-between gap-4">
        {/* Brand Logo (Upper Left) */}
        <div className="flex-1 flex justify-start">
          <a 
            href="#hero" 
            onClick={(e) => handleLinkClick(e, "hero")}
            className="shrink-0 hover:scale-105 transition-transform duration-300"
            aria-label="Venoxy Arts Home"
          >
            <img src="/venoxy_logo.png" alt="Venoxy Logo" className="h-10 sm:h-11 w-auto object-contain dark:invert" />
          </a>
        </div>

        {/* Center Nav */}
        <div className="shrink-0">
          <nav 
            id="mainNav"
            className={`flex items-center px-4 py-2 border-2 border-matcha bg-milky-surface/85 backdrop-blur-xl rounded-full transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] hover:scale-[1.02] hover:-translate-y-0.5 ${
              scrolled 
                ? "bg-milky-surface/90 shadow-[0_15px_30px_rgba(65,70,42,0.1)] py-1.5" 
                : "shadow-[0_8px_32px_rgba(65,70,42,0.08)]"
            }`}
            aria-label="Main Navigation"
          >
            {/* Navigation Links */}
            <div className="flex gap-1 relative" onMouseLeave={() => setHoveredSection(null)}>
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                const isHovered = hoveredSection === link.id;

                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    id={`nav-link-${link.id}`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    onMouseEnter={() => setHoveredSection(link.id)}
                    className={`relative px-4 py-2 text-sm font-bold capitalize transition-colors duration-300 rounded-full z-10 ${
                      isActive && !hoveredSection
                        ? "text-milky-surface"
                        : isHovered 
                          ? "text-olive-primary" 
                          : "text-olive-secondary"
                    }`}
                    aria-label={`Scroll to ${link.label}`}
                  >
                    {/* Active Highlight (static) */}
                    {isActive && !hoveredSection && (
                      <motion.div
                        layoutId="activeNavHighlight"
                        className="absolute inset-0 bg-matcha rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Hover Blob (magnetic) */}
                    {isHovered && (
                      <motion.div
                        layoutId="hoverNavHighlight"
                        className="absolute inset-0 bg-matcha/15 rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}

                    {link.label}
                  </a>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Call to Action, Gallery Link, Resume Link, & Theme Toggle (Upper Right) */}
        <div className="flex-1 flex justify-end items-center gap-2.5 sm:gap-3.5">
          {/* Creative Archive Shortcut Link (Transitions smoothly via Block Wipe) */}
          <Tooltip content="Creative Gallery" position="bottom">
            <TransitionLink
              href="/gallery"
              className="relative flex items-center justify-center w-11 h-11 rounded-full border-2 border-matcha bg-milky-surface/40 hover:bg-matcha text-matcha hover:text-milky-surface transition-all duration-300 shadow-md shrink-0 cursor-pointer hover:scale-105 hover:-translate-y-0.5 group z-50"
              title="Explore Creative Archive"
              aria-label="Open Creative Gallery"
            >
              <Images className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            </TransitionLink>
          </Tooltip>

          {/* Resume PDF Link */}
          <Tooltip content="View CV / Resume" position="bottom">
            <a
              href="/CV-ATS-Updated.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center w-11 h-11 rounded-full border-2 border-matcha bg-milky-surface/40 hover:bg-matcha text-matcha hover:text-milky-surface transition-all duration-300 shadow-md shrink-0 cursor-pointer hover:scale-105 hover:-translate-y-0.5 group z-50"
              title="View Resume / CV"
              aria-label="View Resume PDF"
            >
              <FileText className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            </a>
          </Tooltip>

          <div className="hidden sm:block">
            <Tooltip content="Get In Touch" position="bottom">
              <a 
                href="#contact" 
                onClick={(e) => handleLinkClick(e, "contact")}
                className="bg-matcha hover:bg-matcha-hover text-milky-surface px-6 py-2.5 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-sm inline-flex items-center gap-2 hover:scale-[1.03] hover:-translate-y-0.5"
              >
                Let&apos;s Talk
              </a>
            </Tooltip>
          </div>
        </div>
      </div>
    </header>
  );
}
