# 🧭 GPS Belgrano

Directorio de profesionales y oficios de confianza del barrio de Belgrano (CABA).
MVP construido con **React 19 + TypeScript + Vite + TailwindCSS + Firebase**.

---

## 🚀 Puesta en marcha

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar Firebase
cp .env.example .env.local   # y completar con tus credenciales
#   (el proyecto ya viene con .env.local pre-cargado para gps-belgrano)

# 3. Poblar la base con datos de ejemplo (categorías + profesionales)
npm run seed

# 4. Levantar el entorno de desarrollo
npm run dev
```

> **Importante para el seed:** el script usa el SDK cliente de Firebase, por lo que
> Firestore debe permitir escritura al ejecutarlo. Poné la base en **modo de prueba**
> o aplicá las reglas de [`firestore.rules`](./firestore.rules) autenticándote primero.
> La forma más rápida para el MVP: en la consola de Firebase → Firestore → Reglas,
> permitir temporalmente `allow read, write: if true;`, correr `npm run seed`, y luego
> volver a las reglas de producción.

---

## 🧱 Arquitectura

```
src/
├── firebase/      Configuración e inicialización de Firebase + referencias tipadas
├── types/         Modelos de datos (Category, Professional, User, Request, Favorite)
├── services/      Capa de acceso a Firestore (queries y mutaciones)
├── hooks/         Lógica reutilizable (useCategories, useProfessional, useAuth…)
├── contexts/      AuthContext + AuthProvider
├── components/
│   ├── ui/         Design System (Button, Input, Badge, Card, Select…)
│   ├── layout/     Navbar, Footer, MobileMenu, Logo
│   ├── home/       Hero, SearchBar, CategoriesGrid, FeaturedProfessionals…
│   ├── professionals/  ProfessionalCard, ProfileHeader, ContactForm…
│   ├── filters/    FiltersSidebar y controles
│   └── shared/     WhatsAppButton, CallButton, PageHero…
├── layouts/       PublicLayout, AdminLayout
├── pages/         public / auth / admin
├── routes/        AppRoutes, ProtectedRoute
└── utils/         constants, whatsapp, slugify, format, categoryColors…
```

## 🗺️ Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Home (hero, categorías, destacados, CTA) |
| `/:categorySlug` | Listado de una categoría (ej. `/electricistas`) con filtros |
| `/profesional/:slug` | Perfil individual del profesional |
| `/como-funciona` | Cómo funciona la plataforma |
| `/publicar` | Formulario para publicar un servicio |
| `/contacto` | Página de contacto |
| `/login` | Login (estructura preparada) |
| `/admin` | Panel administrador (placeholder) |

## 🎨 Design System

- **Colores:** azul (`brand`) = confianza · verde (`accent`) = acción/WhatsApp · grises muy suaves.
- **Tipografía:** Inter.
- **Cards** con sombras suaves, bordes redondeados y hover elevado sutil.
- Tokens definidos en [`tailwind.config.ts`](./tailwind.config.ts).

## 🔥 Colecciones de Firestore

`categories` · `professionals` · `users` · `requests` · `favorites`
(sin reseñas ni puntuaciones en el MVP).

## 📦 Scripts

| Comando | Acción |
|---------|--------|
| `npm run dev` | Entorno de desarrollo |
| `npm run build` | Build de producción |
| `npm run typecheck` | Chequeo de tipos |
| `npm run seed` | Poblar Firestore con datos de ejemplo |
| `npm run lint` | Linter |

---

### Próximas etapas (fuera del MVP)
- Panel administrador (`/admin`) con CRUD de profesionales, categorías y solicitudes.
- Login real con roles (`admin`, `professional`, `client`).
- Reseñas y puntuaciones.
- Subida de imágenes a Firebase Storage.
