import { useState } from 'react';
import {
  AppShell,
  Burger,
  Group,
  Title,
  NavLink,
  Text,
  Badge,
  ActionIcon,
  Tooltip,
  useMantineColorScheme,
  ScrollArea,
  Stack,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconSun,
  IconMoon,
  IconClover,
  IconHistory,
  IconWorld,
  IconLink,
  IconSend,
} from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ApiResponse, HistoryItem } from '@trevo/core';
import { RequestPanel } from './components/RequestPanel';
import { ResponsePanel } from './components/ResponsePanel';
import { EnvironmentPanel } from './components/EnvironmentPanel';
import { ChainPanel } from './components/ChainPanel';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { useRequestHistory } from './hooks/useRequestHistory';
import { useEnvironments } from './hooks/useEnvironments';

function App() {
  const [opened, { toggle }] = useDisclosure();
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const [response, setResponse] = useState<ApiResponse | undefined>();
  const [selectedRequest, setSelectedRequest] = useState<HistoryItem | null>(null);
  const [activeMainTab, setActiveMainTab] = useState<string | null>('request');
  const { history } = useRequestHistory();
  const { activeEnvironment } = useEnvironments();

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setSelectedRequest(item);
    if (item.response) {
      setResponse(item.response);
    }
    setActiveMainTab('request');
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <IconClover size={28} color="var(--mantine-color-primary-filled)" />
            <Title order={3}>Trevo Desktop</Title>
            <Badge variant="light" color="purple" size="sm">
              Beta
            </Badge>
          </Group>
          <Group>
            {activeEnvironment && (
              <Tooltip label={`Active environment: ${activeEnvironment.name}`}>
                <Badge
                  variant="dot"
                  color="green"
                  size="sm"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setActiveMainTab('environments')}
                >
                  {activeEnvironment.name}
                </Badge>
              </Tooltip>
            )}
            <ThemeSwitcher />
            <Tooltip label={colorScheme === 'dark' ? 'Light mode' : 'Dark mode'}>
              <ActionIcon
                variant="subtle"
                onClick={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
                size="lg"
              >
                {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppShell.Section>
          <Stack gap="xs" mb="md">
            <NavLink
              label="Request"
              leftSection={<IconSend size={16} />}
              active={activeMainTab === 'request'}
              onClick={() => setActiveMainTab('request')}
              style={{ borderRadius: 'var(--mantine-radius-sm)' }}
            />
            <NavLink
              label="Environments"
              leftSection={<IconWorld size={16} />}
              active={activeMainTab === 'environments'}
              onClick={() => setActiveMainTab('environments')}
              style={{ borderRadius: 'var(--mantine-radius-sm)' }}
              rightSection={
                activeEnvironment && (
                  <Badge size="xs" variant="light">
                    {activeEnvironment.variables.length}
                  </Badge>
                )
              }
            />
            <NavLink
              label="Chains"
              leftSection={<IconLink size={16} />}
              active={activeMainTab === 'chains'}
              onClick={() => setActiveMainTab('chains')}
              style={{ borderRadius: 'var(--mantine-radius-sm)' }}
            />
          </Stack>
        </AppShell.Section>

        <AppShell.Section>
          <Group mb="xs">
            <IconHistory size={16} />
            <Text size="sm" fw={500}>
              History
            </Text>
          </Group>
        </AppShell.Section>

        <AppShell.Section grow component={ScrollArea}>
          <AnimatePresence>
            {history.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
              >
                <NavLink
                  label={
                    <Text size="xs" lineClamp={1}>
                      {item.url}
                    </Text>
                  }
                  description={new Date(item.timestamp).toLocaleString()}
                  leftSection={
                    <Badge
                      size="xs"
                      color={
                        item.method === 'GET'
                          ? 'green'
                          : item.method === 'POST'
                            ? 'blue'
                            : item.method === 'PUT'
                              ? 'orange'
                              : item.method === 'DELETE'
                                ? 'red'
                                : 'gray'
                      }
                    >
                      {item.method}
                    </Badge>
                  }
                  onClick={() => handleSelectHistoryItem(item)}
                  active={selectedRequest?.id === item.id && activeMainTab === 'request'}
                  style={{ borderRadius: 'var(--mantine-radius-sm)' }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          {history.length === 0 && (
            <Text c="dimmed" ta="center" mt="xl" size="sm">
              No requests yet
            </Text>
          )}
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 60px)',
        }}
      >
        {activeMainTab === 'request' && (
          <div style={{ display: 'flex', gap: '1rem', height: '100%' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <RequestPanel
                onResponse={setResponse}
                selectedRequest={selectedRequest}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <ResponsePanel response={response} />
            </div>
          </div>
        )}

        {activeMainTab === 'environments' && (
          <div style={{ maxWidth: 800, margin: '0 auto', width: '100%', height: '100%' }}>
            <EnvironmentPanel />
          </div>
        )}

        {activeMainTab === 'chains' && (
          <div style={{ maxWidth: 900, margin: '0 auto', width: '100%', height: '100%' }}>
            <ChainPanel />
          </div>
        )}
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
