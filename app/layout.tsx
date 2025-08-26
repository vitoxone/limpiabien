import './globals.css';

export const metadata = {
  title: 'LimpiaBien — Servicios & Calculadora',
  description: 'Selección de servicios para cotización por WhatsApp y calculadora interna con descuentos.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
