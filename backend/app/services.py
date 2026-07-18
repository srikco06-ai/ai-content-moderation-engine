from app.schemas import TextInput


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


def predict_text(data: TextInput) -> dict:
    """
    Simple keyword-based moderation engine.
    """

    text = data.text.strip().lower()

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

    if risk_score == 0:
        prediction = "Safe"
        confidence = 99.0
    else:
        prediction = "Toxic"
        confidence = min(95.0, 60 + risk_score * 0.3)

    return {
        "prediction": prediction,
        "confidence": round(confidence, 2),
        "risk_score": float(risk_score),
        "matched_words": matched_words,
        "categories": categories,
        "raw_predictions": {},
    }