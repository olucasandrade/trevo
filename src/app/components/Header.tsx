"use client"
import { AppShell, Burger, Group, Button, Title } from '@mantine/core';
import { IconClover, IconBrandGithub } from '@tabler/icons-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';

interface HeaderProps {
  opened?: boolean;
  toggle?: () => void;
}

export function Header({ opened, toggle }: HeaderProps) {
  const t = useTranslations('navigation');

  return (
    <AppShell.Header withBorder={true} style={{ borderColor: '#1f2937' }}>
      <Group h="100%" px="md" justify="space-between">
        <Group>
          {toggle && (
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          )}
          <Link href="/" className="flex items-center gap-1">
            <IconClover size={32} />
            <Title size={24}>Trevo</Title>
          </Link>
        </Group>
        <Group>
          <Link href="/">
            <Button variant='subtle' fz={"md"}>
              {t('home')}
            </Button>
          </Link>
          <Link href="/about">
            <Button variant='subtle' fz={"md"}>
              {t('about')}
            </Button>
          </Link>
          <Button
            component="a"
            href="https://github.com/olucasandrade/trevo"
            target="_blank"
            variant="subtle"
            leftSection={<IconBrandGithub size={18} />}
            fz={"md"}
          >
            {t('github')}
          </Button>
          <LocaleSwitcher />
        </Group>
      </Group>
    </AppShell.Header>
  );
}
