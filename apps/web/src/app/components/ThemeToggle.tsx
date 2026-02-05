"use client"
import { ActionIcon, Box } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useMantineColorScheme } from '@mantine/core';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Box
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 1000,
      }}
    >
      <ActionIcon
        variant="filled"
        size="xl"
        radius="xl"
        onClick={toggleColorScheme}
        style={{
          transition: 'all 0.3s ease',
          transform: 'scale(1)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
        className="hover:scale-110 hover:shadow-lg active:scale-95"
      >
        {colorScheme === 'dark' ? 
          <IconSun size={20} style={{ transition: 'transform 0.3s ease' }} className="animate-spin-slow" /> : 
          <IconMoon size={20} style={{ transition: 'transform 0.3s ease' }} className="animate-spin-slow" />
        }
      </ActionIcon>
    </Box>
  );
}
