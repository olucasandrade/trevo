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
  Card,
  Badge,
  Modal,
  Divider,
  Progress,
  Code,
  Collapse,
  Box,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconPlus,
  IconTrash,
  IconPlayerPlay,
  IconLink,
  IconChevronDown,
  IconChevronRight,
  IconCheck,
  IconX,
  IconArrowRight,
} from '@tabler/icons-react';
import { toast } from 'react-toastify';
import type { ChainedRequest, ResponseExtractor, RequestConfig } from '@trevo/core';
import { useRequestChains } from '../hooks/useRequestChains';
import { useRequestHistory } from '../hooks/useRequestHistory';

interface ChainRequestCardProps {
  chainedRequest: ChainedRequest;
  index: number;
  requestConfig?: RequestConfig;
  onRemove: () => void;
  onUpdate: (updated: ChainedRequest) => void;
  executionResult?: {
    response: { status: number; statusText: string };
    extractedVariables: Record<string, string>;
    error?: string;
  };
  isCurrentlyExecuting: boolean;
}

function ChainRequestCard({
  chainedRequest,
  index,
  requestConfig,
  onRemove,
  onUpdate,
  executionResult,
  isCurrentlyExecuting,
}: ChainRequestCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [newExtractorPath, setNewExtractorPath] = useState('');
  const [newExtractorVar, setNewExtractorVar] = useState('');
  const [newExtractorSource, setNewExtractorSource] = useState<'body' | 'header'>('body');

  const handleAddExtractor = () => {
    if (!newExtractorPath.trim() || !newExtractorVar.trim()) {
      toast.error('Path and variable name are required');
      return;
    }

    const newExtractor: ResponseExtractor = {
      id: crypto.randomUUID(),
      variableName: newExtractorVar.trim(),
      source: newExtractorSource,
      path: newExtractorPath.trim(),
    };

    onUpdate({
      ...chainedRequest,
      extractors: [...chainedRequest.extractors, newExtractor],
    });

    setNewExtractorPath('');
    setNewExtractorVar('');
  };

  const handleRemoveExtractor = (extractorId: string) => {
    onUpdate({
      ...chainedRequest,
      extractors: chainedRequest.extractors.filter((e) => e.id !== extractorId),
    });
  };

  const getStatusColor = () => {
    if (isCurrentlyExecuting) return 'blue';
    if (!executionResult) return 'gray';
    if (executionResult.error) return 'red';
    if (executionResult.response.status >= 200 && executionResult.response.status < 300) return 'green';
    return 'red';
  };

  return (
    <Card withBorder p="sm">
      <Stack gap="xs">
        <Group justify="space-between">
          <Group gap="xs">
            <Badge size="sm" variant="light" color="gray">
              {index + 1}
            </Badge>
            {requestConfig && (
              <>
                <Badge
                  size="sm"
                  color={
                    requestConfig.method === 'GET'
                      ? 'green'
                      : requestConfig.method === 'POST'
                        ? 'blue'
                        : requestConfig.method === 'PUT'
                          ? 'orange'
                          : requestConfig.method === 'DELETE'
                            ? 'red'
                            : 'gray'
                  }
                >
                  {requestConfig.method}
                </Badge>
                <Text size="sm" lineClamp={1} style={{ maxWidth: 200 }}>
                  {requestConfig.url}
                </Text>
              </>
            )}
            {!requestConfig && (
              <Text size="sm" c="dimmed">
                Request not found
              </Text>
            )}
          </Group>
          <Group gap="xs">
            {executionResult && (
              <Badge
                size="sm"
                color={getStatusColor()}
                leftSection={
                  executionResult.error ? (
                    <IconX size={12} />
                  ) : (
                    <IconCheck size={12} />
                  )
                }
              >
                {executionResult.error
                  ? 'Error'
                  : `${executionResult.response.status} ${executionResult.response.statusText}`}
              </Badge>
            )}
            {isCurrentlyExecuting && (
              <Badge size="sm" color="blue" variant="dot">
                Running...
              </Badge>
            )}
            <ActionIcon
              size="sm"
              variant="subtle"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <IconChevronDown size={14} /> : <IconChevronRight size={14} />}
            </ActionIcon>
            <ActionIcon
              size="sm"
              color="red"
              variant="subtle"
              onClick={onRemove}
            >
              <IconTrash size={14} />
            </ActionIcon>
          </Group>
        </Group>

        <Collapse in={expanded}>
          <Stack gap="xs" mt="xs">
            <Divider label="Variable Extractors" labelPosition="left" />

            {chainedRequest.extractors.length > 0 ? (
              chainedRequest.extractors.map((extractor) => (
                <Group key={extractor.id} gap="xs">
                  <Badge size="xs" variant="light">
                    {extractor.source}
                  </Badge>
                  <Code>{extractor.path}</Code>
                  <IconArrowRight size={14} />
                  <Code color="blue">{`{{${extractor.variableName}}}`}</Code>
                  {executionResult?.extractedVariables[extractor.variableName] && (
                    <Text size="xs" c="dimmed">
                      = {executionResult.extractedVariables[extractor.variableName]}
                    </Text>
                  )}
                  <ActionIcon
                    size="xs"
                    color="red"
                    variant="subtle"
                    onClick={() => handleRemoveExtractor(extractor.id)}
                  >
                    <IconTrash size={12} />
                  </ActionIcon>
                </Group>
              ))
            ) : (
              <Text size="xs" c="dimmed">
                No extractors configured
              </Text>
            )}

            <Group gap="xs" mt="xs">
              <Select
                size="xs"
                value={newExtractorSource}
                onChange={(v) => setNewExtractorSource(v as 'body' | 'header')}
                data={[
                  { value: 'body', label: 'Body' },
                  { value: 'header', label: 'Header' },
                ]}
                style={{ width: 80 }}
              />
              <TextInput
                size="xs"
                placeholder={newExtractorSource === 'body' ? 'data.token' : 'Authorization'}
                value={newExtractorPath}
                onChange={(e) => setNewExtractorPath(e.target.value)}
                style={{ flex: 1 }}
              />
              <TextInput
                size="xs"
                placeholder="variableName"
                value={newExtractorVar}
                onChange={(e) => setNewExtractorVar(e.target.value)}
                style={{ width: 120 }}
              />
              <Button size="xs" onClick={handleAddExtractor}>
                Add
              </Button>
            </Group>
          </Stack>
        </Collapse>
      </Stack>
    </Card>
  );
}

