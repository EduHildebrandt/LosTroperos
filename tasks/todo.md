# Squad Status & Tasks: Talabartería Los Troperos E-Commerce

## Squad Status Table
| Task ID | Component / Feature | Assignee | Status | Definition of Done |
|---|---|---|---|---|
| TASK-01 | Inicialización de Proyecto & Configuración Next.js | Frontend Lead | DONE | Next.js 16 + React 19 + TypeScript + Tailwind v4 en la raíz |
| TASK-02 | Migración de DB: Setup PostgreSQL + Prisma ORM | Backend / DB | DONE | Prisma 6.4.1, `prisma/schema.prisma` y singleton `src/lib/prisma.ts` |
| TASK-03 | Script SQL & Seed para PostgreSQL | DB / Data | DONE | `prisma/schema.sql` nativo y `prisma/seed.ts` ejecutable con `npm run db:seed` |
| TASK-04 | Adaptación de Servicios & API Routes | Backend / API | DONE | `/api/catalog`, `/api/orders` y `/api/seed` con Prisma + fallback resiliente |
| TASK-05 | Banner de Sincronización PostgreSQL en UI | Frontend | DONE | `DatabaseSeedBanner.tsx` en header con estado y acción de sembrado |
| TASK-06 | Actualización de Variables `.env.local` y `.env.example` | DevOps | DONE | `DATABASE_URL=postgresql://...` configurado y documentado |
| TASK-07 | Verificación de Compilación `npm run build` | QA / Lead | DONE | Build exitoso (0 errores), servidor activo en localhost:3000 |

## Next Immediate Steps
1. Cuando tengas lista tu base de datos PostgreSQL (local, Supabase, Neon o Railway), actualiza `DATABASE_URL` en `.env.local`.
2. Para aplicar las tablas directamente puedes ejecutar `npm run db:push` o correr el script SQL [`prisma/schema.sql`](file:///c:/Users/Edu/Documents/Desarrollo/Los%20Troperos/prisma/schema.sql) en tu cliente SQL (pgAdmin/DBeaver/Supabase).
3. Para sembrar los datos criollos, presiona el botón "Sembrar Catálogo en PostgreSQL" en la barra superior o ejecuta `npm run db:seed`.
