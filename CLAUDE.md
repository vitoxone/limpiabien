# CLAUDE.md — LimpiaBien

Contexto general del proyecto para Claude Code y onboarding de nuevos desarrolladores.

---

## ¿Qué es LimpiaBien?

Empresa de limpieza profesional de tapices, colchones, alfombras y vehículos a domicilio. Opera en Nancagua, Santa Cruz, San Fernando, Chimbarongo y Chépica — Región de O'Higgins, Chile.

Contacto público: WhatsApp +56977515193 · Instagram @limpiabien.cl

---

## Repositorios / carpetas

```
/front   ← sitio web público + cotizador (Next.js)
/api     ← backend REST (NestJS)
```

---

## Frontend (`/front`)

**Stack:** Next.js 14 (App Router), TypeScript, CSS puro (sin Tailwind)

**Página principal:** cotizador de servicios → captura nombre y teléfono → abre WhatsApp con mensaje pre-armado.

**Levantar en dev:**
```bash
cd front
npm install
cp .env.example .env.local   # configurar NEXT_PUBLIC_WHATSAPP_PHONE y NEXT_PUBLIC_API_URL
npm run dev                   # corre en http://localhost:3000
```

**Variables de entorno clave:**
```env
NEXT_PUBLIC_WHATSAPP_PHONE=+56977515193
NEXT_PUBLIC_API_URL=http://localhost:3001   # vacío = no registra leads en API
```

**Docs detalladas:**
- `docs/spec-cotizador.md` — cotizador, carrito, LeadForm, mensaje de WhatsApp
- `docs/spec-leads.md` — flujo completo lead → quote → booking

---

## API (`/api`)

**Stack:** NestJS, Prisma 5, PostgreSQL (Supabase), JWT auth, Swagger

**Levantar en dev:**
```bash
cd api
npm install
cp .env.example .env          # configurar DATABASE_URL, DIRECT_URL, JWT secrets, CORS_ORIGIN
npx prisma migrate deploy     # crear tablas (solo la primera vez)
npm run start:dev             # corre en http://localhost:3001
```

**Swagger:** `http://localhost:3001/docs`

**Variables de entorno obligatorias:**
```env
DATABASE_URL          # Supabase pooler :6543 con ?pgbouncer=true
DIRECT_URL            # Supabase directo :5432
JWT_ACCESS_SECRET     # mínimo 32 chars
JWT_REFRESH_SECRET    # mínimo 32 chars, diferente al anterior
CORS_ORIGIN           # ej: http://localhost:3000,https://limpiabien.cl
```

**Docs detalladas:**
- `docs/spec-api.md` — todos los endpoints, roles, rate limiting, migraciones
- `docs/spec-leads.md` — endpoint público y ciclo de vida del lead

---

## Flujo principal de negocio

```
Visitante en limpiabien.cl
  → selecciona servicios en el cotizador
  → ingresa nombre + teléfono
  → clic "Cotizar por WhatsApp"
      → API registra Customer + Lead + Quote en BD (silencioso)
      → se abre WhatsApp con cotización pre-armada
  → equipo responde por WhatsApp
  → admin gestiona lead desde panel (pendiente de construir)
  → se agenda el servicio (Booking)
  → se marca como completado
```

---

## Decisiones de arquitectura

| Decisión | Razón |
|---|---|
| Catálogo estático en `data/catalog.ts` | Precios cambian poco, no requiere BD para el cotizador público |
| Items de quote pública guardados en `notes` | El cotizador usa slugs propios, no FK a tabla `Service` de BD |
| WhatsApp como canal principal | No requiere backend para funcionar — es el canal natural del negocio |
| `NEXT_PUBLIC_API_URL` opcional | Si la API no está disponible, el cotizador sigue funcionando |
| Argon2 para hashing | Más seguro que bcrypt, ya incluido en dependencias |
| Refresh token en BD | Permite logout real invalidando el token |

---

## Convenciones de código

- **Nombres en español** para variables de negocio (`fullName`, `commune`, `needs`)
- **Commits en español** describiendo la funcionalidad
- **Un módulo por dominio** en NestJS — no mezclar lógica entre módulos
- **DTOs con validación estricta** — `whitelist: true` y `forbidNonWhitelisted: true` globales
- **Sin `console.log`** en producción — usar `Logger` de NestJS

---

## Pendiente / roadmap

- [ ] Panel de administración (gestión de leads, quotes, bookings)
- [ ] Agenda online para clientes
- [ ] Notificaciones automáticas por WhatsApp al recibir lead
- [ ] Galería dinámica (subir fotos de trabajos desde el celular)
- [ ] Sistema de reseñas de clientes
- [ ] Descuentos por código / cupones
- [ ] Google Business Profile vinculado

---

## Specs disponibles

```
docs/CLAUDE.md           ← este archivo
docs/spec-cotizador.md   ← cotizador público del frontend
docs/spec-api.md         ← API: endpoints, auth, roles, migraciones
docs/spec-leads.md       ← flujo lead → quote → booking + endpoint público
```
