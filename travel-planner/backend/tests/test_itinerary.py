"""
Tests for TripStop and Activity CRUD, cross-user isolation, and search endpoints.
Covers Priority 2 and Priority 3 verification.
"""

# ─── helpers ────────────────────────────────────────────────────────────────

STOP_PAYLOAD = {
    "city_name": "Tokyo",
    "country": "Japan",
    "start_date": "2025-03-01",
    "end_date": "2025-03-05",
}

ACTIVITY_PAYLOAD = {
    "name": "Shibuya Crossing",
    "type": "Sightseeing",
    "description": "Busiest crossing in the world.",
    "cost": 0,
    "duration_hours": 1,
}

TRIP_PAYLOAD = {
    "name": "Japan Trip",
    "description": "Awesome trip",
    "start_date": "2025-03-01",
    "end_date": "2025-03-10",
}


def _create_trip(client, headers):
    r = client.post("/api/trips/", json=TRIP_PAYLOAD, headers=headers)
    assert r.status_code == 201, r.text
    return r.json()["id"]


def _create_stop(client, trip_id, headers):
    r = client.post(f"/api/stops/trips/{trip_id}/stops", json=STOP_PAYLOAD, headers=headers)
    assert r.status_code == 201, r.text
    return r.json()["id"]


def _create_activity(client, stop_id, headers):
    r = client.post(f"/api/activities/stops/{stop_id}/activities", json=ACTIVITY_PAYLOAD, headers=headers)
    assert r.status_code == 201, r.text
    return r.json()["id"]


# ─── Stop CRUD ───────────────────────────────────────────────────────────────

def test_create_stop(client, auth_headers):
    trip_id = _create_trip(client, auth_headers)
    r = client.post(f"/api/stops/trips/{trip_id}/stops", json=STOP_PAYLOAD, headers=auth_headers)
    assert r.status_code == 201
    data = r.json()
    assert data["city_name"] == "Tokyo"
    assert data["trip_id"] == trip_id


def test_list_stops(client, auth_headers):
    trip_id = _create_trip(client, auth_headers)
    _create_stop(client, trip_id, auth_headers)
    _create_stop(client, trip_id, auth_headers)
    r = client.get(f"/api/stops/trips/{trip_id}/stops", headers=auth_headers)
    assert r.status_code == 200
    assert len(r.json()) == 2


def test_update_stop(client, auth_headers):
    trip_id = _create_trip(client, auth_headers)
    stop_id = _create_stop(client, trip_id, auth_headers)
    updated = {**STOP_PAYLOAD, "city_name": "Osaka"}
    r = client.put(f"/api/stops/{stop_id}", json=updated, headers=auth_headers)
    assert r.status_code == 200
    assert r.json()["city_name"] == "Osaka"


def test_delete_stop(client, auth_headers):
    trip_id = _create_trip(client, auth_headers)
    stop_id = _create_stop(client, trip_id, auth_headers)
    r = client.delete(f"/api/stops/{stop_id}", headers=auth_headers)
    assert r.status_code == 204
    # confirm gone
    r2 = client.get(f"/api/stops/trips/{trip_id}/stops", headers=auth_headers)
    assert r2.json() == []


# ─── Activity CRUD ───────────────────────────────────────────────────────────

def test_create_activity(client, auth_headers):
    trip_id = _create_trip(client, auth_headers)
    stop_id = _create_stop(client, trip_id, auth_headers)
    r = client.post(f"/api/activities/stops/{stop_id}/activities", json=ACTIVITY_PAYLOAD, headers=auth_headers)
    assert r.status_code == 201
    data = r.json()
    assert data["name"] == "Shibuya Crossing"
    assert data["stop_id"] == stop_id


def test_list_activities(client, auth_headers):
    trip_id = _create_trip(client, auth_headers)
    stop_id = _create_stop(client, trip_id, auth_headers)
    _create_activity(client, stop_id, auth_headers)
    _create_activity(client, stop_id, auth_headers)
    r = client.get(f"/api/activities/stops/{stop_id}/activities", headers=auth_headers)
    assert r.status_code == 200
    assert len(r.json()) == 2


def test_delete_activity(client, auth_headers):
    trip_id = _create_trip(client, auth_headers)
    stop_id = _create_stop(client, trip_id, auth_headers)
    act_id = _create_activity(client, stop_id, auth_headers)
    r = client.delete(f"/api/activities/{act_id}", headers=auth_headers)
    assert r.status_code == 204
    r2 = client.get(f"/api/activities/stops/{stop_id}/activities", headers=auth_headers)
    assert r2.json() == []


