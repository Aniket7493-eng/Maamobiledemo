interface BrandMarkProps {
  brandId: string;
  active?: boolean;
}

/**
 * Clean, crisp typographic & geometric vector brand marks for the 8 supported
 * smartphone brands. Zero external image dependencies.
 */
export function BrandMark({ brandId, active = false }: BrandMarkProps) {
  const tone = active ? 'text-white' : 'text-navy-900';

  switch (brandId) {
    case 'apple':
      return (
        <div className={`flex items-center gap-2.5 ${tone}`}>
          <svg viewBox="0 0 24 28" className="w-6 h-7 fill-current shrink-0" aria-hidden="true">
            <path d="M19.66 14.77c-.03-2.99 2.44-4.43 2.55-4.5-1.39-2.03-3.55-2.3-4.32-2.33-1.83-.19-3.59 1.08-4.52 1.08-.93 0-2.37-1.05-3.9-1.02-2 .03-3.85 1.17-4.88 2.96-2.09 3.62-.53 8.99 1.5 11.93.99 1.44 2.18 3.06 3.74 3 1.5-.06 2.07-.97 3.88-.97 1.81 0 2.33.97 3.91.94 1.62-.03 2.64-1.47 3.63-2.91 1.14-1.67 1.61-3.29 1.64-3.37-.04-.02-3.2-1.23-3.23-4.81zM16.69 5.95c.83-1.01 1.39-2.41 1.24-3.81-1.2.05-2.66.8-3.51 1.8-.77.89-1.44 2.32-1.26 3.69 1.34.1 2.7-.68 3.53-1.68z" />
          </svg>
          <span className="font-display text-xl font-semibold tracking-tight">Apple</span>
        </div>
      );

    case 'samsung':
      return (
        <span
          className={`font-display text-xl font-extrabold tracking-[0.16em] uppercase ${tone}`}
        >
          SAMSUNG
        </span>
      );

    case 'vivo':
      return (
        <span
          className={`font-display text-2xl font-bold tracking-[0.04em] lowercase ${tone}`}
        >
          vivo
        </span>
      );

    case 'oppo':
      return (
        <span
          className={`font-display text-2xl font-semibold tracking-[0.06em] lowercase ${tone}`}
        >
          oppo
        </span>
      );

    case 'oneplus':
      return (
        <div className={`flex items-center gap-2 ${tone}`}>
          <span
            aria-hidden="true"
            className={`inline-flex items-center justify-center w-6 h-6 text-xs font-bold border-2 ${
              active ? 'border-white text-white' : 'border-navy-900 text-navy-900'
            }`}
          >
            1+
          </span>
          <span className="font-display text-lg font-bold tracking-[0.08em] uppercase">
            OnePlus
          </span>
        </div>
      );

    case 'redmi':
      return (
        <span className={`font-display text-2xl font-bold tracking-tight ${tone}`}>
          Redmi
        </span>
      );

    case 'realme':
      return (
        <span
          className={`font-display text-2xl font-bold tracking-[-0.01em] lowercase ${tone}`}
        >
          realme
        </span>
      );

    case 'motorola':
      return (
        <div className={`flex items-center gap-2 ${tone}`}>
          <svg viewBox="0 0 28 28" className="w-6 h-6 fill-current shrink-0" aria-hidden="true">
            <circle cx="14" cy="14" r="13" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M8.5 20.5 11.4 8.5l2.6 7.4 2.6-7.4 2.9 12h-2l-1.5-6.9-2 5.4-2-5.4-1.5 6.9h-2z" />
          </svg>
          <span className="font-display text-lg font-semibold tracking-tight lowercase">
            motorola
          </span>
        </div>
      );

    default:
      return <span className={`font-display text-xl font-bold ${tone}`}>{brandId}</span>;
  }
}
