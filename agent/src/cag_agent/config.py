"""Application settings loaded from environment variables."""

import os
from pydantic import BaseModel, Field
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseModel):
    """All external configuration."""

    nvidia_api_key: str = Field(
        default_factory=lambda: os.getenv("NVIDIA_API_KEY", "")
    )
    openrouter_api_key: str = Field(
        default_factory=lambda: os.getenv("OPENROUTER_API_KEY", "")
    )

    nvidia_model: str = "minimaxai/minimax-m2.7"
    openrouter_model: str = "google/gemini-3.1-flash-lite"

    nvidia_base_url: str = "https://integrate.api.nvidia.com/v1"
    openrouter_base_url: str = "https://openrouter.ai/api/v1"

    max_tokens: int = 2048
    temperature: float = 0.3
    timeout: int = 60

    # Supabase (server-side persistence)
    supabase_url: str = Field(
        default_factory=lambda: os.getenv("SUPABASE_URL", "")
    )
    SUPABASE_KEY: str = Field(
        default_factory=lambda: os.getenv("SUPABASE_KEY", "")
    )

    # API server
    api_host: str = Field(
        default_factory=lambda: os.getenv("CAG_API_HOST", "0.0.0.0")
    )
    api_port: int = Field(
        default_factory=lambda: int(os.getenv("CAG_API_PORT", "8000"))
    )
    cors_origins: list[str] = Field(
        default_factory=lambda: [
            origin.strip()
            for origin in os.getenv(
                "CAG_API_CORS_ORIGINS", "http://localhost:3000"
            ).split(",")
            if origin.strip()
        ]
    )