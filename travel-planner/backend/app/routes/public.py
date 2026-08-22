from fastapi import APIRouter

router = APIRouter()

@router.get("/trips/{share_token}")
def get_shared_trip(share_token: str):
    return {"msg": "get_shared_trip"}
