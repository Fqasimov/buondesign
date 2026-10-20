'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/motion';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, localeNames, locales, type Dictionary, type Locale } from '@/i18n/dictionaries';
import { Monogram, Signature } from './Brand';

type Props = { t: Dictionary['contact']; locale: Locale };

export function Contact({ t, locale }: Props) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    // The signature is "written" left to right as the section arrives.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        el.querySelector('.contact__signature'),
        { clipPath: 'inset(0% 100% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 75%', end: 'top 15%', scrub: true },
        },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <footer ref={root} id="contact" className="contact" data-tone="dark">
      <Signature className="contact__signature" />
      <div className="contact__body">
        <h2 className="contact__title">{t.title}</h2>
        <p className="contact__text">{t.text}</p>
        <a className="button button--brass contact__cta" href={INSTAGRAM_URL} target="_blank" rel="noopener">
          <svg className="button__icon" viewBox="0 0 24 24" aria-hidden>
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4.2" />
            <circle cx="17.4" cy="6.6" r="0.6" />
          </svg>
          {t.cta}
          <span className="contact__handle">{INSTAGRAM_HANDLE}</span>
        </a>
      </div>
      <div className="contact__foot">
        <Monogram className="contact__mono" title="Buon Design" />
        <p>{t.tagline}</p>
        <ul className="lang">
          {locales.map((l) => (
            <li key={l}>
              <a href={`../${l}/`} hrefLang={l} lang={l} aria-current={l === locale ? 'true' : undefined}>
                {localeNames[l]}
              </a>
            </li>
          ))}
        </ul>
        <p>
          © {new Date().getFullYear()} Buon Design. {t.rights}
        </p>
      </div>
    </footer>
  );
}
