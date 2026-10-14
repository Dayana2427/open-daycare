import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: "variable",
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: "variable",
});

export const metadata: Metadata = {
  title: "OpenDayCare",
  description: "Feed de la Sala Soles",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${nunito.variable} ${fredoka.variable}`}>
      <body>{children}</body>
    </html>
  );
}
