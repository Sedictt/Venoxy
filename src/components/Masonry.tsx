"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Maximize2 } from 'lucide-react';

import './Masonry.css';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const MASONRY_QUERIES = ['(min-width: 900px)', '(min-width: 600px)'];
const MASONRY_COLUMN_VALUES = [3, 2];
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
  thumbSrc?: string;
  blurDataURL?: string;
  url?: string;
  height?: number;
  aspectRatio?: number;
  width?: number;
  heightPx?: number;
  title?: string;
  category?: 'photography' | 'design' | 'traditional' | 'digital' | 'others';
  details?: string;
  originalIndex?: number;
  displayIndex?: number;
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

const GalleryCardImage = ({
  item,
  eager
}: {
  item: MasonryItem;
  eager: boolean;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="absolute inset-0 bg-milky-surface/40 overflow-hidden"
      style={
        item.blurDataURL
          ? {
              backgroundImage: `url(${item.blurDataURL})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }
          : undefined
      }
    >
      {!imageLoaded && !item.blurDataURL && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-matcha/15 to-transparent -translate-x-full animate-shimmer" />
      )}

      <img
        src={item.thumbSrc ?? item.img}
        alt={item.title || 'Creative item'}
        loading="eager"
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-150 ease-out group-hover:scale-[1.025] ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
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
    MASONRY_QUERIES,
    MASONRY_COLUMN_VALUES,
    1
  );

  const [containerRef, { width }] = useMeasure();

  const { grid, containerHeight } = useMemo(() => {
    if (!width || !items.length) return { grid: [], containerHeight: 0 };

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    const gridData = items.map((child, displayIndex) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      
      let height = child.height;
      const aspectRatio = child.aspectRatio ?? (
        child.width && child.heightPx ? child.heightPx / child.width : undefined
      );

      if (!height && aspectRatio) {
        // dynamic visual height from calculated image proportions
        height = columnWidth * aspectRatio;
      } else if (!height) {
        height = columnWidth;
      }
      
      const y = colHeights[col];
      colHeights[col] += height;

      return { ...child, x, y, w: columnWidth, h: height, displayIndex };
    });

    return { grid: gridData, containerHeight: Math.max(...colHeights) };
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (grid.length === 0) return;

    grid.forEach((item) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h
      };

      if (!hasMounted.current) {
        gsap.set(selector, animationProps);
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
      // Cleanup active GSAP animations when unmounting
      grid.forEach(item => {
        gsap.killTweensOf(`[data-key="${item.id}"]`);
      });
    };
  }, [grid, stagger, animateFrom, blurToFocus, duration, ease, width]);

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
            <div className="w-full h-full rounded-[20px] overflow-hidden border border-matcha/20 bg-milky-surface/85 relative cursor-pointer group shadow-[0_3px_10px_rgba(65,70,42,0.04)] hover:shadow-[0_12px_24px_rgba(65,70,42,0.12)] hover:border-matcha/70 transition-[border-color,box-shadow] duration-200 ease-out">
              <GalleryCardImage item={item} eager={(item.displayIndex ?? 0) < columns * 2} />

              {/* Dark Glass Overlay & Meta */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-5 text-white transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 pointer-events-auto">
                <span className="inline-block bg-matcha text-milky-surface text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm mb-2.5 self-start shadow-sm">
                  {item.category === "photography" ? "Photography" : 
                   item.category === "design" ? "Graphics Design" :
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
      })}
    </div>
  );
};

export default Masonry;
