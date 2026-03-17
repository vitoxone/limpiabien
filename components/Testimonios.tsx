const TESTIMONIOS = [
  {
    nombre: 'Claudia Ruiz',
    ciudad: 'Santa Cruz',
    texto: 'Quedé encantada con el resultado. El sillón parecía nuevo y el olor desapareció completamente. Super recomendado.',
    servicio: 'Tapiz sillón',
    estrellas: 5,
  },
  {
    nombre: 'Marcelo Bahamondes',
    ciudad: 'San Fernando',
    texto: 'Muy profesionales y puntuales. Limpiaron los tapices del auto y los colchones de dos piezas en una sola visita.',
    servicio: 'Tapices auto + colchones',
    estrellas: 5,
  },
  {
    nombre: 'Ana Morales',
    ciudad: 'Nancagua',
    texto: 'El trabajo fue excelente. La alfombra del living estaba muy sucia y quedó impecable. Volveré a llamarlos sin duda.',
    servicio: 'Alfombra decorativa',
    estrellas: 5,
  },
  {
    nombre: 'Nicole Rubio',
    ciudad: 'Chimbarongo',
    texto: 'Rápido, limpio y a buen precio. Vinieron el mismo día que llamé. El seccional quedó como recién comprado.',
    servicio: 'Sillón seccional',
    estrellas: 5,
  },
];

const Estrella = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export default function Testimonios() {
  return (
    <section className="testimonios-section" aria-labelledby="testimonios-title">
      <h2 className="testimonios-head" id="testimonios-title">Lo que dicen nuestros clientes</h2>
      <p className="testimonios-sub">Resultados reales en toda la Región de O'Higgins</p>
      <div className="testimonios-grid">
        {TESTIMONIOS.map((t) => (
          <article key={t.nombre} className="testimonio-card">
            <div className="testimonio-estrellas" aria-label={`${t.estrellas} estrellas`}>
              {Array.from({ length: t.estrellas }).map((_, i) => <Estrella key={i} />)}
            </div>
            <p className="testimonio-texto">"{t.texto}"</p>
            <footer className="testimonio-autor">
              <div className="testimonio-avatar" aria-hidden="true">
                {t.nombre.charAt(0)}
              </div>
              <div>
                <strong className="testimonio-nombre">{t.nombre}</strong>
                <span className="testimonio-meta">{t.servicio} · {t.ciudad}</span>
              </div>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
