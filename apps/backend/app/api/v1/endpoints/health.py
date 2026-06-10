from fastapi import APIRouter
from sqlalchemy import text

from app.core.database import AsyncSessionLocal
from app.schemas.health import HealthResponse

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    async with AsyncSessionLocal() as session:
        await session.execute(text("select 1"))
    return HealthResponse(status="ok")
