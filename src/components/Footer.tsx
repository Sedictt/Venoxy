"use client";

import React from "react";

export default function Footer() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: id === "hero" ? 0 : element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-milky-surface/70 border-t-3 border-matcha pt-20 pb-16 w-full">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 sm:gap-16 pb-16 border-b border-matcha/20">
          
          {/* Brand Info */}
          <div className="flex flex-col items-start">
            <a 
              href="#hero" 
              onClick={(e) => handleScroll(e, "hero")}
              className="flex items-center mb-6 group"
              aria-label="Venoxy Arts Home"
            >
              <div className="w-12 h-12 rounded-full bg-matcha flex items-center justify-center text-milky-surface font-extrabold text-xl transition-transform duration-500 group-hover:rotate-[360deg]">
                V
              </div>
              <span className="ml-3 font-bold text-xl tracking-tight text-olive-primary">
                venoxy
              </span>
            </a>
            <p className="text-olive-secondary font-semibold text-sm sm:text-base leading-relaxed max-w-[320px]">
              Independent Web Developer crafting high-fidelity digital experiences for forward-thinking agencies and products.
            </p>
          </div>

          {/* Sitemap */}
          <div>
            <h4 className="font-display text-xs uppercase font-bold tracking-widest text-olive-secondary mb-6">
              Sitemap
            </h4>
            <ul className="flex flex-col gap-3 font-semibold text-sm">
              <li>
                <a 
                  href="#hero" 
                  onClick={(e) => handleScroll(e, "hero")}
                  className="text-olive-primary hover:text-matcha transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  onClick={(e) => handleScroll(e, "projects")}
                  className="text-olive-primary hover:text-matcha transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="#skills" 
                  onClick={(e) => handleScroll(e, "skills")}
                  className="text-olive-primary hover:text-matcha transition-colors"
                >
                  Skills
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => handleScroll(e, "contact")}
                  className="text-olive-primary hover:text-matcha transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a 
                  href="/CV-ATS-Updated.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-olive-primary hover:text-matcha transition-colors"
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display text-xs uppercase font-bold tracking-widest text-olive-secondary mb-6">
              Connect
            </h4>
            <ul className="flex flex-col gap-3 font-semibold text-sm">
              <li>
                <a 
                  href="#" 
                  className="text-olive-primary hover:text-matcha transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-olive-primary hover:text-matcha transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-olive-primary hover:text-matcha transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-olive-primary hover:text-matcha transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-10 text-xs sm:text-sm font-semibold text-olive-secondary">
          <p>&copy; 2026 Venoxy. All rights reserved.</p>
          <p>Designed and Developed with precision.</p>
        </div>
      </div>
    </footer>
  );
}
