import { useState } from 'react';
import { Smartphone } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  containerClassName?: string;
  loading?: 'eager' | 'lazy';
}

export function ResilientImage({
  src,
  alt,
  title,
  className = 'w-full h-full object-cover',
  containerClassName = 'relative overflow-hidden bg-slate-900/10',
  loading = 'lazy',
}: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`${containerClassName} flex flex-col items-center justify-center bg-gradient-to-br from-navy-900 via-navy-800 to-slate-900 text-slate-300 p-6 text-center`}
      >
        <Smartphone className="w-8 h-8 text-blue-400 mb-3 opacity-80" aria-hidden="true" />
        <p className="text-sm font-medium text-white">{title || alt}</p>
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className={className}
      />
    </div>
  );
}
