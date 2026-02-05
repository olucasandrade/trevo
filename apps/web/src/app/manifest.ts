import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Trevo - CORS Proxy API and API Testing Tool',
    short_name: 'Trevo',
    description: 'A modern CORS proxy API and API testing tool to bypass Cross-Origin Resource Sharing restrictions',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0070f3',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/globe.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      }
    ],
    orientation: 'portrait',
    categories: ['developer tools', 'utilities', 'productivity'],
    lang: 'en',
    dir: 'ltr',
    prefer_related_applications: false,
  };
} 