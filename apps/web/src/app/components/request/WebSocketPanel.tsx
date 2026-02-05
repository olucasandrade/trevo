import { useState } from 'react';
import {
  Paper,
  TextInput,
  Button,
  Group,
  Stack,
  Text,
  ScrollArea,
  Code,
  Badge,
  ActionIcon,
  Tooltip
} from '@mantine/core';
import { IconSend, IconTrash, IconPlug, IconPlugOff } from '@tabler/icons-react';
import { useWebSocket } from '@/app/hooks/useWebSocket';

export function WebSocketPanel() {
  const { connection, connect, disconnect, sendMessage, clearMessages } = useWebSocket();
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleConnect = () => {
    if (connection.status === 'connected') {
      disconnect();
    } else {
      connect(url);
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  const statusColor = {
    connected: 'green',
    disconnected: 'gray',
    connecting: 'transparent',
    error: 'red'
  }[connection.status];

  const getIcon = () => {
    switch (connection.status) {
      case 'connected':
        return <IconPlug size={16} />;
      case 'disconnected':
        return <IconPlugOff size={16} />;
      case 'connecting':
        return <div className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"/>;
      default:
        return null;
    }
  };

  const getLabelForButton = () => {
    switch (connection.status) {
      case 'connected':
        return 'Disconnect';
      case 'disconnected':
        return 'Connect';
      case 'connecting':
        return 'Connecting...';
      default:
        return 'Connect';
    }
  };

  return (
    <Paper p="md" radius="md" withBorder>
      <Stack gap="md">
        <Group align="flex-end">
          <TextInput
            label="WebSocket URL"
            placeholder="ws://localhost:8080"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ flex: 1 }}
            disabled={connection.status === 'connected'}
          />
          <Button
            onClick={handleConnect}
            leftSection={getIcon()}
            color={connection.status === 'connected' ? 'red' : 'blue'}
            disabled={connection.status === 'connecting'}
          >
            {getLabelForButton()}
          </Button>
        </Group>

        <Group align="center" gap="xs">
          <Text size="sm">Status:</Text>
          <Badge color={statusColor} variant="light">
            {connection.status.charAt(0).toUpperCase() + connection.status.slice(1)}
          </Badge>
        </Group>

        <Paper withBorder p="xs" style={{ height: '300px' }}>
          <Stack gap="xs" style={{ height: '100%' }}>
            <Group justify="space-between">
              <Text size="sm" fw={500}>Messages</Text>
              <Tooltip label="Clear messages">
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  onClick={clearMessages}
                  disabled={connection.messages.length === 0}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Tooltip>
            </Group>

            <ScrollArea style={{ flex: 1 }} type="always">
              <Stack gap="xs">
                {connection.messages.map((msg, index) => (
                  <Group
                    key={index}
                    p="xs"
                    style={{
                      borderRadius: 'var(--mantine-radius-sm)',
                    }}
                  >
                    <Badge
                      size="sm"
                      variant="light"
                      color={msg.type === 'sent' ? 'blue' : 'gray'}
                    >
                      {msg.type}
                    </Badge>
                    <Code style={{ flex: 1 }}>{msg.content}</Code>
                    <Text size="xs" c="dimmed">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </Text>
                  </Group>
                ))}
              </Stack>
            </ScrollArea>
          </Stack>
        </Paper>

        <Group align="flex-end">
          <TextInput
            label="Message"
            placeholder="Enter message to send"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ flex: 1 }}
            disabled={connection.status !== 'connected'}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button
            onClick={handleSend}
            disabled={connection.status !== 'connected' || !message.trim()}
            leftSection={<IconSend size={16} />}
          >
            Send
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}
