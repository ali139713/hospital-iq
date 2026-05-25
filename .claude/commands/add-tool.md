Scaffold a new AI tool + generative UI component for the hospital assistant.

The argument is the tool name in camelCase, e.g.: /add-tool showNearbyPharmacies

Tool name requested: $ARGUMENTS

Follow these steps exactly:

## Step 1 — Add the result type to `src/types/hospital.ts`
Read the file first, then append a new export interface named `{ToolName}Result` at the bottom. Design the shape based on what the tool name implies.

## Step 2 — Add the tool to `src/lib/ai/tools.ts`
Read the file first. Add a new entry to the `hospitalTools` object following the exact same pattern as existing tools:
- `tool()` with `description`, `parameters` (Zod schema), and `execute` (async DB query returning the new result type)
- The description must start with a trigger phrase that tells Claude when to call it
- Parameters must have `.max()` constraints on string fields

## Step 3 — Create the UI component at `src/components/hospital/{ComponentName}.tsx`
- Use `'use client'` directive
- Import the result type from `@/types/hospital`
- Import shadcn Card, Badge from `@/components/ui/`
- Use Tailwind classes consistent with existing components (see HospitalGrid.tsx for style reference)
- Export as a named export `export function {ComponentName}({ ... }: {ToolName}Result)`

## Step 4 — Register in `src/components/chat/MessageItem.tsx`
Read the file. Add:
1. A `dynamic()` import for the new component (with appropriate skeleton)
2. A `case '{toolName}':` in the `ToolResult` switch statement
3. A fallback skeleton case in `ToolSkeleton`

## Step 5 — Verify
Run `npm run typecheck` and confirm zero errors.
Report each file changed and the exact lines added.
