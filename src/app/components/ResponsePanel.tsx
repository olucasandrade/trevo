import { IconClock, IconCopy, IconDatabase } from "@tabler/icons-react";
import { useMemo } from "react";
import { formatSize } from '../services/apiService';
import { Button, Card } from "@mantine/core";
import { toast } from "react-toastify";

interface ResponsePanelProps {
  response?: {
    status: number;
    statusText: string;
    elapsedTime: number;
    size: number;
    headers: Record<string, string>;
    body: unknown;
  };
}

const formatResponse = (body: unknown, contentType: string): string => {
  // Handle null or undefined
  if (body === null || body === undefined) {
    return "No content";
  }

  try {
    if (typeof body === "string") {
      if (contentType.includes('html')) {
        return body
          .replace(/></g, '>\n<')
          .replace(/\n\s*\n/g, '\n')
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.length > 0)
          .join('\n');
      }

      try {
        const parsed = JSON.parse(body);
        return JSON.stringify(parsed, null, 2);
      } catch {
        return body;
      }
    }

    if (typeof body === "object") {
      return JSON.stringify(body, null, 2);
    }

    return String(body);
  } catch (error) {
    console.error("Error formatting response:", error);
    return "Error formatting response";
  }
};

const isHtmlResponse = (contentType: string): boolean => {
  return contentType.includes('html')
};

export const ResponsePanel = ({ response }: ResponsePanelProps) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Response copied to clipboard", { type: "success" });
  };

  const formattedBody = useMemo(() => {
    if (!response) return "";
    const contentType = response.headers["content-type"] || "";
    return formatResponse(response.body, contentType);
  }, [response]);

  const isHtml = useMemo(() => {
    if (!response) return false;
    const contentType = response.headers["content-type"] || "";
    return isHtmlResponse(contentType);
  }, [response]);

  if (!response) {
    return (
      <Card className="p-6 glass-panel h-[380px] flex items-center justify-center text-muted-foreground slide-in">
        Send a request to see the response
      </Card>
    );
  }

  return (
    <Card className="p-6 glass-panel h-[380px] slide-in max-w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Status:</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            response.status >= 200 && response.status < 300
              ? 'bg-green-500/10 text-green-500'
              : 'bg-red-500/10 text-red-500'
          }`}>
            {response.status} {response.statusText}
          </span>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <IconClock className="h-3 w-3" />
            <span>{response.elapsedTime.toFixed(0)}ms</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <IconDatabase className="h-3 w-3" />
            <span>{formatSize(response.size)}</span>
          </div>
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => copyToClipboard(formattedBody)}
        >
          <IconCopy className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {isHtml ? (
          <div className="relative">
            <iframe
              className="w-full h-[300px] rounded-md bg-secondary/50"
              srcDoc={response.body as string}
            />  
          </div>
        ) : (
          <div className="relative">
            <pre className="w-full h-[300px] p-4 rounded-md bg-secondary/50 font-mono text-sm overflow-auto whitespace-pre-wrap">
              {formattedBody}
            </pre>
          </div>
        )}
      </div>
    </Card>
  );
};