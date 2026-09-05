# API de Gestión de Proyectos — Empresa de Proyectos de Software

Proyecto Semana 05 — Migración de la API a PostgreSQL con Prisma ORM.

## 📌 Descripción del dominio

Esta API modela el sistema de gestión de una **empresa de desarrollo de software** que
maneja proyectos para distintos clientes.

- **Recurso principal:** `Project` (Proyecto) — un proyecto de software con nombre, código
  único, estado, presupuesto y fechas.
- **Recurso secundario:** `Client` (Cliente) — el cliente para el cual se ejecuta el proyecto.
- **Relación:** 1:N — un `Client` puede tener muchos `Project`, y cada `Project` pertenece
  (opcionalmente) a un `Client`.

## 🗺️ Diagrama de entidades (texto)

```
┌─────────────────────┐        ┌───────────────────────────┐
│        Client        │        │          Project           │
├─────────────────────┤        ├───────────────────────────┤
│ id (uuid) PK          │ 1    N │ id (uuid) PK                │
│ name                  ├───────>│ name                        │
│ email (unique)        │        │ code (unique)               │
│ phone                 │        │ description                 │
│ company               │        │ status (enum)                │
│ createdAt / updatedAt │        │ budget                      │
└─────────────────────┘        │ startDate / endDate         │
                                  │ clientId (FK -> Client.id) │
                                  │ createdAt / updatedAt       │
                                  └───────────────────────────┘
```

`ProjectStatus`: `PLANNING | IN_PROGRESS | ON_HOLD | COMPLETED | CANCELLED`

## 🚀 Cómo levantar el proyecto

```bash
docker compose up -d
pnpm install
cp .env.example .env
pnpm dlx prisma migrate dev --name init
pnpm dlx prisma db seed
pnpm dev
```

## 📡 Endpoints

Base URL: `http://localhost:3000/api/v1/projects`

### GET /api/v1/projects — Listado paginado

`GET /api/v1/projects?page=1&limit=10`

```json
{
  "data": [
    {
      "id": "b3c1e2a0-....",
      "name": "Rediseño E-commerce Acme",
      "code": "PRJ-001",
      "status": "IN_PROGRESS",
      "budget": "45000.00",
      "startDate": "2026-01-15T00:00:00.000Z",
      "clientId": "a1f2....",
      "client": { "id": "a1f2....", "name": "Ana Torres", "company": "Acme Corp" }
    }
  ],
  "total": 6,
  "page": 1,
  "limit": 10
}
```

### GET /api/v1/projects/:id — Detalle con relación

- `200` — retorna el proyecto con su `client` incluido.
- `404`:
```json
{ "status": "error", "message": "Proyecto no encontrado" }
```

### POST /api/v1/projects — Crear

Body:
```json
{
  "name": "Nuevo Portal Interno",
  "code": "PRJ-007",
  "description": "Portal de recursos humanos",
  "status": "PLANNING",
  "budget": 15000,
  "startDate": "2026-04-01",
  "clientId": "a1f2...."
}
```

- `201` — proyecto creado.
- `400` — validación Zod fallida.
- `409`:
```json
{ "status": "error", "message": "Ya existe un proyecto con ese código" }
```

### PUT /api/v1/projects/:id — Actualizar

Body parcial, por ejemplo:
```json
{ "status": "COMPLETED", "endDate": "2026-05-20" }
```

- `200` — proyecto actualizado.
- `404` — si no existe.

### DELETE /api/v1/projects/:id — Eliminar

- `204` — eliminado correctamente.
- `404` — si no existe.

## 🖼️ Screenshots

> Adjunta aquí tus capturas de Postman/Thunder Client mostrando los 5 endpoints en
> funcionamiento (uno por método: GET listado, GET detalle, POST, PUT, DELETE).

## 🌱 Logs del seed

> Pega aquí la salida de consola al ejecutar `pnpm dlx prisma db seed`.

```
🌱 Iniciando seed...
✅ 3 clientes creados
✅ 6 proyectos creados
```

---

## 📱 App móvil — Semana 05 (Networking + TanStack Query v5)

La app consume esta misma API (`/api/v1/projects`) con **Axios** y **TanStack
Query v5**, sobre el mismo dominio: **Empresa de Proyectos de Software**.

- **Recurso principal:** `Project` — proyecto de software (nombre, código,
  estado, presupuesto, fechas, cliente asociado).
- **API real:** el backend Express/Prisma de este mismo repositorio
  (`http://localhost:3000/api/v1/projects`).

### Pantallas

| Pantalla | Descripción |
|---|---|
| `HomeScreen` | Lista de proyectos (`useProjects` → `useQuery`). Muestra código, cliente, estado (badge de color) y presupuesto. Maneja `loading`, `error` con botón "Reintentar", lista vacía y pull-to-refresh (`onRefresh` + `isFetching`). |
| `DetailScreen` | Detalle completo de un proyecto (`useProjectById` → `useQuery`), incluyendo el cliente asociado. |
| `CreateScreen` | Formulario para crear un proyecto (`useCreateProject` → `useMutation`): nombre, código, presupuesto, fecha de inicio (requeridos según el schema Zod del backend) y estado (selector de chips). Al tener éxito, invalida la query de la lista (`invalidateQueries`) y regresa a `HomeScreen`. |

### Hooks (`src/hooks/useItems.ts`)

- `useProjects(page, limit)` — `useQuery` sobre `GET /projects` (respuesta paginada).
- `useProjectById(id)` — `useQuery` sobre `GET /projects/:id`, habilitado solo si hay `id`.
- `useCreateProject()` — `useMutation` sobre `POST /projects`, con `onSuccess` que invalida `PROJECTS_QUERY_KEY`.
- `useDeleteProject()` — `useMutation` sobre `DELETE /projects/:id` (opcional/extra).

### Configuración de la URL de la API

Ver `.env.example` — hay que apuntar `EXPO_PUBLIC_API_URL` según el entorno
(Android Emulator usa `10.0.2.2`, no `localhost`).

### Cómo ejecutar

```bash
# 1. Levanta el backend (desde la raíz del repo)
docker compose up -d
pnpm install
pnpm dlx prisma migrate dev --name init
pnpm dlx prisma db seed
pnpm dev

# 2. En otra terminal, ejecuta la app móvil
cp .env.example .env.local   # y ajusta EXPO_PUBLIC_API_URL
pnpm install
pnpm start
```

### 🖼️ Capturas de pantalla (app móvil)

> Adjunta aquí tus capturas: `HomeScreen` (con datos), estado de error,
> estado vacío, `DetailScreen` y `CreateScreen`.
