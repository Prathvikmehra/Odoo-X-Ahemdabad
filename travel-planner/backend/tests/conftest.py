import os
os.environ["DATABASE_URL"] = "sqlite:///:memory:"

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

import app.models  # noqa: F401
from app.main import app
from app.database.base import Base
from app.database.connection import get_db

test_engine = create_engine(
    "sqlite:///:memory:",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)

# PRIORITY 6 — Enable FK enforcement in SQLite test engine
@event.listens_for(test_engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.create_all(bind=test_engine)
    yield
    Base.metadata.drop_all(bind=test_engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture
def client():
    return TestClient(app)


@pytest.fixture
def auth_headers(client):
    """Register + login user A, return auth headers."""
    client.post("/api/auth/signup", json={
        "name": "User A", "email": "usera@example.com", "password": "passwordA123"
    })
    res = client.post("/api/auth/login", json={
        "email": "usera@example.com", "password": "passwordA123"
    })
    token = res.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture
def auth_headers_b(client):
    """Register + login user B, return auth headers."""
    client.post("/api/auth/signup", json={
        "name": "User B", "email": "userb@example.com", "password": "passwordB123"
    })
    res = client.post("/api/auth/login", json={
        "email": "userb@example.com", "password": "passwordB123"
    })
    token = res.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture(autouse=True)
def seed_search_data(setup_db):
    """Populate test DB with City and SeedActivity reference data after tables are created."""
    from app.models.city import City
    from app.models.seed_activity import SeedActivity
    from app.seed.cities import CITIES
    from app.seed.activities import ACTIVITIES

    db = TestingSessionLocal()
    try:
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
