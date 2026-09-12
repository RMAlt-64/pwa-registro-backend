# PWA Registro Backend — API REST Geolocalizada para Control de Asistencia

## ¿Qué problema resuelve?

Las planillas no validan si el empleado realmente estuvo en el puesto. Alguien puede fichar desde cualquier lugar y no hay forma de auditar distancia ni horario.

**Este backend** resuelve eso: expone una API REST que recibe cada fichaje con lat/long, calcula la distancia real al puesto con fórmula Haversine y marca automáticamente `fuera_de_rango` y `distancia_metros`. Así la empresa tiene trazabilidad honesta de cada entrada/salida y puede sincronizar fichajes offline sin confiar en el cliente.

## Solución

API Node/Express + PostgreSQL/Sequelize con autenticación JWT y validación geoespacial. La PWA frontend envía `id_puesto, lat, long, tipo (entrada/salida)` y el backend responde si el fichaje es válido. Diseñado para sincronización diferida: la PWA puede guardar en IndexedDB sin señal y hacer `Background Sync` al reconectar.

## Funcionalidades principales

- **Auth JWT:** `POST /api/auth/login` con `bcrypt` + `jsonwebtoken` (1h), middleware `authenticateToken`.
- **Modelos:** `Usuario` (admin/empleado), `Puesto` (lat/long + `radio_validacion`), `Asignacion` (M:N), `Registro` (tipo, lat/long capturada, `fuera_de_rango`, `distancia_metros`).
- **Validación Haversine:** `src/utils/geoUtils.mjs` calcula distancia en metros (`R=6371e3`) y compara contra radio del puesto.
- **Endpoints:** `GET /`, `POST /api/auth/login`, `GET/POST /api/usuarios`, `POST /api/registros` (protegido).
- **Seed demo:** `seed.mjs` crea admin, empleado y Oficina Central (-34.6037, -58.3816).

## Stack

Node.js (ESM) + Express 5.2 + Sequelize 6 + PostgreSQL 8 + pg-hstore + JWT/Bcrypt + CORS + Dotenv

## Estructura

```
server.mjs          # entry, CORS (Vite http://localhost:5173), Sequelize sync
config/database.mjs # conexión PostgreSQL
models/index.mjs    # Usuario, Puesto, Asignacion, Registro + relaciones
controllers/        # login, usuarios, registros (registrarAsistencia)
routes/             # /api/auth, /api/usuarios, /api/registros
middleware/authMiddleware.mjs
src/utils/geoUtils.mjs  # calcularDistancia Haversine
seed.mjs
```

## Instalación y ejecución

```bash
npm install
cp .env.example .env   # DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT, JWT_SECRET
npm run dev    # node --watch server.mjs → http://localhost:3000
npm start      # producción
```

`.env` ejemplo (copiar desde `.env.example`):
```
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASS=***
DB_NAME=pwa_registro
DB_PORT=5432
JWT_SECRET=***
```

## API principal

- `GET /` — health check
- `POST /api/auth/login` — `{ email, password }` → `{ token }`
- `POST /api/registros` — `Authorization: Bearer <token>` + `{ id_puesto, lat, long, tipo }` → `{ fuera_de_rango, distancia_metros }`

## Relación con Frontend

Frontend PWA: `github.com/RMAlt-64/pwa-registro-frontend` — consume esta API con Axios + JWT y cache Workbox `NetworkFirst` para `/api/*`.

## Estado

API funcional con validación Haversine. Roadmap: tests, paginación y rate-limit.

## Autor

Ruben Manuel Almiron — UNER — github.com/RMAlt-64
