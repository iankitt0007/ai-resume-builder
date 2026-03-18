"""Export application service - handles PDF generation and storage."""

from __future__ import annotations

from uuid import UUID

from src.application.use_cases.export_resume import ExportResumeUseCase


class ExportService:
    """Application service for resume export operations."""

    def __init__(self, export_use_case: ExportResumeUseCase) -> None:
        self._export = export_use_case

    async def export_pdf(
        self, resume_id: UUID, user_id: UUID, html_content: str
    ) -> str:
        """Export resume as PDF and return signed URL."""
        return await self._export.execute(resume_id, user_id, html_content)
