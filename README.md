# ShortURL

A full-stack URL shortening service built with FastAPI, React, and PostgreSQL.

## Live Demo

Frontend: https://short-url-blush-eight.vercel.app/

Backend API: https://short-url-2y17.onrender.com

---

## Features

* Create shortened URLs
* Automatic redirection to original URLs
* PostgreSQL persistence
* URL expiration support
* Click tracking
* QR code generation for shortened links
* Recent URL history stored in browser localStorage
* Responsive React frontend
* FastAPI REST backend
* Environment variable based configuration
* Deployed using Vercel and Render

---

## Tech Stack

### Frontend

* React
* Vite
* React Router
* CSS

### Backend

* FastAPI
* SQLAlchemy
* PostgreSQL
* Uvicorn

### Deployment

* Vercel (Frontend)
* Render (Backend + PostgreSQL)

---

## Project Structure

```text
backend/
├── main.py
├── models.py
├── database.py
├── storage.py

frontend/
├── src/
├── public/
├── package.json

.env
requirements.txt
README.md
```

---

## Running Locally

### Backend

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the server:

```bash
uvicorn backend.main:app --reload
```

Backend runs on:

```text
http://localhost:8000
```

---

### Frontend

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Environment Variables

### Backend

```env
DATABASE_URL=
FRONTEND_URL=
BASE_URL=
```

### Frontend

```env
VITE_BACKEND_URL=
```

---

## API Endpoints

### Create Short URL

```http
POST /shorten
```

Request:

```json
{
  "url": "https://example.com"
}
```

Response:

```json
{
  "short_url": "https://short-url-2y17.onrender.com/abc123"
}
```

---

### Redirect

```http
GET /{short_code}
```

Redirects the user to the original URL.

---

## Database Schema

### URLs Table

| Column     | Type      |
| ---------- | --------- |
| id         | Integer   |
| shurl      | String    |
| url        | String    |
| clicks     | Integer   |
| created_at | Timestamp |
| expires_at | Timestamp |
| isactive   | Boolean   |

---

## Expiration Handling

Expired URLs are lazily invalidated.

When an expired URL is accessed:

1. Expiration is checked.
2. The URL is marked inactive.
3. The user is redirected to an error page.

This avoids unnecessary background cleanup jobs while keeping lookup performance efficient.

---

## Current Limitations

* No custom aliases yet
* No analytics dashboard or statistics endpoint
* No background cleanup of expired URLs
* No authentication or user accounts
* No rate limiting
* Error responses in the frontend currently appear as hyperlinks due to UI handling and need refinement

---

## Future Improvements

* Custom short URL aliases
* Analytics endpoint
* URL management dashboard
* Redis caching
* Background cleanup jobs
* Docker support
* Automated testing
* CI/CD pipeline
* Rate limiting and abuse prevention
* User accounts and link ownership

---

## Learning Objectives

This project was built to explore:

* REST API development with FastAPI
* SQLAlchemy ORM
* PostgreSQL integration
* React frontend development
* Deployment workflows
* Environment variable management
* CORS configuration
* URL redirection systems
* Full-stack application architecture

```
```
