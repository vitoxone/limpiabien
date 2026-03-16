'use client';

import type { CatalogCategory } from '@/data/catalog';
import SelectorRow from '@/components/SelectorRow';

type QtyGetter = (key: string) => number;
type QtySetter = (key: string, qty: number) => void;

export default function Category({
  category,
  showPrice,
  publicOnly = false,
  getQty,
  setQty,
}: {
  category: CatalogCategory;
  showPrice?: boolean;
  publicOnly?: boolean;
  getQty: QtyGetter;
  setQty: QtySetter;
}) {
  const isDomicilio = category.domicilio !== false;

  return (
    <article className="cat-card" id={`cat-${category.slug}`} itemScope itemType="https://schema.org/Service">
      <header className="cat-head">
        <div className="cat-head-left">
          <h3 className="cat-name" itemProp="name">{category.name}</h3>
          {category.description && (
            <p className="cat-desc" itemProp="description">{category.description}</p>
          )}
        </div>
        <div className="cat-meta">
          <span className={`cat-badge ${isDomicilio ? 'badge-home' : 'badge-pick'}`}>
            {isDomicilio ? 'A domicilio' : 'Retiro'}
          </span>
        </div>
      </header>

      <div className="cat-body">
        <div className="svc-rows">
          {category.items.map((item) => {
            if (publicOnly && item.show_public === false) return null;
            const key = `${category.name} — ${item.title}`;
            return (
              <SelectorRow
                key={`${item.id}-${item.title}`}
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
    </article>
  );
}
