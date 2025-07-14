import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ProtectRoute from "@/components/ProtectRoute";
import TelegramBackButton from "@/components/telegram/BackButton";

const lexend = Lexend({
  variable: "--font-lexend-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ALO AUTO",
  description: "ALO AUTO - Avtomobil sotuvchi platformasi",
  manifest: "/manifest.json",
  themeColor: "#3563E9",
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
    shortcut: "/icons/icon-192x192.png",
  },
  openGraph: {
    title: "ALO AUTO",
    description: "ALO AUTO - Avtomobil sotuvchi platformasi",
    images: ["/icons/icon-192x192.png"],
  },
  twitter: {
    card: "summary",
    title: "ALO AUTO",
    description: "ALO AUTO - Avtomobil sotuvchi platformasi",
    images: ["/icons/icon-192x192.png"],
  },
  keywords: ["ALO AUTO", "Avtomobil sotuvchi platformasi"],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://aloavto.mirabbosoff.uz",
  },
  metadataBase: new URL("https://aloavto.mirabbosoff.uz"),
  creator: "ALO AUTO",
  publisher: "ALO AUTO",
  applicationName: "ALO AUTO",
  authors: [{ name: "ALO AUTO", url: "https://aloavto.mirabbosoff.uz" }],
  category: "auto",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3563E9" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body
        suppressHydrationWarning
        className={`${lexend.variable} antialiased bg-white`}
      >
        <Toaster position="top-right" />
        <ProtectRoute>
          <TelegramBackButton />
          {children}
        </ProtectRoute>
      </body>
    </html>
  );
}
