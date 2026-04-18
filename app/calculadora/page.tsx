'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useMemo, useState, useRef, useEffect } from 'react';
import { CATEGORIES } from '@/data/catalog';
import Category from '@/components/Category';
import { currency } from '@/lib/format';
import { verificarClave } from './actions';

type Item = { section: string; title: string; price: number; qty: number; subtotal: number };
type Cart = Record<string, Item>;

const DISCOUNTS = [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5];
const VISIT_FEE = 2000;

// ── Gate de contraseña ────────────────────────────────────
function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const pwRef = useRef<HTMLInputElement>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setPwLoading(true);
    setPwError(false);
    const ok = await verificarClave(pw);
    setPwLoading(false);
    if (ok) {
      onSuccess();
    } else {
      setPwError(true);
      setPw('');
      pwRef.current?.focus();
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: 'var(--surface, #f8fafc)',
    }}>
      <form onSubmit={handleLogin} style={{
        background: 'white', borderRadius: 16, padding: '40px 36px',
        boxShadow: '0 4px 24px rgba(0,0,0,.08)', width: '100%', maxWidth: 360,
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        <div style={{ textAlign: 'center', marginBottom: 4 }}>
          <Image src="/logo.png" width={48} height={48} alt="LimpiaBien" style={{ margin: '0 auto 12px' }} />
          <h1 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink, #1a1a2e)', marginBottom: 4 }}>
            Calculadora interna
          </h1>
          <p style={{ fontSize: '.85rem', color: 'var(--muted, #6b7280)' }}>
            Ingresa la contraseña para acceder
          </p>
        </div>

        <input
          ref={pwRef}
          type="password"
          value={pw}
          onChange={e => { setPw(e.target.value); setPwError(false); }}
          placeholder="Contraseña"
          autoFocus
          style={{
            width: '100%', padding: '11px 14px',
            border: `1.5px solid ${pwError ? '#ef4444' : 'var(--border, #e2e8f0)'}`,
            borderRadius: 8, fontSize: '.95rem', outline: 'none',
            fontFamily: 'inherit', transition: 'border-color .2s',
          }}
        />

        {pwError && (
          <p style={{ fontSize: '.8rem', color: '#ef4444', marginTop: -8 }}>
            Contraseña incorrecta. Intenta de nuevo.
          </p>
        )}

        <button
          type="submit"
          disabled={!pw.trim() || pwLoading}
          className="btn btn-dark btn-lg"
          style={{ width: '100%', opacity: (!pw.trim() || pwLoading) ? 0.5 : 1 }}
        >
          {pwLoading ? 'Verificando…' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

// ── Pequeños helpers de formulario ───────────────────────
function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', letterSpacing: '.04em' }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function FieldInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%', padding: '8px 11px', fontSize: 13,
        border: '1px solid var(--border)', borderRadius: 7,
        fontFamily: 'var(--ff-sans)', color: 'var(--ink)', outline: 'none',
        background: 'white',
      }}
    />
  );
}

// ── Documento de cotización (para render a PDF) ───────────
interface DocProps {
  cotNum: string; cotDate: string; cotExpiry: string;
  clientName: string; clientPhone: string; clientEmail: string;
  clientComune: string; clientAddress: string;
  items: Item[];
  discount: number; pct: number; discAmt: number;
  includeVisit: boolean; visitAmt: number; grand: number;
  coverage: string; payMethod: string; notes: string;
}

