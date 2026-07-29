'use client';

import Link from 'next/link';
import { CATEGORIES } from '@/data/catalog';
import Category from '@/components/Category';
import LeadForm from '@/components/LeadForm';
import SiteHeader from '@/components/SiteHeader';
import { buildWaLink } from '@/lib/wa';
import { useCallback, useMemo, useState, useEffect } from 'react';

type Cart = Record<string, { section: string; title: string; qty: number }>;

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const WaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function CotizarPage() {
  const [cart, setCart] = useState<Cart>({});
  const [origin, setOrigin] = useState('web');
  const [fullName, setFullName] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');

  // Categoría destino indicada por el hash (#cat-<slug>) al venir desde el home.
  // Se lee de forma síncrona para que la categoría arranque abierta.
  const [targetSlug] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    const h = window.location.hash;
    return h.startsWith('#cat-') ? h.slice('#cat-'.length) : null;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    setOrigin(params.get('origin') || 'web');
  }, []);

  // Scroll a la categoría destino una vez montado el catálogo.
  useEffect(() => {
    if (!targetSlug) return;
    requestAnimationFrame(() => scrollTo(`cat-${targetSlug}`));
  }, [targetSlug]);

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

  return (
    <>
      <SiteHeader active="cotizar" />

      <main role="main">
        <div className="band-white">
          <div className="band-inner">
            <section className="hero-top" aria-labelledby="cot-title">
              <div className="hero-top-text">
                <div className="hero-label">Cotización en línea</div>
                <h1 id="cot-title" className="hero-title">
                  Arma tu cotización<br />en <em>30 segundos</em>
                </h1>
                <p className="hero-body">
                  Selecciona los servicios que necesitas, agrega tu nombre y enviamos la cotización
                  directo a WhatsApp para coordinar día y hora a domicilio.
                </p>
              </div>
            </section>

            <p className="mosaic-hint" aria-hidden="true">
              <span className="mosaic-hint-pulse" />
              Toca una categoría para ver los servicios
            </p>

            <div className="mosaic" aria-label="Categorías de servicios" role="group">
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

              <button className="mosaic-cell" onClick={() => scrollTo('cat-alfombras-muro')} aria-label="Ver servicios de Oficinas y Alfombras">
                <div className="mosaic-img" style={{ backgroundImage: "url('/servicios/IMG_5673.jpg')" }} />
                <div className="mosaic-overlay" />
                <span className="mosaic-cta" aria-hidden="true">Toca para ver →</span>
                <div className="mosaic-label">
                  <span className="mosaic-tag">Oficinas y Alfombras</span>
                  <span className="mosaic-sub">Muro a muro · Decorativas</span>
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
                    defaultOpen={cat.slug === targetSlug}
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
                    className="btn btn-cta btn-lg"
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
      </main>

      <footer className="site-footer" role="contentinfo">
        <span className="footer-brand">LimpiaBien</span>
        <span>Nancagua · Santa Cruz · San Fernando · Chimbarongo · Chépica</span>
        <span>© {new Date().getFullYear()} LimpiaBien</span>
      </footer>
    </>
  );
}
