"""Abstract template repository interface (Dependency Inversion)."""
from abc import ABC, abstractmethod
from uuid import UUID

from src.domain.entities import Template


class ITemplateRepository(ABC):
    """Abstract base for template persistence."""

    @abstractmethod
    async def find_by_id(self, id: UUID) -> Template | None: ...

    @abstractmethod
    async def find_by_slug(self, slug: str) -> Template | None: ...

    @abstractmethod
    async def find_all(self) -> list[Template]: ...
