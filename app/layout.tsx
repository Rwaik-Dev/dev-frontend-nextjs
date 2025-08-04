import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Product CRUD - FakeStore API",
  description: "Aplicação CRUD de produtos utilizando Next.js, TypeScript e FakeStore API",
  keywords: ["Next.js", "TypeScript", "CRUD", "Products", "FakeStore API"],
  authors: [{ name: "Developer" }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <Toaster richColors position="top-right" />
        {children}
      </body>
    </html>
  );
}
