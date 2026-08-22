from fastapi import APIRouter

router = APIRouter()

@router.put("/{stop_id}")
def update_stop(stop_id: int):
    return {"msg": "update_stop"}

@router.delete("/{stop_id}")
def delete_stop(stop_id: int):
    return {"msg": "delete_stop"}

@router.get("/{stop_id}/activities")
def get_activities(stop_id: int):
    return {"msg": "get_activities"}

@router.post("/{stop_id}/activities")
def create_activity(stop_id: int):
    return {"msg": "create_activity"}
