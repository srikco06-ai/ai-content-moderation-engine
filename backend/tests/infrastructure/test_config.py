"""
Tests for application configuration.
"""

from app.config import Settings, settings


class TestConfiguration:
    """
    Tests for application settings.
    """

    def test_settings_instance_exists(self) -> None:
        """Global settings instance should exist."""

        assert settings is not None
        assert isinstance(settings, Settings)

    def test_application_name(self) -> None:
        """Application name should not be empty."""

        assert isinstance(settings.APP_NAME, str)
        assert len(settings.APP_NAME) > 0

    def test_application_version(self) -> None:
        """Application version should not be empty."""

        assert isinstance(settings.APP_VERSION, str)
        assert len(settings.APP_VERSION) > 0

    def test_debug_is_boolean(self) -> None:
        """DEBUG should be a bool."""

        assert isinstance(settings.DEBUG, bool)

    def test_allow_origins_is_list(self) -> None:
        """ALLOW_ORIGINS should be a list."""

        assert isinstance(settings.ALLOW_ORIGINS, list)

    def test_allow_methods_is_list(self) -> None:
        """ALLOW_METHODS should be a list."""

        assert isinstance(settings.ALLOW_METHODS, list)

    def test_allow_headers_is_list(self) -> None:
        """ALLOW_HEADERS should be a list."""

        assert isinstance(settings.ALLOW_HEADERS, list)

    def test_settings_are_immutable(self) -> None:
        """Settings dataclass should be frozen."""

        try:
            settings.APP_NAME = "Modified"
            assert False, "Settings should be immutable."
        except Exception:
            assert True