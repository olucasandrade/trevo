import { Button, Input } from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";

interface ParamPair {
  key: string;
  value: string;
}

interface ParamsSectionProps {
  params: ParamPair[];
  onAddParam: () => void;
  onRemoveParam: (index: number) => void;
  onUpdateParam: (index: number, field: 'key' | 'value', value: string) => void;
}

export const ParamsSection = ({ params, onAddParam, onRemoveParam, onUpdateParam }: ParamsSectionProps) => {
  return (
    <div className="space-y-2">
      {params.map((param, index) => (
        <div key={index} className="flex flex-col md:flex-row gap-2">
          <Input
            placeholder="Key"
            value={param.key}
            onChange={(e) => onUpdateParam(index, 'key', e.target.value)}
            className="flex-1"
          />
          <Input
            placeholder="Value"
            value={param.value}
            onChange={(e) => onUpdateParam(index, 'value', e.target.value)}
            className="flex-1"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemoveParam(index)}
          >
            <IconTrash className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={onAddParam}
      >
        <IconPlus className="h-4 w-4 mr-2" />
        Add Parameter
      </Button>
    </div>
  );
};