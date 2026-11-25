/**
 * Central Business Configuration for Maa Mobile Center, Hazaribagh.
 *
 * Edit any field below (phone number, WhatsApp number, exact shop address,
 * opening hours, enabled services, social links, or gallery photos) to update
 * the entire website in one place.
 */

export interface OpeningHoursEntry {
  dayIndex: number; // 0 = Sunday, 1 = Monday ... 6 = Saturday
  day: string;
  shortDay: string;
  openTime: string; // 24-hour "HH:MM"
  closeTime: string; // 24-hour "HH:MM"
  display: string;
  closed?: boolean;
}

export interface BrandItem {
  id: string;
  name: string;
  focus: string;
  description: string;
  popularSeries: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  details: string;
  enabled: boolean;
  featured?: boolean;
  availabilityNote?: string;
  image?: string;
  imageAlt?: string;
}

export type GalleryCategory =
  | 'All'
  | 'Shop Exterior'
  | 'Shop Interior'
  | 'Phone Collection'
  | 'Accessories';

export interface GalleryItem {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, 'All'>;
  caption: string;
  image: string;
  alt: string;
  featured?: boolean;
}

export interface WhyChooseUsItem {
  number: string;
  title: string;
  description: string;
}

export const businessConfig = {
  name: 'Maa Mobile Center',
  tagline: 'Your Trusted Mobile Destination in Hazaribagh',
  city: 'Hazaribagh',
  state: 'Jharkhand',
  country: 'India',
  regionLabel: 'Hazaribagh, Jharkhand · Multi-Brand Mobile Showroom',

  // Easy-to-edit contact details
  contact: {
    ownerPhone: '+91 98350 00000', // Replace with the owner's active phone number
    whatsappNumber: '+91 98350 00000', // Replace with the owner's WhatsApp number
    whatsappDefaultMessage:
      'Hello Maa Mobile Center, I visited your website and would like to inquire about smartphones and store timings in Hazaribagh.',
    addressLine1: 'New Area, Malviya Marg',
    addressLine2: 'Hazaribagh, Jharkhand 825301',
    fullAddress:
      'New Area, Malviya Marg, Hazaribagh, Jharkhand 825301, India',
    googleMapsShareUrl: 'https://share.google/uSPN2Puk8zWT1UOLD',
    googleMapsEmbedUrl:
      'https://maps.google.com/maps?q=Maa+Mobile+Centar,+Hazaribagh,+Jharkhand&t=&z=15&ie=UTF8&iwloc=&output=embed',
  },

  // Social media profiles (leave url empty string "" to hide a social link)
  social: {
    googleProfile: 'https://share.google/uSPN2Puk8zWT1UOLD',
    instagram: 'https://instagram.com', // Replace with actual Instagram profile URL
    facebook: 'https://facebook.com', // Replace with actual Facebook page URL
  },

  // Opening hours (24h times drive the live Open / Closed indicator)
  openingHours: [
    { dayIndex: 1, day: 'Monday', shortDay: 'Mon', openTime: '10:00', closeTime: '21:00', display: '10:00 AM – 9:00 PM' },
    { dayIndex: 2, day: 'Tuesday', shortDay: 'Tue', openTime: '10:00', closeTime: '21:00', display: '10:00 AM – 9:00 PM' },
    { dayIndex: 3, day: 'Wednesday', shortDay: 'Wed', openTime: '10:00', closeTime: '21:00', display: '10:00 AM – 9:00 PM' },
    { dayIndex: 4, day: 'Thursday', shortDay: 'Thu', openTime: '10:00', closeTime: '21:00', display: '10:00 AM – 9:00 PM' },
    { dayIndex: 5, day: 'Friday', shortDay: 'Fri', openTime: '10:00', closeTime: '21:00', display: '10:00 AM – 9:00 PM' },
    { dayIndex: 6, day: 'Saturday', shortDay: 'Sat', openTime: '10:00', closeTime: '21:00', display: '10:00 AM – 9:00 PM' },
    { dayIndex: 0, day: 'Sunday', shortDay: 'Sun', openTime: '10:30', closeTime: '20:30', display: '10:30 AM – 8:30 PM' },
  ] as OpeningHoursEntry[],

  hero: {
    heading: 'Welcome to Maa Mobile Center',
    subtitle: 'Your Trusted Mobile Destination in Hazaribagh',
    intro:
      'Discover the latest smartphones, carefully checked second-hand phones, and essential mobile accessories under one roof. Visit our showroom in Hazaribagh for honest advice and hands-on assistance.',
    image: '/src/assets/images/hero_flagship_smartphones_1795610922805.jpg',
    imageAlt:
      'Three flagship smartphones in brushed titanium, midnight navy, and frosted silver displayed in a sleek studio setting',
  },

  about: {
    eyebrow: 'About Maa Mobile Center',
    heading: 'A local showroom built on honest guidance and lasting trust',
    paragraphs: [
      'Maa Mobile Center serves customers across Hazaribagh and neighboring areas with a clear, approachable mobile shopping experience. Whether you are upgrading to a flagship smartphone, looking for a reliable budget handset, or picking up everyday accessories, we help you compare options comfortably in person.',
      'Unlike impersonal online listings, visiting our store lets you hold devices side by side, check display quality and camera performance firsthand, and get straightforward recommendations tailored to your daily usage and budget.',
    ],
    highlights: [
      {
        title: 'Hands-On Comparison',
        detail: 'Inspect devices in person before deciding what fits your needs best.',
      },
      {
        title: 'Multi-Brand Selection',
        detail: 'Leading global smartphone brands available together in one local showroom.',
      },
      {
        title: 'Walk-In Support',
        detail: 'Friendly in-store guidance for setup, data transfer, and accessory pairing.',
      },
    ],
    image: '/src/assets/images/store_interior_display_1795610930790.jpg',
    imageAlt:
      'Clean modern mobile showroom interior with white display tables and smartphones arranged for customer viewing',
  },

  brands: [
    {
      id: 'apple',
      name: 'Apple',
      focus: 'iPhone Series & Genuine Accessories',
      description:
        'Explore the latest iPhone models alongside inspected pre-owned iPhones, protective cases, adapters, and audio gear.',
      popularSeries: 'iPhone 16 · iPhone 15 · Pre-Owned iPhones',
    },
    {
      id: 'samsung',
      name: 'Samsung',
      focus: 'Galaxy S, A & M Series',
      description:
        'From flagship AMOLED photography phones to dependable everyday Galaxy smartphones for students and professionals.',
      popularSeries: 'Galaxy S Series · Galaxy A Series · Galaxy M Series',
    },
    {
      id: 'vivo',
      name: 'Vivo',
      focus: 'V, Y & T Series Smartphones',
      description:
        'Known for portrait camera innovation, slim ergonomic builds, and dependable battery life for daily connectivity.',
      popularSeries: 'Vivo V Series · Vivo Y Series · Vivo T Series',
    },
    {
      id: 'oppo',
      name: 'Oppo',
      focus: 'Reno, F & A Series',
      description:
        'Sleek finishes, fast-charging technology, and balanced camera systems built for smooth everyday performance.',
      popularSeries: 'Oppo Reno · Oppo F Series · Oppo A Series',
    },
    {
      id: 'oneplus',
      name: 'OnePlus',
      focus: 'Flagship & Nord Lineup',
      description:
        'Fast, clean performance with high-refresh displays and rapid charging across both flagship and Nord series.',
      popularSeries: 'OnePlus Flagship · OnePlus Nord · Nord CE',
    },
    {
      id: 'redmi',
      name: 'Redmi',
      focus: 'Redmi Note & Number Series',
      description:
        'Feature-packed smartphones offering strong displays, capable cameras, and high value across accessible price tiers.',
      popularSeries: 'Redmi Note Series · Redmi A & Number Series',
    },
    {
      id: 'realme',
      name: 'Realme',
      focus: 'GT, Number & Narzo Series',
      description:
        'Modern designs with crisp screens, fast charging, and responsive everyday speed for work and entertainment.',
      popularSeries: 'Realme Number Series · Narzo · Realme C Series',
    },
    {
      id: 'motorola',
      name: 'Motorola',
      focus: 'Edge & Moto G Series',
      description:
        'Clean near-stock Android experience, refined curved displays, and durable everyday smartphones.',
      popularSeries: 'Motorola Edge · Moto G Series',
    },
  ] as BrandItem[],

  // Toggle `enabled: false` on any service the owner chooses not to offer
  services: [
    {
      id: 'new-phones',
      number: '01.',
      title: 'New Mobile Phones',
      summary: 'Latest sealed smartphones across major global brands.',
      details:
        'Explore new arrivals from Apple, Samsung, OnePlus, Vivo, Oppo, Redmi, Realme, and Motorola with hands-on walkthroughs and transparent model comparisons.',
      enabled: true,
      featured: true,
      image: '/src/assets/images/mobile_phone_collection_1795610927558.jpg',
      imageAlt: 'Curated display lineup of new flagship smartphones on a stone showcase counter',
    },
    {
      id: 'second-hand',
      number: '02.',
      title: 'Second-Hand Mobile Phones',
      summary: 'Carefully inspected pre-owned smartphones for smart value.',
      details:
        'Quality-checked second-hand phones inspected for battery health, display clarity, and physical condition—ideal for customers seeking trusted devices at accessible budgets.',
      enabled: true,
    },
    {
      id: 'accessories',
      number: '03.',
      title: 'Mobile Accessories',
      summary: 'Chargers, protective cases, tempered glass, and audio.',
      details:
        'Everyday protection and power essentials including fast chargers, braided cables, wireless earbuds, power banks, covers, and precision screen guard installation.',
      enabled: true,
      featured: true,
      image: '/src/assets/images/mobile_accessories_showcase_1795610929713.jpg',
      imageAlt: 'Minimalist showroom display of earbuds, USB-C fast charger, power bank, cases, and tempered glass',
    },
    {
      id: 'repairing',
      number: '04.',
      title: 'Mobile Repairing',
      summary: 'In-store device diagnostics and hardware care.',
      details:
        'Bring your smartphone to the counter for preliminary inspection, screen and battery care guidance, and reliable repair support.',
      availabilityNote: 'Available on in-store check',
      enabled: true,
    },
    {
      id: 'exchange',
      number: '05.',
      title: 'Mobile Exchange',
      summary: 'Smooth in-person evaluation when upgrading your phone.',
      details:
        'Bring your current handset to Maa Mobile Center for a straightforward physical assessment and guidance on upgrading to your next smartphone.',
      availabilityNote: 'Subject to in-store device inspection',
      enabled: true,
    },
    {
      id: 'assistance',
      number: '06.',
      title: 'Customer Assistance',
      summary: 'Personal setup, data transfer, and model advice.',
      details:
        'From transferring contacts and photos to helping you choose the right storage and camera features, we take the time to get your device ready before you leave.',
      enabled: true,
    },
  ] as ServiceItem[],

  // Replace image paths below with actual Maa Mobile Center photographs anytime
  gallery: [
    {
      id: 'exterior',
      title: 'Showroom Exterior',
      category: 'Shop Exterior',
      caption: 'Welcoming glass storefront designed for easy visibility and comfortable walk-in access in Hazaribagh.',
      image: '/src/assets/images/store_exterior_showroom_1795610923381.jpg',
      alt: 'Modern mobile showroom exterior storefront illuminated warmly in the evening',
      featured: true,
    },
    {
      id: 'interior',
      title: 'Store Interior & Display Tables',
      category: 'Shop Interior',
      caption: 'Bright, uncluttered interior layout where customers can explore devices calmly with personal guidance.',
      image: '/src/assets/images/store_interior_display_1795610930790.jpg',
      alt: 'Bright minimalist showroom interior with display tables and customer consultation area',
    },
    {
      id: 'collection',
      title: 'Multi-Brand Smartphone Lineup',
      category: 'Phone Collection',
      caption: 'Curated range of flagship and everyday smartphones across Apple, Samsung, OnePlus, Vivo, Oppo, and more.',
      image: '/src/assets/images/mobile_phone_collection_1795610927558.jpg',
      alt: 'Row of modern flagship smartphones displayed neatly on a cool stone showroom table',
    },
    {
      id: 'accessories',
      title: 'Essential Accessories Counter',
      category: 'Accessories',
      caption: 'Fast chargers, wireless audio, magnetic power banks, protective covers, and tempered glass protection.',
      image: '/src/assets/images/mobile_accessories_showcase_1795610929713.jpg',
      alt: 'Organized display counter with wireless earbuds, USB-C charger, power bank, cases, and screen protectors',
    },
    {
      id: 'environment',
      title: 'Flagship Display Showcase',
      category: 'Phone Collection',
      caption: 'Clean presentation focused on helping you inspect finishes, ergonomics, and camera systems up close.',
      image: '/src/assets/images/hero_flagship_smartphones_1795610922805.jpg',
      alt: 'Studio showcase of premium smartphones in titanium, midnight navy, and silver finishes',
    },
  ] as GalleryItem[],

  // Strictly factual, owner-confirmable highlights
  whyChooseUs: [
    {
      number: '01.',
      title: 'Trusted Local Mobile Destination',
      description:
        'A dependable neighborhood showroom in Hazaribagh where customers know who they are speaking with before and after their visit.',
    },
    {
      number: '02.',
      title: 'Multiple Smartphone Brands',
      description:
        'Compare Apple, Samsung, Vivo, Oppo, OnePlus, Redmi, Realme, and Motorola side by side under a single roof.',
    },
    {
      number: '03.',
      title: 'Affordable Options',
      description:
        'Choices spanning entry-level, mid-range, flagship, and inspected second-hand smartphones so you can stay comfortably within budget.',
    },
    {
      number: '04.',
      title: 'Customer Assistance',
      description:
        'Clear, patient guidance on choosing models, setting up new devices, transferring data, and fitting accessories properly.',
    },
    {
      number: '05.',
      title: 'Convenient Store Location',
      description:
        'Centrally located in Hazaribagh with easy directions via Google Maps, open seven days a week for effortless walk-in visits.',
    },
  ] as WhyChooseUsItem[],
};
