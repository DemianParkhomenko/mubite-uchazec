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
