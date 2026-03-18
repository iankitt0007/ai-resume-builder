"""Repository interfaces."""

from .i_resume_repository import IResumeRepository
from .i_template_repository import ITemplateRepository
from .i_resume_version_repository import IResumeVersionRepository

__all__ = [
    "IResumeRepository",
    "ITemplateRepository",
    "IResumeVersionRepository",
]
