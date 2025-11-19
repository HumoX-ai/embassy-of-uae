import { Metadata } from "next";

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
    <div className="min-h-screen relative">
      {/* Background Registan Lion */}
      <div className="absolute inset-0 bg-[url('/symbols/registan-lion.png')] bg-no-repeat bg-right bg-contain opacity-10 z-[-1] pointer-events-none"></div>

      {/* News Section */}
      <NewsSection lng={validLng} t={t} />
    </div>
  );
}
