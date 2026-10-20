import { getDictionary, isLocale, type Locale } from '@/i18n/dictionaries';
import { Contact } from '@/components/Contact';
import { Header } from '@/components/Header';
import { KitchenTones } from '@/components/KitchenTones';
import { Loader } from '@/components/Loader';
import { Office } from '@/components/Office';
import { Process } from '@/components/Process';
import { SmoothScroll } from '@/components/SmoothScroll';
import { Studio } from '@/components/Studio';
import { Walkthrough } from '@/components/Walkthrough';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getDictionary((isLocale(locale) ? locale : 'az') as Locale);
  return (
    <>
      <SmoothScroll />
      <Loader label={t.loader.label} tagline={t.contact.tagline} />
      <Header locale={locale as Locale} nav={t.nav} />
      <main>
        <Walkthrough t={t.tour} />
        <Studio t={t.studio} />
        <Office t={t.office} />
        <KitchenTones t={t.tones} />
        <Process t={t.process} />
      </main>
      <Contact t={t.contact} locale={locale as Locale} />
      <div className="grain" aria-hidden />
    </>
  );
}
