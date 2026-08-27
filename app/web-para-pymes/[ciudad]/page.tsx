// app/web-para-pymes/[ciudad]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { buildWaLink } from '@/lib/wa';
import { CIUDADES_WEB, getCiudadWeb, busquedasDe } from '@/data/ciudades-web';
import {
  WaIcon, waMensaje, IncluyeSection, PasosSection, FaqSection, FAQS_GENERALES,
} from '../sections';
import s from '../styles.module.css';

const BASE = 'https://limpiabien.cl';

export function generateStaticParams() {
  return CIUDADES_WEB.map((c) => ({ ciudad: c.slug }));
}

export async function generateMetadata({ params }: { params: { ciudad: string } }): Promise<Metadata> {
  const c = getCiudadWeb(params.ciudad);
  if (!c) return {};

  const title = `Páginas web para pymes en ${c.nombre}`;
  const description =
    `Diseñamos sitios web para pymes de servicios en ${c.nombre}: cotizador en línea, ` +
    `WhatsApp conectado y presencia en Google. Trabajo remoto para todo Chile.`;

  return {
    title,
    description,
    alternates: { canonical: `/web-para-pymes/${c.slug}` },
    keywords: [
      ...busquedasDe(c),
      `desarrollo web ${c.nombre}`,
      `agencia web ${c.nombre}`,
      'páginas web para pymes Chile',
    ],
    openGraph: {
      type: 'website',
      url: `${BASE}/web-para-pymes/${c.slug}`,
      title: `${title} | LimpiaBien`,
      description,
      siteName: 'LimpiaBien',
      locale: 'es_CL',
    },
  };
}

