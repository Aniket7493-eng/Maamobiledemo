import { motion } from 'motion/react';
import { businessConfig } from '../config/business';

export function WhyChooseUsSection() {
  return (
    <section id="why-us" className="bg-[#F6F8FB] py-20 lg:py-28 border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-electric-500 mb-3">Why Choose Us</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-navy-900 leading-[1.15] text-balance">
            Practical reasons Hazaribagh customers visit {businessConfig.name}
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businessConfig.whyChooseUs.map((item, idx) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.38, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl bg-white border border-slate-200 p-7 flex flex-col justify-between"
            >
              <div>
                <span className="font-display text-sm font-semibold text-electric-500 tabular-nums">
                  {item.number}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Sixth slot: Direct showroom visit invitation */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.38, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl bg-navy-900 text-white p-7 flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-medium text-blue-300">Walk-In Welcome</span>
              <h3 className="mt-3 font-display text-xl font-bold text-white">
                Experience devices in person before you decide
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                Drop by our store in Hazaribagh any day of the week to compare smartphones, check accessories, or speak directly with us.
              </p>
            </div>
            <div className="mt-6">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-electric-500 hover:bg-electric-600 rounded-lg transition-colors whitespace-nowrap"
              >
                Get Store Directions
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
