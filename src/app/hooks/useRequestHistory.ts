import { ApiResponse } from '../services/apiService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

type Config = {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  data?: Record<string, unknown>;
  body?: unknown;
  bodyType?: string;
};

export interface HistoryItem {
  id: string;
  method: string;
  url: string;
  timestamp: string;
  config: Config;
  response?: ApiResponse;
}

const HISTORY_KEY = 'request-history';

export const useRequestHistory = () => {
  const queryClient = useQueryClient();

  const { data: history = [] } = useQuery({
    queryKey: [HISTORY_KEY],
    queryFn: () => {
      const savedHistory = localStorage.getItem(HISTORY_KEY);
      return savedHistory ? JSON.parse(savedHistory) : [];
    },
    initialData: [],
  });

  const addToHistory = useMutation({
    mutationFn: async (newItem: Omit<HistoryItem, 'id' | 'timestamp'>) => {
      const updatedHistory = (() => {
        const existingItemIndex: number = history.findIndex(
          (item: HistoryItem) =>
            item.method === newItem.method &&
            item.url === newItem.url &&
            JSON.stringify(item.config) === JSON.stringify(newItem.config)
        );
  
        if (existingItemIndex !== -1) {
          const updatedItem: HistoryItem = {
            ...history[existingItemIndex],
            timestamp: new Date().toISOString(),
          };
          return [
            updatedItem,
            ...history.filter((_: HistoryItem, index: number) => index !== existingItemIndex),
          ].slice(0, 50);
        }
  
        const historyItem: HistoryItem = {
          ...newItem,
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
        };
  
        return [historyItem, ...history].slice(0, 50);
      })();
  
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
      return updatedHistory;
    },
    onSuccess: (updatedHistory) => {
      queryClient.setQueryData([HISTORY_KEY], updatedHistory);
    },
  });
  

  return {
    history,
    addToHistory,
  };
};