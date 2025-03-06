import { AppShell, Burger, Group, Button, Title, Stack, Drawer } from '@mantine/core';
import { IconClover, IconBrandGithub, IconHistory } from '@tabler/icons-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useDisclosure } from '@mantine/hooks';
import LocaleSwitcher from './LocaleSwitcher';

interface HeaderProps {
  opened?: boolean;
  toggle?: () => void;
}

export function Header({ opened, toggle }: HeaderProps) {
  const t = useTranslations('navigation');
  const [drawerOpened, { open, close }] = useDisclosure(false);

  const toggleAndClose = (forceOpen: boolean = false) => {
    if (opened || forceOpen) {
      toggle?.();
    }
    close();
  }

  return (
    <>
      <AppShell.Header withBorder={true} style={{ borderColor: '#1f2937' }}>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={drawerOpened} onClick={open} hiddenFrom="sm" size="sm" />
            <Link href="/" className="flex items-center gap-1">
              <IconClover size={32} />
              <Title size={24}>Trevo</Title>
            </Link>
          </Group>
          <Group visibleFrom="sm">
            <Link href="/">
              <Button variant='subtle' fz={"md"}>{t('home')}</Button>
            </Link>
            <a href="https://trevo.rest" target='_blank'>
              <Button variant='subtle' fz={"md"}>{t('about')}</Button>
            </a>
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
      
      <Drawer opened={drawerOpened} onClose={close} size="xs" padding="md">
        <Stack>
          <Link href="/" onClick={() => toggleAndClose()}>
            <Button variant='subtle' fullWidth>{t('home')}</Button>
          </Link>
          <Link href="/about" onClick={() => toggleAndClose()}>
            <Button variant='subtle' fullWidth>{t('about')}</Button>
          </Link>
          <Button
            component="a"
            href="https://github.com/olucasandrade/trevo"
            target="_blank"
            variant="subtle"
            leftSection={<IconBrandGithub size={18} />}
            fullWidth
          >
            {t('github')}
          </Button>
          <Button
              component="a"
              onClick={() => toggleAndClose(true)}
              variant="subtle"
              leftSection={<IconHistory size={18} />}
              fz={"md"}
            >
              Request history
          </Button>
          <LocaleSwitcher />
        </Stack>
      </Drawer>
    </>
  );
}
