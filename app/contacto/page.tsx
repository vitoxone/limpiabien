// app/contacto/page.tsx
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';

export const metadata: Metadata = {
  title: 'Contacto | LimpiaBien',
  description: 'Escríbenos por WhatsApp para cotizar tu limpieza a domicilio.',
  alternates: { canonical: '/contacto' },
};

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main className="container" style={{ paddingTop: 56, paddingBottom: 80 }}>
        <h1>Contacto</h1>
        <p>WhatsApp: +56 9 7751 5193</p>
      </main>
    </>
  );
}
