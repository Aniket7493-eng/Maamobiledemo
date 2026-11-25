import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { businessConfig } from '../config/business';
import { buildWhatsAppUrl } from '../utils/storeHelpers';
import { ResilientImage } from './ResilientImage';

export function ServicesSection() {
  const activeServices = businessConfig.services.filter((service) => service.enabled);

  return (
    <section id="services" className="bg-navy-900 text-white py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-blue-400 mb-3">Our Services</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-[1.15] text-balance">
              Everything your smartphone needs, handled in person
            </h2>
          </div>
          <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
            Visit our showroom counter in Hazaribagh for direct assistance—no online queues, just clear local support.
          </p>
        </div>

        {/* Asymmetric Editorial Bento Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeServices.map((service, index) => {
            const isFeatured = Boolean(service.featured && service.image);
            const inquiryUrl = buildWhatsAppUrl(
              businessConfig.contact.whatsappNumber,
              `Hello ${businessConfig.name}, I would like to inquire about ${service.title} at your Hazaribagh store.`
            );

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(index * 0.05, 0.25),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`rounded-2xl border border-white/10 bg-navy-850 overflow-hidden flex flex-col justify-between transition-colors duration-150 hover:border-blue-400/40 ${
                  isFeatured ? 'lg:col-span-2' : 'lg:col-span-1'
                }`}
              >
                {isFeatured && service.image ? (
                  <div className="grid grid-cols-1 sm:grid-cols-12 h-full items-stretch">
                    <div className="sm:col-span-6 p-7 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                          <span className="font-semibold text-blue-400 tabular-nums">
                            {service.number}
                          </span>
                          {service.availabilityNote && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>{service.availabilityNote}</span>
                            </>
                          )}
                        </div>
                        <h3 className="font-display text-2xl font-bold tracking-tight text-white">
                          {service.title}
                        </h3>
                        <p className="mt-2 text-sm font-medium text-slate-200">
                          {service.summary}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-slate-300">
                          {service.details}
                        </p>
                      </div>

                      <div className="mt-6 pt-5 border-t border-white/10">
                        <a
                          href={inquiryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-300 hover:text-white transition-colors whitespace-nowrap"
                        >
                          <span>Inquire at Store</span>
                          <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                        </a>
                      </div>
                    </div>

                    <div className="sm:col-span-6 min-h-[220px] sm:min-h-full border-t sm:border-t-0 sm:border-l border-white/10">
                      <ResilientImage
                        src={service.image}
                        alt={service.imageAlt || service.title}
                        title={service.title}
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-7 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-3">
                        <span className="font-semibold text-blue-400 tabular-nums">
                          {service.number}
                        </span>
                        {service.availabilityNote && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{service.availabilityNote}</span>
                          </>
                        )}
                      </div>
                      <h3 className="font-display text-xl font-bold tracking-tight text-white">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-slate-200">{service.summary}</p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-300">
                        {service.details}
                      </p>
                    </div>

                    <div className="mt-6 pt-5 border-t border-white/10">
                      <a
                        href={inquiryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-300 hover:text-white transition-colors whitespace-nowrap"
                      >
                        <span>Ask on WhatsApp</span>
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
