"""GetResumeVersions use case - retrieves version history for a resume."""

from __future__ import annotations

from uuid import UUID

from src.domain.repositories.i_resume_repository import IResumeRepository
from src.domain.repositories.i_resume_version_repository import IResumeVersionRepository


class GetResumeVersionsUseCase:
    """Use case for fetching resume version history."""

    def __init__(
        self,
        resume_repo: IResumeRepository,
        version_repo: IResumeVersionRepository,
    ) -> None:
        self._resume_repo = resume_repo
        self._version_repo = version_repo

    async def execute(self, resume_id: UUID, user_id: UUID) -> list[dict]:
        """Fetch all versions for a resume. Ensures user owns the resume."""
        resume = await self._resume_repo.find_by_id(resume_id)
        if resume is None:
            raise ValueError("Resume not found")
        if resume.user_id != user_id:
            raise PermissionError("Not authorized to access this resume")
        return await self._version_repo.find_by_resume_id(resume_id)
