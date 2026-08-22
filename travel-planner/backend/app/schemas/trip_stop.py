from pydantic import BaseModel, ConfigDict
from datetime import date
from typing import Optional

class TripStopCreate(BaseModel):
    city_name: str
    country: str
    start_date: date
    end_date: date
    stop_order: Optional[int] = None

class TripStopResponse(BaseModel):
    id: int
    trip_id: int
    city_name: str
    country: str
    start_date: date
    end_date: date
    stop_order: int

    model_config = ConfigDict(from_attributes=True)
