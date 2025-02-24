import { useState, useEffect } from 'react';
import { ApiResponse, sendRequest } from '../services/apiService';
import { useRequestHistory } from '../hooks/useRequestHistory';
import { validateRequest } from '../utils/requestValidation';
import { UrlBar } from './request/UrlBar';
import { ParamsSection } from './request/ParamsSection';
import { HeadersSection } from './request/HeadersSection';
import { BodySection } from './request/BodySection';
import type { HistoryItem } from '../hooks/useRequestHistory';
import { Card, Tabs, TabsList, TabsPanel, TabsTab, Button } from '@mantine/core';
import { toast } from 'react-toastify';
import { generateCurlCommand } from '../utils/curlGenerator';
import { IconTerminal2 } from '@tabler/icons-react';

interface HeaderPair {
  key: string;
  value: string;
}

interface ParamPair {
  key: string;
  value: string;
}

interface RequestPanelProps {
  onResponse: (response: ApiResponse) => void;
  selectedRequest: HistoryItem | null;
}

export const RequestPanel = ({ onResponse, selectedRequest }: RequestPanelProps) => {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState<HeaderPair[]>([{ key: '', value: '' }]);
  const [params, setParams] = useState<ParamPair[]>([{ key: '', value: '' }]);
  const [bodyType, setBodyType] = useState('none');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addToHistory } = useRequestHistory();

  useEffect(() => {
    if (selectedRequest) {
      setUrl(selectedRequest.url);
      setMethod(selectedRequest.method);
      
      if (selectedRequest.config.headers) {
        const headerPairs = Object.entries(selectedRequest.config.headers).map(([key, value]) => ({
          key,
          value: value as string
        }));
        setHeaders(headerPairs.length ? headerPairs : [{ key: '', value: '' }]);
      }
      
      if (selectedRequest.config.params) {
        const paramPairs = Object.entries(selectedRequest.config.params).map(([key, value]) => ({
          key,
          value: value as string
        }));
        setParams(paramPairs.length ? paramPairs : [{ key: '', value: '' }]);
      }
      
      setBodyType(selectedRequest.config.bodyType || 'none');
      setBody(selectedRequest.config.body as string || '');
    }
  }, [selectedRequest]);

  const validateCurrentRequest = () => {
    return validateRequest(url, bodyType, body, headers, params);
  };

  const handleSubmit = async () => {
    const validation = validateCurrentRequest();
    if (!validation.valid) {
      toast("Invalid request", { type: "error" });
      return;
    }

    try {
      const headersObj = headers.reduce((acc, { key, value }) => {
        if (key && value) acc[key] = value;
        return acc;
      }, {} as Record<string, string>);

      const paramsObj = params.reduce((acc, { key, value }) => {
        if (key && value) acc[key] = value;
        return acc;
      }, {} as Record<string, string>);

      const requestConfig = {
        method,
        url,
        headers: headersObj,
        params: paramsObj,
        body,
        bodyType,
      };

      setIsLoading(true);
      const response = await sendRequest(requestConfig);
      onResponse(response);
      
      addToHistory.mutate({
        method,
        url,
        config: requestConfig,
        response,
      });

      toast("Request sent successfully", { type: "success" });

      setIsLoading(false);
    } catch {
      toast("Failed to send request", { type: "error" });
      setIsLoading(false);
    }
  };

  const addHeader = () => setHeaders([...headers, { key: '', value: '' }]);
  const removeHeader = (index: number) => setHeaders(headers.filter((_, i) => i !== index));
  const updateHeader = (index: number, field: 'key' | 'value', value: string) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const addParam = () => setParams([...params, { key: '', value: '' }]);
  const removeParam = (index: number) => setParams(params.filter((_, i) => i !== index));
  const updateParam = (index: number, field: 'key' | 'value', value: string) => {
    const newParams = [...params];
    newParams[index][field] = value;
    setParams(newParams);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard", { type: "info" });
  };

  const copyAsCurl = () => {
    const headersObj = headers.reduce((acc, { key, value }) => {
      if (key && value) acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    const paramsObj = params.reduce((acc, { key, value }) => {
      if (key && value) acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    const curl = generateCurlCommand({
      method,
      url,
      headers: headersObj,
      params: paramsObj,
      body,
      bodyType,
    });

    navigator.clipboard.writeText(curl);
    toast("cURL command copied to clipboard", { type: "success" });
  };

  const handleClear = () => {
    setUrl('');
    setMethod('GET');
    setHeaders([{ key: '', value: '' }]);
    setParams([{ key: '', value: '' }]);
    setBodyType('none');
    setBody('');
  };

  return (
    <Card className="p-6 glass-panel slide-in">
      <UrlBar
        url={url}
        method={method}
        onUrlChange={setUrl}
        onMethodChange={setMethod}
        onSubmit={handleSubmit}
        isDisabled={!validateCurrentRequest().valid}
        isLoading={isLoading}
      />

      <Tabs defaultValue="params" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTab value="params">Params</TabsTab>
          <TabsTab value="headers">Headers</TabsTab>
          <TabsTab value="body">Body</TabsTab>
        </TabsList>

        <TabsPanel value="params" className="space-y-4">
          <ParamsSection
            params={params}
            onAddParam={addParam}
            onRemoveParam={removeParam}
            onUpdateParam={updateParam}
          />
        </TabsPanel>

        <TabsPanel value="headers" className="space-y-4">
          <HeadersSection
            headers={headers}
            onAddHeader={addHeader}
            onRemoveHeader={removeHeader}
            onUpdateHeader={updateHeader}
          />
        </TabsPanel>

        <TabsPanel value="body" className="space-y-4">
          <BodySection
            body={body}
            bodyType={bodyType}
            onBodyChange={setBody}
            onBodyTypeChange={setBodyType}
            onCopyToClipboard={copyToClipboard}
          />
        </TabsPanel>
      </Tabs>

      <div className="flex justify-between items-center gap-2 mt-4 pt-4 border-t border-gray-200">
        <Button
          variant="light"
          onClick={handleClear}
        >
          <div className='flex items-center gap-1'>
            Clear
          </div>
        </Button>
        <Button
          variant="light"
          onClick={copyAsCurl}
          disabled={!validateCurrentRequest().valid}
        >
          <div className='flex items-center gap-1'>
            <IconTerminal2 className="h-4 w-4" />
            Copy request as cURL
          </div>
        </Button>
      </div>
    </Card>
  );
};