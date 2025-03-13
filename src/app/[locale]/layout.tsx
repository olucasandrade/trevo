import localFont from 'next/font/local';
import '@mantine/core/styles.css';
import "../globals.css";
import { Analytics } from "@vercel/analytics/react"
import React from 'react';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import { ToastContainer } from 'react-toastify';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import MantineProvider from '../providers/MantineProvider';
import QueryClientProvider from '../providers/QueryProvider';
import { ThemeToggle } from '../components/ThemeToggle';
import { Metadata } from 'next';

const satoshi = localFont({
  src: [
    {
      path: '../../../public/fonts/Satoshi-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  
  return {
    title: {
      template: '%s | Trevo - CORS Proxy API',
      default: 'Trevo - CORS Proxy API and API Testing Tool',
    },
    description: 'A modern CORS proxy API and API testing tool to bypass Cross-Origin Resource Sharing restrictions and simplify API development',
    keywords: ['CORS proxy', 'API testing', 'API tool', 'CORS bypass', 'API development'],
    authors: [{ name: 'Trevo Team' }],
    creator: 'Trevo',
    publisher: 'Trevo',
    metadataBase: new URL('https://app.trevo.rest'),
    alternates: {
      canonical: '/',
      languages: {
        'en': '/en',
        'pt': '/pt',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: 'https://app.trevo.rest',
      title: 'Trevo - CORS Proxy API and API Testing Tool',
      description: 'A modern CORS proxy API and API testing tool to bypass Cross-Origin Resource Sharing restrictions',
      siteName: 'Trevo',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Trevo - CORS Proxy API and API Testing Tool',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Trevo - CORS Proxy API and API Testing Tool',
      description: 'A modern CORS proxy API and API testing tool to bypass Cross-Origin Resource Sharing restrictions',
      images: ['/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'google-site-verification-code', // Replace with your actual verification code
    },
  };
}

export default async function RootLayout(
  { children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} {...mantineHtmlProps} suppressHydrationWarning data-mantine-color-scheme="dark">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className={satoshi.className}>
      <QueryClientProvider>
      <NextIntlClientProvider messages={messages}>
        <MantineProvider>
          <ToastContainer theme='dark' autoClose={3000} />
          <Analytics />
          {children}
          <ThemeToggle />
        </MantineProvider>
      </NextIntlClientProvider>
      </QueryClientProvider>
      </body>
    </html>
  );
}
