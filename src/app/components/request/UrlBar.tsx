import { Button, Input, Select } from "@mantine/core";

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
    <div className="flex gap-4 mb-6">
      <Select value={method} onChange={(m) => onMethodChange(m!)} data={HTTP_METHODS} placeholder="Method"/>
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
      />
      <Button onClick={onSubmit} className="neo-button" disabled={isDisabled || isLoading}>
        {isLoading ?  <div
        className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"/> : "Send"}
      </Button>
    </div>
  );
};