export function ChainPanel() {
  const {
    chains,
    executionState,
    createChain,
    deleteChain,
    addRequestToChain,
    updateChainRequest,
    removeRequestFromChain,
    runChain,
    clearExecutionState,
  } = useRequestChains();

  const { history } = useRequestHistory();

  const [selectedChainId, setSelectedChainId] = useState<string | null>(null);
  const [newChainName, setNewChainName] = useState('');
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);
  const [createModalOpened, { open: openCreateModal, close: closeCreateModal }] = useDisclosure(false);

  const selectedChain = chains.find((c) => c.id === selectedChainId);

  // Build request config map from history
  const requestConfigs = new Map<string, RequestConfig>();
  history.forEach((item) => {
    requestConfigs.set(item.id, item.config);
  });

  const handleCreateChain = () => {
    if (!newChainName.trim()) {
      toast.error('Chain name is required');
      return;
    }
    createChain.mutate(newChainName.trim(), {
      onSuccess: (updated) => {
        const newChain = updated[updated.length - 1];
        setSelectedChainId(newChain.id);
      },
    });
    setNewChainName('');
    closeCreateModal();
    toast.success('Chain created');
  };

  const handleAddRequest = () => {
    if (!selectedChain || !selectedHistoryId) return;

    addRequestToChain.mutate({
      chainId: selectedChain.id,
      request: {
        requestId: selectedHistoryId,
        extractors: [],
      },
    });
    setSelectedHistoryId(null);
    toast.success('Request added to chain');
  };

  const handleRunChain = async () => {
    if (!selectedChain) return;

    clearExecutionState();
    toast.info(`Running chain: ${selectedChain.name}`);

    try {
      const results = await runChain(selectedChain, requestConfigs);
      const failed = results.some((r) => r.error);
      if (failed) {
        toast.error('Chain execution failed');
      } else {
        toast.success('Chain completed successfully');
      }
    } catch (error) {
      toast.error('Chain execution error');
    }
  };

  const chainSelectData = chains.map((chain) => ({
    value: chain.id,
    label: chain.name,
  }));

  const historySelectData = history.map((item) => ({
    value: item.id,
    label: `${item.method} ${item.url}`,
  }));

  const progress =
    executionState.isRunning && selectedChain
      ? ((executionState.currentRequestIndex + 1) / selectedChain.requests.length) * 100
      : 0;

  return (
    <Paper p="md" h="100%">
      <Stack gap="md">
        {/* Header */}
        <Group justify="space-between">
          <Group gap="xs">
            <IconLink size={20} />
            <Text fw={500}>Request Chains</Text>
          </Group>
          <Button
            size="xs"
            leftSection={<IconPlus size={14} />}
            onClick={openCreateModal}
          >
            New Chain
          </Button>
        </Group>

        {/* Chain Selector */}
        {chains.length > 0 ? (
          <Group gap="xs">
            <Select
              placeholder="Select chain"
              data={chainSelectData}
              value={selectedChainId}
              onChange={setSelectedChainId}
              style={{ flex: 1 }}
              size="sm"
            />
            {selectedChain && (
              <>
                <Button
                  size="sm"
                  leftSection={<IconPlayerPlay size={14} />}
                  onClick={handleRunChain}
                  loading={executionState.isRunning}
                  disabled={selectedChain.requests.length === 0}
                >
                  Run
                </Button>
                <ActionIcon
                  color="red"
                  variant="subtle"
                  onClick={() => {
                    deleteChain.mutate(selectedChain.id);
                    setSelectedChainId(null);
                    toast.success('Chain deleted');
                  }}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </>
            )}
          </Group>
        ) : (
          <Text c="dimmed" ta="center" py="xl">
            No chains yet. Create one to link requests together.
          </Text>
        )}

        {/* Execution Progress */}
        {executionState.isRunning && (
          <Box>
            <Progress value={progress} size="sm" animated />
            <Text size="xs" c="dimmed" mt="xs">
              Running request {executionState.currentRequestIndex + 1} of{' '}
              {selectedChain?.requests.length}
            </Text>
          </Box>
        )}

        {/* Chain Variables */}
        {Object.keys(executionState.chainVariables).length > 0 && (
          <Box>
            <Text size="sm" fw={500} mb="xs">
              Chain Variables
            </Text>
            <Group gap="xs">
              {Object.entries(executionState.chainVariables).map(([key, value]) => (
                <Badge key={key} size="sm" variant="outline">
                  {key}: {value.substring(0, 20)}
                  {value.length > 20 ? '...' : ''}
                </Badge>
              ))}
            </Group>
          </Box>
        )}

        {/* Chain Requests */}
        {selectedChain && (
          <>
            <Divider label="Chain Steps" labelPosition="left" />

            {selectedChain.requests.length > 0 ? (
              <Stack gap="xs">
                {selectedChain.requests.map((chainedRequest, index) => {
                  const historyItem = history.find(
                    (h) => h.id === chainedRequest.requestId
                  );
                  const result = executionState.results.find(
                    (r) => r.requestId === chainedRequest.id
                  );

                  return (
                    <ChainRequestCard
                      key={chainedRequest.id}
                      chainedRequest={chainedRequest}
                      index={index}
                      requestConfig={historyItem?.config}
                      onRemove={() =>
                        removeRequestFromChain.mutate({
                          chainId: selectedChain.id,
                          requestId: chainedRequest.id,
                        })
                      }
                      onUpdate={(updated) =>
                        updateChainRequest.mutate({
                          chainId: selectedChain.id,
                          request: updated,
                        })
                      }
                      executionResult={result}
                      isCurrentlyExecuting={
                        executionState.isRunning &&
                        executionState.currentRequestIndex === index
                      }
                    />
                  );
                })}
              </Stack>
            ) : (
              <Text c="dimmed" ta="center" py="md" size="sm">
                No requests in this chain. Add requests from your history.
              </Text>
            )}

            {/* Add Request to Chain */}
            <Group gap="xs">
              <Select
                placeholder="Select request from history"
                data={historySelectData}
                value={selectedHistoryId}
                onChange={setSelectedHistoryId}
                style={{ flex: 1 }}
                size="sm"
                searchable
              />
              <Button
                size="sm"
                onClick={handleAddRequest}
                disabled={!selectedHistoryId}
              >
                Add Step
              </Button>
            </Group>
          </>
        )}
      </Stack>

      {/* Create Chain Modal */}
      <Modal
        opened={createModalOpened}
        onClose={closeCreateModal}
        title="Create Request Chain"
        size="sm"
      >
        <Stack gap="md">
          <TextInput
            label="Chain name"
            placeholder="e.g., Login Flow, API Test Suite"
            value={newChainName}
            onChange={(e) => setNewChainName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreateChain()}
          />
          <Group justify="flex-end">
            <Button variant="subtle" onClick={closeCreateModal}>
              Cancel
            </Button>
            <Button onClick={handleCreateChain}>Create</Button>
          </Group>
        </Stack>
      </Modal>
    </Paper>
  );
}
