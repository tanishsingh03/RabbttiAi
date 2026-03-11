# Changelog

## [0.3.0] - 2026-03-11
### Changed
- Frontend now surfaces server connectivity errors with user-friendly messaging
- Improved error state copy and retry UX

## [0.2.0] - 2026-03-11
### Changed
- Cleaned up service stubs for readability
- Simplified README with clearer architecture overview and setup instructions

## [0.1.0] - 2026-03-11
### Added
- Initial project scaffold
- React + Vite frontend with file upload and email input
- Express backend with `/analyze` endpoint
- Multer file validation (csv/xlsx, 10 MB limit)
- Helmet, rate-limiting, express-validator middleware
- Swagger UI at `/docs`
- Placeholder service modules: `fileParser`, `aiService`, `emailService`
- Dockerfile and docker-compose for local dev
- GitHub Actions CI workflow (lint on PR to main)
