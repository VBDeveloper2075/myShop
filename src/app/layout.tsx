import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ChatWidget } from "@/components/ChatWidget";
import { SanityLive } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: {
    default: "SE VENDE | Artículos Usados en Caseros",
    template: "%s | CB Jamstack Agency",
  },
  description: "Artículos usados en excelente estado. Tecnología, libros, hogar y más. Zona Caseros, Buenos Aires. Piezas únicas a precios accesibles.",
  keywords: ["artículos usados", "segunda mano", "Caseros", "Buenos Aires", "tecnología usada", "libros usados"],
  authors: [{ name: "CB Jamstack Agency", url: "https://cbagency.com" }],
  creator: "CB Jamstack Agency",
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "SE VENDE",
    title: "SE VENDE | Artículos Usados en Caseros",
    description: "Artículos usados en excelente estado. Tecnología, libros, hogar y más.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/se-vende.jpg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#18181b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-zinc-50 antialiased">
        {children}
        <ChatWidget />
        <SanityLive />
      </body>
    </html>
  );
}
