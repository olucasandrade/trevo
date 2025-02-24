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


export const sendRequest = async (config: RequestConfig): Promise<ApiResponse> => {
  
  const axiosConfig: AxiosRequestConfig = {
    method: "GET",
    url: proxy,
    headers: config.headers,
    params: {params: config.params, url: transformToHttps(config.url), method: config.method},
    data: config.bodyType !== 'none' ? config.body : undefined,
  };
  const startTime = performance.now();
  try {
    const response = await axios(axiosConfig);
    const endTime = performance.now();
    
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