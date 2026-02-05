import { IconClock, IconCopy, IconDatabase } from "@tabler/icons-react";
import { useMemo } from "react";
import { formatSize } from '../services/apiService';
import { ActionIcon, Card, Tabs, TabsList, TabsPanel, TabsTab } from "@mantine/core";
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
      <Card 
        className="p-6 glass-panel h-[280px] flex items-center justify-center text-muted-foreground slide-in"
        style={{ 
          backdropFilter: 'blur(8px)',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-400 animate-pulse flex items-center justify-center">
            <IconDatabase className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-center text-lg font-medium">Send a request to see the response</p>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className="p-6 glass-panel h-80 slide-in"
      style={{ 
        backdropFilter: 'blur(8px)',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="flex items-center justify-between mb-4 max-w-full overflow-x-auto">
        <div className="flex items-center gap-2 flex-nowrap">
          <span className="text-sm font-medium">Status:</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            response.status >= 200 && response.status < 300
              ? 'bg-green-500/10 text-green-500'
              : 'bg-red-500/10 text-red-500'
          }`}
          style={{ 
            transition: 'all 0.3s ease',
            fontWeight: 600,
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
          }}
          >
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
        
        <ActionIcon
          size="lg"
          variant="ghost"
          onClick={() => copyToClipboard(formattedBody)}
          style={{ borderRadius: '50%' }}
        >
          <IconCopy className="h-4 w-4" />
        </ActionIcon>
      </div>

      <div className="space-y-4 max-w-full">
        {isHtml ? (
          <div className="relative max-w-full">
            <Tabs 
              defaultValue="formatted" 
              className="w-full"
              styles={{
                tab: {
                  transition: 'all 0.2s ease',
                  fontWeight: 500,
                  '&[dataActive]': {
                    fontWeight: 600,
                  }
                }
              }}
            >
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTab value="formatted">HTML Page</TabsTab>
                <TabsTab value="as_code">HTML Code</TabsTab>
              </TabsList>
              <TabsPanel value="formatted" className="space-y-4 max-w-full overflow-hidden">
                <iframe
                  className="w-full h-[160px] rounded-md bg-secondary/50"
                  style={{ 
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  srcDoc={formattedBody
                    .replace(/<script/g, '<!-- script')
                    .replace(/<\/script>/g, '</script -->')}
                />
              </TabsPanel>
      
              <TabsPanel value="as_code" className="space-y-4 max-w-full">
                <pre 
                  className="w-full h-[160px] p-4 rounded-md bg-secondary/50 font-mono text-sm overflow-auto whitespace-pre-wrap break-all"
                  style={{ 
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {formattedBody}
                </pre>
              </TabsPanel>
            </Tabs>
          </div>
        ) : (
          <div className="relative max-w-full">
            <pre 
              className="w-full h-[200px] p-4 rounded-md bg-secondary/50 font-mono text-sm overflow-auto whitespace-pre-wrap break-all"
              style={{ 
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {formattedBody}
            </pre>
          </div>
        )}
      </div>
    </Card>
  );
};