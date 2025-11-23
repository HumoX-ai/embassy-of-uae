// API Response Types
export interface ArticleImage {
  id: string;
  originalName: string;
  type: string;
  size: number;
}

export interface Article {
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

export interface PageableSort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface Pageable {
  offset: number;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  sort: PageableSort;
}

export interface ArticlesResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Article[];
  number: number;
  pageable: Pageable;
  sort: PageableSort;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// Legacy type for backward compatibility
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
