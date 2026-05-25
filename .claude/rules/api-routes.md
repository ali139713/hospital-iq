---
globs: src/app/api/**/*.ts
---

# API Route Rules

- Every route must call `checkRateLimit` before any other logic
- Validate request body with `validateChatRequest` (Zod) before passing to AI layer
- Use `log.info` / `log.error` from `@/lib/logger` — never use `console.log` in route files
- Log `requestId` on every request; include it in the response header `X-Request-Id`
- Return `result.toDataStreamResponse()` for streaming endpoints — do not convert to JSON manually
- `maxSteps` must always be set on `streamText` — default is unlimited and will run up costs
- Track and log token usage + estimated USD cost in the `onFinish` callback
- All tool errors must throw generic messages — never echo user input back in error messages
- Health route (`/api/health`) must check DB connectivity and return `{ status, db, timestamp }`
