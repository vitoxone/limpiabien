'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { CATEGORIES } from '@/data/catalog';
import Category from '@/components/Category';
import { currency } from '@/lib/format';

type Item = { section: string; title: string; price: number; qty: number; subtotal: number };
type Cart = Record<string, Item>;

const DISCOUNTS = [0, 0.1, 0.2, 0.3, 0.4, 0.5];
const VISIT_FEE = 2000;

export default function CalculatorPage() {
  const [cart, setCart] = useState<Cart>({});
  const [discount, setDiscount] = useState(0);
  const [includeVisit, setIncludeVisit] = useState(false);

  const getQty = useCallback((key: string) => cart[key]?.qty ?? 0, [cart]);
  const setQty = useCallback((key: string, qty: number) => {
    setCart((prev) => {
      const next = { ...prev };
      const [section, title] = key.split(' — ');
      let price = 0;
      outer: for (const cat of CATEGORIES) {
        if (cat.name === section) for (const it of cat.items) {
          if (it.title === title) { price = it.price; break outer; }
        }
      }
      if (qty <= 0) delete next[key];
      else next[key] = { section, title, price, qty, subtotal: qty * price };
      return next;
    });
  }, []);

  const items    = useMemo(() => Object.values(cart).filter(i => i.qty > 0), [cart]);
  const total    = useMemo(() => items.reduce((a, b) => a + b.subtotal, 0), [items]);
  const discAmt  = useMemo(() => Math.round(total * discount), [total, discount]);
  const afterDisc= useMemo(() => Math.max(0, total - discAmt), [total, discAmt]);
  const visitAmt = includeVisit ? VISIT_FEE : 0;
  const grand    = afterDisc + visitAmt;
  const pct      = Math.round(discount * 100);

  const output = useMemo(() => {
    if (!items.length) return 'Cotización interna:';
    const lines = items.map(i => `• ${i.section} — ${i.title} × ${i.qty} = ${currency(i.subtotal)}`);
    const out = ['Cotización interna:', ...lines, `Total: ${currency(total)}`];
    if (pct > 0) {
      out.push(`Descuento: ${pct}% (${currency(discAmt)})`);
      out.push(`Total con descuento: ${currency(afterDisc)}`);
    }
    if (includeVisit) { out.push(`Cargo por visita: ${currency(visitAmt)}`); out.push(`Total final: ${currency(grand)}`); }
    return out.join('\n');
  }, [items, total, pct, discAmt, afterDisc, includeVisit, visitAmt, grand]);

  const [copied, setCopied] = useState(false);
  const copy = async () => { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1600); };

  return (
    <>
      <header className="site-header" role="banner">
        <div className="header-inner">
          <div className="logo-wrap">
            <div className="logo-mark-white">
              <Image src="/logo.png" width={48} height={48} alt="LimpiaBien" priority />
            </div>
            <div>
              <div className="logo-name">LimpiaBien</div>
              <div className="logo-tagline">Calculadora interna</div>
            </div>
          </div>
          <nav className="header-nav">
            <Link className="btn btn-outline btn-sm" href="/">Vista pública</Link>
          </nav>
        </div>
      </header>

      <main className="container">
        <div style={{ padding: '40px 0 24px' }}>
          <div className="section-label">Herramienta interna</div>
          <h1 style={{ fontFamily: 'var(--ff-serif)', fontSize: 32, fontWeight: 400, color: 'var(--ink)', letterSpacing: '-.01em', marginBottom: 6 }}>
            Calculadora de precios
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 15 }}>
            Selecciona servicios, aplica descuento y agrega cargo por visita si corresponde.
          </p>
        </div>

        <div className="calc-layout">
          {/* Categories */}
          <div>
            <div className="catalog">
              {CATEGORIES.map(cat => (
                <Category key={cat.slug} category={cat} showPrice getQty={getQty} setQty={setQty} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="calc-sidebar">
            <div className="sidebar-title">
              Resumen
              <button className="link-btn" onClick={() => { setCart({}); setDiscount(0); setIncludeVisit(false); }}>
                Limpiar todo
              </button>
            </div>

            <div className="item-list">
              {!items.length
                ? <p className="item-empty">Sin ítems seleccionados</p>
                : items.map(it => (
                  <div key={`${it.section}${it.title}`} className="item-row">
                    <span className="item-name">{it.section} — {it.title} ×{it.qty}</span>
                    <span className="item-val">{currency(it.subtotal)}</span>
                  </div>
                ))
              }
            </div>

            <hr className="sep" />

            <div className="total-row">
              <span>Subtotal</span>
              <strong style={{ fontSize: 18 }}>{currency(total)}</strong>
            </div>

            {/* Discount */}
            <div>
              <div className="disc-label">Descuento</div>
              <div className="disc-chips">
                {DISCOUNTS.map(d => (
                  <button key={d} className={`disc-chip${discount === d ? ' on' : ''}`} onClick={() => setDiscount(d)}>
                    {Math.round(d * 100)}%
                  </button>
                ))}
              </div>
            </div>

            {/* Visit */}
            <label className="visit-row">
              <input type="checkbox" checked={includeVisit} onChange={e => setIncludeVisit(e.target.checked)} />
              <span>Agregar cargo por visita ({currency(VISIT_FEE)})</span>
            </label>

            <hr className="sep" />

            {discount > 0 && (
              <div className="total-row" style={{ fontSize: 13 }}>
                <span>Descuento ({pct}%)</span>
                <span style={{ fontWeight: 600, color: '#b91c1c' }}>− {currency(discAmt)}</span>
              </div>
            )}
            {/* <div className="total-row">
              <span>Total</span>
              <strong>{currency(afterDisc)}</strong>
            </div> */}
            {includeVisit && (
              <>
                <div className="total-row" style={{ fontSize: 13 }}>
                  <span>Visita</span>
                  <span style={{ fontWeight: 600 }}>{currency(visitAmt)}</span>
                </div>
                <hr className="sep" />
                <div className="total-row grand">
                  <span style={{ fontWeight: 600, color: 'var(--ink)' }}>Total final</span>
                  <strong>{currency(grand)}</strong>
                </div>
              </>
            )}


            <div>
              <div className="out-label">Texto para copiar</div>
              <textarea className="out-area" value={output} readOnly rows={7} />
            </div>

            <button
              className={`btn btn-lg ${copied ? 'btn-teal' : 'btn-dark'}`}
              style={{ width: '100%' }}
              onClick={copy}
            >
              {copied ? '✓ Copiado' : 'Copiar cotización'}
            </button>
          </aside>
        </div>
      </main>

      <footer className="site-footer" role="contentinfo">
        <span className="footer-brand">LimpiaBien</span>
        <span>Calculadora interna · {new Date().getFullYear()}</span>
      </footer>
    </>
  );
}
