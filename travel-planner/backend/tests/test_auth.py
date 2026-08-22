import os
# Override DATABASE_URL before any app imports so SQLAlchemy uses SQLite
os.environ["DATABASE_URL"] = "sqlite:///:memory:"

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.database.base import Base
from app.database.connection import get_db

# Create a separate test engine with StaticPool to keep in-memory DB alive
test_engine = create_engine(
    "sqlite:///:memory:",
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
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
client = TestClient(app)


def test_signup_success():
    payload = {
        "name": "Test User",
        "email": "test@example.com",
        "password": "secretpassword123",
    }
    response = client.post("/api/auth/signup", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Test User"
    assert data["email"] == "test@example.com"
    assert "id" in data
    assert "password_hash" not in data
    assert "password" not in data


def test_signup_duplicate_email():
    payload = {
        "name": "User One",
        "email": "duplicate@example.com",
        "password": "password123",
    }
    res1 = client.post("/api/auth/signup", json=payload)
    assert res1.status_code == 201

    res2 = client.post("/api/auth/signup", json=payload)
    assert res2.status_code == 400
    assert res2.json()["detail"] == "Email already registered"


def test_login_success():
    client.post("/api/auth/signup", json={
        "name": "Login User",
        "email": "login@example.com",
        "password": "correct_password"
    })

    login_res = client.post("/api/auth/login", json={
        "email": "login@example.com",
        "password": "correct_password"
    })
    assert login_res.status_code == 200
    data = login_res.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_login_invalid_password():
    client.post("/api/auth/signup", json={
        "name": "Login User",
        "email": "login_wrong@example.com",
        "password": "correct_password"
    })

    login_res = client.post("/api/auth/login", json={
        "email": "login_wrong@example.com",
        "password": "wrong_password"
    })
    assert login_res.status_code == 401
    assert login_res.json()["detail"] == "Invalid email or password"


def test_login_nonexistent_user():
    login_res = client.post("/api/auth/login", json={
        "email": "doesnotexist@example.com",
        "password": "some_password"
    })
    assert login_res.status_code == 401
    assert login_res.json()["detail"] == "Invalid email or password"


def test_get_current_user_me_authenticated():
    client.post("/api/auth/signup", json={
        "name": "Me User",
        "email": "me@example.com",
        "password": "mypassword"
    })

    login_res = client.post("/api/auth/login", json={
        "email": "me@example.com",
        "password": "mypassword"
    })
    token = login_res.json()["access_token"]

    me_res = client.get("/api/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert me_res.status_code == 200
    user_data = me_res.json()
    assert user_data["name"] == "Me User"
    assert user_data["email"] == "me@example.com"
    assert "password_hash" not in user_data


def test_get_current_user_me_unauthorized():
    me_res = client.get("/api/auth/me")
    assert me_res.status_code == 401

    me_res_invalid = client.get("/api/auth/me", headers={"Authorization": "Bearer invalidtoken123"})
    assert me_res_invalid.status_code == 401
