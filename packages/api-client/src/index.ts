export type { ApiClient, RequestConfig, ApiResponse } from './types';

// Re-export platform-specific clients
export { WebApiClient, webApiClient, sendRequest as sendWebRequest } from './web';
export {
  DesktopApiClient,
  desktopApiClient,
  sendRequest as sendDesktopRequest,
} from './desktop';

// Factory function to create the appropriate client (async for dynamic imports)
export async function createApiClient(platform: 'web' | 'desktop'): Promise<import('./types').ApiClient> {
  if (platform === 'desktop') {
    const { DesktopApiClient } = await import('./desktop');
    return new DesktopApiClient();
  }
  const { WebApiClient } = await import('./web');
  return new WebApiClient();
}
