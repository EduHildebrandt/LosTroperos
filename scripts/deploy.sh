#!/usr/bin/env bash
set -e

echo "🐎 Iniciando despliegue de Talabartería Los Troperos en VPS..."

# 1. Obtener últimos cambios
echo "📥 Descargando cambios desde Git..."
git pull origin main

# 2. Instalar dependencias
echo "📦 Instalando dependencias..."
npm ci

# 3. Generar cliente Prisma y aplicar migraciones
echo "🗄️ Actualizando esquema de PostgreSQL..."
npx prisma generate
npx prisma db push

# 4. Compilar proyecto Next.js
echo "⚙️ Compilando aplicación Next.js para producción..."
npm run build

# 5. Reiniciar servicio (PM2 o Docker)
if command -v pm2 >/dev/null 2>&1; then
    echo "🔄 Recargando con PM2..."
    pm2 reload ecosystem.config.js || pm2 start ecosystem.config.js
else
    echo "ℹ️ PM2 no detectado. Si usas Docker ejecuta: docker compose up -d --build"
fi

echo "✅ Despliegue finalizado exitosamente en http://localhost:3000"
