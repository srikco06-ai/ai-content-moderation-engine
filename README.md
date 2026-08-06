# AI Content Moderation Engine

[![Python](https://img.shields.io/badge/Python-3.12+-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-success.svg)](LICENSE)

A production-ready AI-powered content moderation platform built with **FastAPI**, **Next.js 16**, **React 19**, and **TypeScript**. The application performs real-time moderation of user-generated text using a transformer-based **ToxicBERT** model, providing confidence scores, explainable moderation categories, and structured risk assessment through a modern full-stack architecture.

---

## Live Project

| Resource | Link |
| -------- | ---- |
| GitHub Repository | <https://github.com/srikco06-ai/ai-content-moderation-engine> |
| Frontend Demo | <https://your-vercel-app.vercel.app> |
| Backend API Documentation | <https://your-backend-domain/docs> |
| Portfolio | <https://srikco06-ai.vercel.app/> |
| LinkedIn | <https://www.linkedin.com/in/sri-krishna-chaitanya-ogirala-2522b660/> |

---

## Overview

The AI Content Moderation Engine is a production-oriented full-stack application that demonstrates modern AI application development using contemporary frontend and backend technologies.

The project accepts user-submitted text, performs AI-powered toxicity analysis using a transformer model, and returns structured moderation results including prediction confidence, calculated risk score, moderation categories, and explainable prediction outputs.

Rather than serving as a simple machine learning demonstration, the project is structured as a production-quality software system featuring modular architecture, REST API design, responsive frontend development, validation, testing, documentation, and deployment readiness.

---

## Key Features

### AI Moderation

- Transformer-based ToxicBERT inference
- Real-time text moderation
- Toxic vs Safe prediction
- Confidence score calculation
- Risk score estimation
- Explainable moderation results
- Toxic category detection
- Raw model probability outputs

---

### Backend

- FastAPI REST API
- Modular service architecture
- Request validation
- Structured JSON responses
- Automatic OpenAPI documentation
- Swagger UI
- Health monitoring endpoint
- Environment-based configuration
- Production logging
- Centralized exception handling

---

### Frontend

- Next.js 16 App Router
- React 19
- TypeScript
- Responsive dashboard
- Real-time moderation workflow
- Moderation history
- Search and filtering
- CSV export
- Reusable UI components
- Loading and error handling

---

### Engineering Quality

- Production-ready architecture
- Clean project organization
- Type-safe development
- Modular components
- Automated testing
- API validation
- Documentation
- Environment configuration
- Deployment ready
- GitHub portfolio ready

---

## Technology Stack

| Category | Technology |
| -------- | ---------- |
| Frontend | Next.js 16 |
| UI Library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Backend | FastAPI |
| AI Model | Unitary ToxicBERT |
| Machine Learning | Hugging Face Transformers |
| Deep Learning | PyTorch |
| Validation | Pydantic |
| API Documentation | OpenAPI / Swagger |
| Testing | Pytest |
| Code Quality | Ruff, Black, isort |
| Version Control | Git & GitHub |

---

## System Architecture

The AI Content Moderation Engine follows a modular client-server architecture that separates the presentation layer, API layer, business logic, and AI inference engine. This separation improves maintainability, scalability, testability, and deployment flexibility.

```text
                        User
                          │
                          ▼
               Next.js 16 Frontend
                          │
             HTTPS / REST API Requests
                          │
                          ▼
                  FastAPI Backend
                          │
          Request Validation (Pydantic)
                          │
                          ▼
              Moderation Service Layer
                          │
          Text Preprocessing Pipeline
                          │
                          ▼
            Transformer-based ToxicBERT
                          │
                Prediction Processing
                          │
                          ▼
          Confidence & Risk Calculation
                          │
                          ▼
               Structured JSON Response
                          │
                          ▼
               Results Dashboard (UI)
```

The frontend and backend communicate exclusively through REST APIs, allowing each application to evolve independently while maintaining a clean contract between services.

---

## Repository Structure

```text
ai-content-moderation-engine/
│
├── backend/
│   ├── app/
│   │   ├── config.py
│   │   ├── exception_handlers.py
│   │   ├── logging_config.py
│   │   ├── preprocessing.py
│   │   ├── schemas.py
│   │   ├── services.py
│   │   ├── toxicbert_engine.py
│   │   └── ...
│   │
│   ├── tests/
│   │   ├── api/
│   │   ├── integration/
│   │   ├── infrastructure/
│   │   ├── validation/
│   │   └── services/
│   │
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── public/
│   ├── types/
│   ├── package.json
│   └── README.md
│
├── screenshots/
├── LICENSE
└── README.md
```

The repository is organized using a feature-oriented structure that separates frontend, backend, documentation, tests, and deployment assets into clearly defined modules.

---

## Application Workflow

A moderation request follows the sequence below.

1. The user enters text through the Next.js frontend.
2. Client-side validation checks the request.
3. The frontend submits a POST request to the FastAPI backend.
4. FastAPI validates the request using Pydantic models.
5. The moderation service preprocesses the submitted text.
6. ToxicBERT performs transformer inference.
7. Prediction probabilities are processed into moderation results.
8. Confidence score and risk score are calculated.
9. A structured JSON response is returned.
10. The frontend renders the moderation dashboard and updates the moderation history.

This workflow keeps AI inference isolated from presentation logic while providing a responsive user experience.

---

## Backend Architecture

The backend follows a layered architecture that separates API routing, validation, business logic, AI inference, configuration, and infrastructure concerns.

```text
HTTP Request
      │
      ▼
FastAPI Router
      │
      ▼
Pydantic Validation
      │
      ▼
Moderation Service
      │
      ▼
Text Preprocessing
      │
      ▼
ToxicBERT Inference
      │
      ▼
Prediction Processing
      │
      ▼
Risk Assessment
      │
      ▼
JSON Response
```

Each layer has a single responsibility, making the backend easier to maintain, extend, and test.

---

## Frontend Architecture

The frontend is built using the Next.js App Router and reusable React components.

```text
Browser
    │
    ▼
Next.js App Router
    │
    ▼
Page Components
    │
    ▼
Reusable UI Components
    │
    ▼
Custom Hooks
    │
    ▼
API Client
    │
    ▼
FastAPI Backend
```

Application state is managed using React Hooks and local component state, avoiding unnecessary global state libraries while keeping the implementation simple and maintainable.

---

## AI Moderation Pipeline

The moderation engine processes submitted text through multiple stages before generating the final prediction.

```text
Raw Text
    │
    ▼
Input Validation
    │
    ▼
Text Preprocessing
    │
    ▼
Tokenizer
    │
    ▼
Transformer (ToxicBERT)
    │
    ▼
Raw Prediction Scores
    │
    ▼
Confidence Calculation
    │
    ▼
Risk Score Calculation
    │
    ▼
Category Extraction
    │
    ▼
Structured Response
```

This pipeline separates preprocessing, model inference, and response generation, allowing each stage to be tested and improved independently.

---

## Design Principles

The project was developed using several software engineering principles.

- Separation of concerns
- Modular architecture
- Reusable components
- Type-safe development
- REST-first API design
- Environment-based configuration
- Production-oriented project structure
- Automated validation and testing
- Maintainable code organization
- Deployment readiness

---

## Getting Started

Follow the steps below to set up the project locally for development.

---

## Prerequisites

Before running the project, ensure the following software is installed:

| Software | Version |
| -------- | ------- |
| Python | 3.12 or later |
| Node.js | 20 or later |
| npm | Latest |
| Git | Latest |

---

## Clone the Repository

```bash
git clone https://github.com/srikco06-ai/ai-content-moderation-engine.git

cd ai-content-moderation-engine
```

---

## Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

Create a virtual environment.

## Windows

```bash
python -m venv .venv
```

Activate the virtual environment.

### PowerShell

```powershell
.venv\Scripts\Activate.ps1
```

### Command Prompt

```cmd
.venv\Scripts\activate.bat
```

### macOS / Linux

```bash
source .venv/bin/activate
```

---

Install the required dependencies.

```bash
pip install -r requirements.txt
```

---

## Backend Environment Variables

Create a `.env` file inside the backend directory.

Example configuration:

```env
HOST=0.0.0.0
PORT=8000
LOG_LEVEL=INFO
HF_TOKEN=your_huggingface_token_optional
```

The Hugging Face token is optional but recommended to avoid anonymous download rate limits when retrieving model files.

---

## Start the Backend

Run the FastAPI development server.

```bash
uvicorn main:app --reload
```

The backend will be available at:

```text
http://localhost:8000
```

Swagger UI:

```text
http://localhost:8000/docs
```

OpenAPI Schema:

```text
http://localhost:8000/openapi.json
```

---

## Frontend Setup

Open a second terminal.

Navigate to the frontend directory.

```bash
cd frontend
```

Install project dependencies.

```bash
npm install
```

---

## Frontend Environment Variables

Create a `.env.local` file.

Example configuration:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

### Start the Frontend

Run the Next.js development server.

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:3000
```

---

## Running the Complete Application

Start the backend first.

```bash
cd backend
uvicorn main:app --reload
```

Open another terminal.

```bash
cd frontend
npm run dev
```

Visit:

```text
http://localhost:3000
```

Submit text through the moderation interface to verify communication between the frontend and backend.

---

## Development Commands

### Backend Commands

Install dependencies.

```bash
pip install -r requirements.txt
```

Run the application.

```bash
uvicorn main:app --reload
```

Run tests.

```bash
pytest
```

Run with coverage.

```bash
pytest --cov
```

Format code.

```bash
black .
```

Sort imports.

```bash
isort .
```

Run linting.

```bash
ruff check .
```

---

### Frontend Commands

Install dependencies.

```bash
npm install
```

Start development.

```bash
npm run dev
```

Run ESLint.

```bash
npm run lint
```

Create a production build.

```bash
npm run build
```

Run the production server.

```bash
npm start
```

---

## API Documentation

FastAPI automatically generates interactive API documentation.

| Resource | URL |
| -------- | --- |
| Swagger UI | <http://localhost:8000/docs> |
| OpenAPI JSON | <http://localhost:8000/openapi.json> |

The API exposes the following endpoints.

| Method | Endpoint | Description |
| -------- | ------ | ----------- |
| GET | `/` | API information |
| GET | `/health` | Health status |
| POST | `/predict` | Analyze submitted text |

---

## Example API Request

```http
POST /predict
Content-Type: application/json
```

```json
{
  "text": "You are amazing."
}
```

---

## Example API Response

```json
{
  "prediction": "Safe",
  "confidence": 99.92,
  "risk_score": 0.08,
  "matched_words": [],
  "categories": [],
  "raw_predictions": {
    "toxic": 0.0008,
    "severe_toxic": 0.0001,
    "obscene": 0.0002,
    "threat": 0.0000,
    "insult": 0.0003,
    "identity_hate": 0.0000
  }
}
```

---

## Production Build

### Frontend Build Commands

```bash
npm run build
npm start
```

### Backend Build Commands

```bash
uvicorn main:app
```

The application is designed for production deployment with separate frontend and backend services.

---

## Testing

The project includes automated tests covering API endpoints, service logic, validation, configuration, and integration workflows.

### Backend Tests

Run all tests:

```bash
pytest
```

Run with coverage:

```bash
pytest --cov
```

The test suite covers:

- API endpoint validation
- Health endpoint verification
- Prediction endpoint testing
- Request validation
- Service layer testing
- Configuration loading
- Exception handling
- Integration workflow testing

---

## Code Quality

The project follows modern Python and TypeScript development practices.

### Python

Formatting:

```bash
black .
```

Import sorting:

```bash
isort .
```

Linting:

```bash
ruff check .
```

### Frontend Lint Commands

Linting:

```bash
npm run lint
```

Production build verification:

```bash
npm run build
```

These tools help maintain consistent code quality and reduce defects before deployment.

---

## Deployment

The frontend and backend are designed to be deployed independently.

### Frontend Deployment

Recommended platform:

- Vercel

Required environment variable:

```env
NEXT_PUBLIC_API_URL=<backend-url>
```

---

### Backend Deployment

Compatible with platforms such as:

- Render
- Railway
- Azure App Service
- DigitalOcean App Platform
- Docker-based deployments

Example production command:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## Screenshots

The repository includes screenshots demonstrating the application interface.

- Homepage
- Moderation Dashboard
- Toxic Content Detection
- Safe Content Detection
- Swagger API Documentation

Screenshots will be added after the production deployment is complete.

---

## Future Improvements

Potential future enhancements include:

- User authentication and authorization
- Role-based access control (RBAC)
- Moderation analytics dashboard
- Persistent database storage
- Batch moderation API
- Asynchronous inference queue
- Multi-language moderation
- Model version management
- Streaming API support
- Docker and Kubernetes deployment
- CI/CD pipeline automation
- Rate limiting and API key management
- Admin moderation console
- Explainability visualizations
- Additional transformer model support

---

## Project Highlights

This project demonstrates practical experience in:

- AI application development
- Transformer model integration
- FastAPI backend engineering
- Next.js full-stack development
- REST API design
- Type-safe frontend development
- Production-oriented architecture
- Automated testing
- Documentation
- Deployment readiness
- Git and GitHub workflows

---

## License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for details.

---

## Author

### Sri Krishna Chaitanya Ogirala

AI & Machine Learning Engineer | Full-Stack AI Developer

- GitHub: <https://github.com/srikco06-ai>
- LinkedIn: <https://www.linkedin.com/in/sri-krishna-chaitanya-ogirala-2522b660/>
- Portfolio: <https://srikco06-ai.vercel.app/>

---

## Acknowledgements

This project is built using several outstanding open-source technologies.

- FastAPI
- Next.js
- React
- TypeScript
- Tailwind CSS
- Hugging Face Transformers
- PyTorch
- Pydantic

Their communities and maintainers continue to make modern AI application development faster, more reliable, and more accessible.

---

## Support

If you found this repository useful:

- ⭐ Star the repository
- 🍴 Fork the project
- 💡 Open an issue for bugs or feature requests
- 🤝 Submit a pull request with improvements

---

**Built with ❤️ using FastAPI, Next.js, React, TypeScript, and Transformer-based AI.**
