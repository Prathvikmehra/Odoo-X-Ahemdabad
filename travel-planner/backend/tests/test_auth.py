def test_signup_success(client):
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


def test_signup_duplicate_email(client):
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


def test_login_success(client):
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


def test_login_invalid_password(client):
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


def test_login_nonexistent_user(client):
    login_res = client.post("/api/auth/login", json={
        "email": "doesnotexist@example.com",
        "password": "some_password"
    })
    assert login_res.status_code == 401
    assert login_res.json()["detail"] == "Invalid email or password"


def test_get_current_user_me_authenticated(client):
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


def test_get_current_user_me_unauthorized(client):
    me_res = client.get("/api/auth/me")
    assert me_res.status_code == 401

    me_res_invalid = client.get("/api/auth/me", headers={"Authorization": "Bearer invalidtoken123"})
    assert me_res_invalid.status_code == 401
