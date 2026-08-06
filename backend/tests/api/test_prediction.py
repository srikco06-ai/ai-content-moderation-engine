"""
API tests for the prediction endpoint.

These tests validate the FastAPI layer only.
The moderation service is mocked so that model inference
is not executed during API testing.
"""

from __future__ import annotations

from typing import Any

import pytest
from fastapi.testclient import TestClient

import main


@pytest.fixture
def mocked_prediction(monkeypatch: pytest.MonkeyPatch) -> dict[str, Any]:
    """
    Mock prediction returned by services.predict_text().
    """

    prediction = {
        "prediction": "Toxic",
        "confidence": 94.25,
        "risk_score": 94.25,
        "matched_words": [],
        "categories": [
            "Toxic",
            "Insult",
        ],
        "raw_predictions": {
            "toxic": 0.9425,
            "insult": 0.8731,
            "threat": 0.0412,
        },
    }

    def fake_predict(_: Any) -> dict[str, Any]:
        return prediction

    monkeypatch.setattr(
        main,
        "predict_text",
        fake_predict,
    )

    return prediction


class TestPredictionEndpoint:
    """
    Tests for POST /predict.
    """

    def test_prediction_returns_200(
        self,
        client: TestClient,
        mocked_prediction: dict[str, Any],
    ) -> None:
        """
        Endpoint should return HTTP 200.
        """

        response = client.post(
            "/predict",
            json={
                "text": "You are stupid.",
            },
        )

        assert response.status_code == 200

    def test_prediction_matches_mock(
        self,
        client: TestClient,
        mocked_prediction: dict[str, Any],
    ) -> None:
        """
        Endpoint should return the mocked service response.
        """

        response = client.post(
            "/predict",
            json={
                "text": "You are stupid.",
            },
        )

        data = response.json()

        assert data == mocked_prediction

    def test_prediction_schema(
        self,
        client: TestClient,
        mocked_prediction: dict[str, Any],
    ) -> None:
        """
        Response should preserve the public API schema.
        """

        response = client.post(
            "/predict",
            json={
                "text": "hello",
            },
        )

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

    def test_prediction_types(
        self,
        client: TestClient,
        mocked_prediction: dict[str, Any],
    ) -> None:
        """
        Response fields should have the expected types.
        """

        response = client.post(
            "/predict",
            json={
                "text": "Hello",
            },
        )

        data = response.json()

        assert isinstance(
            data["prediction"],
            str,
        )

        assert isinstance(
            data["confidence"],
            float,
        )

        assert isinstance(
            data["risk_score"],
            float,
        )

        assert isinstance(
            data["matched_words"],
            list,
        )

        assert isinstance(
            data["categories"],
            list,
        )

        assert isinstance(
            data["raw_predictions"],
            dict,
        )

    def test_prediction_values_are_in_range(
        self,
        client: TestClient,
        mocked_prediction: dict[str, Any],
    ) -> None:
        """
        Confidence and risk score should be percentages.
        """

        response = client.post(
            "/predict",
            json={
                "text": "Hello",
            },
        )

        data = response.json()

        assert 0.0 <= data["confidence"] <= 100.0

        assert 0.0 <= data["risk_score"] <= 100.0

    @pytest.mark.parametrize(
        "payload",
        [
            {},
            {"text": None},
            {"text": 123},
            {"text": []},
            {"text": {}},
        ],
    )
    def test_invalid_payload_returns_422(
        self,
        client: TestClient,
        payload: dict[str, Any],
        mocked_prediction: dict[str, Any],
    ) -> None:
        """
        Invalid request bodies should fail validation.
        """

        response = client.post(
            "/predict",
            json=payload,
        )

        assert response.status_code == 422

    def test_response_content_type(
        self,
        client: TestClient,
        mocked_prediction: dict[str, Any],
    ) -> None:
        """
        Endpoint should return JSON.
        """

        response = client.post(
            "/predict",
            json={
                "text": "Hello",
            },
        )

        assert response.headers["content-type"].startswith("application/json")

    def test_prediction_endpoint_accepts_unicode(
        self,
        client: TestClient,
        mocked_prediction: dict[str, Any],
    ) -> None:
        """
        Unicode input should be accepted.
        """

        response = client.post(
            "/predict",
            json={
                "text": "こんにちは 👋 नमस्ते",
            },
        )

        assert response.status_code == 200

        data = response.json()

        assert data["prediction"] == mocked_prediction["prediction"]
