import fs from 'fs';
import path from 'path';
import { Project, SiteContent, SeoConfig } from './types';
import { getAutoScreenshot, getFallbackMockup } from './url-helper';

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'NovaStore Next-Gen Headless Commerce',
    slug: 'novastore-headless-commerce',
    clientName: 'Nova Technologies Ltd.',
    completionDate: '2025-11-15',
    technology: 'React / Next.js',
    technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Algolia'],
    projectType: 'E-Commerce',
    liveUrl: 'https://example.com/novastore',
    thumbnailUrl: '/mockups/nova-store.svg',
    fullScreenshotUrl: '/mockups/nova-store.svg',
    summary: 'Ultra-fast headless commerce platform with sub-100ms instant search, dynamic product personalizer, and real-time inventory synchronization.',
    keyFeatures: [
      'Sub-second TTFB and Core Web Vitals score of 100/100',
      'Algolia AI-powered instant search and facet filtering',
      'One-click multi-currency Stripe Checkout with 3D Secure',
      'Server Actions with Optimistic UI updates'
    ],
    featured: true,
    order: 1,
    frameType: 'laptop',
  },
  {
    id: 'proj-2',
    title: 'ApexCloud Enterprise Observability SaaS',
    slug: 'apexcloud-enterprise-saas',
    clientName: 'Apex Cloud Systems Corp.',
    completionDate: '2025-10-02',
    technology: 'React / Next.js',
    technologies: ['Next.js 14', 'React 18', 'Ant Design v5', 'Apache ECharts', 'WebSocket'],
    projectType: 'SaaS / Web Apps',
    liveUrl: 'https://example.com/apexcloud',
    thumbnailUrl: '/mockups/apex-saas.svg',
    fullScreenshotUrl: '/mockups/apex-saas.svg',
    summary: 'High-throughput cloud monitoring dashboard streaming telemetry from 10,000+ Kubernetes nodes with sub-second alert triggers.',
    keyFeatures: [
      'Real-time WebSocket telemetry ingestion stream',
      'Ant Design v5 customized executive dark theme',
      'Granular RBAC with audit logging & SOC2 compliance',
      'Custom SVG time-series visualizer with zoom & export'
    ],
    featured: true,
    order: 2,
    frameType: 'browser',
  },
  {
    id: 'proj-3',
    title: 'ZetaPay Global Settlement Portal',
    slug: 'zetapay-settlement-portal',
    clientName: 'Zeta Banking Group',
    completionDate: '2025-08-20',
    technology: 'Laravel / PHP',
    technologies: ['Laravel 11', 'PHP 8.3', 'Inertia.js', 'PostgreSQL', 'Redis'],
    projectType: 'Corporate Portals',
    liveUrl: 'https://example.com/zetapay',
    thumbnailUrl: '/mockups/zetapay.svg',
    fullScreenshotUrl: '/mockups/zetapay.svg',
    summary: 'Institutional banking portal handling $40M+ daily multi-currency cross-border settlement with zero-trust cryptographic verification.',
    keyFeatures: [
      'PCI-DSS Level 1 compliant architecture and HSM encryption',
      'Automated FX rate hedging and reconciliation cron jobs',
      'High-performance Redis queue processing 12,000 jobs/min',
      'Comprehensive RESTful & GraphQL OpenAPI documentation'
    ],
    featured: true,
    order: 3,
    frameType: 'browser',
  },
  {
    id: 'proj-4',
    title: 'Artisan & Oak Luxury Woodcraft',
    slug: 'artisan-oak-woodcraft',
    clientName: 'Artisan Living Studios',
    completionDate: '2025-06-12',
    technology: 'WordPress / WooCommerce',
    technologies: ['WordPress VIP', 'WooCommerce', 'Custom Gutenberg Blocks', 'Tailwind', 'PHP 8.2'],
    projectType: 'E-Commerce',
    liveUrl: 'https://example.com/artisan-oak',
    thumbnailUrl: '/mockups/artisan-wood.svg',
    fullScreenshotUrl: '/mockups/artisan-wood.svg',
    summary: 'Custom bespoke e-commerce boutique with 3D product visualizer, custom wood joinery configurator, and artisan story journal.',
    keyFeatures: [
      'Headless WordPress API integrated with ultra-light frontend',
      'Dynamic shipping calculator with freight logistics API',
      'Custom commission request builder with PDF quote generator',
      '100% accessible WCAG AAA compliant typography and color contrast'
    ],
    featured: false,
    order: 4,
    frameType: 'laptop',
  },
  {
    id: 'proj-5',
    title: 'PulseFit Hypertrophy & Bio-Tracking App',
    slug: 'pulsefit-hypertrophy-app',
    clientName: 'Pulse Fitness Global',
    completionDate: '2025-09-18',
    technology: 'React / Next.js',
    technologies: ['Next.js App Router', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'PWA'],
    projectType: 'Landing Pages',
    liveUrl: 'https://example.com/pulsefit',
    thumbnailUrl: '/mockups/pulsefit.svg',
    fullScreenshotUrl: '/mockups/pulsefit.svg',
    summary: 'High-converting interactive landing page and web application featuring animated workout builders, caloric intake calculators, and Apple Health sync.',
    keyFeatures: [
      'Conversion rate optimized multi-step onboarding wizard',
      'Interactive metabolic baseline and macro nutrient calculator',
      'PWA offline caching for workout routines at the gym',
      'A/B tested pricing tiers driving 34% lift in annual trials'
    ],
    featured: true,
    order: 5,
    frameType: 'mobile',
  },
  {
    id: 'proj-6',
    title: 'OmniLogistics Autonomous Dispatch CRM',
    slug: 'omnilogistics-dispatch-crm',
    clientName: 'Omni Worldwide Freight',
    completionDate: '2025-07-28',
    technology: 'Laravel / PHP',
    technologies: ['Laravel 11', 'Livewire 3', 'Alpine.js', 'MySQL 8', 'Docker'],
    projectType: 'SaaS / Web Apps',
    liveUrl: 'https://example.com/omnilogistics',
    thumbnailUrl: '/mockups/omnilogistics.svg',
    fullScreenshotUrl: '/mockups/omnilogistics.svg',
    summary: 'Enterprise fleet coordination system with algorithmic route optimization, electronic bill of lading generation, and telematics alerts.',
    keyFeatures: [
      'Dynamic geofencing and real-time GPS fleet telemetry',
      'Automated load matching and spot rate bidding engine',
      'Digital signature capture and automated customs manifests',
      'Exportable Excel / PDF reports with scheduled executive digests'
    ],
    featured: false,
    order: 6,
    frameType: 'browser',
  },
  {
    id: 'proj-7',
    title: 'Verde Architecture & Masterplanning',
    slug: 'verde-architecture-firm',
    clientName: 'Verde Studio Zurich',
    completionDate: '2025-05-14',
    technology: 'Custom HTML/CSS',
    technologies: ['Vanilla ES6+', 'Modern CSS Grid', 'WebGL Three.js', 'Vite', 'IntersectionObserver'],
    projectType: 'Corporate Portals',
    liveUrl: 'https://example.com/verde-arch',
    thumbnailUrl: '/mockups/verde-arch.svg',
    fullScreenshotUrl: '/mockups/verde-arch.svg',
    summary: 'Minimalist, luxury architectural portfolio showcasing museum projects across Europe with smooth parallax scrolling and WebGL transitions.',
    keyFeatures: [
      'Zero-dependency ultra-lightweight codebase (sub 35KB bundle)',
      'Smooth inertia scroll with custom cubic-bezier dampening',
      'High-resolution retina image delivery with lazy progressive blur-up',
      'Nominated for Awwwards Site of the Day 2025'
    ],
    featured: true,
    order: 7,
    frameType: 'laptop',
  },
  {
    id: 'proj-8',
    title: 'Aura Botanicals Luxury Skincare Launch',
    slug: 'aura-botanicals-launch',
    clientName: 'Aura Paris Laboratories',
    completionDate: '2025-04-10',
    technology: 'WordPress / WooCommerce',
    technologies: ['WooCommerce', 'Next.js Frontend', 'GraphQL', 'Tailwind CSS', 'Klaviyo'],
    projectType: 'Landing Pages',
    liveUrl: 'https://example.com/aura-botanicals',
    thumbnailUrl: '/mockups/aura-cosmetics.svg',
    fullScreenshotUrl: '/mockups/aura-cosmetics.svg',
    summary: 'Viral product launch page featuring micro-interactions, influencer video reels, sticky buy box, and dynamic stock scarcity countdown.',
    keyFeatures: [
      'Klaviyo SMS & Email automated early-access queue',
      'Sticky checkout pill with real-time bundle discount calculator',
      'Social proof toast notifications linked directly to live orders',
      'Generated $180K in pre-orders in the first 48 hours of launch'
    ],
    featured: false,
    order: 8,
    frameType: 'mobile',
  },
];

