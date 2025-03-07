import { useState, useCallback } from 'react';
import { SavedRequestsState, SavedRequest, RequestFolder } from '../types/requests';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'trevo_saved_requests';

const defaultState: SavedRequestsState = {
  folders: []
};

const getStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : defaultState;
}

type SubscribeCallback = (state: SavedRequestsState) => void;

let subscribers: SubscribeCallback[] = [];

export const useSavedRequests = () => {
  const [state, setState] = useState<SavedRequestsState>(getStorage());

  const notifySubscribers = useCallback((newState: SavedRequestsState) => {
    subscribers.forEach(callback => callback(newState));
  }, []);

  const subscribe = useCallback((callback: SubscribeCallback) => {
    subscribers.push(callback);
    return () => {
      subscribers = subscribers.filter(cb => cb !== callback);
    };
  }, []);

  const createFolder = (name: string): RequestFolder => {
    const newFolder: RequestFolder = {
      id: uuidv4(),
      name,
      requests: []
    };
    const newState = {
      folders: [...state.folders, newFolder]
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    setState(newState);
    notifySubscribers(newState);
    return newFolder;
  };

  const deleteFolder = (folderId: string) => {
    const newState = {
      folders: state.folders.filter(f => f.id !== folderId)
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    setState(newState);
    notifySubscribers(newState);
  };

  const saveRequest = (folderId: string, request: Omit<SavedRequest, 'id'>) => {
    const newState = {
      folders: state.folders.map(folder => {
        if (folder.id === folderId) {
          return {
            ...folder,
            requests: [...folder.requests, { ...request, id: uuidv4() }]
          };
        }
        return folder;
      })
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    setState(newState);
    notifySubscribers(newState);
  };

  const deleteRequest = (folderId: string, requestId: string) => {
    const newState = {
      folders: state.folders.map(folder => {
        if (folder.id === folderId) {
          return {
            ...folder,
            requests: folder.requests.filter(r => r.id !== requestId)
          };
        }
        return folder;
      })
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    setState(newState);
    notifySubscribers(newState);
  };

  const renameFolder = (folderId: string, newName: string) => {
    const newState = {
      folders: state.folders.map(folder => {
        if (folder.id === folderId) {
          return { ...folder, name: newName };
        }
        return folder;
      })
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    setState(newState);
    notifySubscribers(newState);
  };

  return {
    folders: state.folders,
    createFolder,
    deleteFolder,
    saveRequest,
    deleteRequest,
    renameFolder,
    subscribe
  };
};
