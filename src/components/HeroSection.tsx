import { ArrowRight, Clock, MapPin, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { businessConfig } from '../config/business';
import { buildTelUrl, getStoreOpenStatus } from '../utils/storeHelpers';
import { ResilientImage } from './ResilientImage';

export function HeroSection() {
  const storeStatus = getStoreOpenStatus(businessConfig.openingHours);
  const telUrl = buildTelUrl(businessConfig.contact.ownerPhone);

  return (
    <section
      id="top"
      className="relative bg-navy-900 text-white pt-28 pb-20 lg:min-h-[calc(100vh-2rem)] lg:flex lg:flex-col lg:justify-center lg:pt-32 lg:pb-24 overflow-hidden"
    >
      {/* Subtle architectural ambient gradient behind hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_75%_30%,rgba(37,99,235,0.22),transparent_65%)]"
      />

      <div className="relative w-full max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Copy Column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <p className="text-sm font-medium text-blue-300 tracking-wide mb-5">
              {businessConfig.regionLabel}
            </p>

            <h1 className="font-display text-[clamp(2.35rem,4.2vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-white text-balance">
              {businessConfig.hero.heading}
            </h1>

            <p className="mt-4 font-display text-lg sm:text-xl font-medium text-slate-200 tracking-tight">
              {businessConfig.hero.subtitle}
            </p>

            <p className="mt-5 text-base leading-relaxed text-slate-300 max-w-xl tracking-[0.01em]">
              {businessConfig.hero.intro}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#brands"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-electric-500 hover:bg-electric-600 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                <span>Explore Our Store</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white border border-white/25 hover:border-white/50 hover:bg-white/5 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                <span>Contact Us</span>
              </a>
            </div>
          </motion.div>

          {/* Right Flagship Visual Column */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex"
          >
            <div className="relative w-full min-h-[280px] sm:min-h-[360px] lg:min-h-[430px] lg:h-full rounded-2xl overflow-hidden border border-white/10 bg-navy-950">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full h-full"
              >
                <ResilientImage
                  src={businessConfig.hero.image}
                  alt={businessConfig.hero.imageAlt}
                  title={businessConfig.name}
                  loading="eager"
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/65 via-transparent to-transparent"
              />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 flex items-center justify-between gap-3 text-xs text-slate-200">
                <span className="truncate">Multi-Brand Smartphone Showcase</span>
                <span className="text-slate-300 whitespace-nowrap shrink-0">In-Store Viewing</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width Factual Showroom Overview Strip */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-slate-400">Location</span>
            <span className="text-sm font-medium text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
              <span>Hazaribagh, Jharkhand</span>
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-slate-400">Brands Available</span>
            <span className="text-sm font-medium text-white tabular-nums">
              {businessConfig.brands.length} Leading Smartphone Brands
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-slate-400">
              Today ({storeStatus.currentDay || 'Daily'})
            </span>
            <span className="text-sm font-medium text-white flex items-center gap-2 tabular-nums">
              <Clock className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
              <span>
                {storeStatus.todayHours} · {storeStatus.label}
              </span>
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-slate-400">Direct Store Line</span>
            <a
              href={telUrl}
              className="text-sm font-medium text-blue-300 hover:text-white transition-colors inline-flex items-center gap-2 tabular-nums"
            >
              <Phone className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
              <span>{businessConfig.contact.ownerPhone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
