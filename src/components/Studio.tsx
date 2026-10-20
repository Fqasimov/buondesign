'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/motion';
import type { Dictionary } from '@/i18n/dictionaries';
import { Picture, type MediaName } from './Picture';

const PREVIEWS: MediaName[] = ['apt-dining-close', 'apt-sofa', 'office-desk-wide'];

type Props = { t: Dictionary['studio'] };

export function Studio({ t }: Props) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // The statement is read word by word: each word warms up as it passes the reading line.
      gsap.fromTo(
        q('.statement__w'),
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: q('.statement')[0], start: 'top 85%', end: 'top 35%', scrub: true },
        },
      );

      // Rows arrive once, top to bottom: the rule draws, the name rises out of its
      // mask, the description settles in. Plays on entry rather than scrubbing.
      const rows = q('.disciplines__row');
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'expo.out' },
      });
      rows.forEach((row, i) => {
        const at = i * 0.09;
        tl.fromTo(row.querySelector('.disciplines__rule'), { scaleX: 0 }, { scaleX: 1, duration: 0.9 }, at)
          .fromTo(row.querySelector('.disciplines__name-inner'), { yPercent: 105 }, { yPercent: 0, duration: 0.8 }, at + 0.05)
          .fromTo(row.querySelector('.disciplines__text'), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.6 }, at + 0.18);
        const thumb = row.querySelector('.disciplines__thumb');
        if (thumb && getComputedStyle(thumb).display !== 'none') {
          tl.fromTo(thumb, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8 }, at + 0.2);
        }
      });
      const st = ScrollTrigger.create({ trigger: q('.disciplines')[0], start: 'top 80%', once: true, onEnter: () => tl.play() });
      return () => st.kill();
    });

    // Preview follows the pointer and opens like a blind (fine pointers only).
    mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const preview = q('.disciplines__preview')[0] as HTMLElement;
      const list = q('.disciplines')[0] as HTMLElement;
      const xTo = gsap.quickTo(preview, 'x', { duration: 0.32, ease: 'power3.out' });
      const yTo = gsap.quickTo(preview, 'y', { duration: 0.32, ease: 'power3.out' });
      let shown = false;
      const move = (e: PointerEvent) => {
        const r = list.getBoundingClientRect();
        xTo(e.clientX - r.left);
        yTo(e.clientY - r.top);
      };
      const enter = (i: number) => (e: PointerEvent) => {
        preview.dataset.active = String(i);
        if (shown) return;
        shown = true;
        // First entry: jump to the pointer, then reveal, so it never slides in from a corner.
        const r = list.getBoundingClientRect();
        gsap.set(preview, { x: e.clientX - r.left, y: e.clientY - r.top });
        gsap.fromTo(
          preview,
          { autoAlpha: 1, clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.3, ease: 'expo.out', overwrite: true },
        );
      };
      const leave = () => {
        shown = false;
        gsap.to(preview, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.18, ease: 'power2.out', overwrite: true });
      };
      const rows = q('.disciplines__row') as HTMLElement[];
      const handlers = rows.map((row, i) => {
        const h = enter(i);
        row.addEventListener('pointerenter', h);
        return h;
      });
      list.addEventListener('pointermove', move);
      list.addEventListener('pointerleave', leave);
      gsap.set(preview, { autoAlpha: 1, clipPath: 'inset(100% 0% 0% 0%)' });
      return () => {
        rows.forEach((row, i) => row.removeEventListener('pointerenter', handlers[i]));
        list.removeEventListener('pointermove', move);
        list.removeEventListener('pointerleave', leave);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="studio" className="studio" data-tone="dark">
      <h2 className="statement">
        {t.statement.split(' ').map((w, i) => (
          <span key={i} className="statement__w">
            {w}{' '}
          </span>
        ))}
      </h2>

      <div className="disciplines">
        <ol>
          {t.disciplines.map((d, i) => (
            <li key={d.name} className="disciplines__row">
              <span className="disciplines__rule" aria-hidden />
              <span className="disciplines__name">
                <span className="disciplines__name-inner">{d.name}</span>
              </span>
              <span className="disciplines__text">{d.text}</span>
              <Picture className="disciplines__thumb" name={PREVIEWS[i]} alt="" sizes="92vw" />
            </li>
          ))}
        </ol>
        <div className="disciplines__preview" aria-hidden>
          {PREVIEWS.map((m) => (
            <Picture key={m} name={m} alt="" sizes="22vw" />
          ))}
        </div>
      </div>
    </section>
  );
}
