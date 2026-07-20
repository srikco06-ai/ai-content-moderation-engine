"""
Unit tests for the moderation service.
"""

from app.schemas import TextInput
from app.services import predict_text


class TestModerationService:
    """
    Unit tests for predict_text().
    """

    def test_safe_text(self) -> None:
        """Safe text should produce a Safe prediction."""

        result = predict_text(
            TextInput(text="Have a wonderful day.")
        )

        assert result["prediction"] == "Safe"
        assert result["confidence"] == 99.0
        assert result["risk_score"] == 0.0
        assert result["matched_words"] == []
        assert result["categories"] == []
        assert result["raw_predictions"] == {}

    def test_single_toxic_word(self) -> None:
        """One toxic word should be detected."""

        result = predict_text(
            TextInput(text="You are stupid.")
        )

        assert result["prediction"] == "Toxic"
        assert result["risk_score"] == 20.0
        assert result["confidence"] == 66.0
        assert result["matched_words"] == ["stupid"]
        assert result["categories"] == ["Insult"]

    def test_multiple_toxic_words(self) -> None:
        """Multiple toxic words should accumulate risk."""

        result = predict_text(
            TextInput(
                text="You are a stupid idiot and I hate you."
            )
        )

        assert result["prediction"] == "Toxic"
        assert result["risk_score"] == 65.0
        assert result["confidence"] == 79.5

        assert set(result["matched_words"]) == {
            "stupid",
            "idiot",
            "hate",
        }

        assert set(result["categories"]) == {
            "Insult",
            "Toxic",
        }

    def test_risk_score_cap(self) -> None:
        """Risk score should never exceed 100."""

        result = predict_text(
            TextInput(
                text=(
                    "kill die hate stupid idiot "
                    "moron loser trash fool dumb"
                )
            )
        )

        assert result["risk_score"] == 100.0
        assert result["prediction"] == "Toxic"

    def test_case_insensitive_matching(self) -> None:
        """Matching should ignore letter case."""

        result = predict_text(
            TextInput(text="I HATE this STUPID idea.")
        )

        assert "hate" in result["matched_words"]
        assert "stupid" in result["matched_words"]

    def test_whitespace_is_trimmed(self) -> None:
        """Leading/trailing whitespace should be ignored."""

        result = predict_text(
            TextInput(
                text="     idiot     "
            )
        )

        assert result["prediction"] == "Toxic"
        assert result["matched_words"] == ["idiot"]

    def test_category_is_not_duplicated(self) -> None:
        """Categories should not contain duplicates."""

        result = predict_text(
            TextInput(
                text="stupid idiot moron"
            )
        )

        assert result["categories"] == ["Insult"]

    def test_raw_predictions_is_empty_dict(self) -> None:
        """Raw predictions should currently be an empty dict."""

        result = predict_text(
            TextInput(text="hello")
        )

        assert result["raw_predictions"] == {}