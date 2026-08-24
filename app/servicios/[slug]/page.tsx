// app/servicios/[slug]/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildWaLink } from '@/lib/wa';
import SiteHeader from '@/components/SiteHeader';
import { CATEGORIES } from '@/data/catalog';
import s from './styles.module.css';

const SLUGS = {
  tapices: {
    title: 'Limpieza de Tapices y Sillones',
    h1: 'Limpieza de tapices y sillones',
    cover: '/servicios/tapices.jpg',
    seoDesc:
      'Limpieza profesional de tapices y sillones con sistema de inyección–succión Kärcher. Eliminamos manchas, ácaros y olores con productos hipoalergénicos.',
    importance: [
      'Elimina alérgenos (ácaros, polvo) y olores persistentes.',
      'Recupera colores y textura, prolongando la vida útil del mueble.',
      'Higienización segura con productos hipoalergénicos y biodegradables.',
    ],
    procedure: [
      'Inspección y test de color en zona oculta.',
      'Aspirado profundo para retirar polvo y partículas.',
      'Pre-tratamiento de manchas con desmanchador específico.',
      'Limpieza con equipo de inyección–succión Kärcher (aplicación y extracción en el acto).',
      'Acondicionado final: peinado de telas / ventilación.',
    ],
    drying: {
      note: 'El tiempo de secado depende de ventilación, humedad ambiental y tipo de tela.',
      times: ['Telas estándar: 4–8 horas', 'Telas gruesas: 8–12 horas'],
      tips: ['Ventilar ambiente', 'Usar ventilador', 'Evitar uso hasta secado al tacto'],
    },
    products: [
      'Detergente para tapicería pH neutro (hipoalergénico, biodegradable).',
      'Desmanchadores focalizados (vino, café, grasa).',
      'Neutralizador de olores (encapsulante).',
    ],
    machines: [
      'Kärcher Puzzi (inyección–succión).',
      'Accesorios de mano para rincones y costuras.',
    ],
    faqs: [
      { q: '¿Sale cualquier mancha?', a: 'Las orgánicas y recientes responden muy bien; las antiguas pueden atenuarse sin garantía 100%.' },
      { q: '¿Queda mal olor?', a: 'No. Productos neutros y extracción potente aceleran el secado.' },
    ],
    presetMsg: 'Hola, quiero cotizar limpieza de tapices/sillones.',
  },
  colchones: {
    title: 'Limpieza de Colchones a Domicilio',
    h1: 'Limpieza de colchones',
    cover: '/servicios/664ECA3A-C9B9-4F50-A0C9-89F168C420F2.jpg',
    seoDesc:
      'Higienización profunda de colchones con inyección–succión Kärcher. Eliminamos ácaros, olores y manchas frecuentes.',
    importance: [
      'Reduce alérgenos y mejora la higiene del descanso.',
      'Control de olores/manchas por sudor o líquidos.',
      'Mantención recomendada cada 6–12 meses.',
    ],
    procedure: [
      'Inspección y test de color.',
      'Aspirado profundo por ambas caras.',
      'Tratamiento focalizado de manchas.',
      'Limpieza con inyección–succión controlando caudal.',
      'Ventilación y recomendaciones de uso.',
    ],
    drying: {
      note: 'El colchón absorbe más humedad; cuidamos caudal y pasadas.',
      times: ['Cara tratada: 8–12 horas', 'Ambiente húmedo: hasta 24 horas'],
      tips: ['Ventilar bien', 'Apoyar de pie por momentos', 'No cubrir hasta secado'],
    },
    products: [
      'Detergente suave hipoalergénico apto descanso.',
      'Tratamiento enzimático para manchas biológicas.',
      'Neutralizador de olores sin perfumes intensos.',
    ],
    machines: ['Kärcher Puzzi con control de caudal.', 'Boquilla para superficies planas.'],
    faqs: [
      { q: '¿Es seguro para alérgicos?', a: 'Sí, fórmulas hipoalergénicas y enjuague con extracción.' },
      { q: '¿Se puede dormir la misma noche?', a: 'Solo si está seco al tacto; de lo contrario, usar otra cama.' },
    ],
    presetMsg: 'Hola, quiero cotizar limpieza de colchón(es).',
  },
  alfombras: {
    title: 'Lavado de Alfombras',
    h1: 'Lavado de alfombras',
    cover: '/servicios/IMG_5673.jpg',
    seoDesc:
      'Lavado profesional de alfombras con inyección–succión Kärcher. Recupera colores, elimina polvo y olores.',
    importance: [
      'Elimina polvo acumulado y alérgenos.',
      'Realza colores y prolonga la vida de la fibra.',
      'Ideal con mascotas o niños.',
    ],
    procedure: [
      'Inspección, identificación de fibra y test de color.',
      'Aspirado profundo a contra y favor del pelo.',
      'Pre-tratamiento de manchas.',
      'Lavado con inyección–succión ajustando caudal.',
      'Alineado del pelo y recomendaciones de secado.',
    ],
    drying: {
      note: 'Según espesor/fibra; adaptamos el proceso.',
      times: ['Alfombra delgada: 6–10 horas', 'Alfombra gruesa: 12–24 horas'],
      tips: ['Ventilar', 'Evitar pisar mientras seca', 'Usar ventilador'],
    },
    products: [
      'Detergente pH controlado para alfombras.',
      'Desmanchadores compatibles (lana/sintético).',
      'Neutralizador de olores apto mascotas.',
    ],
    machines: [
      'Kärcher Puzzi con boquilla para suelos.',
      'Cepillos suaves para levantar el pelo (si procede).',
    ],
    faqs: [
      { q: '¿Se encoge?', a: 'Evitamos saturación y testeamos; en fibras naturales sensibles ajustamos método.' },
      { q: '¿Retiro/entrega?', a: 'En algunas zonas ofrecemos retiro/entrega. Consúltanos.' },
    ],
    presetMsg: 'Hola, quiero cotizar lavado de alfombras.',
  },
  vehiculos: {
    title: 'Limpieza de Tapices de Vehículos a Domicilio',
    h1: 'Limpieza de tapices de vehículos',
    cover: '/servicios/IMG_5942.jpg',
    seoDesc:
      'Limpieza interior de autos, SUV y camionetas con inyección–succión Kärcher. Asientos, alfombrillas y tapices libres de manchas, ácaros y olores.',
    importance: [
      'El interior concentra polvo, migas y humedad: es un foco silencioso de ácaros y bacterias.',
      'Elimina olores persistentes (comida, humo, mascotas, humedad) en vez de taparlos con perfume.',
      'Recupera el aspecto del tapiz y ayuda a mantener el valor de reventa del vehículo.',
    ],
    procedure: [
      'Inspección del interior y test de color en zona oculta.',
      'Aspirado profundo de asientos, respaldos, alfombrillas y maletero.',
      'Pre-tratamiento de manchas focalizadas (grasa, bebidas, barro).',
      'Limpieza con inyección–succión Kärcher, controlando el caudal para no saturar la espuma.',
      'Repaso de costuras y rieles, y ventilación final del habitáculo.',
    ],
    drying: {
      note: 'Trabajamos con caudal reducido justamente para que el auto quede utilizable el mismo día.',
      times: ['Asientos de tela: 3–6 horas', 'Interior completo: 6–10 horas'],
      tips: ['Dejar ventanas entreabiertas', 'Estacionar a la sombra con ventilación', 'No poner fundas hasta el secado'],
    },
    products: [
      'Detergente pH neutro para tapicería automotriz.',
      'Desmanchador enzimático para restos orgánicos y bebidas.',
      'Neutralizador de olores encapsulante, sin perfumes intensos.',
    ],
    machines: [
      'Kärcher Puzzi (inyección–succión) con boquilla de mano.',
      'Accesorios angostos para rieles, costuras y espacios entre asientos.',
    ],
    faqs: [
      { q: '¿Se moja mucho el asiento?', a: 'No. Regulamos el caudal y extraemos en el acto: el asiento queda húmedo al tacto, no empapado.' },
      { q: '¿Incluye alfombrillas y maletero?', a: 'Sí, van incluidos en la limpieza de interior. El asiento infantil se cotiza aparte.' },
      { q: '¿Van hasta donde está el auto?', a: 'Sí, trabajamos a domicilio. Solo necesitamos un enchufe cerca y espacio para abrir las puertas.' },
    ],
    presetMsg: 'Hola, quiero cotizar limpieza de tapices de mi vehículo.',
  },
  'alfombras-muro': {
    title: 'Limpieza de Pisos Alfombrados y Oficinas',
    h1: 'Limpieza de pisos alfombrados',
    cover: '/servicios/IMG_9245.jpg',
    seoDesc:
      "Limpieza e higienización de pisos alfombrados en oficinas, locales comerciales y empresas de la Región de O'Higgins. Cotización por m² y trabajo en horarios especiales.",
    importance: [
      'El alto tráfico incrusta la suciedad en la fibra: a partir de cierto punto, aspirar ya no basta.',
      'Un espacio de trabajo higienizado reduce alérgenos y mejora la percepción de tus clientes.',
      'La mantención periódica evita el desgaste prematuro y posterga el recambio completo de la alfombra.',
    ],
    procedure: [
      'Visita de evaluación y medición de la superficie en m².',
      'Aspirado profundo de toda el área y despeje de mobiliario liviano.',
      'Pre-tratamiento de accesos, pasillos y zonas de alto tráfico.',
      'Lavado con rotativa y/o inyección–succión, según el tipo de fibra y el nivel de suciedad.',
      'Extracción de humedad y peinado final de la fibra.',
    ],
    drying: {
      note: 'Coordinamos el trabajo fuera del horario laboral para que el espacio esté operativo al día siguiente.',
      times: ['Oficina ventilada: 6–12 horas', 'Superficie amplia o ambiente húmedo: 12–24 horas'],
      tips: ['Mantener ventilación cruzada', 'Reponer el mobiliario recién seco', 'Coordinar el lavado al cierre de jornada'],
    },
    products: [
      'Detergente de baja espuma para alfombra comercial.',
      'Desengrasante para accesos y zonas de alto tráfico.',
      'Encapsulante que retrasa el reensuciamiento.',
    ],
    machines: [
      'Rotativa de disco para fricción en fibra comercial.',
      'Kärcher Puzzi con boquilla de suelos para la extracción.',
    ],
    faqs: [
      { q: '¿Cómo se cobra este servicio?', a: 'Por metro cuadrado. El valor unitario baja a medida que crece la superficie: mientras más grande el trabajo, menor el precio por m².' },
      { q: '¿Pueden trabajar de noche o fin de semana?', a: 'Sí, es lo habitual en oficinas. Coordinamos el horario para no interrumpir la operación.' },
      { q: '¿Hay que mover los muebles?', a: 'Nosotros despejamos el mobiliario liviano. Para escritorios grandes o archivadores pesados lo coordinamos antes con tu equipo.' },
    ],
    presetMsg: 'Hola, quiero cotizar limpieza de piso alfombrado (por m²).',
  },
  escaleras: {
    title: 'Limpieza de Escaleras Alfombradas',
    h1: 'Limpieza de escaleras alfombradas',
    cover: '/servicios/IMG_8836.jpg',
    seoDesc:
      'Limpieza profunda de escaleras alfombradas peldaño por peldaño, con inyección–succión en huellas y contrahuellas.',
    importance: [
      'La escalera concentra el mayor tránsito de la casa: la fibra se ensucia más rápido que en cualquier otra alfombra.',
      'Las contrahuellas acumulan polvo y marcas de calzado que el aspirado doméstico no alcanza.',
      'Recuperar la fibra mejora el agarre del peldaño y la seguridad al bajar.',
    ],
    procedure: [
      'Inspección peldaño por peldaño y test de color.',
      'Aspirado profundo de huellas, contrahuellas y cantos.',
      'Pre-tratamiento de la zona de pisada y manchas puntuales.',
      'Inyección–succión con boquilla de mano en cada peldaño.',
      'Repaso de bordes, nariz del peldaño y zócalos.',
    ],
    drying: {
      note: 'Trabajamos de arriba hacia abajo para que puedas seguir usando parte de la escalera mientras seca.',
      times: ['Escalera estándar: 4–8 horas', 'Fibra gruesa o ambiente húmedo: 8–12 horas'],
      tips: ['Ventilar el hueco de escalera', 'Circular con calcetines limpios si es imprescindible', 'Apoyar con un ventilador en el descanso'],
    },
    products: [
      'Detergente pH controlado para alfombra de alto tráfico.',
      'Desengrasante focalizado para la zona de pisada.',
      'Neutralizador de olores apto para interiores.',
    ],
    machines: [
      'Kärcher Puzzi con boquilla de mano para peldaños.',
      'Cepillo manual para la nariz del peldaño y los cantos.',
    ],
    faqs: [
      { q: '¿Cómo se cobra?', a: 'Por tramo, según la cantidad de peldaños, con un valor por peldaño adicional si tu escalera supera el rango.' },
      { q: '¿Se puede usar la escalera mientras seca?', a: 'Preferimos que no durante las primeras horas. Si es la única vía de acceso, coordinamos el trabajo por tramos.' },
      { q: '¿Incluye el descanso o el pasillo superior?', a: 'El descanso se cotiza como superficie de piso alfombrado. Te lo indicamos al momento de evaluar.' },
    ],
    presetMsg: 'Hola, quiero cotizar limpieza de escalera alfombrada.',
  },
  sillas: {
    title: 'Limpieza de Sillas Tapizadas y Sitiales',
    h1: 'Limpieza de sillas tapizadas',
    cover: '/servicios/IMG_3507.jpg',
    seoDesc:
      'Lavado de sillas de comedor, sitiales y sillas de oficina con inyección–succión. Limpieza unidad por unidad y secado rápido.',
    importance: [
      'Las sillas de comedor reciben restos de comida y bebida a diario, incluso cuando se ven limpias.',
      'En oficinas es el mueble de contacto más constante: acumula sudor, polvo y grasitud.',
      'Al ser piezas pequeñas el secado es rápido y recuperas el juego completo el mismo día.',
    ],
    procedure: [
      'Revisión de cada unidad y test de color en la tela.',
      'Aspirado de asiento, respaldo y costuras.',
      'Pre-tratamiento de manchas de comida, bebida o grasa.',
      'Inyección–succión con boquilla de mano, pieza por pieza.',
      'Repaso de costuras y ventilación.',
    ],
    drying: {
      note: 'Al tratarse de superficies pequeñas, el secado es notoriamente más rápido que en un sillón.',
      times: ['Silla semi tapizada: 2–4 horas', 'Silla tapizada o sitial: 4–8 horas'],
      tips: ['Dejar las sillas separadas mientras secan', 'Ventilar el ambiente', 'No apilarlas hasta el secado al tacto'],
    },
    products: [
      'Detergente para tapicería pH neutro (hipoalergénico, biodegradable).',
      'Desmanchador específico para comidas y bebidas.',
      'Neutralizador de olores encapsulante.',
    ],
    machines: [
      'Kärcher Puzzi con boquilla de mano.',
      'Accesorio angosto para costuras y capitoné.',
    ],
    faqs: [
      { q: '¿Hay un mínimo de sillas?', a: 'No, pero al cobrarse por unidad conviene juntarlo con el juego completo de comedor o con otro servicio.' },
      { q: '¿Sirve para sillas de oficina?', a: 'Sí. Tratamos asiento y respaldo de tela; las partes plásticas se limpian aparte.' },
      { q: '¿Qué diferencia hay entre semi tapizada y tapizada?', a: 'La semi tapizada tiene solo el asiento acolchado; la tapizada incluye además el respaldo y, en algunos casos, los costados.' },
    ],
    presetMsg: 'Hola, quiero cotizar limpieza de sillas tapizadas.',
  },
  respaldos: {
    title: 'Limpieza de Respaldos de Cama Tapizados',
    h1: 'Limpieza de respaldos de cama',
    cover: '/servicios/IMG_54561.jpg',
    seoDesc:
      'Higienización de respaldos de cama tapizados, de 1 plaza a Queen/King. Eliminamos polvo, manchas y grasitud acumulada.',
    importance: [
      'El respaldo acumula polvo y grasitud del cabello noche tras noche, y casi nunca se limpia.',
      'Está a la altura de la cara: es una fuente directa de alérgenos mientras duermes.',
      'Domina visualmente el dormitorio; recuperar la tela cambia el ambiente completo.',
    ],
    procedure: [
      'Inspección de la tela y test de color en zona oculta.',
      'Aspirado profundo de la superficie, el capitoné y los bordes.',
      'Pre-tratamiento de la zona de apoyo de cabeza y manchas puntuales.',
      'Inyección–succión con caudal controlado, sin saturar el relleno.',
      'Repaso de costuras y ventilación.',
    ],
    drying: {
      note: 'Cuidamos el caudal porque el respaldo va montado al muro y ventila por una sola cara.',
      times: ['Respaldo estándar: 6–10 horas', 'Capitoné o tela gruesa: 10–14 horas'],
      tips: ['Separar la cama del muro mientras seca', 'Ventilar el dormitorio', 'No apoyar almohadas hasta el secado al tacto'],
    },
    products: [
      'Detergente suave hipoalergénico apto para dormitorio.',
      'Desengrasante suave para la zona de apoyo de cabeza.',
      'Neutralizador de olores sin perfumes intensos.',
    ],
    machines: [
      'Kärcher Puzzi con control de caudal.',
      'Boquilla de mano y accesorio angosto para capitoné y botones.',
    ],
    faqs: [
      { q: '¿Hay que desmontar el respaldo?', a: 'En general no. Trabajamos con la cama separada del muro; si el respaldo es desmontable, mejor aún.' },
      { q: '¿Conviene hacerlo junto con el colchón?', a: 'Sí, es lo más habitual: se higieniza el dormitorio completo en una sola visita.' },
      { q: '¿Sirve para capitoné con botones?', a: 'Sí, usamos accesorios angostos para llegar al hundido de cada botón.' },
    ],
    presetMsg: 'Hola, quiero cotizar limpieza de respaldo de cama.',
  },
  'pisos-duros': {
    title: 'Limpieza de Pisos Duros: Porcelanato, Cerámica y Flotantes',
    h1: 'Limpieza de pisos duros',
    cover: '/servicios/piso2.jpg',
    seoDesc:
      'Decapado, limpieza profunda, sellado, encerado acrílico y lustrado de pisos de porcelanato, cerámica, flotante, vinílico y madera. Cotización por m² para hogares, oficinas y locales.',
    importance: [
      'La cera vieja y los selladores degradados amarillean el piso y retienen la suciedad: por más que se trapee, la opacidad no se va.',
      'El decapado retira esas capas acumuladas y deja la superficie limpia de verdad, no solo por encima.',
      'Un piso sellado y encerado resiste mejor el tránsito, se limpia más fácil y posterga el desgaste del material.',
    ],
    procedure: [
      'Inspección del piso: tipo de material, estado de la superficie y capas previas de cera o sellador.',
      'Despeje del área y protección de zócalos, uniones y mobiliario fijo.',
      'Decapado con removedor alcalino y rotativa, dejando actuar el producto para disolver ceras y selladores antiguos.',
      'Limpieza profunda y extracción del residuo, incluyendo fraguas, cantos y esquinas.',
      'Enjuague y secado completo: ningún tratamiento se aplica sobre un piso húmedo.',
      'Sellado de la superficie con el producto que corresponda al material.',
      'Encerado acrílico en varias manos, respetando el secado entre cada una (solo interiores).',
      'Lustrado final con rotativa para levantar el brillo parejo.',
    ],
    drying: {
      note: 'Cada etapa exige el piso seco antes de la siguiente, por eso el trabajo se planifica por sectores y podemos dejar zonas transitables.',
      times: ['Cera acrílica: 2–4 horas por mano', 'Tránsito liviano: 6–8 horas', 'Muebles y tránsito normal: 24 horas'],
      tips: ['No mojar el piso las primeras 24 horas', 'Ventilar el ambiente', 'Reponer los muebles con protectores en las patas'],
    },
    products: [
      'Decapante alcalino removedor de ceras y selladores antiguos.',
      'Detergente neutro para la limpieza profunda posterior.',
      'Sellador base para superficies porosas (cerámica, porcelanato mate).',
      'Cera acrílica metalizada de alto tránsito, para interiores.',
      'Vitrificante resistente a intemperie, para exteriores donde la cera no aplica.',
    ],
    machines: [
      'Rotativa de disco para decapado y lustrado.',
      'Aspiradora de sólidos y líquidos para la extracción del residuo.',
      'Boquilla de superficie dura para limpieza y enjuague a presión.',
      'Discos de distinto grado según la etapa y el material del piso.',
    ],
    faqs: [
      { q: '¿Qué tipos de piso trabajan?', a: 'Porcelanato, cerámica, flotante, vinílico y madera. El tratamiento final cambia según el material: no todos admiten cera, y en esos casos usamos sellador.' },
      { q: '¿Los pisos exteriores también se enceran?', a: 'No. La cera no resiste la intemperie ni el sol y termina amarilleando o poniéndose resbalosa. En exteriores aplicamos sellado con vitrificante, que protege la superficie sin ese problema.' },
      { q: '¿Cuándo conviene decapar y cuándo basta con limpiar?', a: 'Si el piso tiene capas de cera acumuladas, se ve amarillento o quedó opaco de forma pareja, corresponde decapar. Si solo está sucio, con la limpieza profunda es suficiente. Lo definimos en la visita.' },
      { q: '¿Cómo se cobra el servicio?', a: 'Por metro cuadrado, según el estado del piso y los tratamientos que incluya. Evaluamos la superficie y entregamos el valor antes de empezar.' },
      { q: '¿El piso flotante y la madera se pueden mojar?', a: 'Se trabajan con humedad controlada y productos específicos, justamente para no levantar las juntas ni dañar el laminado. No usamos el mismo método que en cerámica.' },
    ],
    presetMsg: 'Hola, quiero cotizar limpieza de pisos duros (por m²).',
  },
} as const;

