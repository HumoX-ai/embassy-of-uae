import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://uzembassy.ae";
  const languages = ["en", "uz"];

  // Static pages
  const staticPages = [
    "",
    "/about",
    "/ambassador-message",
    "/biometric-passport-issuance",
    "/birth-certificate-paternity",
    "/contact",
    "/info-for-foreigners",
    "/national-holidays",
    "/news",
    "/parliament",
    "/permanent-consular-registration",
    "/president",
    "/return-certificate-procedure",
    "/state-symbols",
    "/temporary-consular-registration",
    "/tourism-potential",
    "/uzbek-culture",
    "/uzbekistan",
  ];

  // Generate URLs for all languages
  const staticUrls: MetadataRoute.Sitemap = [];

  languages.forEach((lng) => {
    staticPages.forEach((page) => {
      staticUrls.push({
        url: `${baseUrl}/${lng}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "/news" ? "daily" : "weekly",
        priority: page === "" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            languages.map((l) => [l, `${baseUrl}/${l}${page}`])
          ),
        },
      });
    });
  });

  // Fetch news articles dynamically
  try {
    const response = await fetch(
      "https://api.uzembassy.ae/api/news/all?limit=100",
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (response.ok) {
      const newsData = await response.json();
      const newsArticles = newsData.data || [];

      languages.forEach((lng) => {
        newsArticles.forEach(
          (article: { id: string | number; updated_at?: string }) => {
            staticUrls.push({
              url: `${baseUrl}/${lng}/news/${article.id}`,
              lastModified: article.updated_at
                ? new Date(article.updated_at)
                : new Date(),
              changeFrequency: "monthly",
              priority: 0.6,
              alternates: {
                languages: Object.fromEntries(
                  languages.map((l) => [
                    l,
                    `${baseUrl}/${l}/news/${article.id}`,
                  ])
                ),
              },
            });
          }
        );
      });
    }
  } catch (error) {
    console.error("Error fetching news for sitemap:", error);
  }

  return staticUrls;
}
