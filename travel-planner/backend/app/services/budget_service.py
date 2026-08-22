from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Dict, Any
from app.models.expense import Expense


def calculate_trip_budget(db: Session, trip_id: int) -> Dict[str, Any]:
    rows = (
        db.query(Expense.category, func.sum(Expense.amount))
        .filter(Expense.trip_id == trip_id)
        .group_by(Expense.category)
        .all()
    )

    categories = {}
    total = 0.0
    for cat, amount in rows:
        val = float(amount) if amount is not None else 0.0
        categories[cat] = val
        total += val

    return {
        "total": round(total, 2),
        "categories": {k: round(v, 2) for k, v in categories.items()},
    }
