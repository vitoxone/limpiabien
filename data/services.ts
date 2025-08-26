export type Service = {
  id: string;
  title: string;
  price: number;
};

export const SERVICES: Service[] = [
  { id: 'sillon-4-cuerpo', title: 'Sillón 4 cuerpo', price: 20000 },
  { id: 'sillon-2-cuerpos', title: 'Sillón 2 cuerpos', price: 25000 },
  { id: 'sillon-3-cuerpos', title: 'Sillón 3 cuerpos', price: 35000 },
  { id: 'silla-tapizada', title: 'Silla tapizada', price: 4000 },
  { id: 'colchon-1-plaza', title: 'Colchón 1 plaza (una cara)', price: 15000 },
  { id: 'colchon-2-plazas', title: 'Colchón 2 plazas (ambas caras)', price: 30000 },
  { id: 'queen-king', title: 'Queen/King (ambas caras)', price: 38000 },
];
