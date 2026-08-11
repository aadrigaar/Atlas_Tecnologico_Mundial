import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Atlas Tecnológico Mundial | Explorador de Ecosistemas Tech & Salarios",
    template: "%s | Atlas Tecnológico Mundial",
  },
  description:
    "Plataforma SaaS interactiva para analizar salarios de ingeniería de software, madurez tecnológica, coste de vida y hubs de innovación en 32 países del mundo.",
  metadataBase: new URL("https://atlas-tecnologico.vercel.app"),
  keywords: [
    "Atlas Tecnológico Mundial",
    "Ecosistemas Tecnológicos",
    "Salarios Software Engineer",
    "Mapa Coroplético",
    "Trabajo Remoto",
    "Nómadas Digitales",
    "Developer Salary Index",
    "Ingeniería Informática",
    "Comparativa Países Tech",
  ],
  authors: [{ name: "Adrián García Arranz", url: "https://github.com" }],
  creator: "Adrián García Arranz",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://atlas-tecnologico.vercel.app",
    title: "Atlas Tecnológico Mundial | Explorador de Ecosistemas Tech",
    description:
      "Analiza el poder adquisitivo real de software engineers, salarios por seniority y hubs de tecnología en 32 países con mapas coropléticos e inteligencia visual.",
    siteName: "Atlas Tecnológico Mundial",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlas Tecnológico Mundial",
    description:
      "Explora el ecosistema tecnológico mundial, salarios de software engineering y poder adquisitivo por país.",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
