# Project Context

## Purpose

This repository is an RFP document filling tool. The product goal is to help users upload, draft, manage, and reuse proposal responses from an authenticated workspace.

## Architecture

The project is a monorepo with separate application folders:

- `apps/backend`: FastAPI backend using SQLModel for ORM/data models and `pydantic-settings` for configuration.
- `apps/frontend`: Next.js frontend using HeroUI v3, Supabase Auth, and an OpenAPI-generated TypeScript client for backend calls.
- `.supabase`: Local Supabase-compatible service configuration for Postgres, Auth, PostgREST, and Kong.
- Root `docker-compose.yml`: Brings up backend, frontend, and Supabase services together.
- Root `justfile`: Common development commands loaded from the root `.env`.

## Major Subsystems

- Authentication: Supabase GoTrue via local Kong gateway at `http://localhost:8000/auth/v1`.
- Backend API: FastAPI exposed at `http://localhost:8080`, currently with `/api/v1/health` and authenticated `/api/v1/me`.
- Frontend app: Next.js exposed at `http://localhost:3000`, currently a HeroUI landing page with top-right Supabase email/password sign-in and sign-up controls.
- Data layer: Supabase Postgres with SQLModel models in backend.
- Client generation: `apps/frontend/src/lib/api/generated` is generated from backend OpenAPI using OpenAPI Generator Docker image.

## Coding Standards

- Backend configuration uses `pydantic-settings`.
- Backend data models use SQLModel.
- Frontend backend calls should go through the generated OpenAPI client, not hand-written fetch wrappers except thin adapters.
- Frontend UI should use HeroUI v3 patterns: no provider, compound components, Tailwind CSS v4/PostCSS setup, and `onPress` for HeroUI button interactions.
- Root-level orchestration should remain in Docker Compose and `justfile`.
- Keep generated client code in `apps/frontend/src/lib/api/generated`.
- Prefer small, scoped changes that match existing app folder boundaries.

## Key Constraints

- The root folder should primarily contain orchestration and repository-level documentation/configuration.
- Supabase service-role or secret keys must never be exposed to frontend code.
- Frontend public env vars may contain only browser-safe values.
- Local development env values are stored in ignored `.env` files; `.env.example` documents the required variables.
- Local Supabase Auth requires compatibility bootstrap SQL in `.supabase/init/00-roles.sql` for the pinned GoTrue/Postgres image combination.
- OpenAPI generation uses Docker to avoid requiring a host Java runtime.

## Important Historical Decisions

- The project was initialized as a monorepo rather than separate repositories.
- FastAPI, SQLModel, Supabase, Next.js, and OpenAPI Generator are baseline stack choices.
- HeroUI v3 and Tailwind CSS v4 are the frontend component/styling baseline.
- The frontend uses Supabase Auth directly for browser sign-in and passes Supabase JWTs to backend endpoints.
- The backend validates Supabase JWTs with the configured JWT secret for the initial authenticated `/me` route.
- Local Supabase is implemented via explicit Docker Compose services instead of relying only on the Supabase CLI.
