# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Qué es este repo

Sitio público + cotizador de **LimpiaBien** (limpieza profesional de tapices, colchones, alfombras y vehículos a domicilio en la Región de O'Higgins, Chile). Es una app Next.js 14 single-package — **no hay backend en este repo**. La integración opcional con una API externa se hace vía `NEXT_PUBLIC_API_URL`.

Contacto público: WhatsApp +56977515193 · Instagram @limpiabien.cl

---

## Comandos

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start    # producción tras build
npm run lint     # eslint-config-next
```

No hay framework de tests configurado. El `lint` es la única validación automatizada.

---

## Variables de entorno (`.env` o `.env.local`)

```env
NEXT_PUBLIC_WHATSAPP_PHONE=+56977515193     # destino del wa.me — fallback "+56912345678"
NEXT_PUBLIC_API_URL=https://...             # opcional — si está vacío, LeadForm NO postea (ver más abajo)
CALCULADORA_PASSWORD=...                    # gate de /calculadora; usado por server action
```

`CALCULADORA_PASSWORD` se valida desde `app/calculadora/actions.ts` (server action, no se expone al cliente).

---

## Arquitectura

### Stack
- **Next.js 14 App Router**, TypeScript estricto, **CSS plano** (sin Tailwind/CSS-in-JS — los estilos viven en `app/globals.css` y un `styles.module.css` por ruta)
- Path alias: `@/*` → raíz del repo (ver `tsconfig.json`)
- Dependencia notable: `jspdf` (export PDF en la calculadora interna)

### Flujo principal (cotizador público — `app/page.tsx`)

```
Visitante → selecciona items del catálogo → carrito local en estado React
         → escribe nombre/teléfono en LeadForm
         → click "Cotizar":
             1. POST opcional a NEXT_PUBLIC_API_URL/api/v1/public/quote (si está configurado)
             2. Abre wa.me con mensaje pre-armado vía buildWaLink (lib/wa.ts)
```

Detalles clave:
- El carrito es estado local (`Record<key, {section, title, qty}>`) — no se persiste.
- El parámetro `?origin=...` de la URL se inyecta en el saludo del mensaje WhatsApp para tracking de campañas.
- `LeadForm` tiene un honeypot (`honeypot` field) para anti-spam y degrada con gracia: si la API falla o `NEXT_PUBLIC_API_URL` está vacío, igual abre WhatsApp.

### Catálogo (`data/catalog.ts`) — **fuente de verdad**
- Categorías con `slug`, `name`, `domicilio?`, `description`, `items[]`
- Cada item tiene `show_public: boolean` — items con `false` solo aparecen en `/calculadora` (uso interno), no en el cotizador público
- **Ojo:** existe también `data/services.ts` con una lista paralela legacy más corta. **No es la fuente activa** del cotizador; revisar antes de editar.

### Rutas

| Ruta | Propósito |
|---|---|
| `/` (`app/page.tsx`) | Cotizador público + landing |
| `/calculadora` | Herramienta interna password-gated — genera PDF de cotización con jsPDF |
| `/servicios` y `/servicios/[slug]` | Landings SEO por categoría |
| `/blog`, `/contacto` | Páginas estáticas |
| `/sitemap.xml`, `/robots.txt` | Generados por `app/sitemap.ts` y `app/robots.txt` |

### SEO / structured data
`app/layout.tsx` inyecta JSON-LD `LocalBusiness` con `OfferCatalog` apuntando a `/servicios/<slug>`. `app/page.tsx` añade un JSON-LD `FAQPage`. **Si agregas/quitas servicios, actualiza también:**
- `app/sitemap.ts` (URLs)
- el `OfferCatalog` en `layout.tsx`
- las FAQs si cambia el contexto

---

## Convenciones

- **Español para variables de negocio** (`fullName`, `commune`, `cotNum`, etc.) y commits.
- Componentes con `'use client'` cuando usan estado/efectos; el resto son server components.
- No usar `console.log` en código que llegue a producción.
- Estilos: agregar a `app/globals.css` o crear `styles.module.css` junto al componente — **no introducir Tailwind ni CSS-in-JS**.
- Los precios/textos del catálogo se editan en `data/catalog.ts`, no hardcodeados en componentes.

---

## Decisiones de arquitectura

| Decisión | Razón |
|---|---|
| Catálogo estático en `data/catalog.ts` | Precios cambian poco; no requiere BD |
| `NEXT_PUBLIC_API_URL` opcional | Si la API externa no está disponible, el cotizador sigue funcionando vía WhatsApp |
| WhatsApp como canal principal de conversión | Es el canal natural del negocio; no requiere backend para funcionar |
| Password de calculadora vía server action | Mantiene el secreto fuera del bundle del cliente |
| CSS plano en vez de Tailwind | Decisión deliberada del proyecto |

---

## Specs adicionales

```
docs/spec-cotizador.md   ← detalle del cotizador público
docs/spec-leads.md       ← flujo lead → quote → booking (incluye contrato con la API externa)
docs/spec-api.md         ← describe la API externa NestJS (vive en otro repo)
```
