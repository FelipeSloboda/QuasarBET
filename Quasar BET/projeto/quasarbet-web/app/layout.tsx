import type { Metadata } from "next";
import { Exo_2 } from "next/font/google"
import "../styles/globals.css";

export const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Quasar BET",
  description: "Quasar BET",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${exo2.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}