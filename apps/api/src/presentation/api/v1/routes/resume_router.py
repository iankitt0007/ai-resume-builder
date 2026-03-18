"""Resume CRUD API routes."""

from datetime import datetime
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status

from src.application.use_cases.create_resume import CreateResumeUseCase
from src.application.use_cases.duplicate_resume import DuplicateResumeUseCase
from src.application.use_cases.get_resume_versions import GetResumeVersionsUseCase
from src.application.use_cases.update_resume import UpdateResumeUseCase
from src.application.dtos.resume_dto import CreateResumeDTO, UpdateResumeDTO
from src.presentation.api.v1.dependencies import (
    get_create_resume_use_case,
    get_duplicate_resume_use_case,
    get_get_resume_versions_use_case,
    get_resume_repo,
    get_update_resume_use_case,
    require_auth,
)
from src.domain.repositories import IResumeRepository
from src.presentation.schemas.resume_schemas import (
    ResumeCreate,
    ResumeResponse,
    ResumeUpdate,
    ResumeVersionResponse,
)

router = APIRouter(prefix="/resumes", tags=["resumes"])


def resume_to_response(resume) -> ResumeResponse:
    """Convert domain Resume to API response."""
    now = datetime.utcnow()
    return ResumeResponse(
        id=resume.id,
        user_id=resume.user_id,
        template_id=resume.template_id,
        title=resume.title,
        slug=resume.slug,
        is_public=resume.is_public,
        content=resume.content,
        customization=resume.customization,
        version=resume.version,
        last_exported=resume.last_exported,
        created_at=resume.created_at or now,
        updated_at=resume.updated_at or now,
    )


@router.post("", response_model=ResumeResponse)
async def create_resume(
    dto: ResumeCreate,
    user_id: UUID = Depends(require_auth),
    use_case: CreateResumeUseCase = Depends(get_create_resume_use_case),
):
    """Create a new resume."""
    create_dto = CreateResumeDTO(
        user_id=user_id,
        title=dto.title,
        template_id=dto.template_id,
        content=dto.content,
        customization=dto.customization,
    )
    resume = await use_case.execute(create_dto)
    return resume_to_response(resume)


@router.get("", response_model=list[ResumeResponse])
async def list_resumes(
    user_id: UUID = Depends(require_auth),
    repo: IResumeRepository = Depends(get_resume_repo),
):
    """List all resumes for the current user."""
    resumes = await repo.find_by_user(user_id)
    return [resume_to_response(r) for r in resumes]


@router.get("/{resume_id}", response_model=ResumeResponse)
async def get_resume(
    resume_id: UUID,
    user_id: UUID = Depends(require_auth),
    repo: IResumeRepository = Depends(get_resume_repo),
):
    """Get a single resume by ID."""
    resume = await repo.find_by_id(resume_id)
    if resume is None:
        raise HTTPException(status_code=404, detail="Resume not found")
    if resume.user_id != user_id:
        raise HTTPException(status_code=403, detail="Access denied")
    return resume_to_response(resume)


@router.patch("/{resume_id}", response_model=ResumeResponse)
async def update_resume(
    resume_id: UUID,
    dto: ResumeUpdate,
    user_id: UUID = Depends(require_auth),
    use_case: UpdateResumeUseCase = Depends(get_update_resume_use_case),
):
    """Partially update a resume."""
    update_dto = UpdateResumeDTO(
        resume_id=resume_id,
        user_id=user_id,
        title=dto.title,
        template_id=dto.template_id,
        slug=dto.slug,
        is_public=dto.is_public,
        content=dto.content,
        customization=dto.customization,
    )
    resume = await use_case.execute(update_dto)
    if resume is None:
        raise HTTPException(status_code=404, detail="Resume not found")
    return resume_to_response(resume)


@router.delete("/{resume_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_resume(
    resume_id: UUID,
    user_id: UUID = Depends(require_auth),
    repo: IResumeRepository = Depends(get_resume_repo),
):
    """Delete a resume."""
    resume = await repo.find_by_id(resume_id)
    if resume is None:
        raise HTTPException(status_code=404, detail="Resume not found")
    if resume.user_id != user_id:
        raise HTTPException(status_code=403, detail="Access denied")
    await repo.delete(resume_id)


@router.post("/{resume_id}/duplicate", response_model=ResumeResponse)
async def duplicate_resume(
    resume_id: UUID,
    user_id: UUID = Depends(require_auth),
    use_case: DuplicateResumeUseCase = Depends(get_duplicate_resume_use_case),
):
    """Duplicate an existing resume."""
    resume = await use_case.execute(resume_id, user_id)
    if resume is None:
        raise HTTPException(status_code=404, detail="Resume not found")
    return resume_to_response(resume)


@router.get("/{resume_id}/versions", response_model=list[ResumeVersionResponse])
async def get_resume_versions(
    resume_id: UUID,
    user_id: UUID = Depends(require_auth),
    use_case: GetResumeVersionsUseCase = Depends(get_get_resume_versions_use_case),
):
    """Get version history for a resume."""
    try:
        versions = await use_case.execute(resume_id, user_id)
    except ValueError:
        raise HTTPException(status_code=404, detail="Resume not found")
    except PermissionError:
        raise HTTPException(status_code=403, detail="Access denied")
    from src.presentation.schemas.resume_schemas import ResumeVersionResponse
    return [
        ResumeVersionResponse(
            id=v["id"],
            resume_id=v["resume_id"],
            version=v["version"],
            content=v["content"],
            created_at=v["created_at"],
        )
        for v in versions
    ]
