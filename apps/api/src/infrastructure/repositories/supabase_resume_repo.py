"""Supabase implementation of IResumeRepository."""

from datetime import datetime
from uuid import UUID, uuid4

from src.domain.entities.resume import Resume
from src.domain.repositories.i_resume_repository import IResumeRepository
from src.infrastructure.database.supabase_client import get_supabase_admin


class SupabaseResumeRepository(IResumeRepository):
    """Resume repository backed by Supabase."""

    TABLE = "resumes"

    async def find_by_id(self, resume_id: UUID) -> Resume | None:
        client = get_supabase_admin()
        result = client.table(self.TABLE).select("*").eq("id", str(resume_id)).execute()

        if not result.data or len(result.data) == 0:
            return None

        row = result.data[0]
        return self._row_to_entity(row)

    async def find_by_user(self, user_id: UUID, limit: int = 50, cursor: str | None = None) -> list[Resume]:
        client = get_supabase_admin()
        query = (
            client.table(self.TABLE)
            .select("*")
            .eq("user_id", str(user_id))
            .order("updated_at", desc=True)
            .limit(limit)
        )
        if cursor:
            query = query.lt("updated_at", cursor)
        result = query.execute()

        return [self._row_to_entity(row) for row in result.data or []]

    async def find_by_slug(self, slug: str) -> Resume | None:
        client = get_supabase_admin()
        result = (
            client.table(self.TABLE)
            .select("*")
            .eq("slug", slug)
            .eq("is_public", True)
            .execute()
        )
        if not result.data or len(result.data) == 0:
            return None
        return self._row_to_entity(result.data[0])

    async def save(self, resume: Resume) -> Resume:
        client = get_supabase_admin()
        now = datetime.utcnow().isoformat()
        row = {
            "user_id": str(resume.user_id),
            "template_id": str(resume.template_id) if resume.template_id else None,
            "title": resume.title,
            "slug": resume.slug,
            "is_public": resume.is_public,
            "customization": resume.customization,
            "content": resume.content,
            "version": resume.version,
            "last_exported": resume.last_exported.isoformat() if resume.last_exported else None,
            "updated_at": now,
        }

        if resume.id is None:
            row["id"] = str(uuid4())
            row["created_at"] = now
            result = client.table(self.TABLE).insert(row).execute()
        else:
            result = client.table(self.TABLE).update(row).eq("id", str(resume.id)).execute()

        if result.data:
            saved = result.data[0] if isinstance(result.data, list) else result.data
            return self._row_to_entity(saved)
        raise RuntimeError("Failed to save resume")

    async def delete(self, resume_id: UUID) -> None:
        client = get_supabase_admin()
        client.table(self.TABLE).delete().eq("id", str(resume_id)).execute()

    def _row_to_entity(self, row: dict) -> Resume:
        id_val = row.get("id")
        resume = Resume(
            id=UUID(id_val) if id_val else None,
            user_id=UUID(row["user_id"]),
            template_id=UUID(row["template_id"]) if row.get("template_id") else None,
            title=row.get("title", "Untitled Resume"),
            slug=row.get("slug"),
            is_public=row.get("is_public", False),
            customization=row.get("customization") or {},
            content=row.get("content") or {},
            version=row.get("version", 1),
            created_at=datetime.fromisoformat(row["created_at"].replace("Z", "+00:00")) if row.get("created_at") else None,
            updated_at=datetime.fromisoformat(row["updated_at"].replace("Z", "+00:00")) if row.get("updated_at") else None,
        )
        if row.get("last_exported"):
            resume.last_exported = datetime.fromisoformat(row["last_exported"].replace("Z", "+00:00"))
        return resume
