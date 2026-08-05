// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://limpiabien.cl';
  const now = new Date();
  return [
    { url: `${base}/`,                            lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/cotizar`,                     lastModified: now, changeFrequency: 'weekly',  priority: 0.95 },
    // /servicios se redirige a /#servicios (ver next.config.mjs) — no se indexa.
    // Sólo los slugs con página real: tapices, colchones, alfombras.
    { url: `${base}/servicios/tapices`,           lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/servicios/colchones`,         lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/servicios/alfombras`,         lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    // /blog excluido hasta que tenga contenido real
  ];
}
