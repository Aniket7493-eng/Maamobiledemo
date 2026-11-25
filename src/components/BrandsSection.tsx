import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { businessConfig } from '../config/business';
import { buildWhatsAppUrl } from '../utils/storeHelpers';
import { BrandMark } from './BrandMark';

export function BrandsSection() {
  const [selectedBrandId, setSelectedBrandId] = useState<string>(businessConfig.brands[0].id);

  const selectedBrand =
    businessConfig.brands.find((b) => b.id === selectedBrandId) ?? businessConfig.brands[0];

  const brandInquiryUrl = buildWhatsAppUrl(
    businessConfig.contact.whatsappNumber,
    `Hello ${businessConfig.name}, I would like to ask about ${selectedBrand.name} smartphone availability at your Hazaribagh store.`
  );

  return (
    <section id="brands" className="bg-[#F6F8FB] py-20 lg:py-28 border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-electric-500 mb-3">Brands We Deal In</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-navy-900 leading-[1.15] text-balance">
              Leading smartphone brands, all under one roof
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
            Select any brand below to see the lineup categories we carry in-store or ask directly about current showroom availability.
          </p>
        </div>

        {/* 8 Brand Logo Cards Grid */}
        <div
          role="tablist"
          aria-label="Smartphone brands available at Maa Mobile Center"
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {businessConfig.brands.map((brand) => {
            const isSelected = brand.id === selectedBrand.id;
            return (
              <button
                key={brand.id}
                type="button"
                role="tab"
                id={`brand-tab-${brand.id}`}
                aria-label={`${brand.name} — ${brand.focus}`}
                aria-selected={isSelected}
                aria-controls="brand-detail-panel"
                onClick={() => setSelectedBrandId(brand.id)}
                className={`group text-left rounded-xl p-6 transition-all duration-150 border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-500 ${
                  isSelected
                    ? 'bg-navy-900 border-navy-900 text-white'
                    : 'bg-white border-slate-200 text-navy-900 hover:border-slate-300 hover:-translate-y-0.5'
                }`}
              >
                <div className="h-9 flex items-center">
                  <BrandMark brandId={brand.id} active={isSelected} />
                </div>
                <p
                  className={`mt-4 text-xs leading-snug ${
                    isSelected ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {brand.focus}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Brand Detail Bar */}
        <div
          id="brand-detail-panel"
          role="tabpanel"
          aria-labelledby={`brand-tab-${selectedBrand.id}`}
          className="mt-6 rounded-2xl bg-white border border-slate-200 p-6 sm:p-8"
        >
          <motion.div
            key={selectedBrand.id}
            initial={{ opacity: 0.4, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                <span className="font-semibold text-electric-500">{selectedBrand.name}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedBrand.popularSeries}</span>
              </div>
              <h3 className="font-display text-xl font-bold text-navy-900">
                {selectedBrand.name} Smartphones at {businessConfig.name}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {selectedBrand.description}
              </p>
            </div>

            <div className="shrink-0">
              <a
                href={brandInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-5 py-3 text-sm font-semibold text-white bg-navy-900 hover:bg-electric-500 rounded-lg transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-500"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Ask About {selectedBrand.name} on WhatsApp</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
