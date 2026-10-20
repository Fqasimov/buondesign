import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import '@/styles/globals.css';
import { sans, serif } from '@/lib/fonts';
import { getDictionary, isLocale, locales } from '@/i18n/dictionaries';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${locale}/`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/`])),
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      images: ['/media/apt-living-1170.webp'],
      locale,
      type: 'website',
    },
    icons: { icon: '/favicon.svg' },
  };
}

export const viewport: Viewport = {
  themeColor: '#1C1B16',
  width: 'device-width',
  initialScale: 1,
};

// Runs before paint: enables JS styles and skips the long intro on return visits.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js','is-loading');try{if(sessionStorage.getItem('bd-intro'))d.classList.add('intro-seen')}catch(e){}})();`;

export default async function LocaleLayout({ children, params }: { children: React.ReactNode } & Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
