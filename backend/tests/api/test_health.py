"""
API endpoint tests for application health and status.
"""

from __future__ import annotations

from fastapi.testclient import TestClient

from app.config import settings


class TestRootEndpoint:
    """
    Tests for the root endpoint.
    """

    def test_root_returns_200(
        self,
        client: TestClient,
    ) -> None:
        """
        Root endpoint should return HTTP 200.
        """

        response = client.get("/")

        assert response.status_code == 200

    def test_root_response_contains_expected_message(
        self,
        client: TestClient,
    ) -> None:
        """
        Root endpoint should return the expected message.
        """

        response = client.get("/")

        data = response.json()

        assert isinstance(data, dict)

        assert "message" in data

        assert data["message"] == f"{settings.APP_NAME} Running"

    def test_root_returns_json(
        self,
        client: TestClient,
    ) -> None:
        """
        Root endpoint should return JSON.
        """

        response = client.get("/")

        assert response.headers["content-type"].startswith("application/json")


class TestHealthEndpoint:
    """
    Tests for the health endpoint.
    """

    def test_health_returns_200(
        self,
        client: TestClient,
    ) -> None:
        """
        Health endpoint should return HTTP 200.
        """

        response = client.get("/health")

        assert response.status_code == 200

    def test_health_response_contains_required_fields(
        self,
        client: TestClient,
    ) -> None:
        """
        Health endpoint should return all required fields.
        """

        response = client.get("/health")

        data = response.json()

        expected_fields = {
            "status",
            "service_ready",
            "version",
        }

        assert set(data.keys()) == expected_fields

    def test_health_status_is_healthy(
        self,
        client: TestClient,
    ) -> None:
        """
        Health endpoint should report a healthy service.
        """

        response = client.get("/health")

        data = response.json()

        assert data["status"] == "healthy"

        assert data["service_ready"] is True

    def test_health_version_is_not_empty(
        self,
        client: TestClient,
    ) -> None:
        """
        Version should be a non-empty string.
        """

        response = client.get("/health")

        data = response.json()

        assert isinstance(
            data["version"],
            str,
        )

        assert len(data["version"]) > 0

    def test_health_returns_json(
        self,
        client: TestClient,
    ) -> None:
        """
        Health endpoint should return JSON.
        """

        response = client.get("/health")

        assert response.headers["content-type"].startswith("application/json")
