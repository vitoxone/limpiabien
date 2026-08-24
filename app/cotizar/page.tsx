'use client';

import Link from 'next/link';
import { CATEGORIES } from '@/data/catalog';
import { COMUNAS } from '@/data/comunas';
import Category from '@/components/Category';
import LeadForm from '@/components/LeadForm';
import CartSummary from '@/components/CartSummary';
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

/* Íconos y bajadas por categoría. La grilla se arma recorriendo CATEGORIES,
   así que agregar un servicio en data/catalog.ts lo suma acá solo; si el slug
   todavía no tiene ícono propio, cae en FALLBACK_ICON. */
const ICON_PROPS = {
  width: 26,
  height: 26,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const FALLBACK_ICON = (
  <svg {...ICON_PROPS}><path d="M12 3l2.4 5.5 6 .5-4.5 4 1.3 5.9L12 15.8 6.8 18.9l1.3-5.9-4.5-4 6-.5z" /></svg>
);

const CAT_ICONS: Record<string, JSX.Element> = {
  tapices: (<svg {...ICON_PROPS}><path d="M5 11V8a2 2 0 012-2h10a2 2 0 012 2v3" /><path d="M3 12a2 2 0 114 0v2h10v-2a2 2 0 114 0v6H3z" /></svg>),
  colchones: (<svg {...ICON_PROPS}><rect x="2" y="8" width="20" height="9" rx="2" /><path d="M7 8v9M12 8v9M17 8v9" /><path d="M4 17v2M20 17v2" /></svg>),
  vehiculos: (<svg {...ICON_PROPS}><path d="M5 13l1.4-4.2A2 2 0 018.3 7h7.4a2 2 0 011.9 1.4L19 13" /><path d="M3 13h18v4h-2.5M8.5 17H3v-4" /><path d="M8.5 17h7" /><circle cx="6.5" cy="17" r="1.5" /><circle cx="17.5" cy="17" r="1.5" /></svg>),
  alfombras: (<svg {...ICON_PROPS}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M6 9c2 0 2 1.6 4 1.6S12 9 14 9s2 1.6 4 1.6" /><path d="M6 14c2 0 2 1.6 4 1.6s2-1.6 4-1.6 2 1.6 4 1.6" /></svg>),
  'alfombras-muro': (<svg {...ICON_PROPS}><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M6.5 10h1.2M11.4 10h1.2M16.3 10h1.2" /><path d="M9 12.5h1.2M13.9 12.5h1.2M4.5 12.5h1.2M18.3 12.5h1.2" /><path d="M6.5 15h1.2M11.4 15h1.2M16.3 15h1.2" /></svg>),
  escaleras: (<svg {...ICON_PROPS}><path d="M3 21v-3.5h4.5V14H12v-3.5h4.5V7H21" /><path d="M3 21h18" /></svg>),
  'pisos-duros': (<svg {...ICON_PROPS}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18M15 3v18" /></svg>),
  sillas: (<svg {...ICON_PROPS}><rect x="7" y="3" width="10" height="8" rx="1.5" /><rect x="5" y="11" width="14" height="3.5" rx="1.5" /><path d="M7.5 14.5V21M16.5 14.5V21" /></svg>),
  respaldos: (<svg {...ICON_PROPS}><path d="M5 16V8a3 3 0 013-3h8a3 3 0 013 3v8" /><path d="M10 5.5V16M14 5.5V16" /><rect x="3" y="16" width="18" height="3.5" rx="1" /><path d="M5 19.5V21M19 19.5V21" /></svg>),
  'pedidos-especiales': (<svg {...ICON_PROPS}><path d="M21 14a2 2 0 01-2 2H8l-4 4V5a2 2 0 012-2h13a2 2 0 012 2z" /><path d="M8.5 9.5h7M8.5 12.5h4" /></svg>),
};

export default function CotizarPage() {
  const [cart, setCart] = useState<Cart>({});
  const [origin, setOrigin] = useState('web');
  const [fullName, setFullName] = useState('');
  const [commune, setCommune] = useState('');
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
    const nombre = fullName.trim();
    const zona = commune.trim();
    const quien = [
      nombre && `soy ${nombre}`,
      zona && `vivo en ${zona}`,
    ].filter(Boolean).join(', ');
    const saludo = quien
      ? `Hola, ${quien}! Quiero cotizar un servicio de limpieza. (${origin})`
      : `Hola! Quiero cotizar un servicio de limpieza. (${origin})`;
    const lines = items.map(i => `• ${i.section} — ${i.title} × ${i.qty}`);
    const extra = specialRequest.trim() ? `• Pedido especial: ${specialRequest.trim()}` : '';
    const body = [...lines, extra].filter(Boolean).join('\n');
    return body ? `${saludo}\n${body}` : saludo;
  }, [items, fullName, origin, specialRequest, commune]);

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

            <div className="cat-nav" aria-label="Categorías de servicios" role="group">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  className="cat-nav-item"
                  onClick={() => scrollTo(`cat-${cat.slug}`)}
                  aria-label={`Ver servicios de ${cat.name}`}
                >
                  <span className="cat-nav-icon">{CAT_ICONS[cat.slug] ?? FALLBACK_ICON}</span>
                  <span className="cat-nav-name">{cat.name}</span>
                </button>
              ))}
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

              <div className="catalog-cta" id="resumen-form">
                {totalItems > 0 ? (
                  <LeadForm
                    items={items}
                    waHref={waHref}
                    fullName={fullName}
                    onNameChange={setFullName}
                    commune={commune}
                    onCommuneChange={setCommune}
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

        <CartSummary
          items={items}
          setQty={setQty}
          onCheckout={() => scrollTo('resumen-form')}
        />
      </main>

      <footer className="site-footer" role="contentinfo">
        <span className="footer-brand">LimpiaBien</span>
        <span>{COMUNAS.join(' · ')}</span>
        <span>© {new Date().getFullYear()} LimpiaBien</span>
      </footer>
    </>
  );
}
