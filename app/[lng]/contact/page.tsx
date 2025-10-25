import { Metadata } from "next";
import Link from "next/link";

import { useTranslation } from "@/i18n";
import { Language, languages, fallbackLng } from "@/i18n/settings";

type PageProps = {
  params: Promise<{ lng: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lng } = await params;

  // Validate that lng is a supported language
  const validLng = languages.includes(lng as Language)
    ? (lng as Language)
    : fallbackLng;

  const titles = {
    en: "Contact Us | Embassy of Uzbekistan in UAE",
    uz: "Biz bilan bog'laning | O'zbekiston Elchixonasi BAA",
  };

  const descriptions = {
    en: "Get in touch with the Embassy of the Republic of Uzbekistan in the United Arab Emirates. Contact information, address, and consular services.",
    uz: "O'zbekiston Respublikasining Birlashgan Arab Amirliklaridagi Elchixonasi bilan bog'laning. Aloqa ma'lumotlari, manzil va konsullik xizmatlari.",
  };

  return {
    title: titles[validLng] || titles.en,
    description: descriptions[validLng] || descriptions.en,
    keywords:
      validLng === "uz"
        ? "O'zbekiston elchixonasi, BAA, aloqa, manzil, konsullik xizmatlar, telefon"
        : "Uzbekistan embassy, UAE, contact, address, consular services, phone",
    openGraph: {
      title: titles[validLng] || titles.en,
      description: descriptions[validLng] || descriptions.en,
      type: "website",
      locale: validLng === "uz" ? "uz_UZ" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: titles[validLng] || titles.en,
      description: descriptions[validLng] || descriptions.en,
    },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { lng } = await params;
  const validLng = languages.includes(lng as Language)
    ? (lng as Language)
    : fallbackLng;
  const { t } = await useTranslation(validLng, "common");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">{t("contact")}</h1>
        </div>

        <nav className="flex gap-4 justify-center">
          <Link
            href={`/${validLng}`}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {t("home")}
          </Link>
          <Link
            href={`/${validLng}/about`}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {t("about")}
          </Link>
        </nav>

        <div className="mt-8 p-6 bg-gray-100 rounded-lg">
          <p className="text-gray-700">
            This is the contact page in{" "}
            <strong>{validLng.toUpperCase()}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
