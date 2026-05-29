# Concrete BC Events App

Events app for Canadian nonprofits. **Current priority: client demo MVP.**

## Before planning or implementing

1. Read [docs/specs/demo.md](docs/specs/demo.md) — scope boundary
2. Skim [docs/specs/vision.md](docs/specs/vision.md) — long-term reference only
3. Check [docs/specs/open-questions.md](docs/specs/open-questions.md) for unresolved decisions

## Scope rule

- Default to **demo scope**
- Long-term vision informs direction but must not expand current work
- If demo and vision conflict, demo wins unless the user explicitly overrides

## Stack

- Next.js (App Router), TypeScript, Tailwind CSS
- Source directory: `src/`
- Import alias: `@/*`

## Requirements source of truth

All product requirements live in `docs/specs/`. Update specs when decisions are made; do not rely on chat history alone.
