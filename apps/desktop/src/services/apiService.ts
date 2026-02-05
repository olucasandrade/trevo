import type { RequestConfig, ApiResponse } from '@trevo/core';

/**
 * Send HTTP request via Tauri backend (no CORS restrictions)
 */
export async function sendRequest(config: RequestConfig): Promise<ApiResponse> {
  try {
    const { invoke } = await import('@tauri-apps/api/core');

    return invoke<ApiResponse>('send_http_request', {
      config: {
        method: config.method,
        url: config.url,
        headers: config.headers || {},
        params: config.params || {},
        body: config.body,
        body_type: config.bodyType || 'none',
      },
    });
  } catch (error) {
    // Fallback for development without Tauri (uses web proxy)
    console.warn('Tauri not available, using web fallback');
    const { sendWebRequest } = await import('@trevo/api-client');
    return sendWebRequest(config);
  }
}
