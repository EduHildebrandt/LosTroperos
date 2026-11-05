-- ========================================================
-- Script de Creación de Tablas PostgreSQL para Los Troperos
-- Compatible con PostgreSQL 12+, Supabase, Neon, Railway y RDS
-- ========================================================

-- Habilitar extensión para UUIDs si es necesario
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabla de Categorías Criollas
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    "itemCount" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de Productos
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    features TEXT[] DEFAULT ARRAY[]::TEXT[],
    price INTEGER NOT NULL,
    "compareAtPrice" INTEGER,
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    stock INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT false,
    badge VARCHAR(100),
    material VARCHAR(255),
    origin VARCHAR(255) DEFAULT 'Esquel, Chubut - Patagonia Argentina',
    "categoryId" VARCHAR(64) NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabla de Variantes de Producto
CREATE TABLE IF NOT EXISTS product_variants (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(100),
    "priceModifier" INTEGER DEFAULT 0,
    stock INTEGER DEFAULT 0,
    "productId" VARCHAR(64) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabla de Órdenes / Pedidos
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(64) PRIMARY KEY,
    "orderNumber" VARCHAR(50) UNIQUE NOT NULL,
    "customerName" VARCHAR(255) NOT NULL,
    "customerEmail" VARCHAR(255),
    "customerPhone" VARCHAR(100) NOT NULL,
    "customerDni" VARCHAR(50),
    "shippingOption" VARCHAR(50) DEFAULT 'delivery',
    address TEXT,
    city VARCHAR(100),
    province VARCHAR(100) DEFAULT 'Argentina',
    "postalCode" VARCHAR(20),
    "shippingCost" INTEGER DEFAULT 0,
    subtotal INTEGER NOT NULL,
    "discountAmount" INTEGER DEFAULT 0,
    total INTEGER NOT NULL,
    "paymentMethod" VARCHAR(50) DEFAULT 'transfer',
    status VARCHAR(50) DEFAULT 'pending_payment',
    notes TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabla de Items de la Orden
CREATE TABLE IF NOT EXISTS order_items (
    id VARCHAR(64) PRIMARY KEY,
    "orderId" VARCHAR(64) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    "productId" VARCHAR(64) NOT NULL REFERENCES products(id),
    "productName" VARCHAR(255) NOT NULL,
    "variantName" VARCHAR(255),
    price INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    subtotal INTEGER NOT NULL,
    image TEXT
);

-- Índices para optimizar búsquedas frecuentes
CREATE INDEX IF NOT EXISTS idx_products_category ON products("categoryId");
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_variants_product ON product_variants("productId");
CREATE INDEX IF NOT EXISTS idx_orders_number ON orders("orderNumber");
