import axios, { AxiosRequestConfig } from 'axios';
import { transformToHttps } from '@trevo/core';
import type { ApiClient, RequestConfig, ApiResponse } from './types';

const PROXY_URL = '/api/';

function prepareRequestBody(
  body: unknown,
  bodyType: string,
  method: string
): unknown {
  if (method === 'DELETE' && body === undefined) {
    return undefined;
  }

  if (!body || bodyType === 'none') {
    return undefined;
  }

  if (bodyType === 'json') {
    if (typeof body === 'string') {
      try {
        return JSON.stringify(JSON.parse(body));
      } catch {
        return JSON.stringify(body);
      }
    }
    return JSON.stringify(body);
  }

  if (bodyType === 'form') {
    if (typeof body === 'string') {
      return body;
    }

    if (typeof body === 'object' && body !== null) {
      const params = new URLSearchParams();
      Object.entries(body as Record<string, string | number | boolean>).forEach(
        ([key, value]) => {
          params.append(key, String(value));
        }
      );
      return params.toString();
    }
  }

  return String(body);
}

export class WebApiClient implements ApiClient {
  async sendRequest(config: RequestConfig): Promise<ApiResponse> {
    const paramsString =
      config.params && Object.keys(config.params).length > 0
        ? new URLSearchParams(config.params).toString()
        : '';

    const bodyType = config.bodyType || 'none';
    const preparedBody = prepareRequestBody(config.body, bodyType, config.method);

    let contentTypeHeader = 'text/plain';
    if (bodyType === 'json') {
      contentTypeHeader = 'application/json';
    } else if (bodyType === 'form') {
      contentTypeHeader = 'application/x-www-form-urlencoded';
    }

    const headers: Record<string, string> = {
      ...config.headers,
    };

    if (preparedBody !== undefined) {
      headers['Content-Type'] = contentTypeHeader;
    }

    const axiosConfig: AxiosRequestConfig = {
      method: config.method,
      url: PROXY_URL,
      headers,
      params: {
        url: transformToHttps(config.url),
        method: config.method,
        params: paramsString,
      },
    };

    if (preparedBody !== undefined) {
      axiosConfig.data = preparedBody;
    }

    const startTime = performance.now();
    try {
      const response = await axios(axiosConfig);
      const endTime = performance.now();

      if (
        response.data === null ||
        response.data === undefined ||
        response.data === ''
      ) {
        return {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers as Record<string, string>,
          body: null,
          elapsedTime: endTime - startTime,
          size: 0,
        };
      }

      const jsonString = JSON.stringify(response.data);
      const size = new Blob([jsonString]).size;

      return {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers as Record<string, string>,
        body: response.data,
        elapsedTime: endTime - startTime,
        size: size,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const endTime = performance.now();

        if (
          error.response.data === null ||
          error.response.data === undefined ||
          error.response.data === ''
        ) {
          return {
            status: error.response.status,
            statusText: error.response.statusText,
            headers: error.response.headers as Record<string, string>,
            body: null,
            elapsedTime: endTime - startTime,
            size: 0,
          };
        }

        const jsonString = JSON.stringify(error.response.data);
        const size = new Blob([jsonString]).size;

        return {
          status: error.response.status,
          statusText: error.response.statusText,
          headers: error.response.headers as Record<string, string>,
          body: error.response.data,
          elapsedTime: endTime - startTime,
          size: size,
        };
      }
      throw error;
    }
  }
}

// Singleton instance for convenience
export const webApiClient = new WebApiClient();

// Legacy export for backwards compatibility
export const sendRequest = (config: RequestConfig) =>
  webApiClient.sendRequest(config);
