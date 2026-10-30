export type Technology = 
  | 'React / Next.js' 
  | 'Laravel / PHP' 
  | 'WordPress / WooCommerce' 
  | 'Custom HTML/CSS';

export type IndustryType = 
  | 'E-Commerce' 
  | 'Corporate Portals' 
  | 'Landing Pages' 
  | 'SaaS / Web Apps';

export type DeviceFrameType = 'browser' | 'laptop' | 'mobile';

export interface Project {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  completionDate: string;
  technology: Technology;
  technologies: string[];
  projectType: IndustryType;
  liveUrl: string;
  thumbnailUrl: string;
  fullScreenshotUrl: string;
  summary: string;
  keyFeatures: string[];
  featured: boolean;
  order: number;
  frameType?: DeviceFrameType;
  previewMode?: 'screenshot' | 'iframe';
}

export interface ServiceOffering {
  id: string;
  title: string;
  description: string;
  badge: string;
  iconName: string;
  startingPrice: string;
  features: string[];
  popular?: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  avatarUrl: string;
  projectSlug?: string;
}

export interface HeroContent {
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  portraitImage?: string;
  portraitBadgeTitle?: string;
  portraitBadgeSub?: string;
  stats: {
    label: string;
    value: string;
    suffix?: string;
    subtext?: string;
  }[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  workingHours: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    behance: string;
  };
}

export interface SiteContent {
  agencyName: string;
  tagline: string;
  hero: HeroContent;
  services: ServiceOffering[];
  testimonials: Testimonial[];
  contact: ContactInfo;
}

export interface SeoConfig {
  siteTitle: string;
  titleTemplate: string;
  metaDescription: string;
  keywords: string[];
  canonicalBaseUrl: string;
  ogImage: string;
  twitterHandle: string;
  gscVerificationId: string;
  bingVerificationId: string;
  gtmContainerId: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
