import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { businessConfig, type GalleryCategory, type GalleryItem } from '../config/business';
import { filterGalleryItems } from '../utils/storeHelpers';
import { ResilientImage } from './ResilientImage';

const GALLERY_CATEGORIES: GalleryCategory[] = [
  'All',
  'Shop Exterior',
  'Shop Interior',
  'Phone Collection',
  'Accessories',
];

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const visibleItems = filterGalleryItems(businessConfig.gallery, activeCategory);

  const currentIndex = lightboxItem
    ? visibleItems.findIndex((item) => item.id === lightboxItem.id)
    : -1;

  const showPrevious = () => {
    if (visibleItems.length === 0 || currentIndex < 0) return;
    const prevIdx = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    setLightboxItem(visibleItems[prevIdx]);
  };

  const showNext = () => {
    if (visibleItems.length === 0 || currentIndex < 0) return;
    const nextIdx = (currentIndex + 1) % visibleItems.length;
    setLightboxItem(visibleItems[nextIdx]);
  };

  useEffect(() => {
    if (!lightboxItem) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxItem(null);
      } else if (event.key === 'ArrowLeft') {
        showPrevious();
      } else if (event.key === 'ArrowRight') {
        showNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <section id="gallery" className="bg-white py-20 lg:py-28 border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-electric-500 mb-3">Store Gallery</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-navy-900 leading-[1.15] text-balance">
              Step inside our mobile showcase
            </h2>
          </div>

          {/* Interactive Filter Controls (Functional Segmented Buttons) */}
          <div
            role="group"
            aria-label="Filter gallery photos by area"
            className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg self-start lg:self-auto"
          >
            {GALLERY_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-electric-500 ${
                    isActive
                      ? 'bg-white text-navy-900 shadow-xs'
                      : 'text-slate-600 hover:text-navy-900'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Curated Gallery Grid */}
        <div
          data-testid="gallery-grid"
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {visibleItems.map((item, idx) => {
            const isHeroSpan = activeCategory === 'All' && idx === 0;
            return (
              <motion.figure
                key={item.id}
                layout
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`group rounded-2xl border border-slate-200 overflow-hidden bg-white flex flex-col ${
                  isHeroSpan ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setLightboxItem(item)}
                  aria-label={`View larger photo: ${item.title}`}
                  className="relative w-full text-left overflow-hidden focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-electric-500"
                >
                  <div className={isHeroSpan ? 'aspect-[16/10]' : 'aspect-[4/3]'}>
                    <ResilientImage
                      src={item.image}
                      alt={item.alt}
                      title={item.title}
                      containerClassName="w-full h-full"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute top-3.5 right-3.5 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-navy-900/75 text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150"
                  >
                    <Expand className="w-4 h-4" />
                  </span>
                </button>

                <figcaption className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-500">{item.category}</p>
                    <h3 className="mt-1 font-display text-base font-semibold text-navy-900">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{item.caption}</p>
                  </div>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>

        <p className="mt-8 text-xs text-slate-500">
          Showroom preview visuals displayed for demo presentation — ready to swap seamlessly with actual store photographs of {businessConfig.name}.
        </p>
      </div>

      {/* Accessible Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={lightboxItem.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setLightboxItem(null)}
            className="fixed inset-0 z-50 bg-navy-950/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-navy-900 border border-white/15 rounded-2xl overflow-hidden text-white"
            >
              <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/10">
                <div className="min-w-0">
                  <p className="text-xs text-blue-300">{lightboxItem.category}</p>
                  <h3 className="font-display text-base font-semibold text-white truncate">
                    {lightboxItem.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {visibleItems.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={showPrevious}
                        aria-label="Previous photo"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-blue-400"
                      >
                        <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={showNext}
                        aria-label="Next photo"
                        className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-blue-400"
                      >
                        <ChevronRight className="w-5 h-5" aria-hidden="true" />
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => setLightboxItem(null)}
                    aria-label="Close photo viewer"
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-blue-400"
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="aspect-[16/10] bg-navy-950">
                <ResilientImage
                  src={lightboxItem.image}
                  alt={lightboxItem.alt}
                  title={lightboxItem.title}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="px-5 py-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-slate-300">
                <p>{lightboxItem.caption}</p>
                <span className="text-xs text-slate-400 tabular-nums shrink-0">
                  {currentIndex + 1} / {visibleItems.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
