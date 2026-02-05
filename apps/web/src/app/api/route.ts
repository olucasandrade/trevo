import { NextRequest, NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const buildHeaders = (headers: Headers, targetUrl: string) => {
  const newHeaders = new Headers();
  
  const safeHeaders = [
    'accept',
    'accept-language',
    'content-type',
    'content-language',
    'authorization',
    'user-agent'
  ];
  
  for (const [key, value] of headers.entries()) {
    if (safeHeaders.includes(key.toLowerCase())) {
      newHeaders.set(key, value);
    }
  }
  
  newHeaders.set('host', new URL(targetUrl).host);
  newHeaders.set('accept-encoding', 'identity');
  
  newHeaders.delete('content-length');
  newHeaders.delete('set-cookie');
  
  return newHeaders;
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET(req: NextRequest) {
  return handleRequest(req);
}

export async function POST(req: NextRequest) {
  return handleRequest(req);
}

export async function PUT(req: NextRequest) {
  return handleRequest(req);
}

export async function DELETE(req: NextRequest) {
  return handleRequest(req);
}

export async function PATCH(req: NextRequest) {
  return handleRequest(req);
}

async function handleRequest(req: NextRequest) {
  const targetUrl = req.nextUrl.searchParams.get('url');
  const method = req.nextUrl.searchParams.get('method') || req.method;
  const params = req.nextUrl.searchParams.get('params');

  if (!targetUrl) {
    return NextResponse.json({ error: 'Missing target URL' }, { status: 400, headers: corsHeaders });
  }

  const url = new URL(targetUrl);
  
  if (params) {
    url.search = params;
  }

  try {
    const requestClone = req.clone();
    let requestBody: string | ArrayBuffer | null = null;
    
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method.toUpperCase())) {
      const contentType = req.headers.get('content-type') || '';
      
      try {
        if (contentType.includes('application/json')) {
          const jsonData = await requestClone.json().catch(() => null);
          if (jsonData !== null) {
            requestBody = JSON.stringify(jsonData);
          }
        } else if (contentType.includes('text/plain')) {
          requestBody = await requestClone.text().catch(() => null);
        } else if (contentType.includes('application/x-www-form-urlencoded')) {
          const formData = await requestClone.formData().catch(() => null);
          if (formData) {
            const params = new URLSearchParams();
            formData.forEach((value, key) => {
              params.append(key, value.toString());
            });
            requestBody = params.toString();
          }
        } else if (contentType.includes('multipart/form-data')) {
          requestBody = await requestClone.arrayBuffer().catch(() => null);
        } else {
          requestBody = await requestClone.text().catch(() => null);
        }
      } catch (error) {
        console.error('Error parsing request body:', error);
      }
    }

    const headers = buildHeaders(req.headers, targetUrl);
    
    const fetchOptions: RequestInit = {
      method,
      headers,
    };

    if (requestBody !== null) {
      fetchOptions.body = requestBody;
    }

    console.log(`Sending ${method} request to ${url.toString()}`);
    if (requestBody) {
      console.log(`With body type: ${typeof requestBody}`);
      if (typeof requestBody === 'string' && requestBody.length < 1000) {
        console.log(`Body content: ${requestBody}`);
      }
    }

    const response = await fetch(url.toString(), fetchOptions);

    const contentType = response.headers.get('content-type') || '';
    const baseContentType = contentType.split(';')[0].trim();

    const responseHeaders = {
      ...corsHeaders,
      'Cache-Control': 'no-store',
      'Content-Type': contentType,
    };

    if (baseContentType === 'application/json') {
      const jsonData = await response.json().catch(() => ({}));
      return NextResponse.json(jsonData, {
        status: response.status,
        headers: responseHeaders,
      });
    }
    
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return new NextResponse(null, {
        status: response.status,
        headers: responseHeaders,
      });
    }
    
    const buffer = Buffer.from(await response.arrayBuffer());
    return new NextResponse(buffer, {
      status: response.status,
      headers: responseHeaders,
    });
    
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Target URL not found or could not be processed', details: error instanceof Error ? error.message : String(error) }, 
      { status: 404, headers: corsHeaders }
    );
  }
}