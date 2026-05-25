"use client";

import { motion } from "framer-motion";
import { Mail, FileText } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 w-full">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="relative bg-matcha dark:bg-milky-surface text-milky-surface dark:text-olive-primary px-8 py-20 sm:p-24 rounded-[40px] text-center shadow-[0_30px_60px_rgba(158,167,107,0.35)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.5)] dark:border dark:border-matcha/20 overflow-hidden transition-colors duration-500"
        >
          {/* Organic Background Blobs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 0.9, 1],
                rotate: [0, 45, -45, 0],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-16 -left-16 w-60 h-60 rounded-full bg-matcha-hover/30 dark:bg-matcha/5 blur-[40px]"
            />
            <motion.div
              animate={{
                scale: [1, 0.8, 1.1, 1],
                rotate: [0, -30, 30, 0],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-matcha-hover/20 dark:bg-matcha/5 blur-[50px]"
            />
          </div>

          <div className="relative z-10 max-w-[650px] mx-auto flex flex-col items-center">
            {/* Tag */}
            <span className="inline-block bg-milky-surface dark:bg-olive-primary text-matcha dark:text-milky-surface text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-sm mb-6 shadow-sm transition-colors duration-500">
              Collaboration
            </span>

            {/* Title */}
            <h2 className="font-display font-bold text-4xl sm:text-6xl text-milky-surface dark:text-olive-primary leading-none mb-6 tracking-tight transition-colors duration-500">
              Ready to build something unique?
            </h2>

            {/* Subtext */}
            <p className="font-sans text-sm sm:text-lg text-milky-surface/85 dark:text-olive-primary/80 font-semibold leading-relaxed max-w-[500px] mb-10 transition-colors duration-500">
              Currently accepting freelance projects and collaborations with design-forward agencies and startups.
            </p>

            {/* Contact & Resume Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.a
                href="mailto:venoxyarts@gmail.com"
                whileHover={{ 
                  y: -6, 
                  scale: 1.04,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="inline-flex items-center gap-3 bg-olive-primary dark:bg-matcha text-milky-surface hover:bg-[#858D5A] dark:hover:bg-matcha-hover font-display font-bold uppercase text-sm tracking-widest px-10 py-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                Get in touch
              </motion.a>

              <motion.a
                href="/CV-ATS-Updated.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  y: -6, 
                  scale: 1.04,
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="inline-flex items-center gap-3 border-2 border-milky-surface dark:border-matcha text-milky-surface dark:text-matcha hover:bg-milky-surface dark:hover:bg-matcha hover:text-matcha dark:hover:text-milky-surface font-display font-bold uppercase text-sm tracking-widest px-10 py-[18px] rounded-xl transition-all duration-300 shadow-md"
              >
                <FileText className="w-5 h-5" />
                View Resume
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
