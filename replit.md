# Trading Signals Dashboard

## Overview

This is a full-stack trading signals application built with React, Express.js, and PostgreSQL. The application provides real-time trading signals for binary options across multiple platforms including Quotex, Pocket Option, Binomo, Olymp, IQ Option, and Expert Option. It features a modern dark-themed UI with professional trading dashboard components.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Custom components built with Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Component Library**: Shadcn/ui components with New York style

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API design
- **Development**: TSX for TypeScript execution in development
- **Production Build**: esbuild for optimized server bundling

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with Neon serverless driver
- **Migrations**: Drizzle Kit for schema management
- **Schema**: Centralized in `shared/schema.ts` for type consistency

## Key Components

### Trading Signal System
- Real-time signal generation and display
- Support for multiple currency pairs (USD/BRL, USD/PKR, EUR/USD, etc.)
- Signal strength indicators (0-100 scale)
- Direction indicators (CALL/PUT)
- Time frame support (5s to 5m)
- Platform-specific signal routing

### Platform Management
- Multi-platform support with individual success rate tracking
- Platform-specific icons and branding
- Active/inactive platform status management
- Success rate analytics and display

### User Interface Components
- **Header**: Navigation with branding and responsive mobile menu
- **Hero**: Landing section with live statistics
- **Platforms**: Grid display of supported trading platforms
- **Signals Dashboard**: Real-time signal feed with filtering
- **Performance**: Analytics and success rate visualization
- **Signal History**: Historical signal data with results
- **CTA**: Call-to-action sections for user engagement

### Storage Abstraction
- Interface-based storage design (`IStorage`)
- In-memory storage implementation for development
- Prepared for database integration with consistent API

## Data Flow

1. **Signal Generation**: Mock signals generated via API endpoint `/api/signals/generate`
2. **Real-time Updates**: React Query polls for new signals every 5 seconds
3. **Filtering**: Client-side filtering by platform, currency pair, and strength
4. **Display**: Responsive dashboard with real-time updates and visual indicators
5. **History**: Persistent signal history with win/loss tracking

## External Dependencies

### Core Dependencies
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe ORM for database operations
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **wouter**: Lightweight React router
- **date-fns**: Date manipulation utilities

### UI Dependencies
- **@radix-ui/***: Comprehensive set of unstyled UI primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Modern icon library
- **class-variance-authority**: Component variant management

### Development Dependencies
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production
- **vite**: Frontend build tool and dev server

## Deployment Strategy

### Development
- **Command**: `npm run dev`
- **Port**: 5000 (configured in .replit)
- **Hot Reload**: Vite HMR with React Fast Refresh
- **Database**: Environment variable `DATABASE_URL` required

### Production Build
- **Build Command**: `npm run build`
- **Build Process**: 
  1. Vite builds client assets to `dist/public`
  2. esbuild bundles server code to `dist/index.js`
- **Start Command**: `npm run start`
- **Deployment**: Replit autoscale deployment target

### Database Management
- **Push Schema**: `npm run db:push` (Drizzle Kit)
- **Migrations**: Stored in `./migrations` directory
- **Connection**: PostgreSQL via Neon serverless driver

## Recent Changes

- **Netlify Deployment Fixed**: Corrected build command and verified deployment configuration
- **Static Build Optimization**: Removed Replit dependencies from production builds
- **GitHub Integration**: Added comprehensive deployment guide and Git configuration
- **Serverless API**: Created Express.js functions for Netlify Functions
- **CORS & Security**: Configured proper headers for cross-origin requests
- **Mock Data System**: Implemented working API with realistic trading data
- **Password Protection System**: Implemented access key authentication for paid users only
- **Secret Admin Panel**: Created hidden admin interface at /123admin to generate and manage access keys
- **Login Page**: Beautiful login page with access key validation
- **Authentication Wrapper**: All pages now require valid access keys except login and admin
- **Free Trial System**: 20-minute trials with IP-based restrictions and automatic login
- **Key Management**: Generate keys with descriptions, expiry dates, and usage tracking
- **Pakistani Localization**: Added Pakistani names and PKR currency amounts in live notifications
- **Complete Page Set**: Added FAQ, Support, Contact, Terms of Service, Privacy Policy pages
- **Risk Warnings**: Added appropriate risk disclaimers throughout the platform

## Changelog

```
Changelog:
- June 22, 2025. Initial setup with trading signals dashboard
- June 22, 2025. Added individual platform pages with buy/sell signals and live notifications
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```