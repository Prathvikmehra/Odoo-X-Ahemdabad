from fastapi import APIRouter

router = APIRouter()

@router.put("/{activity_id}")
def update_activity(activity_id: int):
    return {"msg": "update_activity"}

@router.delete("/{activity_id}")
def delete_activity(activity_id: int):
    return {"msg": "delete_activity"}

@router.get("/search")
def search_activities():
    return {"msg": "search_activities"}