export const initialSiteContent: SiteContent = {
  agencyName: 'Osama Elgendy Agency',
  tagline: 'Principal Full-Stack Engineering & High-Converting Digital Solutions',
  hero: {
    eyebrow: 'Full-Stack Web Engineering • Custom UI/UX • Ant Design Specialists',
    titlePrefix: 'We Architect High-Converting',
    titleHighlight: 'Web Apps & Digital Experiences',
    titleSuffix: 'That Scale Relentlessly.',
    description: 'Lead by Osama Elgendy, we partner with visionary brands, funded startups, and industry leaders to design, engineer, and deploy high-speed web applications with Next.js, Laravel, and rock-solid Ant Design architectures.',
    primaryCtaText: 'Explore Featured Projects',
    primaryCtaLink: '#portfolio-showcase',
    secondaryCtaText: 'Request Instant Estimate',
    secondaryCtaLink: '#estimate-section',
    portraitImage: '/osama-portrait.jpg',
    portraitBadgeTitle: 'Principal Full Stack Architect',
    portraitBadgeSub: '10+ Years Enterprise Delivery',
    stats: [
      { label: 'Projects Delivered', value: '60+', suffix: '', subtext: 'Across 14 countries' },
      { label: 'Client Satisfaction', value: '99.6%', suffix: '', subtext: 'Verified 5-star reviews' },
      { label: 'Avg Speed Boost', value: '3.4x', suffix: '', subtext: 'Lighthouse 95+ score' },
      { label: 'Combined Experience', value: '10+', suffix: 'Years', subtext: 'Enterprise full stack' },
    ],
  },
  services: [
    {
      id: 'srv-1',
      title: 'Full-Stack Next.js & React Web Apps',
      description: 'Production-ready web applications built on Next.js App Router, TypeScript, and Ant Design. Blazing fast SSR, server actions, and resilient state management.',
      badge: 'Core Expertise',
      iconName: 'CodeXml',
      startingPrice: 'From $2,800',
      popular: true,
      features: [
        'App Router architecture with zero hydration errors',
        'Ant Design v5 customized design systems & tokens',
        'Strict TypeScript and end-to-end type safety',
        'Authentication, RBAC & payment integration (Stripe)',
      ],
    },
    {
      id: 'srv-2',
      title: 'Enterprise Laravel & REST/GraphQL APIs',
      description: 'Robust, battle-tested backends built with Laravel 11, PHP 8.3, PostgreSQL, and Redis. Scalable microservices, automated queuing, and cryptographic security.',
      badge: 'Backend Power',
      iconName: 'Server',
      startingPrice: 'From $2,400',
      popular: false,
      features: [
        'High-concurrency queue workers & cron scheduler',
        'PCI-DSS compliant payment rails & webhooks',
        'Inertia.js or decoupled headless API endpoints',
        'Automated database migrations, seeding & CI/CD',
      ],
    },
    {
      id: 'srv-3',
      title: 'High-Converting E-Commerce Platforms',
      description: 'Custom Shopify, WooCommerce, or headless Next.js storefronts engineered to maximize checkout conversion, average order value, and page speed.',
      badge: 'Revenue Focused',
      iconName: 'ShoppingCart',
      startingPrice: 'From $3,200',
      popular: true,
      features: [
        'Instant sub-second product search & facet filters',
        'Frictionless 1-page checkout flows with Apple/Google Pay',
        'Inventory sync, ERP connectors & shipping APIs',
        'Conversion-tested A/B layouts & dynamic promo bars',
      ],
    },
    {
      id: 'srv-4',
      title: 'Technical SEO & Core Web Vitals Mastery',
      description: 'Comprehensive technical audit, semantic HTML structure, dynamic JSON-LD schema generation, and code splitting targeting pure 95-100 Google Lighthouse scores.',
      badge: 'Rankings & Growth',
      iconName: 'TrendingUp',
      startingPrice: 'From $1,200',
      popular: false,
      features: [
        'Dynamic XML sitemaps, robots.txt & canonical tags',
        'Rich JSON-LD schemas: WebSite, Org, Service, Breadcrumb',
        'Next-gen WebP/AVIF image pipeline & font optimization',
        'Google Search Console & Bing Webmaster index verification',
      ],
    },
    {
      id: 'srv-5',
      title: 'Executive Admin Panels & Internal Tools',
      description: 'Custom enterprise-grade operational dashboards, CRM systems, and content management consoles utilizing Ant Design Pro components and real-time tables.',
      badge: 'Productivity',
      iconName: 'LayoutDashboard',
      startingPrice: 'From $2,500',
      popular: false,
      features: [
        'Ant Design Tables with filtering, sorting & export',
        'Dynamic multi-step forms with live validation',
        'Role-based permissions & audit activity logging',
        'Interactive metrics widgets & visual telemetry charts',
      ],
    },
    {
      id: 'srv-6',
      title: 'UI/UX Prototyping & Design Systems',
      description: 'Bespoke user interface and user experience design translating brand identity into reusable component libraries, design tokens, and interactive device mockups.',
      badge: 'Design Excellence',
      iconName: 'Sparkles',
      startingPrice: 'From $1,500',
      popular: false,
      features: [
        'Interactive Figma prototypes & wireframes',
        'Consistent design tokens (colors, spacing, elevation)',
        'Device mockup frames with smooth hover-scroll effects',
        'Cross-browser and mobile responsive testing',
      ],
    },
  ],
  testimonials: [
    {
      id: 'test-1',
      clientName: 'Alexander Sterling',
      company: 'Nova Commerce Ltd.',
      role: 'Chief Technology Officer',
      content: 'Osama and his team transformed our slow monolithic storefront into a lightning-fast Next.js headless powerhouse. Our mobile conversion rate jumped by 42% in the first quarter alone. Their expertise in Ant Design and modern UI engineering is unmatched.',
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      projectSlug: 'novastore-headless-commerce',
    },
    {
      id: 'test-2',
      clientName: 'Sarah Jenkins',
      company: 'Apex Cloud Systems',
      role: 'VP of Product Engineering',
      content: 'Building an observability dashboard that can render millions of telemetry points without UI stutter seemed impossible until Osama joined the project. The Ant Design v5 layout and custom data visualizations are world-class.',
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      projectSlug: 'apexcloud-enterprise-saas',
    },
    {
      id: 'test-3',
      clientName: 'Dr. Tariq Mansour',
      company: 'Zeta Financial Group',
      role: 'Head of Digital Infrastructure',
      content: 'The security and performance demands of our corporate settlement portal were extraordinarily stringent. Osama delivered a flawless Laravel and Inertia system on schedule, passing all penetration audits with flying colors.',
      rating: 5,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      projectSlug: 'zetapay-settlement-portal',
    },
  ],
  contact: {
    email: 'contact@osamaelgendy.dev',
    phone: '+20 100 000 0000',
    whatsapp: '+201000000000',
    address: 'Cairo, Egypt & Global Remote Services',
    workingHours: 'Sunday – Thursday: 9:00 AM – 7:00 PM (GMT+3)',
    socials: {
      github: 'https://github.com/osamaelgendy',
      linkedin: 'https://linkedin.com/in/osamaelgendy',
      twitter: 'https://twitter.com/osamaelgendy',
      behance: 'https://behance.net/osamaelgendy',
    },
  },
};

