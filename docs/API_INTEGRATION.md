# News API Integration Guide

This document explains how the News API integration works in this Next.js application.

## Overview

The application now uses dynamic news data from the backend API instead of mock data. All news pages use Server-Side Rendering (SSR) for better SEO and performance.

## API Endpoints

### 1. Get All Articles (Paginated)
```
GET https://c686e0f3d0fc.ngrok-free.app/api/v1/article/all?page={page}&size={size}
```

**Parameters:**
- `page`: Page number (0-indexed)
- `size`: Number of items per page

**Response:** Returns paginated articles with metadata

### 2. Get Single Article
```
GET https://c686e0f3d0fc.ngrok-free.app/api/v1/article/{id}
```

**Parameters:**
- `id`: Article ID

**Response:** Returns single article with full details

### 3. Get Article Image
```
GET https://c686e0f3d0fc.ngrok-free.app/api/v1/article/get-image?articleId={articleId}&imageId={imageId}
```

**Parameters:**
- `articleId`: Article ID
- `imageId`: Image ID from article's images array

**Response:** Returns image file

## File Structure

```
lib/api/
  └── news.ts                    # API service functions

types/
  └── news.ts                    # TypeScript types for API responses

app/[lng]/news/
  ├── page.tsx                   # News list page with pagination
  └── [id]/
      └── page.tsx               # Single article detail page

components/features/news/ui/
  ├── NewsCard.tsx               # News card component
  ├── RelatedNewsCard.tsx        # Related news card
  └── ShareButton.tsx            # Social share button
```

## Key Features

### 1. Server-Side Rendering (SSR)
All news pages are server-rendered for:
- Better SEO
- Faster initial page load
- Search engine crawlability

### 2. Pagination
The news list page supports pagination with:
- Query parameter: `?page=1`
- Previous/Next buttons
- Page number buttons with smart ellipsis

### 3. Error Handling
Graceful error handling with:
- Fallback UI for failed API calls
- User-friendly error messages
- Continues to work even if API is unavailable

### 4. Image Optimization
Next.js Image component with:
- Automatic optimization
- Lazy loading
- Responsive images
- Support for API image URLs

### 5. Revalidation
Data is revalidated every 5 minutes:
```typescript
next: {
  revalidate: 300, // 5 minutes
}
```

## API Service Functions

### `fetchArticles(page, size)`
Fetches paginated list of articles from API.

```typescript
const articlesResponse = await fetchArticles(1, 12);
// Returns: ArticlesResponse with content array
```

### `fetchArticleById(id)`
Fetches single article by ID.

```typescript
const article = await fetchArticleById(123);
// Returns: Article object
```

### `getArticleImageUrl(articleId, imageId)`
Constructs image URL from article and image IDs.

```typescript
const imageUrl = getArticleImageUrl(123, "uuid-string");
// Returns: Full URL to image
```

### `getPrimaryImageUrl(article)`
Gets the primary (first) image URL from an article.

```typescript
const imageUrl = getPrimaryImageUrl(article);
// Returns: Image URL or null
```

### `articleToNewsItem(article)`
Converts API Article format to NewsItem format for backward compatibility.

```typescript
const newsItem = articleToNewsItem(article);
// Returns: NewsItem object
```

## Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=https://c686e0f3d0fc.ngrok-free.app/api/v1
```

For production, update the URL:
```env
NEXT_PUBLIC_API_BASE_URL=https://api.yourproductiondomain.com/api/v1
```

### Next.js Image Configuration
In `next.config.ts`, add the API domain to allowed image sources:

```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "c686e0f3d0fc.ngrok-free.app",
      port: "",
      pathname: "/api/v1/article/get-image",
    },
  ],
}
```

### Ngrok Headers
The API calls include the `ngrok-skip-browser-warning` header to bypass ngrok's browser warning page:

```typescript
headers: {
  "ngrok-skip-browser-warning": "true",
}
```

## Usage Examples

### News List Page
```typescript
// app/[lng]/news/page.tsx
const articlesResponse = await fetchArticles(currentPage, 12);
const newsData = articlesResponse.content.map(articleToNewsItem);

// Render news cards
{newsData.map((news) => (
  <NewsCard key={news.id} news={news} lng={validLng} />
))}
```

### News Detail Page
```typescript
// app/[lng]/news/[id]/page.tsx
const articleId = parseInt(id);
const article = await fetchArticleById(articleId);
const news = articleToNewsItem(article);

// Render article
<div dangerouslySetInnerHTML={{ __html: news.content }} />
```

## TypeScript Types

### Article (API Response)
```typescript
interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string; // HTML format
  category: string;
  author: string;
  readTime: string;
  createdAt: string;
  updatedAt: string;
  images: ArticleImage[];
}
```

### ArticlesResponse (Paginated)
```typescript
interface ArticlesResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Article[];
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
```

## SEO Optimization

### Metadata Generation
Each page generates dynamic metadata:

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const article = await fetchArticleById(articleId);
  
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      type: "article",
      images: [imageUrl],
    },
  };
}
```

### Structured Data
Consider adding JSON-LD structured data for articles:
```json
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Article Title",
  "image": "image-url",
  "datePublished": "2025-01-01",
  "author": {
    "@type": "Organization",
    "name": "Embassy of Uzbekistan"
  }
}
```

## Performance Optimization

### 1. Data Fetching
- Uses `fetch` with Next.js caching
- Automatic request deduplication
- ISR (Incremental Static Regeneration) with revalidate

### 2. Image Loading
- Next.js Image component optimization
- Lazy loading by default
- Responsive images with srcset

### 3. Code Splitting
- Automatic route-based code splitting
- Dynamic imports for heavy components

## Troubleshooting

### API Connection Issues
1. Check if API is running
2. Verify ngrok URL is correct
3. Check CORS settings on backend
4. Verify environment variables

### Image Loading Issues
1. Check `next.config.ts` image domains
2. Verify image URLs are correct
3. Check if images exist in API
4. Try loading image URL directly in browser

### Pagination Issues
1. Verify page parameter is correctly passed
2. Check API response structure
3. Ensure totalPages calculation is correct

## Migration from Mock Data

The old mock data files are kept for reference:
- `data/mockNews.ts`
- `data/news-en.json`

To completely remove mock data:
1. Delete mock data files
2. Remove imports in components
3. Test all news pages

## Testing

### Manual Testing
1. Visit `/en/news` - Should show articles from API
2. Click pagination buttons - Should load different pages
3. Click article card - Should show full article
4. Check images load correctly
5. Test with API offline - Should show error message

### Console Debugging
Check browser console for:
- API request logs
- Error messages
- Network failures

## Future Improvements

1. **Search Functionality**: Add search by title, category, author
2. **Filtering**: Filter by category, date range
3. **Caching**: Implement Redis caching for faster responses
4. **Loading States**: Add skeleton loaders
5. **Infinite Scroll**: Replace pagination with infinite scroll
6. **Image Optimization**: Use CDN for images
7. **Analytics**: Track article views and popular content

## Related Documentation

- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Next.js Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
