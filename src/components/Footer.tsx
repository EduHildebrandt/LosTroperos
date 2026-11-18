"use client";

import React, { useState } from "react";

const LOGO_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDoakYXSXCVwbWIJ0jm-8bgZ0R5M-SIs8xZkf9u4OHzWtJbppcKq2ASwdEiz3WIm5QyE3dUC6YD0kdbHDZxFl6b7skGsm93gpj04UzX-feaWJzOhNkf5sRSN9oQm8pPDaAG4GN3RNWKNXtpBwhOD5uymlKoQUHOe43Jn6S9FnTNXkK4yJZLG4W4wvAuggNogb-phk1WQXc8c3ojnxhfqnrR5O0S6HYlyXPeM_gJr3FL";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-surface-container-low text-on-surface pt-space-xl pb-space-lg border-t border-cuero-crudo">
      <div className="max-w-7xl mx-auto px-gutter-mobile lg:px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl pb-space-xl">
          {/* Columna 1: Identidad */}
          <div className="space-y-space-md">
            <div className="flex items-center gap-space-sm">
              <img
                alt="Logo Los Troperos"
                className="h-9 w-9 rounded-full object-contain border border-cuero-crudo"
                src={LOGO_URL}
              />
              <span className="font-headline-sm text-headline-sm text-cuero-habano">
                Los Troperos
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Herencia ecuestre, nobleza del cuero crudo y maestría artesana en
              cada costura. Fabricamos piezas gauchas auténticas que perduran por
              generaciones en el campo argentino.
            </p>
            <div className="text-body-sm font-body-sm text-cuero-habano space-y-1">
              <p className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-bronce-envejecido">
                  location_on
                </span>
                <span>Dante Brozzi 669, Esquel, Chubut</span>
              </p>
              <p className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px] text-bronce-envejecido">
                  call
                </span>
                <a
                  href="https://wa.me/5492945532486"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  +54 9 2945 53-2486
                </a>
              </p>
            </div>
            <div className="pt-space-xs">
              <span className="font-label-sm text-label-sm text-bronce-envejecido uppercase tracking-widest block mb-space-xs">
                Seguinos en el rincón campero
              </span>
              <a
                className="inline-flex items-center gap-space-xs font-label-md text-label-md text-cuero-habano hover:text-primary transition-colors"
                href="https://www.instagram.com/talabarteria_lostroperos/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="material-symbols-outlined text-[16px]">
                  tag
                </span>
                @talabarteria_lostroperos
              </a>
            </div>
          </div>

          {/* Columna 2: Categorías Camperas */}
          <div className="space-y-space-md">
            <span className="font-title-md text-title-md text-cuero-habano block uppercase tracking-wider">
              Categorías Camperas
            </span>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <li className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[14px] text-bronce-envejecido">
                  chevron_right
                </span>
                <a className="hover:text-primary transition-colors" href="#catalogo">
                  Monturas, Bastos y Cangallas
                </a>
              </li>
              <li className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[14px] text-bronce-envejecido">
                  chevron_right
                </span>
                <a className="hover:text-primary transition-colors" href="#catalogo">
                  Alforjas de Lona, Cordura e Impermeables
                </a>
              </li>
              <li className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[14px] text-bronce-envejecido">
                  chevron_right
                </span>
                <a className="hover:text-primary transition-colors" href="#catalogo">
                  Cuchillería Eskilstuna &amp; Vainas
                </a>
              </li>
              <li className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[14px] text-bronce-envejecido">
                  chevron_right
                </span>
                <a className="hover:text-primary transition-colors" href="#catalogo">
                  Sombreros Criollos de Paño Ala 8
                </a>
              </li>
              <li className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[14px] text-bronce-envejecido">
                  chevron_right
                </span>
                <a className="hover:text-primary transition-colors" href="#catalogo">
                  Alpargatas de Yute, Taba y Don Felipe
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Garantía y Confianza */}
          <div className="space-y-space-md">
            <span className="font-title-md text-title-md text-cuero-habano block uppercase tracking-wider">
              Garantía y Confianza
            </span>
            <div className="space-y-space-sm">
              <div className="flex items-start gap-space-sm p-space-sm bg-surface-container rounded-lg">
                <span className="material-symbols-outlined text-primary-container text-[20px] mt-0.5">
                  workspace_premium
                </span>
                <div>
                  <h4 className="font-label-md text-label-md text-cuero-habano uppercase">
                    Certificado de Origen
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Cueros genuinos seleccionados y curtidos con métodos
                    tradicionales.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-space-sm p-space-sm bg-surface-container rounded-lg">
                <span className="material-symbols-outlined text-primary-container text-[20px] mt-0.5">
                  local_shipping
                </span>
                <div>
                  <h4 className="font-label-md text-label-md text-cuero-habano uppercase">
                    Envíos Seguros
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Embalaje especial protegido a todas las provincias del país.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna 4: Club de Campo */}
          <div className="space-y-space-md">
            <span className="font-title-md text-title-md text-cuero-habano block uppercase tracking-wider">
              Club de Campo
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Suscríbase para recibir novedades del taller, lanzamientos
              exclusivos de piezas únicas y relatos tradicionales.
            </p>
            <form className="space-y-space-sm" onSubmit={handleSubscribe}>
              <div className="flex flex-col gap-space-xs">
                <input
                  className="w-full px-space-md py-space-sm bg-surface rounded-lg border border-plata-alpaca font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary-container"
                  placeholder="Su correo electrónico"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="w-full py-space-sm px-space-md bg-primary hover:bg-bordo-profundo text-on-primary font-label-lg text-label-lg uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-space-xs cursor-pointer"
                  type="submit"
                >
                  {subscribed ? "¡Bienvenido al Fogón!" : "Unirse al Fogón"}
                </button>
              </div>
              <span className="font-label-sm text-label-sm text-secondary block">
                Respetamos su privacidad. Cero correo no deseado.
              </span>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-space-lg border-t border-cuero-crudo/60 flex flex-col sm:flex-row items-center justify-between gap-space-md">
          <div className="flex flex-wrap items-center gap-space-sm text-on-surface-variant font-label-sm text-label-sm">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-bronce-envejecido">
                credit_card
              </span>
              Tarjetas y Transferencias
            </span>
            <span className="mx-space-xs">•</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-bronce-envejecido">
                lock
              </span>
              Pagos 100% Seguros
            </span>
            <span className="mx-space-xs">•</span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-bronce-envejecido">
                support_agent
              </span>
              Atención Personalizada
            </span>
          </div>
          <p className="font-label-sm text-label-sm text-on-surface-variant text-center sm:text-right">
            © {new Date().getFullYear()} Talabartería Los Troperos. Esquel,
            Chubut, Argentina. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
