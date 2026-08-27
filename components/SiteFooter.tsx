// components/SiteFooter.tsx
import Link from 'next/link';
import { COMUNAS } from '@/data/comunas';

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
  </svg>
);

/**
 * Footer del sitio público.
 *
 * `pymeCta` controla el bloque que ofrece sitios web a otras pymes de servicios.
 * Se apaga en /web-para-pymes (esa página ya es la oferta completa) y en las
 * herramientas internas.
 */
export default function SiteFooter({ pymeCta = true }: { pymeCta?: boolean }) {
  return (
    <>
      {pymeCta && (
        <section className="pyme-cta" aria-labelledby="pyme-cta-title">
          <div className="pyme-cta-inner">
            <div className="pyme-cta-text">
              <span className="pyme-cta-eyebrow">
                <span className="pyme-cta-dot" aria-hidden="true" />
                ¿Tienes una pyme de servicios?
              </span>
              <h2 id="pyme-cta-title" className="pyme-cta-title">
                Te hacemos un sitio <em>como este</em>
              </h2>
              <p className="pyme-cta-body">
                Este sitio lo armamos nosotros para ordenar los pedidos de LimpiaBien y cotizar
                sin perder tiempo. Podemos hacer lo mismo para tu negocio: página propia,
                cotizador y contacto directo por WhatsApp.
              </p>
            </div>
            <Link className="btn btn-cta btn-lg pyme-cta-btn" href="/web-para-pymes">
              Quiero uno para mi pyme
              <ArrowIcon />
            </Link>
          </div>
        </section>
      )}

      <footer className="site-footer" role="contentinfo">
        <span className="footer-brand">LimpiaBien</span>
        <span>{COMUNAS.join(' · ')}</span>
        <span className="footer-legal">
          <Link href="/web-para-pymes" className="footer-link">Sitios web para pymes</Link>
          <span>© {new Date().getFullYear()} LimpiaBien</span>
        </span>
      </footer>
    </>
  );
}
