from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.models.user import User

def get_current_user(db: Session = Depends(get_db)) -> User:
    """
    TODO: Implement proper JWT decoding and user fetching.
    This is a placeholder to resolve import errors and allow the server to start.
    """
    user = db.query(User).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated (Dummy Auth)")
    return user
