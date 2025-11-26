import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Embassy of Uzbekistan in UAE',
    short_name: 'UZ Embassy UAE',
    description: 'Official website of the Embassy of the Republic of Uzbekistan in the United Arab Emirates',
    start_url: '/en',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e40af',
    icons: [
      {
        src: '/emblem_of_uzbekistan.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
