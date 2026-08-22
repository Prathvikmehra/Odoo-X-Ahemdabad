from fastapi import APIRouter, Depends, HTTPException, status, Response
from typing import List
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.user import User
from app.models.trip import Trip
from app.schemas.trip import TripCreate, TripUpdate, TripOut
from app.core.dependencies import get_current_user

router = APIRouter()


@router.post("/", response_model=TripOut, status_code=status.HTTP_201_CREATED)
def create_trip(
    data: TripCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    trip = Trip(
        user_id=current_user.id,
        name=data.name,
        description=data.description,
        start_date=data.start_date,
        end_date=data.end_date,
        cover_image=data.cover_image,
    )
    db.add(trip)
    db.commit()
    db.refresh(trip)
    return trip


@router.get("/", response_model=List[TripOut], status_code=status.HTTP_200_OK)
def get_trips(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    trips = db.query(Trip).filter(Trip.user_id == current_user.id).all()
    return trips


@router.get("/{trip_id}", response_model=TripOut, status_code=status.HTTP_200_OK)
def get_trip(
    trip_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    trip = db.query(Trip).filter(Trip.id == trip_id, Trip.user_id == current_user.id).first()
    if not trip:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Trip not found",
        )
    return trip


@router.put("/{trip_id}", response_model=TripOut, status_code=status.HTTP_200_OK)
def update_trip(
    trip_id: int,
    data: TripUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    trip = db.query(Trip).filter(Trip.id == trip_id, Trip.user_id == current_user.id).first()
    if not trip:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Trip not found",
        )

    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(trip, field, value)

    db.commit()
    db.refresh(trip)
    return trip


@router.delete("/{trip_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_trip(
    trip_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    trip = db.query(Trip).filter(Trip.id == trip_id, Trip.user_id == current_user.id).first()
    if not trip:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Trip not found",
        )

    db.delete(trip)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
