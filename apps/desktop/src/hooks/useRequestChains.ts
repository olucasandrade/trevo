import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  RequestChain,
  ChainedRequest,
  ResponseExtractor,
  ApiResponse,
  RequestConfig,
} from '@trevo/core';
import { v4 as uuidv4 } from 'uuid';
import { sendRequest } from '../services/apiService';
import { useEnvironments } from './useEnvironments';

const CHAINS_KEY = 'request-chains';

// Storage functions
async function loadChains(): Promise<RequestChain[]> {
  try {
    const { appDataDir } = await import('@tauri-apps/api/path');
    const { readTextFile, exists } = await import('@tauri-apps/plugin-fs');

    const basePath = await appDataDir();
    const filePath = `${basePath}${CHAINS_KEY}.json`;

    if (await exists(filePath)) {
      const content = await readTextFile(filePath);
      return JSON.parse(content);
    }
  } catch (error) {
    console.warn('Failed to load chains from file, using localStorage fallback:', error);
    const stored = localStorage.getItem(CHAINS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  }
  return [];
}

async function saveChains(chains: RequestChain[]): Promise<void> {
  try {
    const { appDataDir } = await import('@tauri-apps/api/path');
    const { writeTextFile, mkdir } = await import('@tauri-apps/plugin-fs');

    const basePath = await appDataDir();
    await mkdir(basePath, { recursive: true });
    const filePath = `${basePath}${CHAINS_KEY}.json`;

    await writeTextFile(filePath, JSON.stringify(chains, null, 2));
  } catch (error) {
    console.warn('Failed to save chains to file, using localStorage fallback:', error);
    localStorage.setItem(CHAINS_KEY, JSON.stringify(chains));
  }
}

export interface ChainExecutionResult {
  requestId: string;
  response: ApiResponse;
  extractedVariables: Record<string, string>;
  error?: string;
}

export interface ChainExecutionState {
  isRunning: boolean;
  currentRequestIndex: number;
  results: ChainExecutionResult[];
  chainVariables: Record<string, string>;
}

export function useRequestChains() {
  const queryClient = useQueryClient();
  const { interpolateVariables } = useEnvironments();

  const [executionState, setExecutionState] = useState<ChainExecutionState>({
    isRunning: false,
    currentRequestIndex: -1,
    results: [],
    chainVariables: {},
  });

  const { data: chains = [] } = useQuery({
    queryKey: [CHAINS_KEY],
    queryFn: loadChains,
    initialData: [],
  });

  const createChain = useMutation({
    mutationFn: async (name: string) => {
      const newChain: RequestChain = {
        id: uuidv4(),
        name,
        requests: [],
      };
      const updated = [...chains, newChain];
      await saveChains(updated);
      return updated;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData([CHAINS_KEY], updated);
    },
  });

  const updateChain = useMutation({
    mutationFn: async (chain: RequestChain) => {
      const updated = chains.map((c) => (c.id === chain.id ? chain : c));
      await saveChains(updated);
      return updated;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData([CHAINS_KEY], updated);
    },
  });

  const deleteChain = useMutation({
    mutationFn: async (chainId: string) => {
      const updated = chains.filter((c) => c.id !== chainId);
      await saveChains(updated);
      return updated;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData([CHAINS_KEY], updated);
    },
  });

  const addRequestToChain = useMutation({
    mutationFn: async ({
      chainId,
      request,
    }: {
      chainId: string;
      request: Omit<ChainedRequest, 'id'>;
    }) => {
      const updated = chains.map((chain) => {
        if (chain.id === chainId) {
          return {
            ...chain,
            requests: [...chain.requests, { ...request, id: uuidv4() }],
          };
        }
        return chain;
      });
      await saveChains(updated);
      return updated;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData([CHAINS_KEY], updated);
    },
  });

  const updateChainRequest = useMutation({
    mutationFn: async ({
      chainId,
      request,
    }: {
      chainId: string;
      request: ChainedRequest;
    }) => {
      const updated = chains.map((chain) => {
        if (chain.id === chainId) {
          return {
            ...chain,
            requests: chain.requests.map((r) =>
              r.id === request.id ? request : r
            ),
          };
        }
        return chain;
      });
      await saveChains(updated);
      return updated;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData([CHAINS_KEY], updated);
    },
  });

  const removeRequestFromChain = useMutation({
    mutationFn: async ({
      chainId,
      requestId,
    }: {
      chainId: string;
      requestId: string;
    }) => {
      const updated = chains.map((chain) => {
        if (chain.id === chainId) {
          return {
            ...chain,
            requests: chain.requests.filter((r) => r.id !== requestId),
          };
        }
        return chain;
      });
      await saveChains(updated);
      return updated;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData([CHAINS_KEY], updated);
    },
  });

  // Extract value from response using extractor configuration
  const extractValue = useCallback(
    (response: ApiResponse, extractor: ResponseExtractor): string => {
      try {
        if (extractor.source === 'header') {
          return response.headers[extractor.path] || '';
        }

        // JSONPath-like extraction for body
        const body = response.body;
        if (!body || typeof body !== 'object') {
          return String(body || '');
        }

        const pathParts = extractor.path.split('.');
        let value: unknown = body;

        for (const part of pathParts) {
          if (value && typeof value === 'object') {
            // Handle array access like "items[0]"
            const arrayMatch = part.match(/^(\w+)\[(\d+)\]$/);
            if (arrayMatch) {
              const [, key, index] = arrayMatch;
              value = (value as Record<string, unknown>)[key];
              if (Array.isArray(value)) {
                value = value[parseInt(index, 10)];
              }
            } else {
              value = (value as Record<string, unknown>)[part];
            }
          } else {
            return '';
          }
        }

        return String(value ?? '');
      } catch {
        return '';
      }
    },
    []
  );

  // Interpolate chain variables in text
  const interpolateChainVariables = useCallback(
    (text: string, chainVars: Record<string, string>): string => {
      // First apply environment variables
      let result = interpolateVariables(text);

      // Then apply chain variables
      result = result.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
        return chainVars[varName] ?? match;
      });

      return result;
    },
    [interpolateVariables]
  );

  // Execute a request chain
  const runChain = useCallback(
    async (
      chain: RequestChain,
      requestConfigs: Map<string, RequestConfig>
    ): Promise<ChainExecutionResult[]> => {
      setExecutionState({
        isRunning: true,
        currentRequestIndex: 0,
        results: [],
        chainVariables: {},
      });

      const results: ChainExecutionResult[] = [];
      const chainVariables: Record<string, string> = {};

      for (let i = 0; i < chain.requests.length; i++) {
        const chainedRequest = chain.requests[i];

        setExecutionState((prev) => ({
          ...prev,
          currentRequestIndex: i,
        }));

        // Get the request config
        const baseConfig = requestConfigs.get(chainedRequest.requestId);
        if (!baseConfig) {
          results.push({
            requestId: chainedRequest.id,
            response: {
              status: 0,
              statusText: 'Error',
              headers: {},
              body: null,
              elapsedTime: 0,
              size: 0,
            },
            extractedVariables: {},
            error: 'Request configuration not found',
          });
          continue;
        }

        // Interpolate variables in the request
        const interpolatedConfig: RequestConfig = {
          ...baseConfig,
          url: interpolateChainVariables(baseConfig.url, chainVariables),
          body: baseConfig.body
            ? typeof baseConfig.body === 'string'
              ? interpolateChainVariables(baseConfig.body, chainVariables)
              : JSON.parse(
                  interpolateChainVariables(
                    JSON.stringify(baseConfig.body),
                    chainVariables
                  )
                )
            : undefined,
          headers: baseConfig.headers
            ? Object.fromEntries(
                Object.entries(baseConfig.headers).map(([k, v]) => [
                  k,
                  interpolateChainVariables(v, chainVariables),
                ])
              )
            : undefined,
        };

        try {
          const response = await sendRequest(interpolatedConfig);

          // Extract variables from response
          const extractedVariables: Record<string, string> = {};
          for (const extractor of chainedRequest.extractors) {
            const value = extractValue(response, extractor);
            extractedVariables[extractor.variableName] = value;
            chainVariables[extractor.variableName] = value;
          }

          results.push({
            requestId: chainedRequest.id,
            response,
            extractedVariables,
          });

          setExecutionState((prev) => ({
            ...prev,
            results: [...results],
            chainVariables: { ...chainVariables },
          }));
        } catch (error) {
          results.push({
            requestId: chainedRequest.id,
            response: {
              status: 0,
              statusText: 'Error',
              headers: {},
              body: null,
              elapsedTime: 0,
              size: 0,
            },
            extractedVariables: {},
            error: error instanceof Error ? error.message : 'Unknown error',
          });

          // Stop chain execution on error
          break;
        }
      }

      setExecutionState((prev) => ({
        ...prev,
        isRunning: false,
        currentRequestIndex: -1,
      }));

      return results;
    },
    [extractValue, interpolateChainVariables]
  );

  const clearExecutionState = useCallback(() => {
    setExecutionState({
      isRunning: false,
      currentRequestIndex: -1,
      results: [],
      chainVariables: {},
    });
  }, []);

  return {
    chains,
    executionState,
    createChain,
    updateChain,
    deleteChain,
    addRequestToChain,
    updateChainRequest,
    removeRequestFromChain,
    runChain,
    clearExecutionState,
  };
}
