import { MetadataRoute } from 'next';
import { getSeoConfig } from '@/lib/store';

export default function robots(): MetadataRoute.Robots {
  const seo = getSeoConfig();
  const baseUrl = seo.canonicalBaseUrl.replace(/\/$/, '');

  return {
    rules: {
      userAgent: '*',
      allow: seo.robotsIndex ? '/' : '',
      disallow: seo.robotsIndex ? ['/admin', '/api/'] : '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

