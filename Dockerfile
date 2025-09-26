# TanStack Start Application Dockerfile
FROM node:alpine AS builder
WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source code and build
COPY . .
RUN pnpm build

FROM node:alpine AS runner
WORKDIR /app

# Copy built application, dependencies, and server runner
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/server-runner.js ./server-runner.js

# Set environment to production
ENV NODE_ENV=production

EXPOSE 3000

# Use the server runner to start the application
CMD ["node", "server-runner.js"] 