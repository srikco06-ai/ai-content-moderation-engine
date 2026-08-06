"""
Tests for application configuration.
"""

from __future__ import annotations

from dataclasses import FrozenInstanceError

import pytest

from app.config import Settings, settings


class TestConfiguration:
    """
    Tests for application settings.
    """

    def test_settings_instance_exists(self) -> None:
        """
        Global settings instance should exist.
        """

        assert settings is not None

        assert isinstance(settings, Settings)

    def test_application_name(self) -> None:
        """
        Application name should not be empty.
        """

        assert isinstance(settings.APP_NAME, str)

        assert settings.APP_NAME.strip() != ""

    def test_application_version(self) -> None:
        """
        Application version should not be empty.
        """

        assert isinstance(settings.APP_VERSION, str)

        assert settings.APP_VERSION.strip() != ""

    def test_debug_is_boolean(self) -> None:
        """
        DEBUG should be bool.
        """

        assert isinstance(
            settings.DEBUG,
            bool,
        )

    def test_allow_origins_is_list(self) -> None:
        """
        ALLOW_ORIGINS should be list.
        """

        assert isinstance(
            settings.ALLOW_ORIGINS,
            list,
        )

    def test_allow_methods_is_list(self) -> None:
        """
        ALLOW_METHODS should be list.
        """

        assert isinstance(
            settings.ALLOW_METHODS,
            list,
        )

    def test_allow_headers_is_list(self) -> None:
        """
        ALLOW_HEADERS should be list.
        """

        assert isinstance(
            settings.ALLOW_HEADERS,
            list,
        )

    def test_huggingface_settings(self) -> None:
        """
        Hugging Face configuration should be valid.
        """

        assert isinstance(
            settings.HF_MODEL_NAME,
            str,
        )

        assert settings.HF_MODEL_NAME.strip() != ""

        assert settings.HF_DEVICE in {
            "cpu",
            "cuda",
        }

        assert settings.HF_MAX_LENGTH > 0

        assert settings.HF_BATCH_SIZE > 0

        assert 0.0 <= settings.HF_THRESHOLD <= 1.0

    def test_settings_are_immutable(self) -> None:
        """
        Settings dataclass should be frozen.
        """

        with pytest.raises(
            FrozenInstanceError,
        ):
            settings.APP_NAME = "Modified"