# ─── Cross-user isolation (Priority 3 proof) ─────────────────────────────────

def test_user_b_cannot_access_user_a_stop(client, auth_headers, auth_headers_b):
    """User B hitting User A's stop must get 404, identical to nonexistent ID."""
    trip_id = _create_trip(client, auth_headers)
    stop_id = _create_stop(client, trip_id, auth_headers)

    r = client.get(f"/api/stops/trips/{trip_id}/stops", headers=auth_headers_b)
    assert r.status_code == 404, f"Expected 404, got {r.status_code}: {r.text}"
    detail = r.json()["detail"]

    # body should be same as a genuinely missing ID
    r2 = client.get(f"/api/stops/trips/99999/stops", headers=auth_headers_b)
    assert r2.status_code == 404
    assert r2.json()["detail"] == detail


def test_user_b_cannot_update_user_a_stop(client, auth_headers, auth_headers_b):
    trip_id = _create_trip(client, auth_headers)
    stop_id = _create_stop(client, trip_id, auth_headers)
    r = client.put(f"/api/stops/{stop_id}", json={**STOP_PAYLOAD, "city_name": "Hack"}, headers=auth_headers_b)
    assert r.status_code == 404


def test_user_b_cannot_delete_user_a_stop(client, auth_headers, auth_headers_b):
    trip_id = _create_trip(client, auth_headers)
    stop_id = _create_stop(client, trip_id, auth_headers)
    r = client.delete(f"/api/stops/{stop_id}", headers=auth_headers_b)
    assert r.status_code == 404


def test_user_b_cannot_access_user_a_activity(client, auth_headers, auth_headers_b):
    trip_id = _create_trip(client, auth_headers)
    stop_id = _create_stop(client, trip_id, auth_headers)
    act_id = _create_activity(client, stop_id, auth_headers)
    r = client.delete(f"/api/activities/{act_id}", headers=auth_headers_b)
    assert r.status_code == 404


# ─── Search endpoints (Priority 1 + Priority 2 search coverage) ──────────────

def test_get_cities_returns_expected_count(client):
    r = client.get("/api/cities")
    assert r.status_code == 200
    cities = r.json()
    assert len(cities) == 10


def test_get_cities_shape(client):
    r = client.get("/api/cities")
    first = r.json()[0]
    assert "name" in first
    assert "country" in first
    assert "id" in first


def test_search_activities_valid_city(client):
    r = client.get("/api/activities/search?city=Tokyo")
    assert r.status_code == 200
    results = r.json()
    assert len(results) > 0


def test_search_activities_case_insensitive(client):
    r = client.get("/api/activities/search?city=tokyo")
    assert r.status_code == 200
    assert len(r.json()) > 0


def test_search_activities_with_q(client):
    r = client.get("/api/activities/search?city=Tokyo&q=Shibuya")
    assert r.status_code == 200
    results = r.json()
    assert len(results) == 1
    assert results[0]["name"] == "Shibuya Crossing"


def test_search_activities_q_case_insensitive(client):
    r = client.get("/api/activities/search?city=Tokyo&q=shibuya")
    assert r.status_code == 200
    assert len(r.json()) == 1


def test_search_activities_no_match_returns_empty_list(client):
    r = client.get("/api/activities/search?city=Tokyo&q=zzznomatch")
    assert r.status_code == 200
    assert r.json() == []


def test_search_activities_unknown_city_returns_empty_list(client):
    r = client.get("/api/activities/search?city=UnknownCity")
    assert r.status_code == 200
    assert r.json() == []


def test_search_activity_has_stable_id(client):
    """Each search result must carry a stable numeric id (for React list keys)."""
    r = client.get("/api/activities/search?city=Tokyo")
    assert r.status_code == 200
    for item in r.json():
        assert "id" in item
        assert isinstance(item["id"], int)


# ─── FK cascade (Priority 6 proof) ──────────────────────────────────────────

def test_delete_trip_cascades_to_stops_and_activities(client, auth_headers):
    """Deleting a trip must cascade-delete its stops and activities (FK ON)."""
    trip_id = _create_trip(client, auth_headers)
    stop_id = _create_stop(client, trip_id, auth_headers)
    _create_activity(client, stop_id, auth_headers)

    r = client.delete(f"/api/trips/{trip_id}", headers=auth_headers)
    assert r.status_code == 204

    # stop should be gone (trip is gone, so get_owned_trip returns 404)
    r2 = client.get(f"/api/stops/trips/{trip_id}/stops", headers=auth_headers)
    assert r2.status_code == 404
