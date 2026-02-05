import { useState, useEffect } from 'react';
import {
  Paper,
  TextInput,
  Select,
  Button,
  Tabs,
  Group,
  Stack,
  ActionIcon,
  Text,
  Textarea,
  SegmentedControl,
} from '@mantine/core';
import { IconSend, IconPlus, IconTrash } from '@tabler/icons-react';
import { toast } from 'react-toastify';
import type { ApiResponse, HistoryItem, KeyValuePair } from '@trevo/core';
import { validateRequest } from '@trevo/core';
import { sendRequest } from '../services/apiService';
import { useRequestHistory } from '../hooks/useRequestHistory';

interface RequestPanelProps {
  onResponse: (response: ApiResponse) => void;
  selectedRequest: HistoryItem | null;
}

const HTTP_METHODS = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'PUT', label: 'PUT' },
  { value: 'DELETE', label: 'DELETE' },
  { value: 'PATCH', label: 'PATCH' },
  { value: 'HEAD', label: 'HEAD' },
  { value: 'OPTIONS', label: 'OPTIONS' },
];

export function RequestPanel({ onResponse, selectedRequest }: RequestPanelProps) {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState<KeyValuePair[]>([{ key: '', value: '' }]);
  const [params, setParams] = useState<KeyValuePair[]>([{ key: '', value: '' }]);
  const [body, setBody] = useState('');
  const [bodyType, setBodyType] = useState<'none' | 'json' | 'form'>('none');
  const [loading, setLoading] = useState(false);

  const { addToHistory } = useRequestHistory();

  // Load selected request
  useEffect(() => {
    if (selectedRequest) {
      setUrl(selectedRequest.url);
      setMethod(selectedRequest.method);
      if (selectedRequest.config.headers) {
        const headerPairs = Object.entries(selectedRequest.config.headers).map(
          ([key, value]) => ({ key, value })
        );
        setHeaders(headerPairs.length > 0 ? headerPairs : [{ key: '', value: '' }]);
      }
      if (selectedRequest.config.params) {
        const paramPairs = Object.entries(selectedRequest.config.params).map(
          ([key, value]) => ({ key, value })
        );
        setParams(paramPairs.length > 0 ? paramPairs : [{ key: '', value: '' }]);
      }
      if (selectedRequest.config.body) {
        setBody(
          typeof selectedRequest.config.body === 'string'
            ? selectedRequest.config.body
            : JSON.stringify(selectedRequest.config.body, null, 2)
        );
        setBodyType((selectedRequest.config.bodyType as 'none' | 'json' | 'form') || 'json');
      }
    }
  }, [selectedRequest]);

  const handleSend = async () => {
    const validation = validateRequest(url, bodyType, body, headers, params);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    setLoading(true);

    const headersObj = headers
      .filter((h) => h.key && h.value)
      .reduce((acc, h) => ({ ...acc, [h.key]: h.value }), {} as Record<string, string>);

    const paramsObj = params
      .filter((p) => p.key && p.value)
      .reduce((acc, p) => ({ ...acc, [p.key]: p.value }), {} as Record<string, string>);

    const config = {
      method,
      url,
      headers: headersObj,
      params: paramsObj,
      body: bodyType !== 'none' ? body : undefined,
      bodyType,
    };

    try {
      const response = await sendRequest(config);
      onResponse(response);

      // Add to history
      addToHistory.mutate({
        method,
        url,
        config,
        response,
      });

      toast.success(`${response.status} ${response.statusText}`);
    } catch (error) {
      toast.error(`Request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const addKeyValuePair = (
    setter: React.Dispatch<React.SetStateAction<KeyValuePair[]>>
  ) => {
    setter((prev) => [...prev, { key: '', value: '' }]);
  };

  const removeKeyValuePair = (
    setter: React.Dispatch<React.SetStateAction<KeyValuePair[]>>,
    index: number
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const updateKeyValuePair = (
    setter: React.Dispatch<React.SetStateAction<KeyValuePair[]>>,
    index: number,
    field: 'key' | 'value',
    value: string
  ) => {
    setter((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const renderKeyValuePairs = (
    pairs: KeyValuePair[],
    setter: React.Dispatch<React.SetStateAction<KeyValuePair[]>>,
    keyPlaceholder: string,
    valuePlaceholder: string
  ) => (
    <Stack gap="xs">
      {pairs.map((pair, index) => (
        <Group key={index} gap="xs">
          <TextInput
            placeholder={keyPlaceholder}
            value={pair.key}
            onChange={(e) => updateKeyValuePair(setter, index, 'key', e.target.value)}
            style={{ flex: 1 }}
            size="sm"
          />
          <TextInput
            placeholder={valuePlaceholder}
            value={pair.value}
            onChange={(e) => updateKeyValuePair(setter, index, 'value', e.target.value)}
            style={{ flex: 1 }}
            size="sm"
          />
          <ActionIcon
            color="red"
            variant="subtle"
            onClick={() => removeKeyValuePair(setter, index)}
            disabled={pairs.length === 1}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      ))}
      <Button
        variant="subtle"
        size="xs"
        leftSection={<IconPlus size={14} />}
        onClick={() => addKeyValuePair(setter)}
      >
        Add
      </Button>
    </Stack>
  );

  return (
    <Paper p="md" h="100%" style={{ display: 'flex', flexDirection: 'column' }}>
      <Stack gap="md" style={{ flex: 1 }}>
        {/* URL Bar */}
        <Group gap="xs">
          <Select
            data={HTTP_METHODS}
            value={method}
            onChange={(value) => setMethod(value || 'GET')}
            style={{ width: 120 }}
            size="sm"
          />
          <TextInput
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ flex: 1 }}
            size="sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !loading) {
                handleSend();
              }
            }}
          />
          <Button
            onClick={handleSend}
            loading={loading}
            leftSection={!loading && <IconSend size={16} />}
            size="sm"
          >
            Send
          </Button>
        </Group>

        {/* Tabs */}
        <Tabs defaultValue="params" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Tabs.List>
            <Tabs.Tab value="params">Params</Tabs.Tab>
            <Tabs.Tab value="headers">Headers</Tabs.Tab>
            <Tabs.Tab value="body">Body</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="params" pt="md" style={{ flex: 1, overflow: 'auto' }}>
            {renderKeyValuePairs(params, setParams, 'Key', 'Value')}
          </Tabs.Panel>

          <Tabs.Panel value="headers" pt="md" style={{ flex: 1, overflow: 'auto' }}>
            {renderKeyValuePairs(headers, setHeaders, 'Header', 'Value')}
          </Tabs.Panel>

          <Tabs.Panel value="body" pt="md" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <SegmentedControl
              value={bodyType}
              onChange={(value) => setBodyType(value as 'none' | 'json' | 'form')}
              data={[
                { label: 'None', value: 'none' },
                { label: 'JSON', value: 'json' },
                { label: 'Form', value: 'form' },
              ]}
              size="xs"
              mb="sm"
            />
            {bodyType !== 'none' && (
              <Textarea
                placeholder={bodyType === 'json' ? '{\n  "key": "value"\n}' : 'key=value&key2=value2'}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                minRows={8}
                style={{ flex: 1 }}
                styles={{ input: { fontFamily: 'monospace', fontSize: '13px' } }}
              />
            )}
            {bodyType === 'none' && (
              <Text c="dimmed" ta="center" mt="xl">
                This request does not have a body
              </Text>
            )}
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Paper>
  );
}
