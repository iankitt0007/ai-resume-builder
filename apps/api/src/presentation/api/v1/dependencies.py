"""FastAPI dependency injection for use cases and auth."""

from uuid import UUID

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from src.application.use_cases.create_resume import CreateResumeUseCase
from src.application.use_cases.duplicate_resume import DuplicateResumeUseCase
from src.application.use_cases.export_resume import ExportResumeUseCase
from src.application.use_cases.get_resume_versions import GetResumeVersionsUseCase
from src.application.use_cases.update_resume import UpdateResumeUseCase
from src.domain.repositories import IResumeRepository, IResumeVersionRepository, ITemplateRepository
from src.infrastructure.repositories.supabase_resume_repo import SupabaseResumeRepository
from src.infrastructure.repositories.supabase_resume_version_repo import SupabaseResumeVersionRepository
from src.infrastructure.repositories.supabase_template_repo import SupabaseTemplateRepository
from src.infrastructure.services.pdf_service import PuppeteerPDFService
from src.presentation.api.middleware.auth_middleware import get_current_user_id

security = HTTPBearer(auto_error=False)


def get_resume_repo() -> IResumeRepository:
    """Resume repository dependency."""
    return SupabaseResumeRepository()


def get_template_repo() -> ITemplateRepository:
    """Template repository dependency."""
    return SupabaseTemplateRepository()


def get_version_repo() -> IResumeVersionRepository:
    """Resume version repository dependency."""
    return SupabaseResumeVersionRepository()


def get_create_resume_use_case(
    repo: IResumeRepository = Depends(get_resume_repo),
    template_repo: ITemplateRepository = Depends(get_template_repo),
) -> CreateResumeUseCase:
    """Create resume use case dependency."""
    return CreateResumeUseCase(repo, template_repo)


def get_update_resume_use_case(
    repo: IResumeRepository = Depends(get_resume_repo),
    version_repo: IResumeVersionRepository = Depends(get_version_repo),
) -> UpdateResumeUseCase:
    """Update resume use case dependency."""
    return UpdateResumeUseCase(repo, version_repo)


def get_export_resume_use_case(
    repo: IResumeRepository = Depends(get_resume_repo),
) -> ExportResumeUseCase:
    """Export resume use case dependency."""
    pdf_service = PuppeteerPDFService()
    return ExportResumeUseCase(repo, pdf_service)


def get_duplicate_resume_use_case(
    repo: IResumeRepository = Depends(get_resume_repo),
) -> DuplicateResumeUseCase:
    """Duplicate resume use case dependency."""
    return DuplicateResumeUseCase(repo)


def get_get_resume_versions_use_case(
    resume_repo: IResumeRepository = Depends(get_resume_repo),
    version_repo: IResumeVersionRepository = Depends(get_version_repo),
) -> GetResumeVersionsUseCase:
    """Get resume versions use case dependency."""
    return GetResumeVersionsUseCase(resume_repo, version_repo)


async def require_auth(
    user_id: UUID | None = Depends(get_current_user_id),
) -> UUID:
    """Require authenticated user - raises 401 if not."""
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required",
        )
    return user_id
