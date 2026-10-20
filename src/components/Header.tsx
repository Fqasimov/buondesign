'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, getLenis } from '@/lib/motion';
import { INSTAGRAM_URL, localeNames, locales, type Dictionary, type Locale } from '@/i18n/dictionaries';
import { Monogram } from './Brand';

type Props = { locale: Locale; nav: Dictionary['nav'] };

export function Header({ locale, nav }: Props) {
  const ref = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const links = [
    { href: '#apartment', label: nav.tour },
    { href: '#studio', label: nav.studio },
    { href: '#project', label: nav.work },
    { href: '#tones', label: nav.tones },
    { href: '#contact', label: nav.contact },
  ];

  // Tone follows whatever sits under the header; it hides while reading down, returns on the way up.
  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const probe = document.elementsFromPoint(window.innerWidth / 2, header.offsetHeight / 2);
      const toned = probe.find((n) => n !== header && !header.contains(n) && n.closest('[data-tone]'));
      header.dataset.tone = toned?.closest<HTMLElement>('[data-tone]')?.dataset.tone ?? 'dark';
      const goingDown = y > last + 4;
      const goingUp = y < last - 4;
      if (goingDown && y > 240) header.dataset.hidden = 'true';
      else if (goingUp || y < 240) header.dataset.hidden = 'false';
      last = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Menu: lock scroll, stagger links in, close on Escape.
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.documentElement.classList.add('menu-open');
      gsap.fromTo(
        menu.querySelectorAll('.menu__link, .menu__foot'),
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: 'expo.out', stagger: 0.05, delay: 0.1 },
      );
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
      window.addEventListener('keydown', onKey);
      menu.querySelector<HTMLElement>('a')?.focus();
      return () => window.removeEventListener('keydown', onKey);
    }
    document.documentElement.classList.remove('menu-open');
    if (!document.documentElement.classList.contains('is-loading')) lenis?.start();
  }, [open]);

  return (
    <>
      <header ref={ref} className="header" data-tone="light" data-hidden="false">
        <a className="header__brand" href="#apartment" aria-label="Buon Design">
          <Monogram className="header__mono" />
          <span className="header__word">BUON DESIGN</span>
        </a>
        <nav className="header__nav" aria-label={nav.menu}>
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="header__end">
          <ul className="lang" aria-label="Language">
            {locales.map((l) => (
              <li key={l}>
                <a href={`../${l}/`} hrefLang={l} lang={l} aria-current={l === locale ? 'true' : undefined}>
                  {localeNames[l]}
                </a>
              </li>
            ))}
          </ul>
          <a className="button button--small header__cta" href={INSTAGRAM_URL} target="_blank" rel="noopener">
            {nav.write}
          </a>
          <button
            className="header__menu"
            type="button"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="header__menu-icon" aria-hidden />
            <span className="sr-only">{open ? nav.close : nav.menu}</span>
          </button>
        </div>
      </header>

      <div ref={menuRef} id="site-menu" className="menu" data-open={open} aria-hidden={!open} inert={!open}>
        <nav aria-label={nav.menu}>
          {links.map((l) => (
            <a key={l.href} className="menu__link" href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="menu__foot">
          <ul className="lang">
            {locales.map((l) => (
              <li key={l}>
                <a href={`../${l}/`} hrefLang={l} lang={l} aria-current={l === locale ? 'true' : undefined}>
                  {localeNames[l]}
                </a>
              </li>
            ))}
          </ul>
          <a className="button button--light" href={INSTAGRAM_URL} target="_blank" rel="noopener">
            {nav.write}
          </a>
        </div>
      </div>
    </>
  );
}
