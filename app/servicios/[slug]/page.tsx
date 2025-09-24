// app/servicios/[slug]/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildWaLink } from '@/lib/wa';
import s from './styles.module.css';

const SLUGS = {
  tapices: {
    title: 'Limpieza de Tapices y Sillones | LimpiaBien',
    h1: 'Limpieza de tapices y sillones',
    cover: '/images/servicios/tapices.jpg',
    seoDesc:
      'Limpieza profesional de tapices y sillones con sistema de inyección–succión Kärcher. Eliminamos manchas, ácaros y olores con productos hipoalergénicos.',
    importance: [
      'Elimina alérgenos (ácaros, polvo) y olores persistentes.',
      'Recupera colores y textura, prolongando la vida útil del mueble.',
      'Higienización segura con productos hipoalergénicos y biodegradables.',
    ],
    procedure: [
      'Inspección y test de color en zona oculta.',
      'Aspirado profundo para retirar polvo y partículas.',
      'Pre-tratamiento de manchas con desmanchador específico.',
      'Limpieza con equipo de inyección–succión Kärcher (aplicación y extracción en el acto).',
      'Acondicionado final: peinado de telas / ventilación.',
    ],
    drying: {
      note: 'El tiempo de secado depende de ventilación, humedad ambiental y tipo de tela.',
      times: ['Telas estándar: 4–8 horas', 'Telas gruesas: 8–12 horas'],
      tips: ['Ventilar ambiente', 'Usar ventilador', 'Evitar uso hasta secado al tacto'],
    },
    products: [
      'Detergente para tapicería pH neutro (hipoalergénico, biodegradable).',
      'Desmanchadores focalizados (vino, café, grasa).',
      'Neutralizador de olores (encapsulante).',
    ],
    machines: [
      'Kärcher Puzzi (inyección–succión).',
      'Accesorios de mano para rincones y costuras.',
    ],
    faqs: [
      { q: '¿Sale cualquier mancha?', a: 'Las orgánicas y recientes responden muy bien; las antiguas pueden atenuarse sin garantía 100%.' },
      { q: '¿Queda mal olor?', a: 'No. Productos neutros y extracción potente aceleran el secado.' },
    ],
    presetMsg: 'Hola, quiero cotizar limpieza de tapices/sillones.',
  },
  colchones: {
    title: 'Limpieza de Colchones a Domicilio | LimpiaBien',
    h1: 'Limpieza de colchones',
    cover: '/images/servicios/colchones.jpg',
    seoDesc:
      'Higienización profunda de colchones con inyección–succión Kärcher. Eliminamos ácaros, olores y manchas frecuentes.',
    importance: [
      'Reduce alérgenos y mejora la higiene del descanso.',
      'Control de olores/manchas por sudor o líquidos.',
      'Mantención recomendada cada 6–12 meses.',
    ],
    procedure: [
      'Inspección y test de color.',
      'Aspirado profundo por ambas caras.',
      'Tratamiento focalizado de manchas.',
      'Limpieza con inyección–succión controlando caudal.',
      'Ventilación y recomendaciones de uso.',
    ],
    drying: {
      note: 'El colchón absorbe más humedad; cuidamos caudal y pasadas.',
      times: ['Cara tratada: 8–12 horas', 'Ambiente húmedo: hasta 24 horas'],
      tips: ['Ventilar bien', 'Apoyar de pie por momentos', 'No cubrir hasta secado'],
    },
    products: [
      'Detergente suave hipoalergénico apto descanso.',
      'Tratamiento enzimático para manchas biológicas.',
      'Neutralizador de olores sin perfumes intensos.',
    ],
    machines: ['Kärcher Puzzi con control de caudal.', 'Boquilla para superficies planas.'],
    faqs: [
      { q: '¿Es seguro para alérgicos?', a: 'Sí, fórmulas hipoalergénicas y enjuague con extracción.' },
      { q: '¿Se puede dormir la misma noche?', a: 'Solo si está seco al tacto; de lo contrario, usar otra cama.' },
    ],
    presetMsg: 'Hola, quiero cotizar limpieza de colchón(es).',
  },
  alfombras: {
    title: 'Lavado de Alfombras | LimpiaBien',
    h1: 'Lavado de alfombras',
    cover: '/images/servicios/alfombras.jpg',
    seoDesc:
      'Lavado profesional de alfombras con inyección–succión Kärcher. Recupera colores, elimina polvo y olores.',
    importance: [
      'Elimina polvo acumulado y alérgenos.',
      'Realza colores y prolonga la vida de la fibra.',
      'Ideal con mascotas o niños.',
    ],
    procedure: [
      'Inspección, identificación de fibra y test de color.',
      'Aspirado profundo a contra y favor del pelo.',
      'Pre-tratamiento de manchas.',
      'Lavado con inyección–succión ajustando caudal.',
      'Alineado del pelo y recomendaciones de secado.',
    ],
    drying: {
      note: 'Según espesor/fibra; adaptamos el proceso.',
      times: ['Alfombra delgada: 6–10 horas', 'Alfombra gruesa: 12–24 horas'],
      tips: ['Ventilar', 'Evitar pisar mientras seca', 'Usar ventilador'],
    },
    products: [
      'Detergente pH controlado para alfombras.',
      'Desmanchadores compatibles (lana/sintético).',
      'Neutralizador de olores apto mascotas.',
    ],
    machines: [
      'Kärcher Puzzi con boquilla para suelos.',
      'Cepillos suaves para levantar el pelo (si procede).',
    ],
    faqs: [
      { q: '¿Se encoge?', a: 'Evitamos saturación y testeamos; en fibras naturales sensibles ajustamos método.' },
      { q: '¿Retiro/entrega?', a: 'En algunas zonas ofrecemos retiro/entrega. Consúltanos.' },
    ],
    presetMsg: 'Hola, quiero cotizar lavado de alfombras.',
  },
} as const;

