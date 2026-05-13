import { getIgMedia, pickImage } from '@/lib/instagram';

const FALLBACK = [
  { img: '/servicios/tapices.jpg', href: 'https://www.instagram.com/limpiabien.cl/' },
  { img: '/servicios/664ECA3A-C9B9-4F50-A0C9-89F168C420F2.jpg', href: 'https://www.instagram.com/limpiabien.cl/' },
  { img: '/servicios/IMG_5942.jpg', href: 'https://www.instagram.com/limpiabien.cl/' },
];

const IgIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

export default async function InstagramSection() {
  const media = await getIgMedia(3);
  const cards =
    media.length >= 3
      ? media.slice(0, 3).map((m) => ({ img: pickImage(m), href: m.permalink }))
      : FALLBACK;

  return (
    <div className="band-white">
      <div className="band-inner band-ig">
        <section id="ig-section" className="ig-section" aria-labelledby="ig-title">
          <div className="ig-inner">
            <div className="ig-text">
              <div className="hero-label" style={{ marginBottom: 12 }}>Síguenos</div>
              <h2 id="ig-title" className="ig-title">
                Mira nuestros<br /><em>trabajos reales</em>
              </h2>
              <p className="ig-body">
                Antes y después, resultados reales de clientes en la Región de
                O&apos;Higgins. Todo en nuestro Instagram.
              </p>
              <a
                className="btn btn-dark btn-lg ig-btn"
                href="https://www.instagram.com/limpiabien.cl/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IgIcon />
                @limpiabien.cl
              </a>
            </div>
            <div className="ig-preview">
              {cards.map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`ig-card ig-card-${i + 1}`}
                  aria-label={`Ver publicación ${i + 1} en Instagram`}
                >
                  <div
                    className="ig-card-img"
                    style={{ backgroundImage: `url('${c.img}')` }}
                  />
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
