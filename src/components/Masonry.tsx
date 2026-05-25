"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Maximize2 } from 'lucide-react';

import './Masonry.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const useMedia = <T,>(queries: string[], values: T[], defaultValue: T): T => {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue;
    return values[queries.findIndex(q => window.matchMedia(q).matches)] ?? defaultValue;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const get = () => values[queries.findIndex(q => window.matchMedia(q).matches)] ?? defaultValue;
    const handler = () => setValue(get());
    
    // Listeners compatibility check
    const mediaQueryLists = queries.map(q => window.matchMedia(q));
    mediaQueryLists.forEach(mql => mql.addEventListener('change', handler));
    
    return () => {
      mediaQueryLists.forEach(mql => mql.removeEventListener('change', handler));
    };
  }, [queries, values, defaultValue]);

  return value;
};

const useMeasure = (): [React.RefObject<HTMLDivElement | null>, { width: number; height: number }] => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

export interface MasonryItem {
  id: string;
  img: string;
  url?: string;
  height?: number;
  aspectRatio?: number;
  title?: string;
  category?: 'photography' | 'design' | 'traditional' | 'digital' | 'others';
  details?: string;
  originalIndex?: number;
}

interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  onItemClick?: (item: MasonryItem) => void;
}

interface MasonryCardProps {
  item: MasonryItem;
  onItemClick?: (item: MasonryItem) => void;
  handleMouseEnter: (e: React.MouseEvent<HTMLDivElement>, item: MasonryItem) => void;
  handleMouseLeave: (e: React.MouseEvent<HTMLDivElement>, item: MasonryItem) => void;
  colorShiftOnHover: boolean;
}

const MasonryCard = ({
  item,
  onItemClick,
  handleMouseEnter,
  handleMouseLeave,
  colorShiftOnHover
}: MasonryCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "1800px", // Trigger preload 1800px (~2.5 screen heights) before scrolling into view
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      data-key={item.id}
      className="item-wrapper"
      onClick={() => onItemClick && onItemClick(item)}
      onMouseEnter={e => handleMouseEnter(e, item)}
      onMouseLeave={e => handleMouseLeave(e, item)}
    >
      {/* Custom Gallery Card Design */}
      <div className="w-full h-full rounded-[20px] overflow-hidden border border-matcha/20 bg-milky-surface/85 backdrop-blur-sm relative cursor-pointer group shadow-[0_4px_20px_rgba(65,70,42,0.03)] hover:shadow-[0_24px_48px_rgba(158,167,107,0.18)] hover:border-matcha/80 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
        
        {/* Shimmer Placeholder while individual image is downloading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-milky-surface/40 flex items-center justify-center overflow-hidden z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-matcha/15 to-transparent -translate-x-full animate-shimmer" />
            <div className="w-10 h-10 rounded-full bg-matcha/10 animate-pulse flex items-center justify-center text-matcha/30">
              <Maximize2 className="w-4 h-4" />
            </div>
          </div>
        )}

        {shouldLoad ? (
          <img 
            src={item.img} 
            alt={item.title || 'Creative item'} 
            onLoad={() => {
              // Add a deliberate premium delay to let the user experience the shimmer transition on fast local networks
              setTimeout(() => setImageLoaded(true), 500);
            }}
            className={`w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.06] ${
              imageLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-95 blur-[4px]"
            }`}
          />
        ) : (
          <div className="w-full h-full bg-milky-surface/40" />
        )}

        {/* Dark Glass Overlay & Meta */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-5 text-white transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          imageLoaded ? "opacity-100 sm:opacity-0 sm:group-hover:opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}>
          <span className="inline-block bg-matcha text-milky-surface text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm mb-2.5 self-start shadow-sm">
            {item.category === "photography" ? "Photography" : 
             item.category === "design" ? "Graphic Design" :
             item.category === "traditional" ? "Traditional Art" :
             item.category === "digital" ? "Digital Art" : "Others"}
          </span>
          <div className="flex justify-between items-end gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="font-display font-bold text-lg sm:text-xl tracking-tight leading-snug truncate">
                {item.title}
              </h3>
              <p className="text-white/60 text-xs font-semibold mt-1 truncate">
                {item.details}
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-milky-surface/95 dark:bg-zinc-900/95 backdrop-blur-sm border border-matcha/30 flex items-center justify-center text-olive-primary shadow-sm transform scale-90 sm:scale-95 sm:group-hover:scale-100 transition-all duration-500 hover:rotate-12 hover:bg-matcha hover:text-milky-surface hover:border-matcha shrink-0">
              <Maximize2 className="w-4 h-4 text-matcha group-hover:text-inherit transition-colors" />
            </div>
          </div>
        </div>

        {/* Optional Color Overlay on Hover */}
        {colorShiftOnHover && (
          <div
            className="color-overlay"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(45deg, rgba(158,167,107,0.4), rgba(65,70,42,0.4))',
              opacity: 0,
              pointerEvents: 'none',
              borderRadius: '13px'
            }}
          />
        )}
      </div>
    </div>
  );
};

