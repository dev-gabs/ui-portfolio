import { useRef, useEffect, useCallback } from 'react';

interface ParallaxOptions {
  disabled?: boolean;
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(options: ParallaxOptions = {}) {
  const containerRef = useRef<T>(null);
  const elementsRef = useRef<Map<HTMLElement, number>>(new Map());

  const registerElement = useCallback((node: HTMLElement | null, depth: number) => {
    if (node) {
      elementsRef.current.set(node, depth);
    }
  }, []);

  const unregisterElement = useCallback((node: HTMLElement | null) => {
    if (node) {
      elementsRef.current.delete(node);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || options.disabled) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Check for touch / fine pointer
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReducedMotion || isTouch) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width - 0.5;
      targetY = (e.clientY - rect.top) / rect.height - 0.5;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const updatePhysics = () => {
      // Smooth interpolation (lerp)
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      elementsRef.current.forEach((depth, el) => {
        const moveX = (currentX * depth * 24).toFixed(2);
        const moveY = (currentY * depth * 24).toFixed(2);
        el.style.setProperty('--parallax-x', `${moveX}px`);
        el.style.setProperty('--parallax-y', `${moveY}px`);
      });

      rafId = requestAnimationFrame(updatePhysics);
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);
    rafId = requestAnimationFrame(updatePhysics);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [options.disabled]);

  return { containerRef, registerElement, unregisterElement };
}
