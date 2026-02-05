# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is Trevo

Trevo is a CORS proxy API and API testing tool. It allows frontend applications to bypass CORS restrictions by proxying requests through `/api?url=TARGET_URL`. The app includes a built-in testing UI for sending HTTP requests and inspecting responses.

## Development Commands

```bash
npm run dev       # Start dev server with Turbopack (http://localhost:3000)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Architecture

### Tech Stack
- **Next.js 15** with App Router and Turbopack
- **Mantine v7** for UI components
- **TanStack Query** for client-side state (history, saved requests)
- **next-intl** for i18n (English/Portuguese)
- **Tailwind CSS** + **Framer Motion** for styling and animations

### Key Directories

```
src/
├── app/
│   ├── api/route.ts           # CORS proxy endpoint - handles all HTTP methods
│   ├── [locale]/              # i18n route segment (en/pt)
│   │   ├── layout.tsx         # Root layout with providers
│   │   └── page.tsx           # Main testing interface
│   ├── components/            # UI components (RequestPanel, ResponsePanel, etc.)
│   ├── hooks/                 # Custom hooks (useRequestHistory, useSavedRequests)
│   ├── services/apiService.ts # Client-side request handling via axios
│   └── providers/             # MantineProvider, QueryProvider
├── i18n/
│   ├── routing.ts             # Locale configuration
│   └── request.ts             # Server-side i18n setup
messages/
├── en.json                    # English translations
└── pt.json                    # Portuguese translations
```

### Core Flows

**Proxy Request Flow:**
1. Client calls `/api?url=TARGET_URL&method=METHOD&params=PARAMS`
2. `src/app/api/route.ts` receives request, extracts target URL and body
3. Proxy forwards request with safe headers (accept, content-type, authorization, user-agent)
4. Response returned with CORS headers (`Access-Control-Allow-Origin: *`)

**Client Request Flow:**
1. `apiService.ts` wraps requests via axios to `/api` endpoint
2. `useRequestHistory` hook stores requests in localStorage (max 50 items)
3. `useSavedRequests` hook persists named requests for reuse

### Path Alias
Use `@/*` for imports from `src/` directory (configured in tsconfig.json).

## i18n

- Supported locales: `en` (default), `pt`
- Translation files: `messages/{locale}.json`
- All pages use `[locale]` dynamic segment
- Middleware (`middleware.ts`) handles locale detection and routing
