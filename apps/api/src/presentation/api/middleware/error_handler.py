"""Global error handler for FastAPI."""

from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse


async def http_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """Handle HTTP exceptions with consistent JSON format."""
    if hasattr(exc, "status_code") and hasattr(exc, "detail"):
        return JSONResponse(
            status_code=getattr(exc, "status_code", 500),
            content={"error": str(getattr(exc, "detail", "Internal server error"))},
        )
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"error": "Internal server error"},
    )


def setup_error_handlers(app: FastAPI) -> None:
    """Register error handlers on the FastAPI app."""
    from fastapi.exceptions import RequestValidationError

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content={"error": "Validation error", "details": exc.errors()},
        )
