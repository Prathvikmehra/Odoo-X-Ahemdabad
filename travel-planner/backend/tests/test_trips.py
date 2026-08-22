def create_user_and_get_token(client, name: str, email: str, password: str = "password123") -> str:
    client.post("/api/auth/signup", json={"name": name, "email": email, "password": password})
    login_res = client.post("/api/auth/login", json={"email": email, "password": password})
    return login_res.json()["access_token"]


def test_create_trip_success(client):
    token = create_user_and_get_token(client, "Alice", "alice@example.com")
    payload = {
        "name": "Trip to Paris",
        "description": "Visiting Eiffel Tower",
        "start_date": "2026-09-01",
        "end_date": "2026-09-10",
        "cover_image": "https://example.com/paris.jpg",
    }
    res = client.post(
        "/api/trips/",
        json=payload,
        headers={"Authorization": f"Bearer {token}"},
    )
    assert res.status_code == 201
    data = res.json()
    assert data["name"] == "Trip to Paris"
    assert data["description"] == "Visiting Eiffel Tower"
    assert data["start_date"] == "2026-09-01"
    assert data["end_date"] == "2026-09-10"
    assert data["cover_image"] == "https://example.com/paris.jpg"
    assert "id" in data
    assert "user_id" in data
    assert data["is_public"] is False


def test_get_trips_empty_list(client):
    token = create_user_and_get_token(client, "Bob", "bob@example.com")
    res = client.get("/api/trips/", headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 200
    assert res.json() == []


def test_get_trips_list(client):
    token = create_user_and_get_token(client, "Charlie", "charlie@example.com")
    client.post(
        "/api/trips/",
        json={"name": "Trip 1", "start_date": "2026-05-01", "end_date": "2026-05-05"},
        headers={"Authorization": f"Bearer {token}"},
    )
    client.post(
        "/api/trips/",
        json={"name": "Trip 2", "start_date": "2026-06-01", "end_date": "2026-06-05"},
        headers={"Authorization": f"Bearer {token}"},
    )

    res = client.get("/api/trips/", headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 200
    trips = res.json()
    assert len(trips) == 2
    assert {t["name"] for t in trips} == {"Trip 1", "Trip 2"}


def test_get_trip_by_id(client):
    token = create_user_and_get_token(client, "Dave", "dave@example.com")
    create_res = client.post(
        "/api/trips/",
        json={"name": "Tokyo Trip", "start_date": "2026-10-01", "end_date": "2026-10-10"},
        headers={"Authorization": f"Bearer {token}"},
    )
    trip_id = create_res.json()["id"]

    res = client.get(f"/api/trips/{trip_id}", headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 200
    assert res.json()["name"] == "Tokyo Trip"


def test_update_trip(client):
    token = create_user_and_get_token(client, "Eve", "eve@example.com")
    create_res = client.post(
        "/api/trips/",
        json={"name": "Old Name", "start_date": "2026-07-01", "end_date": "2026-07-05"},
        headers={"Authorization": f"Bearer {token}"},
    )
    trip_id = create_res.json()["id"]

    update_res = client.put(
        f"/api/trips/{trip_id}",
        json={"name": "New Name", "description": "Added description"},
        headers={"Authorization": f"Bearer {token}"},
    )
    assert update_res.status_code == 200
    updated_data = update_res.json()
    assert updated_data["name"] == "New Name"
    assert updated_data["description"] == "Added description"
    assert updated_data["start_date"] == "2026-07-01"


def test_delete_trip(client):
    token = create_user_and_get_token(client, "Frank", "frank@example.com")
    create_res = client.post(
        "/api/trips/",
        json={"name": "Temporary Trip", "start_date": "2026-08-01", "end_date": "2026-08-05"},
        headers={"Authorization": f"Bearer {token}"},
    )
    trip_id = create_res.json()["id"]

    del_res = client.delete(f"/api/trips/{trip_id}", headers={"Authorization": f"Bearer {token}"})
    assert del_res.status_code == 204

    get_res = client.get(f"/api/trips/{trip_id}", headers={"Authorization": f"Bearer {token}"})
    assert get_res.status_code == 404


def test_cross_user_ownership_isolation(client):
    token_a = create_user_and_get_token(client, "User A", "usera@example.com")
    token_b = create_user_and_get_token(client, "User B", "userb@example.com")

    # User A creates a trip
    create_res = client.post(
        "/api/trips/",
        json={"name": "User A Private Trip", "start_date": "2026-11-01", "end_date": "2026-11-05"},
        headers={"Authorization": f"Bearer {token_a}"},
    )
    trip_a_id = create_res.json()["id"]

    # User B tries to view User A's trip -> 404 Not Found
    get_res = client.get(f"/api/trips/{trip_a_id}", headers={"Authorization": f"Bearer {token_b}"})
    assert get_res.status_code == 404
    assert get_res.json()["detail"] == "Trip not found"

    # User B tries to update User A's trip -> 404 Not Found
    put_res = client.put(
        f"/api/trips/{trip_a_id}",
        json={"name": "Hacked Trip"},
        headers={"Authorization": f"Bearer {token_b}"},
    )
    assert put_res.status_code == 404
    assert put_res.json()["detail"] == "Trip not found"

    # User B tries to delete User A's trip -> 404 Not Found
    delete_res = client.delete(
        f"/api/trips/{trip_a_id}",
        headers={"Authorization": f"Bearer {token_b}"},
    )
    assert delete_res.status_code == 404
    assert delete_res.json()["detail"] == "Trip not found"

    # User B lists trips -> does not contain User A's trip
    list_res = client.get("/api/trips/", headers={"Authorization": f"Bearer {token_b}"})
    assert list_res.status_code == 200
    assert list_res.json() == []

    # Verify User A's trip is completely unchanged and intact
    verify_res = client.get(f"/api/trips/{trip_a_id}", headers={"Authorization": f"Bearer {token_a}"})
    assert verify_res.status_code == 200
    assert verify_res.json()["name"] == "User A Private Trip"


def test_unauthenticated_requests(client):
    assert client.get("/api/trips/").status_code == 401
    assert client.post("/api/trips/", json={"name": "Trip", "start_date": "2026-01-01", "end_date": "2026-01-02"}).status_code == 401
    assert client.get("/api/trips/1").status_code == 401
    assert client.put("/api/trips/1", json={"name": "Trip"}).status_code == 401
    assert client.delete("/api/trips/1").status_code == 401
