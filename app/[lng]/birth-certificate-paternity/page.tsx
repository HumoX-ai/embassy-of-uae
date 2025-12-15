import { Metadata } from "next";

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
    en: "Birth Certificate and Paternity Establishment | Embassy of Uzbekistan in UAE",
    uz: "Tug'ilganlik haqidagi guvohnoma va otalikni belgilash | O'zbekiston Elchixonasi BAA",
  };

  const descriptions = {
    en: "Learn about the procedure for issuing birth certificates and establishing paternity for citizens of Uzbekistan abroad.",
    uz: "Xorijda bo'lgan O'zbekiston fuqarolari uchun tug'ilganlik guvohnomasini rasmiylashtirish va otalikni belgilash tartibi haqida bilib oling.",
  };

  return {
    title: titles[validLng] || titles.en,
    description: descriptions[validLng] || descriptions.en,
    keywords:
      validLng === "uz"
        ? "tug'ilganlik guvohnomasi, otalikni belgilash, O'zbekiston fuqarolari"
        : "birth certificate, paternity establishment, Uzbekistan citizens",
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
    alternates: {
      canonical: `https://uzembassy.ae/${validLng}/birth-certificate-paternity`,
    },
  };
}

export default async function BirthCertificatePaternityPage({
  params,
}: PageProps) {
  const { lng } = await params;
  const validLng = languages.includes(lng as Language)
    ? (lng as Language)
    : fallbackLng;
  const { t } = await useTranslation(validLng, "birthCertificatePaternity");

  const marriedList = t("marriedList", { returnObjects: true }) as string[];
  const civilList = t("civilList", { returnObjects: true }) as string[];
  const singleList = t("singleList", { returnObjects: true }) as string[];

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
              <p className="text-sm md:text-base lg:text-lg">
                {t("marriedParents")}
              </p>

              <ul className="list-disc list-inside space-y-2 text-sm md:text-base lg:text-lg">
                {marriedList.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mt-8 mb-4">
                {t("paternityTitle")}
              </h2>

              <p className="text-sm md:text-base lg:text-lg">
                {t("paternityDesc")}
              </p>

              <p className="text-sm md:text-base lg:text-lg">
                {t("paternityNote")}
              </p>

              <p className="text-sm md:text-base lg:text-lg">
                {t("paternityNoProxy")}
              </p>

              <p className="text-sm md:text-base lg:text-lg">
                {t("civilMarriage")}
              </p>

              <ul className="list-disc list-inside space-y-2 text-sm md:text-base lg:text-lg">
                {civilList.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <p className="text-sm md:text-base lg:text-lg">
                {t("singleMother")}
              </p>

              <ul className="list-disc list-inside space-y-2 text-sm md:text-base lg:text-lg">
                {singleList.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
