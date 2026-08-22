def _create_trip(client, auth_headers):
    trip_data = {
        "name": "Budget Test Trip",
        "start_date": "2026-08-01",
        "end_date": "2026-08-10",
        "description": "A trip for testing expenses",
    }
    response = client.post("/api/trips/", json=trip_data, headers=auth_headers)
    assert response.status_code == 201
    return response.json()["id"]


def test_create_expense_success(client, auth_headers):
    trip_id = _create_trip(client, auth_headers)

    expense_data = {
        "amount": 120.50,
        "category": "flight",
        "description": "Flight to Tokyo",
    }
    response = client.post(
        f"/api/trips/{trip_id}/expenses",
        json=expense_data,
        headers=auth_headers,
    )
    assert response.status_code == 201
    data = response.json()
    assert data["amount"] == 120.50
    assert data["category"] == "flight"
    assert data["description"] == "Flight to Tokyo"
    assert data["trip_id"] == trip_id
    assert "id" in data


def test_get_trip_expenses_list(client, auth_headers):
    trip_id = _create_trip(client, auth_headers)

    for i in range(3):
        client.post(
            f"/api/trips/{trip_id}/expenses",
            json={"amount": 50.0 + i, "category": "food", "description": f"Meal {i}"},
            headers=auth_headers,
        )

    response = client.get(f"/api/trips/{trip_id}/expenses", headers=auth_headers)
    assert response.status_code == 200
    expenses = response.json()
    assert len(expenses) == 3


def test_get_trip_budget_aggregation(client, auth_headers):
    trip_id = _create_trip(client, auth_headers)

    client.post(
        f"/api/trips/{trip_id}/expenses",
        json={"amount": 100.0, "category": "flight", "description": "Flight 1"},
        headers=auth_headers,
    )
    client.post(
        f"/api/trips/{trip_id}/expenses",
        json={"amount": 150.0, "category": "flight", "description": "Flight 2"},
        headers=auth_headers,
    )
    client.post(
        f"/api/trips/{trip_id}/expenses",
        json={"amount": 75.25, "category": "food", "description": "Dinner"},
        headers=auth_headers,
    )

    response = client.get(f"/api/trips/{trip_id}/budget", headers=auth_headers)
    assert response.status_code == 200
    budget = response.json()
    assert budget["total"] == 325.25
    assert budget["categories"]["flight"] == 250.0
    assert budget["categories"]["food"] == 75.25


def test_get_trip_budget_empty(client, auth_headers):
    trip_id = _create_trip(client, auth_headers)

    response = client.get(f"/api/trips/{trip_id}/budget", headers=auth_headers)
    assert response.status_code == 200
    budget = response.json()
    assert budget["total"] == 0.0
    assert budget["categories"] == {}


def test_delete_expense_success(client, auth_headers):
    trip_id = _create_trip(client, auth_headers)

    exp_res = client.post(
        f"/api/trips/{trip_id}/expenses",
        json={"amount": 60.0, "category": "hotel", "description": "Night 1"},
        headers=auth_headers,
    )
    expense_id = exp_res.json()["id"]

    del_res = client.delete(f"/api/expenses/{expense_id}", headers=auth_headers)
    assert del_res.status_code == 204

    # Verify budget updated to 0
    budget_res = client.get(f"/api/trips/{trip_id}/budget", headers=auth_headers)
    assert budget_res.status_code == 200
    assert budget_res.json()["total"] == 0.0


def test_cross_user_expense_isolation(client, auth_headers, auth_headers_b):
    trip_id = _create_trip(client, auth_headers)

    exp_res = client.post(
        f"/api/trips/{trip_id}/expenses",
        json={"amount": 80.0, "category": "activity", "description": "Museum"},
        headers=auth_headers,
    )
    expense_id = exp_res.json()["id"]

    # User B cannot view User A's expenses
    res = client.get(f"/api/trips/{trip_id}/expenses", headers=auth_headers_b)
    assert res.status_code == 404

    # User B cannot create expense on User A's trip
    res = client.post(
        f"/api/trips/{trip_id}/expenses",
        json={"amount": 10.0, "category": "snack"},
        headers=auth_headers_b,
    )
    assert res.status_code == 404

    # User B cannot view User A's budget
    res = client.get(f"/api/trips/{trip_id}/budget", headers=auth_headers_b)
    assert res.status_code == 404

    # User B cannot delete User A's expense
    res = client.delete(f"/api/expenses/{expense_id}", headers=auth_headers_b)
    assert res.status_code == 404


def test_unauthenticated_expense_requests(client):
    res = client.get("/api/trips/1/expenses")
    assert res.status_code == 401

    res = client.post("/api/trips/1/expenses", json={"amount": 10.0, "category": "food"})
    assert res.status_code == 401

    res = client.get("/api/trips/1/budget")
    assert res.status_code == 401

    res = client.delete("/api/expenses/1")
    assert res.status_code == 401
