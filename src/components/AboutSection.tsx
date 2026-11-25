import { motion } from 'motion/react';
import { businessConfig } from '../config/business';
import { ResilientImage } from './ResilientImage';

export function AboutSection() {
  return (
    <section id="about" className="bg-white py-20 lg:py-28 border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Editorial Showroom Photography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col"
          >
            <div className="relative flex-1 min-h-[300px] sm:min-h-[380px] rounded-2xl overflow-hidden border border-slate-200">
              <ResilientImage
                src={businessConfig.about.image}
                alt={businessConfig.about.imageAlt}
                title="Maa Mobile Center Showroom"
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4 text-xs text-slate-500">
              <span>Showroom Preview · {businessConfig.name}</span>
              <span>{businessConfig.city}, {businessConfig.state}</span>
            </div>
          </motion.div>

          {/* Store Overview & Background */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <p className="text-sm font-semibold text-electric-500 mb-3">
              {businessConfig.about.eyebrow}
            </p>

            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-navy-900 leading-[1.15] text-balance">
              {businessConfig.about.heading}
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
              {businessConfig.about.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {businessConfig.about.highlights.map((item) => (
                <div key={item.title}>
                  <h3 className="font-display text-sm font-semibold text-navy-900">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
