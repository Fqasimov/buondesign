'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, INTRO_DONE } from '@/lib/motion';
import type { Dictionary } from '@/i18n/dictionaries';
import { MonogramB, MonogramD } from './Brand';
import { Picture, type MediaName } from './Picture';

// Framing per room: fx/fy place the cover crop (0 = left/top edge, 1 = right/bottom),
// ox/oy is where the camera dollies toward, plan is the room's dot on the floor plan.
const ROOMS: { media: MediaName; ar: number; fx: number; fy: number; ox: number; oy: number; plan: [number, number] }[] = [
  { media: 'apt-living', ar: 1170 / 908, fx: 0.42, fy: 0.62, ox: 45, oy: 62, plan: [58, 34] },
  { media: 'apt-sofa', ar: 1170 / 908, fx: 0.6, fy: 0.5, ox: 62, oy: 55, plan: [92, 30] },
  { media: 'apt-dining', ar: 1170 / 908, fx: 0.5, fy: 0.55, ox: 50, oy: 50, plan: [104, 78] },
  { media: 'apt-reading', ar: 1156 / 908, fx: 0.48, fy: 0.6, ox: 52, oy: 62, plan: [40, 82] },
];
const ENTRY: [number, number] = [20, 34];

// Scroll length per timeline second, in viewport heights.
const VH_PER_UNIT = 0.34;

type Props = { t: Dictionary['tour'] };

