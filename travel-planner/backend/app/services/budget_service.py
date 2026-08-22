from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.expense import Expense
from app.schemas.expense import BudgetSummaryOut


def calculate_trip_budget(db: Session, trip_id: int) -> BudgetSummaryOut:
    results = (
        db.query(Expense.category, func.sum(Expense.amount))
        .filter(Expense.trip_id == trip_id)
        .group_by(Expense.category)
        .all()
    )

    categories = {}
    total = 0.0
    for category, category_total in results:
        amount = float(category_total) if category_total is not None else 0.0
        categories[category] = round(amount, 2)
        total += amount

    return BudgetSummaryOut(
        total=round(total, 2),
        categories=categories,
    )