type SlugKey = keyof typeof SLUGS;
type PageProps = { params: { slug: SlugKey } };

export function generateStaticParams() {
  return Object.keys(SLUGS).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const cfg = SLUGS[params.slug];
  if (!cfg) return {};
  return {
    title: cfg.title,
    description: cfg.seoDesc,
    alternates: { canonical: `/servicios/${params.slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title: cfg.title,
      description: cfg.seoDesc,
      images: cfg.cover ? [{ url: cfg.cover, width: 1200, height: 630 }] : undefined,
      url: `/servicios/${params.slug}`,
      type: 'article',
    },
  };
}

export default function ServicioPage({ params }: PageProps) {
  const cfg = SLUGS[params.slug];
  if (!cfg) return notFound();

  const waMsg = `LimpiaBien — ${cfg.h1}\n${cfg.presetMsg}`;
  const waHref = buildWaLink(waMsg);

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: cfg.h1,
    provider: { '@type': 'Organization', name: 'LimpiaBien', url: 'https://limpiabien.cl', logo: 'https://limpiabien.cl/logo-512.png' },
    areaServed: ['Nancagua', 'Santa Cruz', 'San Fernando', 'Chimbarongo', 'Chépica'],
    description: cfg.seoDesc,
  };

  return (
    <main className={s.svc}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />

      <section className={s.hero}>
        <div className={s.wrap}>
          <div className={s.heroGrid}>
            <div className={s.heroText}>
              <span className={s.eyebrow}>Servicio profesional</span>
              <h1>{cfg.h1}</h1>
              <p className={s.lead}>{cfg.seoDesc}</p>
              <div className={s.heroCtas}>
                <Link className={s.btnPrimary} href={waHref} target="_blank" rel="noopener nofollow">
                  Cotizar por WhatsApp
                </Link>
                <Link className={s.btnGhost} href="/servicios">Ver todos los servicios</Link>
              </div>
            </div>
            {cfg.cover && (
              <div className={s.heroImg}>
                <Image src={cfg.cover} width={960} height={640} alt={cfg.h1} priority />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.wrap}>
          <h2>¿Por qué es importante la limpieza?</h2>
          <ul className={s.bullets}>{cfg.importance.map((b, i) => <li key={i}>{b}</li>)}</ul>
        </div>
      </section>

      <section className={`${s.section} ${s.alt}`}>
        <div className={s.wrap}>
          <h2>Procedimiento que realizamos</h2>
          <ol className={s.steps}>
            {cfg.procedure.map((p, i) => (
              <li key={i}>
                <span className={s.stepNum}>{i + 1}</span>
                <div className={s.stepBody}>{p}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.wrap}>
          <h2>Tiempos de secado</h2>
          <p className={s.muted}>{cfg.drying.note}</p>
          <ul className={s.cards}>{cfg.drying.times.map((t, i) => <li key={i} className={s.card}>{t}</li>)}</ul>
          <p className={`${s.muted} ${s.small}`}>Consejos: {cfg.drying.tips.join(' • ')}</p>
        </div>
      </section>

      <section className={`${s.section} ${s.alt}`}>
        <div className={`${s.wrap} ${s.grid2}`}>
          <div>
            <h2>Productos que utilizamos</h2>
            <ul className={s.bullets}>{cfg.products.map((p, i) => <li key={i}>{p}</li>)}</ul>
          </div>
          <div>
            <h2>Maquinaria Kärcher</h2>
            <ul className={s.bullets}>{cfg.machines.map((m, i) => <li key={i}>{m}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.wrap}>
          <h2>Preguntas frecuentes</h2>
          <div className={s.faq}>
            {cfg.faqs.map((f, i) => (
              <details key={i}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={s.cta}>
        <div className={`${s.wrap} ${s.ctaInner}`}>
          <div>
            <h3>¿Listo para agendar?</h3>
            <p>Escríbenos por WhatsApp y te ayudamos a elegir la mejor opción para tu hogar.</p>
          </div>
          <Link className={s.btnPrimary} href={waHref} target="_blank" rel="noopener nofollow">
            Cotizar por WhatsApp
          </Link>
        </div>
      </section>
    </main>
  );
}