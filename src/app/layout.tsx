// src/app/layout.tsx (exemple)
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BTP Studio",
  description: "App BTP – Dashboard & projets",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body>{children}</body>
    </html>
  );
}
