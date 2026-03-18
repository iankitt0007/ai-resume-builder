"""Export resume API routes."""

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

from src.application.use_cases.export_resume import ExportResumeUseCase
from src.presentation.api.v1.dependencies import get_export_resume_use_case, require_auth
from src.presentation.schemas.resume_schemas import ExportRequest, ExportResponse

router = APIRouter(prefix="/resumes", tags=["export"])


@router.post("/{resume_id}/export", response_model=ExportResponse)
async def export_resume(
    resume_id: UUID,
    body: ExportRequest | None = None,
    user_id: UUID = Depends(require_auth),
    use_case: ExportResumeUseCase = Depends(get_export_resume_use_case),
):
    """Generate PDF/PNG export and return signed URL."""
    fmt = body.format if body else "pdf"
    result = await use_case.execute(resume_id, user_id, fmt)
    if result is None:
        raise HTTPException(status_code=404, detail="Resume not found")
    return ExportResponse(url=result["url"], expires_at=result["expires_at"])
