// data/catalog.ts
export type CatalogItem = {
  id: string;
  title: string;
  price: number;
  show_public: boolean;
};

export type CatalogCategory = {
  slug: string;
  name: string;
  domicilio?: boolean;
  description?: string;
  items: CatalogItem[];
};

export const CATEGORIES: CatalogCategory[] = [
  {
    slug: 'pisos-duros',
    name: 'Pisos duros',
    domicilio: true,
    description: 'Decapado, limpieza profunda, sellado, encerado acrílico y lustrado. Indica los m² de cada tipo de piso en el selector. El valor final depende del estado del piso y de los tratamientos que incluya.',
    items: [
      { id: 'piso-porcelanato', title: 'Porcelanato — m²', price: 0, show_public: true },
      { id: 'piso-ceramico-interior', title: 'Cerámico interior — m²', price: 0, show_public: true },
      { id: 'piso-ceramico-exterior', title: 'Cerámico exterior — m²', price: 0, show_public: true },
      { id: 'piso-flotante', title: 'Flotante — m²', price: 0, show_public: true },
      { id: 'piso-vinilico', title: 'Vinílico — m²', price: 0, show_public: true },
      { id: 'piso-madera', title: 'Madera — m²', price: 0, show_public: true },
      { id: 'piso-otro', title: 'Otro tipo de piso — m² (indícanos cuál por WhatsApp)', price: 0, show_public: true },
    ],
  },
  {
    slug: 'alfombras-muro',
    name: 'Pisos alfombrados',
    domicilio: true,
    description: 'Servicio especializado para pisos alfombrados y alto tráfico. Limpieza profunda e higienización ideal para oficinas, locales comerciales y hogares. Cotización por m².',
    items: [
      { id: 'muro-1', title: '1 - Pisos alfombrados  m² (Ingrese cantidad de metros cuadrados en el selector)', price: 2600, show_public: true },
      { id: 'muro-2', title: '2 - Pisos alfombrados  m²', price: 2700, show_public: false },
      { id: 'muro-3', title: '3 - Pisos alfombrados  m²', price: 2800, show_public: false },
      { id: 'muro-4', title: '4 - Pisos alfombrados  m²', price: 2900, show_public: false },
      { id: 'muro-5', title: '5 - Pisos alfombrados  m²', price: 3000, show_public: false },
      { id: 'muro-6', title: '6 - Pisos alfombrados  m²', price: 3100, show_public: false },
      { id: 'muro-7', title: '7 - Pisos alfombrados  m²', price: 3200, show_public: false }
    ],
  },
  {
    slug: 'tapices',
    name: 'Tapices',
    domicilio: true,
    description: 'Limpieza profunda de sillones y seccionales con sistema de inyección-extracción. Eliminamos manchas, ácaros y olores, dejando tus muebles frescos y con secado rápido.',
    items: [
      { id: 'sillon-1-cuerpo', title: 'Sillón 1 cuerpo', price: 20000, show_public: true },
      { id: 'sillon-2-cuerpos', title: 'Sillón 2 cuerpos', price: 30000, show_public: true },
      { id: 'sillon-3-cuerpos', title: 'Sillón 3 cuerpos', price: 35000, show_public: true },
      { id: 'sillon-4-cuerpos', title: 'Sillón 4 cuerpos (seccional)', price: 45000, show_public: true },
      { id: 'sillon-5-cuerpos', title: 'Sillón 5 cuerpos (seccional)', price: 55000, show_public: true },
    ],
  },
  {
    slug: 'colchones',
    name: 'Colchones',
    domicilio: true,
    description: 'Higienización completa en ambas caras con productos hipoalergénicos. Eliminamos ácaros y manchas para un descanso más saludable.',
    items: [
      { id: 'colchon-1-plaza', title: 'Colchón 1 plaza (ambas cara)', price: 22000, show_public: true },
      { id: 'colchon-1.5-plaza', title: 'Colchón 1.5 plaza una car', price: 20000, show_public: true },
      { id: 'colchon-1.5-plaza-2caras', title: 'Colchón 1.5 plaza (ambas cara)', price: 25000, show_public: true },
      { id: 'colchon-2-plazas-1cara', title: 'Colchón 2 plazas una cara', price: 30000, show_public: true },
      { id: 'colchon-2-plazas', title: 'Colchón 2 plazas (ambas caras)', price: 35000, show_public: true },
      { id: 'colchon-queen-king-1-cara', title: 'Colchón Queen/King una cara ', price: 35000, show_public: true },
      { id: 'colchon-queen-king', title: 'Colchón Queen/King (ambas caras)', price: 35000, show_public: false },
      { id: 'colchon-super-king-1-cara', title: 'Colchón super King una cara', price: 45000, show_public: true },
      { id: 'colchon-super-king', title: 'Colchón Super King (ambas caras)', price: 50000, show_public: false },
      { id: 'base-cama-1.5', title: 'Base cama 1.5 plazas', price: 20000, show_public: false },
      { id: 'base-cama-2plazas', title: 'Base cama 2 plazas', price: 25000, show_public: false },
    ],
  },
  {
    slug: 'vehiculos',
    name: 'Vehículos y buses',
    domicilio: true,
    description: 'Limpieza interior de autos, SUV, camionetas, furgones de pasajeros y buses. Incluye asientos, alfombrillas y detalles, removiendo manchas y olores.',
    items: [
      { id: 'auto-sedan', title: 'Auto sedán/hatchback (interior)', price: 35000, show_public: true },
      { id: 'suv-mediana', title: 'SUV Mediana', price: 45000, show_public: true },
      { id: 'Camioneta', title: 'Camioneta', price: 45000, show_public: true },
      { id: 'suv-grande', title: 'SUV 3 corridas asientos', price: 55000, show_public: true },
      { id: 'furgon-pasajeros', title: 'Furgón de pasajeros', price: 0, show_public: true },
      { id: 'bus', title: 'Bus', price: 0, show_public: true },
      { id: 'butaca-infantil', title: 'Asiento infantil', price: 6000, show_public: true },
    ],
  },
  {
    slug: 'alfombras',
    name: 'Alfombras Decorativas',
    domicilio: false,
    description: 'Lavado en profundidad que reaviva colores y texturas. Eliminamos suciedad incrustada, manchas y olores en alfombras de diferentes tamaños.',
    items: [
      { id: 'alfombra-pequena', title: 'Alfombra pequeña (hasta 2 m²)', price: 20000, show_public: true },
      { id: 'alfombra-mediana', title: 'Alfombra mediana (2–4 m²)', price: 25000, show_public: true },
      { id: 'alfombra-grande', title: 'Alfombra grande (4–6 m²)', price: 30000, show_public: true },
    ],
  },
  {
  slug: 'escaleras',
  name: 'Escaleras alfombradas',
  domicilio: true,
  description: 'Limpieza profunda de escaleras alfombradas, peldaño por peldaño. Incluye inyección-extracción en huellas y contrahuellas.',
  items: [
    { id: 'escalera-pequena', title: 'Escalera pequeña (hasta 10 peldaños)', price: 38000, show_public: true },
    { id: 'escalera-mediana', title: 'Escalera mediana (11–15 peldaños)', price: 50000, show_public: true },
    { id: 'escalera-grande', title: 'Escalera grande (16–20 peldaños)', price: 65000, show_public: true },
    { id: 'peldaño-extra', title: 'Peldaño adicional', price: 4000, show_public: true },
  ],
},
  {
    slug: 'sillas',
    name: 'Sillas',
    domicilio: true,
    description: 'Lavado de sillas tapizadas y sitiales. Eliminamos manchas y suciedad acumulada en pocos minutos con secado rápido.',
    items: [
      { id: 'silla-asiento1', title: 'Silla semi tapizada', price: 5000, show_public: true },
      { id: 'silla-asiento2', title: 'Silla semi tapizada 2', price: 6000, show_public: false },
      { id: 'silla-asiento3', title: 'Silla semi tapizada 3', price: 7000, show_public: false },
      { id: 'silla-tapizada', title: 'Silla tapizada', price: 10000, show_public: true },
      { id: 'sitial', title: 'Sitial', price: 15000, show_public: true },
    ],
  },
  {
    slug: 'respaldos',
    name: 'Respaldos de cama',
    domicilio: true,
    description: 'Higienización de respaldos tapizados. Eliminamos polvo y manchas para mejorar la estética y prolongar la vida útil del mueble.',
    items: [
      { id: 'respaldo-1', title: 'Resp. 1 plaza', price: 15000, show_public: true },
      { id: 'respaldo-2', title: 'Resp. 2 plazas', price: 18000, show_public: true },
      { id: 'respaldo-queen', title: 'Resp. Queen/King', price: 22000, show_public: true },
    ],
  },
    {
    slug: 'pedidos-especiales',
    name: 'Pedidos especiales',
    domicilio: true,
    description: 'Cuéntanos lo que necesitas y te cotizamos.',
    items: [],
  },
];