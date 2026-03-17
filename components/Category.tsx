'use client';

import { useState } from 'react';
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
  const [open, setOpen] = useState(false);

  const visibleItems = category.items.filter(
    (item) => !(publicOnly && item.show_public === false)
  );

  return (
    <article
      className={`cat-card${open ? ' cat-open' : ''}`}
      id={`cat-${category.slug}`}
      itemScope
      itemType="https://schema.org/Service"
    >
      {/* Header — clickeable solo en mobile */}
      <header
        className="cat-head"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setOpen((v) => !v)}
      >
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
          {/* Chevron visible solo en mobile */}
          <span className="cat-chevron" aria-hidden="true">
            {open ? '▲' : '▼'}
          </span>
        </div>
      </header>

      <div className="cat-body">
        <div className="svc-rows">
          {visibleItems.map((item) => {
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
