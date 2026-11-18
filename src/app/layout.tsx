import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Talabartería Los Troperos | Herencia Criolla & Talabartería - Esquel, Chubut",
  description:
    "Herencia ecuestre, nobleza del cuero crudo y maestría artesana en cada costura. Aperos, bastos, alforjas, cuchillería Eskilstuna con vainas de taller e indumentaria criolla en Esquel, Patagonia Argentina.",
  keywords: [
    "talabarteria los troperos",
    "talabarteria esquel",
    "aperos criollos",
    "bastos brasileros",
    "cuchillos eskilstuna",
    "alforjas de lona",
    "articulos de campo patagonia",
  ],
  openGraph: {
    title: "Talabartería Los Troperos | El Arte Criollo Hecho a Mano",
    description:
      "Tradición, estirpe y nobleza en piezas de cuero genuino trabajadas una a una. Dante Brozzi 669, Esquel, Chubut.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${jakarta.variable} scroll-smooth h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
