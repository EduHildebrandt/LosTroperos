"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import ProductCard from "@/components/ProductCard";
import ProductDetailModal from "@/components/ProductDetailModal";
import DatabaseSeedBanner from "@/components/DatabaseSeedBanner";
import { Product, Category } from "@/types";
import { getCategories, getProducts } from "@/services/productService";
import {
  Compass,
  ShieldCheck,
  Truck,
  Tag,
  MapPin,
  Phone,
  ArrowRight,
  Filter,
  CheckCircle,
} from "lucide-react";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [cats, prods] = await Promise.all([
          getCategories(),
          getProducts(),
        ]);
        setCategories(cats);
        setProducts(prods);
      } catch (e) {
        console.error("Failed to load catalog data:", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" || p.categoryId === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f5]">
      {/* Header y Banner de Sincronización PostgreSQL */}
      <Header
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <DatabaseSeedBanner />

      <main className="flex-1">
        {/* HERO SECTION CRIOLLA PATAGÓNICA */}
        <section className="relative overflow-hidden leather-gradient text-[#fdfbf7] py-16 sm:py-24 border-b border-[#3d2314] shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-600/20 via-transparent to-black/40 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl space-y-6">
              {/* Badge de Ubicación Cordillerana */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-amber-200/30 text-amber-200 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                <span>Esquel, Chubut &bull; Patagonia Argentina</span>
              </div>

              <h1 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl text-amber-100 tracking-tight leading-[1.15]">
                Talabartería, Aperos y Nobleza Criolla
              </h1>

              <p className="text-sm sm:text-base text-amber-100/80 leading-relaxed max-w-2xl">
                Cueros curtidos al tanino, hojas forjadas de acero al carbono, soguería en lonja de potro y prendas tradicionales seleccionadas para el hombre de campo y el jinete patagónico.
              </p>

              {/* Badges de Beneficios Clave */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                  <Tag className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="font-medium">
                    <strong>15% OFF</strong> por Transferencia
                  </span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                  <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-medium">
                    Envío <strong>100% Bonificado</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
                  <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="font-medium">
                    Garantía de Taller Artesanal
                  </span>
                </div>
              </div>

              {/* Botones CTA */}
              <div className="flex flex-wrap gap-3 pt-3">
                <a
                  href="#catalogo"
                  className="px-6 py-3.5 rounded-xl gold-badge font-bold text-xs sm:text-sm shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>Explorar Catálogo</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="https://wa.me/5492945532486?text=Hola%20Talabarter%C3%ADa%20Los%20Troperos,%20quisiera%20hacerles%20una%20consulta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Atención por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN CATÁLOGO & FILTROS */}
        <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#8c5836] uppercase tracking-wider">
                <Filter className="w-3.5 h-3.5" />
                <span>Nuestras Especialidades Criollas</span>
              </div>
              <h2 className="font-serif font-black text-2xl sm:text-3xl text-[#261b14] mt-1">
                Catálogo de Campo & Talabartería
              </h2>
            </div>

            {/* Contador de artículos */}
            <span className="text-xs text-stone-500 font-medium">
              Mostrando {filteredProducts.length} artículo{filteredProducts.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Chips de Categorías */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedCategory === "all"
                  ? "leather-gradient text-amber-50 shadow-md scale-105"
                  : "bg-white text-[#4a3528] border border-[#dfd2be] hover:bg-[#f3ece1]"
              }`}
            >
              Todos los Artículos
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedCategory === cat.id
                    ? "leather-gradient text-amber-50 shadow-md scale-105"
                    : "bg-white text-[#4a3528] border border-[#dfd2be] hover:bg-[#f3ece1]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Grilla de Productos */}
          {loading ? (
            <div className="py-20 text-center">
              <div className="w-10 h-10 border-4 border-[#7b4224] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-xs text-stone-500">Cargando catálogo artesanal...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-3xl border border-[#eadfcb] p-8">
              <p className="font-serif font-bold text-lg text-[#3d2314]">
                No encontramos artículos con ese criterio de búsqueda
              </p>
              <p className="text-xs text-stone-500 mt-1">
                Probá con otra categoría o restablecé los filtros.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchTerm("");
                }}
                className="mt-4 px-5 py-2.5 rounded-xl leather-gradient text-amber-100 font-bold text-xs"
              >
                Ver todos los productos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onOpenDetail={setDetailProduct}
                />
              ))}
            </div>
          )}
        </section>

        {/* SECCIÓN INSTITUCIONAL: SOBRE NUESTRO TALLER */}
        <section className="bg-[#f3ece1] border-t border-[#dfd2be] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-5">
                <span className="text-xs font-bold uppercase tracking-widest text-[#8c5836]">
                  El Oficio & La Tradición
                </span>
                <h3 className="font-serif font-black text-2xl sm:text-4xl text-[#261b14] leading-tight">
                  Hecho a mano en Esquel para durar generaciones
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  En <strong>Talabartería Los Troperos</strong> concebimos cada montura, lazo y cuchillo respetando los tiempos y técnicas de la tradición criolla patagónica. Trabajamos con cueros vacunos de primera flor curtidos al tanino vegetal, hojas forjadas con tratamientos térmicos precisos y soguería sobada a grasa natural.
                </p>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2.5 text-xs text-[#3d2314] font-medium">
                    <CheckCircle className="w-4 h-4 text-[#7b4224]" />
                    <span>Cueros nobles que adquieren mejor pátina y flexibilidad con el uso</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#3d2314] font-medium">
                    <CheckCircle className="w-4 h-4 text-[#7b4224]" />
                    <span>Costuras al tiento de potro y pasadores forjados para soportar el trabajo rudo</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#3d2314] font-medium">
                    <CheckCircle className="w-4 h-4 text-[#7b4224]" />
                    <span>Atención y asesoramiento personalizado de jinete a jinete</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://www.instagram.com/talabarteria_lostroperos/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#7b4224] hover:underline"
                  >
                    <span>Conocé más de nuestro día a día en Instagram</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Tarjeta de Local Físico */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#eadfcb] shadow-xl space-y-4">
                <div className="w-12 h-12 rounded-2xl leather-gradient text-amber-200 flex items-center justify-center shadow-md">
                  <Compass className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-xl text-[#261b14]">
                  Visitanos en nuestro Local & Taller
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Si estás en la comarca andina del Chubut o visitando la zona cordillerana, te esperamos en nuestro local físico:
                </p>

                <div className="p-4 rounded-2xl bg-[#fbf9f5] border border-[#dfd2be] space-y-2 text-xs text-[#3d2314]">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#7b4224] shrink-0" />
                    <strong>Dante Brozzi 669, Esquel, Chubut (CP 9200)</strong>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>WhatsApp directo: +54 9 2945 53-2486</span>
                  </p>
                </div>

                <a
                  href="https://maps.google.com/?q=Dante+Brozzi+669,+Esquel,+Chubut"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl border border-[#7b4224] text-[#7b4224] hover:bg-[#7b4224] hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Ver Ubicación en Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Drawer del Carrito */}
      <CartDrawer />

      {/* Modal de Finalización de Compra */}
      <CheckoutModal />

      {/* Modal de Ficha de Producto */}
      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
      />
    </div>
  );
}
