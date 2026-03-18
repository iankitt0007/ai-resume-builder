"""
CreateResume use case - single responsibility: create a new resume.
"""

from src.application.dtos.resume_dto import CreateResumeDTO
from src.domain.entities.resume import Resume
from src.domain.repositories.i_resume_repository import IResumeRepository
from src.domain.repositories.i_template_repository import ITemplateRepository


class CreateResumeUseCase:
    """Creates a new resume for a user."""

    def __init__(
        self,
        repo: IResumeRepository,
        template_repo: ITemplateRepository | None = None,
    ) -> None:
        self._repo = repo
        self._template_repo = template_repo

    async def execute(self, dto: CreateResumeDTO) -> Resume:
        resume = Resume(
            id=None,
            user_id=dto.user_id,
            template_id=dto.template_id,
            title=dto.title,
            slug=None,
            is_public=False,
            customization=dto.customization,
            content=dto.content,
            version=1,
            last_exported=None,
            created_at=None,
            updated_at=None,
        )
        return await self._repo.save(resume)
