def create_user_and_get_token(client, name: str, email: str, password: str = "password123") -> str:
    client.post("/api/auth/signup", json={"name": name, "email": email, "password": password})
    login_res = client.post("/api/auth/login", json={"email": email, "password": password})
    return login_res.json()["access_token"]


def create_trip(client, token: str, name: str = "Paris Adventure") -> int:
    res = client.post(
        "/api/trips/",
        json={"name": name, "start_date": "2026-09-01", "end_date": "2026-09-10"},
        headers={"Authorization": f"Bearer {token}"},
    )
    return res.json()["id"]


def test_create_expense_success(client):
    token = create_user_and_get_token(client, "Alice", "alice_exp@example.com")
    trip_id = create_trip(client, token)

    payload = {
        "amount": 55.50,
        "category": "food",
        "description": "Dinner at Bistro",
    }
    res = client.post(
        f"/api/trips/{trip_id}/expenses",
        json=payload,
        headers={"Authorization": f"Bearer {token}"},
    )
    assert res.status_code == 201
    data = res.json()
    assert data["amount"] == 55.50
    assert data["category"] == "food"
    assert data["description"] == "Dinner at Bistro"
    assert data["trip_id"] == trip_id
    assert "id" in data


def test_get_trip_expenses_list(client):
    token = create_user_and_get_token(client, "Bob", "bob_exp@example.com")
    trip_id = create_trip(client, token)

    client.post(
        f"/api/trips/{trip_id}/expenses",
        json={"amount": 20.0, "category": "transport", "description": "Metro ticket"},
        headers={"Authorization": f"Bearer {token}"},
    )
    client.post(
        f"/api/trips/{trip_id}/expenses",
        json={"amount": 80.0, "category": "accommodation", "description": "Hotel night"},
        headers={"Authorization": f"Bearer {token}"},
    )

    res = client.get(
        f"/api/trips/{trip_id}/expenses",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert res.status_code == 200
    expenses = res.json()
    assert len(expenses) == 2
    assert {e["category"] for e in expenses} == {"transport", "accommodation"}


def test_get_trip_budget_aggregation(client):
    token = create_user_and_get_token(client, "Charlie", "charlie_exp@example.com")
    trip_id = create_trip(client, token)

    # Add multiple expenses across multiple categories including custom 5th category
    client.post(
        f"/api/trips/{trip_id}/expenses",
        json={"amount": 25.50, "category": "food"},
        headers={"Authorization": f"Bearer {token}"},
    )
    client.post(
        f"/api/trips/{trip_id}/expenses",
        json={"amount": 14.50, "category": "food"},
        headers={"Authorization": f"Bearer {token}"},
    )
    client.post(
        f"/api/trips/{trip_id}/expenses",
        json={"amount": 60.0, "category": "transport"},
        headers={"Authorization": f"Bearer {token}"},
    )
    client.post(
        f"/api/trips/{trip_id}/expenses",
        json={"amount": 35.0, "category": "activities"},
        headers={"Authorization": f"Bearer {token}"},
    )
    client.post(
        f"/api/trips/{trip_id}/expenses",
        json={"amount": 15.0, "category": "misc_shopping"},
        headers={"Authorization": f"Bearer {token}"},
    )

    res = client.get(
        f"/api/trips/{trip_id}/budget",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert res.status_code == 200
    budget = res.json()
    assert budget["total"] == 150.0
    assert budget["categories"] == {
        "food": 40.0,
        "transport": 60.0,
        "activities": 35.0,
        "misc_shopping": 15.0,
    }


def test_get_trip_budget_empty(client):
    token = create_user_and_get_token(client, "Dave", "dave_exp@example.com")
    trip_id = create_trip(client, token)

    res = client.get(
        f"/api/trips/{trip_id}/budget",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert res.status_code == 200
    budget = res.json()
    assert budget["total"] == 0.0
    assert budget["categories"] == {}


def test_delete_expense_success(client):
    token = create_user_and_get_token(client, "Eve", "eve_exp@example.com")
    trip_id = create_trip(client, token)

    exp_res = client.post(
        f"/api/trips/{trip_id}/expenses",
        json={"amount": 100.0, "category": "hotel"},
        headers={"Authorization": f"Bearer {token}"},
    )
    expense_id = exp_res.json()["id"]

    del_res = client.delete(
        f"/api/expenses/{expense_id}",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert del_res.status_code == 204

    # Verify budget total is now 0
    budget_res = client.get(
        f"/api/trips/{trip_id}/budget",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert budget_res.json()["total"] == 0.0


def test_cross_user_expense_isolation(client):
    token_a = create_user_and_get_token(client, "User A", "user_a_exp@example.com")
    token_b = create_user_and_get_token(client, "User B", "user_b_exp@example.com")

    trip_a_id = create_trip(client, token_a, "User A Trip")
    exp_a_res = client.post(
        f"/api/trips/{trip_a_id}/expenses",
        json={"amount": 75.0, "category": "food"},
        headers={"Authorization": f"Bearer {token_a}"},
    )
    expense_a_id = exp_a_res.json()["id"]

    # User B cannot create expense on User A's trip -> 404
    post_res = client.post(
        f"/api/trips/{trip_a_id}/expenses",
        json={"amount": 99.0, "category": "food"},
        headers={"Authorization": f"Bearer {token_b}"},
    )
    assert post_res.status_code == 404
    assert post_res.json()["detail"] == "Trip not found"

    # User B cannot view User A's trip expenses -> 404
    get_res = client.get(
        f"/api/trips/{trip_a_id}/expenses",
        headers={"Authorization": f"Bearer {token_b}"},
    )
    assert get_res.status_code == 404
    assert get_res.json()["detail"] == "Trip not found"

    # User B cannot view User A's budget -> 404
    budget_res = client.get(
        f"/api/trips/{trip_a_id}/budget",
        headers={"Authorization": f"Bearer {token_b}"},
    )
    assert budget_res.status_code == 404
    assert budget_res.json()["detail"] == "Trip not found"

    # User B cannot delete User A's expense -> 404
    delete_res = client.delete(
        f"/api/expenses/{expense_a_id}",
        headers={"Authorization": f"Bearer {token_b}"},
    )
    assert delete_res.status_code == 404
    assert delete_res.json()["detail"] == "Expense not found"


def test_unauthenticated_expense_requests(client):
    assert client.post("/api/trips/1/expenses", json={"amount": 10.0, "category": "food"}).status_code == 401
    assert client.get("/api/trips/1/expenses").status_code == 401
    assert client.get("/api/trips/1/budget").status_code == 401
    assert client.delete("/api/expenses/1").status_code == 401
