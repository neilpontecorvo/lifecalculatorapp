# Life Expectancy Calculator

## Overview

This is a comprehensive life expectancy calculator application built with React, TypeScript, and Express.js. The application provides users with personalized life expectancy estimates based on scientific research and validated risk factors through a 13-question assessment.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom Material Design color scheme
- **State Management**: React hooks with React Query for server state
- **Build Tool**: Vite with custom configuration for development and production
- **PWA Support**: Service worker implementation with offline capabilities

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Build Process**: esbuild for server-side bundling

### Data Storage Solutions
- **Database**: PostgreSQL (configured via Drizzle)
- **ORM**: Drizzle ORM with Zod schema validation
- **Local Storage**: Browser localStorage for progress saving and results caching
- **In-Memory Storage**: Fallback MemStorage implementation for development

## Key Components

### Assessment Engine
- **Question Flow**: Multi-step form with progress tracking
- **Validation**: Real-time input validation with error handling
- **Risk Calculation**: Cox proportional hazards model implementation
- **Progress Saving**: Automatic progress persistence with 24-hour expiration

### UI Components
- **Responsive Design**: Mobile-first approach with touch gesture support
- **Theme System**: Light/dark mode with system preference detection
- **Material Design**: Google Material Icons and Roboto font integration
- **Accessibility**: ARIA labels and keyboard navigation support

### Calculation System
- **Scientific Accuracy**: Evidence-based risk coefficients and hazard ratios
- **Risk Factors**: Comprehensive assessment including smoking, diabetes, BMI, lifestyle
- **Confidence Intervals**: Statistical confidence ranges for predictions
- **Recommendations**: Personalized health improvement suggestions

## Data Flow

1. **User Assessment**: Step-by-step questionnaire with validation
2. **Risk Analysis**: Real-time calculation using scientific coefficients
3. **Result Generation**: Life expectancy calculation with confidence intervals
4. **Recommendations**: AI-driven health improvement suggestions
5. **Data Persistence**: Local storage for progress and results

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect
- **framer-motion**: Animation library for smooth transitions
- **date-fns**: Date manipulation utilities

### UI Dependencies
- **@radix-ui/***: Headless UI primitives for accessibility
- **class-variance-authority**: Type-safe variant styling
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library for UI elements

### Development Dependencies
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production
- **vite**: Build tool with HMR support

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with PostgreSQL 16
- **Hot Reload**: Vite dev server with React Fast Refresh
- **Database**: Automatic schema synchronization with Drizzle
- **Port Configuration**: Port 5000 for development server

### Production Build
- **Client**: Vite production build with optimization
- **Server**: esbuild bundling with external package handling
- **Static Assets**: Served via Express static middleware
- **PWA**: Service worker registration for offline support

### Replit Configuration
- **Autoscale Deployment**: Configured for automatic scaling
- **Environment Variables**: DATABASE_URL for PostgreSQL connection
- **Build Process**: npm run build with client and server bundling
- **Start Command**: npm run start for production server

## Changelog

```
Changelog:
- June 16, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```