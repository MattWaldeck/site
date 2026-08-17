import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const anton = localFont({
  src: "../../public/fonts/anton.woff2",
  variable: "--font-anton",
  weight: "400",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RB & Son Transport — Redesign Concept",
  description:
    "RB & Son Transport (Cape) — warehousing, distribution and dangerous goods transport across South Africa.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={anton.variable} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
