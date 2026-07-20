"""
Shared pytest fixtures for the application.
"""

import pytest
from fastapi.testclient import TestClient

from main import app


@pytest.fixture
def client() -> TestClient:
    """
    Return a shared FastAPI TestClient instance.
    """

    with TestClient(app) as test_client:
        yield test_client