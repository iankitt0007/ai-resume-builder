"""Supabase client singleton for async operations."""

from supabase import create_client, Client
from functools import lru_cache
from config import get_settings


@lru_cache(maxsize=1)
def get_supabase_client() -> Client:
    """Get cached Supabase client with service role key."""
    settings = get_settings()
    return create_client(
        settings.supabase_url,
        settings.supabase_service_role_key,
    )
