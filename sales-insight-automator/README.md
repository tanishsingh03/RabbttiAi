# Sales Insight Automator

> **Prototype Engineering Scaffold** – A professional-grade architecture demonstration for an AI-powered sales data analysis platform.

---

## ⚠️ Prototype Notice

This project is a **frontend + backend scaffold**. The frontend and backend run independently and are **not connected** to each other in this prototype.

| Component | Status |
|-----------|--------|
| Frontend UI (React) | ✅ Functional – simulates submission |
| Backend API (Express) | ✅ Running – returns placeholder response |
| File parsing | 🚧 Not implemented |
| AI analysis (GPT-4) | 🚧 Not implemented |
| Email delivery | 🚧 Not implemented |

---

## Architecture Overview

```
┌─────────────────────────────────────────┐
│              User's Browser             │
│  ┌───────────────────────────────────┐  │
│  │    React SPA (Vite)               │  │
│  │  • File upload (.csv / .xlsx)     │  │
│  │  • Email input                    │  │
│  │  • Mock submission (no API call)  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
              ↕  (not connected in prototype)
┌─────────────────────────────────────────┐
│           Express Backend               │
│  POST /analyze                          │
│    ├── multer       (file upload)       │
│    ├── helmet       (security headers)  │
│    ├── rate-limit   (abuse protection)  │
│    ├── validator    (email validation)  │
│    ├── fileParser   (TODO: CSV/XLSX)    │
│    ├── aiService    (TODO: GPT-4)       │
│    └── emailService (TODO: SMTP)        │
│  GET /docs  → Swagger UI               │
│  GET /health → health check            │
└─────────────────────────────────────────┘
```

---

## Project Structure

```
sales-insight-automator/
├── frontend/                   # React + Vite SPA
│   └── src/
│       ├── App.jsx             # Main UI (mock submission)
│       └── index.css           # Premium dark-mode styles
│
├── backend/                    # Node.js + Express API
│   ├── server.js               # Entry point
│   ├── config/
│   │   └── swaggerConfig.js    # OpenAPI / Swagger setup
│   ├── routes/
│   │   └── analyzeRoute.js     # POST /analyze
│   ├── controllers/
│   │   └── analyzeController.js # Placeholder response
│   ├── middleware/
│   │   ├── upload.js           # Multer (csv/xlsx only, 10 MB)
│   │   └── validate.js         # Email validation
│   └── services/
│       ├── fileParser.js       # TODO: CSV/XLSX parsing
│       ├── aiService.js        # TODO: AI/LLM integration
│       └── emailService.js     # TODO: Email delivery
│
├── .github/workflows/ci.yml    # GitHub Actions (lint on PR)
├── Dockerfile                  # Multi-stage Docker build
├── docker-compose.yml          # Local Docker Compose
├── .env.example                # Environment variable template
└── README.md
```

---

## Running Locally

### Backend

```bash
cd backend
cp ../.env.example .env
npm install
npm run dev
# → http://localhost:5000
# → http://localhost:5000/docs  (Swagger UI)
# → http://localhost:5000/health
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

### Docker (backend only)

```bash
docker-compose up --build
```

---

## API Reference

**`POST /analyze`** – Submit a sales data file for analysis.

| Field | Type | Description |
|-------|------|-------------|
| `file` | multipart/form-data | `.csv` or `.xlsx`, max 10 MB |
| `email` | string | Recipient email for the report |

**Response (prototype placeholder):**
```json
{
  "status": "success",
  "message": "Prototype endpoint ready for integration.",
  "meta": {
    "filename": "sales_q1.csv",
    "email": "user@example.com",
    "receivedAt": "2026-03-11T11:30:00.000Z",
    "note": "File parsing, AI analysis, and email delivery are not yet implemented."
  }
}
```

Full documentation available at **`/docs`** (Swagger UI).

---

## Security

- **Helmet** – HTTP security headers
- **express-rate-limit** – 100 requests / 15 min per IP
- **Multer** – file type + size restrictions
- **express-validator** – server-side email validation

---

## CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`) triggers on **pull requests to `main`**:
1. Install backend dependencies
2. Run ESLint (backend)
3. Install frontend dependencies
4. Run ESLint (frontend)
