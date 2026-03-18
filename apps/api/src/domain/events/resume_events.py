"""Domain events for resume lifecycle."""
from dataclasses import dataclass
from datetime import datetime
from uuid import UUID


@dataclass(frozen=True)
class ResumeCreated:
    """Emitted when a new resume is created."""

    resume_id: UUID
    user_id: UUID
    timestamp: datetime


@dataclass(frozen=True)
class ResumeUpdated:
    """Emitted when a resume is updated."""

    resume_id: UUID
    version: int
    timestamp: datetime


@dataclass(frozen=True)
class ResumeExported:
    """Emitted when a resume is exported to PDF."""

    resume_id: UUID
    user_id: UUID
    timestamp: datetime
