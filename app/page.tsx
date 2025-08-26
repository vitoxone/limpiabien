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
      <header>
        <div className="wrap">
          <div className="logo" aria-label="LimpiaBien">
            <Image src="/logo.png" width={44} height={44} alt="LimpiaBien" style={{ borderRadius: 10 }} />
            <strong>LimpiaBien</strong>
            <span style={{ color: 'var(--muted)', fontSize: 14 }}>.cl • Limpieza a domicilio</span>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <h1>Nuestros Servicios</h1>

        </section>

        {CATEGORIES.map(cat => (
          <Category
            key={cat.slug}
            category={cat}
            showPrice={false}
            getQty={getQty}
            setQty={setQty}
          />
        ))}

        <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link className="btn sec" href={waHref} target="_blank" rel="noopener">Consultar por WhatsApp</Link>
          <button className="btn" onClick={() => setCart({})}>Limpiar selección</button>
        </div>
      </main>

      <footer>
        © {new Date().getFullYear()} LimpiaBien • Nancagua, Santa Cruz, San Fernando, Chimbarongo, Chépica y alrededores
      </footer>
    </>
  );
}