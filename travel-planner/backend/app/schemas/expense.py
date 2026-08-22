from pydantic import BaseModel, ConfigDict
from typing import Optional, Dict


class ExpenseBase(BaseModel):
    amount: float
    category: str
    description: Optional[str] = None


class ExpenseCreate(ExpenseBase):
    pass


class ExpenseOut(ExpenseBase):
    id: int
    trip_id: int

    model_config = ConfigDict(from_attributes=True)


class BudgetSummaryOut(BaseModel):
    total: float
    categories: Dict[str, float]
