// app/layout.tsx
import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://limpiabien.cl'),
  title: {
    default: "LimpiaBien — Limpieza de sillones, colchones y alfombras a domicilio | Región de O'Higgins",
    template: '%s | LimpiaBien',
  },
  description:
    "Limpieza profesional de sillones, colchones, alfombras y tapices de vehículos a domicilio en Nancagua, Santa Cruz, San Fernando, Chimbarongo y Chépica. Cotiza al instante por WhatsApp.",
  applicationName: 'LimpiaBien',
  keywords: [
    'limpieza de tapices',
    'lavado de sillones',
    'limpieza de colchones',
    'lavado de alfombras',
    'limpieza a domicilio',
    'limpieza tapices San Fernando',
    'lavado sillones Santa Cruz',
    'limpieza colchones Nancagua',
    'limpieza tapices Chimbarongo',
    'lavado alfombras Chépica',
    "Región de O'Higgins",
  ],
  authors: [{ name: 'LimpiaBien' }],
  creator: 'LimpiaBien',
  publisher: 'LimpiaBien',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://limpiabien.cl',
    title: 'LimpiaBien — Limpieza de sillones, colchones y alfombras a domicilio',
    description:
      "Limpieza profesional de sillones, colchones, alfombras y tapices de vehículos a domicilio en la Región de O'Higgins. Cotiza al instante por WhatsApp.",
    siteName: 'LimpiaBien',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "LimpiaBien — Limpieza profesional de tapices y alfombras a domicilio en la Región de O'Higgins",
      },
    ],
    locale: 'es_CL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LimpiaBien — Limpieza de sillones, colchones y alfombras a domicilio',
    description:
      "Limpieza profesional a domicilio en la Región de O'Higgins. Cotiza al instante por WhatsApp.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'home services',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  verification: {
    // google: 'TU_TOKEN_DE_VERIFICACION',
  },
  referrer: 'strict-origin-when-cross-origin',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0ea5e9' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://limpiabien.cl/#business',
    name: 'LimpiaBien',
    url: 'https://limpiabien.cl',
    logo: 'https://limpiabien.cl/logo-512.png',
    image: 'https://limpiabien.cl/og-image.jpg',
    telephone: '+56977515193',
    sameAs: ['https://www.instagram.com/limpiabien.cl'],
    areaServed: [
      { '@type': 'City', name: 'Nancagua' },
      { '@type': 'City', name: 'Santa Cruz' },
      { '@type': 'City', name: 'San Fernando' },
      { '@type': 'City', name: 'Chimbarongo' },
      { '@type': 'City', name: 'Chépica' },
      { '@type': 'AdministrativeArea', name: "Región de O'Higgins" },
    ],
    priceRange: '$$',
    description:
      "Limpieza profesional de sillones, colchones, alfombras y tapices de vehículos a domicilio en la Región de O'Higgins.",
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nancagua',
      addressRegion: "O'Higgins",
      addressCountry: 'CL',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de limpieza',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Limpieza de sillones y tapices', url: 'https://limpiabien.cl/servicios/tapices' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Limpieza de colchones', url: 'https://limpiabien.cl/servicios/colchones' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Lavado de alfombras', url: 'https://limpiabien.cl/servicios/alfombras' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Limpieza de tapices de vehículos' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Limpieza de escaleras alfombradas' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Limpieza de sillas tapizadas' } },
      ],
    },
  };

  return (
    <html lang="es" dir="ltr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${outfit.variable} antialiased min-h-dvh`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:m-2 focus:rounded-md focus:bg-black/80 focus:px-3 focus:py-2 focus:text-white"
        >
          Ir al contenido principal
        </a>
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
