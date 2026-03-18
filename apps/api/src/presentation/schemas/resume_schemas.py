"""Pydantic v2 schemas for resume API."""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field


class ResumeContentPersonal(BaseModel):
    """Personal section content."""

    name: str | None = None
    email: str | None = None
    phone: str | None = None
    location: str | None = None
    linkedin: str | None = None
    website: str | None = None
    summary: str | None = None


class ResumeContentBase(BaseModel):
    """Base resume content structure."""

    personal: dict | None = None
    experience: list[dict] | None = None
    education: list[dict] | None = None
    skills: list[dict] | None = None
    projects: list[dict] | None = None
    certifications: list[dict] | None = None
    languages: list[dict] | None = None
    custom_sections: list[dict] | None = None


class ResumeCreate(BaseModel):
    """Create resume request."""

    title: str = Field(default="Untitled Resume", max_length=255)
    template_id: UUID | None = None
    content: dict = Field(default_factory=dict)
    customization: dict = Field(default_factory=dict)


class ResumeUpdate(BaseModel):
    """Partial resume update request."""

    title: str | None = None
    template_id: UUID | None = None
    slug: str | None = None
    is_public: bool | None = None
    content: dict | None = None
    customization: dict | None = None


class ResumeResponse(BaseModel):
    """Resume response schema."""

    id: UUID
    user_id: UUID
    template_id: UUID | None
    title: str
    slug: str | None
    is_public: bool
    content: dict
    customization: dict
    version: int
    last_exported: datetime | None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class ResumeVersionResponse(BaseModel):
    """Resume version response."""

    id: UUID
    resume_id: UUID
    version: int
    content: dict
    created_at: datetime

    model_config = {"from_attributes": True}


class ExportRequest(BaseModel):
    """Export request - PDF format."""

    format: str = Field(default="pdf", pattern="^(pdf|png)$")


class ExportResponse(BaseModel):
    """Export response with signed URL."""

    url: str
    expires_at: datetime
