<div align="center">

# 🚀 Sales Insight Automator

**AI-powered sales data analysis — upload a report, get GPT-4 insights delivered to your inbox.**

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-Docs-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![CI](https://img.shields.io/badge/GitHub_Actions-CI-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)

</div>

---

## ✨ Overview

Sales Insight Automator is a full-stack web application that lets users upload a `.csv` or `.xlsx` sales report, enter their email address, and receive an AI-generated insight report directly in their inbox.

The system is built with a clean, modular architecture separating file ingestion, AI analysis, and email delivery into dedicated service layers.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│           React SPA  (Vite)             │
│  ─────────────────────────────────────  │
│  • Drag & drop file upload (.csv/xlsx)  │
│  • Email input + real-time validation   │
│  • Loading, success, and error states   │
└───────────────────┬─────────────────────┘
                    │  POST /analyze
                    │  multipart/form-data
┌───────────────────▼─────────────────────┐
│         Express API  (Node.js)          │
│  ─────────────────────────────────────  │
│  middleware/                            │
│    ├── helmet         security headers  │
│    ├── rate-limit     100 req / 15 min  │
│    ├── multer         csv/xlsx, 10 MB   │
│    └── validator      email validation  │
│  services/                              │
│    ├── fileParser     CSV / XLSX → rows │
│    ├── aiService      GPT-4 insights    │
│    └── emailService   SMTP delivery     │
│  GET /docs  →  Swagger UI               │
└─────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
sales-insight-automator/
├── frontend/                    # React + Vite SPA
│   ├── src/
│   │   ├── App.jsx              # Main UI component
│   │   └── index.css            # Styling
│   ├── index.html
│   └── package.json
│
├── backend/                     # Node.js + Express API
│   ├── server.js                # Entry point
│   ├── config/
│   │   └── swaggerConfig.js     # OpenAPI / Swagger setup
│   ├── routes/
│   │   └── analyzeRoute.js      # POST /analyze
│   ├── controllers/
│   │   └── analyzeController.js # Request handler
│   ├── middleware/
│   │   ├── upload.js            # Multer file validation
│   │   └── validate.js          # Email validation
│   ├── services/
│   │   ├── fileParser.js        # CSV / XLSX parser
│   │   ├── aiService.js         # GPT-4 integration
│   │   └── emailService.js      # Email delivery
│   └── package.json
│
├── .github/
│   └── workflows/ci.yml         # GitHub Actions CI
├── Dockerfile                   # Multi-stage Docker build
├── docker-compose.yml
├── .env.example
├── CHANGELOG.md
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- **Docker** (optional, for containerised dev)

---

### Backend

```bash
cd backend
cp ../.env.example .env     # add your API keys
npm install
npm run dev
```

| Endpoint | URL |
|----------|-----|
| API | `http://localhost:4000` |
| Swagger Docs | `http://localhost:4000/docs` |
| Health check | `http://localhost:4000/health` |

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

| | URL |
|-|-----|
| App | `http://localhost:5173` |

---

### Docker

```bash
docker-compose up --build
```

---

## 📡 API Reference

### `POST /analyze`

Submit a sales data file for AI-powered analysis.

**Request** — `multipart/form-data`

| Field | Type | Description |
|-------|------|-------------|
| `file` | `binary` | `.csv` or `.xlsx`, max **10 MB** |
| `email` | `string` | Recipient email for the report |

**Response**

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

Full interactive documentation at **`/docs`** (Swagger UI).

---

## 🔐 Security

| Layer | Implementation |
|-------|----------------|
| HTTP Headers | `helmet` |
| Rate Limiting | `express-rate-limit` — 100 req / 15 min per IP |
| File Validation | `multer` — `.csv` / `.xlsx` only, 10 MB max |
| Input Validation | `express-validator` — server-side email check |

---

## ⚙️ Environment Variables

Copy `.env.example` → `.env` and fill in your credentials:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: `4000`) |
| `OPENAI_API_KEY` | OpenAI API key for GPT-4 analysis |
| `SMTP_HOST` | SMTP server hostname |
| `SMTP_PORT` | SMTP server port |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |
| `SMTP_FROM` | Sender email address |

---

## 🔄 CI/CD

GitHub Actions workflow triggers on **pull requests to `main`**:

```
PR opened → main
    ├── backend-lint   npm ci  +  eslint
    └── frontend-lint  npm ci  +  eslint
```

See [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 5 |
| Backend | Node.js 20, Express 4 |
| File Upload | Multer |
| API Docs | Swagger UI + swagger-jsdoc |
| Security | Helmet, express-rate-limit, express-validator |
| Containerisation | Docker, Docker Compose |
| CI/CD | GitHub Actions |
| AI (planned) | OpenAI GPT-4 |
| Email (planned) | Nodemailer / SendGrid |

---

<div align="center">

Made with ⚡ by the engineering team

</div>
