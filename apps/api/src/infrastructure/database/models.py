"""
Database schema models - type definitions for Supabase tables.
Supabase uses REST API; these document the structure for repository implementations.
"""

from datetime import datetime
from typing import Any
from uuid import UUID


class ProfileRow:
    """Schema for profiles table."""

    def __init__(
        self,
        id: UUID,
        full_name: str | None,
        avatar_url: str | None,
        plan: str,
        created_at: datetime,
        updated_at: datetime,
    ) -> None:
        self.id = id
        self.full_name = full_name
        self.avatar_url = avatar_url
        self.plan = plan
        self.created_at = created_at
        self.updated_at = updated_at


class TemplateRow:
    """Schema for templates table."""

    def __init__(
        self,
        id: UUID,
        slug: str,
        name: str,
        description: str | None,
        thumbnail_url: str | None,
        config: dict[str, Any],
        is_premium: bool,
        created_at: datetime,
    ) -> None:
        self.id = id
        self.slug = slug
        self.name = name
        self.description = description
        self.thumbnail_url = thumbnail_url
        self.config = config
        self.is_premium = is_premium
        self.created_at = created_at


class ResumeRow:
    """Schema for resumes table."""

    def __init__(
        self,
        id: UUID,
        user_id: UUID,
        template_id: UUID | None,
        title: str,
        slug: str | None,
        is_public: bool,
        customization: dict[str, Any],
        content: dict[str, Any],
        version: int,
        last_exported: datetime | None,
        created_at: datetime,
        updated_at: datetime,
    ) -> None:
        self.id = id
        self.user_id = user_id
        self.template_id = template_id
        self.title = title
        self.slug = slug
        self.is_public = is_public
        self.customization = customization
        self.content = content
        self.version = version
        self.last_exported = last_exported
        self.created_at = created_at
        self.updated_at = updated_at


class ResumeVersionRow:
    """Schema for resume_versions table."""

    def __init__(
        self,
        id: UUID,
        resume_id: UUID,
        version: int,
        content: dict[str, Any],
        created_at: datetime,
    ) -> None:
        self.id = id
        self.resume_id = resume_id
        self.version = version
        self.content = content
        self.created_at = created_at
