// Import the built server
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Try to import the built server
try {
  const serverPath = join(__dirname, '../../dist/index.js');
  const { handler } = await import(serverPath);
  export { handler };
} catch (error) {
  console.error('Failed to load server:', error);
  
  // Fallback handler
  export const handler = async (event, context) => {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Server failed to initialize' })
    };
  };
}