"""Auth routes - validate token and get current user."""

from uuid import UUID

from fastapi import APIRouter, Depends

from src.presentation.api.v1.dependencies import get_current_user_id, require_auth

router = APIRouter(prefix="/auth", tags=["auth"])


@router.get("/me")
async def get_current_user(user_id: UUID = Depends(require_auth)) -> dict:
    """Return current authenticated user ID (validates JWT)."""
    return {"user_id": str(user_id)}
