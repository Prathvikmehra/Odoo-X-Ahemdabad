$ErrorActionPreference = "Stop"
$root = "C:\Users\PRATHVIK\OneDrive\Desktop\one_more_try\Odoo-X-Ahemdabad\travel-planner"
New-Item -ItemType Directory -Force -Path $root | Out-Null
Set-Location $root

# Root files
Set-Content -Path ".gitignore" -Value "node_modules/`n__pycache__/`n.env`n.venv/`ndist/`n"
Set-Content -Path "README.md" -Value "# Travel Planner`n"
Set-Content -Path "docker-compose.yml" -Value @"
version: '3.8'
services:
  database:
    image: postgres:15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: travel_planner
    ports:
      - "5432:5432"
"@
New-Item -ItemType Directory -Force -Path "docs" | Out-Null

# --- FRONTEND ---
npx -y create-vite@latest frontend --template react
Set-Location "$root\frontend"
npm install
npm install tailwindcss postcss autoprefixer axios react-router-dom
npx tailwindcss init -p

# Setup Frontend dirs
$frontendDirs = @(
    "src/assets",
    "src/components/common",
    "src/components/layout",
    "src/components/trips",
    "src/components/itinerary",
    "src/components/activities",
    "src/components/budget",
    "src/pages/auth",
    "src/pages/dashboard",
    "src/pages/trips",
    "src/pages/public",
    "src/services",
    "src/context",
    "src/hooks",
    "src/utils",
    "src/routes"
)

foreach ($dir in $frontendDirs) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
}

# Delete default Vite files
Remove-Item -Force "src/App.css" -ErrorAction SilentlyContinue

# Create frontend placeholder files
Set-Content -Path "src/pages/auth/Login.jsx" -Value "export default function Login() { return <div>Login Page</div>; }"
Set-Content -Path "src/pages/auth/Signup.jsx" -Value "export default function Signup() { return <div>Signup Page</div>; }"
Set-Content -Path "src/pages/dashboard/Dashboard.jsx" -Value "export default function Dashboard() { return <div>Dashboard Page</div>; }"
Set-Content -Path "src/pages/trips/CreateTrip.jsx" -Value "export default function CreateTrip() { return <div>CreateTrip Page</div>; }"
Set-Content -Path "src/pages/trips/TripDetails.jsx" -Value "export default function TripDetails() { return <div>TripDetails Page</div>; }"
Set-Content -Path "src/pages/trips/Itinerary.jsx" -Value "export default function Itinerary() { return <div>Itinerary Page</div>; }"
Set-Content -Path "src/pages/trips/Budget.jsx" -Value "export default function Budget() { return <div>Budget Page</div>; }"
Set-Content -Path "src/pages/public/SharedTrip.jsx" -Value "export default function SharedTrip() { return <div>SharedTrip Page</div>; }"

Set-Content -Path "src/services/api.js" -Value "import axios from 'axios';`n`nexport const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });"
Set-Content -Path "src/services/authService.js" -Value "// TODO"
Set-Content -Path "src/services/tripService.js" -Value "// TODO"
Set-Content -Path "src/services/stopService.js" -Value "// TODO"
Set-Content -Path "src/services/activityService.js" -Value "// TODO"
Set-Content -Path "src/services/expenseService.js" -Value "// TODO"

Set-Content -Path "src/context/AuthContext.jsx" -Value "// TODO"

Set-Content -Path "src/utils/constants.js" -Value "// TODO"
Set-Content -Path "src/utils/formatters.js" -Value "// TODO"
Set-Content -Path "src/utils/validators.js" -Value "// TODO"

Set-Content -Path "src/routes/AppRoutes.jsx" -Value @"
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import Dashboard from '../pages/dashboard/Dashboard';
import CreateTrip from '../pages/trips/CreateTrip';
import TripDetails from '../pages/trips/TripDetails';
import Itinerary from '../pages/trips/Itinerary';
import Budget from '../pages/trips/Budget';
import SharedTrip from '../pages/public/SharedTrip';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/trips/new" element={<CreateTrip />} />
      <Route path="/trips/:tripId" element={<TripDetails />} />
      <Route path="/trips/:tripId/itinerary" element={<Itinerary />} />
      <Route path="/trips/:tripId/budget" element={<Budget />} />
      <Route path="/shared/:token" element={<SharedTrip />} />
    </Routes>
  );
}
"@

