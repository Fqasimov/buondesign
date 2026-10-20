import manifest from '@/media/manifest.json';
import { asset } from '@/lib/asset';

export type MediaName = keyof typeof manifest;

type Props = {
  name: MediaName;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  style?: React.CSSProperties;
};

const srcSet = (name: string, widths: number[], ext: string) =>
  widths.map((w) => `${asset(`/media/${name}-${w}.${ext}`)} ${w}w`).join(', ');

/** AVIF first, WebP fallback, blurred placeholder painted under the image. */
export function Picture({ name, alt, sizes, className, priority, style }: Props) {
  const m = manifest[name];
  const largest = m.widths[m.widths.length - 1];
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcSet(name, m.widths, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(name, m.widths, 'webp')} sizes={sizes} />
      <img
        src={asset(`/media/${name}-${largest}.webp`)}
        width={m.width}
        height={m.height}
        alt={alt}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        style={{ backgroundColor: m.color, backgroundImage: `url(${m.blur})`, backgroundSize: 'cover', ...style }}
      />
    </picture>
  );
}
