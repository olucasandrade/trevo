export interface SavedRequest {
  id: string;
  name: string;
  url: string;
  method: string;
  headers?: Record<string, string>;
  body?: string;
  params?: Record<string, string>;
}

export interface RequestFolder {
  id: string;
  name: string;
  requests: SavedRequest[];
}

export interface SavedRequestsState {
  folders: RequestFolder[];
}

export interface WebSocketMessage {
  type: 'sent' | 'received';
  content: string;
  timestamp: number;
}

export interface WebSocketConnection {
  url: string;
  status: 'connected' | 'disconnected' | 'connecting' | 'error';
  messages: WebSocketMessage[];
}
