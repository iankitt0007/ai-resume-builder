"""Supabase implementation of IResumeVersionRepository."""

from datetime import datetime
from uuid import UUID, uuid4

from src.domain.repositories.i_resume_version_repository import IResumeVersionRepository
from src.infrastructure.database.supabase_client import get_supabase_admin


class SupabaseResumeVersionRepository(IResumeVersionRepository):
    """Resume version repository backed by Supabase."""

    TABLE = "resume_versions"

    async def find_by_resume_id(self, resume_id: UUID, limit: int = 20) -> list[dict]:
        client = get_supabase_admin()
        result = (
            client.table(self.TABLE)
            .select("*")
            .eq("resume_id", str(resume_id))
            .order("version", desc=True)
            .limit(limit)
            .execute()
        )
        return result.data or []

    async def save_version(self, resume_id: UUID, version: int, content: dict) -> None:
        client = get_supabase_admin()
        row = {
            "id": str(uuid4()),
            "resume_id": str(resume_id),
            "version": version,
            "content": content,
            "created_at": datetime.utcnow().isoformat(),
        }
        client.table(self.TABLE).insert(row).execute()
