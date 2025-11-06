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
    en: "Temporary Consular Registration | Embassy of Uzbekistan in UAE",
    uz: "Vaqtinchalik konsullik hisobiga olish | O'zbekiston Elchixonasi BAA",
  };

  const descriptions = {
    en: "Learn about the procedure for temporary consular registration for citizens of Uzbekistan abroad.",
    uz: "Xorijda bo'lgan O'zbekiston fuqarolari uchun vaqtinchalik konsullik hisobiga olish tartibi haqida bilib oling.",
  };

  return {
    title: titles[validLng] || titles.en,
    description: descriptions[validLng] || descriptions.en,
    keywords:
      validLng === "uz"
        ? "vaqtinchalik konsullik, hisobga olish, O'zbekiston fuqarolari"
        : "temporary consular, registration, Uzbekistan citizens",
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

export default async function TemporaryConsularRegistrationPage({
  params,
}: PageProps) {
  const { lng } = await params;
  const validLng = languages.includes(lng as Language)
    ? (lng as Language)
    : fallbackLng;
  const { t } = await useTranslation(validLng, "temporaryConsularRegistration");

  const points = t("points", { returnObjects: true }) as string[];
  const documentsList = t("documentsList", { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-linear-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              {t("title")}
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-base md:prose-lg max-w-none text-foreground leading-relaxed space-y-6">
              <p className="text-sm md:text-base lg:text-lg">{t("intro")}</p>

              <ul className="list-disc list-inside space-y-2 text-sm md:text-base lg:text-lg">
                {points.map((point: string, index: number) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>

              <p className="text-sm md:text-base lg:text-lg">
                {t("additionalInfo")}
              </p>

              <p className="font-semibold text-sm md:text-base lg:text-lg">
                {t("registrationTitle")}
              </p>

              <ul className="list-disc list-inside space-y-2 text-sm md:text-base lg:text-lg">
                {documentsList.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <p className="text-sm md:text-base lg:text-lg italic">
                {t("note")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
