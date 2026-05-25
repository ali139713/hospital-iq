Check the current status of the hospital database.

Run the following and report results:

```bash
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && nvm use 20.19.4 --silent

DATABASE_URL="file:./dev.db" node -e "
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const { PrismaClient } = require('@prisma/client');
const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  const [total, emergency, publicH, privateH, semiGov, specialties] = await Promise.all([
    prisma.hospital.count(),
    prisma.hospital.count({ where: { emergency: true } }),
    prisma.hospital.count({ where: { type: 'public' } }),
    prisma.hospital.count({ where: { type: 'private' } }),
    prisma.hospital.count({ where: { type: 'semi-government' } }),
    prisma.specialty.count(),
  ]);
  
  const topRated = await prisma.hospital.findFirst({ orderBy: { rating: 'desc' }, select: { name: true, rating: true } });
  const avgRating = await prisma.hospital.aggregate({ _avg: { rating: true } });
  
  console.log(JSON.stringify({
    hospitals: { total, emergency, public: publicH, private: privateH, semiGov },
    specialties,
    topRated,
    avgRating: avgRating._avg.rating
  }, null, 2));
  
  await prisma.\$disconnect();
}

main().catch(console.error);
"
```

Format the output as a clean status report with:
- Hospital breakdown by type
- Emergency vs non-emergency split  
- Top-rated hospital
- Average rating across all hospitals
- Total specialties in the system
