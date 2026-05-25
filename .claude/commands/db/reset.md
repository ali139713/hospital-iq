Reset the database completely and re-seed with fresh data.

⚠️  This destroys all existing data. Confirm before proceeding by asking the user: "This will wipe dev.db and re-seed from scratch. Proceed? (yes/no)"

If confirmed, run these steps in order:

```bash
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && nvm use 20.19.4 --silent

# Step 1: Wipe and re-migrate
npx prisma migrate reset --force

# Step 2: Re-seed
DATABASE_URL="file:./dev.db" npx ts-node --compiler-options '{"module":"CommonJS","esModuleInterop":true}' prisma/seed.ts

# Step 3: Verify
DATABASE_URL="file:./dev.db" node -e "
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const { PrismaClient } = require('@prisma/client');
const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });
Promise.all([prisma.hospital.count(), prisma.specialty.count()]).then(([h, s]) => {
  console.log('Reset complete — Hospitals:', h, '| Specialties:', s);
  prisma.\$disconnect();
});
"
```

Report the final counts to confirm a clean state.
