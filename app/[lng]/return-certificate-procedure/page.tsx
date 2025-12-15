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
    en: "Return Certificate Procedure | Embassy of Uzbekistan in UAE",
    uz: "Qaytish sertifikati tartibi | O'zbekiston Elchixonasi BAA",
  };

  const descriptions = {
    en: "Learn about the procedure for obtaining a return certificate to the Republic of Uzbekistan for citizens and stateless persons.",
    uz: "O'zbekiston Respublikasiga qaytish sertifikatini olish tartibi haqida fuqarolar va fuqaroligi bo'lmagan shaxslar uchun bilib oling.",
  };

  return {
    title: titles[validLng] || titles.en,
    description: descriptions[validLng] || descriptions.en,
    keywords:
      validLng === "uz"
        ? "qaytish sertifikati, konsullik, O'zbekiston, fuqarolar"
        : "return certificate, consular, Uzbekistan, citizens",
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
      canonical: `https://uzembassy.ae/${validLng}/return-certificate-procedure`,
    },
  };
}

export default async function ReturnCertificateProcedurePage({
  params,
}: PageProps) {
  const { lng } = await params;
  const validLng = languages.includes(lng as Language)
    ? (lng as Language)
    : fallbackLng;
  const { t } = await useTranslation(validLng, "returnCertificateProcedure");

  const documentsList = t("documentsList", { returnObjects: true }) as string[];
  const notIssuedList = t("notIssuedList", { returnObjects: true }) as string[];
  const refusalList = t("refusalList", { returnObjects: true }) as string[];

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
                {t("applicationProcess")}
              </p>

              <p className="font-semibold text-sm md:text-base lg:text-lg">
                {t("requiredDocuments")}
              </p>

              <ul className="list-disc list-inside space-y-2 text-sm md:text-base lg:text-lg">
                {documentsList.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <p className="text-sm md:text-base lg:text-lg">{t("issuance")}</p>

              <p className="text-sm md:text-base lg:text-lg">{t("validity")}</p>

              <p className="text-sm md:text-base lg:text-lg">
                {t("individual")}
              </p>

              <p className="text-sm md:text-base lg:text-lg">
                {t("submissionRequirement")}
              </p>

              <p className="text-sm md:text-base lg:text-lg">
                {t("invalidDeclaration")}
              </p>

              <p className="text-sm md:text-base lg:text-lg">
                {t("submissionDeadline")}
              </p>

              <p className="text-sm md:text-base lg:text-lg">{t("fees")}</p>

              <p className="font-semibold text-sm md:text-base lg:text-lg">
                {t("notIssuedTo")}
              </p>

              <ul className="list-disc list-inside space-y-2 text-sm md:text-base lg:text-lg">
                {notIssuedList.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <p className="font-semibold text-sm md:text-base lg:text-lg">
                {t("refusalCases")}
              </p>

              <ul className="list-disc list-inside space-y-2 text-sm md:text-base lg:text-lg">
                {refusalList.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <p className="text-sm md:text-base lg:text-lg font-bold underline">
                {t("finalNote")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
