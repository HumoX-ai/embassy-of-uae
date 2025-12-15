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
    en: "Ambassador's Message | Embassy of the Republic of Uzbekistan",
    uz: "Elchining murojaati | O'zbekiston Respublikasi Elchixonasi",
  };

  const descriptions = {
    en: "Message from the Ambassador of the Republic of Uzbekistan to the United Arab Emirates.",
    uz: "O'zbekiston Respublikasining Birlashgan Arab Amirliklaridagi elchisining murojaati.",
  };

  return {
    title: titles[validLng] || titles.en,
    description: descriptions[validLng] || descriptions.en,
    keywords:
      validLng === "uz"
        ? "elchi, murojaat, elchixona, O'zbekiston, BAA"
        : "ambassador, message, embassy, Uzbekistan, UAE",
    openGraph: {
      title: titles[validLng] || titles.en,
      description: descriptions[validLng] || descriptions.en,
      type: "article",
      locale: validLng === "uz" ? "uz_UZ" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: titles[validLng] || titles.en,
      description: descriptions[validLng] || descriptions.en,
    },
    alternates: {
      canonical: `https://uzembassy.ae/${validLng}/ambassador-message`,
    },
  };
}

export default async function AmbassadorMessagePage({ params }: PageProps) {
  const { lng } = await params;
  const validLng = languages.includes(lng as Language)
    ? (lng as Language)
    : fallbackLng;
  const { t } = await useTranslation(validLng, "ambassadorMessage");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-foreground">
              {t("title")}
            </h1>
          </div>
        </div>
      </section>

      {/* Message Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-lg max-w-none text-foreground">
              <div className="space-y-6 leading-relaxed">
                <p className="text-lg md:text-xl font-semibold mb-8">
                  {t("greeting")}
                </p>

                <p className="text-base md:text-lg leading-relaxed">
                  {t("paragraph1")}
                </p>

                <p className="text-base md:text-lg leading-relaxed">
                  {t("paragraph2")}
                </p>

                <p className="text-base md:text-lg leading-relaxed">
                  {t("paragraph3")}
                </p>

                <p className="text-base md:text-lg leading-relaxed">
                  {t("paragraph4")}
                </p>

                <div className="pt-1">
                  <p className="text-lg md:text-xl font-bold">{t("closing")}</p>
                </div>

                <div className="mt-12 pt-8 border-t border-border">
                  <p className="text-base md:text-lg font-bold text-foreground">
                    {t("ambassadorName")}
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground mt-2">
                    {t("ambassadorPosition")}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
