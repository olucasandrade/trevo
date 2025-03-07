import { useState, useEffect, useCallback, useRef } from 'react';
import { WebSocketConnection, WebSocketMessage } from '../types/requests';

export const useWebSocket = () => {
  const [connection, setConnection] = useState<WebSocketConnection>({
    url: '',
    status: 'disconnected',
    messages: []
  });
  
  const wsRef = useRef<WebSocket | null>(null);

  const connect = useCallback((url: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.close();
    }

    setConnection(prev => ({
      ...prev,
      status: 'connecting'
    }));

    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        setConnection(prev => ({
          ...prev,
          url,
          status: 'connected'
        }));
      };

      ws.onclose = () => {
        setConnection(prev => ({
          ...prev,
          status: 'disconnected'
        }));
      };

      ws.onerror = () => {
        setConnection(prev => ({
          ...prev,
          status: 'error'
        }));
      };

      ws.onmessage = (event) => {
        const message: WebSocketMessage = {
          type: 'received',
          content: event.data,
          timestamp: Date.now()
        };
        setConnection(prev => ({
          ...prev,
          messages: [...prev.messages, message]
        }));
      };
    } catch {
      setConnection(prev => ({
        ...prev,
        status: 'error'
      }));
    }
  }, []);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  const sendMessage = useCallback((content: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(content);
      const message: WebSocketMessage = {
        type: 'sent',
        content,
        timestamp: Date.now()
      };
      setConnection(prev => ({
        ...prev,
        messages: [...prev.messages, message]
      }));
    }
  }, []);

  const clearMessages = useCallback(() => {
    setConnection(prev => ({
      ...prev,
      messages: []
    }));
  }, []);

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return {
    connection,
    connect,
    disconnect,
    sendMessage,
    clearMessages
  };
};
