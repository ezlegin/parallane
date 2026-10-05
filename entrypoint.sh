#!/bin/sh
set -e

echo "→ Running database migrations..."
prisma migrate deploy

echo "→ Seeding admin (idempotent)..."
node -e "
const { PrismaClient } = require('./prisma/generated/prisma/client');
const bcrypt = require('bcryptjs');
const { PrismaPg } = require('@prisma/adapter-pg');

async function main() {
  const adapter = new PrismaPg(
    { connectionString: process.env.DATABASE_URL },
    { max: 1 }
  );
  const prisma = new PrismaClient({ adapter });

  const email = process.env.ADMIN_EMAIL;
  const fullName = process.env.ADMIN_FULL_NAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !fullName || !password) {
    console.log('  ⚠ Admin envs missing, skipping.');
    await prisma.\$disconnect();
    return;
  }

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    console.log('  ✓ Admin already exists.');
    await prisma.\$disconnect();
    return;
  }

  await prisma.admin.create({
    data: {
      email,
      fullName,
      password: await bcrypt.hash(password, 10),
    },
  });

  console.log('  ✓ Admin created.');
  await prisma.\$disconnect();
}

main().catch((e) => {
  console.error('  ✗ Admin seed failed:', e.message);
  process.exit(1);
});
" || echo "  ⚠ Admin seed skipped (non-fatal)"

echo "→ Starting Next.js..."
exec node server.js