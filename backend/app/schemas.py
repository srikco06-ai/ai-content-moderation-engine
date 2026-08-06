from typing import Any

from pydantic import BaseModel, Field, field_validator


class TextInput(BaseModel):
    text: str = Field(
        ...,
        min_length=1,
        description="Text content to analyze for toxicity.",
    )

    @field_validator("text")
    @classmethod
    def validate_text(cls, value: str) -> str:
        """
        Reject whitespace-only input.
        """

        value = value.strip()

        if not value:
            raise ValueError("Text cannot be blank.")

        return value


class PredictionResponse(BaseModel):
    prediction: str = Field(
        ...,
        description="Overall moderation prediction.",
    )

    confidence: float = Field(
        ...,
        description="Prediction confidence percentage.",
    )

    risk_score: float = Field(
        ...,
        description="Overall calculated risk score.",
    )

    matched_words: list[str] = Field(
        default_factory=list,
        description="Matched toxic words detected in the input.",
    )

    categories: list[str] = Field(
        default_factory=list,
        description="Detected moderation categories.",
    )

    raw_predictions: dict[str, Any] = Field(
        default_factory=dict,
        description="Raw prediction values.",
    )


class HealthResponse(BaseModel):
    status: str = Field(
        ...,
        description="Application health status.",
    )

    service_ready: bool = Field(
        ...,
        description="Whether the moderation service is ready.",
    )

    version: str = Field(
        ...,
        description="Current API version.",
    )


class ErrorResponse(BaseModel):
    detail: str = Field(
        ...,
        description="Error message.",
    )
