# Frontend

> **Production-ready Next.js frontend for the AI Content Moderation Engine, providing a responsive user interface for real-time AI-powered text moderation.**

The frontend delivers a modern, responsive, and type-safe user experience for interacting with the FastAPI backend. Users can submit text, receive moderation results in real time, and view confidence scores, risk assessments, detected categories, and additional moderation details through an intuitive interface.

The application has been designed using modern React and Next.js development practices, emphasizing reusable components, clean architecture, responsive layouts, and maintainable TypeScript code.

---

## Overview

The frontend provides the following capabilities:

- Real-time text moderation
- Responsive user interface
- Type-safe React development
- FastAPI REST API integration
- Dynamic moderation results
- Confidence score visualization
- Risk score visualization
- Toxic category display
- Matched keyword presentation
- Moderation history
- Search, filtering, and sorting
- CSV export
- Loading and error handling
- Production-ready project structure

---

## Key Features

### User Experience

- Modern responsive interface
- Mobile-friendly layouts
- Accessible UI components
- Fast page rendering
- Clean visual design
- Interactive moderation workflow

### AI Moderation Interface

- Text submission form
- Real-time moderation requests
- Confidence score display
- Risk score display
- Toxic category visualization
- Matched keyword highlighting
- Structured moderation results
- Moderation history
- CSV export functionality

### Engineering Quality

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Reusable components
- Modular architecture
- Environment-based configuration
- Production-ready build process

---

## Technology Stack

| Category | Technology |
| -------- | ---------- |
| Framework | Next.js 16 |
| UI Library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Package Manager | npm |
| API Communication | Fetch API |
| Backend Integration | FastAPI REST API |

---

## Project Structure

```text
frontend/
├── app/
├── components/
├── lib/
├── public/
├── types/
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

The frontend is organized into reusable UI components, application pages, shared utilities, static assets, and TypeScript type definitions. This separation keeps presentation, application logic, and configuration easy to maintain.

---

## Frontend Architecture

```text
Browser
     │
     ▼
Next.js App Router
     │
     ▼
React Components
     │
     ▼
API Client
     │
     ▼
FastAPI Backend
     │
     ▼
Prediction Response
     │
     ▼
Results Dashboard
```

The frontend communicates with the backend exclusively through REST API requests, allowing the user interface and backend services to evolve independently.

---

## Application Workflow

A typical moderation request follows this workflow:

1. User enters text.
1. Frontend validates the input.
1. Request is sent to the FastAPI backend.
1. Backend performs AI moderation.
1. JSON response is returned.
1. Results are rendered in the user interface.
1. Moderation history is updated.

This workflow provides immediate feedback while keeping the user experience responsive and consistent.

---

## State Management

The frontend uses lightweight React state management to keep the application simple, predictable, and maintainable.

State is managed through:

- React Hooks
- Local component state
- Custom hooks
- Browser Local Storage for moderation history

This approach eliminates the need for external global state libraries while providing excellent performance for the application's requirements.

---

## API Integration

The frontend communicates with the backend through the FastAPI REST API.

All moderation requests are sent to the backend using HTTP POST requests, and prediction results are returned as structured JSON.

Typical communication flow:

```text
User Input
      │
      ▼
React Component
      │
      ▼
Fetch API
      │
      ▼
FastAPI Backend
      │
      ▼
JSON Response
      │
      ▼
UI Update
```

This separation allows the frontend and backend to be developed, tested, and deployed independently.

---

## Environment Variables

Create a `.env.local` file inside the `frontend` directory.

Example configuration:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production deployments, update the value to point to the deployed backend service.

---

## Running Locally

Navigate to the frontend directory.

```bash
cd frontend
```

Install project dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

Ensure that the backend server is running before submitting moderation requests.

---

## Development Commands

Common development commands:

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run the production server:

```bash
npm start
```

These commands cover the complete local development workflow.

---

## Production Build

Create an optimized production build.

```bash
npm run build
```

Run the production application.

```bash
npm start
```

The production build performs optimization, static analysis, and TypeScript validation before generating the deployable application.

Before deployment, verify that:

- The build completes successfully.
- Environment variables are configured correctly.
- The backend API is accessible.
- Moderation requests return expected responses.

---

## Deployment

The frontend is designed for deployment as a standalone Next.js application.

The recommended deployment platform is **Vercel**, although the application can be hosted on any platform that supports Next.js.

Typical deployment workflow:

1. Configure the required environment variables.
1. Install project dependencies.
1. Build the production application.
1. Deploy the generated application.
1. Verify communication with the backend API.
1. Confirm that moderation requests complete successfully.

Before deployment, ensure that:

- `NEXT_PUBLIC_API_URL` points to the deployed backend.
- The backend is publicly accessible.
- The production build completes without errors.
- API requests return the expected responses.

---

## Troubleshooting

### Backend connection failed

Verify that:

- The backend server is running.
- `NEXT_PUBLIC_API_URL` is configured correctly.
- The backend allows requests from the frontend origin.
- The API endpoints are accessible.

---

### Environment variables not updating

After modifying `.env.local`, restart the development server.

```bash
npm run dev
```

---

### Build failures

Verify that:

- All project dependencies are installed.
- TypeScript errors have been resolved.
- Required environment variables are defined.

Reinstall dependencies if necessary.

```bash
npm install
```

---

### Development server unavailable

If port `3000` is already in use, stop the conflicting process or configure an alternative port before restarting the development server.

---

## Related Documentation

Additional documentation is available within the repository.

- Root documentation: `../README.md`
- Backend documentation: `../backend/README.md`

---

## License

This project is licensed under the **MIT License**.

See the repository `LICENSE` file for complete license information.

---

## Acknowledgements

This frontend is built using several open-source technologies, including:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React

Their continued development and support make modern web application development faster, more reliable, and more maintainable.
