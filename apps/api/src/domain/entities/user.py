"""User domain entity."""

from datetime import datetime
from uuid import UUID


class User:
    """User entity - extends Supabase auth.users."""

    def __init__(
        self,
        id: UUID,
        full_name: str | None = None,
        avatar_url: str | None = None,
        plan: str = "free",
        created_at: datetime | None = None,
        updated_at: datetime | None = None,
    ) -> None:
        self.id = id
        self.full_name = full_name
        self.avatar_url = avatar_url
        self.plan = plan
        self.created_at = created_at
        self.updated_at = updated_at
