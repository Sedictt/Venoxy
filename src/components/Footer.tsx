"use client";

import React from "react";
import { motion } from "framer-motion";

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

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-milky-surface/90 border-t-2 border-matcha/20 pt-24 pb-12 w-full overflow-hidden">
      {/* Decorative organic background blobs */}
      <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-matcha/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-24 -top-24 w-96 h-96 bg-matcha/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 md:gap-16 pb-16 border-b border-matcha/10">
          
          {/* Brand Info & Available Status */}
          <div className="flex flex-col items-start space-y-6">
            <a 
              href="#hero" 
              onClick={(e) => handleScroll(e, "hero")}
              className="flex items-center group transition-transform duration-300 hover:scale-[1.02]"
              aria-label="Venoxy Arts Home"
            >
              <img 
                src="/venoxy_logo.png" 
                alt="Venoxy Logo" 
                className="h-10 sm:h-12 w-auto object-contain dark:invert" 
              />
            </a>
            
            <p className="text-olive-secondary font-medium text-sm sm:text-base leading-relaxed max-w-[340px]">
              Independent Web Developer & Creative Tech crafting high-fidelity digital experiences for forward-thinking brands and products.
            </p>

            {/* Pulse Work Status Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-matcha/30 bg-matcha/5 text-olive-primary text-xs font-bold tracking-wide uppercase"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-matcha opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-matcha"></span>
              </span>
              Available for Freelance & Projects
            </motion.div>
          </div>

          {/* Sitemap */}
          <div className="flex flex-col">
            <h4 className="font-display text-xs uppercase font-extrabold tracking-widest text-olive-secondary/70 mb-6">
              Sitemap
            </h4>
            <ul className="flex flex-col gap-3 font-semibold text-sm">
              {[
                { label: "Home", id: "hero" },
                { label: "Projects", id: "projects" },
                { label: "Skills", id: "skills" },
                { label: "Contact", id: "contact" }
              ].map((link) => (
                <li key={link.id}>
                  <a 
                    href={`#${link.id}`} 
                    onClick={(e) => handleScroll(e, link.id)}
                    className="relative text-olive-primary hover:text-matcha transition-colors group flex items-center w-fit py-0.5"
                  >
                    <span>{link.label}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-matcha transition-all duration-350 group-hover:w-full" />
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href="/CV-ATS-Updated.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative text-olive-primary hover:text-matcha transition-colors group flex items-center gap-1 w-fit py-0.5"
                >
                  <span>Resume</span>
                  <svg className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    <path d="M10 9H8" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-matcha transition-all duration-350 group-hover:w-full" />
                </a>
              </li>
            </ul>
          </div>

          {/* Connect & Socials */}
          <div className="flex flex-col">
            <h4 className="font-display text-xs uppercase font-extrabold tracking-widest text-olive-secondary/70 mb-6">
              Connect
            </h4>
            <ul className="flex flex-col gap-3.5">
              {[
                { 
                  name: "GitHub", 
                  url: "https://github.com/Sedictt", 
                  icon: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  )
                },
                { 
                  name: "LinkedIn", 
                  url: "https://linkedin.com/in/joseph-venedict-tillo-322213398", 
                  icon: (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  )
                },
                { 
                  name: "Email", 
                  url: "mailto:josephvenedictillo@gmail.com", 
                  icon: (
                    <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  )
                }
              ].map((social) => (
                <li key={social.name}>
                  <a 
                    href={social.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm font-semibold text-olive-primary hover:text-matcha group transition-colors w-fit"
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full border border-matcha/20 bg-milky/40 group-hover:border-matcha group-hover:bg-matcha group-hover:text-milky-surface transition-all duration-300">
                      {social.icon}
                    </span>
                    <span>{social.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-10 text-xs sm:text-sm font-semibold text-olive-secondary/80">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p>&copy; {currentYear} Venoxy. All rights reserved.</p>
            <p className="opacity-70 text-xs mt-1">
              Designed and Developed with Love
            </p>
          </div>

          {/* Smooth back to top trigger */}
          <motion.a 
            href="#hero"
            onClick={(e) => handleScroll(e, "hero")}
            whileHover={{ y: -5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-matcha bg-milky-surface/40 hover:bg-matcha text-matcha hover:text-milky-surface transition-all duration-300 shadow-md group cursor-pointer"
            aria-label="Back to Top"
            title="Back to Top"
          >
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="m18 15-6-6-6 6" />
            </svg>
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
