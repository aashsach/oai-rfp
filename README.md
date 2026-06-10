# RFP Tool

Monorepo for an RFP document filling tool.

## Stack

- Backend: FastAPI, SQLModel, pydantic-settings
- Frontend: Next.js, Supabase Auth, generated OpenAPI client
- Data and auth: local Supabase-compatible Docker stack

## Run

```bash
just up
```

Open the frontend at http://localhost:3000.

The Supabase gateway runs at http://localhost:8000 and the backend API runs at http://localhost:8080.

## Generate Frontend API Client

With the stack running:

```bash
just openapi
```
