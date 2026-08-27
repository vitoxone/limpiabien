/**
 * Ciudades con landing propia en /web-para-pymes/[ciudad].
 *
 * El desarrollo web es 100% remoto para todo Chile — estas páginas existen
 * porque es en O'Higgins donde LimpiaBien ya tiene presencia y donde la
 * búsqueda "página web para pymes <ciudad>" tiene intención comercial real.
 *
 * Cada entrada necesita contenido propio (contexto económico, rubros locales
 * y FAQ específicas). Si agregas una ciudad sin diferenciarla, Google la trata
 * como doorway page y perjudica al resto: es preferible tener menos y mejores.
 *
 * Al agregar o quitar una ciudad hay que actualizar `app/sitemap.ts`.
 */

export type CiudadWeb = {
  /** Slug de la URL: /web-para-pymes/<slug> */
  slug: string;
  /** Nombre tal como se escribe en el texto */
  nombre: string;
  /** Provincia — se usa en el JSON-LD y en el subtítulo */
  provincia: 'Cachapoal' | 'Colchagua' | 'Cardenal Caro';
  /** Frase corta que sigue al H1 */
  gancho: string;
  /** Párrafo de contexto local — es lo que diferencia esta página de las demás */
  contexto: string;
  /** Rubros con peso real en esa comuna, en orden de relevancia */
  rubros: string[];
  /** Pregunta + respuesta propias de la ciudad */
  faqLocal: { q: string; a: string };
  /** Slugs de ciudades cercanas, para enlazado interno */
  cerca: string[];
};

