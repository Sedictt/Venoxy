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
      {/* Background Graphic Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Soft floating blob 1 */}
        <motion.div
          className="absolute w-[35vw] h-[35vw] max-w-[400px] rounded-full bg-matcha/10 blur-[80px]"
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ top: "15%", left: "15%" }}
        />
        {/* Soft floating blob 2 */}
        <motion.div
          className="absolute w-[40vw] h-[40vw] max-w-[450px] rounded-full bg-matcha/5 blur-[100px]"
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ bottom: "10%", right: "10%" }}
        />
      </div>

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
