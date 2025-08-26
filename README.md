# LimpiaBien — Lista de precios + WhatsApp (Next.js + TypeScript)

Proyecto listo para mostrar una lista de precios con botones que abren WhatsApp con el mensaje precargado.

## Requisitos
- Node.js 18+
- npm o pnpm

## Configuración rápida
Crea un archivo `.env.local` en la raíz con tu número en formato internacional:

```
NEXT_PUBLIC_WHATSAPP_PHONE=+56912345678
```

> Si no configuras la variable, usará `+56912345678` por defecto.

## Scripts

```bash
# Instalar dependencias
npm install

# Entorno de desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar en producción (después de build)
npm run start
```

La app se abre en http://localhost:3000

## Personalizar precios
Edita `data/prices.ts` para cambiar títulos, precios, descripciones y notas.

## Cambiar textos/estilos
- Textos principales: `app/page.tsx`
- Estilos base: `app/globals.css`
- Lógica de WhatsApp: `lib/wa.ts`
- Componentes: `components/PriceCard.tsx`, `components/WhatsAppFloat.tsx`

## Despliegue
- **Vercel**: importa el repo y define `NEXT_PUBLIC_WHATSAPP_PHONE` en “Environment Variables”.
- **Docker / VPS**: `npm ci && npm run build && npm run start -p 3000`

¡Listo! 🚀
