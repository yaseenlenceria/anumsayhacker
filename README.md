# Trading Signals Dashboard

A professional trading signals platform providing real-time binary options signals across multiple platforms.

## Features

- Real-time trading signals for 6+ platforms
- Advanced analytics and success rate tracking
- Multi-currency pair support
- Professional dark-themed UI
- Responsive design for all devices

## Deployment

### Netlify Deployment

1. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist/public`
   - Functions directory: `netlify/functions`

2. **Environment Variables:**
   No environment variables required for basic functionality.

3. **Redirects:**
   - API routes: `/api/*` → `/.netlify/functions/server/:splat`
   - SPA fallback: `/*` → `/index.html`

### Local Development

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:5000`

## Architecture

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js with serverless functions for Netlify
- **UI**: Tailwind CSS + Radix UI components
- **State**: TanStack Query for server state management

## Supported Platforms

- Quotex
- Pocket Option
- Binomo
- Olymp Trade
- IQ Option
- Expert Option

## API Endpoints

- `GET /api/platforms` - List all trading platforms
- `GET /api/signals` - Get recent trading signals
- `POST /api/signals/generate` - Generate new signal
- `GET /api/stats` - Get platform statistics
- `POST /api/auth/free-trial` - Start free trial
- `POST /api/auth/validate` - Validate access key

## License

MIT License