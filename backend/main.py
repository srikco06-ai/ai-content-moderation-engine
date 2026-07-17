from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import TextInput

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


TOXIC_WORDS = {
    "stupid": ("Insult", 20),
    "idiot": ("Insult", 20),
    "moron": ("Insult", 20),
    "dumb": ("Insult", 15),
    "hate": ("Toxic", 25),
    "kill": ("Threat", 40),
    "die": ("Threat", 40),
    "loser": ("Insult", 15),
    "trash": ("Toxic", 20),
    "fool": ("Insult", 15),
}


@app.get("/")
def home():
    return {
        "message": "AI Content Moderation API Running"
    }


@app.post("/predict")
def predict(data: TextInput):

    text = data.text.strip().lower()

    if not text:
        return {
            "label": "Safe",
            "confidence": 100.0,
            "risk_score": 0,
            "matched_words": [],
            "categories": [],
            "raw_predictions": {},
        }

    matched_words = []
    categories = []
    risk_score = 0

    for word, (category, score) in TOXIC_WORDS.items():
        if word in text:
            matched_words.append(word)

            if category not in categories:
                categories.append(category)

            risk_score += score

    risk_score = min(risk_score, 100)

    if risk_score > 0:
        label = "Toxic"
        confidence = min(95.0, 60 + risk_score * 0.3)
    else:
        label = "Safe"
        confidence = 99.0

    return {
        "label": label,
        "confidence": round(confidence, 2),
        "risk_score": risk_score,
        "matched_words": matched_words,
        "categories": categories,
        "raw_predictions": {},
    }