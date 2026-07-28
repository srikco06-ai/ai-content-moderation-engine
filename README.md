# AI Content Moderation Engine

> Production-ready AI-powered content moderation platform built with **Next.js 16**, **React 19**, **FastAPI**, **TypeScript**, and **Python**.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-009688)
![Python](https://img.shields.io/badge/Python-3.12+-3776AB)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Overview

AI Content Moderation Engine is a full-stack AI application that analyses user-submitted text and identifies potentially harmful or unsafe content.

The project combines a modern **Next.js** frontend with a **FastAPI** backend to provide real-time moderation results through a clean, responsive, and production-ready interface.

Predictions include:

- Safe vs Toxic classification
- Confidence score
- Risk score
- Moderation categories
- Matched keywords
- Structured API responses
- Moderation history

---

## Features for both

### Frontend

- Responsive dashboard
- Real-time moderation
- Modern UI with Tailwind CSS
- Search and filtering
- CSV export
- Loading and error states

### Backend

- FastAPI REST API
- AI-powered moderation
- Request validation
- Health check endpoint
- OpenAPI documentation
- Swagger UI

---

## Technology Stack

| Layer | Technology |
| ----- | ---------- |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS |
| Backend | FastAPI, Python, Pydantic, Uvicorn |
| AI | Machine Learning Moderation Engine |
| Tools | Git, GitHub, npm, pip |

---

## System Architecture

```text
                User
                  │
                  ▼
         Next.js + React
                  │
             REST API
                  │
                  ▼
            FastAPI Backend
                  │
          AI Moderation Engine
                  │
                  ▼
           JSON API Response
```

---

## Repository Structure

```text
ai-content-moderation-engine/
├── frontend/
├── backend/
├── screenshots/
├── .github/
├── LICENSE
└── README.md
```

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/<your-username>/ai-content-moderation-engine.git

cd ai-content-moderation-engine
```

### Backend Setup

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment.

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

Run the backend.

```bash
uvicorn app.main:app --reload
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create a `.env.local` file.

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## API Endpoints

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/` | API information |
| GET | `/health` | Health check |
| POST | `/predict` | Analyse submitted text |

---

## Deployment

| Component | Platform |
|-----------|----------|
| Frontend  | Vercel   |
| Backend   | Render   |

---

## Project Structure

This repository contains three main parts:

- **Frontend** – Next.js application
- **Backend** – FastAPI REST API
- **Documentation** – Project guides and setup instructions

For more details, see:

- [`frontend/README.md`](frontend/README.md)
- [`backend/README.md`](backend/README.md)

---

## Roadmap

Future enhancements include:

- User authentication
- Database integration
- Persistent moderation history
- Image moderation
- Multi-language support
- Analytics dashboard
- Docker support
- CI/CD pipeline

---

## Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a Pull Request.

---

## License

This project is licensed under the **MIT License**.
