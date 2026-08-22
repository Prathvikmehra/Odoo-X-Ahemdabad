from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.models.trip import Trip
from app.models.trip_stop import TripStop
from app.models.activity import Activity
from app.models.user import User

def get_owned_trip(db: Session, trip_id: int, current_user: User) -> Trip:
    trip = db.query(Trip).filter(Trip.id == trip_id).first()
    if not trip:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found")
    if trip.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to access this trip")
    return trip

def get_owned_stop(db: Session, stop_id: int, current_user: User) -> TripStop:
    stop = db.query(TripStop).filter(TripStop.id == stop_id).first()
    if not stop:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip stop not found")
    if not stop.trip or stop.trip.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to access this stop")
    return stop

def get_owned_activity(db: Session, activity_id: int, current_user: User) -> Activity:
    activity = db.query(Activity).filter(Activity.id == activity_id).first()
    if not activity:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Activity not found")
    if not activity.stop or not activity.stop.trip or activity.stop.trip.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to access this activity")
    return activity
