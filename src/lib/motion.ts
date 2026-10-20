'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

// Curves shared with CSS (see --ease-* in globals.css).
export const EASE_OUT = 'expo.out';
export const EASE_IN_OUT = 'power3.inOut';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export const getLenis = () => (typeof window === 'undefined' ? undefined : window.__lenis);

/** Smooth-scrolls to an in-page target, falling back to native scrolling. */
export function scrollToTarget(target: string | HTMLElement, offset = 0) {
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(target, { offset, duration: 1.4 });
  else {
    const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
    el?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }
}

export const INTRO_DONE = 'bd:intro-done';
