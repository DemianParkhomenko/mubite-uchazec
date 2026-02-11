# Multi-stage Dockerfile for Express backend
# Following best practices: multi-stage build, minimal layers, security

# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy workspace configuration
COPY package*.json ./
COPY tsconfig.base.json ./

# Copy shared packages
COPY packages/shared-types ./packages/shared-types
COPY packages/shared-config ./packages/shared-config

# Copy backend application
COPY apps/backend ./apps/backend

# Install all dependencies (including dev dependencies for building)
RUN npm ci --workspaces --if-present

# Build shared packages
RUN npm run build -w @mubite/shared-types
RUN npm run build -w @mubite/shared-config

# Build backend
RUN npm run build -w @mubite/backend

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

# Copy package files
COPY package*.json ./
COPY apps/backend/package.json ./apps/backend/
COPY tsconfig.base.json ./
COPY apps/backend/tsconfig.json ./apps/backend/

# Copy shared packages
COPY --from=builder /app/packages/shared-types/package.json ./packages/shared-types/
COPY --from=builder /app/packages/shared-types/dist ./packages/shared-types/dist
COPY --from=builder /app/packages/shared-config/package.json ./packages/shared-config/
COPY --from=builder /app/packages/shared-config/dist ./packages/shared-config/dist

# Copy built backend
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

# Install production dependencies only
RUN npm ci --omit=dev --workspaces --if-present

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
USER nodejs

EXPOSE 4000

CMD ["node", "apps/backend/dist/server.js"]
