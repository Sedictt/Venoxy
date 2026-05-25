"use client";

import { motion } from "framer-motion";

export default function Hero() {
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
      {/* Background Relaxing Wave Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 flex flex-col justify-stretch overflow-hidden opacity-70 dark:opacity-35">
        <div className="wave-row wave-delay-1" />
        <div className="wave-row wave-delay-2" />
        <div className="wave-row wave-delay-3" />
        <div className="wave-row wave-delay-4" />
        <div className="wave-row wave-delay-5" />
        <div className="wave-row wave-delay-6" />
        <div className="wave-row wave-delay-7" />
        <div className="wave-row wave-delay-8" />
        <div className="wave-row wave-delay-9" />
        <div className="wave-row wave-delay-10" />
      </div>

      {/* Wave bottom blending mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-milky/20 to-milky z-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center select-none">
        {/* Animated Main Title */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-display font-bold leading-[1] tracking-tighter text-olive-primary text-[clamp(3.5rem,13vw,9.5rem)] lowercase flex flex-wrap justify-center mb-6"
          id="hero-heading"
        >
          {brandName.split("").map((char, index) => {
            // Check if character is a space, return a spacer
            if (char === " ") {
              return <span key={index} className="w-[0.25em]" />;
            }
            return (
              <span key={index} className="inline-block overflow-hidden p-[0.4em] -m-[0.4em]">
                <motion.span
                  variants={letterVariants}
                  className="inline-block origin-bottom"
                >
                  {char}
                </motion.span>
              </span>
            );
          })}
        </motion.h1>

        {/* Animated Subtitle */}
        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="font-sans text-xl sm:text-2xl md:text-3xl text-matcha font-semibold uppercase tracking-widest mt-2"
        >
          Frontend Developer
        </motion.p>

        {/* Hero Actions */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-4 mt-10"
        >
          <a
            href="/CV-ATS-Updated.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-matcha hover:bg-matcha-hover text-milky-surface px-8 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-[1.03] hover:-translate-y-0.5 inline-flex items-center gap-2"
          >
            <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"></path>
            </svg>
            View CV / Resume
          </a>
          <a
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
            className="border-2 border-matcha text-matcha hover:bg-matcha hover:text-milky-surface px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-sm hover:scale-[1.03] hover:-translate-y-0.5 inline-flex items-center"
          >
            Let&apos;s Connect
          </a>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
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
