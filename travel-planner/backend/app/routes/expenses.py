from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.models.user import User
from app.models.trip import Trip
from app.models.expense import Expense
from app.core.dependencies import get_current_user

router = APIRouter()


@router.delete("/{expense_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_expense(
    expense_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    expense = (
        db.query(Expense)
        .join(Trip, Expense.trip_id == Trip.id)
        .filter(Expense.id == expense_id, Trip.user_id == current_user.id)
        .first()
    )
    if not expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense not found",
        )

    db.delete(expense)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
