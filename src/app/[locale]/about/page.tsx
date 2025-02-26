"use client"

import { Anchor, AppShell, List, Text, Title } from '@mantine/core';
import Image from 'next/image';
import { Header } from '../../components/Header';
import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('about');

  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
      withBorder={false}
    >
      <Header />
      <AppShell.Main>
        <div className="max-w-3xl mx-auto mt-12 px-6">
          <Title order={1} className="mb-8 text-center text-4xl font-bold">{t('title')}</Title>
          
          <Text size="lg" className="mb-6 leading-relaxed text-center">
            {t('greeting')}
          </Text>
          <Image 
            src="https://avatars.githubusercontent.com/u/64823667?s=400&u=2c10bb1ec1887d4d5e491acd5f1cf7842fe1982e&v=4" 
            alt="Lucas Andrade"
            width={192}
            height={192}
            className="rounded-full shadow-lg mx-auto mb-4"
          />
          <Text size="lg" className="mb-6 leading-relaxed">
            {t('introduction')}
          </Text>

          <Text size="lg" className="mb-6 leading-relaxed">
            {t('trevoDescription')}
          </Text>

          <Text size="lg" className="mb-6 leading-relaxed">
            {t('focus')}
          </Text>

          <Title order={2} className="mb-4 text-center text-2xl font-bold">{t('features.title')}</Title>
          <List spacing="xs" size="lg" center className='text-center mb-8'>
            <List.Item>{t('features.history')}</List.Item>
            <List.Item>{t('features.curl')}</List.Item>
            <List.Item>{t('features.clipboard')}</List.Item>
            <List.Item>{t('features.theme')}</List.Item>
          </List>

          <Title order={3} className="mb-4 text-center text-2xl font-bold">{t('upcoming.title')}</Title>
          <List spacing="xs" size="lg" center className='text-center'>
            <List.Item>{t('upcoming.collections')}</List.Item>
            <List.Item>{t('upcoming.export')}</List.Item>
            <List.Item>{t('upcoming.environment')}</List.Item>
            <List.Item>{t('upcoming.more')}</List.Item>
          </List>

          <div className='w-full text-center mb-4 mt-8'>
            <Anchor href='https://github.com/olucasandrade/trevo/compare' target='_blank'>#enjoy</Anchor>
          </div>
        </div>
      </AppShell.Main>
    </AppShell>
  );
}
