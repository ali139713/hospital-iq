# Hospital IQ 🏥

AI-powered hospital analytics platform — ask questions in natural language, get back interactive maps, charts, and data cards in real time.

🚀 **Live Demo:** [hospital-iq.vercel.app](https://hospital-iq.vercel.app)

---

## What is this?

Hospital IQ is a take-home assignment built entirely using **Claude Code** — the goal was to explore how far you can push Claude Code as a real engineering tool, not just a code autocomplete.

The app lets you query hospital data through a conversational AI interface and get back structured, visual responses — maps, charts, and cards — without writing a single SQL query manually.

---

## Claude Code Features Used

This project was a thorough test of the Claude Code feature set:

### 🪝 Hooks (`.claude/settings.json`)
| Hook | Trigger | What it did |
|------|---------|-------------|
| SessionStart | Every new session | Checked Node version, dev.db existence, API key |
| PreToolUse(Bash) | Before shell commands | Logged command context |
| PostToolUse(Edit\|Write) | After file edits | Auto-ran `npm run lint:fix` |
| Stop | Session end | Reminded to run typecheck + tests |

### 💬 Slash Commands (`.claude/commands/`)
- `/seed-db` — re-seeded the SQLite/Postgres DB
- `/add-tool` — scaffolded new AI tools + UI components
- `/add-hospital` — added hospitals to seed data
- `/check-costs` — analysed prompt caching savings
- `/test-guardrails` — verified all 5 guardrail layers
- `/db:reset` — wiped and re-seeded the database
- `/db:status` — showed hospital counts and breakdowns

### 📋 Path-Scoped Rules (`.claude/rules/`)
Auto-activated based on the file being edited:
- `components.md` — enforced named exports, no Prisma in components, ErrorBoundary required
- `api-routes.md` — enforced rate limit first, requestId logging, maxSteps
- `tests.md` — enforced Vitest only, no DB mocks
- `prisma.md` — enforced no url in schema.prisma, Prisma 7 adapter pattern

### 🤖 Subagents
- `claude-code-guide` — used for Claude API / SDK questions
- `Explore` — fast read-only codebase search
- `Plan` — architecture planning before implementation
- `general-purpose` — multi-step research tasks

### ✅ Task Tracking
- `TaskCreate` — created structured task lists for multi-step work
- `TaskUpdate` — tracked pending → in_progress → completed

### 📝 CLAUDE.md System
- **Global** (`~/.claude/CLAUDE.md`) — personal preferences applied to all projects
- **Project** (`hospital-iq/CLAUDE.md`) — project-specific architecture, conventions, commands
- `@import` — imported `.claude/architecture.md` into the main CLAUDE.md

---

## Tech Stack

- **Framework:** Next.js 14 + TypeScript
- **Database:** Prisma + SQLite (dev) / PostgreSQL (prod)
- **AI:** Claude API (Anthropic)
- **Testing:** Vitest
- **Infrastructure:** Docker + GitHub Actions CI/CD
- **Deployment:** Vercel

---

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY

# Seed the database
npm run db:seed

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Running Tests

```bash
npm run test
```

---

## Contributing

Feel free to open a PR or drop a star if you found this useful. Particularly interested in ideas around:
- Better prompt caching strategies
- Improved guardrail layers
- Additional AI tool scaffolding patterns

---

## Author

**Ali Abdullah Azhar** — Senior Full-Stack Engineer, Toptal Top 3%

[LinkedIn](https://linkedin.com/in/ali-abdullah-azhar-5387671b1) · [Toptal](https://www.toptal.com/resume/ali-abdullah-azhar) 
