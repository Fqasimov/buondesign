import { Montserrat, Noto_Serif_Display } from 'next/font/google';

// Both faces cover Azerbaijani (ə ğ ı İ ş) and Cyrillic; checked against the font files.
export const serif = Noto_Serif_Display({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const sans = Montserrat({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});