const Masonry = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  onItemClick
}: MasonryProps) => {
  const columns = useMedia(
    ['(min-width: 900px)', '(min-width: 600px)'],
    [3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);

  const { grid, containerHeight } = useMemo(() => {
    if (!width || !items.length) return { grid: [], containerHeight: 0 };

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    const gridData = items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      
      const aspect = child.aspectRatio || 1;
      const h = columnWidth * aspect;
      const y = colHeights[col];
      colHeights[col] += h + 24; // 24px gap
      
      return { ...child, x, y, w: columnWidth, h };
    });

    return { grid: gridData, containerHeight: Math.max(...colHeights) };
  }, [columns, items, width]);

  // Only mark ready once the grid is actually computed with real data
  useEffect(() => {
    if (grid.length > 0 && width > 0) {
      // Small delay so the skeleton is visible and transitions feel smooth
      const timer = setTimeout(() => setImagesReady(true), 400);
      return () => clearTimeout(timer);
    }
  }, [grid, width]);

  // Reset loader instantly when items change (e.g., tab switching)
  useEffect(() => {
    setImagesReady(false);
  }, [items]);

  const hasMounted = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (!imagesReady || grid.length === 0) return;

    // Refresh ScrollTrigger to ensure positions are computed correctly
    ScrollTrigger.refresh();

    grid.forEach((item) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h
      };

      if (!hasMounted.current) {
        // Scroll-Reveal Initial Animation with Local Offset
        const getInitialOffset = () => {
          let direction = animateFrom;

          if (animateFrom === 'random') {
            const directions = ['top', 'bottom', 'left', 'right'];
            direction = directions[Math.floor(Math.random() * directions.length)] as 'top' | 'bottom' | 'left' | 'right';
          }

          switch (direction) {
            case 'top':
              return { x: item.x, y: item.y - 80, scale: 0.95 };
            case 'bottom':
              return { x: item.x, y: item.y + 80, scale: 0.95 };
            case 'left':
              return { x: item.x - 80, y: item.y, scale: 0.95 };
            case 'right':
              return { x: item.x + 80, y: item.y, scale: 0.95 };
            case 'center':
              return { x: item.x, y: item.y, scale: 0.85 };
            default:
              return { x: item.x, y: item.y + 80, scale: 0.95 };
          }
        };

        const initialOffset = getInitialOffset();
        const initialState = {
          opacity: 0,
          scale: initialOffset.scale,
          width: item.w,
          height: item.h,
          x: initialOffset.x,
          y: initialOffset.y,
          ...(blurToFocus && { filter: 'blur(12px)' })
        };

        gsap.fromTo(selector, initialState, {
          opacity: 1,
          scale: 1,
          ...animationProps,
          ...(blurToFocus && { filter: 'blur(0px)' }),
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: selector,
            start: 'top 92%', // Trigger when the top of the item enters 92% of the viewport height
            toggleActions: 'play none none none',
            id: item.id
          }
        });
      } else {
        // Recalculating positions (e.g. resize or filters)
        gsap.to(selector, {
          ...animationProps,
          duration: duration,
          ease: ease,
          overwrite: 'auto'
        });
      }
    });

    hasMounted.current = true;
    
    return () => {
      // Cleanup active GSAP animations and ScrollTriggers when unmounting
      grid.forEach(item => {
        gsap.killTweensOf(`[data-key="${item.id}"]`);
        const trigger = ScrollTrigger.getById(item.id);
        if (trigger) trigger.kill();
      });
    };
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease, width]);

  // Reset mount reference on items list change to re-trigger fly-in
  useEffect(() => {
    hasMounted.current = false;
  }, [items]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, item: MasonryItem) => {
    const element = e.currentTarget;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: hoverScale,
        duration: 0.4,
        ease: 'power2.out'
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay');
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0.3,
          duration: 0.3
        });
      }
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>, item: MasonryItem) => {
    const element = e.currentTarget;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out'
      });
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay');
      if (overlay) {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3
        });
      }
    }
  };

  const mockHeights = [
    'h-72', 'h-96', 'h-64', 
    'h-80', 'h-72', 'h-96', 
    'h-64', 'h-80', 'h-72'
  ];

  return (
    <div ref={containerRef} className="w-full relative">
      {!imagesReady ? (
        <div className="grid grid-cols-1 min-[600px]:grid-cols-2 min-[900px]:grid-cols-3 gap-6 w-full py-2">
          {mockHeights.map((heightClass, idx) => (
            <div 
              key={idx}
              className={`w-full ${heightClass} rounded-[20px] border border-matcha/10 bg-milky-surface/40 relative overflow-hidden shadow-[0_4px_20px_rgba(65,70,42,0.02)]`}
            >
              {/* Smooth Shimmer Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-matcha/15 to-transparent -translate-x-full animate-shimmer" />
              
              {/* Technical Detail Skeleton Outlines */}
              <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-2.5">
                <div className="w-14 h-4 bg-matcha/20 rounded-sm animate-pulse" />
                <div className="w-2/3 h-5 bg-matcha/25 rounded-md animate-pulse" />
                <div className="w-2/5 h-3 bg-matcha/15 rounded-sm animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="list" style={{ height: containerHeight }}>
          {grid.map(item => {
            return (
              <MasonryCard
                key={item.id}
                item={item}
                onItemClick={onItemClick}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                colorShiftOnHover={colorShiftOnHover}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Masonry;
