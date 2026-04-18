'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CATEGORIES } from '@/data/catalog';
import Category from '@/components/Category';
import LeadForm from '@/components/LeadForm';
import { buildWaLink } from '@/lib/wa';
import { useCallback, useMemo, useState, useEffect } from 'react';

type Cart = Record<string, { section: string; title: string; qty: number }>;

/* ── Smooth scroll helper ──────────────────────────────── */
function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ── WhatsApp icon ─────────────────────────────────────── */
const WaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

/* ── Instagram icon ────────────────────────────────────── */
const IgIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

export default function Page() {
  const [cart, setCart] = useState<Cart>({});
  const [origin, setOrigin] = useState('web');
  const [fullName, setFullName] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    setOrigin(params.get('origin') || 'web');
  }, []);

  const getQty = useCallback((key: string) => cart[key]?.qty ?? 0, [cart]);
  const setQty = useCallback((key: string, qty: number) => {
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0) { delete next[key]; }
      else {
        const [section, title] = key.split(' — ');
        next[key] = { section, title, qty };
      }
      return next;
    });
  }, []);

  const items = useMemo(() => Object.values(cart).filter(i => i.qty > 0), [cart]);
  const totalItems = useMemo(() => items.reduce((a, b) => a + b.qty, 0), [items]);

  const message = useMemo(() => {
    const saludo = fullName.trim()
      ? `Hola, soy ${fullName.trim()}! Quiero cotizar un servicio de limpieza. (${origin})`
      : `Hola! Quiero cotizar un servicio de limpieza. (${origin})`;
    const lines = items.map(i => `• ${i.section} — ${i.title} × ${i.qty}`);
    const extra = specialRequest.trim() ? `• Pedido especial: ${specialRequest.trim()}` : '';
    const body = [...lines, extra].filter(Boolean).join('\n');
    return body ? `${saludo}\n${body}` : saludo;
  }, [items, fullName, origin, specialRequest]);

  const waHref = useMemo(() => buildWaLink(message), [message]);

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: '¿Cada cuánto tiempo conviene limpiar sillones y colchones?', acceptedAnswer: { '@type': 'Answer', text: 'Recomendamos una mantención cada 6 a 12 meses, o antes si hay manchas visibles, alérgenos o mascotas.' } },
      { '@type': 'Question', name: '¿Trabajan a domicilio en Nancagua, Santa Cruz y San Fernando?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. Atendemos en Nancagua, Santa Cruz, San Fernando, Chimbarongo, Chépica y alrededores.' } },
      { '@type': 'Question', name: '¿Qué método usan para la limpieza de tapices y alfombras?', acceptedAnswer: { '@type': 'Answer', text: 'Usamos equipos de inyección–extracción con productos hipoalergénicos y biodegradables.' } },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* ── HEADER ─────────────────────────────────── */}
      <header className="site-header" role="banner">
        <div className="header-inner">
          {/* Logo — fondo blanco + imagen nueva */}
          <div className="logo-wrap">
            <div className="logo-mark-white">
              <Image src="/logo.png" width={48} height={48} alt="LimpiaBien logo" priority />
            </div>
            <div>
              <div className="logo-name">LimpiaBien</div>
              <div className="logo-tagline">Limpieza profesional · Chile</div>
            </div>
          </div>

          <nav className="header-nav" aria-label="Navegación">
            {/* "Nuestros trabajos" → scroll suave a #ig-section */}
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => scrollTo('ig-section')}
            >
              Nuestros trabajos
            </button>
            {/* <Link
              className="btn btn-dark btn-sm"
              href={waHref}
              target="_blank"
              rel="noopener nofollow sponsored"
            >
              <WaIcon />
              Cotizar{totalItems > 0 ? ` (${totalItems})` : ''}
            </Link> */}
          </nav>
        </div>
      </header>

      <main role="main">

        {/* ── BANDA BLANCA: Hero + Mosaico ───────────── */}
        <div className="band-white">
          <div className="band-inner">

            <section className="hero-top" aria-labelledby="hero-title">
              <div className="hero-top-text">
                <div className="hero-label">Limpieza profesional a domicilio</div>
                <h1 id="hero-title" className="hero-title">
                  Limpieza de tapices<br />y colchones <em>a domicilio</em>
                </h1>
                <p className="hero-body">
                  Sillones, colchones, alfombras y vehículos — inyección–extracción profesional
                  con productos hipoalergénicos. Atendemos en Santa Cruz, San Fernando, Chimbarongo, Chépica, Nancagua, Palmilla y alrededores.
                </p>
                <div className="hero-actions">
                  {/* <Link className="btn btn-dark btn-lg" href={waHref} target="_blank" rel="noopener nofollow sponsored">
                    <WaIcon />
                    Consultar por WhatsApp
                  </Link> */}
                  <button className="btn btn-outline" onClick={() => scrollTo('catalogo')}>
                    Ver servicios
                  </button>
                </div>
              </div>
            </section>

            <p className="mosaic-hint" aria-hidden="true">
              <span className="mosaic-hint-pulse" />
              Toca una categoría para ver los servicios
            </p>

            <div className="mosaic" aria-label="Categorías de servicios — toca una para ver el detalle" role="group">

              <button className="mosaic-cell" onClick={() => scrollTo('cat-tapices')} aria-label="Ver servicios de Tapices">
                <div className="mosaic-img" style={{ backgroundImage: "url('/servicios/tapices.jpg')", backgroundPosition: 'center 30%' }} />
                <div className="mosaic-overlay" />
                <span className="mosaic-cta" aria-hidden="true">Toca para ver →</span>
                <div className="mosaic-label">
                  <span className="mosaic-tag">Tapices</span>
                  <span className="mosaic-sub">Sillones · Seccionales</span>
                </div>
              </button>

              <button className="mosaic-cell" onClick={() => scrollTo('cat-colchones')} aria-label="Ver servicios de Colchones">
                <div className="mosaic-img" style={{ backgroundImage: "url('/servicios/664ECA3A-C9B9-4F50-A0C9-89F168C420F2.jpg')" }} />
                <div className="mosaic-overlay" />
                <span className="mosaic-cta" aria-hidden="true">Toca para ver →</span>
                <div className="mosaic-label">
                  <span className="mosaic-tag">Colchones</span>
                  <span className="mosaic-sub">1 plaza · Queen · King</span>
                </div>
              </button>

              <button className="mosaic-cell" onClick={() => scrollTo('cat-vehiculos')} aria-label="Ver servicios de Vehículos">
                <div className="mosaic-img" style={{ backgroundImage: "url('/servicios/IMG_5942.jpg')" }} />
                <div className="mosaic-overlay" />
                <span className="mosaic-cta" aria-hidden="true">Toca para ver →</span>
                <div className="mosaic-label">
                  <span className="mosaic-tag">Vehículos</span>
                  <span className="mosaic-sub">Autos · SUV · Camionetas</span>
                </div>
              </button>

              <button className="mosaic-cell" onClick={() => scrollTo('cat-alfombras-muro')} aria-label="Ver servicios de Alfombras">
                <div className="mosaic-img" style={{ backgroundImage: "url('/servicios/IMG_5673.jpg')" }} />
                <div className="mosaic-overlay" />
                <span className="mosaic-cta" aria-hidden="true">Toca para ver →</span>
                <div className="mosaic-label">
                  <span className="mosaic-tag">Alfombras</span>
                  <span className="mosaic-sub">Decorativas · Muro a muro</span>
                </div>
              </button>

              <button className="mosaic-cell" onClick={() => scrollTo('cat-sillas')} aria-label="Ver servicios de Sillas">
                <div className="mosaic-img" style={{ backgroundImage: "url('/servicios/IMG_3507.jpg')" }} />
                <div className="mosaic-overlay" />
                <span className="mosaic-cta" aria-hidden="true">Toca para ver →</span>
                <div className="mosaic-label">
                  <span className="mosaic-tag">Sillas</span>
                  <span className="mosaic-sub">Tapizadas · Sitiales</span>
                </div>
              </button>

            </div>

          </div>
        </div>

        {/* ── BANDA CELESTE: Catálogo ─────────────────── */}
        <div className="band-sky" id="catalogo">
          <div className="band-inner band-catalog">

            <section aria-labelledby="cat-title">
              <div className="section-label" id="cat-title">Selecciona tus servicios</div>
              <div className="catalog">
                {CATEGORIES.map(cat => (
                  <Category
                    key={cat.slug}
                    category={cat}
                    showPrice={false}
                    publicOnly
                    getQty={getQty}
                    setQty={setQty}
                    specialRequest={specialRequest}
                    onSpecialRequestChange={setSpecialRequest}
                  />
                ))}
              </div>

              <div className="catalog-cta">
                {totalItems > 0 ? (
                  <LeadForm
                    items={items}
                    waHref={waHref}
                    fullName={fullName}
                    onNameChange={setFullName}
                    onClear={() => setCart({})}
                    specialRequest={specialRequest}
                  />
                ) : (
                  <Link
                    className="btn btn-dark btn-lg"
                    href={waHref}
                    target="_blank"
                    rel="noopener nofollow sponsored"
                  >
                    <WaIcon />
                    Consultar por WhatsApp
                  </Link>
                )}
              </div>
            </section>

          </div>
        </div>

        {/* ── INSTAGRAM (fondo oscuro propio) ────────── */}
        <div className="band-white">
          <div className="band-inner band-ig">
            <section id="ig-section" className="ig-section" aria-labelledby="ig-title">
              <div className="ig-inner">
                <div className="ig-text">
                  <div className="hero-label" style={{ marginBottom: 12 }}>Síguenos</div>
                  <h2 id="ig-title" className="ig-title">
                    Mira nuestros<br /><em>trabajos reales</em>
                  </h2>
                  <p className="ig-body">
                    Antes y después, resultados reales de clientes en la Región de O&apos;Higgins.
                    Todo en nuestro Instagram.
                  </p>
                  <a
                    className="btn btn-dark btn-lg ig-btn"
                    href="https://www.instagram.com/limpiabien.cl/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IgIcon />
                    @limpiabien.cl
                  </a>
                </div>
                <div className="ig-preview" aria-hidden="true">
                  <div className="ig-card ig-card-1">
                    <div className="ig-card-img" style={{ backgroundImage: "url('/servicios/tapices.jpg')" }} />
                  </div>
                  <div className="ig-card ig-card-2">
                    <div className="ig-card-img" style={{ backgroundImage: "url('/servicios/664ECA3A-C9B9-4F50-A0C9-89F168C420F2.jpg')" }} />
                  </div>
                  <div className="ig-card ig-card-3">
                    <div className="ig-card-img" style={{ backgroundImage: "url('/servicios/IMG_5942.jpg')" }} />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* ── BANDA CELESTE: FAQ ──────────────────────── */}
        <div className="band-sky">
          <div className="band-inner band-faq">
            <section className="faq" aria-labelledby="faq-title">
              <h2 className="faq-head" id="faq-title">Preguntas frecuentes</h2>
              {[
                { q: '¿Cada cuánto tiempo conviene limpiar sillones y colchones?', a: 'Recomendamos una mantención cada 6 a 12 meses, o antes si hay manchas visibles, alérgenos o mascotas en el hogar.' },
                { q: '¿Trabajan a domicilio en Nancagua, Santa Cruz y San Fernando?', a: 'Sí. También atendemos en Chimbarongo, Chépica y alrededores de la Región de O\'Higgins.' },
                { q: '¿Qué método usan para tapices y alfombras?', a: 'Usamos equipos de inyección–extracción con productos hipoalergénicos y biodegradables, más desmanchado focalizado donde sea necesario.' },
                { q: '¿Cómo funciona la cotización por WhatsApp?', a: 'Selecciona los servicios en este cotizador, ajusta las cantidades y presiona "Cotizar". Se abrirá WhatsApp con un mensaje ya preparado listo para enviar.' },
              ].map(({ q, a }) => (
                <details key={q} className="faq-item">
                  <summary>
                    {q}
                    <span className="faq-toggle" aria-hidden="true">+</span>
                  </summary>
                  <p className="faq-answer">{a}</p>
                </details>
              ))}
            </section>
          </div>
        </div>

      </main>

      <footer className="site-footer" role="contentinfo">
        <span className="footer-brand">LimpiaBien</span>
        <span>Nancagua · Santa Cruz · San Fernando · Chimbarongo · Chépica</span>
        <span>© {new Date().getFullYear()} LimpiaBien</span>
      </footer>
    </>
  );
}
