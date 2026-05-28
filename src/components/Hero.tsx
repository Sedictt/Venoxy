"use client";

import { motion } from "framer-motion";

interface HeroProps {
  loaderCompleted: boolean;
}

export default function Hero({ loaderCompleted }: HeroProps) {
  const brandName = "venoxy arts";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2,
      },
    },
  } as const;

  const letterVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 90,
      },
    },
  } as const;

  const fadeUpVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.19, 1, 0.22, 1],
        delay: 1.0,
      },
    },
  } as const;

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-[100vh] w-full text-center overflow-hidden px-6"
    >
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img 
          src="/hero_image.png" 
          alt="Hero Background" 
          className="w-full h-full object-cover opacity-100" 
        />
      </div>

      <div className="relative z-10 flex flex-col items-center select-none pt-[35vh]">
        {/* Empty container for layout balance */}
      </div>

      {/* Floating Side CTAs - Bottom Left for Desktop, Glassmorphism Card for Mobile */}
      <div className="absolute md:left-12 md:bottom-16 md:right-auto bottom-28 left-1/2 -translate-x-1/2 md:translate-x-0 z-20 flex flex-col sm:flex-row md:flex-col gap-3 items-center md:items-start w-[calc(100%-3rem)] md:w-auto max-w-[340px] md:max-w-none bg-milky-surface/85 backdrop-blur-md md:bg-transparent md:backdrop-blur-none p-4 md:p-0 rounded-3xl md:rounded-none border border-matcha/10 md:border-none shadow-sm md:shadow-none">
        <motion.a
          variants={fadeUpVariants}
          initial="hidden"
          animate={loaderCompleted ? "visible" : "hidden"}
          href="/CV-ATS-Updated.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-auto bg-matcha hover:bg-matcha-hover text-milky-surface px-6.5 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-[1.03] hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"></path>
          </svg>
          View CV / Resume
        </motion.a>
        <motion.a
          variants={fadeUpVariants}
          initial="hidden"
          animate={loaderCompleted ? "visible" : "hidden"}
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            const contact = document.getElementById("contact");
            if (contact) {
              window.scrollTo({
                top: contact.offsetTop - 80,
                behavior: "smooth",
              });
            }
          }}
          className="w-full md:w-auto border-2 border-matcha text-matcha hover:bg-matcha hover:text-milky-surface bg-milky-surface/90 backdrop-blur-sm px-6.5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm hover:scale-[1.03] hover:-translate-y-0.5 inline-flex items-center justify-center"
        >
          Let&apos;s Connect
        </motion.a>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        animate={loaderCompleted ? "visible" : "hidden"}
        className="absolute bottom-12 flex flex-col items-center gap-2 cursor-pointer z-10"
        onClick={() => {
          const projects = document.getElementById("projects");
          if (projects) {
            window.scrollTo({
              top: projects.offsetTop - 80,
              behavior: "smooth",
            });
          }
        }}
      >
        <span className="text-olive-secondary/80 font-bold text-xs uppercase tracking-widest">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-matcha/40 flex justify-center p-1.5"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-matcha" />
        </motion.div>
      </motion.div>
    </section>
  );
}
