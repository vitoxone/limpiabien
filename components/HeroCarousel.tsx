'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const WaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const SLIDES = [
  {
    id: 'sillones',
    title: 'Sillones y Tapices',
    subtitle: 'Limpieza profunda e higienización de sillones, seccionales y poltronas con inyección–extracción Kärcher.',
    img: '/servicios/tapices.jpg',
    badge: 'Más solicitado',
    align: 'right', // Posición derecha
  },
  {
    id: 'colchones',
    title: 'Colchones e Higienización',
    subtitle: 'Remoción de manchas, ácaros y bacterias en ambas caras con productos hipoalergénicos.',
    img: '/servicios/664ECA3A-C9B9-4F50-A0C9-89F168C420F2.jpg',
    badge: 'Salud y Descanso',
    align: 'right', // Posición derecha
  },
  {
    id: 'pisos',
    title: 'Pisos Alfombrados y Oficinas',
    subtitle: 'Alfombras muro a muro de alto tráfico para empresas, oficinas y locales comerciales con opción de factura.',
    img: '/servicios/IMG_5673.jpg',
    badge: 'Empresas & B2B',
    align: 'left', // Posición izquierda
  },
  {
    id: 'vehiculos',
    title: 'Detailing Completo de Vehículos',
    subtitle: 'Lavado interior minucioso de asientos, alfombras y tapicería en autos, SUVs y camionetas.',
    img: '/servicios/IMG_5942.jpg',
    badge: 'Auto & SUV',
    align: 'right', // Posición derecha
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const activeSlide = SLIDES[current];

  return (
    <section className="hero-oxymagic" aria-labelledby="hero-title">
      {/* Background carousel slides */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`hero-oxymagic-bg ${index === current ? 'active' : ''}`}
          style={{ backgroundImage: `url('${slide.img}')` }}
        >
          <div className="hero-oxymagic-overlay" />
        </div>
      ))}

      <div className="band-inner hero-oxymagic-container">
        <div className={`hero-glass-box align-${activeSlide.align}`}>
          <div className="hero-carousel-top">
            <span className="hero-glass-pill">
              <span className="hero-pill-dot" aria-hidden="true" />
              Limpieza Profesional · Hogares y Oficinas
            </span>
            <span className="hero-slide-badge">{activeSlide.badge}</span>
          </div>

          <h1 id="hero-title" className="hero-glass-title">
            Una forma más segura y <em>profunda de limpiar</em>
          </h1>

          <p className="hero-glass-sub">
            {activeSlide.subtitle}
          </p>

          {/* Selector interactivo de servicios */}
          <div className="hero-carousel-nav" role="tablist" aria-label="Servicios destacados">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                role="tab"
                aria-selected={index === current}
                className={`hero-carousel-indicator ${index === current ? 'on' : ''}`}
                onClick={() => setCurrent(index)}
              >
                <span className="indicator-dot" />
                <span className="indicator-label">{slide.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Badges de certificación / confianza */}
          <div className="hero-glass-badges">
            <div className="hero-glass-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>Hipoalergénico</span>
            </div>
            <div className="hero-glass-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Kärcher Pro</span>
            </div>
            <div className="hero-glass-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Factura B2B</span>
            </div>
            <div className="hero-glass-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>Pet & Child Safe</span>
            </div>
          </div>

          <div className="hero-glass-actions">
            <Link className="btn btn-cta btn-lg" href="/cotizar">
              <WaIcon />
              Cotizar al instante
            </Link>
            <Link className="btn btn-glass-outline btn-lg" href="#servicios">
              Ver servicios
            </Link>
          </div>

          <div className="hero-glass-stats">
            <div>
              <strong>+150</strong>
              <span>servicios realizados</span>
            </div>
            <div className="hero-stat-divider" aria-hidden="true" />
            <div>
              <strong>100%</strong>
              <span>garantizado</span>
            </div>
            <div className="hero-stat-divider" aria-hidden="true" />
            <div>
              <strong>6 comunas</strong>
              <span>en O&apos;Higgins</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
