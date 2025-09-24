// app/layout.tsx
import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://limpiabien.cl'),
  title: 'LimpiaBien — Limpieza de sillones, colchones y alfombras a domicilio',
  description:
    'Selección de servicios para cotización por WhatsApp e Instagram. Limpieza profesional de tapices, colchones y alfombras.',
  applicationName: 'LimpiaBien',
  generator: 'Next.js',
  keywords: [
    'limpieza de tapices',
    'lavado de sillones',
    'limpieza de colchones',
    'lavado de alfombras',
    'limpieza a domicilio',
    'San Fernando',
    'Santa Cruz',
    'Chimbarongo',
    'Chépica',
    'Nancagua',
    'Región de O’Higgins',
  ],
  authors: [{ name: 'LimpiaBien' }],
  creator: 'LimpiaBien',
  publisher: 'LimpiaBien',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'LimpiaBien — Limpieza de Tapices y Alfombras',
    description:
      'Servicio profesional de limpieza de tapices, sillones, colchones y alfombras a domicilio. Cotiza por WhatsApp en minutos.',
    siteName: 'LimpiaBien',
    images: [
      {
        url: '/og/cover.jpg', // prepara esta imagen (1200x630)
        width: 1200,
        height: 630,
        alt: 'LimpiaBien — Tapices y Alfombras Impecables',
      },
    ],
    locale: 'es_CL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LimpiaBien — Limpieza de Tapices y Alfombras',
    description:
      'Cotiza por WhatsApp y obtén descuentos por cantidad. Servicio a domicilio.',
    images: ['/og/cover.jpg'],
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
  category: 'home',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icons/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  verification: {
    // Completa si usas verificación
    // google: 'TU_TOKEN_DE_VERIFICACION',
  },
  referrer: 'strict-origin-when-cross-origin',
  // Útil si tienes temas claros/oscuro
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0B1220' },
  ],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JSON-LD para SEO local (ajusta name/url/logo/sameAs/areaServed)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'LimpiaBien',
    url: 'https://limpiabien.cl',
    logo: 'https://limpiabien.cl/_next/image?url=%2Flogo.png&w=96&q=75',
    image: 'https://limpiabien.cl/_next/image?url=%2Flogo.png&w=96&q=75',
    telephone: '+56977515193', // reemplaza
    sameAs: ['https://www.instagram.com/limpiabien.cl'],
    areaServed: ['Nancagua', 'San Fernando', 'Santa Cruz', 'Chimbarongo', 'Chépica', 'Región de O’Higgins'],
    priceRange: '$$',
    description:
      'Limpieza profesional de tapices, sillones, colchones y alfombras a domicilio. Cotiza por WhatsApp.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CL',
      addressRegion: 'O’Higgins',
    },
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Limpieza de sillones' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Limpieza de tapiz automotriz' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Lavado de alfombras' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Limpieza de colchones' },
      },
    ],
  };

  return (
    <html lang="es" dir="ltr">
      <head>
        {/* Pre-carga de fuentes/ DNS si fuese necesario */}
        {/* <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" /> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased min-h-dvh bg-white text-slate-900`}
      >
        {/* Enlace de salto para accesibilidad */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:m-2 focus:rounded-md focus:bg-black/80 focus:px-3 focus:py-2 focus:text-white"
        >
          Saltar al contenido
        </a>

        {/* Contenido */}
        <main id="main">{children}</main>

        {/* (Opcional) Google Analytics / Meta Pixel — agrega tu ID si lo usas */}
        {/*
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX`}
          strategy="afterInteractive"
        />
        <Script id="ga" strategy="afterInteractive">
          {`
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
           gtag('config', 'G-XXXXXXXX', { anonymize_ip: true });
          `}
        </Script>
        */}
      </body>
    </html>
  );
}