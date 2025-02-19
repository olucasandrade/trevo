import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

const buildHeaders = (headers: Headers, targetUrl: string) => {
  const newHeaders = new Headers(headers);
  newHeaders.set('host', new URL(targetUrl).host);
  newHeaders.set("Accept-Encoding", "identity");
  newHeaders.delete('set-cookie');
  return newHeaders;
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET(req: NextRequest) {
  const targetUrl = req.nextUrl.searchParams.get('url');
  const method = req.nextUrl.searchParams.get('method')!;
  const params = req.nextUrl.searchParams.get('params')!

  if (!targetUrl) {
    return NextResponse.json({ error: 'Missing target URL' }, { status: 400 });
  }

  const url = new URL(targetUrl);
  url.search = params;

  try {
    const response = await fetch(url, {
      method,
      headers: buildHeaders(req.headers, targetUrl),
      redirect: 'follow',
      follow: 15,
    });

    const contentType = response.headers.get('content-type') || '';
    const baseContentType = contentType.split(';')[0].trim();

    if (baseContentType === 'application/json') {
      const jsonData = await response.json();
      return NextResponse.json(jsonData, {
        status: response.status,
        headers: {
          ...corsHeaders,
          'Cache-Control': 'no-store',
          'Content-Type': contentType,
        },
      });
    }
    
    const buffer = Buffer.from(await response.arrayBuffer());
    return new NextResponse(buffer, {
      status: response.status,
      headers: {
        ...corsHeaders,
        'Cache-Control': 'no-store',
        'Content-Type': contentType,
      },
    });
    
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Target URL not found or could not be processed' }, 
      { status: 404, headers: corsHeaders }
    );
  }
}