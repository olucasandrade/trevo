import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Environment, EnvironmentVariable } from '@trevo/core';
import { v4 as uuidv4 } from 'uuid';

const ENVIRONMENTS_KEY = 'environments';

// Storage functions using Tauri fs with localStorage fallback
async function loadEnvironments(): Promise<Environment[]> {
  try {
    const { appDataDir } = await import('@tauri-apps/api/path');
    const { readTextFile, exists } = await import('@tauri-apps/plugin-fs');

    const basePath = await appDataDir();
    const filePath = `${basePath}${ENVIRONMENTS_KEY}.json`;

    if (await exists(filePath)) {
      const content = await readTextFile(filePath);
      return JSON.parse(content);
    }
  } catch (error) {
    console.warn('Failed to load environments from file, using localStorage fallback:', error);
    const stored = localStorage.getItem(ENVIRONMENTS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  }
  return [];
}

async function saveEnvironments(environments: Environment[]): Promise<void> {
  try {
    const { appDataDir } = await import('@tauri-apps/api/path');
    const { writeTextFile, mkdir } = await import('@tauri-apps/plugin-fs');

    const basePath = await appDataDir();
    await mkdir(basePath, { recursive: true });
    const filePath = `${basePath}${ENVIRONMENTS_KEY}.json`;

    await writeTextFile(filePath, JSON.stringify(environments, null, 2));
  } catch (error) {
    console.warn('Failed to save environments to file, using localStorage fallback:', error);
    localStorage.setItem(ENVIRONMENTS_KEY, JSON.stringify(environments));
  }
}

export function useEnvironments() {
  const queryClient = useQueryClient();

  const { data: environments = [] } = useQuery({
    queryKey: [ENVIRONMENTS_KEY],
    queryFn: loadEnvironments,
    initialData: [],
  });

  const activeEnvironment = environments.find((env) => env.isActive);

  const createEnvironment = useMutation({
    mutationFn: async (name: string) => {
      const newEnv: Environment = {
        id: uuidv4(),
        name,
        variables: [],
        isActive: environments.length === 0, // First env is active by default
      };
      const updated = [...environments, newEnv];
      await saveEnvironments(updated);
      return updated;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData([ENVIRONMENTS_KEY], updated);
    },
  });

  const updateEnvironment = useMutation({
    mutationFn: async (env: Environment) => {
      const updated = environments.map((e) => (e.id === env.id ? env : e));
      await saveEnvironments(updated);
      return updated;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData([ENVIRONMENTS_KEY], updated);
    },
  });

  const deleteEnvironment = useMutation({
    mutationFn: async (envId: string) => {
      const updated = environments.filter((e) => e.id !== envId);
      // If we deleted the active environment, activate the first one
      if (updated.length > 0 && !updated.some((e) => e.isActive)) {
        updated[0].isActive = true;
      }
      await saveEnvironments(updated);
      return updated;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData([ENVIRONMENTS_KEY], updated);
    },
  });

  const setActiveEnvironment = useMutation({
    mutationFn: async (envId: string) => {
      const updated = environments.map((env) => ({
        ...env,
        isActive: env.id === envId,
      }));
      await saveEnvironments(updated);
      return updated;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData([ENVIRONMENTS_KEY], updated);
    },
  });

  const addVariable = useMutation({
    mutationFn: async ({ envId, variable }: { envId: string; variable: Omit<EnvironmentVariable, 'id'> }) => {
      const updated = environments.map((env) => {
        if (env.id === envId) {
          return {
            ...env,
            variables: [...env.variables, { ...variable, id: uuidv4() }],
          };
        }
        return env;
      });
      await saveEnvironments(updated);
      return updated;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData([ENVIRONMENTS_KEY], updated);
    },
  });

  const updateVariable = useMutation({
    mutationFn: async ({ envId, variable }: { envId: string; variable: EnvironmentVariable }) => {
      const updated = environments.map((env) => {
        if (env.id === envId) {
          return {
            ...env,
            variables: env.variables.map((v) => (v.id === variable.id ? variable : v)),
          };
        }
        return env;
      });
      await saveEnvironments(updated);
      return updated;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData([ENVIRONMENTS_KEY], updated);
    },
  });

  const deleteVariable = useMutation({
    mutationFn: async ({ envId, variableId }: { envId: string; variableId: string }) => {
      const updated = environments.map((env) => {
        if (env.id === envId) {
          return {
            ...env,
            variables: env.variables.filter((v) => v.id !== variableId),
          };
        }
        return env;
      });
      await saveEnvironments(updated);
      return updated;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData([ENVIRONMENTS_KEY], updated);
    },
  });

  // Interpolate variables in a string (e.g., "https://{{baseUrl}}/api/{{version}}")
  const interpolateVariables = (text: string): string => {
    if (!activeEnvironment) return text;

    return text.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
      const variable = activeEnvironment.variables.find(
        (v) => v.key === varName && v.enabled
      );
      return variable ? variable.value : match;
    });
  };

  // Get all variable names for autocomplete
  const getVariableNames = (): string[] => {
    if (!activeEnvironment) return [];
    return activeEnvironment.variables
      .filter((v) => v.enabled)
      .map((v) => v.key);
  };

  return {
    environments,
    activeEnvironment,
    createEnvironment,
    updateEnvironment,
    deleteEnvironment,
    setActiveEnvironment,
    addVariable,
    updateVariable,
    deleteVariable,
    interpolateVariables,
    getVariableNames,
  };
}
