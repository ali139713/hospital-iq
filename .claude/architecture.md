# Architecture Reference

## Generative UI Data Flow

```
POST /api/v1/chat
  → SessionStart hook (env check)
  → rate-limit check (10 req/min/IP)
  → Zod validation (max 50 msgs, 1000 chars each)
  → streamText(claude-haiku-4-5, tools, system-prompt-with-cache)
       └─ system prompt block 2 has cacheControl: ephemeral (85% cost reduction)
  → tool execute() → prisma.hospital.findMany(...)
  → toDataStreamResponse()
  → useChat() client picks up stream
  → MessageItem: switch(toolName) → renders component
```

## Tool ↔ Component Map

| Tool | Component | Trigger phrase |
|---|---|---|
| `searchHospitals` | `<HospitalGrid>` | "hospitals with X", "find" |
| `showHospitalDetail` | `<HospitalDetailCard>` | "tell me about X" |
| `showHospitalMap` | `<HospitalMap>` | "show on map", "where is" |
| `showSpecialtyStats` | `<SpecialtyChart>` | "stats", "how many", "analytics" |
| `showEmergencyHospitals` | `<EmergencyList>` | "emergency", "urgent" |
| `compareHospitals` | `<ComparisonTable>` | "compare", "which is better" |

## Guard Rail Layers

| # | Layer | Where |
|---|---|---|
| 1 | System prompt domain restriction | `src/lib/ai/system-prompt.ts` |
| 2 | Zod request validation | `src/lib/middleware/validate.ts` |
| 3 | Rate limiter (10 req/min/IP) | `src/lib/middleware/rate-limit.ts` |
| 4 | React ErrorBoundary per component | `src/components/shared/ErrorBoundary.tsx` |
| 5 | `maxSteps: 3` cap | `src/app/api/v1/chat/route.ts` |

## Key Invariants

- `HospitalMap` and `SpecialtyChart` are **default exports** — their `next/dynamic` imports have no `.ComponentName` destructure
- All other hospital components are **named exports** — dynamic imports use `then(m => ({ default: m.ComponentName }))`
- Never add `url` to `schema.prisma` datasource block (Prisma 7 breaking change)
- Always pass `{ url }` object to `new PrismaBetterSqlite3(...)`, not a raw `Database` instance
