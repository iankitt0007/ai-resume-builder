"""Abstract resume repository interface (Dependency Inversion)."""
from abc import ABC, abstractmethod
from uuid import UUID

from src.domain.entities import Resume


class IResumeRepository(ABC):
    """Abstract base for resume persistence. All layers depend on this, not implementations."""

    @abstractmethod
    async def find_by_id(self, id: UUID) -> Resume | None: ...

    @abstractmethod
    async def find_by_user(self, user_id: UUID, limit: int = 50, cursor: str | None = None) -> list[Resume]: ...

    @abstractmethod
    async def find_by_slug(self, slug: str) -> Resume | None: ...

    @abstractmethod
    async def save(self, resume: Resume) -> Resume: ...

    @abstractmethod
    async def delete(self, id: UUID) -> None: ...
