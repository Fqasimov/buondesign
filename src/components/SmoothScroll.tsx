'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion, scrollToTarget } from '@/lib/motion';

/** Lenis inertia scrolling driven by GSAP's ticker so pinned scenes and scroll stay in lockstep. */
export function SmoothScroll() {
  useEffect(() => {
    let lenis: Lenis | undefined;
    const tick = (time: number) => lenis?.raf(time * 1000);

    if (!prefersReducedMotion()) {
      lenis = new Lenis({ lerp: 0.13, wheelMultiplier: 1.15, touchMultiplier: 1.4 });
      window.__lenis = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      if (document.documentElement.classList.contains('is-loading')) lenis.stop();
    }

    // In-page links glide instead of jumping.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || a.hash.length < 2) return;
      const el = document.querySelector<HTMLElement>(a.hash);
      if (!el) return;
      e.preventDefault();
      scrollToTarget(el);
      history.replaceState(null, '', a.hash);
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(tick);
      lenis?.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
