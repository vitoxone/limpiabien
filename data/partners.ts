// data/partners.ts
export type Partner = {
  id: string;
  name: string;
  city: string;
  services: string;
  phone: string;
  instagram?: string;
};

export const PARTNERS: Partner[] = [
  {
    id: 'santiago-pro',
    name: 'LimpiaPro Santiago',
    city: 'Santiago · Región Metropolitana',
    services: 'Limpieza de sillones, colchones, alfombras muro a muro y oficinas.',
    phone: '+56911112222',
    instagram: '@limpiapro.stgo',
  },
  {
    id: 'vina-clean',
    name: 'CostaClean Viña',
    city: 'Viña del Mar y Valparaíso',
    services: 'Lavado de tapices, alfombras decorativas y detailing de vehículos.',
    phone: '+56922223333',
    instagram: '@costaclean.villar',
  },
  {
    id: 'concepcion-sur',
    name: 'SurLimpio Concepción',
    city: 'Concepción y San Pedro de la Paz',
    services: 'Higienización de colchones, sillones seccionales y vehículos.',
    phone: '+56933334444',
    instagram: '@surlimpio.conce',
  },
];
