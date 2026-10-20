'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/motion';
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
          scrollTrigger: { trigger: q('.statement')[0], start: 'top 78%', end: 'bottom 48%', scrub: true },
        },
      );
    });

    // Discipline preview follows the pointer with a little lag (fine pointers only).
    mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const preview = q('.disciplines__preview')[0] as HTMLElement;
      const list = q('.disciplines')[0] as HTMLElement;
      const xTo = gsap.quickTo(preview, 'x', { duration: 0.6, ease: 'power3.out' });
      const yTo = gsap.quickTo(preview, 'y', { duration: 0.6, ease: 'power3.out' });
      const move = (e: PointerEvent) => {
        const r = list.getBoundingClientRect();
        xTo(e.clientX - r.left);
        yTo(e.clientY - r.top);
      };
      const enter = (i: number) => () => {
        preview.dataset.active = String(i);
        gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'expo.out' });
      };
      const leave = () => gsap.to(preview, { autoAlpha: 0, scale: 0.94, duration: 0.2, ease: 'power2.out' });
      const rows = q('.disciplines__row');
      const handlers = rows.map((row, i) => {
        const h = enter(i);
        row.addEventListener('pointerenter', h);
        return h;
      });
      list.addEventListener('pointermove', move);
      list.addEventListener('pointerleave', leave);
      gsap.set(preview, { autoAlpha: 0, scale: 0.94 });
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
            <span className="disciplines__name">{d.name}</span>
            <span className="disciplines__text">{d.text}</span>
            <Picture className="disciplines__thumb" name={PREVIEWS[i]} alt="" sizes="40vw" />
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
