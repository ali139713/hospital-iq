Re-seed the hospital database with fresh data.

Run the following steps in order:

1. First check the current record count:
```bash
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && nvm use 20.19.4 --silent
DATABASE_URL="file:./dev.db" node -e "
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const { PrismaClient } = require('@prisma/client');
const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });
Promise.all([prisma.hospital.count(), prisma.specialty.count()]).then(([h, s]) => {
  console.log('Before seed — Hospitals:', h, '| Specialties:', s);
  prisma.\$disconnect();
});
"
```

2. Run the seed script:
```bash
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && nvm use 20.19.4 --silent
DATABASE_URL="file:./dev.db" npx ts-node --compiler-options '{"module":"CommonJS","esModuleInterop":true}' prisma/seed.ts
```

3. Verify the new counts:
```bash
DATABASE_URL="file:./dev.db" node -e "
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const { PrismaClient } = require('@prisma/client');
const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });
Promise.all([prisma.hospital.count(), prisma.specialty.count()]).then(([h, s]) => {
  console.log('After seed — Hospitals:', h, '| Specialties:', s);
  prisma.\$disconnect();
});
"
```

Report the before/after counts and confirm the seed completed successfully.
