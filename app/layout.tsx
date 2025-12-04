import type { Metadata } from "next";
import { Geist_Mono, Open_Sans } from "next/font/google";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";

import { getOrganizationSchema, getWebsiteSchema } from "@/lib/schema";

import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Embassy of the Republic of Uzbekistan in UAE",
    template: "%s | Embassy of Uzbekistan in UAE",
  },
  description:
    "Official website of the Embassy of the Republic of Uzbekistan in the United Arab Emirates. Consular services, visa information, and bilateral relations.",
  keywords: [
    "Uzbekistan Embassy",
    "UAE",
    "Consular Services",
    "Visa",
    "Passport",
    "Embassy Services",
    "Uzbekistan",
    "United Arab Emirates",
    "Diplomatic Mission",
  ],
  authors: [{ name: "Embassy of Uzbekistan in UAE" }],
  creator: "Embassy of Uzbekistan in UAE",
  publisher: "Embassy of Uzbekistan in UAE",
  metadataBase: new URL("https://uzembassy.ae"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      uz: "/uz",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://uzembassy.ae",
    title: "Embassy of the Republic of Uzbekistan in UAE",
    description:
      "Official website of the Embassy of the Republic of Uzbekistan in the United Arab Emirates",
    siteName: "Embassy of Uzbekistan in UAE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Embassy of the Republic of Uzbekistan in UAE",
    description:
      "Official website of the Embassy of the Republic of Uzbekistan in the United Arab Emirates",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/emblem_of_uzbekistan.ico", sizes: "any" },
      { url: "/emblem_of_uzbekistan.png", sizes: "32x32", type: "image/png" },
      {
        url: "/emblem_of_uzbekistan-192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    shortcut: "/emblem_of_uzbekistan.ico",
    apple: [
      { url: "/emblem_of_uzbekistan.png", sizes: "180x180", type: "image/png" },
    ],
  },
  verification: {
    google: "H2VV8GjS94fbyuKMN7EoRhUPVzQmKAXnGzW_ByBwDng",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationSchema()),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebsiteSchema()),
          }}
        />
      </head>
      <body
        className={`${openSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <NextTopLoader />
        {children}
      </body>
    </html>
  );
}
