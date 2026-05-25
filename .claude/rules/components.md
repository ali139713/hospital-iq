---
globs: src/components/**/*.tsx
---

# React Component Rules

- Always add `'use client'` to components that use hooks, browser APIs, or event handlers
- Use `next/dynamic` with `ssr: false` for any component that imports Leaflet or accesses `window`
- Wrap hospital data components in `<ErrorBoundary>` — never let a bad tool result crash the chat
- Import UI primitives from `@/components/ui/`, not from shadcn directly
- Use `HospitalSummary` from `@/types/hospital` as the shared data shape; do not inline ad-hoc types
- Named exports only — default exports are reserved for dynamic-import-only components (HospitalMap, SpecialtyChart)
- Keep components presentational: no Prisma imports, no fetch calls inside components
- Tailwind class order: layout → spacing → typography → colour → interactive states
