import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KupiIP',
    short_name: 'KupiIP',
    description: 'VLESS ключи. Ваш ключ к безопасному интернету',
    start_url: '/',
    display: 'standalone',
    background_color: '#000013',
    theme_color: '#000013',
    icons: [
      {
        src: '/favicon/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
