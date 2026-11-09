# LINKit – Agent Guide

Product: mobile-first digital identity / smart card platform. The profile is the product; NFC, QR and URL are access methods.
Stack: Vue 3 + TS + Vite + Pinia + Tailwind (frontend/), Laravel + Sanctum (backend/), Supabase Postgres + Storage.
Roles: super_admin, customer, public visitor (no login needed to view profiles).

## Rules
- Stay in your own folder. Backend: backend/. Frontend: frontend/. QA: tests and CI config only.
- The API contract is docs/api-contract.md. Do not change endpoints without updating it first.
- Public endpoints return public profile fields only. Never expose email, role, or account data.
- Every customer-owned resource needs an ownership policy and a test for it.
- Never store raw visitor IPs. Hash them.
- Run lint, format, and tests before reporting a task done.

## Conventions
- Frontend: <script setup lang="ts">, Pinia for shared state, no `any`, Tailwind only (monochrome palette: ink #111111, paper #FFFFFF, surface #F4F4F4, line #E6E6E6, muted #6B6B6B).
- Backend: Form Requests for validation, API Resources for responses, Policies for authorization, snake_case columns.
- Commits: type(scope): message, e.g. feat(profile): add social links CRUD

## Current phase
Phase 0: Foundation

<!-- antislop:start -->
## antislop
For UI, copy, people, mobile layout, or code comments work, read these installed skill files directly (use these paths even if a same-named global skill exists):
- Core filter, always on: `antislop`: `.agents/skills/antislop/SKILL.md`
- UI / visual: `antislop-ui`: `.agents/skills/antislop-ui/SKILL.md`
- Copy & text: `antislop-copywriting`: `.agents/skills/antislop-copywriting/SKILL.md`
- People: `antislop-human`: `.agents/skills/antislop-human/SKILL.md`
- Mobile / responsive: `antislop-layoutmobile`: `.agents/skills/antislop-layoutmobile/SKILL.md`
- Code comments: `antislop-code`: `.agents/skills/antislop-code/SKILL.md`
Before starting, follow the core's "Two Usage Modes" section in strict order: explicit session instruction first, then global preference, then ask. A session instruction always wins. For a resolved mode, say `antislop active: <mode> (session override).` or `antislop active: <mode> (global preference).` once before presenting findings or making edits, using the actual mode and source. Acknowledging the user's request without naming the source does not replace this notice.
Only an explicit choice of antislop during or after selects a session mode. A request to review, audit, or avoid file edits does not select a mode; read the global preference in that case. Another skill's mode does not select antislop's mode.
If the mode is unresolved, ask during/after and end the response; wait for the answer before any UI review, planning, or concept. For read-only tasks, put the active-mode notice only at the start of the final answer, never in progress messages. For editing tasks, announce before the first edit and omit it from the final answer.
To update antislop later: `npx antislop-ai --update`, or run `npx antislop-ai` and pick Overwrite them.
<!-- antislop:end -->
