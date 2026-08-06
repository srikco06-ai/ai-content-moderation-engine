"""
Production text preprocessing utilities for AI Content Moderation Engine.

This module provides deterministic preprocessing before transformer inference.

Responsibilities
----------------
* Unicode normalization
* URL masking
* Email masking
* Username masking
* Hashtag normalization
* HTML removal
* Whitespace normalization

The goal is to preserve semantic meaning while removing noisy artifacts that
can negatively impact transformer inference.

The preprocessing intentionally does NOT perform:
    * stemming
    * lemmatization
    * stop-word removal
    * punctuation stripping

Those operations generally reduce transformer performance because the tokenizer
expects natural language.
"""

from __future__ import annotations

import html
import re
import unicodedata
from dataclasses import dataclass

from app.logging_config import get_logger

logger = get_logger(__name__)

# ----------------------------------------------------------------------
# Compiled Regular Expressions
# ----------------------------------------------------------------------

URL_PATTERN = re.compile(
    r"(https?://\S+|www\.\S+)",
    flags=re.IGNORECASE,
)

EMAIL_PATTERN = re.compile(r"\b[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[A-Za-z]{2,}\b")

MENTION_PATTERN = re.compile(r"(?<!\w)@\w+")

HASHTAG_PATTERN = re.compile(r"#(\w+)")

HTML_PATTERN = re.compile(r"<[^>]+>")

MULTISPACE_PATTERN = re.compile(r"\s+")


# ----------------------------------------------------------------------
# Configuration
# ----------------------------------------------------------------------


@dataclass(slots=True, frozen=True)
class PreprocessingConfig:
    """Configuration flags for text preprocessing."""

    normalize_unicode: bool = True
    decode_html: bool = True
    remove_html: bool = True
    replace_urls: bool = True
    replace_emails: bool = True
    replace_mentions: bool = True
    normalize_hashtags: bool = True
    normalize_whitespace: bool = True


DEFAULT_CONFIG = PreprocessingConfig()


# ----------------------------------------------------------------------
# Helper Functions
# ----------------------------------------------------------------------


def _normalize_unicode(text: str) -> str:
    return unicodedata.normalize("NFKC", text)


def _decode_html(text: str) -> str:
    return html.unescape(text)


def _remove_html(text: str) -> str:
    return HTML_PATTERN.sub(" ", text)


def _replace_urls(text: str) -> str:
    return URL_PATTERN.sub("[URL]", text)


def _replace_emails(text: str) -> str:
    return EMAIL_PATTERN.sub("[EMAIL]", text)


def _replace_mentions(text: str) -> str:
    return MENTION_PATTERN.sub("[USER]", text)


def _normalize_hashtags(text: str) -> str:
    """
    Converts:

        #hateSpeech

    into

        hateSpeech
    """

    return HASHTAG_PATTERN.sub(r"\1", text)


def _normalize_whitespace(text: str) -> str:
    return MULTISPACE_PATTERN.sub(" ", text).strip()


# ----------------------------------------------------------------------
# Public API
# ----------------------------------------------------------------------


def preprocess_text(
    text: str,
    config: PreprocessingConfig = DEFAULT_CONFIG,
) -> str:
    """
    Normalize text before transformer inference.

    Parameters
    ----------
    text:
        Raw user text.

    config:
        Preprocessing configuration.

    Returns
    -------
    str
        Cleaned text suitable for transformer tokenization.
    """

    logger.debug("Starting preprocessing.")

    processed = text

    if config.normalize_unicode:
        processed = _normalize_unicode(processed)

    if config.decode_html:
        processed = _decode_html(processed)

    if config.remove_html:
        processed = _remove_html(processed)

    if config.replace_urls:
        processed = _replace_urls(processed)

    if config.replace_emails:
        processed = _replace_emails(processed)

    if config.replace_mentions:
        processed = _replace_mentions(processed)

    if config.normalize_hashtags:
        processed = _normalize_hashtags(processed)

    if config.normalize_whitespace:
        processed = _normalize_whitespace(processed)

    logger.debug(
        "Preprocessing completed | original_length=%d cleaned_length=%d",
        len(text),
        len(processed),
    )

    return processed


__all__ = [
    "PreprocessingConfig",
    "DEFAULT_CONFIG",
    "preprocess_text",
]