export default function CiudadPage({ params }: { params: { ciudad: string } }) {
  const c = getCiudadWeb(params.ciudad);
  if (!c) notFound();

  const waHref = buildWaLink(waMensaje(c.nombre));
  const faqs = [c.faqLocal, ...FAQS_GENERALES];
  const busquedas = busquedasDe(c);
  const vecinas = c.cerca
    .map((slug) => CIUDADES_WEB.find((x) => x.slug === slug))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: `Diseño de páginas web para pymes en ${c.nombre}`,
        serviceType: 'Diseño y desarrollo web',
        url: `${BASE}/web-para-pymes/${c.slug}`,
        provider: { '@id': `${BASE}/#business` },
        areaServed: [
          { '@type': 'City', name: c.nombre },
          { '@type': 'AdministrativeArea', name: `Provincia de ${c.provincia}` },
          { '@type': 'Country', name: 'Chile' },
        ],
        description:
          `Sitios web para pymes de servicios de ${c.nombre}: página propia con dominio, ` +
          `cotizador en línea, contacto por WhatsApp y optimización para búsquedas locales en Google.`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${BASE}/` },
          { '@type': 'ListItem', position: 2, name: 'Sitios web para pymes', item: `${BASE}/web-para-pymes` },
          { '@type': 'ListItem', position: 3, name: c.nombre, item: `${BASE}/web-para-pymes/${c.slug}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <SiteHeader />

      <main>
        {/* HERO */}
        <section className={`${s.hero} ${s.heroCiudad}`}>
          <div className="band-inner">
            <nav className={s.crumbs} aria-label="Ruta de navegación">
              <Link href="/web-para-pymes">Sitios web para pymes</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{c.nombre}</span>
            </nav>

            <div className={s.ciudadHead}>
              <span className={s.heroPill}>
                <span className={s.heroPillDot} aria-hidden="true" />
                Provincia de {c.provincia} · Región de O’Higgins
              </span>
              <h1 className={s.heroTitle}>
                Páginas web para pymes en <em>{c.nombre}</em>
              </h1>
              <p className={s.heroSub}>{c.gancho}</p>
              <div className={s.heroActions}>
                <a className="btn btn-cta btn-lg" href={waHref} target="_blank" rel="noopener noreferrer">
                  <WaIcon />
                  Conversemos por WhatsApp
                </a>
                <Link className="btn btn-outline btn-lg" href="/">
                  Ver este sitio como ejemplo
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CONTEXTO LOCAL */}
        <section className={s.contextoSection}>
          <div className={`band-inner ${s.contextoInner}`}>
            <div>
              <span className="section-eyebrow">Cómo se vende en {c.nombre}</span>
              <h2 className={s.contextoTitle}>
                Tu cliente de {c.nombre} <em>ya está buscando</em>
              </h2>
              <p className={s.contextoBody}>{c.contexto}</p>
            </div>
            <aside className={s.remotoCard}>
              <h3 className={s.remotoTitle}>Trabajamos en remoto para todo Chile</h3>
              <p className={s.remotoBody}>
                No necesitas que estemos en {c.nombre} para tener un buen sitio. Todo se coordina
                por WhatsApp y videollamada, en el horario que a ti te acomode. Tenemos base en
                O’Higgins porque de ahí es LimpiaBien, pero el trabajo es el mismo estés donde estés.
              </p>
              <a className="btn btn-dark" href={waHref} target="_blank" rel="noopener noreferrer">
                <WaIcon />
                Escríbenos
              </a>
            </aside>
          </div>
        </section>

        {/* RUBROS LOCALES */}
        <section className={s.rubrosSection}>
          <div className="band-inner">
            <div className={s.rubrosHead}>
              <span className="section-eyebrow">Para quién</span>
              <h2 className={s.rubrosTitle}>
                Rubros de {c.nombre} <em>que más lo aprovechan</em>
              </h2>
              <p className={s.rubrosSub}>
                Trabajamos con pymes que cotizan trabajo a medida y cierran por mensaje.
                Estos son los que más peso tienen por acá, pero la lista no es cerrada.
              </p>
            </div>
            <ul className={s.rubrosGrid}>
              {c.rubros.map((r) => (
                <li key={r} className={s.rubroChip}>{r}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* BÚSQUEDAS LOCALES — el long-tail concreto que la página persigue */}
        <section className={s.busquedasSection}>
          <div className={`band-inner ${s.busquedasInner}`}>
            <div>
              <span className="section-eyebrow">Posicionamiento local</span>
              <h2 className={s.contextoTitle}>
                Lo que tu cliente <em>escribe en Google</em>
              </h2>
              <p className={s.busquedasBody}>
                Nadie busca «agencia digital». Busca el servicio que necesita más el nombre de la
                ciudad, y eso es exactamente lo que se trabaja: una página por cada cosa que
                vendes y por cada comuna donde atiendes, escrita con las palabras que tu cliente
                de {c.nombre} usa de verdad.
              </p>
            </div>
            <ul className={s.busquedasList}>
              {busquedas.map((b) => (
                <li key={b} className={s.busquedaItem}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} aria-hidden="true">
                    <circle cx="11" cy="11" r="7" />
                    <path strokeLinecap="round" d="M20 20l-3.5-3.5" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <IncluyeSection
          titulo={<>Todo lo que este sitio hace, <em>hecho para el tuyo</em></>}
        />

        {/* PRUEBA */}
        <section className={s.proofSection}>
          <div className={`band-inner ${s.proofInner}`}>
            <div className={s.proofText}>
              <span className="section-eyebrow">La muestra</span>
              <h2 className={s.proofTitle}>
                No te vamos a mostrar un portafolio: <em>estás parado en el ejemplo</em>
              </h2>
              <p className={s.proofBody}>
                Este mismo sitio es un trabajo nuestro y es el que usa LimpiaBien todos los días
                para recibir pedidos en {c.nombre} y el resto de la región. Recórrelo: mira cómo se
                arma una cotización, cómo se ven las páginas de cada servicio y cómo termina todo
                en un mensaje de WhatsApp con el detalle listo.
              </p>
              <div className={s.proofActions}>
                <Link className="btn btn-dark" href="/cotizar">Probar el cotizador</Link>
                <Link className="btn btn-ghost" href="/servicios/tapices">Ver una página de servicio →</Link>
              </div>
            </div>
            <ul className={s.proofList}>
              <li>Catálogo de servicios con sus precios</li>
              <li>Cotizador con carrito y resumen flotante</li>
              <li>Una landing por cada servicio, para Google</li>
              <li>Una página por ciudad — como esta que estás leyendo</li>
              <li>Fotos de trabajos reales desde Instagram</li>
            </ul>
          </div>
        </section>

        <PasosSection titulo={<>Cuatro pasos, <em>sin tecnicismos</em></>} />

        <FaqSection faqs={faqs} />

        {/* CIUDADES CERCANAS */}
        <section className={s.cercaSection}>
          <div className="band-inner">
            <div className={s.rubrosHead}>
              <span className="section-eyebrow">Cerca de {c.nombre}</span>
              <h2 className={s.rubrosTitle}>
                También trabajamos con pymes de <em>estas comunas</em>
              </h2>
            </div>
            <ul className={s.cercaGrid}>
              {vecinas.map((v) => (
                <li key={v.slug}>
                  <Link href={`/web-para-pymes/${v.slug}`} className={s.cercaCard}>
                    <strong>{v.nombre}</strong>
                    <span>Páginas web para pymes →</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className={s.cercaTodas}>
              <Link href="/web-para-pymes">Ver todas las ciudades</Link>
            </p>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="cta-final" aria-labelledby="ciudad-cta-title">
          <h2 id="ciudad-cta-title" className="cta-final-title">
            Cuéntanos de tu pyme en {c.nombre}<br /><em>y te decimos qué se puede hacer</em>
          </h2>
          <p className="cta-final-sub">
            Un mensaje de WhatsApp, quince minutos de conversación y un valor cerrado.
            Si no te sirve, no pasa nada.
          </p>
          <div className="cta-final-actions">
            <a className="btn btn-cta btn-lg" href={waHref} target="_blank" rel="noopener noreferrer">
              <WaIcon />
              Escríbenos por WhatsApp
            </a>
            <Link className="btn btn-outline btn-lg" href="/web-para-pymes">
              Ver todo lo que incluye
            </Link>
          </div>
          <div className="cta-final-trust">
            <span>Valor cerrado antes de empezar</span>
            <span>El dominio queda a tu nombre</span>
            <span>Remoto para todo Chile</span>
          </div>
        </section>
      </main>

      <SiteFooter pymeCta={false} />
    </>
  );
}
