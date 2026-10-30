/**
 * URL resolution helper for portfolio projects and dynamic screenshot capture.
 * Generates dynamic, full-page screenshots using free APIs (Microlink with
 * multi-tier fallbacks to WordPress mShots and local vector mockups).
 */

const FALLBACK_MAP: Record<string, string> = {
  'proj-1': '/mockups/nova-store.svg',
  'proj-2': '/mockups/apex-saas.svg',
  'proj-3': '/mockups/zetapay.svg',
  'proj-4': '/mockups/artisan-wood.svg',
  'proj-5': '/mockups/pulsefit.svg',
  'proj-6': '/mockups/omnilogistics.svg',
  'proj-7': '/mockups/verde-arch.svg',
  'proj-8': '/mockups/aura-cosmetics.svg',
  novastore: '/mockups/nova-store.svg',
  nova: '/mockups/nova-store.svg',
  apexcloud: '/mockups/apex-saas.svg',
  apex: '/mockups/apex-saas.svg',
  zetapay: '/mockups/zetapay.svg',
  zeta: '/mockups/zetapay.svg',
  artisan: '/mockups/artisan-wood.svg',
  woodcraft: '/mockups/artisan-wood.svg',
  pulsefit: '/mockups/pulsefit.svg',
  omnilogistics: '/mockups/omnilogistics.svg',
  verde: '/mockups/verde-arch.svg',
  aura: '/mockups/aura-cosmetics.svg',
};

/**
 * Returns a crisp, pre-rendered vector SVG full-page mockup.
 */
export function getFallbackMockup(idOrTitle?: string): string {
  if (!idOrTitle) return '/mockups/nova-store.svg';
  const key = idOrTitle.toLowerCase();
  for (const [k, v] of Object.entries(FALLBACK_MAP)) {
    if (key.includes(k)) return v;
  }
  return '/mockups/nova-store.svg';
}

/**
 * Normalizes a website URL ensuring valid http/https protocol.
 */
export function normalizeLiveUrl(url: string | undefined): string {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return 'https://example.com';
  }
  const trimmed = url.trim().replace(/^['"]|['"]$/g, '');
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    return `https://${trimmed}`;
  }
  return trimmed;
}

/**
 * Checks if a string is a standard image file or local asset.
 */
export function isDirectImageUrl(url: string): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (trimmed.startsWith('/') || trimmed.startsWith('data:image')) return true;
  return /\.(png|jpe?g|webp|svg|gif|avif)(\?.*)?$/i.test(trimmed);
}

/**
 * Generates an automated full-page screenshot using the free Microlink API.
 */
export const getAutoScreenshot = (url: string, idOrTitle?: string): string => {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return getFallbackMockup(idOrTitle);
  }

  const trimmed = url.trim();

  // If already a local asset, SVG, or data URI
  if (isDirectImageUrl(trimmed)) {
    return trimmed;
  }

  // If already a screenshot API URL, return without re-wrapping
  if (trimmed.includes('api.microlink.io') || trimmed.includes('wordpress.com/mshots')) {
    return trimmed;
  }

  // If dummy example domain, use clean local vector mockup
  if (trimmed.includes('example.com') || trimmed.includes('localhost')) {
    return getFallbackMockup(idOrTitle);
  }

  const targetUrl = normalizeLiveUrl(trimmed);

  // Dynamic full-page screenshot via Microlink free API (1440px wide viewport, full-page height)
  return `https://api.microlink.io/?url=${encodeURIComponent(
    targetUrl
  )}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&screenshot.fullPage=true`;
};

/**
 * Generates a secondary fallback screenshot via WordPress mShots API (free, reliable, unmetered).
 */
export function getSecondaryScreenshot(url: string): string {
  const targetUrl = normalizeLiveUrl(url);
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(targetUrl)}?w=1440`;
}

/**
 * Generates a prioritized cascade of screenshot URLs for resilient client-side rendering.
 * [Primary Microlink -> Secondary mShots -> Vector Mockup Fallback]
 */
export function getScreenshotSources(
  screenshotUrl?: string,
  liveUrl?: string,
  idOrTitle?: string
): string[] {
  const sources: string[] = [];
  const fallback = getFallbackMockup(idOrTitle);

  // 1. Direct custom image if user explicitly provided a valid image file/upload
  if (screenshotUrl && screenshotUrl.trim()) {
    const s = screenshotUrl.trim();
    if (isDirectImageUrl(s)) {
      sources.push(s);
      return sources;
    }
  }

  // 2. Dynamic liveUrl screenshot APIs
  if (liveUrl && liveUrl.trim()) {
    const cleanLive = normalizeLiveUrl(liveUrl);
    if (!cleanLive.includes('example.com') && !cleanLive.includes('localhost')) {
      // Primary: Microlink dynamic full-page screenshot
      sources.push(
        `https://api.microlink.io/?url=${encodeURIComponent(
          cleanLive
        )}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1440&screenshot.fullPage=true`
      );

      // Secondary: WordPress mShots API
      sources.push(`https://s.wordpress.com/mshots/v1/${encodeURIComponent(cleanLive)}?w=1440`);
    }
  }

  // 3. Fallback vector mockup (always present and guaranteed to work)
  if (!sources.includes(fallback)) {
    sources.push(fallback);
  }

  return sources;
}

/**
 * Resolves the primary screenshot URL for any project.
 */
export function resolveScreenshotUrl(
  screenshotUrl?: string,
  liveUrl?: string,
  idOrTitle?: string
): string {
  const sources = getScreenshotSources(screenshotUrl, liveUrl, idOrTitle);
  return sources[0] || getFallbackMockup(idOrTitle);
}
