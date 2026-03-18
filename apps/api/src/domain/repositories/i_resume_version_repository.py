"""Abstract resume version repository interface."""
from abc import ABC, abstractmethod
from uuid import UUID


class IResumeVersionRepository(ABC):
    """Abstract base for resume version history."""

    @abstractmethod
    async def save_version(self, resume_id: UUID, version: int, content: dict) -> None: ...

    @abstractmethod
    async def find_by_resume_id(self, resume_id: UUID, limit: int = 20) -> list[dict]: ...
