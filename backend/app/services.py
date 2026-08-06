"""
Business logic for AI Content Moderation.

Responsibilities
----------------
* Text preprocessing
* Transformer inference
* Business rule mapping
* API response generation

The transformer inference itself is delegated to ToxicBertEngine.
"""

from __future__ import annotations

from app.config import settings
from app.logging_config import get_logger
from app.preprocessing import preprocess_text
from app.schemas import TextInput
from app.toxicbert_engine import get_engine

logger = get_logger(__name__)


LABEL_MAP = {
    "toxic": "Toxic",
    "severe_toxic": "Severe Toxic",
    "obscene": "Obscene",
    "threat": "Threat",
    "insult": "Insult",
    "identity_hate": "Identity Hate",
    "identity_attack": "Identity Attack",
    "sexual_explicit": "Sexual Explicit",
}


def _calculate_risk_score(
    probabilities: dict[str, float],
) -> float:
    """
    Overall moderation risk score (0-100).

    Uses the highest probability returned by the model.
    """

    if not probabilities:
        return 0.0

    return round(max(probabilities.values()) * 100.0, 2)


def _prediction_from_score(score: float) -> str:
    """
    Convert a risk score into the public API prediction.
    """

    threshold = settings.HF_THRESHOLD * 100

    if score >= threshold:
        return "Toxic"

    return "Safe"


def _confidence(
    probabilities: dict[str, float],
) -> float:
    """
    Return overall confidence percentage.
    """

    if not probabilities:
        return 0.0

    return round(max(probabilities.values()) * 100.0, 2)


def _categories(
    probabilities: dict[str, float],
) -> list[str]:
    """
    Return moderation categories whose probability exceeds
    the configured threshold.
    """

    threshold = settings.HF_THRESHOLD

    categories = [
        LABEL_MAP.get(
            label,
            label.replace("_", " ").title(),
        )
        for label, probability in probabilities.items()
        if probability >= threshold
    ]

    categories.sort()

    return categories


def predict_text(data: TextInput) -> dict[str, object]:
    """
    Predict moderation result for user supplied text.

    Workflow
    --------
    1. Preprocess text.
    2. Run transformer inference.
    3. Compute business metrics.
    4. Return API response.
    """

    logger.debug("Running moderation service.")

    try:
        cleaned_text = preprocess_text(data.text)

        engine = get_engine()

        probabilities = engine.predict(cleaned_text)

        risk_score = _calculate_risk_score(probabilities)

        prediction = _prediction_from_score(risk_score)

        confidence = _confidence(probabilities)

        categories = _categories(probabilities)

        raw_predictions = {
            label: round(score, 6) for label, score in probabilities.items()
        }

        result = {
            "prediction": prediction,
            "confidence": confidence,
            "risk_score": risk_score,
            "matched_words": [],
            "categories": categories,
            "raw_predictions": raw_predictions,
        }

        logger.info(
            (
                "Moderation completed | "
                "prediction=%s "
                "confidence=%.2f "
                "risk_score=%.2f "
                "categories=%d"
            ),
            prediction,
            confidence,
            risk_score,
            len(categories),
        )

        return result

    except Exception:
        logger.exception("Unexpected error while running moderation.")
        raise
