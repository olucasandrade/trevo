/**
 * Transform a URL to HTTPS, removing www prefix
 */
export function transformToHttps(url: string): string | null {
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

/**
 * Format byte size to human readable string
 */
export function formatSize(size: number): string {
  if (size < 1024) {
    return `${size} B`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else {
    return `${(size / 1024 / 1024).toFixed(2)} MB`;
  }
}
