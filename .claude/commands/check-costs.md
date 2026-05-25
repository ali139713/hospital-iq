Analyse the estimated API token costs for this project.

## Model pricing (claude-haiku-4-5-20251001)
- Input tokens: $0.80 per million
- Output tokens: $4.00 per million  
- Cached input tokens: $0.08 per million (90% discount)

## What to report

1. **Per-request estimate** — Calculate the cost of a typical request:
   - System prompt ≈ 350 tokens (cached after first call)
   - Avg user message ≈ 20 tokens
   - Tool schema definitions ≈ 800 tokens (cached)
   - Tool result (DB data) ≈ 500 tokens
   - Assistant response ≈ 150 tokens
   
   Show cost for: first call (cold cache) vs subsequent calls (warm cache)

2. **Daily/monthly projections** — At 100 requests/day, estimate:
   - Daily cost
   - Monthly cost
   - Savings from prompt caching vs without caching

3. **Code verification** — Read `src/lib/ai/system-prompt.ts` and `src/app/api/v1/chat/route.ts` and confirm:
   - Prompt caching is correctly configured (`cacheControl: ephemeral`)
   - Token usage logging is present in `onFinish`
   - `maxSteps: 3` is set to cap costs

4. **Optimisation tips** — List any additional cost reduction opportunities visible in the current code.

Present results in a clear table format.
