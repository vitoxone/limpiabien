// components/Category.tsx
'use client';

import type { CatalogCategory } from '@/data/catalog';
import SelectorRow from '@/components/SelectorRow';

type QtyGetter = (key: string) => number;
type QtySetter = (key: string, qty: number) => void;

export default function Category({
  category,
  showPrice,
  getQty,
  setQty,
}: {
  category: CatalogCategory;
  showPrice?: boolean;
  getQty: QtyGetter;
  setQty: QtySetter;
}) {
  return (
    <section id={category.slug} className="section">
      <header className="section-head">
        <h2>{category.name}</h2>
      </header>
      <div role="table" className="table">
        <div role="rowgroup">
          {category.items.map((item) => {
            const key = `${category.name} — ${item.title}`;
            return (
              <SelectorRow
                key={item.id}
                id={item.id}
                title={item.title}
                price={showPrice ? item.price : undefined}
                qty={getQty(key)}
                onQtyChange={(q) => setQty(key, q)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}