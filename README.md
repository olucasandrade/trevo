# Trevo

A modern CORS proxy API and API testing tool built with Next.js and TypeScript.

## Overview

Trevo is an open-source API proxy and testing tool designed to bypass CORS restrictions and make interacting with APIs seamless. It acts as an intermediary between your frontend application and external APIs, handling all HTTP methods including GET, POST, PUT, PATCH, and DELETE with proper request body forwarding.

## Features

- **CORS Proxy**: Bypass Cross-Origin Resource Sharing restrictions when making API requests
- **Support for All HTTP Methods**: Handles GET, POST, PUT, PATCH, and DELETE requests
- **Request Body Forwarding**: Properly forwards request bodies for all methods
- **Content Type Support**: Handles JSON, form data, and plain text request bodies
- **Testing Interface**: Built-in UI for testing API requests
- **Response Inspection**: View detailed response information including headers, status, and body
- **SEO Optimized**: Includes metadata, structured data, sitemap, robots.txt, and manifest for better search engine visibility
- **API Documentation**: Comprehensive documentation for the API endpoints
- **PWA Ready**: Progressive Web App support with manifest and icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/olucasandrade/trevo.git
cd trevo
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000/test](http://localhost:3000/test) to access the API testing interface.
Visit [http://localhost:3000/api](http://localhost:3000/api) to view the API documentation.

## Usage

### Using the Proxy API

To use the CORS proxy, make requests to:

```
http://localhost:3000/api?url=YOUR_TARGET_URL
```

Example:
```javascript
// Making a POST request through the proxy
fetch('http://localhost:3000/api?url=https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ key: 'value' })
})
.then(response => response.json())
.then(data => console.log(data));
```

### Testing Interface

The built-in testing interface at `/test` allows you to:

1. Select HTTP methods (GET, POST, PUT, PATCH, DELETE)
2. Enter target URLs
3. Choose body types (JSON, Form URL Encoded, Plain Text)
4. Send requests and view detailed responses
5. Toggle body inclusion for DELETE requests

## SEO Features

Trevo includes several SEO optimizations:

- **Metadata**: Comprehensive metadata for all pages
- **Open Graph**: Social media sharing metadata
- **Structured Data**: JSON-LD structured data for better search engine understanding
- **Sitemap**: Automatically generated sitemap.xml
- **Robots.txt**: Properly configured robots.txt file
- **Web App Manifest**: PWA support with manifest.json
- **Semantic HTML**: Proper HTML structure with semantic elements
- **API Documentation**: SEO-friendly documentation page

## Project Structure

```
trevo/
├── src/
│   ├── app/
│   │   ├── api/        # CORS proxy API implementation and documentation
│   │   ├── services/   # API service utilities
│   │   ├── test/       # Testing interface
│   │   ├── sitemap.ts  # Sitemap generator
│   │   ├── robots.ts   # Robots.txt generator
│   │   └── manifest.ts # Web app manifest generator
│   └── components/     # Reusable components
├── public/
│   └── seo/            # SEO-related assets and icons
```

## Integration

You can easily integrate Trevo with your existing applications:

1. Deploy Trevo to your preferred hosting platform
2. Use the API endpoint in your frontend applications to bypass CORS restrictions
3. Link to the testing interface for your team to debug API requests

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have questions or need help, please:
- Open an issue
- Reach out to the maintainers
