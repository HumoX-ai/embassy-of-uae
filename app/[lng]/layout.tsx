import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { languages, Language, fallbackLng } from "@/i18n/settings";


import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Embassy of UA",
  description: "Welcome to the Embassy website",
  icons: {
    icon: "/emblem_of_uzbekistan.ico",
  },
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}>) {
  const { lng } = await params;

  // Validate that lng is a supported language
  const validLng = languages.includes(lng as Language)
    ? (lng as Language)
    : fallbackLng;

  return (
    <html lang={validLng} dir="ltr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <NextTopLoader />
        <Header lng={validLng} />
        <main className="flex-1">{children}</main>
        <Footer lng={validLng} />
      </body>
    </html>
  );
}
