FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat openssl
RUN corepack enable
WORKDIR /app

# ---------- deps ----------
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---------- builder ----------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Skip `prebuild` (needs a live DB). Generate client + build only.
RUN pnpm exec prisma generate \
 && pnpm exec next build

# ---------- runner ----------
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -S -g 1001 nodejs \
 && adduser  -S -u 1001 -G nodejs nextjs

# Copy the whole built app so prisma CLI + tsx are available at runtime
COPY --from=builder --chown=nextjs:nodejs /app ./

COPY --chown=nextjs:nodejs docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

USER nextjs
EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["pnpm", "start"]