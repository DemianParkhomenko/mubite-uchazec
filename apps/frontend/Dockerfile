# Multi-stage Dockerfile for Next.js frontend
# Following best practices: multi-stage build, minimal layers, security

# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy workspace configuration
COPY package*.json ./
COPY tsconfig.base.json ./

# Copy shared packages
COPY packages/shared-types ./packages/shared-types
COPY packages/shared-theme ./packages/shared-theme

# Copy frontend application
COPY apps/frontend ./apps/frontend

# Install all dependencies
RUN npm ci --workspaces --if-present

# Build shared packages (shared-theme doesn't need build, it's TypeScript source)
RUN npm run build -w @mubite/shared-types

# Set environment variable for Next.js build
ARG NEXT_PUBLIC_BACKEND_URL=http://backend:4000
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

# Build frontend
RUN npm run build -w @mubite/frontend

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

# Copy package files
COPY package*.json ./
COPY apps/frontend/package.json ./apps/frontend/

# Copy shared packages
COPY --from=builder /app/packages/shared-types/package.json ./packages/shared-types/
COPY --from=builder /app/packages/shared-types/dist ./packages/shared-types/dist
COPY --from=builder /app/packages/shared-theme ./packages/shared-theme

# Copy built Next.js application
COPY --from=builder /app/apps/frontend/.next ./apps/frontend/.next
COPY --from=builder /app/apps/frontend/public ./apps/frontend/public
COPY --from=builder /app/apps/frontend/next.config.ts ./apps/frontend/

# Install production dependencies
RUN npm ci --omit=dev --workspace=@mubite/frontend

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 3000

CMD ["npm", "run", "start", "-w", "@mubite/frontend"]
