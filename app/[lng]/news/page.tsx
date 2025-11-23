import { Newspaper, ChevronLeft, ChevronRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import NewsCard from "@/components/features/news/ui/NewsCard";
import { useTranslation } from "@/i18n";
import { Language, languages, fallbackLng } from "@/i18n/settings";
import { fetchArticles, articleToNewsItem } from "@/lib/api/news";
import { Button } from "@/components/ui/button";

type PageProps = {
  params: Promise<{ lng: string }>;
  searchParams: Promise<{ page?: string }>;
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

export default async function NewsPage({ params, searchParams }: PageProps) {
  const { lng } = await params;
  const { page: pageParam } = await searchParams;

  const validLng = languages.includes(lng as Language)
    ? (lng as Language)
    : fallbackLng;
  const { t } = await useTranslation(validLng, "common");

  // Parse page number from query params (default to 1)
  const currentPage = pageParam ? parseInt(pageParam) : 1;
  const pageSize = 12;

  // Fetch articles from API with error handling
  let articlesResponse;
  let newsData: ReturnType<typeof articleToNewsItem>[] = [];
  let error: Error | null = null;

  try {
    articlesResponse = await fetchArticles(currentPage, pageSize);
    newsData = articlesResponse.content.map(articleToNewsItem);
  } catch (err) {
    console.error("Failed to fetch articles:", err);
    error = err instanceof Error ? err : new Error("Unknown error");
    // Fallback to empty array
    articlesResponse = {
      totalPages: 0,
      totalElements: 0,
      size: 0,
      content: [],
      number: 0,
      numberOfElements: 0,
      first: true,
      last: true,
      empty: true,
      pageable: {
        offset: 0,
        paged: false,
        pageNumber: 0,
        pageSize: 0,
        unpaged: true,
        sort: {
          empty: true,
          unsorted: true,
          sorted: false,
        },
      },
      sort: {
        empty: true,
        unsorted: true,
        sorted: false,
      },
    };
  }

  const totalPages = articlesResponse.totalPages;
  const hasNextPage = !articlesResponse.last;
  const hasPrevPage = !articlesResponse.first;

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
          {articlesResponse.totalElements > 0 && (
            <p className="text-muted-foreground">
              {validLng === "uz"
                ? `Jami ${articlesResponse.totalElements} ta yangilik topildi`
                : `${articlesResponse.totalElements} articles found`}
            </p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive text-center">
              {validLng === "uz"
                ? "Yangiliklar yuklanmadi. Iltimos, keyinroq qayta urinib ko'ring."
                : "Failed to load articles. Please try again later."}
            </p>
          </div>
        )}

        {/* Empty State */}
        {!error && newsData.length === 0 && (
          <div className="text-center py-16">
            <Newspaper className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">
              {validLng === "uz"
                ? "Yangiliklar topilmadi"
                : "No articles found"}
            </h2>
            <p className="text-muted-foreground">
              {validLng === "uz"
                ? "Hozircha yangiliklar mavjud emas"
                : "No articles available at the moment"}
            </p>
          </div>
        )}

        {/* News Grid */}
        {newsData.length > 0 && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {newsData.map((news) => (
                <NewsCard key={news.id} news={news} lng={validLng} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                {hasPrevPage && (
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={`/${validLng}/news?page=${currentPage - 1}`}
                      className="flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      {validLng === "uz" ? "Oldingi" : "Previous"}
                    </Link>
                  </Button>
                )}

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      // Show first page, last page, current page, and pages around current
                      return (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      );
                    })
                    .map((page, index, array) => {
                      // Add ellipsis if there's a gap
                      const prevPage = array[index - 1];
                      const showEllipsis = prevPage && page - prevPage > 1;

                      return (
                        <div key={page} className="flex items-center gap-1">
                          {showEllipsis && (
                            <span className="px-2 text-muted-foreground">
                              ...
                            </span>
                          )}
                          <Button
                            variant={
                              page === currentPage ? "default" : "outline"
                            }
                            size="sm"
                            asChild={page !== currentPage}
                          >
                            {page === currentPage ? (
                              <span>{page}</span>
                            ) : (
                              <Link href={`/${validLng}/news?page=${page}`}>
                                {page}
                              </Link>
                            )}
                          </Button>
                        </div>
                      );
                    })}
                </div>

                {hasNextPage && (
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={`/${validLng}/news?page=${currentPage + 1}`}
                      className="flex items-center gap-1"
                    >
                      {validLng === "uz" ? "Keyingi" : "Next"}
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
