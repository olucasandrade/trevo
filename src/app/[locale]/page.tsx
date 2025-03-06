"use client"

import { AppShell, NavLink, Text, useMantineColorScheme } from '@mantine/core';
import { useRequestHistory, HistoryItem } from '../hooks/useRequestHistory';
import { RequestPanel } from '../components/RequestPanel';
import { ResponsePanel } from '../components/ResponsePanel';
import { useEffect, useState } from 'react';
import { ApiResponse } from '../services/apiService';
import { useDisclosure } from '@mantine/hooks';
import { Header } from '../components/Header';
import { IconChevronRight } from '@tabler/icons-react';
import InteractiveParticles from '../components/InteractiveParticles';
import { motion } from 'framer-motion';

export default function Index() {
  const { history } = useRequestHistory();
  const [response, setResponse] = useState<ApiResponse>();
  const [selectedRequest, setSelectedRequest] = useState<HistoryItem | null>(null);
  const [opened, { toggle }] = useDisclosure();
  const { setColorScheme } = useMantineColorScheme();

  useEffect(() => {
    setColorScheme('dark');
  })

  const handleHistorySelect = (item: HistoryItem) => {
    toggle();
    setSelectedRequest(item);
    if (item.response) {
      setResponse(item.response);
    }
  };
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
        className="transition-all duration-300 ease-in-out"
      >
        <Header opened={opened} toggle={toggle} />
        <AppShell.Navbar p="md" className="transition-transform duration-300 ease-in-out">
          <InteractiveParticles />
          <Text size="xl" className="mb-4 transition-opacity duration-300">
            History
          </Text>
          
          {history.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {history.map((item: HistoryItem, index: number) => (
                <motion.div
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NavLink
                    label={item.url}
                    rightSection={
                      <IconChevronRight size={12} stroke={1.5} className="mantine-rotate-rtl" />
                    }
                    variant="filled"
                    active
                    onClick={() => handleHistorySelect(item)}
                    className="rounded-md mb-2 transform transition-all duration-200 hover:scale-102 hover:shadow-md"
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-500"
            >
              No requests yet
            </motion.div>
          )}
        </AppShell.Navbar>
        <AppShell.Main>
          <motion.div 
            className="flex gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex-1 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <RequestPanel
                  onResponse={setResponse} 
                  selectedRequest={selectedRequest}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ResponsePanel response={response} />
              </motion.div>
            </div>
          </motion.div>
        </AppShell.Main>
      </AppShell>
    );
  }