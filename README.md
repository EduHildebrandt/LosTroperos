# Talabartería Los Troperos - E-Commerce Criollo Patagónico

Plataforma de comercio electrónico moderna, rápida y orientada a la conversión para **Talabartería Los Troperos**, tradicional casa de aperos, monturas, cuchillería de autor, soguería y artículos regionales ubicada en **Dante Brozzi 669, Esquel, Chubut (Patagonia Argentina)**.

---

## 🐎 Características Principales

- **Identidad Criolla Patagónica Premium:** Paleta noble basada en cueros curtidos al tanino, verde bosque cordillerano, bronce patinado y fondos cálidos marfil/arena con sutil glassmorphism criollo.
- **Incentivo Comercial Activo:** Bonificación del **15% OFF abonando por Transferencia Bancaria** con cálculo automático y desglose en tiempo real.
- **Geolocalización & Envíos:** Selector de Código Postal interactivo con bonificación del 100% en flete y opción de retiro sin cargo en el taller de Esquel.
- **Catálogo Interactivo con Variantes:** Filtros por categorías criollas (*Aperos y Monturas*, *Cuchillería Criolla*, *Soguería y Trabajo*, *Indumentaria Regional*) y selector de medidas/hojas.
- **Checkout & Cierre Ágil:** Formulario de despacho con cálculo de totales, alias y CBU bancario copiable, disparador de confeti y generación de resumen preformateado hacia **WhatsApp oficial (+54 9 2945 53-2486)**.
- **Arquitectura de Datos Resiliente:** Integración con **PostgreSQL y Prisma ORM** con soporte offline/demo para operar con catálogo de respaldo sin bloquear el ciclo de venta.

---

## 🛠️ Stack Tecnológico

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Frontend:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
- **ORM & Base de Datos:** [Prisma ORM 6](https://www.prisma.io/) + [PostgreSQL](https://www.postgresql.org/)
- **Iconografía & UX:** [Lucide React](https://lucide.dev/) + [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 🚀 Instalación y Puesta en Marcha

### 1. Clonar el Repositorio
```bash
git clone https://github.com/EduHildebrandt/LosTroperos.git
cd LosTroperos
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno
Copia el archivo de ejemplo y configura tu conexión a PostgreSQL:
```bash
cp .env.example .env.local
```
Edita `.env.local`:
```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/los_troperos?schema=public"
```

### 4. Crear Tablas y Sembrar Datos en PostgreSQL

**Opción A (Recomendada con Prisma):**
```bash
npm run db:push
npm run db:seed
```

**Opción B (Script SQL Nativo):**
Ejecuta el script [`prisma/schema.sql`](./prisma/schema.sql) directamente en tu cliente preferido (pgAdmin, DBeaver, Supabase SQL Editor o psql).

### 5. Iniciar Servidor de Desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📦 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo en `localhost:3000`.
- `npm run build`: Genera la compilación optimizada para producción.
- `npm run start`: Inicia el servidor de producción.
- `npm run db:push`: Sincroniza el esquema de Prisma con PostgreSQL.
- `npm run db:seed`: Puebla la base de datos con el catálogo inicial de productos criollos.
- `npm run db:studio`: Abre la interfaz visual de Prisma Studio para gestionar datos.

---

## 📍 Contacto & Local Físico

- **Dirección:** Dante Brozzi 669, Esquel, Chubut (CP 9200)
- **Teléfono / WhatsApp:** [+54 9 2945 53-2486](https://wa.me/5492945532486)
- **Instagram:** [@talabarteria_lostroperos](https://www.instagram.com/talabarteria_lostroperos/)
