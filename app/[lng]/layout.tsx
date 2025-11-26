import type { Metadata } from "next";
import { Geist_Mono, Open_Sans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import Script from "next/script";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { languages, Language, fallbackLng } from "@/i18n/settings";
import { getOrganizationSchema, getWebsiteSchema } from "@/lib/schema";

import "../globals.css";

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
    icon: "/emblem_of_uzbekistan.ico",
    shortcut: "/emblem_of_uzbekistan.ico",
    apple: "/emblem_of_uzbekistan.ico",
  },
  verification: {
    // Google Search Console verification kodini bu yerga qo'shing
    // google: "your-google-verification-code",
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
        <Header lng={validLng} />
        <main className="flex-1">{children}</main>
        <Footer lng={validLng} />
      </body>
    </html>
  );
}
