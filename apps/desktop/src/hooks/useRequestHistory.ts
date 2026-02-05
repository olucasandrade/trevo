import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { HistoryItem, RequestConfig, ApiResponse } from '@trevo/core';

const HISTORY_KEY = 'request-history';
const MAX_HISTORY_ITEMS = 50;

// Desktop storage using Tauri fs plugin
async function loadHistory(): Promise<HistoryItem[]> {
  try {
    const { appDataDir } = await import('@tauri-apps/api/path');
    const { readTextFile, exists } = await import('@tauri-apps/plugin-fs');

    const basePath = await appDataDir();
    const filePath = `${basePath}${HISTORY_KEY}.json`;

    if (await exists(filePath)) {
      const content = await readTextFile(filePath);
      return JSON.parse(content);
    }
  } catch (error) {
    console.warn('Failed to load history from file, using localStorage fallback:', error);
    // Fallback to localStorage for development without Tauri
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  }
  return [];
}

async function saveHistory(history: HistoryItem[]): Promise<void> {
  try {
    const { appDataDir } = await import('@tauri-apps/api/path');
    const { writeTextFile, mkdir } = await import('@tauri-apps/plugin-fs');

    const basePath = await appDataDir();
    await mkdir(basePath, { recursive: true });
    const filePath = `${basePath}${HISTORY_KEY}.json`;

    await writeTextFile(filePath, JSON.stringify(history, null, 2));
  } catch (error) {
    console.warn('Failed to save history to file, using localStorage fallback:', error);
    // Fallback to localStorage for development without Tauri
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }
}

export function useRequestHistory() {
  const queryClient = useQueryClient();

  const { data: history = [] } = useQuery({
    queryKey: [HISTORY_KEY],
    queryFn: loadHistory,
    initialData: [],
  });

  const addToHistory = useMutation({
    mutationFn: async (newItem: {
      method: string;
      url: string;
      config: RequestConfig;
      response?: ApiResponse;
    }) => {
      // Check for duplicate
      const existingIndex = history.findIndex(
        (item) =>
          item.method === newItem.method &&
          item.url === newItem.url &&
          JSON.stringify(item.config) === JSON.stringify(newItem.config)
      );

      let updatedHistory: HistoryItem[];

      if (existingIndex !== -1) {
        // Update existing item's timestamp and move to front
        const updatedItem: HistoryItem = {
          ...history[existingIndex],
          timestamp: new Date().toISOString(),
          response: newItem.response,
        };
        updatedHistory = [
          updatedItem,
          ...history.filter((_, index) => index !== existingIndex),
        ].slice(0, MAX_HISTORY_ITEMS);
      } else {
        // Add new item
        const historyItem: HistoryItem = {
          id: crypto.randomUUID(),
          method: newItem.method,
          url: newItem.url,
          timestamp: new Date().toISOString(),
          config: newItem.config,
          response: newItem.response,
        };
        updatedHistory = [historyItem, ...history].slice(0, MAX_HISTORY_ITEMS);
      }

      await saveHistory(updatedHistory);
      return updatedHistory;
    },
    onSuccess: (updatedHistory) => {
      queryClient.setQueryData([HISTORY_KEY], updatedHistory);
    },
  });

  const clearHistory = useMutation({
    mutationFn: async () => {
      await saveHistory([]);
      return [];
    },
    onSuccess: () => {
      queryClient.setQueryData([HISTORY_KEY], []);
    },
  });

  return {
    history,
    addToHistory,
    clearHistory,
  };
}
