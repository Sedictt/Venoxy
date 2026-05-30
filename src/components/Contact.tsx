"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Staggered vertical scroll offsets (Scroll Parallax)
  const yLayer1 = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const yLayer2 = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const yLayer3 = useTransform(scrollYProgress, [0, 1], [25, -25]);
  const yLayer4 = useTransform(scrollYProgress, [0, 1], [35, -35]);
  const yLayer5 = useTransform(scrollYProgress, [0, 1], [45, -45]);
  const yLayer6 = useTransform(scrollYProgress, [0, 1], [55, -55]);
  const yLayer7 = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const yCta = useTransform(scrollYProgress, [0, 1], [60, -60]);

  // Mouse Movement Parallax Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 90, damping: 20, mass: 0.6 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Mouse interactive offsets (Mouse Parallax)
  const xLayer1 = useTransform(mouseXSpring, [-400, 400], [-3, 3]);
  const yMouseLayer1 = useTransform(mouseYSpring, [-400, 400], [-3, 3]);

  const xLayer2 = useTransform(mouseXSpring, [-400, 400], [-6, 6]);
  const yMouseLayer2 = useTransform(mouseYSpring, [-400, 400], [-6, 6]);

  const xLayer3 = useTransform(mouseXSpring, [-400, 400], [-10, 10]);
  const yMouseLayer3 = useTransform(mouseYSpring, [-400, 400], [-10, 10]);

  const xLayer4 = useTransform(mouseXSpring, [-400, 400], [-14, 14]);
  const yMouseLayer4 = useTransform(mouseYSpring, [-400, 400], [-14, 14]);

  const xLayer5 = useTransform(mouseXSpring, [-400, 400], [-18, 18]);
  const yMouseLayer5 = useTransform(mouseYSpring, [-400, 400], [-18, 18]);

  const xLayer6 = useTransform(mouseXSpring, [-400, 400], [-22, 22]);
  const yMouseLayer6 = useTransform(mouseYSpring, [-400, 400], [-22, 22]);

  const xLayer7 = useTransform(mouseXSpring, [-400, 400], [-28, 28]);
  const yMouseLayer7 = useTransform(mouseYSpring, [-400, 400], [-28, 28]);

  const xCta = useTransform(mouseXSpring, [-400, 400], [-30, 30]);
  const yMouseCta = useTransform(mouseYSpring, [-400, 400], [-30, 30]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      id="contact" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full relative transition-all duration-500 overflow-hidden cursor-default"
    >
      {/* Scoped GPU Hardware-Accelerated Animation Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes contactTitleFloat {
          0%, 100% {
            transform: translateY(0px) translateZ(0);
          }
          50% {
            transform: translateY(-8px) translateZ(0);
          }
        }
        .contact-title-float {
          animation: contactTitleFloat 4.5s ease-in-out infinite;
          will-change: transform;
        }
      `}} />

      <div 
        className="w-full aspect-[16/9] relative flex items-center justify-center overflow-hidden bg-milky-surface"
      >
        {/* Layer 1: Background Desk */}
        <motion.div style={{ y: yLayer1 }} className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.div style={{ translateX: xLayer1, translateY: yMouseLayer1 }} className="w-full h-full">
            <img src="/assets/contact/layer-1.png" alt="" className="w-full h-full object-cover" />
          </motion.div>
        </motion.div>

        {/* Layer 2 */}
        <motion.div style={{ y: yLayer2 }} className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.div style={{ translateX: xLayer2, translateY: yMouseLayer2 }} className="w-full h-full">
            <img src="/assets/contact/layer-2.png" alt="" className="w-full h-full object-cover" />
          </motion.div>
        </motion.div>

        {/* Layer 3 */}
        <motion.div style={{ y: yLayer3 }} className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.div style={{ translateX: xLayer3, translateY: yMouseLayer3 }} className="w-full h-full">
            <img src="/assets/contact/layer-3.png" alt="" className="w-full h-full object-cover" />
          </motion.div>
        </motion.div>

        {/* Layer 4: Section Title ("SEND A NOTE" graphics) */}
        <motion.div style={{ y: yLayer4 }} className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.div style={{ translateX: xLayer4, translateY: yMouseLayer4 }} className="w-full h-full">
            <div className="w-full h-full contact-title-float">
              <img src="/assets/contact/layer-4.png" alt="" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </motion.div>

        {/* Layer 5 */}
        <motion.div style={{ y: yLayer5 }} className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.div style={{ translateX: xLayer5, translateY: yMouseLayer5 }} className="w-full h-full">
            <img src="/assets/contact/layer-5.png" alt="" className="w-full h-full object-cover" />
          </motion.div>
        </motion.div>

        {/* Layer 6 */}
        <motion.div style={{ y: yLayer6 }} className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.div style={{ translateX: xLayer6, translateY: yMouseLayer6 }} className="w-full h-full">
            <img src="/assets/contact/layer-6.png" alt="" className="w-full h-full object-cover" />
          </motion.div>
        </motion.div>

        {/* Layer 7: Accents/pins */}
        <motion.div style={{ y: yLayer7 }} className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.div style={{ translateX: xLayer7, translateY: yMouseLayer7 }} className="w-full h-full">
            <img src="/assets/contact/layer-7.png" alt="" className="w-full h-full object-cover" />
          </motion.div>
        </motion.div>

        {/* Interactive Hotspot Overlay Layer - matches image cover aspect exactly */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
          <div className="w-full h-full max-w-[1920px] aspect-[16/9] max-h-[1080px] relative pointer-events-none md:pointer-events-auto flex-shrink-0">
            
            {/* CTA Button Link - Placed beautifully at bottom right corner beside socials and checklist with independent layered parallax */}
            <motion.div
              style={{ y: yCta }}
              className="absolute top-[80%] left-[78%] w-[16%] h-[8%]"
            >
              <motion.a
                href="mailto:josephvenedictillo@gmail.com"
                style={{ translateX: xCta, translateY: yMouseCta }}
                whileHover={{ 
                  scale: 1.08, 
                  rotate: -1.5,
                  filter: "brightness(1.05) drop-shadow(0 10px 20px rgba(158,167,107,0.45))"
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full h-full rounded-md cursor-pointer pointer-events-auto block"
                title="Send Joseph Benedict a Note!"
              >
                <img src="/assets/contact/cta-button.png" alt="Send a Note CTA" className="w-full h-full object-contain filter drop-shadow-[2px_4px_3px_rgba(0,0,0,0.15)]" />
              </motion.a>
            </motion.div>

            {/* Email Link Hotspot */}
            <a
              href="mailto:josephvenedictillo@gmail.com"
              className="absolute top-[44%] left-[64.5%] w-[19%] h-[7%] rounded-md cursor-pointer hover:bg-matcha/10 border border-transparent hover:border-matcha/30 transition-all duration-200 pointer-events-auto"
              title="Email josephvenedictillo@gmail.com"
              aria-label="Email josephvenedictillo@gmail.com"
            />

            {/* Phone Link Hotspot */}
            <a
              href="tel:+639973487293"
              className="absolute top-[51.5%] left-[64.5%] w-[15%] h-[7%] rounded-md cursor-pointer hover:bg-matcha/10 border border-transparent hover:border-matcha/30 transition-all duration-200 pointer-events-auto"
              title="Call +63 997 348 7293"
              aria-label="Phone Number +63 997 348 7293"
            />

            {/* LinkedIn Link Hotspot */}
            <a
              href="https://linkedin.com/in/joseph-venedict-tillo-232231398"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-[82%] left-[36.2%] w-[18.2%] h-[7.5%] rounded-md cursor-pointer hover:bg-matcha/10 border border-transparent hover:border-matcha/30 transition-all duration-200 pointer-events-auto"
              title="Visit LinkedIn Profile"
              aria-label="LinkedIn Profile"
            />

            {/* GitHub Link Hotspot */}
            <a
              href="https://github.com/Sedictt"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-[82%] left-[56.6%] w-[14.2%] h-[7.5%] rounded-md cursor-pointer hover:bg-matcha/10 border border-transparent hover:border-matcha/30 transition-all duration-200 pointer-events-auto"
              title="Visit GitHub Profile"
              aria-label="GitHub Profile"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
