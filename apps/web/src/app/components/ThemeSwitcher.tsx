'use client';

import { Menu, ActionIcon, Text, Group } from '@mantine/core';
import { IconPalette, IconCheck } from '@tabler/icons-react';
import { useTheme, useSetTheme, themes } from '@trevo/ui';

export function ThemeSwitcher() {
  const { themeId } = useTheme();
  const setTheme = useSetTheme();

  return (
    <Menu position="bottom-end" shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon
          variant="subtle"
          size="lg"
          aria-label="Change theme"
          title="Change theme"
        >
          <IconPalette size={20} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Select Theme</Menu.Label>
        {themes.map((theme) => (
          <Menu.Item
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            rightSection={themeId === theme.id ? <IconCheck size={16} /> : null}
          >
            <Group gap="xs">
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 4,
                  backgroundColor: theme.colors.accentPrimary,
                }}
              />
              <Text size="sm">{theme.name}</Text>
            </Group>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
