# Master Roadmap: E-Commerce Talabartería Los Troperos

## 1. Visión y Justificación de Producto (The WHY)
**Talabartería Los Troperos** es un negocio tradicional ubicado en Dante Brozzi 669, Esquel, Chubut (Patagonia Argentina). Su propuesta de valor combina artesanía en cuero, soguería criolla, aperos, monturas, cuchillería de autor e indumentaria tradicional gaucha y de campo.

El objetivo de esta plataforma de e-commerce es:
- **Presencia digital premium**: Reflejar la autenticidad y nobleza de los materiales patagónicos con una estética cuidada ("Estética Criolla Patagónica Premium").
- **Experiencia de compra fluida**: Fichas de producto claras con variantes (tamaños, tipos de cuero, grabados), cálculo de envío estimado/bonificado por CP, y carrito de compras sin fricciones.
- **Incentivos locales y de confianza**: Destacar el **15% OFF abonando por transferencia bancaria** y canal de confirmación directa vía **WhatsApp oficial (+54 9 2945 53-2486)**.
- **Persistencia Relacional Robusta**: Migración completa a **PostgreSQL con Prisma ORM**, garantizando integridad referencial ACID para categorías, productos, variantes y pedidos.

---

## 2. Decisiones de Arquitectura & Stack Técnico
- **Framework**: Next.js 16 (App Router) con React 19 y TypeScript.
- **Estilos**: Tailwind CSS 4 con tokens criollos patagónicos (cuero suela, verde cordillera, bronce/oro, arena).
- **Base de Datos**: **PostgreSQL** mediante **Prisma ORM** (`@prisma/client` + CLI `prisma 6.4.1`).
  - Modelo relacional: `Category` 1-N `Product` 1-N `ProductVariant`, y `Order` 1-N `OrderItem`.
  - Script SQL nativo [`prisma/schema.sql`](file:///c:/Users/Edu/Documents/Desarrollo/Los%20Troperos/prisma/schema.sql) para creación directa de tablas en cualquier cliente SQL.
  - Script de inicialización y seed [`prisma/seed.ts`](file:///c:/Users/Edu/Documents/Desarrollo/Los%20Troperos/prisma/seed.ts) (`npm run db:seed`).
  - Conexión configurada vía `DATABASE_URL` estándar en `.env.local`.
  - Endpoints modulares `/api/catalog`, `/api/orders` y `/api/seed` con arquitectura resiliente offline/demo.
- **Integraciones**:
  - Resumen estructurado y envío a WhatsApp oficial (+54 9 2945 53-2486) con número de pedido y desglose comercial.

---

## 3. Fases de Ejecución & Estado

- [x] **Fase 1: Scaffold, Base de Código y Configuración Inicial**
- [x] **Fase 2: UI Criolla Patagónica, Carrito Reactivo y Checkout**
- [x] **Fase 3: Migración de Base de Datos a PostgreSQL + Prisma ORM**
  - [x] Instalación de Prisma 6.4.1 estable y cliente `@prisma/client`.
  - [x] Definición de `schema.prisma` y generación de cliente tipado.
  - [x] Generación de script SQL nativo `prisma/schema.sql`.
  - [x] Adaptación de servicios y API con fallback resiliente.
  - [x] Script de sembrado (seed) con datos criollos iniciales.
  - [x] Banner interactivo de PostgreSQL en la cabecera.
- [x] **Fase 4: Verificación de Build y Pruebas de Runtime**
  - [x] `npm run build` exitoso con 0 errores de TypeScript y Turbopack.
  - [x] Servidor de desarrollo respondiendo en `http://localhost:3000` (HTTP 200).
  - [x] Endpoint `/api/catalog` verificado respondiendo datos válidos.

---

## [AUTO-HEALED] Revisión de Incidencias & Correcciones Autónomas
1. **Conflicto de Nombres en `create-next-app`**:
   - *Causa*: Directorio con espacios y mayúsculas.
   - *Solución*: Scaffolding en subdirectorio temporal y migración limpia a la raíz.
2. **Ícono no exportado en `lucide-react`**:
   - *Causa*: `Instagram` no está disponible en la versión actual de lucide.
   - *Solución*: Implementación de SVG inline vectorial optimizado en `Footer.tsx`.
3. **Versión de Prisma (v7 vs v6)**:
   - *Causa*: Prisma 7 pre-release modificó la especificación del schema deprecando `url` en `datasource`.
   - *Solución*: Se fijó la versión estable de producción Prisma 6.4.1, asegurando compatibilidad nativa con `DATABASE_URL` y Next.js sin dependencias experimentales.
4. **Limpieza de dependencias Firebase**:
   - *Causa*: Error de resolución de tipos al desacoplar Firebase tras la decisión del usuario de migrar a PostgreSQL.
   - *Solución*: Se eliminó `src/lib/firebase.ts` y se actualizaron los servicios hacia Prisma y Route Handlers (`/api/catalog`, `/api/orders`, `/api/seed`).
