# Spec: API — LimpiaBien Backend

## Stack
- **Framework:** NestJS (TypeScript)
- **ORM:** Prisma 5
- **BD:** PostgreSQL en Supabase
- **Auth:** JWT (access 15min + refresh 30 días) con argon2
- **Docs:** Swagger en `/docs`
- **Puerto:** 3001 (dev), configurable con `PORT`

## Estructura de carpetas
```
src/
  auth/              ← login, register, refresh, logout
  users/             ← CRUD usuarios internos
  customers/         ← CRUD clientes
  leads/             ← gestión de leads
  quotes/            ← cotizaciones (admin)
  bookings/          ← agenda/reservas
  notes/             ← notas internas sobre clientes
  uploads/           ← subida de archivos (Firebase Storage)
  services/          ← catálogo de servicios en BD
  stats/             ← dashboard de métricas
  public-quote/      ← endpoint público del cotizador web
  audit/             ← registro de acciones (AuditLog)
  health/            ← GET /health para monitoreo
  prisma/            ← PrismaService singleton
  common/
    guards/          ← JwtAuthGuard, RolesGuard
    decorators/      ← @Public(), @Roles(), @CurrentUser()
    filters/         ← AllExceptionsFilter, ThrottlerExceptionFilter
    constants/       ← AppRole enum + alias ROLES
```

---

## Prefijo y versionado

Todas las rutas tienen prefijo `/api` y versión en la URL:
```
POST http://localhost:3001/api/v1/auth/login
GET  http://localhost:3001/api/v1/customers
```

---

## Autenticación

**Registro:**
```
POST /api/v1/auth/register
Body: { email, password, firstName, lastName }
→ Crea usuario con rol STAFF por defecto
→ Retorna { user, accessToken, refreshToken }
```

**Login:**
```
POST /api/v1/auth/login          (throttle: 10 req/min por IP)
Body: { email, password }
→ Retorna { user, accessToken, refreshToken }
```

**Refresh:**
```
POST /api/v1/auth/refresh
Body: { refreshToken }
→ Retorna { accessToken, refreshToken } nuevos
```

**Logout:**
```
POST /api/v1/auth/logout         (requiere Bearer token)
→ Invalida refreshToken en BD
```

**Uso en Swagger:** botón **Authorize** → `Bearer TU_ACCESS_TOKEN`

---

## Roles y permisos

| Rol | Acceso |
|---|---|
| `SUPER_ADMIN` | Todo, incluyendo cambiar roles de otros usuarios |
| `ADMIN` | CRUD completo excepto gestión de roles |
| `SALES` | Crear/ver leads, quotes y customers |
| `STAFF` | Ver leads, quotes, bookings. Crear bookings |

**Decoradores:**
```ts
@Public()              // sin autenticación
@Roles(AppRole.ADMIN)  // requiere rol específico
@CurrentUser('sub')    // inyecta el userId del token
```

**Cambiar rol (solo SUPER_ADMIN):**
```
PATCH /api/v1/users/:id/role
Body: { role: "ADMIN" }
```

---

## Endpoints principales

### Clientes
```
GET    /api/v1/customers          → lista todos
POST   /api/v1/customers          → crear cliente
```

### Leads
```
GET    /api/v1/leads              → lista todos
POST   /api/v1/leads              → crear manualmente (ADMIN/SALES)
```

### Cotizaciones (admin)
```
GET    /api/v1/quotes             → lista todas
POST   /api/v1/quotes             → crear (requiere customerId + items con serviceId de BD)
```

### Bookings
```
GET    /api/v1/bookings           → lista todas
POST   /api/v1/bookings           → crear reserva
```

### Stats dashboard
```
GET    /api/v1/stats/dashboard    → métricas del negocio
```
Retorna: clientes totales/mes, leads totales/mes/por canal/pendientes, ingresos mes actual vs anterior + % crecimiento, bookings pendientes/semana/completados.

### Uploads
```
POST   /api/v1/uploads            → subir archivo (multipart/form-data)
                                    ?customerId=xxx (opcional)
```
Si `FIREBASE_*` está configurado → sube a Firebase Storage y retorna URL pública.
Si no → guarda ruta local `/uploads/...` (solo desarrollo).

### Endpoint público (sin auth)
```
POST   /api/v1/public/quote       → cotizador del sitio web
```
Ver `spec-leads.md` para detalle completo.

### Health
```
GET    /health                    → { status: 'ok' }
```

---

## Rate limiting

| Endpoint | Límite |
|---|---|
| Todos (autenticados) | 20 req/min por IP |
| `POST /auth/login` | 10 req/min por IP |
| `POST /public/quote` | 5 req/min · 30 req/día por IP |

Respuesta al superar límite: `429` con mensaje en español.

---

## Variables de entorno obligatorias

```env
DATABASE_URL        # Supabase pooler puerto 6543 con ?pgbouncer=true
DIRECT_URL          # Supabase directo puerto 5432 (para migraciones)
JWT_ACCESS_SECRET   # mínimo 32 caracteres — obligatorio en producción
JWT_REFRESH_SECRET  # diferente al anterior — obligatorio en producción
```

**Opcionales:**
```env
PORT                # default 3001
CORS_ORIGIN         # URLs permitidas separadas por coma — default localhost:3000
JWT_ACCESS_EXPIRES_IN   # default 15m
JWT_REFRESH_EXPIRES_IN  # default 30d
FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY
FIREBASE_STORAGE_BUCKET
```

---

## Migraciones

```bash
# Primera vez / nuevas migraciones en producción
npx prisma migrate deploy

# Desarrollo — crea migración nueva al modificar schema.prisma
npx prisma migrate dev --name descripcion_del_cambio

# Regenerar cliente de Prisma
npx prisma generate

# Ver BD visualmente
npx prisma studio       # abre en http://localhost:5555
```

---

## Consideraciones para modificar

- **Agregar un endpoint nuevo:** crear módulo con `nest g module`, `nest g service`, `nest g controller` o copiar uno existente. Registrar en `app.module.ts`.
- **Endpoint público (sin auth):** decorar con `@Public()` — el `JwtAuthGuard` global lo saltea.
- **Nuevo campo en BD:** modificar `schema.prisma` → `npx prisma migrate dev` → `npx prisma generate`.
- **CORS en producción:** agregar dominio a `CORS_ORIGIN` en `.env` separado por coma.
- **Los secrets `change_me_*` no funcionan en producción** — la API lanza error fatal si `JWT_ACCESS_SECRET` o `JWT_REFRESH_SECRET` no están definidos.
