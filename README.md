# Trading Signals Dashboard

A full-stack trading signals application with real-time signals for binary options trading platforms.

## Features

- Real-time trading signals for multiple platforms (Quotex, Pocket Option, Binomo, Olymp, IQ Option, Expert Option)
- Modern dark-themed UI with professional dashboard
- Multi-currency pair support (USD/BRL, USD/PKR, EUR/USD, etc.)
- Signal strength indicators and direction (CALL/PUT)
- Platform-specific success rate tracking
- Free trial system with access key authentication

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **UI**: Tailwind CSS + Radix UI components
- **Icons**: Lucide React

## Deployment

### For Netlify

1. Push to GitHub repository
2. Connect repository to Netlify
3. Set environment variables in Netlify dashboard:
   - `DATABASE_URL` - Your PostgreSQL connection string
4. Deploy will use `netlify.toml` configuration

### Environment Variables Required

- `DATABASE_URL` - PostgreSQL connection string

## Local Development

```bash
# Install dependencies
npm install

# Set up database
npm run db:push

# Start development server
npm run dev
```

## Project Structure

```
├── client/           # React frontend
├── server/           # Express backend
├── shared/           # Shared types and schemas
├── netlify/          # Netlify functions
└── dist/             # Build output
```

## API Endpoints

- `GET /api/platforms` - Get trading platforms
- `GET /api/signals` - Get current signals
- `GET /api/stats` - Get dashboard statistics
- `POST /api/auth/validate` - Validate access key
- `POST /api/auth/free-trial` - Start free trial

## License

MIT