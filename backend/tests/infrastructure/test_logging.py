"""
Tests for application logging utilities.
"""

from __future__ import annotations

import logging

from app.logging_config import (
    configure_logging,
    get_logger,
)


class TestLogging:
    """
    Tests for logging configuration.
    """

    def test_get_logger_returns_logger(self) -> None:
        """
        get_logger() should return a Logger instance.
        """

        logger = get_logger("unit_test")

        assert isinstance(
            logger,
            logging.Logger,
        )

    def test_logger_name(self) -> None:
        """
        Logger name should be preserved.
        """

        logger = get_logger("custom_logger")

        assert logger.name == "custom_logger"

    def test_configure_logging_is_idempotent(self) -> None:
        """
        configure_logging() should be safe to call
        multiple times.
        """

        configure_logging()
        configure_logging()
        configure_logging()

        logger = get_logger("repeat")

        assert isinstance(
            logger,
            logging.Logger,
        )

    def test_logger_supports_all_levels(self) -> None:
        """
        Logger should support all standard logging levels.
        """

        logger = get_logger("levels")

        logger.debug("debug")

        logger.info("info")

        logger.warning("warning")

        logger.error("error")

        logger.critical("critical")

        assert logger.name == "levels"

    def test_logger_has_handlers_attribute(self) -> None:
        """
        Logger should expose handlers.
        """

        logger = get_logger("handlers")

        assert hasattr(
            logger,
            "handlers",
        )

    def test_logger_has_level_attribute(self) -> None:
        """
        Logger should expose level.
        """

        logger = get_logger("level")

        assert hasattr(
            logger,
            "level",
        )

        assert isinstance(
            logger.level,
            int,
        )

    def test_same_logger_instance_is_returned(self) -> None:
        """
        logging.getLogger should return the same
        instance for the same logger name.
        """

        logger1 = get_logger("shared")

        logger2 = get_logger("shared")

        assert logger1 is logger2
