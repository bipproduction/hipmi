# ==============================
# Stage 1: Builder
# ==============================
FROM node:20-bookworm-slim AS builder

WORKDIR /app

# Install system deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    libc6 \
    git \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Copy dependency files first (for better caching)
COPY package.json package-lock.json* bun.lockb* ./

ENV SHARP_IGNORE_GLOBAL_LIBVIPS=1
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=4096"

# 🔥 Skip postinstall scripts (fix onnxruntime error)
RUN npm install --legacy-peer-deps --ignore-scripts

# Copy full source
COPY . .

# Use .env.example as build env
# (Pastikan file ini ada di project)
RUN cp .env.example .env || true

# Generate Prisma Client
ENV PRISMA_CLI_BINARY_TARGETS=debian-openssl-3.0.x
RUN npx prisma generate

# Build Next.js
RUN npm run build

# ==============================
# Stage 2: Runner (Production)
# ==============================
FROM node:20-bookworm-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN groupadd --system --gid 1001 nodejs \
    && useradd --system --uid 1001 --gid nodejs nextjs

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]