# Frontend

Modern, responsive frontend for the **AI Content Moderation Engine**, built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS**.

The frontend provides a clean and intuitive interface for submitting text, viewing AI moderation results, and interacting with the FastAPI backend through a responsive, type-safe architecture.

---

## Overview

The frontend is designed to provide:

- Responsive user experience
- Reusable UI components
- Type-safe development
- Clean API integration
- Modern project structure
- Production-ready codebase

---

## Technology Stack

| Category | Technology |
| -------- | ---------- |
| Framework | Next.js 16 |
| UI Library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Tooling | ESLint, npm |

---

## Features for Frontend

- AI-powered text moderation interface
- Real-time moderation requests
- Confidence score visualization
- Risk level indicators
- Toxic category display
- Matched keyword highlighting
- Moderation history
- Search, filtering, and sorting
- CSV export
- Responsive design
- Loading and error states
- Accessible UI components

---

## Folder Structure

```text
frontend/
├── app/
├── components/
├── hooks/
├── lib/
├── public/
├── styles/
├── types/
├── package.json
├── tsconfig.json
└── README.md
```

---

## Frontend Architecture

```text
Browser
    │
    ▼
Next.js App Router
    │
    ▼
Pages
    │
    ▼
Reusable Components
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

---

## State Management

The application uses lightweight React state management:

- React Hooks
- Custom Hooks
- Local component state
- Local Storage for moderation history

This approach keeps the application simple, maintainable, and avoids unnecessary global state libraries.

---

## Environment Variables

Create a `.env.local` file.

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Update the value for your production backend after deployment.

---

## Running Locally

Install dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Production Build

Create an optimized production build.

```bash
npm run build
```

Run the production server.

```bash
npm start
```

---

## Deployment

The frontend is designed for deployment on **Vercel**.

Deployment checklist:

- Configure environment variables
- Connect the GitHub repository
- Build the application
- Verify backend connectivity

---

## Related Documentation

- Root documentation: `../README.md`
- Backend documentation: `../backend/README.md`

---

## License

This project is licensed under the **MIT License**.
