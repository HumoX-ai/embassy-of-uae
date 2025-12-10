import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Language } from "@/i18n/settings";
import { fetchArticles, articleToNewsItem } from "@/lib/api/news";

import NewsCard from "./NewsCard";

interface NewsSectionProps {
  lng: Language;
  t: (key: string) => string;
}

export default async function NewsSection({ lng, t }: NewsSectionProps) {
  // Fetch latest 4 articles from API
  let latestNews: ReturnType<typeof articleToNewsItem>[] = [];

  try {
    const articlesResponse = await fetchArticles(1, 4);
    latestNews = articlesResponse.content.map(articleToNewsItem);
  } catch (error) {
    console.error("Failed to fetch articles for home page:", error);
    // Continue with empty array - component will handle empty state
  }

  const featuredNews = latestNews[0]; // First one is featured
  const otherNews = latestNews.slice(1, 4); // Next 3

  return (
    <section className="py-6 md:py-12">
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
        {latestNews.length > 0 ? (
          <div className="space-y-8">
            {/* Featured News */}
            {featuredNews && (
              <div>
                <NewsCard news={featuredNews} lng={lng} featured />
              </div>
            )}

            {/* Other News Grid */}
            {otherNews.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherNews.map((news) => (
                  <NewsCard key={news.id} news={news} lng={lng} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {lng === "uz"
                ? "Hozircha yangiliklar mavjud emas"
                : "No news available at the moment"}
            </p>
          </div>
        )}

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
