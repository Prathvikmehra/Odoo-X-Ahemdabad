from pydantic import BaseModel, ConfigDict
from typing import Optional
from decimal import Decimal

class ActivityCreate(BaseModel):
    name: str
    type: str
    description: Optional[str] = None
    cost: Optional[Decimal] = Decimal('0.00')
    duration_hours: Optional[Decimal] = None
    start_time: Optional[str] = None
    image_url: Optional[str] = None

class ActivityResponse(BaseModel):
    id: int
    stop_id: int
    name: str
    type: str
    description: Optional[str] = None
    cost: Decimal
    duration_hours: Optional[Decimal] = None
    start_time: Optional[str] = None
    image_url: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)
