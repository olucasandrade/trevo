// Base request types
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

// API request/response types
export interface RequestConfig {
  method: string;
  url: string;
  headers?: Record<string, string>;
  params?: Record<string, string>;
  body?: unknown;
  bodyType?: 'none' | 'json' | 'form' | 'text';
}

export interface ApiResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: unknown;
  elapsedTime: number;
  size: number;
}

// History types
export interface HistoryItem {
  id: string;
  method: string;
  url: string;
  timestamp: string;
  config: RequestConfig;
  response?: ApiResponse;
}

// WebSocket types
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

// Environment variables (desktop feature)
export interface EnvironmentVariable {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

export interface Environment {
  id: string;
  name: string;
  variables: EnvironmentVariable[];
  isActive: boolean;
}

// Request chaining (desktop feature)
export interface ResponseExtractor {
  id: string;
  variableName: string;
  source: 'body' | 'header';
  path: string; // JSONPath for body, header name for headers
}

export interface ChainedRequest {
  id: string;
  requestId: string;
  extractors: ResponseExtractor[];
  dependsOn?: string;
}

export interface RequestChain {
  id: string;
  name: string;
  requests: ChainedRequest[];
}

// Collection (desktop feature)
export interface Collection {
  id: string;
  name: string;
  description?: string;
  folders: RequestFolder[];
  environments: Environment[];
  chains: RequestChain[];
  createdAt: string;
  updatedAt: string;
}

// Key-value pair for forms
export interface KeyValuePair {
  key: string;
  value: string;
}
