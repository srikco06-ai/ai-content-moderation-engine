# Backend

> **Production-ready FastAPI backend for the AI Content Moderation Engine, providing transformer-based text moderation through a clean, well-tested REST API.**

The backend is responsible for validating requests, preprocessing input text, running ToxicBERT inference, calculating moderation metrics, and returning structured JSON responses that are consumed by the Next.js frontend.

The application has been designed with production software engineering practices, including modular architecture, centralized configuration, structured logging, comprehensive validation, automated testing, and consistent error handling.

---

## Overview

The backend provides the following capabilities:

- RESTful API built with FastAPI
- Transformer-based ToxicBERT inference
- Text preprocessing pipeline
- Request validation using Pydantic
- Confidence score calculation
- Risk score calculation
- Toxic category detection
- Structured JSON responses
- Health monitoring endpoint
- Automatic OpenAPI documentation
- Centralized configuration
- Global exception handling
- Production logging

---

## Key Features

### AI Moderation

- Transformer-based ToxicBERT moderation
- Hugging Face Transformers integration
- PyTorch inference engine
- Multi-label toxicity prediction
- Configurable moderation threshold
- Confidence scoring
- Risk score calculation
- Toxic category identification
- Raw model probability output
- Text preprocessing before inference

### REST API

- FastAPI REST architecture
- Request validation with Pydantic v2
- Consistent JSON responses
- Automatic OpenAPI generation
- Interactive Swagger UI
- Health monitoring endpoint

### Production Engineering

- Modular backend architecture
- Environment-based configuration
- Structured logging
- Global exception handling
- Type-safe implementation
- Comprehensive automated testing
- Production-ready project structure

---

## Technology Stack

| Category | Technology |
| -------- | ---------- |
| Framework | FastAPI |
| Language | Python 3.12+ |
| AI Framework | Hugging Face Transformers |
| Deep Learning | PyTorch |
| Validation | Pydantic v2 |
| ASGI Server | Uvicorn |
| Testing | Pytest |
| Code Quality | Black, Ruff |
| Documentation | OpenAPI, Swagger UI |

---

## Project Structure

```text
backend/
├── app/
│   ├── config.py
│   ├── exception_handlers.py
│   ├── logging_config.py
│   ├── preprocessing.py
│   ├── schemas.py
│   ├── services.py
│   └── toxicbert_engine.py
├── tests/
│   ├── api/
│   ├── infrastructure/
│   ├── integration/
│   ├── services/
│   └── validation/
├── .env
├── .env.example
├── requirements.txt
├── main.py
└── README.md
```

The backend is organized into clearly separated modules responsible for configuration, request validation, preprocessing, AI inference, business logic, logging, exception handling, and automated testing.

---

## Request Lifecycle

Every moderation request follows the same processing pipeline.

```text
Client Request
      │
      ▼
FastAPI Endpoint
      │
      ▼
Pydantic Validation
      │
      ▼
Text Preprocessing
      │
      ▼
ToxicBERT Inference
      │
      ▼
Risk Analysis
      │
      ▼
Response Serialization
      │
      ▼
JSON Response
```

This pipeline keeps request processing predictable, maintainable, and easy to extend.

---

## AI Moderation Pipeline

Incoming text is normalized before being passed to the transformer model.

The moderation workflow consists of:

1. Input validation
2. Text preprocessing
3. ToxicBERT inference
4. Probability extraction
5. Confidence calculation
6. Risk score calculation
7. Toxic category identification
8. JSON response generation

Separating preprocessing, inference, and business logic keeps the moderation service modular and simplifies testing and future model upgrades.

---

## Configuration

The backend is configured using environment variables to simplify local development and production deployment.

All configuration values are loaded centrally, making it easy to maintain consistent behavior across environments without modifying the application source code.

---

## Environment Variables

Create a `.env` file inside the `backend` directory.

Example configuration:

```env
APP_NAME=AI Content Moderation API
APP_VERSION=1.0.0
DEBUG=True

API_PREFIX=

ALLOW_CREDENTIALS=True
ALLOW_ORIGINS=*
ALLOW_METHODS=*
ALLOW_HEADERS=*
```

For production deployments:

- Set `DEBUG=False`
- Restrict `ALLOW_ORIGINS` to trusted frontend domains
- Configure deployment-specific environment variables through the hosting platform

---

## Running Locally

Navigate to the backend directory.

```bash
cd backend
```

Create a virtual environment.

### Windows

```powershell
python -m venv .venv

.venv\Scripts\Activate.ps1
```

### macOS / Linux

```bash
python3 -m venv .venv

source .venv/bin/activate
```

Install the required dependencies.

```bash
pip install -r requirements.txt
```

