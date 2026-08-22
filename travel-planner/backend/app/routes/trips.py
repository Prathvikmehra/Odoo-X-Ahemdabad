from fastapi import APIRouter, Depends, HTTPException, status, Response
from typing import List
from sqlalchemy.orm import Session
import secrets

from app.database.connection import get_db
from app.models.user import User
from app.models.trip import Trip
from app.models.expense import Expense
from app.schemas.trip import TripCreate, TripUpdate, TripOut
from app.schemas.expense import ExpenseCreate, ExpenseOut, BudgetSummaryOut
from app.schemas.public import ShareTripOut
from app.services.budget_service import calculate_trip_budget
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


@router.get("/{trip_id}/expenses", response_model=List[ExpenseOut], status_code=status.HTTP_200_OK)
def get_expenses(
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
    expenses = db.query(Expense).filter(Expense.trip_id == trip.id).all()
    return expenses


@router.post("/{trip_id}/expenses", response_model=ExpenseOut, status_code=status.HTTP_201_CREATED)
def create_expense(
    trip_id: int,
    data: ExpenseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    trip = db.query(Trip).filter(Trip.id == trip_id, Trip.user_id == current_user.id).first()
    if not trip:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Trip not found",
        )

    expense = Expense(
        trip_id=trip.id,
        amount=data.amount,
        category=data.category,
        description=data.description,
    )
    db.add(expense)
    db.commit()
    db.refresh(expense)
    return expense


@router.get("/{trip_id}/budget", response_model=BudgetSummaryOut, status_code=status.HTTP_200_OK)
def get_budget(
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

    return calculate_trip_budget(db, trip.id)


@router.post("/{trip_id}/share", response_model=ShareTripOut, status_code=status.HTTP_200_OK)
def share_trip(
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

    if not trip.share_token:
        trip.share_token = secrets.token_urlsafe(16)
    trip.is_public = True

    db.commit()
    db.refresh(trip)

    return ShareTripOut(
        share_token=trip.share_token,
        share_url=f"/public/trips/{trip.share_token}",
        is_public=trip.is_public,
    )
