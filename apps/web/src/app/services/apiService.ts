import axios, { AxiosRequestConfig } from 'axios';

const proxy = "/api/"

export interface RequestConfig {
  method: string;
  url: string;
  headers?: Record<string, string>;
  params?: Record<string, string>;
  body?: unknown;
  bodyType?: string;
}

export interface ApiResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: unknown;
  elapsedTime: number;
  size: number;
}

export const formatSize = (size: number): string => {
  if (size < 1024) {
    return `${size} B`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else {
    return `${(size / 1024 / 1024).toFixed(2)} MB`;
  }
}

export default function transformToHttps(url: string) {
  if (!/^https?:\/\//i.test(url)) {
      url = `http://${url}`;
  }

  try {
      const urlObj = new URL(url.toLowerCase());
      const pathAndQuery = urlObj.pathname + urlObj.search;
      return `https://${urlObj.hostname.replace(/^www\./, '')}${pathAndQuery}`;
  } catch {
      return null;
  }
}

const prepareRequestBody = (body: unknown, bodyType: string, method: string): unknown => {
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
      Object.entries(body as Record<string, string | number | boolean>).forEach(([key, value]) => {
        params.append(key, String(value));
      });
      return params.toString();
    }
  }

  return String(body);
};

export const sendRequest = async (config: RequestConfig): Promise<ApiResponse> => {
  const paramsString = config.params && Object.keys(config.params).length > 0 
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
  
  const headers = {
    ...config.headers,
  };
  
  if (preparedBody !== undefined) {
    headers['Content-Type'] = contentTypeHeader;
  }
  
  const axiosConfig: AxiosRequestConfig = {
    method: config.method,
    url: proxy,
    headers,
    params: {
      url: transformToHttps(config.url), 
      method: config.method,
      params: paramsString
    }
  };
  
  if (preparedBody !== undefined) {
    axiosConfig.data = preparedBody;
  }
  
  console.log(`Sending ${config.method} request to ${config.url}`);
  if (preparedBody !== undefined) {
    console.log(`With body type: ${bodyType}`);
  } else {
    console.log('Without body');
  }
  
  const startTime = performance.now();
  try {
    const response = await axios(axiosConfig);
    const endTime = performance.now();
    
    if (response.data === null || response.data === undefined || response.data === '') {
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
      
      if (error.response.data === null || error.response.data === undefined || error.response.data === '') {
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
};