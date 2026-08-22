from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_trips():
    return {"msg": "get_trips"}

@router.post("/")
def create_trip():
    return {"msg": "create_trip"}

@router.get("/{trip_id}")
def get_trip(trip_id: int):
    return {"msg": "get_trip"}

@router.put("/{trip_id}")
def update_trip(trip_id: int):
    return {"msg": "update_trip"}

@router.delete("/{trip_id}")
def delete_trip(trip_id: int):
    return {"msg": "delete_trip"}

@router.get("/{trip_id}/stops")
def get_stops(trip_id: int):
    return {"msg": "get_stops"}

@router.post("/{trip_id}/stops")
def create_stop(trip_id: int):
    return {"msg": "create_stop"}

@router.get("/{trip_id}/expenses")
def get_expenses(trip_id: int):
    return {"msg": "get_expenses"}

@router.post("/{trip_id}/expenses")
def create_expense(trip_id: int):
    return {"msg": "create_expense"}

@router.get("/{trip_id}/budget")
def get_budget(trip_id: int):
    return {"msg": "get_budget"}

@router.post("/{trip_id}/share")
def share_trip(trip_id: int):
    return {"msg": "share_trip"}
