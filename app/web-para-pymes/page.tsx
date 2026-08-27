// app/web-para-pymes/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { buildWaLink } from '@/lib/wa';
import { CIUDADES_WEB } from '@/data/ciudades-web';
import {
  WaIcon, waMensaje, IncluyeSection, PasosSection, FaqSection, FAQS_GENERALES,
} from './sections';
import s from './styles.module.css';

export const metadata: Metadata = {
  title: 'Páginas web para pymes de servicios',
  description:
    'Hacemos sitios web para pymes de servicios: cotizador en línea, contacto directo por WhatsApp y presencia en Google. Remoto para todo Chile, con base en la Región de O’Higgins.',
  alternates: { canonical: '/web-para-pymes' },
  keywords: [
    'páginas web para pymes',
    'páginas web para pymes Chile',
    'diseño web para pymes',
    'sitio web para pyme de servicios',
    'cotizador en línea para pymes',
    ...CIUDADES_WEB.map((c) => `página web para pymes ${c.nombre}`),
  ],
  openGraph: {
    type: 'website',
    url: 'https://limpiabien.cl/web-para-pymes',
    title: 'Páginas web para pymes de servicios',
    description:
      'Sitio propio, cotizador en línea y WhatsApp conectado. El mismo equipo detrás de limpiabien.cl.',
    siteName: 'LimpiaBien',
    locale: 'es_CL',
  },
};

/** Dolores típicos de una pyme de servicios que todavía vende solo por redes. */
const DOLORES = [
  {
    title: 'Vendes solo por Instagram',
    desc: 'Tus precios quedan enterrados entre las historias y cada cliente nuevo vuelve a preguntar lo mismo.',
  },
  {
    title: 'Repites el mismo presupuesto todo el día',
    desc: 'Sin un cotizador, cada consulta se te va en escribir de nuevo lo que ya escribiste veinte veces.',
  },
  {
    title: 'No apareces en Google',
    desc: 'Quien busca tu servicio en tu comuna encuentra a la competencia, no a ti.',
  },
  {
    title: 'Lo que tienes no se ve en el celular',
    desc: 'Ahí llega la mayoría de tus clientes, y ahí es donde se van si el sitio no carga o no se entiende.',
  },
];

const RUBROS = [
  'Limpieza', 'Jardinería', 'Gasfitería', 'Electricidad', 'Fletes y mudanzas',
  'Control de plagas', 'Peluquería y barbería', 'Veterinaria', 'Talleres mecánicos',
  'Mantención de piscinas', 'Catering y banquetería', 'Fotografía',
  'Climatización', 'Pintura y remodelación', 'Cerrajería',
];

