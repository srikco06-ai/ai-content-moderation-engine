from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from detoxify import Detoxify

app = FastAPI()

# Lazy-loaded model
model = None


def get_model():
    global model

    if model is None:
        print("Loading Detoxify model...")
        model = Detoxify("original")

    return model


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TextInput(BaseModel):
    text: str


CATEGORY_MAP = {
    "toxic": "Toxic",
    "severe_toxic": "Severe Toxic",
    "obscene": "Obscene",
    "threat": "Threat",
    "insult": "Insult",
    "identity_attack": "Identity Hate",
}


RISK_WEIGHTS = {
    "toxic": 20,
    "severe_toxic": 25,
    "obscene": 15,
    "threat": 20,
    "insult": 10,
    "identity_attack": 20,
}


THRESHOLD = 0.5


@app.get("/")
def home():
    return {
        "message": "AI Content Moderation API Running"
    }


@app.post("/predict")
def predict(data: TextInput):
    text = data.text.strip()

    if not text:
        return {
            "label": "Safe",
            "confidence": 100.0,
            "risk_score": 0,
            "matched_words": [],
            "categories": [],
            "raw_predictions": {},
        }

    moderation_model = get_model()

    predictions = moderation_model.predict(text)

    cleaned_predictions = {
        key: float(value)
        for key, value in predictions.items()
    }

    categories = []
    risk_score = 0

    for key, score in cleaned_predictions.items():
        if key in CATEGORY_MAP and score >= THRESHOLD:
            categories.append(CATEGORY_MAP[key])
            risk_score += RISK_WEIGHTS.get(key, 0)

    risk_score = min(risk_score, 100)

    max_score = max(cleaned_predictions.values())

    label = "Toxic" if categories else "Safe"

    if label == "Toxic":
        confidence = round(max_score * 100, 2)
    else:
        confidence = round((1 - max_score) * 100, 2)

    raw_predictions = {
        key: round(value, 4)
        for key, value in cleaned_predictions.items()
        if key in CATEGORY_MAP
    }

    return {
        "label": label,
        "confidence": confidence,
        "risk_score": int(risk_score),
        "matched_words": [],
        "categories": categories,
        "raw_predictions": raw_predictions,
    }