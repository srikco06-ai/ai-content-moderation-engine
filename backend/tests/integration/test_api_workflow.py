"""
End-to-end integration tests for the AI Content Moderation API.
"""

from __future__ import annotations

from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


class TestAPIWorkflow:
    """
    End-to-end integration tests.
    """

    def test_complete_health_workflow(self) -> None:
        """
        Verify root and health endpoints.
        """

        root = client.get("/")

        assert root.status_code == 200

        assert "message" in root.json()

        health = client.get("/health")

        assert health.status_code == 200

        body = health.json()

        assert body["status"] == "healthy"

        assert body["service_ready"] is True

        assert isinstance(
            body["version"],
            str,
        )

    def test_prediction_workflow(self) -> None:
        """
        Verify prediction endpoint returns the
        expected schema.
        """

        response = client.post(
            "/predict",
            json={
                "text": "Have a wonderful day!",
            },
        )

        assert response.status_code == 200

        body = response.json()

        expected = {
            "prediction",
            "confidence",
            "risk_score",
            "matched_words",
            "categories",
            "raw_predictions",
        }

        assert set(body.keys()) == expected

    def test_prediction_types(self) -> None:
        """
        Response values should have expected types.
        """

        response = client.post(
            "/predict",
            json={
                "text": "You are stupid.",
            },
        )

        assert response.status_code == 200

        body = response.json()

        assert body["prediction"] in {
            "Safe",
            "Toxic",
        }

        assert isinstance(
            body["confidence"],
            float,
        )

        assert isinstance(
            body["risk_score"],
            float,
        )

        assert isinstance(
            body["matched_words"],
            list,
        )

        assert isinstance(
            body["categories"],
            list,
        )

        assert isinstance(
            body["raw_predictions"],
            dict,
        )

    def test_invalid_request_workflow(self) -> None:
        """
        Invalid payload should return HTTP 422.
        """

        response = client.post(
            "/predict",
            json={},
        )

        assert response.status_code == 422

        body = response.json()

        assert "detail" in body

    def test_multiple_requests(self) -> None:
        """
        Consecutive requests should succeed.
        """

        for _ in range(10):

            response = client.post(
                "/predict",
                json={
                    "text": "Hello world",
                },
            )

            assert response.status_code == 200

    def test_unicode_request(self) -> None:
        """
        Unicode text should be accepted.
        """

        response = client.post(
            "/predict",
            json={
                "text": "你好 مرحبا नमस्ते Hello",
            },
        )

        assert response.status_code == 200

    def test_response_is_json(self) -> None:
        """
        Response should be JSON.
        """

        response = client.post(
            "/predict",
            json={
                "text": "Testing",
            },
        )

        assert response.headers["content-type"].startswith("application/json")
