import Link from 'next/link';

const cardStyle: React.CSSProperties = {
  background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14,
  padding: '24px 22px', textDecoration: 'none', color: '#0f172a',
  display: 'flex', flexDirection: 'column', gap: 6, transition: 'box-shadow .2s',
};

export default function AdminHome() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4, color: '#0f172a' }}>Panel administrativo</h1>
        <p style={{ fontSize: 14, color: '#64748b', marginBottom: 28 }}>Registro de servicios y gastos — LimpiaBien</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
          <Link href="/admin/servicios/nuevo" style={cardStyle}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#0c4a6e', letterSpacing: '.06em', textTransform: 'uppercase' }}>Registrar</span>
            <span style={{ fontSize: 18, fontWeight: 600 }}>Nuevo servicio</span>
            <span style={{ fontSize: 13, color: '#64748b' }}>Agrega un servicio realizado al Excel.</span>
          </Link>

          <Link href="/admin/gastos/nuevo" style={cardStyle}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#0c4a6e', letterSpacing: '.06em', textTransform: 'uppercase' }}>Registrar</span>
            <span style={{ fontSize: 18, fontWeight: 600 }}>Nuevo gasto</span>
            <span style={{ fontSize: 13, color: '#64748b' }}>Agrega un gasto al Excel.</span>
          </Link>

          <Link href="/calculadora" style={cardStyle}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#0c4a6e', letterSpacing: '.06em', textTransform: 'uppercase' }}>Herramienta</span>
            <span style={{ fontSize: 18, fontWeight: 600 }}>Calculadora / PDF</span>
            <span style={{ fontSize: 13, color: '#64748b' }}>Generar cotización PDF para un cliente.</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
