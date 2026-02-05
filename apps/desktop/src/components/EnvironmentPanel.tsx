import { useState } from 'react';
import {
  Paper,
  Stack,
  Group,
  Text,
  TextInput,
  Button,
  ActionIcon,
  Select,
  Table,
  Checkbox,
  Menu,
  Modal,
  Badge,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconPlus,
  IconTrash,
  IconEdit,
  IconDotsVertical,
  IconWorld,
} from '@tabler/icons-react';
import { toast } from 'react-toastify';
import type { Environment, EnvironmentVariable } from '@trevo/core';
import { useEnvironments } from '../hooks/useEnvironments';

export function EnvironmentPanel() {
  const {
    environments,
    activeEnvironment,
    createEnvironment,
    updateEnvironment,
    deleteEnvironment,
    setActiveEnvironment,
    addVariable,
    updateVariable,
    deleteVariable,
  } = useEnvironments();

  const [newEnvName, setNewEnvName] = useState('');
  const [editingEnv, setEditingEnv] = useState<Environment | null>(null);
  const [newVarKey, setNewVarKey] = useState('');
  const [newVarValue, setNewVarValue] = useState('');
  const [createModalOpened, { open: openCreateModal, close: closeCreateModal }] = useDisclosure(false);

  const handleCreateEnvironment = () => {
    if (!newEnvName.trim()) {
      toast.error('Environment name is required');
      return;
    }
    createEnvironment.mutate(newEnvName.trim());
    setNewEnvName('');
    closeCreateModal();
    toast.success('Environment created');
  };

  const handleAddVariable = () => {
    if (!activeEnvironment) return;
    if (!newVarKey.trim()) {
      toast.error('Variable name is required');
      return;
    }
    addVariable.mutate({
      envId: activeEnvironment.id,
      variable: {
        key: newVarKey.trim(),
        value: newVarValue,
        enabled: true,
      },
    });
    setNewVarKey('');
    setNewVarValue('');
    toast.success('Variable added');
  };

  const handleToggleVariable = (variable: EnvironmentVariable) => {
    if (!activeEnvironment) return;
    updateVariable.mutate({
      envId: activeEnvironment.id,
      variable: { ...variable, enabled: !variable.enabled },
    });
  };

  const handleDeleteVariable = (variableId: string) => {
    if (!activeEnvironment) return;
    deleteVariable.mutate({
      envId: activeEnvironment.id,
      variableId,
    });
    toast.success('Variable deleted');
  };

  const handleDeleteEnvironment = (envId: string) => {
    deleteEnvironment.mutate(envId);
    toast.success('Environment deleted');
  };

  const envSelectData = environments.map((env) => ({
    value: env.id,
    label: env.name,
  }));

  return (
    <Paper p="md" h="100%">
      <Stack gap="md">
        {/* Header */}
        <Group justify="space-between">
          <Group gap="xs">
            <IconWorld size={20} />
            <Text fw={500}>Environments</Text>
          </Group>
          <Button
            size="xs"
            leftSection={<IconPlus size={14} />}
            onClick={openCreateModal}
          >
            New
          </Button>
        </Group>

        {/* Environment Selector */}
        {environments.length > 0 ? (
          <Group gap="xs">
            <Select
              placeholder="Select environment"
              data={envSelectData}
              value={activeEnvironment?.id || null}
              onChange={(value) => value && setActiveEnvironment.mutate(value)}
              style={{ flex: 1 }}
              size="sm"
            />
            {activeEnvironment && (
              <Menu position="bottom-end" shadow="md">
                <Menu.Target>
                  <ActionIcon variant="subtle">
                    <IconDotsVertical size={16} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<IconEdit size={14} />}
                    onClick={() => setEditingEnv(activeEnvironment)}
                  >
                    Rename
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    leftSection={<IconTrash size={14} />}
                    onClick={() => handleDeleteEnvironment(activeEnvironment.id)}
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>
        ) : (
          <Text c="dimmed" ta="center" py="xl">
            No environments yet. Create one to get started.
          </Text>
        )}

        {/* Variables Table */}
        {activeEnvironment && (
          <>
            <Text size="sm" fw={500}>
              Variables
              <Badge ml="xs" size="xs" variant="light">
                {activeEnvironment.variables.length}
              </Badge>
            </Text>

            {activeEnvironment.variables.length > 0 ? (
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th w={40}></Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Value</Table.Th>
                    <Table.Th w={40}></Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {activeEnvironment.variables.map((variable) => (
                    <Table.Tr
                      key={variable.id}
                      style={{ opacity: variable.enabled ? 1 : 0.5 }}
                    >
                      <Table.Td>
                        <Checkbox
                          checked={variable.enabled}
                          onChange={() => handleToggleVariable(variable)}
                          size="xs"
                        />
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" ff="monospace">
                          {`{{${variable.key}}}`}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" c="dimmed" lineClamp={1}>
                          {variable.value}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <ActionIcon
                          size="sm"
                          color="red"
                          variant="subtle"
                          onClick={() => handleDeleteVariable(variable.id)}
                        >
                          <IconTrash size={14} />
                        </ActionIcon>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            ) : (
              <Text c="dimmed" ta="center" py="md" size="sm">
                No variables in this environment
              </Text>
            )}

            {/* Add Variable Form */}
            <Group gap="xs">
              <TextInput
                placeholder="Variable name"
                value={newVarKey}
                onChange={(e) => setNewVarKey(e.target.value)}
                size="xs"
                style={{ flex: 1 }}
              />
              <TextInput
                placeholder="Value"
                value={newVarValue}
                onChange={(e) => setNewVarValue(e.target.value)}
                size="xs"
                style={{ flex: 1 }}
              />
              <Button size="xs" onClick={handleAddVariable}>
                Add
              </Button>
            </Group>

            <Text size="xs" c="dimmed">
              Use variables in requests with {`{{variableName}}`} syntax
            </Text>
          </>
        )}
      </Stack>

      {/* Create Environment Modal */}
      <Modal
        opened={createModalOpened}
        onClose={closeCreateModal}
        title="Create Environment"
        size="sm"
      >
        <Stack gap="md">
          <TextInput
            label="Environment name"
            placeholder="e.g., Development, Staging, Production"
            value={newEnvName}
            onChange={(e) => setNewEnvName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreateEnvironment()}
          />
          <Group justify="flex-end">
            <Button variant="subtle" onClick={closeCreateModal}>
              Cancel
            </Button>
            <Button onClick={handleCreateEnvironment}>Create</Button>
          </Group>
        </Stack>
      </Modal>

      {/* Rename Environment Modal */}
      <Modal
        opened={!!editingEnv}
        onClose={() => setEditingEnv(null)}
        title="Rename Environment"
        size="sm"
      >
        {editingEnv && (
          <Stack gap="md">
            <TextInput
              label="Environment name"
              value={editingEnv.name}
              onChange={(e) =>
                setEditingEnv({ ...editingEnv, name: e.target.value })
              }
            />
            <Group justify="flex-end">
              <Button variant="subtle" onClick={() => setEditingEnv(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  updateEnvironment.mutate(editingEnv);
                  setEditingEnv(null);
                  toast.success('Environment renamed');
                }}
              >
                Save
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </Paper>
  );
}
