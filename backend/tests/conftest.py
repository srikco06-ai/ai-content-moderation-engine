"""
Shared pytest fixtures for the application.
"""

from __future__ import annotations

from collections.abc import Generator

import pytest
from fastapi.testclient import TestClient

from main import app


@pytest.fixture
def client() -> Generator[TestClient, None, None]:
    """
    Shared FastAPI TestClient.

    Creates a fresh client for each test and
    closes it automatically afterwards.
    """

    with TestClient(app) as test_client:
        yield test_client
