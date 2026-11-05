"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  ShoppingBag,
  MapPin,
  Phone,
  ShieldCheck,
  Search,
  Menu,
  X,
  Compass,
} from "lucide-react";

export default function Header({
  onSearchChange,
  selectedCategory,
  onSelectCategory,
}: {
  onSearchChange?: (val: string) => void;
  selectedCategory?: string;
  onSelectCategory?: (catId: string) => void;
}) {
  const { cartCount, setIsCartOpen, shipping, calculateShipping } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cpModalOpen, setCpModalOpen] = useState(false);
  const [tempCp, setTempCp] = useState(shipping.postalCode || "");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempCp.trim()) {
      calculateShipping(tempCp.trim());
      setCpModalOpen(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top Banner Promocional */}
      <div className="forest-gradient text-[#e8dfd1] text-xs py-2 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-1.5 text-center md:text-left">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-bold gold-badge">
              PROMO EXCLUSIVA
            </span>
            <span>
              <strong>15% OFF</strong> abonando con Transferencia Bancaria
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] opacity-90">
            <span className="hidden sm:inline flex items-center gap-1">
              📍 Dante Brozzi 669, Esquel, Chubut
            </span>
            <a
              href="https://wa.me/5492945532486?text=Hola%20Talabarter%C3%ADa%20Los%20Troperos,%20quer%C3%ADa%20hacerles%20una%20consulta"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-300 transition-colors flex items-center gap-1 font-semibold"
            >
              <Phone className="w-3 h-3" />
              WhatsApp: +54 9 2945 53-2486
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar con Glassmorphism Criollo */}
      <div className="glass-criollo border-b border-[#eadfcb] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo y Marca */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-12 h-12 rounded-xl leather-gradient flex items-center justify-center text-amber-200 shadow-md group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif font-black tracking-tight text-[#3d2314]">
                LOS TROPEROS
              </span>
              <span className="text-[10px] sm:text-xs tracking-widest uppercase font-semibold text-[#8c5836]">
                Talabartería &bull; Esquel, Patagonia
              </span>
            </div>
          </Link>

          {/* Buscador Rápido (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-6 relative">
            <input
              type="text"
              placeholder="Buscar aperos, cuchillos, lazos, boinas..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full bg-[#fbf9f5] border border-[#d6c7b2] rounded-full pl-10 pr-4 py-2 text-sm text-[#261b14] placeholder-[#9c8473] focus:outline-none focus:ring-2 focus:ring-[#8c5836] focus:border-transparent transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-[#8c5836] absolute left-3.5 top-3" />
          </div>

          {/* Acciones del Header */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Widget de Código Postal / Envíos */}
            <button
              onClick={() => setCpModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#eadfcb] bg-[#fdfbf7] hover:bg-[#f6eee2] transition-colors text-left"
              title="Calcular o cambiar zona de envío"
            >
              <div className="w-8 h-8 rounded-full bg-[#1c3b2b]/10 flex items-center justify-center text-[#1c3b2b] shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-[10px] text-[#8c5836] font-semibold uppercase">
                  Zona de Envío
                </span>
                <span className="text-xs font-bold text-[#261b14] max-w-[130px] truncate">
                  {shipping.isCalculated
                    ? `${shipping.postalCode} (${shipping.city})`
                    : "Calcular CP"}
                </span>
              </div>
            </button>

            {/* Botón Carrito */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 px-4 py-2 rounded-xl leather-gradient text-amber-50 hover:brightness-110 active:scale-95 transition-all shadow-md font-semibold text-sm"
              aria-label="Abrir Carrito"
            >
              <ShoppingBag className="w-5 h-5 text-amber-200" />
              <span className="hidden sm:inline">Mi Carrito</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-400 text-[#2c1810] text-xs font-black flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#3d2314] hover:bg-[#f3ece1]"
              aria-label="Menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Buscador Mobile */}
        <div className="lg:hidden px-4 pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar en el catálogo de campo..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full bg-[#fbf9f5] border border-[#d6c7b2] rounded-full pl-10 pr-4 py-2 text-sm text-[#261b14] placeholder-[#9c8473] focus:outline-none focus:ring-2 focus:ring-[#8c5836]"
            />
            <Search className="w-4 h-4 text-[#8c5836] absolute left-3.5 top-3" />
          </div>
        </div>
      </div>

      {/* Modal / Selector de Código Postal */}
      {cpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#eadfcb] relative">
            <button
              onClick={() => setCpModalOpen(false)}
              className="absolute top-4 right-4 text-[#8c5836] hover:text-[#261b14]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#1c3b2b]/10 text-[#1c3b2b] flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#261b14]">
                  Calculá tu Envío o Retiro
                </h3>
                <p className="text-xs text-[#7b5f4c]">
                  Entregas a toda la República Argentina desde Esquel
                </p>
              </div>
            </div>

            <form onSubmit={handleCpSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#543b2b] mb-1.5">
                  Ingresá tu Código Postal (ej: 9200, 1425, 5400)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tempCp}
                    onChange={(e) => setTempCp(e.target.value)}
                    placeholder="Ej: 9200"
                    maxLength={8}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-[#d6c7b2] focus:outline-none focus:ring-2 focus:ring-[#7b4224] text-sm font-semibold"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl leather-gradient text-amber-100 font-semibold text-sm hover:brightness-110 active:scale-95 transition-all shadow-xs"
                  >
                    Calcular
                  </button>
                </div>
              </div>

              {shipping.isCalculated && (
                <div className="p-3.5 rounded-xl bg-[#f7f4ed] border border-[#e2d5c0] space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-[#4a3528]">
                      Destino: <strong>{shipping.city}</strong> ({shipping.postalCode})
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      100% BONIFICADO
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-[#543b2b]">
                    <span>Costo habitual de flete:</span>
                    <span className="line-through text-stone-400">
                      ${shipping.originalCost.toLocaleString("es-AR")}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[#1c3b2b] border-t border-[#dfd2be] pt-2">
                    <span>Costo final para vos:</span>
                    <span>¡GRATIS!</span>
                  </div>
                </div>
              )}

              <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/80 text-[11px] text-[#7a4e21] flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
                <span>
                  <strong>Retiro sin cargo:</strong> También podés retirar tu pedido personalmente en nuestro taller de <strong>Dante Brozzi 669, Esquel</strong> de Lunes a Sábado.
                </span>
              </div>

              <button
                type="button"
                onClick={() => setCpModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-medium transition-colors"
              >
                Cerrar
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
