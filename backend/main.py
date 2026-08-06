from __future__ import annotations

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.exception_handlers import register_exception_handlers
from app.logging_config import configure_logging, get_logger
from app.schemas import (
    HealthResponse,
    PredictionResponse,
    TextInput,
)
from app.services import predict_text
from app.toxicbert_engine import get_engine

configure_logging()

logger = get_logger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan.

    Warms up the ToxicBERT model during startup so the first
    prediction request does not incur model loading latency.
    """

    logger.info("Application startup initiated.")

    try:
        get_engine().warmup()

        logger.info("ToxicBERT warmup completed successfully.")

    except Exception:
        logger.exception("Failed to warm up ToxicBERT.")
        raise

    yield

    logger.info("Application shutdown complete.")


app = FastAPI(
    title=settings.APP_NAME,
    description=(
        "Production-ready REST API for AI-powered content moderation. "
        "Detects toxic, abusive, hateful, and offensive text using "
        "a transformer-based ToxicBERT model."
    ),
    version=settings.APP_VERSION,
    lifespan=lifespan,
)

logger.info(
    "Application initialized | name=%s version=%s",
    settings.APP_NAME,
    settings.APP_VERSION,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOW_ORIGINS,
    allow_credentials=settings.ALLOW_CREDENTIALS,
    allow_methods=settings.ALLOW_METHODS,
    allow_headers=settings.ALLOW_HEADERS,
)

register_exception_handlers(app)


@app.get(
    "/",
    tags=["Health"],
    summary="API Status",
)
def home() -> dict[str, str]:
    """
    Root endpoint.
    """

    logger.debug("Root endpoint requested.")

    return {
        "message": f"{settings.APP_NAME} Running",
    }


@app.get(
    "/health",
    response_model=HealthResponse,
    tags=["Health"],
    summary="Health Check",
)
def health() -> HealthResponse:
    """
    Health check endpoint.
    """

    logger.debug("Health check requested.")

    return {
        "status": "healthy",
        "service_ready": True,
        "version": settings.APP_VERSION,
    }


@app.post(
    "/predict",
    response_model=PredictionResponse,
    tags=["Prediction"],
    summary="Analyze Text",
)
def predict(
    data: TextInput,
) -> PredictionResponse:
    """
    Analyze submitted text for toxicity.
    """

    logger.info(
        "Prediction request received | text_length=%d",
        len(data.text),
    )

    result = predict_text(data)

    logger.info(
        (
            "Prediction completed | "
            "prediction=%s "
            "confidence=%.2f "
            "risk_score=%.2f "
            "categories=%d"
        ),
        result["prediction"],
        result["confidence"],
        result["risk_score"],
        len(result["categories"]),
    )

    return PredictionResponse(**result)
