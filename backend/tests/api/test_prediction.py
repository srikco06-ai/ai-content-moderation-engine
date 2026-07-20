"""
API tests for the prediction endpoint.
"""

from fastapi.testclient import TestClient


class TestPredictionEndpoint:
    """
    Tests for POST /predict.
    """

    def test_safe_text_prediction(
        self,
        client: TestClient,
    ) -> None:
        """Safe text should be classified as Safe."""

        response = client.post(
            "/predict",
            json={
                "text": "Have a wonderful day."
            },
        )

        assert response.status_code == 200

        data = response.json()

        assert data["prediction"] == "Safe"
        assert data["confidence"] == 99.0
        assert data["risk_score"] == 0.0
        assert data["matched_words"] == []
        assert data["categories"] == []
        assert data["raw_predictions"] == {}

    def test_single_toxic_word(
        self,
        client: TestClient,
    ) -> None:
        """A single toxic word should be detected."""

        response = client.post(
            "/predict",
            json={
                "text": "You are stupid."
            },
        )

        assert response.status_code == 200

        data = response.json()

        assert data["prediction"] == "Toxic"
        assert data["risk_score"] == 20.0
        assert "stupid" in data["matched_words"]
        assert "Insult" in data["categories"]

    def test_multiple_toxic_words(
        self,
        client: TestClient,
    ) -> None:
        """Multiple toxic words should accumulate risk."""

        response = client.post(
            "/predict",
            json={
                "text": "You are a stupid idiot and I hate you."
            },
        )

        assert response.status_code == 200

        data = response.json()

        assert data["prediction"] == "Toxic"
        assert data["risk_score"] == 65.0

        assert set(data["matched_words"]) == {
            "stupid",
            "idiot",
            "hate",
        }

        assert set(data["categories"]) == {
            "Insult",
            "Toxic",
        }

    def test_risk_score_is_capped_at_100(
        self,
        client: TestClient,
    ) -> None:
        """Risk score should never exceed 100."""

        response = client.post(
            "/predict",
            json={
                "text": (
                    "kill die hate stupid idiot moron "
                    "loser trash fool dumb"
                )
            },
        )

        assert response.status_code == 200

        data = response.json()

        assert data["prediction"] == "Toxic"
        assert data["risk_score"] == 100.0

    def test_response_schema(
        self,
        client: TestClient,
    ) -> None:
        """Response should contain all required fields."""

        response = client.post(
            "/predict",
            json={
                "text": "hello"
            },
        )

        assert response.status_code == 200

        data = response.json()

        expected_fields = {
            "prediction",
            "confidence",
            "risk_score",
            "matched_words",
            "categories",
            "raw_predictions",
        }

        assert set(data.keys()) == expected_fields