export const initialSeoConfig: SeoConfig = {
  siteTitle: 'Osama Elgendy | Principal Full-Stack Engineer & Digital Agency',
  titleTemplate: '%s | Osama Elgendy Agency',
  metaDescription: 'High-converting Web Design & Full-Stack Development agency portfolio led by Osama Elgendy. Specializing in Next.js, Laravel, Ant Design systems, and Technical SEO.',
  keywords: [
    'Osama Elgendy',
    'Full Stack Developer',
    'Next.js Specialist',
    'Ant Design UI/UX',
    'Laravel Backend Architect',
    'High Performance Web Design',
    'Technical SEO Expert',
    'Agency Portfolio'
  ],
  canonicalBaseUrl: 'https://osamaelgendy.dev',
  ogImage: '/logo.png',
  twitterHandle: '@osamaelgendy',
  gscVerificationId: 'google-site-verification=OG_DEMO_VERIFY_TOKEN_2026',
  bingVerificationId: 'BING_WEBMASTER_TOKEN_SAMPLE_2026',
  gtmContainerId: 'GTM-OSAMA99',
  robotsIndex: true,
  robotsFollow: true,
};

interface LocalDataStorage {
  projects: Project[];
  siteContent: SiteContent;
  seoConfig: SeoConfig;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'portfolio-store.json');

