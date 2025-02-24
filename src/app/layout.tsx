"use client"
import localFont from 'next/font/local';
import '@mantine/core/styles.css';
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { theme } from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cssVariableResolver } from './cssVariableResolver';
import { ToastContainer } from 'react-toastify';

const satoshi = localFont({
  src: [
    {
      path: '../../public/fonts/Satoshi-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <html lang="en"{...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className={satoshi.className}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme} cssVariablesResolver={cssVariableResolver}>
          <ToastContainer theme='dark' autoClose={3000} />
          <Analytics />
          {children}
        </MantineProvider>
      </QueryClientProvider>
      </body>
    </html>
  );
}
