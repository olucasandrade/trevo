import { Button, Input, Select } from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";

interface HeaderPair {
  key: string;
  value: string;
}

interface HeadersSectionProps {
  headers: HeaderPair[];
  onAddHeader: () => void;
  onRemoveHeader: (index: number) => void;
  onUpdateHeader: (index: number, field: 'key' | 'value', value: string) => void;
}

const COMMON_HEADERS = [
  'Content-Type',
  'Authorization',
  'Accept',
  'User-Agent',
  'Cache-Control',
];

export const HeadersSection = ({ headers, onAddHeader, onRemoveHeader, onUpdateHeader }: HeadersSectionProps) => {
  return (
    <div className="space-y-2">
      {headers.map((header, index) => (
        <div key={index} className="flex gap-2">
          <Select
            value={header.key}
            onChange={(value) => onUpdateHeader(index, 'key', value!)}
            data={COMMON_HEADERS}
            placeholder="Header"
          />
          <Input
            placeholder="Value"
            value={header.value}
            onChange={(e) => onUpdateHeader(index, 'value', e.target.value)}
            className="flex-1"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemoveHeader(index)}
          >
            <IconTrash className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={onAddHeader}
      >
        <IconPlus className="h-4 w-4 mr-2" />
        Add Header
      </Button>
    </div>
  );
};