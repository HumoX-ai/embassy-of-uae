export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string; // HTML content
  image: string;
  date: string;
  category: string;
  author?: string;
  readTime?: string;
}

export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
}
