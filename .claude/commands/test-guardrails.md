Test all 5 guard rail layers for the hospital assistant.

Read `src/lib/middleware/validate.ts`, `src/lib/middleware/rate-limit.ts`, and `src/lib/ai/system-prompt.ts` to understand what each layer does.

Then run the test suite to verify layers 2 and 3 work correctly:

```bash
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && nvm use 20.19.4 --silent
npm test 2>&1
```

Then report the status of all 5 guard rail layers:

| Layer | Mechanism | Test Status | Notes |
|-------|-----------|-------------|-------|
| 1 | System prompt domain restriction | Manual (requires live API) | Checks if off-topic refusal phrase is in system prompt |
| 2 | Zod request validation | Automated (validate.test.ts) | Reports pass/fail |
| 3 | Rate limiter (10 req/min/IP) | Automated (rate-limit.test.ts) | Reports pass/fail |
| 4 | React ErrorBoundary | Visual (requires browser) | Confirm ErrorBoundary wraps all hospital components in MessageItem.tsx |
| 5 | maxSteps: 3 cap | Code review | Confirm value in route.ts |

For Layer 1: Read `src/lib/ai/system-prompt.ts` and quote the exact refusal instruction.
For Layer 4: Count how many hospital components are wrapped in ErrorBoundary in `MessageItem.tsx`.
For Layer 5: Show the exact line in `src/app/api/v1/chat/route.ts`.

Finish with a clear PASS/FAIL/MANUAL summary for each layer.
