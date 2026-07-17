from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import TextInput
from app.services import predict_text


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "AI Content Moderation API Running"
    }


@app.post("/predict")
def predict(data: TextInput):
    return predict_text(data)