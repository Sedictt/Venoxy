"use client";

import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins client-side before any usage
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);
  ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });
}

interface TransitionContextProps {
  navigateWithTransition: (href: string) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextProps | null>(null);

export function useTransitionRouter() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransitionRouter must be used within a PageTransitionProvider");
  }
  return context;
}

interface PageTransitionProviderProps {
  children: React.ReactNode;
}

export function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const isTransitioningRef = useRef(false);
  const targetHrefRef = useRef<string | null>(null);
  
  const overlayRef = useRef<HTMLDivElement>(null);

  // Cover animation: Sweeps block elements from bottom-right to top-left to hide the current page
  const cover = (): Promise<void> => {
    return new Promise((resolve) => {
      if (!overlayRef.current) {
        resolve();
        return;
      }
      
      const blocks = overlayRef.current.querySelectorAll("[data-transition-block]");
      
      // 1. Show the overlay block panel
      gsap.set(overlayRef.current, { autoAlpha: 1, pointerEvents: "none" });
      
      // 2. Set all block scaling to 0
      gsap.set(blocks, { scaleY: 0 });
      
      // 3. Animate blocks to scaleY: 1
      gsap.to(blocks, {
        scaleY: 1,
        duration: 0.75,
        ease: "power4.inOut",
        stagger: {
          grid: [2, 5],
          from: "end",
          each: 0.04,
        },
        onComplete: () => {
          resolve();
        },
      });
    });
  };

  // Reveal animation: Sweeps blocks from top-left to bottom-right to reveal the new page
  const reveal = (): Promise<void> => {
    return new Promise((resolve) => {
      if (!overlayRef.current) {
        resolve();
        return;
      }
      
      const blocks = overlayRef.current.querySelectorAll("[data-transition-block]");
      
      // 1. Ensure blocks are set to full cover
      gsap.set(blocks, { scaleY: 1 });
      
      // 2. Animate blocks to scaleY: 0
      gsap.to(blocks, {
        scaleY: 0,
        duration: 0.95,
        ease: "power4.inOut",
        stagger: {
          grid: [2, 5],
          from: "start",
          each: 0.045,
        },
        onComplete: () => {
          // 3. Hide overlay once done
          gsap.set(overlayRef.current, { autoAlpha: 0 });
          resolve();
        },
      });
    });
  };

  const navigateWithTransition = async (href: string) => {
    // 1. Guard against double-clicks
    if (isTransitioningRef.current) return;
    
    // 2. Store target href
    targetHrefRef.current = href;
    
    // 3. Lock transitioning state
    isTransitioningRef.current = true;
    setIsTransitioning(true);
    
    // 4. Run covering timeline
    await cover();
    
    // 5. Fire route push
    router.push(href);
  };

  // Listen to pathname changes to initiate the reveal wipe
  useEffect(() => {
    if (isTransitioningRef.current && targetHrefRef.current) {
      // Wrap in double requestAnimationFrame to ensure Next.js has mounted the new DOM elements
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          reveal().then(() => {
            // Reset state refs
            isTransitioningRef.current = false;
            setIsTransitioning(false);
            targetHrefRef.current = null;
          });
        });
      });
    } else {
      // Fallback: Ensure overlay stays fully hidden on initial page landing
      if (overlayRef.current) {
        gsap.set(overlayRef.current, { autoAlpha: 0 });
      }
    }
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigateWithTransition, isTransitioning }}>
      {/* Content wrapper */}
      <div className="w-full flex-grow flex flex-col">
        {children}
      </div>

      {/* Grid-wipe transition overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[999] pointer-events-none flex flex-col w-full h-full"
        style={{ opacity: 0, visibility: "hidden" }}
        aria-hidden="true"
      >
        {/* Top half: 5 columns */}
        <div className="flex h-1/2 w-full" data-transition-row="top">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={`top-${idx}`}
              data-transition-block
              className="h-full flex-1 bg-black dark:bg-zinc-950"
              style={{ transform: "scaleY(1)", transformOrigin: "top" }}
            />
          ))}
        </div>
        {/* Bottom half: 5 columns */}
        <div className="flex h-1/2 w-full" data-transition-row="bottom">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={`bottom-${idx}`}
              data-transition-block
              className="h-full flex-1 bg-black dark:bg-zinc-950"
              style={{ transform: "scaleY(1)", transformOrigin: "bottom" }}
            />
          ))}
        </div>
      </div>
    </TransitionContext.Provider>
  );
}

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

export function TransitionLink({
  href,
  children,
  className,
  ...props
}: TransitionLinkProps) {
  const { navigateWithTransition, isTransitioning } = useTransitionRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 1. Skip on standard modifiers (e.g. command clicks to open tabs)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }

    // 2. Skip on external endpoints
    const isExternal =
      href.startsWith("http") || href.startsWith("//") || href.startsWith("mailto:") || href.startsWith("tel:");
    if (isExternal) {
      return;
    }

    // 3. Skip on standard hash anchors
    if (href.startsWith("#")) {
      return;
    }

    // 4. Skip if the page matches current pathname
    const cleanHref = href.split("?")[0].split("#")[0];
    const cleanPathname = window.location.pathname;
    if (cleanHref === cleanPathname) {
      e.preventDefault();
      return;
    }

    // If currently transitioning, block extra events
    if (isTransitioning) {
      e.preventDefault();
      return;
    }

    // Otherwise, intercept default click and route through the context
    e.preventDefault();
    navigateWithTransition(href);
  };

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