export function Walkthrough({ t }: Props) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    // Keep every annotation inside the visible crop; flip labels that would run off-screen.
    const placeNotes = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      q('.scene').forEach((scene, i) => {
        const r = ROOMS[i];
        const W = Math.max(vw, vh * r.ar);
        const left = (vw - W) * r.fx;
        scene.querySelectorAll<HTMLElement>('.note').forEach((note) => {
          const x = left + (W * Number(note.dataset.x)) / 100;
          const visible = x > 24 && x < vw - 24;
          note.hidden = !visible;
          const want = note.dataset.side === 'l' ? 'l' : 'r';
          const room = want === 'r' ? vw - x : x;
          note.dataset.flip = room < 230 ? (want === 'r' ? 'l' : 'r') : want;
        });
      });
    };
    placeNotes();
    window.addEventListener('resize', placeNotes);

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const pin = q('.tour__pin')[0];
      const wall = q('.tour__wallwrap')[0];
      const doorEl = q('[data-door]')[0];
      const scenes = q('.scene');
      const frames = q('.scene__frame');
      const huds = q('.hud__room');
      const dot = q('.plan__dot')[0];
      const planRooms = q('.plan__room');

      gsap.set(scenes.slice(1), { clipPath: 'inset(40% 36% 40% 36%)', autoAlpha: 0 });
      gsap.set(q('.note'), { autoAlpha: 0 });
      gsap.set(q('.note__line'), { scaleY: 0 });
      gsap.set(huds, { autoAlpha: 0, y: 24 });
      gsap.set(q('.hud__plan, .tour__outro'), { autoAlpha: 0 });
      gsap.set(dot, { x: ENTRY[0], y: ENTRY[1] });

      // How far the wall must grow before the doorway swallows the viewport.
      const pushScale = () => {
        const d = doorEl.getBoundingClientRect();
        return Math.max(window.innerWidth / d.width, window.innerHeight / d.height) * 1.35;
      };

      const tl = gsap.timeline({ defaults: { ease: 'none' } });

      // 1 · The doors open inward, warm light spills onto the plaster.
      tl.to(q('.door__leaf--l'), { rotateY: 84, duration: 0.8, ease: 'power2.inOut' }, 0)
        .to(q('.door__leaf--r'), { rotateY: -84, duration: 0.8, ease: 'power2.inOut' }, 0)
        .to(q('.door__spill'), { autoAlpha: 1, duration: 0.5 }, 0.2)
        .to(q('.tour__intro'), { autoAlpha: 0, y: -48, duration: 0.5, ease: 'power1.in' }, 0)
        .to(q('.tour__cue'), { autoAlpha: 0, duration: 0.3 }, 0);

      // 2 · The camera walks through the doorway.
      tl.to(wall, { scale: pushScale, duration: 1.1, ease: 'power2.in' }, 0.7)
        .to(wall, { autoAlpha: 0, duration: 0.15 }, 1.65)
        .fromTo(frames[0], { scale: 1.12 }, { scale: 1, duration: 1.1, ease: 'power2.out' }, 0.7)
        .to(q('.hud__plan'), { autoAlpha: 1, duration: 0.3 }, 1.6);

      // 3 · Room by room.
      let at = 1.7;
      ROOMS.forEach((_, i) => {
        if (i > 0) {
          tl.to(frames[i - 1], { scale: 1.45, duration: 0.8, ease: 'power2.in' }, at)
            .to(scenes[i - 1], { autoAlpha: 0, duration: 0.35 }, at + 0.45)
            .to(scenes[i], { clipPath: 'inset(0% 0% 0% 0%)', autoAlpha: 1, duration: 0.8, ease: 'power2.inOut' }, at)
            .fromTo(frames[i], { scale: 0.9 }, { scale: 1, duration: 0.8, ease: 'power2.out' }, at)
            .to(huds[i - 1], { autoAlpha: 0, y: -16, duration: 0.3 }, at);
          at += 0.75;
        }
        tl.to(huds[i], { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }, at)
          .to(dot, { x: ROOMS[i].plan[0], y: ROOMS[i].plan[1], duration: 0.6, ease: 'power2.inOut' }, at - 0.45)
          .to(planRooms[i], { fillOpacity: 1, duration: 0.4 }, at)
          .to(frames[i], { scale: 1.08, duration: 1.7 }, at);
        scenes[i].querySelectorAll('.note').forEach((note, k) => {
          const s = at + 0.15 + k * 0.22;
          tl.to(note.querySelector('.note__line'), { scaleY: 1, duration: 0.25, ease: 'power2.out' }, s)
            .to(note, { autoAlpha: 1, duration: 0.25 }, s)
            .to(note, { autoAlpha: 0, duration: 0.25 }, at + 1.45);
        });
        if (i > 0) tl.to(planRooms[i - 1], { fillOpacity: 0, duration: 0.4 }, at);
        at += 1.7;
      });

      // 4 · Outro over the last room.
      tl.to(q('.tour__shade'), { autoAlpha: 1, duration: 0.6 }, at)
        .to(huds[ROOMS.length - 1], { autoAlpha: 0, duration: 0.4 }, at)
        .to(q('.hud__plan'), { autoAlpha: 0, duration: 0.4 }, at)
        .fromTo(q('.tour__outro'), { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, at + 0.2)
        .to({}, { duration: 0.5 });

      const st = ScrollTrigger.create({
        trigger: el,
        pin,
        start: 'top top',
        end: () => `+=${window.innerHeight * tl.duration() * VH_PER_UNIT}`,
        scrub: 0.35,
        animation: tl,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Header reads the tone under it; the doorway flips plaster → room.
          pin.dataset.tone = self.progress > 0.09 ? 'dark' : 'light';
        },
      });

      // Intro copy rises once the loader hands over.
      const intro = gsap.from(q('.tour__intro > *, .tour__cue'), {
        autoAlpha: 0,
        y: 28,
        duration: 0.8,
        ease: 'expo.out',
        stagger: 0.06,
        paused: true,
      });
      const play = () => intro.play();
      if (document.documentElement.classList.contains('is-loading')) window.addEventListener(INTRO_DONE, play, { once: true });
      else play();

      return () => {
        window.removeEventListener(INTRO_DONE, play);
        st.kill();
      };
    });

    return () => {
      window.removeEventListener('resize', placeNotes);
      mm.revert();
    };
  }, []);

  const total = String(ROOMS.length).padStart(2, '0');

  return (
    <section ref={root} id="apartment" className="tour" aria-label={t.label}>
      <div className="tour__pin" data-tone="light">
        <div className="tour__scenes">
          {ROOMS.map((r, i) => (
            <figure key={r.media} className="scene" data-tone="dark">
              <div
                className="scene__frame"
                style={{ '--ar': r.ar, '--fx': r.fx, '--fy': r.fy, transformOrigin: `${r.ox}% ${r.oy}%` } as React.CSSProperties}
                data-hero-img={i === 0 ? '' : undefined}
              >
                <Picture name={r.media} alt={t.rooms[i].name} sizes="(max-aspect-ratio: 4/3) 160svh, 100vw" priority={i === 0} />
                <ul className="scene__notes" aria-label={t.rooms[i].name}>
                  {t.rooms[i].notes.map((n) => (
                    <li key={n.text} className="note" data-x={n.x} data-side={n.side ?? 'r'} style={{ left: `${n.x}%`, top: `${n.y}%` }}>
                      <span className="note__dot" />
                      <span className="note__line" />
                      <span className="note__label">{n.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <figcaption className="scene__caption">
                <h2>{t.rooms[i].name}</h2>
                <p>{t.rooms[i].text}</p>
              </figcaption>
            </figure>
          ))}
          <div className="tour__scrim" aria-hidden />
          <div className="tour__shade" aria-hidden />
        </div>

        <div className="hud" aria-hidden>
          {t.rooms.map((room, i) => (
            <div key={room.name} className="hud__room">
              <p className="hud__index">
                {String(i + 1).padStart(2, '0')} <span>/ {total}</span>
              </p>
              <p className="hud__name">{room.name}</p>
              <p className="hud__text">{room.text}</p>
            </div>
          ))}
          <figure className="hud__plan" aria-label={t.plan}>
            <svg viewBox="0 0 132 108" aria-hidden>
              <rect className="plan__room" x="36" y="6" width="44" height="54" />
              <rect className="plan__room" x="80" y="6" width="46" height="54" />
              <rect className="plan__room" x="70" y="60" width="56" height="42" />
              <rect className="plan__room" x="6" y="60" width="64" height="42" />
              <path className="plan__walls" d="M6 6H126V102H6Z M36 6V60 M80 6V44 M6 60H52 M62 60H126 M70 60V74 M70 88V102 M6 22H36" />
              <path className="plan__door" d="M6 30V40" />
              <circle className="plan__dot" r="3.2" cx="0" cy="0" />
            </svg>
            <figcaption>{t.plan}</figcaption>
          </figure>
        </div>

        <div className="tour__wallwrap">
          <div className="wall" data-tone="light">
            <div className="wall__light" />
            <div className="wall__skirting" />
          </div>
          <div className="door__frame" aria-hidden />
          <div className="door__spill" aria-hidden />
          <div className="door" data-door aria-hidden>
            <div className="door__leaf door__leaf--l">
              <span className="door__panel door__panel--top" />
              <span className="door__panel door__panel--bottom" />
              <MonogramB className="door__b" />
              <span className="door__pull" />
            </div>
            <div className="door__leaf door__leaf--r">
              <span className="door__panel door__panel--top" />
              <span className="door__panel door__panel--bottom" />
              <MonogramD className="door__d" />
              <span className="door__pull" />
            </div>
          </div>
          <div className="tour__intro">
            <h1 className="tour__title">{t.title}</h1>
            <p className="tour__lead">{t.lead}</p>
          </div>
          <p className="tour__cue">
            <span className="tour__cue-line" aria-hidden />
            {t.cue}
          </p>
        </div>

        <div className="tour__outro">
          <h2>{t.outroTitle}</h2>
          <p>{t.outroText}</p>
          <a className="button button--light" href="#contact">
            {t.outroCta}
          </a>
        </div>
      </div>
    </section>
  );
}
