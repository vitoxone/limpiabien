'use client';

import { currency } from '@/lib/format';

type Props = {
  id: string;
  title: string;
  note?: string;
  price?: number;
  qty: number;
  onQtyChange: (qty: number) => void;
};

export default function SelectorRow({ id, title, note, price, qty, onQtyChange }: Props) {
  const inputId = `svc-${id}-${title.slice(0, 6)}`;
  const selected = qty > 0;

  return (
    <div className={`svc-row${selected ? ' selected' : ''}`}>
      <label className="chk" htmlFor={inputId} aria-label={`Seleccionar ${title}`}>
        <input
          id={inputId}
          type="checkbox"
          checked={selected}
          onChange={(e) => onQtyChange(e.target.checked ? 1 : 0)}
        />
        <span className="chk-box">
          <span className="chk-tick" />
        </span>
      </label>

      <div className="svc-label-wrap">
        <label htmlFor={inputId} className="svc-label">{title}</label>
        {note && <p className="svc-note">{note}</p>}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {typeof price === 'number' && (
          <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500, whiteSpace: 'nowrap' }}>
            {currency(price)}
          </span>
        )}
        <div className="qty">
          <button className="qty-btn" onClick={() => onQtyChange(Math.max(0, qty - 1))} aria-label="Restar">−</button>
          <input
            className="qty-input"
            type="number"
            min={0}
            value={qty}
            onChange={(e) => onQtyChange(Math.max(0, parseInt(e.target.value || '0', 10)))}
            aria-label={`Cantidad de ${title}`}
          />
          <button className="qty-btn" onClick={() => onQtyChange(qty + 1)} aria-label="Sumar">+</button>
        </div>
      </div>
    </div>
  );
}
