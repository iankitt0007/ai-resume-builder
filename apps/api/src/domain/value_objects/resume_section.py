"""Resume section value object."""

from typing import Any


class ResumeSection:
    """Represents a section of a resume (experience, education, etc.)."""

    def __init__(self, section_type: str, data: list[dict[str, Any]] | dict[str, Any]) -> None:
        self.section_type = section_type
        self.data = data
