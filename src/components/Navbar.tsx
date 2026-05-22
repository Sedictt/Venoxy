"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { id: "hero", label: "About" },
  { id: "projects", label: "Project" },
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
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Focus on sections in the center-top
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe sections
    navLinks.forEach((link) => {
      const section = document.getElementById(link.id);
      if (section) observer.observe(section);
    });

    // Also observe hero to deactivate when scrolled to top
    const heroSection = document.getElementById("hero");
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
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
    <div 
      className={`fixed top-6 left-0 w-full flex items-center justify-between px-6 sm:px-10 z-40 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
        scrolled ? "translate-y-[-8px]" : ""
      }`}
    >
      {/* Brand Logo (Upper Left) */}
      <div className="flex-1 flex justify-start">
        <a 
          href="#hero" 
          onClick={(e) => handleLinkClick(e, "hero")}
          className="shrink-0 hover:scale-105 transition-transform duration-300"
          aria-label="Venoxy Arts Home"
        >
          <img src="/venoxy_logo.png" alt="Venoxy Logo" className="h-10 sm:h-12 w-auto object-contain" />
        </a>
      </div>

      {/* Center Nav */}
      <div className="shrink-0">
        <nav 
        id="mainNav"
        className={`flex items-center px-4 py-2 border-2 border-matcha bg-milky-surface/80 backdrop-blur-xl rounded-full transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] hover:scale-[1.02] hover:-translate-y-0.5 ${
          scrolled 
            ? "bg-milky-surface/90 shadow-[0_20px_40px_rgba(65,70,42,0.12)] py-1.5" 
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

      {/* Call to Action & Theme Toggle (Upper Right) */}
      <div className="flex-1 flex justify-end items-center gap-3 sm:gap-4">
        <ThemeToggle />
        <div className="hidden sm:block">
          <a 
            href="#contact" 
            onClick={(e) => handleLinkClick(e, "contact")}
            className="bg-matcha hover:bg-matcha-hover text-milky-surface px-6 py-2.5 rounded-full font-bold text-sm uppercase tracking-wider transition-colors shadow-sm inline-flex items-center gap-2"
          >
            Let&apos;s Talk
          </a>
        </div>
      </div>
    </div>
  );
}
