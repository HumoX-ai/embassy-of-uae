import { MetadataRoute } from "next";
import { API_BASE_URL } from "@/lib/api/news";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://uzembassy.ae";
  const languages = ["en", "uz"];

  const staticPages = [
    "",
    "/ambassador-message",
    "/biometric-passport-issuance",
    "/birth-certificate-paternity",
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

  const items: MetadataRoute.Sitemap = [];

  // Static pages
  for (const lng of languages) {
    for (const page of staticPages) {
      items.push({
        url: `${baseUrl}/${lng}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "/news" ? "daily" : "weekly",
        priority: page === "" ? 1 : 0.8,
      });
    }
  }

  // NEWS ARTICLES
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 soniya timeout

    const res = await fetch(`${API_BASE_URL}/article/all?size=200`, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const json = await res.json();
    const news = json.content || [];

    for (const lng of languages) {
      for (const post of news) {
        items.push({
          url: `${baseUrl}/${lng}/news/${post.id}`,
          lastModified: new Date(post.updatedAt || Date.now()),
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  } catch (e) {
    console.error("News sitemap error", e);
  }

  return items;
}
