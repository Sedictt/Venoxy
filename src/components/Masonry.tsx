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
  category?: 'photography' | 'design' | 'traditional' | 'digital';
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

const preloadImages = async (items: MasonryItem[]): Promise<MasonryItem[]> => {
  return Promise.all(
    items.map(
      item =>
        new Promise<MasonryItem>(resolve => {
          const img = new Image();
          img.src = item.img;
          img.onload = () => {
            resolve({
              ...item,
              aspectRatio: img.naturalHeight / img.naturalWidth
            });
          };
          img.onerror = () => {
            resolve({
              ...item,
              aspectRatio: 1 // fallback to square
            });
          };
        })
    )
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
    ['(min-width:500px)'],
    [2],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const [enrichedItems, setEnrichedItems] = useState<MasonryItem[]>([]);
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    let active = true;

    // Avoid synchronous state changes inside the effect body to satisfy ESLint
    Promise.resolve().then(() => {
      if (active) setImagesReady(false);
    });

    preloadImages(items).then(result => {
      if (active) {
        setEnrichedItems(result);
        setImagesReady(true);
      }
    });

    return () => {
      active = false;
    };
  }, [items]);

  const { grid, containerHeight } = useMemo(() => {
    if (!width || !enrichedItems.length) return { grid: [], containerHeight: 0 };

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    const gridData = enrichedItems.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      
      let height = child.height;
      if (!height && child.aspectRatio) {
        // dynamic visual height from calculated image proportions
        height = columnWidth * child.aspectRatio;
      } else if (!height) {
        height = columnWidth;
      }
      
      const y = colHeights[col];
      colHeights[col] += height;

      return { ...child, x, y, w: columnWidth, h: height };
    });

    return { grid: gridData, containerHeight: Math.max(...colHeights) };
  }, [columns, enrichedItems, width]);

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

  return (
    <div ref={containerRef} className="list" style={{ height: containerHeight }}>
      {grid.map(item => {
        return (
          <div
            key={item.id}
            data-key={item.id}
            className="item-wrapper"
            onClick={() => onItemClick && onItemClick(item)}
            onMouseEnter={e => handleMouseEnter(e, item)}
            onMouseLeave={e => handleMouseLeave(e, item)}
          >
            {/* Custom Gallery Card Design */}
            <div className="w-full h-full rounded-[16px] overflow-hidden border-[3px] border-matcha bg-milky-surface relative cursor-pointer group shadow-sm hover:shadow-[0_20px_40px_rgba(158,167,107,0.25)] transition-shadow duration-300">
              <img 
                src={item.img} 
                alt={item.title || 'Creative item'} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />

              {/* Dark Glass Overlay & Meta */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <span className="inline-block bg-matcha text-milky-surface text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm mb-2 self-start">
                  {item.category === "photography" ? "Photography" : 
                   item.category === "design" ? "Graphic Design" :
                   item.category === "traditional" ? "Traditional Art" : "Digital Art"}
                </span>
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="font-display font-bold text-xl tracking-tight leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-xs font-semibold mt-1">
                      {item.details}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-milky-surface/90 backdrop-blur-sm border border-matcha/30 flex items-center justify-center text-olive-primary shadow-md transform scale-90 group-hover:scale-100 transition-all duration-300">
                    <Maximize2 className="w-4 h-4 text-matcha" />
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
      })}
    </div>
  );
};

export default Masonry;
