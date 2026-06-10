from datetime import datetime, timezone
from uuid import UUID, uuid4

from sqlmodel import Field, SQLModel


class RFPDocument(SQLModel, table=True):
    __tablename__ = "rfp_documents"

    id: UUID = Field(default_factory=uuid4, primary_key=True)
    owner_id: UUID = Field(index=True)
    title: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
