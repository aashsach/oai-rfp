from pydantic import Field, PostgresDsn
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    app_name: str = "RFP Tool API"
    environment: str = "local"
    database_url: PostgresDsn = Field(
        default="postgresql+asyncpg://postgres:postgres@localhost:54322/postgres"
    )
    supabase_url: str = "http://localhost:8000"
    supabase_jwt_secret: str = "super-secret-jwt-token-with-at-least-32-characters-long"
    cors_origins: list[str] = ["http://localhost:3000"]


settings = Settings()
