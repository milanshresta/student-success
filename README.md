# Student Success API

Backend and API layer for the AI-Powered Student Success Analytics Platform (MSc project, backend/deep-learning component by Numo Francis Nanortey). Built with NestJS, TypeORM, and PostgreSQL (Supabase).

## Modules

- `students` – student profile CRUD, backed by anonymized dataset records.
- `attendance` – attendance records and per-student attendance-rate summaries.
- `assessments` – assessment/grade records and weighted score summaries.
- `engagement` – VLE/engagement records (logins, clicks, forum activity) and summaries.
- `analytics-pipeline` – builds feature vectors from the above modules and calls the Python analytics service for classical ML and deep learning predictions.
- `risk-assessment` – runs and stores risk predictions (classical ML + deep learning) per student, exposes at-risk queries.
- `recommendations` – generates rule-based early-warning/guidance recommendations from risk assessments and tracks their status.
- `auth` – Firebase ID token verification guard, used to protect all routes.

## Setup

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL, Firebase service account, analytics service URL
npm run start:dev
```

API docs (Swagger) are served at `/docs` once the server is running.

## Analytics service contract

`ANALYTICS_SERVICE_URL` should point to the Python service (Pandas/Scikit-learn + TensorFlow-Keras or PyTorch) exposing:

- `POST /predict/classical` – classical ML prediction
- `POST /predict/deep-learning` – deep learning prediction

Both accept a `StudentFeatureVector` JSON body (see `src/analytics-pipeline/analytics-pipeline.service.ts`) and return `{ riskScore, modelVersion, contributingFactors? }`.

## Scripts

```bash
npm run build       # compile
npm run start:dev   # watch mode
npm run test         # unit tests
npm run test:e2e     # e2e tests
npm run lint         # eslint --fix
```
