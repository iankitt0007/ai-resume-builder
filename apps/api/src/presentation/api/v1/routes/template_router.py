"""Template API routes."""

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

from src.domain.repositories import ITemplateRepository
from src.presentation.api.v1.dependencies import get_template_repo, get_current_user_id
from src.presentation.schemas.resume_schemas import ResumeResponse

router = APIRouter(prefix="/templates", tags=["templates"])


@router.get("")
async def list_templates(
    template_repo: ITemplateRepository = Depends(get_template_repo),
):
    """List all available templates."""
    templates = await template_repo.find_all()
    return [
        {
            "id": str(t.id),
            "slug": t.slug,
            "name": t.name,
            "description": t.description,
            "thumbnail_url": t.thumbnail_url,
            "config": t.config,
            "is_premium": t.is_premium,
        }
        for t in templates
    ]


@router.get("/{slug}")
async def get_template(
    slug: str,
    template_repo: ITemplateRepository = Depends(get_template_repo),
):
    """Get a single template by slug."""
    template = await template_repo.find_by_slug(slug)
    if template is None:
        raise HTTPException(status_code=404, detail="Template not found")
    return {
        "id": str(template.id),
        "slug": template.slug,
        "name": template.name,
        "description": template.description,
        "thumbnail_url": template.thumbnail_url,
        "config": template.config,
        "is_premium": template.is_premium,
    }
