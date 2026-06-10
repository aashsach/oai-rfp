# Continuity

This is the canonical AI memory file. Future sessions must read this file before making changes.

## Latest State

The repository contains the initial monorepo foundation for an RFP document filling tool:

- FastAPI backend in `apps/backend`.
- Next.js frontend in `apps/frontend`, now using HeroUI v3 and Tailwind CSS v4.
- Supabase-compatible local stack in `.supabase` and `docker-compose.yml`.
- Root `justfile` for stack, logs, reset, tests, frontend build/dev, and OpenAPI generation.
- Frontend generated client in `apps/frontend/src/lib/api/generated`.

The frontend home page is a HeroUI landing page with top-right sign-in/sign-up buttons and a Supabase email/password auth modal. It now includes standard SaaS pages at `/pricing`, `/about`, `/contact`, `/security`, `/changelog`, `/privacy`, and `/terms`, with shared header/footer structure. Local env values are in ignored `.env` files, with `.env.example` documenting required variables.

The Docker Compose stack has been verified through `just up-d` with backend, frontend, DB, Auth, REST, and Kong running. Backend health, frontend HTTP response, Supabase Auth health, and the SaaS page routes were verified.

Supabase Auth signup previously failed with `Database error finding user` because GoTrue queried unqualified Auth tables while `supabase_auth_admin` had the default search path. `.supabase/init/00-roles.sql` now sets `supabase_auth_admin` search path to `auth, public`. The running local DB was repaired by applying the same role setting and reconciling `auth.schema_migrations` with the already-applied versions from `public.schema_migrations`; direct signup through Kong then returned 200.

## Recent Commits

- none yet

## Active Branches

- `main`: default integration branch. No active build plans at the time of this memory entry.

## Completed Build Plans

- BP-001: Monorepo Authentication Foundation

## Unresolved Issues

- No commits exist yet, so all initial scaffold work is uncommitted.
- Browser verification could not be completed through the in-app browser because that browser surface was unavailable; build, Docker, and HTTP checks were used instead.
- Frontend package audit reported vulnerabilities from npm dependencies during install/build output. No audit remediation has been performed yet.

## Technical Debt

- Supabase local stack uses manual compatibility bootstrap SQL in `.supabase/init/00-roles.sql`; revisit role/search-path assumptions when changing Supabase image versions.
- Backend authentication currently validates JWTs directly with the shared local secret; production hardening may require JWKS/claims validation strategy appropriate to deployment.
- Backend tests are minimal and cover only OpenAPI availability.
- The starter `RFPDocument` model exists but no document workflow endpoints or migrations are implemented.

## Next Recommended Work

1. Commit the initial scaffold and memory system.
2. Add database migration workflow for SQLModel-managed tables.
3. Add authenticated document CRUD endpoints and generated frontend client usage.
4. Add frontend route protection and richer auth session handling.
5. Add CI checks for backend tests, frontend build, and OpenAPI client generation.
