set dotenv-load := true

up:
    docker compose up --build

up-d:
    docker compose up --build -d

down:
    docker compose down

reset:
    docker compose down -v

logs:
    docker compose logs -f

backend-test:
    docker compose run --rm backend uv run pytest

frontend-dev:
    cd apps/frontend && npm run dev

frontend-build:
    cd apps/frontend && npm run build

openapi:
    cd apps/frontend && npm run openapi:generate
