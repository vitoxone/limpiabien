// app/web-para-pymes/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { buildWaLink } from '@/lib/wa';
import s from './styles.module.css';

export const metadata: Metadata = {
  title: 'Páginas web para pymes de servicios',
  description:
    'Hacemos sitios web para pymes de servicios: cotizador en línea, contacto directo por WhatsApp y presencia en Google. El mismo equipo que armó limpiabien.cl.',
  alternates: { canonical: '/web-para-pymes' },
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

const WA_MSG =
  'Hola, tengo una pyme y me interesa una página web como limpiabien.cl. Mi negocio es: ';

const WaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

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

const INCLUYE = [
  {
    title: 'Sitio propio con tu dominio',
    desc: 'tunegocio.cl a tu nombre. Tuyo, no alquilado a una plataforma que cobra comisión por cada cliente.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
      </svg>
    ),
  },
  {
    title: 'Cotizador en línea',
    desc: 'El cliente arma su pedido solo, elige cantidades y llega a ti con todo listo. Menos ida y vuelta.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path strokeLinecap="round" d="M8 7h8M8 11h3M8 15h3M15 11v5M13 13.5h4" />
      </svg>
    ),
  },
  {
    title: 'WhatsApp conectado',
    desc: 'Cada botón del sitio abre tu WhatsApp con el mensaje ya redactado. El canal donde realmente cierras.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
  },
  {
    title: 'Pensado para Google',
    desc: 'Una página por servicio, textos con las palabras que la gente busca de verdad y tu comuna por delante.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path strokeLinecap="round" d="M20 20l-3.5-3.5" />
      </svg>
    ),
  },
  {
    title: 'Primero el celular',
    desc: 'Se diseña partiendo del teléfono y después se adapta al computador, no al revés. Carga rápido con datos móviles.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
        <rect x="7" y="2" width="10" height="20" rx="2.5" />
        <path strokeLinecap="round" d="M11 18.5h2" />
      </svg>
    ),
  },
  {
    title: 'Precios que puedes cambiar',
    desc: 'Tu catálogo queda en un solo lugar ordenado. Subes un precio y se actualiza en todo el sitio, sin tocar el diseño.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.6 12.9l-7.9 7.9a3 3 0 01-4.2 0l-5.3-5.3a2 2 0 01-.6-1.4V4.8A1.8 1.8 0 014.4 3h9.3a2 2 0 011.4.6l5.5 5.5a2.4 2.4 0 010 3.4z" />
        <circle cx="7.8" cy="7.8" r="1.3" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

const PASOS = [
  {
    n: '01',
    title: 'Conversamos 15 minutos',
    desc: 'Por WhatsApp: qué vendes, a quién, y las tres preguntas que te hacen todos los días. Sin costo y sin compromiso.',
  },
  {
    n: '02',
    title: 'Armamos la estructura',
    desc: 'Definimos servicios, precios y textos. Si no tienes fotos buenas, te decimos exactamente cuáles sacar con el celular.',
  },
  {
    n: '03',
    title: 'Lo ves en línea y pides cambios',
    desc: 'Te pasamos un enlace con el sitio funcionando. Lo revisas con calma, nos dices qué ajustar y lo ajustamos.',
  },
  {
    n: '04',
    title: 'Publicamos',
    desc: 'Dominio, Google y WhatsApp conectados. Te explicamos cómo actualizar precios y qué mirar cada mes.',
  },
];

const RUBROS = [
  'Limpieza', 'Jardinería', 'Gasfitería', 'Electricidad', 'Fletes y mudanzas',
  'Control de plagas', 'Peluquería y barbería', 'Veterinaria', 'Talleres mecánicos',
  'Mantención de piscinas', 'Catering y banquetería', 'Fotografía',
  'Climatización', 'Pintura y remodelación', 'Cerrajería',
];

const FAQS = [
  {
    q: '¿Cuánto cuesta?',
    a: 'Depende de cuántos servicios tengas y de si necesitas cotizador. Conversamos por WhatsApp, revisamos tu caso y te damos un valor cerrado antes de empezar: nada de sorpresas a mitad de camino. La conversación no cuesta nada.',
  },
  {
    q: '¿Necesito saber de computación?',
    a: 'No. Nosotros nos encargamos de todo lo técnico. Lo único que necesitamos de ti es que nos cuentes bien tu negocio y nos pases fotos de tus trabajos.',
  },
  {
    q: '¿El dominio queda a mi nombre?',
    a: 'Sí. Te ayudamos a comprarlo, pero queda registrado a tu nombre y el sitio es tuyo. Si algún día quieres llevártelo a otro lado, puedes hacerlo.',
  },
  {
    q: '¿Cuánto se demora?',
    a: 'La parte lenta casi siempre son los textos y las fotos, no la programación. Una vez que tenemos ese material, la primera versión en línea sale en pocas semanas.',
  },
  {
    q: '¿Puedo pedir cambios después de publicado?',
    a: 'Sí. Los precios y los textos del catálogo están pensados para actualizarse fácil. Para cambios más grandes lo coordinamos aparte.',
  },
  {
    q: '¿Trabajan solo en la Región de O’Higgins?',
    a: 'La limpieza sí, pero los sitios web los hacemos de forma remota para cualquier parte de Chile. Todo se coordina por WhatsApp y videollamada.',
  },
];

export default function WebParaPymesPage() {
  const waHref = buildWaLink(WA_MSG);

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
        mainEntity: FAQS.map((f) => ({
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

        {/* QUÉ INCLUYE */}
        <section className="band-white services-section">
          <div className="band-inner">
            <div className="section-head">
              <span className="section-eyebrow">Qué incluye</span>
              <h2 className="section-title">
                Todo lo que este sitio hace, <em>hecho para el tuyo</em>
              </h2>
            </div>
            <div className={s.featGrid}>
              {INCLUYE.map((f) => (
                <div key={f.title} className={s.featCard}>
                  <div className={s.featIcon}>{f.icon}</div>
                  <h3 className={s.featTitle}>{f.title}</h3>
                  <p className={s.featDesc}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

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

        {/* CÓMO TRABAJAMOS */}
        <section className="band-white services-section">
          <div className="band-inner">
            <div className="section-head">
              <span className="section-eyebrow">Cómo trabajamos</span>
              <h2 className="section-title">
                Cuatro pasos, <em>sin tecnicismos</em>
              </h2>
            </div>
            <ol className={s.stepGrid}>
              {PASOS.map((p) => (
                <li key={p.n} className={s.stepCard}>
                  <span className={s.stepNum}>{p.n}</span>
                  <h3 className={s.stepTitle}>{p.title}</h3>
                  <p className={s.stepDesc}>{p.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

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

        {/* FAQ */}
        <section className="band-white band-faq">
          <div className="band-inner">
            <div className="section-head">
              <span className="section-eyebrow">Dudas</span>
              <h2 className="section-title">
                Preguntas <em>frecuentes</em>
              </h2>
            </div>
            <div className={s.faqWrap}>
              {FAQS.map((f) => (
                <details key={f.q} className="faq-item">
                  <summary>
                    {f.q}
                    <span className="faq-toggle" aria-hidden="true">+</span>
                  </summary>
                  <div className="faq-answer">{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

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