Set-Content -Path "src/App.jsx" -Value @"
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
export default App;
"@

Set-Content -Path "src/index.css" -Value @"
@tailwind base;
@tailwind components;
@tailwind utilities;
"@

Set-Content -Path "tailwind.config.js" -Value @"
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
"@

Set-Content -Path ".env.example" -Value "VITE_API_URL=http://localhost:8000/api"
Set-Content -Path ".env" -Value "VITE_API_URL=http://localhost:8000/api"
Set-Content -Path "README.md" -Value "# Frontend"

# --- BACKEND ---
Set-Location $root
New-Item -ItemType Directory -Force -Path "backend" | Out-Null
Set-Location "$root\backend"

$backendDirs = @(
    "app",
    "app/core",
    "app/database",
    "app/models",
    "app/schemas",
    "app/routes",
    "app/services",
    "app/utils",
    "seed",
    "tests"
)

foreach ($dir in $backendDirs) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
}

$initFiles = @(
    "app/__init__.py",
    "app/core/__init__.py",
    "app/database/__init__.py",
    "app/models/__init__.py",
    "app/schemas/__init__.py",
    "app/routes/__init__.py",
    "app/services/__init__.py",
    "app/utils/__init__.py",
    "seed/__init__.py",
    "tests/__init__.py"
)

foreach ($file in $initFiles) {
    New-Item -ItemType File -Force -Path $file | Out-Null
}

# Create backend files
Set-Content -Path "app/main.py" -Value @"
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, trips, stops, activities, expenses, public

