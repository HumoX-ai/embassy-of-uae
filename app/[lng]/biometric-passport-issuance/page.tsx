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
    en: "Biometric Passport Issuance | Embassy of Uzbekistan in UAE",
    uz: "Biometrik pasport rasmiylashtirish | O'zbekiston Elchixonasi BAA",
  };

  const descriptions = {
    en: "Learn about the procedure for issuing biometric passports for citizens of Uzbekistan abroad.",
    uz: "Xorijda bo'lgan O'zbekiston fuqarolari uchun biometrik pasport rasmiylashtirish tartibi haqida bilib oling.",
  };

  return {
    title: titles[validLng] || titles.en,
    description: descriptions[validLng] || descriptions.en,
    keywords:
      validLng === "uz"
        ? "biometrik pasport, rasmiylashtirish, O'zbekiston fuqarolari"
        : "biometric passport, issuance, Uzbekistan citizens",
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
      canonical: `https://uzembassy.ae/${validLng}/biometric-passport-issuance`,
    },
  };
}

export default async function BiometricPassportIssuancePage({
  params,
}: PageProps) {
  const { lng } = await params;
  const validLng = languages.includes(lng as Language)
    ? (lng as Language)
    : fallbackLng;
  const { t } = await useTranslation(validLng, "biometricPassportIssuance");

  const validityList = t("validityList", { returnObjects: true }) as string[];
  const eligibleCitizensList = t("eligibleCitizensList", {
    returnObjects: true,
  }) as string[];
  const issuanceCasesList = t("issuanceCasesList", {
    returnObjects: true,
  }) as string[];
  const permanentCitizensList = t("permanentCitizensList", {
    returnObjects: true,
  }) as string[];
  const permanentCitizensAdditional = t("permanentCitizensAdditional", {
    returnObjects: true,
  }) as string[];
  const minorsPermanentList = t("minorsPermanentList", {
    returnObjects: true,
  }) as string[];
  const minorsPermanentAdditional = t("minorsPermanentAdditional", {
    returnObjects: true,
  }) as string[];
  const temporaryCitizensList = t("temporaryCitizensList", {
    returnObjects: true,
  }) as string[];
  const minorsTemporaryCases = t("minorsTemporaryCases", {
    returnObjects: true,
  }) as string[];
  const minorsTemporaryList = t("minorsTemporaryList", {
    returnObjects: true,
  }) as string[];

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

              <p className="text-sm md:text-base lg:text-lg">
                {t("description")}
              </p>

              <p className="font-semibold text-sm md:text-base lg:text-lg">
                {t("validityTitle")}
              </p>

              <ul className="list-disc list-inside space-y-2  text-sm md:text-base lg:text-lg">
                {validityList.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <p className="text-sm md:text-base lg:text-lg">
                {t("specialCase")}
              </p>

              <p className="text-sm md:text-base lg:text-lg">
                {t("replacement")}
              </p>

              <p className="text-sm md:text-base lg:text-lg">
                {t("featuresTitle")}
              </p>

              <p className="font-semibold text-sm md:text-base lg:text-lg">
                {t("eligibleCitizensTitle")}
              </p>

              <ul className="list-disc list-inside space-y-2  text-sm md:text-base lg:text-lg">
                {eligibleCitizensList.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <p className="font-semibold text-sm md:text-base lg:text-lg">
                {t("issuanceCasesTitle")}
              </p>

              <ul className="list-disc list-inside space-y-2  text-sm md:text-base lg:text-lg">
                {issuanceCasesList.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <p className="font-semibold text-sm md:text-base lg:text-lg">
                {t("documentsTitle")}
              </p>

              <p className="font-medium text-sm md:text-base lg:text-lg">
                {t("permanentCitizensTitle")}
              </p>

              <ul className="list-disc list-inside space-y-2  text-sm md:text-base lg:text-lg">
                {permanentCitizensList.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <p className="text-sm md:text-base lg:text-lg italic">
                {t("permanentCitizensNote")}
              </p>

              <ul className="list-disc list-inside space-y-2  text-sm md:text-base lg:text-lg">
                {permanentCitizensAdditional.map(
                  (item: string, index: number) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>

              <p className="font-medium text-sm md:text-base lg:text-lg">
                {t("minorsPermanentTitle")}
              </p>

              <ul className="list-disc list-inside space-y-2  text-sm md:text-base lg:text-lg">
                {minorsPermanentList.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <p className="text-sm md:text-base lg:text-lg italic">
                {t("minorsPermanentNote")}
              </p>

              <ul className="list-disc list-inside space-y-2  text-sm md:text-base lg:text-lg">
                {minorsPermanentAdditional.map(
                  (item: string, index: number) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>

              <p className="text-sm md:text-base lg:text-lg">
                {t("minorsPermanentNationality")}
              </p>

              <p className="font-medium text-sm md:text-base lg:text-lg">
                {t("temporaryCitizensTitle")}
              </p>

              <p className="text-sm md:text-base lg:text-lg">
                {t("temporaryCitizensIntro")}
              </p>

              <p className="text-sm md:text-base lg:text-lg italic">
                {t("temporaryCitizensNote")}
              </p>

              <ul className="list-disc list-inside space-y-2  text-sm md:text-base lg:text-lg">
                {temporaryCitizensList.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <p className="font-medium text-sm md:text-base lg:text-lg">
                {t("minorsTemporaryTitle")}
              </p>

              <p className="text-sm md:text-base lg:text-lg">
                {t("minorsTemporaryIntro")}
              </p>

              <ul className="list-disc list-inside space-y-2  text-sm md:text-base lg:text-lg">
                {minorsTemporaryCases.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <ul className="list-disc list-inside space-y-2  text-sm md:text-base lg:text-lg">
                {minorsTemporaryList.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <p className="font-semibold text-sm md:text-base lg:text-lg">
                {t("noteTitle")}
              </p>

              <p className="text-sm md:text-base lg:text-lg">
                {t("noteContent")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
