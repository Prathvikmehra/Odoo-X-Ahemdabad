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


# Downstream feature routes (stubs preserved)
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

