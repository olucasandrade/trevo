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
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

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
  const t = useTranslations('savedRequests');

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
      toast.success(t('savedSuccessfully'));
    } catch (error) {
      console.error('Error saving request:', error);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t('saveRequest')}
      size="md"
    >
      <Stack gap="md">
        <TextInput
          label={t('requestName')}
          placeholder={t('requestName')}
          value={requestName}
          onChange={(e) => setRequestName(e.target.value)}
          error={!requestName.trim() && t('errors.nameRequired')}
        />

        {isCreatingFolder ? (
          <TextInput
            label={t('folderName')}
            placeholder={t('folderName')}
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            error={!newFolderName.trim() && t('errors.folderNameRequired')}
            required
          />
        ) : (
          <Select
            label={t('selectFolder')}
            placeholder={t('selectFolder')}
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
            {isCreatingFolder ? t('selectFolder') : t('createNewFolder')}
          </Button>

          <Button
            onClick={handleSave}
            disabled={!selectedFolder && !newFolderName.trim()}
          >
            {t('saveRequest')}
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
