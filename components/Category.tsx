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
  specialRequest = '',
  onSpecialRequestChange,
}: {
  category: CatalogCategory;
  showPrice?: boolean;
  publicOnly?: boolean;
  getQty: QtyGetter;
  setQty: QtySetter;
  specialRequest?: string;
  onSpecialRequestChange?: (v: string) => void;
}) {
  const isDomicilio = category.domicilio !== false;
  const [open, setOpen] = useState(false);
  const isSpecial = category.slug === 'pedidos-especiales';

  const visibleItems = category.items.filter(
    (item) => !(publicOnly && item.show_public === false)
  );

  // Para pedidos especiales, considerar abierto si hay texto
  const hasContent = isSpecial ? specialRequest.trim().length > 0 : false;

  return (
    <article
      className={`cat-card${open || hasContent ? ' cat-open' : ''}`}
      id={`cat-${category.slug}`}
      itemScope
      itemType="https://schema.org/Service"
    >
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
          <span className="cat-chevron" aria-hidden="true">
            {open || hasContent ? '▲' : '▼'}
          </span>
        </div>
      </header>

      <div className="cat-body">
        {isSpecial ? (
          <div className="special-request-wrap">
            <label className="special-request-label" htmlFor="special-request">
              Cuéntanos lo que necesitas
            </label>
            <textarea
              id="special-request"
              className="special-request-input"
              rows={3}
              placeholder="Ej: tengo una silla de comedor tapizada, una alfombra de auto pequeña..."
              value={specialRequest}
              onChange={(e) => onSpecialRequestChange?.(e.target.value)}
            />
          </div>
        ) : (
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
        )}
      </div>
    </article>
  );
}
