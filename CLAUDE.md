# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Claude Code Configuration

### Path-scoped Rules (`.claude/rules/`)

Rules that activate automatically based on which file you're editing:

| Rule file | Applies to | Key constraint |
|---|---|---|
| `components.md` | `src/components/**/*.tsx` | Named exports, no Prisma imports, ErrorBoundary required |
| `api-routes.md` | `src/app/api/**/*.ts` | Rate limit first, log requestId, set maxSteps |
| `tests.md` | `tests/**/*.ts` | Vitest only, no DB mocks, one concern per file |
| `prisma.md` | `prisma/**` | Never add `url` to schema.prisma, Prisma 7 adapter pattern |

### Hooks (`.claude/settings.json`)

| Event | Trigger | Action |
|---|---|---|
| `SessionStart` | Every new session | Checks Node version, DB file, API key |
| `PreToolUse(Bash)` | Before any shell command | Logs command context |
| `PostToolUse(Edit\|Write)` | After any file edit | Auto-runs `npm run lint:fix` |
| `Stop` | Session ends | Reminds to run typecheck + tests |

### Custom Slash Commands

Project-specific commands are in `.claude/commands/`. Type these directly in Claude Code:

| Command | What it does |
|---|---|
| `/seed-db` | Re-seeds the SQLite database with 30 Lahore hospitals |
| `/add-tool <name>` | Scaffolds a new AI tool + UI component (updates 4 files) |
| `/add-hospital <details>` | Adds a hospital to seed data and re-seeds |
| `/check-costs` | Analyses prompt caching savings and projects daily/monthly API costs |
| `/test-guardrails` | Verifies all 5 guard rail layers are working |
| `/db:reset` | Wipes and re-seeds the database (asks for confirmation) |
| `/db:status` | Shows hospital counts, type breakdown, average ratings |

## npm Commands

```bash
# Development
npm run dev              # Start dev server (Node 20 required — use nvm use 20.19.4)
npm run build            # Production build
npm run lint:fix         # Auto-fix ESLint issues (runs automatically on file save via hook)
npm run typecheck        # TypeScript check with no emit

# Testing
npm test                 # Run all Vitest tests once
npm run test:watch       # Watch mode
npx vitest run tests/validate.test.ts  # Run a single test file

# Database
npm run db:generate      # Regenerate Prisma client after schema changes
npm run db:migrate       # Apply schema migrations (creates dev.db if absent)
npm run db:seed          # Seed 30 Lahore hospitals (destroys existing data first)
npm run db:studio        # Open Prisma Studio at localhost:5555
npm run db:reset         # Wipe DB, re-migrate, re-seed
```

**First-run setup:**
```bash
nvm use 20.19.4
npm install
DATABASE_URL="file:./dev.db" npx prisma migrate dev --name init
DATABASE_URL="file:./dev.db" npx ts-node --compiler-options '{"module":"CommonJS","esModuleInterop":true}' prisma/seed.ts
npm run dev
```

## Architecture

@import .claude/architecture.md

### Tool ↔ Component Coupling

**Adding any tool requires changes in 3 places:**
1. `src/lib/ai/tools.ts` — tool definition + Zod schema + DB query
2. `src/types/hospital.ts` — result type for the tool
3. `src/components/chat/MessageItem.tsx` — `case 'toolName':` → render component

### Key Files

- **`src/app/api/v1/chat/route.ts`** — streaming endpoint; rate limit → validate → streamText → log token cost
- **`src/lib/ai/system-prompt.ts`** — two-block system prompt; second block has `cacheControl: ephemeral` (Anthropic prompt caching — 85% cheaper after first call)
- **`src/lib/db/client.ts`** — Prisma singleton using `PrismaBetterSqlite3` adapter (Prisma 7 requires driver adapters; no `url` in schema.prisma)
- **`src/lib/middleware/rate-limit.ts`** — in-memory rate limiter; swap `checkRateLimit` for Upstash Redis in production
- **`src/env.ts`** — `@t3-oss/env-nextjs` validation; app refuses to start with missing env vars
- **`src/components/chat/MessageItem.tsx`** — renders text OR tool component; uses `next/dynamic` for lazy loading; `HospitalMap` has `ssr: false` (Leaflet requires browser APIs)
- **`.claude/settings.json`** — post-edit hook runs `npm run lint:fix` automatically

### Prisma 7 Quirks

Prisma 7 removed `url = env(...)` from `schema.prisma`. The database URL is now in `prisma.config.ts` (CLI) and passed via `new PrismaBetterSqlite3({ url })` (runtime). Never add `url` back to `schema.prisma`.

The seed script must be run with `ts-node --compiler-options '{"module":"CommonJS","esModuleInterop":true}'`.

### Cost Optimisation

- Model: `claude-haiku-4-5-20251001` (~$0.80/MTok in, ~$4/MTok out)
- Prompt caching on the system prompt's tool-reference block — cached after first request
- `maxSteps: 3` caps agentic loops
- Token usage + estimated USD cost logged per request via pino (`event: "chat_complete"`)

### Guard Rails

- **Layer 1**: System prompt instructs Claude to refuse off-topic queries with a fixed phrase
- **Layer 2**: Zod validates request shape — max 50 messages, max 1000 chars each, last message must be `role: "user"`
- **Layer 3**: Rate limiter — 10 requests/min/IP (uses `x-forwarded-for`; ensure reverse proxy sets this header correctly)
- **Layer 4**: `ErrorBoundary` wraps every hospital component
- **Layer 5**: `maxSteps: 3` prevents runaway multi-step tool chains

### Security Headers

`next.config.ts` sets CSP that allows OpenStreetMap tile domains for Leaflet maps and `unsafe-inline` styles (required by Leaflet's dynamic marker rendering). Do not tighten `style-src` without testing maps.

## Environment Variables

```bash
ANTHROPIC_API_KEY=sk-ant-...          # Required — get from console.anthropic.com
DATABASE_URL=file:./dev.db            # SQLite for dev; PostgreSQL URL for production
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

Production PostgreSQL: set `DATABASE_URL=postgresql://...` — no code changes needed (Prisma adapter handles it).
