def _create_trip(client, auth_headers):
    trip_data = {
        "name": "Public Share Test Trip",
        "start_date": "2026-08-01",
        "end_date": "2026-08-10",
        "description": "A trip for testing public sharing",
    }
    response = client.post("/api/trips/", json=trip_data, headers=auth_headers)
    assert response.status_code == 201
    return response.json()["id"]


def test_share_trip_success(client, auth_headers):
    trip_id = _create_trip(client, auth_headers)

    res = client.post(f"/api/trips/{trip_id}/share", headers=auth_headers)
    assert res.status_code == 200
    data = res.json()
    assert data["is_public"] is True
    assert "share_token" in data
    assert len(data["share_token"]) > 10
    assert data["share_url"] == f"/public/trips/{data['share_token']}"


def test_get_public_trip_success(client, auth_headers):
    trip_id = _create_trip(client, auth_headers)

    # Share the trip
    share_res = client.post(f"/api/trips/{trip_id}/share", headers=auth_headers)
    share_token = share_res.json()["share_token"]

    # Unauthenticated request to view public trip
    res = client.get(f"/api/public/trips/{share_token}")
    assert res.status_code == 200
    trip = res.json()
    assert trip["id"] == trip_id
    assert trip["name"] == "Public Share Test Trip"
    assert trip["is_public"] is True
    assert trip["share_token"] == share_token
    assert "stops" in trip


def test_get_public_trip_invalid_token(client):
    res = client.get("/api/public/trips/invalid_token_12345")
    assert res.status_code == 404
    assert res.json()["detail"] == "Public trip not found"


def test_non_owner_cannot_share_trip(client, auth_headers, auth_headers_b):
    trip_id = _create_trip(client, auth_headers)

    # User B cannot share User A's trip
    res = client.post(f"/api/trips/{trip_id}/share", headers=auth_headers_b)
    assert res.status_code == 404


def test_unauthenticated_share_blocked(client):
    res = client.post("/api/trips/1/share")
    assert res.status_code == 401


def test_public_trip_data_sanitization(client, auth_headers):
    trip_id = _create_trip(client, auth_headers)

    # Add expense
    client.post(
        f"/api/trips/{trip_id}/expenses",
        json={"amount": 250.0, "category": "flights", "description": "Confidential flight"},
        headers=auth_headers,
    )

    # Share trip
    share_res = client.post(f"/api/trips/{trip_id}/share", headers=auth_headers)
    share_token = share_res.json()["share_token"]

    # Retrieve public trip
    res = client.get(f"/api/public/trips/{share_token}")
    assert res.status_code == 200
    public_data = res.json()

    # Confirm sensitive / financial fields are excluded
    assert "user_id" not in public_data
    assert "email" not in public_data
    assert "password_hash" not in public_data
    assert "expenses" not in public_data
    assert "Confidential flight" not in res.text
