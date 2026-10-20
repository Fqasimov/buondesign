'use client';

import { useEffect } from 'react';

/** Sends "/" to the visitor's language: Russian or English when the browser asks, otherwise Azerbaijani. */
export function LanguageRedirect() {
  useEffect(() => {
    const prefs = navigator.languages?.length ? navigator.languages : [navigator.language];
    const match = prefs.map((l) => l.slice(0, 2).toLowerCase()).find((l) => l === 'az' || l === 'ru' || l === 'en');
    window.location.replace(`/${match ?? 'az'}/${window.location.hash}`);
  }, []);
  return null;
}
