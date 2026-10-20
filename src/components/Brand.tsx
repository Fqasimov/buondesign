import { B_PATH, D_PATH, MONOGRAM_VIEWBOX, SCRIPT_PATH, SCRIPT_VIEWBOX, B_VIEWBOX, D_VIEWBOX } from '@/lib/brand-paths';

type SvgProps = { className?: string; title?: string };

const a11y = (title?: string) =>
  title ? { role: 'img' as const, 'aria-label': title } : { 'aria-hidden': true as const };

export function Monogram({ className, title }: SvgProps) {
  return (
    <svg className={className} viewBox={MONOGRAM_VIEWBOX} {...a11y(title)}>
      <path className="mono-b" d={B_PATH} fillRule="evenodd" />
      <path className="mono-d" d={D_PATH} />
    </svg>
  );
}

export function MonogramB({ className }: SvgProps) {
  return (
    <svg className={className} viewBox={B_VIEWBOX} aria-hidden>
      <path d={B_PATH} fillRule="evenodd" />
    </svg>
  );
}

export function MonogramD({ className }: SvgProps) {
  return (
    <svg className={className} viewBox={D_VIEWBOX} aria-hidden>
      <path d={D_PATH} />
    </svg>
  );
}

export function Signature({ className, title = 'Live Beautifully' }: SvgProps) {
  return (
    <svg className={className} viewBox={SCRIPT_VIEWBOX} {...a11y(title)}>
      <path d={SCRIPT_PATH} fillRule="evenodd" />
    </svg>
  );
}

export function Wordmark({ className }: SvgProps) {
  return (
    <span className={`wordmark ${className ?? ''}`}>
      BUON DESIGN
    </span>
  );
}
