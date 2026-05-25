Add a new hospital to the Lahore hospital database.

Hospital details provided: $ARGUMENTS

If no details are provided, ask the user for: name, type (public/private/semi-government), area, address, phone, emergency (yes/no), beds, rating (1-5), timings, established year, and specialties (name + rating pairs).

Steps:

## Step 1 — Add to seed script
Read `prisma/seed.ts`. Find the last `prisma.hospital.create()` call and append a new one immediately after it, following the exact same structure. Use realistic Lahore coordinates (lat around 31.4–31.6, lng around 74.2–74.5).

## Step 2 — Re-seed the database
```bash
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && nvm use 20.19.4 --silent
DATABASE_URL="file:./dev.db" npx ts-node --compiler-options '{"module":"CommonJS","esModuleInterop":true}' prisma/seed.ts
```

## Step 3 — Verify
```bash
DATABASE_URL="file:./dev.db" node -e "
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const { PrismaClient } = require('@prisma/client');
const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });
prisma.hospital.count().then(c => { console.log('Total hospitals:', c); prisma.\$disconnect(); });
"
```

Report the new hospital's name and the updated total count.
