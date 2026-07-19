from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.logging_config import configure_logging, get_logger
from app.schemas import (
    HealthResponse,
    PredictionResponse,
    TextInput,
)
from app.services import predict_text


# Configure logging before creating the application.
configure_logging()

logger = get_logger(__name__)


app = FastAPI(
    title=settings.APP_NAME,
    description=(
        "Production-ready REST API for AI-powered content moderation. "
        "Detects toxic, abusive, hateful, and offensive text using "
        "machine learning and rule-based analysis."
    ),
    version=settings.APP_VERSION,
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


@app.get(
    "/",
    tags=["Health"],
    summary="API Status",
)
def home():
    logger.debug("Root endpoint requested.")

    return {
        "message": f"{settings.APP_NAME} Running"
    }


@app.get(
    "/health",
    response_model=HealthResponse,
    tags=["Health"],
    summary="Health Check",
)
def health():
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
def predict(data: TextInput):
    logger.info(
        "Prediction request received | text_length=%d",
        len(data.text),
    )

    result = predict_text(data)

    logger.info(
        "Prediction completed | prediction=%s risk_score=%.2f",
        result["prediction"],
        result["risk_score"],
        len(result["matched_words"]),
    )

    return result