import Link from 'next/link';
import Image from 'next/image';
import SiteHeader from '@/components/SiteHeader';
import Testimonios from '@/components/Testimonios';
import InstagramSection from '@/components/InstagramSection';
import { COMUNAS } from '@/data/comunas';
import { CATEGORIES } from '@/data/catalog';
import { buildWaLink } from '@/lib/wa';

const WaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const PinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <circle cx="12" cy="11" r="2.5" />
  </svg>
);

// El orden de los servicios vive en data/catalog.ts: acá sólo se respeta,
// para que la home, el cotizador y las landings muestren siempre la misma secuencia.
const ORDEN_CATALOGO = CATEGORIES.map((c) => c.slug);
const posEnCatalogo = (slug: string) => {
  const i = ORDEN_CATALOGO.indexOf(slug);
  return i === -1 ? Number.MAX_SAFE_INTEGER : i;
};

const SERVICES = [
  {
    slug: 'tapices',
    name: 'Tapices y sillones',
    desc: 'Sillones, seccionales y butacas con inyección–extracción profesional.',
    img: '/servicios/tapices.jpg',
    badge: 'Más solicitado',
  },
  {
    slug: 'alfombras-muro',
    name: 'Pisos alfombrados y Oficinas',
    desc: 'Pisos alfombrados de alto tráfico en oficinas, empresas y locales comerciales. Cotización por m².',
    img: '/servicios/IMG_5673.jpg',
    badge: 'Empresas & B2B',
    badgeClass: 'badge-b2b',
  },
  {
    slug: 'colchones',
    name: 'Colchones',
    desc: '1 plaza, queen y king. Higienización completa con productos hipoalergénicos.',
    img: '/servicios/664ECA3A-C9B9-4F50-A0C9-89F168C420F2.jpg',
    badge: 'Pausado durante invierno',
    badgeClass: 'badge-pausado',
  },
  {
    slug: 'vehiculos',
    name: 'Vehículos y buses',
    desc: 'Interior de autos, SUV, camionetas, furgones y buses. Quitamos manchas y olores.',
    img: '/servicios/bus.jpg',
  },
  {
    slug: 'alfombras',
    name: 'Alfombras decorativas',
    desc: 'Lavado en profundidad de alfombras sueltas. Recuperamos el color y eliminamos ácaros.',
    img: '/servicios/decorativa.jpg',
  },
  {
    slug: 'pisos-duros',
    name: 'Pisos duros',
    desc: 'Porcelanato, cerámica, flotantes y vinílicos. Decapado, sellado, encerado y lustrado.',
    img: '/servicios/piso.jpg',
    badge: 'Empresas & B2B',
    badgeClass: 'badge-b2b',
  },
  {
    slug: 'sillas',
    name: 'Sillas tapizadas',
    desc: 'Sillas de comedor, oficinas, sitiales y banquetas tapizadas — limpieza unidad por unidad.',
    img: '/servicios/IMG_3507.jpg',
  },
].sort((a, b) => posEnCatalogo(a.slug) - posEnCatalogo(b.slug));

