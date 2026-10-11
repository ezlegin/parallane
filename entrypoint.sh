#!/bin/sh
set -e

echo "▶ prisma migrate deploy"
pnpm exec prisma migrate deploy

echo "▶ generateAdmin"
pnpm exec tsx prisma/generateAdmin.ts

echo "▶ starting app"
exec "$@"