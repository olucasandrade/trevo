import { Button, Input, Select } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";

interface UrlBarProps {
  url: string;
  method: string;
  onUrlChange: (url: string) => void;
  onMethodChange: (method: string) => void;
  onSubmit: () => void;
  isDisabled: boolean;
  isLoading: boolean;
}

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

export const UrlBar = ({ url, method, onUrlChange, onMethodChange, onSubmit, isDisabled, isLoading }: UrlBarProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <Select 
        value={method} 
        onChange={(m) => onMethodChange(m!)} 
        data={HTTP_METHODS} 
        placeholder="Method"
        styles={{
          input: {
            fontWeight: 600,
            transition: 'all 0.2s ease',
            border: '1px solid var(--mantine-color-default-border)',
          },
          dropdown: {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(4px)',
          },
          option: {
            transition: 'all 0.2s ease',
          }
        }}
      />
      <Input
        placeholder="Enter URL"
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !isDisabled) {
            onSubmit();
          }
        }}
        className="flex-1"
        styles={{
          input: {
            transition: 'all 0.2s ease',
            border: '1px solid var(--mantine-color-default-border)',
            '&:focus': {
              boxShadow: '0 0 0 2px var(--mantine-primary-color-light)',
            }
          }
        }}
      />
      <Button 
        onClick={onSubmit} 
        className="neo-button transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-lg" 
        disabled={isDisabled || isLoading}
        styles={{
          root: {
            transition: 'all 0.3s ease',
            fontWeight: 600,
            letterSpacing: '0.01em',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        {isLoading ? 
          <div className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"/> 
          : 
          <div className="flex items-center gap-2">
            <IconSend className="h-4 w-4" />
            Send
          </div>
        }
      </Button>
    </div>
  );
};