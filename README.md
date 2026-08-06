# AI Content Moderation Engine

> **Production-ready AI-powered content moderation platform built with FastAPI, Next.js, React, TypeScript, and Hugging Face ToxicBERT.**

![Python](https://img.shields.io/badge/Python-3.12+-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-2.13-EE4C2C?logo=pytorch&logoColor=white)
![Transformers](https://img.shields.io/badge/HuggingFace-Transformers-FFD21E?logo=huggingface&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Overview

AI Content Moderation Engine is a production-oriented full-stack AI application that performs intelligent text moderation using a transformer-based ToxicBERT model.

The application combines a modern Next.js frontend with a FastAPI backend to deliver fast, accurate, and explainable moderation results through a clean REST API and responsive user interface.

Rather than relying on keyword-based filtering, the backend performs contextual inference using a pretrained transformer model capable of identifying multiple forms of toxic language.

The project has been engineered with production software practices including modular architecture, automated testing, configuration management, structured logging, comprehensive validation, and maintainable documentation.

---

## Key Features

### AI Moderation

- Transformer-based ToxicBERT inference
- Multi-label toxicity detection
- Confidence scoring
- Risk score calculation
- Toxic category identification
- Configurable moderation threshold
- Text preprocessing pipeline
- Structured JSON responses

### Backend

- FastAPI REST API
- Pydantic v2 validation
- Centralized configuration
- Production logging
- Global exception handling
- OpenAPI specification
- Interactive Swagger UI
- Health monitoring endpoint
- Lazy model initialization
- Thread-safe inference engine

### Frontend

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Responsive interface
- FastAPI integration
- Loading and error states
- Modern component architecture

### Engineering Quality

- Modular architecture
- Environment-based configuration
- Type-safe implementation
- Automated testing
- Code formatting
- Static analysis
- Production-ready repository structure

---

## Technology Stack

| Layer | Technologies |
| ----- | ------------ |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS |
| Backend | FastAPI, Uvicorn, Pydantic v2 |
| AI | Hugging Face Transformers, ToxicBERT, PyTorch |
| Validation | Pydantic |
| Testing | Pytest |
| Code Quality | Black, Ruff |
| Package Managers | npm, pip |
| Version Control | Git, GitHub |

---

## Why This Project?

Online platforms process enormous volumes of user-generated content every day.

Traditional keyword filtering approaches are often inaccurate because they cannot understand context.

This project demonstrates how modern transformer models can be integrated into a production-ready web application that performs contextual content moderation while exposing a clean API suitable for real-world integration.

The repository has been developed as a portfolio-quality software engineering project that demonstrates:

- AI model integration
- Full-stack application development
- REST API design
- Production backend architecture
- Frontend-backend communication
- Automated testing
- Software quality practices
- Clean project organization

---

## High-Level Architecture

```text
                    User
                      │
                      ▼
         Next.js 16 + React Frontend
                      │
               REST API Requests
                      │
                      ▼
              FastAPI Application
                      │
        Request Validation (Pydantic)
                      │
                      ▼
            Text Preprocessing
                      │
                      ▼
         ToxicBERT Inference Engine
                      │
                      ▼
      Hugging Face Transformer Model
                      │
                      ▼
      Business Logic & Risk Analysis
                      │
                      ▼
           Structured JSON Response
```

---

## Repository Structure

```text
ai-content-moderation-engine/
├── .github/
│   └── workflows/
├── backend/
│   ├── app/
│   │   ├── config.py
│   │   ├── exception_handlers.py
│   │   ├── logging_config.py
│   │   ├── preprocessing.py
│   │   ├── schemas.py
│   │   ├── services.py
│   │   └── toxicbert_engine.py
│   ├── tests/
│   │   ├── api/
│   │   ├── infrastructure/
│   │   ├── integration/
│   │   ├── services/
│   │   └── validation/
│   ├── .env.example
│   ├── requirements.txt
│   └── main.py
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/
│   ├── types/
│   ├── utils/
│   └── package.json
├── .gitignore
├── LICENSE
└── README.md
```

The repository is organized into independent frontend and backend applications while maintaining a unified development workflow. This separation allows each component to evolve independently while communicating through a well-defined REST API.

---

## Quick Start

### Prerequisites

Install the following software before running the project:

- Python 3.12 or later
- Node.js 20 or later
- npm
- Git

---

## Clone the Repository

```bash
git clone https://github.com/<your-username>/ai-content-moderation-engine.git

cd ai-content-moderation-engine
```

Replace `<your-username>` with your GitHub username.

---

## Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

Create a virtual environment.

### Windows

```bash
python -m venv .venv
```

Activate the virtual environment.

```powershell
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

Verify that all installed packages are compatible.

```bash
pip check
```

Start the FastAPI development server.

```bash
uvicorn main:app --reload
```

Once the application starts successfully, the backend will be available at:

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

## Frontend Setup

Open a new terminal.

Navigate to the frontend directory.

```bash
cd frontend
```

Install the project dependencies.

```bash
npm install
```

Create a local environment file named:

```text
.env.local
```

Add the backend API URL.

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Start the development server.

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:3000
```

During development:

- Frontend requests are sent to the FastAPI backend.
- Moderation results are returned as structured JSON.
- The interface updates dynamically based on API responses.

---

## Running the Complete Application

Start the backend first.

```bash
cd backend

uvicorn main:app --reload
```

Open a second terminal and start the frontend.

```bash
cd frontend

npm run dev
```

Then open your browser.

```text
Frontend
http://localhost:3000

Backend
http://localhost:8000

Swagger UI
http://localhost:8000/docs
```

The frontend communicates with the backend through REST API requests. The backend performs text preprocessing, runs ToxicBERT inference, calculates moderation metrics, and returns structured results for presentation in the user interface.

---

## Environment Variables

The backend is configured through environment variables to simplify local development and production deployments.

### Backend (`backend/.env`)

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

- Disable debug mode.
- Restrict allowed origins.
- Store secrets using the deployment platform's environment configuration.

---

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Update this value to your deployed backend URL before deploying the frontend.

---

## REST API Overview

The backend exposes a small, focused REST API.

| Method | Endpoint | Purpose |
| ------- | -------- | ------ |
| GET | `/` | Service information |
| GET | `/health` | Health check |
| POST | `/predict` | Analyze submitted text |

The API returns structured JSON responses designed for frontend integration and third-party clients.

---

## Prediction Endpoint

### Request

```http
POST /predict
Content-Type: application/json
```

```json
{
  "text": "You are amazing. Thank you for your support."
}
```

---

### Successful Response

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

The exact confidence values and category probabilities depend on the ToxicBERT model's inference results.

---

## Health Endpoint

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

This endpoint can be used by deployment platforms, monitoring systems, and load balancers to verify service availability.

---

## API Documentation

FastAPI automatically generates interactive API documentation.

| Documentation | URL |
| ------------- | --- |
| Swagger UI | `http://localhost:8000/docs` |
| OpenAPI Specification | `http://localhost:8000/openapi.json` |

These endpoints are useful during development, testing, and API integration.

---

## Testing & Code Quality

The backend follows a quality-first development workflow.

### Automated Testing

The project includes automated tests covering:

- API endpoints
- Request validation
- Moderation service
- Integration workflows
- Configuration
- Logging
- Exception handling

Current backend status:

- 66 automated tests passing

---

### Code Formatting

Source code is formatted using Black.

```bash
black backend
```

---

### Static Analysis

Linting is performed using Ruff.

```bash
ruff check backend
```

---

### Bytecode Compilation

Compile all Python modules to verify syntax.

```bash
python -m compileall backend
```

---

### Dependency Verification

Verify installed packages.

```bash
pip check
```

---

### Running the Test Suite

Execute the complete backend test suite.

```bash
pytest
```

For test coverage:

```bash
pytest --cov=app
```

These quality checks are intended to help maintain code reliability and catch issues before deployment.

---

## Project Highlights

This project demonstrates practical software engineering practices beyond implementing a machine learning model.

Highlights include:

- Production-oriented FastAPI backend
- Transformer-based ToxicBERT inference
- Modern Next.js frontend
- RESTful API architecture
- Centralized configuration management
- Comprehensive request validation
- Structured logging
- Global exception handling
- Strong type safety using Pydantic v2 and TypeScript
- Automated testing across multiple layers
- Clean repository organization
- Environment-based configuration
- Production-ready project structure

The repository has been designed to serve as both a portfolio project and a foundation for future enhancements.

---

## Screenshots

Screenshots will be added after the frontend deployment is finalized.

Suggested screenshots include:

- Home page
- Text moderation interface
- Prediction results
- Swagger UI
- Health endpoint
- Responsive mobile layout

---

## Future Roadmap

The current version focuses on transformer-based text moderation.

Potential future enhancements include:

- User authentication
- Persistent moderation history
- Database integration
- User dashboard
- Image moderation
- Multi-language moderation
- Batch moderation requests
- Analytics dashboard
- Docker containerization
- Continuous deployment pipeline
- Cloud-native deployment
- Role-based access control

---

## Documentation

Additional documentation is available within the repository.

| Document | Description |
| -------- | ----------- |
| `backend/README.md` | Backend architecture, configuration, deployment, and API details |
| `frontend/README.md` | Frontend architecture, development workflow, and deployment |
| `LICENSE` | Project license |

---

## Contributing

Contributions are welcome.

If you would like to contribute:

- Fork the repository.
- Create a feature branch.

```bash
git checkout -b feature/your-feature
```

- Commit your changes.

```bash
git commit -m "Add your feature"
```

- Push the branch.

```bash
git push origin feature/your-feature
```

- Open a Pull Request.

Please ensure that:

- Code follows the existing style.
- Tests continue to pass.
- Documentation is updated where necessary.

---

## License

This project is licensed under the MIT License.

See the `LICENSE` file for additional information.

---

## Acknowledgements

This project makes use of several outstanding open-source technologies, including:

- FastAPI
- Next.js
- React
- TypeScript
- Hugging Face Transformers
- PyTorch
- Tailwind CSS
- Pydantic
- Uvicorn
- Pytest

Their contributions to the open-source ecosystem make projects like this possible.
