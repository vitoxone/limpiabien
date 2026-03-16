# Spec: Flujo Lead → Quote → Booking

## Propósito
Documentar el ciclo de vida completo de un cliente desde que contacta por el sitio web hasta que se agenda y completa el servicio.

---

## Ciclo de vida

```
Visitante web
    │
    ▼
[public/quote]  ← POST sin auth desde el cotizador
    │  crea automáticamente:
    ├─→ Customer (upsert por teléfono)
    ├─→ Quote    (DRAFT, items como texto en notes)
    └─→ Lead     (status: NEW, channel: 'web')
    │
    ▼
Equipo LimpiaBien recibe notificación de WhatsApp
    │
    ▼
[Lead]  admin actualiza status manualmente
    NEW → CONTACTED → QUOTED → SCHEDULED → COMPLETED
                                         └→ CANCELED
    │
    ▼
[Quote]  admin actualiza status
    DRAFT → SENT → APPROVED → (facturar)
                 └→ REJECTED / EXPIRED
    │
    ▼
[Booking]  admin crea la reserva con fecha y dirección
    PENDING → CONFIRMED → IN_PROGRESS → COMPLETED
                                      └→ CANCELED
```

---

## Endpoint público — `POST /api/v1/public/quote`

### Cuándo se llama
Cuando el visitante hace clic en "Cotizar por WhatsApp" en el cotizador, **antes** de abrir WhatsApp. La llamada es best-effort — si falla, WhatsApp igual se abre.

### Body
```json
{
  "fullName": "María González",
  "phone": "+56912345678",
  "email": "maria@email.com",      // opcional
  "commune": "Santa Cruz",          // opcional
  "channel": "web",                 // opcional, default "web"
  "website": "",                    // honeypot — siempre vacío en humanos
  "items": [
    {
      "serviceSlug": "tapices",
      "serviceTitle": "Sillón 2 cuerpos",
      "unitPrice": 0,
      "quantity": 1
    }
  ]
}
```

### Lógica interna (`public-quote.service.ts`)
1. **Honeypot check** — si `website` tiene valor → responde 201 falso, loguea IP, no toca BD
2. **Upsert cliente** — busca por `phone` con `findFirst`. Si existe → actualiza nombre/email/comuna. Si no → crea nuevo
3. **Crea Quote** — status `DRAFT`, items guardados como texto en el campo `notes` (no como `QuoteItem` relacionales, ya que vienen del catálogo estático del frontend, no de la BD de servicios)
4. **Crea Lead** — status `NEW`, channel del body o `'web'` por defecto

### Respuesta exitosa
```json
{
  "success": true,
  "quoteId": "cuid...",
  "leadId": "cuid...",
  "customerId": "cuid...",
  "total": 0
}
```

### Protecciones activas
- Throttle: 5 req/min + 30 req/día por IP
- Origin check: solo acepta peticiones desde dominios en `CORS_ORIGIN`
- Honeypot: campo `website` invisible en el formulario
- Validación de teléfono chileno: `/^(\+?56)?[2-9]\d{7,8}$/`
- Límites de largo en todos los campos de texto

---

## Modelos de datos

### Lead
```prisma
model Lead {
  id         String     // cuid
  customerId String     // FK → Customer
  status     LeadStatus // NEW | CONTACTED | QUOTED | SCHEDULED | COMPLETED | CLOSED | CANCELED
  channel    String?    // 'web' | 'instagram' | 'whatsapp' | 'referido'
  needs      String?    // texto libre: "Sillón 2 cuerpos x1, Colchón 2 plazas x2"
  createdAt  DateTime
}
```

### Quote
```prisma
model Quote {
  id         String      // cuid
  customerId String      // FK → Customer
  status     QuoteStatus // DRAFT | SENT | APPROVED | REJECTED | EXPIRED
  subtotal   Decimal
  discount   Decimal     // default 0
  total      Decimal
  notes      String?     // items del cotizador público guardados como texto
  items      QuoteItem[] // items relacionales (solo para quotes creadas desde admin)
  createdAt  DateTime
}
```

### QuoteItem
```prisma
model QuoteItem {
  id          String
  quoteId     String   // FK → Quote
  serviceId   String   // FK → Service (BD, no catálogo estático)
  quantity    Int
  unitPrice   Decimal
  total       Decimal
  description String?
}
```

> **Importante:** Las quotes creadas por el endpoint público **no tienen QuoteItems relacionales** — los servicios se guardan como texto en `notes`. Solo las quotes creadas desde el panel admin tienen `QuoteItems` con FK a `Service`.

### Booking
```prisma
model Booking {
  id          String        // cuid
  customerId  String        // FK → Customer
  status      BookingStatus // PENDING | CONFIRMED | IN_PROGRESS | COMPLETED | CANCELED
  scheduledAt DateTime      // fecha y hora del servicio
  address     String?       // dirección donde se realiza
  notes       String?
  items       BookingItem[] // servicios agendados
}
```

---

## Canal de origen (`channel`)

Controla de dónde vino el lead. Se usa en las stats del dashboard (`leads.byChannel`).

| Valor | Origen |
|---|---|
| `web` | Cotizador en limpiabien.cl |
| `instagram` | DM o link de Instagram |
| `whatsapp` | Contacto directo por WhatsApp |
| `referido` | Recomendación de otro cliente |

Para rastrear el origen automáticamente desde links de Instagram o campañas, agregar `?origin=instagram` a la URL del sitio — el cotizador lo lee del query param.

---

## Stats relacionadas (`GET /api/v1/stats/dashboard`)

```json
{
  "leads": {
    "total": 45,
    "thisMonth": 12,
    "pending": 8,
    "byChannel": [
      { "channel": "web", "count": 20 },
      { "channel": "whatsapp", "count": 15 },
      { "channel": "instagram", "count": 10 }
    ]
  },
  "quotes": {
    "total": 38,
    "thisMonth": 10,
    "revenueThisMonth": 450000,
    "revenueLastMonth": 380000,
    "revenueGrowthPercent": 18
  }
}
```

---

## Consideraciones para modificar

- **Agregar un canal nuevo:** solo cambiar el valor del campo `channel` al crear el lead — no hay enum en BD, es `String?` libre.
- **Vincular quote pública a servicios de BD:** actualmente los items del cotizador público se guardan solo en `notes`. Para tener `QuoteItems` relacionales habría que sincronizar los slugs del catálogo estático (`data/catalog.ts`) con los slugs de la tabla `Service` en BD.
- **Notificaciones automáticas al crear lead:** agregar llamada a servicio de email/WhatsApp Business en `public-quote.service.ts` después de crear el lead — el punto de extensión natural está al final del método `submit()`.
- **Descuentos:** el modelo `Quote` ya tiene campo `discount: Decimal`. La calculadora interna (`/calculadora`) lo usa. Para exponerlo en el cotizador público basta con pasar el valor en el body.
