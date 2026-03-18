"""
UpdateResume use case - partial update of resume.
"""

from uuid import UUID

from src.application.dtos.resume_dto import UpdateResumeDTO
from src.domain.entities.resume import Resume
from src.domain.repositories.i_resume_repository import IResumeRepository
from src.domain.repositories.i_resume_version_repository import IResumeVersionRepository


class UpdateResumeUseCase:
    """Updates an existing resume with partial data."""

    def __init__(
        self,
        repo: IResumeRepository,
        version_repo: IResumeVersionRepository | None = None,
    ) -> None:
        self._repo = repo
        self._version_repo = version_repo

    async def execute(self, dto: UpdateResumeDTO) -> Resume | None:
        if dto.resume_id is None or dto.user_id is None:
            return None
        resume = await self._repo.find_by_id(dto.resume_id)
        if resume is None:
            return None
        if resume.user_id != dto.user_id:
            return None

        if dto.title is not None:
            resume.title = dto.title
        if dto.template_id is not None:
            resume.apply_template(dto.template_id)
        if dto.content is None and dto.customization is None and dto.title is None:
            pass
        if dto.content is not None:
            resume.content = dto.content
        if dto.customization is not None:
            resume.customization = {**resume.customization, **dto.customization}
        if dto.is_public is not None:
            resume.is_public = dto.is_public
        if dto.slug is not None:
            resume.slug = dto.slug

        return await self._repo.save(resume)
