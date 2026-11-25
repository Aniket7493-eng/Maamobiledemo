import { useState, type FormEvent } from 'react';
import {
  Check,
  Clock,
  Copy,
  ExternalLink,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { businessConfig } from '../config/business';
import {
  buildInquiryWhatsAppMessage,
  buildTelUrl,
  buildWhatsAppUrl,
  getStoreOpenStatus,
  validateInquiryForm,
  type InquiryFormInput,
} from '../utils/storeHelpers';

const INQUIRY_TOPICS = [
  'New Mobile Phones',
  'Second-Hand Mobile Phones',
  'Mobile Accessories',
  'Mobile Repairing',
  'Mobile Exchange',
  'Store Location & Hours',
];

export function ContactSection() {
  const storeStatus = getStoreOpenStatus(businessConfig.openingHours);
  const telUrl = buildTelUrl(businessConfig.contact.ownerPhone);
  const defaultWhatsappUrl = buildWhatsAppUrl(
    businessConfig.contact.whatsappNumber,
    businessConfig.contact.whatsappDefaultMessage
  );

  const [copied, setCopied] = useState(false);
  const [formValues, setFormValues] = useState<InquiryFormInput>({
    name: '',
    phone: '',
    topic: INQUIRY_TOPICS[0],
    message: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof InquiryFormInput, string>>>({});
  const [submittedInquiry, setSubmittedInquiry] = useState<{
    summary: InquiryFormInput;
    whatsappUrl: string;
  } | null>(null);

  const handleCopyPhone = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(businessConfig.contact.ownerPhone);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateInquiryForm(formValues);
    if (!validation.valid) {
      setFormErrors(validation.errors);
      setSubmittedInquiry(null);
      return;
    }

    setFormErrors({});
    const formattedMsg = buildInquiryWhatsAppMessage(formValues);
    const whatsappUrl = buildWhatsAppUrl(businessConfig.contact.whatsappNumber, formattedMsg);
    setSubmittedInquiry({
      summary: { ...formValues },
      whatsappUrl,
    });
  };

  return (
    <section id="contact" className="bg-white py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-electric-500 mb-3">Contact & Visit</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-navy-900 leading-[1.15] text-balance">
              Visit {businessConfig.name} in Hazaribagh
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
            Call directly, message us on WhatsApp, or open Google Maps for turn-by-turn directions to the showroom.
          </p>
        </div>

        {/* Upper Row: Contact Details Card + Interactive Google Map */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Direct Store Contact Info */}
          <div className="lg:col-span-5 rounded-2xl bg-navy-900 text-white p-7 sm:p-8 flex flex-col justify-between gap-8">
            <div className="space-y-7">
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  {businessConfig.name}
                </h3>
                <p className="mt-1 text-sm text-slate-300">
                  {businessConfig.city}, {businessConfig.state}, {businessConfig.country}
                </p>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-xs font-medium text-slate-400">Store Address</p>
                  <p className="mt-1 text-sm text-slate-100 leading-relaxed">
                    {businessConfig.contact.addressLine1}
                    <br />
                    {businessConfig.contact.addressLine2}
                  </p>
                </div>
              </div>

              {/* Owner Phone Number */}
              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-400">Owner Contact Number</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-3">
                    <a
                      href={telUrl}
                      className="text-base font-semibold text-white hover:text-blue-300 transition-colors tabular-nums"
                    >
                      {businessConfig.contact.ownerPhone}
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyPhone}
                      aria-label="Copy store phone number"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-200 border border-white/20 hover:bg-white/10 rounded-md transition-colors whitespace-nowrap"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-blue-300" aria-hidden="true" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Business Opening Hours */}
              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-medium text-slate-400">Business Opening Hours</p>
                    <span className="text-xs font-medium text-blue-300">{storeStatus.label}</span>
                  </div>
                  <dl className="mt-2.5 space-y-1.5 text-sm">
                    {businessConfig.openingHours.map((entry) => {
                      const isToday = entry.day === storeStatus.currentDay;
                      return (
                        <div
                          key={entry.day}
                          className={`flex items-center justify-between gap-4 ${
                            isToday ? 'text-white font-semibold' : 'text-slate-300'
                          }`}
                        >
                          <dt>{entry.day}</dt>
                          <dd className="tabular-nums text-right">{entry.display}</dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons & Social Links */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={defaultWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-electric-500 hover:bg-electric-600 rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>WhatsApp Us</span>
                </a>
                <a
                  href={telUrl}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white border border-white/25 hover:bg-white/10 rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span>Call Store</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs text-slate-300">
                <a
                  href={businessConfig.social.googleProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>Google Business Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                {businessConfig.social.instagram && (
                  <a
                    href={businessConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Instagram</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Location Embed */}
          <div className="lg:col-span-7 flex flex-col rounded-2xl border border-slate-200 overflow-hidden bg-[#F6F8FB]">
            <div className="px-6 py-4 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-base font-semibold text-navy-900">
                  Google Maps Location
                </h3>
                <p className="text-xs text-slate-500">
                  {businessConfig.contact.addressLine1}, {businessConfig.city}
                </p>
              </div>
              <a
                href={businessConfig.contact.googleMapsShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-navy-900 border border-slate-300 hover:border-navy-900 rounded-lg transition-colors whitespace-nowrap"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>

            <div className="relative flex-1 min-h-[360px] lg:min-h-[440px] bg-slate-100">
              <iframe
                title="Maa Mobile Center Hazaribagh Location Map"
                src={businessConfig.contact.googleMapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0 min-h-[360px] lg:min-h-[440px]"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Lower Row: Quick Store Inquiry Form (Non-Ecommerce Informational Inquiry) */}
        <div className="mt-10 rounded-2xl bg-[#F6F8FB] border border-slate-200 p-7 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <p className="text-sm font-semibold text-electric-500 mb-2">Store Inquiry</p>
              <h3 className="font-display text-2xl font-bold tracking-tight text-navy-900">
                Have a question before you visit?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Share the phone brand, model, or accessory you are looking for. We will prepare a structured message you can send straight to our WhatsApp counter for a quick response.
              </p>
            </div>

            <div className="lg:col-span-7">
              {submittedInquiry ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-xl bg-white border border-slate-200 p-6 space-y-4"
                >
                  <div>
                    <p className="text-xs font-semibold text-electric-500">Inquiry Ready</p>
                    <h4 className="mt-1 font-display text-lg font-bold text-navy-900">
                      Thank you, {submittedInquiry.summary.name}
                    </h4>
                    <p className="mt-1 text-sm text-slate-600">
                      Your inquiry regarding <strong>{submittedInquiry.summary.topic}</strong> is ready to send directly to {businessConfig.name} on WhatsApp.
                    </p>
                  </div>

                  <div className="text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-1">
                    <p>
                      <span className="font-medium text-slate-700">Phone:</span>{' '}
                      <span className="tabular-nums">{submittedInquiry.summary.phone}</span>
                    </p>
                    <p>
                      <span className="font-medium text-slate-700">Message:</span>{' '}
                      {submittedInquiry.summary.message}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <a
                      href={submittedInquiry.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-electric-500 hover:bg-electric-600 rounded-lg transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Send via WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedInquiry(null);
                        setFormValues({
                          name: '',
                          phone: '',
                          topic: INQUIRY_TOPICS[0],
                          message: '',
                        });
                      }}
                      className="px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-navy-900 border border-slate-300 rounded-lg transition-colors whitespace-nowrap"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="inquiry-name"
                        className="block text-xs font-semibold text-navy-900 mb-1.5"
                      >
                        Your Name
                      </label>
                      <input
                        id="inquiry-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={formValues.name}
                        onChange={(e) => {
                          setFormValues((prev) => ({ ...prev, name: e.target.value }));
                          if (formErrors.name) {
                            setFormErrors((prev) => ({ ...prev, name: undefined }));
                          }
                        }}
                        placeholder="e.g., Priya Sharma"
                        aria-invalid={Boolean(formErrors.name)}
                        aria-describedby={formErrors.name ? 'inquiry-name-error' : undefined}
                        className="w-full px-3.5 py-2.5 text-sm text-navy-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20"
                      />
                      {formErrors.name && (
                        <p id="inquiry-name-error" className="mt-1 text-xs text-red-600">
                          {formErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-phone"
                        className="block text-xs font-semibold text-navy-900 mb-1.5"
                      >
                        Mobile Number
                      </label>
                      <input
                        id="inquiry-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={formValues.phone}
                        onChange={(e) => {
                          setFormValues((prev) => ({ ...prev, phone: e.target.value }));
                          if (formErrors.phone) {
                            setFormErrors((prev) => ({ ...prev, phone: undefined }));
                          }
                        }}
                        placeholder="10-digit mobile number"
                        aria-invalid={Boolean(formErrors.phone)}
                        aria-describedby={formErrors.phone ? 'inquiry-phone-error' : undefined}
                        className="w-full px-3.5 py-2.5 text-sm text-navy-900 bg-white border border-slate-300 rounded-lg tabular-nums focus:outline-none focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20"
                      />
                      {formErrors.phone && (
                        <p id="inquiry-phone-error" className="mt-1 text-xs text-red-600">
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-topic"
                      className="block text-xs font-semibold text-navy-900 mb-1.5"
                    >
                      What Can We Help With?
                    </label>
                    <select
                      id="inquiry-topic"
                      name="topic"
                      value={formValues.topic}
                      onChange={(e) =>
                        setFormValues((prev) => ({ ...prev, topic: e.target.value }))
                      }
                      className="w-full px-3.5 py-2.5 text-sm text-navy-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20"
                    >
                      {INQUIRY_TOPICS.map((topic) => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-message"
                      className="block text-xs font-semibold text-navy-900 mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="inquiry-message"
                      name="message"
                      rows={3}
                      value={formValues.message}
                      onChange={(e) => {
                        setFormValues((prev) => ({ ...prev, message: e.target.value }));
                        if (formErrors.message) {
                          setFormErrors((prev) => ({ ...prev, message: undefined }));
                        }
                      }}
                      placeholder="Mention the brand, model, or accessory you would like to ask about..."
                      aria-invalid={Boolean(formErrors.message)}
                      aria-describedby={formErrors.message ? 'inquiry-message-error' : undefined}
                      className="w-full px-3.5 py-2.5 text-sm text-navy-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-electric-500 focus:ring-2 focus:ring-electric-500/20"
                    />
                    {formErrors.message && (
                      <p id="inquiry-message-error" className="mt-1 text-xs text-red-600">
                        {formErrors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-navy-900 hover:bg-electric-500 rounded-lg transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-500"
                    >
                      <Send className="w-4 h-4" aria-hidden="true" />
                      <span>Prepare Store Inquiry</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
