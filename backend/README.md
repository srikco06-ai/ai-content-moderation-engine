# Backend

Production-ready **FastAPI** backend for the **AI Content Moderation Engine**.

The backend exposes REST APIs for AI-powered text moderation, request validation, risk assessment, confidence scoring, and structured JSON responses consumed by the frontend.

---

## Overview

The backend is responsible for:

- Accepting moderation requests
- Validating incoming data
- Running AI-powered moderation
- Calculating confidence and risk scores
- Returning structured prediction results
- Exposing REST API endpoints
- Providing health monitoring
- Serving OpenAPI documentation

---

## Technology Stack

| Category | Technology |
| -------- | ---------- |
| Framework | FastAPI |
| Language | Python 3.12+ |
| Validation | Pydantic |
| ASGI Server | Uvicorn |
| API Documentation | OpenAPI, Swagger UI |

---

## Features for Backend

- RESTful API
- AI-powered content moderation
- Request validation
- Structured JSON responses
- Health monitoring endpoint
- Interactive Swagger UI
- Automatic OpenAPI generation
- Consistent error handling
- Modular architecture
- Production-ready project structure

---

## Project Structure

```text
backend/
├── app/
│   ├── api/
│   ├── core/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── main.py
│   └── ...
├── requirements.txt
├── .env
└── README.md
```

---

## Backend Architecture

```text
Client
   │
   ▼
FastAPI Router
   │
   ▼
Request Validation
   │
   ▼
Moderation Service
   │
   ▼
Risk Analysis
   │
   ▼
Response Model
   │
   ▼
JSON Response
```

---

## API Endpoints

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/` | API information |
| GET | `/health` | Health check |
| POST | `/predict` | Analyse submitted text |

---

## Example Request

```http
POST /predict
Content-Type: application/json
```

```json
{
  "text": "You are amazing. Thank you for your support!"
}
```

---

## Example Response

```json
{
  "prediction": "safe",
  "confidence": 0.99,
  "risk_score": 0.02,
  "categories": [],
  "matched_words": []
}
```

---

## Configuration

Create a `.env` file and configure the required environment variables.

Example:

```env
HOST=0.0.0.0
PORT=8000
```

Additional configuration can be added as the application evolves.

---

## Running Locally

Create a virtual environment.

```bash
python -m venv .venv
```

Activate the environment.

### Windows

```bash
.venv\Scripts\activate
```

### macOS / Linux

```bash
source .venv/bin/activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

Start the development server.

```bash
uvicorn app.main:app --reload
```

The API will be available at:

```text
http://localhost:8000
```

Swagger UI:

```text
http://localhost:8000/docs
```

---

## Deployment

The backend is designed for deployment on **Render**.

Deployment checklist:

- Configure environment variables
- Install Python dependencies
- Start the application with Uvicorn
- Verify the `/health` endpoint
- Verify the `/predict` endpoint
- Verify Swagger documentation

---

## Related Documentation

- Root documentation: `../README.md`
- Frontend documentation: `../frontend/README.md`

---

## License

This project is licensed under the **MIT License**.
