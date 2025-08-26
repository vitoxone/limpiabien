// app/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { CATEGORIES } from '@/data/catalog';
import Category from '@/components/Category';
import { buildWaLink } from '@/lib/wa';

type Cart = Record<string, { section: string; title: string; qty: number }>;

export default function Page() {
  const [cart, setCart] = useState<Cart>({});

  const getQty = useCallback((key: string) => cart[key]?.qty ?? 0, [cart]);

  const setQty = useCallback((key: string, qty: number) => {
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0) {
        delete next[key];
      } else {
        const [section, title] = key.split(' — ');
        next[key] = { section, title, qty };
      }
      return next;
    });
  }, []);

  const items = useMemo(() => Object.values(cart).filter(i => i.qty > 0), [cart]);

  const message = useMemo(() => {
    if (items.length === 0) return 'Hola, quiero cotizar:';
    const lines = items.map(i => `• ${i.section} — ${i.title} × ${i.qty}`);
    return `Hola, quiero cotizar:\n${lines.join('\n')}`;
  }, [items]);

  const waHref = useMemo(() => buildWaLink(message), [message]);

  return (
    <>
      <header className="siteHeader">
        <div className="wrap headerWrap">
          <div className="logo" aria-label="LimpiaBien">
            <div className="logoMark">
              <Image src="/logo.png" width={44} height={44} alt="LimpiaBien" className="logoImg" />
            </div>
            <div className="brand">
              <strong className="brandName">LimpiaBien.cl</strong>
              {/* <span className="brandTag">.cl • Limpieza a domicilio</span> */}
            </div>
          </div>

          <Link className="btn ghost" href={waHref} target="_blank" rel="noopener">
            Pedir cotización
          </Link>
        </div>
      </header>

      <main className="pageBg">
        <div className="container">
          {/* HERO */}
          <section className="hero">
            <div className="heroInner">
              <div className="heroText">
                <span className="eyebrow">Higiene & Confort</span>
                <h1>Nuestros Servicios</h1>
                <p className="lead">
                  Limpieza profesional de tapices y superficies con equipos de inyección–extracción.
                  Eliminamos manchas, ácaros y olores, y atención a domicilio.
                </p>
                <ul className="benefits">
                  <li>Productos hipoalergénicos y biodegradables</li>
                  <li>Desmanchado focalizado</li>
                  <li>Servicio en Nancagua, Santa Cruz, San Fernando, Chimbarongo y Chépica</li>
                </ul>
                <div className="heroCtas">
                  <Link className="btn primary" href={waHref} target="_blank" rel="noopener">
                    Consultar por WhatsApp
                  </Link>
                  <a className="btn ghost" href="#catalogo">Ver catálogo</a>
                </div>
                <p className="helper">Selecciona lo que necesitas, ajusta la cantidad y envíanos tu pedido.</p>
              </div>
              <div className="heroBadge">
                <div className="badgeCard">
                  <span className="badgeTitle">Atención Personalizada</span>
                  <span className="badgeNote">Nos ajustamos a sus horarios</span>
                </div>
                <div className="badgeCard">
                  <span className="badgeTitle">Eco-friendly</span>
                  <span className="badgeNote">Hipoalergénico</span>
                </div>
              </div>
            </div>
          </section>

          {/* CATEGORÍAS */}
          <section id="catalogo" className="catalog">
            {CATEGORIES.map(cat => (
              <article key={cat.slug} className="categoryCard">
                <header className="categoryHeader">
                  <div className="categoryTitleSide">
                    <h2 className="categoryTitle">{cat.name}</h2>
                    {'description' in cat && (cat as any).description ? (
                      <p className="categoryDesc">{(cat as any).description}</p>
                    ) : null}
                  </div>
                  <div className="chips">
                    {'domicilio' in cat && (cat as any).domicilio === false ? (
                      <span className="chip alt">Retiro</span>
                    ) : (
                      <span className="chip alt">Domicilio</span>
                    )}
                  </div>
                </header>

                <div className="categoryBody">
                  <Category
                    key={cat.slug}
                    category={cat}
                    showPrice={false}
                    getQty={getQty}
                    setQty={setQty}
                  />
                </div>
              </article>
            ))}
          </section>

          {/* CTA */}
          <div className="ctaBar">
            <Link className="btn ghost" href={waHref} target="_blank" rel="noopener">
              Consultar por WhatsApp
            </Link>
            <button className="btn secondary" onClick={() => setCart({})}>
              Limpiar selección
            </button>
          </div>
        </div>
      </main>

      <footer className="siteFooter">
        © {new Date().getFullYear()} LimpiaBien • Nancagua, Santa Cruz, San Fernando, Chimbarongo, Chépica y alrededores
      </footer>

      {/* GLOBAL: mueve :root y estilos verdaderamente globales aquí */}
      <style jsx global>{`
        :root {
          --ink: #0f172a;
          --muted: #6b7280;
          --line: #e6eef5;

          --brand: #0ea5e9;
          --brand-2: #06b6d4;
          --brand-3: #22d3ee;

          --bg-hero-a: #e0f7ff;
          --bg-hero-b: #f8fdff;

          --radius-lg: 16px;
          --radius-md: 12px;
          --shadow-sm: 0 6px 16px rgba(2, 132, 199, 0.10);
          --shadow-lg: 0 18px 50px rgba(14, 165, 233, 0.18);
        }
      `}</style>

      {/* SCOPED */}
      <style jsx>{`
        .wrap { max-width: 1100px; margin: 0 auto; padding: 12px 16px; }
        .headerWrap { display: flex; align-items: center; justify-content: space-between; }

        .siteHeader {
          position: sticky; top: 0; z-index: 40;
          background: rgba(255,255,255,.75);
          backdrop-filter: saturate(140%) blur(10px);
          border-bottom: 1px solid var(--line);
        }

        .logo { display: flex; align-items: center; gap: 12px; }
        .logoMark {
          width: 48px; height: 48px; border-radius: 14px;
          background: radial-gradient(120% 120% at 0% 0%, var(--brand-3) 0%, #fff 60%);
          display: grid; place-items: center; box-shadow: var(--shadow-sm);
        }
        .logoImg { border-radius: 10px; }
        .brand { display: flex; flex-direction: column; line-height: 1.1; }
        .brandName { font-size: 18px; color: var(--ink); letter-spacing: .2px; }
        .brandTag { color: var(--muted); font-size: 13px; }

        .pageBg {
          background:
            radial-gradient(1000px 600px at 10% -10%, rgba(34, 211, 238, .10), transparent 60%),
            radial-gradient(900px 500px at 110% 0%, rgba(14, 165, 233, .10), transparent 60%);
        }

        .container { max-width: 1100px; margin: 0 auto; padding: 20px 16px 60px; }

        .hero {
          border-radius: var(--radius-lg);
          padding: 0; margin: 14px 0 28px;
          background: linear-gradient(140deg, var(--bg-hero-a) 0%, var(--bg-hero-b) 60%);
          border: 1px solid var(--line);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }
        .heroInner {
          display: grid; grid-template-columns: 1.2fr .8fr; gap: 12px;
          align-items: stretch;
        }
        .heroText { padding: 28px 24px; }
        .eyebrow {
          display: inline-block; font-size: 12px; letter-spacing: .14em; text-transform: uppercase;
          color: #0284c7; background: rgba(14,165,233,.08); border: 1px solid rgba(14,165,233,.2);
          padding: 6px 10px; border-radius: 999px; margin-bottom: 8px;
        }
        .hero h1 { margin: 6px 0 10px; font-size: 36px; letter-spacing: -0.02em; color: var(--ink); }
        .lead { margin: 0 0 12px; color: #1f2937; }
        .benefits { margin: 0 0 14px; padding-left: 18px; color: #0f172a; }
        .benefits li { margin: 4px 0; }
        .heroCtas { display: flex; gap: 10px; flex-wrap: wrap; margin: 8px 0 6px; }
        .helper { margin: 8px 0 0; color: #5b6b7a; font-size: 14px; }

        .heroBadge {
          background:
            radial-gradient(600px 300px at 70% 0%, rgba(34,211,238,.22), transparent 60%),
            linear-gradient(180deg, rgba(255,255,255,.65) 0%, rgba(255,255,255,.35) 100%);
          border-left: 1px solid var(--line);
          display: grid; align-content: center; gap: 12px; padding: 24px;
        }
        .badgeCard {
          background: rgba(255,255,255,.65);
          border: 1px solid rgba(14,165,233,.22);
          border-radius: 14px; padding: 14px 16px;
          box-shadow: var(--shadow-sm);
        }
        .badgeTitle { font-weight: 700; color: #0369a1; }
        .badgeNote { display: block; color: #0f172a; opacity: .7; font-size: 13px; }

        .catalog { display: grid; gap: 18px; }
        .categoryCard {
          background: rgba(255,255,255,.82);
          backdrop-filter: blur(6px);
          border: 1px solid var(--line);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          transition: transform .15s ease, box-shadow .2s ease, border-color .2s ease;
        }
        .categoryCard:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 26px rgba(2,132,199,.10);
          border-color: rgba(14,165,233,.35);
        }

        .categoryHeader {
          display: flex; align-items: start; justify-content: space-between;
          gap: 10px; padding: 16px 16px 8px 16px;
          border-bottom: 1px dashed var(--line);
        }
        .categoryTitle { margin: 0; font-size: 22px; letter-spacing: -.01em; color: var(--ink); }
        .categoryDesc { margin: 6px 0 0; color: #5b6b7a; font-size: 14px; max-width: 60ch; }
        .chips { display: flex; gap: 8px; flex-wrap: wrap; }
        .chip {
          color: #065f46;
          background: linear-gradient(180deg, rgba(16,185,129,.16), rgba(5,150,105,.12));
          border: 1px solid rgba(5,150,105,.35);
          border-radius: 999px; padding: 6px 10px; font-size: 12px; font-weight: 600;
        }
        .chip.alt { /* mismo estilo, por si luego agregas otra variante */ }

        .categoryBody { padding: 10px 12px 14px; }

        .ctaBar {
          display: flex; gap: 12px; flex-wrap: wrap;
          margin: 20px 0 0;
        }

        .btn {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 8px; padding: 10px 14px;
          border-radius: 12px; font-weight: 700;
          text-decoration: none; cursor: pointer; border: 1px solid transparent;
          transition: transform .1s ease, box-shadow .2s ease, background .2s ease, border-color .2s ease;
        }
        .btn:active { transform: translateY(1px) scale(.99); }

        .btn.primary {
          color: white;
          background: linear-gradient(135deg, var(--brand) 0%, var(--brand-2) 45%, var(--brand-3) 100%);
          box-shadow: 0 10px 26px rgba(14,165,233,.25);
        }
        .btn.primary:hover { box-shadow: 0 14px 34px rgba(14,165,233,.3); }

        .btn.secondary {
          color: #0f172a;
          background: #f0f9ff;
          border-color: rgba(14,165,233,.35);
        }
        .btn.secondary:hover { background: #e6f6ff; }

        .btn.ghost {
          color: #0369a1;
          background: rgba(230,246,255,.85);
          border: 1px solid rgba(14,165,233,.35);
        }
        .btn.ghost:hover { background: #e6f6ff; }

        .siteFooter {
          margin: 36px auto 22px;
          text-align: center;
          color: #8aa0b4;
          font-size: 13px;
        }

        @media (max-width: 900px) {
          .heroInner { grid-template-columns: 1fr; }
          .heroBadge { border-left: none; border-top: 1px solid var(--line); }
        }
        @media (max-width: 640px) {
          .ctaBar {
            position: sticky; bottom: 0; left: 0; right: 0;
            background: rgba(255,255,255,.9);
            backdrop-filter: blur(8px);
            padding: 10px 12px;
            border-top: 1px solid var(--line);
            margin: 24px -16px -16px;
          }
        }
      `}</style>
    </>
  );
}