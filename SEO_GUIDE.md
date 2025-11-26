# SEO Implementation Guide

## Implemented SEO Features

### 1. **Sitemap.xml** (`app/sitemap.ts`)
- Automatically generates sitemap for all static and dynamic pages
- Includes all language versions (en, uz)
- Dynamically fetches news articles from API
- Updates hourly with ISR (Incremental Static Regeneration)
- Includes proper change frequencies and priorities

### 2. **Robots.txt** (`app/robots.ts`)
- Allows all search engine crawlers
- Blocks private paths (/api/, /_next/, /admin/)
- Points to sitemap.xml

### 3. **Web Manifest** (`app/manifest.ts`)
- PWA support for mobile devices
- Custom app name and icons
- Theme colors for better mobile experience

### 4. **Enhanced Metadata** (`app/[lng]/layout.tsx`)
- Comprehensive meta tags
- Open Graph tags for social media sharing
- Twitter Card support
- Proper language alternates
- Canonical URLs
- Robots meta tags with detailed instructions

### 5. **Structured Data (JSON-LD)** (`lib/schema.ts`)
- Organization schema with embassy details
- Website schema with search action
- Improves rich snippets in search results

### 6. **Security & Performance Headers** (`next.config.ts`)
- X-DNS-Prefetch-Control
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Compression enabled

### 7. **Page-Level Metadata Helper** (`lib/metadata.ts`)
- Reusable function for generating page metadata
- Consistent SEO across all pages
- Language-aware metadata

## How to Use

### For Each Page

Import the metadata helper and generate metadata:

```typescript
import { generatePageMetadata } from '@/lib/metadata'
import { Metadata } from 'next'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lng } = await params
  
  return generatePageMetadata({
    title: 'Your Page Title',
    description: 'Your page description',
    lng,
    path: '/your-page-path',
    keywords: ['keyword1', 'keyword2']
  })
}
```

### Testing SEO

1. **Local Testing:**
   ```bash
   npm run dev
   ```
   Visit:
   - `/sitemap.xml` - Check sitemap generation
   - `/robots.txt` - Check robots file
   - `/manifest.json` - Check web manifest

2. **SEO Validation Tools:**
   - [Google Rich Results Test](https://search.google.com/test/rich-results)
   - [Schema.org Validator](https://validator.schema.org/)
   - [Lighthouse](https://developers.google.com/web/tools/lighthouse)
   - [PageSpeed Insights](https://pagespeed.web.dev/)

3. **Search Console Setup:**
   - Add site to [Google Search Console](https://search.google.com/search-console)
   - Add verification code to `layout.tsx` metadata.verification
   - Submit sitemap: `https://uzembassy.ae/sitemap.xml`

## Next Steps

1. **Add Google Analytics:**
   ```typescript
   // Add to layout.tsx
   <Script src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID" />
   ```

2. **Add Search Console Verification:**
   Update `metadata.verification.google` in layout.tsx

3. **Add Social Media Images:**
   - Create OpenGraph images (1200x630px)
   - Add to each page metadata:
   ```typescript
   openGraph: {
     images: [{ url: '/og-image.jpg' }]
   }
   ```

4. **Monitor Performance:**
   - Set up Google Analytics
   - Monitor Core Web Vitals
   - Track search rankings
   - Monitor sitemap indexing in Search Console

## Best Practices

- ✅ Unique titles and descriptions for each page
- ✅ Use descriptive URLs
- ✅ Implement proper heading hierarchy (H1 → H6)
- ✅ Add alt text to all images
- ✅ Use semantic HTML
- ✅ Ensure mobile responsiveness
- ✅ Optimize page load speed
- ✅ Use HTTPS (already configured)
- ✅ Create quality content regularly

## Checklist

- [x] Sitemap.xml generation
- [x] Robots.txt file
- [x] Web manifest
- [x] Meta tags (title, description, keywords)
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Structured data (JSON-LD)
- [x] Canonical URLs
- [x] Language alternates
- [x] Security headers
- [ ] Google Analytics setup
- [ ] Search Console verification
- [ ] Social media images
- [ ] Performance monitoring

## Support & Resources

- [Next.js SEO Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
