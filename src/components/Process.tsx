import type { Dictionary } from '@/i18n/dictionaries';
import { Reveal } from './Reveal';

type Props = { t: Dictionary['process'] };

export function Process({ t }: Props) {
  return (
    <section id="process" className="process" data-tone="dark">
      <h2 className="process__title">{t.title}</h2>
      <Reveal as="ol" className="process__steps">
        {t.steps.map((s, i) => (
          <li key={s.name} className="step" style={{ '--i': i } as React.CSSProperties}>
            <span className="step__n">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="step__name">{s.name}</h3>
            <p className="step__text">{s.text}</p>
          </li>
        ))}
      </Reveal>
    </section>
  );
}
