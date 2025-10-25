import { Newspaper } from "lucide-react";
import { Metadata } from "next";

import NewsCard from "@/components/features/news/ui/NewsCard";
import { mockNewsEn, mockNewsUz } from "@/data/mockNews";
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
    en: "Latest News | Embassy of Uzbekistan in UAE",
    uz: "So'nggi yangiliklar | O'zbekiston Elchixonasi BAA",
  };

  const descriptions = {
    en: "Stay updated with the latest news and announcements from the Embassy of the Republic of Uzbekistan in the United Arab Emirates.",
    uz: "O'zbekiston Respublikasining Birlashgan Arab Amirliklaridagi Elchixonasidan so'nggi yangiliklar va e'lonlar bilan tanishib boring.",
  };

  return {
    title: titles[validLng] || titles.en,
    description: descriptions[validLng] || descriptions.en,
    keywords:
      validLng === "uz"
        ? "O'zbekiston yangiliklari, BAA, elchixona, diplomatik yangiliklar, e'lonlar"
        : "Uzbekistan news, UAE, embassy, diplomatic news, announcements",
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

export default async function NewsPage({ params }: PageProps) {
  const { lng } = await params;
  const validLng = languages.includes(lng as Language)
    ? (lng as Language)
    : fallbackLng;
  const { t } = await useTranslation(validLng, "common");

  const newsData = validLng === "uz" ? mockNewsUz : mockNewsEn;

  return (
    <div className="min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Newspaper className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {t("newsTitle")}
            </h1>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsData.map((news) => (
            <NewsCard key={news.id} news={news} lng={validLng} />
          ))}
        </div>
      </div>
    </div>
  );
}