app = FastAPI(title="Travel Planner API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Update this with config later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(trips.router, prefix="/api/trips", tags=["trips"])
app.include_router(stops.router, prefix="/api/stops", tags=["stops"])
app.include_router(activities.router, prefix="/api/activities", tags=["activities"])
app.include_router(expenses.router, prefix="/api/expenses", tags=["expenses"])
app.include_router(public.router, prefix="/api/public", tags=["public"])

@app.get("/health")
def health_check():
    return {"status": "ok"}
"@

Set-Content -Path "app/core/config.py" -Value "# TODO"
Set-Content -Path "app/core/security.py" -Value "# TODO"
Set-Content -Path "app/core/dependencies.py" -Value "# TODO"

Set-Content -Path "app/database/connection.py" -Value "# TODO"
Set-Content -Path "app/database/base.py" -Value "# TODO"

Set-Content -Path "app/models/user.py" -Value "# TODO"
Set-Content -Path "app/models/trip.py" -Value "# TODO"
Set-Content -Path "app/models/trip_stop.py" -Value "# TODO"
Set-Content -Path "app/models/activity.py" -Value "# TODO"
Set-Content -Path "app/models/expense.py" -Value "# TODO"

Set-Content -Path "app/schemas/auth.py" -Value "# TODO"
Set-Content -Path "app/schemas/user.py" -Value "# TODO"
Set-Content -Path "app/schemas/trip.py" -Value "# TODO"
Set-Content -Path "app/schemas/trip_stop.py" -Value "# TODO"
Set-Content -Path "app/schemas/activity.py" -Value "# TODO"
Set-Content -Path "app/schemas/expense.py" -Value "# TODO"

Set-Content -Path "app/routes/auth.py" -Value @"
from fastapi import APIRouter

router = APIRouter()

@router.post("/signup")
def signup():
    return {"msg": "signup"}

@router.post("/login")
def login():
    return {"msg": "login"}

@router.get("/me")
def me():
    return {"msg": "me"}
"@

Set-Content -Path "app/routes/trips.py" -Value @"
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_trips():
    return {"msg": "get_trips"}

@router.post("/")
def create_trip():
    return {"msg": "create_trip"}

@router.get("/{trip_id}")
def get_trip(trip_id: int):
    return {"msg": "get_trip"}

@router.put("/{trip_id}")
def update_trip(trip_id: int):
    return {"msg": "update_trip"}

@router.delete("/{trip_id}")
def delete_trip(trip_id: int):
    return {"msg": "delete_trip"}

@router.get("/{trip_id}/stops")
def get_stops(trip_id: int):
    return {"msg": "get_stops"}

@router.post("/{trip_id}/stops")
def create_stop(trip_id: int):
    return {"msg": "create_stop"}

@router.get("/{trip_id}/expenses")
def get_expenses(trip_id: int):
    return {"msg": "get_expenses"}

@router.post("/{trip_id}/expenses")
def create_expense(trip_id: int):
    return {"msg": "create_expense"}

@router.get("/{trip_id}/budget")
def get_budget(trip_id: int):
    return {"msg": "get_budget"}

@router.post("/{trip_id}/share")
def share_trip(trip_id: int):
    return {"msg": "share_trip"}
"@

Set-Content -Path "app/routes/stops.py" -Value @"
from fastapi import APIRouter

router = APIRouter()

@router.put("/{stop_id}")
def update_stop(stop_id: int):
    return {"msg": "update_stop"}

@router.delete("/{stop_id}")
def delete_stop(stop_id: int):
    return {"msg": "delete_stop"}

@router.get("/{stop_id}/activities")
def get_activities(stop_id: int):
    return {"msg": "get_activities"}

@router.post("/{stop_id}/activities")
def create_activity(stop_id: int):
    return {"msg": "create_activity"}
"@

Set-Content -Path "app/routes/activities.py" -Value @"
from fastapi import APIRouter

router = APIRouter()

@router.put("/{activity_id}")
def update_activity(activity_id: int):
    return {"msg": "update_activity"}

@router.delete("/{activity_id}")
def delete_activity(activity_id: int):
    return {"msg": "delete_activity"}

@router.get("/search")
def search_activities():
    return {"msg": "search_activities"}
"@

Set-Content -Path "app/routes/expenses.py" -Value @"
from fastapi import APIRouter

router = APIRouter()

@router.delete("/{expense_id}")
def delete_expense(expense_id: int):
    return {"msg": "delete_expense"}
"@

Set-Content -Path "app/routes/public.py" -Value @"
from fastapi import APIRouter

router = APIRouter()

@router.get("/trips/{share_token}")
def get_shared_trip(share_token: str):
    return {"msg": "get_shared_trip"}
"@

Set-Content -Path "app/services/auth_service.py" -Value "# TODO"
Set-Content -Path "app/services/trip_service.py" -Value "# TODO"
Set-Content -Path "app/services/itinerary_service.py" -Value "# TODO"
Set-Content -Path "app/services/budget_service.py" -Value "# TODO"

Set-Content -Path "app/utils/helpers.py" -Value "# TODO"

Set-Content -Path "seed/cities.py" -Value "# TODO"
Set-Content -Path "seed/activities.py" -Value "# TODO"

Set-Content -Path "tests/test_auth.py" -Value "# TODO"
Set-Content -Path "tests/test_trips.py" -Value "# TODO"
Set-Content -Path "tests/test_itinerary.py" -Value "# TODO"
Set-Content -Path "tests/test_budget.py" -Value "# TODO"

Set-Content -Path ".env.example" -Value @"
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/travel_planner
SECRET_KEY=change_this_secret
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
CORS_ORIGINS=http://localhost:5173
"@
Set-Content -Path ".env" -Value @"
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/travel_planner
SECRET_KEY=change_this_secret
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
CORS_ORIGINS=http://localhost:5173
"@

Set-Content -Path "requirements.txt" -Value @"
fastapi[standard]
sqlalchemy
psycopg2-binary
passlib[bcrypt]
python-jose[cryptography]
pydantic-settings
alembic
"@

Set-Content -Path "Dockerfile" -Value @"
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
"@

Set-Content -Path "README.md" -Value "# Backend"

python -m venv .venv
.venv\Scripts\pip install -r requirements.txt
