'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/motion';
import type { Dictionary } from '@/i18n/dictionaries';
import { Picture, type MediaName } from './Picture';

const PHOTOS: MediaName[] = ['office-desk-wide', 'office-desk-side', 'office-lounge', 'office-wood-wall'];
// Each photo drifts at its own depth so the column reads as layered, not stacked.
const DEPTH = [-6, 10, -4, 8];

type Props = { t: Dictionary['office'] };

export function Office({ t }: Props) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      q('.office__photo').forEach((fig, i) => {
        gsap.fromTo(
          fig.querySelector('img'),
          { yPercent: -DEPTH[i] / 2, scale: 1.12 },
          { yPercent: DEPTH[i] / 2, scale: 1.12, ease: 'none', scrollTrigger: { trigger: fig, start: 'top bottom', end: 'bottom top', scrub: true } },
        );
        gsap.fromTo(
          fig,
          { clipPath: 'inset(12% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: fig, start: 'top 95%', end: 'top 45%', scrub: true } },
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="project" className="office" data-tone="dark">
      <div className="office__text">
        <h2 className="office__title">{t.title}</h2>
        <p className="office__lead">{t.text}</p>
        <dl className="facts">
          {t.facts.map((f) => (
            <div key={f.term}>
              <dt>{f.term}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="office__photos">
        {PHOTOS.map((m, i) => (
          <figure key={m} className={`office__photo office__photo--${i + 1}`}>
            <div className="office__img">
              <Picture name={m} alt={t.captions[i]} sizes="(max-width: 760px) 92vw, 34vw" />
            </div>
            <figcaption>{t.captions[i]}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
