'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion, getLenis, INTRO_DONE } from '@/lib/motion';
import { MonogramB, MonogramD } from './Brand';

// ── Facade drawing (viewBox 600 × 560) ────────────────────────────────────────
// A neoclassical apartment block: plinth, four residential floors, cornice with
// dentils, a small pediment and the entrance door the camera later walks into.
const DOOR = { x: 268, y: 450, w: 64, h: 90 };

function facade(): { d: string; y: number }[] {
  const p: { d: string; y: number }[] = [];
  const add = (d: string, y: number) => p.push({ d, y });
  add('M40 540H560', 540);
  add('M120 540V120', 540);
  add('M480 540V120', 540);
  add('M116 446H484', 446);
  add('M120 440H480', 440);
  add('M134 440V128', 440);
  add('M466 440V128', 440);
  // ground floor: arched windows either side of the entrance
  for (const cx of [170, 226, 374, 430]) {
    const x = cx - 15;
    add(`M${x} 524V484A15 14 0 0 1 ${x + 30} 484V524Z`, 524);
  }
  add(`M${DOOR.x} 540V${DOOR.y}H${DOOR.x + DOOR.w}V540`, 540);
  add(`M${DOOR.x - 6} ${DOOR.y}A38 26 0 0 1 ${DOOR.x + DOOR.w + 6} ${DOOR.y}`, DOOR.y);
  // residential floors
  const cols = [162, 231, 300, 369, 438];
  [362, 284, 206, 128].forEach((top, f) => {
    for (const cx of cols) {
      const x = cx - 15;
      const y = top + 14;
      add(`M${x} ${y}h30v48h-30Z`, y + 48);
      add(`M${x - 4} ${y + 52}h38`, y + 52);
    }
    if (f === 2) {
      // balcony on the second floor
      add(`M212 ${top + 62}H388`, top + 62);
      for (let x = 216; x <= 384; x += 8) add(`M${x} ${top + 62}v12`, top + 74);
      add(`M212 ${top + 74}H388`, top + 74);
    }
  });
  // cornice, dentils, attic and pediment
  add('M110 120H490', 120);
  add('M114 112H486', 112);
  for (let x = 126; x <= 474; x += 12) add(`M${x} 120v6`, 126);
  add('M124 104H476', 104);
  add('M232 104L300 70L368 104', 104);
  return p.sort((a, b) => b.y - a.y);
}

const PATHS = facade();

type Props = { label: string; tagline: string };

export function Loader({ label, tagline }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const html = document.documentElement;
    const q = gsap.utils.selector(el);
    const stage = q('.loader__stage')[0] as HTMLElement;
    const mark = q('.loader__mark')[0] as HTMLElement;
    const door = el.querySelector('.loader__door') as SVGRectElement;

    // Ready = fonts + the first room the visitor will see, capped so a slow
    // network never holds the intro hostage.
    const heroImg = document.querySelector<HTMLImageElement>('[data-hero-img] img');
    const imgReady = heroImg
      ? (heroImg.complete ? Promise.resolve() : new Promise((r) => heroImg.addEventListener('load', r, { once: true })))
          .then(() => heroImg.decode?.().catch(() => undefined))
      : Promise.resolve();
    const ready = Promise.race([
      Promise.all([document.fonts?.ready, imgReady]),
      new Promise((r) => setTimeout(r, 4000)),
    ]);

    const finish = () => {
      html.classList.remove('is-loading');
      getLenis()?.start();
      try {
        sessionStorage.setItem('bd-intro', '1');
      } catch {}
      window.dispatchEvent(new Event(INTRO_DONE));
      setGone(true);
    };

    const quick = html.classList.contains('intro-seen') || prefersReducedMotion();
    if (quick) {
      ready.then(() => gsap.to(el, { autoAlpha: 0, duration: 0.45, ease: 'power2.out', onComplete: finish }));
      return;
    }

    const ctx = gsap.context(() => {
      const lines = q('.loader__line');
      gsap.set(lines, { strokeDasharray: 1, strokeDashoffset: 1 });

      // Where the monogram lands on the facade door: B|D seam on the door's
      // centre line, 44% down, as wide as 62% of the door — same as the hero door.
      const toDoor = () => {
        const d = door.getBoundingClientRect();
        const m = mark.getBoundingClientRect();
        const w = d.width * 0.62;
        const s = w / m.width;
        const seam = 162 / 252; // B|D seam: B and D sit side by side (162 + 90 viewBox units)
        const left = d.left + d.width / 2 - seam * w;
        const top = d.top + d.height * 0.44 - (m.height * s) / 2;
        return { x: left - m.left, y: top - m.top, scale: s };
      };

      const intro = gsap.timeline();
      intro
        .fromTo(q('.loader__b'), { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'expo.out' }, 0.1)
        .fromTo(q('.loader__d'), { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'expo.out' }, 0.25)
        .fromTo(q('.loader__word'), { autoAlpha: 0, letterSpacing: '0.7em' }, { autoAlpha: 1, letterSpacing: '0.42em', duration: 0.8, ease: 'expo.out' }, 0.3)
        .to(q('.loader__word'), { autoAlpha: 0, duration: 0.25, ease: 'power1.out' }, 0.95)
        .addLabel('build', 0.9)
        .to(mark, { ...toDoor(), duration: 0.75, ease: 'power3.inOut' }, 'build')
        .to(lines, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out', stagger: { amount: 0.4 } }, 'build+=0.1')
        .to(door, { fillOpacity: 1, duration: 0.3, ease: 'power1.out' }, 'build+=0.55');

      Promise.all([intro.then(), ready]).then(() => {
        // Walk through the facade door into the real door of the walkthrough.
        const hero = document.querySelector<HTMLElement>('[data-door]');
        const d = door.getBoundingClientRect();
        const h = hero?.getBoundingClientRect();
        const cx = d.left + d.width / 2;
        const cy = d.top + d.height / 2;
        const s = h ? h.height / d.height : 12;
        gsap.set(stage, { transformOrigin: `${cx}px ${cy}px` });
        gsap
          .timeline({ onComplete: finish })
          .to(stage, {
            scale: s,
            x: h ? h.left + h.width / 2 - cx : 0,
            y: h ? h.top + h.height / 2 - cy : 0,
            duration: 0.9,
            ease: 'power3.inOut',
          })
          .to(q('.loader__lines'), { autoAlpha: 0, duration: 0.5, ease: 'power1.in' }, 0.15)
          .to(el, { autoAlpha: 0, duration: 0.35, ease: 'power1.out' }, 0.75);
      });
    }, el);

    return () => ctx.revert();
  }, []);

  if (gone) return null;

  return (
    <div ref={root} className="loader" role="status" aria-label={label}>
      <div className="loader__stage">
        <svg className="loader__building" viewBox="0 0 600 560" aria-hidden>
          <g className="loader__lines">
            {PATHS.map((p, i) => (
              <path key={i} className="loader__line" d={p.d} pathLength={1} />
            ))}
          </g>
          <rect className="loader__door" x={DOOR.x} y={DOOR.y} width={DOOR.w} height={DOOR.h} />
        </svg>
        <div className="loader__mark">
          <MonogramB className="loader__b" />
          <MonogramD className="loader__d" />
        </div>
        <p className="loader__word" aria-hidden>
          BUON DESIGN
          <span>{tagline}</span>
        </p>
      </div>
    </div>
  );
}
