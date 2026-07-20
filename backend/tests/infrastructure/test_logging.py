"""
Tests for application logging utilities.
"""

import logging

from app.logging_config import configure_logging, get_logger


class TestLogging:
    """
    Tests for logging configuration.
    """

    def test_get_logger_returns_logger(self) -> None:
        """get_logger() should return a Logger."""

        logger = get_logger("unit_test")

        assert isinstance(logger, logging.Logger)

    def test_logger_name(self) -> None:
        """Logger name should be preserved."""

        logger = get_logger("custom_logger")

        assert logger.name == "custom_logger"

    def test_configure_logging_multiple_calls(self) -> None:
        """
        configure_logging() should be safe to call repeatedly.
        """

        configure_logging()
        configure_logging()
        configure_logging()

        logger = get_logger("repeat")

        assert isinstance(logger, logging.Logger)

    def test_logger_levels(self) -> None:
        """Logger should support standard logging levels."""

        logger = get_logger("levels")

        logger.debug("debug")
        logger.info("info")
        logger.warning("warning")
        logger.error("error")
        logger.critical("critical")

        assert logger.name == "levels"

    def test_logger_propagates(self) -> None:
        """Logger should inherit Logger behavior."""

        logger = get_logger("propagation")

        assert hasattr(logger, "handlers")
        assert hasattr(logger, "level")