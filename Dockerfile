# Cube Hell - Cloud Multiplayer Game
# Multi-stage Docker build for optimized production deployment

FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

FROM node:18-alpine

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

# Copy dependencies from builder
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules

# Copy application files
COPY --chown=nodejs:nodejs server.js ./
COPY --chown=nodejs:nodejs package.json ./
COPY --chown=nodejs:nodejs index.html ./
COPY --chown=nodejs:nodejs sketch.js ./
COPY --chown=nodejs:nodejs network-adapter.js ./
COPY --chown=nodejs:nodejs style.css ./
COPY --chown=nodejs:nodejs MyPWA.json ./
COPY --chown=nodejs:nodejs ajax ./ajax
COPY --chown=nodejs:nodejs libraries ./libraries

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the server
CMD ["node", "server.js"]
