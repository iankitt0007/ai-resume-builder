"""
DuplicateResume use case - clone a resume.
"""

from src.application.dtos.resume_dto import DuplicateResumeDTO
from src.domain.entities.resume import Resume
from src.domain.repositories.i_resume_repository import IResumeRepository


class DuplicateResumeUseCase:
    """Duplicates an existing resume for the same user."""

    def __init__(self, repo: IResumeRepository) -> None:
        self._repo = repo

    async def execute(self, dto: DuplicateResumeDTO) -> Resume:
        source = await self._repo.find_by_id(str(dto.resume_id))
        if source is None:
            raise ValueError(f"Resume {dto.resume_id} not found")
        if source.user_id != str(dto.user_id):
            raise PermissionError("Not authorized to duplicate this resume")

        new_title = dto.new_title or f"{source.title} (Copy)"
        new_resume = Resume(
            id=None,
            user_id=source.user_id,
            template_id=source.template_id,
            title=new_title,
            slug=None,
            is_public=False,
            customization=dict(source.customization),
            content=dict(source.content),
            version=1,
            last_exported=None,
            created_at=None,
            updated_at=None,
        )
        return await self._repo.save(new_resume)
