from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.schemas import (
    HealthResponse,
    PredictionResponse,
    TextInput,
)
from app.services import predict_text


app = FastAPI(
    title=settings.APP_NAME,
    description=(
        "Production-ready REST API for AI-powered content moderation. "
        "Detects toxic, abusive, hateful, and offensive text using "
        "machine learning and rule-based analysis."
    ),
    version=settings.APP_VERSION,
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
    return predict_text(data)