from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List

from app.database.connection import get_db
from app.models.user import User
from app.schemas.trip_stop import TripStopResponse, TripStopCreate
from app.services.itinerary_service import get_owned_trip, get_owned_stop
from app.core.dependencies import get_current_user
from app.models.trip_stop import TripStop

router = APIRouter()

@router.get("/trips/{trip_id}/stops", response_model=List[TripStopResponse])
def get_stops(trip_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    trip = get_owned_trip(db, trip_id, current_user)
    return trip.stops

@router.post("/trips/{trip_id}/stops", response_model=TripStopResponse, status_code=status.HTTP_201_CREATED)
def create_stop(trip_id: int, stop_in: TripStopCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    trip = get_owned_trip(db, trip_id, current_user)
    if stop_in.stop_order is None:
        stop_in.stop_order = len(trip.stops)
    new_stop = TripStop(**stop_in.model_dump(), trip_id=trip.id)
    db.add(new_stop)
    db.commit()
    db.refresh(new_stop)
    return new_stop

@router.put("/{stop_id}", response_model=TripStopResponse)
def update_stop(stop_id: int, stop_in: TripStopCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    stop = get_owned_stop(db, stop_id, current_user)
    update_data = stop_in.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(stop, key, value)
    db.commit()
    db.refresh(stop)
    return stop

@router.delete("/{stop_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_stop(stop_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    stop = get_owned_stop(db, stop_id, current_user)
    db.delete(stop)
    db.commit()
    return None
