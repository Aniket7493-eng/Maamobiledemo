import { ExternalLink, Instagram, MapPin, MessageCircle, Phone } from 'lucide-react';
import { businessConfig } from '../config/business';
import { buildTelUrl, buildWhatsAppUrl } from '../utils/storeHelpers';

export function Footer() {
  const year = new Date().getFullYear();
  const telUrl = buildTelUrl(businessConfig.contact.ownerPhone);
  const whatsappUrl = buildWhatsAppUrl(
    businessConfig.contact.whatsappNumber,
    businessConfig.contact.whatsappDefaultMessage
  );
  const activeServices = businessConfig.services.filter((s) => s.enabled);

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Business Name & Overview */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="#top"
              className="inline-block font-display text-xl font-bold tracking-tight text-white"
            >
              {businessConfig.name}
            </a>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              {businessConfig.tagline}. Multi-brand smartphones, inspected pre-owned devices, accessories, and personal customer assistance.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message Maa Mobile Center on WhatsApp"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 text-slate-300 hover:text-white hover:border-blue-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={businessConfig.social.googleProfile}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Maa Mobile Center on Google Maps"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 text-slate-300 hover:text-white hover:border-blue-400 transition-colors"
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
              {businessConfig.social.instagram && (
                <a
                  href={businessConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Maa Mobile Center on Instagram"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/15 text-slate-300 hover:text-white hover:border-blue-400 transition-colors"
                >
                  <Instagram className="w-4 h-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold text-white">Navigation</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="#top" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#brands" className="hover:text-white transition-colors">
                  Brands
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">
                  Store Gallery
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold text-white">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {activeServices.map((service) => (
                <li key={service.id}>
                  <a href="#services" className="hover:text-white transition-colors">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold text-white">Store Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  {businessConfig.contact.addressLine1}, {businessConfig.contact.addressLine2}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
                <a href={telUrl} className="hover:text-white transition-colors tabular-nums">
                  {businessConfig.contact.ownerPhone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {year} {businessConfig.name}, {businessConfig.city}. All rights reserved.
          </p>
          <p>In-store showcase website · Visit us in {businessConfig.city}, {businessConfig.state}</p>
        </div>
      </div>
    </footer>
  );
}
