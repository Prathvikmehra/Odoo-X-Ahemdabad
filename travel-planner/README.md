# GlobeTrotter — Editorial Travel Journal & Collaborative Planner

> "Plan the journey. Live the adventure."

GlobeTrotter is a premium day-by-day itinerary builder, budget tracker, and visual travel log designed with a sophisticated editorial travel-magazine aesthetic.

---

## 1. Project Overview & Product Philosophy

GlobeTrotter bridges the gap between structured travel planning (flights, budgets, stops) and personal travel memory keeping (narrative journals, high-res galleries, shareable stories).
- **Discover:** Curated experiences, neighborhood guides, and activities.
- **Plan:** Day-by-day vertical timelines, collaborative stops, and budgets.
- **Remember & Share:** Beautiful, publication-quality public layouts with chapter-based storytelling, full-bleed images, and a "journey in numbers" stat overview.

---

## 2. Tech Stack

- **Frontend:** React, Vite, Tailwind CSS (v4 theme), React Router, Axios, Lucide Icons.
- **Backend:** FastAPI, Python (Uvicorn), SQLAlchemy ORM.
- **Database:** PostgreSQL (production-ready image with Docker Compose) / SQLite (automatic local developer fallback).
- **Authentication:** JWT (JSON Web Tokens), `passlib` password hashing.

---

## 3. Folder Structure

```
travel-planner/
├── backend/
│   ├── app/
│   │   ├── core/           # Security, JWT tokens, config
│   │   ├── database/       # Connection settings & SQLite fallback
│   │   ├── models/         # User, Trip, TripStop, Activity, Expense
│   │   ├── routes/         # Auth, Trips, Stops, Activities, Expenses, Public, Search
│   │   ├── schemas/        # Pydantic validation schemas
│   │   ├── services/       # Business logic (Itinerary, Budget, Auth)
│   │   └── utils/          # Formatting & validation helpers
│   ├── seed/               # Default cities and activities lists
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── assets/         # UI styling graphics
│   │   ├── components/     # Layout (Navbar, Footer), Common (Button, Chip, HeaderFilterBar)
│   │   ├── context/        # TravelContext (reactive local store & API sync hooks)
│   │   ├── pages/          # All 14 custom screens (Login, Dashboard, Itinerary, Public View, etc.)
│   │   ├── routes/         # AppRoutes layout mapping
│   │   └── services/       # API call handlers (Axios client setup)
│   └── tailwind.config.js
├── docker-compose.yml      # Containerized PostgreSQL service
└── README.md
```

---

## 4. Setup & Installation

### Prerequisite: Running PostgreSQL (Docker)
To start the production database using Docker, run:
```bash
docker-compose up -d
```
*Note: If Docker is not available, the backend automatically falls back to a local SQLite database (`travel_planner.db`) so the application is fully functional out-of-the-box.*

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create your `.env` configuration file:
   ```bash
   copy .env.example .env
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the FastAPI development server:
   ```bash
   python -m uvicorn app.main:app --reload --port 8000
   ```
   *The interactive API documentation is available at [http://localhost:8000/docs](http://localhost:8000/docs).*

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install package dependencies:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
   *The web application is accessible at [http://localhost:5173](http://localhost:5173).*

---

## 5. Seed Data & Verification

To populate the database with complete premium journeys, stops, expenses, and activities, send a `POST` request to the seed endpoint:
- **Seed Endpoint:** `http://localhost:8000/api/seed`
- **Default Seed Credentials:**
  - **Email:** `alex.mercer@globetrotter.io`
  - **Password:** `password123`

---

## 6. Team & Component Ownership

- **Backend Lead:** Component setup, security configuration, JWT tokens, and routes.
- **Database & Data:** SQLAlchemy models, PostgreSQL connection, migrations, and schema design.
- **Frontend Core:** Client state management, AuthContext, Axios api connector, routing, and forms.
- **Product & UI:** Visual polish, typography, magazine chapter layouts, timeline components, custom charts, and responsive mobile adaptations.
