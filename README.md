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

## 🌐 Despliegue en VPS (Ubuntu / Debian con PostgreSQL)

El proyecto está 100% adaptado para correr en tu propio servidor VPS mediante **dos opciones**:

### Opción 1: Despliegue con Docker y Docker Compose (Recomendado)
Levanta tanto PostgreSQL 16 como la app en contenedores aislados con persistencia automática:

1. Edita las credenciales en `docker-compose.yml` o define un archivo `.env`:
   ```bash
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=tu_password_seguro
   POSTGRES_DB=los_troperos
   ```
2. Ejecuta el stack:
   ```bash
   docker compose up -d --build
   ```
3. Inicializa las tablas y el catálogo semilla:
   ```bash
   docker compose exec app npx prisma db push
   docker compose exec app npx tsx prisma/seed.ts
   ```

### Opción 2: Despliegue Nativo con Node.js + PM2 + Nginx
Si tienes PostgreSQL instalado directamente en el sistema operativo del VPS:

1. Configura la base en PostgreSQL:
   ```sql
   CREATE DATABASE los_troperos;
   ```
2. En la carpeta del proyecto, define `.env.local` con tu `DATABASE_URL`.
3. Ejecuta el script automatizado:
   ```bash
   chmod +x scripts/deploy.sh
   ./scripts/deploy.sh
   ```
4. Configura Nginx como reverse proxy utilizando la plantilla incluida en [`nginx/los-troperos.conf`](./nginx/los-troperos.conf) y genera tu certificado HTTPS con Certbot:
   ```bash
   sudo certbot --nginx -d tudominio.com -d www.tudominio.com
   ```

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
