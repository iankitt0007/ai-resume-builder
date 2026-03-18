"""Resume application service - orchestrates resume operations."""

from __future__ import annotations

from uuid import UUID

from src.application.use_cases.create_resume import CreateResumeUseCase
from src.application.use_cases.update_resume import UpdateResumeUseCase
from src.application.use_cases.duplicate_resume import DuplicateResumeUseCase
from src.application.dtos.resume_dto import CreateResumeDTO, UpdateResumeDTO
from src.domain.entities.resume import Resume


class ResumeService:
    """Application service coordinating resume use cases."""

    def __init__(
        self,
        create_use_case: CreateResumeUseCase,
        update_use_case: UpdateResumeUseCase,
        duplicate_use_case: DuplicateResumeUseCase,
    ) -> None:
        self._create = create_use_case
        self._update = update_use_case
        self._duplicate = duplicate_use_case

    async def create(self, dto: CreateResumeDTO, user_id: UUID) -> Resume:
        """Create a new resume."""
        return await self._create.execute(dto, user_id)

    async def update(
        self, resume_id: UUID, dto: UpdateResumeDTO, user_id: UUID
    ) -> Resume:
        """Update an existing resume."""
        return await self._update.execute(resume_id, dto, user_id)

    async def duplicate(self, resume_id: UUID, user_id: UUID) -> Resume:
        """Duplicate an existing resume."""
        return await self._duplicate.execute(resume_id, user_id)
