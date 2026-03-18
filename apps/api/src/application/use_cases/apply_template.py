"""
ApplyTemplate use case - change template for a resume.
"""

from src.application.dtos.resume_dto import ApplyTemplateDTO
from src.domain.entities.resume import Resume
from src.domain.repositories.i_resume_repository import IResumeRepository
from src.domain.repositories.i_template_repository import ITemplateRepository


class ApplyTemplateUseCase:
    """Applies a template to an existing resume."""

    def __init__(
        self,
        resume_repo: IResumeRepository,
        template_repo: ITemplateRepository,
    ) -> None:
        self._resume_repo = resume_repo
        self._template_repo = template_repo

    async def execute(self, dto: ApplyTemplateDTO) -> Resume:
        resume = await self._resume_repo.find_by_id(str(dto.resume_id))
        if resume is None:
            raise ValueError(f"Resume {dto.resume_id} not found")
        if resume.user_id != str(dto.user_id):
            raise PermissionError("Not authorized to modify this resume")

        template = await self._template_repo.find_by_id(str(dto.template_id))
        if template is None:
            raise ValueError(f"Template {dto.template_id} not found")

        resume.apply_template(str(dto.template_id))
        return await self._resume_repo.save(resume)
