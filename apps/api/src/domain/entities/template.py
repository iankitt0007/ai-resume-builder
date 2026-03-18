"""Template domain entity."""

from datetime import datetime
from uuid import UUID


class Template:
    """Template entity for resume styling."""

    def __init__(
        self,
        id: UUID,
        slug: str,
        name: str,
        description: str | None = None,
        thumbnail_url: str | None = None,
        config: dict | None = None,
        is_premium: bool = False,
        created_at: datetime | None = None,
    ) -> None:
        self.id = id
        self.slug = slug
        self.name = name
        self.description = description
        self.thumbnail_url = thumbnail_url
        self.config = config or {}
        self.is_premium = is_premium
        self.created_at = created_at
