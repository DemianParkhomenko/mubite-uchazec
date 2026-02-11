# MUBITE TESTING CHALLENGE - SOLUTION

A modular monolith application built with Next.js 16, Express, and Clean Architecture principles.

## 🏗️ Architecture

This solution implements a **modular monolith** architecture following **SOLID**, **GRASP**, and **GOF** design patterns:

### Project Structure

```
mubite-uchazec/
├── packages/                    # Shared packages
│   ├── shared-types/           # Domain models, DTOs, error types
│   ├── shared-config/          # Logger & environment config
│   └── shared-theme/           # Tailwind theme configuration
├── apps/
│   ├── backend/                # Express backend (Port 4000)
│   │   └── src/
│   │       ├── modules/albums/ # Album feature module (DDD layers)
│   │       │   ├── domain/     # Entities, repository interfaces
│   │       │   ├── application/# Use cases, services
│   │       │   ├── infrastructure/ # HTTP client, repositories
│   │       │   └── presentation/   # Controllers, routes
│   │       ├── core/           # DI container, config, health
│   │       └── shared/         # Error handling, middleware
│   └── frontend/               # Next.js frontend (Port 3000)
│       └── src/
│           ├── modules/albums/ # Album feature module
│           │   ├── application/# Services
│           │   ├── infrastructure/ # API client, repositories
│           │   └── presentation/   # Components
│           ├── shared/         # Reusable UI components
│           └── core/           # DI, config
└── docker/                     # Docker configs
```

### Key Design Patterns

- **Repository Pattern**: Abstracts data access
- **Dependency Injection**: InversifyJS (backend), Factory functions (frontend)
- **Layered Architecture**: Domain → Application → Infrastructure → Presentation
- **Clean Architecture**: Dependencies point inward
- **SOLID Principles**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **GRASP Patterns**: Information Expert, Creator, Controller, High Cohesion, Low Coupling

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- Docker & Docker Compose (optional)
- npm 10+

### Option 1: Local Development (Recommended for Development)

```bash
npm start
```

This single command:

1. Installs all dependencies
2. Generates `.env.local` files from examples
3. Builds all shared packages
4. Starts backend on http://localhost:4000
5. Starts frontend on http://localhost:3000

**Stop**: Press `Ctrl+C`

### Option 2: Docker Production

```bash
# Build Docker images
npm run docker:build

# Start services
npm run docker:up
```

Access the application:

- Frontend: http://localhost:3000
- Backend: http://localhost:4000
- Health check: http://localhost:4000/health

Stop services:

```bash
npm run docker:down
```

## 📋 Features

- ✅ Next.js 16 with App Router (Server Components)
- ✅ Express backend with RESTful API
- ✅ TypeScript strict mode throughout
- ✅ Tailwind CSS 4 with custom theme system
- ✅ Clean Architecture (Domain-Driven Design)
- ✅ Repository Pattern
- ✅ Dependency Injection
- ✅ Error boundaries and handling
- ✅ Docker multi-stage builds
- ✅ Health checks
- ✅ Modular monolith structure
- ✅ Reusable components

## 🧪 Testing

### Manual Testing

1. **Backend Health Check:**

   ```bash
   curl http://localhost:4000/health
   ```

2. **Backend API:**

   ```bash
   # Get all albums
   curl http://localhost:4000/api/albums

   # Get specific album
   curl http://localhost:4000/api/albums/1
   ```

3. **Frontend:**
   - Open http://localhost:3000
   - Verify albums are displayed in a grid
   - Check responsive design (mobile, tablet, desktop)
   - Test dark mode (system preference)

### Data Flow

```
Browser → Next.js Server Component → Album Service
    ↓
Frontend Repository → API Client
    ↓
Backend API (Express) → Album Controller
    ↓
Use Case → Application Service
    ↓
Repository → HTTP Client
    ↓
JSONPlaceholder API
```

## 🎨 Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Backend**: Express, TypeScript, Axios, InversifyJS
- **Validation**: Zod
- **Containerization**: Docker, Docker Compose
- **Architecture**: Clean Architecture, DDD, SOLID

## 📦 Monorepo Workspaces

This project uses npm workspaces:

- `@mubite/shared-types` - Shared TypeScript types
- `@mubite/shared-config` - Configuration utilities
- `@mubite/shared-theme` - Tailwind theme
- `@mubite/backend` - Express backend
- `@mubite/frontend` - Next.js frontend

## 🔧 Development Scripts

```bash
# Root level
npm run dev          # Start all services in dev mode
npm run build        # Build all packages and apps
npm run typecheck    # Type check all workspaces
npm run lint         # Lint all workspaces

# Backend
npm run dev -w @mubite/backend
npm run build -w @mubite/backend

# Frontend
npm run dev -w @mubite/frontend
npm run build -w @mubite/frontend
```

## 🐳 Docker

### Production Build

- Multi-stage builds for minimal image size
- Non-root user for security
- Health checks for orchestration
- Optimized layer caching

### Development Build

- Hot reload with volume mounts
- Debug port exposed (9229)
- Source maps enabled

## 📝 Environment Variables

**Backend** (`.env.local`):

```env
NODE_ENV=development
PORT=4000
EXTERNAL_API_URL=https://jsonplaceholder.typicode.com
LOG_LEVEL=debug
ALLOWED_ORIGINS=http://localhost:3000
```

**Frontend** (`.env.local`):

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
```

## 🏛️ Architecture Principles

### Backend (Express)

- **Modular Monolith**: Clear module boundaries
- **Dependency Injection**: InversifyJS for loose coupling
- **Layered Architecture**: Domain, Application, Infrastructure, Presentation
- **Repository Pattern**: Abstract data access
- **Use Cases**: Encapsulate business operations

### Frontend (Next.js)

- **Server Components**: SSR for better performance
- **Repository Pattern**: Consistent with backend
- **Factory Functions**: Simple DI for React
- **Component Composition**: Reusable UI components
- **Error Boundaries**: Graceful error handling

---

## Original Requirements

- ✅ Fork the repo
- ✅ Use endpoint https://jsonplaceholder.typicode.com/albums
- ✅ Create Next.js app calling the endpoint
- ✅ Show list of albums
- ✅ Use Tailwind for styling
- ✅ Create monorepo with frontend and API backend
- ✅ Bridge between server components and backend endpoint
- ✅ Use Express framework for backend
- ✅ Dockerize with Docker and Docker Compose
- ✅ Create services for production and local development
- ✅ Use Next.js App Router

**Built with ❤️ using Clean Architecture principles**
