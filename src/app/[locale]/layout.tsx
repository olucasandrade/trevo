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

export default async function RootLayout({ children, params: { locale } }: { children: React.ReactNode, params: { locale: string } }) {
  const messages = await getMessages();

  return (
    <html lang={locale} {...mantineHtmlProps} suppressHydrationWarning>
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
