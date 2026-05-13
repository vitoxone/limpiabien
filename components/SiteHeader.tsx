'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type NavKey = 'inicio' | 'servicios' | 'cotizar';

const NAV: { key: NavKey; label: string; href: string }[] = [
  { key: 'inicio',    label: 'Inicio',    href: '/' },
  { key: 'servicios', label: 'Servicios', href: '/#servicios' },
  { key: 'cotizar',   label: 'Cotizar',   href: '/cotizar' },
];

const IG_HREF = 'https://www.instagram.com/limpiabien.cl/';

const IgIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

export default function SiteHeader({ active }: { active?: NavKey }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header" role="banner">
      <div className="header-inner">
        <Link href="/" className="logo-wrap" aria-label="LimpiaBien — inicio">
          <div className="logo-mark-white">
            <Image src="/logo.png" width={48} height={48} alt="LimpiaBien" priority />
          </div>
          <div>
            <div className="logo-name">LimpiaBien</div>
            <div className="logo-tagline">Limpieza profesional · Chile</div>
          </div>
        </Link>

        <nav className="nav-desktop" aria-label="Navegación principal">
          {NAV.map(({ key, label, href }) => (
            <Link
              key={key}
              href={href}
              className={`nav-link${active === key ? ' nav-link-active' : ''}`}
            >
              {label}
            </Link>
          ))}

          <div className="nav-social" aria-label="Redes sociales">
            <a
              href={IG_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-social-btn nav-social-ig"
              aria-label="Instagram @limpiabien.cl"
            >
              <IgIcon />
            </a>
          </div>

          <Link className="btn btn-cta btn-sm" href="/cotizar">
            Cotizar ahora
          </Link>
        </nav>

        <button
          className="nav-toggle"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      {open && (
        <nav className="nav-mobile" aria-label="Navegación móvil">
          {NAV.map(({ key, label, href }) => (
            <Link
              key={key}
              href={href}
              className={`nav-link-mobile${active === key ? ' nav-link-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}

          <div className="nav-social-mobile">
            <a
              href={IG_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-social-btn nav-social-ig"
              aria-label="Instagram @limpiabien.cl"
            >
              <IgIcon />
              <span>@limpiabien.cl</span>
            </a>
          </div>

          <Link className="btn btn-cta btn-sm" href="/cotizar" onClick={() => setOpen(false)}>
            Cotizar ahora
          </Link>
        </nav>
      )}
    </header>
  );
}
