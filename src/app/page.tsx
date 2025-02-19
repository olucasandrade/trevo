"use client"

import { AppShell, Burger, Group, NavLink, Text, Title, useMantineColorScheme } from '@mantine/core';
import { IconChevronRight, IconLeaf2 } from '@tabler/icons-react'
import { HistoryItem, useRequestHistory } from './hooks/useRequestHistory';
import { RequestPanel } from './components/RequestPanel';
import { ResponsePanel } from './components/ResponsePanel';
import { useEffect, useState } from 'react';
import { ApiResponse } from './services/apiService';
import { useDisclosure } from '@mantine/hooks';

export default function Index() {
  const { history } = useRequestHistory();
  const [response, setResponse] = useState<ApiResponse>();
  const [selectedRequest, setSelectedRequest] = useState<HistoryItem | null>(null);
  const [opened, { toggle }] = useDisclosure();

  const handleHistorySelect = (item: HistoryItem) => {
    toggle();
    setSelectedRequest(item);
    if (item.response) {
      setResponse(item.response);
    }
  };

  const { setColorScheme } = useMantineColorScheme();

  useEffect(() => {
    setColorScheme('dark');
  }, [setColorScheme]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: { base: 200, md: 300, lg: 400 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
      withBorder={false}
    >
      <AppShell.Header withBorder={true}>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <IconLeaf2 size={32} />
          <Title size={24} className='-m-2'>Trevo</Title>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
      <Text size="xl" className='mb-4'>
        History
      </Text>
        
        {history.length > 0 ? (
           history.map((item: HistoryItem) => (
            <NavLink
            key={item.id}
            label={item.url}
            rightSection={
              <IconChevronRight size={12} stroke={1.5} className="mantine-rotate-rtl" />
            }
            variant="filled"
            active
            onClick={() => handleHistorySelect(item)}
            className='rounded-md mb-2'
          />
          ))
          ) : (
              <div>No requests yet</div>
            )}
      </AppShell.Navbar>
      <AppShell.Main>
      <div className="flex gap-8">
          <div className="flex-1 space-y-8">
            <RequestPanel
              onResponse={setResponse} 
              selectedRequest={selectedRequest}
            />
            <ResponsePanel response={response} />
          </div>
        </div>
      </AppShell.Main>
    </AppShell>
  );
}
