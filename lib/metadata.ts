import { Metadata } from 'next'

export interface PageMetadataParams {
  title: string
  description: string
  lng: string
  path: string
  keywords?: string[]
}

export function generatePageMetadata({
  title,
  description,
  lng,
  path,
  keywords = [],
}: PageMetadataParams): Metadata {
  const baseUrl = 'https://uzembassy.ae'
  const url = `${baseUrl}/${lng}${path}`
  
  return {
    title,
    description,
    keywords: [
      'Uzbekistan Embassy',
      'UAE',
      'Embassy Services',
      ...keywords,
    ],
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/en${path}`,
        uz: `${baseUrl}/uz${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Embassy of Uzbekistan in UAE',
      locale: lng === 'uz' ? 'uz_UZ' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
