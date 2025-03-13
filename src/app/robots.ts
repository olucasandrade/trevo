import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/private/',
          '/_next/',
          '/admin/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/private/',
          '/_next/',
          '/admin/',
        ],
      },
    ],
    sitemap: 'https://app.trevo.rest/sitemap.xml',
    host: 'https://app.trevo.rest',
  };
} 