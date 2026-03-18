"""Contact info value object."""


class ContactInfo:
    """Immutable contact information."""

    def __init__(
        self,
        name: str | None = None,
        email: str | None = None,
        phone: str | None = None,
        location: str | None = None,
        linkedin: str | None = None,
        website: str | None = None,
    ) -> None:
        self.name = name
        self.email = email
        self.phone = phone
        self.location = location
        self.linkedin = linkedin
        self.website = website
