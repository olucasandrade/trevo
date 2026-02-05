import { transformToHttps } from './url';

interface CurlRequestConfig {
  method: string;
  url: string;
  headers: Record<string, string>;
  params: Record<string, string>;
  body?: string;
  bodyType?: string;
}

/**
 * Generate a cURL command from request configuration
 */
export function generateCurlCommand(config: CurlRequestConfig): string {
  const { method, url, headers, params, body, bodyType } = config;

  let curl = `curl -X ${method}`;

  const transformedUrl = transformToHttps(url);
  if (!transformedUrl) {
    return curl;
  }

  const urlObj = new URL(transformedUrl);
  Object.entries(params).forEach(([key, value]) => {
    urlObj.searchParams.append(key, value);
  });
  curl += ` '${urlObj.toString()}'`;

  Object.entries(headers).forEach(([key, value]) => {
    curl += `\n  -H '${key}: ${value}'`;
  });

  if (body && bodyType !== 'none') {
    if (bodyType === 'json') {
      curl += `\n  -H 'Content-Type: application/json'`;
      curl += `\n  -d '${body}'`;
    } else if (bodyType === 'form-data') {
      try {
        const formData = JSON.parse(body);
        Object.entries(formData).forEach(([key, value]) => {
          curl += `\n  -F '${key}=${value}'`;
        });
      } catch {
        curl += `\n  -d '${body}'`;
      }
    } else {
      curl += `\n  -d '${body}'`;
    }
  }

  return curl;
}
