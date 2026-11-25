import type { GalleryCategory, GalleryItem, OpeningHoursEntry } from '../config/business';

export interface StoreOpenStatus {
  isOpen: boolean;
  label: string;
  todayHours: string;
  currentDay: string;
}

export interface InquiryFormInput {
  name: string;
  phone: string;
  topic: string;
  message: string;
}

export interface InquiryValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof InquiryFormInput, string>>;
}

/**
 * Extracts only numeric digits from a phone string.
 */
export function sanitizePhoneDigits(phone: string): string {
  return phone.replace(/\D/g, '');
}

/**
 * Builds a clean tel: link preserving a leading + when present.
 */
export function buildTelUrl(phone: string): string {
  const digits = sanitizePhoneDigits(phone);
  if (!digits) {
    return '#contact';
  }
  const hasPlus = phone.trim().startsWith('+');
  return `tel:${hasPlus ? '+' : ''}${digits}`;
}

/**
 * Builds a functional WhatsApp wa.me link with encoded pre-filled inquiry text.
 * Automatically prefixes India country code (91) if a 10-digit local number is given.
 */
export function buildWhatsAppUrl(phone: string, message: string): string {
  let digits = sanitizePhoneDigits(phone);
  if (digits.length === 10) {
    digits = `91${digits}`;
  }
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${digits}${encoded ? `?text=${encoded}` : ''}`;
}

function parseMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map((n) => Number.parseInt(n, 10));
  if (Number.isNaN(h) || Number.isNaN(m)) {
    return 0;
  }
  return h * 60 + m;
}

/**
 * Determines whether the store is currently open based on its weekly schedule.
 */
export function getStoreOpenStatus(
  schedule: OpeningHoursEntry[],
  now: Date = new Date()
): StoreOpenStatus {
  const dayIndex = now.getDay();
  const entry = schedule.find((item) => item.dayIndex === dayIndex);

  if (!entry) {
    return {
      isOpen: false,
      label: 'Hours Unavailable',
      todayHours: 'Call to confirm',
      currentDay: '',
    };
  }

  if (entry.closed) {
    return {
      isOpen: false,
      label: 'Closed Today',
      todayHours: 'Closed',
      currentDay: entry.day,
    };
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = parseMinutes(entry.openTime);
  const closeMinutes = parseMinutes(entry.closeTime);
  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  return {
    isOpen,
    label: isOpen ? 'Open Now' : 'Currently Closed',
    todayHours: entry.display,
    currentDay: entry.day,
  };
}

/**
 * Filters gallery photographs by category while preserving order.
 */
export function filterGalleryItems(
  items: GalleryItem[],
  category: GalleryCategory
): GalleryItem[] {
  if (category === 'All') {
    return items;
  }
  return items.filter((item) => item.category === category);
}

/**
 * Validates customer inquiry form fields cleanly before generating a WhatsApp inquiry
 * or confirmation summary.
 */
export function validateInquiryForm(input: InquiryFormInput): InquiryValidationResult {
  const errors: Partial<Record<keyof InquiryFormInput, string>> = {};
  const trimmedName = input.name.trim();
  const phoneDigits = sanitizePhoneDigits(input.phone);
  const trimmedMessage = input.message.trim();

  if (trimmedName.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }

  // Accept 10-digit Indian mobile numbers or 12-digit with 91 country code
  const validIndianPhone =
    (phoneDigits.length === 10 && /^[6-9]\d{9}$/.test(phoneDigits)) ||
    (phoneDigits.length === 12 && /^91[6-9]\d{9}$/.test(phoneDigits));

  if (!validIndianPhone) {
    errors.phone = 'Please enter a valid 10-digit Indian mobile number.';
  }

  if (!input.topic.trim()) {
    errors.topic = 'Please select an inquiry topic.';
  }

  if (trimmedMessage.length < 6) {
    errors.message = 'Please share a brief note (at least 6 characters) so we can assist you.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Formats a clean WhatsApp inquiry message from a validated form submission.
 */
export function buildInquiryWhatsAppMessage(input: InquiryFormInput): string {
  return `Hello Maa Mobile Center,\nName: ${input.name.trim()}\nPhone: ${input.phone.trim()}\nInquiry Topic: ${input.topic.trim()}\nMessage: ${input.message.trim()}`;
}
