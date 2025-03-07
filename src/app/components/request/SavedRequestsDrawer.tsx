import { useState, useEffect } from 'react';
import { 
  Drawer, 
  Stack, 
  Text, 
  Button, 
  TextInput, 
  ActionIcon, 
  Group,
  Menu,
  Collapse,
  UnstyledButton
} from '@mantine/core';
import { 
  IconFolder, 
  IconDotsVertical, 
  IconTrash, 
  IconEdit, 
  IconChevronRight,
  IconPlus
} from '@tabler/icons-react';
import { useSavedRequests } from '../../hooks/useSavedRequests';
import { SavedRequest } from '../../types/requests';

interface SavedRequestsDrawerProps {
  opened: boolean;
  onClose: () => void;
  onSelectRequest: (request: SavedRequest) => void;
}

export function SavedRequestsDrawer({ opened, onClose, onSelectRequest }: SavedRequestsDrawerProps) {
  const { 
    folders: foldersFromHook, 
    createFolder, 
    deleteFolder, 
    renameFolder,
    deleteRequest,
    subscribe,
  } = useSavedRequests();
  const [folders, setFolders] = useState(foldersFromHook);

  useEffect(() => {
    const unsubscribe = subscribe((newState) => {
      setFolders(newState.folders);
    });
  
    return unsubscribe;
  }, []);
  

  const [newFolderName, setNewFolderName] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);

  const [editingFolder, setEditingFolder] = useState<string | null>(null);

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      createFolder(newFolderName.trim());
      setNewFolderName('');
    }
  };

  const handleRenameFolder = (folderId: string, newName: string) => {
    if (newName.trim()) {
      renameFolder(folderId, newName.trim());
      setEditingFolder(null);
    }
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Saved Requests"
      position="right"
      size="md"
      className="overflow-hidden"
    >
      <Stack gap="md">
        <Group>
          <TextInput
            placeholder="New folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            style={{ flex: 1 }}
          />
          <Button
            onClick={handleCreateFolder}
            disabled={!newFolderName.trim()}
            leftSection={<IconPlus size={16} />}
          >
            Create
          </Button>
        </Group>
        <Stack gap="xs" className="overflow-y-auto">
          {folders.map(folder => (
            <div key={folder.id}>
              <Group justify="space-between" wrap="nowrap" mb="xs">
                <UnstyledButton
                  onClick={() => toggleFolder(folder.id)}
                  className="flex items-center gap-2 flex-1"
                >
                  <IconChevronRight
                    size={16}
                    style={{
                      transform: expandedFolders.includes(folder.id) ? 'rotate(90deg)' : 'none',
                      transition: 'transform 0.2s ease'
                    }}
                  />
                  <IconFolder size={16} />
                  {editingFolder === folder.id ? (
                    <TextInput
                      value={folder.name}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => handleRenameFolder(folder.id, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleRenameFolder(folder.id, e.currentTarget.value);
                        }
                      }}
                      onBlur={(e) => handleRenameFolder(folder.id, e.currentTarget.value)}
                      autoFocus
                    />
                  ) : (
                    <Text size="sm">{folder.name}</Text>
                  )}
                </UnstyledButton>
                
                <Group gap="xs">
                  <Menu shadow="md" width={200}>
                    <Menu.Target>
                      <ActionIcon variant="subtle" size="sm">
                        <IconDotsVertical size={16} />
                      </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Item
                        leftSection={<IconEdit size={16} />}
                        onClick={() => setEditingFolder(folder.id)}
                      >
                        Rename
                      </Menu.Item>
                      <Menu.Item
                        leftSection={<IconTrash size={16} />}
                        onClick={() => deleteFolder(folder.id)}
                        color="red"
                      >
                        Delete
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Group>

              <Collapse in={expandedFolders.includes(folder.id)}>
                <Stack gap="xs" ml="md" mb="sm">
                  {folder.requests.map(request => (
                    <Group key={request.id} wrap="nowrap">
                      <UnstyledButton
                        onClick={() => onSelectRequest(request)}
                        className="flex-1 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <Group wrap="nowrap">
                          <Text size="xs" fw={500} color="blue">
                            {request.method}
                          </Text>
                          <Text size="xs" truncate>
                            {request.name || request.url}
                          </Text>
                        </Group>
                      </UnstyledButton>
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        size="sm"
                        onClick={() => deleteRequest(folder.id, request.id)}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  ))}
                </Stack>
              </Collapse>
            </div>
          ))}
        </Stack>
      </Stack>
    </Drawer>
  );
}
