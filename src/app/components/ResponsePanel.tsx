import { IconClock, IconCopy, IconDatabase } from "@tabler/icons-react";
import { useMemo } from "react";
import { formatSize } from '../services/apiService';
import { Button, Card, Tabs, TabsList, TabsPanel, TabsTab } from "@mantine/core";
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
      <Card className="p-6 glass-panel h-[300px] flex items-center justify-center text-muted-foreground slide-in">
        Send a request to see the response
      </Card>
    );
  }

  return (
    <Card className="p-6 glass-panel h-80 slide-in">
      <div className="flex items-center justify-between mb-4 max-w-full overflow-x-auto">
        <div className="flex items-center gap-2 flex-nowrap">
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

      <div className="space-y-4 max-w-full">
        {isHtml ? (
          <div className="relative max-w-full">
              <Tabs defaultValue="params" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTab value="formatted">HTML Page</TabsTab>
                <TabsTab value="as_code">HTML Code</TabsTab>
              </TabsList>
              <TabsPanel value="formatted" className="space-y-4 max-w-full overflow-hidden">
                  <iframe
                  className="w-full h-[210px] rounded-md bg-secondary/50"
                  srcDoc={formattedBody
                    .replace(/<script/g, '<!-- script')
                    .replace(/<\/script>/g, '</script -->')}
                />
              </TabsPanel>
      
              <TabsPanel value="as_code" className="space-y-4 max-w-full">
                <pre className="w-full h-[210px] p-4 rounded-md bg-secondary/50 font-mono text-sm overflow-auto whitespace-pre-wrap break-all">
                  {formattedBody}
                </pre>
              </TabsPanel>
              </Tabs>
          </div>
        ) : (
          <div className="relative max-w-full">
            <pre className="w-full h-[300px] p-4 rounded-md bg-secondary/50 font-mono text-sm overflow-auto whitespace-pre-wrap break-all">
              {formattedBody}
            </pre>
          </div>
        )}
      </div>
    </Card>
  );
};