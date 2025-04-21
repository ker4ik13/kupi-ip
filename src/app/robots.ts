import { MetadataRoute } from 'next'
import { getServerSideURL } from '@/utils/getURL'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getServerSideURL()

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api', '/api/', '/guide/'],
      },
      {
        userAgent: 'Yandex',
        disallow: '\nClean-param: etext /',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
