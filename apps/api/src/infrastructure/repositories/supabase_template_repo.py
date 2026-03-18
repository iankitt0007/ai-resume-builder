"""Supabase implementation of ITemplateRepository."""

from datetime import datetime
from uuid import UUID

from src.domain.entities.template import Template
from src.domain.repositories.i_template_repository import ITemplateRepository
from src.infrastructure.database.supabase_client import get_supabase_admin


class SupabaseTemplateRepository(ITemplateRepository):
    """Template repository backed by Supabase."""

    TABLE = "templates"

    async def find_by_id(self, template_id: UUID) -> Template | None:
        client = get_supabase_admin()
        result = client.table(self.TABLE).select("*").eq("id", str(template_id)).execute()

        if not result.data or len(result.data) == 0:
            return None
        return self._row_to_entity(result.data[0])

    async def find_by_slug(self, slug: str) -> Template | None:
        client = get_supabase_admin()
        result = client.table(self.TABLE).select("*").eq("slug", slug).execute()

        if not result.data or len(result.data) == 0:
            return None
        return self._row_to_entity(result.data[0])

    async def find_all(self) -> list[Template]:
        client = get_supabase_admin()
        result = client.table(self.TABLE).select("*").order("created_at").execute()

        return [self._row_to_entity(row) for row in result.data or []]

    def _row_to_entity(self, row: dict) -> Template:
        return Template(
            id=UUID(row["id"]),
            slug=row["slug"],
            name=row["name"],
            description=row.get("description"),
            thumbnail_url=row.get("thumbnail_url"),
            config=row.get("config") or {},
            is_premium=row.get("is_premium", False),
            created_at=datetime.fromisoformat(row["created_at"].replace("Z", "+00:00")) if row.get("created_at") else None,
        )
