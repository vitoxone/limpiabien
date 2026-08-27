// app/blog/page.tsx
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: 'Blog | LimpiaBien',
  description: 'Consejos de limpieza de sillones, colchones y alfombras.',
  alternates: { canonical: '/blog' },
  robots: { index: false, follow: false }, // sin contenido aún — noindex temporal
};

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main className="container" style={{ paddingTop: 56, paddingBottom: 80 }}>
        <h1>Blog</h1>
        <p>Pronto publicaremos tips y guías prácticas.</p>
      </main>

      <SiteFooter />
    </>
  );
}
