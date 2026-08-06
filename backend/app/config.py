"""
Application configuration.

Loads environment variables from backend/.env and exposes
a single immutable settings object for the application.
"""

from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")


def _get_bool(name: str, default: bool) -> bool:
    value = os.getenv(name, str(default))
    return value.strip().lower() in {"true", "1", "yes", "on"}


def _get_list(name: str, default: str) -> list[str]:
    value = os.getenv(name, default)
    return [item.strip() for item in value.split(",") if item.strip()]


def _get_int(name: str, default: int) -> int:
    return int(os.getenv(name, default))


def _get_float(name: str, default: float) -> float:
    return float(os.getenv(name, default))


@dataclass(frozen=True)
class Settings:
    """
    Immutable application settings.
    """

    # ------------------------------------------------------------------
    # Application
    # ------------------------------------------------------------------

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

    # ------------------------------------------------------------------
    # CORS
    # ------------------------------------------------------------------

    ALLOW_CREDENTIALS: bool = _get_bool(
        "ALLOW_CREDENTIALS",
        True,
    )

    ALLOW_ORIGINS: list[str] | None = None

    ALLOW_METHODS: list[str] | None = None

    ALLOW_HEADERS: list[str] | None = None

    # ------------------------------------------------------------------
    # Hugging Face Model
    # ------------------------------------------------------------------

    HF_MODEL_NAME: str = os.getenv(
        "HF_MODEL_NAME",
        "unitary/toxic-bert",
    )

    HF_DEVICE: str = os.getenv(
        "HF_DEVICE",
        "cpu",
    )

    HF_MAX_LENGTH: int = _get_int(
        "HF_MAX_LENGTH",
        512,
    )

    HF_BATCH_SIZE: int = _get_int(
        "HF_BATCH_SIZE",
        8,
    )

    HF_THRESHOLD: float = _get_float(
        "HF_THRESHOLD",
        0.50,
    )

    # ------------------------------------------------------------------

    def __post_init__(self) -> None:
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
