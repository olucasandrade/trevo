import transformToHttps from "../services/apiService";

interface RequestConfig {
  method: string;
  url: string;
  headers: Record<string, string>;
  params: Record<string, string>;
  body?: string;
  bodyType?: string;
}

export function generateCurlCommand(config: RequestConfig): string {
  const { method, url, headers, params, body, bodyType } = config;
  
  let curl = `curl -X ${method}`;
  
  const urlObj = new URL(transformToHttps(url)!);
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
      const formData = JSON.parse(body);
      Object.entries(formData).forEach(([key, value]) => {
        curl += `\n  -F '${key}=${value}'`;
      });
    } else {
      curl += `\n  -d '${body}'`;
    }
  }
  
  return curl;
}
