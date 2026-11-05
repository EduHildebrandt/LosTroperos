import React from "react";
import Link from "next/link";
import {
  Compass,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Truck,
  CreditCard,
  HeartHandshake,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#24150d] text-[#e8dfd1] border-t border-[#4d2f1f] mt-20">
      {/* 3 Badges de Confianza Criolla */}
      <div className="border-b border-[#3d2314] py-8 bg-[#1e110a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-amber-200 text-sm">
                Artesanía Criolla de Autor
              </h4>
              <p className="text-xs text-stone-300">
                Cueros curtidos al tanino, hojas de acero forjado y soguería sobada a mano.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-amber-200 text-sm">
                Envíos desde Esquel a todo el País
              </h4>
              <p className="text-xs text-stone-300">
                Despachamos por Correo y encomiendas con seguimiento y flete bonificado.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-amber-200 text-sm">
                15% OFF en Transferencia
              </h4>
              <p className="text-xs text-stone-300">
                Descuento directo e instantáneo al confirmar tu pedido con comprobante.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Identidad de Marca */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl leather-gradient flex items-center justify-center text-amber-200 shadow-md">
              <Compass className="w-6 h-6" />
            </div>
            <span className="text-xl font-serif font-black tracking-tight text-amber-100">
              LOS TROPEROS
            </span>
          </div>
          <p className="text-xs text-stone-400 leading-relaxed">
            Talabartería, soguería tradicional y elementos criollos para el jinete, el caballo y la vida de campo patagónica.
          </p>
          <div className="pt-2">
            <a
              href="https://www.instagram.com/talabarteria_lostroperos/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-pink-900/30 text-pink-300 hover:bg-pink-900/50 text-xs font-semibold border border-pink-700/40 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @talabarteria_lostroperos
            </a>
          </div>
        </div>

        {/* Showroom & Taller Físico */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-amber-200 text-sm uppercase tracking-wider">
            Nuestro Taller & Local
          </h4>
          <ul className="space-y-2 text-xs text-stone-300">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Dante Brozzi 669, Esquel, Chubut (CP 9200)</span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p>Lun a Vie: 9:00 - 13:00 / 16:30 - 20:30</p>
                <p>Sábados: 9:30 - 13:30</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <a
                href="https://wa.me/5492945532486"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-amber-300 font-semibold"
              >
                +54 9 2945 53-2486
              </a>
            </li>
          </ul>
        </div>

        {/* Categorías Principales */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-amber-200 text-sm uppercase tracking-wider">
            Rubros Criollos
          </h4>
          <ul className="space-y-2 text-xs text-stone-300">
            <li>
              <a href="#catalogo" className="hover:text-amber-300 transition-colors">
                • Aperos, Bastos y Monturas
              </a>
            </li>
            <li>
              <a href="#catalogo" className="hover:text-amber-300 transition-colors">
                • Cuchillería Criolla y de Autor
              </a>
            </li>
            <li>
              <a href="#catalogo" className="hover:text-amber-300 transition-colors">
                • Soguería de Trabajo y Lazos
              </a>
            </li>
            <li>
              <a href="#catalogo" className="hover:text-amber-300 transition-colors">
                • Indumentaria, Boinas y Ponchos
              </a>
            </li>
            <li>
              <a href="#catalogo" className="hover:text-amber-300 transition-colors">
                • Cojinillos de Oveja Patagónica
              </a>
            </li>
          </ul>
        </div>

        {/* Atención y Envíos */}
        <div className="space-y-3">
          <h4 className="font-serif font-bold text-amber-200 text-sm uppercase tracking-wider">
            Atención Personalizada
          </h4>
          <p className="text-xs text-stone-400">
            ¿Buscás una medida especial de montura, un grabado personalizado en hoja de cuchillo o un apero a medida?
          </p>
          <a
            href="https://wa.me/5492945532486?text=Hola,%20quisiera%20consultar%20por%20un%20trabajo%20a%20medida%20en%20cuero/cuchillo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-emerald-100 font-semibold text-xs transition-colors shadow-sm"
          >
            <HeartHandshake className="w-4 h-4" />
            Consultar por Trabajo Especial
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-[#3d2314] py-6 text-center text-[11px] text-stone-500 bg-[#170d07]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© {new Date().getFullYear()} Talabartería Los Troperos &bull; Esquel, Chubut, Argentina.</p>
          <p className="text-stone-400">Hecho con orgullo y tradición patagónica.</p>
        </div>
      </div>
    </footer>
  );
}
