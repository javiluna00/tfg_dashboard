# Lambda Beats — Panel de Administración

Interfaz privada de gestión del marketplace. Permite al administrador gestionar beats, licencias, usuarios, proyectos, cupones, mensajes y consultar estadísticas de uso.

**Stack:** React 18 · Vite 3 · TailwindCSS 3 · Recoil · React Router v6 · Axios · ApexCharts

---

## Requisitos

- Node.js >= 18
- npm >= 9
- Backend (`lambda_back`) corriendo en `http://localhost:8000`
- Usuario con rol `admin` en la base de datos

---

## Instalación

```bash
npm install
cp .env.example .env   # Configurar variables (ver sección siguiente)
npm run dev            # http://localhost:5173
```

### Variables de entorno

```env
VITE_STRIPE_PK=pk_test_...
VITE_API_URL=http://localhost:8000
```

---

## Estructura

```
src/
├── pages/
│   ├── login/                    # Inicio de sesión (email o Google OAuth)
│   ├── register/                 # Registro de cuenta
│   ├── forgotpassword/           # Recuperación de contraseña
│   ├── verifyaccount/            # Verificación de email
│   ├── restrictedroutes/         # Guard de rutas protegidas (solo admin)
│   └── admindashboard/           # Todas las secciones del panel
│       ├── BeatDashboard/        # Listado, creación y edición de beats
│       ├── ProjectDashboard/     # Gestión de proyectos y colaboraciones
│       ├── UserDashboard/        # Listado y gestión de usuarios
│       ├── CouponDashboard/      # Creación y control de cupones
│       ├── PurchasesDashboard/   # Historial de ventas
│       ├── ContactDashboard/     # Mensajes del formulario de contacto
│       └── PlayerAnalyticsDashboard/  # Estadísticas de plays, clicks y guardados
│
├── hooks/                        # Custom hooks (lógica de negocio)
│   ├── useAuthBien.js            # Login, logout, registro, Google OAuth
│   ├── useBeats.js               # CRUD de beats y subida de archivos
│   ├── useGenres.js              # Gestión de géneros
│   ├── useMoods.js               # Gestión de moods
│   ├── useProjects.js            # Gestión de proyectos
│   ├── useCoupons.js             # Creación y edición de cupones
│   ├── usePurchases.js           # Consulta de ventas
│   ├── usePlayerAnalytics.js     # Datos de interacción con beats
│   ├── useStatystics.js          # Estadísticas generales
│   └── useContact.js             # Mensajes de contacto
│
├── components/
│   ├── ui/                       # Componentes reutilizables (botones, inputs, modales)
│   ├── partials/                 # Sidebar, Navbar, Footer del layout
│   ├── skeleton/                 # Placeholders de carga
│   └── api/                     # Instancia de Axios con interceptores JWT
│
├── store/                        # Estado global (Recoil)
│   └── authAtom.js               # Usuario autenticado y token JWT
│
├── configs/                      # Configuración de tema (colores, layout)
├── constant/                     # Constantes globales (URLs, roles)
├── layout/                       # Layout principal con sidebar y navbar
└── App.jsx                       # Definición de rutas con React Router v6
```

---

## Secciones del panel

| Sección | Ruta | Descripción |
|---------|------|-------------|
| **Beats** | `/beats` | Listado, creación, edición y borrado de beats. Subida de MP3, WAV y stems. Generación de watermark. |
| **Proyectos** | `/projects` | Gestión de proyectos con imagen, enlace a YouTube y Spotify. |
| **Usuarios** | `/users` | Consulta de usuarios registrados y asignación de roles. |
| **Cupones** | `/coupons` | Creación de códigos de descuento (porcentaje, fijo, 2x1) con fecha de expiración y límite de usos. |
| **Ventas** | `/purchases` | Historial completo de compras con detalle de licencia, importe y estado. |
| **Mensajes** | `/contact` | Mensajes del formulario de contacto con marcado de leído/no leído. |
| **Analytics** | `/analytics` | Gráficas de reproducciones, clicks y guardados por beat. |

---

## Autenticación

El token JWT se almacena en `localStorage` y se gestiona mediante un átomo de **Recoil** (`authAtom`). El hook `useAuthBien` expone las funciones de login, logout y refresco de token. El componente `RestrictedAdminRoutes` protege todas las rutas del panel y redirige al login si el usuario no tiene rol `admin`.

---

## Gestión de beats

El flujo de creación de un beat desde el panel implica:

1. Subir la portada (imagen).
2. Subir los archivos de audio: MP3, WAV y/o stems.
3. Asignar géneros, moods y tipos (relaciones N:N).
4. Definir precios por tipo de licencia (EUR y USD).
5. Guardar → el backend genera automáticamente la previsualización con marca de agua via FFmpeg.

---

## Comandos disponibles

| Comando | Acción |
|---------|--------|
| `npm run dev` | Servidor de desarrollo en `localhost:5173` |
| `npm run build` | Genera el build de producción en `./dist/` |
| `npm run preview` | Previsualiza el build antes de desplegar |
