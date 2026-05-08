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

    max_tokens: int = 20000
    temperature: float = 0.3
    timeout: int = 60