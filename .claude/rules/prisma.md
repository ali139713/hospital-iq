---
globs: prisma/**
---

# Prisma Rules

- Never add `url = env("DATABASE_URL")` to `schema.prisma` datasource block — Prisma 7 requires driver adapters; URL goes in `prisma.config.ts` only
- Do not add `previewFeatures = ["driverAdapters"]` — this is no longer a preview feature in Prisma 7
- The runtime client uses `new PrismaBetterSqlite3({ url })` from `@prisma/adapter-better-sqlite3`; production swaps to a PostgreSQL adapter — no other code changes
- Run seed with: `DATABASE_URL="file:./dev.db" npx ts-node --compiler-options '{"module":"CommonJS","esModuleInterop":true}' prisma/seed.ts`
- After any schema change: `npx prisma generate` then `npx prisma migrate dev --name <description>`
