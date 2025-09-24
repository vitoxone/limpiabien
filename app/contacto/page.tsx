// app/contacto/page.tsx
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Contacto | LimpiaBien',
  description: 'Escríbenos por WhatsApp para cotizar tu limpieza a domicilio.',
  alternates: { canonical: '/contacto' },
};
export default function Page() {
  return (
    <main className="container">
      <h1>Contacto</h1>
      <p>WhatsApp: +56 9 XXXXXXXX</p>
    </main>
  );
}