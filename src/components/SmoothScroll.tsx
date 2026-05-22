"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    let frameId = 0;
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
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
