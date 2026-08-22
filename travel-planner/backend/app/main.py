from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
import app.models  # noqa: F401
from app.routes import auth, trips, stops, activities, expenses, public, search
from app.database.base import Base
from app.database.connection import engine, SessionLocal
from app.models.city import City


def _run_seed_if_empty():
    """Seed City and SeedActivity tables if they're empty. Idempotent."""
    from app.models.seed_activity import SeedActivity
    from app.seed.cities import CITIES
    from app.seed.activities import ACTIVITIES

    db = SessionLocal()
    try:
        if db.query(City).count() == 0:
            city_map = {}
            for c in CITIES:
                city = City(name=c["city"], country=c["country"])
                db.add(city)
                db.flush()
                city_map[c["city"].lower()] = city.id

            for a in ACTIVITIES:
                city_id = city_map.get(a["city"].lower())
                if city_id:
                    db.add(SeedActivity(
                        city_id=city_id,
                        name=a["name"],
                        type=a["type"],
                        description=a.get("description"),
                        cost=a.get("cost", 0),
                        duration_hours=a.get("duration_hours"),
                        start_time=a.get("start_time"),
                        image_url=a.get("image_url"),
                    ))
            db.commit()
    finally:
        db.close()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables then seed reference data
    Base.metadata.create_all(bind=engine)
    _run_seed_if_empty()
    yield


app = FastAPI(title="Travel Planner API", lifespan=lifespan)

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
