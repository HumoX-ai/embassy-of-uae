import { Article, ArticlesResponse } from "@/types/news";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://209.38.77.32:8090/api/v1";

/**
 * Fetches all articles with pagination
 * @param page - Page number (0-indexed in API, but we use 1-indexed in UI)
 * @param size - Number of items per page
 * @returns ArticlesResponse with paginated articles
 */
export async function fetchArticles(
  page: number = 1,
  size: number = 12
): Promise<ArticlesResponse> {
  try {
    // API uses 0-indexed pages, so we subtract 1
    const apiPage = page - 1;
    const response = await fetch(
      `${API_BASE_URL}/article/all?page=${apiPage}&size=${size}`,
      {
        next: {
          revalidate: 300, // Revalidate every 5 minutes (300 seconds)
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.statusText}`);
    }

    const data: ArticlesResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
}

/**
 * Fetches a single article by ID
 * @param id - Article ID
 * @returns Article object
 */
export async function fetchArticleById(id: number): Promise<Article> {
  try {
    const response = await fetch(`${API_BASE_URL}/article/${id}`, {
      next: {
        revalidate: 300, // Revalidate every 5 minutes
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch article: ${response.statusText}`);
    }

    const data: Article = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching article ${id}:`, error);
    throw error;
  }
}

/**
 * Constructs image URL for an article image
 * @param articleId - Article ID
 * @param imageId - Image ID
 * @returns Full URL to the image
 */
export function getArticleImageUrl(articleId: number, imageId: string): string {
  return `${API_BASE_URL}/article/get-image?articleId=${articleId}&imageId=${imageId}`;
}

/**
 * Gets the primary image URL for an article
 * @param article - Article object
 * @returns Image URL or null if no images
 */
export function getPrimaryImageUrl(article: Article): string | null {
  if (article.images && article.images.length > 0) {
    return getArticleImageUrl(article.id, article.images[0].id);
  }
  return null;
}

/**
 * Converts Article from API to NewsItem format for backward compatibility
 * @param article - Article from API
 * @returns NewsItem object
 */
export function articleToNewsItem(article: Article) {
  return {
    id: article.id.toString(),
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    image: getPrimaryImageUrl(article) || "/placeholder-news.jpg",
    date: article.createdAt,
    category: article.category,
    author: article.author,
    readTime: article.readTime,
  };
}
