from fastapi import APIRouter

router = APIRouter()

@router.post("/signup")
def signup():
    return {"msg": "signup"}

@router.post("/login")
def login():
    return {"msg": "login"}

@router.get("/me")
def me():
    return {"msg": "me"}
