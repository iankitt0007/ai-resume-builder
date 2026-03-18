"""Resume domain entity - no framework dependencies."""

from datetime import datetime
from uuid import UUID


class Resume:
    """Resume domain entity."""

    def __init__(
        self,
        id: UUID | None,
        user_id: UUID,
        title: str = "Untitled Resume",
        template_id: UUID | None = None,
        slug: str | None = None,
        is_public: bool = False,
        content: dict | None = None,
        customization: dict | None = None,
        version: int = 1,
        last_exported: datetime | None = None,
        created_at: datetime | None = None,
        updated_at: datetime | None = None,
    ) -> None:
        self.id = id
        self.user_id = user_id
        self.title = title
        self.template_id = template_id
        self.slug = slug
        self.is_public = is_public
        self.content = content or {}
        self.customization = customization or {}
        self.version = version
        self.last_exported = last_exported
        self.created_at = created_at
        self.updated_at = updated_at

    def apply_template(self, template_id: UUID | None) -> None:
        """Apply a template to the resume."""
        self.template_id = template_id

    def update_section(self, section: str, data: dict) -> None:
        """Update a specific section of the resume content."""
        if "personal" in section and section == "personal":
            self.content["personal"] = {**self.content.get("personal", {}), **data}
        elif section in self.content:
            self.content[section] = data
        else:
            self.content[section] = data

    def update_content(self, content: dict) -> None:
        """Replace entire resume content."""
        self.content = content

    def update_customization(self, customization: dict) -> None:
        """Update template customization overrides."""
        self.customization = {**self.customization, **customization}

    def mark_exported(self) -> None:
        """Mark resume as exported (for last_exported timestamp)."""
        self.last_exported = datetime.utcnow()
