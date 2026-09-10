import { useState, useEffect } from 'react';

interface ScrollState {
  isScrolled: boolean;
  scrollY: number;
  scrollDirection: 'up' | 'down' | null;
}

export function useScrollState(threshold = 40): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    isScrolled: false,
    scrollY: 0,
    scrollDirection: null,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const isScrolled = currentScrollY > threshold;
          const direction = currentScrollY > lastScrollY ? 'down' : 'up';

          setScrollState({
            isScrolled,
            scrollY: currentScrollY,
            scrollDirection: direction,
          });

          lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial evaluation

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return scrollState;
}
