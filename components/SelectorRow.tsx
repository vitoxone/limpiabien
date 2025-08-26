'use client';

import { currency } from '@/lib/format';

type Props = {
  id: string;
  title: string;
  price?: number; // show price if provided
  qty: number;
  onQtyChange: (qty: number) => void;
};

export default function SelectorRow({ id, title, price, qty, onQtyChange }: Props) {
  const inputId = `srv-${id}`;
  return (
    <div role="row" className="table-row">
      <div role="cell" className="cell-title">
        <label htmlFor={inputId} className="check">
          <input
            id={inputId}
            type="checkbox"
            checked={qty > 0}
            onChange={(e) => onQtyChange(e.target.checked ? 1 : 0)}
          />
          <span/>
        </label>
        <strong>{title}</strong>
      </div>
      <div role="cell" className="cell-price">
        {typeof price === 'number' ? currency(price) : null}
      </div>
      <div role="cell" className="cell-actions">
        <div className="qty">
          <button className="qty-btn" onClick={() => onQtyChange(Math.max(0, qty - 1))} aria-label="Restar">−</button>
          <input
            className="qty-input"
            type="number"
            min={0}
            value={qty}
            onChange={(e) => onQtyChange(Math.max(0, parseInt(e.target.value || '0', 10)))}
          />
          <button className="qty-btn" onClick={() => onQtyChange(qty + 1)} aria-label="Sumar">+</button>
        </div>
      </div>
    </div>
  );
}
