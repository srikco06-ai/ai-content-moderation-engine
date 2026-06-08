# AI Content Moderation Engine

A full-stack AI-powered content moderation application that analyzes user-submitted text, detects potentially toxic language, assigns risk scores, categorizes harmful content, and maintains moderation history.

## Live Demo

### Frontend Application

[Live Demo](https://ai-content-moderation-engine-production-aa71.up.railway.app/)

### Backend API Documentation

[API Documentation](https://ai-content-moderation-engine-production.up.railway.app/docs)

### GitHub Repository

[GitHub Repository](https://github.com/srikco06-ai/ai-content-moderation-engine)

---

## Overview

The AI Content Moderation Engine is a production-deployed full-stack web application designed to identify potentially harmful or toxic text in real time.

Users can submit text through a modern web interface and receive moderation results including:

* Toxicity classification
* Confidence score
* Risk score
* Category detection
* Moderation history tracking

The project demonstrates frontend-backend integration, REST API development, cloud deployment, and modern full-stack engineering practices.

---

## Features

* Real-time text moderation
* Toxic vs Safe classification
* Risk scoring system (0–100)
* Content categorization
* Moderation history tracking
* Analysis statistics dashboard
* REST API backend
* Public cloud deployment
* Interactive API documentation

---

## Tech Stack

### Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS

### Backend

* FastAPI
* Python
* Pydantic

### Deployment & DevOps

* Railway
* GitHub
* Git

---

## System Architecture

```text
User Browser
      │
      ▼
Next.js Frontend
      │
      ▼
REST API Request
      │
      ▼
FastAPI Backend
      │
      ▼
Content Moderation Engine
      │
      ▼
Risk Analysis & Categorization
      │
      ▼
JSON Response
```

---

## Screenshots

### Homepage

![Homepage](screenshots/homepage.png)

### Toxic Content Detection

![Toxic Example](screenshots/toxic-example.png)

### Safe Content Detection

![Safe Example](screenshots/safe-example.png)

### API Documentation

![API Docs](screenshots/api-docs.png)

---

## Running Locally

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend URL:

```text
http://localhost:8000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:3000
```

---

## API Usage Example

### API Request Example

```json
{
  "text": "stupid app"
}
```

### API Response Example

```json
{
  "label": "Toxic",
  "confidence": 66,
  "risk_score": 20,
  "matched_words": [
    "stupid"
  ],
  "categories": [
    "Insult"
  ]
}
```

---

## Skills Demonstrated

* Full-Stack Development
* REST API Design
* Frontend-Backend Integration
* Cloud Deployment
* API Testing
* Git & GitHub Workflow
* TypeScript Development
* Python Backend Development
* Application Deployment
* Software Documentation

---

## Future Enhancements

* Transformer-based NLP moderation models
* User authentication
* Admin moderation dashboard
* Analytics reporting
* Multi-language support
* Database persistence
* Export moderation reports
* Dark mode support

---

## Author

Sri Krishna Chaitanya

GitHub: [srikco06-ai](https://github.com/srikco06-ai)

LinkedIn: Add your LinkedIn profile URL here
