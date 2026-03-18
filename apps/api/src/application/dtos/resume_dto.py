"""
Resume DTOs for use case input/output.
"""

from datetime import datetime
from typing import Any
from uuid import UUID


class CreateResumeDTO:
    """DTO for creating a new resume."""

    def __init__(
        self,
        user_id: UUID,
        title: str = "Untitled Resume",
        template_id: UUID | None = None,
        content: dict[str, Any] | None = None,
        customization: dict[str, Any] | None = None,
    ) -> None:
        self.user_id = user_id
        self.title = title
        self.template_id = template_id
        self.content = content or {}
        self.customization = customization or {}


class UpdateResumeDTO:
    """DTO for partial resume update."""

    def __init__(
        self,
        resume_id: UUID | None = None,
        user_id: UUID | None = None,
        title: str | None = None,
        template_id: UUID | None = None,
        content: dict[str, Any] | None = None,
        customization: dict[str, Any] | None = None,
        is_public: bool | None = None,
        slug: str | None = None,
    ) -> None:
        self.resume_id = resume_id
        self.user_id = user_id
        self.title = title
        self.template_id = template_id
        self.content = content
        self.customization = customization
        self.is_public = is_public
        self.slug = slug


class ExportResumeDTO:
    """DTO for export request."""

    def __init__(
        self,
        resume_id: UUID,
        user_id: UUID,
        format: str = "pdf",
    ) -> None:
        self.resume_id = resume_id
        self.user_id = user_id
        self.format = format


class ApplyTemplateDTO:
    """DTO for applying a template to a resume."""

    def __init__(self, resume_id: UUID, template_id: UUID, user_id: UUID) -> None:
        self.resume_id = resume_id
        self.template_id = template_id
        self.user_id = user_id


class DuplicateResumeDTO:
    """DTO for duplicating a resume."""

    def __init__(self, resume_id: UUID, user_id: UUID, new_title: str | None = None) -> None:
        self.resume_id = resume_id
        self.user_id = user_id
        self.new_title = new_title
