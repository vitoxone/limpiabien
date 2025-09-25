// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://limpiabien.cl';
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/servicios`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/servicios/tapices`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/servicios/colchones`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/servicios/alfombras`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];
}