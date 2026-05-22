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
