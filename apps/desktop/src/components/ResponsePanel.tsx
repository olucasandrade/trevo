import {
  Paper,
  Badge,
  Group,
  Text,
  Stack,
  Code,
  CopyButton,
  ActionIcon,
  Tooltip,
  ScrollArea,
  Tabs,
} from '@mantine/core';
import { IconCopy, IconCheck } from '@tabler/icons-react';
import type { ApiResponse } from '@trevo/core';
import { formatSize } from '@trevo/core';

interface ResponsePanelProps {
  response?: ApiResponse;
}

export function ResponsePanel({ response }: ResponsePanelProps) {
  if (!response) {
    return (
      <Paper p="md" h="100%">
        <Stack align="center" justify="center" h="100%">
          <Text c="dimmed" ta="center">
            Send a request to see the response
          </Text>
        </Stack>
      </Paper>
    );
  }

  const isSuccess = response.status >= 200 && response.status < 300;
  const isError = response.status >= 400;

  const formattedBody =
    typeof response.body === 'object'
      ? JSON.stringify(response.body, null, 2)
      : String(response.body || '');

  const isHtml =
    typeof response.body === 'string' &&
    response.body.trim().toLowerCase().startsWith('<!doctype') ||
    (typeof response.body === 'string' && response.body.trim().toLowerCase().startsWith('<html'));

  return (
    <Paper p="md" h="100%" style={{ display: 'flex', flexDirection: 'column' }}>
      <Stack gap="md" style={{ flex: 1, minHeight: 0 }}>
        {/* Status Bar */}
        <Group justify="space-between">
          <Group gap="md">
            <Badge
              color={isSuccess ? 'green' : isError ? 'red' : 'yellow'}
              variant="filled"
              size="lg"
            >
              {response.status} {response.statusText}
            </Badge>
            <Text size="sm" c="dimmed">
              {response.elapsedTime.toFixed(0)} ms
            </Text>
            <Text size="sm" c="dimmed">
              {formatSize(response.size)}
            </Text>
          </Group>
          <CopyButton value={formattedBody}>
            {({ copied, copy }) => (
              <Tooltip label={copied ? 'Copied!' : 'Copy response'}>
                <ActionIcon
                  color={copied ? 'green' : 'gray'}
                  variant="subtle"
                  onClick={copy}
                >
                  {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </Group>

        {/* Response Content */}
        <Tabs defaultValue="body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Tabs.List>
            <Tabs.Tab value="body">Body</Tabs.Tab>
            <Tabs.Tab value="headers">
              Headers ({Object.keys(response.headers).length})
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="body" pt="md" style={{ flex: 1, minHeight: 0 }}>
            {isHtml ? (
              <Tabs defaultValue="preview" style={{ height: '100%' }}>
                <Tabs.List>
                  <Tabs.Tab value="preview">Preview</Tabs.Tab>
                  <Tabs.Tab value="code">Code</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="preview" pt="sm" style={{ height: 'calc(100% - 40px)' }}>
                  <iframe
                    srcDoc={response.body as string}
                    style={{
                      width: '100%',
                      height: '100%',
                      border: '1px solid var(--mantine-color-default-border)',
                      borderRadius: 'var(--mantine-radius-sm)',
                      backgroundColor: 'white',
                    }}
                    sandbox="allow-same-origin"
                    title="Response Preview"
                  />
                </Tabs.Panel>
                <Tabs.Panel value="code" pt="sm" style={{ height: 'calc(100% - 40px)' }}>
                  <ScrollArea h="100%">
                    <Code block style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>
                      {formattedBody}
                    </Code>
                  </ScrollArea>
                </Tabs.Panel>
              </Tabs>
            ) : (
              <ScrollArea h="100%">
                <Code block style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>
                  {formattedBody}
                </Code>
              </ScrollArea>
            )}
          </Tabs.Panel>

          <Tabs.Panel value="headers" pt="md" style={{ flex: 1, minHeight: 0 }}>
            <ScrollArea h="100%">
              <Stack gap="xs">
                {Object.entries(response.headers).map(([key, value]) => (
                  <Group key={key} gap="sm">
                    <Text fw={500} size="sm" style={{ minWidth: 150 }}>
                      {key}:
                    </Text>
                    <Text size="sm" c="dimmed" style={{ wordBreak: 'break-all' }}>
                      {value}
                    </Text>
                  </Group>
                ))}
              </Stack>
            </ScrollArea>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Paper>
  );
}
