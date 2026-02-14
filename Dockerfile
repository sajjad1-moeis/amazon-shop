# Multi-stage build for Next.js application
# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package files (package-lock.json optional)
COPY package.json ./
COPY package-lock.json* ./

# Install dependencies with timeout and retry
# Using --legacy-peer-deps to resolve React 19 compatibility issues
RUN npm config set registry https://registry.npmmirror.com && \
    npm install --legacy-peer-deps --timeout=300000 --retries=3 || \
    (npm config set registry https://registry.npmjs.org && npm install --legacy-peer-deps --timeout=300000 --retries=3)

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build arguments for environment variables at build time
ARG NEXT_PUBLIC_BASE_URL=http://107.161.175.45
ARG NEXT_PUBLIC_API_URL=http://107.161.175.45:8080/api
ARG NEXT_TELEMETRY_DISABLED=1
ARG NODE_ENV=production

# Set environment variables for build (NEXT_PUBLIC_* are baked into the client bundle)
ENV NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED}
ENV NODE_ENV=${NODE_ENV}
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Build the application
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy necessary files from builder
# Standalone output includes .next/standalone with all necessary files
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Healthcheck using node (already installed, no need for wget)
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)}).on('error', () => process.exit(1))"

# Start the application
CMD ["node", "server.js"]
