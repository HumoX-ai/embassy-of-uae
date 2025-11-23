import { Calendar, Clock, User } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import RelatedNewsCard from "@/components/features/news/ui/RelatedNewsCard";
import ShareButton from "@/components/features/news/ui/ShareButton";
import { Language, languages, fallbackLng } from "@/i18n/settings";
import {
  fetchArticleById,
  fetchArticles,
  articleToNewsItem,
} from "@/lib/api/news";

type PageProps = {
  params: Promise<{ lng: string; id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lng, id } = await params;

  // Validate that lng is a supported language
  const validLng = languages.includes(lng as Language)
    ? (lng as Language)
    : fallbackLng;

  try {
    const articleId = parseInt(id);
    if (isNaN(articleId)) {
      return {
        title: validLng === "uz" ? "Yangilik topilmadi" : "News Not Found",
      };
    }

    const article = await fetchArticleById(articleId);
    const news = articleToNewsItem(article);

    const title = `${news.title} | ${
      validLng === "uz"
        ? "O'zbekiston Elchixonasi BAA"
        : "Embassy of Uzbekistan in UAE"
    }`;
    const description =
      news.excerpt ||
      (validLng === "uz"
        ? "O'zbekiston elchixonasidan yangilik"
        : "News from Uzbekistan Embassy");

    return {
      title,
      description,
      keywords: `${news.category}, ${
        validLng === "uz"
          ? "O'zbekiston yangiliklari, BAA, diplomatik"
          : "Uzbekistan news, UAE, diplomatic"
      }`,
      openGraph: {
        title,
        description,
        type: "article",
        locale: validLng === "uz" ? "uz_UZ" : "en_US",
        images: news.image
          ? [
              {
                url: news.image,
                width: 1200,
                height: 630,
                alt: news.title,
              },
            ]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: news.image ? [news.image] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: validLng === "uz" ? "Yangilik topilmadi" : "News Not Found",
    };
  }
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { lng, id } = await params;

  // Validate that lng is a supported language
  const validLng = languages.includes(lng as Language)
    ? (lng as Language)
    : fallbackLng;

  // Parse and validate article ID
  const articleId = parseInt(id);
  if (isNaN(articleId)) {
    notFound();
  }

  // Fetch article from API
  let article;
  let news;
  try {
    article = await fetchArticleById(articleId);
    news = articleToNewsItem(article);
  } catch (error) {
    console.error(`Error fetching article ${articleId}:`, error);
    notFound();
  }

  // Get related news (fetch latest articles)
  let relatedNews: ReturnType<typeof articleToNewsItem>[] = [];
  try {
    const articlesResponse = await fetchArticles(1, 4);
    relatedNews = articlesResponse.content
      .filter((item) => item.id !== articleId)
      .slice(0, 3)
      .map(articleToNewsItem);
  } catch (error) {
    console.error("Error fetching related news:", error);
    // Continue without related news
  }

  const formattedDate = new Date(news.date).toLocaleDateString(
    validLng === "uz" ? "uz-UZ" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
  return (
    <div className="min-h-screen">
      {/* Back Button */}
      {/* <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <Link
            href={`/${lng}/news`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lng === "uz" ? "Orqaga" : "Back to News"}</span>
          </Link>
        </div>
      </div> */}

      {/* Article Header */}
      <article className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_350px] gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="max-w-4xl">
              {/* Category Badge */}
              <div className="mb-6">
                <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                  {news.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {news.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b">
                {news.author && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{news.author}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formattedDate}</span>
                </div>
                {news.readTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{news.readTime}</span>
                  </div>
                )}
                <ShareButton
                  title={news.title}
                  excerpt={news.excerpt}
                  lng={validLng}
                />
              </div>

              {/* Featured Image */}
              <div className="relative w-full h-[300px] md:h-[500px] rounded-xl overflow-hidden mb-8">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Excerpt */}
              <div className="bg-muted/50 border-l-4 border-primary p-6 rounded-r-lg mb-8">
                <p className="text-lg leading-relaxed">{news.excerpt}</p>
              </div>

              {/* Content */}
              <div
                className="news-content prose prose-lg max-w-none
                  prose-headings:font-bold prose-headings:text-foreground
                  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
                  prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
                  prose-li:text-muted-foreground prose-li:my-2
                  prose-blockquote:border-l-4 prose-blockquote:border-primary 
                  prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:my-6
                  prose-blockquote:bg-muted/30 prose-blockquote:py-4 prose-blockquote:rounded-r-lg
                  prose-img:rounded-lg prose-img:shadow-lg"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
            </div>

            {/* Sidebar - Related News */}
            {relatedNews.length > 0 && (
              <aside className="lg:sticky lg:top-26 lg:h-fit">
                <div className="py-6">
                  <h2 className="text-xl font-bold mb-6 pb-4 border-b">
                    {validLng === "uz"
                      ? "O'xshash yangiliklar"
                      : "Related News"}
                  </h2>
                  <div className="space-y-4">
                    {relatedNews.map((relatedNewsItem) => (
                      <RelatedNewsCard
                        key={relatedNewsItem.id}
                        news={relatedNewsItem}
                        lng={validLng}
                      />
                    ))}
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
