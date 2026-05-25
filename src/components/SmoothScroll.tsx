"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 0.75,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });

    let frameId = 0;
    let scrollEndTimer = 0;

    const markScrolling = () => {
      document.documentElement.classList.add("is-scrolling");
      window.clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(() => {
        document.documentElement.classList.remove("is-scrolling");
      }, 140);
    };

    lenis.on("scroll", markScrolling);

    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    // Handle modal toggles
    const handleToggleLenis = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail === "stop") lenis.stop();
      if (customEvent.detail === "start") lenis.start();
    };
    window.addEventListener("toggle-lenis", handleToggleLenis);

    // Sync scroll triggers if needed or just handle cleanup
    return () => {
      window.removeEventListener("toggle-lenis", handleToggleLenis);
      window.clearTimeout(scrollEndTimer);
      document.documentElement.classList.remove("is-scrolling");
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