export const CIUDADES_WEB: CiudadWeb[] = [
  {
    slug: 'san-fernando',
    nombre: 'San Fernando',
    provincia: 'Colchagua',
    gancho: 'La capital de Colchagua, y donde más pymes de servicios compiten por el mismo cliente.',
    contexto:
      'San Fernando concentra el comercio y los servicios de toda la provincia: es donde llega el que vive en Chimbarongo, en Placilla o en Nancagua cuando necesita un taller, un contratista o una peluquería. Eso significa competencia real. Cuando alguien busca "gasfíter en San Fernando" desde el celular, los primeros tres resultados se llevan casi todas las llamadas, y ahí no hay suerte: hay una página bien armada o no la hay. Estar sobre la Ruta 5 también trae clientes de paso que no te conocen de nombre y sólo te van a encontrar buscando.',
    rubros: [
      'Talleres mecánicos', 'Contratistas y remodelación', 'Gasfitería y electricidad',
      'Peluquería y barbería', 'Fletes y mudanzas', 'Centros médicos y dentales',
      'Escuelas de conducción', 'Cerrajería',
    ],
    faqLocal: {
      q: '¿Sirve si mi pyme de San Fernando ya tiene ficha en Google?',
      a: 'Sirve y se potencian. La ficha de Google Business te muestra en el mapa, pero no explica tus servicios ni tus precios, y no deja al cliente armar un pedido. El sitio hace eso, y además le da a Google contenido que leer sobre ti: las dos cosas juntas rinden mucho más que la ficha sola.',
    },
    cerca: ['chimbarongo', 'placilla', 'nancagua', 'santa-cruz'],
  },
  {
    slug: 'santa-cruz',
    nombre: 'Santa Cruz',
    provincia: 'Colchagua',
    gancho: 'Turismo enológico todo el año: acá tu cliente te busca antes de llegar a la ciudad.',
    contexto:
      'Santa Cruz vive del valle de Colchagua, y eso le cambia el problema a las pymes locales. Buena parte de tus clientes no son vecinos: son personas que están planificando un fin de semana desde Santiago y que deciden por internet, con semanas de anticipación, a quién le van a comprar. Si tu negocio no aparece cuando esa persona busca, ya perdiste antes de que llegue. Para hotelería, servicios a viñas y todo lo que rodea al turismo, el sitio no es un adorno: es el único lugar donde te ven antes de decidir.',
    rubros: [
      'Hotelería y cabañas', 'Restaurantes y catering', 'Tours y transporte de pasajeros',
      'Servicios a viñas', 'Fotografía y eventos', 'Jardinería y paisajismo',
      'Limpieza y mantención', 'Arriendo de equipos',
    ],
    faqLocal: {
      q: 'Mis clientes son de Santiago, no de Santa Cruz. ¿Igual me conviene?',
      a: 'Más todavía. Al vecino lo consigues por recomendación; al que viene de Santiago sólo lo consigues si te encuentra buscando. El sitio se arma para responder esa búsqueda de fuera, y se puede dejar preparado para que reciba consultas con fecha y cantidad de personas ya definidas.',
    },
    cerca: ['palmilla', 'chepica', 'peralillo', 'nancagua'],
  },
  {
    slug: 'chimbarongo',
    nombre: 'Chimbarongo',
    provincia: 'Colchagua',
    gancho: 'La capital del mimbre: si vendes algo hecho a mano, tienes que poder mostrarlo.',
    contexto:
      'En Chimbarongo el oficio se vende mirando. Mimbre, muebles, terminaciones, trabajo a pedido: nada de eso se explica bien por teléfono, y una foto suelta en una historia de Instagram desaparece en 24 horas. Un sitio propio te deja tener el catálogo ordenado, con fotos que quedan y con los tiempos de fabricación explicados de una vez, para no repetirlos en cada mensaje. Y a quien busca "muebles de mimbre" desde otra región, te lo pone al alcance sin depender de una feria ni de un puesto en la carretera.',
    rubros: [
      'Mimbre y artesanía', 'Mueblería y carpintería', 'Tapicería y restauración',
      'Contratistas y terminaciones', 'Agrícola y maquinaria', 'Fletes',
      'Talleres mecánicos', 'Comercio local',
    ],
    faqLocal: {
      q: 'Vendo productos hechos a pedido, no servicios. ¿Igual funciona?',
      a: 'Sí. El cotizador se adapta: en vez de servicios con precio fijo, el cliente elige medidas, materiales y cantidad, y te llega el pedido armado por WhatsApp. Es el mismo mecanismo, cambia lo que se elige.',
    },
    cerca: ['san-fernando', 'placilla', 'nancagua', 'santa-cruz'],
  },
  {
    slug: 'nancagua',
    nombre: 'Nancagua',
    provincia: 'Colchagua',
    gancho: 'Nuestra base. Desde acá salió este mismo sitio.',
    contexto:
      'Nancagua es donde está LimpiaBien y donde armamos el sitio que estás mirando. Es una comuna chica, y en las comunas chicas la primera reacción suele ser "acá todos me conocen, para qué quiero página". El punto es justamente ese: el negocio ya no está sólo en Nancagua. Con un sitio bien hecho el mismo taller o el mismo servicio a domicilio empieza a recibir consultas de San Fernando, de Santa Cruz y de Chimbarongo, que es donde está el volumen. Salir de la comuna no requiere mudarse; requiere que te encuentren.',
    rubros: [
      'Servicios a domicilio', 'Agrícola y temporeros', 'Construcción y contratistas',
      'Fletes', 'Peluquería y belleza', 'Talleres y soldadura',
      'Jardinería', 'Comercio local',
    ],
    faqLocal: {
      q: 'En Nancagua todos me conocen. ¿Para qué quiero un sitio?',
      a: 'Para dejar de depender de que te conozcan. El boca a boca tiene un techo del tamaño de la comuna: cuando lo tocas, la única forma de crecer es que te encuentre gente de afuera. Eso es exactamente lo que hace un sitio bien posicionado.',
    },
    cerca: ['santa-cruz', 'chepica', 'placilla', 'san-fernando'],
  },
  {
    slug: 'chepica',
    nombre: 'Chépica',
    provincia: 'Colchagua',
    gancho: 'Comuna agrícola con poca competencia digital: aparecer primero cuesta menos.',
    contexto:
      'En Chépica hay algo que en Rancagua ya no existe: espacio. Muy pocas pymes de la comuna tienen un sitio propio, así que posicionarse para "servicio en Chépica" es bastante más barato y rápido que pelear la misma palabra en una ciudad grande. Es una ventaja con fecha de vencimiento, porque se va cerrando a medida que los demás se suben. Para el negocio agrícola y de servicios que ya trabaja con clientes de Santa Cruz y San Fernando, es la forma más económica de ganar terreno.',
    rubros: [
      'Agrícola y viñas', 'Maquinaria y arriendo', 'Construcción y contratistas',
      'Servicios a domicilio', 'Fletes', 'Talleres mecánicos',
      'Jardinería', 'Comercio local',
    ],
    faqLocal: {
      q: '¿Tiene sentido posicionarse en una comuna tan chica?',
      a: 'Sí, y por dos razones. Una: las búsquedas de Chépica tienen poquísima competencia, así que se ganan rápido. Dos: el sitio no se limita a Chépica — se arma también para las comunas donde ya trabajas, que es donde está el resto del volumen.',
    },
    cerca: ['nancagua', 'santa-cruz', 'placilla', 'san-fernando'],
  },
  {
    slug: 'palmilla',
    nombre: 'Palmilla',
    provincia: 'Colchagua',
    gancho: 'A minutos de Santa Cruz, en pleno valle: el turismo pasa por tu puerta.',
    contexto:
      'Palmilla está metida en la ruta del vino y a pocos minutos de Santa Cruz, lo que la deja en una posición rara: recibe el flujo del turismo de Colchagua, pero casi nadie la busca por nombre. Para una pyme local eso significa que la pelea no es por "Palmilla" — es por aparecer cuando alguien busca el servicio en el valle, sin importar la comuna. Un sitio bien armado se posiciona para las dos cosas a la vez, y de paso te saca de la lista de negocios que sólo existen si pasas por delante.',
    rubros: [
      'Servicios a viñas', 'Hotelería y cabañas', 'Agrícola y maquinaria',
      'Fletes y transporte', 'Jardinería y paisajismo', 'Construcción',
      'Catering y eventos', 'Comercio local',
    ],
    faqLocal: {
      q: 'Casi nadie busca "Palmilla" en Google. ¿Cómo me encuentran?',
      a: 'Por el servicio y por el valle, no sólo por la comuna. La página se arma para responder también a búsquedas de Santa Cruz y de Colchagua, que es donde está el volumen real, y Palmilla queda como refuerzo de cercanía.',
    },
    cerca: ['santa-cruz', 'peralillo', 'nancagua', 'chepica'],
  },
  {
    slug: 'placilla',
    nombre: 'Placilla',
    provincia: 'Colchagua',
    gancho: 'Pegada a San Fernando: tus clientes están en las dos comunas.',
    contexto:
      'Placilla funciona en la práctica como parte del área de San Fernando: mucha pyme local tiene el taller acá y la mitad de los clientes allá. El error habitual es armar la comunicación pensando sólo en la comuna donde está el local, y quedar invisible en la ciudad donde de verdad está la demanda. El sitio se arma al revés: cubre las dos, y deja claro desde el primer párrafo que atiendes en ambas sin que el cliente tenga que preguntarlo.',
    rubros: [
      'Talleres y servicios técnicos', 'Construcción y contratistas', 'Agrícola',
      'Fletes', 'Gasfitería y electricidad', 'Jardinería',
      'Servicios a domicilio', 'Comercio local',
    ],
    faqLocal: {
      q: 'Estoy en Placilla pero atiendo en San Fernando. ¿Cómo se maneja?',
      a: 'Se trabajan las dos comunas en el mismo sitio, con una página por zona de atención. Así apareces tanto para quien busca en Placilla como para quien busca en San Fernando, sin tener que mentir sobre dónde estás ubicado.',
    },
    cerca: ['san-fernando', 'chimbarongo', 'nancagua', 'chepica'],
  },
  {
    slug: 'peralillo',
    nombre: 'Peralillo',
    provincia: 'Colchagua',
    gancho: 'Puerta al valle bajo y a Apalta: clientes de viñas y de turismo.',
    contexto:
      'Peralillo está en el tramo del valle que baja hacia la costa, con las viñas de Apalta al lado y un flujo turístico que crece cada temporada. Las pymes de acá suelen mezclar dos clientes muy distintos: la empresa agrícola que contrata todo el año y el visitante que aparece en verano y decide por internet. Son dos formas de vender que en un sitio conviven bien — una sección para el cliente que ya te conoce y necesita cotizar rápido, otra para el que llega buscando y necesita convencerse.',
    rubros: [
      'Servicios a viñas', 'Agrícola y maquinaria', 'Hotelería y cabañas',
      'Transporte y fletes', 'Construcción', 'Jardinería',
      'Catering y eventos', 'Comercio local',
    ],
    faqLocal: {
      q: 'Tengo clientes de empresa y clientes turistas. ¿Se puede en un solo sitio?',
      a: 'Sí, y conviene. Se arma un camino para cada uno: el cliente de empresa entra directo a cotizar, y el visitante encuentra primero las fotos y la explicación del servicio. Mismo sitio, dos entradas.',
    },
    cerca: ['palmilla', 'santa-cruz', 'chepica', 'nancagua'],
  },
  {
    slug: 'rancagua',
    nombre: 'Rancagua',
    provincia: 'Cachapoal',
    gancho: 'La capital regional: acá el que no aparece en Google, no existe.',
    contexto:
      'Rancagua es el mercado más grande de O’Higgins y también el más duro. Hay decenas de pymes ofreciendo lo mismo que tú, y el cliente resuelve en el celular en menos de un minuto: busca, mira los primeros resultados, escribe por WhatsApp al que le inspiró más confianza. Ganar esa comparación no depende de tener el precio más bajo, sino de ser el único de la lista que muestra trabajos reales, explica cómo cobra y deja pedir la cotización sin tener que llamar. Con la actividad de El Teniente y la industria alrededor, además, hay demanda de servicios a empresa que casi nunca llega por recomendación: llega buscando.',
    rubros: [
      'Servicios a empresas y minería', 'Contratistas y remodelación', 'Gasfitería y electricidad',
      'Talleres mecánicos', 'Limpieza y mantención', 'Climatización',
      'Fletes y mudanzas', 'Centros médicos y dentales',
    ],
    faqLocal: {
      q: 'En Rancagua hay mucha competencia. ¿Igual puedo posicionarme?',
      a: 'Sí, pero no peleando la palabra más genérica. La estrategia es ir por búsquedas específicas — el servicio exacto más el sector de la ciudad o el tipo de cliente — donde la competencia es mucho menor y la intención de compra bastante más alta.',
    },
    cerca: ['machali', 'graneros', 'requinoa', 'rengo'],
  },
  {
    slug: 'machali',
    nombre: 'Machalí',
    provincia: 'Cachapoal',
    gancho: 'La comuna que más creció: barrios nuevos que necesitan de todo.',
    contexto:
      'Machalí lleva años creciendo en condominios y barrios nuevos, y eso genera una demanda muy concreta: casas recién entregadas que necesitan cierres, jardines, climatización, muebles a medida y mantención. Ese cliente es distinto al de siempre — llegó hace poco, no tiene un maestro de confianza y no conoce a nadie del rubro en la zona. Busca todo por internet y compara antes de escribir. Es probablemente el cliente más fácil de ganar con un sitio bien hecho en toda la región, porque no tiene una recomendación previa que te haga competencia.',
    rubros: [
      'Jardinería y paisajismo', 'Climatización', 'Contratistas y remodelación',
      'Muebles a medida', 'Piscinas y mantención', 'Cerrajería y cierres perimetrales',
      'Aseo y limpieza', 'Servicios a condominios',
    ],
    faqLocal: {
      q: '¿Sirve para llegar a los condominios de Machalí?',
      a: 'Es de lo que mejor funciona. En los condominios la recomendación circula por grupos de WhatsApp, y lo que se comparte ahí es un enlace. Tener un sitio propio hace que ese enlace muestre tus servicios y tus trabajos, en vez de un número suelto sin contexto.',
    },
    cerca: ['rancagua', 'requinoa', 'graneros', 'rengo'],
  },
  {
    slug: 'rengo',
    nombre: 'Rengo',
    provincia: 'Cachapoal',
    gancho: 'Agroindustria y comercio sobre la Ruta 5, con clientes de toda la provincia.',
    contexto:
      'Rengo mezcla agroindustria, comercio y una posición privilegiada sobre la Ruta 5, lo que le da a las pymes locales un radio de clientes bastante más ancho que la comuna. El proveedor de servicios que trabaja para packing, para transporte o para empresas agrícolas se enfrenta a un cliente que compara formalmente: quiere ver a quién le compra antes de pedir una cotización. Un sitio que muestre trabajos, capacidad y forma de cobrar te deja jugar en esa liga sin necesidad de tener una oficina comercial.',
    rubros: [
      'Servicios a agroindustria', 'Mantención industrial', 'Transporte y fletes',
      'Contratistas y construcción', 'Talleres mecánicos', 'Limpieza y sanitización',
      'Gasfitería y electricidad', 'Comercio local',
    ],
    faqLocal: {
      q: 'Le vendo a empresas, no a personas. ¿Cambia algo?',
      a: 'Cambia el tono, no el mecanismo. Se le da más peso a lo que una empresa evalúa: capacidad, experiencia comprobable, forma de cobrar y datos para emitir la orden de compra. El contacto puede seguir siendo WhatsApp o pasar a un correo formal, como prefieras.',
    },
    cerca: ['requinoa', 'rancagua', 'san-vicente', 'machali'],
  },
  {
    slug: 'san-vicente',
    nombre: 'San Vicente de Tagua Tagua',
    provincia: 'Cachapoal',
    gancho: 'Centro agrícola del Cachapoal, con demanda estable todo el año.',
    contexto:
      'San Vicente es uno de los polos agrícolas fuertes de la provincia, con packing, huertos y toda la cadena de servicios que eso arrastra. Es un mercado donde la demanda no depende de la temporada turística sino del calendario productivo, lo que da algo poco común: clientes que vuelven. Para esas pymes el sitio cumple una función distinta a la de captar desconocidos — sirve para que el cliente que ya te compra pueda cotizar solo, sin llamarte, y para que quien te está evaluando por primera vez vea con quién más trabajas.',
    rubros: [
      'Servicios agrícolas', 'Maquinaria y arriendo', 'Transporte y fletes',
      'Mantención y talleres', 'Construcción y galpones', 'Limpieza industrial',
      'Riego y bombas', 'Comercio local',
    ],
    faqLocal: {
      q: 'Mis clientes me llaman por teléfono hace años. ¿Para qué cambiar?',
      a: 'No se trata de cambiar el teléfono por el sitio, sino de sacarte trabajo repetido. Que el cliente de siempre entre, arme su pedido y te llegue listo te devuelve horas de la semana — y de paso deja el catálogo escrito para el cliente nuevo que todavía no te conoce.',
    },
    cerca: ['rengo', 'rancagua', 'requinoa', 'machali'],
  },
  {
    slug: 'requinoa',
    nombre: 'Requínoa',
    provincia: 'Cachapoal',
    gancho: 'Viñas y agroindustria entre Rancagua y Rengo.',
    contexto:
      'Requínoa vive del vino y del agro, y está justo entre Rancagua y Rengo, que son los dos mercados más grandes de la provincia. Para una pyme de servicios eso es una ventaja concreta: tu radio real de trabajo es mucho más grande que tu comuna. El problema es que casi nadie lo comunica — la mayoría se presenta como "de Requínoa" y pierde al cliente de Rancagua que asume que quedas lejos. El sitio se arma para dejar explícito hasta dónde llegas, que suele ser lo único que faltaba.',
    rubros: [
      'Servicios a viñas', 'Agrícola y maquinaria', 'Mantención industrial',
      'Transporte y fletes', 'Construcción', 'Jardinería y paisajismo',
      'Talleres mecánicos', 'Limpieza',
    ],
    faqLocal: {
      q: 'Atiendo en varias comunas. ¿Se puede posicionar en todas?',
      a: 'Sí. Se hace una página por zona de atención, cada una con su propio texto, en vez de una sola que las nombre a todas de pasada. Es exactamente lo que estás viendo en este sitio, y es lo que Google premia.',
    },
    cerca: ['rancagua', 'rengo', 'machali', 'san-vicente'],
  },
  {
    slug: 'graneros',
    nombre: 'Graneros',
    provincia: 'Cachapoal',
    gancho: 'Zona industrial en la entrada norte de la región.',
    contexto:
      'Graneros es la puerta norte de O’Higgins y tiene un perfil más industrial que el resto de la provincia, con plantas, bodegas y logística. Eso trae un tipo de cliente que decide por escrito: cotiza, compara y necesita respaldo antes de contratar. Además, la cercanía con la Región Metropolitana pone a las pymes locales a competir con proveedores de Santiago, que llegan con sitio, catálogo y presentación. Sin nada equivalente, la comparación se pierde antes de empezar, aunque el servicio sea mejor y más barato.',
    rubros: [
      'Servicios industriales', 'Mantención y talleres', 'Transporte y logística',
      'Construcción y galpones', 'Limpieza industrial', 'Seguridad y cierres',
      'Gasfitería y electricidad', 'Comercio local',
    ],
    faqLocal: {
      q: 'Compito con proveedores de Santiago. ¿Un sitio me ayuda?',
      a: 'Bastante, porque nivela la comparación. El comprador que te evalúa junto a un proveedor de Santiago quiere ver lo mismo de los dos, y tu ventaja real — estar al lado y responder el mismo día — sólo cuenta si él la ve escrita en alguna parte.',
    },
    cerca: ['rancagua', 'machali', 'requinoa', 'rengo'],
  },
  {
    slug: 'pichilemu',
    nombre: 'Pichilemu',
    provincia: 'Cardenal Caro',
    gancho: 'Turismo y surf: el 100% de tus clientes te busca antes de llegar.',
    contexto:
      'Pichilemu es el caso extremo de la región. Tu cliente no vive acá, no pasa por delante de tu local y no te va a conocer por recomendación de un vecino: está en Santiago o en Rancagua planificando el fin de semana, y elige por internet días o semanas antes de subirse al auto. Si no apareces en esa búsqueda, simplemente no participaste. Y con una temporada tan marcada, cada semana de verano que pasas invisible no se recupera después.',
    rubros: [
      'Cabañas y hospedaje', 'Restaurantes y cafeterías', 'Escuelas de surf y arriendo',
      'Tours y transporte', 'Fotografía', 'Aseo y mantención de cabañas',
      'Construcción y terminaciones', 'Comercio y artesanía',
    ],
    faqLocal: {
      q: 'Trabajo sólo en temporada. ¿Conviene igual?',
      a: 'Conviene, pero conviene hacerlo antes. Posicionarse en Google toma unos meses, así que un sitio publicado en enero llega tarde para ese verano. Lo que rinde es tenerlo andando en el invierno, para que la temporada te agarre ya arriba en los resultados.',
    },
    cerca: ['santa-cruz', 'peralillo', 'palmilla', 'chepica'],
  },
];

