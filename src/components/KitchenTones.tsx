'use client';

import { useRef, useState } from 'react';
import type { Dictionary } from '@/i18n/dictionaries';
import { Picture, type MediaName } from './Picture';

// Swatches sampled from the renders; pos is where the caption box points.
const TONES: Record<string, { media: MediaName; swatch: string; focus: string; pin: [number, number]; side?: 'l' }> = {
  'boz-mavi': { media: 'kitchen-boz-mavi', swatch: '#7A787F', focus: '78% 50%', pin: [86, 52], side: 'l' },
  kasella: { media: 'kitchen-kasella', swatch: '#6A4935', focus: '30% 50%', pin: [24, 52] },
  'pastel-yasil': { media: 'kitchen-pastel-yasil', swatch: '#7E8068', focus: '50% 75%', pin: [58, 74] },
  ag: { media: 'kitchen-ag', swatch: '#ECE9E3', focus: '60% 45%', pin: [86, 46], side: 'l' },
  'aciq-bej': { media: 'kitchen-aciq-bej', swatch: '#D6CBBD', focus: '60% 40%', pin: [66, 48] },
  terrakota: { media: 'kitchen-terrakota', swatch: '#B4866F', focus: '35% 40%', pin: [30, 50] },
};

type Props = { t: Dictionary['tones'] };

export function KitchenTones({ t }: Props) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = t.items[active];

  // Roving focus across the tablist (arrow keys, Home/End).
  const onKeyDown = (e: React.KeyboardEvent) => {
    const n = t.items.length;
    const next =
      e.key === 'ArrowDown' || e.key === 'ArrowRight' ? (active + 1) % n
      : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? (active - 1 + n) % n
      : e.key === 'Home' ? 0
      : e.key === 'End' ? n - 1
      : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="tones" className="tones" data-tone="light">
      <div className="tones__intro">
        <h2 className="tones__title">{t.title}</h2>
        <p>{t.text}</p>
      </div>

      <div className="tones__body">
        <div className="tones__list" role="tablist" aria-label={t.hint} aria-orientation="vertical" onKeyDown={onKeyDown}>
          {t.items.map((item, i) => (
            <button
              key={item.id}
              ref={(b) => {
                tabs.current[i] = b;
              }}
              id={`tone-${item.id}`}
              role="tab"
              type="button"
              className="tone"
              aria-selected={i === active}
              aria-controls="tone-panel"
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
            >
              <span className="tone__swatch" style={{ background: TONES[item.id].swatch }} />
              <span className="tone__name">{item.name}</span>
              <span className="tone__text">{item.text}</span>
            </button>
          ))}
        </div>

        <div id="tone-panel" className="tones__stage" role="tabpanel" aria-labelledby={`tone-${current.id}`}>
          {t.items.map((item, i) => {
            const tone = TONES[item.id];
            return (
              <div key={item.id} className="tones__shot" data-active={i === active}>
                <Picture name={tone.media} alt={item.name} sizes="(max-width: 760px) 92vw, 56vw" style={{ objectPosition: tone.focus }} />
                <span className="tag" data-side={tone.side ?? 'r'} style={{ left: `${tone.pin[0]}%`, top: `${tone.pin[1]}%` }} aria-hidden>
                  <span className="tag__box">{item.name}</span>
                  <span className="tag__line" />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
