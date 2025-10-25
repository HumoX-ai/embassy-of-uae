import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { mockNewsEn, mockNewsUz } from "@/data/mockNews";
import { Language } from "@/i18n/settings";

import NewsCard from "./NewsCard";

interface NewsSectionProps {
  lng: Language;
  t: (key: string) => string;
}

export default function NewsSection({ lng, t }: NewsSectionProps) {
  const newsData = lng === "uz" ? mockNewsUz : mockNewsEn;
  const latestNews = newsData.slice(0, 4); // Get 4 latest news
  const featuredNews = latestNews[0]; // First one is featured
  const otherNews = latestNews.slice(1, 4); // Next 3

  return (
    <section className="py-6 md:py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              {t("newsTitle")}
            </h2>
          </div>
          <Link
            href={`/${lng}/news`}
            className="hidden md:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all group"
          >
            <span>{t("viewAll")}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* News Grid */}
        <div className="space-y-8">
          {/* Featured News */}
          <div>
            <NewsCard news={featuredNews} lng={lng} featured />
          </div>

          {/* Other News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherNews.map((news) => (
              <NewsCard key={news.id} news={news} lng={lng} />
            ))}
          </div>
        </div>

        {/* View All Button - Mobile */}
        <div className="mt-8 md:hidden">
          <Link
            href={`/${lng}/news`}
            className="flex items-center justify-center gap-2 w-full py-2 px-6 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <span>{t("viewAll")}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
