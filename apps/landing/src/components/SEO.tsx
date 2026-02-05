import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useI18n } from '../contexts/i18n/i18nContext';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  keywords?: string[];
  noIndex?: boolean;
  structuredData?: Record<string, unknown>;
  children?: React.ReactNode;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  ogImage = '/trevo-website.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  keywords = [],
  noIndex = false,
  structuredData,
  children,
}) => {
  const { t } = useI18n();
  const defaultTitle = 'Trevo - Beautiful API Testing Tool';
  const defaultDescription = t('hero.description');
  const siteUrl = 'https://trevo.rest';

  const metaTitle = title ? `${title} | Trevo` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaCanonical = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  const metaKeywords = keywords.length > 0 ? keywords.join(', ') : 'API, testing, developer tools, REST, API client, WebSocket, desktop app, CORS proxy';

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={metaCanonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={metaCanonical} />
      <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`} />
      <meta property="og:site_name" content="Trevo" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`} />
      <meta name="twitter:creator" content="@lucasandrade" />

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {children}
    </Helmet>
  );
};

export default SEO;
