def create_user_and_get_token(client, name: str, email: str, password: str = "password123") -> str:
    client.post("/api/auth/signup", json={"name": name, "email": email, "password": password})
    login_res = client.post("/api/auth/login", json={"email": email, "password": password})
    return login_res.json()["access_token"]


def create_trip(client, token: str, name: str = "Tokyo Expedition") -> int:
    res = client.post(
        "/api/trips/",
        json={"name": name, "start_date": "2026-10-01", "end_date": "2026-10-15"},
        headers={"Authorization": f"Bearer {token}"},
    )
    return res.json()["id"]


def test_share_trip_success(client):
    token = create_user_and_get_token(client, "Alice", "alice_public@example.com")
    trip_id = create_trip(client, token, "Alice Public Trip")

    share_res = client.post(
        f"/api/trips/{trip_id}/share",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert share_res.status_code == 200
    data = share_res.json()
    assert "share_token" in data
    assert len(data["share_token"]) > 10
    assert data["is_public"] is True
    assert f"/public/trips/{data['share_token']}" in data["share_url"]


def test_get_public_trip_success(client):
    token = create_user_and_get_token(client, "Bob", "bob_public@example.com")
    trip_id = create_trip(client, token, "Bob Backpacking Europe")

    # Add stop and activity
    stop_res = client.post(
        f"/api/stops/trips/{trip_id}/stops",
        json={"city_name": "Rome", "country": "Italy", "start_date": "2026-10-02", "end_date": "2026-10-06"},
        headers={"Authorization": f"Bearer {token}"},
    )
    stop_id = stop_res.json()["id"]

    client.post(
        f"/api/activities/stops/{stop_id}/activities",
        json={"name": "Colosseum Tour", "type": "Sightseeing", "cost": 30.0},
        headers={"Authorization": f"Bearer {token}"},
    )

    # Share the trip
    share_res = client.post(
        f"/api/trips/{trip_id}/share",
        headers={"Authorization": f"Bearer {token}"},
    )
    share_token = share_res.json()["share_token"]

    # Public user retrieves trip (NO auth headers)
    public_res = client.get(f"/api/public/trips/{share_token}")
    assert public_res.status_code == 200
    public_data = public_res.json()

    assert public_data["name"] == "Bob Backpacking Europe"
    assert public_data["is_public"] is True
    assert public_data["share_token"] == share_token
    assert len(public_data["stops"]) == 1
    assert public_data["stops"][0]["city_name"] == "Rome"
    assert len(public_data["stops"][0]["activities"]) == 1
    assert public_data["stops"][0]["activities"][0]["name"] == "Colosseum Tour"


def test_get_public_trip_invalid_token(client):
    res = client.get("/api/public/trips/non_existent_fake_token_12345")
    assert res.status_code == 404
    assert res.json()["detail"] == "Shared trip not found"


def test_non_owner_cannot_share_trip(client):
    token_a = create_user_and_get_token(client, "User A", "user_a_share@example.com")
    token_b = create_user_and_get_token(client, "User B", "user_b_share@example.com")

    trip_a_id = create_trip(client, token_a, "User A Private Trip")

    # User B tries to share User A's trip -> 404
    res = client.post(
        f"/api/trips/{trip_a_id}/share",
        headers={"Authorization": f"Bearer {token_b}"},
    )
    assert res.status_code == 404
    assert res.json()["detail"] == "Trip not found"


def test_unauthenticated_share_blocked(client):
    res = client.post("/api/trips/1/share")
    assert res.status_code == 401


def test_public_trip_data_sanitization(client):
    token = create_user_and_get_token(client, "Charlie", "charlie_share@example.com")
    trip_id = create_trip(client, token, "Sanitized Trip")

    # Add private expense
    client.post(
        f"/api/trips/{trip_id}/expenses",
        json={"amount": 500.0, "category": "flights", "description": "Confidential flight"},
        headers={"Authorization": f"Bearer {token}"},
    )

    # Share the trip
    share_res = client.post(
        f"/api/trips/{trip_id}/share",
        headers={"Authorization": f"Bearer {token}"},
    )
    share_token = share_res.json()["share_token"]

    # Public request
    public_res = client.get(f"/api/public/trips/{share_token}")
    assert public_res.status_code == 200
    data = public_res.json()

    # Sensitive fields must NOT exist in the public response
    assert "user_id" not in data
    assert "user" not in data
    assert "email" not in data
    assert "password" not in data
    assert "password_hash" not in data
    assert "expenses" not in data