const WHY_US = [
  {
    title: 'Equipos profesionales',
    desc: 'Inyección–extracción Kärcher para una limpieza profunda real.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243z" />
      </svg>
    ),
  },
  {
    title: 'Productos seguros',
    desc: 'Hipoalergénicos y biodegradables, seguros para niños, mascotas y ambientes de trabajo.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Atención a domicilio y empresas',
    desc: "Llegamos donde estés. Cubrimos casas, departamentos y oficinas en toda la Región de O'Higgins.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    title: 'Cotización al instante',
    desc: 'Arma tu pedido en 30 segundos y recibe tu cotización por WhatsApp.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: '¿Cada cuánto tiempo conviene limpiar sillones y colchones?', acceptedAnswer: { '@type': 'Answer', text: 'Recomendamos una mantención cada 6 a 12 meses, o antes si hay manchas visibles, alérgenos o mascotas.' } },
      { '@type': 'Question', name: '¿Trabajan a domicilio en Nancagua, Santa Cruz y San Fernando?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. Atendemos en Nancagua, Santa Cruz, San Fernando, Chimbarongo, Chépica y alrededores.' } },
      { '@type': 'Question', name: '¿Realizan limpieza de pisos alfombrados en oficinas y empresas?', acceptedAnswer: { '@type': 'Answer', text: 'Sí, atendemos oficinas, locales comerciales y empresas. Realizamos cotizaciones por m² y trabajamos en horarios especiales.' } },
      { '@type': 'Question', name: '¿Qué método usan para la limpieza de tapices y alfombras?', acceptedAnswer: { '@type': 'Answer', text: 'Usamos equipos de inyección–extracción con productos hipoalergénicos y biodegradables.' } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <SiteHeader active="inicio" />

      <main role="main">
        {/* HERO LANDING */}
        <section className="hero-landing" aria-labelledby="hero-title">
          <div className="band-inner">
            <div className="hero-landing-grid">
              <div>
                <span className="hero-pill">
                  <span className="hero-pill-dot" aria-hidden="true" />
                  Limpieza profesional · Hogares y Oficinas en O&apos;Higgins
                </span>
                <h1 id="hero-title" className="hero-landing-title">
                  Tu espacio fresco<br />y <em>como nuevo</em>
                </h1>
                <p className="hero-landing-sub">
                  Pisos duros y alfombrados, sillones, colchones, tapices de vehículos y buses. Inyección–extracción, decapado y encerado, a domicilio y para empresas.
                </p>
                <div className="hero-landing-actions">
                  <Link className="btn btn-cta btn-lg" href="/cotizar">
                    <WaIcon />
                    Cotizar ahora
                  </Link>
                  <Link className="btn btn-outline btn-lg" href="#servicios">
                    Ver servicios
                  </Link>
                </div>
                <div className="hero-stats">
                  <div>
                    <div className="hero-stat-value">+150</div>
                    <div className="hero-stat-label">servicios realizados</div>
                  </div>
                  <div>
                    <div className="hero-stat-value">100%</div>
                    <div className="hero-stat-label">a domicilio y empresas</div>
                  </div>
                  <div>
                    <div className="hero-stat-value">8 comunas</div>
                    <div className="hero-stat-label">en O&apos;Higgins</div>
                  </div>
                </div>
              </div>

              <div className="hero-collage">
                <div className="hero-collage-img hero-collage-img-main rot-3">
                  <div className="hero-collage-slide">
                    <Image
                      src="/servicios/piso2.jpg"
                      alt="Lustrado de piso de porcelanato con rotativa"
                      fill
                      sizes="(max-width: 600px) 45vw, (max-width: 900px) 210px, 215px"
                      priority
                    />
                  </div>
                  <div className="hero-collage-slide">
                    <Image
                      src="/servicios/piso.jpg"
                      alt="Limpieza profunda de piso de porcelanato"
                      fill
                      sizes="(max-width: 600px) 45vw, (max-width: 900px) 210px, 215px"
                    />
                  </div>
                  <div className="hero-collage-slide">
                    <Image
                      src="/servicios/IMG_8836.jpg"
                      alt="Escalera alfombrada limpia"
                      fill
                      sizes="(max-width: 600px) 45vw, (max-width: 900px) 210px, 215px"
                    />
                  </div>
                </div>
                <div className="hero-collage-img hero-collage-img-top rot-3">
                  <div className="hero-collage-slide">
                    <Image
                      src="/servicios/IMG_9245.jpg"
                      alt="Limpieza de piso alfombrado en oficina"
                      fill
                      sizes="(max-width: 600px) 45vw, (max-width: 900px) 300px, 320px"
                      priority
                    />
                  </div>
                  <div className="hero-collage-slide">
                    <Image
                      src="/servicios/decorativa.jpg"
                      alt="Lavado de alfombra decorativa con rotativa"
                      fill
                      sizes="(max-width: 600px) 45vw, (max-width: 900px) 300px, 320px"
                    />
                  </div>
                  <div className="hero-collage-slide">
                    <Image
                      src="/servicios/IMG_5673.jpg"
                      alt="Piso alfombrado de oficina recién limpiado"
                      fill
                      sizes="(max-width: 600px) 45vw, (max-width: 900px) 300px, 320px"
                    />
                  </div>
                </div>
                <div className="hero-collage-img hero-collage-img-bl rot-3">
                  <div className="hero-collage-slide">
                    <Image
                      src="/servicios/tapices.jpg"
                      alt="Sillón tras la limpieza de tapiz"
                      fill
                      sizes="(max-width: 600px) 45vw, 160px"
                      priority
                    />
                  </div>
                  <div className="hero-collage-slide">
                    <Image
                      src="/servicios/IMG_54561.jpg"
                      alt="Sofá de tela limpio"
                      fill
                      sizes="(max-width: 600px) 45vw, 160px"
                    />
                  </div>
                  <div className="hero-collage-slide">
                    <Image
                      src="/servicios/IMG_3507.jpg"
                      alt="Silla tapizada tras la limpieza"
                      fill
                      sizes="(max-width: 600px) 45vw, 160px"
                    />
                  </div>
                </div>
                <div className="hero-collage-img hero-collage-img-br rot-4">
                  <div className="hero-collage-slide">
                    <Image
                      src="/servicios/bus2.jpg"
                      alt="Asiento de bus limpio"
                      fill
                      sizes="(max-width: 600px) 45vw, 160px"
                      priority
                    />
                  </div>
                  <div className="hero-collage-slide">
                    <Image
                      src="/servicios/bus.jpg"
                      alt="Interior de bus tras la limpieza de tapices"
                      fill
                      sizes="(max-width: 600px) 45vw, 160px"
                    />
                  </div>
                  <div className="hero-collage-slide">
                    <Image
                      src="/servicios/IMG_5942.jpg"
                      alt="Asientos de vehículo limpios"
                      fill
                      sizes="(max-width: 600px) 45vw, 160px"
                    />
                  </div>
                  <div className="hero-collage-slide">
                    <Image
                      src="/servicios/664ECA3A-C9B9-4F50-A0C9-89F168C420F2.jpg"
                      alt="Colchón higienizado"
                      fill
                      sizes="(max-width: 600px) 45vw, 160px"
                    />
                  </div>
                </div>
                <div className="glass-card hero-floating-card">
                  <div className="hero-floating-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="hero-floating-text">
                    <strong>Reserva en línea</strong>
                    <span>WhatsApp directo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COBERTURA — comunas atendidas */}
        <section className="cobertura-section" aria-labelledby="cobertura-title">
          <div className="band-inner">
            <div className="cobertura-head">
              <span className="section-eyebrow">Zona de cobertura</span>
              <h2 id="cobertura-title" className="cobertura-title">
                ¿Dónde <em>trabajamos</em>?
              </h2>
              <p className="cobertura-sub">
                Servicio a domicilio y empresas en 8 comunas de la Región de O&apos;Higgins.
              </p>
            </div>
            <ul className="cobertura-grid">
              {COMUNAS.map(comuna => (
                <li key={comuna} className="cobertura-card">
                  <span className="cobertura-card-icon">
                    <PinIcon />
                  </span>
                  <span className="cobertura-card-name">{comuna}</span>
                </li>
              ))}
            </ul>

            <div className="cobertura-extra">
              <p className="cobertura-extra-text">
                ¿Estás en <strong>Rancagua, Machalí, Curicó, Talca o Santiago</strong>? Háblanos y podemos
                llevar nuestro servicio hasta tu hogar, oficina o comercio.
              </p>
              <Link
                className="btn btn-cta"
                href={buildWaLink('Hola, estoy fuera de las comunas de cobertura. ¿Pueden llegar hasta mi ciudad?')}
                target="_blank"
                rel="noopener nofollow"
              >
                <WaIcon />
                Consultar por mi ciudad
              </Link>
            </div>
          </div>
        </section>

        {/* SERVICIOS */}
        <section className="services-section band-white" id="servicios">
          <div className="band-inner">
            <div className="section-head">
              <span className="section-eyebrow">Lo que hacemos</span>
              <h2 className="section-title">
                Servicios <em>profesionales</em> a domicilio y empresas
              </h2>
            </div>
            <div className="services-grid">
              {SERVICES.map(svc => (
                <article key={svc.slug} className="service-card">
                  <div className="service-card-img" style={{ backgroundImage: `url('${svc.img}')` }}>
                    {svc.badge && (
                      <span className={`service-card-badge ${svc.badgeClass || ''}`}>{svc.badge}</span>
                    )}
                  </div>
                  <div className="service-card-body">
                    <div className="service-card-title">{svc.name}</div>
                    <p className="service-card-desc">{svc.desc}</p>
                    <div className="service-card-actions">
                      <Link
                        href={`/servicios/${svc.slug}`}
                        className="service-card-link"
                        aria-label={`Ver detalle de ${svc.name}`}
                      >
                        Ver detalle →
                      </Link>
                      <Link
                        href={`/cotizar#cat-${svc.slug}`}
                        className="btn btn-cta btn-sm"
                        aria-label={`Cotizar ${svc.name}`}
                      >
                        Cotizar
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section className="whyus-section">
          <div className="band-inner">
            <div className="section-head">
              <span className="section-eyebrow">Por qué elegirnos</span>
              <h2 className="section-title">
                Resultados <em>visibles</em> desde la primera visita
              </h2>
            </div>
            <div className="whyus-grid">
              {WHY_US.map(item => (
                <div key={item.title} className="whyus-item">
                  <div className="whyus-icon">{item.icon}</div>
                  <div className="whyus-title">{item.title}</div>
                  <p className="whyus-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIOS */}
        <section className="band-white services-section">
          <div className="band-inner">
            <div className="section-head">
              <span className="section-eyebrow">Testimonios</span>
              <h2 className="section-title">
                Lo que dicen <em>nuestros clientes</em>
              </h2>
            </div>
            <Testimonios />
          </div>
        </section>

        {/* TRABAJOS REALES — Instagram */}
        <InstagramSection />

        {/* CTA FINAL */}
        <section className="cta-final" aria-labelledby="cta-title">
          <h2 id="cta-title" className="cta-final-title">
            ¿Listo para tu próxima<br /><em>limpieza profesional?</em>
          </h2>
          <p className="cta-final-sub">
            Arma tu cotización en menos de un minuto. Te respondemos por WhatsApp y coordinamos día y hora.
          </p>
          <div className="cta-final-actions">
            <Link className="btn btn-cta btn-lg" href="/cotizar">
              <WaIcon />
              Cotizar ahora
            </Link>
            <Link className="btn btn-outline btn-lg" href="/contacto">
              Contáctanos
            </Link>
          </div>
          <div className="cta-final-trust">
            <span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              Productos seguros
            </span>
            <span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              Sin cargo por visita
            </span>
            <span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Respuesta rápida
            </span>
          </div>
        </section>
      </main>

      <footer className="site-footer" role="contentinfo">
        <span className="footer-brand">LimpiaBien</span>
        <span>San Fernando · Santa Cruz · Chimbarongo · Chépica · Nancagua · Palmilla · Placilla · Peralillo</span>
        <span>© {new Date().getFullYear()} LimpiaBien</span>
      </footer>
    </>
  );
}
