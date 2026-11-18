"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";

const LOGO_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDoakYXSXCVwbWIJ0jm-8bgZ0R5M-SIs8xZkf9u4OHzWtJbppcKq2ASwdEiz3WIm5QyE3dUC6YD0kdbHDZxFl6b7skGsm93gpj04UzX-feaWJzOhNkf5sRSN9oQm8pPDaAG4GN3RNWKNXtpBwhOD5uymlKoQUHOe43Jn6S9FnTNXkK4yJZLG4W4wvAuggNogb-phk1WQXc8c3ojnxhfqnrR5O0S6HYlyXPeM_gJr3FL";

export default function Header({
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onNavigateHome,
}: {
  onSearchChange?: (val: string) => void;
  selectedCategory?: string;
  onSelectCategory?: (catId: string) => void;
  onNavigateHome?: () => void;
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

  const handleHomeClick = () => {
    if (onNavigateHome) onNavigateHome();
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 bg-surface/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-cuero-crudo/60">
        {/* Top Bar Tradición Criolla */}
        <div className="w-full bg-cuero-habano text-cuero-crudo py-1.5 px-gutter-mobile lg:px-gutter">
          <div className="max-w-7xl mx-auto flex items-center justify-between font-label-sm text-label-sm tracking-wider uppercase">
            <div className="hidden sm:flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-[14px] text-bronce-envejecido">
                verified
              </span>
              <span>Tradición Gaucha y Trabajo Artesanal</span>
            </div>
            <div className="mx-auto sm:mx-0 text-center">
              <span className="text-cuero-crudo">Envíos a todo el país</span>
              <span className="mx-1.5 text-bronce-envejecido">•</span>
              <span className="text-tertiary-fixed">15% OFF Transferencia</span>
              <span className="mx-1.5 text-bronce-envejecido">•</span>
              <span className="text-cuero-crudo">Trabajos a medida por encargo</span>
            </div>
            <div className="hidden md:flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-[14px] text-bronce-envejecido">
                shield
              </span>
              <span>Garantía de Origen • Esquel, Chubut</span>
            </div>
          </div>
        </div>

        {/* Main Header Bar */}
        <div className="h-20 w-full">
          <div className="max-w-7xl mx-auto h-full px-gutter-mobile lg:px-gutter flex items-center justify-between gap-space-md">
            {/* Logo */}
            <a
              href="#"
              onClick={handleHomeClick}
              className="flex items-center gap-space-md shrink-0 group"
            >
              <img
                alt="Logo Los Troperos"
                className="h-10 w-10 rounded-full object-contain border border-cuero-crudo shadow-xs group-hover:scale-105 transition-transform"
                src={LOGO_URL}
              />
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-cuero-habano tracking-tight leading-none">
                  Los Troperos
                </span>
                <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase mt-0.5">
                  Talabartería &amp; Platería
                </span>
              </div>
            </a>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-space-lg font-label-lg text-label-lg">
              <a
                href="#"
                onClick={handleHomeClick}
                className="py-space-xs transition-colors text-primary font-semibold border-b-2 border-primary"
              >
                Inicio
              </a>
              <a
                href="#catalogo"
                onClick={handleHomeClick}
                className="py-space-xs text-on-surface-variant hover:text-on-surface transition-colors"
              >
                Catálogo / Tienda
              </a>
              <a
                href="#categorias"
                onClick={handleHomeClick}
                className="py-space-xs text-on-surface-variant hover:text-on-surface transition-colors"
              >
                El Taller
              </a>
              <a
                href="#testimonios-patagonia"
                onClick={handleHomeClick}
                className="py-space-xs text-on-surface-variant hover:text-on-surface transition-colors"
              >
                Costumbres &amp; Guías
              </a>
              <a
                href="#encargos"
                onClick={handleHomeClick}
                className="py-space-xs text-on-surface-variant hover:text-on-surface transition-colors"
              >
                Contacto
              </a>
            </nav>

            {/* Search & Action Icons */}
            <div className="flex items-center gap-space-sm sm:gap-space-md shrink-0">
              {/* Buscador */}
              <div className="hidden md:flex items-center bg-surface-container rounded-lg px-space-sm py-1.5 border border-cuero-crudo focus-within:border-primary-container transition-all">
                <span className="material-symbols-outlined text-secondary text-[20px] mr-space-xs">
                  search
                </span>
                <input
                  className="bg-transparent text-on-surface placeholder:text-on-surface-variant/60 font-body-sm text-body-sm focus:outline-none w-44 xl:w-56"
                  placeholder="Buscar aperos, cuchillos, mates..."
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>

              {/* Botón CP / Zona de Envío */}
              <button
                onClick={() => setCpModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-container text-secondary hover:bg-surface-container-high hover:text-on-surface transition-colors border border-cuero-crudo/60"
                title="Calcular envío por Código Postal"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">
                  location_on
                </span>
                <span className="font-label-sm text-[11px] text-cuero-habano max-w-[95px] truncate">
                  {shipping.isCalculated ? `CP ${shipping.postalCode}` : "Calcular CP"}
                </span>
              </button>

              {/* WhatsApp */}
              <a
                className="flex items-center justify-center p-2 rounded-lg bg-surface-container text-secondary hover:bg-surface-container-high hover:text-on-surface transition-colors"
                href="https://wa.me/5492945532486?text=Hola%20Talabarter%C3%ADa%20Los%20Troperos,%20quisiera%20hacerles%20una%20consulta"
                rel="noopener noreferrer"
                target="_blank"
                title="Atención directa por WhatsApp"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
              </a>

              {/* Carrito */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center justify-center p-2 rounded-lg bg-surface-container text-secondary hover:bg-surface-container-high hover:text-on-surface transition-colors"
                title="Carrito de compras"
                type="button"
                aria-label="Abrir Carrito"
              >
                <span className="material-symbols-outlined text-[20px]">
                  shopping_bag
                </span>
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-on-primary font-label-sm text-[10px] flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              </button>

              {/* Perfil / Ubicación Taller */}
              <button
                onClick={() => setCpModalOpen(true)}
                className="w-8 h-8 rounded-full bg-primary hover:bg-bordo-profundo flex items-center justify-center shrink-0 shadow-sm transition-colors"
                title="Ubicación y Envíos"
                type="button"
              >
                <span className="material-symbols-outlined text-on-primary text-[18px]">
                  person
                </span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-cuero-habano hover:bg-surface-container"
                type="button"
                aria-label="Menú"
              >
                <span className="material-symbols-outlined text-[22px]">
                  {mobileMenuOpen ? "close" : "menu"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu & Search */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-surface border-t border-cuero-crudo px-gutter-mobile py-space-md space-y-space-sm shadow-lg">
            <div className="flex items-center bg-surface-container rounded-lg px-space-sm py-2 border border-cuero-crudo">
              <span className="material-symbols-outlined text-secondary text-[20px] mr-space-xs">
                search
              </span>
              <input
                className="bg-transparent text-on-surface placeholder:text-on-surface-variant/60 font-body-sm text-body-sm focus:outline-none w-full"
                placeholder="Buscar aperos, cuchillos, alforjas..."
                type="text"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <nav className="flex flex-col space-y-1 font-label-lg text-label-lg">
              <a
                href="#"
                onClick={() => {
                  handleHomeClick();
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 rounded-lg text-primary font-semibold bg-surface-container"
              >
                Inicio
              </a>
              <a
                href="#catalogo"
                onClick={() => {
                  handleHomeClick();
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 rounded-lg text-cuero-habano hover:bg-surface-container"
              >
                Catálogo / Tienda
              </a>
              <a
                href="#categorias"
                onClick={() => {
                  handleHomeClick();
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 rounded-lg text-cuero-habano hover:bg-surface-container"
              >
                El Taller
              </a>
              <a
                href="#testimonios-patagonia"
                onClick={() => {
                  handleHomeClick();
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 rounded-lg text-cuero-habano hover:bg-surface-container"
              >
                Costumbres &amp; Guías
              </a>
              <a
                href="#encargos"
                onClick={() => {
                  handleHomeClick();
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 rounded-lg text-cuero-habano hover:bg-surface-container"
              >
                Contacto
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Modal de Código Postal / Envíos */}
      {cpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-surface rounded-xl max-w-md w-full p-space-lg shadow-2xl border border-cuero-crudo relative">
            <button
              onClick={() => setCpModalOpen(false)}
              className="absolute top-4 right-4 text-secondary hover:text-cuero-habano"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="flex items-center gap-space-sm mb-space-md">
              <div className="w-10 h-10 rounded-lg bg-surface-container text-primary flex items-center justify-center border border-cuero-crudo">
                <span className="material-symbols-outlined text-[22px]">
                  local_shipping
                </span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-cuero-habano">
                  Calculá tu Envío o Retiro en Taller
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Despachos asegurados desde Esquel a todo el país
                </p>
              </div>
            </div>

            <form onSubmit={handleCpSubmit} className="space-y-space-md">
              <div>
                <label className="block font-label-md text-label-md uppercase text-secondary mb-1.5">
                  Código Postal (ej: 9200, 1425, 8400)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tempCp}
                    onChange={(e) => setTempCp(e.target.value)}
                    placeholder="Ej: 9200"
                    maxLength={8}
                    className="flex-1 px-space-md py-2 rounded-lg bg-surface-container-lowest border border-plata-alpaca focus:outline-none focus:border-primary font-body-sm text-body-sm text-cuero-habano font-semibold"
                  />
                  <button
                    type="submit"
                    className="px-space-lg py-2 rounded-lg bg-primary hover:bg-bordo-profundo text-on-primary font-label-md text-label-md uppercase tracking-wider transition-colors"
                  >
                    Calcular
                  </button>
                </div>
              </div>

              {shipping.isCalculated && (
                <div className="p-space-md rounded-lg bg-surface-container border border-cuero-crudo space-y-2 font-body-sm text-body-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-cuero-habano">
                      Destino: <strong>{shipping.city}</strong> ({shipping.postalCode})
                    </span>
                    <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-[10px] uppercase">
                      100% Bonificado
                    </span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Costo habitual de flete:</span>
                    <span className="line-through">
                      ${shipping.originalCost.toLocaleString("es-AR")} ARS
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-primary border-t border-cuero-crudo pt-2">
                    <span>Envío para tu pedido:</span>
                    <span>¡BONIFICADO!</span>
                  </div>
                </div>
              )}

              <div className="p-space-sm rounded-lg bg-surface-container-low border border-cuero-crudo font-body-sm text-body-sm text-on-surface-variant flex items-start gap-2">
                <span className="material-symbols-outlined text-bronce-envejecido text-[18px] mt-0.5">
                  storefront
                </span>
                <span>
                  <strong className="text-cuero-habano">Retiro sin cargo en Taller:</strong>{" "}
                  Dante Brozzi 669, Esquel, Chubut (Lunes a Sábado).
                </span>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
