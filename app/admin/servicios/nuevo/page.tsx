'use client';

import Link from 'next/link';
import { useState } from 'react';
import { registrarServicio } from './actions';

const CIUDADES = ['Nancagua', 'Santa Cruz', 'San Fernando', 'Chimbarongo', 'Chépica', 'Palmilla', 'Otro'];
const MEDIOS_PAGO = ['Efectivo', 'Transferencia', 'Tarjeta', 'Otro'];
const ORIGENES = ['Web', 'Instagram', 'Referidos', 'Conocido', 'Otro'];

function today() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

export default function NuevoServicioPage() {
  const [fecha, setFecha] = useState(today);
  const [cliente, setCliente] = useState('');
  const [ciudad, setCiudad] = useState('Santa Cruz');
  const [ubicacion, setUbicacion] = useState('');
  const [servicio, setServicio] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [precioUnitario, setPrecioUnitario] = useState(0);
  const [medioPago, setMedioPago] = useState('Efectivo');
  const [pagado, setPagado] = useState(true);
  const [notas, setNotas] = useState('');
  const [origen, setOrigen] = useState('Web');

  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const total = cantidad * precioUnitario;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cliente.trim() || !servicio.trim() || precioUnitario <= 0) return;
    setSending(true);
    setStatus('idle');
    setErrorMsg('');

    const pw = sessionStorage.getItem('lb_admin_pw') || '';

    const res = await registrarServicio(pw, {
      fecha, cliente: cliente.trim(), ciudad, ubicacion: ubicacion.trim(),
      servicio: servicio.trim(), cantidad, precioUnitario, medioPago,
      pagado, notas: notas.trim(), origen,
    });
    setSending(false);
    if (res.ok) {
      setStatus('ok');
      setCliente(''); setUbicacion(''); setServicio(''); setCantidad(1);
      setPrecioUnitario(0); setNotas('');
    } else {
      setStatus('error');
      setErrorMsg(res.error);
      if (res.error === 'No autorizado') {
        sessionStorage.removeItem('lb_admin_pw');
        sessionStorage.removeItem('lb_admin_ok');
        window.location.reload();
      }
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '32px 20px' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <div style={{ marginBottom: 20 }}>
          <Link href="/admin" style={{ fontSize: 13, color: '#0c4a6e', textDecoration: 'none' }}>← Volver al panel</Link>
          <h1 style={{ fontSize: 22, fontWeight: 700, marginTop: 8, color: '#0f172a' }}>Nuevo servicio</h1>
          <p style={{ fontSize: 13, color: '#64748b' }}>Se agrega como fila nueva en la hoja <strong>Servicios</strong>.</p>
        </div>

        <form onSubmit={handleSubmit} style={{
          background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14,
          padding: 22, display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          <Row>
            <Field label="Fecha (DD/MM/YYYY)"><input required value={fecha} onChange={e => setFecha(e.target.value)} style={inputStyle} /></Field>
            <Field label="Origen"><select value={origen} onChange={e => setOrigen(e.target.value)} style={inputStyle}>{ORIGENES.map(o => <option key={o}>{o}</option>)}</select></Field>
          </Row>

          <Field label="Cliente *">
            <input required value={cliente} onChange={e => setCliente(e.target.value)} placeholder="Nombre" style={inputStyle} />
          </Field>

          <Row>
            <Field label="Ciudad"><select value={ciudad} onChange={e => setCiudad(e.target.value)} style={inputStyle}>{CIUDADES.map(c => <option key={c}>{c}</option>)}</select></Field>
            <Field label="Ubicación"><input value={ubicacion} onChange={e => setUbicacion(e.target.value)} placeholder="Dirección / sector" style={inputStyle} /></Field>
          </Row>

          <Field label="Servicio *">
            <input required value={servicio} onChange={e => setServicio(e.target.value)} placeholder="Ej: Sillón 3 cuerpos" style={inputStyle} />
          </Field>

          <Row>
            <Field label="Cantidad"><input required type="number" min={1} value={cantidad} onChange={e => setCantidad(Math.max(1, Number(e.target.value)))} style={inputStyle} /></Field>
            <Field label="Precio unitario (CLP)"><input required type="number" min={0} step={500} value={precioUnitario} onChange={e => setPrecioUnitario(Math.max(0, Number(e.target.value)))} style={inputStyle} /></Field>
          </Row>

          <div style={{ fontSize: 14, color: '#0c4a6e', textAlign: 'right', fontWeight: 600 }}>
            Total: ${total.toLocaleString('es-CL')}
          </div>

          <Row>
            <Field label="Medio de pago"><select value={medioPago} onChange={e => setMedioPago(e.target.value)} style={inputStyle}>{MEDIOS_PAGO.map(m => <option key={m}>{m}</option>)}</select></Field>
            <Field label="¿Pagado?">
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, paddingTop: 10 }}>
                <input type="checkbox" checked={pagado} onChange={e => setPagado(e.target.checked)} />
                <span>Sí, ya pagó</span>
              </label>
            </Field>
          </Row>

          <Field label="Notas">
            <textarea value={notas} onChange={e => setNotas(e.target.value)} rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
          </Field>

          {status === 'ok' && (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '10px 14px', borderRadius: 8, fontSize: 13 }}>
              ✓ Servicio registrado en el Excel.
            </div>
          )}
          {status === 'error' && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '10px 14px', borderRadius: 8, fontSize: 13 }}>
              Error: {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={sending}
            style={{
              background: '#0f172a', color: '#fff', border: 'none',
              borderRadius: 8, padding: '12px 18px', fontSize: 15, fontWeight: 600,
              cursor: sending ? 'wait' : 'pointer', opacity: sending ? 0.6 : 1,
              marginTop: 4,
            }}
          >
            {sending ? 'Guardando…' : 'Guardar servicio'}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '9px 12px', fontSize: 14,
  border: '1px solid #e2e8f0', borderRadius: 7,
  fontFamily: 'inherit', color: '#0f172a', outline: 'none', background: '#fff',
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: '#64748b', letterSpacing: '.06em', textTransform: 'uppercase' }}>{label}</label>
      {children}
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>{children}</div>;
}
