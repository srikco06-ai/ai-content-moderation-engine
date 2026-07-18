"""
Application configuration.

Loads environment variables from backend/.env and exposes
a single immutable settings object for the application.
"""

from dataclasses import dataclass
from pathlib import Path
import os

from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")


def _get_bool(name: str, default: bool) -> bool:
    value = os.getenv(name, str(default))
    return value.strip().lower() in {"true", "1", "yes", "on"}


def _get_list(name: str, default: str) -> list[str]:
    value = os.getenv(name, default)
    return [item.strip() for item in value.split(",") if item.strip()]


@dataclass(frozen=True)
class Settings:
    APP_NAME: str = os.getenv(
        "APP_NAME",
        "AI Content Moderation API",
    )

    APP_VERSION: str = os.getenv(
        "APP_VERSION",
        "1.0.0",
    )

    DEBUG: bool = _get_bool(
        "DEBUG",
        False,
    )

    API_PREFIX: str = os.getenv(
        "API_PREFIX",
        "",
    )

    ALLOW_CREDENTIALS: bool = _get_bool(
        "ALLOW_CREDENTIALS",
        True,
    )

    ALLOW_ORIGINS: list[str] = None

    ALLOW_METHODS: list[str] = None

    ALLOW_HEADERS: list[str] = None

    def __post_init__(self):
        object.__setattr__(
            self,
            "ALLOW_ORIGINS",
            _get_list("ALLOW_ORIGINS", "*"),
        )

        object.__setattr__(
            self,
            "ALLOW_METHODS",
            _get_list("ALLOW_METHODS", "*"),
        )

        object.__setattr__(
            self,
            "ALLOW_HEADERS",
            _get_list("ALLOW_HEADERS", "*"),
        )


settings = Settings()