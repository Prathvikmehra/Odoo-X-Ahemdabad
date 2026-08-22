from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
import app.models  # noqa: F401
from app.routes import auth, trips, stops, activities, expenses, public, search

app = FastAPI(title="Travel Planner API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
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
app.include_router(search.router, prefix="/api", tags=["search"])

@app.get("/health")
def health_check():
    return {"status": "ok"}
