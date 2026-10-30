import { MetadataRoute } from 'next';
import { getProjects, getSeoConfig } from '@/lib/store';

function parseSafeDate(d?: string): Date {
  if (!d || typeof d !== 'string' || !d.trim()) return new Date();
  const parsed = new Date(d);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const seo = getSeoConfig();
  const projects = getProjects();
  const baseUrl = seo.canonicalBaseUrl.replace(/\/$/, '');

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/#portfolio-showcase`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#tech-arsenal`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/#services-section`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#estimate-section`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/#${p.slug}`,
    lastModified: parseSafeDate(p.completionDate),
    changeFrequency: 'monthly',
    priority: p.featured ? 0.85 : 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
