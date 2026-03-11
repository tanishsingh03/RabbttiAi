# ─── Stage 1: Builder ────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests first to leverage Docker layer caching
COPY package.json package-lock.json* ./

# Install production dependencies only
RUN npm ci --omit=dev

# ─── Stage 2: Production Runtime ─────────────────────────────────────────────
FROM node:20-alpine AS runtime

# Create a non-root user for security
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

WORKDIR /app

# Copy installed node_modules from builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy application source
COPY . .

# Create uploads directory and set ownership
RUN mkdir -p uploads && chown -R appuser:appgroup /app

USER appuser

# Expose the application port
EXPOSE 5000

# Health check so Docker (and Compose) know when the service is ready
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:5000/health || exit 1

# Start the server
CMD ["node", "server.js"]
