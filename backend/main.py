from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import (
    HealthResponse,
    PredictionResponse,
    TextInput,
)
from app.services import predict_text

app = FastAPI(
    title="AI Content Moderation API",
    description=(
        "Production-ready REST API for AI-powered content moderation. "
        "Detects toxic, abusive, hateful, and offensive text using "
        "machine learning and rule-based analysis."
    ),
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get(
    "/",
    tags=["Health"],
    summary="API Status",
)
def home():
    return {
        "message": "AI Content Moderation API Running"
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
        "version": "1.0.0",
    }


@app.post(
    "/predict",
    response_model=PredictionResponse,
    tags=["Prediction"],
    summary="Analyze Text",
)
def predict(data: TextInput):
    return predict_text(data)