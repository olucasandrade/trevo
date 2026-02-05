import type { KeyValuePair } from '../types';

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): ValidationResult {
  const pattern = /^(https?:\/\/)?((www\.)?|([\w-]+\.)+[\w-]+)(:\d+)?(\/[^\s]*)?$/;
  return { valid: pattern.test(url), error: 'Invalid URL format' };
}

/**
 * Validate JSON string
 */
export function isValidJson(str: string): ValidationResult {
  if (!str) return { valid: true };
  try {
    JSON.parse(str);
    return { valid: true };
  } catch {
    return { valid: false, error: 'Invalid JSON format' };
  }
}

/**
 * Validate a complete request configuration
 */
export function validateRequest(
  url: string,
  bodyType: string,
  body: string,
  headers: KeyValuePair[],
  params: KeyValuePair[]
): ValidationResult {
  // Check URL
  if (!url) {
    return { valid: false, error: 'URL is required' };
  }

  const urlValidation = isValidUrl(url);
  if (!urlValidation.valid) {
    return urlValidation;
  }

  // Check JSON body
  if (bodyType === 'json') {
    const jsonValidation = isValidJson(body);
    if (!jsonValidation.valid) {
      return jsonValidation;
    }
  }

  // Check headers
  const invalidHeader = headers.find(
    (h) => (h.key && !h.value) || (!h.key && h.value)
  );
  if (invalidHeader) {
    return {
      valid: false,
      error: 'All header pairs must have both key and value',
    };
  }

  // Check params
  const invalidParam = params.find(
    (p) => (p.key && !p.value) || (!p.key && p.value)
  );
  if (invalidParam) {
    return {
      valid: false,
      error: 'All parameter pairs must have both key and value',
    };
  }

  return { valid: true };
}
