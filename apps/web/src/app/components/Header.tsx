import { AppShell, Burger, Group, Button, Title, Stack, Drawer } from '@mantine/core';
import { IconClover, IconBrandGithub, IconHistory, IconBookmarks } from '@tabler/icons-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useDisclosure } from '@mantine/hooks';
import LocaleSwitcher from './LocaleSwitcher';
import { SavedRequestsDrawer } from './request/SavedRequestsDrawer';
import { SavedRequest } from '../types/requests';

interface HeaderProps {
  opened?: boolean;
  onSelectRequest: (request: SavedRequest) => void;
  toggle?: () => void;
}

export function Header({ opened, toggle, onSelectRequest }: HeaderProps) {
  const t = useTranslations('navigation');
  const [drawerOpened, { open, close }] = useDisclosure(false);
  const [savedRequestsOpened, { open: openSavedRequests, close: closeSavedRequests }] = useDisclosure(false);

  const toggleAndClose = (forceOpen: boolean = false) => {
    if (opened || forceOpen) {
      toggle?.();
    }
    close();
  }

  return (
    <>
      <AppShell.Header withBorder={true} style={{ borderColor: '#1f2937', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger 
              opened={drawerOpened} 
              onClick={open} 
              hiddenFrom="sm" 
              size="sm" 
              transitionDuration={300}
            />
            <Link href="/" className="flex items-center gap-2 transition-transform duration-300 hover:scale-105">
              <IconClover size={32} />
              <Title size={24} style={{ letterSpacing: '-0.02em' }}>Trevo</Title>
            </Link>
          </Group>
          <Group visibleFrom="sm" gap="md">
            <Button
              variant='subtle'
              leftSection={<IconBookmarks size={18} />}
              onClick={openSavedRequests}
              style={{ 
                padding: '8px 16px',
                transition: 'all 0.2s ease',
                fontWeight: 500
              }}
              className="hover:scale-105"
            >
              Saved Requests
            </Button>
            <Link href="/">
              <Button 
                variant='subtle' 
                fz={"md"} 
                style={{ 
                  padding: '8px 16px',
                  transition: 'all 0.2s ease',
                  fontWeight: 500
                }}
                className="hover:scale-105"
              >
                {t('home')}
              </Button>
            </Link>
            <a href="https://trevo.rest" target='_blank'>
              <Button 
                variant='subtle' 
                fz={"md"}
                style={{ 
                  padding: '8px 16px',
                  transition: 'all 0.2s ease',
                  fontWeight: 500
                }}
                className="hover:scale-105"
              >
                {t('about')}
              </Button>
            </a>
            <Button
              component="a"
              href="https://github.com/olucasandrade/trevo"
              target="_blank"
              variant="subtle"
              leftSection={<IconBrandGithub size={18} />}
              fz={"md"}
              style={{ 
                padding: '8px 16px',
                transition: 'all 0.2s ease',
                fontWeight: 500
              }}
              className="hover:scale-105"
            >
              {t('github')}
            </Button>
            <LocaleSwitcher />
          </Group>
        </Group>
      </AppShell.Header>
      
      <Drawer 
        opened={drawerOpened} 
        onClose={close} 
        size="xs" 
        padding="xl"
        transitionProps={{ duration: 300, transition: 'slide-right' }}
        style={{ backdropFilter: 'blur(4px)' }}
      >
        <Stack gap="lg">
          <Link href="/" onClick={() => toggleAndClose()}>
            <Button 
              variant='subtle' 
              fullWidth
              style={{ 
                padding: '12px 16px',
                transition: 'all 0.2s ease',
                fontWeight: 500
              }}
              className="hover:scale-105"
            >
              {t('home')}
            </Button>
          </Link>
          <a href="https://trevo.rest" onClick={() => toggleAndClose()}>
            <Button 
              variant='subtle' 
              fullWidth
              style={{ 
                padding: '12px 16px',
                transition: 'all 0.2s ease',
                fontWeight: 500
              }}
              className="hover:scale-105"
            >
              {t('about')}
            </Button>
          </a>
          <Button
            component="a"
            href="https://github.com/olucasandrade/trevo"
            target="_blank"
            variant="subtle"
            leftSection={<IconBrandGithub size={18} />}
            fullWidth
            style={{ 
              padding: '12px 16px',
              transition: 'all 0.2s ease',
              fontWeight: 500
            }}
            className="hover:scale-105"
          >
            {t('github')}
          </Button>
          <Button
              component="a"
              onClick={() => toggleAndClose(true)}
              variant="subtle"
              leftSection={<IconHistory size={18} />}
              fz={"md"}
              fullWidth
              style={{ 
                padding: '12px 16px',
                transition: 'all 0.2s ease',
                fontWeight: 500
              }}
              className="hover:scale-105"
            >
              Request history
          </Button>
          <LocaleSwitcher />
        </Stack>
      </Drawer>

      <SavedRequestsDrawer
        opened={savedRequestsOpened}
        onClose={closeSavedRequests}
        onSelectRequest={(request: SavedRequest) => {
          onSelectRequest(request);
          closeSavedRequests();
        }}
      />
    </>
  );
}