export default function WebParaPymesPage() {
  const waHref = buildWaLink(waMensaje());
  const faqs = FAQS_GENERALES;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Desarrollo de sitios web para pymes de servicios',
        serviceType: 'Diseño y desarrollo web',
        url: 'https://limpiabien.cl/web-para-pymes',
        areaServed: { '@type': 'Country', name: 'Chile' },
        provider: { '@id': 'https://limpiabien.cl/#business' },
        description:
          'Sitios web para pymes de servicios: página propia con dominio, cotizador en línea, contacto por WhatsApp y optimización para Google.',
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
        <section className={s.hero}>
          <div className={`band-inner ${s.heroInner}`}>
            <div className={s.heroText}>
              <span className={s.heroPill}>
                <span className={s.heroPillDot} aria-hidden="true" />
                Sitios web para pymes de servicios
              </span>
              <h1 className={s.heroTitle}>
                Tu pyme necesita un sitio que <em>traiga clientes</em>, no una tarjeta de presentación
              </h1>
              <p className={s.heroSub}>
                Somos el equipo que armó <strong>limpiabien.cl</strong>. Hacemos páginas para
                negocios de servicios: rápidas, hechas para el celular y con la conversación
                terminando donde de verdad cierras — tu WhatsApp.
              </p>
              <div className={s.heroActions}>
                <a
                  className="btn btn-cta btn-lg"
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WaIcon />
                  Conversemos por WhatsApp
                </a>
                <Link className="btn btn-outline btn-lg" href="/">
                  Ver este sitio como ejemplo
                </Link>
              </div>
              <ul className={s.heroStats}>
                <li>
                  <strong>0</strong>
                  <span>comisiones por cliente</span>
                </li>
                <li>
                  <strong>24/7</strong>
                  <span>tu negocio visible</span>
                </li>
                <li>
                  <strong>1 clic</strong>
                  <span>del sitio a tu WhatsApp</span>
                </li>
              </ul>
            </div>

            {/* Mockup: el sitio de LimpiaBien visto desde un celular */}
            <div className={s.heroMock} aria-hidden="true">
              <div className={s.phoneWrap}>
                <div className={s.phone}>
                  <div className={s.phoneNotch} />
                  <div className={s.phoneScreen}>
                    <Image
                      src="/servicios/tapices.jpg"
                      alt=""
                      width={320}
                      height={200}
                      className={s.phoneHeroImg}
                    />
                    <div className={s.phoneBody}>
                      <div className={`${s.phoneBar} ${s.w70}`} />
                      <div className={`${s.phoneBar} ${s.w45}`} />
                      <div className={s.phoneCards}>
                        <div className={s.phoneCard} />
                        <div className={s.phoneCard} />
                        <div className={s.phoneCard} />
                        <div className={s.phoneCard} />
                      </div>
                      <div className={s.phoneCta}>Cotizar por WhatsApp</div>
                    </div>
                  </div>
                </div>
                <div className={s.heroFloat}>
                  <span className={s.heroFloatDot} />
                  <div>
                    <strong>Nueva cotización</strong>
                    <span>llegó a tu WhatsApp</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DOLORES */}
        <section className={s.painSection}>
          <div className="band-inner">
            <div className="section-head">
              <span className="section-eyebrow">Si te pasa esto, sigue leyendo</span>
              <h2 className="section-title">
                El problema no es tu servicio: es que <em>no te encuentran</em>
              </h2>
            </div>
            <div className={s.painGrid}>
              {DOLORES.map((d) => (
                <div key={d.title} className={s.painCard}>
                  <span className={s.painMark} aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}>
                      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </span>
                  <div>
                    <h3 className={s.painTitle}>{d.title}</h3>
                    <p className={s.painDesc}>{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <IncluyeSection
          titulo={<>Todo lo que este sitio hace, <em>hecho para el tuyo</em></>}
        />

        {/* PRUEBA: ESTE MISMO SITIO */}
        <section className={s.proofSection}>
          <div className={`band-inner ${s.proofInner}`}>
            <div className={s.proofText}>
              <span className="section-eyebrow">La muestra</span>
              <h2 className={s.proofTitle}>
                No te vamos a mostrar un portafolio: <em>estás parado en el ejemplo</em>
              </h2>
              <p className={s.proofBody}>
                Este mismo sitio es un trabajo nuestro y es el que usa LimpiaBien todos los días
                para recibir pedidos. Recórrelo con calma: mira cómo se arma una cotización, cómo
                se ven las páginas de cada servicio y cómo termina todo en un mensaje de WhatsApp
                con el detalle listo.
              </p>
              <div className={s.proofActions}>
                <Link className="btn btn-dark" href="/cotizar">
                  Probar el cotizador
                </Link>
                <Link className="btn btn-ghost" href="/servicios/tapices">
                  Ver una página de servicio →
                </Link>
              </div>
            </div>
            <ul className={s.proofList}>
              <li>Catálogo con más de 40 servicios y sus precios</li>
              <li>Cotizador con carrito y resumen flotante</li>
              <li>Una landing por cada servicio, para Google</li>
              <li>Fotos de trabajos reales desde Instagram</li>
              <li>Testimonios y zona de cobertura</li>
            </ul>
          </div>
        </section>

        <PasosSection titulo={<>Cuatro pasos, <em>sin tecnicismos</em></>} />

        {/* RUBROS */}
        <section className={s.rubrosSection}>
          <div className="band-inner">
            <div className={s.rubrosHead}>
              <span className="section-eyebrow">Para quién</span>
              <h2 className={s.rubrosTitle}>
                Si vendes un <em>servicio</em>, esto te sirve
              </h2>
              <p className={s.rubrosSub}>
                Trabajamos con negocios que cotizan trabajo a medida y cierran por mensaje.
                Estos son algunos, pero la lista no es cerrada.
              </p>
            </div>
            <ul className={s.rubrosGrid}>
              {RUBROS.map((r) => (
                <li key={r} className={s.rubroChip}>{r}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* CIUDADES — una landing propia por ciudad, para búsquedas locales */}
        <section className={s.ciudadesSection} aria-labelledby="ciudades-title">
          <div className="band-inner">
            <div className={s.rubrosHead}>
              <span className="section-eyebrow">Dónde trabajamos</span>
              <h2 id="ciudades-title" className={s.rubrosTitle}>
                Remoto para <em>todo Chile</em>
              </h2>
              <p className={s.rubrosSub}>
                Todo se coordina por WhatsApp y videollamada, así que da lo mismo dónde estés.
                Estas son las ciudades donde ya conocemos el terreno — entra a la tuya y te
                contamos cómo se vende ahí.
              </p>
            </div>
            <ul className={s.ciudadesGrid}>
              {CIUDADES_WEB.map((c) => (
                <li key={c.slug}>
                  <Link href={`/web-para-pymes/${c.slug}`} className={s.ciudadCard}>
                    <span>
                      <span className={s.ciudadCardName}>{c.nombre}</span>
                      <span className={s.ciudadCardProv}>Provincia de {c.provincia}</span>
                    </span>
                    <svg className={s.ciudadCardArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
            <p className={s.ciudadesNota}>
              <strong>¿Tu ciudad no está en la lista?</strong> No es problema: trabajamos igual,
              y armamos el sitio para que aparezca en las búsquedas de tu comuna.
            </p>
          </div>
        </section>

        <FaqSection faqs={faqs} />

        {/* CTA FINAL */}
        <section className="cta-final" aria-labelledby="web-cta-title">
          <h2 id="web-cta-title" className="cta-final-title">
            Cuéntanos de tu pyme<br /><em>y te decimos qué se puede hacer</em>
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
            <Link className="btn btn-outline btn-lg" href="/">
              Recorrer este sitio
            </Link>
          </div>
          <div className="cta-final-trust">
            <span>Valor cerrado antes de empezar</span>
            <span>El dominio queda a tu nombre</span>
            <span>Conversar no cuesta</span>
          </div>
        </section>
      </main>

      <SiteFooter pymeCta={false} />
    </>
  );
}
