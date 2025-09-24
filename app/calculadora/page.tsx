// app/calculadora/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { CATEGORIES } from '@/data/catalog'; // <- usa el catálogo por categorías
import Category from '@/components/Category';
import { currency } from '@/lib/format';

type Item = { section: string; title: string; price: number; qty: number; subtotal: number };
type Cart = Record<string, Item>;

const DISCOUNTS = [0, 0.1, 0.2, 0.3, 0.4, 0.5];
const VISIT_FEE = 2000; // $2.000 fijo

export default function CalculatorPage() {
  const [cart, setCart] = useState<Cart>({});
  const [discount, setDiscount] = useState<number>(0);
  const [includeVisit, setIncludeVisit] = useState<boolean>(false); // <-- NUEVO

  const getQty = useCallback((key: string) => cart[key]?.qty ?? 0, [cart]);

  const setQty = useCallback((key: string, qty: number) => {
    setCart((prev) => {
      const next = { ...prev };
      const [section, title] = key.split(' — ');

      // Buscar el precio en el catálogo:
      let price = 0;
      outer: for (const cat of CATEGORIES) {
        if (cat.name === section) {
          for (const it of cat.items) {
            if (it.title === title) { price = it.price; break outer; }
          }
        }
      }

      if (qty <= 0) {
        delete next[key];
      } else {
        next[key] = { section, title, price, qty, subtotal: qty * price };
      }
      return next;
    });
  }, []);

  const items = useMemo(() => Object.values(cart).filter(i => i.qty > 0), [cart]);

  const total = useMemo(() => items.reduce((a, b) => a + b.subtotal, 0), [items]);
  const discountAmount = useMemo(() => Math.round(total * discount), [total, discount]);
  const totalWithDiscount = useMemo(() => Math.max(0, total - discountAmount), [total, discountAmount]);

  const visitAmount = includeVisit ? VISIT_FEE : 0;                   // <-- NUEVO
  const grandTotal = totalWithDiscount + visitAmount;                 // <-- NUEVO
  const pct = Math.round(discount * 100);

  const output = useMemo(() => {
    if (items.length === 0) return 'Cotización interna:';
    const lines = items.map(i => `• ${i.section} — ${i.title} × ${i.qty} = ${currency(i.subtotal)}`);

    const out: string[] = [
      'Cotización interna:',
      ...lines,
      `Total: ${currency(total)}`,
      `Descuento aplicado: ${pct}% (${currency(discountAmount)})`,
      `Total con descuento: ${currency(totalWithDiscount)}`,
    ];

    if (includeVisit) {
      out.push(`Cargo por visita: ${currency(visitAmount)}`);        // <-- NUEVO
      out.push(`Total final: ${currency(grandTotal)}`);              // <-- NUEVO
    }

    return out.join('\n');
  }, [items, total, pct, discountAmount, totalWithDiscount, includeVisit, visitAmount, grandTotal]);

  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <header>
        <div className="wrap">
          <div className="logo" aria-label="LimpiaBien">
            <Image src="/logo.png" width={44} height={44} alt="LimpiaBien" style={{ borderRadius: 10 }} />
            <strong>LimpiaBien</strong>
            <span style={{ color: 'var(--muted)', fontSize: 14 }}>.cl • Limpieza a domicilio</span>
          </div>
          <div className="cta" style={{ display:'flex', gap:8 }}>
            <Link className="btn" href="/">Vista pública</Link>
          </div>
        </div>
      </header>

      <main className="container grid-2">
        <div>
          <section className="hero">
            <h1>Calculadora interna</h1>
            <p>Selecciona por categoría, aplica un <strong>descuento</strong> y, si corresponde, agrega el <strong>cargo por visita</strong>.</p>
          </section>

          {CATEGORIES.map(cat => (
            <Category
              key={cat.slug}
              category={cat}
              showPrice
              getQty={(key) => getQty(key)}
              setQty={(key, q) => setQty(key, q)}
            />
          ))}
        </div>

        <aside className="cart">
          <div className="cart-head">
            <strong>Resumen</strong>
            <button className="link" onClick={() => { setCart({}); setDiscount(0); setIncludeVisit(false); }}>
              Limpiar
            </button>
          </div>

          <ul className="cart-list">
            {items.map(it => (
              <li key={`${it.section}-${it.title}`}>
                <span className="cart-title">
                  {it.section} — {it.title} <span className="muted">({it.qty} × {currency(it.price)})</span>
                </span>
                <span className="cart-subtotal">{currency(it.subtotal)}</span>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <span>Total</span>
            <strong>{currency(total)}</strong>
          </div>

          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            {DISCOUNTS.map(d => (
              <button
                key={d}
                className={'chip' + (discount === d ? ' chip-active' : '')}
                onClick={() => setDiscount(d)}
              >
                {Math.round(d*100)}%
              </button>
            ))}
          </div>

          {/* Check cargo por visita (aplicado después del descuento) */}
          <label className="check-inline" style={{ display:'flex', alignItems:'center', gap:10 }}>
            <input
              type="checkbox"
              checked={includeVisit}
              onChange={(e) => setIncludeVisit(e.target.checked)}
            />
            <span/>
            Agregar cargo por visita ({currency(VISIT_FEE)})
          </label>

          {/* Totales con cargo si corresponde */}
          <div className="cart-total">
            <span>Total con descuento</span>
            <strong>{currency(totalWithDiscount)}</strong>
          </div>
          {includeVisit && (
            <>
              <div className="cart-total">
                <span>Cargo por visita</span>
                <strong>{currency(visitAmount)}</strong>
              </div>
              <div className="cart-total">
                <span>Total final</span>
                <strong>{currency(grandTotal)}</strong>
              </div>
            </>
          )}

          <label className="label" htmlFor="out">Resultado</label>
          <textarea id="out" rows={10} value={output} readOnly className="textarea" />
          <button className="btn sec" onClick={copy}>{copied ? '¡Copiado!' : 'Copiar contenido'}</button>
        </aside>
      </main>

      <footer>
        © {new Date().getFullYear()} LimpiaBien • Nancagua, Santa Cruz, San Fernando, Chimbarongo, Chépica y más
      </footer>
    </>
  );
}