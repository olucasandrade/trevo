"use client"
import { GeistSans } from 'geist/font/sans';
import '@mantine/core/styles.css';
import "./globals.css";

import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { theme } from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cssVariableResolver } from './cssVariableResolver';
import { ToastContainer } from 'react-toastify';

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
      <body className={GeistSans.className}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme} cssVariablesResolver={cssVariableResolver}>
          <ToastContainer theme='dark' autoClose={3000} />
          {children}
        </MantineProvider>
      </QueryClientProvider>
      </body>
    </html>
  );
}
