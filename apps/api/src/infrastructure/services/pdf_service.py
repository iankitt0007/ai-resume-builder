"""PDF export service - generates PDF and uploads to Supabase Storage."""

from datetime import datetime, timedelta
from io import BytesIO
from uuid import UUID

from src.domain.entities.resume import Resume
from src.infrastructure.database.supabase_client import get_supabase_admin


def _generate_pdf_from_html(html_content: str) -> bytes:
    """Generate PDF bytes from HTML. Uses weasyprint or pdfkit fallback."""
    try:
        from weasyprint import HTML
        html = HTML(string=html_content)
        return html.write_pdf()
    except ImportError:
        try:
            import pdfkit
            return pdfkit.from_string(html_content, False) or b""
        except (ImportError, OSError):
            return b""


def _resume_to_html(resume: Resume) -> str:
    """Convert resume to basic HTML for PDF generation."""
    c = resume.content
    personal = c.get("personal") or {}
    html_parts = [
        "<!DOCTYPE html><html><head><meta charset='utf-8'>",
        "<style>body{font-family:sans-serif;max-width:800px;margin:40px auto;padding:20px;}</style>",
        "</head><body>",
        f"<h1>{personal.get('name', '')}</h1>",
        f"<p>{personal.get('email', '')} | {personal.get('phone', '')} | {personal.get('location', '')}</p>",
        f"<p>{personal.get('summary', '')}</p>",
    ]
    for section in ["experience", "education", "skills", "projects", "certifications"]:
        items = c.get(section) or []
        if items:
            html_parts.append(f"<h2>{section.title()}</h2>")
            for item in items:
                if isinstance(item, dict):
                    html_parts.append(f"<p><strong>{item.get('company', item.get('institution', item.get('name', '')))}</strong></p>")
                    html_parts.append(f"<p>{item.get('description', item.get('role', item.get('degree', '')))}</p>")
    html_parts.append("</body></html>")
    return "".join(html_parts)


class PuppeteerPDFService:
    """Exports resume to PDF/PNG and uploads to Supabase Storage."""

    async def export_resume(
        self,
        resume: Resume,
        user_id: UUID,
        fmt: str = "pdf",
    ) -> dict | None:
        html = _resume_to_html(resume)
        pdf_bytes = _generate_pdf_from_html(html)
        if not pdf_bytes:
            return None

        client = get_supabase_admin()
        ext = "pdf" if fmt == "pdf" else "png"
        path = f"{user_id}/{resume.id}_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}.{ext}"

        client.storage.from_("resume-exports").upload(path, BytesIO(pdf_bytes), {"content-type": f"application/{ext}"})
        signed = client.storage.from_("resume-exports").create_signed_url(path, 3600)
        url = signed.get("signedUrl") or signed.get("path") or ""

        return {
            "url": url,
            "expires_at": datetime.utcnow() + timedelta(seconds=3600),
        }
