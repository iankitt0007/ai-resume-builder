"""FastAPI entry point - Resume Builder API."""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import get_settings
from src.presentation.api.middleware.error_handler import register_exception_handlers
from src.presentation.api.v1.routes import auth_router, export_router, resume_router, template_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events."""
    yield


app = FastAPI(
    title="Resume Builder API",
    description="Production-grade AI-powered Resume Builder SaaS API",
    version="1.0.0",
    lifespan=lifespan,
)

settings = get_settings()
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_exception_handlers(app)

app.include_router(resume_router, prefix="/api/v1")
app.include_router(export_router, prefix="/api/v1")
app.include_router(template_router, prefix="/api/v1")
app.include_router(auth_router, prefix="/api/v1")


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "ok", "version": "1.0.0"}
