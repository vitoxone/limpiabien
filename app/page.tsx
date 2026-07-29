import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import Testimonios from '@/components/Testimonios';
import InstagramSection from '@/components/InstagramSection';

const WaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

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
    desc: 'Alfombras muro a muro de alto tráfico en oficinas, empresas y locales comerciales. Cotización por m².',
    img: '/servicios/IMG_5673.jpg',
    badge: 'Empresas & B2B',
    badgeClass: 'badge-b2b',
  },
  {
    slug: 'colchones',
    name: 'Colchones',
    desc: '1 plaza, queen y king. Higienización completa con productos hipoalergénicos.',
    img: '/servicios/664ECA3A-C9B9-4F50-A0C9-89F168C420F2.jpg',
  },
  {
    slug: 'vehiculos',
    name: 'Vehículos',
    desc: 'Limpieza interior de autos, camionetas y SUVs. Quitamos manchas y olores.',
    img: '/servicios/IMG_5942.jpg',
  },
  {
    slug: 'alfombras',
    name: 'Alfombras decorativas',
    desc: 'Lavado en profundidad de alfombras sueltas. Recuperamos el color y eliminamos ácaros.',
    img: '/servicios/IMG_5673.jpg',
  },
  {
    slug: 'sillas',
    name: 'Sillas tapizadas',
    desc: 'Sillas de comedor, oficinas, sitiales y banquetas tapizadas — limpieza unidad por unidad.',
    img: '/servicios/IMG_3507.jpg',
  },
];

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
    desc: 'Arma tu pedido en 30 segundos y recibe tu cotización por WhatsApp con opción de factura.',
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
      { '@type': 'Question', name: '¿Realizan limpieza de pisos alfombrados en oficinas y empresas?', acceptedAnswer: { '@type': 'Answer', text: 'Sí, atendemos oficinas, locales comerciales y empresas. Realizamos cotizaciones por m², trabajamos en horarios especiales y emitimos factura.' } },
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
                  Limpieza profesional de sillones, colchones, tapices de vehículos, alfombras muro a muro y pisos alfombrados de oficinas. Inyección–extracción a domicilio y empresas.
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
                    <div className="hero-stat-value">6 comunas</div>
                    <div className="hero-stat-label">en O&apos;Higgins</div>
                  </div>
                </div>
              </div>

              <div className="hero-collage" aria-hidden="true">
                <div>
                  <div className="hero-collage-img hero-collage-img-tall" style={{ backgroundImage: "url('/servicios/tapices.jpg')" }} />
                </div>
                <div className="hero-collage-col-2">
                  <div className="hero-collage-img hero-collage-img-square" style={{ backgroundImage: "url('/servicios/664ECA3A-C9B9-4F50-A0C9-89F168C420F2.jpg')" }} />
                </div>
                <div className="glass-card hero-floating-card">
                  <div className="hero-floating-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="hero-floating-text">
                    <strong>Reserva en línea</strong>
                    <span>WhatsApp directo · Factura</span>
                  </div>
                </div>
              </div>
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
                <Link key={svc.slug} href={`/cotizar#cat-${svc.slug}`} className="service-card">
                  <div className="service-card-img" style={{ backgroundImage: `url('${svc.img}')` }}>
                    {svc.badge && (
                      <span className={`service-card-badge ${svc.badgeClass || ''}`}>{svc.badge}</span>
                    )}
                  </div>
                  <div className="service-card-body">
                    <div className="service-card-title">{svc.name}</div>
                    <p className="service-card-desc">{svc.desc}</p>
                    <span className="service-card-link">Ver detalle →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SOLUCIONES PARA EMPRESAS Y OFICINAS */}
        <section className="b2b-section" aria-labelledby="b2b-title">
          <div className="band-inner">
            <div className="b2b-head">
              <span className="b2b-eyebrow">Soluciones Corporativas</span>
              <h2 id="b2b-title" className="b2b-title">
                Pisos alfombrados para <em>oficinas y empresas</em>
              </h2>
              <p className="b2b-sub">
                Mantén tus instalaciones impecables, libres de ácaros y con presentación profesional sin interrumpir la jornada de tu equipo.
              </p>
            </div>
            <div className="b2b-grid">
              <div className="b2b-card">
                <div className="b2b-card-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="b2b-card-title">Horarios Flexibles</h3>
                <p className="b2b-card-desc">
                  Coordinamos el servicio fuera del horario laboral o en fines de semana para no interferir con las operaciones de tu empresa.
                </p>
              </div>
              <div className="b2b-card">
                <div className="b2b-card-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="b2b-card-title">Cotización por m²</h3>
                <p className="b2b-card-desc">
                  Precios competitivos según la superficie total de alfombra muro a muro o sillas de oficina a limpiar.
                </p>
              </div>
              <div className="b2b-card">
                <div className="b2b-card-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.6 15.11a2 2 0 01-1.022-.547l-1.074-1.074a2 2 0 010-2.828l1.074-1.074a2 2 0 011.022-.547l2.387-.477a6 6 0 013.86.517l.318.158a6 6 0 003.86.517l2.387-.477a2 2 0 011.022.547l1.074 1.074a2 2 0 010 2.828l-1.074 1.074z" />
                  </svg>
                </div>
                <h3 className="b2b-card-title">Extracción Profunda Kärcher</h3>
                <p className="b2b-card-desc">
                  Equipos industriales que remueven suciedad incrustada y manchado en alfombras de alto tráfico con secado rápido.
                </p>
              </div>
            </div>
            <div className="b2b-actions">
              <Link className="btn btn-cta btn-lg" href="/cotizar#cat-alfombras-muro">
                <WaIcon />
                Cotizar Oficina / Muro a Muro
              </Link>
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
        <span>Nancagua · Santa Cruz · San Fernando · Chimbarongo · Chépica</span>
        <span>© {new Date().getFullYear()} LimpiaBien</span>
      </footer>
    </>
  );
}
