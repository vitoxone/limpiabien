'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { verificarClave } from '@/app/calculadora/actions';

const STORAGE_KEY = 'lb_admin_ok';
const PW_KEY = 'lb_admin_pw';

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState<boolean | null>(null);
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setOk(sessionStorage.getItem(STORAGE_KEY) === '1');
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const valid = await verificarClave(pw);
    setLoading(false);
    if (valid) {
      sessionStorage.setItem(STORAGE_KEY, '1');
      sessionStorage.setItem(PW_KEY, pw);
      setOk(true);
    } else {
      setError(true);
      setPw('');
      inputRef.current?.focus();
    }
  }

  if (ok === null) return null;
  if (ok) return <>{children}</>;

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: '#f8fafc', padding: 16,
    }}>
      <form onSubmit={handleLogin} style={{
        background: '#fff', borderRadius: 16, padding: '40px 36px',
        boxShadow: '0 4px 24px rgba(0,0,0,.08)', width: '100%', maxWidth: 360,
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        <div style={{ textAlign: 'center', marginBottom: 4 }}>
          <Image src="/logo.png" width={48} height={48} alt="LimpiaBien" style={{ margin: '0 auto 12px' }} />
          <h1 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1a1a2e', marginBottom: 4 }}>Panel administrativo</h1>
          <p style={{ fontSize: '.85rem', color: '#6b7280' }}>Ingresa la contraseña para acceder</p>
        </div>

        <input
          ref={inputRef}
          type="password"
          value={pw}
          onChange={e => { setPw(e.target.value); setError(false); }}
          placeholder="Contraseña"
          autoFocus
          style={{
            width: '100%', padding: '11px 14px',
            border: `1.5px solid ${error ? '#ef4444' : '#e2e8f0'}`,
            borderRadius: 8, fontSize: '.95rem', outline: 'none',
            fontFamily: 'inherit', transition: 'border-color .2s',
          }}
        />

        {error && (
          <p style={{ fontSize: '.8rem', color: '#ef4444', marginTop: -8 }}>Contraseña incorrecta.</p>
        )}

        <button
          type="submit"
          disabled={!pw.trim() || loading}
          style={{
            background: '#0f172a', color: '#fff', border: 'none',
            borderRadius: 8, padding: '11px 14px', fontSize: '.95rem',
            fontWeight: 600, cursor: 'pointer', opacity: (!pw.trim() || loading) ? 0.5 : 1,
          }}
        >
          {loading ? 'Verificando…' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
