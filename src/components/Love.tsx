"use client";

import { motion, Variants } from "framer-motion";
import { Monitor, Sparkles, Cpu } from "lucide-react";

interface LoveCard {
  num: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function Love() {
  const cards: LoveCard[] = [
    {
      num: "01",
      title: "FrontEnd & Design",
      description: "Creating seamless, beautiful UI/UX with modern web frameworks and clean layout systems.",
      icon: <Monitor className="w-16 h-16" />
    },
    {
      num: "02",
      title: "Creative Coding",
      description: "Merging code and design to build interactive digital art, game mechanics, and engaging web experiences.",
      icon: <Sparkles className="w-16 h-16" />
    },
    {
      num: "03",
      title: "Agentic Dev",
      description: "Utilizing autonomous AI workflows to supercharge productivity, streamline backend/frontend logic, and ship robust projects rapidly.",
      icon: <Cpu className="w-16 h-16" />
    }
  ];

  const cardVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        delay: index * 0.15
      }
    })
  };

  return (
    <section id="love" className="py-24 w-full bg-gradient-to-b from-milky-surface/10 to-milky">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Section Title */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="inline-block bg-matcha text-milky-surface text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-sm mb-4">
            Interests
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-6xl text-olive-primary tracking-tight">
            Things I Love
          </h2>
        </div>

        {/* Interests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.num}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                borderColor: "#9EA76B",
                backgroundColor: "#EFE8CA",
                boxShadow: "0 24px 48px rgba(158, 167, 107, 0.12)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-milky-surface border-3 border-matcha/35 rounded-[40px] p-12 flex flex-col gap-6 cursor-default transition-colors duration-500 relative"
            >
              {/* Number Badge and Icon Row */}
              <div className="flex justify-between items-start">
                <motion.div 
                  className="font-display text-5xl font-extrabold text-matcha opacity-35 select-none origin-left"
                  whileHover={{ opacity: 0.8, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                >
                  {card.num}
                </motion.div>
                <motion.div 
                  className="text-matcha"
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {card.icon}
                </motion.div>
              </div>

              {/* Text Info */}
              <div className="mt-4">
                <h3 className="font-display font-bold text-2xl text-olive-primary mb-3">
                  {card.title}
                </h3>
                <p className="text-olive-secondary text-sm leading-relaxed font-semibold">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
