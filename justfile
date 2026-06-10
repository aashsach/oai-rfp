set dotenv-load := true

up:
    docker compose up --build

down:
    docker compose down

reset:
    docker compose down -v

logs:
    docker compose logs -f

backend-test:
    docker compose run --rm backend uv run pytest

openapi:
    cd apps/frontend && NEXT_PUBLIC_API_URL=http://host.docker.internal:8080 npm run openapi:generate
