import type { RequestConfig, ApiResponse } from '@trevo/core';

export interface ApiClient {
  sendRequest(config: RequestConfig): Promise<ApiResponse>;
}

export type { RequestConfig, ApiResponse };