/**
 * Búsquedas long-tail que la landing de cada ciudad intenta capturar.
 *
 * Se derivan del nombre y de los rubros con más peso local, así que la lista
 * cambia de una ciudad a otra: es parte de lo que evita que las páginas se
 * lean como copias entre sí. También le sirve al visitante, que ve escrito
 * exactamente por qué búsquedas va a competir su sitio.
 */
export function busquedasDe(c: CiudadWeb): string[] {
  const [r1, r2, r3] = c.rubros;
  const enMinuscula = (r: string) => r.split(' y ')[0].toLowerCase();
  return [
    `página web para pymes ${c.nombre}`,
    `diseño web ${c.nombre}`,
    `página web para ${enMinuscula(r1)} en ${c.nombre}`,
    `cuánto cuesta una página web en ${c.nombre}`,
    `sitio web con cotizador ${c.nombre}`,
    `página web para ${enMinuscula(r2)} ${c.nombre}`,
    `hacer página web para mi negocio ${c.nombre}`,
    `${enMinuscula(r3)} ${c.nombre} página web`,
  ];
}

export const CIUDADES_WEB_SLUGS = CIUDADES_WEB.map((c) => c.slug);

export function getCiudadWeb(slug: string): CiudadWeb | undefined {
  return CIUDADES_WEB.find((c) => c.slug === slug);
}
