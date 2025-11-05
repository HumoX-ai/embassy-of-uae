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
    en: "Information for Foreign Citizens | Embassy of Uzbekistan in UAE",
    uz: "Chet el fuqarolari uchun ma'lumot | O'zbekiston Elchixonasi BAA",
  };

  const descriptions = {
    en: "Learn about visa-free regime and requirements for UAE citizens visiting Uzbekistan.",
    uz: "BAA fuqarolarining O'zbekistonga tashrifi uchun vizasiz rejim va talablar haqida bilib oling.",
  };

  return {
    title: titles[validLng] || titles.en,
    description: descriptions[validLng] || descriptions.en,
    keywords:
      validLng === "uz"
        ? "viza, vizasiz rejim, BAA fuqarolari, O'zbekiston, talablar"
        : "visa, visa-free regime, UAE citizens, Uzbekistan, requirements",
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

export default async function InfoForForeignersPage({ params }: PageProps) {
  const { lng } = await params;
  const validLng = languages.includes(lng as Language)
    ? (lng as Language)
    : fallbackLng;
  const { t } = await useTranslation(validLng, "infoForForeigners");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-linear-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              {t("title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t("visaFreeRegime")}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-base md:prose-lg max-w-none text-foreground leading-relaxed space-y-6">
              <p className="text-sm md:text-base lg:text-lg">
                {t("decreeTextBefore")}{" "}
                <Link
                  href={t("decreeLink")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {t("decreeLinkText")}
                </Link>{" "}
                {t("decreeTextAfter")}
              </p>

              <p className="text-sm md:text-base lg:text-lg">
                {t("additionTextBefore")}{" "}
                <Link
                  href={t("additionLink")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {t("additionLinkText")}
                </Link>{" "}
                {t("additionTextAfter")}
              </p>

              <p className="font-semibold text-sm md:text-base lg:text-lg">
                {t("requirementsText")}
              </p>

              <ul className="list-disc list-inside space-y-2 text-sm md:text-base lg:text-lg">
                <li>{t("requirement1")}</li>
                <li>{t("requirement2")}</li>
              </ul>

              <p className="text-sm md:text-base lg:text-lg">
                {t("additionalInfoBefore")}{" "}
                <Link
                  href={t("mfaLink")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {t("additionalInfoLinkText")}
                </Link>
                {t("additionalInfoAfter")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
