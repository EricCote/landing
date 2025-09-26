#!/usr/bin/env node

import { createServer } from 'node:http';
import serverHandler from './dist/server/server.js';

const port = process.env.PORT || 3000;

const server = createServer(async (req, res) => {
  try {
    const url = `http://${req.headers.host}${req.url}`;

    // Convert Node.js request to Web API Request
    const webRequest = new Request(url, {
      method: req.method,
      headers: Object.fromEntries(
        Object.entries(req.headers).filter(
          ([key, value]) => value !== undefined && value !== null
        )
      ),
      body:
        req.method !== 'GET' && req.method !== 'HEAD'
          ? await streamToBuffer(req)
          : undefined,
    });

    // Get response from the handler
    const response = await serverHandler.fetch(webRequest);

    // Convert Web API Response back to Node.js response
    res.statusCode = response.status;

    // Set headers
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }

    // Stream the response body
    if (response.body) {
      const reader = response.body.getReader();

      const pump = async () => {
        const { done, value } = await reader.read();
        if (done) {
          res.end();
          return;
        }
        res.write(Buffer.from(value));
        return pump();
      };

      await pump();
    } else {
      res.end();
    }
  } catch (error) {
    console.error('Server error:', error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Internal Server Error');
    }
  }
});

// Helper function to convert Node.js readable stream to buffer
async function streamToBuffer(stream) {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}

server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('📱 Received SIGTERM, shutting down gracefully...');
  server.close(() => {
    console.log('👋 Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('📱 Received SIGINT, shutting down gracefully...');
  server.close(() => {
    console.log('👋 Server closed');
    process.exit(0);
  });
});
