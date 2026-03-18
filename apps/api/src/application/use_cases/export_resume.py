"""
ExportResume use case - generate PDF and upload to storage.
"""

from datetime import datetime, timedelta
from uuid import UUID

from src.domain.entities.resume import Resume
from src.domain.repositories.i_resume_repository import IResumeRepository
from src.infrastructure.services.pdf_service import PuppeteerPDFService


class ExportResumeUseCase:
    """Exports resume to PDF and returns signed URL."""

    def __init__(
        self,
        resume_repo: IResumeRepository,
        pdf_service: PuppeteerPDFService | None = None,
    ) -> None:
        self._resume_repo = resume_repo
        self._pdf_service = pdf_service or PuppeteerPDFService()

    async def execute(
        self,
        resume_id: UUID,
        user_id: UUID,
        fmt: str = "pdf",
    ) -> dict[str, object] | None:
        resume = await self._resume_repo.find_by_id(resume_id)
        if resume is None:
            return None
        if resume.user_id != user_id:
            return None

        result = await self._pdf_service.export_resume(resume, user_id, fmt)
        if result:
            resume.mark_exported()
            await self._resume_repo.save(resume)
        return result
