---
globs: tests/**/*.ts
---

# Test Rules

- Use Vitest — never introduce Jest; imports come from `vitest` not `jest`
- Skip env validation in tests: `src/env.ts` uses `skipValidation: process.env.NODE_ENV === 'test'`
- Do not mock the Prisma client — if a test needs DB data, seed a test fixture or use the real dev.db
- Rate-limiter tests must reset state between runs; import the reset helper if one exists
- Test file names mirror source file names: `validate.ts` → `validate.test.ts`
- Each test file should cover one concern only — do not bundle unrelated assertions
- Use `describe` blocks to group related cases; name them after the function being tested
