"""
End-to-end integration tests for the AI Content Moderation API.
"""

from fastapi.testclient import TestClient

from main import app


client = TestClient(app)


class TestAPIWorkflow:
    """
    End-to-end API workflow tests.
    """

    def test_complete_health_workflow(self):
        """Verify the root and health endpoints."""

        root = client.get("/")
        assert root.status_code == 200
        assert "message" in root.json()

        health = client.get("/health")
        assert health.status_code == 200

        body = health.json()

        assert body["status"] == "healthy"
        assert body["service_ready"] is True
        assert "version" in body

    def test_complete_safe_prediction_workflow(self):
        """Verify a safe prediction request."""

        response = client.post(
            "/predict",
            json={
                "text": "Have a wonderful day!"
            },
        )

        assert response.status_code == 200

        body = response.json()

        assert body["prediction"] == "Safe"
        assert body["risk_score"] == 0.0
        assert body["matched_words"] == []
        assert body["categories"] == []

    def test_complete_toxic_prediction_workflow(self):
        """Verify a toxic prediction request."""

        response = client.post(
            "/predict",
            json={
                "text": "You are stupid and I hate you."
            },
        )

        assert response.status_code == 200

        body = response.json()

        assert body["prediction"] == "Toxic"
        assert body["risk_score"] > 0
        assert len(body["matched_words"]) > 0
        assert len(body["categories"]) > 0

    def test_invalid_request_workflow(self):
        """Verify validation errors."""

        response = client.post(
            "/predict",
            json={},
        )

        assert response.status_code == 422

        body = response.json()

        assert "detail" in body

    def test_multiple_requests(self):
        """Verify the API handles consecutive requests."""

        for _ in range(10):
            response = client.post(
                "/predict",
                json={
                    "text": "Hello world"
                },
            )

            assert response.status_code == 200