# ShortURL — Initial Phase

This repository contains a minimal URL shortener prototype (initial phase). The project provides a FastAPI backend and a small React frontend (Vite) for creating short links and resolving them.

Quick overview

- **Backend:** [backend/main.py](backend/main.py) — FastAPI app with `/shorten` and resolver `/{key}` (in-memory store for demo).
- **Frontend:** [frontend](frontend/) — Vite + React app to submit URLs to the API.

How to run (dev)

1. Backend (FastAPI):

```bash
pip install -r requirements.txt
pip install uvicorn
uvicorn backend.main:app --reload
```

2. Frontend (React/Vite):

```bash
cd frontend
npm install
npm run dev
```

Notes

- The backend currently uses an in-memory store — data will be lost on restart.
- During development run the React dev server (Vite) for hot reload; in production build the frontend and serve static files from the backend.

Planned work / TODOs (initial priorities)

- Click counts: track redirect counts per short link and expose metrics.
- Database migration: add PostgreSQL backing store and migrations (Alembic or similar).
- Persistence: replace the in-memory store with a durable DB and connection pooling.
- Validation & security: validate submitted URLs, add rate limiting, and protect endpoints.
- Serve frontend from backend: build React app and mount static files in FastAPI for a single origin deployment.
- Tests: add unit and integration tests for API endpoints and redirect behavior.
- CI/CD: add CI pipeline to run tests and linting, and CD to deploy builds.
- Analytics & monitoring: basic logging, request metrics, and error tracking.



