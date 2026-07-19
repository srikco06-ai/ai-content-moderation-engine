import logging
import sys


LOG_FORMAT = (
    "%(asctime)s | %(levelname)s | %(name)s | %(message)s"
)


def configure_logging(level: int = logging.INFO) -> None:
    """
    Configure application-wide logging.

    Safe to call multiple times.
    """

    root_logger = logging.getLogger()

    if root_logger.handlers:
        return

    logging.basicConfig(
        level=level,
        format=LOG_FORMAT,
        handlers=[
            logging.StreamHandler(sys.stdout),
        ],
    )


def get_logger(name: str) -> logging.Logger:
    """
    Return a configured logger instance.
    """

    return logging.getLogger(name)