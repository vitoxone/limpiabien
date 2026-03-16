# Spec: Cotizador público

## Propósito
Página principal (`app/page.tsx`) que permite a un visitante seleccionar servicios de limpieza, capturar sus datos y enviar la cotización por WhatsApp. Opcionalmente registra el lead en la API en segundo plano.

## Archivos involucrados
```
app/page.tsx                  ← página principal (client component)
components/LeadForm.tsx        ← formulario de captura antes de WhatsApp
components/Category.tsx        ← card de categoría con items seleccionables
components/SelectorRow.tsx     ← fila individual con checkbox + stepper de cantidad
data/catalog.ts                ← catálogo estático de servicios y precios
lib/wa.ts                      ← buildWaLink() — construye URL de WhatsApp
lib/format.ts                  ← currency() — formatea precios en CLP
```

---

## Flujo del usuario

```
1. Llega a la página
2. Ve el mosaico de 5 fotos (tapices, colchones, vehículos, alfombras, sillas)
   → Cada foto hace scroll suave a esa categoría del catálogo
3. Selecciona servicios con checkbox + stepper de cantidad
4. Cuando hay ≥1 ítem aparece el LeadForm en vez del botón simple
5. Ingresa nombre y teléfono
6. Hace clic en "Cotizar por WhatsApp"
   → Se llama POST /api/v1/public/quote (silencioso, best-effort)
   → Se abre WhatsApp con el mensaje pre-armado
```

---

## Estado del carrito

```ts
type Cart = Record<string, { section: string; title: string; qty: number }>;
// key: "NombreCategoria — TituloItem"  ej: "Tapices — Sillón 2 cuerpos"
```

- `cart` — estado principal en `page.tsx`
- `getQty(key)` — retorna cantidad actual de un ítem
- `setQty(key, qty)` — agrega, actualiza o elimina del carrito (qty ≤ 0 elimina)
- `items` — `Object.values(cart).filter(i => i.qty > 0)` — solo ítems activos
- `totalItems` — suma de todas las cantidades

---

## Mensaje de WhatsApp

Construido en `useMemo` en `page.tsx`, depende de `items`, `fullName` y `origin`:

```
// Con nombre:
Hola, soy María González! Quiero cotizar un servicio de limpieza. (web)
• Tapices — Sillón 2 cuerpos × 1
• Colchones — Colchón 2 plazas (ambas caras) × 2

// Sin nombre:
Hola! Quiero cotizar un servicio de limpieza. (web)
• ...
```

`origin` viene del query param `?origin=instagram` — por defecto `'web'`.
El número de WhatsApp viene de `NEXT_PUBLIC_WHATSAPP_PHONE` (default `+56912345678`).

---

## LeadForm — comportamiento

**Props:**
```ts
items: CartItem[]        // ítems del carrito
waHref: string           // URL de WhatsApp ya construida
fullName: string         // estado levantado desde page.tsx
onNameChange: (s) => void
onClear: () => void      // limpia el carrito
```

**Estados internos:**
```ts
phone: string
honeypot: string   // campo invisible anti-bot, siempre vacío en humanos
step: 'form' | 'sending' | 'done' | 'error'
```

**Flujo interno:**
1. Valida que `fullName` y `phone` no estén vacíos
2. `setStep('sending')`
3. Si `NEXT_PUBLIC_API_URL` está definido → `POST /api/v1/public/quote`
   - Incluye `website: honeypot` (vacío → humano, con valor → bot)
   - Si falla, se ignora silenciosamente
4. `setStep('done')` → abre WhatsApp con `setTimeout` de 300ms
5. Muestra pantalla de confirmación con nombre del usuario

---

## Catálogo (`data/catalog.ts`)

```ts
type CatalogItem = {
  id: string
  title: string
  price: number
  show_public: boolean   // false = solo visible en calculadora interna
}

type CatalogCategory = {
  slug: string           // usado como ID de scroll: "cat-tapices"
  name: string
  domicilio?: boolean
  description?: string
  items: CatalogItem[]
}
```

**Categorías activas:** `tapices`, `colchones`, `vehiculos`, `alfombras`, `alfombras-muro`, `escaleras`, `sillas`, `respaldos`, `extras`

Los precios en `catalog.ts` son referenciales — en el cotizador público `show_public: false` oculta ítems.

---

## Variables de entorno relevantes

| Variable | Descripción | Default |
|---|---|---|
| `NEXT_PUBLIC_WHATSAPP_PHONE` | Número de WhatsApp destino | `+56912345678` |
| `NEXT_PUBLIC_API_URL` | URL base de la API | `''` (vacío = no llama API) |

Si `NEXT_PUBLIC_API_URL` está vacío, el formulario funciona igual pero **no registra el lead** — solo abre WhatsApp.

---

## Consideraciones para modificar

- **Agregar un servicio nuevo:** solo tocar `data/catalog.ts` — el componente `Category` lo renderiza automáticamente.
- **Cambiar el número de WhatsApp:** variable de entorno `NEXT_PUBLIC_WHATSAPP_PHONE`, no hardcodear.
- **Cambiar el mensaje de WhatsApp:** función `message` en `page.tsx` (~línea 60).
- **El mosaico** tiene 5 celdas fijas con slugs hardcodeados — si se agrega una categoría nueva al mosaico hay que editar el JSX del mosaico en `page.tsx`.
- **`show_public: false`** en un ítem lo oculta del cotizador público pero sigue visible en `/calculadora`.
