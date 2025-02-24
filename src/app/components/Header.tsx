import { AppShell, Burger, Group, Button, Title } from '@mantine/core';
import { IconLeaf2, IconBrandGithub } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  opened?: boolean;
  toggle?: () => void;
}

export function Header({ opened, toggle }: HeaderProps) {
  const pathname = usePathname();

  return (
    <AppShell.Header withBorder={true}>
      <Group h="100%" px="md" justify="space-between">
        <Group>
          {toggle && (
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          )}
          <IconLeaf2 size={32} />
          <Title size={24} className='-m-2'>Trevo</Title>
        </Group>
        <Group>
          <Link href="/" passHref>
            <Button variant={pathname === '/' ? 'filled' : 'subtle'}>
              Home
            </Button>
          </Link>
          <Link href="/about" passHref>
            <Button variant={pathname === '/about' ? 'filled' : 'subtle'}>
              About
            </Button>
          </Link>
          <Button
            component="a"
            href="https://github.com/yourusername/trevo"
            target="_blank"
            variant="subtle"
            leftSection={<IconBrandGithub size={18} />}
          >
            GitHub
          </Button>
        </Group>
      </Group>
    </AppShell.Header>
  );
}
