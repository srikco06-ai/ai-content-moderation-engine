"""
API endpoint tests for application health and status.
"""

from fastapi.testclient import TestClient


class TestRootEndpoint:
    """
    Tests for the root endpoint.
    """

    def test_root_returns_200(self, client: TestClient) -> None:
        """Root endpoint should return HTTP 200."""

        response = client.get("/")

        assert response.status_code == 200

    def test_root_response_contains_expected_message(
        self,
        client: TestClient,
    ) -> None:
        """Root endpoint should return the expected welcome message."""

        response = client.get("/")

        data = response.json()

        assert isinstance(data, dict)
        assert "message" in data
        assert data["message"] == "AI Content Moderation API Running"


class TestHealthEndpoint:
    """
    Tests for the health endpoint.
    """

    def test_health_returns_200(self, client: TestClient) -> None:
        """Health endpoint should return HTTP 200."""

        response = client.get("/health")

        assert response.status_code == 200

    def test_health_response_contains_required_fields(
        self,
        client: TestClient,
    ) -> None:
        """Health endpoint should return all required fields."""

        response = client.get("/health")

        data = response.json()

        assert isinstance(data, dict)

        assert "status" in data
        assert "service_ready" in data
        assert "version" in data

    def test_health_status_is_healthy(
        self,
        client: TestClient,
    ) -> None:
        """Health endpoint should report a healthy service."""

        response = client.get("/health")

        data = response.json()

        assert data["status"] == "healthy"
        assert data["service_ready"] is True

    def test_health_version_is_not_empty(
        self,
        client: TestClient,
    ) -> None:
        """API version should be present."""

        response = client.get("/health")

        data = response.json()

        assert isinstance(data["version"], str)
        assert len(data["version"]) > 0