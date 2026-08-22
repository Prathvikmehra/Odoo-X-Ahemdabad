from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List

from app.database.connection import get_db
from app.models.user import User
from app.schemas.activity import ActivityResponse, ActivityCreate
from app.services.itinerary_service import get_owned_stop, get_owned_activity
from app.core.dependencies import get_current_user
from app.models.activity import Activity

router = APIRouter()

@router.get("/stops/{stop_id}/activities", response_model=List[ActivityResponse])
def get_activities(stop_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    stop = get_owned_stop(db, stop_id, current_user)
    return stop.activities

@router.post("/stops/{stop_id}/activities", response_model=ActivityResponse, status_code=status.HTTP_201_CREATED)
def create_activity(stop_id: int, activity_in: ActivityCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    stop = get_owned_stop(db, stop_id, current_user)
    new_activity = Activity(**activity_in.model_dump(), stop_id=stop.id)
    db.add(new_activity)
    db.commit()
    db.refresh(new_activity)
    return new_activity

@router.delete("/{activity_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_activity(activity_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    activity = get_owned_activity(db, activity_id, current_user)
    db.delete(activity)
    db.commit()
    return None
