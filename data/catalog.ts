// data/catalog.ts
export type CatalogItem = {
  id: string;
  title: string;
  price: number;
};

export type CatalogCategory = {
  slug: string;
  name: string;
  items: CatalogItem[];
};

export const CATEGORIES: CatalogCategory[] = [
  {
    slug: 'tapices',
    name: 'Tapices',
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
    items: [
      { id: 'colchon-1-plaza', title: 'Colchón 1 plaza (una cara)', price: 15000 },
      { id: 'colchon-2-plazas', title: 'Colchón 2 plazas (ambas caras)', price: 30000 },
      { id: 'colchon-queen-king', title: 'Colchón Queen/King (ambas caras)', price: 38000 },
    ],
  },
    {
    slug: 'vehiculos',
    name: 'Tapices vehículos',
    items: [
      { id: 'auto-sedan', title: 'Auto sedán/hatchback (interior)', price: 35000 },
      { id: 'suv-camioneta', title: 'SUV/Camioneta (interior)', price: 45000 },
      { id: 'butaca-infantil', title: 'Asiento infantil', price: 6000 },
    ],
  },
  {
    slug: 'alfombras',
    name: 'Alfombras Decorativas',
    items: [
      { id: 'alfombra-pequena', title: 'Alfombra pequeña (hasta 2 m²)', price: 8000 },
      { id: 'alfombra-mediana', title: 'Alfombra mediana (2–4 m²)', price: 15000 },
      { id: 'alfombra-grande', title: 'Alfombra grande (4–6 m²)', price: 22000 },
    ],
  },
  {
    slug: 'alfombras-muro',
    name: 'Alfombras muro a muro',
    items: [
      { id: 'muro-10m2', title: 'Muro a muro hasta 10 m²', price: 22000 },
      { id: 'muro-20m2', title: 'Muro a muro hasta 20 m²', price: 38000 },
      { id: 'muro-30m2', title: 'Muro a muro hasta 30 m²', price: 52000 },
    ],
  },
  {
    slug: 'sillas',
    name: 'Sillas',
    items: [
      { id: 'silla-tapizada', title: 'Silla tapizada', price: 4000 },
      { id: 'sitial', title: 'Sitial', price: 6000 },
    ],
  },
  {
    slug: 'respaldos',
    name: 'Respaldos de cama',
    items: [
      { id: 'respaldo-1', title: 'Resp. 1 plaza', price: 12000 },
      { id: 'respaldo-2', title: 'Resp. 2 plazas', price: 16000 },
      { id: 'respaldo-queen', title: 'Resp. Queen/King', price: 20000 },
    ],
  },
];