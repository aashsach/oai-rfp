# Architecture Decisions

## AD-001: Monorepo Layout

- Status: Accepted
- Date: 2026-06-10
- Decision: Keep backend, frontend, and local Supabase configuration in one repository.
- Rationale: The project needs coordinated API/client/auth changes, and a monorepo keeps Docker Compose orchestration and generated API client workflows simple.

## AD-002: FastAPI Backend With SQLModel

- Status: Accepted
- Date: 2026-06-10
- Decision: Use FastAPI for the backend and SQLModel for ORM/data models.
- Rationale: FastAPI gives OpenAPI output for client generation, and SQLModel aligns Pydantic schemas with database models.

## AD-003: Supabase For Auth And Database

- Status: Accepted
- Date: 2026-06-10
- Decision: Use Supabase Auth and Postgres as the authentication and persistence foundation.
- Rationale: Supabase provides managed auth semantics, JWTs, and Postgres-compatible local development.

## AD-004: Generated Frontend API Client

- Status: Accepted
- Date: 2026-06-10
- Decision: Generate the frontend backend client from FastAPI OpenAPI using OpenAPI Generator.
- Rationale: This avoids hand-maintained API contracts and keeps frontend/backend integration typed.

## AD-005: Dockerized OpenAPI Generator

- Status: Accepted
- Date: 2026-06-10
- Decision: Run OpenAPI Generator through the official Docker image.
- Rationale: The host environment may not have Java installed; Docker keeps the generator reproducible.

## AD-006: HeroUI v3 Frontend Components

- Status: Accepted
- Date: 2026-06-10
- Decision: Use HeroUI v3 with Tailwind CSS v4 for frontend application components and styling.
- Rationale: The frontend needs accessible, composable UI primitives for auth and workspace flows while staying inside the existing Next.js app.
