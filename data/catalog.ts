// data/catalog.ts
export type CatalogItem = {
  id: string;
  title: string;
  price: number;
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
    slug: 'tapices',
    name: 'Tapices',
    domicilio: true,
    description: 'Limpieza profunda de sillones y seccionales con sistema de inyección-extracción. Eliminamos manchas, ácaros y olores, dejando tus muebles frescos y con secado rápido.',
    items: [
      { id: 'sillon-1-cuerpo', title: 'Sillón 1 cuerpo', price: 20000 },
      { id: 'sillon-2-cuerpos', title: 'Sillón 2 cuerpos', price: 25000 },
      { id: 'sillon-3-cuerpos', title: 'Sillón 3 cuerpos', price: 35000 },
      { id: 'sillon-4-cuerpos', title: 'Sillón 4 cuerpos (seccional)', price: 45000 },
      { id: 'sillon-5-cuerpos', title: 'Sillón 5 cuerpos (seccional)', price: 55000 },
    ],
  },
  {
    slug: 'colchones',
    name: 'Colchones',
    domicilio: true,
    description: 'Higienización completa en ambas caras con productos hipoalergénicos. Eliminamos ácaros y manchas para un descanso más saludable.',
    items: [
      { id: 'colchon-1-plaza', title: 'Colchón 1 plaza (ambas cara)', price: 22000 },
      { id: 'colchon-1.5-plaza', title: 'Colchón 1.5 plaza (ambas cara)', price: 25000 },
      { id: 'colchon-2-plazas', title: 'Colchón 2 plazas (ambas caras)', price: 30000 },
      { id: 'colchon-queen-king', title: 'Colchón Queen/King (ambas caras)', price: 35000 },
      { id: 'colchon-super-king', title: 'super King (ambas caras)', price: 45000 },
    ],
  },
  {
    slug: 'vehiculos',
    name: 'Tapices vehículos',
    domicilio: true,
    description: 'Limpieza interior de autos, camionetas y SUVs. Incluye asientos, alfomillas y detalles, removiendo manchas y olores para un viaje más fresco.',
    items: [
      { id: 'auto-sedan', title: 'Auto sedán/hatchback (interior)', price: 35000 },
      { id: 'suv-camioneta', title: 'SUV/Camioneta (interior)', price: 45000 },
      { id: 'butaca-infantil', title: 'Asiento infantil', price: 6000 },
    ],
  },
  {
    slug: 'alfombras',
    name: 'Alfombras Decorativas',
    domicilio: false,
    description: 'Lavado en profundidad que reaviva colores y texturas. Eliminamos suciedad incrustada, manchas y olores en alfombras de diferentes tamaños.',
    items: [
      { id: 'alfombra-pequena', title: 'Alfombra pequeña (hasta 2 m²)', price: 8000 },
      { id: 'alfombra-mediana', title: 'Alfombra mediana (2–4 m²)', price: 20000 },
      { id: 'alfombra-grande', title: 'Alfombra grande (4–6 m²)', price: 25000 },
    ],
  },
  {
    slug: 'alfombras-muro',
    name: 'Alfombras muro a muro',
    domicilio: true,
    description: 'Servicio especializado para grandes superficies. Limpieza pareja y completa, ideal para hogares y oficinas con alfombras fijas.',
    items: [
      { id: 'muro-1', title: '1 - Muro a muro  m²', price: 2600 },
      { id: 'muro-2', title: '2 - Muro a muro  m²', price: 2700 },
      { id: 'muro-3', title: '3 - Muro a muro  m²', price: 2800 },
      { id: 'muro-4', title: '4 - Muro a muro  m²', price: 2900 },
      { id: 'muro-5', title: '5 - Muro a muro  m²', price: 3000 },
      { id: 'muro-6', title: '6 - Muro a muro  m²', price: 3100 },
      { id: 'muro-7', title: '7 - Muro a muro  m²', price: 3200 }
    ],
  },
  {
  slug: 'escaleras',
  name: 'Escaleras alfombradas',
  domicilio: true,
  description: 'Limpieza profunda de escaleras alfombradas, peldaño por peldaño. Incluye inyección-extracción en huellas y contrahuellas.',
  items: [
    { id: 'escalera-pequena', title: 'Escalera pequeña (hasta 10 peldaños)', price: 38000 },
    { id: 'escalera-mediana', title: 'Escalera mediana (11–15 peldaños)', price: 50000 },
    { id: 'escalera-grande', title: 'Escalera grande (16–20 peldaños)', price: 65000 },
    { id: 'peldaño-extra', title: 'Peldaño adicional', price: 4000 },
  ],
},
  {
    slug: 'sillas',
    name: 'Sillas',
    domicilio: true,
    description: 'Lavado de sillas tapizadas y sitiales. Eliminamos manchas y suciedad acumulada en pocos minutos con secado rápido.',
    items: [
      { id: 'silla-asiento', title: 'Silla semi tapizada 1', price: 5000 },
      { id: 'silla-asiento', title: 'Silla semi tapizada 2', price: 6000 },
      { id: 'silla-asiento', title: 'Silla semi tapizada 3', price: 7000 },
      { id: 'silla-tapizada', title: 'Silla tapizada', price: 10000 },
      { id: 'sitial', title: 'Sitial', price: 15000 },
    ],
  },
  {
    slug: 'respaldos',
    name: 'Respaldos de cama',
    domicilio: true,
    description: 'Higienización de respaldos tapizados. Eliminamos polvo y manchas para mejorar la estética y prolongar la vida útil del mueble.',
    items: [
      { id: 'respaldo-1', title: 'Resp. 1 plaza', price: 15000 },
      { id: 'respaldo-2', title: 'Resp. 2 plazas', price: 18000 },
      { id: 'respaldo-queen', title: 'Resp. Queen/King', price: 22000 },
    ],
  },
    {
    slug: 'extras',
    name: 'Extras',
    domicilio: true,
    description: 'Higienización de respaldos tapizados. Eliminamos polvo y manchas para mejorar la estética y prolongar la vida útil del mueble.',
    items: [
      { id: 'cojin-1', title: 'Cojín', price: 5000 }
    ],
  },
];