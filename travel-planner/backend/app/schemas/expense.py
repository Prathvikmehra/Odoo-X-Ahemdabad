from pydantic import BaseModel, ConfigDict, field_serializer
from typing import Optional, Dict


class ExpenseCreate(BaseModel):
    amount: float
    category: str
    description: Optional[str] = None


class ExpenseOut(BaseModel):
    id: int
    trip_id: int
    amount: float
    category: str
    description: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

    @field_serializer("amount")
    def serialize_amount(self, v, _info) -> float:
        return float(v) if v is not None else 0.0


class BudgetSummaryOut(BaseModel):
    total: float
    categories: Dict[str, float]
