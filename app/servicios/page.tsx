// app/servicios/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import s from './styles.module.css';

export const metadata: Metadata = {
  title: 'Servicios de Limpieza de Tapices | LimpiaBien',
  description:
    'Limpieza de sillones, colchones y alfombras a domicilio en Nancagua, Santa Cruz, San Fernando, Chimbarongo y Chépica.',
  alternates: { canonical: '/servicios' },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <>
      {/* HERO */}
      <section className={s.hero}>
        <div className={s.wrap}>
          <div className={s.heroInner}>
            <div className={s.heroText}>
              <span className={s.eyebrow}>Nuestros servicios</span>
              <h1>Servicios de limpieza de tapices</h1>
              <p className={s.lead}>
                Profesionales, hipoalergénicos y a domicilio. Eliminamos manchas, ácaros y olores con
                equipos de inyección–succión.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8 }}>
                <Link className={s.btnPrimary} href="/#catalogo">Ver catálogo</Link>
                <Link className={s.btnGhost} href="/contacto">Contáctanos</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LISTA DE SERVICIOS */}
      <section className={`${s.section} ${s.alt}`}>
        <div className={s.wrap}>
          <div className={s.grid}>
            <article className={s.card}>
              <h3>Tapices / Sillones</h3>
              <p>Desmanchado focalizado y extracción profunda con Kärcher.</p>
              <Link href="/servicios/tapices" className={s.btnGhost}>Ver detalle</Link>
            </article>

            <article className={s.card}>
              <h3>Colchones</h3>
              <p>Higienización profunda, eliminación de ácaros y olores.</p>
              <Link href="/servicios/colchones" className={s.btnGhost}>Ver detalle</Link>
            </article>

            <article className={s.card}>
              <h3>Alfombras</h3>
              <p>Lavado profesional, recuperación de color y control de olores.</p>
              <Link href="/servicios/alfombras" className={s.btnGhost}>Ver detalle</Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}