type SlugKey = keyof typeof SLUGS;
type PageProps = { params: { slug: SlugKey } };

export function generateStaticParams() {
  return Object.keys(SLUGS).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const cfg = SLUGS[params.slug];
  if (!cfg) return {};
  return {
    title: cfg.title,
    description: cfg.seoDesc,
    alternates: { canonical: `/servicios/${params.slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title: cfg.title,
      description: cfg.seoDesc,
      images: cfg.cover ? [{ url: cfg.cover, width: 1200, height: 630 }] : undefined,
      url: `/servicios/${params.slug}`,
      type: 'article',
    },
  };
}

const WaIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

export default function ServicioPage({ params }: PageProps) {
  const cfg = SLUGS[params.slug];
  if (!cfg) return notFound();

  const waMsg = `LimpiaBien — ${cfg.h1}\n${cfg.presetMsg}`;
  const waHref = buildWaLink(waMsg);
  // Mismo orden que el catálogo (data/catalog.ts), igual que la home y el cotizador.
  const ordenCatalogo = CATEGORIES.map((c) => c.slug);
  const otros = (Object.keys(SLUGS) as SlugKey[])
    .filter((k) => k !== params.slug)
    .sort((a, b) => {
      const ia = ordenCatalogo.indexOf(a);
      const ib = ordenCatalogo.indexOf(b);
      return (ia === -1 ? Number.MAX_SAFE_INTEGER : ia) - (ib === -1 ? Number.MAX_SAFE_INTEGER : ib);
    });

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://limpiabien.cl/' },
      { '@type': 'ListItem', position: 2, name: 'Servicios', item: 'https://limpiabien.cl/#servicios' },
      { '@type': 'ListItem', position: 3, name: cfg.h1, item: `https://limpiabien.cl/servicios/${params.slug}` },
    ],
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: cfg.h1,
    provider: { '@type': 'Organization', name: 'LimpiaBien', url: 'https://limpiabien.cl', logo: 'https://limpiabien.cl/logo-512.png' },
    areaServed: ['Nancagua','Placilla', 'Santa Cruz', 'San Fernando', 'Chimbarongo', 'Chépica'],
    description: cfg.seoDesc,
  };

  return (
    <>
      <SiteHeader />
      <main className={s.svc}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

        {/* HERO */}
        <section className={s.hero}>
          <div className="band-inner">
            <div className={s.heroGrid}>
              <div>
                <nav className={s.breadcrumb} aria-label="Ruta de navegación">
                  <ol>
                    <li><Link href="/">Inicio</Link></li>
                    <li><Link href="/#servicios">Servicios</Link></li>
                    <li><span aria-current="page">{cfg.h1}</span></li>
                  </ol>
                </nav>
                <span className="hero-label">Servicio profesional</span>
                <h1 className={s.heroTitle}>{cfg.h1}</h1>
                <p className="hero-body">{cfg.seoDesc}</p>
                <div className="hero-actions">
                  <Link className="btn btn-cta btn-lg" href={waHref} target="_blank" rel="noopener nofollow">
                    <WaIcon />
                    Cotizar por WhatsApp
                  </Link>
                  <Link className="btn btn-outline btn-lg" href="/cotizar">Ver precios</Link>
                </div>
              </div>
              {cfg.cover && (
                <div className={s.heroImg}>
                  <Image src={cfg.cover} width={960} height={640} alt={cfg.h1} priority />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* POR QUÉ IMPORTA */}
        <section className="services-section band-white">
          <div className="band-inner">
            <div className="section-head">
              <span className="section-eyebrow">Por qué importa</span>
              <h2 className="section-title">Beneficios <em>reales</em> de una limpieza profunda</h2>
            </div>
            <div className="whyus-grid">
              {cfg.importance.map((b, i) => (
                <div key={i} className="whyus-item">
                  <div className="whyus-icon"><CheckIcon /></div>
                  <p className="whyus-desc">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCEDIMIENTO */}
        <section className="services-section">
          <div className="band-inner">
            <div className="section-head">
              <span className="section-eyebrow">Paso a paso</span>
              <h2 className="section-title">El <em>procedimiento</em> que realizamos</h2>
            </div>
            <ol className={s.steps}>
              {cfg.procedure.map((p, i) => (
                <li key={i}>
                  <span className={s.stepNum}>{i + 1}</span>
                  <div className={s.stepBody}>{p}</div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* SECADO */}
        <section className="services-section band-white">
          <div className="band-inner">
            <div className="section-head">
              <span className="section-eyebrow">Después del servicio</span>
              <h2 className="section-title">Tiempos de <em>secado</em></h2>
            </div>
            <p className={s.note}>{cfg.drying.note}</p>
            <ul className={s.cards}>
              {cfg.drying.times.map((t, i) => <li key={i} className={s.card}>{t}</li>)}
            </ul>
            <p className={s.tips}>Consejos: {cfg.drying.tips.join(' • ')}</p>
          </div>
        </section>

        {/* PRODUCTOS Y MAQUINARIA */}
        <section className="services-section">
          <div className="band-inner">
            <div className="section-head">
              <span className="section-eyebrow">Con qué trabajamos</span>
              <h2 className="section-title">Productos seguros y equipos <em>profesionales</em></h2>
            </div>
            <div className={s.grid2}>
              <div>
                <h3 className={s.colTitle}>Productos que utilizamos</h3>
                <ul className={s.bullets}>{cfg.products.map((p, i) => <li key={i}>{p}</li>)}</ul>
              </div>
              <div>
                <h3 className={s.colTitle}>Maquinaria</h3>
                <ul className={s.bullets}>{cfg.machines.map((m, i) => <li key={i}>{m}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="services-section band-white">
          <div className="band-inner">
            <div className="section-head">
              <span className="section-eyebrow">Dudas frecuentes</span>
              <h2 className="section-title">Preguntas <em>frecuentes</em></h2>
            </div>
            <div className={s.narrow}>
              {cfg.faqs.map((f, i) => (
                <details key={i} className="faq-item">
                  <summary>
                    {f.q}
                    <span className="faq-toggle" aria-hidden="true">+</span>
                  </summary>
                  <div className="faq-answer">{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* OTROS SERVICIOS */}
        <section className="services-section">
          <div className="band-inner">
            <div className="section-head">
              <span className="section-eyebrow">Seguir explorando</span>
              <h2 className="section-title">Otros <em>servicios</em></h2>
            </div>
            <div className="services-grid">
              {otros.map((k) => (
                <article key={k} className="service-card">
                  <div className="service-card-img" style={{ backgroundImage: `url('${SLUGS[k].cover}')` }} />
                  <div className="service-card-body">
                    <div className="service-card-title">{SLUGS[k].h1}</div>
                    <div className="service-card-actions">
                      <Link
                        href={`/servicios/${k}`}
                        className="service-card-link"
                        aria-label={`Ver detalle de ${SLUGS[k].h1}`}
                      >
                        Ver detalle →
                      </Link>
                      <Link
                        href={`/cotizar#cat-${k}`}
                        className="btn btn-cta btn-sm"
                        aria-label={`Cotizar ${SLUGS[k].h1}`}
                      >
                        Cotizar
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="cta-final" aria-labelledby="cta-title">
          <h2 id="cta-title" className="cta-final-title">
            ¿Listo para tu próxima<br /><em>limpieza profesional?</em>
          </h2>
          <p className="cta-final-sub">
            Escríbenos por WhatsApp y coordinamos día y hora. Te ayudamos a elegir la mejor opción para tu caso.
          </p>
          <div className="cta-final-actions">
            <Link className="btn btn-cta btn-lg" href={waHref} target="_blank" rel="noopener nofollow">
              <WaIcon />
              Cotizar por WhatsApp
            </Link>
            <Link className="btn btn-outline btn-lg" href="/cotizar">Armar mi cotización</Link>
          </div>
          <div className="cta-final-trust">
            <span>Productos seguros</span>
            <span>Sin cargo por visita</span>
            <span>Respuesta rápida</span>
          </div>
        </section>
      </main>

      <footer className="site-footer" role="contentinfo">
        <span className="footer-brand">LimpiaBien</span>
        <span>San Fernando · Santa Cruz · Chimbarongo · Chépica · Nancagua · Palmilla · Placilla · Peralillo</span>
        <span>© {new Date().getFullYear()} LimpiaBien</span>
      </footer>
    </>
  );
}
