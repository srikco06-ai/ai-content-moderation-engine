"""
Unit tests for the moderation service.

These tests validate the business logic inside services.py while
mocking the ToxicBERT inference engine.
"""

from __future__ import annotations

from typing import Any

import pytest
from pydantic import ValidationError

import app.services as services
from app.schemas import TextInput
from app.services import predict_text


class FakeEngine:
    """
    Fake inference engine used for deterministic unit tests.
    """

    def __init__(
        self,
        probabilities: dict[str, float],
    ) -> None:
        self._probabilities = probabilities

    def predict(
        self,
        text: str,
    ) -> dict[str, float]:
        """
        Return predetermined probabilities.
        """

        _ = text

        return self._probabilities


class BrokenEngine:
    """
    Fake engine that always raises.
    """

    def predict(
        self,
        text: str,
    ) -> dict[str, float]:
        """
        Simulate inference failure.
        """

        _ = text

        raise RuntimeError(
            "Simulated inference failure",
        )


def patch_engine(
    monkeypatch: pytest.MonkeyPatch,
    probabilities: dict[str, float],
) -> None:
    """
    Replace the real ToxicBERT engine with FakeEngine.
    """

    monkeypatch.setattr(
        services,
        "get_engine",
        lambda: FakeEngine(probabilities),
    )


class TestModerationService:
    """
    Unit tests for predict_text().
    """

    def test_safe_prediction(
        self,
        monkeypatch: pytest.MonkeyPatch,
    ) -> None:
        """
        Safe probabilities should return Safe.
        """

        patch_engine(
            monkeypatch,
            {
                "toxic": 0.02,
                "insult": 0.01,
                "threat": 0.00,
            },
        )

        result = predict_text(
            TextInput(
                text="Have a wonderful day.",
            ),
        )

        assert result["prediction"] == "Safe"

        assert 0.0 <= result["confidence"] <= 100.0

        assert result["risk_score"] < (services.settings.HF_THRESHOLD * 100)

        assert result["categories"] == []

        assert isinstance(
            result["raw_predictions"],
            dict,
        )

    def test_toxic_prediction(
        self,
        monkeypatch: pytest.MonkeyPatch,
    ) -> None:
        """
        Toxic probabilities should return Toxic.
        """

        patch_engine(
            monkeypatch,
            {
                "toxic": 0.96,
                "insult": 0.88,
                "threat": 0.11,
            },
        )

        result = predict_text(
            TextInput(
                text="You are stupid.",
            ),
        )

        assert result["prediction"] == "Toxic"

        assert result["risk_score"] >= (services.settings.HF_THRESHOLD * 100)

        assert "Toxic" in result["categories"]

        assert "Insult" in result["categories"]

        assert isinstance(
            result["raw_predictions"],
            dict,
        )

    def test_multiple_categories(
        self,
        monkeypatch: pytest.MonkeyPatch,
    ) -> None:
        """
        All labels above threshold should appear.
        """

        patch_engine(
            monkeypatch,
            {
                "toxic": 0.92,
                "insult": 0.84,
                "threat": 0.71,
                "obscene": 0.63,
            },
        )

        result = predict_text(
            TextInput(
                text="I hate you.",
            ),
        )

        assert result["prediction"] == "Toxic"

        assert set(
            result["categories"],
        ) == {
            "Insult",
            "Obscene",
            "Threat",
            "Toxic",
        }

    def test_all_scores_below_threshold(
        self,
        monkeypatch: pytest.MonkeyPatch,
    ) -> None:
        """
        Prediction remains Safe below threshold.
        """

        patch_engine(
            monkeypatch,
            {
                "toxic": 0.20,
                "insult": 0.18,
                "threat": 0.09,
            },
        )

        result = predict_text(
            TextInput(
                text="Hello there.",
            ),
        )

        assert result["prediction"] == "Safe"

        assert result["categories"] == []

        assert result["risk_score"] < (services.settings.HF_THRESHOLD * 100)

    def test_raw_predictions_are_preserved(
        self,
        monkeypatch: pytest.MonkeyPatch,
    ) -> None:
        """
        Raw probabilities should be returned unchanged.
        """

        probabilities = {
            "toxic": 0.91,
            "insult": 0.72,
            "threat": 0.14,
        }

        patch_engine(
            monkeypatch,
            probabilities,
        )

        result = predict_text(
            TextInput(
                text="Dummy text",
            ),
        )

        assert isinstance(
            result["raw_predictions"],
            dict,
        )

        assert result["raw_predictions"] == {
            key: round(value, 6) for key, value in probabilities.items()
        }

    def test_empty_input_validation(
        self,
    ) -> None:
        """
        Empty input should be rejected by the schema.
        """

        with pytest.raises(
            ValidationError,
        ):
            TextInput(
                text="",
            )

    def test_preprocessing_pipeline_is_used(
        self,
        monkeypatch: pytest.MonkeyPatch,
    ) -> None:
        """
        Ensure preprocessing happens before inference.
        """

        captured: dict[str, Any] = {}

        def fake_preprocess(
            text: str,
        ) -> str:
            captured["original"] = text
            return "processed text"

        class RecordingEngine:
            def predict(
                self,
                text: str,
            ) -> dict[str, float]:
                captured["processed"] = text

                return {
                    "toxic": 0.05,
                }

        monkeypatch.setattr(
            services,
            "preprocess_text",
            fake_preprocess,
        )

        monkeypatch.setattr(
            services,
            "get_engine",
            lambda: RecordingEngine(),
        )

        result = predict_text(
            TextInput(
                text="Original Text",
            ),
        )

        assert captured["original"] == "Original Text"

        assert captured["processed"] == "processed text"

        assert result["prediction"] == "Safe"

    def test_engine_exception_is_reraised(
        self,
        monkeypatch: pytest.MonkeyPatch,
    ) -> None:
        """
        Engine failures should propagate.
        """

        monkeypatch.setattr(
            services,
            "get_engine",
            lambda: BrokenEngine(),
        )

        with pytest.raises(
            RuntimeError,
            match="Simulated inference failure",
        ):
            predict_text(
                TextInput(
                    text="hello",
                ),
            )

    def test_response_schema(
        self,
        monkeypatch: pytest.MonkeyPatch,
    ) -> None:
        """
        API response should preserve the public schema.
        """

        patch_engine(
            monkeypatch,
            {
                "toxic": 0.90,
                "insult": 0.80,
            },
        )

        result = predict_text(
            TextInput(
                text="hello",
            ),
        )

        expected_keys = {
            "prediction",
            "confidence",
            "risk_score",
            "matched_words",
            "categories",
            "raw_predictions",
        }

        assert set(result.keys()) == expected_keys
