import { Button, Select } from "@mantine/core";
import { IconCopy } from "@tabler/icons-react";

interface BodySectionProps {
  body: string;
  bodyType: string;
  onBodyChange: (body: string) => void;
  onBodyTypeChange: (type: string) => void;
  onCopyToClipboard: (text: string) => void;
}

const BODY_TYPES = ['none', 'json', 'form-data', 'x-www-form-urlencoded', 'raw'];

export const BodySection = ({ body, bodyType, onBodyChange, onBodyTypeChange, onCopyToClipboard }: BodySectionProps) => {
  return (
    <div className="space-y-4">
      <Select value={bodyType} onChange={(bodyType) => onBodyTypeChange(bodyType!)} className="w-[200px]" data={BODY_TYPES} placeholder="Body type" />
      {bodyType !== 'none' && (
        <div className="relative">
          <textarea
            className="w-full h-[200px] p-4 rounded-md bg-secondary/50 font-mono text-sm resize-none"
            placeholder={bodyType === 'json' ? "{\n  'key': 'value'\n}" : "key=value&other=value"}
            value={body}
            onChange={(e) => onBodyChange(e.target.value)}
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2"
            onClick={() => onCopyToClipboard(body)}
          >
            <IconCopy className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};