function CotizacionDoc({ docRef, ...p }: DocProps & { docRef: React.RefObject<HTMLDivElement | null> }) {
  const totalBase = p.items.reduce((a, b) => a + b.subtotal, 0);

  return (
    <div ref={docRef} style={{
      width: 794, minHeight: 1123, background: '#fff',
      fontFamily: "'Outfit', system-ui, sans-serif", color: '#1a1410',
      fontSize: 13, lineHeight: 1.55,
    }}>
      {/* Top band */}
      <div style={{ height: 8, background: 'linear-gradient(90deg,#0284c7 0%,#0ea5e9 50%,#38bdf8 100%)' }} />

      <div style={{ padding: '30px 36px 32px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, paddingBottom: 22, borderBottom: '1.5px solid #e2ddd6', marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ width: 48, height: 48, background: 'linear-gradient(135deg,#0ea5e9,#0284c7)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 21h10M12 21V11M5 11l7-7 7 7" /><path d="M9 21V15a3 3 0 016 0v6" />
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 24, fontWeight: 700, color: '#0284c7', lineHeight: 1.1 }}>LimpiaBien.cl</div>
              <div style={{ fontSize: 11.5, color: '#6b6059', marginTop: 3, lineHeight: 1.5 }}>Lavado profesional de tapices, colchones, alfombras y pisos a domicilio.</div>
              <div style={{ marginTop: 6 }}>
                {['+56 9 7751 5193', '@limpiabien.cl', 'www.limpiabien.cl'].map(t => (
                  <span key={t} style={{ display: 'inline-flex', alignItems: 'center', fontSize: 10.5, color: '#0284c7', background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 20, padding: '2px 9px', fontWeight: 500, marginRight: 5, marginTop: 3 }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div style={{ minWidth: 210, background: 'linear-gradient(135deg,#f0f9ff,#fff)', border: '1.5px solid #bae6fd', borderRadius: 14, padding: '16px 18px', textAlign: 'right' }}>
            <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 12, fontStyle: 'italic', color: '#a89f92', marginBottom: 8 }}>Documento de Cotización</div>
            <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 22, fontWeight: 700, color: '#0284c7', marginBottom: 8 }}>{p.cotNum || 'LB-2026-001'}</div>
            <div style={{ fontSize: 12, color: '#6b6059', marginBottom: 3 }}><strong>Fecha:</strong> {p.cotDate}</div>
            <div style={{ fontSize: 12, color: '#6b6059' }}><strong>Válida hasta:</strong> {p.cotExpiry}</div>
          </div>
        </div>

        {/* Sección helper */}
        {([
          ['👤 Datos del Cliente', [
            ['Nombre completo', p.clientName || '—'],
            ['Teléfono', p.clientPhone || '—'],
            ['Correo', p.clientEmail || '—'],
            ['Comuna / Ciudad', p.clientComune || '—'],
          ], p.clientAddress],
          ['🏢 Datos del Proveedor', [
            ['Empresa / Marca', 'LimpiaBien.cl'],
            ['WhatsApp / Contacto', '+56 9 7751 5193'],
            ['Cobertura', p.coverage],
            ['Forma de pago', p.payMethod],
          ], null],
        ] as [string, [string, string][], string | null][]).map(([title, fields, extra]) => (
          <div key={title} style={{ marginBottom: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
              <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 13, fontWeight: 700, color: '#0284c7' }}>{title}</span>
              <div style={{ flex: 1, height: 1, background: '#e2ddd6' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
              {fields.map(([k, v]) => (
                <div key={k} style={{ border: '1px solid #e2ddd6', background: '#faf9f7', borderRadius: 9, padding: '10px 13px' }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: '#a89f92', marginBottom: 3 }}>{k}</div>
                  <div style={{ fontSize: 13, color: '#1a1410', fontWeight: 500 }}>{v}</div>
                </div>
              ))}
              {extra !== null && (
                <div style={{ gridColumn: '1 / -1', border: '1px solid #e2ddd6', background: '#faf9f7', borderRadius: 9, padding: '10px 13px' }}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: '#a89f92', marginBottom: 3 }}>Dirección del servicio</div>
                  <div style={{ fontSize: 13, color: '#1a1410', fontWeight: 500 }}>{extra || '—'}</div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Tabla de servicios */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 13, fontWeight: 700, color: '#0284c7' }}>📋 Detalle del Servicio</span>
            <div style={{ flex: 1, height: 1, background: '#e2ddd6' }} />
          </div>
          <div style={{ border: '1px solid #e2ddd6', borderRadius: 12, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'linear-gradient(90deg,#0284c7,#0ea5e9)' }}>
                  {['#', 'Descripción', 'Cant.', 'Valor unit.', 'Subtotal'].map((h, i) => (
                    <th key={h} style={{ padding: '9px 13px', fontSize: 10.5, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', color: 'white', textAlign: i === 0 ? 'left' : i === 1 ? 'left' : 'right', width: i === 0 ? 36 : i === 2 ? 70 : i === 3 ? 105 : i === 4 ? 115 : undefined }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {p.items.length === 0 ? (
                  <tr><td colSpan={5} style={{ padding: '14px', textAlign: 'center', color: '#a89f92', fontSize: 12 }}>Sin ítems seleccionados</td></tr>
                ) : p.items.map((it, i) => (
                  <tr key={`${it.section}${it.title}`} style={{ background: i % 2 === 0 ? '#fff' : '#faf9f7' }}>
                    <td style={{ padding: '10px 13px', borderBottom: '1px solid #f0ede8', fontSize: 11, fontWeight: 700, color: '#a89f92' }}>{i + 1}</td>
                    <td style={{ padding: '10px 13px', borderBottom: '1px solid #f0ede8' }}>
                      <strong style={{ fontSize: 13 }}>{it.title}</strong><br />
                      <span style={{ fontSize: 11, color: '#6b6059' }}>{it.section}</span>
                    </td>
                    <td style={{ padding: '10px 13px', borderBottom: '1px solid #f0ede8', textAlign: 'right' }}>{it.qty}</td>
                    <td style={{ padding: '10px 13px', borderBottom: '1px solid #f0ede8', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{currency(it.price)}</td>
                    <td style={{ padding: '10px 13px', borderBottom: '1px solid #f0ede8', textAlign: 'right', fontWeight: 600 }}>{currency(it.subtotal)}</td>
                  </tr>
                ))}
                {p.includeVisit && (
                  <tr style={{ background: '#faf9f7' }}>
                    <td style={{ padding: '10px 13px', fontSize: 11, fontWeight: 700, color: '#a89f92' }}>{p.items.length + 1}</td>
                    <td style={{ padding: '10px 13px' }}><strong>Cargo por visita / traslado</strong></td>
                    <td style={{ padding: '10px 13px', textAlign: 'right' }}>1</td>
                    <td style={{ padding: '10px 13px', textAlign: 'right' }}>{currency(p.visitAmt)}</td>
                    <td style={{ padding: '10px 13px', textAlign: 'right', fontWeight: 600 }}>{currency(p.visitAmt)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}>
            <div style={{ minWidth: 250, border: '1px solid #e2ddd6', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px', fontSize: 13, borderBottom: '1px solid #f0ede8', color: '#6b6059' }}>
                <span>Subtotal</span><span style={{ fontWeight: 600, color: '#1a1410' }}>{currency(totalBase)}</span>
              </div>
              {p.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px', fontSize: 13, borderBottom: '1px solid #f0ede8', color: '#6b6059' }}>
                  <span>Descuento ({p.pct}%)</span><span style={{ fontWeight: 600, color: '#b91c1c' }}>− {currency(p.discAmt)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'linear-gradient(90deg,#0284c7,#0ea5e9)' }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.85)', letterSpacing: '.04em', textTransform: 'uppercase' }}>Total a pagar</span>
                <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, fontWeight: 700, color: 'white' }}>{currency(p.grand)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Observaciones + Condiciones */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 22 }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 13, fontWeight: 700, color: '#0284c7', marginBottom: 10 }}>💬 Observaciones</div>
            <div style={{ fontSize: 11.5, color: '#6b6059', lineHeight: 1.7, whiteSpace: 'pre-line', background: '#faf9f7', border: '1px solid #e2ddd6', borderRadius: 9, padding: '12px 14px' }}>{p.notes}</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 13, fontWeight: 700, color: '#0284c7', marginBottom: 10 }}>✅ Condiciones</div>
            <ol style={{ fontSize: 11.5, color: '#6b6059', lineHeight: 1.7, background: '#faf9f7', border: '1px solid #e2ddd6', borderRadius: 9, padding: '12px 14px 12px 30px', margin: 0 }}>
              <li>La cotización tiene vigencia dentro del plazo indicado.</li>
              <li>Los valores están expresados en pesos chilenos.</li>
              <li>La reserva se confirma coordinando fecha y horario por WhatsApp.</li>
              <li>Pago contra servicio realizado, salvo acuerdo distinto.</li>
            </ol>
          </div>
        </div>

        {/* Firmas */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
          {['Firma / Aceptación Cliente', 'LimpiaBien.cl'].map(label => (
            <div key={label} style={{ borderTop: '2px solid #e2ddd6', paddingTop: 10, textAlign: 'center', fontSize: 10.5, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#a89f92' }}>{label}</div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #e2ddd6', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 10.5, color: '#a89f92', fontStyle: 'italic' }}>Documento generado por LimpiaBien.cl · Tamaño A4</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 10, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#0284c7', background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 20, padding: '3px 11px' }}>✓ Cotización Oficial</div>
        </div>

      </div>
    </div>
  );
}

// ── Modal de cotización ───────────────────────────────────
interface ModalProps {
  items: Item[]; discount: number; discAmt: number; afterDisc: number;
  includeVisit: boolean; visitAmt: number; grand: number;
  onClose: () => void;
}

function CotizacionModal({ items, discount, discAmt, includeVisit, visitAmt, grand, onClose }: ModalProps) {
  const [clientName, setClientName]       = useState('');
  const [clientPhone, setClientPhone]     = useState('');
  const [clientEmail, setClientEmail]     = useState('');
  const [clientComune, setClientComune]   = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [cotNum, setCotNum]               = useState('LB-2026-001');
  const [cotDate, setCotDate]             = useState(() => {
    const d = new Date();
    return `${String(d.getDate()).padStart(2,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${d.getFullYear()}`;
  });
  const [cotExpiry, setCotExpiry]         = useState(() => {
    const d = new Date(); d.setDate(d.getDate() + 7);
    return `${String(d.getDate()).padStart(2,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${d.getFullYear()}`;
  });
  const [payMethod, setPayMethod]         = useState('Transferencia bancaria / Efectivo');
  const [coverage, setCoverage]           = useState('San Fernando, Santa Cruz, Chimbarongo, Chépica, Nancagua');
  const [notes, setNotes]                 = useState(
    '• Servicio sujeto a evaluación visual previa.\n• El tiempo de secado puede variar según ventilación, temperatura y nivel de suciedad.\n• En manchas antiguas no se garantiza eliminación total, pero sí una mejora visible.\n• El área debe quedar disponible para trabajar cómodamente.'
  );
  const [exporting, setExporting]         = useState(false);
  const docRef                            = useRef<HTMLDivElement>(null);
  const pct                               = Math.round(discount * 100);

  // Cargar librerías PDF dinámicamente
  useEffect(() => {
    const load = (src: string) => {
      if (!document.querySelector(`script[src="${src}"]`)) {
        const s = document.createElement('script'); s.src = src; document.head.appendChild(s);
      }
    };
    load('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
    load('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
  }, []);

  async function handleExport() {
    if (!docRef.current) return;
    setExporting(true);
    await new Promise(r => setTimeout(r, 100));
    try {
      const { jsPDF } = (window as any).jspdf;
      const canvas = await (window as any).html2canvas(docRef.current, {
        scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff',
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.97);
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();
      const imgH = pdfW * (canvas.height / canvas.width);
      if (imgH <= pdfH) {
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfW, imgH);
      } else {
        let page = 0, remaining = imgH;
        while (remaining > 0) {
          if (page > 0) pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 0, -page * pdfH, pdfW, imgH);
          remaining -= pdfH; page++;
        }
      }
      pdf.save(`LimpiaBien_${cotNum.replace(/[^a-zA-Z0-9-]/g, '')}.pdf`);
    } catch {
      alert('Error al generar el PDF. Usa Ctrl+P para imprimir como PDF.');
    } finally {
      setExporting(false);
    }
  }

  const docProps: DocProps = {
    cotNum, cotDate, cotExpiry,
    clientName, clientPhone, clientEmail, clientComune, clientAddress,
    items, discount, pct, discAmt,
    includeVisit, visitAmt, grand,
    coverage, payMethod, notes,
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(10,20,40,.6)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflowY: 'auto', padding: '24px 16px' }}>
      <div style={{ width: '100%', maxWidth: 940, background: 'var(--white)', borderRadius: 20, boxShadow: '0 24px 80px rgba(0,0,0,.22)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        {/* Modal header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 26px', borderBottom: '1px solid var(--border)', background: 'var(--stone-50)' }}>
          <div>
            <div style={{ fontFamily: 'var(--ff-serif)', fontSize: 19, fontWeight: 700, color: 'var(--ink)' }}>Generar cotización PDF</div>
            <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 2 }}>Completa los datos del cliente y exporta</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={handleExport}
              disabled={exporting}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: exporting ? '#d4ac00' : '#f5c800', color: '#1a1410', border: 'none', borderRadius: 10, padding: '10px 22px', fontFamily: 'var(--ff-sans)', fontWeight: 700, fontSize: 14, cursor: exporting ? 'wait' : 'pointer', boxShadow: '0 4px 16px rgba(245,200,0,.35)', transition: 'background .18s' }}
            >
              {exporting ? (
                <><span style={{ width: 14, height: 14, border: '2px solid rgba(0,0,0,.2)', borderTopColor: '#1a1410', borderRadius: '50%', display: 'inline-block', animation: 'cotSpin .7s linear infinite' }} />Generando…</>
              ) : (
                <><svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2" /></svg>Exportar PDF</>
              )}
            </button>
            <button onClick={onClose} style={{ background: 'none', border: '1px solid var(--border)', borderRadius: 8, padding: '9px 16px', cursor: 'pointer', fontFamily: 'var(--ff-sans)', fontSize: 13, color: 'var(--muted)' }}>
              Cerrar
            </button>
          </div>
        </div>

        {/* Body: formulario | preview */}
        <div style={{ display: 'grid', gridTemplateColumns: '270px 1fr', minHeight: 0 }}>

          {/* Formulario */}
          <div style={{ padding: '22px 18px', borderRight: '1px solid var(--border)', background: 'var(--stone-50)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16, maxHeight: '80vh' }}>
            <FieldGroup label="N° Cotización"><FieldInput value={cotNum} onChange={setCotNum} placeholder="LB-2026-001" /></FieldGroup>
            <FieldGroup label="Fecha emisión"><FieldInput value={cotDate} onChange={setCotDate} placeholder="DD-MM-AAAA" /></FieldGroup>
            <FieldGroup label="Válida hasta"><FieldInput value={cotExpiry} onChange={setCotExpiry} placeholder="DD-MM-AAAA" /></FieldGroup>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14, fontSize: 10, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase' as const, color: 'var(--muted)' }}>Cliente</div>
            <FieldGroup label="Nombre"><FieldInput value={clientName} onChange={setClientName} placeholder="Nombre completo" /></FieldGroup>
            <FieldGroup label="Teléfono"><FieldInput value={clientPhone} onChange={setClientPhone} placeholder="+56 9 XXXX XXXX" /></FieldGroup>
            <FieldGroup label="Correo"><FieldInput value={clientEmail} onChange={setClientEmail} placeholder="correo@email.com" /></FieldGroup>
            <FieldGroup label="Comuna / Ciudad"><FieldInput value={clientComune} onChange={setClientComune} placeholder="Santa Cruz" /></FieldGroup>
            <FieldGroup label="Dirección"><FieldInput value={clientAddress} onChange={setClientAddress} placeholder="Calle y número" /></FieldGroup>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14, fontSize: 10, fontWeight: 700, letterSpacing: '.10em', textTransform: 'uppercase' as const, color: 'var(--muted)' }}>Detalles extra</div>
            <FieldGroup label="Cobertura"><FieldInput value={coverage} onChange={setCoverage} /></FieldGroup>
            <FieldGroup label="Forma de pago"><FieldInput value={payMethod} onChange={setPayMethod} /></FieldGroup>
            <FieldGroup label="Observaciones">
              <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={6} style={{ width: '100%', padding: '9px 12px', fontSize: 12, border: '1px solid var(--border)', borderRadius: 7, fontFamily: 'var(--ff-sans)', color: 'var(--ink)', resize: 'vertical', outline: 'none', lineHeight: 1.6, background: 'white' }} />
            </FieldGroup>
          </div>

          {/* Preview escalado */}
          <div style={{ overflowY: 'auto', padding: '24px', background: 'linear-gradient(160deg,#f0f9ff 0%,#faf9f7 60%)', maxHeight: '80vh' }}>
            <div style={{ transform: 'scale(0.70)', transformOrigin: 'top center', marginBottom: -200 }}>
              <CotizacionDoc docRef={docRef} {...docProps} />
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes cotSpin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Calculadora principal ─────────────────────────────────
function Calculadora() {
  const [cart, setCart]               = useState<Cart>({});
  const [discount, setDiscount]       = useState(0);
  const [includeVisit, setIncludeVisit] = useState(false);
  const [showModal, setShowModal]     = useState(false);

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

  const items     = useMemo(() => Object.values(cart).filter(i => i.qty > 0), [cart]);
  const total     = useMemo(() => items.reduce((a, b) => a + b.subtotal, 0), [items]);
  const discAmt   = useMemo(() => Math.round(total * discount), [total, discount]);
  const afterDisc = useMemo(() => Math.max(0, total - discAmt), [total, discAmt]);
  const visitAmt  = includeVisit ? VISIT_FEE : 0;
  const grand     = afterDisc + visitAmt;
  const pct       = Math.round(discount * 100);

  const output = useMemo(() => {
    if (!items.length) return 'Cotización interna:';
    const lines = items.map(i => `• ${i.section} — ${i.title} × ${i.qty} = ${currency(i.subtotal)}`);
    const out = ['Cotización interna:', ...lines, `Total: ${currency(total)}`];
    if (pct > 0) { out.push(`Descuento: ${pct}% (${currency(discAmt)})`); out.push(`Total con descuento: ${currency(afterDisc)}`); }
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
          <div>
            <div className="catalog">
              {CATEGORIES.map(cat => (
                <Category key={cat.slug} category={cat} showPrice getQty={getQty} setQty={setQty} />
              ))}
            </div>
          </div>

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

            {/* ── Acciones ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* Botón amarillo — Generar PDF */}
              <button
                onClick={() => setShowModal(true)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                  width: '100%', padding: '13px 20px',
                  background: '#f5c800', color: '#1a1410',
                  border: 'none', borderRadius: 10,
                  fontFamily: 'var(--ff-sans)', fontWeight: 700, fontSize: 15,
                  cursor: 'pointer', boxShadow: '0 4px 18px rgba(245,200,0,.38)',
                  transition: 'background .15s, transform .1s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#d4ac00')}
                onMouseLeave={e => (e.currentTarget.style.background = '#f5c800')}
              >
                <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v6m0 0l-2-2m2 2l2-2"/>
                </svg>
                Generar cotización PDF
              </button>

              {/* Botón copiar */}
              <button
                className={`btn btn-lg ${copied ? 'btn-teal' : 'btn-dark'}`}
                style={{ width: '100%' }}
                onClick={copy}
              >
                {copied ? '✓ Copiado' : 'Copiar cotización'}
              </button>
            </div>
          </aside>
        </div>
      </main>

      <footer className="site-footer" role="contentinfo">
        <span className="footer-brand">LimpiaBien</span>
        <span>Calculadora interna · {new Date().getFullYear()}</span>
      </footer>

      {showModal && (
        <CotizacionModal
          items={items}
          discount={discount}
          discAmt={discAmt}
          afterDisc={afterDisc}
          includeVisit={includeVisit}
          visitAmt={visitAmt}
          grand={grand}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

// ── Page principal ────────────────────────────────────────
export default function CalculatorPage() {
  const [authed, setAuthed] = useState(false);
  if (!authed) return <PasswordGate onSuccess={() => setAuthed(true)} />;
  return <Calculadora />;
}
