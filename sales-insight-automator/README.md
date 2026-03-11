# Sales Insight Automator

An AI-powered sales data analysis platform. Upload a sales report (.csv or .xlsx), and the system analyses the data and delivers a formatted insight report to your inbox.

---

## Architecture

```
┌─────────────────────────────────────┐
│           React SPA (Vite)          │
│  • File upload (.csv / .xlsx)       │
│  • Email input                      │
│  • Real-time status feedback        │
└───────────────┬─────────────────────┘
                │  POST /analyze
┌───────────────▼─────────────────────┐
│         Express API (Node.js)       │
│  ├── multer       (file handling)   │
│  ├── helmet       (security)        │
│  ├── rate-limit   (throttling)      │
│  ├── fileParser   (CSV/XLSX)        │
│  ├── aiService    (GPT-4 insights)  │
│  └── emailService (SMTP delivery)   │
│  GET /docs  → Swagger UI            │
└─────────────────────────────────────┘
```

---

## Project Structure

```
sales-insight-automator/
├── frontend/                   # React + Vite SPA
│   └── src/
│       ├── App.jsx
│       └── index.css
│
├── backend/                    # Node.js + Express API
│   ├── server.js
│   ├── config/
│   │   └── swaggerConfig.js
│   ├── routes/
│   │   └── analyzeRoute.js
│   ├── controllers/
│   │   └── analyzeController.js
│   ├── middleware/
│   │   ├── upload.js
│   │   └── validate.js
│   └── services/
│       ├── fileParser.js
│       ├── aiService.js
│       └── emailService.js
│
├── .github/workflows/ci.yml
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Backend

```bash
cd backend
cp ../.env.example .env
npm install
npm run dev
```

- API: `http://localhost:5000`
- Swagger: `http://localhost:5000/docs`
- Health: `http://localhost:5000/health`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

- App: `http://localhost:5173`

### Docker

```bash
docker-compose up --build
```

---

## API Reference

**`POST /analyze`**

| Field | Type | Description |
|-------|------|-------------|
| `file` | `multipart/form-data` | `.csv` or `.xlsx`, max 10 MB |
| `email` | `string` | Recipient email for the report |

```json
{
  "status": "success",
  "message": "File received. Analysis pipeline initiated.",
  "meta": {
    "filename": "sales_q1.csv",
    "email": "user@example.com",
    "receivedAt": "2026-03-11T11:30:00.000Z"
  }
}
```

Full API documentation at **`/docs`**.

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `OPENAI_API_KEY` | OpenAI API key for GPT-4 analysis |
| `SMTP_HOST` | SMTP server hostname |
| `SMTP_PORT` | SMTP server port |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |
| `SMTP_FROM` | Sender email address |

---

## Security

- **Helmet** – HTTP security headers
- **express-rate-limit** – 100 req / 15 min per IP
- **Multer** – file type and size validation
- **express-validator** – server-side email validation

---

## CI/CD

GitHub Actions triggers on pull requests to `main`:

1. Install dependencies (backend + frontend)
2. Run ESLint on both packages
