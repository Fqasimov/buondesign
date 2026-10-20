'use client';

import { createElement, useEffect, useRef } from 'react';

type Props = { as?: 'div' | 'ol' | 'ul'; className?: string; children: React.ReactNode };

/** Adds data-in once the element is a quarter into view; CSS owns the actual motion. */
export function Reveal({ as = 'div', className, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.in = 'true';
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -20% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return createElement(as, { ref, className, 'data-reveal': '' }, children);
}
