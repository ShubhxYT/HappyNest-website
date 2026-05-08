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

    nvidia_model: str = "deepseek-ai/deepseek-v4"
    openrouter_model: str = "google/gemini-1.5-flash"

    nvidia_base_url: str = "https://integrate.api.nvidia.com/v1"
    openrouter_base_url: str = "https://openrouter.ai/api/v1"

    max_tokens: int = 20000
    temperature: float = 0.3
    timeout: int = 60