Verify installed packages.

```bash
pip check
```

Start the FastAPI development server.

```bash
uvicorn main:app --reload
```

The backend will be available at:

```text
http://localhost:8000
```

Interactive API documentation:

```text
http://localhost:8000/docs
```

OpenAPI specification:

```text
http://localhost:8000/openapi.json
```

---

## REST API Endpoints

The backend exposes three REST endpoints.

| Method | Endpoint | Description |
| -------- | -------- | ----------- |
| GET | `/` | Service information |
| GET | `/health` | Health check |
| POST | `/predict` | Analyze submitted text |

---

## Prediction Endpoint

### Request

```http
POST /predict
Content-Type: application/json
```

Example request body:

```json
{
  "text": "You are amazing. Thank you for your support."
}
```

---

### Successful Response

Example response:

```json
{
  "prediction": "Safe",
  "confidence": 99.81,
  "risk_score": 0.19,
  "matched_words": [],
  "categories": [],
  "raw_predictions": {
    "toxic": 0.0012,
    "insult": 0.0008,
    "threat": 0.0001
  }
}
```

The exact confidence values and class probabilities depend on the ToxicBERT model output.

---

## Health Endpoint

Request:

```http
GET /health
```

Example response:

```json
{
  "status": "healthy",
  "service_ready": true,
  "version": "1.0.0"
}
```

The health endpoint is intended for deployment verification, uptime monitoring, and load balancer health checks.

---

## API Documentation

FastAPI automatically generates interactive API documentation.

| Resource | URL |
| -------- | --- |
| Swagger UI | `http://localhost:8000/docs` |
| OpenAPI Specification | `http://localhost:8000/openapi.json` |

These resources simplify API exploration, testing, and integration during development.

---

## Error Responses

The API uses standard HTTP status codes together with structured JSON error responses.

| Status Code | Description |
| ----------- | ----------- |
| `200 OK` | Request processed successfully |
| `400 Bad Request` | Invalid request payload |
| `422 Unprocessable Entity` | Request validation failed |
| `500 Internal Server Error` | Unexpected server error |

Validation errors are automatically generated by FastAPI and Pydantic, while unexpected exceptions are handled by the application's global exception handlers.

---

## Testing

The backend includes comprehensive automated tests covering the complete request lifecycle.

Current test coverage includes:

- API endpoint tests
- Moderation service tests
- Request validation tests
- Integration workflow tests
- Configuration tests
- Logging tests
- Exception handler tests

The backend currently contains **66 automated tests**, all of which pass successfully.

Run the complete test suite:

```bash
pytest
```

Run with verbose output:

```bash
pytest -v
```

Run with coverage:

```bash
pytest --cov=app
```

---

## Code Quality

The backend follows a quality-first development workflow.

### Code Formatting

Format the source code using Black.

```bash
black backend
```

---

### Import Organization

Organize imports using isort.

```bash
isort backend
```

---

### Static Analysis

Run Ruff to detect linting issues.

```bash
ruff check backend
```

---

### Python Compilation

Verify that all Python modules compile successfully.

```bash
python -m compileall backend
```

---

### Dependency Verification

Verify installed dependencies.

```bash
pip check
```

Performing these checks before every commit helps maintain a stable and consistent codebase.

---

## Deployment

The backend is designed to run in both local and cloud environments.

Typical deployment workflow:

1. Configure environment variables.
1. Install project dependencies.
1. Start the application using Uvicorn.
1. Verify the `/health` endpoint.
1. Verify the `/predict` endpoint.
1. Verify the Swagger UI.

Example production command:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## Troubleshooting

### Virtual environment not activated

Ensure the Python virtual environment is activated before installing packages or starting the application.

---

### Dependency installation issues

Verify that all required packages are installed.

```bash
pip install -r requirements.txt
```

Then verify dependency compatibility.

```bash
pip check
```

---

### Backend does not start

Verify that:

- Python 3.12 or later is installed.
- The virtual environment is activated.
- All dependencies are installed.
- The selected port is available.

---

### API documentation unavailable

Confirm that the backend is running successfully, then open:

```text
http://localhost:8000/docs
```

---

## Related Documentation

Additional project documentation is available in the repository.

- Root documentation: `../README.md`
- Frontend documentation: `../frontend/README.md`

---

## License

This project is licensed under the **MIT License**.

See the repository `LICENSE` file for complete license information.

---

## Acknowledgements

This backend is built using several open-source technologies, including:

- FastAPI
- Hugging Face Transformers
- PyTorch
- Pydantic
- Uvicorn
- Pytest
- Black
- Ruff

Their contributions to the open-source ecosystem make projects like this possible.