// Memory cache
let inMemoryStore: LocalDataStorage = {
  projects: initialProjects,
  siteContent: initialSiteContent,
  seoConfig: initialSeoConfig,
};

function readStorage(): LocalDataStorage {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed && parsed.projects && parsed.siteContent && parsed.seoConfig) {
        if (Array.isArray(parsed.projects)) {
          // If stored projects are fewer than initial baseline, merge so showcase is populated
          const existingIds = new Set(parsed.projects.map((p: Project) => p.id));
          for (const initProj of initialProjects) {
            if (!existingIds.has(initProj.id)) {
              parsed.projects.push(initProj);
            }
          }
          inMemoryStore = parsed;
          return inMemoryStore;
        }
      }
    }
  } catch (err) {
    console.warn('Failed reading store file, falling back to in-memory store:', err);
  }
  return inMemoryStore;
}

function writeStorage(data: LocalDataStorage): void {
  inMemoryStore = data;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Failed writing store file to disk:', err);
  }
}

// Public Store API
export function getProjects(): Project[] {
  const store = readStorage();
  return store.projects.sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  const projects = getProjects();
  return projects.find((p) => p.slug === slug);
}

export function saveProject(project: Project): Project {
  const store = readStorage();

  // Dynamically derive screenshot URLs from liveUrl if empty or omitted
  if (!project.fullScreenshotUrl || !project.fullScreenshotUrl.trim() || project.fullScreenshotUrl.includes('api.microlink.io/?url=https%3A%2F%2Fapi.microlink.io')) {
    project.fullScreenshotUrl = getAutoScreenshot(project.liveUrl, project.title);
  }
  if (!project.thumbnailUrl || !project.thumbnailUrl.trim()) {
    project.thumbnailUrl = project.fullScreenshotUrl;
  }

  const index = store.projects.findIndex((p) => p.id === project.id);
  if (index >= 0) {
    store.projects[index] = project;
  } else {
    store.projects.push(project);
  }
  writeStorage(store);
  return project;
}

export function deleteProject(id: string): boolean {
  const store = readStorage();
  const initialLength = store.projects.length;
  store.projects = store.projects.filter((p) => p.id !== id);
  if (store.projects.length !== initialLength) {
    writeStorage(store);
    return true;
  }
  return false;
}

export function getSiteContent(): SiteContent {
  const store = readStorage();
  return store.siteContent;
}

export function updateSiteContent(content: SiteContent): SiteContent {
  const store = readStorage();
  store.siteContent = content;
  writeStorage(store);
  return store.siteContent;
}

export function getSeoConfig(): SeoConfig {
  const store = readStorage();
  return store.seoConfig;
}

export function updateSeoConfig(config: SeoConfig): SeoConfig {
  const store = readStorage();
  store.seoConfig = config;
  writeStorage(store);
  return store.seoConfig;
}

