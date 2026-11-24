# Project Rules — scs-track

## Stack
- Node.js (`v22.22.1`) CommonJS scripts in `workspace/stock-tools/` with built-in `node:test` and `node:assert` (zero external npm packages).

## Tests
- `cd workspace/stock-tools && node --test`

## Never
- Never hardcode API keys, tokens, or passwords in source files; always read secrets from `process.env` and keep `.env` in `.gitignore`.
- Never use invented functions such as `fetchWithRetry` from `node:http` or unverified Node APIs without checking `node --version`.
- Never modify files outside the named target folder (`workspace/stock-tools`) during a scoped agent run.

## Skills
- `skills/weekly-reorder-check/SKILL.md` — weekly low-stock reorder verification procedure.
