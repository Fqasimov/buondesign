import type { Metadata } from 'next';
import { LanguageRedirect } from './LanguageRedirect';

export const metadata: Metadata = {
  title: 'Buon Design',
};

export default function RootPage() {
  return (
    <>
      <LanguageRedirect />
      <noscript>
        <a href="/az/">Buon Design</a>
      </noscript>
    </>
  );
}
