import type { ApiClient, RequestConfig, ApiResponse } from './types';

/**
 * Desktop API client that uses Tauri's invoke to make HTTP requests directly.
 * No CORS proxy needed since desktop apps don't have browser CORS restrictions.
 */
export class DesktopApiClient implements ApiClient {
  async sendRequest(config: RequestConfig): Promise<ApiResponse> {
    // Dynamically import Tauri API to avoid bundling issues in web
    const { invoke } = await import('@tauri-apps/api/core');

    return invoke<ApiResponse>('send_http_request', {
      config: {
        method: config.method,
        url: config.url,
        headers: config.headers || {},
        params: config.params || {},
        body: config.body,
        bodyType: config.bodyType || 'none',
      },
    });
  }
}

// Singleton instance
export const desktopApiClient = new DesktopApiClient();

// Export for direct usage
export const sendRequest = (config: RequestConfig) =>
  desktopApiClient.sendRequest(config);
