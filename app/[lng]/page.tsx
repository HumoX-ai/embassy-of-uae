import { Metadata } from "next";
import Image from "next/image";

import NewsSection from "@/components/features/news/ui/NewsSection";
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
    en: "Embassy of Uzbekistan in UAE | Official Website",
    uz: "O'zbekiston Elchixonasi BAA | Rasmiy Website",
  };

  const descriptions = {
    en: "Official website of the Embassy of the Republic of Uzbekistan in the United Arab Emirates. Latest news, consular services, and information about Uzbekistan-UAE relations.",
    uz: "O'zbekiston Respublikasining Birlashgan Arab Amirliklaridagi Elchixonasining rasmiy website. So'nggi yangiliklar, konsullik xizmatlar va O'zbekiston-BAA munosabatlari haqida ma'lumotlar.",
  };

  return {
    title: titles[validLng] || titles.en,
    description: descriptions[validLng] || descriptions.en,
    keywords:
      validLng === "uz"
        ? "O'zbekiston, BAA, elchixona, konsullik, yangiliklar, diplomatik munosabatlar"
        : "Uzbekistan, UAE, embassy, consular, news, diplomatic relations",
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

export default async function Home({ params }: PageProps) {
  const { lng } = await params;
  const validLng = languages.includes(lng as Language)
    ? (lng as Language)
    : fallbackLng;
  const { t } = await useTranslation(validLng, "common");

  return (
    <div className="">
      {/* Hero Section */}
      {/* <div className="bg-linear-to-br from-primary/5 via-background to-primary/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t("welcome")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {lng === "uz"
                ? "O'zbekiston Respublikasining Birlashgan Arab Amirliklaridagi Elchixonasi"
                : "Embassy of the Republic of Uzbekistan in the United Arab Emirates"}
            </p>
          </div>
        </div>
      </div> */}

      {/* News Section */}
      <NewsSection lng={validLng} t={t} />

      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {[
            {
              src: "/emblem_of_uzbekistan.svg",
              text:
                validLng === "uz"
                  ? "O'zbekiston Respublikasi Prezidenti matbuot xizmati"
                  : "Press Service of the President of the Republic of Uzbekistan",
              url: "https://www.president.uz/uz",
            },
            {
              src: "/emblem_of_uzbekistan.svg",
              text:
                validLng === "uz"
                  ? "O'zbekiston Respublikasi Oliy Majlisining Senati"
                  : "Senate of the Oliy Majlis of the Republic of Uzbekistan",
              url: "https://senat.uz/",
            },
            {
              src: "/emblem_of_uzbekistan.svg",
              text:
                validLng === "uz"
                  ? "O'zbekiston Respublikasi Oliy Majlisi Qonunchilik palatasi"
                  : "Legislative Chamber of the Oliy Majlis of the Republic of Uzbekistan",
              url: "https://parliament.gov.uz/",
            },

            {
              src: "/emblem_of_uzbekistan.svg",
              text:
                validLng === "uz"
                  ? "O'zbekiston Respublikasi Tashqi ishlar vazirligi"
                  : "Ministry of Foreign Affairs of the Republic of Uzbekistan",
              url: "https://gov.uz/uz",
            },
            {
              src: "/emblem_of_uzbekistan.svg",
              text:
                validLng === "uz"
                  ? "Milliy huquqiy internet portali"
                  : "National Legal Internet Portal",
            },
          ].map((item, index) => (
            <a
              key={index}
              className="flex flex-col items-center text-center space-y-4 group cursor-pointer"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative w-24 h-24">
                <Image
                  src={item.src}
                  alt={item.text}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300">
                {item.text}
              </p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
