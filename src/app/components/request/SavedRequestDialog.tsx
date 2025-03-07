import { useState } from 'react';
import { 
  Modal, 
  TextInput, 
  Select, 
  Button, 
  Stack,
  Group,
  Text
} from '@mantine/core';
import { useSavedRequests } from '../../hooks/useSavedRequests';

interface SavedRequestDialogProps {
  opened: boolean;
  onClose: () => void;
  requestData: {
    url: string;
    method: string;
    headers?: Record<string, string>;
    params?: Record<string, string>;
    body?: string;
    bodyType?: string;
  };
  initialFolder?: string | null;
}

export function SavedRequestDialog({ opened, onClose, requestData, initialFolder }: SavedRequestDialogProps) {
  const { folders, createFolder, saveRequest } = useSavedRequests();
  const [selectedFolder, setSelectedFolder] = useState<string>(initialFolder || '');
  const [newFolderName, setNewFolderName] = useState('');
  const [requestName, setRequestName] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  const handleSave = () => {
    try {
      if (isCreatingFolder && newFolderName.trim()) {
        const newFolder = createFolder(newFolderName.trim());
        saveRequest(newFolder.id, {
          name: requestName.trim(),
          ...requestData
        });
      } else if (selectedFolder) {
        saveRequest(selectedFolder, {
          name: requestName.trim(),
          ...requestData
        });
      }

      onClose();
      setRequestName('');
      setSelectedFolder('');
      setNewFolderName('');
      setIsCreatingFolder(false);
    } catch (error) {
      console.error('Error saving request:', error);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Save Request"
      size="md"
    >
      <Stack gap="md">
        <TextInput
          label="Request Name"
          placeholder="Enter a name for this request"
          value={requestName}
          onChange={(e) => setRequestName(e.target.value)}
        />

        {isCreatingFolder ? (
          <TextInput
            label="New Folder Name"
            placeholder="Enter folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            required
          />
        ) : (
          <Select
            label="Select Folder"
            placeholder="Choose a folder"
            data={folders.map(f => ({ value: f.id, label: f.name }))}
            value={selectedFolder}
            onChange={(value) => setSelectedFolder(value || '')}
            defaultValue={initialFolder || undefined}
            required
          />
        )}

        <Group justify="space-between" mt="xs">
          <Button
            variant="subtle"
            onClick={() => setIsCreatingFolder(!isCreatingFolder)}
          >
            {isCreatingFolder ? 'Select Existing Folder' : 'Create New Folder'}
          </Button>

          <Button
            onClick={handleSave}
            disabled={!selectedFolder && !newFolderName.trim()}
          >
            Save Request
          </Button>
        </Group>

        <Text size="sm" c="dimmed">
          Request will be saved with the following details:
          <br />
          Method: {requestData.method}
          <br />
          URL: {requestData.url}
        </Text>
      </Stack>
    </Modal>
  );
}
