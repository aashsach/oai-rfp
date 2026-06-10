FROM ghcr.io/astral-sh/uv:0.8.22-python3.12-bookworm-slim

WORKDIR /app

COPY pyproject.toml README.md ./
RUN uv sync --no-dev

COPY app ./app

EXPOSE 8000

CMD ["uv", "run", "--no-dev", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
